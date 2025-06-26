'use client';

import React from 'react';
import Image from 'next/image';
import VideoOverlay from './VideoOverlay';

const AgentActionsSection: React.FC = () => {
  const overlayCards = [
    {
      id: '1',
      text: 'Handle Purchases',
      position: 'top-left' as const
    },
    {
      id: '2',
      text: 'Close Support Tickets',
      position: 'top-right' as const
    },
    {
      id: '3',
      text: 'Launch Campaigns',
      position: 'bottom-left' as const
    }
  ];

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'top-[-146px] left-[30px] md:top-[-190px] md:left-[30px] lg:top-[-190px] lg:left-[20px]';
      case 'top-right':
        return 'top-[-146px] right-[0px] md:top-[-190px] md:right-[-20px] lg:top-[-190px] lg:right-[-20px]';
      case 'bottom-left':
        return 'bottom-[25px] left-[190px] md:bottom-[25px] md:left-[200px] lg:bottom-[25px] lg:left-[200px]';
      case 'bottom-right':
        return 'bottom-0 right-0';
      case 'center-left':
        return 'top-1/2 left-0 -translate-y-1/2';
      case 'center-right':
        return 'top-1/2 right-0 -translate-y-1/2';
      default:
        return '';
    }
  };


  return (
    <section className="bg-dark px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1312px] mx-auto border-t-[1px] border-[#484848]">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[0px]">
          {/* Left Column - Agents That Take Actions */}
          <div className="flex flex-col justify-between space-y-[32px] p-[64px] border-r-[1px] border-[#484848] relative md:min-h-[500px] border-r-[0px] md:border-r-[0px] md:border-b-[1px] md:border-b-[0px] lg:border-b-[0px] lg:border-t-[0px] lg:border-r-[1px]">
            <div className="max-w-[516px]">
              <h3 className="text-[22px] font-normal text-white font-inter mb-[24px] leading-[30.8px]">
                Agents That Take Actions
              </h3>
              <p className="text-[16px] text-[#AAAAAA] font-inter leading-[24px]">
                Your agents don't just chat. They trigger campaigns, process orders, resolve tickets - all without lifting a finger.
              </p>
            </div>

            {/* Video with Overlay */}
            <div className="w-full mt-[19rem]">
              <Image
                src="/videos/aivoice-unscreen.gif"
                alt="Agent Actions"
                width={746.068}
                height={419.663}
                className="object-contain w-full filter hue-rotate-[24deg] absolute  left-0 bottom-[29px] right-0"
              />
            <div className='relative'>
                {overlayCards.map((card) => (
                    <div
                    key={card.id}
                    className={`absolute ${getPositionClasses(card.position)} z-10`}
                    >
                                         <div 
                       className="text-white p-[13.454px] font-normal text-[13.454px] font-inter whitespace-nowrap"
                       style={{
                         borderRadius: '4.351px',
                         border: '0.841px solid rgba(151, 151, 151, 0.20)',
                         background: 'rgba(36, 36, 36, 0.51)',
                         backdropFilter: 'blur(10px)'
                       }}
                     >
                         {card.text}
                     </div>
                    </div>
                ))}
            </div>

            </div> 
          </div>

          {/* Right Column - Built to Exactly Fit Your Business */}
          <div className="space-y-[48px] p-[64px]">
            <div className="max-w-[516px]">
              <h3 className="text-[22px] font-normal text-white font-inter mb-[24px] leading-[30.8px]">
                Built to Exactly Fit Your Business
              </h3>
              <p className="text-[16px] text-[#AAAAAA] font-inter leading-[24px]">
                Customized Agents that follow your workflows, triggers, and logic, to match your unique business needs — no developers required.
              </p>
            </div>

            {/* Business Fit Image */}
            <div className="w-full">
              <div className="relative">
                <Image
                  src="/images/gallery/business.png"
                  alt="Customized business workflow interface"
                  width={400}
                  height={400}
                  className="object-contain w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentActionsSection; 