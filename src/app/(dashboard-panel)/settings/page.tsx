'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function SettingsPage() {
  const [mfaEnabled, setMfaEnabled] = useState(false);

  return (
    <ProtectedRoute>
      <div className="px-[24px] py-[31px]">
              {/* Header */}
        <header className="backdrop-blur-sm flex justify-between items-center mb-[27px]">
          <div className="px-0 py-0">
            <h1 className="text-[24px] font-medium text-gray-900 dark:text-white flex items-center gap-2">
              Settings
            </h1>
            <p className="text-[16px] text-[#525866] dark:text-white font-inter font-light tracking-normal leading-[24px] mt-[12px]">
              Manage your account settings and preferences
            </p>
          </div>
          <Link href="/agents/create" className="text-white px-[27px] py-[10px] rounded-md flex items-center gap-2 min-w-[200px]"
            style={{
              background: 'linear-gradient(90deg, #DA46F8, #6940E4)'
            }}>
            <Image src="/images/icons/user-plus.svg" alt="Plus" width={20} height={20} />
            <span className="text-[14px] font-medium">
              Create your agent
            </span>
          </Link>
        </header>
              {/* Main Content */}
        <main className="flex-1 space-y-6">
          
          {/* Security Section */}
          <div className="bg-white dark:bg-[#1A1A1A] rounded-[12px] p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-[20px] font-medium text-gray-900 dark:text-white mb-4">Security</h2>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2A2A2A] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-gray-900 dark:text-white">Multi-Factor Authentication (MFA)</h3>
                  <p className="text-[14px] text-gray-600 dark:text-gray-400">
                    Add an extra layer of security to your account by requiring a verification code in addition to your password when signing in.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMfaEnabled(!mfaEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    mfaEnabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      mfaEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  mfaEnabled 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {mfaEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>

          {/* Organization Management Section */}
          <div className="bg-white dark:bg-[#1A1A1A] rounded-[12px] p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-[20px] font-medium text-gray-900 dark:text-white mb-4">Organization Management</h2>
            <p className="text-[14px] text-gray-600 dark:text-gray-400 mb-6">Manage your account settings and preferences</p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4">
                      <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                    </th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-900 dark:text-white">Name</th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-900 dark:text-white">Role</th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-900 dark:text-white">Joined Date</th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4">
                      <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                    </td>
                    <td className="py-3 px-4 text-[14px] text-gray-900 dark:text-white">John Doe</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-xs font-medium rounded-full">
                        Admin
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[14px] text-gray-600 dark:text-gray-400">25/01/2024</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                          <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                          <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4">
                      <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                    </td>
                    <td className="py-3 px-4 text-[14px] text-gray-900 dark:text-white">Sarah Wilson</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs font-medium rounded-full">
                        Editor
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[14px] text-gray-600 dark:text-gray-400">25/01/2024</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                          <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                          <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Methods and Recent Invoices Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Payment Methods */}
            <div className="bg-white dark:bg-[#1A1A1A] rounded-[12px] p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[20px] font-medium text-gray-900 dark:text-white">Payment Methods</h2>
                <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-[14px] font-medium">Add</span>
                </button>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-gray-900 dark:text-white">**** **** **** 1234</p>
                      <p className="text-[12px] text-gray-600 dark:text-gray-400">Expires 12/26</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Invoices */}
            <div className="bg-white dark:bg-[#1A1A1A] rounded-[12px] p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[20px] font-medium text-gray-900 dark:text-white">Recent Invoices</h2>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-[14px] font-medium">
                  View all
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#2A2A2A] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-gray-900 dark:text-white">INV-2024-001</p>
                      <p className="text-[12px] text-gray-600 dark:text-gray-400">01/01/2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-medium text-gray-900 dark:text-white">$99.00</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs font-medium rounded-full">
                      Paid
                    </span>
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                      <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#2A2A2A] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-gray-900 dark:text-white">INV-2024-001</p>
                      <p className="text-[12px] text-gray-600 dark:text-gray-400">01/01/2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-medium text-gray-900 dark:text-white">$99.00</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs font-medium rounded-full">
                      Paid
                    </span>
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                      <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* API Key Management Section */}
          <div className="bg-white dark:bg-[#1A1A1A] rounded-[12px] p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-[20px] font-medium text-gray-900 dark:text-white">API Key Management</h2>
                <p className="text-[14px] text-gray-600 dark:text-gray-400 mt-1">
                  Create and manage API keys for external integrations and applications.
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-[14px] font-medium">Create new key</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-900 dark:text-white">Name</th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-900 dark:text-white">Key</th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-900 dark:text-white">Created</th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-900 dark:text-white">Status</th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 text-[14px] text-gray-900 dark:text-white">Professional Ultra Production API Key</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] text-gray-600 dark:text-gray-400 font-mono">ak_live_************abc123</span>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                          <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[14px] text-gray-600 dark:text-gray-400">15/01/2024</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors">
                        Revoke
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 text-[14px] text-gray-900 dark:text-white">Development Key</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] text-gray-600 dark:text-gray-400 font-mono">ak_live_************abc123</span>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                          <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[14px] text-gray-600 dark:text-gray-400">10/01/2024</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors">
                        Revoke
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>



    </ProtectedRoute>
  );
}
