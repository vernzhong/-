import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform') || 'weibo';

  const platformMap: Record<string, string> = {
    weibo: 'https://60s.viki.moe/v2/weibo',
    douyin: 'https://60s.viki.moe/v2/douyin',
    zhihu: 'https://60s.viki.moe/v2/zhihu',
    bili: 'https://60s.viki.moe/v2/bili',
    toutiao: 'https://60s.viki.moe/v2/toutiao',
    xiaohongshu: 'https://60s.viki.moe/v2/xiaohongshu',
  };

  const url = platformMap[platform];
  if (!url) {
    return NextResponse.json({ error: '不支持的平台' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '获取数据失败' }, { status: 500 });
  }
}