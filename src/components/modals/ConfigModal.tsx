"use client";

import React, { useState } from 'react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (configData: any) => void;
  channelType: {
    id: string;
    name: string;
    description: string;
    icon: string | JSX.Element;
    color: string;
  } | null;
}

export default function ConfigModal({ isOpen, onClose, onSave, channelType }: ConfigModalProps) {
  const [channelName, setChannelName] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [phoneNumberId, setPhoneNumberId] = useState<string>('');
  const [botUsername, setBotUsername] = useState<string>('');
  const [websiteUrl, setWebsiteUrl] = useState<string>('');

  // Pre-populate fields when modal opens with existing data
  React.useEffect(() => {
    if (isOpen && channelType && (channelType as any).currentData) {
      const currentData = (channelType as any).currentData;
      setChannelName(currentData.name || currentData.label || '');
      setAccessToken(currentData.accessToken || '');
      setPhoneNumberId(currentData.phoneNumberId || '');
      setBotUsername(currentData.botUsername || '');
      setWebsiteUrl(currentData.websiteUrl || '');
    } else if (!isOpen) {
      // Reset form when modal closes
      setChannelName('');
      setAccessToken('');
      setPhoneNumberId('');
      setBotUsername('');
      setWebsiteUrl('');
    }
  }, [isOpen, channelType]);

  if (!isOpen || !channelType) return null;

  const handleSubmit = () => {
    if (!channelName) return;
    
    const configData = {
      name: channelName,
      accessToken,
      type: channelType.id,
      channelType: channelType.id,
      configured: true
    };

    // Add channel-specific fields
    if (channelType.id === 'whatsapp' && phoneNumberId) {
      configData.phoneNumberId = phoneNumberId;
    }
    if (channelType.id === 'telegram' && botUsername) {
      configData.botUsername = botUsername;
    }
    if (channelType.id === 'webchat' && websiteUrl) {
      configData.websiteUrl = websiteUrl;
    }
    
    onSave(configData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] p-[24px] w-full max-w-[500px] ">
        {/* Header */}
        <div className="flex items-center justify-center mb-6 flex-col">
          <div className='mr-2 flex items-center justify-center' >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M28.9749 3.02513C27.608 1.65829 25.392 1.65829 24.0251 3.02513L22.4823 4.56799L27.432 9.51774L28.9749 7.97487C30.3417 6.60804 30.3417 4.39196 28.9749 3.02513Z" fill="#0F172A"/>
                <path d="M26.0178 10.932L21.0681 5.9822L9.86692 17.1833C9.04454 18.0057 8.44002 19.02 8.10799 20.1347L7.04162 23.7145C6.93679 24.0664 7.03326 24.4475 7.2929 24.7071C7.55254 24.9667 7.93359 25.0632 8.28549 24.9584L11.8653 23.892C12.98 23.56 13.9943 22.9554 14.8167 22.1331L26.0178 10.932Z" fill="#0F172A"/>
                <path d="M7 6.99999C4.79086 6.99999 3 8.79085 3 11V25C3 27.2091 4.79086 29 7 29H21C23.2091 29 25 27.2091 25 25V18C25 17.4477 24.5523 17 24 17C23.4477 17 23 17.4477 23 18V25C23 26.1046 22.1046 27 21 27H7C5.89543 27 5 26.1046 5 25V11C5 9.89542 5.89543 8.99999 7 8.99999H14C14.5523 8.99999 15 8.55227 15 7.99999C15 7.4477 14.5523 6.99999 14 6.99999H7Z" fill="#0F172A"/>
              </svg>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h2 className="text-[20px] font-normal text-[#000]">Edit {channelType.name}</h2>
          </div>
        </div>

        {/* Channel Type Display */}
        <div className="">
          <div className="flex flex-row gap-3">
          <span> {typeof channelType.icon === 'string' ? channelType.icon : channelType.icon}</span>
              <h3 className={`font-normal text-[16px] text-[#525866]`}>
               
                 {channelType.name} Configuration</h3>
              {/* <p className="text-sm text-gray-600">{channelType.description}</p> */}
          </div>
        </div>

        {/* Configuration Form */}
        <div className="space-y-4">
          {/* Channel Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Channel Name *
            </label>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder={`Enter a name for this ${channelType.name} channel`}
              className="w-full text-black bg-[#F6F6F6] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Access Token */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Token
            </label>
            <input
              type="password"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              placeholder="Enter API access token"
              className="w-full text-black bg-[#F6F6F6] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              This will be encrypted and securely stored
            </p>
          </div>

          {/* Channel-specific configurations */}
          {channelType.id === 'whatsapp' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number ID
              </label>
              <input
                type="text"
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                placeholder="Enter WhatsApp Phone Number ID"
                className="w-full text-black bg-[#F6F6F6] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}

          {channelType.id === 'telegram' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bot Username
              </label>
              <input
                type="text"
                value={botUsername}
                onChange={(e) => setBotUsername(e.target.value)}
                placeholder="@your_bot_username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}

          {channelType.id === 'webchat' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://your-website.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 justify-end">
          <button
            onClick={onClose}
            className="p-[8px_32px] text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!channelName}
            className={`p-[8px_32px] rounded-lg font-medium transition-colors ${
              channelName
                ? 'bg-purple-600 text-white hover:bg-purple-700 dark:bg-gradient-to-r from-[#6940E4] to-[#FF5AFE] dark:text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save Channel
          </button>
        </div>
      </div>
    </div>
  );
}
