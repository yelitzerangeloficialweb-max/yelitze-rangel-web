import type { Metadata } from 'next';
import Script from 'next/script';
import { Allison, Playfair_Display, Inter, Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';

const allison = Allison({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-allison',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    variable: '--font-cormorant',
    display: 'swap',
});

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yelitze Rangel • Constelaciones Familiares y Sanación Ancestral',
  description: 'Honra tus raíces, transforma tu vida. Terapias de constelaciones familiares y sanación transgeneracional con Yelitze Rangel.',
  metadataBase: new URL('https://yelitzerangeloficial.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: false,
    follow: false,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${allison.variable} ${playfair.variable} ${inter.variable} ${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1446709010410195');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1446709010410195&ev=PageView&noscript=1"
            alt="facebook pixel"
          />
        </noscript>
        {/* Global Orange Flare Overlays (#e97b32) */}
        {/* Left Side (Hero area) */}
        <div className="absolute top-[50vh] left-[-20vw] w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_center,rgba(233,123,50,1)_0%,rgba(233,123,50,0.85)_40%,rgba(233,123,50,0.3)_65%,transparent_85%)] blur-[90px] pointer-events-none z-[100]" />
        
        {/* Right Side (Service area junction) */}
        <div className="absolute top-[165vh] right-[-20vw] w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_center,rgba(233,123,50,1)_0%,rgba(233,123,50,0.85)_40%,rgba(233,123,50,0.3)_65%,transparent_85%)] blur-[90px] pointer-events-none z-[100]" />
        
        {children}
      </body>
    </html>
  );
}
