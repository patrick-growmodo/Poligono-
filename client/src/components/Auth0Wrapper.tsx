'use client';

import { ReactNode } from 'react';

interface Auth0WrapperProps {
  children: ReactNode;
}

export default function Auth0Wrapper({ children }: Auth0WrapperProps) {
  const hasAuth0Config = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID 

  if (!hasAuth0Config) {
    console.warn('Auth0 not configured. Running without authentication.');
    return <>{children}</>;
  }

  try {
    // Dynamic import to avoid build-time errors
    const { Auth0Provider } = require('@auth0/nextjs-auth0');
    return <Auth0Provider>{children}</Auth0Provider>;
  } catch (error) {
    console.error('Failed to load Auth0Provider:', error);
    return <>{children}</>;
  }
}
