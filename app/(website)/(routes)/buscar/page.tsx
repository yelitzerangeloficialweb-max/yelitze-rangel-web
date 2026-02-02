'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ArrowRight, BookOpen, Calendar, Star, FileText } from 'lucide-react';
import { searchContent } from '@/lib/search-data';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const results = searchContent(query);

    return (
        <div className="container mx-auto px-4 py-32">
            <FadeIn>
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading text-[var(--color-primary)] mb-6 italic">
                        Resultados de búsqueda
                    </h1>
                    <p className="text-stone-500 text-xl font-light italic">
                        {query ? (
                            <>Mostrando resultados para: <span className="text-[var(--color-secondary)] font-medium">"{query}"</span></>
                        ) : (
                            "Ingresa un término para buscar."
                        )}
                    </p>
                </div>
            </FadeIn>

            {results.length > 0 ? (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {results.map((result) => (
                        <StaggerItem key={`${result.type}-${result.id}`}>
                            <Link
                                href={result.link}
                                className="group block bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full border-t-4 border-t-transparent hover:border-t-[var(--color-secondary)]"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={result.image}
                                        alt={result.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-white/50 flex items-center gap-2">
                                            {result.type === 'blog' && <FileText className="w-3 h-3 text-[var(--color-secondary)]" />}
                                            {result.type === 'evento' && <Calendar className="w-3 h-3 text-[var(--color-secondary)]" />}
                                            {result.type === 'test' && <Star className="w-3 h-3 text-[var(--color-secondary)]" />}
                                            {result.type === 'libro' && <BookOpen className="w-3 h-3 text-[var(--color-secondary)]" />}
                                            <span className="text-[10px] font-bold tracking-widest uppercase text-stone-600">{result.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 space-y-4">
                                    <h3 className="text-2xl font-heading text-[var(--color-primary)] leading-tight italic group-hover:text-[var(--color-secondary)] transition-colors">
                                        {result.title}
                                    </h3>
                                    <p className="text-stone-500 text-sm font-light italic line-clamp-3 leading-relaxed">
                                        {result.description}
                                    </p>
                                    <div className="pt-4 flex items-center text-[var(--color-secondary)] gap-2 text-[10px] font-bold tracking-[0.2em] uppercase">
                                        Ver más
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            ) : query && (
                <FadeIn className="text-center py-20 bg-stone-50 rounded-[4rem] border border-dashed border-stone-200">
                    <div className="max-w-md mx-auto space-y-8">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                            <Search className="w-8 h-8 text-stone-300" />
                        </div>
                        <h2 className="text-3xl font-heading text-[var(--color-primary)] italic">No encontramos coincidencias</h2>
                        <p className="text-stone-500 font-light italic">
                            Intenta con otras palabras clave o explora nuestras secciones principales.
                        </p>
                        <div className="pt-8 flex flex-wrap justify-center gap-4">
                            <Link href="/blog" className="px-6 py-3 rounded-full border border-stone-200 text-sm font-medium hover:bg-stone-100 transition-colors">Blog</Link>
                            <Link href="/eventos" className="px-6 py-3 rounded-full border border-stone-200 text-sm font-medium hover:bg-stone-100 transition-colors">Eventos</Link>
                            <Link href="/tests" className="px-6 py-3 rounded-full border border-stone-200 text-sm font-medium hover:bg-stone-100 transition-colors">Tests</Link>
                        </div>
                    </div>
                </FadeIn>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <main className="bg-[#FAF9F6] min-h-screen">
            <Suspense fallback={
                <div className="container mx-auto px-4 py-32 text-center">
                    <div className="animate-pulse text-stone-400 font-light italic">Cargando resultados...</div>
                </div>
            }>
                <SearchResults />
            </Suspense>
        </main>
    );
}
