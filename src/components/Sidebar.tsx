// ProfileSidebar.tsx
import React from 'react';
import { useRouter } from 'next/navigation';

const ProfileSidebar: React.FC = () => {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  const handleSetting = () => {
    router.push('/settings');
  };

  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-4 z-50">
      <div className="flex flex-col items-center mt-10">
        <img
          src="https://via.placeholder.com/150" // Replace with user's profile picture
          alt="Profile"
          className="rounded-full w-24 h-24 mb-4"
        />
        <h2 className="text-lg font-semibold">{user.email || 'Guest'}</h2>
        <p className="text-sm text-gray-600">{user.role || 'Unknown Role'}</p>
      </div>

      <nav className="mt-8">
        <ul className="space-y-2">
          <li>
            <button onClick={handleProfile} className="block w-full text-left p-2 hover:bg-gray-100 rounded">
              Profile
            </button>
          </li>
          <li>
            <button onClick={handleSetting} className="block w-full text-left p-2 hover:bg-gray-100 rounded">
              Settings
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className="block w-full text-left p-2 hover:bg-gray-100 rounded">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProfileSidebar;