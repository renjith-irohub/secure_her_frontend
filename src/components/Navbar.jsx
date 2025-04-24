import React from "react";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      {/* Main Header Section */}
      <div className="bg-gray-900 text-white py-3 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo and Brand Name */}
          <div className="flex items-center space-x-3">
            <img src="images/logo.png" alt="Logo" className="h-12" />
            <h1 className="text-2xl md:text-3xl font-bold text-white-400">SecureHer</h1>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-white hover:text-blue-400">Home</a>
            <a href="/about" className="text-white hover:text-blue-400">About</a>
            <a href="/services" className="text-white hover:text-blue-400">Services</a>
          </nav>
          
          {/* Get Started Button */}
          <div className="hidden md:flex items-center">
            <a href="/login" className="bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600">Get Started</a>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white text-2xl">
            <FaBars />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
