// /app/api/checkout-session/route.js

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51PMKqjAXHA9mvESMA2rKgs3qLWziaPDdFeoXfbgRbXykCcnNpswwQo3qUW1S6CjWyerujCVFwPpYyUO4SXdM4cSs00zyfWNiPd");

export async function POST(req) {
    const { amount, username } = await req.json();

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'cad',
                        product_data: {
                            name: 'Donation',
                        },
                        unit_amount: amount * 100, // amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            // success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            success_url: `${req.headers.get('origin')}/${username}?paymentdone=true?`,
            cancel_url: `${req.headers.get('origin')}/cancel`,
        });

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error('Error creating session:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
