"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import Image from "next/image";

export default function CreateAgent() {
  const [activeItem, setActiveItem] = useState('Agents');
  const [currentStep, setCurrentStep] = useState(1);
  const [agentName, setAgentName] = useState('');
  const [description, setDescription] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const steps = [
    { id: 1, name: 'Basic Information', icon: '/images/icons/channel-step.svg' },
    { id: 2, name: 'Configuration', icon: '/images/icons/gear-step.svg' },
    { id: 3, name: 'Review & Create', icon: '/images/icons/rocket-step.svg' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen auth-dark-gradient flex">
      {/* Sidebar */}
      <Sidebar activeItem={activeItem} onItemSelect={setActiveItem} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#F5F7FA] dark:bg-[#11100D] px-[24px] py-[31px]">
        <div className="max-w-[682px] mx-auto w-full">
          {/* Header */}
          <div className="mb-[26px]">
            <h1 className="text-[24px] font-[300] text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6.125 7.4375C6.125 4.77963 8.27963 2.625 10.9375 2.625C13.5954 2.625 15.75 4.77963 15.75 7.4375C15.75 10.0954 13.5954 12.25 10.9375 12.25C8.27963 12.25 6.125 10.0954 6.125 7.4375Z" fill="#AD9EE0"/>
                <path d="M2.625 22.3125C2.625 17.7216 6.34663 14 10.9375 14C15.5284 14 19.25 17.7216 19.25 22.3125V22.3155C19.25 22.3619 19.2496 22.4086 19.2488 22.4548C19.2437 22.7563 19.0837 23.0341 18.8253 23.1897C16.5208 24.5771 13.821 25.375 10.9375 25.375C8.054 25.375 5.35418 24.5771 3.04974 23.1897C2.79132 23.0341 2.63127 22.7563 2.6262 22.4548C2.6254 22.4075 2.625 22.36 2.625 22.3125Z" fill="#AD9EE0"/>
                <path d="M21.875 8.75C21.875 8.26675 21.4832 7.875 21 7.875C20.5168 7.875 20.125 8.26675 20.125 8.75V11.375H17.5C17.0168 11.375 16.625 11.7668 16.625 12.25C16.625 12.7332 17.0168 13.125 17.5 13.125H20.125V15.75C20.125 16.2332 20.5168 16.625 21 16.625C21.4832 16.625 21.875 16.2332 21.875 15.75V13.125H24.5C24.9832 13.125 25.375 12.7332 25.375 12.25C25.375 11.7668 24.9832 11.375 24.5 11.375H21.875V8.75Z" fill="#421ABA"/>
                </svg>
  Create New Agent
            </h1>
            <p className="text-[16px] text-gray-600 dark:text-gray-400">
              Add the details for your new agent
            </p>
          </div>
          <div className="py-0">
              {/* Step Headers */}
              <div className="flex items-center justify-between mb-[24px] relative">
                {steps.map((step, index) => (
                    <>
                  <div key={step.id} className="flex items-center relative">
                    <div className="flex items-center">
                      <div
                        className={`w-[30px] h-[30px] rounded-[6px] flex items-center justify-center text-sm font-medium ${
                          step.id === currentStep
                            ? 'bg-[#6B46C1] text-white'
                            : step.id < currentStep
                            ? 'bg-[#6B46C1] text-white'
                            : 'bg-gray-200 dark:bg-[#3A3A3A] text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {step.id < currentStep ? '✓' : <Image src={step.icon} alt={step.name} width={12} height={12} />}
                      </div>
                      <span
                        className={`ml-3 text-sm font-medium ${
                          step.id === currentStep
                            ? 'text-[#6B46C1]'
                            : step.id < currentStep
                            ? 'text-[#6B46C1]'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {step.name}
                      </span>
                    </div>
                    
                   
               
                  </div>
                  {index < steps.length - 1 && (
                    <div className="relative w-[50px] h-[1px] z-0 bg-gray-200 dark:bg-[#3A3A3A]"></div>
                  )}
                  </>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full h-2 bg-gray-200 dark:bg-[#3A3A3A] rounded-full">
                  <div
                    className="h-2 rounded-full transition-all duration-300 ease-in-out"
                    style={{
                      width: `${(currentStep / steps.length) * 100}%`,
                      background: 'linear-gradient(90deg, #6940E4 0.07%, #FF5AFE 124.81%)'
                    }}
                  />
                </div>
              </div>
            </div>
                                {/* Main Card Container */}
          <div className="bg-white dark:bg-[#1A1A1A] rounded-[12px] overflow-hidden mt-[26px]">
            {/* Progress Header - Inside Card */}
   

            {/* Card Content */}
            <div className="p-[32px]">

            {/* Step Content */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-[20px] font-normal text-gray-900 dark:text-white mb-2">
                    Let's create your AI Agent
                  </h2>
                  <p className="text-[16px] text-[#525866] dark:text-gray-400">
                    Start by providing basic information about your agent
                  </p>
                </div>

                {/* Agent Name */}
                <div>
                  <label className="block text-[16px] font-normal text-gray-700 dark:text-gray-300 mb-2">
                    Agent name
                  </label>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="eg. Customer Support Agent"
                    className="w-full p-[14px_16px]  dark:border-gray-600 rounded-[6px] bg-[#F6F6F6] dark:bg-[#2A2A2A] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[16px] font-normal text-gray-700 dark:text-gray-300 mb-2"> 
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of what this agent does"
                    rows={4}
                    className="w-full p-[14px_16px]  dark:border-gray-600 rounded-[6px] bg-[#F6F6F6] dark:bg-[#2A2A2A] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent resize-none"
                  />
                </div>

                {/* Agent Avatar */}
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Agent Avatar
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-[#F6F6F6] rounded-full flex items-center justify-center">
                      {avatarFile ? (
                        <img
                          src={URL.createObjectURL(avatarFile)}
                          alt="Avatar"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                                <g clip-path="url(#clip0_20447_8631)">
                                    <path d="M29.426 12.7447H27.9224V7.98336C27.8866 7.41057 27.4212 6.94518 26.8484 6.90938H16.574V0.322266H14.426V6.90938H4.15155C3.57876 6.94518 3.11336 7.41057 3.07757 7.98336V12.7447H1.57399C0.965394 12.7447 0.5 13.2101 0.5 13.8187V20.907C0.5 21.5156 0.965394 21.981 1.57399 21.981H3.07757V28.6039C3.11336 29.1767 3.57876 29.6421 4.15155 29.6779H26.8484C27.4212 29.6421 27.8866 29.1767 27.9224 28.6039V21.981H29.426C30.0346 21.981 30.5 21.5156 30.5 20.907V13.8187C30.5 13.2101 30.0346 12.7447 29.426 12.7447ZM7.51671 15.2865C7.51671 13.5681 8.91289 12.1719 10.6313 12.1719C12.3496 12.1719 13.7458 13.5681 13.7458 15.2865C13.7458 17.0048 12.3496 18.401 10.6313 18.401C8.91289 18.401 7.51671 17.0048 7.51671 15.2865ZM20.2255 24.6301H10.7745V22.4822H20.2255V24.6301ZM23.4833 15.2865C23.4833 17.0048 22.0871 18.401 20.3687 18.401C18.6146 18.401 17.2184 17.0048 17.1826 15.2865C17.1826 13.5323 18.5788 12.1361 20.2971 12.1003C22.0155 12.0645 23.4475 13.4965 23.4833 15.2149C23.4833 15.2507 23.4833 15.2507 23.4833 15.2865Z" fill="#8B00FF"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_20447_8631">
                                    <rect width="30" height="30" fill="white" transform="translate(0.5)"/>
                                    </clipPath>
                                </defs>
                                </svg>
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-[#0F172A] dark:border-gray-600 rounded-full bg-white dark:bg-[#2A2A2A] text-[14px] font-medium text-[#0F172A] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#333] cursor-pointer"
                      >
                       <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.14645 2.14645C8.34171 1.95118 8.65829 1.95118 8.85355 2.14645L11.8536 5.14645C12.0488 5.34171 12.0488 5.65829 11.8536 5.85355C11.6583 6.04882 11.3417 6.04882 11.1464 5.85355L9 3.70711L9 11.5C9 11.7761 8.77614 12 8.5 12C8.22386 12 8 11.7761 8 11.5L8 3.70711L5.85355 5.85355C5.65829 6.04882 5.34171 6.04882 5.14645 5.85355C4.95118 5.65829 4.95118 5.34171 5.14645 5.14645L8.14645 2.14645ZM2.5 11C2.77614 11 3 11.2239 3 11.5V13C3 13.5523 3.44772 14 4 14H13C13.5523 14 14 13.5523 14 13V11.5C14 11.2239 14.2239 11 14.5 11C14.7761 11 15 11.2239 15 11.5V13C15 14.1046 14.1046 15 13 15H4C2.89543 15 2 14.1046 2 13V11.5C2 11.2239 2.22386 11 2.5 11Z" fill="#0F172A"/>
</svg>  Upload Image
                      </label>
                      <p className="text-[14px] text-[#525866] dark:text-gray-400 mt-1">
                        Recommended: 150x150px, JPG or PNG
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-[20px] font-normal text-gray-900 dark:text-white mb-2">
                    Let's create your AI Agent
                  </h2>
                  <p className="text-[16px] text-[#525866] dark:text-gray-400">
                    Start by providing basic information about your agent
                  </p>
                </div>

                {/* System Prompt */}
                <div>
                  <label className="block text-[16px] font-normal text-gray-700 dark:text-gray-300 mb-2">
                    System Prompt
                  </label>
                  <textarea
                    placeholder="eg. You are a helpful assistant"
                    rows={6}
                    className="w-full p-[14px_16px] dark:border-gray-600 rounded-[6px] bg-[#F6F6F6] dark:bg-[#2A2A2A] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent resize-none"
                  />
                  <p className="text-[14px] text-[#525866] dark:text-gray-400 mt-2">
                    This defines the core behavior and personality of your agent
                  </p>
                </div>

                {/* Rag Files */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[16px] font-normal text-gray-700 dark:text-gray-300">
                      Rag Files
                    </label>
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#0F172A] dark:border-gray-600 rounded-full bg-white dark:bg-[#2A2A2A] text-[14px] font-medium text-[#0F172A] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#333] cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.14645 2.14645C8.34171 1.95118 8.65829 1.95118 8.85355 2.14645L11.8536 5.14645C12.0488 5.34171 12.0488 5.65829 11.8536 5.85355C11.6583 6.04882 11.3417 6.04882 11.1464 5.85355L9 3.70711L9 11.5C9 11.7761 8.77614 12 8.5 12C8.22386 12 8 11.7761 8 11.5L8 3.70711L5.85355 5.85355C5.65829 6.04882 5.34171 6.04882 5.14645 5.85355C4.95118 5.65829 4.95118 5.34171 5.14645 5.14645L8.14645 2.14645ZM2.5 11C2.77614 11 3 11.2239 3 11.5V13C3 13.5523 3.44772 14 4 14H13C13.5523 14 14 13.5523 14 13V11.5C14 11.2239 14.2239 11 14.5 11C14.7761 11 15 11.2239 15 11.5V13C15 14.1046 14.1046 15 13 15H4C2.89543 15 2 14.1046 2 13V11.5C2 11.2239 2.22386 11 2.5 11Z" fill="#0F172A"/>
                      </svg>
                      Upload files
                    </button>
                  </div>
                  
                  {/* File Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* File 1 */}
                    <div className="border border-gray-200 dark:border-gray-600 rounded-[8px] p-4 bg-white dark:bg-[#2A2A2A]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M9 1H3C2.44772 1 2 1.44772 2 2V14C2 14.5523 2.44772 15 3 15H13C13.5523 15 14 14.5523 14 14V6L9 1Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 1V6H14" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-[14px] font-medium text-gray-900 dark:text-white">Product Manual.pdf</span>
                        </div>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-[#333] rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 4L12 12M12 4L4 12" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-[12px] font-medium rounded-full">
                          processed
                        </span>
                        <span className="text-[12px] text-gray-500">PDF • 2.1 MB</span>
                      </div>
                    </div>

                    {/* File 2 */}
                    <div className="border border-gray-200 dark:border-gray-600 rounded-[8px] p-4 bg-white dark:bg-[#2A2A2A]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M9 1H3C2.44772 1 2 1.44772 2 2V14C2 14.5523 2.44772 15 3 15H13C13.5523 15 14 14.5523 14 14V6L9 1Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 1V6H14" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-[14px] font-medium text-gray-900 dark:text-white">Product Manual.pdf</span>
                        </div>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-[#333] rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 4L12 12M12 4L4 12" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-[12px] font-medium rounded-full">
                          processed
                        </span>
                        <span className="text-[12px] text-gray-500">PDF • 2.1 MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-[20px] font-normal text-gray-900 dark:text-white mb-2">
                    Review & Create
                  </h2>
                  <p className="text-[16px] text-[#525866] dark:text-gray-400">
                    Review your agent configuration before creating
                  </p>
                </div>

                {/* Agent Summary Card */}
                <div className="border border-gray-200 dark:border-gray-600 rounded-[8px] bg-white dark:bg-[#2A2A2A] p-[24px]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-[#F6F6F6] rounded-full flex items-center justify-center">
                      {avatarFile ? (
                        <img
                          src={URL.createObjectURL(avatarFile)}
                          alt="Avatar"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-2xl">
                          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                            <g clipPath="url(#clip0_20447_8631)">
                              <path d="M29.426 12.7447H27.9224V7.98336C27.8866 7.41057 27.4212 6.94518 26.8484 6.90938H16.574V0.322266H14.426V6.90938H4.15155C3.57876 6.94518 3.11336 7.41057 3.07757 7.98336V12.7447H1.57399C0.965394 12.7447 0.5 13.2101 0.5 13.8187V20.907C0.5 21.5156 0.965394 21.981 1.57399 21.981H3.07757V28.6039C3.11336 29.1767 3.57876 29.6421 4.15155 29.6779H26.8484C27.4212 29.6421 27.8866 29.1767 27.9224 28.6039V21.981H29.426C30.0346 21.981 30.5 21.5156 30.5 20.907V13.8187C30.5 13.2101 30.0346 12.7447 29.426 12.7447ZM7.51671 15.2865C7.51671 13.5681 8.91289 12.1719 10.6313 12.1719C12.3496 12.1719 13.7458 13.5681 13.7458 15.2865C13.7458 17.0048 12.3496 18.401 10.6313 18.401C8.91289 18.401 7.51671 17.0048 7.51671 15.2865ZM20.2255 24.6301H10.7745V22.4822H20.2255V24.6301ZM23.4833 15.2865C23.4833 17.0048 22.0871 18.401 20.3687 18.401C18.6146 18.401 17.2184 17.0048 17.1826 15.2865C17.1826 13.5323 18.5788 12.1361 20.2971 12.1003C22.0155 12.0645 23.4475 13.4965 23.4833 15.2149C23.4833 15.2507 23.4833 15.2507 23.4833 15.2865Z" fill="#8B00FF"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_20447_8631">
                                <rect width="30" height="30" fill="white" transform="translate(0.5)"/>
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] font-medium text-gray-900 dark:text-white">
                        {agentName || 'Customer Support Agent'}
                      </h3>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-[#3A3A3A] text-gray-700 dark:text-gray-300 text-[12px] font-medium rounded-full">
                        Draft
                      </span>
                    </div>
                  </div>
                         {/* System Prompt Section */}
                <div>
                  <h4 className="text-[16px] font-medium text-gray-900 dark:text-white mb-3">
                    System Prompt
                  </h4>
                  <div className="border border-gray-200 dark:border-gray-600 rounded-[8px] p-4 bg-[#F6F6F6] dark:bg-[#2A2A2A]">
                    <p className="text-[14px] text-gray-700 dark:text-gray-300 leading-relaxed">
                      {description || "You are a highly capable and reliable AI assistant designed to help users complete tasks efficiently. Always interpret their intent accurately, ask clarifying questions when needed, and respond in a clear, structured, and friendly tone."}
                    </p>
                  </div>
                </div>

                {/* Rag Files Section */}
                <div>
                  <h4 className="text-[16px] font-medium text-gray-900 dark:text-white mb-3">
                    Rag Files
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* File 1 */}
                    <div className="border border-gray-200 dark:border-gray-600 rounded-[8px] p-4 bg-white dark:bg-[#2A2A2A]">
                      <div className="flex items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M9 1H3C2.44772 1 2 1.44772 2 2V14C2 14.5523 2.44772 15 3 15H13C13.5523 15 14 14.5523 14 14V6L9 1Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 1V6H14" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-[14px] font-medium text-gray-900 dark:text-white">Product Manual.pdf</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full ml-auto"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-[12px] font-medium rounded-full">
                          processed
                        </span>
                        <span className="text-[12px] text-gray-500">PDF • 2.1 MB</span>
                      </div>
                    </div>

                    {/* File 2 */}
                    <div className="border border-gray-200 dark:border-gray-600 rounded-[8px] p-4 bg-white dark:bg-[#2A2A2A]">
                      <div className="flex items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M9 1H3C2.44772 1 2 1.44772 2 2V14C2 14.5523 2.44772 15 3 15H13C13.5523 15 14 14.5523 14 14V6L9 1Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 1V6H14" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-[14px] font-medium text-gray-900 dark:text-white">Product Manual.pdf</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full ml-auto"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-[12px] font-medium rounded-full">
                          processed
                        </span>
                        <span className="text-[12px] text-gray-500">PDF • 2.1 MB</span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>

         
              </div>
            )}


            </div>

          </div>
                                    {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-[24px] pt-6">
                <button
                  onClick={handleBackStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-[10px] p-[8px_32px] text-[14px] font-medium rounded-[6px] border border-[#D9D9D9] dark:border-gray-600 ${
                    currentStep === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2A2A2A]'
                  }`}
                >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7 13L2 8M2 8L7 3M2 8L14 8" stroke="#525866" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> Back
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={false}
                  style={{
                    background: 'linear-gradient(90deg, #6940E4 0.07%, #FF5AFE 124.81%), #E8E8E8;'
                  }}
                  className="flex items-center  p-[8px_32px] gap-[10px] text-white text-[14px] font-medium rounded-[6px] hover:bg-[#553C9A] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === steps.length ? 'Create Agent' : 'Next step'}
                  {currentStep === steps.length ?
          
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2.9375 3.78125C2.9375 2.07262 4.32262 0.6875 6.03125 0.6875C7.73988 0.6875 9.125 2.07262 9.125 3.78125C9.125 5.48988 7.73988 6.875 6.03125 6.875C4.32262 6.875 2.9375 5.48988 2.9375 3.78125Z" fill="white"/>
                      <path d="M0.6875 13.3438C0.6875 10.3925 3.07998 8 6.03125 8C8.98252 8 11.375 10.3925 11.375 13.3438V13.3457C11.375 13.3755 11.3747 13.4055 11.3742 13.4352C11.371 13.6291 11.2681 13.8076 11.102 13.9076C9.62053 14.7996 7.88493 15.3125 6.03125 15.3125C4.17757 15.3125 2.44197 14.7996 0.960545 13.9076C0.794422 13.8076 0.69153 13.6291 0.68827 13.4352C0.687759 13.4048 0.6875 13.3743 0.6875 13.3438Z" fill="white"/>
                      <path d="M13.0625 4.625C13.0625 4.31434 12.8107 4.0625 12.5 4.0625C12.1893 4.0625 11.9375 4.31434 11.9375 4.625V6.3125H10.25C9.93934 6.3125 9.6875 6.56434 9.6875 6.875C9.6875 7.18566 9.93934 7.4375 10.25 7.4375H11.9375V9.125C11.9375 9.43566 12.1893 9.6875 12.5 9.6875C12.8107 9.6875 13.0625 9.43566 13.0625 9.125V7.4375H14.75C15.0607 7.4375 15.3125 7.18566 15.3125 6.875C15.3125 6.56434 15.0607 6.3125 14.75 6.3125H13.0625V4.625Z" fill="white"/>
                      </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M9 3L14 8M14 8L9 13M14 8H2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                    }
                </button>
              </div>
        </div>
      </div>
    </div>
  );
}
