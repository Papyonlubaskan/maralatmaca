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

    // Önce books tablosunun yapısını kontrol et
    const [columns] = await connection.query('DESCRIBE books') as any[];
    
    // Tüm kitapları al (resim kolonunu bul)
    const [books] = await connection.query(
      'SELECT * FROM books LIMIT 5'
    ) as any[];

    await connection.end();

    return NextResponse.json({
      success: true,
      message: 'Database yapısı kontrol edildi',
      columns: columns,
      sampleBooks: books
    });

  } catch (error: any) {
    console.error('Fix images error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
