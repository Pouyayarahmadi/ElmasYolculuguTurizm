'use client';
import Header from '@/components/Header';
import { useLocale } from '@/context/LocaleContext';

export default function SeyahatBiletleriPage() {
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

  const paragraphs = content.servicesDetail?.seyahatBiletleri || [
    "Yurtiçi ve yurtdışı seyahatleriniz için ihtiyacınız olan tüm ulaşım biletlerini güvenli ve en uygun fiyatlarla temin ediyoruz.",
    "Uçak, otobüs ve tren biletleri için geniş ağ üzerinden sorgulama yaparak size en uygun zaman ve fiyat seçeneklerini sunuyoruz.",
    "İş seyahati mi planlıyorsunuz, tatil mi yapmak istiyorsunuz, ekibimiz seyahat tarihlerinize ve tercihlerinize göre size en uygun ulaşım alternatiflerini araştırır.",
    "Havayolu şirketleri, şehirlerarası otobüs firmaları ve tren hizmetlerini karşılaştırarak hem ekonomik hem de konforlu seçenekleri size sunarız.",
    "Ayrıca tüm biletleme işlemleriniz tarafımızdan hızlıca tamamlanır ve dijital biletleriniz e-posta veya WhatsApp ile size gönderilir.",
    "Erken rezervasyon avantajları, promosyon bilet fırsatları ve grup indirimleri hakkında da sizi bilgilendiririz.",
    "Zaman kaybetmeden güvenli seyahat edebilmeniz için profesyonel destek sağlarız.",
    "Özellikle yoğun dönemlerde (bayram, yaz sezonu vb.) bilet bulmakta zorlanmamanız için ön rezervasyon hizmeti de sunuyoruz.",
    "Tek yön, gidiş-dönüş ve aktarmalı bilet talepleriniz için bizimle iletişime geçebilir, ihtiyaçlarınıza en uygun çözümü alabilirsiniz.",
    "📞 Uçak, otobüs veya tren biletleri için hemen bizimle iletişime geçin; yolculuğunuzu birlikte planlayalım!"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header lang={lang} setLang={setLang} />
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="max-w-2xl w-full bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-10 border-l-8 border-blue-600">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">{content.home.seyahatBiletleri}</h1>
          <div className="text-gray-800 text-lg md:text-xl leading-relaxed space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "font-semibold text-blue-800" : i === paragraphs.length-1 ? "font-bold text-blue-700" : undefined}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 