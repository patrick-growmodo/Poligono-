'use client';

import React from 'react';
import CardTextImage from './CardTextImage';

const FeatureGrid: React.FC<{ featuresData: any[] }> = ({ featuresData }) => {


  return (
    <section className="bg-dark px-4 sm:px-0  lg:px-8 ">
      <div className="max-w-[1312px] mx-auto border-t-[1px] border-[#484848]">
        {/* 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[0px]">
           {featuresData.map((feature, index) => (
             <div 
               key={feature.id} 
               className={`p-[64px] px-[32px] lg:p-[64px] lg:px-[32px] lg:py-[64px] md:py-[40px] md:px-[24px] sm:py-[40px] sm:px-[0px] ${
                 index === 0 ? 'lg:border-r-[1px] lg:border-b-[0px] border-[#484848] md:border-r-[0px] border-b-[1px] md:border-b-[1px]  md:py-[40px] md:px-[24px] sm:py-[40px] sm:px-[0px]' : 
                 index === featuresData.length - 1 ? 'lg:border-b-[0px] lg:border-t-[0px] lg:border-l-[1px] border-[#484848] border-r-[0px]  border-t-[1px] md:border-b-[0px] md:border-t-[1px]  md:px-[24px] md:py-[40px] sm:py-[40px] sm:px-[0px]' : 
                 ''
               }`}
             >
               <CardTextImage
                 title={feature.title}
                 description={feature.description}
                 image={feature.image}
                 imageWidth={feature.imageWidth}
                 imageHeight={feature.imageHeight}
               />
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid; 