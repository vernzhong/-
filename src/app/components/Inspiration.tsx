"use client";

import { useState, useEffect } from 'react';
import { getInspirations, createInspiration, deleteInspiration } from '@/lib/db';
import { Sparkles, Plus, Trash2, Bookmark } from 'lucide-react';

interface Inspiration {
  id: string;
  title: string;
  content: string;
  tag: string;
  created_at: string;
}

export default function Inspiration() {
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('');

  // 加载灵感
  const loadInspirations = async () => {
    setLoading(true);
    try {
      const data = await getInspirations();
      setInspirations(data || []);
    } catch (error) {
      console.error('加载灵感失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInspirations();
  }, []);

  // 添加灵感
  const handleAdd = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    try {
      await createInspiration({
        title: newTitle.trim(),
        content: newContent.trim(),
        tag: newTag.trim() || '未分类',
      });
      setNewTitle('');
      setNewContent('');
      setNewTag('');
      setShowForm(false);
      await loadInspirations();
    } catch (error) {
      console.error('添加灵感失败:', error);
    }
  };

  // 删除灵感
  const handleDelete = async (id: string) => {
    if (!confirm('确认删除此灵感？')) return;
    try {
      await deleteInspiration(id);
      await loadInspirations();
    } catch (error) {
      console.error('删除灵感失败:', error);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Sparkles className="h-6 w-6 text-purple-500 mr-2" />
          灵感库
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" /> 添加灵感
        </button>
      </div>

      {/* 添加表单 */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="标题"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="灵感内容..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 min-h-[80px]"
            />
            <input
              type="text"
              placeholder="标签（可选）"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      )}

      {/* 灵感列表 */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">加载中...</div>
      ) : inspirations.length === 0 ? (
        <div className="text-center py-12 text-gray-400">还没有灵感，添加一条吧 ✨</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inspirations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <Bookmark className="h-4 w-4 text-purple-500 mr-1" />
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">{item.content}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs border border-purple-200">
                      {item.tag}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}