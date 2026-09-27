'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import Workspace from './Workspace';

export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#030303]">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        dpr={[1, 2]} // Optimize for mobile and high DPI
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#030303']} />
        <fog attach="fog" args={['#030303', 5, 20]} />
        
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
          
          <Workspace />
          
          <ContactShadows position={[0, -1.99, 0]} opacity={0.4} scale={20} blur={2} far={4} />
          
          <Environment preset="city" />
          
          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2 + 0.1} // Prevent looking completely from bottom
            minPolarAngle={Math.PI / 4}
            autoRotate={false}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
