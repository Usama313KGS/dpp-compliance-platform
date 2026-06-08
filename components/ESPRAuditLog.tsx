'use client';

import { AUDIT } from '@/lib/data';

export default function ESPRAuditLog() {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-sm font-semibold">ESPR Compliance Audit Log</h2>
          <span className="text-xs px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-medium">
            Append-only
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Timestamp</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Action</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Passport</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Source</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Schema</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Hash</th>
              </tr>
            </thead>
            <tbody>
              {AUDIT.map((entry, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{entry.ts}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        entry.action === 'validation_fail'
                          ? 'bg-red-100 text-red-800'
                          : entry.action === 'proof_gen'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {entry.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{entry.id}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 border border-gray-300 rounded-full">
                      {entry.src}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{entry.schema}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{entry.hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
