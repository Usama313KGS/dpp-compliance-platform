'use client';

import { CSV_IMPORTS } from '@/lib/data';

export default function CSVImports() {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-sm font-semibold">CSV Import History</h2>
          <span className="text-xs text-gray-500">All rows validated via Zod schema</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">File</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Total Rows</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">OK</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Warnings</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Failed</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Imported At</th>
              </tr>
            </thead>
            <tbody>
              {CSV_IMPORTS.map((imp) => (
                <tr key={imp.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-sm">{imp.filename}</td>
                  <td className="px-4 py-3 text-sm">{imp.rows}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">{imp.ok}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${imp.warn > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>{imp.warn}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${imp.fail > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>{imp.fail}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{imp.ts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
