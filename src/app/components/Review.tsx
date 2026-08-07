"use client";

import { useState, useEffect } from 'react';
import { getReviews, createReview, deleteReview } from '@/lib/db';
import { Calendar, CheckCircle2, Circle, Plus, Trash2, X } from 'lucide-react';

interface Review {
  id: string;
  content: string;
  category: 'daily' | 'weekly' | 'monthly';
  score: number;
  date: string;
  created_at: string;
}

export default function Review() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [newScore, setNewScore] = useState(3);

  // 加载复盘
  const loadReviews = async () => {
    setLoading(true);
    try {
      const data = await getReviews();
      setReviews(data || []);
    } catch (error) {
      console.error('加载复盘失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  // 添加复盘
  const handleAddReview = async () => {
    if (!newContent.trim()) return;
    try {
      await createReview({
        content: newContent.trim(),
        category: newCategory,
        score: newScore,
      });
      setNewContent('');
      setShowForm(false);
      await loadReviews();
    } catch (error) {
      console.error('添加复盘失败:', error);
    }
  };

  // 删除复盘
  const handleDelete = async (id: string) => {
    if (!confirm('确认删除此复盘？')) return;
    try {
      await deleteReview(id);
      await loadReviews();
    } catch (error) {
      console.error('删除复盘失败:', error);
    }
  };

  const categoryLabel = { daily: '每日', weekly: '每周', monthly: '每月' };
  const categoryColor = {
    daily: 'bg-blue-100 text-blue-700',
    weekly: 'bg-purple-100 text-purple-700',
    monthly: 'bg-green-100 text-green-700',
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
          每日复盘
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" /> 记录复盘
        </button>
      </div>

      {/* 添加表单 */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
          <div className="space-y-3">
            <textarea
              placeholder="今天做了什么？有什么收获？"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 min-h-[80px]"
            />
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as 'daily' | 'weekly' | 'monthly')}
                className="p-2 border border-gray-200 rounded-lg text-sm"
              >
                <option value="daily">每日</option>
                <option value="weekly">每周</option>
                <option value="monthly">每月</option>
              </select>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500 mr-2">评分</span>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setNewScore(s)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                      s <= newScore ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={handleAddReview}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 复盘列表 */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">加载中...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 text-gray-400">还没有复盘记录，开始记录吧 🚀</div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${categoryColor[review.category]}`}>
                      {categoryLabel[review.category]}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> {new Date(review.date).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center">
                      <Circle className={`h-2 w-2 mr-1 ${review.score >= 4 ? 'text-green-500' : review.score >= 3 ? 'text-yellow-500' : 'text-red-500'}`} />
                      评分 {review.score}/5
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{review.content}</p>
                </div>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
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