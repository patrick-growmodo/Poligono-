"use client";

import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import AgentDetail from "@/components/AgentDetail";
import ChannelNode from "@/components/nodes/ChannelNode";
import UserAgentNode from "@/components/nodes/UserAgentNode";
import AddChannelNode from "@/components/nodes/AddChannelNode";
import AddFollowUpNode from "@/components/nodes/AddFollowUpNode";
import AddToolsNode from "@/components/nodes/AddToolsNode";
import ChannelModal from "@/components/modals/ChannelModal";
import ConfigModal from "@/components/modals/ConfigModal";
import {
  Background,
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
import { useCallback, useState, useEffect } from 'react';




// Define custom node types
const nodeTypes = {
  channel: ChannelNode,//DYNAMIC CHANNEL NODE
  useragent: UserAgentNode,
  addChannel: AddChannelNode, //ADD CHANNEL BUTTON
  addFollowUp: AddFollowUpNode, //ADD FOLLOW UP BUTTON
  addTools: AddToolsNode, //ADD TOOLS BUTTON
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
    style: { stroke: '#6940E4', strokeWidth: 3 },
    deletable: true,
    selectable: true,
    focusable: true
  },
  { 
    id: 'agent-1-add-follow-up-1', 
    source: 'agent-1',
    sourceHandle: 'bottom', 
    target: 'add-follow-up-1',
    targetHandle: 'top',
    type: 'smoothstep',
    style: { stroke: '#DA46F8', strokeWidth: 3 },
    deletable: true,
    selectable: true,
    focusable: true
  },
  { 
    id: 'agent-1-add-tools-1', 
    source: 'agent-1',
    sourceHandle: 'right',
    target: 'add-tools-1',
    targetHandle: 'top',
    type: 'smoothstep',
    style: { stroke: '#616161', strokeWidth: 3 },
    deletable: true,
    selectable: true,
    focusable: true
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
     (params: Connection) => {
       // Prevent self-connections
       if (params.source === params.target) {
         console.log('Self-connection prevented:', params);
         return;
       }

       // Prevent duplicate connections
       const existingEdge = edges.find(edge => 
         edge.source === params.source && 
         edge.target === params.target &&
         edge.sourceHandle === params.sourceHandle &&
         edge.targetHandle === params.targetHandle
       );

       if (existingEdge) {
         console.log('Duplicate connection prevented:', params);
         return;
       }

       const newEdge = {
         ...params,
         type: 'smoothstep',
         style: { stroke: '#8B5CF6', strokeWidth: 3 },
         deletable: true,
         selectable: true,
         focusable: true
       };
       setEdges((els) => addEdge(newEdge, els));
       console.log('New connection created:', newEdge);
     },
     [edges],
   );


  const [activeItem, setActiveItem] = useState('Agents');
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedChannelForConfig, setSelectedChannelForConfig] = useState<any>(null);

  // Debug: Log edges when they change
  useEffect(() => {
    console.log('Current edges:', edges);
  }, [edges]);

  // Handle edge deletion
  const onEdgesDelete = useCallback((edgesToDelete: Edge[]) => {
    console.log('Deleting edges:', edgesToDelete);
    setEdges((eds) => eds.filter((edge) => !edgesToDelete.find((del) => del.id === edge.id)));
  }, [setEdges]);

  // Handle manual edge deletion with keyboard
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      // Get selected edges and delete them
      const selectedEdges = edges.filter(edge => edge.selected);
      if (selectedEdges.length > 0) {
        console.log('Deleting selected edges with keyboard:', selectedEdges);
        onEdgesDelete(selectedEdges);
      }
    }
  }, [edges, onEdgesDelete]);

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  // Connection validation function
  const isValidConnection = useCallback((connection: Connection) => {
    // Prevent self-connections
    if (connection.source === connection.target) {
      return false;
    }

    // Prevent duplicate connections
    const isDuplicate = edges.some(edge => 
      edge.source === connection.source && 
      edge.target === connection.target &&
      edge.sourceHandle === connection.sourceHandle &&
      edge.targetHandle === connection.targetHandle
    );

    if (isDuplicate) {
      return false;
    }

    // Add more business logic rules here if needed
    // For example: prevent certain node types from connecting to each other
    
    return true;
  }, [edges]);

  // Handle opening config modal for a specific channel
  const handleConfigChannel = (channelNode: any) => {
    // Convert channel node data to the format expected by ConfigModal
    const channelTypeData = {
      id: channelNode.channelType || channelNode.type,
      name: channelNode.channelType ? channelNode.channelType.charAt(0).toUpperCase() + channelNode.channelType.slice(1) : 'Channel',
      description: `Configure your ${channelNode.channelType || 'channel'} settings`,
      icon: getChannelTypeIcon(channelNode.channelType),
      color: getChannelTypeColor(channelNode.channelType)
    };
    
    setSelectedChannelForConfig({
      ...channelTypeData,
      nodeId: channelNode.id,
      currentData: channelNode
    });
    setIsConfigModalOpen(true);
  };

  // Helper functions for channel type display
  const getChannelTypeIcon = (type: string) => {
    switch (type) {
      case 'whatsapp': return <Image src="/images/icons/whatsapp-icon.svg" alt="WhatsApp" width={20} height={20} />; //WHATSAPP ICON
      case 'instagram': return <Image src="/images/icons/instagram-icon.svg" alt="Instagram" width={20} height={20} />; //INSTAGRAM ICON
      case 'messenger': return <Image src="/images/icons/messenger-icon.svg" alt="Messenger" width={20} height={20} />; //MESSENGER ICON
      case 'telegram': return <Image src="/images/icons/telegram-icon.svg" alt="Telegram" width={20} height={20} />;
      case 'voice': return <Image src="/images/icons/microphone-icon.svg" alt="Voice" width={20} height={20} />;
      case 'webchat': return <Image src="/images/icons/globe-icon.svg" alt="WebChat" width={20} height={20} />;
      default: return ;
    }
  };

  const getChannelTypeColor = (type: string) => {
    switch (type) {
      case 'whatsapp': return 'text-green-600';
      case 'telegram': return 'text-blue-600';
      case 'webchat': return 'text-purple-600';
      case 'sms': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  // Handle saving channel configuration
  const handleSaveChannelConfig = (configData: any) => {
    console.log('Saving channel config:', configData);
    
    // Get the node ID from the selected channel config
    const nodeId = selectedChannelForConfig?.nodeId || selectedChannelForConfig?.id;
    
    // Update the node data with configuration
    setNodes((nds) => 
      nds.map(node => {
        if (node.id === nodeId) {
          // Update the onConfig callback to include new data
          const updatedData = {
            ...node.data,
            ...configData,
            configured: true,
            onConfig: () => handleConfigChannel({ 
              id: nodeId,
              ...node.data,
              ...configData
            })
          };
          
          return {
            ...node,
            data: updatedData
          };
        }
        return node;
      })
    );
    setIsConfigModalOpen(false);
    setSelectedChannelForConfig(null);
  };

  const handleAddChannel = (channelData: any) => {
    const newChannelId = `${channelData.type}-${Date.now()}`;
    const addChannelNodeId = 'add-channel-1';
    const userAgentNodeId = 'agent-1';
    
    // Find current add-channel node position
    const addChannelNode = nodes.find(node => node.id === addChannelNodeId);
    const currentAddChannelPosition = addChannelNode?.position || { x: -250, y: 300 };
    
    // Find all existing channel nodes (not add-channel, add-follow-up, add-tools, or user-agent)
    const existingChannels = nodes.filter(node => 
      !['add-channel-1', 'add-follow-up-1', 'add-tools-1', 'agent-1'].includes(node.id)
    );
    
    // Create a new channel node at the current add-channel position
    const newChannelNode = {
      id: newChannelId,
      type: 'channel', // Use whatsapp node type for all channels for now
      position: { ...currentAddChannelPosition },
      connectable: true,
      draggable: true,
      data: { 
        label: channelData.name,
        status: 'active',
        channelType: channelData.type,
        onConfig: () => handleConfigChannel({ 
          id: newChannelId, 
          channelType: channelData.type,
          name: channelData.name,
          label: channelData.name,
          accessToken: channelData.accessToken,
          ...channelData 
        })
      }
    };
    
    // Update nodes: add new channel and move add-channel node
    setNodes((nds) => {
      return nds.map(node => {
        if (node.id === addChannelNodeId) {
          // Move add-channel node further down
          return {
            ...node,
            position: {
              x: currentAddChannelPosition.x,
              y: currentAddChannelPosition.y + 150
            }
          };
        }
        return node;
      }).concat([newChannelNode]);
    });
    
    // Update edges: create connections
    setEdges((eds) => {
      // Find what was previously connected to add-channel node
      const incomingEdgeToAddChannel = eds.find(edge => edge.target === addChannelNodeId);
      
      // Remove old edge that was going to add-channel
      const filteredEdges = eds.filter(edge => edge.target !== addChannelNodeId);
      
      // Determine source for new channel connection
      let sourceNodeId = userAgentNodeId;
      let sourceHandle = 'left';
      
      if (incomingEdgeToAddChannel) {
        sourceNodeId = incomingEdgeToAddChannel.source;
        sourceHandle = incomingEdgeToAddChannel.sourceHandle || 'bottom';
      }
      
      // Add new edges
      const newEdges = [
        // Connect source (user-agent or last channel) to new channel
        {
          id: `${sourceNodeId}-${newChannelId}`,
          source: sourceNodeId,
          sourceHandle: sourceHandle,
          target: newChannelId,
          targetHandle: 'top',
          type: 'smoothstep',
          style: { stroke: '#6940E4', strokeWidth: 3 },
          animated: false,
          deletable: true,
          selectable: true,
          focusable: true
        },
        // Connect new channel to add-channel node
        {
          id: `${newChannelId}-${addChannelNodeId}`,
          source: newChannelId,
          sourceHandle: 'bottom',
          target: addChannelNodeId,
          targetHandle: 'top',
          type: 'smoothstep',
          style: { stroke: '#6940E4', strokeWidth: 3 },
          animated: false,
          deletable: true,
          selectable: true,
          focusable: true
        }
      ];
      
      return [...filteredEdges, ...newEdges];
    });
    
    console.log('Channel added and connected:', {
      channelData,
      newChannelId,
      existingChannelsCount: existingChannels.length
    });
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    if (node.id === 'add-channel-1') {
      setIsChannelModalOpen(true);
    }
  }, []);

  // Handle edge click for selection
  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    console.log('Edge clicked:', edge);
    // The edge will be automatically selected by React Flow
  }, []);

  // Handle edge context menu (right-click)
  const onEdgeContextMenu = useCallback((event: React.MouseEvent, edge: Edge) => {
    event.preventDefault();
    if (window.confirm(`Delete connection from ${edge.source} to ${edge.target}?`)) {
      onEdgesDelete([edge]);
    }
  }, [onEdgesDelete]);
 
  return (
    <div className="min-h-screen auth-dark-gradient flex">
        {/* Sidebar */}
        <Sidebar activeItem={activeItem} onItemSelect={setActiveItem} />
      <main className="flex-1">
        {/* Instructions */}
        {/* <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg max-w-sm">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Connection Controls:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• <strong>Click</strong> an edge to select it</li>
            <li>• <strong>Delete/Backspace</strong> to delete selected edge</li>
            <li>• <strong>Right-click</strong> an edge for quick delete</li>
            <li>• <strong>Drag</strong> from handles to create connections</li>
          </ul>
        </div> */}

        <div className="w-full h-screen">
          <ReactFlow
            
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onReconnect={onReconnect}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onEdgeContextMenu={onEdgeContextMenu}
            onEdgesDelete={onEdgesDelete}
            isValidConnection={isValidConnection}
            nodeTypes={nodeTypes}
            fitView
            // defaultZoom={0.75}
            minZoom={0.1}
            maxZoom={2}
            snapToGrid={true}
            snapGrid={[15, 15]}
            connectionLineType="smoothstep"
            connectionLineStyle={{ stroke: '#8B5CF6', strokeWidth: 3 }}
            deleteKeyCode={["Delete", "Backspace"]}
            selectionKeyCode="Shift"
            multiSelectionKeyCode="Shift"
            panOnDrag={true}
            selectNodesOnDrag={false}
            reconnectRadius={20}
            defaultEdgeOptions={{
              type: 'smoothstep',
              style: { 
                stroke: '#8B5CF6', 
                strokeWidth: 3,
                cursor: 'pointer'
              },
              deletable: true,
              selectable: true,
              focusable: true
            }}
            elementsSelectable={true}
            // edgesSelectable={true}
            nodesConnectable={true}
            nodesDraggable={true}
            // edgesUpdatable={true}
            edgesFocusable={true}
          >
            <Background style={{ backgroundColor: '#f5f7fa' }} className="bg-[#f5f7fa] dark:bg-[#1A1A1A]"/>
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

        {/* Config Modal */}
        <ConfigModal
          isOpen={isConfigModalOpen}
          onClose={() => {
            setIsConfigModalOpen(false);
            setSelectedChannelForConfig(null);
          }}
          onSave={handleSaveChannelConfig}
          channelType={selectedChannelForConfig}
        />
       
      </div>
  );
}
