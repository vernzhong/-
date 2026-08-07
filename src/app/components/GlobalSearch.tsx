import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const search = (query: string) => {
    if (query.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }
    // 模拟搜索结果
    const mockResults = [
      { title: '总览数据', type: 'dashboard', link: '/dashboard' },
      { title: '近期任务', type: 'tasks', link: '/tasks' },
      { title: '本周复盘', type: 'review', link: '/review' },
      { title: 'AI热点', type: 'ai', link: '/ai-hotspot' },
      { title: '灵感库', type: 'inspiration', link: '/inspiration' },
      { title: '日历', type: 'calendar', link: '/calendar' },
    ];
    setResults(
      mockResults.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase())
      )
    );
    setShowResults(true);
  };

  const closeResults = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative hidden md:block">
      <div className="relative">
        <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="全局搜索..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            search(e.target.value);
          }}
          className="w-80 pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />
        {query && (
          <button
            onClick={closeResults}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg z-50 p-2 space-y-1">
          {results.map((result, idx) => (
            <div
              key={idx}
              onClick={() => { closeResults(); window.location.href = result.link; }}
              className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
            >
              <span className="text-gray-400 mr-2">{idx + 1}.</span>
              <span className="text-gray-900 flex-1">{result.title}</span>
              <span className="text-xs text-gray-400">{result.type}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}