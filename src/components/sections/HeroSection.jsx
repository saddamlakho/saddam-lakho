'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { playSound } from '../../audio/soundEffects';
import { useTheme } from '../../context/ThemeContext';

export default function HeroSection({ lenisRef, scrollProgress = 0 }) {
  const { soundEnabled } = useTheme();

  const handleScrollDown = () => {
    playSound('click', soundEnabled);
    if (lenisRef && lenisRef.current) {
      lenisRef.current.scrollTo(window.innerHeight * 1.4, { duration: 1.8 });
    }
  };

  // Fade out smoothly as user begins scrolling (0.00 to 0.12)
  const indicatorOpacity = scrollProgress > 0.02
    ? Math.max(0, 1 - (scrollProgress - 0.02) * 12)
    : 1;

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-end items-center pb-12 sm:pb-16 z-20 pointer-events-none">
      
      {/* ONLY ANIMATED SCROLL INDICATOR ON HOME LANDING */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: indicatorOpacity, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="flex flex-col items-center gap-3.5 pointer-events-auto cursor-pointer group"
        onClick={handleScrollDown}
        data-cursor="SCROLL"
      >
        {/* Animated Mouse Pill */}
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 bg-black/40 backdrop-blur-md flex items-start justify-center p-1.5 shadow-[0_0_20px_-3px_var(--color-primary-glow)] group-hover:border-primary transition-all duration-300">
          <motion.div
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0.2, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1.5 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"
          />
        </div>

        {/* Text & Chevron Animation */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-slate-300 group-hover:text-primary transition-colors">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{
              y: [0, 4, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ChevronDown className="w-4 h-4 text-primary/80 group-hover:text-primary transition-colors" />
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
