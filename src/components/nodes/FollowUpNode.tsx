"use client";

import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import ContextMenu from '../ContextMenu';

interface FollowUpNodeData {
  label?: string;
  name?: string;
  actionType?: string;
  webhookUrl?: string;
  delay?: string;
  status?: 'active' | 'inactive';
  configured?: boolean;
  description?: string;
  icon?: JSX.Element;
  onConfig?: () => void;
  onDelete?: () => void;
  color?: string;
}

interface FollowUpNodeProps {
  data: FollowUpNodeData;
  selected?: boolean;
}

export default function FollowUpNode({ data, selected }: FollowUpNodeProps) {
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
        console.log('Edit button clicked in FollowUpNode');
        if (data.onConfig) {
          console.log('Calling data.onConfig()');
          data.onConfig();
        } else {
          console.log('data.onConfig is not available');
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

  // Get action icon based on type
  const getActionIcon = () => {
    switch (data.actionType) {
      case 'send-email':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M1.5 8.6691V17.25C1.5 18.9069 2.84315 20.25 4.5 20.25H19.5C21.1569 20.25 22.5 18.9069 22.5 17.25V8.6691L13.5723 14.1631C12.6081 14.7564 11.3919 14.7564 10.4277 14.1631L1.5 8.6691Z" fill="#525866"/>
          <path d="M22.5 6.90783V6.75C22.5 5.09315 21.1569 3.75 19.5 3.75H4.5C2.84315 3.75 1.5 5.09315 1.5 6.75V6.90783L11.2139 12.8856C11.696 13.1823 12.304 13.1823 12.7861 12.8856L22.5 6.90783Z" fill="#525866"/>
        </svg>
        );
      case 'redirect-agent':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M7.50082 6C7.50082 3.51472 9.51554 1.5 12.0008 1.5C14.4861 1.5 16.5008 3.51472 16.5008 6C16.5008 8.48528 14.4861 10.5 12.0008 10.5C9.51554 10.5 7.50082 8.48528 7.50082 6Z" fill="#525866"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M3.75207 20.1053C3.82941 15.6156 7.4928 12 12.0008 12C16.5089 12 20.1724 15.6157 20.2496 20.1056C20.2547 20.4034 20.0832 20.676 19.8125 20.8002C17.4335 21.8918 14.7873 22.5 12.0011 22.5C9.21468 22.5 6.56825 21.8917 4.18914 20.7999C3.91847 20.6757 3.74694 20.4031 3.75207 20.1053Z" fill="#525866"/>
        </svg>
        );
      case 'trigger-next-agent':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5.85121 3.50019C6.12746 3.19155 6.10119 2.7174 5.79255 2.44116C5.4839 2.16491 5.00975 2.19118 4.73351 2.49982C3.53256 3.84163 2.69691 5.51948 2.38546 7.37592C2.31692 7.78442 2.59252 8.17114 3.00103 8.23967C3.40953 8.3082 3.79625 8.0326 3.86478 7.6241C4.12789 6.05581 4.83387 4.63686 5.85121 3.50019Z" fill="#525866"/>
          <path d="M19.2678 2.49982C18.9916 2.19118 18.5175 2.16491 18.2088 2.44116C17.9002 2.7174 17.8739 3.19155 18.1501 3.50019C19.1675 4.63686 19.8735 6.05581 20.1366 7.6241C20.2051 8.0326 20.5918 8.3082 21.0003 8.23967C21.4088 8.17114 21.6844 7.78442 21.6159 7.37592C21.3045 5.51948 20.4688 3.84163 19.2678 2.49982Z" fill="#525866"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M12.0009 2.25C8.27301 2.25 5.25097 5.27197 5.25087 8.9998L5.25067 9.75C5.25067 11.8731 4.44965 13.8074 3.13212 15.2699C2.96562 15.4547 2.90159 15.71 2.96118 15.9516C3.02078 16.1931 3.19624 16.3893 3.4296 16.4755C4.97373 17.0455 6.59019 17.4659 8.26125 17.7192C8.25437 17.812 8.25087 17.9056 8.25087 18C8.25087 20.0711 9.9298 21.75 12.0009 21.75C14.0719 21.75 15.7509 20.0711 15.7509 18C15.7509 17.9056 15.7474 17.812 15.7405 17.7192C17.4114 17.4659 19.0277 17.0455 20.5717 16.4755C20.8051 16.3893 20.9806 16.1931 21.0402 15.9516C21.0997 15.71 21.0357 15.4547 20.8692 15.2699C19.5517 13.8074 18.7507 11.8731 18.7507 9.75V9.04919L18.7509 9C18.7509 5.27208 15.7288 2.25 12.0009 2.25ZM9.75087 18C9.75087 17.9662 9.75161 17.9326 9.75307 17.8993C10.4935 17.966 11.2432 18 12.0007 18C12.7583 18 13.5081 17.9659 14.2487 17.8992C14.2501 17.9326 14.2509 17.9662 14.2509 18C14.2509 19.2426 13.2435 20.25 12.0009 20.25C10.7582 20.25 9.75087 19.2426 9.75087 18Z" fill="#525866"/>
        </svg>
        );
      case 'create-ticket':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5.85121 3.50019C6.12746 3.19155 6.10119 2.7174 5.79255 2.44116C5.4839 2.16491 5.00975 2.19118 4.73351 2.49982C3.53256 3.84163 2.69691 5.51948 2.38546 7.37592C2.31692 7.78442 2.59252 8.17114 3.00103 8.23967C3.40953 8.3082 3.79625 8.0326 3.86478 7.6241C4.12789 6.05581 4.83387 4.63686 5.85121 3.50019Z" fill="#525866"/>
          <path d="M19.2678 2.49982C18.9916 2.19118 18.5175 2.16491 18.2088 2.44116C17.9002 2.7174 17.8739 3.19155 18.1501 3.50019C19.1675 4.63686 19.8735 6.05581 20.1366 7.6241C20.2051 8.0326 20.5918 8.3082 21.0003 8.23967C21.4088 8.17114 21.6844 7.78442 21.6159 7.37592C21.3045 5.51948 20.4688 3.84163 19.2678 2.49982Z" fill="#525866"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M12.0009 2.25C8.27301 2.25 5.25097 5.27197 5.25087 8.9998L5.25067 9.75C5.25067 11.8731 4.44965 13.8074 3.13212 15.2699C2.96562 15.4547 2.90159 15.71 2.96118 15.9516C3.02078 16.1931 3.19624 16.3893 3.4296 16.4755C4.97373 17.0455 6.59019 17.4659 8.26125 17.7192C8.25437 17.812 8.25087 17.9056 8.25087 18C8.25087 20.0711 9.9298 21.75 12.0009 21.75C14.0719 21.75 15.7509 20.0711 15.7509 18C15.7509 17.9056 15.7474 17.812 15.7405 17.7192C17.4114 17.4659 19.0277 17.0455 20.5717 16.4755C20.8051 16.3893 20.9806 16.1931 21.0402 15.9516C21.0997 15.71 21.0357 15.4547 20.8692 15.2699C19.5517 13.8074 18.7507 11.8731 18.7507 9.75V9.04919L18.7509 9C18.7509 5.27208 15.7288 2.25 12.0009 2.25ZM9.75087 18C9.75087 17.9662 9.75161 17.9326 9.75307 17.8993C10.4935 17.966 11.2432 18 12.0007 18C12.7583 18 13.5081 17.9659 14.2487 17.8992C14.2501 17.9326 14.2509 17.9662 14.2509 18C14.2509 19.2426 13.2435 20.25 12.0009 20.25C10.7582 20.25 9.75087 19.2426 9.75087 18Z" fill="#525866"/>
        </svg>
        );
      case 'schedule-reminder':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12.0004 11.9901C11.5862 11.9901 11.2504 12.3259 11.2504 12.7401V12.7457C11.2504 13.16 11.5862 13.4958 12.0004 13.4958H12.006C12.4202 13.4958 12.756 13.16 12.756 12.7457V12.7401C12.756 12.3259 12.4202 11.9901 12.006 11.9901H12.0004Z" fill="#525866"/>
          <path d="M11.9997 16.4906C11.5854 16.4906 11.2496 16.8264 11.2496 17.2406V17.2462C11.2496 17.6605 11.5854 17.9963 11.9997 17.9963H12.0053C12.4195 17.9963 12.7553 17.6605 12.7553 17.2462V17.2406C12.7553 16.8264 12.4195 16.4906 12.0053 16.4906H11.9997Z" fill="#525866"/>
          <path d="M8.99886 17.2413C8.99886 16.8271 9.33466 16.4913 9.74889 16.4913H9.75451C10.1687 16.4913 10.5045 16.8271 10.5045 17.2413V17.247C10.5045 17.6612 10.1687 17.997 9.75451 17.997H9.74889C9.33466 17.997 8.99886 17.6612 8.99886 17.247V17.2413Z" fill="#525866"/>
          <path d="M7.49886 16.4906C7.08462 16.4906 6.74882 16.8264 6.74882 17.2406V17.2462C6.74882 17.6605 7.08462 17.9963 7.49886 17.9963H7.50448C7.91871 17.9963 8.25451 17.6605 8.25451 17.2462V17.2406C8.25451 16.8264 7.91871 16.4906 7.50448 16.4906H7.49886Z" fill="#525866"/>
          <path d="M13.4989 14.9938C13.4989 14.5796 13.8347 14.2438 14.249 14.2438H14.2546C14.6688 14.2438 15.0046 14.5796 15.0046 14.9938V14.9995C15.0046 15.4137 14.6688 15.7495 14.2546 15.7495H14.249C13.8347 15.7495 13.4989 15.4137 13.4989 14.9995V14.9938Z" fill="#525866"/>
          <path d="M14.2497 16.4913C13.8355 16.4913 13.4997 16.8271 13.4997 17.2413V17.247C13.4997 17.6612 13.8355 17.997 14.2497 17.997H14.2553C14.6695 17.997 15.0053 17.6612 15.0053 17.247V17.2413C15.0053 16.8271 14.6695 16.4913 14.2553 16.4913H14.2497Z" fill="#525866"/>
          <path d="M15.7497 14.9924C15.7497 14.5781 16.0855 14.2423 16.4997 14.2423H16.5053C16.9196 14.2423 17.2554 14.5781 17.2554 14.9924V14.998C17.2554 15.4122 16.9196 15.748 16.5053 15.748H16.4997C16.0855 15.748 15.7497 15.4122 15.7497 14.998V14.9924Z" fill="#525866"/>
          <path d="M13.4981 12.7401C13.4981 12.3259 13.8339 11.9901 14.2481 11.9901H16.4981C16.9124 11.9901 17.2482 12.3259 17.2482 12.7401C17.2482 13.1544 16.9124 13.4902 16.4981 13.4902H14.2481C13.8339 13.4902 13.4981 13.1544 13.4981 12.7401Z" fill="#525866"/>
          <path d="M6.74811 14.9904C6.74811 14.5761 7.08391 14.2403 7.49815 14.2403H11.9981C12.4124 14.2403 12.7482 14.5761 12.7482 14.9904C12.7482 15.4046 12.4124 15.7404 11.9981 15.7404H7.49815C7.08391 15.7404 6.74811 15.4046 6.74811 14.9904Z" fill="#525866"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M18 2.99027C18 2.57604 17.6642 2.24023 17.2499 2.24023C16.8357 2.24023 16.4999 2.57604 16.4999 2.99027V4.48919H7.49963V2.99161C7.49963 2.57738 7.16383 2.24157 6.7496 2.24157C6.33537 2.24157 5.99957 2.57738 5.99957 2.99161V4.48919H5.24818C3.59125 4.48919 2.24805 5.83241 2.24805 7.48935V18.7406C2.24805 20.3976 3.59125 21.7408 5.24818 21.7408H18.748C20.4049 21.7408 21.7481 20.3976 21.7481 18.7406V7.48935C21.7481 5.83241 20.4049 4.48919 18.748 4.48919H18V2.99027ZM3.74811 18.7406V11.2402C3.74811 10.4117 4.41971 9.74012 5.24818 9.74012H18.748C19.5764 9.74012 20.248 10.4117 20.248 11.2402V18.7406C20.248 19.5691 19.5764 20.2407 18.748 20.2407H5.24818C4.41972 20.2407 3.74811 19.5691 3.74811 18.7406Z" fill="#525866"/>
        </svg>
        );
      case 'webhook':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M19.9016 4.09835C18.4372 2.63388 16.0628 2.63388 14.5984 4.09835L10.0983 8.59835C8.63388 10.0628 8.63388 12.4372 10.0983 13.9017C10.4092 14.2125 10.7598 14.4565 11.133 14.6348C11.5068 14.8134 11.665 15.2611 11.4865 15.6349C11.3079 16.0086 10.8602 16.1669 10.4865 15.9883C9.96169 15.7376 9.47063 15.3953 9.03769 14.9623C6.98744 12.9121 6.98744 9.58794 9.03769 7.53769L13.5377 3.03769C15.5879 0.987437 18.9121 0.987437 20.9623 3.03769C23.0126 5.08794 23.0126 8.41206 20.9623 10.4623L19.2053 12.2193C18.9124 12.5122 18.4376 12.5122 18.1447 12.2193C17.8518 11.9264 17.8518 11.4515 18.1447 11.1586L19.9016 9.40165C21.3661 7.93718 21.3661 5.56282 19.9016 4.09835ZM12.5135 8.36513C12.6921 7.99138 13.1398 7.83313 13.5135 8.01167C14.0383 8.26236 14.5294 8.60475 14.9623 9.03769C17.0126 11.0879 17.0126 14.4121 14.9623 16.4623L10.4623 20.9623C8.41206 23.0126 5.08794 23.0126 3.03769 20.9623C0.987437 18.9121 0.987437 15.5879 3.03769 13.5377L4.79466 11.7807C5.08755 11.4878 5.56243 11.4878 5.85532 11.7807C6.14821 12.0736 6.14821 12.5485 5.85532 12.8414L4.09835 14.5984C2.63388 16.0628 2.63388 18.4372 4.09835 19.9016C5.56282 21.3661 7.93718 21.3661 9.40165 19.9016L13.9017 15.4016C15.3661 13.9372 15.3661 11.5628 13.9017 10.0983C13.5908 9.78748 13.2402 9.54347 12.867 9.36517C12.4932 9.18662 12.335 8.73889 12.5135 8.36513Z" fill="#0F172A"/>
        </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        );
    }
  };

  // Get action color based on type
  const getActionColor = () => {
    switch (data.actionType) {
      case 'send-email': return 'bg-blue-500';
      case 'redirect-agent': return 'bg-green-500';
      case 'trigger-next-agent': return 'bg-yellow-500';
      case 'create-ticket': return 'bg-red-500';
      case 'schedule-reminder': return 'bg-purple-500';
      case 'webhook': return 'bg-indigo-500';
      default: return 'bg-[#DA46F8]';
    }
  };

  const formatActionType = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className={`relative bg-white dark:bg-[#2A2A2A] rounded-[8px] shadow-md border-2 transition-all duration-200 min-w-[181px] ${
      selected ? 'border-[#DA46F8] shadow-lg' : 'border-gray-200'
    }`}>
      {/* Colored accent bar on the left */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${getActionColor()} rounded-l-[8px]`}></div>
      
      {/* Main content */}
      <div className="p-4 pl-6">
        <div className="flex items-start gap-3">
          {/* Action Icon */}
          <div className={`w-[20px] h-[20px] text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center flex-shrink-0`}>
            {getActionIcon()}
          </div>
          
          {/* Action Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0">
              <h3 className="text-[#525866] dark:text-white font-medium text-sm truncate">
                {data.name || data.label || 'Follow-Up Action'}
              </h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent node selection
                  console.log('Three dots button clicked in FollowUpNode');
                  setIsContextMenuOpen(!isContextMenuOpen); // Toggle the context menu
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                title="More options"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.75 10C3.75 9.30964 4.30964 8.75 5 8.75C5.69036 8.75 6.25 9.30964 6.25 10C6.25 10.6904 5.69036 11.25 5 11.25C4.30964 11.25 3.75 10.6904 3.75 10ZM8.75 10C8.75 9.30964 9.30964 8.75 10 8.75C10.6904 8.75 11.25 9.30964 11.25 10C11.25 10.6904 10.6904 11.25 10 11.25C9.30964 11.25 8.75 10.6904 8.75 10ZM13.75 10C13.75 9.30964 14.3096 8.75 15 8.75C15.6904 8.75 16.25 9.30964 16.25 10C16.25 10.6904 15.6904 11.25 15 11.25C14.3096 11.25 13.75 10.6904 13.75 10Z" fill="#B4B4B4"/>
                </svg>
              </button>
            </div>

            {/* Action Type */}
            {/* <div className="text-xs text-gray-500 capitalize mb-2">
              {data.actionType ? formatActionType(data.actionType) : 'Action'}
            </div> */}

            {/* Configuration Details */}
            {/* <div className="space-y-1 text-xs">
              {data.delay && (
                <div className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Delay:</span> {data.delay}
                </div>
              )}
              {data.webhookUrl && (
                <div className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">URL:</span> {data.webhookUrl.substring(0, 30)}...
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
        className="w-3 h-3 bg-[#DA46F8] border-2 border-white"
        style={{ top: -6 }}
      />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-[#DA46F8] border-2 border-white"
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
