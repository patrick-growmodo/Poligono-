'use client';

import React from 'react';
import Image from 'next/image';

const ProfileCard: React.FC<{ 
  title: string, 
  description: string, 
  image: string, 
  background_color: string, 
  title_color: string,
  useGradientTitle?: boolean,
  customGradient?: string,
}> = ({ title, description, image, background_color, title_color, useGradientTitle = false, customGradient }) => {
  return (
    <div className={`space-y-[16px] max-w-[516px] rounded-[8px] p-[16px] ${background_color}`}>
        {/* Customer Message Card */}
        <div className={`${background_color} rounded-[16px]  flex items-center gap-[26px]`}>
          <div className="relative w-[70.843px] h-[70.843px] rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={image}
              alt="Customer avatar"
              width={70.843}
              height={70.843}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p 
              className={`text-[16.53px] leading-[24px] font-inter font-normal ${!useGradientTitle ? title_color : ''}`}
              style={useGradientTitle ? {
                background: customGradient || 'linear-gradient(180deg, #DA46F8 0%, #7B51F8 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              } : {}}
            >
              {title}
            </p>
            <p className="text-white text-[16px] font-inter font-normal leading-[22.4px]">
              {description}
            </p>
          </div>
        </div>
      </div>
  );
};

export default ProfileCard;
