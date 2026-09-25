import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ThemeProvider } from './context/ThemeContext';
import Scene from './components/3d/Scene';
import FrameSequenceScroller from './components/FrameSequenceScroller';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import RealtimeColorModal from './components/RealtimeColorModal';

import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import EducationSection from './components/sections/EducationSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import AISection from './components/sections/AISection';
import VisualDesignSection from './components/sections/VisualDesignSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Connect Lenis with GSAP ScrollTrigger
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
        {/* Custom Cinematic Cursor */}
        <CustomCursor />

        {/* 50-Frame Sequential Scroll Animation Canvas */}
        <FrameSequenceScroller scrollProgress={scrollProgress} />

        {/* 3D WebGL Canvas Layer */}
        <Scene scrollProgress={scrollProgress} />

        {/* Navigation & Controls */}
        <Navigation scrollProgress={scrollProgress} lenisRef={lenisRef} />

        {/* Realtime Color Studio Modal */}
        <RealtimeColorModal />

        {/* DOM Content Sections (Spaced along the scroll journey) */}
        <main className="relative z-10">
          <HeroSection lenisRef={lenisRef} scrollProgress={scrollProgress} />
          <AboutSection />
          <EducationSection />
          <SkillsSection />
          <ProjectsSection />
          <AISection />
          <VisualDesignSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
