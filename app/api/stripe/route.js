import connectDB from "@/db/connectDb";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe('sk_test_51PMKqjAXHA9mvESMA2rKgs3qLWziaPDdFeoXfbgRbXykCcnNpswwQo3qUW1S6CjWyerujCVFwPpYyUO4SXdM4cSs00zyfWNiPd')

const endpointSecret = ('whsec_73d21f2abdddb1bb40c989837da5c7678c17115e475971ccfd7c5426fc22ed8a')

export const POST = async (req) =>{
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)
    const sig = req.headers.get("stripe-signature")

    let p = await Payment.findOne({oid: body.id})
    if(!p){
        return NextResponse.json({success: false, message:"Order Id not found"})
    }

    try{
        let event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
        console.log("event", event.type)
        const updatedPayment = await Payment.findOneAndUpdate({oid: body.id}, {done:"true"}, {new: true})
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_PORT}/${updatedPayment.to_user}?paymentdone=true`)
    }   catch (err){
        console.error(err)
        return NextResponse.error("Payment Verification Failed")
    }
    
}