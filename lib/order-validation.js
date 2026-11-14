import { createHash } from 'node:crypto';
import { IntakeError, text, email } from './public-intake-security.mjs';
export function validateOrder(body) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.submissionId || '')) throw new IntakeError('Invalid submission ID.');
  const image = text(body.ownerImage, 2048, false);
  if (image) { try { if (new URL(image).protocol !== 'https:') throw new Error(); } catch { throw new IntakeError('Invalid image URL.'); } }
  const list = (value, maximum, mapper) => { if (!Array.isArray(value) || value.length > maximum) throw new IntakeError('Invalid list.'); return value.map(mapper); };
  const result = { business_name: text(body.businessName,120), service_type: text(body.serviceType,80), phone:text(body.phone,40),email:email(body.email),address:text(body.address,300),tagline:text(body.tagline,240,false),owner_name:text(body.ownerName,100),owner_bio:text(body.ownerBio,2000,false),owner_image:image,
    services:list(body.services,20,v => typeof v === 'string' ? text(v,200) : ({ name:text(v?.name,120), desc:text(v?.desc,1000,false) })),
    testimonials:list(body.testimonials,20,v => ({ name:text(v?.name,100), text:text(v?.text,1000), rating:Number.isInteger(v?.rating) && v.rating>=1 && v.rating<=5 ? v.rating : 5 })),
    template_id:text(String(body.templateId ?? ''),80),status:'pending',price:1999 };
  return { ...result, submission_id:body.submissionId, submission_hash:createHash('sha256').update(JSON.stringify(result)).digest('hex') };
}
