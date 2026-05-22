import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contacto | Yelitze Rangel',
    description: 'Ponte en contacto con Yelitze Rangel. Agenda tu consulta de terapia sistémica, haz tus preguntas o solicita información sobre talleres.',
    alternates: {
        canonical: 'https://yelitzerangeloficial.com/contacto',
    }
};

export default function ContactoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
