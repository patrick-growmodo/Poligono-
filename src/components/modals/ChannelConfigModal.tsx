"use client";

import { useState } from 'react';

interface ChannelConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (configData: any) => void;
  channelType: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
  } | null;
}

export default function ChannelConfigModal({ isOpen, onClose, onSave, channelType }: ChannelConfigModalProps) {
  const [channelName, setChannelName] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');

  if (!isOpen || !channelType) return null;

  const handleSubmit = () => {
    if (!channelName) return;
    
    onSave({
      name: channelName,
      accessToken,
      type: channelType.id,
      ...channelType
    });
    
    // Reset form
    setChannelName('');
    setAccessToken('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Configure {channelType.name}</h2>
            <p className="text-sm text-gray-500 mt-1">Set up your {channelType.name} channel</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Channel Type Display */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{channelType.icon}</span>
            <div>
              <h3 className={`font-medium ${channelType.color}`}>{channelType.name}</h3>
              <p className="text-sm text-gray-600">{channelType.description}</p>
            </div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                placeholder="Enter WhatsApp Phone Number ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                placeholder="https://your-website.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!channelName}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              channelName
                ? 'bg-purple-600 text-white hover:bg-purple-700'
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
