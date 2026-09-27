'use client';

import { useState, useEffect } from 'react';
import Scene from '@/components/3d/Scene';
import HeroOverlay from '@/components/ui/HeroOverlay';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Fallback from '@/components/ui/Fallback';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return <Fallback />;
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#030303]">
      {!loaded && <LoadingScreen onLoaded={() => setLoaded(true)} />}
      
      {/* 3D Scene */}
      <div className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Scene />
      </div>

      {/* HTML Overlay */}
      <HeroOverlay started={loaded} />
    </main>
  );
}
