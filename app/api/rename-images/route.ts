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
    
    // Upload dizinindeki dosyaları listele
    const files = await fs.readdir(imagesDir);
    
    // Database'deki kitapları al
    const [books] = await connection.query(
      'SELECT id, title, cover_image FROM books WHERE cover_image IS NOT NULL AND cover_image != ""'
    ) as any[];

    const results = [];
    let renamedCount = 0;

    // Database'i mevcut dosyalarla eşleştir
    for (let i = 0; i < books.length && i < files.length; i++) {
      const book = books[i];
      const availableFile = files[i];
      
      // Yeni URL oluştur
      const newUrl = `/uploads/images/${availableFile}`;
      
      // Database'i güncelle
      await connection.query(
        'UPDATE books SET cover_image = ? WHERE id = ?',
        [newUrl, book.id]
      );
      
      renamedCount++;
      results.push({
        id: book.id,
        title: book.title,
        oldUrl: book.cover_image,
        newUrl: newUrl,
        newFilename: availableFile,
        status: 'updated'
      });
    }

    await connection.end();

    return NextResponse.json({
      success: true,
      message: `${renamedCount} resim dosyası yeniden adlandırıldı`,
      renamedCount,
      results,
      availableFiles: files
    });

  } catch (error: any) {
    console.error('Rename images error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
