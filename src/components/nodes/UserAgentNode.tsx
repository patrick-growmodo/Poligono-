"use client";

import { Handle, Position } from '@xyflow/react';
import Image from 'next/image';

interface UserAgentNodeData {
  name?: string;
  description?: string;
  role?: string;
  avatarUrl?: string;
}

interface UserAgentNodeProps {
  data: UserAgentNodeData;
  selected?: boolean;
}

export default function UserAgentNode({ data, selected }: UserAgentNodeProps) {
  const {
    name = "Sophia Williams",
    description = "Handles customer inquiries and support",
    role = "Central Agent",
    avatarUrl = "/images/gallery/profile-1.png"
  } = data;

  return (
    <div className={`relative bg-white dark:bg-[#2A2A2A] rounded-xl  border-2 transition-all duration-200 min-w-[268px] ${
      selected ? 'border-[#6940E4]' : 'border-[#DDD]'
    }`}>
      {/* Main content */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-[30px] h-[30px] rounded-full overflow-hidden bg-gray-100 border-[1px] border-[#E358FF]">
              <Image
                src={avatarUrl}
                alt={name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to a default avatar if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23E5E7EB'/%3E%3Cpath d='M24 24c3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6 2.7 6 6 6zm0 3c-4 0-12 2-12 6v3h24v-3c0-4-8-6-12-6z' fill='%236B7280'/%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
          
          {/* Name and Description */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[20px] font-normal text-[#0E121B] dark:text-white mb-1">
              {name}
            </h3>
            <p className="text-[14px] text-[#525866] dark:text-white  w-full max-w-[173px] leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        
        {/* Role Badge */}
        <div className="mt-4 text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 dark:bg-[#2A2A2A] text-[#421ABA] border border-[#421ABA] dark:text-[#7b4fff] dark:border-[#7b4fff]">
            {role}
          </span>
        </div>
      </div>

      {/* Connection Handles */}
      <Handle
        id="left"
        type="source"
        position={Position.Left}
        className="w-3 h-3 bg-purple-400 border-2 border-white"
        style={{ left: -6 }}
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-purple-400 border-2 border-white"
        style={{ right: -6 }}
      />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-purple-400 border-2 border-white"
        style={{ bottom: -6 }}
      />
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ top: -6 }}
      />
    </div>
  );
}
