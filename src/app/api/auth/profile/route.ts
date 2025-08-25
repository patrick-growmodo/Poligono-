import { auth0 } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const profile = await auth0.getSession();
    const token = await auth0.getAccessToken();
    
    // const user = await auth0.getUser();
    console.log("Token:", token); 
    return NextResponse.json({ profile, token });
  } catch (error) {
    console.error("Profile API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }

}