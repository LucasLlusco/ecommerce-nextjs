import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    '/login/:path*',
    '/signup/:path*',
    '/my-account/:path*'
  ]
}

export function middleware(request: NextRequest) {
  const cookiesStore = cookies()
  const accessToken = cookiesStore.get('accessToken')?.value
  
  if(request.nextUrl.pathname.startsWith('/signup') && accessToken){
    return NextResponse.redirect(new URL('/my-account', request.url))
  }

  if(request.nextUrl.pathname.startsWith('/login') && accessToken){
    return NextResponse.redirect(new URL('/my-account', request.url))
  }

  if(request.nextUrl.pathname.startsWith('/my-account') && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}