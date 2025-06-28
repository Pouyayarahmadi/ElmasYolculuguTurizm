'use client';
import { Inter } from 'next/font/google';
import "./globals.css";
import Footer from '@/components/Footer';
import React from "react";
import { LocaleProvider, useLocale } from '../context/LocaleContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

function LanguageSwitcher() {
  const { lang, setLang } = useLocale();
  return (
    <div className="flex justify-end gap-2 p-4">
      <button onClick={() => setLang('tr')} className={`px-3 py-1 rounded ${lang === 'tr' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>TR</button>
      <button onClick={() => setLang('en')} className={`px-3 py-1 rounded ${lang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>EN</button>
      <button onClick={() => setLang('ar')} className={`px-3 py-1 rounded ${lang === 'ar' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>AR</button>
    </div>
  );
}

export default function RootLayout({ children }) {
  // Accept a prop to control footer visibility
  const showFooter = !Array.isArray(children)
    ? !(children && children.props && children.props['data-intro'])
    : !children.some(child => child && child.props && child.props['data-intro']);
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased">
        <LocaleProvider>
          {children}
          {showFooter && <Footer />}
        </LocaleProvider>
      </body>
    </html>
  );
}
