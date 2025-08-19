'use client';

import React from 'react';
import ScaleDiscountSection from './ScaleDiscountSection';
import PricingSection from './PricingSection';



const PricingContent: React.FC = () => {
    return (
        <section id='pricing-section' className='bg-white pt-[100px] pb-[48px]'>
            <PricingSection/>
            <ScaleDiscountSection/>
        </section>
    )
}

export default PricingContent;