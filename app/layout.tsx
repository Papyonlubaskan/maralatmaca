
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import Header from '../components/Header';
import MaintenanceChecker from '../components/MaintenanceChecker';
import GoogleAnalytics from '../components/GoogleAnalytics';
import CookieConsent from '../components/CookieConsent';
import { ToastProvider } from '../components/Toast';
import { WebsiteStructuredData } from '../components/StructuredData';

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Maral Atmaca - Türk Edebiyatı Yazarı | Kitaplar, Romanlar, Hikayeler',
    template: '%s | Maral Atmaca - Yazar'
  },
  description: 'Yazar Maral Atmaca\'nın resmi web sitesi. Yarala Sar, Saka ve Sanrı gibi çağdaş Türk edebiyatının önemli eserlerini ücretsiz online okuyun. Romanlar, hikayeler ve yeni çıkan kitaplar. Türk edebiyatının yükselen sesi.',
  keywords: ['Maral Atmaca', 'Maral Atmaca yazar', 'Türk yazar', 'çağdaş Türk edebiyatı', 'Türk romanları', 'Yarala Sar', 'Saka ve Sanrı', 'roman oku', 'hikaye oku', 'online kitap okuma', 'ücretsiz kitap', 'Türkçe edebiyat', 'kitap yazar', 'Maral Atmaca kitapları', 'Maral Atmaca eserleri', 'çağdaş edebiyat', 'Türk hikaye yazarı'],
  authors: [{ name: 'Maral Atmaca', url: 'https://maralatmaca.com' }],
  creator: 'Maral Atmaca',
  publisher: 'Maral Atmaca',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://maralatmaca-production.up.railway.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    locale: 'tr_TR',
    url: 'https://maralatmaca-production.up.railway.app',
    title: 'Maral Atmaca - Türk Edebiyatı Yazarı | Romanlar ve Hikayeler',
    description: 'Yazar Maral Atmaca\'nın resmi web sitesi. Yarala Sar, Saka ve Sanrı gibi çağdaş Türk edebiyatının eserlerini ücretsiz online okuyun.',
    siteName: 'Maral Atmaca - Yazar',
    images: [
      {
        url: '/images/og-image.jpg',
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
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      noimageindex: false,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  icons: {
    icon: [
      { url: '/maral-logo.svg', sizes: 'any', type: 'image/svg+xml' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' }
    ],
    shortcut: '/favicon.ico',
    apple: '/maral-logo.svg',
  },
  other: {
    'revisit-after': '7 days',
    'distribution': 'global',
    'rating': 'general',
    'referrer': 'origin-when-cross-origin',
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning={true}>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <WebsiteStructuredData searchUrl="https://maralatmaca.com/kitaplar?q={search_term_string}" />
        <ToastProvider>
          <MaintenanceChecker>
            <Header />
            {children}
            <CookieConsent />
          </MaintenanceChecker>
        </ToastProvider>
      </body>
    </html>
  );
}

