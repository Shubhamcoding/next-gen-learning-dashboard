'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface BentoGridProps {
  children: React.ReactNode;
}

export const gridItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

export default function BentoGrid({ children }: BentoGridProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-24 md:pb-6"
    >
      {children}
    </motion.main>
  );
}
