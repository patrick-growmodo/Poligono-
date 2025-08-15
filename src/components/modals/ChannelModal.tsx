"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface ChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChannel: (channelData: any) => void;
}

interface ChannelType {
  id: string;
  name: string;
  description: string;
  icon: string | JSX.Element;
  color: string;
  selected: boolean;
}

const channelTypes: ChannelType[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Connect your agent via WhatsApp Business API',
    icon: <Image src="/images/icons/whatsapp-icon.svg" alt="WhatsApp" width={24} height={24} />,
    color: '#525866',
    selected: true
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Integrate with Telegram using the Bot API',
    icon: <Image src="/images/icons/telegram-icon.svg" alt="Telegram" width={24} height={24} />,
    color: '#525866',
    selected: false
  },
  {
    id: 'messenger',
    name: 'Messenger',
    description: 'Connect with users via Facebook Messenger',
    icon: <Image src="/images/icons/messenger-icon.svg" alt="Messenger" width={24} height={24} />,
    color: '#525866',
    selected: false
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Connect with users via Instagram messaging',
    icon: <Image src="/images/icons/instagram-icon.svg" alt="Instagram" width={24} height={24} />,
    color: '#ff0000',
    selected: false
  },
  {
    id: 'voice',
    name: 'Voice',
    description: 'Enable phone call support through voice',
    icon: <Image src="/images/icons/microphone-icon.svg" alt="Voice" width={24} height={24} className='dark:invert'/>,
    color: '#525866',
    selected: false
  },
  {
    id: 'webchat',
    name: 'Web Chat',
    description: 'Embed a live chat widget on your website',
    icon: <Image src="/images/icons/globe-icon.svg" alt="WebChat" width={24} height={24}  className='dark:invert'/>,
    color: '#525866',
    selected: false
  }
];

export default function ChannelModal({ isOpen, onClose, onAddChannel }: ChannelModalProps) {
  const [selectedChannel, setSelectedChannel] = useState<string>('');
  const [channelName, setChannelName] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [showAccessToken, setShowAccessToken] = useState<boolean>(false);
  const [phoneNumberId, setPhoneNumberId] = useState<string>('');
  // Auto-select WhatsApp when modal opens
  React.useEffect(() => {
    if (isOpen) {
      const defaultChannel = channelTypes.find(channel => channel.selected);
      if (defaultChannel) {
        setSelectedChannel(defaultChannel.id);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!selectedChannel || !channelName || !accessToken) return;
    
    const selectedChannelData = channelTypes.find(ch => ch.id === selectedChannel);
    
    onAddChannel({
      id: selectedChannel,
      name: channelName,
      type: selectedChannel,
      accessToken,
      ...selectedChannelData
    });
    
    // Reset form
    setSelectedChannel('');
    setChannelName('');
    setAccessToken('');
    setShowAccessToken(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-[24px] w-full max-w-[500px] mx-4 ">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <div className='flex flex-col items-center justify-center'>
            <h2 className="text-[20px] font-normal  text-gray-900 dark:text-white">Add a new Channel to your agent</h2>
            <p className="text-[16px] text-gray-500 dark:text-gray-400 mt-1">Select the Channel type</p>
          </div>
        </div>

        {/* Channel Type Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select channel type</h3>
          <div className="grid grid-cols-2 gap-3">
            {channelTypes.map((channel) => (
              <div
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`cursor-pointer  rounded-lg ${
                  selectedChannel === channel.id 
                    ? 'bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400 p-[2px]'
                    : 'border-2 border-gray-200 dark:border-[#333] hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className={`p-3 rounded-lg h-full flex flex-row gap-[16px] items-center ${
                  selectedChannel === channel.id 
                    ? 'bg-white dark:bg-[#1A1A1A]' 
                    : 'dark:bg-[#1A1A1A]'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="h-[24px] w-[24px]">
                      {typeof channel.icon === 'string' ? channel.icon : channel.icon}
                    </div>
                    
                  </div>
                  <div className='flex flex-col gap-1'>
                  <span className={`font-medium text-[16px] text-[${channel.color}]`}>
                      {channel.name}
                    </span>
                    <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-tight">
                    {channel.description}
                  </p>
                  </div>
                
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration Section */}

          <div className="mb-6 p-4 bg-white dark:bg-[#1A1A1A] border border-[#D5D5D5] dark:border-[#333] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gray-600 dark:text-gray-400">
                {typeof channelTypes.find(ch => ch.id === selectedChannel)?.icon === 'string' ? channelTypes.find(ch => ch.id === selectedChannel)?.icon : channelTypes.find(ch => ch.id === selectedChannel)?.icon}</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {channelTypes.find(ch => ch.id === selectedChannel)?.name} Configuration
              </span>
            </div>

            {/* Channel Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Channel Name
              </label>
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="Enter a name for this channel"
                className="bg-[#F6F6F6] dark:bg-[#333] w-full p-[14px_16px] rounded-[6px] text-[14px] placeholder-[#9CA3AF] dark:placeholder-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#DA46F8] focus:border-transparent font-inter text-black dark:text-white border dark:border-gray-600"
              />
            </div>

           {/* Phone Number ID */}
           {/* {selectedChannel === 'whatsapp' && (
           <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number ID
              </label>
              <input
                type="text"
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                placeholder="Enter WhatsApp Phone Number ID"
                className="bg-[#F6F6F6] dark:bg-[#333] w-full p-[14px_16px] rounded-[6px] text-[14px] placeholder-[#9CA3AF] dark:placeholder-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#DA46F8] focus:border-transparent font-inter text-black dark:text-white border dark:border-gray-600"
              />
            </div>
            )} */}
            {/* Access Token */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Access Token
              </label>
              <div className="relative">
                <input
                  type={showAccessToken ? "text" : "password"}
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="Enter API access token"
                  className="bg-[#F6F6F6] dark:bg-[#333] w-full p-[14px_16px] rounded-[6px] text-[14px] placeholder-[#9CA3AF] dark:placeholder-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#DA46F8] focus:border-transparent font-inter text-black dark:text-white border dark:border-gray-600"
                />
                <button 
                  type="button"
                  onClick={() => setShowAccessToken(!showAccessToken)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-[#333] hover:text-gray-600 dark:hover:text-gray-100"
                >
                  {showAccessToken ? (
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
            disabled={!selectedChannel || !channelName}
            className={`p-[8px_32px] rounded-lg font-medium transition-colors ${
              selectedChannel && channelName
                ? 'bg-purple-600 text-white hover:bg-purple-700 bg-gradient-to-r from-[#6940E4] to-[#FF5AFE] dark:text-white'
                : 'bg-gray-300 dark:bg-[#333] text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Add Channel
          </button>
        </div>
      </div>
    </div>
  );
}