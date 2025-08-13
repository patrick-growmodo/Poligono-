"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function EditAgent({ params }: { params: { id: string } }) {
  const [activeItem, setActiveItem] = useState('Agents');

  return (
<div className="min-h-screen auth-dark-gradient flex">
    {/* Sidebar */}
    <Sidebar activeItem={activeItem} onItemSelect={setActiveItem} />

    {/* Main Content */}
    <div className="flex-1 flex flex-col bg-[#F5F7FA] dark:bg-[#11100D] px-[24px] py-[31px]">
    <div className="max-w-[682px] mx-auto w-full">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Edit Agent {params.id}
      </h1>
      
      <div className="bg-white dark:bg-[#1A1A1A] rounded-lg p-6">
        <p className="text-gray-600 dark:text-gray-400">
          Agent configuration form will go here...
        </p>
        
        {/* TODO: Add your agent configuration form */}
        <div className="mt-4 p-4 bg-gray-50 dark:bg-[#2A2A2A] rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Agent ID: <span className="font-mono">{params.id}</span>
          </p>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
