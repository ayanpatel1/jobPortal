


import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-10 shadow-lg">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Job<span className="text-yellow-300">Portal</span>
          </h2>
          <p className="text-gray-200">
            Connecting talent with opportunity. Your career journey starts here.
          </p>
          <div className="flex items-center gap-2 text-gray-200">
            <FaEnvelope className="text-yellow-300" />
            <span>contact@jobportal.com</span>
          </div>
          <div className="flex items-center gap-2 text-gray-200">
            <FaPhone className="text-yellow-300" />
            <span>+1 (555) 123-4567</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-yellow-300">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="/jobs" className="text-gray-200 hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                Browse Jobs
              </a>
            </li>
            <li>
              <a href="/companies" className="text-gray-200 hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                Companies
              </a>
            </li>
            <li>
              <a href="/about" className="text-gray-200 hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-200 hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-yellow-300">
            Resources
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="/blog" className="text-gray-200 hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                Career Blog
              </a>
            </li>
            <li>
              <a href="/resume-tips" className="text-gray-200 hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                Resume Tips
              </a>
            </li>
            <li>
              <a href="/interview-prep" className="text-gray-200 hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                Interview Prep
              </a>
            </li>
            <li>
              <a href="/faq" className="text-gray-200 hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Location */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-yellow-300">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a href="#" className="bg-blue-500 p-2 rounded-full hover:bg-yellow-300 hover:text-blue-600 transition-colors duration-300">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="bg-blue-500 p-2 rounded-full hover:bg-yellow-300 hover:text-blue-600 transition-colors duration-300">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="bg-blue-500 p-2 rounded-full hover:bg-yellow-300 hover:text-blue-600 transition-colors duration-300">
                <FaLinkedin size={18} />
              </a>
              <a href="#" className="bg-blue-500 p-2 rounded-full hover:bg-yellow-300 hover:text-blue-600 transition-colors duration-300">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
          <div className="flex items-start gap-2 text-gray-200">
            <IoLocationSharp className="text-yellow-300 mt-1" size={18} />
            <span>123 Career Lane, Tech City, TC 10001</span>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="text-center text-sm text-gray-300 border-t border-blue-500 mt-10 pt-6">
        &copy; {new Date().getFullYear()} JobPortal. All rights reserved. | 
        <a href="/privacy" className="hover:text-yellow-300 transition-colors duration-200 ml-2">Privacy Policy</a> | 
        <a href="/terms" className="hover:text-yellow-300 transition-colors duration-200 ml-2">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;