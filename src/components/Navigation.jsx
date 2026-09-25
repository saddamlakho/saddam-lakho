'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  User, 
  Code2, 
  Briefcase, 
  Cpu, 
  Palette, 
  Mail, 
  Volume2, 
  VolumeX, 
  Paintbrush,
  GraduationCap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { playSound } from '../audio/soundEffects';

const NAV_ITEMS = [
  { id: 'hero', label: 'Start', icon: Compass, scrollTarget: 0.0 },
  { id: 'hero-video', label: 'Identity', icon: User, scrollTarget: 0.18 },
  { id: 'about', label: 'About', icon: User, scrollTarget: 0.44 },
  { id: 'education', label: 'Education', icon: GraduationCap, scrollTarget: 0.66 },
  { id: 'skills', label: 'Skills', icon: Code2, scrollTarget: 0.74 },
  { id: 'projects', label: 'Projects', icon: Briefcase, scrollTarget: 0.84 },
  { id: 'ai', label: 'AI Core', icon: Cpu, scrollTarget: 0.92 },
  { id: 'contact', label: 'Contact', icon: Mail, scrollTarget: 0.98 },
];

export default function Navigation({ scrollProgress, lenisRef }) {
  const { isCustomizerOpen, setIsCustomizerOpen, soundEnabled, setSoundEnabled, theme } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const p = scrollProgress;
    if (p < 0.10) setActiveSection('hero');
    else if (p < 0.38) setActiveSection('hero-video');
    else if (p < 0.62) setActiveSection('about');
    else if (p < 0.70) setActiveSection('education');
    else if (p < 0.80) setActiveSection('skills');
    else if (p < 0.90) setActiveSection('projects');
    else if (p < 0.95) setActiveSection('ai');
    else setActiveSection('contact');
  }, [scrollProgress]);

  const handleNavClick = (item) => {
    playSound('click', soundEnabled);
    if (lenisRef && lenisRef.current) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      lenisRef.current.scrollTo(item.scrollTarget * scrollHeight, {
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  };

  return (
    <>
      {/* Top Header Identity & Status */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-8 h-8 rounded-lg bg-bg-card border border-white/10 flex items-center justify-center font-display font-black text-sm tracking-wider text-primary shadow-lg backdrop-blur-md">
            SL
          </div>
          <div>
            <div className="text-xs font-display font-bold tracking-wider text-slate-100 uppercase">
              SADDAM LAKHO
            </div>
            <div className="text-[10px] font-mono text-slate-400 tracking-tight">
              Full-Stack Developer · AI Engineer
            </div>
          </div>
        </div>

        {/* Top Right Controls: Theme Studio & Sound */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) playSound('success', true);
            }}
            data-cursor="AUDIO"
            className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-primary transition-all duration-300 hover:scale-105"
            title={soundEnabled ? 'Mute Audio' : 'Enable Ambient Audio Feedback'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-primary animate-pulse" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Realtime Colors Studio Trigger */}
          <button
            onClick={() => {
              playSound('click', soundEnabled);
              setIsCustomizerOpen(true);
            }}
            data-cursor="THEME"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-mono text-slate-300 hover:text-primary border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105"
          >
            <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_var(--color-primary)]" style={{ backgroundColor: theme.primary }} />
            <span className="hidden sm:inline font-sans text-xs">Theme Studio</span>
            <Paintbrush className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Floating Bottom Navigation Dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-1 p-1.5 rounded-full glass-panel bg-[#090D16]/85 border-white/10 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                onMouseEnter={() => playSound('hover', soundEnabled)}
                data-cursor={item.label.toUpperCase()}
                className={`relative px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 group ${
                  isActive ? 'text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDockPill"
                    className="absolute inset-0 rounded-full bg-white/10 border border-primary/40 shadow-[0_0_15px_-3px_var(--color-primary-glow)]"
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 relative z-10 transition-transform duration-300 ${isActive ? 'text-primary scale-110' : 'group-hover:scale-110'}`} />
                <span className="relative z-10 hidden md:inline text-[11px] tracking-wide font-sans">{item.label}</span>
              </button>
            );
          })}
        </motion.div>
      </nav>

      {/* Subtle Right Journey Progress Bar */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3 pointer-events-none">
        <span className="text-[9px] font-mono text-slate-500 transform -rotate-90 origin-center tracking-widest uppercase">
          JOURNEY
        </span>
        <div className="w-[2px] h-28 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="w-full bg-primary rounded-full absolute top-0 left-0"
            style={{ height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
          />
        </div>
        <span className="text-[10px] font-mono text-primary font-bold">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>
    </>
  );
}
