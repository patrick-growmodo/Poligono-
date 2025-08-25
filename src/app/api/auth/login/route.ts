import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function GET(request: NextRequest) {
  try {
    // Get the returnTo URL from query params
    const { searchParams } = new URL(request.url);
    const returnTo = searchParams.get('returnTo') || '/';
    const screenHint = searchParams.get('screen_hint');

    // Start the login process
    const loginResponse = await auth0.startInteractiveLogin({
      returnTo,
      authorizationParameters: {
        screen_hint: screenHint || undefined
      }
    });
    console.log('Login Response:', loginResponse);

    return loginResponse;

  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
