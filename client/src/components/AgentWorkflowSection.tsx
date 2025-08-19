'use client';

import React from 'react';
import CardStep from './CardStep';

const AgentWorkflowSection: React.FC = () => {
  const workflowSteps = [
    {
      id: 1,
      number: 1,
      title: 'Pick Your Agents',
      description: 'Choose from prebuilt Convert, Engage, and Delight agents that fit your<br>customer journey.',
      icon: '/images/icons/icon1.png'
    },
    {
      id: 2,
      number: 2,
      title: 'Connect Your Tools',
      description: 'Plug into Shopify, Stripe, CRMs, helpdesks, and more —<br>no help needed.',
      icon: '/images/icons/icon2.png'
    },
    {
      id: 3,
      number: 3,
      title: 'Build Agent\'s Context',
      description: 'Use your existing knowledge base and workflows — no prompt<br>engineering required.',
      icon: '/images/icons/icon3.png'
    },
    {
      id: 4,
      number: 4,
      title: 'Go Live',
      description: 'Your agents start responding, converting, and resolving instantly — <br> while you stay focused on growth.',
      icon: '/images/icons/icon4.png'
    }
  ];

  return (
    <section className="bg-white py-[80px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1312px] mx-auto">
         {/* Left Column - Title and Description */}
         {/* <div className='flex flex-col md:flex-row justify-between mb-[80px] items-end'>  
            <h2 className="text-[48px] font-medium text-black font-inter leading-[57.6px] w-[613px]">
              Put AI Agents to Work - in Just a Few Clicks
            </h2>
            <p className="text-[16px] text-[#666666] font-inter leading-[24px] max-w-[559px]">
              
            </p>
         </div> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-[80px] ">
          {/* Left Content */}
          <div>
            <h2 className="w-full text-[30px]  md:text-[48px] lg:text-[48px] font-medium text-black font-inter leading-[57.6px ]">
            Put AI Agents to Work - in Just a Few Clicks
            </h2>
          </div>
          
          {/* Right Content */}
          <div>
            <p className="text-[18px] md:text-[16px] lg:text-[16px] font-inter text-[#2F2F2F] leading-[27px]">
            Quickly launch prebuilt AI agents tailored to your use case, connect them to your existing tools and workflows, and go live.
            </p>
          </div>
        </div>
  
        {/* Main Layout */}
        <div className="grid grid-cols-1  gap-[64px] items-start">

          {/* Right Column - 2x2 Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {workflowSteps.map((step) => (
              <CardStep
                key={step.id}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentWorkflowSection; 