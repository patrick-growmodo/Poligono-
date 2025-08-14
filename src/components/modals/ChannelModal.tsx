"use client";

import { useState } from 'react';

interface ChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChannel: (channelData: any) => void;
}

interface ChannelType {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const channelTypes: ChannelType[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Connect your agent via WhatsApp Business API',
    icon: '💬',
    color: 'text-green-600'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Integrate with Telegram using the Bot API',
    icon: '✈️',
    color: 'text-blue-500'
  },
  {
    id: 'messenger',
    name: 'Messenger',
    description: 'Connect with users via Facebook Messenger',
    icon: '💬',
    color: 'text-blue-600'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Connect with users via Instagram messaging',
    icon: '📷',
    color: 'text-pink-500'
  },
  {
    id: 'voice',
    name: 'Voice',
    description: 'Enable phone call support through voice',
    icon: '📞',
    color: 'text-gray-600'
  },
  {
    id: 'webchat',
    name: 'Web Chat',
    description: 'Embed a live chat widget on your website',
    icon: '💻',
    color: 'text-purple-600'
  }
];

export default function ChannelModal({ isOpen, onClose, onAddChannel }: ChannelModalProps) {
  const [selectedChannel, setSelectedChannel] = useState<string>('');
  const [channelName, setChannelName] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [showAccessToken, setShowAccessToken] = useState<boolean>(false);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 ">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Add a new Channel to your agent</h2>
            <p className="text-sm text-gray-500 mt-1">Select the Channel type</p>
          </div>
        </div>

        {/* Channel Type Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Select channel type</h3>
          <div className="grid grid-cols-2 gap-3">
            {channelTypes.map((channel) => (
              <div
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedChannel === channel.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{channel.icon}</span>
                  <span className={`font-medium text-sm ${channel.color}`}>
                    {channel.name}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-tight">
                  {channel.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration Section */}

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gray-600">⚙️</span>
              <span className="font-medium text-gray-900">
                {channelTypes.find(ch => ch.id === selectedChannel)?.name} Configuration
              </span>
            </div>

            {/* Channel Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Channel Name
              </label>
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="Enter a name for this channel"
                className="w-full text-black bg-[#F6F6F6] px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Access Token */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Token
              </label>
              <div className="relative">
                <input
                  type={showAccessToken ? "text" : "password"}
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="Enter API access token"
                  className="w-full text-black bg-[#F6F6F6] px-3 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowAccessToken(!showAccessToken)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
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
              <p className="text-xs text-gray-500 mt-1">
                This will be encrypted and securely stored
              </p>
            </div>
          </div>
        

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedChannel || !channelName}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedChannel && channelName
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Add Channel
          </button>
        </div>
      </div>
    </div>
  );
}