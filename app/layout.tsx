import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'PassportOS - EU ESPR Compliance Platform',
  description: 'Digital Product Passport compliance platform for tracking materials, repairability, and carbon footprint',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className="flex flex-col min-h-screen bg-gray-50">
          {/* Persistent Topbar */}
          <Topbar />

          {/* Main Content Area */}
          <div className="flex flex-1 min-h-0">
            {/* Persistent Sidebar */}
            <Sidebar />

            {/* Dynamic Content Area - Rendered by page.tsx */}
            <main className="flex-1 overflow-y-auto">
              <div className="w-full h-full">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
