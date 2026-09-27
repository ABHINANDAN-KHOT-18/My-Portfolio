'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.data);
          if (data.isMock) {
            setError('Running in mock mode. MongoDB is not configured.');
          }
        } else {
          setError(data.error);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          <Plus size={18} /> Add Project
        </button>
      </div>

      {error && (
        <div className="p-4 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-gray-500 animate-pulse">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
          No projects found. Start by adding one.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden text-black">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{project.title}</td>
                  <td className="p-4 text-gray-600 truncate max-w-xs">{project.shortDescription}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {project.status || 'Completed'}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-3 text-gray-500">
                    <button className="hover:text-blue-600"><Edit size={18} /></button>
                    <button className="hover:text-red-600"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
