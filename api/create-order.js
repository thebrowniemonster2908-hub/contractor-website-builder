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

  try {
    const {
      businessName,
      serviceType,
      phone,
      email,
      address,
      tagline,
      ownerName,
      ownerBio,
      ownerImage,
      services,
      testimonials,
      templateId
    } = req.body;

    // Create order in Supabase
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          business_name: businessName,
          service_type: serviceType,
          phone,
          email,
          address,
          tagline,
          owner_name: ownerName,
          owner_bio: ownerBio,
          owner_image: ownerImage,
          services: services,
          testimonials: testimonials,
          template_id: templateId,
          status: 'pending',
          price: 1999,
          created_at: new Date()
        }
      ])
      .select();

    if (orderError) throw orderError;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Contractor Website Builder',
              description: `Professional website for ${businessName}`,
            },
            unit_amount: 199900, // $1,999.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?orderId=${order[0].id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      metadata: {
        orderId: order[0].id,
        businessName: businessName,
      },
    });

    // Update order with Stripe session ID
    await supabase
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order[0].id);

    return res.status(200).json({
      sessionId: session.id,
      orderId: order[0].id,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: error.message });
  }
}
