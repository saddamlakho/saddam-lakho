'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ThemeProvider } from '../context/ThemeContext';
import Scene from './3d/Scene';
import CinematicSequenceController from './CinematicSequenceController';
import Navigation from './Navigation';
import CustomCursor from './CustomCursor';
import RealtimeColorModal from './RealtimeColorModal';

import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import AISection from './sections/AISection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioClient() {
  const lenisRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initialize Lenis smooth scroll with balanced inertia
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? e.scroll / maxScroll : 0;
      setScrollProgress(progress);
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-bg-dark text-slate-100 selection:bg-primary selection:text-black">
        {/* Custom Cinematic Magnetic Cursor */}
        <CustomCursor />

        {/* 3-Stage Cinematic Video & Image Controller (Image Zoom -> Hero Video -> About Video) */}
        <CinematicSequenceController scrollProgress={scrollProgress} />

        {/* 3D WebGL Canvas Layer */}
        <Scene scrollProgress={scrollProgress} />

        {/* Navigation & Controls */}
        <Navigation scrollProgress={scrollProgress} lenisRef={lenisRef} />

        {/* Realtime Color Studio Modal */}
        <RealtimeColorModal />

        {/* DOM Content Sections */}
        <main className="relative z-10">
          <HeroSection lenisRef={lenisRef} scrollProgress={scrollProgress} />
          <AboutSection />
          <EducationSection />
          <SkillsSection />
          <ProjectsSection />
          <AISection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
