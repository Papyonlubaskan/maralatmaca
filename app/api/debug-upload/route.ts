import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Upload dizinini kontrol et
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'images');
    
    let dirExists = false;
    let files: string[] = [];
    
    try {
      const stats = await fs.stat(uploadDir);
      dirExists = stats.isDirectory();
      files = await fs.readdir(uploadDir);
    } catch (error) {
      dirExists = false;
    }

    // Test dosyası oluştur
    let testFileCreated = false;
    try {
      const testFilePath = path.join(uploadDir, `test_${Date.now()}.txt`);
      await fs.writeFile(testFilePath, 'Test file for upload debug');
      testFileCreated = true;
      
      // Test dosyasını sil
      await fs.unlink(testFilePath);
    } catch (error) {
      testFileCreated = false;
    }

    return NextResponse.json({
      success: true,
      uploadDir: uploadDir,
      dirExists: dirExists,
      fileCount: files.length,
      files: files.slice(0, 5), // İlk 5 dosya
      canWrite: testFileCreated,
      permissions: {
        read: dirExists,
        write: testFileCreated
      }
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
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
    const filename = `debug_${timestamp}_${file.name}`;
    const filepath = path.join(uploadDir, filename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await fs.writeFile(filepath, buffer);

    return NextResponse.json({
      success: true,
      message: 'Debug upload başarılı',
      filename: filename,
      url: `/uploads/images/${filename}`,
      size: buffer.length,
      filepath: filepath
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
