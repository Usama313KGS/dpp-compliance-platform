'use client';

import { useState } from 'react';
import PassportList from './PassportList';
import PassportDetail from './PassportDetail';
import IoTFeed from './IoTFeed';
import ZKProofs from './ZKProofs';
import ESPRAuditLog from './ESPRAuditLog';
import SchemaVersions from './SchemaVersions';
import CSVImports from './CSVImports';
import APIEndpoints from './APIEndpoints';

interface DashboardProps {
  view: string;
  selectedPassportId: string | null;
  onSelectPassport: (id: string) => void;
  onBack: () => void;
}

export default function Dashboard({
  view,
  selectedPassportId,
  onSelectPassport,
  onBack,
}: DashboardProps) {
  if (selectedPassportId) {
    return (
      <PassportDetail
        passportId={selectedPassportId}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
      {view === 'passports' && <PassportList onSelectPassport={onSelectPassport} />}
      {view === 'iot' && <IoTFeed />}
      {view === 'zk' && <ZKProofs />}
      {view === 'espr' && <ESPRAuditLog />}
      {view === 'schema' && <SchemaVersions />}
      {view === 'csv' && <CSVImports />}
      {view === 'api' && <APIEndpoints />}
    </div>
  );
}
