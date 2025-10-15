import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database/mysql';

export async function POST(request: NextRequest) {
  try {
    console.log('Fix book images API çağrıldı...');
    
    // Mevcut dosyaları al
    const availableFiles = [
      'Yarala_Sar_e9629d1b.jpg',
      'saka_ve_sanr__4081d982.jpg',
      'saka_ve_sanr__c8617e41.jpg'
    ];
    
    // Kitap verilerini güncelle
    const updates = [
      {
        id: 38,
        title: 'SARKAÇ',
        image: 'Yarala_Sar_e9629d1b.jpg'
      },
      {
        id: 2,
        title: 'Saka ve Sanrı',
        image: 'saka_ve_sanr__4081d982.jpg'
      }
    ];
    
    for (const update of updates) {
      const imageUrl = `/uploads/images/${update.image}`;
      await executeQuery(
        'UPDATE books SET cover_image = ? WHERE id = ?',
        [imageUrl, update.id]
      );
      console.log(`Updated book ${update.id} (${update.title}) with image: ${imageUrl}`);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Book images updated successfully',
      updates: updates
    });

  } catch (error) {
    console.error('Fix book images error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error updating book images',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
