'use client';

import React from 'react';
import Image from 'next/image';

interface CardTextImageProps {
  title: string;
  description: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
}

const CardTextImage: React.FC<CardTextImageProps> = ({ 
  title, 
  description, 
  image, 
  imageWidth = 400, 
  imageHeight = 300 
}) => {
  return (
    <div className="flex flex-col space-y-[32px]">
      {/* Title and Description */}
      <div className="mb-[48px] flex flex-col gap-[24px]">
        <h3 className="text-[22px] font-normal text-white font-inter leading-[30.8px]">
          {title}
        </h3>
        <p className="text-[16px] text-[#AAAAAA] font-inter leading-[24px]">
          {description}
        </p>
      </div>
      
      {/* Image */}
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={imageWidth}
          height={imageHeight}
          className="object-contain w-full"
        />
      </div>
    </div>
  );
};

export default CardTextImage; 