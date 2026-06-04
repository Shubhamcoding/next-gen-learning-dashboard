'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Course } from '@/lib/supabase';
import BentoCard from './BentoCard';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  // Dynamically resolve the Lucide icon based on name
  const IconComponent = (Icons as any)[course.icon_name] || Icons.BookOpen;

  // Determine a color theme/mesh class based on icon_name or title
  const getThemeDetails = (iconName: string) => {
    switch (iconName) {
      case 'Code2': // Sapphire Theme
        return {
          mesh: 'bg-mesh-purple',
          iconColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
          barColor: 'from-blue-500 to-indigo-500',
          glow: 'rgba(59,130,246,0.3)',
        };
      case 'Cpu': // Mint/Teal Theme
        return {
          mesh: 'bg-mesh-cyan',
          iconColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
          barColor: 'from-teal-500 to-emerald-500',
          glow: 'rgba(45,212,191,0.3)',
        };
      case 'Sparkles': // Emerald Theme
        return {
          mesh: 'bg-mesh-amber',
          iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
          barColor: 'from-emerald-500 to-teal-500',
          glow: 'rgba(16,185,129,0.3)',
        };
      case 'Database': // Cyan Theme
        return {
          mesh: 'bg-mesh-emerald',
          iconColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
          barColor: 'from-cyan-500 to-blue-500',
          glow: 'rgba(6,182,212,0.3)',
        };
      default:
        return {
          mesh: 'bg-mesh-purple',
          iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
          barColor: 'from-emerald-500 to-teal-500',
          glow: 'rgba(16,185,129,0.3)',
        };
    }
  };

  const theme = getThemeDetails(course.icon_name);

  return (
    <BentoCard className="p-6 h-[200px] flex flex-col justify-between overflow-hidden">
      {/* Background abstract gradient mesh */}
      <div className={`absolute inset-0 pointer-events-none opacity-60 z-0 ${theme.mesh}`} />

      {/* Header section (Icon + Title) */}
      <div className="relative z-10 flex items-start gap-4">
        <div className={`p-2.5 rounded-xl border shrink-0 flex items-center justify-center ${theme.iconColor}`}>
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="overflow-hidden">
          <h3 className="font-bold text-white text-base truncate font-sans tracking-wide">
            {course.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-sans">Active Course</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="relative z-10 mt-auto">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-sans">
            Course Progress
          </span>
          <span className="text-sm font-bold text-white font-mono">
            {course.progress}%
          </span>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ 
              duration: 1.4, 
              ease: [0.25, 1, 0.5, 1], // Custom cubic-bezier for buttery flow
              delay: 0.15 
            }}
            className={`h-full bg-gradient-to-r ${theme.barColor} rounded-full relative progress-active`}
            style={{
              boxShadow: `0 0 10px ${theme.glow}`,
            }}
          />
        </div>
      </div>
    </BentoCard>
  );
}
