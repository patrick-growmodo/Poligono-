import React from 'react';
import CategoryOverview from '@/components/CategoryOverview';
import Image from 'next/image';
import MonthlyOverview from '@/components/MonthlyOverview';
import AgentList from '@/components/AgentList';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
// import { useAuth } from '@/components/AuthProvider';
// import { auth0 } from "@/lib/auth0";

export default async function DashboardPage() {
  // const { user, loading } = useAuth();
  // const session = await auth0.getSession();
  // console.log('🎯 Dashboard - Auth state:', { session });
  // console.log('🎯 Dashboard - Auth state:', { user, loading });

  return (
    <ProtectedRoute>
      <div className="px-[24px] py-[31px]">
              {/* Header */}
      <header className="backdrop-blur-sm flex justify-between items-center mb-[27px]">
        <div className="px-0 py-0">
          <h1 className="text-[24px] font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Image src="/images/icons/dashboard-browsing.svg" alt="Dashboard" width={24} height={24} className="dark:hidden" />
            <Image src="/images/icons/dashboard-browsing-dark.svg" alt="Dashboard" width={24} height={24} className="hidden dark:block" />
            Dashboard
          </h1>
          <p className="text-[16px] text-[#525866] dark:text-white font-inter font-light tracking-normal leading-[24px] mt-[12px]">
          Track all key metrics, agent activity, and performance insights from a single, unified dashboard.
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

      {/* Main Content Area */}
      <main className="flex-1">
       <CategoryOverview />
       <MonthlyOverview />
       <AgentList />
       {/* <AgentListWithTanStack /> */}
      </main>
      </div>
    </ProtectedRoute>
  );
}
