'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function VideoSequenceScroller({ scrollProgress = 0 }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      setIsVideoReady(true);
    };

    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('canplaythrough', handleLoaded);

    return () => {
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('canplaythrough', handleLoaded);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.duration) return;

    // Maps scroll from 0.00 to 0.38 to scrub through the entire video
    const scrubProgress = Math.min(1, Math.max(0, scrollProgress / 0.35));
    const targetTime = scrubProgress * video.duration;

    if (Math.abs(video.currentTime - targetTime) > 0.02) {
      if ('fastSeek' in video) {
        try { video.fastSeek(targetTime); } catch (e) { video.currentTime = targetTime; }
      } else {
        video.currentTime = targetTime;
      }
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderFrame = () => {
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

      if (video.videoWidth && video.videoHeight) {
        const videoAspect = video.videoWidth / video.videoHeight;
        const canvasAspect = w / h;
        let drawW, drawH, drawX, drawY;

        if (canvasAspect > videoAspect) {
          drawW = w;
          drawH = w / videoAspect;
          drawX = 0;
          drawY = (h - drawH) / 2;
        } else {
          drawH = h;
          drawW = h * videoAspect;
          drawX = (w - drawW) / 2;
          drawY = 0;
        }

        // Soft, cinematic dissolve transition into the 3D world
        let opacity = 0.96;
        if (scrollProgress > 0.28) {
          opacity = Math.max(0, 0.96 - (scrollProgress - 0.28) * 5.0);
        }

        ctx.globalAlpha = opacity;
        ctx.drawImage(video, drawX, drawY, drawW, drawH);

        // Luxury Warm Charcoal Radial Vignette to melt with the tailored suit tone
        const gradient = ctx.createRadialGradient(w / 2, h / 2, w * 0.12, w / 2, h / 2, w * 0.68);
        gradient.addColorStop(0, 'rgba(6, 7, 9, 0.08)');
        gradient.addColorStop(0.6, 'rgba(6, 7, 9, 0.55)');
        gradient.addColorStop(1, 'rgba(6, 7, 9, 0.96)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.restore();
    };

    video.addEventListener('seeked', renderFrame);
    renderFrame();

    return () => {
      video.removeEventListener('seeked', renderFrame);
    };
  }, [scrollProgress, isVideoReady]);

  return (
    <>
      <video
        ref={videoRef}
        src="/Man_putting_on_suit_jacket_202609061134.mp4"
        preload="auto"
        muted
        playsInline
        className="hidden"
      />

      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[1] transition-opacity duration-500"
        style={{
          opacity: scrollProgress > 0.45 ? 0 : 1,
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}
