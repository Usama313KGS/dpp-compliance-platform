'use client';
export default function Topbar({ onIngestClick }: { onIngestClick: () => void }) {
  return (
    <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between">
      <span className="text-lg font-bold">🌍 DPP Platform</span>
      <button onClick={onIngestClick} className="text-sm px-4 py-1.5 bg-blue-600 text-white rounded-md">
        + Ingest passport
      </button>
    </header>
  );
}