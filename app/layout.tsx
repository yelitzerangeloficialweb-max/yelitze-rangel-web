import type { Metadata } from 'next';
import Script from 'next/script';
import { Allison, Playfair_Display, Inter, Montserrat } from 'next/font/google';
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


const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yelitze Rangel • Sanación Sistémica y Sabiduría Ancestral',
  description: 'Honra tus raíces, transforma tu vida. Terapias de enfoque sistémico y sanación transgeneracional con Yelitze Rangel.',
  metadataBase: new URL('https://yelitzerangeloficial.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${allison.variable} ${playfair.variable} ${inter.variable} ${montserrat.variable}`}>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://yelitzerangeloficial.com/#person",
                  "name": "Yelitze Rangel",
                  "url": "https://yelitzerangeloficial.com",
                  "sameAs": [
                    "https://www.instagram.com/yelitzerangeloficial/",
                    "https://www.youtube.com/@yelitzerangeloficial"
                  ],
                  "jobTitle": "Terapeuta Sistémica y Psicóloga Somática",
                  "description": "Terapeuta experta en sanación transgeneracional, sistémica y sabiduría ancestral.",
                  "image": "https://yelitzerangeloficial.com/assets/images/logo-yelitze-new.png"
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://yelitzerangeloficial.com/#service",
                  "name": "Yelitze Rangel • Sanación Sistémica y Sabiduría Ancestral",
                  "url": "https://yelitzerangeloficial.com",
                  "logo": "https://yelitzerangeloficial.com/assets/images/logo-yelitze-new.png",
                  "image": "https://yelitzerangeloficial.com/images/home_redesign/Sobre-Mi_01.png",
                  "description": "Terapias de enfoque sistémico, constelaciones familiares y sanación transgeneracional con Yelitze Rangel.",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "VE"
                  },
                  "priceRange": "$$",
                  "founder": {
                    "@id": "https://yelitzerangeloficial.com/#person"
                  }
                }
              ]
            })
          }}
        />
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
        {children}
      </body>
    </html>
  );
}
