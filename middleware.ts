import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const maintenanceMode = process.env.MAINTENANCE_MODE === 'true';
  const pathname = request.nextUrl.pathname;

  // Admin paneli ve bakım sayfası hariç tüm sayfaları bakıma yönlendir
  const isAdminPath = pathname.startsWith('/yonetim') || pathname.startsWith('/api/admin') || pathname.startsWith('/api/auth');
  const isMaintenancePath = pathname === '/maintenance';
  const isPublicAsset = pathname.startsWith('/_next') || pathname.startsWith('/public') || pathname.startsWith('/images');

  if (maintenanceMode && !isAdminPath && !isMaintenancePath && !isPublicAsset) {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|images|uploads).*)',
  ],
};
