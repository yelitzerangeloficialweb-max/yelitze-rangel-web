import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Eventos y Workshops | Yelitze Rangel',
    description: 'Participa en talleres presenciales y workshops online guiados por Yelitze Rangel. Espacios de transformación profunda y sanación somática.',
    alternates: {
        canonical: 'https://yelitzerangeloficial.com/eventos',
    }
};

export default function EventosLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
