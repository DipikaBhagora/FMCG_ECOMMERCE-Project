import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const VendorNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between fixed w-full top-0 left-0 z-50">
      {/* Menu Button */}
      <button onClick={toggleSidebar} className="text-gray-700">
        <FaBars size={24} />
      </button>

      {/* Navbar Links */}
      <div className="hidden md:flex space-x-4">
        <a href="#" className="text-gray-700">Home</a>
        <a href="#" className="text-gray-700">Contact</a>
      </div>

      {/* Logout Button */}
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
        LOGOUT
      </button>
    </nav>
  );
};
