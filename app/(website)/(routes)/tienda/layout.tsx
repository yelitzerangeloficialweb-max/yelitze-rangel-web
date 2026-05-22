import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tienda Oficial | Yelitze Rangel',
    description: 'Adquiere libros, oráculos, meditaciones y herramientas de crecimiento personal creadas por Yelitze Rangel para acompañar tu proceso de sanación.',
    alternates: {
        canonical: 'https://yelitzerangeloficial.com/tienda',
    }
};

export default function TiendaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
