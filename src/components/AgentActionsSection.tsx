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
      case 'top-left': // handle purchase card
        return 'top-[-265px] left-[46px] sm:top-[-200px] sm:left-[0px] md:top-[-328px] md:left-[0px] lg:top-[-300px] lg:left-[0px] xl:top-[-265px] xl:left-[46px]';
      case 'top-right': // close support tickets
        return 'top-[-265px] right-[46px] sm:top-[-200px] sm:right-[0px] md:top-[-328px] md:right-[0px] lg:top-[-300px] lg:right-[0px] xl:top-[-265px] xl:right-[46px]';
      case 'bottom-left': // launch campaign card
        return ' bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[-167%] sm:bottom-[-20%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[70%] md:bottom-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-220%]';
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
    <section className="bg-dark px-4 sm:px-6 lg:px-8 sm:py-[0px] sm:px-[0px] ">
      <div className="max-w-[1312px] mx-auto border-t-[1px] border-[#484848]">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[0px]">
          {/* Left Column - Agents That Take Actions */}
          <div className=" lg:relative flex flex-col justify-between space-y-[32px] p-[64px] border-b-[1px] border-[#484848] relative min-h-[600px]  lg:min-h-[500px]  md:min-h-[660px] sm:min-h-[560px] border-r-[0px] md:border-r-[0px] md:border-b-[1px] md:border-b-[0px] lg:border-b-[0px] lg:border-t-[0px] lg:border-r-[1px] md:p-[24px] md:py-[40px] md:px-[24px] sm:p-[24px] sm:py-[40px] sm:pb-[80px] sm:px-[0px]">
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
                unoptimized={true}
                className="object-contain w-full filter hue-rotate-[24deg] absolute  left-0 bottom-[29px] right-0 xl:bottom-[29px] md:bottom-[120px] sm:bottom-[80px] "
              />
            <div className='relative lg:absolute left-0 bottom-0 right-0'>
                {overlayCards.map((card) => (
                    <div
                    key={card.id}
                    className={`absolute w-fit   ${getPositionClasses(card.position)} z-10`}
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