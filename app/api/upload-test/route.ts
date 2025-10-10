import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    console.log('Upload test başladı...');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'Dosya seçilmedi'
      }, { status: 400 });
    }

    // Upload dizinini oluştur
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'images');
    await fs.mkdir(uploadDir, { recursive: true });

    // Test dosyası oluştur
    const timestamp = Date.now();
    const filename = `test_${timestamp}_${file.name}`;
    const filepath = path.join(uploadDir, filename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log('Dosya yazılıyor:', filepath);
    await fs.writeFile(filepath, buffer);
    
    // Dosyanın gerçekten yazıldığını kontrol et
    const stats = await fs.stat(filepath);
    console.log('Dosya yazıldı, boyut:', stats.size);

    // URL oluştur - tam URL ile
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maralatmaca-production.up.railway.app';
    const url = `${siteUrl}/uploads/images/${filename}`;

    return NextResponse.json({
      success: true,
      message: 'Test dosyası başarıyla yüklendi',
      filename: filename,
      url: url,
      relativeUrl: `/uploads/images/${filename}`,
      size: buffer.length,
      filepath: filepath,
      siteUrl: siteUrl
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
