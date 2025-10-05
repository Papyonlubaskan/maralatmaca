import Script from 'next/script';

interface BookStructuredDataProps {
  book: {
    id: number;
    title: string;
    description: string;
    author: string;
    isbn?: string;
    publishDate?: string;
    coverImage?: string;
    slug: string;
  };
}

export function BookStructuredData({ book }: BookStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `https://maralatmaca.com/kitaplar/${book.slug}`,
    name: book.title,
    description: book.description,
    author: {
      '@type': 'Person',
      name: book.author,
      url: 'https://maralatmaca.com/hakkimda',
    },
    ...(book.isbn && { isbn: book.isbn }),
    ...(book.publishDate && { datePublished: book.publishDate }),
    ...(book.coverImage && { image: book.coverImage }),
    inLanguage: 'tr-TR',
    genre: 'Edebiyat',
  };

  return (
    <Script
      id={`book-structured-data-${book.id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface PersonStructuredDataProps {
  name: string;
  description: string;
  image?: string;
  sameAs?: string[];
}

export function PersonStructuredData({ name, description, image, sameAs }: PersonStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://maralatmaca.com/#author',
    name,
    description,
    jobTitle: 'Yazar',
    knowsAbout: ['Türk Edebiyatı', 'Çağdaş Edebiyat', 'Roman', 'Hikaye', 'Edebiyat'],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Yazar',
      occupationalCategory: 'Edebiyat'
    },
    nationality: {
      '@type': 'Country',
      name: 'Türkiye'
    },
    ...(image && { image }),
    ...(sameAs && { sameAs }),
    url: 'https://maralatmaca.com',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://maralatmaca.com'
    }
  };

  return (
    <Script
      id="person-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface WebsiteStructuredDataProps {
  searchUrl?: string;
}

export function WebsiteStructuredData({ searchUrl }: WebsiteStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://maralatmaca.com/#website',
    name: 'Maral Atmaca - Türk Edebiyatı Yazarı',
    alternateName: 'Maral Atmaca Yazar',
    url: 'https://maralatmaca.com',
    description: 'Yazar Maral Atmaca\'nın resmi web sitesi. Yarala Sar, Saka ve Sanrı gibi çağdaş Türk edebiyatının önemli eserlerini ücretsiz online okuyun.',
    inLanguage: 'tr-TR',
    about: {
      '@type': 'Person',
      name: 'Maral Atmaca',
      jobTitle: 'Yazar',
      description: 'Çağdaş Türk edebiyatının önemli isimlerinden biri'
    },
    keywords: 'Maral Atmaca, Türk yazar, çağdaş edebiyat, Yarala Sar, Saka ve Sanrı, roman, hikaye',
    ...(searchUrl && {
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: searchUrl,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
