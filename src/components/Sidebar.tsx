'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SidebarProps {
  activeItem: string;
  onItemSelect: (item: string) => void;
}

export default function Sidebar({ activeItem, onItemSelect }: SidebarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isManuallySet, setIsManuallySet] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Check localStorage and system preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme) {
      // User has manually set a preference
      setIsManuallySet(true);
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.remove('dark-theme');
      }
    } else {
      // Follow system preference
      setIsManuallySet(false);
      const systemIsDark = mediaQuery.matches;
      setIsDarkMode(systemIsDark);
      if (systemIsDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.remove('dark-theme');
      }
    }

    // Listen for system preference changes
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only auto-update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'dark');
          document.body.classList.add('dark-theme');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.setAttribute('data-theme', 'light');
          document.body.classList.remove('dark-theme');
        }
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Initialize sidebar minimize state from localStorage
  useEffect(() => {
    const savedSidebarState = localStorage.getItem('sidebarMinimized');
    if (savedSidebarState) {
      setIsMinimized(savedSidebarState === 'true');
    }
  }, []);

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarMinimized', isMinimized.toString());
    console.log('Sidebar state saved:', isMinimized ? 'true' : 'false');
  }, [isMinimized]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    setIsManuallySet(true); // User has now manually set a preference
    
    if (newDarkMode) {
      // Add both class and data attribute for multiple dark mode approaches
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      console.log('Dark mode enabled');
    } else {
      // Remove both class and data attribute
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
      console.log('Light mode enabled');
    }
  };

  // Reset to system preference (double-click function)
  const resetToSystemPreference = () => {
    localStorage.removeItem('theme');
    setIsManuallySet(false);
    const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(systemIsDark);
    if (systemIsDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-theme');
    }
  };

  // Toggle sidebar minimize/expand
  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  const navigationItems = [ 
    { name: 'Dashboard', icon_light: '/images/icons/dashboard-browsing.svg', icon_dark: '/images/icons/dashboard-browsing-dark.svg', href: '/dashboard', isActive: true },
    { name: 'Agents', icon_light: '/images/icons/user-multiple.svg', icon_dark: '/images/icons/user-multiple-dark.svg', href: '/agents', isActive: false },
    { name: 'Notifications', icon_light: '/images/icons/notification.svg', icon_dark: '/images/icons/notification-dark.svg', href: '/notifications', isActive: false },
    { name: 'Plans', icon_light: '/images/icons/credit-card.svg', icon_dark: '/images/icons/credit-card-dark.svg', href: '/plans', isActive: false },
    { name: 'Settings', icon_light: '/images/icons/setting-light.svg', icon_dark: '/images/icons/setting-dark.svg', href: '/settings', isActive: false },
  ];

  return (
    <div className={`h-[100vh] sticky top-0  pt-[20px] pb-[16px] bg-white dark:bg-[#1A1A1A]  flex flex-col border_custom  transition-all duration-300 ${isMinimized ? 'w-[84px] px-[20px]' : 'w-[272px] max-w-[272px] px-[20px]'}`}>
      
      <button 
        onClick={toggleSidebar}
        className="absolute top-[50%] right-[-11px] translate-y-[-50%] z-[1] transition-transform duration-300"
        style={{ transform: `translateY(-50%) ${isMinimized ? 'rotate(180deg)' : 'rotate(0deg)'}` }}
      >
        <Image src="/images/icons/arrow-open.svg" alt="Close" width={24} height={24} className="block dark:hidden" />
        <Image src="/images/icons/arrow-open-dark.svg" alt="Close" width={24} height={24} className="hidden dark:block" />
      </button>
 
            {/* Logo Section */}
      <div className={`flex items-center mb-[24px] ${isMinimized ? 'justify-center' : 'justify-between'}`}>
        {!isMinimized && (
          <>
            <Image 
              src="/images/logo/logo-light.svg" 
              alt="Poligono" 
              width={149} 
              height={22} 
              className="h-auto block dark:hidden"
            />
            <Image 
              src="/images/logo/logo-dark.svg" 
              alt="Poligono" 
              width={149} 
              height={22} 
              className="h-auto hidden dark:block"
            />
          </>
        )}
        {isMinimized && (
          <Image src="/images/logo/small-logo.svg" alt="Poligono" width={32} height={32} className="h-auto" />
        )}

        {!isMinimized && (
          <button 
            onClick={toggleDarkMode}
            onDoubleClick={resetToSystemPreference}
            className="flex items-center justify-center icon_action_sidebar w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={
              isManuallySet 
                ? `${isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} (Double-click to follow system)`
                : `Following system (${isDarkMode ? 'dark' : 'light'} mode)`
            }
          >
            <Image 
              src="/images/icons/dark.png" 
              alt="Switch to light mode" 
              width={24} 
              height={24} 
              className={`h-auto ${isDarkMode ? 'block' : 'hidden'}`}
            />
            <Image 
              src="/images/icons/light.png" 
              alt="Switch to dark mode" 
              width={24} 
              height={24} 
              className={`h-auto ${isDarkMode ? 'hidden' : 'block'}`}
            />
          </button>
        )}
      </div>

              {/* Navigation Items */}
        <nav className="flex-1 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => onItemSelect(item.name)}
              className={`w-full flex items-center text-sm font-medium rounded-lg transition-colors ${
                isMinimized ? 'p-[12px] justify-center' : 'p-[12px]'
              } ${
                activeItem === item.name
                  ? 'bg-purple-50 dark:bg-[#333] text-purple-700 dark:text-white  '
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              
              {item.icon_light && (
                <Image
                  src={item.icon_light as string}
                  alt={item.name}
                  width={24}
                  height={24}
                  className={`${isMinimized ? 'w-[20px] h-[20px]' : 'mr-3'} ${activeItem === item.name ? 'filter grayscale-0' : 'filter grayscale'} dark:hidden `}
                />
              )}
              {item.icon_dark && (
                <Image
                  src={item.icon_dark as string}
                  alt={item.name}
                  width={24}  
                  height={24}
                  className={`${isMinimized ? 'w-[20px] h-[20px]' : 'mr-3'} ${activeItem === item.name ? 'filter grayscale-0' : 'filter grayscale'} hidden dark:block `}
                />
              )}

              {!isMinimized && item.name}
              {!isMinimized && activeItem === item.name && (
                <span className="ml-auto">
                  {/* <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg> */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10.7965 9.99956L7.08398 6.28706L8.14448 5.22656L12.9175 9.99956L8.14448 14.7726L7.08398 13.7121L10.7965 9.99956Z" 
                      fill={isDarkMode ? '#FFF' : '#421ABA'}/>
                    </svg>
                </span>
              )}
            </Link>
          ))}
        </nav>

      {/* Upgrade Section */}
      {!isMinimized && (
        <div 
          className="px-[16px] pb-[16px] pt-[40px] rounded-[12px] border border-[#FFF] text-white mb-[20px] relative"
          style={{
            background: 'linear-gradient(359deg, #0D0126 49.68%, #DA46F8 234.54%)'
          }}
        >
          <Image src="/images/icons/icon-upgrade.png" alt="Upgrade" width={48} height={48} className="absolute top-[-24px] left-[50%] w-[48px] h-[48px] transform -translate-x-1/2" />
          <div className="mb-3">
            <h3 className="font-semibold text-[18px] mb-1 text-center">Upgrade your plan</h3>
            <p className="text-[12px] opacity-90 leading-relaxed text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <button 
            className="w-full hover:opacity-90 text-white text-xs font-medium py-2 px-4 rounded-lg transition-all duration-300"
            style={{
              background: 'linear-gradient(90deg, #DA46F8, #6940E4)'
            }}
          >
            Upgrade now
          </button>
        </div>
      )}

      {/* User Profile */}
      <div className={` ${isMinimized ? 'p-[0px]' : 'p-[12px]'}`}>
        <div className={`flex items-center gap-[16px] ${isMinimized ? 'flex-col' : ''}`}>
          <div className="relative">
            <Image 
              src="/images/gallery/profile-1.png" 
              alt="User"
              width={30}
              height={30}
              className="rounded-full"
            />
            {!isMinimized && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
            )}
          </div>
          {!isMinimized && (
          <div className="flex-1">
            <p className="text-[16px] font-medium text-gray-900 dark:text-white">Sophia Williams</p>
            <p className="text-[12px] text-[#525866] dark:text-gray-400">Free plan</p>
          </div>
          )}
          {/* {!isMinimized && ( */}
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
            <g clipPath="url(#clip0_20447_35624)">
              <path d="M10.4999 8.66654C10.1312 8.66654 9.83328 8.96524 9.83328 9.33315V11.9999C9.83328 12.3672 9.53457 12.6665 9.16654 12.6665H7.16656V2.6666C7.16656 2.09727 6.80389 1.58861 6.25861 1.39928L6.06122 1.33324H9.16654C9.53457 1.33324 9.83328 1.63255 9.83328 1.99998V3.99996C9.83328 4.36787 10.1312 4.66658 10.4999 4.66658C10.8685 4.66658 11.1665 4.36787 11.1665 3.99996V1.99998C11.1665 0.897329 10.2692 0 9.16654 0H1.99998C1.97459 0 1.95335 0.0113524 1.9287 0.0146483C1.89659 0.0119628 1.86595 0 1.83336 0C1.09802 0 0.5 0.597894 0.5 1.33324V13.3331C0.5 13.9024 0.862667 14.4111 1.40795 14.6004L5.41999 15.9378C5.55598 15.9798 5.69123 15.9998 5.83332 15.9998C6.56866 15.9998 7.16656 15.4018 7.16656 14.6665V13.9999H9.16654C10.2692 13.9999 11.1665 13.1025 11.1665 11.9999V9.33315C11.1665 8.96524 10.8685 8.66654 10.4999 8.66654Z" fill="#525866"/>
              <path d="M16.304 6.19609L13.6373 3.5295C13.4467 3.33882 13.16 3.28145 12.9107 3.38472C12.6621 3.48812 12.4994 3.7314 12.4994 4.00081V6.00078H9.83276C9.46472 6.00078 9.16602 6.29936 9.16602 6.6674C9.16602 7.03544 9.46472 7.33402 9.83276 7.33402H12.4994V9.334C12.4994 9.60341 12.6621 9.84669 12.9107 9.95008C13.16 10.0534 13.4467 9.99598 13.6373 9.80543L16.304 7.13871C16.5646 6.87809 16.5646 6.45671 16.304 6.19609Z" fill="#525866"/>
            </g>
            <defs>
              <clipPath id="clip0_20447_35624">
                <rect width="16" height="16" fill="white" transform="translate(0.5)"/>
              </clipPath>
            </defs>
          </svg>
          </button>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
