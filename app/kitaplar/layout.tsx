import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kitaplarım | Maral Atmaca',
  description: 'Maral Atmaca\'nın tüm kitapları ve hikayeleri. Yeni ve popüler kitapları keşfedin.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://maralatmaca.com'}/kitaplar`,
  }
};

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  );
}
