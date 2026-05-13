import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-gray-200 py-4 h-screen min-w-50">
      <h2 className="text-xl font-bold mb-4 px-4 pointer-events-none">Sidebar</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/" className="text-gray-700 hover:bg-blue-100 hover:text-blue-500 rounded-md px-4 py-2 flex cursor-pointer w-full">
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/user-management"
            className="text-gray-700 hover:bg-blue-100 hover:text-blue-500 rounded-md px-4 py-2 flex cursor-pointer w-full"
          >
            User Management
          </Link>
        </li>
        <li>
          <Link
            href="/update-profile"
            className="text-gray-700 hover:bg-blue-100 hover:text-blue-500 rounded-md px-4 py-2 flex cursor-pointer w-full"
          >
            Update Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
