import test from 'node:test';import assert from 'node:assert/strict';import {Readable} from 'node:stream';
import Stripe from 'stripe';
import handler from '../api/webhook.js';
const stripe=new Stripe('sk_test_fixture');const secret='whsec_fixture';
function response(){return {code:0,body:null,setHeader(){},status(n){this.code=n;return this},json(v){this.body=v;return this}}}
function request(event,sig){const body=JSON.stringify(event);const req=Readable.from([body]);req.method='POST';req.headers={'stripe-signature':sig??stripe.webhooks.generateTestHeaderString({payload:body,secret})};return req;}
test('builder webhook accepts signed raw bytes only, validates paid amount, and calls durable RPC once per valid event',async()=>{
 const env={BILLING_ENABLED:'true',STRIPE_SECRET_KEY:'sk_test_fixture',STRIPE_WEBHOOK_SECRET:secret,SUPABASE_URL:'https://database.invalid',SUPABASE_SERVICE_KEY:'fixture'};const before=Object.fromEntries(Object.keys(env).map(k=>[k,process.env[k]]));Object.assign(process.env,env);const old=global.fetch;let calls=[];
 global.fetch=async(url,opts)=>{calls.push({url:String(url),body:JSON.parse(opts.body)});return new Response('true',{status:200,headers:{'content-type':'application/json'}})};
 try{
 const event={id:'evt_fixture',type:'checkout.session.completed',data:{object:{id:'cs_fixture',payment_status:'paid',mode:'payment',amount_total:199900,currency:'usd',payment_intent:'pi_fixture'}}};
 let res=response();await handler(request(event,'bad'),res);assert.equal(res.code,400);assert.equal(calls.length,0);
 res=response();await handler({...request(event),body:event},res);assert.equal(res.code,400);assert.equal(calls.length,0);
 res=response();await handler(request({...event,data:{object:{...event.data.object,amount_total:1}}}),res);assert.equal(res.code,400);assert.equal(calls.length,0);
 res=response();await handler(request(event),res);assert.equal(res.code,200);assert.equal(calls.length,1);assert.match(calls[0].url,/\/rpc\/complete_builder_checkout$/);assert.equal(calls[0].body.p_event_id,'evt_fixture');
 delete process.env.BILLING_ENABLED;res=response();await handler(request(event),res);assert.equal(res.code,503);assert.equal(calls.length,1);
 }finally{global.fetch=old;for(const[k,v]of Object.entries(before)){if(v===undefined)delete process.env[k];else process.env[k]=v}}
});
