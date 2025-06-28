'use client';
import Link from 'next/link';
import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import Image from 'next/image';
import { FaGlobe } from 'react-icons/fa';
import tr from '../locales/tr';
import en from '../locales/en';
import ar from '../locales/ar';

export default function Header({ lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const locale = { tr, en, ar }[lang] || tr;
  const content = locale.header || {
    title: 'Elmas Yolculuğu',
    home: 'Ana Sayfa',
    menu: 'Sayfalar',
    hakkimizda: 'Hakkımızda',
    hizmetler: 'Hizmetler',
    iletisim: 'İletişim'
  };
  const localeHome = locale.home;

  // Language switcher for 3 languages
  const nextLang = lang === 'tr' ? 'en' : lang === 'en' ? 'ar' : 'tr';
  const langLabel = lang === 'tr' ? 'English' : lang === 'en' ? 'العربية' : 'Türkçe';

  const safeContent = content;

  const serviceLinks = [
    { slug: 'doviz-alim-satimi', label: localeHome.dovizAlimSatimi },
    { slug: 'western-union', label: localeHome.westernUnion },
    { slug: 'seyahat-biletleri', label: localeHome.seyahatBiletleri },
    { slug: 'oturma-izni-basvurulari', label: localeHome.oturmaIzniBasvurulari },
    { slug: 'otel-rezervasyonlari', label: localeHome.otelRezervasyonlari },
    { slug: 'gayrimenkul', label: localeHome.gayrimenkul },
  ];

  return (
    <header className="bg-white shadow-md py-2 px-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Image src="/diamond_wings.png" alt="Logo" width={80} height={80} />
        <Link href="/" className="text-2xl font-bold text-blue-700 hover:underline">
          {content.title}
        </Link>
      </div>
      <nav className="flex items-center gap-4">
        <Link href="/" className="text-blue-700 font-semibold hover:underline">{content.home}</Link>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1 text-blue-700 hover:text-blue-800 font-semibold"
          >
            {content.menu} <IoMdArrowDropdown />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-64 z-50 min-w-max">
              <Link href="/hakkimizda" className="block px-4 py-3 hover:bg-blue-50 text-blue-700 hover:text-blue-800 transition-colors duration-150 font-medium">{content.hakkimizda}</Link>
              <div className="border-t border-gray-100" />
              <button
                className="w-full text-left px-4 py-3 font-medium hover:bg-blue-50 flex items-center justify-between text-blue-700 hover:text-blue-800 transition-colors duration-150"
                onClick={() => setServicesOpen((v) => !v)}
              >
                <span>{content.hizmetler}</span>
                <IoMdArrowDropdown className={`ml-2 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="bg-gray-50 border-t border-gray-100">
                  {serviceLinks.map((s) => (
                    <Link key={s.slug} href={`/hizmetler/${s.slug}`} className="block px-6 py-2 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors duration-150 text-sm">
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
              <div className="border-t border-gray-100" />
              <Link href="/iletisim" className="block px-4 py-3 hover:bg-blue-50 text-blue-700 hover:text-blue-800 transition-colors duration-150 font-medium">{content.iletisim}</Link>
            </div>
          )}
        </div>
        <button
          onClick={() => setLang(nextLang)}
          className="flex items-center gap-2 text-sm font-semibold border-2 border-blue-700 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-700 transition-colors duration-150 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 z-10 group"
          style={{ minWidth: 90 }}
        >
          <FaGlobe className="text-blue-700 group-hover:text-white" />
          <span className="text-blue-700 group-hover:text-white">{langLabel}</span>
        </button>
      </nav>
    </header>
  );
}