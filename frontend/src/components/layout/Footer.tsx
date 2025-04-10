'use client';

import Link from 'next/link';
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaRss,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 py-6 px-8 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto gap-4">
        {/* Redes sociales */}
        <div className="flex space-x-4 text-gray-800">
          <FaTwitter className="text-2xl cursor-pointer hover:text-gray-800" />
          <FaLinkedin className="text-2xl cursor-pointer hover:text-gray-800" />
          <FaInstagram className="text-2xl cursor-pointer hover:text-gray-800" />
          <FaYoutube className="text-2xl cursor-pointer hover:text-gray-800" />
          <FaFacebook className="text-2xl cursor-pointer hover:text-gray-800" />
          <FaRss className="text-2xl cursor-pointer hover:text-gray-800" />
        </div>

        {/* Copyright */}
        <div className="text-gray-600 text-sm text-center md:text-left">
          © 2025 Meeting Tracker. All rights reserved |
          <Link href="/" className="ml-2 hover:underline text-black">Terms of Service</Link> |
          <Link href="/" className="ml-2 hover:underline text-black">Privacy</Link> |
          <Link href="/" className="ml-2 hover:underline text-black">Legal</Link>
        </div>

        {/* Botón de cookies */}
        <button className="border border-gray-800 text-gray-800 px-4 py-1 rounded-md hover:bg-black hover:text-white text-sm">
          Cookies Settings
        </button>
      </div>
    </footer>
  );
};

export default Footer;
