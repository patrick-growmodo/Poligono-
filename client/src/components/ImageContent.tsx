import React from 'react'
import { Button } from './Button'

const ImageContent: React.FC = () => {
  return (
    <section className="bg-white pt-[103px] pb-[64px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h1 
          className="text-black text-center font-medium mb-[32px] font-inter text-[56px] leading-[120%] tracking-[-0.56px] sm:text-[50px]">
          AI Agents to{' '}
          <span className="text-[#DA46F8]">convert</span>, engage &<br />
          delight your customers
        </h1>

        {/* Description */}
        <p 
          className="text-[#2F2F2F] text-center max-w-3xl mx-auto mb-[32px] font-normal text-[18px] leading-[150%] font-roboto"
        >
          Convert visitors, send timely promotions, and resolve inquiries instantly with AI agents that 
          engage customers - across SMS, Voice, WhatsApp, Chat - at every step of the journey.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 justify-center items-center sm:flex-col lg:flex-row">
          <Button variant="outline" size="md" className='w-full sm:w-[100%] lg:w-fit'>
            Talk to Sales
          </Button>
          <Button variant="primary" size="md" className='w-full sm:w-[100%] lg:w-fit'>
            Request a Trial
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ImageContent 