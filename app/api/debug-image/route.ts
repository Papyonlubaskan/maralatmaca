import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const imagesDir = path.join(process.cwd(), 'public', 'uploads', 'images');
    
    // Tüm kitapları al
    const [books] = await connection.query(
      'SELECT id, title, cover_image FROM books WHERE cover_image IS NOT NULL AND cover_image != ""'
    ) as any[];

    const results = [];

    for (const book of books) {
      const filename = path.basename(book.cover_image);
      const filePath = path.join(imagesDir, filename);
      
      let fileExists = false;
      let fileSize = 0;
      
      try {
        const stats = await fs.stat(filePath);
        fileExists = true;
        fileSize = stats.size;
      } catch (error) {
        fileExists = false;
      }

      // URL'leri test et
      const relativeUrl = book.cover_image;
      const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://maralatmaca-production.up.railway.app'}${relativeUrl}`;
      
      results.push({
        id: book.id,
        title: book.title,
        cover_image: book.cover_image,
        filename: filename,
        fileExists,
        fileSize,
        relativeUrl,
        fullUrl,
        imagesDir: imagesDir
      });
    }

    await connection.end();

    return NextResponse.json({
      success: true,
      message: 'Resim debug bilgileri',
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
      results
    });

  } catch (error: any) {
    console.error('Debug image error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
