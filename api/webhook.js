import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Update order status
      await supabase
        .from('orders')
        .update({
          status: 'completed',
          paid_at: new Date(),
          stripe_payment_intent: session.payment_intent,
        })
        .eq('stripe_session_id', session.id);

      // Create website record
      const { data: order } = await supabase
        .from('orders')
        .select('*')
        .eq('stripe_session_id', session.id)
        .single();

      if (order) {
        await supabase.from('websites').insert([
          {
            order_id: order.id,
            business_name: order.business_name,
            template_id: order.template_id,
            data: {
              businessName: order.business_name,
              serviceType: order.service_type,
              phone: order.phone,
              email: order.email,
              address: order.address,
              tagline: order.tagline,
              ownerName: order.owner_name,
              ownerBio: order.owner_bio,
              ownerImage: order.owner_image,
              services: order.services,
              testimonials: order.testimonials,
            },
            deployed_at: new Date(),
            status: 'published',
          },
        ]);
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(400).json({ error: error.message });
  }
}
