'use client';
import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Header from '@/components/Header';
import MapSection from '@/components/MapSection';
import { useLocale } from '../context/LocaleContext';

export default function Home() {
  const { lang, setLang, content } = useLocale();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  // Login state
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('userEmail');
    if (user) {
      setIsLoggedIn(true);
      setUserEmail(user);
    }
  }, []);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        console.error('Form submission failed:', responseData);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    // API entegrasyonu sonraki adımda eklenecek
    if (!loginEmail || !loginPassword) {
      setLoginError('Email ve şifre zorunlu.');
      return;
    }
    // Geçici: Her giriş başarılı kabul edilsin
    localStorage.setItem('userEmail', loginEmail);
    setIsLoggedIn(true);
    setUserEmail(loginEmail);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  // Form translations
  const formContent = {
    tr: {
      formTitle: 'Bize Mesaj Gönderin',
      formSubtitle: 'İstek, görüş ve önerilerinizi bize iletin',
      nameLabel: 'Ad Soyad',
      namePlaceholder: 'Adınızı ve soyadınızı girin',
      emailLabel: 'E-posta',
      emailPlaceholder: 'E-posta adresinizi girin',
      phoneLabel: 'Telefon',
      phonePlaceholder: 'Telefon numaranızı girin',
      messageLabel: 'Mesajınız',
      messagePlaceholder: 'Mesajınızı buraya yazın...',
      sendButton: 'Mesajı Gönder',
      sendingButton: 'Gönderiliyor...',
      successMessage: 'Mesajınız başarıyla gönderildi!',
      errorMessage: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    },
    en: {
      formTitle: 'Send Us a Message',
      formSubtitle: 'Send us your requests, opinions and suggestions',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email address',
      phoneLabel: 'Phone',
      phonePlaceholder: 'Enter your phone number',
      messageLabel: 'Message',
      messagePlaceholder: 'Write your message here...',
      sendButton: 'Send Message',
      sendingButton: 'Sending...',
      successMessage: 'Your message has been sent successfully!',
      errorMessage: 'An error occurred. Please try again.',
    },
    ar: {
      formTitle: 'أرسل لنا رسالة',
      formSubtitle: 'أرسل لنا طلباتك وآراءك واقتراحاتك',
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'أدخل اسمك الكامل',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'أدخل عنوان بريدك الإلكتروني',
      phoneLabel: 'الهاتف',
      phonePlaceholder: 'أدخل رقم هاتفك',
      messageLabel: 'الرسالة',
      messagePlaceholder: 'اكتب رسالتك هنا...',
      sendButton: 'إرسال الرسالة',
      sendingButton: 'جاري الإرسال...',
      successMessage: 'تم إرسال رسالتك بنجاح!',
      errorMessage: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    }
  };

  const t = formContent[lang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-blue-700">
      <Header lang={lang} setLang={setLang} />
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center py-8">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-2">{content.home.title}</h1>
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mb-6 gap-8">
          <div className="flex-1 flex items-center md:-ml-16">
            <img src="/img_23.png" alt="Elmas Yolculuğu Turizm" className="w-[26rem] h-[26rem] object-contain" />
          </div>
          <div className="flex-1 flex items-center md:justify-start justify-center">
            <p className="text-lg text-left max-w-xl mt-0 md:mb-8 md:ml-8">
              {content.home.description}
            </p>
          </div>
        </div>
        <a href="/hakkimizda" className="inline-block bg-blue-700 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-800 transition -mt-4">{content.buttons.readMore}</a>
      </section>

      {/* HIZMETLER HEADING */}
      <h2 className="text-3xl font-bold text-blue-700 text-center my-8">{content.home.hizmetlerHeading}</h2>

      {/* HIZMETLER GRID SECTION */}
      <section className="container mx-auto px-8 md:px-24 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Döviz Alım-Satımı */}
          <div className="bg-white p-4 rounded-xl shadow-md flex flex-col h-[200px] items-center justify-between">
            <span className="text-3xl mb-2">💱</span>
            <h3 className="text-lg font-semibold mb-2">{content.home.dovizAlimSatimi}</h3>
            <a href="/hizmetler/doviz-alim-satimi" className="mt-auto inline-block bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-800 transition text-sm">{content.buttons.details}</a>
          </div>
          {/* Western Union */}
          <div className="bg-white p-4 rounded-xl shadow-md flex flex-col h-[200px] items-center justify-between">
            <img src="/western-union.svg" alt="Western Union Logo" className="h-7 w-auto mb-2" />
            <h3 className="text-lg font-semibold mb-2">{content.home.westernUnion}</h3>
            <a href="/hizmetler/western-union" className="mt-auto inline-block bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-800 transition text-sm">{content.buttons.details}</a>
          </div>
          {/* Seyahat Biletleri */}
          <div className="bg-white p-4 rounded-xl shadow-md flex flex-col h-[200px] items-center justify-between">
            <span className="text-3xl mb-2">✈️</span>
            <h3 className="text-lg font-semibold mb-2">{content.home.seyahatBiletleri}</h3>
            <a href="/hizmetler/seyahat-biletleri" className="mt-auto inline-block bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-800 transition text-sm">{content.buttons.details}</a>
          </div>
          {/* Oturma İzni Başvuruları */}
          <div className="bg-white p-4 rounded-xl shadow-md flex flex-col h-[200px] items-center justify-between">
            <span className="text-3xl mb-2">🏠</span>
            <h3 className="text-lg font-semibold mb-2">{content.home.oturmaIzniBasvurulari}</h3>
            <a href="/hizmetler/oturma-izni-basvurulari" className="mt-auto inline-block bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-800 transition text-sm">{content.buttons.details}</a>
          </div>
          {/* Otel Rezervasyonları */}
          <div className="bg-white p-4 rounded-xl shadow-md flex flex-col h-[200px] items-center justify-between">
            <span className="text-3xl mb-2">🏨</span>
            <h3 className="text-lg font-semibold mb-2">{content.home.otelRezervasyonlari}</h3>
            <a href="/hizmetler/otel-rezervasyonlari" className="mt-auto inline-block bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-800 transition text-sm">{content.buttons.details}</a>
          </div>
          {/* Gayrimenkul, Daire Alım Satım Kiralama */}
          <div className="bg-white p-4 rounded-xl shadow-md flex flex-col h-[200px] items-center justify-between">
            <span className="text-3xl mb-2">🏢</span>
            <h3 className="text-lg font-semibold mb-2">{content.home.gayrimenkul}</h3>
            <a href="/hizmetler/gayrimenkul" className="mt-auto inline-block bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-800 transition text-sm">{content.buttons.details}</a>
          </div>
        </div>
      </section>

      <MapSection />

      {/* Contact Form Section */}
      <section className="container mx-auto px-8 md:px-24 mb-12">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-700 mb-2">{t.formTitle}</h2>
              <p className="text-gray-600">{t.formSubtitle}</p>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                {t.successMessage}
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {t.errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.nameLabel} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t.namePlaceholder}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.emailLabel} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t.emailPlaceholder}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.phoneLabel} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t.phonePlaceholder}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.messageLabel} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t.messagePlaceholder}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isSubmitting ? t.sendingButton : t.sendButton}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* WHATSAPP BUTTON */}
      <a
        href="https://wa.me/905388392520"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-50"
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
}