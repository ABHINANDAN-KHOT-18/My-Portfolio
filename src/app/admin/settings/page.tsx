'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(data => {
      if (data.success) {
        setItems(data.data);
        if (data.isMock) setError('Running in mock mode. MongoDB is not configured.');
      } else setError(data.error);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          <Save size={18} /> Save Changes
        </button>
      </div>

      {error && <div className="p-4 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-md">{error}</div>}

      {loading ? <div className="animate-pulse">Loading...</div> : (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4 text-black">
          {items.map(setting => (
            <div key={setting._id} className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700 uppercase">{setting.key}</label>
              <input type="text" defaultValue={setting.value} className="border p-2 rounded max-w-lg" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
