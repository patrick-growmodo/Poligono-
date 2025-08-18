"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface ToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTool: (toolData: any) => void;
}

interface ToolType {
  id: string;
  name: string;
  description: string;
  icon: string | JSX.Element;
  color: string;
}

const toolTypes: ToolType[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Access inbox and send multiple emails.',
    icon: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_20476_14758)">
    <path d="M1.63636 21.0038H5.45456V11.7311L2.95434 7.36523L0 7.64016V19.3674C0 20.2715 0.732281 21.0038 1.63636 21.0038Z" fill="#0085F7"/>
    <path d="M18.5469 21.0038H22.3651C23.2692 21.0038 24.0014 20.2715 24.0014 19.3674V7.64016L21.0514 7.36523L18.5469 11.7311V21.0038H18.5469Z" fill="#00A94B"/>
    <path d="M18.5456 4.63881L16.3027 8.91863L18.5456 11.7297L24.0001 7.63881V5.45701C24.0001 3.43473 21.6915 2.27973 20.0728 3.49337L18.5456 4.63881Z" fill="#FFBC00"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.45358 11.7296L3.31641 7.21506L5.45358 4.63867L11.999 9.54775L18.5445 4.63867V11.7296L11.999 16.6387L5.45358 11.7296Z" fill="#FF4131"/>
    <path d="M0 5.45701V7.63881L5.45456 11.7297V4.63881L3.92728 3.49337C2.30864 2.27973 0 3.43473 0 5.45701Z" fill="#E51C19"/>
  </g>
  <defs>
    <clipPath id="clip0_20476_14758">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
    ),
    color: '#EA4335',
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Create and manage events easily.',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g clip-path="url(#clip0_20476_14778)">
            <path d="M8.27622 15.4829C7.80409 15.164 7.47728 14.6982 7.29883 14.0824L8.39463 13.6308C8.49409 14.0097 8.66777 14.3034 8.91569 14.5118C9.16202 14.7202 9.46202 14.8229 9.81255 14.8229C10.171 14.8229 10.4789 14.714 10.7362 14.496C10.9936 14.2782 11.1231 14.0002 11.1231 13.6639C11.1231 13.3197 10.9873 13.0387 10.7157 12.8208C10.4441 12.6029 10.1031 12.4939 9.69569 12.4939H9.06255V11.4092H9.63095C9.98148 11.4092 10.2768 11.3145 10.5168 11.125C10.7568 10.9355 10.8767 10.6766 10.8767 10.3466C10.8767 10.0529 10.7694 9.81919 10.5546 9.64397C10.3399 9.4687 10.0683 9.3803 9.7383 9.3803C9.41617 9.3803 9.16042 9.46556 8.97091 9.63769C8.78144 9.80981 8.64405 10.0214 8.55723 10.2708L7.4725 9.81923C7.61617 9.41184 7.87989 9.05184 8.2667 8.74083C8.65356 8.42977 9.14777 8.27344 9.74777 8.27344C10.1914 8.27344 10.5909 8.3587 10.9446 8.53083C11.2983 8.70295 11.5762 8.94136 11.7768 9.2445C11.9773 9.54923 12.0768 9.8903 12.0768 10.2692C12.0768 10.6561 11.9836 10.9829 11.7973 11.2514C11.611 11.5198 11.382 11.725 11.1104 11.8687V11.9335C11.4688 12.0835 11.761 12.3124 11.9915 12.6203C12.2204 12.9282 12.3357 13.2961 12.3357 13.7256C12.3357 14.1551 12.2268 14.5387 12.0088 14.8751C11.791 15.2114 11.4894 15.4767 11.1072 15.6693C10.7236 15.8619 10.2925 15.9598 9.81409 15.9598C9.25989 15.9614 8.74834 15.8019 8.27622 15.4829Z" fill="#0085F7"/>
            <path d="M15.0059 10.0448L13.8027 10.9148L13.2012 10.0021L15.3596 8.44531H16.187V15.789H15.0059V10.0448Z" fill="#0085F7"/>
            <path d="M18.3167 18.3164H5.68511L3.87695 20.9806L5.68511 24.0006H18.3167L19.8105 20.7875L18.3167 18.3164Z" fill="#00A94B"/>
            <path d="M18.3158 0H1.89473C0.847875 0 0 0.847875 0 1.89473V18.3158L2.84212 20.3363L5.68425 18.3158V5.6842H18.3158L20.2603 2.84208L18.3158 0Z" fill="#0085F7"/>
            <path d="M0 18.3164V22.1059C0 23.1527 0.847875 24.0006 1.89473 24.0006H5.6842V18.3164H0Z" fill="#00802E"/>
            <path d="M24.0006 5.68425L21.1585 3.85547L18.3164 5.68425V18.3158L20.8725 19.65L24.0006 18.3158V5.68425Z" fill="#FFBC00"/>
            <path d="M24.0006 5.6842V1.89473C24.0006 0.847875 23.1527 0 22.1059 0H18.3164V5.6842H24.0006Z" fill="#0067D5"/>
            <path d="M18.3164 24.0006L24.0006 18.3164H18.3164V24.0006Z" fill="#FF4131"/>
        </g>
        <defs>
            <clipPath id="clip0_20476_14778">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
        </defs>
        </svg>
    ),
    color: '#4285F4',
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Connect to Notion databases.',
    icon: (
<svg xmlns="http://www.w3.org/2000/svg" height="24     " viewBox="13.38 3.2 485.44 505.7" width="24"><path d="m186.84 13.95c-79.06 5.85-146.27 11.23-149.43 11.86-8.86 1.58-16.92 7.59-20.71 15.5l-3.32 6.96.32 165.88.47 165.88 5.06 10.28c2.85 5.69 22.14 32.26 43.17 59.61 41.59 53.92 44.59 56.93 60.4 58.51 4.59.47 39.06-1.11 76.38-3.32 37.48-2.37 97.56-6.01 133.62-8.06 154.01-9.35 146.1-8.56 154.95-16.15 11.07-9.17 10.28 5.85 10.75-195.76.32-170.94.16-182.16-2.37-187.38-3-5.85-8.38-9.96-78.59-59.3-46.96-32.89-50.28-34.63-71.32-34.95-8.69-.31-80.48 4.43-159.38 10.44zm177.73 21.66c6.64 3 55.19 36.84 62.3 43.33 1.9 1.9 2.53 3.48 1.58 4.43-2.21 1.9-302.66 19.77-311.35 18.5-3.95-.63-9.8-3-13.12-5.22-13.76-9.33-47.91-37.32-47.91-39.37 0-5.38-1.11-5.38 132.83-15.02 25.62-1.74 67.68-4.9 93.3-6.96 55.49-4.43 72.1-4.27 82.37.31zm95.51 86.5c2.21 2.21 4.11 6.48 4.74 10.59.47 3.8.79 74.64.47 157.18-.47 141.68-.63 150.54-3.32 154.65-1.58 2.53-4.74 5.22-7.12 6.01-6.63 2.69-321.46 20.56-327.94 18.66-3-.79-7.12-3.32-9.33-5.53l-3.8-4.11-.47-152.75c-.32-107.21 0-154.65 1.27-158.92.95-3.16 3.32-6.96 5.38-8.22 2.85-1.9 21.51-3.48 85.71-7.27 45.07-2.53 114.8-6.8 154.81-9.17 95.17-5.86 94.86-5.86 99.6-1.12z"/><path d="m375.48 174.45c-17.08 1.11-32.26 2.69-34 3.64-5.22 2.69-8.38 7.12-9.01 12.18-.47 5.22 1.11 5.85 18.18 7.91l7.43.95v67.52c0 40.16-.63 66.73-1.42 65.94-.79-.95-23.24-35.1-49.97-75.9-26.72-40.95-48.86-74.64-49.18-74.95-.32-.32-17.71.63-38.58 2.06-25.62 1.74-39.69 3.32-42.54 4.9-4.59 2.37-9.65 10.75-9.65 16.29 0 3.32 6.01 5.06 18.66 5.06h6.64v194.18l-10.75 3.32c-8.38 2.53-11.23 4.11-12.65 7.27-2.53 5.38-2.37 10.28.16 10.28.95 0 18.82-1.11 39.37-2.37 40.64-2.37 45.22-3.48 49.49-11.86 1.27-2.53 2.37-5.22 2.37-6.01 0-.63-5.53-2.53-12.18-4.11-6.8-1.58-13.6-3.16-15.02-3.48-2.69-.79-2.85-5.69-2.85-73.69v-72.9l48.07 75.43c50.44 79.06 56.77 88.08 64.52 92.03 9.65 5.06 34.16 1.58 46.49-6.48l3.8-2.37.32-107.84.47-108 8.38-1.58c9.96-1.9 14.55-6.48 14.55-14.39 0-5.06-.32-5.38-5.06-5.22-2.83.13-19.12 1.08-36.04 2.19z"/></svg>
    ),
    color: '#000000',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send full alerts and notifications.',
    icon: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_20476_14815)">
    <path d="M8.84327 12.6504C7.45127 12.6504 6.32227 13.7794 6.32227 15.1714V21.4774C6.32227 22.8694 7.45127 23.9984 8.84327 23.9984C10.2353 23.9984 11.3643 22.8694 11.3643 21.4774V15.1714C11.3633 13.7794 10.2343 12.6504 8.84327 12.6504Z" fill="#E91E63"/>
    <path d="M0.0195312 15.1714C0.0195312 16.5644 1.14953 17.6944 2.54253 17.6944C3.93553 17.6944 5.06553 16.5644 5.06553 15.1714V12.6484H2.54453C2.54353 12.6484 2.54353 12.6484 2.54253 12.6484C1.14953 12.6484 0.0195312 13.7784 0.0195312 15.1714Z" fill="#E91E63"/>
    <path d="M8.84631 -0.00195312C8.84531 -0.00195312 8.84431 -0.00195312 8.84331 -0.00195312C7.45031 -0.00195312 6.32031 1.12805 6.32031 2.52105C6.32031 3.91405 7.45031 5.04405 8.84331 5.04405H11.3643V2.52105C11.3643 2.52005 11.3643 2.51805 11.3643 2.51605C11.3633 1.12505 10.2363 -0.00195312 8.84631 -0.00195312Z" fill="#00BCD4"/>
    <path d="M2.52495 11.3702H8.84295C10.236 11.3702 11.366 10.2402 11.366 8.84722C11.366 7.45422 10.236 6.32422 8.84295 6.32422H2.52495C1.13195 6.32422 0.00195312 7.45422 0.00195312 8.84722C0.00195312 10.2402 1.13195 11.3702 2.52495 11.3702Z" fill="#00BCD4"/>
    <path d="M21.4575 6.32227C20.0665 6.32227 18.9395 7.44927 18.9395 8.84027V8.84527V11.3683H21.4605C22.8535 11.3683 23.9835 10.2383 23.9835 8.84527C23.9835 7.45227 22.8535 6.32227 21.4605 6.32227C21.4595 6.32227 21.4585 6.32227 21.4575 6.32227Z" fill="#4CAF50"/>
    <path d="M12.6406 2.52295V8.84795C12.6406 10.24 13.7696 11.369 15.1616 11.369C16.5536 11.369 17.6826 10.24 17.6826 8.84795V2.52295C17.6826 1.13095 16.5536 0.00195312 15.1616 0.00195312C13.7696 0.00195312 12.6406 1.13095 12.6406 2.52295Z" fill="#4CAF50"/>
    <path d="M17.6826 21.4761C17.6826 20.0841 16.5536 18.9551 15.1616 18.9551H12.6406V21.4781C12.6416 22.8691 13.7696 23.9971 15.1616 23.9971C16.5536 23.9971 17.6826 22.8681 17.6826 21.4761Z" fill="#FF9800"/>
    <path d="M21.4797 12.6484H15.1617C13.7687 12.6484 12.6387 13.7784 12.6387 15.1714C12.6387 16.5644 13.7687 17.6944 15.1617 17.6944H21.4797C22.8727 17.6944 24.0027 16.5644 24.0027 15.1714C24.0027 13.7784 22.8727 12.6484 21.4797 12.6484Z" fill="#FF9800"/>
  </g>
  <defs>
    <clipPath id="clip0_20476_14815">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
    ),
    color: '#4A154B',
  },
  {
    id: 'airtable',
    name: 'Airtable',
    description: 'Sync and update records.',
    icon: (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255.879 214.057" style={{ height: '24px', width: '24px' }}>
  <path fill="#ffbf00" d="M114.258 2.701 18.86 42.176c-5.305 2.195-5.25 9.73.088 11.847l95.798 37.989a35.544 35.544 0 0 0 26.207 0l95.799-37.99c5.337-2.115 5.393-9.65.087-11.846L141.442 2.7a35.549 35.549 0 0 0-27.184 0"/>
  <path fill="#26b5f8" d="M136.348 112.757v94.902c0 4.514 4.552 7.605 8.748 5.942l106.748-41.435a6.39 6.39 0 0 0 4.035-5.941V71.322c0-4.514-4.552-7.604-8.748-5.941l-106.747 41.434a6.392 6.392 0 0 0-4.036 5.942"/>
  <path fill="#ed3049" d="m111.422 117.654-31.68 15.296-3.217 1.555L9.65 166.548C5.41 168.593 0 165.504 0 160.795V71.72c0-1.704.874-3.175 2.045-4.283a7.266 7.266 0 0 1 1.619-1.213c1.598-.959 3.877-1.215 5.815-.448l101.41 40.18c5.156 2.045 5.56 9.268.533 11.697"/>
  <path fill-opacity=".25" d="m111.422 117.654-31.68 15.296L2.045 67.438a7.266 7.266 0 0 1 1.619-1.213c1.598-.959 3.877-1.215 5.815-.448l101.41 40.18c5.156 2.045 5.56 9.268.533 11.697"/>
</svg>
    ),
    color: '#FF6B35',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Automate CRM and outreach.',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
        <path d="M23.8103 10.9285V7.3226C24.7515 6.87796 25.411 5.92577 25.411 4.82068V4.73736C25.411 3.21238 24.1632 1.96462 22.6382 1.96462H22.555C21.0299 1.96462 19.7821 3.21238 19.7821 4.73736V4.82068C19.7821 5.92577 20.4417 6.87809 21.3829 7.32267V10.9286C19.9815 11.1451 18.7011 11.723 17.6446 12.5736L7.74415 4.872C7.80927 4.62119 7.85502 4.36279 7.85529 4.09162C7.85752 2.36429 6.45909 0.962235 4.73169 0.960002C3.00429 0.957842 1.60223 2.35634 1.6 4.08367C1.59791 5.811 2.99634 7.21306 4.72374 7.21522C5.28671 7.21592 5.80771 7.05604 6.26442 6.79631L16.0035 14.3726C15.1752 15.6228 14.6901 17.1203 14.6901 18.7324C14.6901 20.4203 15.2233 21.9813 16.1244 23.2655L13.1626 26.2273C12.9284 26.1571 12.6854 26.1079 12.4282 26.1079C11.0089 26.1079 9.85811 27.2586 9.85811 28.678C9.85811 30.0974 11.0089 31.2481 12.4282 31.2481C13.8477 31.2481 14.9983 30.0974 14.9983 28.678C14.9983 28.421 14.9493 28.1779 14.879 27.9437L17.8087 25.014C19.1385 26.0293 20.7945 26.639 22.5968 26.639C26.9634 26.639 30.5032 23.0991 30.5032 18.7324C30.5032 14.7795 27.5993 11.5137 23.8103 10.9285ZM22.5968 22.786C20.3581 22.786 18.5429 20.9712 18.5429 18.7324C18.5429 16.4937 20.3581 14.6788 22.5968 14.6788C24.8353 14.6788 26.6504 16.4937 26.6504 18.7324C26.6504 20.9712 24.8353 22.786 22.5968 22.786Z" fill="#FF5C35"/>
        </svg>
    ),
    color: '#FF7A59',
  }
];

