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

    // Her kitap için uygun dosyayı bul ve yeniden adlandır
    for (const book of books) {
      const currentFilename = path.basename(book.cover_image);
      
      // Dosya var mı kontrol et
      const currentPath = path.join(imagesDir, currentFilename);
      try {
        await fs.access(currentPath);
        results.push({
          id: book.id,
          title: book.title,
          filename: currentFilename,
          status: 'exists'
        });
      } catch (error) {
        // Dosya yok, mevcut dosyalardan birini kullan
        if (files.length > 0) {
          const newFilename = files.shift(); // İlk dosyayı al
          const oldPath = path.join(imagesDir, newFilename);
          const newPath = path.join(imagesDir, currentFilename);
          
          try {
            await fs.copyFile(oldPath, newPath);
            
            // Database'i güncelle
            await connection.query(
              'UPDATE books SET cover_image = ? WHERE id = ?',
              [book.cover_image, book.id]
            );
            
            renamedCount++;
            results.push({
              id: book.id,
              title: book.title,
              oldFilename: newFilename,
              newFilename: currentFilename,
              status: 'renamed'
            });
          } catch (copyError) {
            results.push({
              id: book.id,
              title: book.title,
              error: 'Copy failed'
            });
          }
        }
      }
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
