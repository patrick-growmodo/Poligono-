import React from 'react';
import Image from 'next/image';
import OverviewCard from './OverviewCard';

const overviewData = [
  {
    title: 'Live Agents',
    count: '278',
    icon: '/images/icons/live-agent.svg',
    isBackgroundColor: true
  },
  {
    title: 'Channels',
    count: '48',
    icon: '/images/icons/channel.svg',
    isBackgroundColor: false
  },
  {
    title: 'Tools',
    count: '190',
    icon: '/images/icons/tool.svg',
    isBackgroundColor: false
  },
  {
    title: 'Monthly iterations',
    count: '12,780',
    icon: '/images/icons/monthly.svg',
    isBackgroundColor: false
  }
]

export default function CategoryOverview() {
  return (
    <div className="bg-white dark:bg-[#1A1A1A] rounded-[8px]  p-[24px]">
      <div className="flex justify-between items-center mb-[18px]">
        <div>
          <h2 className="text-[24px] font-medium text-gray-900 dark:text-white">Categories Overview</h2>
          <p className="text-[18px] text-[#525866] dark:text-white font-inter font-light tracking-normal leading-[24px] mt-[12px]">Get a clear overview of your agents, channels, and performance</p>
        </div>
        <div className="flex items-center gap-2 ">
          <Image src="/images/icons/alert.png" alt="Clock" width={24} height={24} />
          <p className="text-[14px] text-[#525866] dark:text-white font-inter font-light tracking-normal leading-[24px]">
            Last Updated a minute ago
          </p>
        </div>
      </div>

      <div className="flex gap-[24px]">
        {overviewData.map((item, index) => (
          <OverviewCard key={index} title={item.title} count={item.count} icon={item.icon} isBackgroundColor={item.isBackgroundColor} />
        ))}
       
      </div>

    </div>
  );
}
