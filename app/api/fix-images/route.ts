import { NextResponse } from 'next/server';
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

    // Tüm kitapları al
    const [books] = await connection.query(
      'SELECT id, title, cover_image_url FROM books WHERE cover_image_url IS NOT NULL AND cover_image_url != ""'
    ) as any[];

    let fixedCount = 0;
    const results = [];

    for (const book of books) {
      if (book.cover_image_url && book.cover_image_url.includes('/uploads/images/')) {
        // Resim URL'sini düzelt
        const newUrl = book.cover_image_url.replace('http://localhost:3000', '');
        
        // Database'i güncelle
        await connection.query(
          'UPDATE books SET cover_image_url = ? WHERE id = ?',
          [newUrl, book.id]
        );
        
        fixedCount++;
        results.push({
          id: book.id,
          title: book.title,
          oldUrl: book.cover_image_url,
          newUrl: newUrl
        });
      }
    }

    await connection.end();

    return NextResponse.json({
      success: true,
      message: `${fixedCount} kitap resmi düzeltildi`,
      fixedCount,
      results
    });

  } catch (error: any) {
    console.error('Fix images error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
