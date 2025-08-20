import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');


  if (error) {
    return NextResponse.redirect(new URL('/?error=' + error, request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log('Token data:', tokenData);

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokenData);
      return NextResponse.redirect(new URL('/?error=token_exchange_failed', request.url));
    }

    // Get user info using the access token
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      console.error('User info fetch failed:', userData);
      return NextResponse.redirect(new URL('/?error=user_info_failed', request.url));
    }

    // Create a simple session token (in production, use proper JWT)
    const sessionToken = Buffer.from(JSON.stringify({
      user: userData,
      access_token: tokenData.access_token,
      expires_at: Date.now() + (tokenData.expires_in * 1000)
    })).toString('base64');

    // Redirect to the main page with session data
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('session', sessionToken);
    
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/?error=callback_error', request.url));
  }
}
