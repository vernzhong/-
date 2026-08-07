"use client";

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchResult {
  title: string;
  type: string;
  link: string;
}

const mockResults: SearchResult[] = [
  { title: '总览 - 产品工作台', type: '页面', link: '/' },
  { title: '任务清单', type: '页面', link: '/tasks' },
  { title: 'AI 热点', type: '页面', link: '/ai-hotspot' },
  { title: '每日复盘', type: '页面', link: '/review' },
  { title: '灵感库', type: '页面', link: '/inspiration' },
  { title: '设置', type: '页面', link: '/settings' },
  { title: '签到原型', type: '文档', link: '#' },
  { title: '产品需求文档', type: '文档', link: '#' },
];

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results = query.trim() === ''
    ? []
    : mockResults.filter((r) =>
        r.title.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="relative">
      {/* 搜索框 */}
      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
        <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="全局搜索..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 px-2 placeholder-gray-400"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 搜索结果下拉 */}
      {isOpen && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-400">
              未找到匹配结果
            </div>
          ) : (
            <ul className="py-1">
              {results.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setQuery('');
                      setIsOpen(false);
                    }}
                  >
                    <span className="text-sm text-gray-700">{item.title}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}