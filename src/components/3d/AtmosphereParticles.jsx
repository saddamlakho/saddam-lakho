'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export default function AtmosphereParticles({ count = 300 }) {
  const pointsRef = useRef();
  const { theme } = useTheme();

  const [positions, scales, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color(theme.primary);
    const color2 = new THREE.Color(theme.accent);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = -Math.random() * 180 + 10;
      sca[i] = Math.random() * 0.8 + 0.2;

      const mixed = color1.clone().lerp(color2, Math.random());
      col[i * 3 + 0] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, sca, col];
  }, [count, theme.primary, theme.accent]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <group>
      {/* Subtle, delicate dust particles only — NO grid lines */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-scale"
            count={scales.length}
            array={scales}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.25}
          vertexColors
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
