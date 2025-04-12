import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { UserNavbar } from './UserNavbar';
import { FaUser, FaShoppingCart, FaClipboardList, FaMapMarkerAlt, FaPalette, FaSignOutAlt, FaBars, FaHeart } from "react-icons/fa";

export const UserSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className={`bg-gray-900 text-white w-64 min-h-screen fixed top-0 ${isSidebarOpen ? "left-0" : "-left-64"} transition-all duration-300 z-50`}>
        <div className="p-3.5 border-b border-gray-700 flex items-center justify-between">
          <Link to="/user/profile" className="flex items-center text-white text-lg font-semibold">
            USER  Dashboard
          </Link>
        </div>
        <nav className="mt-3">
          <ul className="space-y-2">
            <li>
              <Link to="profile" className="flex items-center px-4 py-3 hover:bg-gray-700 transition">
                <FaUser className="mr-3" /> Profile
              </Link>
            </li>
            <li>
              <Link to="viewaddress" className="flex items-center px-4 py-3 hover:bg-gray-700 transition">
                <FaMapMarkerAlt className="mr-3" /> My Address
              </Link>
            </li>
            <li>
              <Link to="address" className="flex items-center px-4 py-3 hover:bg-gray-700 transition">
                <FaMapMarkerAlt className="mr-3" /> Add Address
              </Link>
            </li>
            <li>
              <Link to="favourites" className="flex items-center px-4 py-3 hover:bg-gray-700 transition">
                <FaHeart className="mr-3 text-red-500" />
                Favourites
              </Link>
            </li>
            <li>
              <Link to="/orders" className="flex items-center px-4 py-3 hover:bg-gray-700 transition">
                <FaClipboardList className="mr-3" /> Orders
              </Link>
            </li>
            <li>
              <Link to="/cart" className="flex items-center px-4 py-3 hover:bg-gray-700 transition">
                <FaShoppingCart className="mr-3" /> Cart
              </Link>
            </li>
            <li>
              <button 
              // onClick={() => {
              //   //  localStorage.removeItem("id"); window.location.href = "/login"; 
              //   // Clear Redux states
              //   dispatch(clearCart());
              //   dispatch(clearWishlist());

              //   //localStorage.removeItem("token"); // Remove JWT token
              //   localStorage.removeItem("id"); // Remove user ID
              //   localStorage.removeItem("role"); // Remove user details
              //   localStorage.removeItem("cart");
              //   localStorage.removeItem("wishlist");
              //   sessionStorage.clear(); // Clear sessionStorage if used

              //   // Hard reload to reset persisted states and redirect
              //   window.location.href = "/login";
              //}} 
              className="w-full flex items-center px-4 py-3 hover:bg-red-600 transition text-left">
                <FaSignOutAlt className="mr-3" />
                <Link to="/logout">Logout</Link>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "pl-64" : "pl-0"}`}>
        <UserNavbar toggleSidebar={toggleSidebar} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
