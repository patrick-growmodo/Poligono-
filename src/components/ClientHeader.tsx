'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

const ClientHeader = () => {
  const pathname = usePathname();
  
  // Don't show header on auth pages
  if (pathname === '/login' || pathname === '/register' || pathname === '/forgot-password') {
    return null;
  }
  
  return <Header />;
};

export default ClientHeader;
