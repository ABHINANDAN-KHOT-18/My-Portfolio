import { ReactNode } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 text-sm text-gray-700">
          <Link href="/admin" className="block px-4 py-2 rounded hover:bg-gray-100">Dashboard</Link>
          <Link href="/admin/projects" className="block px-4 py-2 rounded hover:bg-gray-100">Projects</Link>
          <Link href="/admin/certificates" className="block px-4 py-2 rounded hover:bg-gray-100">Certificates</Link>
          <Link href="/admin/journey" className="block px-4 py-2 rounded hover:bg-gray-100">Journey</Link>
          <Link href="/admin/skills" className="block px-4 py-2 rounded hover:bg-gray-100">Skills</Link>
          <Link href="/admin/socials" className="block px-4 py-2 rounded hover:bg-gray-100">Social Links</Link>
          <Link href="/admin/settings" className="block px-4 py-2 rounded hover:bg-gray-100">Settings</Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
           <button className="w-full px-4 py-2 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors">
             Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <header className="bg-white border-b border-gray-200 p-4 md:hidden">
           <h2 className="text-lg font-bold">Admin Panel</h2>
        </header>
        <div className="p-8 text-black">
           {children}
        </div>
      </main>
    </div>
  );
}
