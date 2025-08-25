"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';
  const data = [
    {
      "date": "Jun 15",
      "iterations": 1650
    },
    {
      "date": "Jun 16",
      "iterations": 1800
    },
    {
      "date": "Jun 17",
      "iterations": 1750
    },
    {
      "date": "Jun 18",
      "iterations": 1900
    },
    {
      "date": "Jun 19",
      "iterations": 1850
    },
    {
      "date": "Jun 20",
      "iterations": 2000
    },
    {
      "date": "Jun 21",
      "iterations": 1950
    },
    {
      "date": "Jun 22",
      "iterations": 2100
    },
    {
      "date": "Jun 23",
      "iterations": 2050
    },
    {
      "date": "Jun 24",
      "iterations": 2200
    },
    {
      "date": "Jun 25",
      "iterations": 2150
    },
    {
      "date": "Jun 26",
      "iterations": 2300
    },
    {
      "date": "Jun 27",
      "iterations": 2250
    },
    {
      "date": "Jun 28",
      "iterations": 2400
    },
    {
      "date": "Jun 29",
      "iterations": 2350
    },
    {
      "date": "Jun 30",
      "iterations": 2500
    },
    {
      "date": "Jul 1",
      "iterations": 2450
    },
    {
      "date": "Jul 2",
      "iterations": 2600
    },
    {
      "date": "Jul 3",
      "iterations": 2550
    },
    {
      "date": "Jul 4",
      "iterations": 2700
    },
    {
      "date": "Jul 5",
      "iterations": 2650
    },
    {
      "date": "Jul 6",
      "iterations": 2800
    },
    {
      "date": "Jul 7",
      "iterations": 2750
    },
    {
      "date": "Jul 8",
      "iterations": 2900
    },
    {
      "date": "Jul 9",
      "iterations": 2850
    },
    {
      "date": "Jul 10",
      "iterations": 1850
    },
    {
      "date": "Jul 11",
      "iterations": 2100
    },
    {
      "date": "Jul 12",
      "iterations": 1950
    },
    {
      "date": "Jul 13",
      "iterations": 2300
    },
    {
      "date": "Jul 14",
      "iterations": 2150
    },
    {
      "date": "Jul 15",
      "iterations": 2400
    },
    {
      "date": "Jul 16",
      "iterations": 2000
    },
    {
      "date": "Jul 17", 
      "iterations": 2400
    },
    {
      "date": "Jul 18",
      "iterations": 2200
    },
    {
      "date": "Jul 19",
      "iterations": 2500
    },
    {
      "date": "Jul 20",
      "iterations": 2678
    },
    {
      "date": "Jul 21",
      "iterations": 2100
    },
    {
      "date": "Jul 22",
      "iterations": 1800
    },
    {
      "date": "Jul 23",
      "iterations": 1950
    },
    {
      "date": "Jul 24",
      "iterations": 2250
    },
    {
      "date": "Jul 25",
      "iterations": 2600
    },
    {
      "date": "Jul 26",
      "iterations": 2350
    },
    {
      "date": "Jul 27",
      "iterations": 2450
    },
    {
      "date": "Jul 28",
      "iterations": 2200
    },
    {
      "date": "Jul 29",
      "iterations": 1900
    },
    {
      "date": "Jul 30",
      "iterations": 2100
    },
    {
      "date": "Jul 31",
      "iterations": 2300
    },
    {
      "date": "Aug 1",
      "iterations": 2450
    },
    {
      "date": "Aug 2",
      "iterations": 2600
    },
    {
      "date": "Aug 3",
      "iterations": 2750
    },
    {
      "date": "Aug 4",
      "iterations": 2900
    },
    {
      "date": "Aug 5",
      "iterations": 2850
    },
    {
      "date": "Aug 6",
      "iterations": 3000
    },
    {
      "date": "Aug 7",
      "iterations": 2950
    },
    {
      "date": "Aug 8",
      "iterations": 3100
    },
    {
      "date": "Aug 9",
      "iterations": 3050
    },
    {
      "date": "Aug 10",
      "iterations": 3200
    },
    {
      "date": "Aug 11",
      "iterations": 3150
    },
    {
      "date": "Aug 12",
      "iterations": 3300
    },
    {
      "date": "Aug 13",
      "iterations": 3250
    },
    {
      "date": "Aug 14",
      "iterations": 3400
    },
    {
      "date": "Aug 15",
      "iterations": 3350
    }
  ]
export default function MonthlyIterations({ title }: { title: string }) {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [isOpen, setIsOpen] = useState(false);

  const periods = ['Monthly', 'Weekly', 'Daily'];

  return (
    <div className="bg-white dark:bg-[#1A1A1A] rounded-[8px] p-[12px_18px] ml-[5px]" >
        <div className="flex items-start justify-between gap-[10px]">
           <p className={`dark:text-white text-[18px] font-inter font-medium tracking-[-0.6%] leading-[20px] text-black`}>
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


        <div className="w-full mt-4">
          <ResponsiveContainer width="100%" height={270}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                {/* Fill gradient (vertical) */}
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5AFE" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6940E4" stopOpacity={0}/>
                </linearGradient>
                
                {/* Stroke gradient (horizontal) */}
                <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="-24.33%" stopColor="#FF5AFE"/>
                  <stop offset="87.94%" stopColor="#6940E4"/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                tickFormatter={(value) => {
                  if (value >= 1000) {
                    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
                  }
                  return value.toString();
                }}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                formatter={(value: any) => [value.toLocaleString(), 'Iterations']}
                labelFormatter={(label) => label}
              />
              <Area 
                type="monotone" 
                dataKey="iterations" 
                stroke="url(#strokeGradient)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorUv)" 
              />
              <ReferenceLine 
                x="Jul 20" 
                stroke="url(#strokeGradient)" 
                strokeDasharray="3 3" 
                strokeWidth={1}
              />
              <ReferenceDot 
                x="Jul 20" 
                y={2678} 
                r={4} 
                fill="url(#strokeGradient)" 
                stroke="url(#strokeGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
    </div>
  );
}
