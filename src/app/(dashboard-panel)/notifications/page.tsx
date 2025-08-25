'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <div className="px-[24px] py-[31px]">
        <header className="backdrop-blur-sm flex justify-between items-center mb-[27px]">
          <div className="px-0 py-0">
            <h1 className="text-[24px] font-medium text-gray-900 dark:text-white flex items-center gap-2">
              Notifications
            </h1>
            <p className="text-[16px] text-[#525866] dark:text-white font-inter font-light tracking-normal leading-[24px] mt-[12px]">
              Your notifications will appear here
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-4xl">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔔</div>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Notifications Center
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Your notifications will appear here
              </p>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
