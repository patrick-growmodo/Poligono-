"use client";

import Image from "next/image";
import AgentDetail from "@/components/AgentDetail";
import ChannelNode from "@/components/nodes/ChannelNode";
import UserAgentNode from "@/components/nodes/UserAgentNode";
import AddChannelNode from "@/components/nodes/AddChannelNode";
import AddFollowUpNode from "@/components/nodes/AddFollowUpNode";
import FollowUpNode from "@/components/nodes/FollowUpNode";
import AddToolsNode from "@/components/nodes/AddToolsNode";
import ToolsNode from "@/components/nodes/ToolsNode";
import ChannelModal from "@/components/modals/ChannelModal";
import ConfigModal from "@/components/modals/ConfigModal";
import FollowUpModal from "@/components/modals/FollowUpModal";
import ToolsModal from "@/components/modals/ToolsModal";

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
  followUp: FollowUpNode, //FOLLOW UP ACTION NODE
  addTools: AddToolsNode, //ADD TOOLS BUTTON
  tools: ToolsNode, //TOOLS NODE
};

// const initialNodes = [
//   {  
//     id: 'agent-dynamic',  // This will be replaced with the actual agent ID
//     type: 'useragent',
//     position: { x: 100, y: 50 }, 
//     connectable: true,
//     draggable: true,
//     reconnectable: 'source',
//     data: { 
//       name: 'Loading...',
//       description: 'Loading agent data...',
//       role: 'Central Agent',
//       avatarUrl: '/images/gallery/profile-1.png'
//     } 
//   },

//   { 
//     id: 'add-channel-1', 
//     type: 'addChannel',
//     position: { x: -250, y: 300 }, 
//     connectable: true,
//     draggable: true,
//     data: { label: 'Add Channel' } 
//   }, 
//   { 
//     id: 'add-follow-up-1', 
//     type: 'addFollowUp',
//     connectable: true,
//     draggable: true,
//     position: { x: 136, y: 300 }, 
//     data: { 
//       label: 'Add Follow Up',
//       onClick: () => {} // Will be set dynamically
//     } 
//   },
//   { 
//     id: 'add-tools-1', 
//     type: 'addTools',
//     position: { x: 500, y: 300 }, 
//     connectable: true,
//     draggable: true,
//     data: { label: 'Add Tools' } 
//   },
// ];
// const initialEdges = [
//   { 
//     id: 'agent-dynamic-add-channel-1', 
//     source: 'agent-dynamic',
//     sourceHandle: 'left',
//     target: 'add-channel-1',
//     targetHandle: 'top',
//     type: 'smoothstep',
//     style: { stroke: '#6940E4', strokeWidth: 3 },
//     deletable: true,
//     selectable: true,
//     focusable: true
//   },
//   { 
//     id: 'agent-dynamic-add-follow-up-1', 
//     source: 'agent-dynamic',
//     sourceHandle: 'bottom', 
//     target: 'add-follow-up-1',
//     targetHandle: 'top',
//     type: 'smoothstep',
//     style: { stroke: '#DA46F8', strokeWidth: 3 },
//     deletable: true,
//     selectable: true,
//     focusable: true
//   },
//   { 
//     id: 'agent-dynamic-add-tools-1', 
//     source: 'agent-dynamic',
//     sourceHandle: 'right',
//     target: 'add-tools-1',
//     targetHandle: 'top',
//     type: 'smoothstep',
//     style: { stroke: '#616161', strokeWidth: 3 },
//     deletable: true,
//     selectable: true,
//     focusable: true
//   }
// ];
 

