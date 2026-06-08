'use client';

import { PASSPORTS } from '@/lib/data';

export default function ZKProofs() {
  const verifiedPassports = PASSPORTS.filter(p => p.proof);

  return (
    <div className="w-full">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 mb-2">🛡️ Proofs Generated</div>
          <div className="text-2xl font-semibold">{verifiedPassports.length}</div>
          <div className="text-xs text-gray-500 mt-1">All on Aleo testnet</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 mb-2">⏱️ Avg Proof Time</div>
          <div className="text-2xl font-semibold">28s</div>
          <div className="text-xs text-gray-500 mt-1">WASM Web Worker</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 mb-2">🔌 Worker Status</div>
          <div className="text-2xl font-semibold text-green-600">Online</div>
          <div className="text-xs text-gray-500 mt-1">Main thread free</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 mb-2">🔒 Data Exposed</div>
          <div className="text-2xl font-semibold text-green-600">0 fields</div>
          <div className="text-xs text-gray-500 mt-1">ZK guarantees</div>
        </div>
      </div>

      {/* ZK Proof Log */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-5">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold">ZK Proof Log</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Passport</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Proof Hash</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Circuit Inputs</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Generated</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {verifiedPassports.map((p) => (
                <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{p.id}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600 break-all">{p.proof}…</td>
                  <td className="px-4 py-3 text-xs text-gray-600">carbon · repair · recycled</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.manufacturedAt}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                      On-chain
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Architecture */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold">Architecture: Why ZK Stays Source-Agnostic</h2>
        </div>
        <div className="p-4 text-sm text-gray-700 leading-relaxed">
          <p>
            The Aleo worker receives only three scalar fields extracted from <code className="bg-gray-100 px-1 rounded font-mono">NormalizedPassport</code>. It never sees the raw CSV row, IoT payload, or form input. The <code className="bg-gray-100 px-1 rounded font-mono">generatePassportProof()</code> function maps fields to integer milliunits so the Aleo circuit (which operates over finite fields) receives stable, deterministic inputs regardless of data origin.
          </p>
        </div>
      </div>
    </div>
  );
}
