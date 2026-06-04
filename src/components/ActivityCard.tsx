'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2, Info } from 'lucide-react';
import BentoCard from './BentoCard';

interface ActivityCell {
  date: string;
  count: number;
  level: number; // 0 to 4
}

export default function ActivityCard() {
  const [hoveredCell, setHoveredCell] = useState<{
    index: number;
    rect: DOMRect;
    data: ActivityCell;
  } | null>(null);

  // Generate 18 weeks * 7 days = 126 mock cells
  const generateMockActivity = (): ActivityCell[] => {
    const cells: ActivityCell[] = [];
    const now = new Date();
    
    // Seed levels to look like a realistic learning graph
    for (let i = 125; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayOfWeek = date.getDay();
      
      // Generate realistic learning behavior (more active on weekdays, weekends vary)
      let count = 0;
      const rand = Math.random();
      
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        // Weekdays
        if (rand > 0.7) count = Math.floor(Math.random() * 3) + 1; // 1-3 lessons
        else if (rand > 0.4) count = 1;
      } else {
        // Weekends
        if (rand > 0.8) count = Math.floor(Math.random() * 2) + 1;
      }

      // Determine color level
      let level = 0;
      if (count === 1) level = 1;
      else if (count === 2) level = 2;
      else if (count === 3) level = 3;
      else if (count > 3) level = 4;

      cells.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        count,
        level
      });
    }
    return cells;
  };

  const [activityData] = useState<ActivityCell[]>(generateMockActivity);

  // Map levels to color class names
  const levelColors = [
    'bg-white/5 hover:bg-white/10 border border-white/[0.02]',              // Level 0
    'bg-violet-950/40 border border-violet-800/10',    // Level 1
    'bg-violet-750/50 border border-violet-600/10',    // Level 2
    'bg-violet-500/70 border border-violet-400/20 shadow-[0_0_8px_rgba(139,92,246,0.15)]', // Level 3
    'bg-cyan-400/90 border border-cyan-300/30 shadow-[0_0_12px_rgba(6,182,212,0.35)]',   // Level 4
  ];

  const handleCellHover = (e: React.MouseEvent<HTMLDivElement>, cell: ActivityCell, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredCell({
      index,
      rect,
      data: cell,
    });
  };

  return (
    <BentoCard className="md:col-span-2 xl:col-span-3 p-6 flex flex-col justify-between min-h-[260px]">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            <h2 className="font-bold text-white text-base font-sans tracking-wide">
              Learning Activity Graph
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-sans">
            Interactive view of lessons and lectures completed over the last 18 weeks.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded bg-white/5" />
          <div className="w-2.5 h-2.5 rounded bg-violet-950/40" />
          <div className="w-2.5 h-2.5 rounded bg-violet-700/50" />
          <div className="w-2.5 h-2.5 rounded bg-violet-500/70" />
          <div className="w-2.5 h-2.5 rounded bg-cyan-400/90" />
          <span>More</span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto scroller-custom pb-2 pt-4 relative">
        <div className="flex gap-1.5 min-w-[620px] justify-between">
          {/* Day of Week Labels */}
          <div className="flex flex-col justify-between text-[9px] font-bold text-slate-600 pr-2 h-28 pt-1">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Activity Grid (Rendered in columns/weeks) */}
          <div className="flex-1 grid grid-flow-col grid-rows-7 gap-1.5 h-28">
            {activityData.map((cell, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.25, zIndex: 10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                onMouseEnter={(e) => handleCellHover(e, cell, index)}
                onMouseLeave={() => setHoveredCell(null)}
                className={`w-3.5 h-3.5 rounded-[3px] cursor-pointer transition-colors duration-150 ${levelColors[cell.level]}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip Portal Overlay */}
      <AnimatePresence>
        {hoveredCell && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute bg-slate-950/95 border border-white/10 text-white rounded-lg px-3 py-2 text-xs shadow-[0_10px_25px_rgba(0,0,0,0.5)] z-50 pointer-events-none flex flex-col gap-0.5"
            style={{
              // Position tooltip above the hovered square
              left: `${hoveredCell.rect.left - (window.innerWidth > 1024 ? 240 : 76) + hoveredCell.rect.width / 2 - 60}px`,
              bottom: '120px',
              width: '130px',
            }}
          >
            <span className="font-semibold text-[10px] text-slate-400">
              {hoveredCell.data.date}
            </span>
            <span className="font-bold text-white mt-0.5">
              {hoveredCell.data.count === 0 
                ? 'No completions' 
                : `${hoveredCell.data.count} completion${hoveredCell.data.count > 1 ? 's' : ''}`
              }
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Insight Footer */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400">
        <Info className="w-3.5 h-3.5 text-cyan-400" />
        <span>Your highest daily output was <strong className="text-slate-200">4 completions</strong> on May 20th. Keep it up!</span>
      </div>
    </BentoCard>
  );
}
