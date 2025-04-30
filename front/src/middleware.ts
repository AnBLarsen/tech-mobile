import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse, NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const {pathname, origin} = request.nextUrl;

  if((pathname === "/dashboard" || pathname === "/cart" || pathname === "/checkout" || pathname === "/payment" ) && !request.cookies.get("userSession")?.value){
    const loginURL = new NextURL("/login", origin)
    return NextResponse.redirect(loginURL)
  } else {
    return NextResponse.next();
  }
}
 
