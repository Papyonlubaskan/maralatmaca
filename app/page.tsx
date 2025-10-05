
import Hero from '../components/Hero';
import FeaturedBooks from '../components/FeaturedBooks';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maral Atmaca - Türk Edebiyatı Yazarı | Kitaplar, Romanlar ve Hikayeler',
  description: 'Yazar Maral Atmaca\'nın resmi web sitesi. Yarala Sar, Saka ve Sanrı gibi çağdaş Türk edebiyatının önemli eserlerini keşfedin. Hikayeler, romanlar ve yeni çıkan kitaplar için takip edin. Online ücretsiz okuma imkanı.',
  keywords: ['Maral Atmaca', 'Maral Atmaca yazar', 'Türk yazar', 'çağdaş edebiyat', 'Türk edebiyatı', 'Yarala Sar', 'Saka ve Sanrı', 'roman', 'hikaye', 'kitap oku', 'online kitap okuma', 'ücretsiz kitap', 'Türkçe roman', 'edebiyat', 'yazar Maral Atmaca kitapları', 'Maral Atmaca eserleri'],
  authors: [{ name: 'Maral Atmaca' }],
  creator: 'Maral Atmaca',
  publisher: 'Maral Atmaca',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://maralatmaca.com',
  },
  openGraph: {
    title: 'Maral Atmaca - Türk Edebiyatı Yazarı | Kitaplar ve Romanlar',
    description: 'Yazar Maral Atmaca\'nın resmi web sitesi. Yarala Sar, Saka ve Sanrı gibi çağdaş Türk edebiyatının önemli eserlerini keşfedin. Online ücretsiz okuma imkanı.',
    url: 'https://maralatmaca.com',
    siteName: 'Maral Atmaca - Yazar',
    locale: 'tr_TR',
    type: 'profile',
    images: [
      {
        url: 'https://readdy.ai/api/search-image?query=Author%20Maral%20Atmaca%20book%20cover&width=1200&height=630&seq=og-image&orientation=landscape',
        width: 1200,
        height: 630,
        alt: 'Maral Atmaca - Yazar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maral Atmaca - Türk Edebiyatı Yazarı',
    description: 'Yazar Maral Atmaca\'nın resmi web sitesi. Yarala Sar, Saka ve Sanrı gibi çağdaş Türk edebiyatının eserlerini ücretsiz okuyun.',
    creator: '@maralatmaca',
    site: '@maralatmaca',
    images: ['https://readdy.ai/api/search-image?query=Author%20Maral%20Atmaca%20book%20cover&width=1200&height=630&seq=twitter-image&orientation=landscape'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedBooks />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
