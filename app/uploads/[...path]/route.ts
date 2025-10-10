import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const filePath = resolvedParams.path.join('/');
    const fullPath = path.join(process.cwd(), 'public', 'uploads', filePath);
    
    // Güvenlik kontrolü - sadece uploads klasörü içindeki dosyalara erişim
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fullPath.startsWith(uploadsDir)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Dosya var mı kontrol et
    try {
      const stats = await fs.stat(fullPath);
      if (!stats.isFile()) {
        return new NextResponse('Not Found', { status: 404 });
      }
    } catch (error) {
      return new NextResponse('Not Found', { status: 404 });
    }

    // Dosyayı oku
    const fileBuffer = await fs.readFile(fullPath);
    
    // Content-Type belirle
    const ext = path.extname(fullPath).toLowerCase();
    let contentType = 'application/octet-stream';
    
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.webp':
        contentType = 'image/webp';
        break;
      case '.svg':
        contentType = 'image/svg+xml';
        break;
    }

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

  } catch (error) {
    console.error('File serving error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
