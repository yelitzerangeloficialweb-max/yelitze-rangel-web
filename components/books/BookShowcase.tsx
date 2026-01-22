import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, BookOpen } from 'lucide-react';

interface BookShowcaseProps {
    title: string;
    subtitle: string;
    description: string[];
    price: string;
    coverImage: string;
    amazonLink: string;
    kindleLink?: string;
    features: string[];
}

export default function BookShowcase({
    title,
    subtitle,
    description,
    price,
    coverImage,
    amazonLink,
    kindleLink,
    features
}: BookShowcaseProps) {
    return (
        <section className="pt-40 pb-20 min-h-screen bg-gradient-to-br from-background via-background-alt to-background flex items-center">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Cover Image Section */}
                    <div className="relative group perspective-1000">
                        {/* Glow Effect behind book */}
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-brown-light/20 blur-3xl rounded-full transform scale-90 group-hover:scale-100 transition-all duration-700"></div>

                        <div className="relative transform group-hover:rotate-y-6 transition-transform duration-700 ease-out preserve-3d">
                            <div className="relative rounded-lg shadow-2xl border-4 border-white/50 overflow-hidden bg-white max-w-[400px] mx-auto">
                                <Image
                                    src={coverImage}
                                    alt={title}
                                    width={400}
                                    height={600}
                                    className="object-cover w-full h-auto"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-sm font-medium tracking-wide">
                                <BookOpen className="inline w-4 h-4 mr-2" />
                                Disponible en Amazon
                            </span>
                            <h1 className="text-4xl md:text-5xl font-heading text-primary leading-tight">
                                {title}
                            </h1>
                            <p className="text-xl text-primary-light font-light italic border-l-4 border-secondary pl-4">
                                {subtitle}
                            </p>
                        </div>

                        <div className="space-y-4 text-primary/80 leading-relaxed text-lg">
                            {description.map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))}
                        </div>

                        {/* Features List */}
                        <ul className="grid sm:grid-cols-2 gap-4 pt-4">
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-primary-light">
                                    <div className="bg-gradient-to-br from-secondary to-brown-light p-1 rounded-full text-white">
                                        <Star className="w-3 h-3 fill-current" />
                                    </div>
                                    <span className="text-sm font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Pricing & CTA */}
                        <div className="pt-8 flex flex-col sm:flex-row gap-6 items-center border-t border-primary/10">
                            <div className="text-center sm:text-left">
                                <p className="text-sm text-primary-light uppercase tracking-wider mb-1">Precio</p>
                                <p className="text-4xl font-heading text-secondary font-bold">{price}</p>
                            </div>

                            <div className="flex flex-col gap-3 w-full sm:w-auto">
                                <Link
                                    href={amazonLink}
                                    target="_blank"
                                    className="btn-premium group"
                                >
                                    <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
                                    Comprar en Amazon
                                </Link>
                                {kindleLink && (
                                    <Link
                                        href={kindleLink}
                                        target="_blank"
                                        className="text-center text-sm text-primary-light hover:text-secondary underline decoration-dotted underline-offset-4 transition-colors"
                                    >
                                        Versión Kindle Disponible
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
