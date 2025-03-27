import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that don't require authentication
const publicPaths = [
  '/auth/signin',
  '/auth/signup',
  '/auth/forgot-password',
  '/api/auth/signin',
  '/api/auth/signup',
  '/api/auth/session',
];

// Function to check if the path is public
const isPublicPath = (path: string) => {
  return publicPaths.some(publicPath => path.startsWith(publicPath));
};

// Function to check if the path is an API route
const isApiRoute = (path: string) => {
  return path.startsWith('/api');
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is a public path or an API route
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Get the session cookie
  const sessionCookie = request.cookies.get('session');

  // If there's no session and this is not a public path, redirect to signin
  if (!sessionCookie && !isApiRoute(pathname)) {
    const signinUrl = new URL('/auth/signin', request.url);
    return NextResponse.redirect(signinUrl);
  }

  // If there is a session and the user is trying to access auth pages, redirect to dashboard
  if (sessionCookie && (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup'))) {
    const dashboardUrl = new URL('/', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public directory (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
