"use client";

import { Handle, Position } from '@xyflow/react';

interface AddToolsNodeData {
  label?: string;
}

interface AddToolsNodeProps {
  data: AddToolsNodeData;
  selected?: boolean;
}

export default function AddToolsNode({ data, selected }: AddToolsNodeProps) {
  return (
    <div className={`relative bg-white dark:bg-[#2A2A2A] rounded-xl border-2 transition-all duration-200 min-w-[200px] cursor-pointer hover:shadow-lg ${
      selected ? 'border-[#0E121B] dark:border-[#e5e7eb] shadow-lg' : 'border-[#0E121B] dark:border-[#e5e7eb]'
    }`}>
      {/* Main content */}
      <div className="p-[16px_26px]">
        <div className="flex items-center justify-center gap-3">
          {/* Plus Icon */}
          <div className="w-6 h-6 text-[#0E121B] dark:text-[#e5e7eb]">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          
          {/* Label */}
          <span className="text-[#0E121B] dark:text-[#e5e7eb] font-medium text-base">
            {data.label || 'Add Tools'}
          </span>
        </div>
      </div>

      {/* Connection Handles */}
      {/* <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-500 border-2 border-white"
        style={{ left: -6 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-500 border-2 border-white"
        style={{ right: -6 }}
      /> */}
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-gray-500 border-2 border-white"
        style={{ top: -6 }}
      />
      {/* <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-500 border-2 border-white"
        style={{ bottom: -6 }}
      /> */}
    </div>
  );
}