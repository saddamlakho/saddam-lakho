'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState({ text: '', active: false, scale: 1 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Listen for custom cursor events
    const handleCursorChange = (e) => {
      if (e.detail) {
        setCursorState({
          text: e.detail.text || '',
          active: !!e.detail.active,
          scale: e.detail.scale || (e.detail.active ? 1.8 : 1)
        });
      }
    };

    window.addEventListener('custom-cursor', handleCursorChange);

    // Auto-detect interactive elements
    const handleOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const text = target.getAttribute('data-cursor') || 'EXPLORE';
        setCursorState({ text, active: true, scale: 2.2 });
      } else if (e.target.closest('button, a, input, select, textarea, [role="button"]')) {
        setCursorState({ text: '', active: true, scale: 1.5 });
      } else {
        setCursorState({ text: '', active: false, scale: 1 });
      }
    };

    document.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('custom-cursor', handleCursorChange);
      document.removeEventListener('mouseover', handleOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2 pointer-events-none shadow-[0_0_8px_var(--color-primary)]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          opacity: cursorState.active ? 0.3 : 1
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600, mass: 0.1 }}
      />

      {/* Smooth Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary/40 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          width: cursorState.text ? 72 : cursorState.active ? 48 : 28,
          height: cursorState.text ? 72 : cursorState.active ? 48 : 28,
          backgroundColor: cursorState.text ? 'rgba(96, 165, 250, 0.12)' : 'rgba(255, 255, 255, 0.02)',
          borderColor: cursorState.active ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.25)',
        }}
        transition={{ type: 'spring', damping: 26, stiffness: 220, mass: 0.3 }}
      >
        {cursorState.text && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-mono tracking-widest font-bold text-primary uppercase text-center px-1 leading-tight"
          >
            {cursorState.text}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
