import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const content = {
  tr: {
    contact: 'İletişim',
    email: 'E-posta',
    address: 'Adres',
    phone: '+90 5388392520',
    emailValue: 'info@elmasyolculugu.com',
    addressValue: 'Elmas yolculuğu(Almasa), Cumhuriyet, Lozan Cd. No:18, 55200 Atakum/Samsun',
    support: 'Müşteri Desteği.',
    copyright: 'Elmas Yolculuğu.'
  },
  ar: {
    contact: 'اتصال',
    email: 'البريد الإلكتروني',
    address: 'العنوان',
    phone: '+90 5388392520',
    emailValue: 'info@elmasyolculugu.com',
    addressValue: 'ألماس يولجولو (ألماسا)، جمهورية، شارع لوزان رقم:18، 55200 أتاكوم/سامسون',
    support: 'دعم العملاء.',
    copyright: 'ألماس يولجولو.'
  }
};

function getLang() {
  if (typeof document !== 'undefined') {
    const htmlLang = document.documentElement.lang;
    if (htmlLang === 'ar') return 'ar';
  }
  return 'tr';
}

export default function Footer() {
  const lang = getLang();
  const t = content[lang];
  return (
    <footer className="bg-blue-700 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-2">{t.contact}</h4>
            <p>{t.phone}</p>
            <div className="flex justify-center mt-2 gap-4">
              <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-3xl text-pink-500 hover:text-pink-600">
                <FaInstagram />
              </a>
              <a href="https://wa.me/905388392520" target="_blank" rel="noopener noreferrer" className="text-3xl text-green-500 hover:text-green-600">
                <FaWhatsapp />
              </a>
            </div>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-2">{t.email}</h4>
            <p>{t.emailValue}</p>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-2">{t.address}</h4>
            <p>{t.addressValue}</p>
          </div>
        </div>
        <div className="text-center mt-6 text-sm">
          © {new Date().getFullYear()} {t.copyright} {t.support}
        </div>
      </div>
    </footer>
  );
} 