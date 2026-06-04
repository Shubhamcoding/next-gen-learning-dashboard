import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-[#040408] text-slate-100 font-sans">
      {/* Sidebar Placeholder */}
      <aside className="hidden md:flex flex-col w-[240px] h-screen border-r border-white/5 bg-slate-950/40 p-6 space-y-6">
        <div className="flex items-center gap-3 h-[40px]">
          <div className="w-10 h-10 rounded-xl bg-white/5 animate-pulse" />
          <div className="w-24 h-4 bg-white/5 rounded animate-pulse" />
        </div>
        <nav className="flex-1 space-y-4 pt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 h-[40px] px-4">
              <div className="w-5 h-5 rounded bg-white/5 animate-pulse" />
              <div className="w-20 h-3.5 bg-white/5 rounded animate-pulse" />
            </div>
          ))}
        </nav>
        <div className="h-10 bg-white/5 rounded-xl animate-pulse" />
      </aside>

      {/* Main Content Placeholder */}
      <div className="flex-1 min-h-screen overflow-y-auto px-4 md:px-8 py-8 md:pl-[272px]">
        {/* Top Header Row */}
        <header className="flex justify-between items-center mb-8 h-[40px]">
          <div>
            <div className="w-48 h-6 bg-white/5 rounded animate-pulse" />
            <div className="w-32 h-3.5 bg-white/5 rounded mt-2 animate-pulse" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/5 animate-pulse" />
        </header>

        {/* Bento Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Hero Card Skeleton */}
          <div className="md:col-span-2 h-[220px] rounded-2xl border border-white/5 bg-slate-950/20 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="w-36 h-4 bg-white/5 rounded animate-pulse" />
                <div className="w-64 h-8 bg-white/5 rounded animate-pulse" />
                <div className="w-80 h-3 bg-white/5 rounded animate-pulse" />
              </div>
              <div className="w-24 h-12 bg-white/5 rounded-xl animate-pulse" />
            </div>
            <div className="h-12 bg-white/5 rounded-xl w-full animate-pulse mt-4" />
          </div>

          {/* Stats Card Skeleton */}
          <div className="h-[220px] rounded-2xl border border-white/5 bg-slate-950/20 p-6 flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="w-20 h-4 bg-white/5 rounded animate-pulse" />
                <div className="w-12 h-3 bg-white/5 rounded animate-pulse" />
              </div>
              <div className="w-12 h-5 bg-white/5 rounded-full animate-pulse" />
            </div>
            <div className="flex items-center justify-between gap-4 mt-2">
              <div className="space-y-2">
                <div className="w-16 h-8 bg-white/5 rounded animate-pulse" />
                <div className="w-24 h-3 bg-white/5 rounded animate-pulse" />
              </div>
              <div className="w-16 h-16 rounded-full bg-white/5 animate-pulse" />
            </div>
            <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse mt-4" />
          </div>

          {/* 4 Course Cards Skeletons */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[200px] rounded-2xl border border-white/5 bg-slate-950/20 p-6 flex flex-col justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="w-3/4 h-5 bg-white/5 rounded animate-pulse" />
                  <div className="w-1/3 h-3 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
              <div className="space-y-2 mt-auto">
                <div className="flex justify-between">
                  <div className="w-24 h-3 bg-white/5 rounded animate-pulse" />
                  <div className="w-8 h-4 bg-white/5 rounded animate-pulse" />
                </div>
                <div className="h-2 bg-white/5 rounded-full w-full animate-pulse" />
              </div>
            </div>
          ))}

          {/* Activity Graph Skeleton */}
          <div className="md:col-span-2 xl:col-span-3 h-[260px] rounded-2xl border border-white/5 bg-slate-950/20 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="w-48 h-5 bg-white/5 rounded animate-pulse" />
                <div className="w-72 h-3.5 bg-white/5 rounded animate-pulse" />
              </div>
              <div className="w-28 h-4 bg-white/5 rounded animate-pulse" />
            </div>
            <div className="h-28 bg-white/5 rounded-xl w-full animate-pulse my-4" />
            <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
