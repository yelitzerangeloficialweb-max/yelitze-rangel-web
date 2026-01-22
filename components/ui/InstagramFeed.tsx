import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

const INSTAGRAM_URL = "https://www.instagram.com/yelitzerangeloficial";

export default function InstagramFeed() {
    // Using existing images as placeholders for the feed
    const posts = [
        { id: 1, src: '/assets/images/portrait-creative.png', alt: 'Encuentro con hilos' },
        { id: 2, src: '/assets/images/casual-portrait.jpg', alt: 'Univision Noticias' },
        { id: 3, src: '/assets/images/about-portrait.jpg', alt: 'Emprender es una iniciación' },
        { id: 4, src: '/assets/images/hero-portrait.png', alt: 'Conferencia en vivo' },
        { id: 5, src: '/assets/images/casual-portrait.jpg', alt: 'Lanzamiento Libro' }, // Repeating for grid
        { id: 6, src: '/assets/images/portrait-creative.png', alt: 'Taller de Constelaciones' },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <Link
                        href={INSTAGRAM_URL}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-[var(--color-secondary)] font-semibold tracking-widest uppercase hover:opacity-80 transition-opacity mb-4"
                    >
                        <Instagram className="w-5 h-5" />
                        @yelitzerangeloficial
                    </Link>
                    <h2 className="text-3xl md:text-4xl font-heading text-[var(--color-primary)]">
                        Sigue nuestra comunidad
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={INSTAGRAM_URL}
                            target="_blank"
                            className="group relative aspect-square overflow-hidden bg-gray-100 block"
                        >
                            <Image
                                src={post.src}
                                alt={post.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
