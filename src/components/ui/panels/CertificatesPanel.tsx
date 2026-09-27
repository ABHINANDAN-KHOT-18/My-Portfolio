'use client';

import { useState, useEffect } from 'react';
import Modal from '../Modal';

interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
}

export default function CertificatesPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    
    fetch('/api/certificates')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCertificates(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="CERTIFICATIONS">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div key={cert._id} className="bg-white/5 border border-white/10 rounded-lg p-5 hover:border-yellow-500/50 transition-colors group">
              {cert.imageUrl ? (
                <div className="w-full h-48 bg-black/50 rounded mb-4 overflow-hidden border border-white/5">
                  <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
              ) : (
                <div className="w-full h-48 bg-yellow-900/10 rounded mb-4 border border-yellow-500/20 flex flex-col items-center justify-center text-yellow-500/50">
                   <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                   <span>Certificate</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-yellow-300 mb-1">{cert.title}</h3>
              <p className="text-gray-300 font-medium mb-1">{cert.issuer}</p>
              <p className="text-gray-500 text-sm mb-4">Issued: {cert.date ? new Date(cert.date).toLocaleDateString() : 'N/A'}</p>
              
              <div className="flex gap-3">
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-sm px-3 py-1.5 bg-yellow-500/10 text-yellow-400 rounded hover:bg-yellow-500/20 transition-colors flex items-center gap-2">
                    Verify Credential <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                )}
              </div>
            </div>
          ))}
          {certificates.length === 0 && <div className="text-gray-500 col-span-full">No certificates found.</div>}
        </div>
      )}
    </Modal>
  );
}
