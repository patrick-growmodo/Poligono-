'use client';

import React from 'react';
import ScaleDiscountSection from './ScaleDiscountSection';
import PricingSection from './PricingSection';



const PricingContent: React.FC = () => {
    return (
        <section className='bg-white pb-[100px]'>
            <PricingSection/>
            <ScaleDiscountSection/>
        </section>
    )
}

export default PricingContent;