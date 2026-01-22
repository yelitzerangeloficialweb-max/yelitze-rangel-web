import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const books = [
    {
        title: "Hilos de Conexión",
        subtitle: "Un viaje curativo a la memoria del origen",
        slug: "hilos-de-conexion",
        cover: "/assets/images/books/hilos-cover.jpg",
        description: "Una invitación a recordar, a sanar y a reconectar con esa memoria sagrada que habita en tu ADN."
    },
    {
        title: "Conversaciones con mi Chamana",
        subtitle: "107 pláticas para despertar tu medicina interior",
        slug: "conversaciones-con-mi-chamana",
        cover: "/assets/images/books/chamana-cover.jpg",
        description: "Reflexiones, meditaciones y diálogos internos para acompañarte en tu día a día y despertar tu sabiduría interior."
    }
];

export default function BooksIndexPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <span className="text-secondary font-medium tracking-widest text-sm uppercase">Mis Libros</span>
                    <h1 className="text-4xl md:text-5xl font-heading text-primary">Sabiduría para el Alma</h1>
                    <p className="text-lg text-primary-light">
                        Herramientas escritas desde el corazón para acompañar tu proceso de sanación y autodescubrimiento.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {books.map((book) => (
                        <div key={book.slug} className="group bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-primary/5 hover:border-secondary/20 flex flex-col items-center p-8 text-center">

                            {/* Cover Container with Hover Effect */}
                            <div className="relative w-48 h-72 mb-8 perspective-1000">
                                <div className="relative w-full h-full transform group-hover:rotate-y-6 transition-transform duration-700 ease-out preserve-3d shadow-2xl rounded-lg">
                                    {/* Fallback color if image missing */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light to-primary rounded-lg flex items-center justify-center text-white/20">
                                        <span className="sr-only">Cover Placeholder</span>
                                    </div>
                                    <Image
                                        src={book.cover}
                                        alt={book.title}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            </div>

                            <h2 className="text-2xl font-heading text-primary mb-2 group-hover:text-secondary transition-colors">
                                {book.title}
                            </h2>
                            <p className="text-sm font-medium text-secondary mb-4 italic">
                                {book.subtitle}
                            </p>
                            <p className="text-primary-light mb-8 leading-relaxed max-w-sm">
                                {book.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center">
                                <Link
                                    href={`/libros/${book.slug}`}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-secondary transition-all transform hover:scale-105 flex-1 shadow-md"
                                >
                                    Ver Detalles
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href={`https://wa.me/584141234567?text=Hola Yelitzé, estoy interesada en comprar tu libro "${book.title}" desde Venezuela.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-full hover:bg-indigo-50 transition-all transform hover:scale-105 flex-1"
                                >
                                    Compra en Venezuela
                                </a>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
