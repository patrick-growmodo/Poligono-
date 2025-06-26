'use client';

import React from 'react';
import { Button } from './Button';

interface ChannelPricing {
  id: string;
  title: string;
  sendLabel: string;
  sendPrice: string;
  receiveLabel: string;
  receivePrice: string;
}

interface CardChannelPriceProps {
  channel: ChannelPricing;
}

const CardChannelPrice: React.FC<CardChannelPriceProps> = ({ channel }) => (
  <div className="bg-white rounded-[8px] p-[32px] flex flex-col gap-[48px] border border-[#E4E4E4]">
    <div>
        <h3 className="text-[20px] font-semibold text-[#11100D] font-inter mb-[8px]">
        {channel.title}
        </h3>
        <hr className="border-t border-[#E4E4E4]"/>
    </div>

    
    <div className="space-y-[16px]">
      {/* Send/Make */}
      <div className="space-y-[4px]">
        <p className="text-[18px] text-[#747474] font-normal font-inter">
          {channel.sendLabel}
        </p>
        <p className="text-[18px] font-normal text-black font-inter">
          {channel.sendPrice}
        </p>
      </div>
      
      {/* Receive */}
      <div className="space-y-[4px]">
        <p className="text-[18px] text-[#747474] font-normal font-inter">
          {channel.receiveLabel}
        </p>
        <p className="text-[18px] font-normal text-black font-inter">
          {channel.receivePrice}
        </p>
      </div>
    </div>
    
    <Button
    variant="primary"
    size="lg"
    style={{width: 'fit-content'}}
    className="bg-black text-white rounded-[8px] py-[12px] px-[24px] text-[16px] font-medium font-inter hover:bg-gray-800 transition-colors">
      Detailed Pricing
    </Button>
  </div>
);

export default CardChannelPrice;
export type { ChannelPricing }; 