"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {

    const [paymentform, setpaymentform] = useState({name:'', message:'', amount:''})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
      if(searchParams.get("paymentdone")=="true"){
        toast('Thanks for the Donation!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
      }
      router.push(`/${username}`)
    }, [])
    

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbPayments = await fetchpayments(username)
        setPayments(dbPayments)
    }


    const pay = async (amount) => {

        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, 
            "currency": "CAD",
            "name": "Get Me A Coffee", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_PORT}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="cover w-full bg-red-50 relative flex justify-center">
                <img
                    className="object-cover w-full h-[400px]"
                    src={currentUser.coverpic}
                    alt=""
                />
                <div className="absolute -bottom-14">
                    <img
                        className="rounded-2xl border-2 border-white"
                        width={120}
                        height={120}
                        src={currentUser.profilepic}
                        alt=""
                    />
                </div>
            </div>
            <div className="info flex flex-col justify-center items-center my-16">
                <div className="font-bold">@{username}</div>
                <div className="text-slate-400">let's help {currentUser.name} to get a coffee!</div>
                <div className="text-slate-400">
                    {payments.length} Payments . ${payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>
                <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
                    {/* Show list of all the supporters as a leaderboard */}
                    <div className="supporters md:w-1/2 w-full bg-neutral-800 rounded-lg p-10">
                        <h2 className="text-xl font-bold my-5">Top 10 Supporters</h2>
                        <ul className="mx-5 text-lg">
                            {payments.length == 0 && <li className='text-center my-24'>No payments yet</li>}
                            {payments.map((p, i) => {
                                return <li className="my-4 flex gap-2 items-center">
                                    <img width={30} src="avatar.gif" alt="user avatar" />
                                    <span>{p.name} <span className="font-bold"> ${p.amount} </span><br /><span className="text-orange-500 font-semibold">{p.message}</span>
                                    </span>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className="makepayment md:w-1/2 w-full bg-neutral-800 rounded-lg p-10">
                        <h2 className="text-xl font-bold my-5">Make a payment</h2>
                        <div className="flex flex-col gap-2">
                            <input onChange={handleChange} type="text" className="w-full p-3 rounded-lg bg-neutral-600" placeholder="Enter Name" value={paymentform.name} name='name' />
                            <input onChange={handleChange} type="text" className="w-full p-3 rounded-lg bg-neutral-600" placeholder="Enter Message" value={paymentform.message} name='message' />
                            <input onChange={handleChange} type="number" className="w-full p-3 rounded-lg bg-neutral-600" placeholder="Enter Amount" value={paymentform.amount} name='amount' />
                            <button type="button" onClick={() => pay(paymentform.amount * 100)} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2 disabled:from-slate-300 disabled:to-neutral-600 w-full" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button>
                        </div>
                        <div className="flex gap-2 mt-5 flex-col md:flex-row">
                            <button className="bg-neutral-800 border-2 border-lime-400 p-3 rounded-lg hover:bg-lime-500" onClick={() => pay(1000)}>Pay $10</button>
                            <button className="bg-neutral-800 border-2 border-yellow-400 p-3 rounded-lg hover:bg-yellow-500" onClick={() => pay(2000)}>Pay $20</button>
                            <button className="bg-neutral-800 border-2 border-blue-300 p-3 rounded-lg hover:bg-blue-400" onClick={() => pay(3000)}>Pay $30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default PaymentPage
