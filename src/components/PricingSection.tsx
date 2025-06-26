'use client';

import React from 'react';
import PricingCard from './PricingCard';

const PricingSection: React.FC = () => {
  const payAsYouGoFeatures = {
    list_item: [
    { 
      id: '1', 
      text: 'AI Agents', 
      included: true,
        list_item:[
          {
            id: '1',
            text: 'Conversational marketing Agent',
          },
          {
            id: '2',
            text: 'Customer Service Agent',
          },
          {
            id: '3',
            text: 'Marketing Campaign Agent',
          },
          {
            id: '4',
            text: 'Alerts & Reminders Agent',
          },
          {
            id: '5',
            text: 'Verify Agents',
          }
        ]
      },
      { id: '7', text: 'Build your own AI Agent', included: true },
      { id: '8', text: 'Customer Profiles', included: true },
      { id: '9', text: 'Integrations', included: true }
    ],
    description: [
      {
        id: '1',
        text: [
          {
            id: '1',
            text: 'Salesforce,',
          },
          {
            id: '2',
            text: 'Hubspot,',
          },
          {
            id: '3',
            text: 'ZohoCRM,',
          },
          {
            id: '4',
            text: 'Shopify,',
          },
          {
            id: '5',
            text: 'Woocommerce,',
          },
          {
            id: '6',
            text: 'Zendesk,',
          },
          {
            id: '7',
            text: 'Freshdesk,',
          },
          {
            id: '8',
            text: 'Zohodesk and more...',
          }
        ]
      }
    ],
    channels: [{
      id: '1',
      text: 'Chat',
              icon: '/images/icons/chat.svg',
    },
    {
      id: '2',
      text: 'Voice',
      icon: '/images/icons/voice.svg',
    },
    {
      id: '3',
      text: 'SMS',
      icon: '/images/icons/sms.svg',
    },
    {
      id: '4',
      text: 'WhatsApp',
      icon: '/images/icons/whatsapp.svg',
    }
  ],
    coverage: ['USA, India']
  };




  const committedSpendFeatures = {
    list_item: [
      { id: '1', text: 'Programmable Voice APIs', included: true },
      { id: '2', text: 'Verify APIs for OTP/2FA', included: true },
      { id: '3', text: 'SIP Trunking', included: true },
      { id: '4', text: 'Shortcodes & Custom Sender IDs', included: true },
      { id: '5', text: 'Whitelove Onboarding & Assistance', included: true },
      { id: '6', text: 'Custom pricing / Volume Discounts', included: true },
      { id: '7', text: 'Single Sign-on', included: true }
    ],
    description: [],
    channels: [
      {
        id: '1',
        text: 'Chat',
        icon: '/images/icons/chat.svg',
      },
      {
        id: '2',
        text: 'Voice',
        icon: '/images/icons/voice.svg',
      },
      {
        id: '3',
        text: 'SMS',
        icon: '/images/icons/sms.svg',
      },
      {
        id: '4',
        text: 'WhatsApp',
        icon: '/images/icons/whatsapp.svg',
      }
    ],
    coverage: ['All 190 countries']
  };
  

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
        <div className="grid grid-cols-1  lg:grid-cols-1 gap-[32px] w-full md:w-[600px] lg:min-w-[536px]  mx-auto">
          {/* Pay-as-you-go Card */}
          <PricingCard
            title="Pay-as-you go"
            price="$0"
            period="/month"
            subtitle="starts at"
            features={payAsYouGoFeatures.list_item}
            description={payAsYouGoFeatures.description}
            buttonText="Request Trial"
            buttonVariant="primary"
            variant="primary"
            buttonTextColor="#ffffff"
            channels={payAsYouGoFeatures.channels}
            coverage={payAsYouGoFeatures.coverage}
          />

          {/* Committed Spend Card */}
          {/* <PricingCard
            title="Committed Spend"
            price="$999"
            period="/month"
            subtitle="This plan includes all features from the Pay-as-you-go tier, plus exclusive upgrades listed below."
            features={committedSpendFeatures.list_item}
            description={committedSpendFeatures.description}
            buttonText="Talk to Sales"
            buttonVariant="secondary"
            variant="outline"
            buttonTextColor="#11100D"
            channels={committedSpendFeatures.channels}
            coverage={committedSpendFeatures.coverage}
            isPopular={true}
          /> */}
        </div>
      </div> 
    </div>
  );
};

export default PricingSection; 