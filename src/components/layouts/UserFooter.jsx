import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const UserFooter = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-16">
    <div className="container mx-auto px-8 flex flex-col items-center">
      <div className="flex justify-center gap-6 mb-6">
        <a href="https://facebook.com" className="hover:text-blue-300">
          <FaFacebook size={24} />
        </a>
        <a href="https://twitter.com" className="hover:text-blue-300">
          <FaTwitter size={24} />
        </a>
        <a href="https://instagram.com" className="hover:text-blue-300">
          <FaInstagram size={24} />
        </a>
        <a href="https://linkedin.com" className="hover:text-blue-300">
          <FaLinkedin size={24} />
        </a>
      </div>
      <div className="text-center mb-4">
        <p>&copy; {new Date().getFullYear()} FMCG Hub. All rights reserved.</p>
      </div>
      <div className="flex justify-center gap-6">
        <Link to="/about" className="text-sm hover:text-blue-300">About Us</Link>
        <Link to="/contact" className="text-sm hover:text-blue-300">Contact</Link>
        <Link to="/privacy" className="text-sm hover:text-blue-300">Privacy Policy</Link>
      </div>
    </div>
  </footer>
  )
}
