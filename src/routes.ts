import { notFound } from 'next/navigation';
import { createRouter, createMiddleware } from 'next/server';

export const route = createRouter();

// 路由中间件
export function middleware(request: Request) {
  const { pathname } = new URL(request.url).pathname;

  // 全局搜索路由
  if (pathname.startsWith('/search')) {
    return Response.json({
      error: '全局搜索路由未定义',
    });
  }

  // 认证中间件（可选）
  const token = request.headers.get('authorization');
  if (!token) {
    return Response.json({ error: '未授权' }, { status: 401 });
  }
}