import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database/mysql';
import { apiRateLimiter } from '@/lib/rateLimiter';
import { successResponse, errorResponse, rateLimitResponse } from '@/lib/api-response';

// GET: Kullanıcının okuma geçmişini getir
export async function GET(request: NextRequest) {
  try {
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimit = apiRateLimiter.check(clientIP);
    
    if (!rateLimit.allowed) {
      return rateLimitResponse({
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.resetTime.toString()
      });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return errorResponse('User ID is required', 400);
    }

    // Mock reading history (tablo henüz oluşturulmadı)
    const mockHistory = [
      {
        id: 1,
        user_id: userId,
        book_id: 1,
        chapter_id: 1,
        line_number: 15,
        progress_percentage: 25.5,
        last_read_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 saat önce
        book_title: 'SARKAÇ',
        book_slug: 'sarkac',
        cover_image: '/images/sarkac-cover.jpg',
        chapter_title: 'Bölüm 1',
        chapter_slug: 'bolum-1'
      },
      {
        id: 2,
        user_id: userId,
        book_id: 2,
        chapter_id: 3,
        line_number: 8,
        progress_percentage: 60.0,
        last_read_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 gün önce
        book_title: 'Örnek Kitap',
        book_slug: 'ornek-kitap',
        cover_image: '/images/ornek-cover.jpg',
        chapter_title: 'Bölüm 3',
        chapter_slug: 'bolum-3'
      }
    ];
    
    return successResponse(mockHistory, 'Reading history retrieved');
  } catch (error) {
    console.error('Error fetching reading history:', error);
    return errorResponse('Failed to fetch reading history');
  }
}

// POST: Okuma geçmişini güncelle
export async function POST(request: NextRequest) {
  try {
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimit = apiRateLimiter.check(clientIP);
    
    if (!rateLimit.allowed) {
      return rateLimitResponse({
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.resetTime.toString()
      });
    }

    const { userId, bookId, chapterId, lineNumber, progressPercentage } = await request.json();

    if (!userId || !bookId) {
      return errorResponse('User ID and Book ID are required', 400);
    }

    // Mevcut kaydı kontrol et
    const checkQuery = 'SELECT id FROM reading_history WHERE user_id = ? AND book_id = ?';
    const existing = await executeQuery(checkQuery, [userId, bookId]);

    if (existing && existing.length > 0) {
      // Güncelle
      const updateQuery = `
        UPDATE reading_history 
        SET chapter_id = ?, line_number = ?, progress_percentage = ?, last_read_at = NOW()
        WHERE user_id = ? AND book_id = ?
      `;
      await executeQuery(updateQuery, [chapterId, lineNumber, progressPercentage, userId, bookId]);
    } else {
      // Yeni kayıt oluştur
      const insertQuery = `
        INSERT INTO reading_history (user_id, book_id, chapter_id, line_number, progress_percentage)
        VALUES (?, ?, ?, ?, ?)
      `;
      await executeQuery(insertQuery, [userId, bookId, chapterId, lineNumber, progressPercentage]);
    }

    return successResponse({ message: 'Reading history updated' }, 'Reading progress saved');
  } catch (error) {
    console.error('Error updating reading history:', error);
    return errorResponse('Failed to update reading history');
  }
}
