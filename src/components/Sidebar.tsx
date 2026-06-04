'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'My Courses', icon: BookOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP & TABLET SIDEBAR                                                  */}
      {/* Hidden on mobile (<768px)                                                 */}
      {/* ========================================================================= */}
      <motion.aside
        animate={{ 
          width: isCollapsed ? 76 : 240 
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="hidden md:flex flex-col h-screen fixed left-0 top-0 border-r border-white/5 bg-slate-950/60 backdrop-blur-xl z-20"
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 h-[80px]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-lg bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent font-sans whitespace-nowrap"
              >
                Aether Learn
              </motion.span>
            )}
          </div>

          {/* Collapse Toggle Button (Desktop only) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-6 h-6 rounded-md hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5 bg-slate-900/30"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg group outline-none cursor-pointer text-slate-400 hover:text-white"
              >
                {/* Active Indicator Overlay */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavHighlight"
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600/15 to-transparent border-l-2 border-emerald-500 rounded-r-lg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <div className={`relative z-10 flex items-center justify-center shrink-0 transition-colors ${isActive ? 'text-emerald-400' : 'group-hover:text-slate-200'}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className={`relative z-10 ml-4 font-sans whitespace-nowrap ${isActive ? 'text-white font-semibold' : 'text-slate-400 font-normal group-hover:text-slate-200'}`}
                  >
                    {item.label}
                  </motion.span>
                )}

                {/* Tooltip for collapsed states */}
                {isCollapsed && (
                  <div className="absolute left-20 px-2 py-1 rounded bg-slate-900 text-xs font-semibold text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              SN
            </div>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="overflow-hidden"
              >
                <p className="text-xs font-semibold text-white truncate">Shubham Nautiyal</p>
                <p className="text-[10px] text-slate-500 truncate">Student Member</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* ========================================================================= */}
      {/* MOBILE BOTTOM NAVIGATION BAR                                              */}
      {/* Only visible on screens <768px                                            */}
      {/* ========================================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-lg border-t border-white/5 flex items-center justify-around px-4 z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.4)]">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center flex-1 h-full py-1 text-xs transition-colors cursor-pointer text-slate-400"
            >
              {/* Active Indicator Overlay for Mobile */}
              {isActive && (
                <motion.div
                  layoutId="activeNavHighlightMobile"
                  className="absolute top-0 w-12 h-1 bg-emerald-500 rounded-b-md shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <div className={`relative z-10 flex items-center justify-center p-1 rounded-md transition-colors ${isActive ? 'text-emerald-400' : 'text-slate-400'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`relative z-10 text-[10px] font-sans mt-0.5 ${isActive ? 'text-white font-medium' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
