import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Force Vercel CDN to never cache — this is what fixes the .ai domain
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0, s-maxage=0')
  response.headers.set('CDN-Cache-Control', 'no-cache')
  response.headers.set('Vercel-CDN-Cache-Control', 'no-cache')

  return response
}

export const config = {
  // Run on all page routes, skip static assets (images, fonts, next internals)
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.svg|style-previews|api).*)'],
}
