import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Servicios y Terapias | Yelitze Rangel',
    description: 'Explora las terapias individuales, grupales, corporales y de coaching ancestral para sanar traumas del pasado y liberar tu fuerza vital.',
    alternates: {
        canonical: 'https://yelitzerangeloficial.com/servicios',
    }
};

export default function ServiciosLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
