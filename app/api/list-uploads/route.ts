import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'uploads', 'images');
    
    let files: string[] = [];
    try {
      files = await fs.readdir(imagesDir);
    } catch (error) {
      return NextResponse.json({
        success: false,
        error: 'Uploads dizini bulunamadı'
      }, { status: 404 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maralatmaca-production.up.railway.app';
    
    const fileList = files.map(filename => ({
      filename: filename,
      url: `${siteUrl}/uploads/images/${filename}`,
      relativeUrl: `/uploads/images/${filename}`
    }));

    return NextResponse.json({
      success: true,
      message: `${files.length} dosya bulundu`,
      files: fileList,
      siteUrl: siteUrl,
      uploadsDir: imagesDir
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
