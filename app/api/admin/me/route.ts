import { NextRequest } from 'next/server';
import { executeQuery } from '@/lib/database/mysql';
import { requireAdmin } from '@/lib/middleware/admin-auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const adminUser = (request as any).user;
    
    if (!adminUser || !adminUser.id) {
      return errorResponse('Kullanıcı bilgisi bulunamadı', 401);
    }
    
    // Admin kullanıcı bilgilerini getir
    const users = await executeQuery(
      'SELECT id, username, email, two_factor_secret, is_active, created_at FROM admins WHERE id = ?',
      [adminUser.id]
    );

    if (!users || users.length === 0) {
      return errorResponse('Kullanıcı bulunamadı', 404);
    }

    return successResponse({ user: users[0] });
  } catch (error) {
    console.error('Get admin user error:', error);
    return errorResponse('Kullanıcı bilgileri alınamadı', 500);
  }
}

