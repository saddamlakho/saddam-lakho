'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';

extend([a11yPlugin]);

export const PRESET_THEMES = [
  {
    id: 'luxury-champagne',
    name: 'Champagne Gold & Obsidian',
    category: 'Elite Luxury (Suit Match)',
    primary: '#E5B869',
    accent: '#F3E5AB',
    bg: '#060709',
    card: 'rgba(16, 18, 24, 0.8)',
    description: 'Bespoke champagne gold, polished bronze, and deep velvet obsidian designed to perfectly complement tailored cinematic imagery.'
  },
  {
    id: 'monolith-platinum',
    name: 'Monolith Titanium & Silver',
    category: 'Minimal Editorial',
    primary: '#F1F5F9',
    accent: '#94A3B8',
    bg: '#040507',
    card: 'rgba(15, 17, 21, 0.8)',
    description: 'High-contrast frosted platinum, brushed chrome, and deep shadow. Timeless, modern, and razor-sharp.'
  },
  {
    id: 'royal-emerald',
    name: 'Emerald & Brushed Brass',
    category: 'Executive Craft',
    primary: '#10B981',
    accent: '#FBBF24',
    bg: '#040807',
    card: 'rgba(9, 20, 17, 0.8)',
    description: 'Rich British racing green with warm gold metallic accents and deep velvet shadow.'
  },
  {
    id: 'cyber-azure',
    name: 'Electric Azure & Ice',
    category: 'Futuristic Tech',
    primary: '#60A5FA',
    accent: '#38BDF8',
    bg: '#05070B',
    card: 'rgba(13, 17, 24, 0.8)',
    description: 'Deep midnight obsidian with luminescent electric cyan and cobalt glow.'
  },
  {
    id: 'quantum-violet',
    name: 'Midnight Amethyst & Rose',
    category: 'Creative Spatial',
    primary: '#C084FC',
    accent: '#F472B6',
    bg: '#07050A',
    card: 'rgba(18, 14, 28, 0.8)',
    description: 'Hypnotic dark purple velvet with subtle rose gold and neon lilac rim lighting.'
  }
];

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('saddam_lakho_theme_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return PRESET_THEMES[0]; // Default to Luxury Champagne Gold
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const primaryCol = colord(currentTheme.primary);
    const accentCol = colord(currentTheme.accent);

    root.style.setProperty('--color-primary', currentTheme.primary);
    root.style.setProperty('--color-primary-glow', primaryCol.alpha(0.35).toRgbString());
    root.style.setProperty('--color-accent', currentTheme.accent);
    root.style.setProperty('--color-accent-glow', accentCol.alpha(0.35).toRgbString());
    root.style.setProperty('--color-bg-dark', currentTheme.bg);
    root.style.setProperty('--color-bg-card', currentTheme.card || 'rgba(16, 18, 24, 0.8)');
    root.style.setProperty('--color-border-glow', primaryCol.alpha(0.35).toRgbString());

    localStorage.setItem('saddam_lakho_theme_v2', JSON.stringify(currentTheme));
  }, [currentTheme]);

  const selectPreset = (preset) => {
    setCurrentTheme(preset);
  };

  const updateCustomColor = (key, value) => {
    setCurrentTheme(prev => ({
      ...prev,
      id: 'custom',
      name: 'Custom Palette',
      [key]: value
    }));
  };

  return (
    <ThemeContext.Provider value={{
      theme: currentTheme,
      presets: PRESET_THEMES,
      selectPreset,
      updateCustomColor,
      isCustomizerOpen,
      setIsCustomizerOpen,
      soundEnabled,
      setSoundEnabled
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
