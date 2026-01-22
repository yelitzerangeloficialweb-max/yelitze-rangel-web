import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yelitzé Rangel | Sanación Ancestral',
  description: 'Sana tus raíces, transforma tu vida. Terapias de constelaciones familiares y sanación ancestral.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
