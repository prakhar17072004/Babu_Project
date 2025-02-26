import React from 'react'

import Link from 'next/link';

function Navbar() {
  return (
     <div className='flex h-[60px]  bg-slate-500 justify-around cursor-pointer' >
        <div>
        <Link href='/'>
        <h1 className='text-xl font-semibold mt-4'>Dashboard</h1></Link>
        </div>
        <div className='flex   space-x-16 mt-4'>
        <Link href="/User">
              <p>User</p>
        </Link>
        <Link href="/Babu">
              <p>Babu</p>
        </Link>
        <Link href="/Admin">
              <p>Admin</p>
        </Link>
         
        </div>
         
     </div>
     
    
  )
}

export default Navbar;