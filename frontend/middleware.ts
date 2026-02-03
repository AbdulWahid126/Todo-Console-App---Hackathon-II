import { NextRequest, NextResponse } from 'next/server';

// Middleware to protect authenticated routes
export function middleware(request: NextRequest) {
  // Check if the current path is one that should be excluded from protection
  const excludedPaths = [
    '/auth',
    '/_next',
    '/favicon.ico',
    '/sitemap.xml',
    '/robots.txt',
    '/',
    '/about',
    '/contact'
  ];

  // Check if the current path starts with any of the excluded paths
  const isExcludedPath = excludedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If it's an excluded path, allow the request to continue
  if (isExcludedPath) {
    return NextResponse.next();
  }

  // Define protected routes that require authentication
  const protectedPaths = [
    '/dashboard',
    '/todos',
    '/settings',
  ];

  // Check if the current path starts with any of the protected paths
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    // For protected routes, we rely on client-side authentication checks
    // since tokens are stored in localStorage and not accessible to server-side middleware
    // The client-side code will handle redirects if no token is found
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Define which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all paths - we'll handle exclusions in the middleware function
     */
    '/((?!_next/static|_next/image|_next/webpack-hmr|favicon.ico|api/).*)',
  ],
};