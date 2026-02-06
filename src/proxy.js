import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

// Helper function to verify the JWT
const verifyJwtToken = async (token) => {
  try {
    // Verify token and get user details from Supabase
    const { data: user } = await supabase.auth.getUser(token);
    return user;
  } catch (error) {
    console.error("JWT Verification failed:", error.message);
    return null;
  }
};

export async function proxy(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path === "/booking-ride" ||
    path === "/booking-success" ||
    path === "/booking-verification" ||
    path === "/fare-estimation" ||
    path === "/contact" ||
    path === "/about" ||
    path === "/services" ||
    path === "/fleet" ||
    path === "/auth/login" ||
    path === "/auth/register";

  // If the user is trying to access a public path
  if (isPublicPath) {
    if (token) {
      // If a token exists and is valid, redirect logged-in users away from public pages
      const payload = await verifyJwtToken(token);
      if (payload) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }
    // Allow access to public paths if no valid token
    return NextResponse.next();
  }

  // If the user is trying to access a protected path
  if (!token) {
    // If no token, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Verify the token for protected paths
  const payload = await verifyJwtToken(token);
  if (!payload) {
    // If token is invalid, redirect to login and clear the bad cookie
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  // If the token is valid, allow the request to proceed
  return NextResponse.next();
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
    "/((?!api|_next/static|_next/image|favicon.ico|$|booking-ride|fare-estimation|fare-estimation/*|booking-verification|booking-success).*)",
  ],
};
