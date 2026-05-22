import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Galería de Experiencias | Yelitze Rangel',
    description: 'Un viaje visual por los talleres, formaciones y momentos de transformación colectiva facilitados por Yelitze Rangel.',
    alternates: {
        canonical: 'https://yelitzerangeloficial.com/galeria',
    }
};

export default function GaleriaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
