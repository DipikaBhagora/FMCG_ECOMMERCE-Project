import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaBox, FaShoppingCart, FaUser, FaAngleLeft, FaAngleRight } from "react-icons/fa";

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
        <div className="flex justify-between items-center p-4">
          {isSidebarOpen && <h2 className="text-lg font-bold">VENDOR</h2>}
          <button onClick={toggleSidebar} className="text-white">
            {isSidebarOpen ? <FaAngleLeft /> : <FaAngleRight />}
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="p-2">
          <ul className="space-y-2">
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
      <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        <Outlet />
      </main>
    </div>
  );
};

