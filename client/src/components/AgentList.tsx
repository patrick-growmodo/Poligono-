"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface Agent {
  id: number;
  name: string;
  description: string;
  lastModified: string;
  status: 'live' | 'on-hold';
  ragFiles: number;
}

export default function AgentList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);

  const agents: Agent[] = [
    {
      id: 1,
      name: 'Olivia Smith',
      description: 'Prime resident..',
      lastModified: 'July 31, 2025',
      status: 'live',
      ragFiles: 10
    },
    {
      id: 2,
      name: 'Jake Nolan',
      description: 'Market Mover...',
      lastModified: 'July 28, 2025',
      status: 'on-hold',
      ragFiles: 7
    },
    {
      id: 3,
      name: 'Liam Cross',
      description: 'Investor\'s Ally...',
      lastModified: 'May 25, 2025',
      status: 'live',
      ragFiles: 15
    }
  ];

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'lastModified':
        aValue = new Date(a.lastModified);
        bValue = new Date(b.lastModified);
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'ragFiles':
        aValue = a.ragFiles;
        bValue = b.ragFiles;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAgents(sortedAgents.map(agent => agent.id));
    } else {
      setSelectedAgents([]);
    }
  };

  const handleSelectAgent = (agentId: number, checked: boolean) => {
    if (checked) {
      setSelectedAgents([...selectedAgents, agentId]);
    } else {
      setSelectedAgents(selectedAgents.filter(id => id !== agentId));
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-white dark:bg-[#1A1A1A] rounded-[8px] mt-[10px]">
      <div className="p-[8px_20px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-medium text-gray-900 dark:text-white">Your agents</h3>
          
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2A2A] text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Sort Button */}
            <div className="relative">
              <button
                onClick={() => handleSort(sortBy)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2A2A] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#333] transition-colors"
              >
                Sort by
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto p-[8px_20px]">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gray-50 dark:bg-[#2A2A2A] rounded-[8px]">
            <tr className="rounded-[8px]">
                             <th className="text-left text-center">
                <input 
                  type="checkbox"
                  checked={selectedAgents.length === sortedAgents.length && sortedAgents.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 rounded-md border-2 border-gray-400 bg-gray-600 text-white focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 checked:bg-gray-600 checked:border-gray-400 checked:hover:bg-gray-500 hover:bg-gray-500 transition-all duration-200 shadow-sm"
                />
              </th>
              <th className="text-left text-[16px] font-medium text-gray-500 dark:text-gray-400 capitalize tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 dark:text-gray-400 capitalize tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 dark:text-gray-400 capitalize tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 dark:text-gray-400 capitalize tracking-wider">Last modified</th>
              <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 dark:text-gray-400 capitalize tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 dark:text-gray-400 capitalize tracking-wider">Rag Files</th>
              <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 dark:text-gray-400 capitalize tracking-wider">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white dark:bg-[#1A1A1A] divide-y divide-gray-200 dark:divide-gray-700">
            {sortedAgents.map((agent) => (
              <tr key={agent.id} className="hover:bg-gray-50 dark:hover:bg-[#2A2A2A]">
                                 <td className="px-6 py-4 whitespace-nowrap text-center">
                  <input
                    type="checkbox"
                    checked={selectedAgents.includes(agent.id)}
                    onChange={(e) => handleSelectAgent(agent.id, e.target.checked)}
                    className="w-4 h-4 rounded-md border-2 border-gray-400 bg-gray-600 text-white focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 checked:bg-gray-600 checked:border-gray-400 checked:hover:bg-gray-500 hover:bg-gray-500 transition-all duration-200 shadow-sm"
                  />
                </td>
                <td className="whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {agent.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {agent.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {agent.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {agent.lastModified}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    agent.status === 'live' 
                      ? 'bg-transparent text-[#0B944A] dark:bg-[#133220] dark:text-green-200 border border-[#0B944A]' 
                      : 'bg-transparent text-[#D39C3D] dark:bg-[#3a3122] dark:text-[#D39C3D] border border-[#D39C3D]'
                  }`}>
                    {agent.status === 'live' && (
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1 border border-[#0B944A]"></div>
                    )}
                    {agent.status === 'live' ? 'Agent Live' : 'On hold'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {agent.ragFiles}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-[8px]">
                    <button className="p-1 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="6" fill="#40C4AA" fillOpacity="0.15"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4012 15.26C11.2167 14.0833 13.1106 11.916 15.9993 11.916C18.888 11.916 20.782 14.0833 21.5975 15.26C21.9111 15.7126 21.9111 16.2863 21.5974 16.7389C20.782 17.9156 18.888 20.0827 15.9993 20.0827C13.1107 20.0827 11.2167 17.9156 10.4013 16.7389C10.0876 16.2863 10.0876 15.7126 10.4012 15.26ZM14.541 15.9993C14.2201 15.9993 13.9234 15.8957 13.6826 15.72C13.6716 15.8116 13.666 15.9048 13.666 15.9993C13.666 17.288 14.7107 18.3327 15.9993 18.3327C17.288 18.3327 18.3327 17.288 18.3327 15.9993C18.3327 14.7107 17.288 13.666 15.9993 13.666C15.9048 13.666 15.8116 13.6716 15.72 13.6826C15.8957 13.9234 15.9993 14.2201 15.9993 14.541C15.9993 15.3464 15.3464 15.9993 14.541 15.9993Z" fill="#40C4AA"/>
                    </svg>

                    </button>
                    <button className="p-1 rounded  text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="6" fill="#33CFFF" fillOpacity="0.15"/>
                    <path d="M18.5452 10.9164C18.3233 10.6945 17.9637 10.6945 17.7418 10.9164C17.52 11.1382 17.52 11.4978 17.7418 11.7196L20.2803 14.2577C20.5021 14.4795 20.8618 14.4795 21.0836 14.2577C21.3055 14.0359 21.3055 13.6763 21.0836 13.4545L18.5452 10.9164Z" fill="#33CFFF"/>
                    <path d="M12.5659 16.1535C12.455 16.2644 12.455 16.4442 12.5659 16.5551L15.4455 19.4343C15.5564 19.5452 15.7363 19.5452 15.8472 19.4343L19.532 15.7506C19.6429 15.6397 19.6429 15.4583 19.532 15.3474L16.652 12.4677C16.5411 12.3568 16.3596 12.3569 16.2487 12.4678L12.5659 16.1535Z" fill="#33CFFF"/>
                    <path d="M11.1952 17.8697L10.7592 20.4857C10.6851 20.9298 11.0702 21.3148 11.5144 21.2408L14.1308 20.8048C14.3066 20.7755 14.4736 20.7109 14.6221 20.6159C14.7543 20.5314 14.7531 20.3484 14.6422 20.2375L11.7626 17.3583C11.6517 17.2474 11.4687 17.2463 11.3842 17.3784C11.2892 17.5269 11.2245 17.6939 11.1952 17.8697Z" fill="#33CFFF"/>
                    <path d="M16.5833 20.0833C16.2612 20.0833 16 20.3445 16 20.6667C16 20.9888 16.2612 21.25 16.5833 21.25H20.6667C20.9888 21.25 21.25 20.9888 21.25 20.6667C21.25 20.3445 20.9888 20.0833 20.6667 20.0833H16.5833Z" fill="#33CFFF"/>
                    </svg>

                    </button>
                    <button className="p-1 rounded  text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="6" fill="#DF1C41" fillOpacity="0.15"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 12.5H14.2677C14.389 11.6519 15.1184 11 16 11C16.8816 11 17.611 11.6519 17.7323 12.5H19.5C19.7761 12.5 20 12.7239 20 13C20 13.2761 19.7761 13.5 19.5 13.5H12.5C12.2239 13.5 12 13.2761 12 13C12 12.7239 12.2239 12.5 12.5 12.5ZM16 12C16.3266 12 16.6044 12.2087 16.7073 12.5H15.2927C15.3956 12.2087 15.6734 12 16 12Z" fill="#DF1C41"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9235 14H13.0765C12.7722 14 12.5385 14.2695 12.5815 14.5707L13.316 19.7121C13.4216 20.4511 14.0545 21 14.8009 21H17.1991C17.9455 21 18.5784 20.4511 18.684 19.7121L19.4185 14.5707C19.4615 14.2695 19.2278 14 18.9235 14ZM15 15.5C15.2761 15.5 15.5 15.7239 15.5 16V19C15.5 19.2761 15.2761 19.5 15 19.5C14.7239 19.5 14.5 19.2761 14.5 19V16C14.5 15.7239 14.7239 15.5 15 15.5ZM17 15.5C17.2761 15.5 17.5 15.7239 17.5 16V19C17.5 19.2761 17.2761 19.5 17 19.5C16.7239 19.5 16.5 19.2761 16.5 19V16C16.5 15.7239 16.7239 15.5 17 15.5Z" fill="#DF1C41"/>
                    </svg>

                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
