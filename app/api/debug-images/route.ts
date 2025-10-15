import { NextRequest, NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(request: NextRequest) {
  try {
    console.log('Debug images API çağrıldı...');
    
    // Uploads klasörünü kontrol et
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'images');
    console.log('Uploads dir:', uploadsDir);
    
    const uploadsExists = existsSync(uploadsDir);
    console.log('Uploads dir exists:', uploadsExists);
    
    if (!uploadsExists) {
      return NextResponse.json({
        success: false,
        message: 'Uploads directory does not exist',
        path: uploadsDir
      });
    }
    
    // Dosyaları listele
    const files = await readdir(uploadsDir);
    console.log('Files in uploads dir:', files);
    
    return NextResponse.json({
      success: true,
      message: 'Uploads directory exists',
      path: uploadsDir,
      files: files,
      fileCount: files.length
    });

  } catch (error) {
    console.error('Debug images error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error checking uploads directory',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
