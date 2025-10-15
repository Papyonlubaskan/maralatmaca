import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    console.log('Test upload API çağrıldı...');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    console.log('Test - Form data alındı:', { 
      fileName: file ? file.name : 'No file',
      fileSize: file ? file.size : 0,
      fileType: file ? file.type : 'No type'
    });

    if (!file) {
      return NextResponse.json({ error: 'Dosya seçilmedi' }, { status: 400 });
    }

    // Upload dizinini kontrol et
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'images');
    console.log('Upload dizini:', uploadDir);
    
    try {
      await fs.access(uploadDir);
      console.log('Upload dizini mevcut');
    } catch (error) {
      console.log('Upload dizini yok, oluşturuluyor...');
      await fs.mkdir(uploadDir, { recursive: true });
      console.log('Upload dizini oluşturuldu');
    }

    // Dosyayı buffer'a çevir
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Test dosyası oluştur
    const timestamp = Date.now();
    const filename = `test_${timestamp}.jpg`;
    const filepath = path.join(uploadDir, filename);

    // Dosyayı kaydet
    await fs.writeFile(filepath, buffer);
    console.log('Test dosyası kaydedildi:', filepath);

    // URL oluştur
    let url = `/uploads/images/${filename}`;
    
    // Railway production için absolute URL oluştur
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SITE_URL) {
      url = `${process.env.NEXT_PUBLIC_SITE_URL}${url}`;
    }

    return NextResponse.json({
      success: true,
      message: 'Test upload başarılı',
      data: {
        filename: filename,
        url: url,
        size: buffer.length
      }
    });

  } catch (error) {
    console.error('Test upload error:', error);
    return NextResponse.json({ error: 'Test upload başarısız' }, { status: 500 });
  }
}