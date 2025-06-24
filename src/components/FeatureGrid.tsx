'use client';

import React from 'react';
import CardTextImage from './CardTextImage';

const FeatureGrid: React.FC<{ featuresData: any[] }> = ({ featuresData }) => {


  return (
    <section className="bg-dark px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-[1312px] mx-auto border-t-[1px] border-[#484848]">
        {/* 3 Column Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-[0px]">
           {featuresData.map((feature, index) => (
             <div 
               key={feature.id} 
               className={`p-[64px] px-[32px] ${
                 index === 0 ? 'border-r-[1px] border-[#484848]' : 
                 index === featuresData.length - 1 ? 'border-l-[1px] border-[#484848]' : 
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