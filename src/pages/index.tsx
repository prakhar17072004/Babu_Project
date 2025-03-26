

import Navbar from "@/components/Navbar";
import Link from 'next/link';
import Location from '@/components/Location';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
    <Navbar/>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <Link href="/Getstart">
          <Button className='bg-green-800'>Getstarted</Button>
        </Link>
        {/* <p className="text-lg mb-8">
          Manage records for Users,Babus and Admin.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <Link
            href="/User"
            className="bg-white shadow-lg rounded-lg p-6 transition transform hover:scale-105 hover:bg-blue-100"
          >
            <h2 className="text-2xl font-semibold mb-2">Users &rarr;</h2>
            <p>View and manage user records.</p>
          </Link>
          <Link
            href="/Babu"
            className="bg-white shadow-lg rounded-lg p-6 transition transform hover:scale-105 hover:bg-blue-100"
          >
            <h2 className="text-2xl font-semibold mb-2">Babus &rarr;</h2>
            <p>View and manage babu records.</p>
          </Link>
          <Link
            href="/Admin"
            className="bg-white shadow-lg rounded-lg p-6 transition transform hover:scale-105 hover:bg-blue-100"
          >
            <h2 className="text-2xl font-semibold mb-2">Admin &rarr;</h2>
            <p>View and manage admin records.</p>
          </Link>
        </div> */}
      </div>
    
    </>
  );
}
