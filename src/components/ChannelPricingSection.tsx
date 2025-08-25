'use client';

import React, { useState } from 'react';
import CardChannelPrice, { ChannelPricing } from './CardChannelPrice';
import CountrySelector, { Country } from './CountrySelector';

const ChannelPricingSection: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('United States');

  const countries: Country[] = [
    { name: 'United States', flag: '🇺🇸' , flag_image: '/images/icons/us-flag.svg', currency_symbol: '$' }
    // { name: 'United Kingdom', flag: '🇬🇧' , flag_image: '/images/icons/uk.svg', currency_symbol: '£' },
    // { name: 'Canada', flag: '🇨🇦' , flag_image: '/images/icons/ca.svg', currency_symbol: 'C$' }
  ];
  

  const pricingByCountry: Record<string, ChannelPricing[]> = {
    'United States': [
      {
        id: '1',
        title: 'SMS',
        sendLabel: 'To Send an SMS',
        sendPrice: '$0.00700/sms',
        receiveLabel: 'To Receive an SMS',
        receivePrice: '$0.00550/sms'
      },
      {
        id: '2',
        title: 'Voice',
        sendLabel: 'To Make a Call',
        sendPrice: '$0.01000/min',
        receiveLabel: 'To Receive a Call',
        receivePrice: '$0.00550/min'
      },
      {
        id: '3',
        title: 'WhatsApp',
        sendLabel: 'Customer Service',
        sendPrice: '$0/conversation',
        receiveLabel: 'Customer Engagement',
        receivePrice: '$0.0040/conversation'
      },
      {
        id: '4',
        title: 'Phone Numbers',
        sendLabel: 'Local Numbers',
        sendPrice: '$0.50000',
        receiveLabel: 'Tollfree Numbers',
        receivePrice: '$1.00/month'
      }
    ],
    'United Kingdom': [
      {
        id: '1',
        title: 'SMS',
        sendLabel: 'To Send an SMS',
        sendPrice: '£0.00650/sms',
        receiveLabel: 'To Receive an SMS',
        receivePrice: '£0.00450/sms'
      },
      {
        id: '2',
        title: 'Voice',
        sendLabel: 'To Make a Call',
        sendPrice: '£0.00850/min',
        receiveLabel: 'To Receive a Call',
        receivePrice: '£0.00400/min'
      },
      {
        id: '3',
        title: 'WhatsApp',
        sendLabel: 'Customer Service',
        sendPrice: '£0/conversation',
        receiveLabel: 'Customer Engagement',
        receivePrice: '£0.0035/conversation'
      },
      {
        id: '4',
        title: 'Phone Numbers',
        sendLabel: 'Local Numbers',
        sendPrice: '£0.45000',
        receiveLabel: 'Tollfree Numbers',
        receivePrice: '£0.85/month'
      }
    ],
    'Canada': [
      {
        id: '1',
        title: 'SMS',
        sendLabel: 'To Send an SMS',
        sendPrice: 'C$0.00900/sms',
        receiveLabel: 'To Receive an SMS',
        receivePrice: 'C$0.00700/sms'
      },
      {
        id: '2',
        title: 'Voice',
        sendLabel: 'To Make a Call',
        sendPrice: 'C$0.01200/min',
        receiveLabel: 'To Receive a Call',
        receivePrice: 'C$0.00650/min'
      },
      {
        id: '3',
        title: 'WhatsApp',
        sendLabel: 'Customer Service',
        sendPrice: 'C$0/conversation',
        receiveLabel: 'Customer Engagement',
        receivePrice: 'C$0.0050/conversation'
      },
      {
        id: '4',
        title: 'Phone Numbers',
        sendLabel: 'Local Numbers',
        sendPrice: 'C$0.65000',
        receiveLabel: 'Tollfree Numbers',
        receivePrice: 'C$1.25/month'
      }
    ]
  };
  
  const channelPricingData = pricingByCountry[selectedCountry] || pricingByCountry['United States'];





  return (
    <div className="bg-white mt-[64px]">
      <div className="max-w-[1312px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row lg:flex-row justify-between items-start gap-[32px] mb-[24px]">
          {/* Left - Title */}
          <div className="flex-1">
            <h2 className="text-[28px] font-medium text-black font-inter leading-[39.2px] max-w-[500px]">
              Channel
            </h2>
          </div>
          
          {/* Right - Country Selector */}
          <div className="flex-1 flex justify-end w-[100%] md:w-[100%] lg:w-[260px]">
            <CountrySelector 
              countries={countries}
              selectedCountry={selectedCountry}
              onCountrySelect={setSelectedCountry}
            />
          </div>
        </div>

        {/* Channel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-[24px]">
          {channelPricingData.map((channel) => (
            <CardChannelPrice key={channel.id} channel={channel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelPricingSection; 