'use client';

import { useState } from 'react';
import { PASSPORTS } from '@/lib/data';
import { scoreColor, categoryIcon, categoryBg, statusLabel, statusIcon } from '@/lib/utils';

interface PassportListProps {
  onSelectPassport: (id: string) => void;
}

export default function PassportList({ onSelectPassport }: PassportListProps) {
  const [filterText, setFilterText] = useState('');

  const filtered = PASSPORTS.filter(p =>
    filterText === '' ||
    p.name.toLowerCase().includes(filterText.toLowerCase()) ||
    p.id.toLowerCase().includes(filterText.toLowerCase()) ||
    p.manufacturer.toLowerCase().includes(filterText.toLowerCase())
  );

  const verifiedCount = PASSPORTS.filter(p => p.status === 'verified').length;
  const pendingCount = PASSPORTS.filter(p => p.status === 'pending').length;
  const failCount = PASSPORTS.filter(p => p.status === 'fail').length;

  return (
    <div className="w-full">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 mb-2">📋 Total passports</div>
          <div className="text-2xl font-semibold">{PASSPORTS.length}</div>
          <div className="text-xs text-gray-500 mt-1">+1 this week</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 mb-2">✅ ZK-verified</div>
          <div className="text-2xl font-semibold text-green-600">{verifiedCount}</div>
          <div className="text-xs text-gray-500 mt-1">3 proofs on-chain</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 mb-2">⏱️ Awaiting proof</div>
          <div className="text-2xl font-semibold">{pendingCount}</div>
          <div className="text-xs text-gray-500 mt-1">Aleo worker queued</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 mb-2">⚠️ Validation fails</div>
          <div className="text-2xl font-semibold text-red-600">{failCount}</div>
          <div className="text-xs text-gray-500 mt-1">Schema mismatch</div>
        </div>
      </div>

      {/* Schema banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-5 flex items-center justify-between text-sm">
        <span className="text-yellow-800">
          ℹ️ ESPR delegated act update: Microplastic tracking field becomes mandatory Q3 2026. <strong>Schema v2.0.0 migration ready.</strong>
        </span>
      </div>

      {/* Passport list */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold">Passport registry</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search passports…"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="text-xs px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600"></th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Product</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Source</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Repair score</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Carbon (kg CO₂e)</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => onSelectPassport(p.id)}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${categoryBg(p.category)}`}>
                      <span>{categoryIcon(p.category) === 'wash-machine' ? '🧺' : categoryIcon(p.category) === 'solar-panel' ? '☀️' : categoryIcon(p.category) === 'box' ? '📦' : categoryIcon(p.category) === 'circuit-board' ? '🔌' : '⚙️'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.id} · {p.manufacturer}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 border border-gray-300 rounded-full">
                      {p.dataSource.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="score-bar" style={{ width: '60px', height: '4px' }}>
                      <div
                        className="score-fill"
                        style={{ width: `${p.repairScore * 10}%`, backgroundColor: scoreColor(p.repairScore) }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{p.repairScore} / 10</div>
                  </td>
                  <td className="px-4 py-3 text-sm">{p.co2} kg</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        p.status === 'verified'
                          ? 'bg-green-100 text-green-800'
                          : p.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {statusLabel(p.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">→</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
