'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// 4-Stage Synchronized Camera Path:
// Stage 1 (0.00 -> 0.12): Image zoom plunge (Camera: 14 -> 6)
// Stage 2 (0.12 -> 0.38): Hero Video + SADDAM LAKHO Portal flight (Camera: 6 -> -15)
// Stage 3 (0.38 -> 0.65): About Video & Craft Orbit (Camera: -15 -> -35)
// Stage 4 (0.65 -> 1.00): 3D Projects, Skills, AI Core & Contact Finale (Camera: -35 -> -175)

export default function CameraController({ scrollProgress = 0 }) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0, 14));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const p = Math.min(1, Math.max(0, scrollProgress));

    const mouseX = state.pointer.x * 0.8;
    const mouseY = state.pointer.y * 0.5;

    let targetX = mouseX;
    let targetY = mouseY;
    let targetZ = 14;
    let lookX = 0;
    let lookY = 0;
    let lookZ = 0;

    if (p < 0.12) {
      // Stage 1: Image Zoom-Through
      const f = p / 0.12;
      targetZ = 14 - f * 8; // 14 to 6
      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;
      lookZ = -10;
    } else if (p < 0.38) {
      // Stage 2: Hero Video & Typography Portal Flight
      const f = (p - 0.12) / 0.26;
      targetZ = 6 - f * 21; // 6 to -15
      targetX = Math.sin(f * Math.PI) * 2.0 + mouseX;
      targetY = f * 0.5 + mouseY;
      lookZ = targetZ - 12;
    } else if (p < 0.65) {
      // Stage 3: About Video Orbit
      const f = (p - 0.38) / 0.27;
      targetZ = -15 - f * 20; // -15 to -35
      targetX = -Math.sin(f * Math.PI) * 2.5 + mouseX;
      targetY = -f * 0.4 + mouseY;
      lookZ = targetZ - 14;
    } else if (p < 0.88) {
      // Stage 4A: 7 Projects 3D Serpentine Flyby
      const f = (p - 0.65) / 0.23;
      targetZ = -35 - f * 95; // -35 to -130
      targetX = Math.sin(f * Math.PI * 3.5) * 3.2 + mouseX;
      targetY = Math.cos(f * Math.PI * 2) * 0.8 + mouseY;
      lookX = -Math.sin(f * Math.PI * 3.5) * 1.5;
      lookZ = targetZ - 12;
    } else if (p < 0.95) {
      // Stage 4B: AI Neural Core Matrix
      const f = (p - 0.88) / 0.07;
      targetZ = -130 - f * 25; // -130 to -155
      targetX = Math.cos(f * Math.PI) * 3.0 + mouseX;
      lookZ = -145;
    } else {
      // Stage 4C: Finale Monolith "LET'S BUILD SOMETHING"
      const f = (p - 0.95) / 0.05;
      targetZ = -155 - f * 20; // -155 to -175
      targetX = mouseX * 0.3;
      targetY = mouseY * 0.3;
      lookZ = -185;
    }

    // Smooth cinematic camera damping
    currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, targetX, 3.8, delta);
    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetY, 3.8, delta);
    currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, targetZ, 4.2, delta);

    currentTarget.current.x = THREE.MathUtils.damp(currentTarget.current.x, lookX, 3.8, delta);
    currentTarget.current.y = THREE.MathUtils.damp(currentTarget.current.y, lookY, 3.8, delta);
    currentTarget.current.z = THREE.MathUtils.damp(currentTarget.current.z, lookZ, 4.2, delta);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
