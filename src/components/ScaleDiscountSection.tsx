'use client';

import React from 'react';
import { Button } from './Button';

const ScaleDiscountSection: React.FC = () => {
  return (
    <div 
      className="bg-white relative px-4 sm:px-6 lg:px-8  flex items-center  justify-between "
      
    >
      {/* Background overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-black/40"></div> */}
      
      <div className="max-w-[1312px] p-[48px]  h-[353px] mx-auto relative z-10 w-full" style={{
        backgroundImage: "url('/images/hero/cta.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#1A1A1A'
      }}>
        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-[32px] h-full">
          
          {/* Left Side - Heading */}
          <div className="flex-1">
            <h2 className="text-[48px] font-medium  text-white font-inter leading-[57.6px] max-w-[768px]">
              Get deeper discounts on committed spend{' '}
              <span 
                className="font-bold"
                style={{
                  background: 'linear-gradient(90deg,#DA46F8 0%,#6940E4 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                as you scale
              </span>
            </h2>
          </div>

          {/* Right Side - Button */}
          <div className="flex-shrink-0">
            <Button 
              variant="secondary"
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-[32px] py-[16px] text-[16px] font-medium rounded-[50px] transition-colors duration-300"
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleDiscountSection; 