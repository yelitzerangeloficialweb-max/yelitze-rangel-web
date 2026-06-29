import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Venezuela en el Cuerpo Caracas • Sanación Somática',
    description: 'Guía práctica para recuperar sensación de seguridad interna. Regulación somática del sistema nervioso después del impacto.',
    alternates: {
        canonical: 'https://yelitzerangeloficial.com/venezuela-en-el-cuerpo-caracas',
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
