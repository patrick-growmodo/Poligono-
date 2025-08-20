// lib/auth0.js

import { Auth0Client } from '@auth0/nextjs-auth0/server';
// import { validateEnvironmentVariables } from './security';

// // Validate environment variables for security
// try {
//   // validateEnvironmentVariables();
//   console.log('✅ Auth0 environment variables are properly configured');
// } catch (error) {
//   console.error('❌ Auth0 configuration error:', (error as Error).message);
//   throw error;
// }

// Only include audience if it's properly configured
const authorizationParams: any = {
  scope: process.env.AUTH0_SCOPE || 'openid profile email',
};

// Only add audience if it's set and not a placeholder
if (process.env.AUTH0_AUDIENCE && 
    process.env.AUTH0_AUDIENCE !== 'your_auth_api_identifier' && 
    process.env.AUTH0_AUDIENCE !== 'your-api-identifier') {
  authorizationParams.audience = process.env.AUTH0_AUDIENCE;
}

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  appBaseUrl: process.env.AUTH0_BASE_URL || process.env.APP_BASE_URL || 'http://localhost:3000',
  secret: process.env.AUTH0_SECRET!,
  authorizationParameters: authorizationParams,
  session: {
    absoluteDuration: 24 * 60 * 60, // 24 hours
    inactivityDuration: 60 * 60, // 1 hour inactivity timeout
    rolling: true, // Enable rolling sessions
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Secure cookies in production
      sameSite: 'lax' as const, // CSRF protection
    },
  },
  // Security settings
  httpTimeout: 10000, // 10 second timeout
  enableTelemetry: false, // Disable telemetry for privacy
  allowInsecureRequests: process.env.NODE_ENV !== 'production', // Only allow insecure requests in development
});