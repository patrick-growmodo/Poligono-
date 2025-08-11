import React from 'react';
import Image from 'next/image';

export default function OverviewCard({ title, count, icon, isBackgroundColor }: { title: string, count: string, icon: string, isBackgroundColor: boolean }) {
  return (
    <div className="bg-transparents dark:bg-[#1A1A1A] rounded-[8px] border border-gray-200 dark:border-[#484848] pt-[16px] pb-[16px] pr-[12px] pl-[16px] w-[calc((100%_-_24px)_/_4)]"
    style={{
      background: isBackgroundColor ? 'linear-gradient(to bottom right, #0D0126 0%, #0D0126 65%, #DA46F8 100%)' : 'transparent'
    }}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col items-center justify-between gap-[10px]">
        <div className="flex items-center justify-start gap-[10px]">
          <Image src={icon} alt={title} width={34} height={34} />
          <p className={`dark:text-white text-[16px] font-inter font-medium tracking-[-0.6%] leading-[20px] ${isBackgroundColor ? 'text-white' : 'text-black'}`}>
            {title}
          </p>
        </div>
        <div className="text-left w-full">
        <p className={`text-[24px] font-inter font-medium tracking-[-0.6%] leading-[20px] dark:text-white ${isBackgroundColor ? 'text-white' : 'text-black'}`}>
        {count}
        </p>
   
        </div>
        </div>
    
        <div>
          <button className="text-white dark:text-gray-400 text-[14px] font-inter font-light tracking-[-0.6%] leading-[20px]">
            {isBackgroundColor ? <Image src="/images/icons/three-dots.svg" alt="eye" width={20} height={20} />  : 
             <><Image src="/images/icons/three-dots-dark.svg" alt="eye" width={20} height={20} className="dark:hidden" /><Image src="/images/icons/three-dots.svg" alt="eye" width={20} height={20} className="hidden dark:block" /></> 
             }
          </button>
        </div>
      </div>
     

    </div> 
  );
}
