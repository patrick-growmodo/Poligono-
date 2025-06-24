'use client';

import React from 'react';
import { Button } from './Button';

interface PricingFeature {
  id: string;
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  subtitle?: string;
  features: PricingFeature[];
  buttonText: string;
  buttonVariant?: 'primary' | 'secondary';
  buttonTextColor?: string;
  channels?: string[];
  coverage?: string;
  isPopular?: boolean;
  variant?: 'outline' | 'primary';
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  subtitle,
  features,
  buttonText,
  buttonVariant = 'primary',
  buttonTextColor,
  channels,
  coverage,
  isPopular = false,
  variant = 'outline'
}) => {
  return (
    <div className={`bg-white rounded-[8px] border border-[#E4E4E4] p-[48px] ${isPopular ? 'shadow-lg' : 'hover:shadow-lg'} transition-shadow duration-300`}>
      {/* Header */}
      <div className="mb-[32px]">
        <h3 className="text-[22px] font-semibold text-[#11100D] font-inter mb-[18px] leading-[100%]">
          {title}
        </h3>
        <hr className='border-t border-[#E4E4E4]'/>
        {/* Price */}
        <div className='flex flex-row mt-[48px] justify-between'>

        <div className="flex  flex-col items-baseline gap-[4px]">
         <div>

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
          <p className="text-[12px] text-[#666666] font-inter w-[319px]">
            {subtitle}
          </p>
        )}
        </div>
        <div className="mt-[24px]">
          <Button
            variant={variant}
            className={`w-full px-[24px] py-[12px] text-[14px] font-medium rounded-[8px] text-[${buttonTextColor}] ${
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
      <div className="space-y-[16px] mb-[32px]">
        {features.map((feature) => (
          <div key={feature.id} className="flex items-start gap-[12px]">
            <div className="flex-shrink-0 mt-[2px]">
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
            <span className={`text-[14px] font-inter ${feature.included ? 'text-black' : 'text-[#999999]'}`}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      {(channels || coverage) && (
        <div className="border-t border-[#E4E4E4] pt-[24px] space-y-[12px]">
          {channels && (
            <div className="flex items-start gap-[8px]">
              <span className="text-[12px] font-medium text-[#666666] font-inter min-w-[60px]">
                Channels:
              </span>
              <div className="flex flex-wrap gap-[8px]">
                {channels.map((channel, index) => (
                  <span key={index} className="text-[12px] text-[#666666] font-inter">
                    {channel}
                    {index < channels.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {coverage && (
            <div className="flex items-center gap-[8px]">
              <span className="text-[12px] font-medium text-[#666666] font-inter">
                Coverage:
              </span>
              <span className="text-[12px] text-[#666666] font-inter">
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