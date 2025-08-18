"use client";

import { Handle, Position } from '@xyflow/react';
import Image from 'next/image';
import { useState } from 'react';
import ContextMenu from '../ContextMenu';

interface ChannelNodeData {
  label?: string;
  status?: 'active' | 'inactive';
  channelType?: string;
  onConfig?: () => void;
  onDelete?: () => void;
  // Configuration data
  name?: string;
  accessToken?: string;
  configured?: boolean;
  // Channel type specific data
  phoneNumberId?: string; // WhatsApp
  botUsername?: string;   // Telegram
  websiteUrl?: string;    // WebChat
}

interface ChannelNodeProps {
  data: ChannelNodeData;
  selected?: boolean;
}

export default function ChannelNode({ data, selected }: ChannelNodeProps) {
  const isActive = data.status === 'active';
  const isConfigured = data.configured || false;
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  // Context menu items
  const contextMenuItems = [
    {
      id: 'edit',
      label: 'Edit',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      ),
      onClick: () => {
        if (data.onConfig) {
          data.onConfig();
        }
      }
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3,6 5,6 21,6"></polyline>
          <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
        </svg>
      ),
      onClick: () => {
        if (data.onDelete) {
          data.onDelete();
        }
      },
      danger: true
    }
  ];

  // Get channel icon based on type
  const getChannelIcon = () => {
    switch (data.channelType) {
      case 'whatsapp':
        return (
          <Image src="/images/icons/whatsapp-icon.svg" alt="WhatsApp" width={20} height={20} />
        );
      case 'instagram':
        return (
          <Image src="/images/icons/instagram-icon.svg" alt="Instagram" width={20} height={20} />
        );

      case 'messenger':
        return (
          <Image src="/images/icons/messenger-icon.svg" alt="Messenger" width={20} height={20} />
        );
      case 'telegram':
        return (
          <Image src="/images/icons/telegram-icon.svg" alt="Telegram" width={20} height={20} />
        );
      case 'webchat':
        return (
          <Image src="/images/icons/globe-icon.svg" alt="WebChat" width={20} height={20} className='dark:invert'/>
        );
        case 'voice':
        return (
          <Image src="/images/icons/microphone-icon.svg" alt="SMS" width={20} height={20} className='dark:invert'/>
        );
      default:
        return (
          <Image src="/images/icons/sms-icon.svg" alt="SMS" width={20} height={20} />
        );
    }
  };

  // Get channel color based on type
  const getChannelColor = () => {
    switch (data.channelType) {
      case 'whatsapp': return 'bg-green-500';
      case 'telegram': return 'bg-blue-500';
      case 'instagram': return 'bg-[#cbcbcb3b]';
      case 'messenger': return 'bg-purple-500';
      case 'voice': return 'bg-orange-300';
      case 'webchat': return 'bg-green-500';
      case 'sms': return 'bg-orange-500';
      default: return 'bg-[#cbcbcb3b]';
    }
  };

  return (
    <div className={`relative bg-white dark:bg-[#2A2A2A] rounded-[8px] shadow-md border-2 transition-all duration-200 min-w-[181px] ${
      selected ? 'border-blue-500 shadow-lg' : 'border-gray-200'
    }`}>
      {/* Colored accent bar on the left */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${getChannelColor()} rounded-l-[8px]`}></div>
      
      {/* Main content */}
      <div className="p-4 pl-6">
        <div className="flex items-start gap-3">
          {/* Dynamic Channel Icon */}
          <div className={`w-[20px] h-[20px]  rounded-full flex items-center justify-center flex-shrink-0`}>
            {getChannelIcon()}
          </div>
          
          {/* Channel Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0">
              <h3 className="text-[#525866] dark:text-white font-medium text-sm truncate">
                {data.name || data.label || 'Channel'}
              </h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent node selection
                  setIsContextMenuOpen(!isContextMenuOpen); // Toggle the context menu
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                title="More options"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 10C3.75 9.30964 4.30964 8.75 5 8.75C5.69036 8.75 6.25 9.30964 6.25 10C6.25 10.6904 5.69036 11.25 5 11.25C4.30964 11.25 3.75 10.6904 3.75 10ZM8.75 10C8.75 9.30964 9.30964 8.75 10 8.75C10.6904 8.75 11.25 9.30964 11.25 10C11.25 10.6904 10.6904 11.25 10 11.25C9.30964 11.25 8.75 10.6904 8.75 10ZM13.75 10C13.75 9.30964 14.3096 8.75 15 8.75C15.6904 8.75 16.25 9.30964 16.25 10C16.25 10.6904 15.6904 11.25 15 11.25C14.3096 11.25 13.75 10.6904 13.75 10Z" fill="#B4B4B4"/>
                </svg>
              </button>
            </div>

            {/* Channel Type and Configuration Status */}
            {/* <div className="text-xs text-gray-500 capitalize mb-1">
              {data.channelType || 'Unknown'} Channel
            </div> */}

            {/* Configuration Details */}
            {/* <div className="space-y-1 text-xs">
              {data.accessToken && (
                <div className="text-gray-600">
                  <span className="font-medium">Token:</span> •••••••••
                </div>
              )}
              {data.phoneNumberId && (
                <div className="text-gray-600">
                  <span className="font-medium">Phone ID:</span> {data.phoneNumberId}
                </div>
              )}
              {data.botUsername && (
                <div className="text-gray-600">
                  <span className="font-medium">Bot:</span> {data.botUsername}
                </div>
              )}
              {data.websiteUrl && (
                <div className="text-gray-600">
                  <span className="font-medium">URL:</span> {data.websiteUrl}
                </div>
              )}
            </div> */}
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="mt-3">
          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
            isActive 
              ? 'bg-transparent text-green-700 border-[#0B944A]' 
              : 'bg-gray-50 text-gray-700 border-gray-200' }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${
              isActive ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Connection Handles */}
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ top: -6 }}
      />
      {/* <Handle
        id="left"
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ left: -6 }}
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ right: -6 }}
      /> */}
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ bottom: -6 }}
      />

      {/* Context Menu */}
      <ContextMenu
        isOpen={isContextMenuOpen}
        onClose={() => setIsContextMenuOpen(false)}
        items={contextMenuItems}
      />
    </div>
  );
}
