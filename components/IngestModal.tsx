'use client';

import { useState } from 'react';

interface IngestModalProps {
  onClose: () => void;
}

export default function IngestModal({ onClose }: IngestModalProps) {
  const [ingestStatus, setIngestStatus] = useState('');
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const sources = [
    {
      id: 'csv',
      icon: '📥',
      title: 'CSV upload',
      subtitle: 'Batch import',
    },
    {
      id: 'iot',
      icon: '🔌',
      title: 'Raspberry Pi',
      subtitle: 'Live POST /api',
    },
    {
      id: 'manual',
      icon: '📋',
      title: 'Manual entry',
      subtitle: 'Form input',
    },
  ];

  const handleIngest = (source: string) => {
    setSelectedSource(source);
    setIngestStatus(`Parsing ${source} data...`);
    setTimeout(() => {
      setIngestStatus(`✓ Passport ingested via ${source} adapter. Aleo ZK-worker queued.`);
      setTimeout(onClose, 1500);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg border border-gray-300 shadow-lg w-96">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <span className="text-sm font-semibold">Ingest passport data</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-gray-600">
            All sources are normalised through the Zod schema before hitting the store.
          </p>

          {/* Source options */}
          <div className="grid grid-cols-3 gap-3">
            {sources.map((source) => (
              <div
                key={source.id}
                onClick={() => handleIngest(source.id)}
                className="border border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="text-2xl mb-2">{source.icon}</div>
                <div className="text-xs font-semibold">{source.title}</div>
                <div className="text-xs text-gray-500 mt-1">{source.subtitle}</div>
              </div>
            ))}
          </div>

          {/* Status */}
          {ingestStatus && (
            <div
              className={`text-xs p-2 rounded ${
                ingestStatus.includes('✓')
                  ? 'bg-green-50 text-green-800'
                  : 'bg-blue-50 text-blue-800'
              }`}
            >
              {ingestStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
