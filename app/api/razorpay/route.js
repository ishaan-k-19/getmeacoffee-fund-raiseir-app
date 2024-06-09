import { NextResponse } from "next/server";
import {validatePaymentVerification} from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

const stripe = require('stripe')('sk_test_51PMMogAulClHGvROqEi2WHz7X3NxoEeKm5Nc64jUw8wyLmudrk9OPjeZkQKJ4vLkqmpRB93qiGfv8s1x1fzSbFfg00OhwLdO0c');

export const POST = async (req) =>{
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)
    

    let p = await Payment.findOne({oid: body.razorpay_order_id})
    if(!p){
        return NextResponse.json({success: false, message:"Order Id not found"})
    }
    // fetch the secret of the user who is getting payment
    let user = await User.findOne({username: p.to_user})
    const secret = user.razorpaysecret

    // Verify tge payment
    let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature, secret)

    if(xx){
        const updatedPayment = await Payment.findOneAndUpdate({oid: body.razorpay_order_id}, {done:"true"}, {new: true})
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_PORT}/${updatedPayment.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.error("Payment Verification Failed")
    }
}