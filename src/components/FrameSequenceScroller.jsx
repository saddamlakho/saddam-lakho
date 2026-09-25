'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function FrameSequenceScroller({ scrollProgress = 0 }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { theme } = useTheme();
  const totalFrames = 50;

  useEffect(() => {
    let loadedCount = 0;
    const imgs = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${frameNumber}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate frame index based on scroll progress (0.0 to 0.40 scrubs through the 50 frames)
    // After 0.40, smoothly fade out as we traverse deep into the 3D project worlds
    const scrubProgress = Math.min(1, Math.max(0, scrollProgress / 0.35));
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.floor(scrubProgress * (totalFrames - 1))
    );

    const img = imagesRef.current[frameIndex];
    if (img && img.complete) {
      // Set canvas dimensions
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

      // Calculate object-fit: cover
      const imgAspect = img.width / img.height;
      const canvasAspect = w / h;
      let drawW, drawH, drawX, drawY;

      if (canvasAspect > imgAspect) {
        drawW = w;
        drawH = w / imgAspect;
        drawX = 0;
        drawY = (h - drawH) / 2;
      } else {
        drawH = h;
        drawW = h * imgAspect;
        drawX = (w - drawW) / 2;
        drawY = 0;
      }

      // Draw frame with subtle theme tint and opacity
      const opacity = scrollProgress > 0.35 ? Math.max(0, 1 - (scrollProgress - 0.35) * 6) : 0.85;
      ctx.globalAlpha = opacity;
      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Subtle dark vignette gradient overlay
      const gradient = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.7);
      gradient.addColorStop(0, 'rgba(5, 7, 11, 0.2)');
      gradient.addColorStop(1, 'rgba(5, 7, 11, 0.9)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      ctx.restore();
    }
  }, [scrollProgress, imagesLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] transition-opacity duration-300"
      style={{
        opacity: scrollProgress > 0.45 ? 0 : 1,
        mixBlendMode: 'screen',
      }}
    />
  );
}
