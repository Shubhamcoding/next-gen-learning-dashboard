'use client';

import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { gridItemVariants } from './BentoGrid';

interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
}

export default function BentoCard({ className = '', children }: BentoCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Border glow follows the cursor (Emerald to Sapphire)
  const borderGlow = useMotionTemplate`
    radial-gradient(
      180px circle at ${mouseX}px ${mouseY}px, 
      rgba(16, 185, 129, 0.35) 0%, 
      rgba(59, 130, 246, 0.15) 50%, 
      transparent 100%
    )
  `;

  // Background hover glow
  const bgGlow = useMotionTemplate`
    radial-gradient(
      300px circle at ${mouseX}px ${mouseY}px, 
      rgba(16, 185, 129, 0.06) 0%, 
      transparent 80%
    )
  `;

  return (
    <motion.div
      variants={gridItemVariants}
      whileHover={{ 
        scale: 1.015,
        y: -4,
        borderColor: 'rgba(255, 255, 255, 0.12)'
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }}
      onMouseMove={handleMouseMove}
      className={`glass-card rounded-2xl flex flex-col group relative ${className}`}
    >
      {/* Background radial glow */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{ background: bgGlow }}
      />
      
      {/* Border glow card mask */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-1"
        style={{ 
          border: '1px solid transparent',
          background: borderGlow,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          borderRadius: 'inherit'
        }}
      />
      
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none rounded-2xl z-0" />

      {/* Content wrapper */}
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}
