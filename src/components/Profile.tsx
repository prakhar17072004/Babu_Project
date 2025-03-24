// components/Profile.js
import React, { useState } from 'react';
import Link from 'next/link';

function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          src="/placeholder-profile.png"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-white">User Name</span>
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