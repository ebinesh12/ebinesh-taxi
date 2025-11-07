import { NextResponse } from "next/server";
import { supabase} from "@/utils/supabase/client";

export async function POST(req) {
  // const supabase = createSupabaseServerClient();
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // signInWithPassword will automatically handle the session and set the cookie
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return NextResponse.json(
        { message: error?.message || "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", user: data.user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}