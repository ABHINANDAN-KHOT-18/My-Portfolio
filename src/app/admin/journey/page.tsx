'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

export default function AdminJourney() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ year: '', title: '', description: '', category: '', imageUrl: '' });

  useEffect(() => {
    fetch('/api/journey')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEntries(data.data);
          if (data.isMock) setError('Running in mock mode. MongoDB is not configured.');
        } else {
          setError(data.error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/journey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success) {
      setEntries([data.data, ...entries]);
      setIsFormOpen(false);
      setFormData({ year: '', title: '', description: '', category: '', imageUrl: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Journey</h1>
        <button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
          <Plus size={18} /> Add Entry
        </button>
      </div>

      {error && <div className="p-4 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-md">{error}</div>}

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4 text-black">
          <h2 className="text-xl font-semibold">Add New Journey Entry</h2>
          <div className="grid grid-cols-2 gap-4">
            <input required type="text" placeholder="Year / Date (e.g. 2024)" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="border p-2 rounded" />
            <input required type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="border p-2 rounded" />
            <input type="text" placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="border p-2 rounded col-span-2" />
          </div>
          <textarea required placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="border p-2 rounded w-full h-24" />
          
          <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
            {formData.imageUrl ? (
              <div className="relative w-full h-48 bg-gray-100 rounded flex items-center justify-center">
                <img src={formData.imageUrl} alt="Preview" className="max-h-full object-contain rounded" />
                <button type="button" onClick={() => setFormData({...formData, imageUrl: ''})} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"><Trash2 size={14}/></button>
              </div>
            ) : (
              <div>
                <ImageIcon className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500 text-sm mb-2">Upload Journey Image (Optional)</p>
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
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Save Entry</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-gray-500 animate-pulse">Loading journey...</div>
      ) : entries.length === 0 ? (
         <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">No journey entries found.</div>
      ) : (
        <div className="space-y-4 text-black">
          {entries.map((entry) => (
            <div key={entry._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex items-start gap-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold shrink-0">
                 {entry.year}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{entry.title}</h3>
                <span className="text-xs font-semibold text-gray-500 uppercase">{entry.category}</span>
                <p className="text-gray-600 mt-2">{entry.description}</p>
              </div>
              <div className="flex gap-3 text-gray-400">
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
