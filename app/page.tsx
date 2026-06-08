'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import Dashboard from '@/components/Dashboard';
import IngestModal from '@/components/IngestModal';
import '@/styles/globals.css';

export default function Home() {
  const [currentView, setCurrentView] = useState('passports');
  const [selectedPassport, setSelectedPassport] = useState<string | null>(null);
  const [showIngest, setShowIngest] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar onIngestClick={() => setShowIngest(true)} />
      <div className="flex flex-1">
        <Sidebar currentView={currentView} onViewChange={(view) => {
          setCurrentView(view);
          setSelectedPassport(null);
        }} />
        <Dashboard 
          view={currentView} 
          selectedPassportId={selectedPassport}
          onSelectPassport={setSelectedPassport}
          onBack={() => setSelectedPassport(null)}
        />
      </div>
      {showIngest && <IngestModal onClose={() => setShowIngest(false)} />}
    </div>
  );
}
