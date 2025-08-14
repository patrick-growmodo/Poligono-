"use client";

import Sidebar from "@/components/Sidebar";
import AgentDetail from "@/components/AgentDetail";
import WhatsAppNode from "@/components/nodes/WhatsAppNode";
import UserAgentNode from "@/components/nodes/UserAgentNode";
import AddChannelNode from "@/components/nodes/AddChannelNode";
import AddFollowUpNode from "@/components/nodes/AddFollowUpNode";
import AddToolsNode from "@/components/nodes/AddToolsNode";
import ChannelModal from "@/components/modals/ChannelModal";
import {
  Background,
  Controls,
  MiniMap,
  NodeChange,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
  reconnectEdge,
  EdgeChange,
  Edge,
  Connection
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';




// Define custom node types
const nodeTypes = {
  whatsapp: WhatsAppNode,
  useragent: UserAgentNode,
  addChannel: AddChannelNode,
  addFollowUp: AddFollowUpNode,
  addTools: AddToolsNode,
};

const initialNodes = [
  {  
    id: 'agent-1', 
    type: 'useragent',
    position: { x: 100, y: 50 }, 
    connectable: true,
    draggable: true,
    reconnectable: 'source',
    data: { 
      name: 'Sophia Williams',
      description: 'Handles customer inquiries and support',
      role: 'Central Agent',
      avatarUrl: '/images/gallery/profile-1.png'
    } 
  },

  { 
    id: 'add-channel-1', 
    type: 'addChannel',
    position: { x: -250, y: 300 }, 
    connectable: true,
    draggable: true,
    data: { label: 'Add Channel' } 
  }, 
  { 
    id: 'add-follow-up-1', 
    type: 'addFollowUp',
    connectable: true,
    draggable: true,
    position: { x: 136, y: 300 }, 
    data: { label: 'Add Follow Up' } 
  },
  { 
    id: 'add-tools-1', 
    type: 'addTools',
    position: { x: 500, y: 300 }, 
    connectable: true,
    draggable: true,
    data: { label: 'Add Tools' } 
  },
];
const initialEdges = [
  { 
    id: 'agent-1-add-channel-1', 
    source: 'agent-1',
    sourceHandle: 'left',
    target: 'add-channel-1',
    targetHandle: 'top',
    type: 'smoothstep',

    style: { stroke: '#6940E4', strokeWidth: 3 }
  },
  { 
    id: 'agent-1-add-follow-up-1', 
    source: 'agent-1',
    sourceHandle: 'bottom', 
    target: 'add-follow-up-1',
    targetHandle: 'top',
    type: 'smoothstep',

    style: { stroke: '#DA46F8', strokeWidth: 3 }  
  },
  { 
    id: 'agent-1-add-tools-1', 
    source: 'agent-1',
    sourceHandle: 'right',
    target: 'add-tools-1',
    targetHandle: 'top',
    type: 'smoothstep',

    style: { stroke: '#e5e7eb', strokeWidth: 3 }
  }
];
 

export default function EditAgent({ params }: { params: { id: string } }) {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // gets called after end of edge gets dragged to another source or target
  const onReconnect = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    [],
  );
     const onConnect = useCallback(
     (params) => {
       const newEdge = {
         ...params,
         type: 'smoothstep',
         style: { stroke: '#8B5CF6', strokeWidth: 3 }
       };
       setEdges((els) => addEdge(newEdge, els));
     },
     [],
   );


  const [activeItem, setActiveItem] = useState('Agents');
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);

  const handleAddChannel = (channelData: any) => {
    // Create a new channel node
    const newChannelNode = {
      id: `${channelData.type}-${Date.now()}`,
      type: 'whatsapp', // Use whatsapp node type for all channels for now
      position: { x: Math.random() * 300 + 100, y: Math.random() * 200 + 400 },
      data: { 
        label: channelData.name,
        status: 'active'
      }
    };
    
    setNodes((nds) => [...nds, newChannelNode]);
    console.log('Channel added:', channelData);
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    if (node.id === 'add-channel-1') {
      setIsChannelModalOpen(true);
    }
  }, []);
 
  return (
    <div className="min-h-screen auth-dark-gradient flex">
        {/* Sidebar */}
        <Sidebar activeItem={activeItem} onItemSelect={setActiveItem} />
      <main className="flex-1">
        <div className="w-full h-screen">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onReconnect={onReconnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            defaultZoom={0.75}
            minZoom={0.1}
            maxZoom={2}
            snapToGrid={true}
            snapGrid={[15, 15]}
            connectionLineType="smoothstep"
            connectionLineStyle={{ stroke: '#8B5CF6', strokeWidth: 3 }}
            deleteKeyCode="Delete"
            selectionKeyCode="Shift"
            multiSelectionKeyCode="Shift"
            panOnDrag={true}
            selectNodesOnDrag={false}
            reconnectRadius={20}
            defaultEdgeOptions={{
              type: 'smoothstep',
              style: { stroke: '#8B5CF6', strokeWidth: 3 },
              deletable: true
            }}
          >
            <Background className="bg-[#11100D] dark:bg-[#1A1A1A]"/>
          </ReactFlow>
        </div>
              </main>
        
        {/* Agent Detail Sidebar */}
        <AgentDetail agentId={params.id} />

        {/* Channel Modal */}
        <ChannelModal
          isOpen={isChannelModalOpen}
          onClose={() => setIsChannelModalOpen(false)}
          onAddChannel={handleAddChannel}
        />
       
      </div>
  );
}
