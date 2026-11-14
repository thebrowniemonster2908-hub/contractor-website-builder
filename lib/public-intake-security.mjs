import { createHmac } from 'node:crypto';
export class IntakeError extends Error { constructor(message, status = 400) { super(message); this.status = status; } }
export async function readBoundedJson(request, max = 16384) {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) throw new IntakeError('Invalid request.');
  const reader = request.body?.getReader(); if (!reader) throw new IntakeError('Invalid request.');
  const chunks = []; let length = 0;
  try { while (true) { const { done, value } = await reader.read(); if (done) break; length += value.length; if (length > max) { await reader.cancel(); throw new IntakeError('Request is too large.', 413); } chunks.push(Buffer.from(value)); } }
  finally { reader.releaseLock(); }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw new IntakeError('Invalid request.'); }
}
export function checkedNodeBody(request, max = 16384) {
  if (!String(request.headers['content-type'] || '').toLowerCase().startsWith('application/json')) throw new IntakeError('Invalid request.');
  const body = request.body;
  if (!body || typeof body !== 'object' || Array.isArray(body) || Buffer.byteLength(JSON.stringify(body)) > max) throw new IntakeError('Invalid or oversized request.');
  return body;
}
export function text(value, max, required = true) {
  if (value === undefined || value === null || value === '') { if (!required) return ''; throw new IntakeError('Missing required field.'); }
  if (typeof value !== 'string' || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) throw new IntakeError('Invalid field.');
  return value.trim();
}
export function email(value) { const result = text(value, 254).toLowerCase(); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result)) throw new IntakeError('Invalid email.'); return result; }
export async function guardPublicIntake(request, body, scope, env = process.env, fetchImpl = fetch) {
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_KEY;
  if (env.INTAKE_SECURITY_ENABLED !== 'true' || !env.TURNSTILE_SECRET_KEY || !env.SUPABASE_URL || !key || !env.PUBLIC_SITE_ORIGIN) throw new IntakeError('Contact requests are temporarily unavailable.', 503);
  const headers = request.headers instanceof Headers ? request.headers : new Headers(request.headers);
  const origin = new URL(env.PUBLIC_SITE_ORIGIN).origin;
  if (headers.get('origin') !== origin) throw new IntakeError('Invalid request origin.', 403);
  const token = text(body.challengeToken, 2048);
  const ip = (headers.get('x-vercel-forwarded-for') || headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim().slice(0, 128);
  const identity = createHmac('sha256', env.INTAKE_LIMIT_SECRET || key).update(scope + ':' + ip).digest('hex');
  let reservation;
  try {
    const res = await fetchImpl(`${env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1/rpc/security_claim_public_intake`, { method: 'POST', headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ p_scope: scope, p_identity: identity }), signal: AbortSignal.timeout(5000), redirect: 'error' });
    if (!res.ok) throw new Error(); reservation = await res.json();
  } catch { throw new IntakeError('Contact requests are temporarily unavailable.', 503); }
  if (reservation !== true) throw new IntakeError('Too many requests. Try again later.', 429);
  let verified;
  try {
    const res = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token }), signal: AbortSignal.timeout(5000), redirect: 'error' });
    if (!res.ok) throw new Error(); verified = await res.json();
  } catch { throw new IntakeError('Verification is temporarily unavailable.', 503); }
  if (verified.success !== true || verified.hostname !== new URL(origin).hostname || verified.action !== scope) throw new IntakeError('Verification failed.', 403);
}
