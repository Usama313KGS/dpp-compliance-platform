'use client';

import { useState } from 'react';
import { PASSPORTS } from '@/lib/data';
import { scoreColor, statusLabel } from '@/lib/utils';

interface PassportDetailProps {
  passportId: string;
  onBack: () => void;
}

export default function PassportDetail({ passportId, onBack }: PassportDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const passport = PASSPORTS.find(p => p.id === passportId);

  if (!passport) {
    return <div className="p-5">Passport not found</div>;
  }

  const totalCarbon = Object.values(passport.carbon).reduce((a, b) => a + b, 0);
  const avgRecycled = Math.round(passport.materials.reduce((a, m) => a + m.recycled, 0) / passport.materials.length);

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
      <button
        onClick={onBack}
        className="mb-4 text-sm px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100"
      >
        ← Back to registry
      </button>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-1">{passport.name}</h1>
            <p className="text-sm text-gray-600">
              {passport.id} · {passport.manufacturer} · Manufactured {passport.manufacturedAt}
            </p>
          </div>
          <div className="flex gap-2">
            <span className="text-xs px-3 py-1 bg-gray-100 border border-gray-300 rounded-full">
              {passport.dataSource.toUpperCase()}
            </span>
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                passport.status === 'verified'
                  ? 'bg-green-100 text-green-800'
                  : passport.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {statusLabel(passport.status)}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {['overview', 'materials', 'carbon', 'zkproof'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'materials' && 'Materials'}
              {tab === 'carbon' && 'Carbon Footprint'}
              {tab === 'zkproof' && 'ZK Proof'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-600 mb-2">Repairability Index (EU)</p>
                <p className="text-xl font-semibold" style={{ color: scoreColor(passport.repairScore) }}>
                  {passport.repairScore} / 10
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-2">Spare Parts Availability</p>
                <p className="text-xl font-semibold">{passport.spareYears} years</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-2">Total Carbon Footprint</p>
                <p className="text-xl font-semibold">{passport.co2} kg CO₂e</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-2">Material Types</p>
                <p className="text-xl font-semibold">{passport.materials.length} components</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-2">Avg Recycled Content</p>
                <p className="text-xl font-semibold text-green-600">{avgRecycled}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-2">Schema Version</p>
                <p className="text-xl font-semibold">v1.0.0</p>
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div>
              {passport.materials.map((material, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{material.name}</span>
                    <span className="text-sm text-gray-600">{material.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${material.pct}%`,
                        backgroundColor:
                          material.recycled > 50 ? '#3B6D11' : material.recycled > 20 ? '#BA7517' : '#A32D2D',
                      }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">Recycled content</span>
                    <span className="text-xs font-medium">{material.recycled}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'carbon' && (
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xs text-gray-600 mb-1">Manufacturing</p>
                <p className="text-lg font-semibold">{passport.carbon.mfg}</p>
                <p className="text-xs text-gray-500">kg CO₂e</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xs text-gray-600 mb-1">Transport</p>
                <p className="text-lg font-semibold">{passport.carbon.transport}</p>
                <p className="text-xs text-gray-500">kg CO₂e</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xs text-gray-600 mb-1">Use Phase</p>
                <p className="text-lg font-semibold">{passport.carbon.use}</p>
                <p className="text-xs text-gray-500">kg CO₂e</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xs text-gray-600 mb-1">End of Life</p>
                <p className="text-lg font-semibold">{passport.carbon.eol}</p>
                <p className="text-xs text-gray-500">kg CO₂e</p>
              </div>
            </div>
          )}

          {activeTab === 'zkproof' && (
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-sm font-semibold mb-2">🔒 Aleo ZK-proof Status</p>
              {passport.proof ? (
                <>
                  <p className="text-xs text-gray-600 mb-2">Proof Hash (Aleo Network)</p>
                  <code className="text-xs bg-white p-2 rounded border border-gray-300 block mb-3 font-mono break-all">
                    {passport.proof}...
                  </code>
                  <p className="text-xs text-gray-600">Verified on-chain ✅</p>
                </>
              ) : (
                <>
                  <p className="text-xs text-gray-600 mb-2">Status: Pending</p>
                  <p className="text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
                    ⏱️ ZK-worker is generating proof — this may take 20–40 seconds
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
