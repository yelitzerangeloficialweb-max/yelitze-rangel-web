import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Venezuela en el Cuerpo • Sanación Somática • Yelitze Rangel',
    description: 'Tu cuerpo no puede crear una nueva economía si aún vive en el país de la ruina. Registro gratuito al evento de sanación somática.',
    alternates: {
        canonical: 'https://yelitzerangeloficial.com/venezuela-en-el-cuerpo',
    },
    robots: {
        index: true,
        follow: true,
    }
};

export default function VenezuelaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#F7F3F0]">
            {children}
        </div>
    );
}
