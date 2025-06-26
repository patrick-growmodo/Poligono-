'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FooterLink {
  id: string;
  label: string;
  href: string;
}

const Footer: React.FC = () => {
  const navigationLinks: FooterLink[] = [
    { id: '1', label: 'About', href: '/about' },
    { id: '2', label: 'Services', href: '/services' },
    { id: '3', label: 'Features', href: '/features' },
    { id: '4', label: 'Pricing', href: '/pricing' },
    { id: '5', label: 'Contact', href: '/contact' }
  ];

  const subfooterLinks: FooterLink[] = [
    { id: '1', label: 'Privacy Policy', href: '/privacy-policy' },
    { id: '2', label: 'Terms of Service', href: '/terms-of-service' },
    { id: '3', label: 'Cookies Settings', href: '/cookies-settings' }
  ];

  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Main Footer */}
      <div className="max-w-[1312px] mx-auto px-4 sm:px-6 lg:px-8 py-[64px] pb-[120px]">
        <div className="flex flex-col justify-between items-start">
      
            <div className="mb-[32px]">
                <Link href="/" className="flex items-center gap-[12px]">
                    <Image
                    src="/images/logo/logo_label.svg"
                    alt="Poligono"
                    width={150}
                    height={32.568}
                    className="w-[150px] h-[32.568px]"
                    />
                </Link>
            </div>
            <div className="flex flex-col justify-between w-full md:flex-col lg:flex-row gap-[50px]">
            {/* Left Section - Logo and Heading */}
            <div className="flex-1 max-w-[600px] md:max-w-[100%] lg:max-w-[600px]">
                {/* Logo */}


                {/* Heading */}
                <h2 className="text-[32px] font-medium text-white font-inter leading-[57.6px]">
                AI Agents to{' '}
                <span className="bg-gradient-to-r from-[#DA46F8] to-[#6940E4] bg-clip-text text-transparent">
                    convert
                </span>
                , engage &<br />
                delight your customers
                </h2>
            </div>

            {/* Right Section - Navigation Menu */}
            <div className="flex-shrink-0">
                <nav>
                <ul className="flex flex-row gap-[24px]">
                    {navigationLinks.map((link) => (
                    <li key={link.id}>
                        <Link
                        href={link.href}
                        className="text-[16px] text-white font-normal font-inter hover:text-[#DA46F8] transition-colors duration-200"
                        >
                        {link.label}
                        </Link>
                    </li>
                    ))}
                </ul>
                </nav>
            </div>
            </div>
        </div>
      </div>

      {/* Subfooter */}
      <div>
        <div className="max-w-[1312px] mx-auto px-[0px] sm:px-6 lg:px-8 py-[24px] border-t border-[#333333]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-[16px]">
            
            {/* Left - Links */}
            <div className="flex flex-wrap items-center gap-[24px]">
              {subfooterLinks.map((link, index) => (
                <React.Fragment key={link.id}>
                  <Link
                    href={link.href}
                    className="text-[12px] text-white font-normal font-inter hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
          
                </React.Fragment>
              ))}
            </div>

            {/* Right - Copyright */}
            <div className="text-[12px] text-white font-inter">
              © 2025 Poligono. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
