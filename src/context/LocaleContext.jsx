'use client';
import { createContext, useContext, useState } from 'react';
import tr from '../locales/tr';
import en from '../locales/en';
import ar from '../locales/ar';

const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [lang, setLang] = useState('tr');
  
  // Get the content based on the selected language
  const getContent = () => {
    switch (lang) {
      case 'en':
        return en;
      case 'ar':
        return ar;
      default:
        return tr;
    }
  };

  const content = getContent();

  return (
    <LocaleContext.Provider value={{ lang, setLang, content }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
} 