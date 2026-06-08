'use client';

import { SCHEMA_VERSIONS } from '@/lib/data';

export default function SchemaVersions() {
  return (
    <div className="w-full space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        ⚠️ <strong>Breaking change incoming:</strong> Schema v2.0.0 will require microplastic tracking fields. Migration tooling is available — run <code className="bg-yellow-100 px-1 rounded font-mono">npx dpp-migrate@2</code> to update existing passports.
      </div>

      {SCHEMA_VERSIONS.map((sv) => (
        <div key={sv.version} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-sm">{sv.version}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                sv.status === 'active' ? 'bg-green-100 text-green-800' :
                sv.status === 'draft' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-600'
              }`}>
                {sv.status}
              </span>
              {sv.breaking && (
                <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                  Breaking
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">{sv.releaseDate}</span>
          </div>
          <ul className="p-4 space-y-2">
            {sv.changes.map((change, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                {change}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
