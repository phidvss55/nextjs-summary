import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-gray-200 p-4 h-screen min-w-[200px]">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href="/"
            className="text-gray-700 hover:text-orange-500 hover:bg-orange-100 rounded-md px-2 py-2 flex cursor-pointer w-full"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/user-management"
            className="text-gray-700 hover:text-orange-500 hover:bg-orange-100 rounded-md px-2 py-2 flex cursor-pointer w-full"
          >
            User Management
          </Link>
        </li>
        <li>
          <Link
            href="/update-profile"
            className="text-gray-700 hover:text-orange-500 hover:bg-orange-100 rounded-md px-2 py-2 flex cursor-pointer w-full"
          >
            Update Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
