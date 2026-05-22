import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Libros y Publicaciones | Yelitze Rangel',
    description: 'Descubre las obras literarias y guías prácticas de Yelitze Rangel. Sabiduría ancestral escrita para sanar el alma y honrar tus raíces.',
    alternates: {
        canonical: 'https://yelitzerangeloficial.com/libros',
    }
};

export default function LibrosLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
