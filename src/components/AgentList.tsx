import React from 'react';

export default function AgentList() {
  return (
    <div className="bg-white dark:bg-[#1A1A1A] rounded-[8px] mt-[10px]">
      <div className="p-[8px_20px]">
        <h3 className="text-[20px] font-medium text-gray-900 dark:text-white">Your agents</h3>
      </div>
      
      <div className="min-h-[200px] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Agent list content will appear here
        </p>
      </div>
    </div>
  );
}
