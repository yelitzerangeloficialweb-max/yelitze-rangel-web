import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Activación Sánate Mujer | Yelitze Rangel',
    description: 'Únete a la inmersión online gratuita "Activación Sánate Mujer" y descubre cómo dejar de repetir la historia de desamor de tu linaje femenino.',
};

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // This layout specifically does NOT include Header or Footer components 
    // to strictly adhere to the high-converting landing page specifications.
    return (
        <div className="landing-page-isolation bg-[#F5EFE6] min-h-screen font-sans text-[#2D2926]">
            {children}
        </div>
    );
}
