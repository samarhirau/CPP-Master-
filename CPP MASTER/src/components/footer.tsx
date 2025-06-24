import React from 'react';
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';

export function Footer()  {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900  py-8 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold ">CPP Master</h2>
          <p className="mt-2 text-sm ">
            Learn C++ from basics to advanced with real-world examples and practice problems.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold  mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/about" className="hover:text-blue-600">About Us</a></li>
            <li><a href="/courses" className="hover:text-blue-600">Courses</a></li>
            <li><a href="/practice" className="hover:text-blue-600">Practice</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-md font-semibold text-gray-900 mb-2">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              <FaLinkedin size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CPP Master. All rights reserved.
        <br />
            Built with <span className="text-red-500">♥</span> by <a href="https://portfolio2025-wine.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Samar Hirau</a>
      </div>
    </footer>
  );
};


