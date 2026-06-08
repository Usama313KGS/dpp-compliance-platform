'use client';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: 'passports', label: 'Passport Registry', icon: '📋' },
  { id: 'iot', label: 'IoT Feed', icon: '🔌' },
  { id: 'zk', label: 'ZK Proofs', icon: '🛡️' },
  { id: 'espr', label: 'ESPR Audit Log', icon: '📜' },
  { id: 'schema', label: 'Schema Versions', icon: '🗂️' },
  { id: 'csv', label: 'CSV Imports', icon: '📥' },
  { id: 'api', label: 'API Endpoints', icon: '⚡' },
];

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col min-h-full shrink-0">
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left ${
              currentView === item.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
            }`}>
            <span>{item.icon}</span><span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-gray-200 text-center">
        <div className="text-xs text-gray-500">DPP Compliance Platform</div>
        <div className="text-xs text-gray-400 mt-1">Schema v1.1.0 active</div>
      </div>
    </aside>
  );
}