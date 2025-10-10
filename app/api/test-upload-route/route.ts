import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test uploads dizinindeki dosyaları listele
    const testUrl = 'https://maralatmaca-production.up.railway.app/uploads/images/488645842_10162579421902114_1517769849205234661_n_357e6c2a.jpg';
    
    return NextResponse.json({
      success: true,
      message: 'Upload route test',
      testUrl: testUrl,
      instructions: [
        '1. Bu URL\'yi browser\'da açın: ' + testUrl,
        '2. Eğer 404 alırsanız, upload route çalışmıyor',
        '3. Eğer resim görünürse, upload route çalışıyor'
      ]
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
