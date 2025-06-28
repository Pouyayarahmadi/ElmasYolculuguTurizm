'use client';
import Header from '@/components/Header';
import { useLocale } from '@/context/LocaleContext';

export default function DovizAlimSatimiPage() {
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

  const paragraphs = content.servicesDetail?.dovizAlimSatimi || [
    "Döviz alım-satım işlemlerinizde güven, hız ve rekabetçi kurlar ile yanınızdayız.",
    "Elmas Yolculuğu Turizm olarak, müşterilerimize piyasa uygun döviz kurları ile şeffaf ve yasal hizmet sunuyoruz.",
    "USD, EUR, GBP, CHF gibi yaygın para birimlerinin yanı sıra, birçok farklı ülke para biriminde de alım-satım hizmeti veriyoruz.",
    "İşlem yapmak isteyen müşterilerimiz için anlık döviz kuru bilgisi paylaşılır ve piyasa dalgalanmalarına göre güncel fiyatlandırma yapılır.",
    "Hizmet, herhangi bir komisyon veya gizli ücret olmadan, net ve anlaşılır şekilde sunulur.",
    "Ekibimiz, döviz işlemlerinde deneyimli ve eğitimli personelden oluşmaktadır.",
    "Küçük bireysel işlemler olsun, büyük ticari döviz transferleri olsun, her işlem aynı özenle gerçekleştirilir.",
    "Güvenli nakit işleme, işlem hızı ve müşteri gizliliği temel ilkelerimiz arasındadır.",
    "İşlem belgeleri düzenli olarak hazırlanır ve müşterilerimize talep halinde makbuz ile birlikte verilir.",
    "Özellikle yurt dışına para göndermek veya döviz tasarrufu yapmak isteyen müşterilerimiz için kişiselleştirilmiş işlem çözümleri sunuyoruz.",
    "Tüm döviz alım-satım işlemlerimiz, Türkiye Cumhuriyeti Merkez Bankası düzenlemeleri ve finansal mevzuata uygun olarak gerçekleştirilir.",
    "📞 En iyi döviz kurları ve profesyonel hizmet için şubemizi ziyaret edebilir veya bizimle iletişime geçebilirsiniz."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header lang={lang} setLang={setLang} />
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="max-w-2xl w-full bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-10 border-l-8 border-blue-600">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">{content.home.dovizAlimSatimi}</h1>
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