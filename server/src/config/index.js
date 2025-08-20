require('dotenv').config();

const config = {
  // Server Configuration
  PORT: process.env.SERVER_PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Client Configuration
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  
  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'supersecret',
  JWT_EXPIRES_IN: '7d',
  
  // Google OAuth Configuration
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080'}/api/auth/callback`,
  
  // Auth0 Configuration
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  AUTH0_M2M_CLIENT_ID: process.env.AUTH0_M2M_CLIENT_ID,
  AUTH0_M2M_CLIENT_SECRET: process.env.AUTH0_M2M_CLIENT_SECRET,
  
  // CORS Configuration
  CORS_OPTIONS: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  },
  
  // Cookie Configuration
  COOKIE_OPTIONS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/'
  }
};

module.exports = config;
