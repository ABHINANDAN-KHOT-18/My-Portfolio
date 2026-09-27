'use client';

import { useState, useRef } from 'react';
import { useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InteractiveObjectProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  color?: string;
  hoverColor?: string;
  onClick: () => void;
  label: string;
  geometryType: 'box' | 'plane' | 'cylinder';
  args: any;
}

export default function InteractiveObject({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  color = '#222',
  hoverColor = '#06b6d4',
  onClick,
  label,
  geometryType,
  args,
}: InteractiveObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
      
      // Interpolate color
      const targetColor = new THREE.Color(hovered ? hoverColor : color);
      (meshRef.current.material as THREE.MeshStandardMaterial).color.lerp(targetColor, 0.1);
      
      // Interpolate scale for hover effect
      const targetScale = hovered ? 1.05 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale[0] * targetScale, scale[1] * targetScale, scale[2] * targetScale), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      {geometryType === 'box' && <boxGeometry args={args} />}
      {geometryType === 'plane' && <planeGeometry args={args} />}
      {geometryType === 'cylinder' && <cylinderGeometry args={args} />}
      
      <meshStandardMaterial 
        color={color} 
        roughness={0.2} 
        metalness={0.8}
        emissive={hovered ? hoverColor : '#000000'}
        emissiveIntensity={hovered ? 0.2 : 0}
      />
    </mesh>
  );
}