export default function ToolsModal({ isOpen, onClose, onAddTool }: ToolsModalProps) {
  const [selectedTool, setSelectedTool] = useState<string>('');
  const [toolName, setToolName] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Auto-select first tool when modal opens
  React.useEffect(() => {
    if (isOpen && toolTypes.length > 0) {
      setSelectedTool(toolTypes[0].id);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter tools based on search query
  const filteredTools = toolTypes.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    if (!selectedTool || !toolName || !apiKey) return;
    
    const selectedToolData = toolTypes.find(tool => tool.id === selectedTool);
    
    onAddTool({
      id: selectedTool,
      name: toolName,
      type: selectedTool,
      apiKey,
      ...(selectedToolData ? {
        description: selectedToolData.description,
        icon: selectedToolData.icon,
        color: selectedToolData.color,
      } : {})
    });

    // Reset form
    setSelectedTool('');
    setToolName('');
    setApiKey('');
    setShowApiKey(false);
    setSearchQuery('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-[24px] w-full max-w-[500px] mx-4">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <div className='flex flex-col items-center justify-center'>
            <h2 className="text-[20px] font-normal text-gray-900 dark:text-white">Add New Tool Integration</h2>
            <p className="text-[16px] text-gray-500 dark:text-gray-400 mt-1">Select the tool type</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select action type
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tool"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-[#333] text-gray-900 dark:text-white"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tool Type Selection */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-3">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`cursor-pointer rounded-lg ${
                  selectedTool === tool.id 
                    ? 'bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400 p-[2px]'
                    : 'border-2 border-gray-200 dark:border-[#333] hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className={`p-3 rounded-lg h-full flex flex-row gap-[16px] items-center ${
                  selectedTool === tool.id  
                    ? 'bg-white dark:bg-[#1A1A1A]' 
                    : 'dark:bg-[#1A1A1A]'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="h-[24px] w-[24px] text-[#525866]">
                      {typeof tool.icon === 'string' ? tool.icon : tool.icon}
                    </div>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <span className="font-medium text-[16px] text-[#525866]">
                      {tool.name}
                    </span>
                    <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-tight">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration Section */}
        {selectedTool && (
          <div className="mb-6 p-4 bg-white dark:bg-[#1A1A1A] border border-[#D5D5D5] dark:border-[#333] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gray-600 dark:text-gray-400">
                {typeof toolTypes.find(tool => tool.id === selectedTool)?.icon === 'string' 
                  ? toolTypes.find(tool => tool.id === selectedTool)?.icon 
                  : toolTypes.find(tool => tool.id === selectedTool)?.icon}
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {toolTypes.find(tool => tool.id === selectedTool)?.name} Configuration
              </span>
            </div>

            {/* Tool Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tool Name
              </label>
              <input
                type="text"
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                placeholder="My Webhook Action"
                className="bg-[#F6F6F6] dark:bg-[#333] w-full p-[14px_16px] rounded-[6px] text-[14px] placeholder-[#9CA3AF] dark:placeholder-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#DA46F8] focus:border-transparent font-inter text-black dark:text-white border dark:border-gray-600"
              />
            </div>

            {/* API Key */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Key
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="bg-[#F6F6F6] dark:bg-[#333] w-full p-[14px_16px] pr-10 rounded-[6px] text-[14px] placeholder-[#9CA3AF] dark:placeholder-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#DA46F8] focus:border-transparent font-inter text-black dark:text-white border dark:border-gray-600"
                />
                <button 
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-[#333] hover:text-gray-600 dark:hover:text-gray-100"
                >
                  {showApiKey ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                This will be encrypted and securely stored
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 justify-end">
          <button
            onClick={onClose}
            className="p-[8px_32px] text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-[#333] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedTool || !toolName || !apiKey}
            className={`p-[8px_32px] rounded-lg font-medium transition-colors ${
              selectedTool && toolName && apiKey
                ? 'bg-purple-600 text-white hover:bg-purple-700 bg-gradient-to-r from-[#6940E4] to-[#FF5AFE] dark:text-white'
                : 'bg-gray-300 dark:bg-[#333] text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Add New Tool
          </button>
        </div>
      </div>
    </div>
  );
}
