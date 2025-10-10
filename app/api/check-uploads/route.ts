import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const imagesDir = path.join(uploadsDir, 'images');
    
    // Uploads dizinini kontrol et
    let uploadsExists = false;
    let imagesExists = false;
    let files: string[] = [];
    
    try {
      const stats = await fs.stat(uploadsDir);
      uploadsExists = stats.isDirectory();
      
      if (uploadsExists) {
        const imagesStats = await fs.stat(imagesDir);
        imagesExists = imagesStats.isDirectory();
        
        if (imagesExists) {
          files = await fs.readdir(imagesDir);
        }
      }
    } catch (error) {
      // Dizin yok
    }

    return NextResponse.json({
      success: true,
      uploadsDir: uploadsDir,
      uploadsExists,
      imagesExists,
      files: files,
      fileCount: files.length
    });

  } catch (error: any) {
    console.error('Check uploads error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
