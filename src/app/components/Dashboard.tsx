"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock, Activity, Sparkles, Circle } from 'lucide-react';
import { getStats } from '@/lib/db';

interface Stats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  reviews: number;
  inspirations: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    reviews: 0,
    inspirations: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error('加载统计失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const statCards = [
    {
      label: '待办事项',
      value: stats.pendingTasks,
      icon: <Clock className="h-6 w-6 text-yellow-500" />,
      bg: 'bg-yellow-50',
      href: '/tasks',
      color: 'text-yellow-600',
    },
    {
      label: '已完成',
      value: stats.completedTasks,
      icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
      bg: 'bg-green-50',
      href: '/tasks',
      color: 'text-green-600',
    },
    {
      label: '进行中',
      value: stats.inProgressTasks,
      icon: <Activity className="h-6 w-6 text-blue-500" />,
      bg: 'bg-blue-50',
      href: '/tasks',
      color: 'text-blue-600',
    },
    {
      label: '灵感',
      value: stats.inspirations,
      icon: <Sparkles className="h-6 w-6 text-purple-500" />,
      bg: 'bg-purple-50',
      href: '/inspiration',
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="p-4 md:p-6">
      {/* 统计卡片 - 可点击跳转 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card, idx) => (
          <Link
            key={idx}
            href={card.href}
            className="block bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all hover:border-blue-200 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">{card.label}</span>
              <div className={`p-2 rounded-lg ${card.bg}`}>{card.icon}</div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {loading ? '...' : card.value}
            </p>
            <div className="mt-3 flex items-center text-xs text-gray-400">
              <Circle className="h-3 w-3 text-gray-300 mr-2" />
              <span>点击查看详情 →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* 进度条 - 本周进度 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">本周进度</h3>
          <span className="text-sm text-gray-500">
            {loading ? '...' : `${stats.completedTasks}/${stats.totalTasks || 1}`}
          </span>
        </div>
        <div className="flex h-6 items-center">
          <div
            className="bg-blue-500 rounded-l-lg h-full transition-all duration-500"
            style={{
              width: loading ? '0%' : `${stats.totalTasks ? (stats.completedTasks / stats.totalTasks) * 100 : 0}%`,
            }}
          />
          <div
            className="bg-gray-200 rounded-r-lg h-full transition-all duration-500"
            style={{
              width: loading ? '100%' : `${stats.totalTasks ? ((stats.totalTasks - stats.completedTasks) / stats.totalTasks) * 100 : 100}%`,
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>已完成 {stats.completedTasks} 项</span>
          <span>剩余 {stats.totalTasks - stats.completedTasks} 项</span>
        </div>
      </div>

      {/* 最近的复盘和灵感（快速预览） */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h4 className="font-semibold text-gray-900 mb-3">📝 最近复盘</h4>
          <p className="text-sm text-gray-500">共 {stats.reviews} 条复盘记录</p>
          <Link href="/review" className="text-sm text-blue-500 hover:text-blue-600 mt-2 inline-block">
            查看全部 →
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h4 className="font-semibold text-gray-900 mb-3">✨ 灵感库</h4>
          <p className="text-sm text-gray-500">共 {stats.inspirations} 条灵感</p>
          <Link href="/inspiration" className="text-sm text-blue-500 hover:text-blue-600 mt-2 inline-block">
            查看全部 →
          </Link>
        </div>
      </div>
    </div>
  );
}