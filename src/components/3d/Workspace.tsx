'use client';

import { Group } from 'three';
import InteractiveObject from './InteractiveObject';
import { Html } from '@react-three/drei';

export default function Workspace() {
  const handleInteract = (section: string) => {
    console.log(`Navigating to ${section}`);
    // Navigation logic will be handled here
  };

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#050505" />
      </mesh>

      {/* Developer Desk */}
      <mesh position={[0, -0.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[6, 0.2, 3]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>
      {/* Desk Legs */}
      <mesh position={[-2.8, -1.25, -1.2]} castShadow>
        <boxGeometry args={[0.2, 1.5, 0.2]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[2.8, -1.25, -1.2]} castShadow>
        <boxGeometry args={[0.2, 1.5, 0.2]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-2.8, -1.25, 1.2]} castShadow>
        <boxGeometry args={[0.2, 1.5, 0.2]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[2.8, -1.25, 1.2]} castShadow>
        <boxGeometry args={[0.2, 1.5, 0.2]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Monitor -> Projects */}
      <InteractiveObject
        position={[0, 0.8, -0.5]}
        geometryType="box"
        args={[3, 1.8, 0.1]}
        label="Projects"
        color="#111"
        hoverColor="#0ea5e9" // Blue glow
        onClick={() => handleInteract('Projects')}
      />
      {/* Monitor Stand */}
      <mesh position={[0, 0.1, -0.6]}>
        <cylinderGeometry args={[0.1, 0.3, 0.8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <Html position={[0, 0.8, -0.4]} transform center pointerEvents="none">
        <div className="w-64 h-40 bg-[#050505] border border-[#222] rounded flex items-center justify-center text-cyan-400 font-mono text-xs overflow-hidden opacity-80">
          <div>
            <span className="text-pink-500">const</span> projects = <span className="text-yellow-300">await</span> fetchProjects();
            <br />
            <br />
            <span className="text-gray-500">// View Projects →</span>
          </div>
        </div>
      </Html>

      {/* Laptop -> About */}
      <InteractiveObject
        position={[-1.8, -0.3, 0.5]}
        rotation={[-0.2, 0.4, 0]}
        geometryType="box"
        args={[1.2, 0.1, 0.8]}
        label="About Me"
        color="#222"
        onClick={() => handleInteract('About')}
      />
      {/* Laptop Screen */}
      <mesh position={[-1.7, 0.1, 0.2]} rotation={[-0.1, 0.4, 0]}>
         <boxGeometry args={[1.2, 0.8, 0.05]} />
         <meshStandardMaterial color="#111" />
      </mesh>
      <Html position={[-1.7, 0.1, 0.25]} rotation={[-0.1, 0.4, 0]} transform center pointerEvents="none">
        <div className="text-[8px] text-cyan-400 font-mono">
          ABOUT ABHINANDAN →
        </div>
      </Html>

      {/* Code Screen (Tablet/Secondary) -> Skills */}
      <InteractiveObject
        position={[1.8, 0.2, 0]}
        rotation={[0, -0.3, 0.1]}
        geometryType="box"
        args={[1, 1.4, 0.05]}
        label="Skills"
        color="#151515"
        hoverColor="#a855f7" // Purple
        onClick={() => handleInteract('Skills')}
      />
       <Html position={[1.8, 0.2, 0.05]} rotation={[0, -0.3, 0.1]} transform center pointerEvents="none">
        <div className="text-[10px] text-purple-400 font-mono text-center">
          TECH STACK<br/>
          <span className="text-gray-500 text-[8px]">Hover to expand</span>
        </div>
      </Html>

      {/* Certificate Wall */}
      <InteractiveObject
        position={[-4, 2, -3]}
        rotation={[0, 0.5, 0]}
        geometryType="plane"
        args={[2, 1.5]}
        label="Certificates"
        color="#222"
        onClick={() => handleInteract('Certificates')}
      />
      <Html position={[-4, 2, -2.9]} rotation={[0, 0.5, 0]} transform center pointerEvents="none">
        <div className="w-32 h-24 border-2 border-yellow-600 flex items-center justify-center text-[10px] text-yellow-600 font-serif bg-[#0a0a0a]">
          CERTIFICATIONS
        </div>
      </Html>

      {/* Photo / Journey Wall */}
      <InteractiveObject
        position={[4, 2, -3]}
        rotation={[0, -0.5, 0]}
        geometryType="plane"
        args={[2.5, 1.5]}
        label="Journey"
        color="#111"
        hoverColor="#f43f5e" // Rose
        onClick={() => handleInteract('Journey')}
      />
      <Html position={[4, 2, -2.9]} rotation={[0, -0.5, 0]} transform center pointerEvents="none">
        <div className="flex gap-2 p-2 border border-gray-800 bg-[#0a0a0a]">
           <div className="w-10 h-10 bg-gray-800" />
           <div className="w-10 h-10 bg-gray-700" />
           <div className="w-10 h-10 bg-gray-800" />
        </div>
      </Html>

      {/* GitHub Terminal */}
      <InteractiveObject
        position={[-3, -0.3, 1]}
        rotation={[0, 0.8, 0]}
        geometryType="box"
        args={[0.8, 0.8, 0.8]}
        label="GitHub"
        color="#1a1a1a"
        hoverColor="#22c55e" // Green
        onClick={() => handleInteract('GitHub')}
      />
      <Html position={[-3, 0.15, 1]} rotation={[0, 0.8, 0]} transform center pointerEvents="none">
        <div className="text-[12px] text-green-400 font-mono">
          &gt;_ GITHUB
        </div>
      </Html>

      {/* Contact Area (Phone/Device) */}
      <InteractiveObject
        position={[2.5, -0.35, 1.2]}
        rotation={[-Math.PI / 2, 0, -0.5]}
        geometryType="box"
        args={[0.6, 1.2, 0.05]}
        label="Contact"
        color="#000"
        hoverColor="#eab308" // Yellow
        onClick={() => handleInteract('Contact')}
      />
      <Html position={[2.5, -0.3, 1.2]} rotation={[-Math.PI / 2, 0, -0.5]} transform center pointerEvents="none">
        <div className="w-10 h-16 border border-gray-700 rounded-lg flex flex-col items-center justify-center bg-[#0a0a0a]">
           <div className="w-4 h-4 bg-cyan-500 rounded-full animate-pulse mb-1" />
           <div className="text-[6px] text-gray-400">CONNECT</div>
        </div>
      </Html>

    </group>
  );
}
