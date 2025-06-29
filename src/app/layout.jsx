import { Inter } from 'next/font/google';
import "./globals.css";
import Footer from '@/components/Footer';
import React from "react";
import { LocaleProvider } from '../context/LocaleContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased">
        <LocaleProvider>
          {children}
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
