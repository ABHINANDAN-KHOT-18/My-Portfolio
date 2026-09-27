export default function AdminDashboard() {
  const stats = [
    { name: 'Total Projects', value: '5', color: 'bg-blue-500' },
    { name: 'Total Certificates', value: '12', color: 'bg-green-500' },
    { name: 'Journey Entries', value: '8', color: 'bg-purple-500' },
    { name: 'Total Skills', value: '25', color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-3xl font-semibold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-full ${stat.color} opacity-10`} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-black">Quick Actions</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Project</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Add Certificate</button>
        </div>
      </div>
    </div>
  );
}
