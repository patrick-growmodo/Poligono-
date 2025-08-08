'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function DashboardPage() {
  const [activeItem, setActiveItem] = useState('Dashboard');

    return (
    <div className="min-h-screen auth-dark-gradient flex">
      {/* Sidebar */}
      <Sidebar activeItem={activeItem} onItemSelect={setActiveItem} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#F5F7FA] dark:bg-[#11100D]">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {activeItem}
            </h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Welcome to {activeItem}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Your {activeItem.toLowerCase()} content will appear here
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
