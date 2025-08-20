'use client';

import { useEffect } from 'react';
import { useAuth } from './AuthProvider';

export default function SessionHandler() {
  const { user, setUser } = useAuth();

  useEffect(() => {
    // Check for session cookie and extract user data
    const checkSession = () => {
      console.log('🔍 SessionHandler: Checking for session...');
      
      const cookies = document.cookie.split(';');
      console.log('🍪 All cookies:', cookies);
      
      const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session='));
      console.log('🎯 Session cookie found:', sessionCookie);
      
      if (sessionCookie && !user) {
        try {
          const sessionValue = sessionCookie.split('=')[1];
          console.log('📝 Session value:', sessionValue);
          
          const sessionData = JSON.parse(atob(sessionValue));
          console.log('📦 Parsed session data:', sessionData);
          
          if (sessionData.user) {
            console.log('✅ User data found:', sessionData.user);
            
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(sessionData.user));
            localStorage.setItem('access_token', sessionData.access_token);
            
            // Update the auth context
            setUser(sessionData.user);
            console.log('🔄 User state updated');
            
            // Clear the session cookie to prevent future checks
            document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            console.log('🧹 Session cookie cleared');
            
            // Redirect to dashboard if on login page
            if (window.location.pathname === '/login') {
              console.log('🔄 Redirecting to dashboard...');
              window.location.href = '/dashboard';
            }
          } else {
            console.log('❌ No user data in session');
          }
        } catch (error) {
          console.error('❌ Error parsing session:', error);
        }
      } else {
        console.log('ℹ️ No session cookie found or user already exists');
      }
    };

    checkSession();
  }, [user, setUser]);

  return null; // This component doesn't render anything
}
