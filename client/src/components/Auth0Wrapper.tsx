'use client';

import { ReactNode } from 'react';

interface Auth0WrapperProps {
  children: ReactNode;
}

export default function Auth0Wrapper({ children }: Auth0WrapperProps) {
  // Check if Auth0 environment variables are configured
  const hasAuth0Config = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || 
                        process.env.AUTH0_DOMAIN;

  if (!hasAuth0Config) {
    console.warn('Auth0 not configured. Running without authentication.');
    return <>{children}</>;
  }

  try {
    // Dynamic import to avoid build-time errors
    const { Auth0Provider } = require('@auth0/nextjs-auth0/client');
    return <Auth0Provider>{children}</Auth0Provider>;
  } catch (error) {
    console.error('Failed to load Auth0Provider:', error);
    return <>{children}</>;
  }
}
