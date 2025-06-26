'use client';

import React, { useState } from 'react';
// import Filter from './Filter';
import CardContent from './CardContent';

const FilterCardSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('convert');

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  return (
    <section className="bg-white py-[80px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1312px] mx-auto">
        
        <div className="flex gap-[24px] flex-col md:flex-col lg:flex-row">
          {/* Filter Component - Left Side */}
          {/* <div className="w-full md:w-[100%] lg:w-[161px]">
            <Filter 
              onFilterChange={handleFilterChange}
              activeFilter={activeFilter}
            />
          </div> */}
          
          {/* Card Content Component - Right Side lg:w-[1151px]*/}
          <div className="w-full md:w-[100%] lg:w-[100%]">
            <CardContent activeFilter={activeFilter} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterCardSection; 