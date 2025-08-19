'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login immediately
    if (!isLoading && !user) {
      router.replace(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

  // If loading, show nothing (prevents flash of content)
  if (isLoading) {
    return null;
  }

  // If no user, show nothing (redirect will happen)
  if (!user) {
    return null;
  }

  // User is authenticated, render children
  return <>{children}</>;
}
