import React from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-blue-300 via-blue-500 to-purple-600 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg flex overflow-hidden h-[75vh]">
        
        {/* Left Section: Signup Form */}
        <div className="w-2/5 flex flex-col justify-center items-center p-8 h-full">
          <h1 className="text-2xl font-extrabold text-gray-900">SIGN UP</h1>
          <div className="mt-4 w-full max-w-xs">
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              placeholder="First Name"
            />
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-3"
              type="text"
              placeholder="Last Name"
            />
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-3"
              type="number"
              placeholder="Age"
            />
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-3"
              type="email"
              placeholder="Email"
            />
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-3"
              type="password"
              placeholder="Password"
            />
             <input
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-3"
              type="password"
              placeholder="Confirm Password"
            />
            <button className="mt-5 w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center">
              Sign Up
            </button>
            <hr />
          </div>
          <p>
          Already have an account?
          <Link to="/login" style={{textDecoration: "none"}}> Sign in</Link>
        </p>
        </div>

        {/* Right Section: Illustration */}
        <div className="w-3/5 hidden md:flex justify-center items-center p-4 h-full">
          <img
            src="src/assets/undraw_completed_0sqh.png"
            alt="Illustration"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
