import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { AdminNavbar } from './AdminNavbar';
import { FaUserShield, FaBoxOpen, FaClipboardList, FaUsers, FaTags, FaSignOutAlt, FaBars, FaChartBar } from "react-icons/fa";

export const AdminSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className={`bg-gray-900 text-white w-64 min-h-screen fixed top-0 ${isSidebarOpen ? "left-0" : "-left-64"} transition-all duration-300 z-50`}>
        <div className="p-3.5 border-b border-gray-700 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center text-white text-lg font-semibold">
            ADMIN Dashboard
          </Link>
        </div>
        <nav className="mt-3">
          <ul className="space-y-2">
            <li>
              <Link to="dashboard" className="flex items-center px-4 py-3 hover:bg-gray-700 transition">
                <FaChartBar className="mr-3" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="manageusers" className="flex items-center px-4 py-3 hover:bg-gray-700 transition">
                <FaUsers className="mr-3" /> Manage Users
              </Link>
            </li>
            <li>
              <Link to="manageproducts" className="flex items-center px-4 py-3 hover:bg-gray-700 transition">
                <FaBoxOpen className="mr-3" /> Manage Products
              </Link>
            </li>
            <li>
              <Link to="manageorders" className="flex items-center px-4 py-3 hover:bg-gray-700 transition">
                <FaClipboardList className="mr-3" /> Manage Orders
              </Link>
            </li>
            <li>
              <Link to="managecategory" className="flex items-center px-4 py-3 hover:bg-gray-700 transition">
                <FaTags className="mr-3" />Manage Categories
              </Link>
            </li>
            <li>
              <Link to="profile" className="flex items-center px-4 py-3 hover:bg-gray-700 transition">
                <FaUserShield className="mr-3" /> Profile
              </Link>
            </li>
            <li>
              <Link to="/logout" className="flex items-center px-4 py-3 hover:bg-red-600 transition w-full text-left">
                <FaSignOutAlt className="mr-3" />
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "pl-64" : "pl-0"}`}>
        <AdminNavbar toggleSidebar={toggleSidebar} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
