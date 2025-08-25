'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';

export default function AuthDebug() {
  // const { user, isLoading } = useUser(); // Use the correct property name
  // console.log('🔍 Auth Debug:', { user, isLoading });
  const [pathname, setPathname] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const token = localStorage.getItem('auth_token');
    const userInfo = localStorage.getItem('user_info');
    
    // Check for session data from Google OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const sessionData = urlParams.get('session');
    
    if (sessionData) {
      try {
        const decodedSession = JSON.parse(Buffer.from(sessionData, 'base64').toString());
        if (decodedSession.user) {
          localStorage.setItem('user_info', JSON.stringify(decodedSession.user));
          localStorage.setItem('auth_token', decodedSession.access_token);
          setIsAuthenticated(true);
          setUser(decodedSession.user);
          
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (error) {
        console.error('Error parsing session data:', error);
      }
    } else if (token && userInfo) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userInfo));
    }
  }, []);
//   useEffect(() => {
//     // Set pathname after component mounts (client-side only)
//     setPathname(window.location.pathname);
    
//     console.log('🔍 Auth Debug:', { user, isLoading });
    
//     // Check localStorage
//     const userSession = localStorage.getItem('user');
//     console.log('📦 localStorage user:', userSession ? JSON.parse(userSession) : null);
    
//     // Check cookies
//     const cookies = document.cookie.split(';');
//     const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session='));
//     console.log('🍪 Session cookie:', sessionCookie);
//   }, [user, isLoading]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <div><strong>Auth Debug:</strong></div>
      <div>Loading: {isAuthenticated ? 'No' : 'Yes'}</div>
      <div>User: {user ? `${user.given_name} (${user.email})` : 'None'}</div>
      <div>Path: {pathname}</div>
    </div>
  );
}
