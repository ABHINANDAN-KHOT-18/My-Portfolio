'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import Workspace from './Workspace';

export default function Scene({ onInteract }: { onInteract?: (section: string) => void }) {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#030303]">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        dpr={[1, 2]} // Optimize for mobile and high DPI
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#030303']} />
        <fog attach="fog" args={['#030303', 10, 25]} />
        
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 10, 8]} intensity={2.5} castShadow />
          <spotLight position={[0, 8, 5]} angle={0.6} penumbra={0.8} intensity={3} color="#0ea5e9" />
          <pointLight position={[-4, 3, 4]} intensity={2.5} color="#06b6d4" />
          <pointLight position={[4, 3, -4]} intensity={2.5} color="#a855f7" />
          
          <Workspace onInteract={onInteract} />
          
          <ContactShadows position={[0, -2.49, 0]} opacity={0.4} scale={20} blur={2} far={4} />
          
          <Environment preset="city" />
          
          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2 - 0.1}
            minAzimuthAngle={-Math.PI / 6}
            maxAzimuthAngle={Math.PI / 6}
            autoRotate={true}
            autoRotateSpeed={0.5}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
