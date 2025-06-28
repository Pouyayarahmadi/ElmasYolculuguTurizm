'use client';
import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaWhatsapp, FaGlobe, IoMdArrowDropdown, FaClock } from 'react-icons/fa';
import { IoMdArrowDropdown as IoMdArrowDropdownIcon } from 'react-icons/io';
import tr from '../../locales/tr';
import en from '../../locales/en';
import ar from '../../locales/ar';

export default function Iletisim() {
  const [lang, setLang] = useState('tr');
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const content = {
    tr: {
      title: 'İLETİŞİM',
      subtitle: 'Bize iletişim bilgilerimiz ile ulaşabilirsiniz',
      phone: 'Telefon',
      email: 'E-posta',
      address: 'Adres',
      workingHours: 'Çalışma Saatleri',
      phoneValue: '+90 5388392520',
      emailValue: 'info@elmasyolculugu.com',
      addressValue: 'Elmas yolculuğu(Almasa), Cumhuriyet, Lozan Cd. No:18, 55200 Atakum/Samsun',
      workingHoursValue: 'P.Tesi - Cuma : 09:00 - 18:00\nC.tesi - Pazar : Kapalı',
      home: 'Ana Sayfa',
      menu: 'Sayfalar',
      hakkimizda: 'Hakkımızda',
      hizmetler: 'Hizmetler',
      iletisim: 'İletişim',
      dovizAlimSatimi: 'Döviz Alım-Satımı',
      westernUnion: 'Western Union',
      seyahatBiletleri: 'Seyahat Biletleri',
      oturmaIzniBasvurulari: 'Oturma İzni Başvuruları',
      otelRezervasyonlari: 'Otel Rezervasyonları',
      gayrimenkul: 'Gayrimenkul',
      // Form translations
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
      requiredField: 'Bu alan zorunludur'
    },
    en: {
      title: 'CONTACT',
      subtitle: 'You can reach us with our contact information',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      workingHours: 'Working Hours',
      phoneValue: '+90 5388392520',
      emailValue: 'info@elmasyolculugu.com',
      addressValue: 'Elmas yolculuğu(Almasa), Cumhuriyet, Lozan Cd. No:18, 55200 Atakum/Samsun',
      workingHoursValue: 'Mon - Fri : 09:00 - 18:00\nSat - Sun : Closed',
      home: 'Home',
      menu: 'Pages',
      hakkimizda: 'About Us',
      hizmetler: 'Services',
      iletisim: 'Contact',
      dovizAlimSatimi: 'Currency Exchange',
      westernUnion: 'Western Union',
      seyahatBiletleri: 'Travel Tickets',
      oturmaIzniBasvurulari: 'Residence Permit Applications',
      otelRezervasyonlari: 'Hotel Reservations',
      gayrimenkul: 'Real Estate',
      // Form translations
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
      requiredField: 'This field is required'
    },
    ar: {
      title: 'اتصال',
      subtitle: 'يمكنكم الوصول إلينا من خلال معلومات الاتصال الخاصة بنا',
      phone: 'هاتف',
      email: 'بريد إلكتروني',
      address: 'عنوان',
      workingHours: 'ساعات العمل',
      phoneValue: '+90 5388392520',
      emailValue: 'info@elmasyolculugu.com',
      addressValue: 'ألماس يولجولو (ألماسا)، جمهورية، شارع لوزان رقم:18، 55200 أتاكوم/سامسون',
      workingHoursValue: 'الاثنين - الجمعة : 09:00 - 18:00\nالسبت - الأحد : مغلق',
      home: 'الرئيسية',
      menu: 'الصفحات',
      hakkimizda: 'معلومات عنا',
      hizmetler: 'الخدمات',
      iletisim: 'اتصال',
      dovizAlimSatimi: 'تبديل العملات',
      westernUnion: 'ويسترن يونيون',
      seyahatBiletleri: 'تذاكر السفر',
      oturmaIzniBasvurulari: 'طلبات الإقامة',
      otelRezervasyonlari: 'حجوزات الفنادق',
      gayrimenkul: 'العقارات',
      // Form translations
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
      requiredField: 'هذا الحقل مطلوب'
    }
  };

  const t = content[lang];

  // Language switcher
  const nextLang = lang === 'tr' ? 'en' : lang === 'en' ? 'ar' : 'tr';
  const langLabel = lang === 'tr' ? 'English' : lang === 'en' ? 'العربية' : 'Türkçe';

  const serviceLinks = [
    { slug: 'doviz-alim-satimi', label: t.dovizAlimSatimi },
    { slug: 'western-union', label: t.westernUnion },
    { slug: 'seyahat-biletleri', label: t.seyahatBiletleri },
    { slug: 'oturma-izni-basvurulari', label: t.oturmaIzniBasvurulari },
    { slug: 'otel-rezervasyonlari', label: t.otelRezervasyonlari },
    { slug: 'gayrimenkul', label: t.gayrimenkul },
  ];

  const info = [
    {
      label: t.phone,
      value: t.phoneValue,
      icon: <FaPhoneAlt className="text-blue-700 text-2xl" />,
    },
    {
      label: t.email,
      value: t.emailValue,
      icon: <FaEnvelope className="text-blue-700 text-2xl" />,
    },
    {
      label: t.address,
      value: t.addressValue,
      icon: <FaMapMarkerAlt className="text-blue-700 text-2xl" />,
    },
  ];

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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md py-2 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src="/diamond_wings.png" alt="Logo" width={80} height={80} />
          <a href="/" className="text-2xl font-bold text-blue-700 hover:underline">
            Elmas Yolculuğu
          </a>
        </div>
        <nav className="flex items-center gap-4">
          <a href="/" className="text-blue-700 font-semibold hover:underline">{t.home}</a>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1 text-blue-700 hover:text-blue-800 font-semibold"
            >
              {t.menu} <IoMdArrowDropdownIcon />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-64 z-50 min-w-max">
                <a href="/hakkimizda" className="block px-4 py-3 hover:bg-blue-50 text-blue-700 hover:text-blue-800 transition-colors duration-150 font-medium">{t.hakkimizda}</a>
                <div className="border-t border-gray-100" />
                <button
                  className="w-full text-left px-4 py-3 font-medium hover:bg-blue-50 flex items-center justify-between text-blue-700 hover:text-blue-800 transition-colors duration-150"
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  <span>{t.hizmetler}</span>
                  <IoMdArrowDropdownIcon className={`ml-2 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="bg-gray-50 border-t border-gray-100">
                    {serviceLinks.map((s) => (
                      <a key={s.slug} href={`/hizmetler/${s.slug}`} className="block px-6 py-2 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors duration-150 text-sm">
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
                <div className="border-t border-gray-100" />
                <a href="/iletisim" className="block px-4 py-3 hover:bg-blue-50 text-blue-700 hover:text-blue-800 transition-colors duration-150 font-medium">{t.iletisim}</a>
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

      {/* Contact Content */}
      <div className="flex flex-col justify-center items-center py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 text-center mb-4 tracking-tight">{t.title}</h1>
        <p className="text-center text-lg md:text-xl text-gray-700 mb-12">{t.subtitle}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-12">
          {info.map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center border-t-4 border-blue-700">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-blue-700 mb-2">{item.label}</h3>
              <p className="text-gray-800 break-words whitespace-pre-line">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Çalışma Saatleri */}
        <div className="text-center mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-blue-700 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <FaClock className="text-blue-700 text-2xl" />
              <h3 className="text-xl font-bold text-blue-700">{t.workingHours}</h3>
            </div>
            <p className="text-gray-800 text-lg whitespace-pre-line">{t.workingHoursValue}</p>
          </div>
        </div>

        {/* Contact Form */}
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
      </div>
    </div>
  );
} 