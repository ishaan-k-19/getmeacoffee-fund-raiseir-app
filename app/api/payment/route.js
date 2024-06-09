import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import Payment from "@/models/Payment";

export async function POST (req){
    const stripe = new Stripe('sk_test_51PMMogAulClHGvROqEi2WHz7X3NxoEeKm5Nc64jUw8wyLmudrk9OPjeZkQKJ4vLkqmpRB93qiGfv8s1x1fzSbFfg00OhwLdO0c')
    let data = await req.json();
    let priceId = data.priceId
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1 
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000'
    })

    return NextResponse.json({url: session.url})
}