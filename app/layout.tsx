import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IPPPB | Instituto Politécnico Privado Padre Builu',
  description: 'Site oficial do Instituto Politécnico Privado Padre Builu',
  icons: [{ rel: 'icon', url: '/ipppb/pic.png' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
