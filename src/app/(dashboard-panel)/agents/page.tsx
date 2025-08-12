'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import { useState } from 'react';
import MainAgentList from '@/components/MainAgentList';

export default function AgentsPage() {
  const [activeItem, setActiveItem] = useState('Agents');

  return (
    <div className="min-h-screen auth-dark-gradient flex">
     {/* Sidebar */}
     <Sidebar activeItem={activeItem} onItemSelect={setActiveItem} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#F5F7FA] dark:bg-[#11100D] px-[24px] py-[31px]">
        {/* Header */}
        <header className="backdrop-blur-sm flex justify-between items-center mb-[27px]">
          <div className="px-0 py-0">
            <h1 className="text-[24px] font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Image src="/images/icons/user-multiple.svg" alt="Dashboard" width={24} height={24} className="dark:hidden" />
              <Image src="/images/icons/user-multiple-dark.svg" alt="Dashboard" width={24} height={24} className="hidden dark:block" />
              {activeItem}
            </h1>
            <p className="text-[16px] text-[#525866] dark:text-white font-inter font-light tracking-normal leading-[24px] mt-[12px]">
            Track performance, spot issues, and take action in seconds.
            </p>
          </div>
          <button className="text-white px-[27px] py-[10px] rounded-md flex items-center gap-2 min-w-[200px]"
            style={{
              background: 'linear-gradient(90deg, #DA46F8, #6940E4)'
            }}>
              <Image src="/images/icons/user-plus.svg" alt="Plus" width={20} height={20} />
            <span className="text-[14px] font-medium">
            Create your agent
            </span>
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">

        <MainAgentList />
        {/* <AgentListWithTanStack /> */}
        </main>
      </div>
    </div>
  );
}
