'use client';

import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

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
    if (!isLoading && !user) {
      console.log('🚫 No user found, redirecting to login');
      console.log('🔍 Current URL:', window.location.href);
      console.log('🍪 Cookies:', document.cookie);
      router.replace(redirectTo);
    } else if (!isLoading && user) {
      console.log('✅ User authenticated, rendering protected content');
    }
  }, [user, isLoading, router, redirectTo]);

  // If loading, show a loading state
  if (isLoading) {
    console.log('⏳ ProtectedRoute - Loading authentication...');
    return (
      <div className="h-screen flex auth-dark-gradient">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg font-inter">Checking authentication...</p>
            <p className="text-white/70 text-sm font-inter mt-2">Please wait while we verify your session</p>
          </div>
        </div>
        <div className="hidden lg:flex w-1/2 relative p-[12px] pl-0">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-pulse bg-white/10 rounded-lg w-64 h-40 mb-4"></div>
              <div className="animate-pulse bg-white/10 rounded h-4 w-48 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no user, show a redirecting state
  if (!isLoading && !user) {
    console.log('🚫 ProtectedRoute - No user found, showing redirect state');
    return (
      <div className="h-screen flex auth-dark-gradient">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse rounded-full h-12 w-12 bg-white/20 mx-auto mb-4"></div>
            <p className="text-white text-lg font-inter">Redirecting to login...</p>
            <p className="text-white/70 text-sm font-inter mt-2">Authentication required</p>
          </div>
        </div>
        <div className="hidden lg:flex w-1/2 relative p-[12px] pl-0">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-pulse bg-white/10 rounded-lg w-64 h-40 mb-4"></div>
              <div className="animate-pulse bg-white/10 rounded h-4 w-48 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated, render children
  if (!isLoading && user) {
    console.log('✅ ProtectedRoute - Rendering protected content for user');
    return <>{children}</>;
  }

  // This should never be reached, but just in case
  return null;
}
