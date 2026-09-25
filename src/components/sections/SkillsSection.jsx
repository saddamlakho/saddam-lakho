'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Cpu, Database, Globe, Layers, Sparkles, CheckCircle2, Palette, PenTool } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playSound } from '../../audio/soundEffects';

const SKILL_CATEGORIES = [
  { id: 'all', label: 'All Capabilities' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'backend', label: 'Backend & Data' },
  { id: 'ai', label: 'AI & Engineering' },
  { id: 'design', label: 'Design & Creative' }
];

const SKILLS_DATA = [
  { name: 'Next.js', category: 'frontend', tag: 'Full-Stack React Framework', level: 'Production' },
  { name: 'React', category: 'frontend', tag: 'Component Architecture & Hooks', level: 'Core' },
  { name: 'TypeScript', category: 'frontend', tag: 'Strict Type Safety & Generics', level: 'Core' },
  { name: 'JavaScript', category: 'frontend', tag: 'ESNext, Async/Await & Engines', level: 'Core' },
  { name: 'HTML', category: 'frontend', tag: 'Semantic & Accessibility Web', level: 'Core' },
  { name: 'CSS', category: 'frontend', tag: 'Modern Layouts & Keyframes', level: 'Core' },
  { name: 'Tailwind CSS', category: 'frontend', tag: 'Utility-First Modern Styling', level: 'Core' },
  { name: 'MongoDB', category: 'backend', tag: 'NoSQL Document Schemas', level: 'Database' },
  { name: 'MySQL', category: 'backend', tag: 'Relational Schema & Indexing', level: 'Database' },
  { name: 'PostgreSQL', category: 'backend', tag: 'Advanced SQL & Performance', level: 'Database' },
  { name: 'Generative AI', category: 'ai', tag: 'LLMs, Prompt Engineering & Agents', level: 'Specialist' },
  { name: 'AI Engineering', category: 'ai', tag: 'RAG, Vector DBs & Neural Logic', level: 'Specialist' },
  { name: 'Full-Stack Development', category: 'backend', tag: 'End-to-End System Architectures', level: 'Discipline' },
  { name: 'Adobe Photoshop', category: 'design', tag: 'Raster Graphics, UI Assets & Compositing', level: 'Design Tool' },
  { name: 'Adobe Illustrator', category: 'design', tag: 'Vector Graphics, SVGs & Brand Identity', level: 'Design Tool' },
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('all');
  const { soundEnabled } = useTheme();

  const filteredSkills = activeTab === 'all' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(s => s.category === activeTab);

  return (
    <section className="relative min-h-screen flex items-center justify-center p-6 md:p-12 z-10 pointer-events-none">
      <div className="max-w-5xl w-full mx-auto flex flex-col gap-8 pointer-events-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono">
            <Code2 className="w-3.5 h-3.5" />
            <span>TECHNICAL & CREATIVE PROFICIENCY</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Interconnected Skills Matrix
          </h2>
          {/* <p className="text-xs md:text-sm text-slate-400 max-w-lg font-sans">
            Specialized in contemporary web standards, scalable database infrastructures, enterprise artificial intelligence pipelines, and precision design tools.
          </p> */}

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/10 mt-2 flex-wrap justify-center">
            {SKILL_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  playSound('hover', soundEnabled);
                  setActiveTab(cat.id);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                  activeTab === cat.id
                    ? 'bg-primary text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Holographic Skill Nodes Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                data-cursor="SKILL"
                className="p-4 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between gap-3 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)] group-hover:scale-125 transition-transform" />
                    <h4 className="font-display font-bold text-white text-base tracking-wide group-hover:text-primary transition-colors">
                      {skill.name}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    {skill.level}
                  </span>
                </div>

                <div className="text-xs text-slate-400 font-sans">
                  {skill.tag}
                </div>

                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
