'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { playSound } from '../audio/soundEffects';

export default function CinematicSequenceController({ scrollProgress = 0 }) {
  const heroVideoRef = useRef(null);
  const aboutVideoRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const soundPlayedRef = useRef(false);
  const { soundEnabled, theme } = useTheme();

  // Load intro image
  useEffect(() => {
    const img = new Image();
    img.src = '/intro_image.jpeg';
    img.onload = () => {
      imgRef.current = img;
      setIsImgLoaded(true);
    };
  }, []);

  // Preload and handle videos
  useEffect(() => {
    const heroVid = heroVideoRef.current;
    const aboutVid = aboutVideoRef.current;
    if (heroVid) heroVid.load();
    if (aboutVid) aboutVid.load();
  }, []);

  // Main Canvas Render Loop (Full-Screen Immersive Cover)
  useEffect(() => {
    const canvas = canvasRef.current;
    const heroVid = heroVideoRef.current;
    const aboutVid = aboutVideoRef.current;
    const img = imgRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const p = scrollProgress; // 0.0 to 1.0

    // Sound effect on initial zoom trigger
    if (p > 0.02 && !soundPlayedRef.current) {
      playSound('portal', soundEnabled);
      soundPlayedRef.current = true;
    } else if (p <= 0.01) {
      soundPlayedRef.current = false;
    }

    // Full-Screen Cover Draw Function
    const drawCover = (media, mediaW, mediaH, opacity = 1, scale = 1) => {
      if (!media || opacity <= 0) return;
      const mediaAspect = mediaW / mediaH;
      const canvasAspect = w / h;
      let drawW, drawH, drawX, drawY;

      if (canvasAspect > mediaAspect) {
        drawW = w * scale;
        drawH = (w / mediaAspect) * scale;
        drawX = (w - drawW) / 2;
        drawY = (h - drawH) / 2;
      } else {
        drawH = h * scale;
        drawW = (h * mediaAspect) * scale;
        drawX = (w - drawW) / 2;
        drawY = (h - drawH) / 2;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
      ctx.drawImage(media, drawX, drawY, drawW, drawH);

      // Subtle full-screen cinematic vignette
      const grad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.75);
      grad.addColorStop(0, 'rgba(6, 7, 9, 0.05)');
      grad.addColorStop(0.6, 'rgba(6, 7, 9, 0.45)');
      grad.addColorStop(1, 'rgba(6, 7, 9, 0.88)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.restore();
    };

    // -------------------------------------------------------------
    // STAGE 2: HERO VIDEO (Active p: 0.08 to 0.42)
    // -------------------------------------------------------------
    if (heroVid && heroVid.duration && p >= 0.06 && p <= 0.44) {
      const heroP = Math.min(1, Math.max(0, (p - 0.08) / 0.28));
      const targetTime = heroP * heroVid.duration;

      if (Math.abs(heroVid.currentTime - targetTime) > 0.03) {
        if ('fastSeek' in heroVid) {
          try { heroVid.fastSeek(targetTime); } catch (e) { heroVid.currentTime = targetTime; }
        } else {
          heroVid.currentTime = targetTime;
        }
      }

      let heroOpacity = 1;
      if (p < 0.12) {
        heroOpacity = (p - 0.06) / 0.06;
      } else if (p > 0.36) {
        heroOpacity = Math.max(0, 1 - (p - 0.36) / 0.08);
      }

      if (heroVid.videoWidth && heroVid.videoHeight) {
        drawCover(heroVid, heroVid.videoWidth, heroVid.videoHeight, heroOpacity * 0.98);
      }
    }

    // -------------------------------------------------------------
    // STAGE 3: ABOUT VIDEO (Active p: 0.36 to 0.68)
    // -------------------------------------------------------------
    if (aboutVid && aboutVid.duration && p >= 0.36 && p <= 0.70) {
      const aboutP = Math.min(1, Math.max(0, (p - 0.38) / 0.24));
      const targetTime = aboutP * aboutVid.duration;

      if (Math.abs(aboutVid.currentTime - targetTime) > 0.03) {
        if ('fastSeek' in aboutVid) {
          try { aboutVid.fastSeek(targetTime); } catch (e) { aboutVid.currentTime = targetTime; }
        } else {
          aboutVid.currentTime = targetTime;
        }
      }

      let aboutOpacity = 1;
      if (p < 0.42) {
        aboutOpacity = (p - 0.36) / 0.06;
      } else if (p > 0.60) {
        aboutOpacity = Math.max(0, 1 - (p - 0.60) / 0.08);
      }

      if (aboutVid.videoWidth && aboutVid.videoHeight) {
        drawCover(aboutVid, aboutVid.videoWidth, aboutVid.videoHeight, aboutOpacity * 0.98);
      }
    }

    // -------------------------------------------------------------
    // STAGE 1: INTRO IMAGE ZOOM-THROUGH (Active p: 0.00 to 0.12)
    // -------------------------------------------------------------
    if (img && isImgLoaded && p <= 0.14) {
      const zoomFactor = p / 0.10;
      const imgScale = 1.0 + Math.pow(zoomFactor, 1.8) * 2.8;
      const imgOpacity = p <= 0.06 ? 1.0 : Math.max(0, 1.0 - (p - 0.06) / 0.06);

      drawCover(img, img.naturalWidth || img.width, img.naturalHeight || img.height, imgOpacity, imgScale);
    }

    ctx.restore();
  }, [scrollProgress, isImgLoaded]);

  return (
    <>
      <video
        ref={heroVideoRef}
        src="/hero_video.mp4"
        preload="auto"
        muted
        playsInline
        className="hidden"
      />
      <video
        ref={aboutVideoRef}
        src="/about_video.mp4"
        preload="auto"
        muted
        playsInline
        className="hidden"
      />

      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[1] transition-opacity duration-300"
        style={{
          opacity: scrollProgress > 0.70 ? 0 : 1,
        }}
      />
    </>
  );
}
