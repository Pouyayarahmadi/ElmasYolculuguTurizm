'use client';
import Header from '@/components/Header';
import { useLocale } from '@/context/LocaleContext';

export default function Hakkimizda() {
  const { lang, setLang, content } = useLocale();
  const about = content.about;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
      <Header lang={lang} setLang={setLang} />
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-8">{about.title}</h1>
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-10 border-l-8 border-blue-600">
          <div className="text-gray-800 text-lg md:text-xl leading-relaxed">
            <p>{about.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
