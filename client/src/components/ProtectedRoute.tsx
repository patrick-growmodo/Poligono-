'use client';

import { useAuth } from './AuthProvider';
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
  const { user, loading, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      console.log('🚫 No user found, redirecting to login');
      router.replace(redirectTo);
    }
  }, [user, loading, router, redirectTo]);

  // If loading, show a loading state that matches the login page design
  if (loading) {
    return (
      <div className="h-screen flex auth-dark-gradient">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg font-inter">Checking authentication...</p>
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

  // If no user, show a redirecting state that matches the login page design
  if (!user) {
    return (
      <div className="h-screen flex auth-dark-gradient">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse rounded-full h-12 w-12 bg-white/20 mx-auto mb-4"></div>
            <p className="text-white text-lg font-inter">Redirecting to login...</p>
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
  return <>{children}</>;
}
