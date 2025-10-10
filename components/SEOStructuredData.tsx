import Script from 'next/script';

interface SEOStructuredDataProps {
  type?: 'website' | 'person' | 'book' | 'article';
  data?: any;
}

export default function SEOStructuredData({ type = 'website', data }: SEOStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maralatmaca-production.up.railway.app';

  const getStructuredData = () => {
    switch (type) {
      case 'person':
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Maral Atmaca",
          "alternateName": ["Maral Atmaca Yazar", "Maral Atmaca Türk Yazar"],
          "description": "Türk edebiyatının yükselen sesi, çağdaş roman ve hikaye yazarı",
          "url": baseUrl,
          "image": `${baseUrl}/images/maral-atmaca-profile.jpg`,
          "sameAs": [
            "https://www.instagram.com/maral_atmaca",
            "https://twitter.com/maralatmaca",
            "https://www.facebook.com/maralatmaca"
          ],
          "jobTitle": "Yazar",
          "worksFor": {
            "@type": "Organization",
            "name": "Maral Atmaca"
          },
          "alumniOf": "Türk Edebiyatı",
          "birthPlace": "Aksaray, Türkiye",
          "nationality": "Türk",
          "genre": ["Çağdaş Türk Edebiyatı", "Roman", "Hikaye", "Türkçe Edebiyat"],
          "award": "Türk Edebiyatının Yükselen Sesi",
          "knowsAbout": ["Türk Edebiyatı", "Roman Yazımı", "Hikaye Anlatımı", "Çağdaş Edebiyat"]
        };

      case 'book':
        return {
          "@context": "https://schema.org",
          "@type": "Book",
          "name": data?.title || "Maral Atmaca Kitapları",
          "author": {
            "@type": "Person",
            "name": "Maral Atmaca"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Maral Atmaca"
          },
          "description": data?.description || "Türk edebiyatının önemli eserleri",
          "url": data?.url || `${baseUrl}/kitaplar`,
          "image": data?.cover_image || `${baseUrl}/images/book-placeholder.jpg`,
          "inLanguage": "tr",
          "genre": "Çağdaş Türk Edebiyatı",
          "bookFormat": "EBook",
          "isAccessibleForFree": true,
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "TRY",
            "availability": "https://schema.org/InStock"
          }
        };

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data?.title || "Maral Atmaca - Yazar",
          "description": data?.description || "Türk edebiyatının yükselen sesi",
          "author": {
            "@type": "Person",
            "name": "Maral Atmaca"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Maral Atmaca",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/maral-logo.svg`
            }
          },
          "datePublished": data?.datePublished || new Date().toISOString(),
          "dateModified": data?.dateModified || new Date().toISOString(),
          "url": data?.url || baseUrl,
          "image": data?.image || `${baseUrl}/images/og-image.jpg`,
          "inLanguage": "tr"
        };

      default: // website
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Maral Atmaca - Yazar",
          "alternateName": ["Maral Atmaca Resmi Web Sitesi", "Maral Atmaca Kitapları"],
          "url": baseUrl,
          "description": "Türk edebiyatının yükselen sesi Maral Atmaca'nın resmi web sitesi. Çağdaş Türk edebiyatının önemli eserlerini ücretsiz online okuyun.",
          "author": {
            "@type": "Person",
            "name": "Maral Atmaca"
          },
          "publisher": {
            "@type": "Person",
            "name": "Maral Atmaca"
          },
          "inLanguage": "tr",
          "copyrightYear": "2025",
          "genre": "Çağdaş Türk Edebiyatı",
          "keywords": "Maral Atmaca, Türk yazar, çağdaş edebiyat, roman, hikaye, ücretsiz kitap",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/kitaplar?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        };
    }
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData(), null, 2)
      }}
    />
  );
}

// Breadcrumb structured data
export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maralatmaca-production.up.railway.app';

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData, null, 2)
      }}
    />
  );
}

// FAQ structured data
export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData, null, 2)
      }}
    />
  );
}
