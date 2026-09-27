'use client';

import { useState, useEffect } from 'react';
import Scene from '@/components/3d/Scene';
import HeroOverlay from '@/components/ui/HeroOverlay';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Fallback from '@/components/ui/Fallback';
import ProjectsPanel from '@/components/ui/panels/ProjectsPanel';
import CertificatesPanel from '@/components/ui/panels/CertificatesPanel';
import SkillsPanel from '@/components/ui/panels/SkillsPanel';
import AboutPanel from '@/components/ui/panels/AboutPanel';
import ContactPanel from '@/components/ui/panels/ContactPanel';
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);

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
    <main className="flex flex-col md:flex-row w-full min-h-screen bg-[#030303] overflow-x-hidden">
      {!loaded && <LoadingScreen onLoaded={() => setLoaded(true)} />}
      
      {/* HTML Overlay (Left on desktop, Top on mobile) */}
      <div className="w-full md:w-1/2 min-h-screen z-20 flex items-center justify-center relative pointer-events-none">
        <div className="pointer-events-auto w-full flex justify-center">
          <HeroOverlay started={loaded} />
        </div>
      </div>

      {/* 3D Scene (Right on desktop, Bottom on mobile) */}
      <div className={`w-full md:w-1/2 h-[70vh] md:h-screen z-10 relative overflow-hidden transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Scene onInteract={setActiveModal} />
      </div>

      {/* UI Panels */}
      <ProjectsPanel isOpen={activeModal === 'Projects'} onClose={() => setActiveModal(null)} />
      <CertificatesPanel isOpen={activeModal === 'Certificates'} onClose={() => setActiveModal(null)} />
      <SkillsPanel isOpen={activeModal === 'Skills'} onClose={() => setActiveModal(null)} />
      <AboutPanel isOpen={activeModal === 'About'} onClose={() => setActiveModal(null)} />
      <ContactPanel isOpen={activeModal === 'Contact'} onClose={() => setActiveModal(null)} />
    </main>
  );
}
