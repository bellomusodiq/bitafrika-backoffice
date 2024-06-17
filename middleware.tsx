import { NextRequest, NextResponse } from "next/server";
import { ADMIN_ROLES } from "@/utils/utils";

export function middleware(request: NextRequest) {
  const publicPaths = ["/signin"];
  let session: any = null;

  const data = request.cookies.get("auth")?.value;
  if (data) session = JSON.parse(data);
  const isAuthenticated = session?.accessToken;
  const nextUrl = request.nextUrl;
  const PRIVATE_ROUTES = ADMIN_ROLES[session?.user?.role || ""];

  // if not isAuthenticated, only allow visiting public paths
  if (!isAuthenticated && !publicPaths.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // redirect if users has no access to the current route
  if (
    isAuthenticated &&
    !PRIVATE_ROUTES?.includes(nextUrl.pathname.split("/")[1])
  ) {
    return NextResponse.redirect(new URL(`/${PRIVATE_ROUTES[0]}`, request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // "/((?!api|_next/static|_next/image|favicon.ico|world-map-bg.svg).*)",
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/((?!.*\\.|api\\/).*)",
  ],
};
