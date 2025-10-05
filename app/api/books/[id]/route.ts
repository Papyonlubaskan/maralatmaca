import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database/mysql';
import { apiRateLimiter } from '@/lib/rateLimiter';
import { Validator } from '@/lib/validations';
import { requireAdmin } from '@/lib/middleware/admin-auth';
import { successResponse, errorResponse, paginatedResponse, rateLimitResponse } from '@/lib/api-response';

// GET: Belirli bir kitabı getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimit = apiRateLimiter.check(clientIP);
    
    if (!rateLimit.allowed) {
      return NextResponse.json({ 
        success: false, 
        error: 'Too many requests' 
      }, { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetTime.toString()
        }
      });
    }

    const bookId = (await params).id;
    
    // Input validation
    const sanitizedId = Validator.sanitizeInput(bookId);
    if (!sanitizedId || sanitizedId.length < 1) {
      return errorResponse('Invalid book ID', 400);
    }

    // MySQL'den kitap çek (ID veya slug ile)
    const isNumeric = /^\d+$/.test(sanitizedId);
    const query = isNumeric 
      ? 'SELECT * FROM books WHERE id = ? LIMIT 1'
      : 'SELECT * FROM books WHERE slug = ? LIMIT 1';
    const books = await executeQuery(query, [sanitizedId]);
    const book = books[0];

    if (!book) {
      return errorResponse('Book not found', 404);
    }

    return NextResponse.json({
      success: true,
      data: book
    }, {
      headers: {
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.resetTime.toString()
      }
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    return errorResponse('Failed to fetch book', 500);
  }
}

// PUT: Kitabı güncelle (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimit = apiRateLimiter.check(clientIP);
    
    if (!rateLimit.allowed) {
      return NextResponse.json({ 
        success: false, 
        error: 'Too many requests' 
      }, { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetTime.toString()
        }
      });
    }

    // Admin authentication check
    const authError = await requireAdmin(request);
    if (authError) return authError;

    const bookId = (await params).id;
    const updateData = await request.json();

    // Input validation
    const sanitizedId = Validator.sanitizeInput(bookId);
    if (!sanitizedId || sanitizedId.length < 1) {
      return errorResponse('Invalid book ID', 400);
    }

    const validation = Validator.validateBookData(updateData);
    if (!validation.isValid) {
      return NextResponse.json({ 
        success: false, 
        error: 'Validation failed',
        details: validation.errors
      }, { status: 400 });
    }

    // MySQL'de kitap güncelle
    // Generate slug from title if needed
    const slug = updateData.slug || updateData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    const updateQuery = `
      UPDATE books 
      SET title = ?, slug = ?, description = ?, content = ?, author = ?, category = ?, cover_image = ?, status = ?, publish_date = ?, amazon_link = ?, dr_link = ?, idefix_link = ?, updated_at = NOW()
      WHERE id = ?
    `;
    
    await executeQuery(updateQuery, [
      updateData.title,
      slug,
      updateData.description ?? null,
      updateData.content ?? null,
      updateData.author ?? 'Maral Atmaca',
      updateData.category ?? null,
      updateData.cover_image ?? updateData.cover_image_url ?? null,
      updateData.status ?? 'draft',
      updateData.publish_date ?? null,
      updateData.amazon_link ?? null,
      updateData.dr_link ?? null,
      updateData.idefix_link ?? null,
      sanitizedId
    ]);

    return NextResponse.json({
      success: true,
      message: 'Book updated successfully',
      data: { id: sanitizedId, ...updateData }
    });
  } catch (error) {
    console.error('Error updating book:', error);
    return errorResponse('Failed to update book', 500);
  }
}

// DELETE: Kitabı sil (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimit = apiRateLimiter.check(clientIP);
    
    if (!rateLimit.allowed) {
      return NextResponse.json({ 
        success: false, 
        error: 'Too many requests' 
      }, { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetTime.toString()
        }
      });
    }

    // Admin authentication check
    const authError = await requireAdmin(request);
    if (authError) return authError;

    const bookId = (await params).id;

    // Input validation
    const sanitizedId = Validator.sanitizeInput(bookId);
    if (!sanitizedId || sanitizedId.length < 1) {
      return errorResponse('Invalid book ID', 400);
    }

    // İlişkili verileri sil (CASCADE)
    // 1. Bölümleri sil
    await executeQuery('DELETE FROM chapters WHERE book_id = ?', [sanitizedId]);
    
    // 2. Yorumları sil
    await executeQuery('DELETE FROM comments WHERE book_id = ?', [sanitizedId]);
    
    // 3. Beğenileri sil
    await executeQuery('DELETE FROM likes WHERE book_id = ?', [sanitizedId]);
    
    // 4. Kitabı sil
    await executeQuery('DELETE FROM books WHERE id = ?', [sanitizedId]);

    return NextResponse.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    return errorResponse('Failed to delete book', 500);
  }
}
