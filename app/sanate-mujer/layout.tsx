import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'Activación Sánate Mujer | Sanación de Linaje Femenino | Yelitze Rangel',
    description: 'Únete a la inmersión online gratuita "Activación Sánate Mujer" y descubre cómo dejar de repetir la historia de desamor de tu linaje femenino.',
    alternates: {
        canonical: 'https://yelitzerangeloficial.com/sanate-mujer',
    },
    robots: {
        index: true,
        follow: true,
    }
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
            {/* Meta Pixel for Sánate Mujer Landing */}
            <Script id="fb-pixel-sanate-mujer" strategy="afterInteractive">
                {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '27440626125526900');
                    fbq('track', 'PageView');
                `}
            </Script>
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src="https://www.facebook.com/tr?id=27440626125526900&ev=PageView&noscript=1"
                    alt="facebook pixel"
                />
            </noscript>
            {children}
        </div>
    );
}
