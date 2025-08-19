'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

const ClientHeader = () => {
  const pathname = usePathname();
  
  // Don't show header on auth pages and dashboard
  if (pathname === '/login'
     || pathname === '/register' 
     || pathname === '/forgot-password' 
     || pathname === '/dashboard' 
     || pathname === '/agents' 
     || pathname === '/notifications'
      || pathname === '/plans' 
      || pathname === '/settings'
      || (pathname.startsWith('/agents/') && pathname.endsWith('/edit'))
      || (pathname.startsWith('/agents/') && pathname.endsWith('/create'))
    ) {
    return null;
  }
  
  return <Header />;
};

export default ClientHeader;
