'use client';

import React from 'react';
import Image from 'next/image';
import ContactForm, { FormData } from './ContactForm';

const ContactSection: React.FC = () => {
  const handleFormSubmit = (formData: FormData) => {
    console.log('Form submitted:', formData);
  };

  return (
    <section className="bg-[#1A1A1A] py-[80px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1312px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          
          {/* Left Column - Form */}
          <div className="order-2 lg:order-1 py-[84px] px-[48px]  rounded-tl-[12px]  min-h-[775px] md:rounded-tl-[0px] md:rounded-br-[20px]
          lg:rounded-bl-[20px] lg:rounded-br-[0px] lg:rounded-tl-[20px] lg:rounded-tr-[00px]
                rounded-bl-[20px] 
                border 
                border-[rgba(151,151,151,0.2)] 
                [background:linear-gradient(146deg,#191919_0.2%,#0B0A09_73.63%)]">
            <ContactForm 
              onSubmit={handleFormSubmit}
              className="w-full"
            />
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end h-full">
            <div className="relative w-full h-full min-h-[775px] rounded-tr-[20px] rounded-br-[20px] overflow-hidden md:min-h-[500px] md:rounded-tr-[20px] md:rounded-tl-[20px] md:rounded-br-[0px] lg:rounded-bl-[0px] lg:rounded-br-[20px] lg:rounded-tl-[00px] lg:rounded-tr-[20px]">
              <Image
                src="/images/hero/form-image.png"
                alt="Contact form illustration"
                fill
                className="object-cover h-full w-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 