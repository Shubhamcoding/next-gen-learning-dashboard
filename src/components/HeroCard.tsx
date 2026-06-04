'use client';

import React from 'react';
import { Flame, Trophy, Calendar, Sparkles } from 'lucide-react';
import BentoCard from './BentoCard';
import { motion } from 'framer-motion';

export default function HeroCard() {
  const currentDay = new Date().getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  
  // Weekly tracker status (1 = Completed, 0 = Missed/Upcoming)
  const weeklyTracker = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: true }, // Assume today is Thursday and it is completed
    { day: 'Fri', completed: false },
    { day: 'Sat', completed: false },
    { day: 'Sun', completed: false },
  ];

  const flameVariants = {
    idle: {
      scale: [1, 1.08, 1],
      filter: [
        'drop-shadow(0 0 4px rgba(249,115,22,0.4))',
        'drop-shadow(0 0 12px rgba(249,115,22,0.8))',
        'drop-shadow(0 0 4px rgba(249,115,22,0.4))'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <BentoCard className="md:col-span-2 p-6 flex flex-col justify-between min-h-[220px]">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start">
        {/* User Greeting */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Next-Gen Student Portal
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-sans">
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(16,185,129,0.25)]">
              Shubham
            </span>{' '}
            👋
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-md font-sans">
            Your daily dashboard is synced. You have completed 3 lessons this week. Keep pushing to hit your learning targets!
          </p>
        </div>

        {/* Streak Indicator Widget */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-4 py-3 rounded-2xl backdrop-blur-md self-stretch sm:self-auto justify-center sm:justify-start">
          <motion.div
            variants={flameVariants}
            animate="idle"
            className="text-orange-500"
          >
            <Flame className="w-8 h-8 fill-current" />
          </motion.div>
          <div>
            <div className="text-2xl font-bold text-white leading-none">4</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-1">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Week Progress Tracker */}
      <div className="mt-6 border-t border-white/5 pt-4">
        <div className="flex items-center gap-2 mb-3 text-xs text-slate-400">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-300">Weekly Streak Progress</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weeklyTracker.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center p-2 rounded-xl border transition-all ${
                item.completed
                  ? 'bg-gradient-to-b from-orange-500/10 to-orange-500/0 border-orange-500/30'
                  : 'bg-slate-900/40 border-white/5'
              }`}
            >
              <span className={`text-[10px] uppercase font-bold tracking-wider ${
                item.completed ? 'text-orange-400' : 'text-slate-500'
              }`}>
                {item.day}
              </span>
              <div className="mt-2.5">
                {item.completed ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-slate-950 font-bold"
                  >
                    <Flame className="w-3.5 h-3.5 fill-current" />
                  </motion.div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-dashed border-slate-700 flex items-center justify-center text-slate-600 text-xs">
                    •
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
