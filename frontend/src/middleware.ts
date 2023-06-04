import { NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get('access_token');
  if (req.url.includes('/login')) {
    if (!!token?.value) {
      return NextResponse.redirect(new URL('/employee', req.url));
    }
  } else if (req.url.includes('/employee')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  
  return NextResponse.next();
}