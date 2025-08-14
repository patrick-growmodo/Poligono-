"use client";

import { Handle, Position } from '@xyflow/react';

interface WhatsAppNodeData {
  label?: string;
  status?: 'active' | 'inactive';
}

interface WhatsAppNodeProps {
  data: WhatsAppNodeData;
  selected?: boolean;
}

export default function WhatsAppNode({ data, selected }: WhatsAppNodeProps) {
  const isActive = data.status === 'active';

  return (
    <div className={`relative bg-white rounded-lg shadow-md border-2 transition-all duration-200 min-w-[200px] ${
      selected ? 'border-blue-500 shadow-lg' : 'border-gray-200'
    }`}>
      {/* Green accent bar on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-lg"></div>
      
      {/* Main content */}
      <div className="p-4 pl-6">
        <div className="flex items-center gap-3">
          {/* WhatsApp Icon */}
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="white"
              className="fill-current"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.688"/>
            </svg>
          </div>
          
          {/* Label and Status */}
          <div className="flex-1">
            <h3 className="text-gray-900 font-medium text-sm">
              {data.label || 'WhatsApp'}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <div className="text-xs font-medium text-gray-700">...</div>
            </div>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="mt-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
            isActive 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-gray-50 text-gray-700 border-gray-200'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${
              isActive ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ left: -6 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ right: -6 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ bottom: -6 }}
      />
    </div>
  );
}
