'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components';

interface ForgotPasswordFormData {
  email: string;
  code: string[];
  newPassword: string;
  confirmPassword: string;
}

export default function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: '',
    code: ['', '', '', ''],
    newPassword: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [codeValidation, setCodeValidation] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset password strength when leaving step 3
  useEffect(() => {
    if (currentStep !== 3) {
      setPasswordStrength(0);
    }
  }, [currentStep]);

  // Dark mode detection for auth pages
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = (isDark: boolean) => {
   // Update React state to trigger re-render
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.add('dark-theme');
        console.log('ForgotPassword: Dark mode applied');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.remove('dark-theme');
        console.log('ForgotPassword: Light mode applied');
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

    // Calculate password strength when password changes
    if (name === 'newPassword') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    
    // Length check (minimum 8 characters)
    if (password.length >= 8) strength += 1;
    
    // Uppercase letter
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Lowercase letter
    if (/[a-z]/.test(password)) strength += 1;
    
    // Number
    if (/\d/.test(password)) strength += 1;
    
    // Special character
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    
    return strength;
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...formData.code];
      newCode[index] = value;
      setFormData(prev => ({ ...prev, code: newCode }));
      
      // Auto-focus next input
      if (value && index < 3) {
        codeInputRefs.current[index + 1]?.focus();
      }
      
      // Validate code when all 4 digits are filled
      const completedCode = newCode.join('');
      if (completedCode.length === 4) {
        if (completedCode === '1234') {
          setCodeValidation('correct');
        } else {
          setCodeValidation('incorrect');
        }
      } else {
        setCodeValidation('none');
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !formData.code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
      // Reset validation when deleting
      setCodeValidation('none');
    }
  };

  const handleSubmitStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (currentStep < 4) {
        setCurrentStep(prev => prev + 1);
      }
    } catch (error) {
      console.error('Step submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Code resent to:', formData.email);
      // You could show a success message here
    } catch (error) {
      console.error('Resend error:', error);
    } finally {
      setIsLoading(false);
    }
  };



  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Forgot password?";
      case 2: return "Password reset";
      case 3: return "Set new password";
      case 4: return "All done!";
      default: return "Forgot password?";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "No worries, we'll send you all the reset instructions.";
      case 2: return (
        <>
          We sent a code to <span className="font-semibold">{formData.email}</span>
        </>
      );
      case 3: return "Must be at least 8 characters.";
      case 4: return "Your password has been successfully reset.";
      default: return "";
    }
  };

  const getCodeInputStyling = (digit: string) => {
    const baseClasses = "w-[110px] h-[110px] text-center text-[56px] font-medium rounded-[16px] focus:outline-none focus:ring-2 focus:ring-[#DA46F8] focus:border-transparent font-inter text-black dark:text-white bg-transparent";
    
    if (codeValidation === 'correct') {
      return `${baseClasses} bg-green-50 border-2 border-green-500`;
    } else if (codeValidation === 'incorrect') {
      return `${baseClasses} bg-red-50 border-2 border-red-500`;
    } else if (digit) {
      return `${baseClasses} bg-[#fff] border-2 border-[#DA46F8]`;
    } else {
      return `${baseClasses} bg-[#fff] border border-[#DDDDDD]`;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <form onSubmit={handleSubmitStep} className="mt-[46px]">
            <div className="mb-[32px]">
              <label htmlFor="email" className="block text-[16px] font-medium text-[#374151] dark:text-white font-inter mb-[8px]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full p-[14px_16px] bg-[#F6F6F6] dark:bg-[#333] rounded-[6px] text-[14px] placeholder-[#9CA3AF] dark:placeholder-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#DA46F8] focus:border-transparent font-inter text-black dark:text-white border dark:border-gray-600 leading-[24px]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#DA46F8] to-[#6940E4] hover:bg-[#C93DF0] text-white p-[14px_16px] rounded-[6px] text-[16px] font-normal font-inter transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send code via Email'}
            </button>
          </form>
        );

      case 2:
        return (
          <form onSubmit={handleSubmitStep} className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-3 justify-center">
                {formData.code.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => { codeInputRefs.current[index] = el; }}
                    type="text"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={getCodeInputStyling(digit)}
                    maxLength={1}
                  />
                ))}
              </div>
              
              {/* Validation Message */}
              {codeValidation !== 'none' && (
                <div className="text-left mt-4">
                  <p className={`text-[14px] font-medium font-inter ${
                    codeValidation === 'correct' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {codeValidation === 'correct' ? 'The code is correct!' : 'The code is incorrect!'}
                  </p>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading || formData.code.some(digit => !digit) || codeValidation !== 'correct'}
              className="w-full bg-gradient-to-r from-[#DA46F8] to-[#6940E4] hover:bg-[#C93DF0] text-white p-[14px_16px] rounded-[6px] text-[16px] font-medium font-inter transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Continue'}
            </button>
                          <div className="text-center"
                          style={{marginTop: '28px !important'}}>
                <p className="text-[14px] text-[#6B7280] dark:text-gray-400 font-inter">
                Didn't receive the code?{' '}
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    style={{
                      background: 'linear-gradient(90deg,#DA46F8 0%,#6940E4 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                    className="text-[#DA46F8] hover:text-[#C93DF0] transition-colors font-medium bg-transparent border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Click to resend
                  </button>
                </p>
              </div>
          </form>
        );

      case 3:
        return (
          <form onSubmit={handleSubmitStep} className="space-y-6">
            <div className="space-y-4">
                              <div className="space-y-2">
                  <label htmlFor="newPassword" className="block text-[14px] font-medium text-[#374151] dark:text-white font-inter">
                    Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full p-[14px_16px] bg-[#F6F6F6] dark:bg-[#333] rounded-[6px] text-[14px] placeholder-[#9CA3AF] dark:placeholder-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#DA46F8] focus:border-transparent font-inter text-black dark:text-white border dark:border-gray-600"
                    required
                  />
                  {/* Password Strength Indicator */}
                  {formData.newPassword && (
                    <div className="mt-[16px]">
                      <div className="flex gap-[19px]">
                        {[1, 2, 3, 4, 5].map((bar) => (
                          <div 
                            key={bar}
                            className={`flex-1 h-[5.109px] rounded-full transition-all duration-300 ${
                              bar <= passwordStrength 
                                ? 'bg-[#D376FF]' 
                                : 'bg-[#F6F6F6] dark:bg-[#333]'
                            }`}
                          />
                        ))}
                      </div>
                      {/* <div className="mt-2">
                        <p className="text-[12px] text-[#6B7280] dark:text-gray-400 font-inter">
                          {passwordStrength === 0 && 'Very weak'}
                          {passwordStrength === 1 && 'Weak'}
                          {passwordStrength === 2 && 'Fair'}
                          {passwordStrength === 3 && 'Good'}
                          {passwordStrength === 4 && 'Strong'}
                          {passwordStrength === 5 && 'Very strong'}
                        </p>
                      </div> */}
                    </div>
                  )}
                </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-[14px] font-medium text-[#374151] dark:text-white font-inter">
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full p-[14px_16px] bg-[#F6F6F6] dark:bg-[#333] rounded-[6px] text-[14px] placeholder-[#9CA3AF] dark:placeholder-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#DA46F8] focus:border-transparent font-inter text-black dark:text-white border dark:border-gray-600"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || formData.newPassword !== formData.confirmPassword || passwordStrength < 1}
              className="w-full bg-gradient-to-r from-[#DA46F8] to-[#6940E4] hover:bg-[#C93DF0] text-white p-[14px_16px] rounded-[6px] text-[16px] font-medium font-inter transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Updating...' : 'Update password'}
            </button>
          </form>
        );

      case 4:
        return (
          <div className="text-center space-y-6">

            <Link 
              href="/login"
              className="w-full bg-gradient-to-r from-[#DA46F8] to-[#6940E4] hover:bg-[#C93DF0] text-white p-[14px_16px] rounded-[6px] text-[16px] font-medium font-inter transition-colors inline-block"
            >
              Log into account 
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex auth-dark-gradient">
      {/* Left Panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[480px] space-y-8">
            {/* Logo */}
            <div className="mb-[39px]">
              <Link href="/">
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
              </Link>
            </div>

            {/* Header */}
            <div className="">
              <h1 className="text-[40px] font-medium text-black dark:text-white font-inter leading-tight">
                {getStepTitle()}
              </h1>
              <p className="text-[16px] text-[#11100D] dark:text-white font-inter font-normal tracking-normal leading-[24px] mt-[12px]">
                {getStepDescription()}
              </p>
            </div>

            {/* Step Content */}
            {renderStepContent()}

            {/* Back to Login Link - Only show on first step */}
            {currentStep === 4 || currentStep === 1  || currentStep === 2 || currentStep === 3 && (
                <div className="text-center"
                style={{marginTop: '28px !important'}}>
                    <Link 
                    href="/login"
                    className="inline-flex items-center gap-2 text-[16px] text-[#6B7280] dark:text-gray-400 hover:text-[#DA46F8] transition-colors font-inter"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.78033 7.82904C8.07322 8.12194 8.07322 8.59681 7.78033 8.88971L5.31066 11.3594H21.5C21.9142 11.3594 22.25 11.6952 22.25 12.1094C22.25 12.5236 21.9142 12.8594 21.5 12.8594H5.31066L7.78033 15.329C8.07322 15.6219 8.07322 16.0968 7.78033 16.3897C7.48744 16.6826 7.01256 16.6826 6.71967 16.3897L2.96967 12.6397C2.67678 12.3468 2.67678 11.8719 2.96967 11.579L6.71967 7.82904C7.01256 7.53615 7.48744 7.53615 7.78033 7.82904Z" fill="#575555"/>
                    </svg>
                    Back to log in
                    </Link>
                </div>
            )}

            
          </div>
        </div>

        {/* Progress Bar - Segmented */}
        <div className="max-w-[480px] mx-auto mb-[74px] w-full">
          <div className="flex gap-[20px] w-full">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step}
                className={`flex-1 h-[4px] rounded-full transition-all duration-300 ${
                  step <= currentStep 
                    ? 'bg-[#DA46F8]' 
                    : 'bg-[#F6F6F6] dark:bg-[#333]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden lg:flex flex-1 relative p-[12px] pl-0">
        <Image src="/images/hero/login-card.png" alt="Poligono" width={1000} height={1000} className='w-full h-full object-cover rounded-[20px]' />
      </div>
    </div>
  );
}
