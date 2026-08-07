"use client";

// 其余代码保持不变
import { useState, useEffect } from 'react';
import { useQuery } from 'sonner';
import { Calendar, List, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white shadow-sm">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">人生工作台</h1>
            <span className="text-xs text-gray-500">Life Workstation</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="全局搜索..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <button className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536"/>
              </svg>
            </button>
          </div>
        </header>

        <div className="flex-1 p-6">
          {activeTab === 'overview' && <Dashboard />}
          <div className="hidden md:flex">
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">待办事项</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <div className="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">本周目标</p>
                    <p className="text-2xl font-bold text-gray-900">5/8</p>
                  </div>
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                </div>
                <div className="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">灵感</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                  <Clock className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 font-medium">待办事项</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 font-medium">本周目标</p>
                <p className="text-2xl font-bold text-gray-900">5/8</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}