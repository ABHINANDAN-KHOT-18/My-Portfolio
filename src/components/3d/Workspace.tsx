'use client';

import { Group } from 'three';
import InteractiveObject from './InteractiveObject';
import { Html } from '@react-three/drei';

export default function Workspace({ onInteract }: { onInteract?: (section: string) => void }) {
  const handleInteract = (section: string) => {
    console.log(`Navigating to ${section}`);
    if (section === 'GitHub') {
      window.open('https://github.com/ABHINANDAN-KHOT-18', '_blank');
    } else if (onInteract) {
      onInteract(section);
    }
  };

  return (
    <group position={[0, -0.5, 0]} scale={[1, 1, 1]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
      </mesh>

      {/* Developer Desk */}
      <group position={[0, -0.5, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[5.5, 0.2, 2.8]} />
          <meshStandardMaterial color="#1f1f1f" roughness={0.6} metalness={0.2} />
        </mesh>
        {/* Desk Legs */}
        <mesh position={[-2.5, -0.75, -1.2]} castShadow>
          <boxGeometry args={[0.2, 1.5, 0.2]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[2.5, -0.75, -1.2]} castShadow>
          <boxGeometry args={[0.2, 1.5, 0.2]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[-2.5, -0.75, 1.2]} castShadow>
          <boxGeometry args={[0.2, 1.5, 0.2]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[2.5, -0.75, 1.2]} castShadow>
          <boxGeometry args={[0.2, 1.5, 0.2]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </group>

      {/* Monitor -> Projects */}
      <group position={[0, 0.7, -0.5]}>
        <InteractiveObject
          position={[0, 0, 0]}
          geometryType="box"
          args={[3, 1.7, 0.1]}
          label="Projects"
          color="#151515"
          hoverColor="#0ea5e9"
          onClick={() => handleInteract('Projects')}
        />
        {/* Monitor Stand */}
        <mesh position={[0, -0.85, -0.1]}>
          <cylinderGeometry args={[0.15, 0.25, 0.7]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <Html transform position={[0, 0, 0.06]} scale={0.16} pointerEvents="none">
          <div className="w-80 h-44 bg-black/90 border-2 border-cyan-400/50 rounded shadow-[0_0_25px_rgba(6,182,212,0.4)] flex flex-col items-center justify-center text-cyan-300 font-mono text-2xl overflow-hidden">
             <div className="flex gap-3">
               <span className="text-pink-400">const</span> 
               <span className="text-white font-black tracking-widest text-3xl drop-shadow-md">PROJECTS</span>
             </div>
             <div className="text-cyan-300 font-bold text-lg mt-4 border-2 border-cyan-400/60 px-4 py-2 rounded bg-cyan-900/40">Explore Work →</div>
          </div>
        </Html>
      </group>

      {/* Certificate Wall */}
      <group position={[1.8, 2.2, -1.4]} rotation={[0, -0.2, 0]}>
        <InteractiveObject
          position={[0, 0, 0]}
          geometryType="plane"
          args={[2.2, 1.4]}
          label="Certificates"
          color="#1a1a1a"
          hoverColor="#eab308"
          onClick={() => handleInteract('Certificates')}
        />
        <Html transform position={[0, 0, 0.02]} scale={0.16} pointerEvents="none">
          <div className="w-72 h-44 border-[4px] border-yellow-400/80 flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.3)] bg-black/80 backdrop-blur">
            <span className="text-3xl text-yellow-300 font-serif tracking-widest font-black drop-shadow-lg">CERTIFICATIONS</span>
          </div>
        </Html>
      </group>

      {/* Tech Stack Screen */}
      <group position={[1.8, 0.3, 0]} rotation={[0, -0.4, 0.1]}>
        <InteractiveObject
          position={[0, 0, 0]}
          geometryType="box"
          args={[1, 1.4, 0.05]}
          label="Skills"
          color="#111"
          hoverColor="#a855f7"
          onClick={() => handleInteract('Skills')}
        />
        <Html transform position={[0, 0, 0.03]} scale={0.16} pointerEvents="none">
          <div className="w-48 h-64 bg-black/90 border-2 border-purple-400/60 rounded flex flex-col items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.4)] p-4">
            <div className="text-purple-300 font-mono font-black text-3xl mb-5 text-center tracking-widest drop-shadow-md">TECH<br/>STACK</div>
            <div className="text-gray-200 font-semibold text-sm text-center space-y-2">
              <p>React • Next.js</p>
              <p>Node • MongoDB</p>
              <p>Cloud • AI</p>
            </div>
          </div>
        </Html>
      </group>

      {/* Laptop -> About */}
      <group position={[-1.6, -0.2, 0.4]} rotation={[-0.1, 0.5, 0]}>
        <InteractiveObject
          position={[0, 0, 0]}
          geometryType="box"
          args={[1.4, 0.1, 1]}
          label="About Me"
          color="#1a1a1a"
          hoverColor="#f43f5e"
          onClick={() => handleInteract('About')}
        />
        {/* Laptop Screen */}
        <mesh position={[0, 0.5, -0.45]} rotation={[-0.1, 0, 0]}>
           <boxGeometry args={[1.4, 0.9, 0.05]} />
           <meshStandardMaterial color="#050505" />
        </mesh>
        <Html transform position={[0, 0.5, -0.41]} rotation={[-0.1, 0, 0]} scale={0.16} pointerEvents="none">
          <div className="text-rose-300 font-mono text-2xl font-black bg-black/90 px-5 py-3 border-2 border-rose-400/70 rounded shadow-[0_0_25px_rgba(244,63,94,0.4)] tracking-widest drop-shadow-md">
            ABOUT_ME
          </div>
        </Html>
      </group>

      {/* GitHub Terminal */}
      <group position={[-2.4, -0.1, 0.9]} rotation={[0, 0.7, 0]}>
        <InteractiveObject
          position={[0, 0, 0]}
          geometryType="box"
          args={[0.8, 0.8, 0.8]}
          label="GitHub"
          color="#111"
          hoverColor="#22c55e"
          onClick={() => handleInteract('GitHub')}
        />
        <Html transform position={[0, 0.15, 0.41]} scale={0.16} pointerEvents="none">
          <div className="text-green-300 font-mono text-2xl font-black bg-black/95 px-4 py-3 border-2 border-green-400/70 rounded shadow-[0_0_25px_rgba(34,197,94,0.4)] flex flex-col items-center gap-3 drop-shadow-md">
            <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            <span>GITHUB</span>
          </div>
        </Html>
      </group>

      {/* Contact Phone */}
      <group position={[2.5, -0.38, 0.9]} rotation={[-Math.PI / 2, 0, -0.4]}>
        <InteractiveObject
          position={[0, 0, 0]}
          geometryType="box"
          args={[0.5, 1, 0.05]}
          label="Contact"
          color="#111"
          hoverColor="#f59e0b"
          onClick={() => handleInteract('Contact')}
        />
        <Html transform position={[0, 0, 0.03]} scale={0.14} pointerEvents="none">
          <div className="w-24 h-48 border-[3px] border-amber-400/60 rounded-xl flex flex-col items-center justify-center bg-black/90 shadow-[0_0_25px_rgba(245,158,11,0.4)]">
             <div className="w-6 h-6 bg-cyan-300 rounded-full animate-pulse mb-4 shadow-[0_0_15px_rgba(103,232,249,1)]" />
             <div className="text-lg text-amber-300 font-mono font-black tracking-widest drop-shadow-md">CONNECT</div>
          </div>
        </Html>
      </group>

    </group>
  );
}
