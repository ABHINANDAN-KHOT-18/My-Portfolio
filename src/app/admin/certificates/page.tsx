'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', issuer: '', date: '', description: '', tags: '', imageUrl: '' });

  useEffect(() => {
    fetch('/api/certificates')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCertificates(data.data);
          if (data.isMock) setError('Running in mock mode. MongoDB is not configured.');
        } else {
          setError(data.error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, tags: formData.tags.split(',').map(t => t.trim()) };
    const res = await fetch('/api/certificates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      setCertificates([data.data, ...certificates]);
      setIsFormOpen(false);
      setFormData({ name: '', issuer: '', date: '', description: '', tags: '', imageUrl: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Certificates</h1>
        <button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
          <Plus size={18} /> Add Certificate
        </button>
      </div>

      {error && <div className="p-4 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-md">{error}</div>}

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4 text-black">
          <h2 className="text-xl font-semibold">Add New Certificate</h2>
          <div className="grid grid-cols-2 gap-4">
            <input required type="text" placeholder="Certificate Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border p-2 rounded" />
            <input required type="text" placeholder="Issuer (e.g. AWS)" value={formData.issuer} onChange={e => setFormData({...formData, issuer: e.target.value})} className="border p-2 rounded" />
            <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="border p-2 rounded" />
            <input type="text" placeholder="Tags (comma separated)" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="border p-2 rounded" />
          </div>
          <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="border p-2 rounded w-full h-24" />
          
          <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
            {formData.imageUrl ? (
              <div className="relative w-full h-48 bg-gray-100 rounded flex items-center justify-center">
                <img src={formData.imageUrl} alt="Preview" className="max-h-full object-contain rounded" />
                <button type="button" onClick={() => setFormData({...formData, imageUrl: ''})} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"><Trash2 size={14}/></button>
              </div>
            ) : (
              <div>
                <ImageIcon className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500 text-sm mb-2">Upload Certificate Image</p>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = async () => {
                        const base64String = reader.result as string;
                        // upload to API
                        const res = await fetch('/api/upload', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ image: base64String })
                        });
                        const data = await res.json();
                        if (data.success) {
                          setFormData({...formData, imageUrl: data.url});
                        } else {
                          alert('Upload failed: ' + data.error);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save Certificate</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-gray-500 animate-pulse">Loading certificates...</div>
      ) : certificates.length === 0 ? (
         <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">No certificates found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
          {certificates.map((cert) => (
            <div key={cert._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col">
              <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400 mb-4 border border-gray-200">
                 {cert.imageUrl ? <img src={cert.imageUrl} alt={cert.name} className="w-full h-full object-cover" /> : <ImageIcon size={32} opacity={0.5} />}
              </div>
              <h3 className="font-bold text-lg leading-tight">{cert.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{cert.issuer} • {cert.date}</p>
              <div className="mt-4 flex gap-2">
                {cert.tags?.map((tag: string) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-xs rounded text-gray-600">{tag}</span>
                ))}
              </div>
              <div className="mt-auto pt-6 flex justify-end gap-3 text-gray-400">
                <button className="hover:text-blue-600"><Edit size={18} /></button>
                <button className="hover:text-red-600"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
