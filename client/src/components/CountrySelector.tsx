'use client';

import React, { useState } from 'react';
import Image from 'next/image';
interface Country {
  name: string;
  flag: string;
  flag_image: string;
  currency_symbol: string;
}

interface CountrySelectorProps {
  countries: Country[];
  selectedCountry: string;
  onCountrySelect: (countryName: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ 
  countries, 
  selectedCountry, 
  onCountrySelect 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedCountryData = countries.find(country => country.name === selectedCountry);

  return (
    <div className="relative w-[100%] md:min-w-[267px] md:w-[267px] lg:w-[267px] lg:min-w-[267px]">
      <div 
        className="flex items-center gap-[8px] bg-white border border-[#E4E4E4] rounded-[8px] px-[12px] py-[8px] cursor-pointer hover:border-[#6940E4] transition-colors"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Image 
          src={selectedCountryData?.flag_image || ''} 
          alt={selectedCountryData?.name || 'Country flag'} 
          width={24} 
          height={24} 
          className='w-[24px] h-[24px]' 
        />
        <span className="text-[14px] text-black font-inter">
          {selectedCountry}
        </span>
        <svg 
          width="12" 
          height="7" 
          viewBox="0 0 12 7" 
          fill="none" 
          className={`ml-auto transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
        >
          <path d="M1 1L6 6L11 1" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-[4px] bg-white border border-[#E4E4E4] rounded-[8px] shadow-lg z-10">
          {countries.map((country) => (
            <div
              key={country.name}
              className="flex items-center gap-[8px] px-[12px] py-[8px] cursor-pointer hover:bg-[#F8F9FA] transition-colors"
              onClick={() => {
                onCountrySelect(country.name);
                setIsDropdownOpen(false);
              }}
            >
              <Image 
                src={country.flag_image || ''} 
                alt={country.name || 'Country flag'} 
                width={24} 
                height={24} 
                className='w-[24px] h-[24px]' 
              />
              <span className="text-[14px] text-black font-inter">
                {country.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
export type { Country, CountrySelectorProps }; 