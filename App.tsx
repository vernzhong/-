import { useState } from 'react';
import { RouterProvider } from 'next/router';
import { createBrowserRouter, RouterProvider as NextRouterProvider, Outlet } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { LoadingOverlay } from 'react-loading-overlay';

import Sidebar from '@/components/Sidebar';
import GlobalSearch from '@/components/GlobalSearch';
import MainContent from '@/components/MainContent';
import { initDb } from '@/lib/db';

const queryClient = new QueryClient();

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initDb();
    setLoading(false);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {loading && (
        <LoadingOverlay
          indicator={<div className="text-gray-600">正在初始化...</div>}
          onLoad={() => setLoading(false)}
        />
      )}
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <GlobalSearch />
          <MainContent />
        </main>
      </div>
    </QueryClientProvider>
  );
}