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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        setIsDropdownOpen(false); // Close dropdown on mobile
      }, 200); // Wait for slide animation
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
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

  const activeOption = filterOptions.find(option => option.id === activeFilter);

  return (
    <div className="space-y-6"> 
      {/* Desktop View - Hidden on mobile/tablet */}
      <div className="hidden lg:block space-y-4">
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

      {/* Mobile/Tablet Dropdown - Shown only on mobile/tablet */}
      <div className="lg:hidden relative">
        <button
          onClick={handleDropdownToggle}
          className="w-full flex items-center justify-between gap-[13px] p-[16px] bg-white border border-[#E4E4E4] rounded-[8px] cursor-pointer transition-all duration-300"
        >
          <div className="flex items-center gap-[10px]">
            {activeOption && showIcon === activeOption.id && (
              <Image
                src={activeOption.image}
                alt={activeOption.label}
                width={18}
                height={18}
                className="object-cover"
              />
            )}
            <h4 
              className="text-[16px] font-medium font-inter"
              style={activeOption ? {
                background: 'linear-gradient(90deg, #6940E4 0.19%, #DA46F8 99.81%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              } : {}}
            >
              {activeOption?.label || 'Select Option'}
            </h4>
          </div>
          <svg
            className={`w-[16px] h-[16px] transition-transform duration-200 text-gray-600 ${
              isDropdownOpen ? 'rotate-180' : 'rotate-0'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-[8px] bg-white border border-[#E4E4E4] rounded-[8px] shadow-lg z-10">
            {filterOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleFilterClick(option.id)}
                className={`cursor-pointer p-[16px] flex items-center gap-[10px] hover:bg-gray-50 transition-colors duration-200 ${
                  activeFilter === option.id ? 'bg-purple-50' : ''
                } ${
                  option.id === filterOptions[filterOptions.length - 1].id ? '' : 'border-b border-[#F0F0F0]'
                }`}
              >
                <Image
                  src={option.image}
                  alt={option.label}
                  width={18}
                  height={18}
                  className="object-cover"
                />
                <h4 
                  className={`text-[16px] font-medium font-inter ${
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter; 