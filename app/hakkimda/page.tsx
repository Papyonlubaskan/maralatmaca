'use client';

import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import { PersonStructuredData } from '../../components/StructuredData';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  const [stats, setStats] = useState({
    totalBooks: 5,
    totalReaders: 350000,
    totalComments: 25000,
    yearsExperience: 8
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Gerçek verileri API'den çek
      const [booksRes, commentsRes, likesRes] = await Promise.all([
        fetch('/api/books'),
        fetch('/api/comments?limit=1'),
        fetch('/api/likes')
      ]);

      let totalBooks = 5; // Varsayılan
      let totalComments = 25000; // Varsayılan
      let totalReaders = 350000; // Varsayılan (likes + views estimate)

      if (booksRes.ok) {
        const booksData = await booksRes.json();
        if (booksData.success) {
          totalBooks = booksData.total || booksData.data?.length || 5;
        }
      }

      if (commentsRes.ok) {
        const commentsData = await commentsRes.json();
        if (commentsData.success && commentsData.total) {
          totalComments = commentsData.total;
        }
      }

      if (likesRes.ok) {
        const likesData = await likesRes.json();
        if (likesData.success && likesData.total) {
          // Her beğeni ortalama 10 okur anlamına gelir
          totalReaders = Math.max(likesData.total * 10, 350000);
        }
      }

      // Yıllık deneyim hesapla (2017'den bu yana)
      const startYear = 2017;
      const currentYear = new Date().getFullYear();
      const yearsExperience = currentYear - startYear;

      setStats({
        totalBooks,
        totalReaders,
        totalComments,
        yearsExperience
      });
    } catch (error) {
      console.error('Stats load error:', error);
      // Hata durumunda varsayılan değerler kullanılacak
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  return (
    <>
      <PersonStructuredData
        name="Maral Atmaca"
        description="1991 Aksaray doğumlu çağdaş Türk edebiyatı yazarı. Yaralasar, Ötanazi Okulu, Medusa'nın Ölü Kumları, Öyle Bir Uğradım, Saka ve Sanrı romanlarının yazarı."
        image="https://static.readdy.ai/image/95e17ff92b66fd1dcbe3cf3a194e2fbb/a599980b101fd8dacfcfcbdeed753471.jfif"
        sameAs={[
          'https://maralatmaca.com',
          'https://twitter.com/maralatmaca',
        ]}
      />
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
        <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">Hakkımda</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hikayelerin büyülü dünyasında geçen yazarlık yolculuğum
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Merhaba, Ben Maral</h2>
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-light">
                    Maral Atmaca 1991 yılında Aksaray'nın küçük bir ilçesinde doğmuştur. 
                    Çocuk yaşlardan beri yazmaya ilgi duyan yazarın ilk yazım denemeleri 
                    şiir ve öykü üzerine olmuş, ilk romanını ise 2017 yılında yazmaya başlamıştır.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-light">
                    Hayatının büyük bir bölümünü yazmaya adayan Maral Atmaca, gördüğü, 
                    duyduğu ve yaşadığı her şeyden esinlenmeyi sevmekte. Yazarın basılı 
                    eserleri <span className="font-medium text-orange-600 dark:text-orange-400">Yaralasar, Ötanazi Okulu, Medusa'nın Ölü Kumları, Öyle Bir 
                    Uğradım, Saka ve Sanrı</span> romanlarıdır.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-light">
                    Her hikaye yazdığımda, sadece kendi hayal gücümle değil, aynı zamanda 
                    okurlarımın yorumları, duygusal tepkileri ve beklentileri ile şekilleniyor.
                  </p>
                </div>
              </div>

            </div>

            <div className="space-y-8">
              <img
                src="https://static.readdy.ai/image/95e17ff92b66fd1dcbe3cf3a194e2fbb/a599980b101fd8dacfcfcbdeed753471.jfif"
                alt="Maral Atmaca"
                className="w-full h-96 object-cover object-top rounded-2xl shadow-lg"
              />

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Yazarlık Felsefem</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-5">
                    <div className="w-8 h-8 flex items-center justify-center bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-full mt-1 flex-shrink-0">
                      <i className="ri-heart-line text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2 text-lg">Duygusal Bağ</h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Her karakterim gerçek insanların duygularını taşır ve okuyucularla derin bir bağ kurar</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-5">
                    <div className="w-8 h-8 flex items-center justify-center bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-full mt-1 flex-shrink-0">
                      <i className="ri-community-line text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2 text-lg">Okur Etkileşimi</h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Okurlarımın yorumları ve geri bildirimleri hikayelerimi şekillendirir ve geliştirir</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-5">
                    <div className="w-8 h-8 flex items-center justify-center bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-full mt-1 flex-shrink-0">
                      <i className="ri-lightbulb-line text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2 text-lg">Sürekli Gelişim</h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Her hikayede kendimi ve yazarlığımı geliştirmeye odaklanırım</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 mb-16">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">Yazarlık Yolculuğum</h3>
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-gray-700 dark:to-gray-700 p-8 rounded-xl border-l-4 border-orange-500 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold mr-4 text-xl shadow-lg">1</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">2017 - Başlangıç</h4>
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">İlk Roman</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  Yazarlık serüvenim 2017 yılında, ilk romanım <span className="font-semibold text-orange-600 dark:text-orange-400">Yaralasar</span>'ı kaleme alarak başladı. 
                  Çocukluktan beri tuttuğum günlükler ve yazdığım şiirler, nihayet bir romana dönüşüyordu. 
                  Bu ilk adım, hayatımın en büyük kararlarından biri oldu.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-700 p-8 rounded-xl border-l-4 border-blue-500 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold mr-4 text-xl shadow-lg">2</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">2018-2020 - Keşif ve Deneyim</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">3 Roman Daha</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Ötanazi Okulu</span>, <span className="font-semibold text-blue-600 dark:text-blue-400">Medusa'nın Ölü Kumları</span> ve 
                  <span className="font-semibold text-blue-600 dark:text-blue-400"> Öyle Bir Uğradım</span> romanlarıyla farklı türleri keşfettim. 
                  Gizem, psikolojik gerilim ve dram türlerinde kendimi geliştirdim.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-700 p-8 rounded-xl border-l-4 border-purple-500 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold mr-4 text-xl shadow-lg">3</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">2021-2023 - Olgunluk</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Profesyonel Dönem</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  <span className="font-semibold text-purple-600 dark:text-purple-400">Saka ve Sanrı</span> romanımı yayınladım. 
                  Bu dönemde tam zamanlı yazarlığa geçiş yaptım. Okurlarımla doğrudan iletişim kurduğum dijital platformlarda 
                  bölüm bölüm yayınladığım hikayeler için aldığım geri bildirimler ve yorumlar, hikayelerimi şekillendirdi.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-700 p-8 rounded-xl border-l-4 border-green-500 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-4 text-xl shadow-lg">4</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">2024-2025 - Bugün ve Gelecek</h4>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">Yeni Projeler</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  Yeni projeler üzerinde çalışıyorum. 
                  Bu web sitesi, okurlarımla daha yakın bir bağ kurmam ve eserlerimi doğrudan onlarla paylaşmam için oluşturuldu. 
                  Yeni romanlarım, kısa öykülerim ve okurlarımdan gelen ilham verici mesajlarla dolu bir gelecek beni bekliyor. 
                  Her gün yazmaya, her gün hikaye anlatmaya devam ediyorum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

        <Footer />
      </div>
    </>
  );
}