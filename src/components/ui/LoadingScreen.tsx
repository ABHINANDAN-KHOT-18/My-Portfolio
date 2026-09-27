'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen({ onLoaded }: { onLoaded: () => void }) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('INITIALIZING 3D ENVIRONMENT...');

  useEffect(() => {
    const messages = [
      'INITIALIZING 3D ENVIRONMENT...',
      'LOADING ASSETS...',
      'CONNECTING DIGITAL WORLD...',
      'READY.'
    ];
    let msgIndex = 0;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoaded, 500);
          return 100;
        }
        
        const newProgress = prev + Math.floor(Math.random() * 15) + 5;
        
        if (newProgress > 25 && msgIndex === 0) {
          msgIndex = 1;
          setMessage(messages[msgIndex]);
        } else if (newProgress > 60 && msgIndex === 1) {
          msgIndex = 2;
          setMessage(messages[msgIndex]);
        } else if (newProgress >= 100 && msgIndex === 2) {
          msgIndex = 3;
          setMessage(messages[msgIndex]);
        }

        return Math.min(newProgress, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
      <div className="w-full max-w-md px-6">
        <h1 className="text-2xl font-bold tracking-widest text-center mb-8">ABHINANDAN KHOT</h1>
        
        <div className="h-1 w-full bg-gray-800 rounded overflow-hidden">
          <div 
            className="h-full bg-cyan-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center mt-4 text-xs tracking-widest text-cyan-400 font-mono">
          <p>{message}</p>
          <p>{progress}%</p>
        </div>
      </div>
    </div>
  );
}
