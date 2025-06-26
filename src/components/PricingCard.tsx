'use client';

import React from 'react';
import { Button } from './Button';

interface PricingFeature {
  id: string;
  text: string;
  included: boolean;
  list_item?: {
    id: string;
    text: string;
  }[];
}

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  subtitle?: string;
  features: PricingFeature[];
  description?: {
    id: string;
    text: {
      id: string;
      text: string;
    }[];
  }[];
  buttonText: string;
  buttonVariant?: 'primary' | 'secondary';
  buttonTextColor?: string;
  channels?: {
    id: string;
    text: string;
    icon: string;
  }[] | string[];
  coverage?: string[] | string; 
  isPopular?: boolean;
  variant?: 'outline' | 'primary';
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  subtitle,
  features,
  description,
  buttonText,
  buttonVariant = 'primary',
  buttonTextColor,
  channels,
  coverage,
  isPopular = false,
  variant = 'outline'
}) => {
  return (
    <div className={` flex flex-col justify-between bg-white rounded-[8px] border border-[#E4E4E4] p-[48px] ${isPopular ? 'shadow-lg' : 'hover:shadow-lg'} transition-shadow duration-300`}>
      {/* Header */}
      <div>
      <div className="mb-[32px]">
        <h3 className="text-[22px] font-semibold text-[#11100D] font-inter mb-[18px] leading-[100%]">
          {title}
        </h3>
        <hr className='border-t border-[#E4E4E4]'/>
        {/* Price */}
        <div className='flex flex-col lg:flex-row my-[48px] justify-between pt-[7.111px] items-center  sm:items-start'>
          <div className="flex  flex-col items-baseline gap-[11px] mb-[24px] md:mb-[24px] lg:mb-[20px]">
            <div className='flex flex-row gap-[10.67px] items-baseline'>
              <span className="text-[48px] font-medium text-black font-inter leading-[49.778px]">
                {price}
              </span>
              {period && (
                <span className="text-[16px] text-[#666666] font-inter">
                  {period}
                </span>
              )}
            </div>
            {subtitle && (
            <p className="text-[12px] text-[#000] font-normal font-inter w-[319px]">
              {subtitle}
            </p>
          )}
          </div>
          <div className='w-[100%] md:w-fit lg:w-fit'>
            <Button
              variant={variant}
        
              className={`w-full mpx-[24px] py-[12px] text-[14px] font-medium rounded-[8px] text-[${buttonTextColor}] ${
                buttonVariant === 'primary' 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'bg-[#F3E8FF] text-[${buttonTextColor}] hover:bg-[#E8D5FF]'
              }`}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
      {/* Features List */}
      <div className="mb-[32px] flex flex-col  gap-[10.67px]">
        {features.map((feature) => (
          <div key={feature.id} className="flex flex-col items-start gap-[10.67px]">    
            <div className='flex flex-row gap-[12px]'>
              <div className="flex flex-col items-center justify-center">
                {feature.included ? (
                  <div className="w-[16px] h-[16px] bg-[#6940E4] rounded-full flex items-center justify-center">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M9 1L3.5 6.5L1 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ) : (
                  <div className="w-[16px] h-[16px] border border-[#E4E4E4] rounded-full"></div>
                )}
              </div>
              <span className={`text-[16px] font-bold font-inter ${feature.included ? 'text-black' : 'text-[#999999]'}`}>
                {feature.text}
              </span>
            </div>
            {feature.list_item && (
              <ul className='flex flex-col gap-[7.11px] pl-[0px]'>
                {feature.list_item?.map((item) => (
                  <li key={item.id} className="text-[14px] text-[#000] font-normal font-inter leading-[21px ]">
                    {item.text}
                  </li>
                ))}
              </ul>
            )}
      
          </div>
              
        ))}
        {description && description.map((desc) => (
          <div key={desc.id} className="text-[14px] text-[#000] font-normal font-inter leading-[21px] w-[100%] md:w-[100%] lg:w-[459px]">
            {desc.text.map((item, index) => (
              <span key={item.id}>
                {item.text}
                {index < desc.text.length - 1 ? ' ' : ''}
              </span>
            ))}
          </div>
        ))} 
      </div>
      </div>


      {/* Footer Info */}
      {(channels || coverage) && (
        <div className="pt-[24px] space-y-[12px]">
          {channels && (
            <div className="flex items-start gap-[8px]">
              <span className="text-[14px] font-medium text-[#000] font-inter min-w-[60px]">
                Channels:
              </span>
              <div className="flex flex-wrap gap-[19px]">
                {channels.map((channel, index) => {
                  const channelData = typeof channel === 'string' ? { id: index.toString(), text: channel, icon: '' } : channel;
                  return (
                    <div key={channelData.id} className="flex flex-row gap-[4px] items-center">
                      {channelData.icon && (
                        <img src={channelData.icon} alt={channelData.text} className="w-[19.889px] h-[19.889px]" />
                      )}
                      <span className="text-[14px] font-normal text-[#000] font-inter">
                        {channelData.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {coverage && (
            <div className="flex items-center gap-[8px]">
              <span className="text-[14px] font-medium text-[#000] font-inter">
                Coverage:
              </span>
              <span className="text-[14px] font-normal text-[#000] font-inter">
                {coverage}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PricingCard; 