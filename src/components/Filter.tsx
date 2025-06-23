'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface FilterOption {
  id: string;
  label: string;
  image: string;
  isActive?: boolean;
}

interface FilterProps {
  onFilterChange: (filterId: string) => void;
  activeFilter: string;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, activeFilter }) => {
  const [showIcon, setShowIcon] = useState<string | null>(activeFilter);
  const [slideText, setSlideText] = useState<string | null>(null);

  useEffect(() => {
    setShowIcon(activeFilter);
  }, [activeFilter]);

  const handleFilterClick = (filterId: string) => {
    if (filterId !== activeFilter) {
      setSlideText(filterId); // Start text slide animation
      setTimeout(() => {
        setShowIcon(null); // Hide current icon
        onFilterChange(filterId);
        setSlideText(null); // Reset slide state
      }, 200); // Wait for slide animation
    }
  };
  const filterOptions: FilterOption[] = [
    {
      id: 'convert',
      label: 'Convert',
      image: '/images/icons/menu-star.svg',
      isActive: true
    },
    {
      id: 'engage',
      label: 'Engage',
      image: '/images/icons/menu-star.svg',
      isActive: false
    },
    {
      id: 'delight',
      label: 'Delight',
      image: '/images/icons/menu-star.svg',
      isActive: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {filterOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handleFilterClick(option.id)}
            className={`cursor-pointer transition-all duration-300 flex items-center gap-[13px] ${
              activeFilter === option.id
                ? 'border-b-[1px] border-[#C0ACFF] pb-[8px]'
                : 'border-gray-200 hover:border-purple-300 bg-white '
            }`}
          >
            <div className="flex items-center gap-[10px] overflow-hidden">
              {showIcon === option.id && (
                <div className="relative rounded-lg overflow-hidden animate-fade-in">
                  <Image
                    src={option.image}
                    alt={option.label}
                    width={18}
                    height={18}
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <div className={`transition-transform duration-200 ease-out ${
                slideText === option.id ? 'transform -translate-x-20' : 'transform translate-x-0'
              }`}>
                <h4 
                  className={`text-[16px] font-medium font-inter transition-colors duration-300 ${
                    activeFilter === option.id ? '' : 'text-black'
                  }`}
                  style={activeFilter === option.id ? {
                    background: 'linear-gradient(90deg, #6940E4 0.19%, #DA46F8 99.81%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  } : {}}
                >
                  {option.label}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter; 