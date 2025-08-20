# Google OAuth Setup Guide

## Environment Variables Required

Add these to your `.env.local` file:

```env
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Google Cloud Console Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select existing one
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth 2.0 credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback` (for development)
     - `https://yourdomain.com/api/auth/callback` (for production)
5. **Copy the credentials**:
   - Client ID → `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - Client Secret → `GOOGLE_CLIENT_SECRET`

## How It Works

1. **User clicks "Log in with Google"**
2. **Redirects to Google account selection**
3. **User selects account and authorizes**
4. **Google redirects back to `/api/auth/callback`**
5. **Callback exchanges code for tokens**
6. **Gets user info from Google**
7. **Redirects to dashboard**

## Testing

1. Restart your dev server: `npm run dev`
2. Go to: `http://localhost:3000/login`
3. Click "Log in with Google"
4. Should redirect to Google account selection
5. After authorization, should redirect to dashboard

## Troubleshooting

- **HTTP 500 Error**: Check that `GOOGLE_CLIENT_SECRET` is set correctly
- **Invalid redirect URI**: Make sure the redirect URI in Google Console matches exactly
- **Client ID not found**: Check that `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set
