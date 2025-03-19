import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/auth/login' || path === '/auth/signup'

  // Check for token in localStorage (client-side storage)
  const hasToken = request.cookies.has('payload-token')

  // If trying to access public path while logged in, redirect to home
  if (isPublicPath && hasToken) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // If trying to access protected path while logged out, redirect to login
  if (!isPublicPath && !hasToken) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/auth/login',
    '/blog',
    '/blog/:id',
    '/auth/signup',
    '/dashboard/:path*',
    '/admin/:path*',
  ],
}
