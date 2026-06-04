'use client';

import React from 'react';
import { Clock, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import BentoCard from './BentoCard';

export default function StatsCard() {
  const studyHours = 32.5;
  const targetHours = 40;
  const percentage = Math.min((studyHours / targetHours) * 100, 100);

  // SVG Circle stroke properties
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <BentoCard className="p-6 h-[220px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white text-base font-sans tracking-wide">
              Study Time
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-sans">Weekly Goal Progress</p>
        </div>
        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          +12%
        </span>
      </div>

      {/* Radial Progress & Numerical Stat */}
      <div className="flex items-center justify-between gap-4 mt-2">
        <div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {studyHours}h
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Logged of <strong className="text-slate-200">{targetHours}h</strong> goal
          </p>
        </div>

        {/* Custom SVG Radial Ring */}
        <div className="relative w-20 h-20 shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              className="stroke-white/5"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Animated Glow Circle */}
            <motion.circle
              cx="40"
              cy="40"
              r={radius}
              className="stroke-emerald-500"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(16,185,129,0.5))',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-white font-mono">
            {Math.round(percentage)}%
          </div>
        </div>
      </div>

      {/* Footer Achievement */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] text-slate-400 font-sans">
        <Award className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
        <span>Award unlock at <strong className="text-slate-300">40 hours</strong> study milestone!</span>
      </div>
    </BentoCard>
  );
}
