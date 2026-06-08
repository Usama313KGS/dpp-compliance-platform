'use client';

interface TopbarProps {
  onIngestClick: () => void;
}

export default function Topbar({ onIngestClick }: TopbarProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-gray-900">🌍 DPP Platform</span>
        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium border border-green-200">ESPR Ready</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">Aleo testnet · Schema v1.1.0</span>
        <button onClick={onIngestClick} className="text-sm px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
          + Ingest passport
        </button>
      </div>
    </header>
  );
}