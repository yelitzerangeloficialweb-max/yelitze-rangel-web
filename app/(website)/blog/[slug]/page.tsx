import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';
import { ArrowLeft, Calendar, User, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-36 pb-20">
            {/* Hero Image */}
            <div className="absolute top-0 left-0 w-full h-[50vh] z-0">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-background)]" />
            </div>

            <article className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver al Blog
                    </Link>

                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
                            {post.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-sm text-[var(--color-text-light)]">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {post.author}
                            </div>
                        </div>
                    </div>

                    {/* Main Image */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-12">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-lg max-w-none text-[var(--color-text)] mb-12 prose-headings:font-heading prose-headings:text-[var(--color-primary)] prose-a:text-[var(--color-secondary)] prose-strong:text-[var(--color-primary)]"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share / Tags Placeholder */}
                    <div className="border-t border-b border-[var(--color-primary)]/10 py-8 my-12 flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="font-heading text-[var(--color-primary)] text-lg">
                            ¿Te resonó este artículo? ¡Compártelo!
                        </p>
                        <div className="flex items-center gap-4">
                            <button className="p-3 bg-white rounded-full shadow-sm hover:shadow-md hover:text-[var(--color-secondary)] transition-all">
                                <Facebook className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-white rounded-full shadow-sm hover:shadow-md hover:text-[var(--color-secondary)] transition-all">
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-white rounded-full shadow-sm hover:shadow-md hover:text-[var(--color-secondary)] transition-all">
                                <Linkedin className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-white rounded-full shadow-sm hover:shadow-md hover:text-[var(--color-secondary)] transition-all">
                                <LinkIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-[var(--color-primary)]/5 rounded-3xl p-8 md:p-12 text-center">
                        <h3 className="text-2xl font-heading text-[var(--color-primary)] mb-4">
                            ¿Quieres profundizar más?
                        </h3>
                        <p className="text-[var(--color-text-light)] mb-8 max-w-xl mx-auto">
                            Si este tema movió algo en ti, te invito a explorar mis servicios o reservar una sesión para mirarlo juntas en constelación.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/reservas"
                                className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-full font-semibold hover:bg-[var(--color-primary-light)] transition-colors"
                            >
                                Reservar Sesión
                            </Link>
                            <Link
                                href="/tests"
                                className="px-8 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-full font-semibold hover:bg-[var(--color-primary)]/5 transition-colors"
                            >
                                Hacer un Test
                            </Link>
                        </div>
                    </div>

                </div>
            </article>
        </div>
    );
}
