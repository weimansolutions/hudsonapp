// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard Aguas',
  description: 'Gestión de análisis y muestreos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex flex-1">
            {/* Sidebar más estrecho */}
            <div className="w-36 border-r bg-white">
              <Sidebar />
            </div>

            {/* Contenido centrado y con ancho máximo */}
            <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-[1600px] mx-auto w-full overflow-auto">
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
