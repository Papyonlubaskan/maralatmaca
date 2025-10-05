
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HeroData {
  hero_background?: string;
  hero_image?: string;
  hero_title?: string;
  hero_subtitle?: string;
  sections?: Array<{
    type: string;
    content: string;
  }>;
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData>({
    hero_background: 'https://readdy.ai/api/search-image?query=A%20serene%20and%20elegant%20writing%20space%20with%20warm%20natural%20lighting%2C%20featuring%20a%20beautiful%20wooden%20desk%20with%20vintage%20books%2C%20delicate%20flowers%20in%20soft%20pastel%20colors%2C%20and%20a%20cozy%20reading%20corner%20with%20cream%20and%20beige%20tones%2C%20creating%20an%20inspiring%20atmosphere%20for%20a%20female%20author%2C%20minimalist%20and%20sophisticated%20interior%20design&width=1200&height=800&seq=hero-bg&orientation=landscape',
    hero_image: 'https://static.readdy.ai/image/95e17ff92b66fd1dcbe3cf3a194e2fbb/6bdca6a002e82985b965d0a89f5f6c87.jfif',
    hero_title: 'Maral Atmaca',
    hero_subtitle: 'Yazar & Hikaye Anlatıcı',
    sections: []
  });

  useEffect(() => {
    loadHeroData();
  }, []);

  const loadHeroData = async () => {
    try {
      // Ana sayfa verilerini settings'ten yükle
      const response = await fetch('/api/settings?key=page_page_page_home');
      const data = await response.json();
      
      if (data.success && data.data) {
        const pageData = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
        setHeroData(prev => ({
          ...prev,
          ...pageData
        }));
      }
    } catch (error) {
      console.error('Hero data load error:', error);
      // Hata durumunda varsayılan değerler kullanılacak
    }
  };

  // İçerik paragrafları
  const contentParagraphs = heroData.sections?.filter(s => s.type === 'paragraph') || [];

  return (
    <div className="relative min-h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${heroData.hero_background}')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent dark:from-gray-900/95 dark:via-gray-900/85 dark:to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
              Merhaba, Ben 
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent block mt-2 italic" style={{fontFamily: 'Times New Roman, serif'}}>
                {heroData.hero_title || 'Maral Atmaca'}
              </span>
            </h1>
            
            {heroData.hero_subtitle && (
              <p className="text-2xl text-gray-700 dark:text-gray-200 font-medium">
                {heroData.hero_subtitle}
              </p>
            )}

            {/* Dinamik İçerik */}
            {contentParagraphs.length > 0 ? (
              contentParagraphs.map((para, index) => (
                <p 
                  key={index}
                  className={index === 0 ? "text-xl text-gray-600 dark:text-gray-300 leading-relaxed" : "text-lg text-gray-500 dark:text-gray-400"}
                >
                  {para.content}
                </p>
              ))
            ) : (
              <>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Bir kitabın sayfalarında buluşan kelimeler, en güzel yolculukların anahtarıdır. 
                  Her kitap bir yazarın zihninde yeşerir ama okurların düşlerinde hayat bulur. 
                  Bazen tek ihtiyacımız olan şey sıcak bir kahve, sessiz bir ortam ve bir kitaptır.
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  Kitaplarım aracılığıyla binlerce okurla paylaştığım bu yolculukta, 
                  her hikaye yeni bir kapı açıyor...
                </p>
              </>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/kitaplar" 
                className="bg-orange-600 dark:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors cursor-pointer text-center whitespace-nowrap"
              >
                Kitaplarımı Keşfet
              </Link>
              <Link 
                href="/hakkimda" 
                className="border-2 border-orange-600 dark:border-orange-400 text-orange-600 dark:text-orange-400 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors cursor-pointer text-center whitespace-nowrap"
              >
                Benim Hikayem
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src={heroData.hero_image || 'https://static.readdy.ai/image/95e17ff92b66fd1dcbe3cf3a194e2fbb/6bdca6a002e82985b965d0a89f5f6c87.jfif'}
                alt={heroData.hero_title || 'Maral Atmaca'}
                className="w-80 h-96 object-cover rounded-2xl shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://static.readdy.ai/image/95e17ff92b66fd1dcbe3cf3a194e2fbb/6bdca6a002e82985b965d0a89f5f6c87.jfif';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
