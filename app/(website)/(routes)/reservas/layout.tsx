import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reservas de Sesiones | Yelitze Rangel',
    description: 'Reserva tu sesión individual de terapia de enfoque sistémico, constelaciones familiares o sanación somática con Yelitze Rangel.',
    alternates: {
        canonical: 'https://yelitzerangeloficial.com/reservas',
    }
};

export default function ReservasLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
