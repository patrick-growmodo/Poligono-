'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Handle login logic here
      console.log('Login submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full max-w-[480px] space-y-8">
          {/* Logo */}
          <div className="mb-[39px]">
            <Link href="/">
            <Image 
              src="/images/logo/logo.svg" 
              alt="Poligono" 
              width={170} 
              height={26} 
              className="h-auto"
            />
            </Link>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-[40px] font-medium text-black font-inter leading-tight">
              Log in
            </h1>
            <p className="text-[18px] text-[#11100D] font-inter font-normal tracking-normal	">
              Hey there, welcome back! Select method to log in
            </p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 p-[14px_16px]   rounded-[6px] bg-[#F6F6F6] hover:bg-[#F6F6F6] transition-colors"
          >
            <Image src="/images/icons/google-icon.svg" alt="Google" width={20} height={20} />
            <span className="text-[14px] text-[#374151] font-medium font-inter">
              Log in with Google
            </span>
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#9CA3AF] font-inter">or</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[14px] font-medium text-[#374151] font-inter">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="eg. johnfrans@gmail.com"
                className="w-full p-[14px_16px] bg-[#F6F6F6]  rounded-[6px] text-[14px] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#DA46F8] focus:border-transparent font-inter text-black"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-[14px] font-medium text-[#374151] font-inter">
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
                  className="w-full p-[14px_16px] pr-12 bg-[#F6F6F6]  rounded-[6px] text-[14px] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#DA46F8] focus:border-transparent font-inter text-black "
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] hover:text-[#374151]"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="rememberMe" 
                    className="flex items-center cursor-pointer"
                  >
                    <div className={`
                      w-[16px] h-[16px] 
                      border-2 
                      rounded-[4px] 
                      flex items-center justify-center 
                      transition-all duration-200
                      ${formData.rememberMe 
                        ? 'bg-[#DA46F8] border-[#DA46F8]' 
                        : 'bg-white border-[#E5E7EB] hover:border-[#DA46F8]'
                      }
                    `}>
                      {formData.rememberMe && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path 
                            d="M1 4L3.5 6.5L9 1" 
                            stroke="white" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="ml-2 text-[14px] text-[#374151] font-inter">
                      Remember me
                    </span>
                  </label>
                </div>
              </div>
              
              <Link 
                href="/forgot-password"
                className="text-[14px] text-[#6B7280] hover:text-[#DA46F8] transition-colors font-inter"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#DA46F8] to-[#6940E4] hover:bg-[#C93DF0] text-white py-3 px-4 rounded-[6px] text-[16px] font-medium font-inter transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign Up'}
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-[16px] text-[#6B7280] font-inter">
                Don't have an account?{' '}
                <Link 
                  href="/register"
                  style={{
                    background: 'linear-gradient(90deg,#DA46F8 0%,#6940E4 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                  className="text-[#DA46F8] hover:text-[#C93DF0] transition-colors font-medium"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel - Purple Gradient with Geometric Shapes */}
      <div className="hidden lg:flex flex-1 relative p-[12px] pl-0 bg-white">
        <Image src="/images/hero/login-card.png" alt="Poligono" width={1000} height={1000} className='w-full h-full object-cover rounded-[20px]' />
      </div>
    </div>
  );
} 
