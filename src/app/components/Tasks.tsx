"use client";

import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '@/lib/db';
import { CheckCircle2, Clock, Plus, Trash2, Circle, XCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  category?: string;
  created_at: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');

  // 加载任务
  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data || []);
    } catch (error) {
      console.error('加载任务失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // 添加任务
  const handleAddTask = async () => {
    if (!newTitle.trim()) return;
    try {
      await createTask({ title: newTitle.trim(), priority: newPriority });
      setNewTitle('');
      setShowForm(false);
      await loadTasks();
    } catch (error) {
      console.error('添加任务失败:', error);
    }
  };

  // 切换状态
  const toggleStatus = async (task: Task) => {
    const statusMap: Record<string, string> = {
      pending: 'in_progress',
      in_progress: 'done',
      done: 'pending',
    };
    try {
      await updateTask(task.id, { status: statusMap[task.status] || 'pending' });
      await loadTasks();
    } catch (error) {
      console.error('更新任务失败:', error);
    }
  };

  // 删除任务
  const handleDelete = async (id: string) => {
    if (!confirm('确认删除此任务？')) return;
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (error) {
      console.error('删除任务失败:', error);
    }
  };

  const statusLabel = { pending: '待办', in_progress: '进行中', done: '已完成' };
  const priorityColor = { high: 'bg-red-100 text-red-700', medium: 'bg-yellow-100 text-yellow-700', low: 'bg-gray-100 text-gray-700' };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <CheckCircle2 className="h-6 w-6 text-blue-500 mr-2" />
          任务清单
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" /> 添加任务
        </button>
      </div>

      {/* 添加表单 */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="任务标题"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as 'high' | 'medium' | 'low')}
              className="p-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="high">高优先级</option>
              <option value="medium">中优先级</option>
              <option value="low">低优先级</option>
            </select>
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      )}

      {/* 任务列表 */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">加载中...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12 text-gray-400">暂无任务，添加一条吧 🚀</div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <button onClick={() => toggleStatus(task)}>
                    {task.status === 'done' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : task.status === 'in_progress' ? (
                      <Clock className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300" />
                    )}
                  </button>
                  <span className={`text-sm ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {task.title}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColor[task.priority]}`}>
                    {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                  </span>
                  <span className="text-xs text-gray-400">{statusLabel[task.status]}</span>
                </div>
                <button onClick={() => handleDelete(task.id)} className="text-gray-400 hover:text-red-500 transition-colors">
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