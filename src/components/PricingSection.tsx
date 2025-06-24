'use client';

import React from 'react';
import PricingCard from './PricingCard';

const PricingSection: React.FC = () => {
  const payAsYouGoFeatures = [
    { id: '1', text: 'AI Agents', included: true },
    { id: '2', text: 'Conversational marketing Agent', included: true },
    { id: '3', text: 'Customer Service Agent', included: true },
    { id: '4', text: 'Marketing Campaign Agent', included: true },
    { id: '5', text: 'Alerts & Reminders Agent', included: true },
    { id: '6', text: 'Verify Agents', included: true },
    { id: '7', text: 'Build your own AI Agent', included: true },
    { id: '8', text: 'Customer Profiles', included: true },
    { id: '9', text: 'Integrations', included: true }
  ];


  const committedSpendFeatures = [
    { id: '1', text: 'Programmable Voice APIs', included: true },
    { id: '2', text: 'Verify APIs for OTP/2FA', included: true },
    { id: '3', text: 'SIP Trunking', included: true },
    { id: '4', text: 'Shortcodes & Custom Sender IDs', included: true },
    { id: '5', text: 'Whitelove Onboarding & Assistance', included: true },
    { id: '6', text: 'Custom pricing / Volume Discounts', included: true },
    { id: '7', text: 'Single Sign-on', included: true } 
  ];

  return (
    <div className="bg-white py-[80px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1312px] mx-auto">
        {/* Header */}
        <div className="text-center mb-[128px]">
          <h2 className="text-[48px] font-medium text-black font-inter leading-[57.6px] mb-[24px]">
            Simple and transparent pricing
          </h2>
          <p className="text-[18px] text-[#2F2F2F] font-normal font-inter leading-[27px] max-w-[768px] mx-auto">
            Get started for free. Enjoy transparent pay-as-you-go pricing
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-[32px]  mx-auto">
          {/* Pay-as-you-go Card */}
          <PricingCard
            title="Pay-as-you go"
            price="$0"
            period="/month"
            subtitle="starts at"
            features={payAsYouGoFeatures}
            buttonText="Request Trial"
            buttonVariant="primary"
            variant="primary"
            buttonTextColor="#ffffff"
            channels={['Chat', 'Voice', 'SMS', 'WhatsApp']}
            coverage="USA, India"
          />

          {/* Committed Spend Card */}
          <PricingCard
            title="Committed Spend"
            price="$999"
            period="/month"
            subtitle="This plan includes all features from the Pay-as-you-go tier, plus exclusive upgrades listed below."
            features={committedSpendFeatures}
            buttonText="Talk to Sales"
            buttonVariant="secondary"
            variant="outline"
            buttonTextColor="#11100D"
            channels={['Chat', 'Voice', 'SMS', 'WhatsApp']}
            coverage="All 190 countries"
            isPopular={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingSection; 