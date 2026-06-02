import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Database } from "@/types/database.types";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  const supabase = createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Authenticate session securely using getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // 1. Protected routes that require active authentication
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/compare")) {
    if (!user) {
      console.log(`[Proxy] Non-authenticated request to ${pathname}. Redirecting to /login`);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 2. Auth pages that should be blocked if user is already signed in
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (user) {
      console.log(`[Proxy] Authenticated user requesting auth page ${pathname}. Redirecting to /dashboard`);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/compare/:path*", "/login", "/register"],
};
