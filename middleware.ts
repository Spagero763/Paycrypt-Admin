import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Protect app routes by requiring an auth cookie set after wallet connection.
const PROTECTED_PREFIXES = ["/dashboard", "/orders", "/tokens", "/users", "/admin"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  if (!isProtected) return NextResponse.next()

  const hasAuthCookie = request.cookies.get("auth")?.value === "1"
  if (!hasAuthCookie) {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orders/:path*",
    "/tokens/:path*",
    "/users/:path*",
    "/admin/:path*",
  ],
}
