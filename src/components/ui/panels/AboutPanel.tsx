'use client';

import { useState, useEffect } from 'react';
import Modal from '../Modal';

export default function AboutPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setProfile(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ABOUT ME">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-6 text-gray-300 leading-relaxed max-w-2xl mx-auto">
          <div className="text-center mb-8">
             <h2 className="text-3xl font-bold text-white mb-2">{profile?.name || 'Abhinandan Khot'}</h2>
             <p className="text-rose-400 font-mono text-lg">{profile?.title || 'BCA Student | Aspiring Software Developer'}</p>
          </div>
          
          <div className="bg-white/5 border border-rose-900/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-rose-300 mb-4 border-b border-rose-900/30 pb-2">Background</h3>
            <p className="whitespace-pre-line text-lg">
              {profile?.bio || `Passionate about Programming, AI, and Cloud Computing. 
              
Currently pursuing BCA and expanding my knowledge across full-stack development. I enjoy building applications that solve real problems, learning new frameworks, and continuously improving my technical skillset.`}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
