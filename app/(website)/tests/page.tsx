import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Heart, DollarSign, Baby } from 'lucide-react';

const TESTS = [
    {
        id: 'heridas-infancia',
        title: 'Heridas de la Infancia',
        description: 'Descubre qué herida emocional (Abandono, Rechazo, Humillación, Traición, Injusticia) influye en tu vida.',
        image: '/assets/images/tests/test_childhood_wounds.png',
        icon: <Baby className="w-6 h-6" />,
        color: 'from-amber-500/20 to-orange-500/20',
        href: '/tests/heridas-infancia'
    },
    {
        id: 'creencias-amor',
        title: 'Creencias sobre el Amor',
        description: 'Identifica los bloqueos inconscientes que te impiden vivir una relación de pareja plena y consciente.',
        image: '/assets/images/tests/test_love_beliefs.png',
        icon: <Heart className="w-6 h-6" />,
        color: 'from-pink-500/20 to-rose-500/20',
        href: '/tests/creencias-amor'
    },
    {
        id: 'creencias-dinero',
        title: 'Creencias sobre el Dinero',
        description: 'Explora tu relación con la abundancia y detecta lealtades familiares que limitan tu prosperidad.',
        image: '/assets/images/tests/test_money_beliefs.png',
        icon: <DollarSign className="w-6 h-6" />,
        color: 'from-emerald-500/20 to-teal-500/20',
        href: '/tests/creencias-dinero'
    }
];

export default function TestsHubPage() {
    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-36 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="uppercase tracking-widest text-sm font-semibold text-[var(--color-secondary)] mb-2 block">
                        Autoconocimiento
                    </span>
                    <h1 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] mb-6">
                        Tests de Sanación
                    </h1>
                    <p className="text-xl text-[var(--color-text-light)]">
                        Herramientas diseñadas para iluminar lo que está oculto en tu inconsciente.
                        El primer paso para sanar es hacer consciente lo inconsciente.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {TESTS.map((test, idx) => (
                        <Link
                            key={test.id}
                            href={test.href}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[var(--color-primary)]/5 flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="relative h-72 overflow-hidden">
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-20" />
                                <Image
                                    src={test.image}
                                    alt={test.title}
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Centered Content Overlay */}
                                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-6 space-y-4">
                                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full text-white shadow-sm ring-1 ring-white/30 group-hover:scale-110 transition-transform duration-300">
                                        {React.cloneElement(test.icon as React.ReactElement, { className: "w-8 h-8 stroke-[1.5]" })}
                                    </div>
                                    <h3 className="text-2xl font-heading text-white drop-shadow-md px-2 leading-tight">
                                        {test.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <p className="text-[var(--color-text-light)] mb-8 flex-grow text-sm leading-relaxed text-center">
                                    {test.description}
                                </p>

                                <div className="flex justify-center">
                                    <div className="inline-flex items-center text-sm font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
                                        Iniciar Test
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Banner Footer */}
                <div className="mt-20 bg-[var(--color-primary)]/5 rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/pattern.png')] opacity-5" />
                    <div className="relative z-10">
                        <Sparkles className="w-12 h-12 text-[var(--color-secondary)] mx-auto mb-6" />
                        <h2 className="text-3xl font-heading text-[var(--color-primary)] mb-4">
                            ¿No sabes por cuál empezar?
                        </h2>
                        <p className="text-[var(--color-text-light)] max-w-2xl mx-auto mb-8">
                            Si sientes que repites patrones en tus relaciones, comienza por "Creencias sobre el Amor".
                            Si sientes un vacío inexplicable, explora "Heridas de la Infancia".
                        </p>
                        <Link
                            href="/contacto"
                            className="inline-block px-8 py-3 bg-[var(--color-primary)] text-white rounded-full font-semibold hover:bg-[var(--color-primary-light)] transition-colors"
                        >
                            Escríbeme para Orientación
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
