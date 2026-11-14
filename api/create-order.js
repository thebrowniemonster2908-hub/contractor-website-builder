import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { IntakeError, checkedNodeBody, guardPublicIntake } from '../lib/public-intake-security.mjs';
import { validateOrder } from '../lib/order-validation.js';
export default async function handler(req, res) {
  res.setHeader('Cache-Control','no-store');
  if (req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' });
  try {
    const body=checkedNodeBody(req,32768);const input=validateOrder(body);
    if (process.env.BILLING_ENABLED !== 'true' || !process.env.STRIPE_SECRET_KEY || !process.env.SUPABASE_SERVICE_KEY) throw new IntakeError('Checkout is not available yet.',503);
    await guardPublicIntake(req,body,'contractor-builder');
    const origin=new URL(process.env.PUBLIC_SITE_ORIGIN).origin;
    if (!origin.startsWith('https://')) throw new IntakeError('Checkout is temporarily unavailable.',503);
    const sb=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_KEY);
    let { data:order,error }=await sb.from('orders').insert(input).select().single();
    if(error?.code==='23505') ({data:order,error}=await sb.from('orders').select('*').eq('submission_id',input.submission_id).single());
    if(error || !order) throw new IntakeError('Checkout is temporarily unavailable.',503);
    if(order.submission_hash!==input.submission_hash) throw new IntakeError('Submission ID already used for different details.',409);
    if(order.stripe_session_id) return res.status(200).json({sessionId:order.stripe_session_id,orderId:order.id});
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
    const session=await stripe.checkout.sessions.create({payment_method_types:['card'],line_items:[{price_data:{currency:'usd',product_data:{name:'Contractor Website Builder',description:`Professional website for ${input.business_name}`},unit_amount:199900},quantity:1}],mode:'payment',success_url:`${origin}/success?orderId=${encodeURIComponent(order.id)}`,cancel_url:`${origin}/checkout`,metadata:{orderId:String(order.id)}},{idempotencyKey:`builder-order-${order.id}`});
    const { error:updateError }=await sb.from('orders').update({stripe_session_id:session.id}).eq('id',order.id);
    if(updateError) throw new IntakeError('Checkout is temporarily unavailable.',503);
    return res.status(200).json({sessionId:session.id,orderId:order.id});
  } catch(error) { return res.status(error instanceof IntakeError?error.status:503).json({error:error instanceof IntakeError?error.message:'Checkout is temporarily unavailable.'}); }
}
