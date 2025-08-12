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
                       <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className="dark:fill-[#525866]">
                          <g clip-path="url(#clip0_20447_8127)">
                            <path d="M12 7.70687C12 8.60008 11.2732 9.32687 10.38 9.32687C9.50461 9.32687 8.78977 8.62891 8.76117 7.76055L7.97508 7.61289C7.82906 8.06734 7.57055 8.47211 7.23234 8.79391L7.77703 9.53195C7.91062 9.4832 8.05477 9.45648 8.205 9.45648C8.89359 9.45648 9.45352 10.0164 9.45352 10.705C9.45352 11.3934 8.89359 11.9535 8.205 11.9535C7.51664 11.9535 6.95648 11.3934 6.95648 10.705C6.95648 10.4214 7.05164 10.1598 7.21148 9.95008L6.66703 9.2118C6.25898 9.44102 5.78883 9.57203 5.28867 9.57203C4.43602 9.57203 3.67078 9.19188 3.15281 8.59234L2.44102 9.06578C2.47734 9.18297 2.49703 9.30742 2.49703 9.43633C2.49703 10.1249 1.93711 10.6848 1.24852 10.6848C0.560156 10.6848 0 10.1249 0 9.43633C0 8.74797 0.560156 8.18781 1.24852 8.18781C1.55391 8.18781 1.83375 8.2982 2.05078 8.48078L2.76281 8.00734C2.57367 7.62859 2.46703 7.2018 2.46703 6.75062C2.46703 5.95633 2.79703 5.23797 3.32695 4.72469L2.28844 3.34258C2.08453 3.43539 1.85836 3.48766 1.62 3.48766C0.726797 3.48766 0 2.76086 0 1.86742C0 0.974219 0.726797 0.247422 1.62 0.247422C2.51344 0.247422 3.24023 0.974219 3.24023 1.86742C3.24023 2.26891 3.09305 2.63641 2.85023 2.91977L3.88852 4.30164C4.30125 4.06469 4.77938 3.92898 5.28867 3.92898C5.41711 3.92898 5.54367 3.93789 5.66766 3.95453L5.97375 2.80258C5.61375 2.5832 5.37258 2.18688 5.37258 1.73523C5.37258 1.04688 5.93273 0.486719 6.62109 0.486719C7.30969 0.486719 7.86961 1.04688 7.86961 1.73523C7.86961 2.41305 7.32703 2.96594 6.65344 2.98305L6.34711 4.13523C6.5775 4.22875 6.79289 4.35203 6.98836 4.50016L8.88375 2.5525C8.71617 2.2975 8.6182 1.99258 8.6182 1.66492C8.6182 0.771719 9.34477 0.0449219 10.2382 0.0449219C11.1314 0.0449219 11.8582 0.771719 11.8582 1.66492C11.8582 2.55836 11.1314 3.28516 10.2382 3.28516C9.92625 3.28516 9.63492 3.19633 9.38766 3.04305L7.49227 4.99047C7.87852 5.47352 8.11008 6.08547 8.11008 6.75062C8.11008 6.80805 8.1082 6.865 8.10469 6.92172L8.89055 7.06938C9.13875 6.49211 9.71273 6.08664 10.38 6.08664C11.2732 6.08664 12 6.81344 12 7.70687Z" fill="#525866"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_20447_8127">
                              <rect width="12" height="12" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                        </div>
                         <span className="text-sm text-gray-600 dark:text-gray-300">Channels</span>
                       </div>
                       <span className="text-sm font-medium text-gray-900 dark:text-white">2</span>
                     </div>

                     {/* Tools Section */}
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                        <div className="p-[6px] bg-[#F5F7FA] rounded-[4px] dark:bg-[#333]">
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className="dark:fill-[#525866]">
                          <g clip-path="url(#clip0_20447_8136)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 3.9375C7 2.24613 8.37113 0.875 10.0625 0.875C10.3712 0.875 10.6699 0.920802 10.9519 1.00628C11.0991 1.05088 11.212 1.16946 11.2494 1.31862C11.2868 1.46777 11.2431 1.6256 11.1344 1.73433L9.19848 3.67023C9.23447 3.94766 9.3589 4.21506 9.57192 4.42808C9.78494 4.6411 10.0523 4.76553 10.3298 4.80152L12.2657 2.86561C12.3744 2.75688 12.5322 2.71321 12.6814 2.75059C12.8305 2.78797 12.9491 2.90091 12.9937 3.04807C13.0792 3.33008 13.125 3.62884 13.125 3.9375C13.125 5.62887 11.7539 7 10.0625 7C9.97471 7 9.88769 6.99629 9.80159 6.98902C9.20819 6.93886 8.71137 7.04762 8.45508 7.35882L4.28357 12.4242C3.91816 12.8679 3.37346 13.125 2.79865 13.125C1.73625 13.125 0.875 12.2638 0.875 11.2014C0.875 10.6265 1.13206 10.0818 1.57577 9.71643L6.64118 5.54492C6.95238 5.28863 7.06114 4.79181 7.01098 4.19841C7.00371 4.11231 7 4.02529 7 3.9375ZM2.40172 11.1563C2.40172 10.9147 2.5976 10.7188 2.83922 10.7188H2.84359C3.08522 10.7188 3.28109 10.9147 3.28109 11.1563V11.1607C3.28109 11.4023 3.08522 11.5982 2.84359 11.5982H2.83922C2.5976 11.5982 2.40172 11.4023 2.40172 11.1607V11.1563Z" fill="#525866"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_20447_8136">
                              <rect width="14" height="14" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                        </div>
                         <span className="text-sm text-gray-600 dark:text-gray-300">Tools</span>
                       </div>
                       <span className="text-sm font-medium text-gray-900 dark:text-white">2</span>
                     </div>

                     {/* Last Active Section */}
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                        <div className="p-[6px] bg-[#F5F7FA] rounded-[4px] dark:bg-[#333]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className="dark:fill-[#525866]">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.625 3.29648C2.625 2.46457 3.51692 1.93721 4.24585 2.33812L10.9779 6.04072C11.7334 6.45627 11.7334 7.5419 10.9779 7.95744L4.24585 11.66C3.51691 12.061 2.625 11.5336 2.625 10.7017V3.29648Z" fill="#525866"/>
                        </svg>
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
