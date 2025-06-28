'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="p-4 fixed top-4 left-4 z-50 bg-blue-500 text-white rounded"
        onClick={() => setOpen(!open)}
      >
        Menü
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl p-6 z-40 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col space-y-4 text-lg font-medium">
          <Link href="/">Ana Sayfa</Link>
          <Link href="/bize-ulasin">Bize Ulaşın</Link>
          <Link href="/dil-degistir">Dil Değiştir</Link>
          <Link href="/hakkimizda">Hakkımızda</Link>
          <Link href="/hizmetler">Hizmetler</Link>
        </nav>

        <div className="absolute bottom-6 left-6 flex space-x-4 text-2xl">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://wa.me/901234567890" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </>
  );
}
