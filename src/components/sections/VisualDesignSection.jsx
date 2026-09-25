'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Eye, Sparkles, Layout, Compass } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const DESIGN_FRAMES = [
  {
    title: 'Kinetic Brand Systems',
    category: 'Identity & Spatial Motion',
    gradient: 'from-blue-600/30 to-indigo-900/40',
    accent: '#60A5FA'
  },
  {
    title: 'High-Density Data Interfaces',
    category: 'UI/UX & Complex Visualization',
    gradient: 'from-emerald-600/30 to-teal-950/40',
    accent: '#34D399'
  },
  {
    title: 'Futuristic Typographic Layouts',
    category: 'Editorial & Creative Direction',
    gradient: 'from-purple-600/30 to-slate-900/40',
    accent: '#A78BFA'
  }
];

export default function VisualDesignSection() {
  const { theme } = useTheme();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center p-6 md:p-12 z-10 pointer-events-none">
      <div className="max-w-5xl w-full mx-auto flex flex-col gap-8 pointer-events-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono">
            <Palette className="w-3.5 h-3.5" />
            <span>VISUAL & GRAPHIC CRAFT</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Creative Direction & Visual Design
          </h2>

          <p className="text-xs md:text-sm text-slate-400 max-w-lg font-sans">
            Harmonizing engineering precision with refined typography, spatial balance, and modern aesthetic elegance.
          </p>
        </div>

        {/* 3D Floating Physical Gallery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DESIGN_FRAMES.map((frame, idx) => (
            <motion.div
              key={frame.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              data-cursor="EXHIBIT"
              className="group relative rounded-3xl p-6 glass-panel glass-panel-hover border-white/10 flex flex-col justify-between h-72 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${frame.gradient} opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  EXHIBIT 0{idx + 1}
                </span>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: frame.accent }} />
              </div>

              <div className="relative z-10 flex flex-col gap-2">
                <div className="text-xs font-mono text-primary">
                  {frame.category}
                </div>
                <h3 className="text-xl font-display font-bold text-white group-hover:translate-x-1 transition-transform">
                  {frame.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
