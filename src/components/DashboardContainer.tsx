'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, AlertTriangle, CheckCircle, ArrowUpRight, GraduationCap } from 'lucide-react';
import Sidebar from './Sidebar';
import BentoGrid from './BentoGrid';
import HeroCard from './HeroCard';
import StatsCard from './StatsCard';
import CourseCard from './CourseCard';
import ActivityCard from './ActivityCard';
import { Course } from '@/lib/supabase';

interface DashboardContainerProps {
  initialCourses: Course[];
  isMock: boolean;
  dbError: string | null;
}

export default function DashboardContainer({ 
  initialCourses, 
  isMock, 
  dbError 
}: DashboardContainerProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-[#040408] text-slate-100 font-sans">
      {/* Background Ambient Glow Blobs */}
      <div className="bg-glow-blob w-[400px] h-[400px] bg-emerald-600 top-[-100px] right-[-100px]" />
      <div className="bg-glow-blob w-[500px] h-[500px] bg-cyan-800 bottom-[-200px] left-[-150px] opacity-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      {/* Collapsible Sidebar (Left Side) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Panel Content (Right Side) */}
      {/* Left padding handles offset for sidebar: 0 on mobile, 76px on tablet, 240px on desktop */}
      <div className="flex-1 min-h-screen overflow-y-auto px-4 md:px-8 py-8 md:pl-[108px] lg:pl-[272px] transition-all duration-300">
        
        {/* Top Header Row */}
        <header className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
          <div>
            <h2 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-sans">
              Portal / {activeTab}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="text-xs font-semibold text-slate-400 font-sans">System Online</span>
            </div>
          </div>

          {/* Connection Status Badge */}
          <div className="flex items-center gap-2">
            {isMock ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Mock Mode
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Live Database
              </span>
            )}
          </div>
        </header>

        {/* Tab Router Switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Bento Grid */}
                <BentoGrid>
                  {/* Row 1: Hero & Study Hours */}
                  <HeroCard />
                  <StatsCard />

                  {/* Row 2: Courses Header & Dynamic Course Cards */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-4 flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-emerald-400" />
                      <h3 className="font-bold text-white text-lg font-sans tracking-wide">
                        Active Enrolled Courses
                      </h3>
                    </div>
                    <span className="text-xs text-slate-400 font-sans">
                      Showing {initialCourses.length} courses
                    </span>
                  </div>

                  {initialCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}

                  {/* Row 3: Learning Activity */}
                  <ActivityCard />
                </BentoGrid>

                {/* DB Info Notice Banner */}
                {isMock && (
                  <div className="mt-8 p-4 rounded-xl border border-amber-500/15 bg-amber-500/5 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                    <div className="flex gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">Supabase Connection Missing</h4>
                        <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                          The dashboard is currently running on local mock data. To link your live Supabase database, copy 
                          <code className="text-amber-300 font-mono mx-1.5 px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px]">.env.example</code> to 
                          <code className="text-amber-300 font-mono mx-1.5 px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px]">.env.local</code> and input your API keys. Refer to 
                          <code className="text-amber-300 font-mono mx-1.5 px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px]">schema.sql</code> for database setup.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="glass-card rounded-2xl p-8 border border-white/5 bg-slate-950/20 max-w-4xl mx-auto text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">My Enrolled Courses</h3>
                <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed mb-6">
                  Manage syllabus, watch video lessons, view quiz stats, and download certificates.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                  {initialCourses.map((c) => (
                    <div key={c.id} className="p-4 rounded-xl border border-white/5 bg-slate-900/30 flex justify-between items-center hover:border-emerald-500/30 transition-colors">
                      <div>
                        <div className="font-semibold text-white text-sm">{c.title}</div>
                        <div className="text-xs text-slate-500 mt-1 font-mono">{c.progress}% completed</div>
                      </div>
                      <button className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors cursor-pointer">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="glass-card rounded-2xl p-8 border border-white/5 bg-slate-950/20 max-w-4xl mx-auto text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                  <Database className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Study Analytics</h3>
                <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed mb-4">
                  Review complete learning behavior details, study velocity reports, and upcoming exam schedules.
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Coming soon in v2.0
                </span>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="glass-card rounded-2xl p-8 border border-white/5 bg-slate-950/20 max-w-4xl mx-auto text-left py-8">
                <h3 className="text-lg font-bold text-white mb-2">Portal Settings</h3>
                <p className="text-xs text-slate-500 mb-6">Manage dashboard credentials and connection credentials.</p>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-white/5 bg-slate-900/30 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-white text-sm">Supabase Sync</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {isMock ? 'Disabled - Using local fallback mock data' : 'Connected to Supabase live table'}
                      </div>
                    </div>
                    {dbError && (
                      <span className="text-[10px] text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20 font-mono">
                        {dbError}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
