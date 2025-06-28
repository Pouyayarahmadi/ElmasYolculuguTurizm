'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Image from 'next/image';
import { useLocale } from '@/context/LocaleContext';

export default function WesternUnionPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const { lang, setLang, content } = useLocale();
  
  // Add safety check for content
  if (!content || !content.home || !content.servicesDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Header lang={lang} setLang={setLang} />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  const detail = content.servicesDetail?.westernUnion || {
    paragraphs: [
      "Western Union ile dünyanın her yerine hızlı, güvenli ve kolay para transferi yapabilirsiniz.",
      "Elmas Yolculuğu Turizm olarak, Western Union işbirliği ile yurt dışına ve yurt dışından para gönderme/alma işlemlerinizde yanınızdayız.",
      "Dakikalar içinde 200'den fazla ülke ve bölgedeki binlerce acente noktasına para transferi yapabilirsiniz.",
      "Gizlilik, şeffaflık ve müşteri memnuniyeti işlemlerinizde önceliklerimizdir."
    ],
    faqs: [
      { q: "Western Union ile nasıl para gönderebilirim?", a: "Kimliğinizle şubemize gelmeniz, alıcı bilgilerini ve göndermek istediğiniz tutarı belirtmeniz yeterlidir. İşleminiz dakikalar içinde tamamlanır." },
      { q: "Para transferi ne kadar sürer?", a: "Çoğu ülkede gönderdiğiniz para dakikalar içinde alıcıya ulaşır." },
      { q: "Hangi ülkelere para gönderebilirim?", a: "Western Union ile 200'den fazla ülke ve bölgeye para gönderebilirsiniz." },
      { q: "İşlem ücretleri nedir?", a: "Ücretler gönderilecek tutara ve ülkeye göre değişir. Detaylı bilgi için şubemizle iletişime geçebilirsiniz." }
    ],
    contact: "📞 Detaylı bilgi ve işlemler için şubemizi ziyaret edebilir veya bizimle iletişime geçebilirsiniz."
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header lang={lang} setLang={setLang} />
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-8">
        <div className="max-w-2xl w-full bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-10 border-l-8 border-blue-600 mb-8">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-blue-700">{content.home.westernUnion}</h1>
          </div>
          {/* Western Union info box */}
          <div className="bg-yellow-300 border border-yellow-500 rounded-xl p-5 mb-6 shadow flex flex-col items-start">
            <div className="font-extrabold text-lg text-black mb-1">WESTERN UNION RESMİ TEMSİLCİSİ</div>
            <div className="font-bold text-black mb-2">GÜVENLİ. HIZLI. ULUSLARARASI PARA TRANSFERİ.</div>
            <div className="text-black mb-2">Elmas Yolculuğu, Samsun'da yetkili Unionu yetkili temsilcisidir. Dünyanın dört bir yanına para göndermek veya almak artık çok kolay.</div>
            <ul className="text-black space-y-1 text-base">
              <li>✔ Dakikalar içinde para transferi</li>
              <li>✔ 100'den fazla ülkeye gönderim ve alım</li>
              <li>✔ Resmi anlaşmalı şube</li>
              <li>✔ Güvenli işlem garantisi</li>
            </ul>
          </div>
          <div className="mb-6">
            <div className="text-gray-800 text-lg md:text-xl leading-relaxed space-y-4">
              {detail.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "font-semibold text-blue-800" : undefined}>{p}</p>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold text-blue-600 mb-2">{lang === 'tr' ? 'Sıkça Sorulan Sorular' : lang === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}</h2>
            <div className="space-y-3">
              {detail.faqs.map((faq, idx) => (
                <div key={idx} className="border rounded-lg bg-white">
                  <button
                    className="w-full text-left px-4 py-3 font-semibold text-blue-700 flex justify-between items-center focus:outline-none"
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    <span>{openIndex === idx ? '-' : '+'}</span>
                  </button>
                  {openIndex === idx && (
                    <div className="px-4 pb-4 text-gray-700 border-t">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 text-blue-700 font-bold text-lg">{detail.contact}</div>
        </div>
      </div>
    </div>
  );
} 