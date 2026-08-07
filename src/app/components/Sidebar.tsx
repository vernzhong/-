"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingUp,
  Settings
} from 'lucide-react';

const navItems = [
  { label: '总览', icon: LayoutDashboard, path: '/' },
  { label: '日历', icon: Calendar, path: '/calendar' },
  { label: 'AI热点', icon: Sparkles, path: '/ai-hotspot' },
  { label: '待办事项', icon: CheckCircle2, path: '/tasks' },
  { label: '本周清单', icon: Clock, path: '/review' },
  { label: '灵感', icon: TrendingUp, path: '/inspiration' },
  { label: '设置', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-50">
      {/* 顶部：头像 + 标题 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          {/* 头像 - 图片 */}
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src="/avatar.jpg"
              alt="头像"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">产品工作台</h1>
            <p className="text-xs text-gray-500">PM Workstation</p>
          </div>
        </div>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`h-5 w-5 mr-3 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* 底部用户信息 */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
            <img
              src="/avatar.jpg"
              alt="头像"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">王中亚</p>
            <p className="text-xs text-gray-500">404250327@qq.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}