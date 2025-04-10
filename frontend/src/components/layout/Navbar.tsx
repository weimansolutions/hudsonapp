'use client';

import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <header>
      {/* Barra superior */}
      <div className="bg-gray-800 text-white font-bold text-sm py-2 px-6 flex justify-between items-center">
        <span>HUDSON COCINA SA</span>

        <div className="space-x-4">
          <button className="text-white text-sm hover:underline">Get Support</button>
          <button className="text-white text-sm hover:underline">Contact Sales</button>
        </div>
      </div>

      {/* Barra principal */}
      <nav className="w-full px-6 py-3 flex justify-between items-center bg-white shadow-md">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/globe.svg" alt="HUDSON COCINA SA" width={25} height={5} />
        </Link>

        {/* Menú central */}
        <div className="space-x-6 text-gray-700 text-sm flex">
          <Link href="/stock" className="hover:text-black font-bold">Stock</Link>
          <Link href="/stockLogyser" className="hover:text-black font-bold">Stock Logyser</Link>
        </div>

        {/* Search y botones */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <button className="border border-gray-500 px-4 py-1 rounded-md text-gray-700 hover:bg-gray-100">
            Sign In
          </button>
          <button className="bg-gray-800 text-white px-4 py-1 rounded-md hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
