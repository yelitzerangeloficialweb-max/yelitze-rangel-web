import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tests de Autoexploración Somática y Sistémica | Yelitze Rangel',
    description: 'Realiza nuestros tests gratuitos sobre heridas de la infancia, relación con el dinero y creencias del amor para iniciar tu viaje de autoconocimiento.',
    alternates: {
        canonical: 'https://yelitzerangeloficial.com/tests',
    }
};

export default function TestsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
