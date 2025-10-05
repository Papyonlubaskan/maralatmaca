import { Metadata } from 'next';
import { generateMetaTags, generateStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo';

interface BookMetadataProps {
  book: {
    id: string;
    title: string;
    description: string;
    author: string;
    cover_image_url?: string;
    category?: string;
    tags?: string;
    created_at: string;
    updated_at: string;
  };
}

export function generateBookMetadata({ book }: BookMetadataProps): Metadata {
  const bookUrl = `https://maralatmaca.com/kitaplar/${book.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '')}`;
  const tags = book.tags ? JSON.parse(book.tags) : [];
  
  return generateMetaTags({
    title: `${book.title} - Maral Atmaca`,
    description: book.description,
    keywords: [book.title, book.author, 'Maral Atmaca', book.category || '', ...tags],
    url: bookUrl,
    type: 'book',
    author: book.author,
    image: book.cover_image_url || '/images/default-book-cover.jpg',
    publishedTime: book.created_at,
    modifiedTime: book.updated_at,
    section: book.category,
    tags: tags,
    canonical: bookUrl
  });
}

export function generateBookStructuredData({ book }: BookMetadataProps) {
  const bookUrl = `https://maralatmaca.com/kitaplar/${book.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '')}`;
  const tags = book.tags ? JSON.parse(book.tags) : [];
  
  return generateStructuredData({
    title: book.title,
    description: book.description,
    url: bookUrl,
    type: 'book',
    author: book.author,
    image: book.cover_image_url || '/images/default-book-cover.jpg',
    publishedTime: book.created_at,
    modifiedTime: book.updated_at,
    section: book.category,
    tags: tags
  });
}

export function generateBookBreadcrumbStructuredData({ book }: BookMetadataProps) {
  const bookUrl = `https://maralatmaca.com/kitaplar/${book.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '')}`;
  
  return generateBreadcrumbStructuredData([
    { name: 'Ana Sayfa', url: 'https://maralatmaca.com' },
    { name: 'Kitaplar', url: 'https://maralatmaca.com/kitaplar' },
    { name: book.title, url: bookUrl }
  ]);
}
