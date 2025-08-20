'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to check if user has a session cookie
  const hasSessionCookie = (): boolean => {
    if (typeof document === 'undefined') return false;
    return document.cookie.includes('session=');
  };

  // Function to decode JWT token from cookie (for basic user info)
  const decodeUserFromCookie = (): User | null => {
    try {
      const cookies = document.cookie.split(';');
      const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session='));
      
      if (!sessionCookie) return null;
      
      const token = sessionCookie.split('=')[1];
      if (!token) return null;

      // Basic JWT decode (without verification)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      
      return {
        id: payload.sub || payload.id || 'unknown',
        email: payload.email || '',
        name: payload.name || '',
        picture: payload.picture || ''
      };
    } catch (error) {
      console.error('Error decoding user from cookie:', error);
      return null;
    }
  };

  // Check authentication status
  const checkAuth = async () => {
    try {
      console.log('🔍 Checking authentication...');
      console.log('🔍 Current URL:', window.location.href);
      console.log('🔍 Cookies:', document.cookie);
      
      // First check if we have a session cookie
      if (hasSessionCookie()) {
        console.log('🍪 Session cookie found');
        
        // Try to get user info from server first
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080';
        console.log('🌐 Server URL:', serverUrl);
        
        try {
          const response = await fetch(`${serverUrl}/api/auth/me`, {
            credentials: 'include',
          });

          console.log('📡 Auth check response status:', response.status);
          console.log('📡 Auth check response ok:', response.ok);

          if (response.ok) {
            const userData = await response.json();
            console.log('✅ User data received from server:', userData);
            setUserState(userData);
            return;
          } else {
            console.log('❌ Server auth check failed, trying cookie decode');
          }
        } catch (serverError) {
          console.log('❌ Server auth check error, trying cookie decode:', serverError);
        }
        
        // Fallback: decode user from cookie
        const userFromCookie = decodeUserFromCookie();
        if (userFromCookie) {
          console.log('✅ User data decoded from cookie:', userFromCookie);
          setUserState(userFromCookie);
          return;
        }
      }
      
      // No valid session found
      console.log('❌ No valid session found');
      setUserState(null);
      
    } catch (error) {
      console.error('❌ Error checking auth:', error);
      setUserState(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = () => {
    console.log('🔗 Redirecting to Google OAuth...');
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080';
    window.location.href = `${serverUrl}/api/auth/login`;
  };

  const logout = async () => {
    try {
      console.log('🚪 Logging out...');
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080';
      
      // Try to call logout endpoint
      try {
        await fetch(`${serverUrl}/api/auth/logout`, {
          method: 'POST',
          credentials: 'include',
        });
      } catch (error) {
        console.log('Server logout failed, clearing client-side only:', error);
      }
      
      // Clear client-side state
      setUserState(null);
      
      // Clear cookies manually if needed
      document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      // Redirect to login
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
      setUserState(null);
      window.location.href = '/login';
    }
  };

  const setUser = (userData: User | null) => {
    setUserState(userData);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    setUser,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
