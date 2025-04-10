'use client';

import Link from 'next/link';
import { FaHome, FaUsers, FaFlask, FaChartBar, FaBoxes } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-36 bg-white border-r h-full py-6 px-4 shadow-sm hidden md:block">
      <nav className="flex flex-col gap-4 text-sm text-gray-700">
        <Link href="/" className="flex items-center gap-2 hover:text-black font-medium">
          <FaHome /> Dashboard
        </Link>

        <Link href="/stock" className="flex items-center gap-2 hover:text-black font-medium">
          <FaBoxes /> Stock
        </Link>

        <Link href="/usuarios" className="flex items-center gap-2 hover:text-black font-medium">
          <FaUsers /> Usuarios
        </Link>

        <Link href="/muestreos" className="flex items-center gap-2 hover:text-black font-medium">
          <FaFlask /> Muestreos
        </Link>

        <Link href="/reportes" className="flex items-center gap-2 hover:text-black font-medium">
          <FaChartBar /> Reportes
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
