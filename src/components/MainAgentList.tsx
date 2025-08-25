'use client';

import React, { useEffect, useState } from 'react';
import ListAgentView from './ListAgentView';
import GridAgentView from './GridAgentView';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { toast } from 'react-hot-toast';

interface Agent {
    id: number;
    name: string;
    description: string;
    lastModified: string;
    status: 'live' | 'on-hold';
    ragFiles: number;
  }

export default function MainAgentList() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    agentId: number | null;
    agentName: string;
  }>({
    isOpen: false,
    agentId: null,
    agentName: ''
  });

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/agents-list');
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error:', errorData);
          setAgents([]); // Set empty array on error
          return;
        }
        
        const data = await response.json();
        console.log('🎯 Agents data:', data);
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setAgents(data);
        } else {
          console.error('API returned non-array data:', data);
          setAgents([]);
        }
      } catch (error) {
        console.error('Error fetching agents:', error);
        setAgents([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);
  
         const filteredAgents = (agents || []).filter((agent: Agent) =>
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

      const handleDeleteClick = (agentId: number, agentName: string) => {
        setDeleteModal({
          isOpen: true,
          agentId,
          agentName
        });
      };

             const handleDeleteConfirm = async () => {
         if (!deleteModal.agentId) return;

         try {
           const response = await fetch(`/api/agents-list/${deleteModal.agentId}`, {
             method: 'DELETE',
           });

           if (response.ok) {
             // Remove the agent from the local state
             setAgents(prevAgents => prevAgents.filter(agent => agent.id !== deleteModal.agentId));
             // Remove from selected agents if it was selected
             setSelectedAgents(prev => prev.filter(id => id !== deleteModal.agentId));
             
             // Show success message
             console.log('✅ Agent deleted successfully!');
             // alert(`Agent "${deleteModal.agentName}" has been deleted successfully.`);
             toast.success(`Agent "${deleteModal.agentName}" has been deleted successfully.`);
           } else {
             const errorData = await response.json();
             console.error('Failed to delete agent:', errorData);
             // alert('Failed to delete agent. Please try again.');
             toast.error('Failed to delete agent. Please try again.');
           }
         } catch (error) {
           console.error('Error deleting agent:', error);
           // alert('An error occurred while deleting the agent. Please try again.');
           toast.error('An error occurred while deleting the agent. Please try again.');
         } finally {
           setDeleteModal({ isOpen: false, agentId: null, agentName: '' });
         }
       };

      const handleDeleteCancel = () => {
        setDeleteModal({ isOpen: false, agentId: null, agentName: '' });
      };

      
const overviewData = [
    {
      title: 'Total Agents',
      count: '24',
      description: 'Vs 17 last month',
      icon: '/images/icons/user-group.svg',
      isBackgroundColor: false
    },
    {
      title: 'Live Agents',
      count: '16',
      description: 'Vs 12 last month',
      icon: '/images/icons/user-multiple-agent.svg',
      isBackgroundColor: false
    },
    {
      title: 'Total Channels',
      count: '32',
      description: 'Vs 24 last month',
      icon: '/images/icons/channel.svg',
      isBackgroundColor: false
    },
    {
      title: 'Tools',
      count: '36',
      description: 'Vs 32 last month',
      icon: '/images/icons/tool.svg',
      isBackgroundColor: false
    }
  ]
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

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-[#2A2A2A] rounded-md p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Content */}
    {loading ? (
      /* Loading State */
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading agents...</p>
        </div>
      </div>
    ) : viewMode === 'list' ? (
      /* Table View */
      <ListAgentView 
        agents={sortedAgents} 
        selectedAgents={selectedAgents} 
        handleSelectAll={handleSelectAll} 
        handleSelectAgent={handleSelectAgent}
        onDeleteClick={handleDeleteClick}
      />
    ) : (
      /* Grid View */
      <GridAgentView 
        agents={sortedAgents} 
        selectedAgents={selectedAgents} 
        handleSelectAll={handleSelectAll} 
        handleSelectAgent={handleSelectAgent} 
        overviewData={overviewData}
        onDeleteClick={handleDeleteClick}
      />
    )}

    {/* Delete Confirmation Modal */}
    <DeleteConfirmationModal
      isOpen={deleteModal.isOpen}
      onClose={handleDeleteCancel}
      onConfirm={handleDeleteConfirm}
      title="Delete Agent"
      message="Are you sure you want to delete this agent?"
      itemName={deleteModal.agentName}
    />
  </div>
  );
}
