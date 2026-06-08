'use client';

import { IOT_FEED } from '@/lib/data';

export default function IoTFeed() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 mb-2">🔌 Active Devices</div>
          <div className="text-2xl font-semibold">4</div>
          <div className="text-xs text-gray-500 mt-1">Raspberry Pi nodes</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 mb-2">📡 Events Today</div>
          <div className="text-2xl font-semibold">142</div>
          <div className="text-xs text-gray-500 mt-1">POST /api/iot</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 mb-2">⚠️ Alerts</div>
          <div className="text-2xl font-semibold text-yellow-600">2</div>
          <div className="text-xs text-gray-500 mt-1">Require review</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Live IoT Event Feed</h2>
          <span className="flex items-center gap-1.5 text-xs text-green-600">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
            Live
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Timestamp</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Device</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Event</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Value</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Passport</th>
                <th className="px-4 py-3 text-left font-semibold text-xs text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {IOT_FEED.map((evt) => (
                <tr key={evt.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{evt.ts}</td>
                  <td className="px-4 py-3 text-xs font-medium">{evt.device}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{evt.event}</td>
                  <td className="px-4 py-3 text-xs font-mono">{evt.value}</td>
                  <td className="px-4 py-3 text-xs text-blue-600">{evt.passport}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      evt.status === 'ok' ? 'bg-green-100 text-green-800' :
                      evt.status === 'warn' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {evt.status}
                    </span>
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
