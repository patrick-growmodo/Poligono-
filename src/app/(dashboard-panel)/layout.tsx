import React from 'react';
import { auth0 } from '@/lib/auth0';
import Sidebar from '@/components/Sidebar';
import { Toaster } from 'react-hot-toast';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();
  return (
    <div className="min-h-screen auth-dark-gradient flex">
      {/* Sidebar - Now shared across all dashboard pages */}
      <Sidebar user={session?.user ?? null}/>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#F5F7FA] dark:bg-[#11100D] ">
        {children}
      </div>
      
      {/* Toast Notifications */}
      {/* <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            border: '1px solid #4a4a4a',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      /> */}
    </div>
  );
}
