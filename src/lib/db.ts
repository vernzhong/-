import { supabase } from './supabase';

// ============ 任务操作 ============
export async function getTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createTask(task: { title: string; description?: string; priority?: string; category?: string }) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ ...task, status: 'pending' }])
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function updateTask(id: string, updates: any) {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function deleteTask(id: string) {
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) throw error;
}

// ============ 复盘操作 ============
export async function getReviews() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createReview(review: { content: string; category: string; score: number }) {
  const { data, error } = await supabase
    .from('reviews')
    .insert([review])
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function deleteReview(id: string) {
  const { error } = await supabase.from('reviews').delete().eq('id', id);
  if (error) throw error;
}

// ============ 灵感操作 ============
export async function getInspirations() {
  const { data, error } = await supabase
    .from('inspirations')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createInspiration(inspiration: { title: string; content: string; tag?: string }) {
  const { data, error } = await supabase
    .from('inspirations')
    .insert([inspiration])
    .select();
  if (error) throw error;
  return data?.[0];
}

// ============ 统计信息 ============
export async function getStats() {
  const tasks = await getTasks();
  const reviews = await getReviews();
  const inspirations = await getInspirations();

  return {
    totalTasks: tasks.length,
    completedTasks: tasks.filter((t: any) => t.status === 'done').length,
    pendingTasks: tasks.filter((t: any) => t.status === 'pending').length,
    inProgressTasks: tasks.filter((t: any) => t.status === 'in_progress').length,
    reviews: reviews.length,
    inspirations: inspirations.length,
  };
}