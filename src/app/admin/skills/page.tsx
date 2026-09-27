'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminSkills() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', category: 'Programming' });

  useEffect(() => {
    fetch('/api/skills').then(r => r.json()).then(data => {
      if (data.success) {
        setItems(data.data);
        if (data.isMock) setError('Running in mock mode. MongoDB is not configured.');
      } else setError(data.error);
    }).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/skills', { method: 'POST', body: JSON.stringify(formData) });
    const data = await res.json();
    if (data.success) {
      setItems([...items, data.data]);
      setFormData({ name: '', category: 'Programming' });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Skills</h1>
      {error && <div className="p-4 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-md">{error}</div>}
      
      <form onSubmit={handleSubmit} className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg text-black">
        <input required type="text" placeholder="Skill Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border p-2 rounded flex-1" />
        <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="border p-2 rounded w-48">
          <option>Programming</option><option>Web</option><option>Database</option><option>AI / ML</option><option>Other</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"><Plus size={18}/> Add</button>
      </form>

      {loading ? <div className="animate-pulse">Loading...</div> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-black">
          {items.map(skill => (
            <div key={skill._id} className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center shadow-sm">
              <div>
                <p className="font-semibold">{skill.name}</p>
                <p className="text-xs text-gray-500">{skill.category}</p>
              </div>
              <button className="text-gray-400 hover:text-red-600"><Trash2 size={16}/></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
