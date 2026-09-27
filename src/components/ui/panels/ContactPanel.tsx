'use client';

import { useState } from 'react';
import Modal from '../Modal';

export default function ContactPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call for now (or use real endpoint if implemented)
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="CONNECT">
      <div className="max-w-lg mx-auto w-full">
        <p className="text-gray-400 mb-6 text-center">Have a question or want to work together? Leave a message.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-amber-300 text-sm font-mono mb-1">Name</label>
            <input 
              type="text" 
              required
              className="w-full bg-black/50 border border-amber-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              disabled={status === 'loading'}
            />
          </div>
          
          <div>
            <label className="block text-amber-300 text-sm font-mono mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full bg-black/50 border border-amber-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              disabled={status === 'loading'}
            />
          </div>
          
          <div>
            <label className="block text-amber-300 text-sm font-mono mb-1">Message</label>
            <textarea 
              required
              rows={4}
              className="w-full bg-black/50 border border-amber-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              disabled={status === 'loading'}
            />
          </div>

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <span className="w-5 h-5 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" />
            ) : status === 'success' ? (
              <span>Message Sent!</span>
            ) : (
              <span>Send Message</span>
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
}
