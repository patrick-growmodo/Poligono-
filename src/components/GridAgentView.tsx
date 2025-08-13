'use client';

import React, { useState } from 'react';
import AgentOverviewCard from './AgentOverviewCard';
import Image from 'next/image';

export default function GridAgentView( { agents, selectedAgents, handleSelectAll, handleSelectAgent, overviewData  }: { agents: any[], selectedAgents: any[], handleSelectAll: any, handleSelectAgent: any, overviewData: any[] } ) { 
    return (
      <div className="p-[8px_20px]">
      <div className="flex gap-[24px]">
           {overviewData.map((item, index) => (
             <AgentOverviewCard key={index} title={item.title} count={item.count} icon={item.icon} isBackgroundColor={item.isBackgroundColor} description={item.description} />
           ))}
          
         </div>   
           {/* Grid Header */}
           <div className='flex items-center justify-between mt-[16px] py-[18px] text-[18px] font-inter font-medium tracking-[-0.6%] leading-[20px] dark:text-white'>
           Agents overview
           </div>
   
           {/* Grid Cards */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {agents.map((agent) => (
               <div 
                 key={agent.id} 
                 className="bg-white dark:bg-[#2A2A2A] rounded-lg border border-gray-200 dark:border-gray-600 p-[20px] hover:shadow-lg transition-shadow"
               >
                 {/* Card Header */}
                 <div className="flex items-start justify-between mb-[17px]">
                   <div className="flex items-center gap-[15px]">
                     {/* <input
                       type="checkbox"
                       checked={selectedAgents.includes(agent.id)}
                       onChange={(e) => handleSelectAgent(agent.id, e.target.checked)}
                       className="w-4 h-4 rounded-md border-2 border-gray-400 bg-gray-600 text-white focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 checked:bg-gray-600 checked:border-gray-400 checked:hover:bg-gray-500 hover:bg-gray-500 transition-all duration-200 shadow-sm"
                     /> */}
                     <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                       {agent.name.charAt(0)}
                     </div>
                     <div>
                     <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-[6px]">{agent.name}</h3>
                     <div className="flex items-center justify-between">
         
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
                      </div>
                     </div>
                   </div>
                   <span className="text-sm text-gray-500 dark:text-gray-400">
                   <Image src="/images/icons/three-dots-dark.svg" alt="eye" width={20} height={20} className="dark:hidden" />
                   <Image src="/images/icons/three-dots.svg" alt="eye" width={20} height={20} className="hidden dark:block" />
                   </span>
                 </div>
   
                 {/* Card Content */}
                 <div className="space-y-3 mb-[17px]">
                   <div className="flex items-center justify-between">
                     <span className="text-[14px] font-normal text-gray-600 dark:text-gray-300">
                       <span className="font-normal">{agent.content}</span> 
                     </span>
                   </div>
                 </div>
                    {/* Agent Details Sections */}
                   <div className="space-y-4">
                     {/* Channels Section */}
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                       <div className="p-[6px] bg-[#F5F7FA] rounded-[4px] dark:bg-[#333]">
                          <Image src="/images/icons/channel-card-icon.svg" 
                          alt="channels" width={12} height={12} className="dark:invert" />
                        </div>
                         <span className="text-sm text-gray-600 dark:text-gray-300">Channels</span>
                       </div>
                       <span className="text-sm font-medium text-gray-900 dark:text-white">2</span>
                     </div>

                     {/* Tools Section */}
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                        <div className="p-[6px] bg-[#F5F7FA] rounded-[4px] dark:bg-[#333]">
                          <Image src="/images/icons/tool-card-icon.svg"
                           alt="tools" width={14} height={14} className="dark:invert" />
                        </div>
                         <span className="text-sm text-gray-600 dark:text-gray-300">Tools</span>
                       </div>
                       <span className="text-sm font-medium text-gray-900 dark:text-white">2</span>
                     </div>

                     {/* Last Active Section */}
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                        <div className="p-[6px] bg-[#F5F7FA] rounded-[4px] dark:bg-[#333]">
                          <Image src="/images/icons/last-active-card-icon.svg" 
                          alt="last active" width={14} height={14} className="dark:invert" />
                        </div>

                         <span className="text-sm text-gray-600 dark:text-gray-300">Last active</span>
                       </div>
                       <span className="text-[14px] font-medium text-gray-900 dark:text-white">{agent.lastModified}</span>
                     </div>
                   </div>
   
                                 {/* Configure Button */}
                <div className="mt-[20px] pt-4 der-t border-gray-200 dark:border-gray-600">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#333333] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-[#404040] transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="text-sm font-medium">Configure your agent</span>
                  </button>
                </div>
               </div>
             ))}
           </div>
         </div>
    )
}
