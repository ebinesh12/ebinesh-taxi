import { NextResponse } from "next/server";
import { createSupabaseMiddlewareClient } from "@/utils/supabase/middleware";

export async function middleware(request) {
  const { supabase, response } = createSupabaseMiddlewareClient(request);

  // This will refresh the session if it's expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path === "/auth/login" ||
    path === "/auth/register";

  // If user is logged in and tries to access a public path, redirect them
  if (session && isPublicPath) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // If user is not logged in and tries to access a protected path, redirect them
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Allow the request to proceed
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};