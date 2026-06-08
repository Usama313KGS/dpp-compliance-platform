'use client';

import { API_ENDPOINTS } from '@/lib/data';

const methodColor: Record<string, string> = {
  GET: 'bg-blue-100 text-blue-800',
  POST: 'bg-green-100 text-green-800',
  PUT: 'bg-yellow-100 text-yellow-800',
  DELETE: 'bg-red-100 text-red-800',
};

export default function APIEndpoints() {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-sm font-semibold">API Endpoints</h2>
          <span className="text-xs px-2 py-1 bg-gray-100 border border-gray-300 rounded-full">REST · JSON</span>
        </div>
        <div className="divide-y divide-gray-200">
          {API_ENDPOINTS.map((ep, i) => (
            <div key={i} className="p-4 flex items-center gap-4 hover:bg-gray-50">
              <span className={`text-xs px-2 py-1 rounded font-mono font-bold shrink-0 ${methodColor[ep.method] ?? 'bg-gray-100 text-gray-800'}`}>
                {ep.method}
              </span>
              <code className="text-sm font-mono text-gray-900 shrink-0">{ep.path}</code>
              <span className="text-sm text-gray-600 flex-1">{ep.desc}</span>
              <span className="text-xs px-2 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-600 shrink-0">{ep.auth}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-gray-50 rounded-lg border border-gray-200 p-4">
        <p className="text-xs font-semibold text-gray-700 mb-2">Example: POST /api/iot (Raspberry Pi)</p>
        <pre className="text-xs font-mono text-gray-600 overflow-x-auto">{`curl -X POST https://your-app.vercel.app/api/iot \\
  -H "Authorization: Bearer <device-token>" \\
  -H "Content-Type: application/json" \\
  -d '{"passportId":"DPP-005","event":"temp_reading","value":"38.2"}'`}</pre>
      </div>
    </div>
  );
}
