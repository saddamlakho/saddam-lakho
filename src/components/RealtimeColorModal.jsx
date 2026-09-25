'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, RefreshCw, Palette, Sliders, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { playSound } from '../audio/soundEffects';

export default function RealtimeColorModal() {
  const { 
    theme, 
    presets, 
    selectPreset, 
    updateCustomColor, 
    isCustomizerOpen, 
    setIsCustomizerOpen,
    soundEnabled 
  } = useTheme();

  if (!isCustomizerOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end p-4 md:p-6 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.95, x: 50 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-[#0B0F17] border border-white/15 rounded-3xl p-6 shadow-2xl overflow-y-auto max-h-[90vh] text-slate-100 flex flex-col gap-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base tracking-wide text-white">
                  Realtime Colors Studio
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  Live 3D & UI Palette Engine
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                playSound('click', soundEnabled);
                setIsCustomizerOpen(false);
              }}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active Palette Preview Box */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Active Theme: <span className="text-white font-bold">{theme.name}</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                LIVE 60FPS SYNC
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 h-14 rounded-xl overflow-hidden p-1 bg-black/40 border border-white/5">
              <div className="rounded-lg flex flex-col items-center justify-center text-[10px] font-mono text-black font-bold" style={{ backgroundColor: theme.primary }}>
                Primary
              </div>
              <div className="rounded-lg flex flex-col items-center justify-center text-[10px] font-mono text-black font-bold" style={{ backgroundColor: theme.accent }}>
                Accent
              </div>
              <div className="rounded-lg flex flex-col items-center justify-center text-[10px] font-mono text-white/80 border border-white/10" style={{ backgroundColor: theme.bg }}>
                Void
              </div>
              <div className="rounded-lg flex flex-col items-center justify-center text-[10px] font-mono text-white/90 border border-white/10" style={{ backgroundColor: theme.card }}>
                Panel
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              "{theme.description || 'Customized color tones tailored to your creative taste.'}"
            </p>
          </div>

          {/* Preset Palettes */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Curated Cinematic Presets
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {presets.map((preset) => {
                const isSelected = theme.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      playSound('success', soundEnabled);
                      selectPreset(preset);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all duration-300 flex items-center justify-between group ${
                      isSelected
                        ? 'bg-primary/10 border-primary shadow-[0_0_20px_-5px_var(--color-primary-glow)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center -space-x-2">
                        <div className="w-6 h-6 rounded-full border-2 border-[#0B0F17]" style={{ backgroundColor: preset.primary }} />
                        <div className="w-6 h-6 rounded-full border-2 border-[#0B0F17]" style={{ backgroundColor: preset.accent }} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-primary transition-colors">
                          {preset.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {preset.category}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Hex Color Pickers */}
          <div className="flex flex-col gap-3 pt-3 border-t border-white/10">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-primary" /> Custom Color Tweaker
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col gap-2">
                <span className="text-[11px] font-mono text-slate-400">Primary Core</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.primary}
                    onChange={(e) => updateCustomColor('primary', e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={theme.primary}
                    onChange={(e) => updateCustomColor('primary', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs font-mono text-white uppercase focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col gap-2">
                <span className="text-[11px] font-mono text-slate-400">Accent Glow</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.accent}
                    onChange={(e) => updateCustomColor('accent', e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={theme.accent}
                    onChange={(e) => updateCustomColor('accent', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs font-mono text-white uppercase focus:border-primary outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Close & Apply Button */}
          <button
            onClick={() => {
              playSound('click', soundEnabled);
              setIsCustomizerOpen(false);
            }}
            className="w-full py-3 rounded-xl bg-primary text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg"
          >
            Apply & Continue Journey
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
