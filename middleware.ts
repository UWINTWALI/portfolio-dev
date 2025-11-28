import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  return NextResponse.next();
}

export const config = {
  // Example: Apply the middleware only to auth or API routes if needed
  matcher: '/(api|projects|resume|blogs|tars|_next/static|_next/image)',
};
