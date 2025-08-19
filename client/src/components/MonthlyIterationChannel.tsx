"use client";

import React from 'react';
import Image from 'next/image';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function MonthlyIterationChannel({ title, icon }: { title: string, icon: string }) {
  const data = [
    {
      name: 'Whatsapp',
      percentage: 80.02,
      color: '#FF69B4'
    },
    {
      name: 'Instagram',
      percentage: 24.53,
      color: '#8B5CF6'
    },
    {
      name: 'Telegram',
      percentage: 16.47,
      color: '#6B7280'
    },
    {
      name: 'Messenger',
      percentage: 16.47,
      color: '#000000'
    }
  ];

  return (
    <div className="bg-white dark:bg-[#1A1A1A] rounded-[8px] p-[12px_18px] mr-[5px]">
        <div className="flex items-center justify-between gap-[10px]">
           <p className={`dark:text-white text-[18px] font-inter font-medium tracking-[-0.6%] leading-[20px] text-black`}>
            {title}
          </p>
          <Image src={icon} alt={title} width={20} height={20} />
        </div>

        {/* Bar Chart */}
        <div className="w-full mt-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={true} vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                formatter={(value: any) => [`${value}%`, 'Percentage']}
                labelFormatter={(label) => label}
              />
                             <Bar dataKey="percentage" radius={[4, 4, 0, 0]} barSize={30}>
                 {data.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={entry.color} />
                 ))}
               </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-sm" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {item.percentage.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
    </div>
  );
}
