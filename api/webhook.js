import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
export const config={api:{bodyParser:false}};
async function rawBody(req) {
  if(Buffer.isBuffer(req.body)) { if(req.body.length>65536) throw new Error('body_limit');return req.body; }
  if(Buffer.isBuffer(req.rawBody)) { if(req.rawBody.length>65536) throw new Error('body_limit');return req.rawBody; }
  if(req.body && typeof req.body==='object') throw new Error('raw_body_required');
  const chunks=[];let length=0;
  for await(const chunk of req) { const data=Buffer.from(chunk);length+=data.length;if(length>65536) throw new Error('body_limit');chunks.push(data); }
  return Buffer.concat(chunks);
}
export default async function handler(req,res) {
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  if(process.env.BILLING_ENABLED!=='true' || !process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) return res.status(503).json({error:'Checkout is not available yet.'});
  let event;
  try { event=new Stripe(process.env.STRIPE_SECRET_KEY).webhooks.constructEvent(await rawBody(req),req.headers['stripe-signature'],process.env.STRIPE_WEBHOOK_SECRET); }
  catch { return res.status(400).json({error:'Invalid webhook'}); }
  if(event.type!=='checkout.session.completed') return res.status(200).json({received:true});
  const session=event.data.object;
  if(session.payment_status!=='paid' || session.mode!=='payment' || session.amount_total!==199900 || session.currency!=='usd') return res.status(400).json({error:'Unexpected payment'});
  const sb=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_KEY);
  const {data,error}=await sb.rpc('complete_builder_checkout',{p_event_id:event.id,p_session_id:session.id,p_payment_intent:typeof session.payment_intent==='string'?session.payment_intent:session.payment_intent?.id});
  if(error || data!==true) return res.status(503).json({error:'Payment reconciliation is temporarily unavailable.'});
  return res.status(200).json({received:true});
}
