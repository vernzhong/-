"use client";

import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Clock, Eye, ThumbsUp, ExternalLink, X, RefreshCw } from 'lucide-react';

interface HotItem {
  title: string;
  desc?: string;
  url?: string;
  hot?: number;
  source?: string;
}

interface PlatformOption {
  value: string;
  label: string;
}

// ==================== 关键词过滤库 ====================
const AI_KEYWORDS = [
  // AI 核心术语
  'AI', '人工智能', 'AGI', 'LLM', '大模型', 'GPT', 'Claude', 'Gemini', 'DeepSeek',
  'Llama', '开源模型', '多模态', '推理', '训练', '微调', 'RAG', '自动驾驶', '机器人', '芯片',

  // 科技公司
  'OpenAI', 'Anthropic', 'Google', 'Microsoft', 'Meta', '苹果', '华为', '字节跳动',
  '阿里', '腾讯', '百度', '智谱', '月之暗面', 'Minimax', '零一万物',

  // 产品 & 商业
  '产品', '上线', '发布', '融资', '估值', 'IPO', '收购', '战略', '转型',
  '创业', '出海', 'SaaS', '订阅', '商业化', '增长', '留存',

  // 技术与趋势
  '算力', 'GPU', 'NPU', '机器人', '自动驾驶', '计算机视觉',
  'NLP', '语音', '图像生成', '视频生成', 'Agent', '智能体',

  // 行业动态
  '开源', '生态', '开发者', 'API', '插件', '应用商店', '监管', '政策',
  '硅谷', '国内', '全球', '突破', '里程碑'
];
// ====================================================

export default function AiHotspot() {
  const [hotData, setHotData] = useState<HotItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<HotItem | null>(null);
  const [platform, setPlatform] = useState('weibo');

  const platforms: PlatformOption[] = [
    { value: 'weibo', label: '微博' },
    { value: 'zhihu', label: '知乎' },
    { value: 'douyin', label: '抖音' },
    { value: 'bili', label: 'B站' },
    { value: 'toutiao', label: '头条' },
    { value: 'xiaohongshu', label: '小红书' },
  ];

  // ==================== 从 API 获取数据 ====================
  const fetchHotData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/hot?platform=${platform}`);
      const result = await res.json();

      if (result.error) {
        setError(result.error);
        setHotData([]);
        return;
      }

      // 提取数据（适配 60s API 格式）
      let items: any[] = [];
      if (result.data && Array.isArray(result.data)) {
        items = result.data;
      } else if (Array.isArray(result)) {
        items = result;
      }

      // 字段映射
      const mappedItems = items.map((item: any) => ({
        title: item.title || item.name || '无标题',
        desc: item.desc || item.description || item.summary || '',
        url: item.link || item.url || item.href || '',
        hot: item.hot_value || item.hot || item.num || 0,
        source: item.source || item.platform || platform,
      }));

      // ========== 关键词过滤 ==========
      const filteredItems = mappedItems.filter((item: HotItem) => {
        const text = (item.title + ' ' + (item.desc || '')).toLowerCase();
        return AI_KEYWORDS.some((keyword) => text.includes(keyword.toLowerCase()));
      });
      // =================================

      setHotData(filteredItems);
    } catch (err) {
      console.error('获取热点失败:', err);
      setError('获取数据失败，请稍后重试');
      setHotData([]);
    } finally {
      setLoading(false);
    }
  };
  // ========================================================

  useEffect(() => {
    fetchHotData();
  }, [platform]);

  const openLink = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('暂无原文链接');
    }
  };

  const formatHot = (hot?: number) => {
    if (!hot) return '0';
    if (hot >= 10000) return (hot / 10000).toFixed(1) + '万';
    if (hot >= 1000) return (hot / 1000).toFixed(1) + 'k';
    return hot.toString();
  };

  const extractTags = (title: string): string[] => {
    const tags: string[] = [];
    const keywords = ['AI', '大模型', '开源', '谷歌', 'Meta', 'OpenAI', '微软', '苹果', '芯片', '算法', '模型', '产品', '融资', '创业', '自动驾驶', '机器人'];
    for (const kw of keywords) {
      if (title.includes(kw) && !tags.includes(kw)) tags.push(kw);
    }
    return tags.slice(0, 3);
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* 标题和控制区 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Sparkles className="h-6 w-6 text-purple-500 mr-2" />
          AI 热点
          <span className="ml-2 text-xs text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
            AI/产品精选
          </span>
        </h2>

        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          >
            {platforms.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>

          <button
            onClick={fetchHotData}
            disabled={loading}
            className="px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-1 text-sm disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? '加载中' : '刷新'}
          </button>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>实时</span>
          </div>
        </div>
      </div>

      {/* 错误状态 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* 热点列表 */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : hotData.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-400">暂无匹配的 AI/产品热点</p>
          <p className="text-xs text-gray-400 mt-1">试试切换其他平台或稍后再来</p>
        </div>
      ) : (
        <div className="space-y-3">
          {hotData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all hover:border-purple-200 cursor-pointer group"
              onClick={() => setSelectedItem(item)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 text-center">
                  <span className={`text-sm font-bold ${index < 3 ? 'text-purple-500' : 'text-gray-400'}`}>
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    {item.hot && item.hot > 0 && (
                      <span className="flex-shrink-0 text-xs text-orange-500 font-medium">
                        🔥 {formatHot(item.hot)}
                      </span>
                    )}
                  </div>
                  {item.desc && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.desc}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {extractTags(item.title).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 text-xs border border-purple-100">
                        {tag}
                      </span>
                    ))}
                    <span className="text-xs text-gray-400">来源: {item.source || platform}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 详情弹窗 */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-bold text-gray-900">{selectedItem.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <span>{selectedItem.source || platform}</span>
                  {selectedItem.hot && selectedItem.hot > 0 && (
                    <>
                      <span>•</span>
                      <span>🔥 {formatHot(selectedItem.hot)}</span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {selectedItem.desc && (
                <p className="text-gray-700 leading-relaxed text-sm">{selectedItem.desc}</p>
              )}

              <div className="flex flex-wrap gap-2">
                {extractTags(selectedItem.title).map((tag) => (
                  <span key={tag} className="px-2 py-1 rounded-full bg-purple-50 text-purple-700 text-xs border border-purple-100">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => openLink(selectedItem.url)}
                className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <ExternalLink className="h-4 w-4" /> 查看原文
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}