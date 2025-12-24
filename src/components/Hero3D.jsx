// src/components/Hero3D.jsx
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveParticles({ count = 80, isDark }) {
  const mesh = useRef();
  
  // Premium Colors: Deep Blue/Indigo for Dark, Crisp Blue/Sky for Light
  const lightColor = new THREE.Color('#3B82F6'); // Blue-500
  const darkColor = new THREE.Color('#818CF8');  // Indigo-400

  // 1. Generate Particle Data
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      // Spread them out widely
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -30 + Math.random() * 60; // Less vertical spread to keep focus
      const zFactor = -30 + Math.random() * 60;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  // 2. Animation Loop
  useFrame((state) => {
    if (!mesh.current) return;
    
    // Get Mouse Position (Normalized -1 to 1)
    const { mouse } = state;

    // Smoothly tilt the whole group based on mouse position (Parallax)
    // Lerp makes it follow slowly rather than instantly
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouse.y * 0.05, 0.05);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouse.x * 0.05, 0.05);

    // Animate each particle
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      
      // Update time for wave motion
      t = particle.t += speed / 3; // Slower, more majestic drift
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t) * 0.5 + 0.5; // Pulsing scale

      const dummy = new THREE.Object3D();
      
      // Calculate Wave Position
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      
      // Gentle Rotation
      dummy.rotation.set(s * 2, s * 2, s * 2);
      
      // Randomize Scale slightly
      const scale = Math.max(0.5, Math.cos(t) * 1.5);
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      {/* Icosahedron = more techy/faceted than a sphere */}
      <icosahedronGeometry args={[0.15, 0]} />
      {/* Standard Material reacts to light nicely */}
      <meshStandardMaterial 
        color={isDark ? darkColor : lightColor} 
        transparent 
        opacity={isDark ? 0.6 : 0.5}
        roughness={0.4}
        metalness={0.6}
      />
    </instancedMesh>
  );
}

const Hero3D = ({ theme = 'light' }) => {
  const isDark = theme === 'dark' || (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 60 }} 
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]} // Crisp rendering on high-DPI screens
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color={isDark ? "#818CF8" : "#3B82F6"} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="white" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <InteractiveParticles count={70} isDark={isDark} />
        </Float>
        
        {/* Environment Reflection for Metallic Feel */}
        <Environment preset="city" />
        
        {/* Subtle Fog for depth fading */}
        <fog attach="fog" args={[isDark ? '#000000' : '#ffffff', 20, 40]} />
      </Canvas>
    </div>
  );
};

export default Hero3D;