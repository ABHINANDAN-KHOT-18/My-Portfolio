'use client';

export default function Fallback() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400">ABHINANDAN KHOT</h1>
        <h2 className="text-xl md:text-2xl text-gray-400">BCA Student | Aspiring Software Developer</h2>
        <p className="text-gray-500">WebGL is unavailable in your browser. Welcome to the 2D experience.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {['About', 'Skills', 'Projects', 'Certificates', 'Journey', 'GitHub', 'Contact'].map((item) => (
            <button key={item} className="p-4 border border-gray-800 hover:border-cyan-400 rounded-lg transition-colors">
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
