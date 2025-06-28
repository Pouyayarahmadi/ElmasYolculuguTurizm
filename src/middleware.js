import { NextResponse } from 'next/server';

export function middleware(req) {
  const isAdmin = req.cookies.get("isAdmin");
  
  // Admin sayfalarına erişim kontrolü, ancak /admin/login hariç
  if (
    !isAdmin &&
    req.nextUrl.pathname.startsWith("/admin") &&
    req.nextUrl.pathname !== "/admin/login"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // API routes için admin kontrolü (isteğe bağlı)
  if (req.nextUrl.pathname.startsWith("/api/admin") && !isAdmin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

// Middleware'in hangi path'lerde çalışacağını belirt
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    // Admin API routes için de çalışsın
    '/api/admin/:path*'
  ],
}; 