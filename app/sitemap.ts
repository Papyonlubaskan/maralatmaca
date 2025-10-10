import { MetadataRoute } from 'next';
import { executeQuery } from '@/lib/database/mysql';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maralatmaca-production.up.railway.app';
  
  // Static pages - SEO optimized
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/kitaplar`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/hakkimda`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/gizlilik-politikasi`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/kullanim-kosullari`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/kvkk`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Dynamic pages - books
  let bookPages: MetadataRoute.Sitemap = [];
  try {
    const books = await executeQuery('SELECT id, slug, created_at, updated_at FROM books WHERE status = "published"');
    bookPages = books.map((book: any) => ({
      url: `${baseUrl}/kitaplar/${book.slug}`,
      lastModified: new Date(book.updated_at || book.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));
  } catch (error) {
    console.error('Error fetching books for sitemap:', error);
  }

  // Dynamic pages - chapters
  let chapterPages: MetadataRoute.Sitemap = [];
  try {
    const chapters = await executeQuery(
      `SELECT c.id, c.slug, c.updated_at, c.created_at, b.slug as book_slug 
       FROM chapters c 
       JOIN books b ON c.book_id = b.id 
       WHERE c.status = "published" AND b.status = "published"`
    );
    chapterPages = chapters.map((chapter: any) => ({
      url: `${baseUrl}/kitaplar/${chapter.book_slug}/bolum/${chapter.slug}`,
      lastModified: new Date(chapter.updated_at || chapter.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }));
  } catch (error) {
    console.error('Error fetching chapters for sitemap:', error);
  }

  return [...staticPages, ...bookPages, ...chapterPages];
}
