// components/Profile.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { users } from '@/app/db/schema';

function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Simulate fetching user data from a database or API
    const fetchUserData = async () => {
      try {
        // Replace this with your actual data fetching logic
        const response = await fetch('/api/getAll'); // Assuming you have an API endpoint
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
          // Handle error (e.g., set default user data or display an error message)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error
      }
    };

    fetchUserData();
  }, []); // Run only once on component mount

  if (!userData) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          src={userData || "/placeholder-profile.png"} // Use fetched profile picture or placeholder
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-white">{users.first_name || 'User Name'}</span> {/* Use fetched name or default */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profile
            </Link>
            <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Settings
            </Link>
            <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;