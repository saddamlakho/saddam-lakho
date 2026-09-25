'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Binary, 
  Code2, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  CheckCircle2,
  Layers
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const CORE_MODULES = [
  {
    icon: Binary,
    title: 'Data Structures & Algorithms',
    desc: 'Algorithmic complexity, tree/graph traversal, dynamic programming, and computational optimization.'
  },
  {
    icon: Layers,
    title: 'Software System Architecture',
    desc: 'Object-oriented engineering, distributed design patterns, modular microservices, and clean code principles.'
  },
  {
    icon: Database,
    title: 'Database Management Systems',
    desc: 'Relational schema normalization, SQL optimization, ACID transactions, and document data modeling.'
  },
  {
    icon: Cpu,
    title: 'Artificial Intelligence & Neural Foundations',
    desc: 'Machine intelligence fundamentals, heuristic search algorithms, vector embeddings, and autonomous logic.'
  }
];

const COURSE_TAGS = [
  'Advanced Data Structures',
  'Object-Oriented Programming (OOP)',
  'Database Engineering',
  'Operating Systems',
  'Computer Networks & Protocols',
  'Cloud Computing Architecture',
  'Web Engineering',
  'Artificial Intelligence Systems'
];

export default function EducationSection() {
  const { theme } = useTheme();

  return (
    <section className="relative min-h-screen py-24 px-6 md:px-12 lg:px-16 z-10 pointer-events-none flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto flex flex-col gap-10 pointer-events-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-semibold tracking-wider">
            <GraduationCap className="w-4 h-4" />
            {/* <span>ACADEMIC PEDIGREE</span> */}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Academic Background 
          </h2>
          {/* <p className="text-xs md:text-sm text-slate-400 max-w-xl font-sans">
            Rigorous computational science education grounding enterprise software engineering, complex system design, and algorithmic problem-solving.
          </p> */}
        </div>

        {/* Master Education Monolith Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="w-full rounded-3xl glass-panel border-white/15 shadow-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden backdrop-blur-2xl bg-[#080B11]/90 flex flex-col gap-8"
        >
          {/* Top Golden Accent Glow Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          
          {/* Degree & University Main Block */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            
            {/* Left: Icon & Title */}
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0 shadow-[0_0_20px_-3px_var(--color-primary-glow)]">
                <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>

              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 text-[11px] font-mono font-bold w-fit mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>BACHELOR OF SCIENCE</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white tracking-tight">
                  BS in Computer Science
                </h3>

                <h4 className="text-sm sm:text-base font-medium text-slate-200 font-sans mt-0.5">
                  Federal Urdu University of Arts, Science and Technology
                </h4>
              </div>
            </div>

            {/* Right: Meta Pills */}
            <div className="flex flex-row md:flex-col gap-2.5 shrink-0 self-start md:self-auto">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span> 2025</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Degree Conferred</span>
              </div>
            </div>

          </div>

          {/* Academic Modules Grid */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-primary" /> Core Theoretical & Practical Foundations
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CORE_MODULES.map((module, idx) => {
                const Icon = module.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-colors flex items-start gap-3.5 group"
                  >
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h5 className="text-sm font-display font-bold text-white group-hover:text-primary transition-colors">
                        {module.title}
                      </h5>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        {module.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Coursework Badges */}
          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Specialized Coursework & Domains
            </span>
            <div className="flex flex-wrap gap-2">
              {COURSE_TAGS.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-300 hover:border-primary/40 hover:text-white transition-colors"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
