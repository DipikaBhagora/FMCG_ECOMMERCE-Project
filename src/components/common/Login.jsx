import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="h-screen  bg-gradient-to-r from-blue-300 via-blue-500 to-purple-600   flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg flex overflow-hidden">
        
        {/* Left Section: Login Form */}
        <div className="w-2/5 flex flex-col justify-center items-center p-12">
          <h1 className="text-3xl font-extrabold text-gray-900">LOGIN</h1>
          <div className="mt-6 w-full max-w-sm">
            <input
              className="w-full px-6 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="email"
              placeholder="Email"
            />
            <input
              className="w-full px-6 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4"
              type="password"
              placeholder="Password"
            />
            <button className="mt-6 w-full bg-indigo-500 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy={7} r={4} />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              Sign In
            </button>
            <hr />
          </div>
       
            <p>
          Don't have an account?
          <Link to="/signup"  style={{textDecoration: "none"}}> Register</Link>
        </p>
           
        </div>

        {/* Right Section: Illustration */}
        <div className="w-3/5 hidden lg:flex justify-center items-center bg-indigo-100">
          <img
            src="src/assets/undraw_access-account_aydp.png"
            alt="Illustration"
            className="object-contain w-full h-full"
          />
        </div>

      </div>
    </div>
  );
};
