'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTheme } from '../../context/ThemeContext';
import CameraController from './CameraController';
import AtmosphereParticles from './AtmosphereParticles';

export default function Scene({ scrollProgress = 0 }) {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 48, near: 0.1, far: 260 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <color attach="background" args={[theme.bg]} />
        <fog attach="fog" args={[theme.bg, 30, 120]} />

        {/* Cinematic Key & Ambient Lights */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[15, 20, 25]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-10, 5, 0]} intensity={2.0} color={theme.primary} distance={50} />
        <pointLight position={[10, -5, -40]} intensity={2.5} color={theme.accent} distance={60} />
        <pointLight position={[0, 8, -100]} intensity={3.0} color={theme.primary} distance={80} />

        <Suspense fallback={null}>
          <CameraController scrollProgress={scrollProgress} />
          <AtmosphereParticles count={250} />
        </Suspense>
      </Canvas>
    </div>
  );
}
