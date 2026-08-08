"use client";

import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}
