'use client';

import React, { useState } from 'react';
import Filter from './Filter';
import CardContent from './CardContent';

const FilterCardSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('convert');

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  return (
    <section className="bg-white py-[80px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1312px] mx-auto">
        
        <div className="flex gap-[24px]">
          {/* Filter Component - Left Side */}
          <div className="w-[161px]">
            <Filter 
              onFilterChange={handleFilterChange}
              activeFilter={activeFilter}
            />
          </div>
          
          {/* Card Content Component - Right Side */}
          <div className="w-[1151px]">
            <CardContent activeFilter={activeFilter} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterCardSection; 