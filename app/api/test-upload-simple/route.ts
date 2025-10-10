import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  return NextResponse.json({
    message: 'Test upload API - POST method kullanın',
    method: 'POST',
    endpoint: '/api/test-upload-simple',
    example: 'FormData ile file gönderin'
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log('Upload test başladı...');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    console.log('File alındı:', file ? file.name : 'No file');
    
    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'Dosya seçilmedi'
      }, { status: 400 });
    }

    // Upload dizinini oluştur
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'images');
    await fs.mkdir(uploadDir, { recursive: true });

    // Benzersiz dosya adı oluştur
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = path.extname(file.name);
    const filename = `test_${timestamp}_${randomString}${extension}`;
    const filepath = path.join(uploadDir, filename);

    // Dosyayı buffer'a çevir
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log('Dosya yazılıyor:', filepath);
    
    // Dosyayı kaydet
    await fs.writeFile(filepath, buffer);
    
    console.log('Dosya kaydedildi');

    // URL oluştur
    const url = `/uploads/images/${filename}`;

    return NextResponse.json({
      success: true,
      message: 'Test dosyası başarıyla yüklendi',
      filename: filename,
      url: url,
      size: buffer.length,
      filepath: filepath
    });

  } catch (error: any) {
    console.error('Upload test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
