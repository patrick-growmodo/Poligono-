"use client";

import { useState } from 'react';
import Image from 'next/image';

interface AgentDetailProps {
  agentId?: string;
}

export default function AgentDetail({ agentId }: AgentDetailProps) {
  const [isAgentLive, setIsAgentLive] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'Product Manual.pdf', size: '2.1 MB', status: 'processed', type: 'pdf' },
    { name: 'FAQ Database.json', size: '2.1 MB', status: 'processing', type: 'json' },
    { name: 'Company Policies...', size: '2.1 MB', status: 'processed', type: 'pdf' },
    { name: 'Company Policies...', size: '2.1 MB', status: 'processed', type: 'pdf' },
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Handle file upload logic here
      console.log('Files selected:', files);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'json':
        return '🔧';
      default:
        return '📄';
    }
  };

  return (
    <div className="w-80 bg-white dark:bg-[#1A1A1A] border-l border-gray-200 dark:border-gray-700 h-[100vh] overflow-y-auto">
      {/* Agent Profile */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <Image
              src="/images/gallery/profile-1.png"
              alt="Agent Avatar"
              width={54}
              height={54}
              className="rounded-full bg-gray-100 dark:bg-gray-700"
            />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Sophia Williams
          </h2>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Handles customer inquiries and support for live clients
          </p>
          
          <button
            onClick={() => setIsAgentLive(!isAgentLive)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
              isAgentLive
                ? 'bg-transparent text-[#0B944A] border border-[#0B944A] hover:bg-green-200'
                : 'bg-transparent text-[#0B944A] border border-[#0B944A] hover:bg-green-200'
            }`}
          >
            {isAgentLive ? <div className="text-[#0B944A] h-[6px] w-[6px] rounded-full bg-[#0B944A]"></div> : <div className="text-[#0B944A] h-[6px] w-[6px] rounded-full bg-[#0B944A]"></div>} Agent Live
          </button>
        </div>
      </div>

      {/* System Prompt */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          System Prompt
        </h3>
        
        <div className="bg-gray-50 dark:bg-[#2A2A2A] rounded-lg p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            You are a dedicated and knowledgeable customer support agent. Always communicate with empathy, professionalism, and clarity. Your goal is to resolve customer inquiries efficiently while delivering a positive and reassuring experience. Use all available information to investigate
          </p>
        </div>
      </div>

      {/* Rag Files */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Rag Files
          </h3>
          
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.json,.txt,.md"
            />
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md border border-blue-200 hover:bg-blue-100 transition-colors text-sm">
              <span>📤</span>
              Upload
            </div>
          </label>
        </div>

        <div className="space-y-3">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#2A2A2A] rounded-lg"
            >
              <div className="text-lg">
                {getFileIcon(file.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {file.type.toUpperCase()} • {file.size}
                </p>
              </div>
              
              <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(file.status)}`}>
                {file.status}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
          View more...
        </button>
      </div>
    </div>
  );
}
