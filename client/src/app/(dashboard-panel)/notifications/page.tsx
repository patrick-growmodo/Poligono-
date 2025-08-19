'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function NotificationsPage() {
  return (
    <div className="min-h-screen auth-dark-gradient flex">
      <Sidebar activeItem="Notifications" onItemSelect={() => {}} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white/50 dark:bg-black/20 backdrop-blur-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Notifications
            </h1>
          </div>
        </header>

        <main className="flex-1 p-6">
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
    </div>
  );
}
