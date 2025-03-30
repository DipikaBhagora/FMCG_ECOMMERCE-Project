import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { VendorNavbar } from "./VendorNavbar";
import { FaBox, FaShoppingCart, FaUser, FaAngleLeft, FaAngleRight, FaHome } from "react-icons/fa";

export const VendorSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white shadow-lg transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Sidebar Header */}
        {/* <div className="flex justify-between items-center p-4"> */}
        <div className="flex flex-col p-3.5 border-b border-gray-600">
          {isSidebarOpen && <h2 className="text-lg font-bold">VENDOR  Dashboard</h2>}
          {/* <button onClick={toggleSidebar} className="text-white">
            {isSidebarOpen ? <FaAngleLeft /> : <FaAngleRight />}
          </button> */}
        </div>

        {/* Sidebar Links */}
        <nav className="p-2 mt-4">
          <ul className="space-y-2">
          <li>
              <Link
                to="/"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
              >
                <FaHome />
                {isSidebarOpen && "FMCG Home"}
              </Link>
            </li>
            <li>
              <Link
                to="addproduct"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
              >
                <FaShoppingCart />
                {isSidebarOpen && "Add Product"}
              </Link>
            </li>
            <li>
              <Link
                to="myproducts"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
              >
                <FaBox />
                {isSidebarOpen && "My Products"}
              </Link>
            </li>
            <li>
              <Link
                to="profile"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
              >
                <FaUser />
                {isSidebarOpen && "Profile"}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      {/* <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        <Outlet /> */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "pl-64" : "pl-0"}`}>
                <VendorNavbar toggleSidebar={toggleSidebar} />
                <main className="p-6">
                  <Outlet />
      </main>
    </div>
    </div>
  );
};

