import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sobre Mí | Yelitze Rangel',
    description: 'Conoce a Yelitze Rangel, terapeuta experta en sanación transgeneracional, sistémica y sabiduría ancestral. Descubre su trayectoria y filosofía de vida.',
    alternates: {
        canonical: 'https://yelitzerangeloficial.com/sobre-mi',
    }
};

export default function SobreMiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
