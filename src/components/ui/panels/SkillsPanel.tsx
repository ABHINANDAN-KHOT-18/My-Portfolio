'use client';

import { useState, useEffect } from 'react';
import Modal from '../Modal';

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
}

export default function SkillsPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSkills(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isOpen]);

  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="TECH STACK">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-xl font-bold text-purple-300 mb-4 border-b border-purple-900/30 pb-2">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {skills.filter(s => s.category === category).map((skill) => (
                  <div key={skill._id} className="bg-purple-900/10 border border-purple-500/20 rounded-lg px-4 py-2 hover:bg-purple-900/30 transition-colors">
                    <span className="text-gray-200 font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {skills.length === 0 && <div className="text-gray-500">No skills found.</div>}
        </div>
      )}
    </Modal>
  );
}
