"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'


const Navbar = () => {
  const [showdropdown, setShowdropdown] = useState(false)

  const { data: session } = useSession()
  if (session) {
  }
  

  return (
    <nav className='bg-black text-white flex justify-between px-4 md:h-[70px] items-center flex-col md:flex-row'>
      <div className="logo font-bold text-xl my-6 md:my-0">
          <Link href={"/"}>
            <div className="flex items-center">
            <span>GetMeACoffee</span>
            <img width={50} height={50} src="coffee.gif" alt="coffee gif" />
            </div>
          </Link>
      </div>
      <div className='relative flex flex-col gap-4 md:block items-center'>
        {session && <><button onClick={()=>setShowdropdown(!showdropdown)} onBlur={()=>{setTimeout(()=>{setShowdropdown(false)},300)}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
        </button>
          <div id="dropdown" className={`z-10 ${showdropdown?"block":"hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute left-[125px]`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:text-base">Dashboard</Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:text-base">Your Page</Link>
              </li>
              <li>
                <Link href="#" onClick={() => signOut()} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:text-base">Sign out</Link>
              </li>
            </ul>
          </div>
        </>
        } 
        {session && <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-3/4 md:w-[20%]" onClick={() => signOut()}>Logout</button>}
        
        {!session && <Link href={"/login"}>
          <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">Login</button>
        </Link>}
      </div>

    </nav>
  )
}

export default Navbar