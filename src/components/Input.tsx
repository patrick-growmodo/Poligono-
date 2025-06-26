'use client';

import React, { forwardRef } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  required?: boolean;
  variant?: 'default' | 'dark' | 'light';
  inputSize?: 'sm' | 'md' | 'lg';
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
  variant?: 'default' | 'dark' | 'light';
  inputSize?: 'sm' | 'md' | 'lg';
  as?: 'textarea';
}

type CombinedProps = InputProps | TextareaProps;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, CombinedProps>(
  ({ 
    label, 
    error, 
    required = false, 
    variant = 'default',
    inputSize = 'md',
    className = '',
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const getVariantClasses = () => {
      switch (variant) {
        case 'dark':
          return {
            input: 'bg-[#2A2A2A] border-[1px] border-[#404040] text-white placeholder:text-[#666666] focus:border-[#6940E4]',
            label: 'text-white',
            error: 'text-red-400'
          };
        case 'light':
          return {
            input: 'bg-white border-[#E4E4E4] text-black placeholder:text-[#999999] focus:border-[#6940E4]',
            label: 'text-black',
            error: 'text-red-500'
          };
        default:
          return {
            input: 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500',
            label: 'text-gray-700',
            error: 'text-red-500'
          };
      }
    };

    const getSizeClasses = () => {
        switch (inputSize) {
        case 'sm':
          return 'px-3 py-2 text-sm';
        case 'lg':
          return 'px-4 py-3 text-base';
        default:
          return 'px-4 py-3 text-sm';
      }
    };

    const variants = getVariantClasses();
    const sizeClasses = getSizeClasses();

    const baseInputClasses = `
      w-full 
      border 
      rounded-[4px] 
      font-inter 
      transition-colors 
      focus:outline-none 
      focus:ring-0
      ${sizeClasses}
      ${variants.input}
      ${error ? 'border-red-500' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    const isTextarea = 'as' in props && props.as === 'textarea';

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId} 
            className={`block text-[14px] font-medium font-inter mb-[8px] ${variants.label}`}
          >
            {label} {required && <span className="text-[#DA46F8]">*</span>}
          </label>
        )}
        
        {isTextarea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={inputId}
            className={`${baseInputClasses}`}
            {...(props as TextareaProps)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={inputId}
            className={baseInputClasses}
            {...(props as InputProps)}
          />
        )}
        
        {error && (
          <p className={`mt-[4px] text-[12px] font-inter ${variants.error}`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
export type { InputProps, TextareaProps };  