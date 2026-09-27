'use client';

import { motion } from 'framer-motion';

export default function HeroOverlay({ started, onInteract }: { started: boolean, onInteract?: (section: string) => void }) {
  if (!started) return null;

  return (
    <div className="w-full h-full flex flex-col justify-center p-8 md:p-12 lg:p-16">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-xl pointer-events-auto bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-white/10"
      >
        <p className="text-cyan-400 font-mono tracking-widest mb-2 text-sm">HELLO, I'M</p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">ABHINANDAN KHOT</h1>
        <h2 className="text-xl md:text-2xl text-gray-300 mb-6">BCA Student | Aspiring Software Developer</h2>
        <p className="text-gray-400 mb-8 max-w-lg">
          "Passionate about Programming, AI, and Cloud Computing."
        </p>

        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => onInteract && onInteract('Projects')}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded transition-colors"
          >
            Explore My Work
          </button>
          <button 
            onClick={() => onInteract && onInteract('About')}
            className="px-6 py-3 border border-gray-700 hover:border-cyan-400 text-white font-semibold rounded transition-colors"
          >
            About Me
          </button>
          <button 
            onClick={() => {
               alert("Resume is currently not available in demo mode.");
            }}
            className="px-6 py-3 border border-gray-700 hover:border-cyan-400 text-white font-semibold rounded transition-colors flex gap-2 items-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Resume
          </button>
        </div>

        <div className="mt-12 text-gray-500 font-mono text-sm animate-pulse">
          Click / Drag to Explore My Digital World →
        </div>
      </motion.div>
    </div>
  );
}
