import React from 'react'

 

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
        <footer className='bg-black text-white flex px-4 h-20 items-center justify-center font-bold'>
            <p className="text-center">
            © {currentYear} Get Me a Coffee. All rights reserved.
            </p>
        </footer>
    </div>
  )
}

export default Footer
