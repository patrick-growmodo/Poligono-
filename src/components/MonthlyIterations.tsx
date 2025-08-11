import React, { useState } from 'react';
import Image from 'next/image';

export default function MonthlyIterations({ title }: { title: string }) {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [isOpen, setIsOpen] = useState(false);

  const periods = ['Monthly', 'Weekly', 'Daily'];

  return (
    <div className="bg-white dark:bg-[#1A1A1A] rounded-[8px] p-[12px_18px] ml-[5px]" >
        <div className="flex items-start justify-between gap-[10px]">
           <p className={`dark:text-gray-400 text-[18px] font-inter font-medium tracking-[-0.6%] leading-[20px] text-black`}>
            {title}
          </p>
          
          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-[8px] py-[8px] pl-[16px] text-sm bg-white dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-[#333] transition-colors"
            >
              {selectedPeriod}
              <Image 
                src="/images/icons/arrow-down.svg" 
                alt="dropdown" 
                width={16} 
                height={16}
                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            
            {isOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10 min-w-[100px]">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setIsOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-[#333] text-gray-700 dark:text-gray-300 first:rounded-t-md last:rounded-b-md"
                  >
                    {period}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
