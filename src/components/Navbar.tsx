import React from 'react';
import Link from 'next/link';

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full h-[60px] bg-slate-500  flex justify-around items-center z-50 shadow-md">
      {/* Dashboard Link */}
      <div>
        <Link href="/">
          <h1 className="text-xl font-semibold cursor-pointer">Dashboard</h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-16">
        {/* <Link href="/User">
          <p className="hover:text-gray-200 transition">User</p>
        </Link>
        <Link href="/Babu">
          <p className="hover:text-gray-200 transition">Babu</p>
        </Link>
        <Link href="/Admin">
          <p className="hover:text-gray-200 transition">Admin</p>
        </Link> */}
      </div>
    </div>
  );
}

export default Navbar;
