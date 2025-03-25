import React from 'react';
import Link from 'next/link';
import Location from './Location';
import { Button } from './ui/button';



function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full h-[60px] bg-slate-500 flex items-center justify-between px-8 z-50 shadow-md">
      {/* Dashboard Link (Left) */}
      <Link href="/">
        <h1 className="text-2xl font-semibold cursor-pointer  text-white">Dashboard</h1>
      </Link>

      {/* Centered Location and Buttons */}
      <div className="flex items-center space-x-2">
        <Location />
        <div className="flex space-x-4">
          {/* <Link href="/loginform">
          <Button className="bg-green-500 text-white transition-all duration-500 transform hover:bg-green-600 hover:scale-110">
            Log In
          </Button>
          </Link> */}
          <Link href="/Getstart">
          <Button className="bg-blue-500 text-white transition-all duration-500 transform hover:bg-blue-600 hover:scale-110">
            Get Started
          </Button>
          </Link>
          
          
        </div>
      </div>
      
    </div>
  );
}

export default Navbar;
