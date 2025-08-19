'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import Input from './Input';

interface FormData {
  name: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
  agreeToPrivacy: boolean;
}

interface ContactFormProps {
  onSubmit?: (formData: FormData) => void;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
    agreeToPrivacy: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className={className}>
      <h2 className="text-[48px] font-medium text-white font-inter leading-[57.6px] mb-[26px]">
        Contact
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-[24px]">
        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your name"
            label="Name"
            inputSize="md"
            variant="dark"
            required
          />
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Your last name"
            label="Last Name"
            inputSize="md"
            variant="dark"
            required
          />
        </div>

        {/* Email */}
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="you@company.com"
          label="Email"
          inputSize="md"
          variant="dark"
          required
        />

        {/* Company */}
        <Input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="Company"
          label="Company"
          inputSize="md"
          variant="dark"
          required
        />

        {/* Message */}
        <Input
          as="textarea"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Message"
          label="Message"
          rows={4}
          inputSize="md"
          variant="dark"
          required
        />

        {/* Privacy Checkbox */}
        <div className="flex items-start gap-[12px]">
          <div className="relative">
            <input
              type="checkbox"
              id="privacy"
              name="agreeToPrivacy"
              checked={formData.agreeToPrivacy}
              onChange={handleInputChange}
              className="sr-only"
              required
            />
            <label 
              htmlFor="privacy" 
              className="flex items-center cursor-pointer"
            >
              <div className={`
                w-[16px] h-[16px] 
                border-2 
                rounded-[4px] 
                flex items-center justify-center 
                transition-all duration-200
                ${formData.agreeToPrivacy 
                  ? 'bg-[#6940E4] border-[#6940E4]' 
                  : 'bg-transparent border-[#404040] hover:border-[#6940E4]'
                }
              `}>
                {formData.agreeToPrivacy && (
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
              <span className="ml-[12px] text-[14px] text-[#CCCCCC] font-inter leading-[20px]">
                You agree to our friendly privacy policy.
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-[16px]">
          <Button
            variant="secondary"
            size="lg"
            type="submit"
            className="w-full bg-white text-[#222B45] text-[16px] hover:bg-gray-100 lg:w-fit lg:w-fit"
          >
            Get Started
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
export type { FormData, ContactFormProps };  