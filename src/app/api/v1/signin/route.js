import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return NextResponse.json(
        { message: error?.message || "Invalid credentials" },
        { status: 401 },
      );
    }

    // Extract user info and access token from session
    const { user, access_token, expires_at } = data.session;

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.username,
      // Add other user metadata if needed here
    };

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: userResponse,
      },
      { status: 200 },
    );

    // Set access token as HttpOnly cookie
    response.cookies.set("token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expires_at
        ? expires_at - Math.floor(Date.now() / 1000)
        : 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 },
    );
  }
}
