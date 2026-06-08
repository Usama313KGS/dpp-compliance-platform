import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DPP Compliance Platform',
  description: 'Digital Product Passport - ESPR Compliance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}