import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST() {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'images');
    
    // Dizin yoksa oluştur
    await fs.mkdir(uploadsDir, { recursive: true });
    
    // Test dosyası oluştur
    const testContent = 'Test image content';
    const testFilename = `test_${Date.now()}.txt`;
    const testFilePath = path.join(uploadsDir, testFilename);
    
    await fs.writeFile(testFilePath, testContent);
    
    // Dosyayı oku
    const fileContent = await fs.readFile(testFilePath, 'utf8');
    
    return NextResponse.json({
      success: true,
      message: 'Test dosyası oluşturuldu',
      filename: testFilename,
      path: testFilePath,
      content: fileContent,
      uploadsDir: uploadsDir
    });

  } catch (error: any) {
    console.error('Test upload error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
