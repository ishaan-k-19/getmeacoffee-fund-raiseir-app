"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from "@/actions/useractions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [form, setform] = useState({})
  const [key, setKey] = useState()
  

  useEffect(() => {
    document.title = "Dashboard - Get Me A Chai"
    if (!session) {
      router.push('/login')
    }
    getData()
  }, [router, session])

  const getData = async () => {
    let u = await fetchuser(session.user.name)
    setform(u)
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
    if (e.target.name === 'stripesecret') {
      setKey(e.target.value);
    }
  }

  const handleSubmit = async (e) => {
    let a = await updateProfile(e, session.user.name)
      const userId = session.user.name;
      const webhookResponse = await fetch('http://localhost:3000/api/create-webhook/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, key}),
      });

      if (!webhookResponse.ok) {
        const text = await webhookResponse.text();
        throw new Error(`Error: ${webhookResponse.status} - ${text}`);
      }
      alert('User registered and webhook created successfully');
      toast('Profile updated!', {
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
      <div className="container mx-auto py-5 px-6">
      <h1 className="text-3xl font-bold text-center my-8">Welcome to your Dashboard</h1>
      <form className="max-w-2xl mx-auto" action={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
            Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder=""
            value={form.name ? form.name : ""}
            name="name"
            required
            />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
            Email
          </label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder=""
            value={form.email ? form.email : ""}
            name="email"
            required
            />
        </div>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
            Username
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="username"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder=""
            value={form.username ? form.username : ""}
            name="username"
            required
            />
        </div>
        <div className="mb-5">
          <label
            htmlFor="profilepic"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
            Profile Picture
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="profilepic"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder=""
            value={form.profilepic ? form.profilepic : ""}
            name="profilepic"
            required
            />
        </div>
        <div className="mb-5">
          <label
            htmlFor="coverpic"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
            Cover Picture
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="coverpic"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder=""
            value={form.coverpic ? form.coverpic : ""}
            name="coverpic"
            required
            />
        </div>
        <div className="mb-5">
          <label
            htmlFor="razorpayid"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
            Razorpay Id
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="stripeid"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder=""
            value={form.stripeid ? form.stripeid : ""}
            name="stripeid"
            required
            />
        </div>
        <div className="mb-5">
          <label
            htmlFor="rozorpaysecret"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
            Razorpay Secret
          </label>
          <input
            onChange={handleChange}
            type="password"
            id="stripesecret"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder=""
            value={form.stripesecret ? form.stripesecret : ""}
            name="stripesecret"
            required
            />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
          >
          Save
        </button>
      </form>
    </div>
    </>
  );
};


export default Dashboard;
