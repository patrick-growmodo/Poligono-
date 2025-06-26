'use client';

import React from 'react';
import ChannelPricingSection from './ChannelPricingSection';
import AIPricing from './AIPricing';

const TransparentPricingSection: React.FC = () => {


  return (
    <section className="bg-white pb-[100px] pt-[48px] px-4 sm:px-6 lg:px-8">
        <AIPricing  />
        <ChannelPricingSection />
    </section>
  );
};

export default TransparentPricingSection; 