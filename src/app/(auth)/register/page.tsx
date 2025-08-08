'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay ,EffectFade, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dark mode detection for auth pages
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    if (savedTheme) {
      // Use saved preference
      applyTheme(savedTheme === 'dark');
    } else {
      // Follow system preference
      applyTheme(mediaQuery.matches);
    }

    // Listen for system preference changes
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only auto-update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Handle registration logic here
      console.log('Registration submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  const sliderContent = [
    {
      title: "Connect with your own AI Agent",
      description: "Lorem ipsum dolor sit amet consectetuer adipiscing elit, sed diam non ummy nibh",
      image: "/images/hero/register1.png"
    },
    {
      title: "Automate Your Workflow",
      description: "Streamline your business processes with intelligent automation and smart integrations",
      image: "/images/hero/register2.png"
    },
    {
      title: "Scale Your Business",
      description: "Grow your business with powerful AI-driven insights and analytics",
      image: "/images/hero/register3.png"
    }
  ];

  return (
    <div className="h-screen flex auth-dark-gradient">
      {/* Left Panel - Registration Form (50% on desktop, 100% on mobile) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center  px-8 py-12">
        <div className="w-full max-w-[480px] space-y-8">
          {/* Logo */}
          <div className="mb-12">
            {/* Light mode logo */}
            <Image 
              src="/images/logo/logo-light.svg" 
              alt="Poligono" 
              width={170} 
              height={26} 
              className="h-auto block dark:hidden"
            />
            {/* Dark mode logo */}
            <Image 
              src="/images/logo/logo-dark.svg" 
              alt="Poligono" 
              width={170} 
              height={26} 
              className="h-auto hidden dark:block"
            />
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-[32px] font-semibold text-black dark:text-white font-inter leading-tight">
              Create Account
            </h1>
            <p className="text-[14px] text-[#6B7280] dark:text-gray-400 font-inter">
              Enter your credentials to create your account and sign up
            </p>
          </div>

          {/* Google Signup Button */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 p-[14px_16px] bg-[#F6F6F6] dark:bg-[#333] rounded-[6px] hover:bg-gray-50 dark:hover:bg-[#404040] transition-colors border dark:border-gray-600"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-[14px] text-[#374151] dark:text-white font-medium font-inter">
              Sign up with Google
            </span>
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB] dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-[#9CA3AF] dark:text-gray-400 font-inter">or</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-[14px] font-medium text-[#374151] dark:text-white font-inter">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="eg. John"
                  className="bg-[#F6F6F6] dark:bg-[#333] w-full p-[14px_16px] rounded-[6px] text-[14px] placeholder-[#9CA3AF] dark:placeholder-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#DA46F8] focus:border-transparent font-inter text-black dark:text-white border dark:border-gray-600"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-[14px] font-medium text-[#374151] dark:text-white font-inter">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="eg. Francisco"
                  className="bg-[#F6F6F6] dark:bg-[#333] w-full p-[14px_16px] rounded-[6px] text-[14px] placeholder-[#9CA3AF] dark:placeholder-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#DA46F8] focus:border-transparent font-inter text-black dark:text-white border dark:border-gray-600"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[14px] font-medium text-[#374151] dark:text-white font-inter">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="eg. johnfrans@gmail.com"
                className="w-full p-[14px_16px] bg-[#F6F6F6] dark:bg-[#333] rounded-[6px] text-[14px] placeholder-[#9CA3AF] dark:placeholder-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#DA46F8] focus:border-transparent font-inter text-black dark:text-white border dark:border-gray-600"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-[14px] font-medium text-[#374151] dark:text-white font-inter">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full p-[14px_16px] pr-12 bg-[#F6F6F6] dark:bg-[#333] rounded-[6px] text-[14px] placeholder-[#9CA3AF] dark:placeholder-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#DA46F8] focus:border-transparent font-inter text-black dark:text-white border dark:border-gray-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] dark:text-gray-400 hover:text-[#374151] dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path d="M2.94145 2.16743C2.69738 1.92336 2.30165 1.92336 2.05757 2.16743C1.81349 2.41151 1.81349 2.80724 2.05757 3.05132L17.0576 18.0513C17.3016 18.2954 17.6974 18.2954 17.9415 18.0513C18.1855 17.8072 18.1855 17.4115 17.9415 17.1674L2.94145 2.16743Z" fill="#767676"/>
                    <path d="M18.8961 10.5705C18.4427 11.9333 17.685 13.1573 16.7034 14.1617L14.1214 11.5796C14.2853 11.1201 14.3745 10.6252 14.3745 10.1094C14.3745 7.69313 12.4158 5.73438 9.99951 5.73438C9.48373 5.73438 8.9888 5.82363 8.52932 5.98753L6.46533 3.92354C7.55604 3.47922 8.74933 3.23438 9.99994 3.23438C14.1419 3.23438 17.6549 5.91997 18.8958 9.64309C18.9961 9.94397 18.9962 10.2695 18.8961 10.5705Z" fill="#767676"/>
                    <path d="M13.1245 10.1094C13.1245 10.2595 13.1139 10.4072 13.0935 10.5517L9.55722 7.01543C9.70171 6.99496 9.84937 6.98438 9.99951 6.98438C11.7254 6.98438 13.1245 8.38348 13.1245 10.1094Z" fill="#767676"/>
                    <path d="M10.4418 13.2033L6.90557 9.66708C6.8851 9.81157 6.87451 9.95924 6.87451 10.1094C6.87451 11.8353 8.27362 13.2344 9.99951 13.2344C10.1497 13.2344 10.2973 13.2238 10.4418 13.2033Z" fill="#767676"/>
                    <path d="M5.62451 10.1094C5.62451 9.5936 5.71377 9.09867 5.87767 8.63918L3.29528 6.0568C2.31357 7.06123 1.55574 8.28532 1.10235 9.64829C1.00225 9.94923 1.00234 10.2748 1.10263 10.5757C2.34354 14.2988 5.85657 16.9844 9.99848 16.9844C11.2493 16.9844 12.4427 16.7395 13.5335 16.295L11.4697 14.2312C11.0102 14.3951 10.5153 14.4844 9.99951 14.4844C7.58327 14.4844 5.62451 12.5256 5.62451 10.1094Z" fill="#767676"/>
                  </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#DA46F8] to-[#6940E4]  hover:bg-[#C93DF0] text-white p-[14px_16px] rounded-[6px] text-[16px] font-medium font-inter transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center pt-2">
              <p className="text-[14px] text-[#6B7280] dark:text-gray-400 font-inter">
                Already have an account?{' '}
                <Link 
                  href="/login"
                  style={{
                    background: 'linear-gradient(90deg,#DA46F8 0%,#6940E4 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                  className="text-[#DA46F8] hover:text-[#C93DF0] transition-colors font-medium"
                >
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* Right Panel - Slider (50%) */}
      <div className="hidden lg:flex w-1/2 relative p-[12px] pl-0">
        <div className="relative w-full h-full flex items-center justify-center">
                      <Swiper
              modules={[Pagination, Autoplay, EffectFade, Navigation]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{
                clickable: true,
                bulletClass: 'register-pagination-bullet',
                bulletActiveClass: 'register-pagination-bullet-active',
              }}
              effect={'fade'}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="w-full h-full register-slider"
            >
            {sliderContent.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image 
                    src={slide.image} 
                    alt={slide.title} 
                    fill
                    className="object-cover rounded-[20px]" 
                  />
                  <div className="absolute bottom-[44px] left-0 w-full flex items-end justify-center p-8">
                    <div className="w-full max-w-[480px] space-y-4 text-center">
                      <h2 className="text-[24px] font-semibold text-white font-inter leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-[16px] text-white font-inter leading-relaxed">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

    </div>
  );
}
