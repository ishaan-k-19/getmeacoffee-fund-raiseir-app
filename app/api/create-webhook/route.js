// /app/api/create-webhook/route.js

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import connectDB from '@/db/connectDb';
import User from '@/models/User';

export async function POST(req) {
  await connectDB();

  const { userId, key } = await req.json();

  const stripe = new Stripe(key);

  try {
    const webhookEndpoint = await stripe.webhookEndpoints.create({
      url: `http://localhost:3000/api/stripe-webhook`,
      enabled_events: [
        'checkout.session.completed',
        // Add other events as needed
      ],
    });

    // Store the webhook secret in the database
    await User.findOne({username: userId}, {
        stripewebhook: webhookEndpoint.secret,
    });
    let a = await updateProfile(e, session.user.name)

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating webhook endpoint:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
