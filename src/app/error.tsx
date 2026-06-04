'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an analytics service or reporting utility
    console.error('Dashboard error caught by boundary:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#040408] text-slate-100 px-6 py-12 font-sans relative overflow-hidden">
      {/* Background ambient blobs */}
      <div className="bg-glow-blob w-[300px] h-[300px] bg-emerald-600 top-1/4 left-1/4" />
      <div className="bg-glow-blob w-[300px] h-[300px] bg-cyan-600 bottom-1/4 right-1/4" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="relative z-10 glass-card max-w-md w-full p-8 rounded-2xl border border-white/5 bg-slate-950/40 text-center flex flex-col items-center">
        {/* Error icon with pulse animation */}
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(244,63,94,0.15)] animate-pulse">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">
          Sync Connection Interrupted
        </h2>
        
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          The dashboard lost secure synchronization with the database server.
          <br />
          <span className="text-xs text-rose-400/80 font-mono mt-2 block break-all bg-rose-500/5 border border-rose-500/10 p-2.5 rounded-lg">
            {error.message || 'Connection handshake timed out.'}
          </span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => reset()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-emerald-400/20 active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            Reconnect Server
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-200 cursor-pointer border border-white/10 active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            Reload Portal
          </button>
        </div>
      </div>
    </div>
  );
}
