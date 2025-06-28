'use client';
import Header from '@/components/Header';
import { useLocale } from '@/context/LocaleContext';

export default function GayrimenkulPage() {
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

  const paragraphs = content.servicesDetail?.gayrimenkul || [
    "Gayrimenkul alım, satım ve kiralama işlemlerinizde profesyonel danışmanlık hizmetleri sunuyoruz.",
    "Deneyimli ekibimiz ile gayrimenkul piyasasında güvenilir çözümler üretiyoruz.",
    "Daire alım-satım, kiralama ve gayrimenkul yatırımlarınızda size rehberlik ediyoruz.",
    "📞 Gayrimenkul işlemleriniz için bizimle iletişime geçebilirsiniz."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header lang={lang} setLang={setLang} />
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="max-w-2xl w-full bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-10 border-l-8 border-blue-600">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">{content.home.gayrimenkul}</h1>
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
