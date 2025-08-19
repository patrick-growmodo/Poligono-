'use client';

import React from 'react';
import Image from 'next/image';

const IntegrationsSection: React.FC = () => {
  return (
    <section className="bg-dark px-4 sm:px-6 lg:px-8  sm:py-[0px]  sm:px-[0px] ">
      <div className="max-w-[1312px] mx-auto border-t-[1px] py-[64px] px-[32px] lg:py-[64px] lg:px-[64px] border-[#484848] sm:py-[40px] sm:px-[0px]">
        {/* Title and Description */}
        <div className="text-center mb-[61px]">
            <h2 
             className="text-[22px] font-normal text-white font-inter leading-[30.8px] mb-[24px]"
             style={{ letterSpacing: '-0.22px' }}
           >
             Connects with Your Stack
           </h2>
          <p className="text-[16px] text-[#AAAAAA] font-inter leading-[24px] mx-auto">
            From CRMs to helpdesks and MCPs — agents tap into your systems to take action, not just chat.
          </p>
        </div>

        {/* Integration Icons Image */}
        <div className="flex justify-center">
          <div className="relative">
            <Image
              src="/images/gallery/integration.png"
              alt="Integration icons showing various platforms"
              width={800}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection; 