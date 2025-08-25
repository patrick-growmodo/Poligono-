'use client';

import React from 'react';
import Image from 'next/image';

interface CardTextIconProps {
  number: number;
  title: string;
  description: string;
  icon: string;
  iconWidth?: number;
  iconHeight?: number;
}

const CardStep: React.FC<CardTextIconProps> = ({ 
  number, 
  title, 
  description, 
  icon, 
  iconWidth = 66, 
  iconHeight = 66 
}) => {

  return (
    <div className="bg-white  p-[0px] border border-[#E4E4E4] hover:shadow-lg transition-shadow duration-300">
      {/* Icon Section */}
      <div className="bg-[url('/images/hero/header-card-bg.png')] bg-cover bg-center w-full flex items-center justify-start px-[48px] py-[48px]">
        <div className="w-[66px] h-[66px] rounded-[12px] flex items-center justify-center">
           <Image
             src={icon}
             alt={title}
             width={iconWidth}
             height={iconHeight}
             className="object-contain"
           />
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-[68.2px] pb-[48px] px-[48px]">
        <h4 className="text-[22px] font-medium text-[#11100D] font-inter flex gap-[16px] leading-[30.8px] tracking-[-0.22px] mb-[16px]">
          <span className='text-[#000] font-inter text-[20.667px] font-normal  w-[31px] h-[31px] bg-[#FBE8FF] flex items-center justify-center'>{number}</span> {title}
        </h4>
        <p 
           className="text-[16px] text-dark font-normal font-inter text-[#11100D] leading-[20px]"
           dangerouslySetInnerHTML={{ __html: description }}
         />
      </div>
    </div>
  );
};

export default CardStep; 