export default function EditAgent({ params }: { params: { id: string } }) {

 
  const [loading, setLoading] = useState(false);
  const [agentData, setAgentData] = useState<any>(null);

  useEffect(() => {
    const fetchSpecificAgent = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/agents-list/${params.id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error:', errorData);
          return;
        }
        
        const data = await response.json();
        setAgentData(data); // Store the fetched data
        
      } catch (error) {
        console.error('Error fetching agents:', error);
     
      } finally {
        setLoading(false);
      }
    };
    fetchSpecificAgent();
  }, [params.id]);
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  // Update nodes when agent data is fetched
  useEffect(() => {
    if (agentData) {
      setNodes([
        {  
          id: params.id,
          type: 'useragent',
          position: { x: 100, y: 50 }, 
          connectable: true,
          draggable: true,
          reconnectable: 'source',
          data: { 
            name: agentData.name || 'Unknown Agent',
            description: agentData.description || 'No description',
            role: agentData.role || 'No role',
            avatarUrl: agentData.profile_photo || '/images/gallery/profile-1.png',
          } 
        }
      ]);
    }
  }, [agentData, params.id, setNodes]);
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


  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [isToolsModalOpen, setIsToolsModalOpen] = useState(false);

  const [selectedChannelForConfig, setSelectedChannelForConfig] = useState<any>(null);

  // Debug: Log edges when they change
  useEffect(() => {
    // console.log('Current edges:', edges);
  }, [edges]);

  // Update node onClick handlers when component mounts
  useEffect(() => {
    setNodes((nds) => 
      nds.map(node => {
        if (node.id === 'add-follow-up-1') {
          return {
            ...node,
            data: {
              ...node.data,
              onClick: handleOpenFollowUpModal
            }
          };
        }
        if (node.id === 'add-tools-1') {
          return {
            ...node,
            data: {
              ...node.data,
              onClick: handleOpenToolsModal
            }
          };
        }
        return node;
      })
    );
  }, []);

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
    
    const configData = {
      ...channelTypeData,
      nodeId: channelNode.id,
      currentData: channelNode
    };
    
    setSelectedChannelForConfig(configData);
    setIsConfigModalOpen(true);
  };

  // Handle opening follow-up modal
  const handleOpenFollowUpModal = () => {
    setIsFollowUpModalOpen(true);
  };

  // Handle opening tools modal
  const handleOpenToolsModal = () => {
    setIsToolsModalOpen(true);
  };

  // Handle adding follow-up action
  const handleAddFollowUp = (followUpData: any) => {
    
    const newFollowUpId = `${followUpData.type}-${Date.now()}`;
    const addFollowUpNodeId = 'add-follow-up-1';
    const userAgentNodeId = 'agent-1';
    
    // Find current add-follow-up node position
    const addFollowUpNode = nodes.find(node => node.id === addFollowUpNodeId);
    const currentAddFollowUpPosition = addFollowUpNode?.position || { x: 136, y: 300 };
    
    // Create a new follow-up node at the current add-follow-up position
    const newFollowUpNode = {
      id: newFollowUpId,
      type: 'followUp', // We'll create this node type
      position: { ...currentAddFollowUpPosition },
      connectable: true,
      draggable: true,
      data: { 
        label: followUpData.name,
        name: followUpData.name,
        actionType: followUpData.type,
        webhookUrl: followUpData.webhookUrl,
        delay: followUpData.delay,
        status: 'active',
        configured: true,
        description: followUpData.description,
        icon: followUpData.icon,
        color: followUpData.color,
        onConfig: () => handleConfigFollowUp({
          id: newFollowUpId,
          ...followUpData
        }),
        onDelete: () => handleDeleteFollowUp(newFollowUpId)
      }
    };
    
    // Update nodes: add new follow-up and move add-follow-up node
    setNodes((nds) => {
      return nds.map(node => {
        if (node.id === addFollowUpNodeId) {
          // Move add-follow-up node further down
          return {
            ...node,
            position: {
              x: currentAddFollowUpPosition.x,
              y: currentAddFollowUpPosition.y + 150
            }
          };
        }
        return node;
      }).concat([newFollowUpNode]);
    });
    
    // Update edges: create connections
    setEdges((eds) => {
      // Find what was previously connected to add-follow-up node
      const incomingEdgeToAddFollowUp = eds.find(edge => edge.target === addFollowUpNodeId);
      
      // Remove old edge that was going to add-follow-up
      const filteredEdges = eds.filter(edge => edge.target !== addFollowUpNodeId);
      
      // Determine source for new follow-up connection
      let sourceNodeId = userAgentNodeId;
      let sourceHandle = 'bottom';
      
      if (incomingEdgeToAddFollowUp) {
        sourceNodeId = incomingEdgeToAddFollowUp.source;
        sourceHandle = incomingEdgeToAddFollowUp.sourceHandle || 'bottom';
      }
      
      // Add new edges
      const newEdges = [
        // Connect source (user-agent or last follow-up) to new follow-up
        {
          id: `${sourceNodeId}-${newFollowUpId}`,
          source: sourceNodeId,
          sourceHandle: sourceHandle,
          target: newFollowUpId,
          targetHandle: 'top',
          type: 'smoothstep',
          style: { stroke: '#DA46F8', strokeWidth: 3 },
          animated: false,
          deletable: true,
          selectable: true,
          focusable: true
        },
        // Connect new follow-up to add-follow-up node
        {
          id: `${newFollowUpId}-${addFollowUpNodeId}`,
          source: newFollowUpId,
          sourceHandle: 'bottom',
          target: addFollowUpNodeId,
          targetHandle: 'top',
          type: 'smoothstep',
          style: { stroke: '#DA46F8', strokeWidth: 3 },
          animated: false,
          deletable: true,
          selectable: true,
          focusable: true
        }
      ];
      
      return [...filteredEdges, ...newEdges];
    });
    
    setIsFollowUpModalOpen(false);
  };

  // Handle adding tool integration
  const handleAddTool = (toolData: any) => {
    console.log('Adding tool:', toolData);
    
    const newToolId = `${toolData.type}-${Date.now()}`;
    const addToolsNodeId = 'add-tools-1';
    const userAgentNodeId = 'agent-1';
    
    // Find current add-tools node position
    const addToolsNode = nodes.find(node => node.id === addToolsNodeId);
    const currentAddToolsPosition = addToolsNode?.position || { x: 500, y: 300 };
    
    // Create a new tool node at the current add-tools position
    const newToolNode = {
      id: newToolId,
      type: 'tools',
      position: { ...currentAddToolsPosition },
      connectable: true,
      draggable: true,
      data: { 
        label: toolData.name,
        name: toolData.name,
        actionType: toolData.type, // Changed from 'type' to 'actionType' to match ToolsNode interface
        apiKey: toolData.apiKey,
        status: 'active',
        configured: true,
        description: toolData.description,
        icon: toolData.icon,
        color: toolData.color,
        onConfig: () => handleConfigTool({
          id: newToolId,
          ...toolData
        }),
        onDelete: () => handleDeleteTool(newToolId)
      }
    };
    
    // Update nodes: add new tool and move add-tools node
    setNodes((nds) => {
      return nds.map(node => {
        if (node.id === addToolsNodeId) {
          // Move add-tools node further down
          return {
            ...node,
            position: {
              x: currentAddToolsPosition.x,
              y: currentAddToolsPosition.y + 150
            }
          };
        }
        return node;
      }).concat([newToolNode]);
    });
    
    // Update edges: create connections
    setEdges((eds) => {
      // Find what was previously connected to add-tools node
      const incomingEdgeToAddTools = eds.find(edge => edge.target === addToolsNodeId);
      
      // Remove old edge that was going to add-tools
      const filteredEdges = eds.filter(edge => edge.target !== addToolsNodeId);
      
      // Determine source for new tool connection
      let sourceNodeId = userAgentNodeId;
      let sourceHandle = 'right';
      
      if (incomingEdgeToAddTools) {
        sourceNodeId = incomingEdgeToAddTools.source;
        sourceHandle = incomingEdgeToAddTools.sourceHandle || 'right';
      }
      
      // Add new edges
      const newEdges = [
        // Connect source (user-agent or last tool) to new tool
        {
          id: `${sourceNodeId}-${newToolId}`,
          source: sourceNodeId,
          sourceHandle: sourceHandle,
          target: newToolId,
          targetHandle: 'top',
          type: 'smoothstep',
          style: { stroke: '#616161', strokeWidth: 3 },
          animated: false,
          deletable: true,
          selectable: true,
          focusable: true
        },
        // Connect new tool to add-tools node
        {
          id: `${newToolId}-${addToolsNodeId}`,
          source: newToolId,
          sourceHandle: 'bottom',
          target: addToolsNodeId,
          targetHandle: 'top',
          type: 'smoothstep',
          style: { stroke: '#616161', strokeWidth: 3 },
          animated: false,
          deletable: true,
          selectable: true,
          focusable: true
        }
      ];
      
      return [...filteredEdges, ...newEdges];
    });
    
    setIsToolsModalOpen(false);
  };

  // Handle deleting a channel node
  const handleDeleteChannel = (channelId: string) => {
    // Remove the channel node and get updated nodes
    setNodes((nds) => {
      const updatedNodes = nds.filter(node => node.id !== channelId);
      
      // Remove all edges connected to this channel and reconnect workflow
      setEdges((eds) => {
        // Remove edges connected to the deleted channel
        const filteredEdges = eds.filter(edge => 
          edge.source !== channelId && edge.target !== channelId
        );
        
        // Find the add-channel node
        const addChannelNode = updatedNodes.find(node => node.id === 'add-channel-1');
        if (!addChannelNode) return filteredEdges;
        
        // Find any remaining channel nodes and sort by y-position
        const remainingChannels = updatedNodes
          .filter(node => node.type === 'channel' && node.id !== channelId)
          .sort((a, b) => a.position.y - b.position.y);
        
        // Remove all existing channel-related edges
        const edgesWithoutChannels = filteredEdges.filter(edge => 
          !(edge.source === 'agent-1' && edge.target === 'add-channel-1') &&
          !(edge.target === 'add-channel-1' && remainingChannels.some(ch => ch.id === edge.source)) &&
          !(edge.source === 'agent-1' && remainingChannels.some(ch => ch.id === edge.target)) &&
          !(remainingChannels.some(ch1 => remainingChannels.some(ch2 => 
            edge.source === ch1.id && edge.target === ch2.id
          )))
        );
        
        const newEdges = [];
        
        if (remainingChannels.length > 0) {
          // Connect agent to first channel
          newEdges.push({
            id: `agent-1-${remainingChannels[0].id}`,
            source: 'agent-1',
            sourceHandle: 'left',
            target: remainingChannels[0].id,
            targetHandle: 'top',
            type: 'smoothstep',
            style: { stroke: '#6940E4', strokeWidth: 3 },
            animated: false,
            deletable: true,
            selectable: true,
            focusable: true
          });
          
          // Connect channels in sequence
          for (let i = 0; i < remainingChannels.length - 1; i++) {
            newEdges.push({
              id: `${remainingChannels[i].id}-${remainingChannels[i + 1].id}`,
              source: remainingChannels[i].id,
              sourceHandle: 'bottom',
              target: remainingChannels[i + 1].id,
              targetHandle: 'top',
              type: 'smoothstep',
              style: { stroke: '#6940E4', strokeWidth: 3 },
              animated: false,
              deletable: true,
              selectable: true,
              focusable: true
            });
          }
          
          // Connect last channel to add-channel
          newEdges.push({
            id: `${remainingChannels[remainingChannels.length - 1].id}-add-channel-1`,
            source: remainingChannels[remainingChannels.length - 1].id,
            sourceHandle: 'bottom',
            target: 'add-channel-1',
            targetHandle: 'top',
            type: 'smoothstep',
            style: { stroke: '#6940E4', strokeWidth: 3 },
            animated: false,
            deletable: true,
            selectable: true,
            focusable: true
          });
        } else {
          // No remaining channels, connect agent directly to add-channel
          newEdges.push({
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
          });
        }
        
        return [...edgesWithoutChannels, ...newEdges];
      });
      
      return updatedNodes;
    });
  };

  // Handle opening follow-up config modal
  const handleConfigFollowUp = (followUpData: any) => {
    console.log('handleConfigFollowUp called with:', followUpData);
    
    // Convert follow-up data to the format expected by ConfigModal
    const followUpTypeData = {
      id: followUpData.actionType || followUpData.type,
      name: followUpData.actionType ? followUpData.actionType.split('-').map((word: string) => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ') : 'Follow-Up Action',
      description: `Configure your ${followUpData.actionType || 'follow-up'} action settings`,
      icon: getFollowUpActionIcon(followUpData.actionType),
      color: getFollowUpActionColor(followUpData.actionType)
    };
    
    const configData = {
      ...followUpTypeData,
      nodeId: followUpData.id,
      currentData: followUpData
    };
    
    setSelectedChannelForConfig(configData);
    setIsConfigModalOpen(true);
  };

  // Handle opening tool config modal
  const handleConfigTool = (toolData: any) => {
    console.log('handleConfigTool called with:', toolData);
    
    // Convert tool data to the format expected by ConfigModal
    const toolTypeData = {
      id: toolData.type || 'tool',
      name: toolData.type ? toolData.type.charAt(0).toUpperCase() + toolData.type.slice(1) : 'Tool',
      description: `Configure your ${toolData.type || 'tool'} integration settings`,
      icon: toolData.icon,
      color: toolData.color
    };
    
    const configData = {
      ...toolTypeData,
      nodeId: toolData.id,
      currentData: toolData
    };
    
    setSelectedChannelForConfig(configData);
    setIsConfigModalOpen(true);
  };



  // Handle deleting a follow-up node
  const handleDeleteFollowUp = (followUpId: string) => {
    // Remove the follow-up node and get updated nodes
    setNodes((nds) => {
      const updatedNodes = nds.filter(node => node.id !== followUpId);
      
      // Remove all edges connected to this follow-up and reconnect workflow
      setEdges((eds) => {
        // Remove edges connected to the deleted follow-up
        const filteredEdges = eds.filter(edge => 
          edge.source !== followUpId && edge.target !== followUpId
        );
        
        // Find the add-follow-up node
        const addFollowUpNode = updatedNodes.find(node => node.id === 'add-follow-up-1');
        if (!addFollowUpNode) return filteredEdges;
        
        // Find any remaining follow-up nodes and sort by y-position
        const remainingFollowUps = updatedNodes
          .filter(node => node.type === 'followUp' && node.id !== followUpId)
          .sort((a, b) => a.position.y - b.position.y);
      
      // Remove all existing follow-up-related edges
      const edgesWithoutFollowUps = filteredEdges.filter(edge => 
        !(edge.source === 'agent-1' && edge.target === 'add-follow-up-1') &&
        !(edge.target === 'add-follow-up-1' && remainingFollowUps.some(fu => fu.id === edge.source)) &&
        !(edge.source === 'agent-1' && remainingFollowUps.some(fu => fu.id === edge.target)) &&
        !(remainingFollowUps.some(fu1 => remainingFollowUps.some(fu2 => 
          edge.source === fu1.id && edge.target === fu2.id
        )))
      );
      
      const newEdges = [];
      
      if (remainingFollowUps.length > 0) {
        // Connect agent to first follow-up
        newEdges.push({
          id: `agent-1-${remainingFollowUps[0].id}`,
          source: 'agent-1',
          sourceHandle: 'bottom',
          target: remainingFollowUps[0].id,
          targetHandle: 'top',
          type: 'smoothstep',
          style: { stroke: '#DA46F8', strokeWidth: 3 },
          animated: false,
          deletable: true,
          selectable: true,
          focusable: true
        });
        
        // Connect follow-ups in sequence
        for (let i = 0; i < remainingFollowUps.length - 1; i++) {
          newEdges.push({
            id: `${remainingFollowUps[i].id}-${remainingFollowUps[i + 1].id}`,
            source: remainingFollowUps[i].id,
            sourceHandle: 'bottom',
            target: remainingFollowUps[i + 1].id,
            targetHandle: 'top',
            type: 'smoothstep',
            style: { stroke: '#DA46F8', strokeWidth: 3 },
            animated: false,
            deletable: true,
            selectable: true,
            focusable: true
          });
        }
        
        // Connect last follow-up to add-follow-up
        newEdges.push({
          id: `${remainingFollowUps[remainingFollowUps.length - 1].id}-add-follow-up-1`,
          source: remainingFollowUps[remainingFollowUps.length - 1].id,
          sourceHandle: 'bottom',
          target: 'add-follow-up-1',
          targetHandle: 'top',
          type: 'smoothstep',
          style: { stroke: '#DA46F8', strokeWidth: 3 },
          animated: false,
          deletable: true,
          selectable: true,
          focusable: true
        });
      } else {
        // No remaining follow-ups, connect agent directly to add-follow-up
        newEdges.push({
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
        });
      }
      
      return [...edgesWithoutFollowUps, ...newEdges];
      });
      
      return updatedNodes;
    });
  };

  // Handle deleting a tool node
  const handleDeleteTool = (toolId: string) => {
    // Remove the tool node and get updated nodes
    setNodes((nds) => {
      const updatedNodes = nds.filter(node => node.id !== toolId);
      
      // Remove all edges connected to this tool and reconnect workflow
      setEdges((eds) => {
        // Remove edges connected to the deleted tool
        const filteredEdges = eds.filter(edge => 
          edge.source !== toolId && edge.target !== toolId
        );
        
        // Find the add-tools node
        const addToolsNode = updatedNodes.find(node => node.id === 'add-tools-1');
        if (!addToolsNode) return filteredEdges;
        
        // Find any remaining tool nodes and sort by y-position
        const remainingTools = updatedNodes
          .filter(node => node.type === 'tools' && node.id !== toolId)
          .sort((a, b) => a.position.y - b.position.y);
      
      // Remove all existing tool-related edges
      const edgesWithoutTools = filteredEdges.filter(edge => 
        !(edge.source === 'agent-1' && edge.target === 'add-tools-1') &&
        !(edge.target === 'add-tools-1' && remainingTools.some(tool => tool.id === edge.source)) &&
        !(edge.source === 'agent-1' && remainingTools.some(tool => tool.id === edge.target)) &&
        !(remainingTools.some(tool1 => remainingTools.some(tool2 => 
          edge.source === tool1.id && edge.target === tool2.id
        )))
      );
      
      const newEdges = [];
      
      if (remainingTools.length > 0) {
        // Connect agent to first tool
        newEdges.push({
          id: `agent-1-${remainingTools[0].id}`,
          source: 'agent-1',
          sourceHandle: 'right',
          target: remainingTools[0].id,
          targetHandle: 'top',
          type: 'smoothstep',
          style: { stroke: '#616161', strokeWidth: 3 },
          animated: false,
          deletable: true,
          selectable: true,
          focusable: true
        });
        
        // Connect tools in sequence
        for (let i = 0; i < remainingTools.length - 1; i++) {
          newEdges.push({
            id: `${remainingTools[i].id}-${remainingTools[i + 1].id}`,
            source: remainingTools[i].id,
            sourceHandle: 'bottom',
            target: remainingTools[i + 1].id,
            targetHandle: 'top',
            type: 'smoothstep',
            style: { stroke: '#616161', strokeWidth: 3 },
            animated: false,
            deletable: true,
            selectable: true,
            focusable: true
          });
        }
        
        // Connect last tool to add-tools
        newEdges.push({
          id: `${remainingTools[remainingTools.length - 1].id}-add-tools-1`,
          source: remainingTools[remainingTools.length - 1].id,
          sourceHandle: 'bottom',
          target: 'add-tools-1',
          targetHandle: 'top',
          type: 'smoothstep',
          style: { stroke: '#616161', strokeWidth: 3 },
          animated: false,
          deletable: true,
          selectable: true,
          focusable: true
        });
      } else {
        // No remaining tools, connect agent directly to add-tools
        newEdges.push({
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
        });
      }
      
      return [...edgesWithoutTools, ...newEdges];
      });
      
      return updatedNodes;
    });
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

  // Helper functions for follow-up action display
  const getFollowUpActionIcon = (type: string) => {
    switch (type) {
      case 'send-email':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'redirect-agent':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        );
      case 'trigger-next-agent':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'create-ticket':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
        );
      case 'schedule-reminder':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'webhook':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        );
    }
  };

  const getFollowUpActionColor = (type: string) => {
    switch (type) {
      case 'send-email': return 'text-blue-600';
      case 'redirect-agent': return 'text-green-600';
      case 'trigger-next-agent': return 'text-yellow-600';
      case 'create-ticket': return 'text-red-600';
      case 'schedule-reminder': return 'text-purple-600';
      case 'webhook': return 'text-indigo-600';
      default: return 'text-gray-600';
    }
  };

  // Handle saving channel configuration
  const handleSaveChannelConfig = (configData: any) => {
    console.log('Saving config:', configData);
    
    // Get the node ID from the selected config
    const nodeId = selectedChannelForConfig?.nodeId || selectedChannelForConfig?.id;
    
    // Update the node data with configuration
    setNodes((nds) => 
      nds.map(node => {
        if (node.id === nodeId) {
          // Check if this is a follow-up node or channel node
          const isFollowUpNode = node.type === 'followUp';
          
          if (isFollowUpNode) {
            // Handle follow-up node configuration
            const updatedData = {
              ...node.data,
              name: configData.name || node.data.name,
              delay: configData.delay || node.data.delay,
              webhookUrl: configData.webhookUrl || node.data.webhookUrl,
              configured: true,
              onConfig: () => handleConfigFollowUp({ 
                id: nodeId,
                ...node.data,
                name: configData.name || node.data.name,
                delay: configData.delay || node.data.delay,
                webhookUrl: configData.webhookUrl || node.data.webhookUrl
              }),
              onDelete: (node.data as any).onDelete // Preserve existing onDelete callback
            };
            
            return {
              ...node,
              data: updatedData
            };
          } else {
            // Handle channel node configuration
            const updatedData = {
              ...node.data,
              ...configData,
              configured: true,
              onConfig: () => handleConfigChannel({ 
                id: nodeId,
                ...node.data,
                ...configData
              }),
              onDelete: (node.data as any).onDelete // Preserve existing onDelete callback
            };
            
            return {
              ...node,
              data: updatedData
            };
          }
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
        name: channelData.name,
        accessToken: channelData.accessToken,
        status: 'active',
        channelType: channelData.type,
        configured: true,
        // Include other channel data but preserve the user-entered name
        description: channelData.description,
        icon: channelData.icon,
        color: channelData.color,
        onConfig: () => handleConfigChannel({ 
          id: newChannelId, 
          channelType: channelData.type,
          name: channelData.name,
          label: channelData.name,
          accessToken: channelData.accessToken,
          description: channelData.description,
          icon: channelData.icon,
          color: channelData.color
        }),
        onDelete: () => handleDeleteChannel(newChannelId)
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
  // const onEdgeContextMenu = useCallback((event: React.MouseEvent, edge: Edge) => {
  //   event.preventDefault();
  //   if (window.confirm(`Delete connection from ${edge.source} to ${edge.target}?`)) {
  //     onEdgesDelete([edge]);
  //   }
  // }, [onEdgesDelete]);
 
  return (
    <div className="flex-1">
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
            // onEdgeContextMenu={onEdgeContextMenu}
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
            <Background bgColor="#f5f7fa" className="dark:bg-[#1A1A1A]"/>
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

      {/* Follow-Up Modal */}
      <FollowUpModal
        isOpen={isFollowUpModalOpen}
        onClose={() => setIsFollowUpModalOpen(false)}
        onAddFollowUp={handleAddFollowUp}
      />

      {/* Tools Modal */}
      <ToolsModal
        isOpen={isToolsModalOpen}
        onClose={() => setIsToolsModalOpen(false)}
        onAddTool={handleAddTool}
      />
    </div>
  );
}
