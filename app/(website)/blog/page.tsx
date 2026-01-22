import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/lib/blog-data';
import { ArrowRight, Calendar, User } from 'lucide-react';

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-36 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="uppercase tracking-widest text-sm font-semibold text-[var(--color-secondary)] mb-2 block">
                        Bitácora del Alma
                    </span>
                    <h1 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] mb-6">
                        Blog & Recursos
                    </h1>
                    <p className="text-xl text-[var(--color-text-light)]">
                        Reflexiones sobre constelaciones familiares, sanación sistémica y crecimiento espiritual para acompañar tu camino.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {BLOG_POSTS.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--color-primary)]/5 flex flex-col group"
                        >
                            {/* Image */}
                            <Link href={`/blog/${post.slug}`} className="relative h-60 overflow-hidden block">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wide">
                                    {post.category}
                                </div>
                            </Link>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        {post.author}
                                    </div>
                                </div>

                                <Link href={`/blog/${post.slug}`} className="block">
                                    <h2 className="text-xl font-heading text-[var(--color-primary)] mb-3 group-hover:text-[var(--color-secondary)] transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                </Link>

                                <p className="text-[var(--color-text-light)] mb-6 text-sm line-clamp-3 flex-grow">
                                    {post.excerpt}
                                </p>

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center font-semibold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors text-sm"
                                >
                                    Leer Artículo
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
