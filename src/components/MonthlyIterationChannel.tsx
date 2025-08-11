import React from 'react';
import Image from 'next/image';

export default function MonthlyIterationChannel({ title, icon }: { title: string, icon: string }) {
  return (
    <div className="bg-white dark:bg-[#1A1A1A] rounded-[8px] p-[12px_18px] mr-[5px]">
        <div className="flex items-center justify-between gap-[10px]">
           <p className={`dark:text-gray-400 text-[18px] font-inter font-medium tracking-[-0.6%] leading-[20px] text-black`}>
            {title}
          </p>
          <Image src={icon} alt={title} width={20} height={20} />
        </div>
    </div>
  );
}
