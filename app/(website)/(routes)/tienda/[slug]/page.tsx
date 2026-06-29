'use client';

import { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CATEGORY_LABELS, ProductCategory, Product } from '@/lib/products-data';
import { useCart } from '@/context/CartContext';
import { FadeIn } from '@/components/ui/motion';
import { ShoppingCart, ArrowLeft, CheckCircle, Truck, Shield, Loader2 } from 'lucide-react';

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
    const { slug } = use(params);
    const { addToCart } = useCart();
    
    const [product, setProduct] = useState<Product | null>(null);
    const [activeImage, setActiveImage] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Fallback map: when DB products have broken /uploads/ paths, use static assets
    const STATIC_IMAGE_FALLBACK: Record<string, string> = {
        'hilos-de-conexion': '/assets/images/books/hilos-conexion-3d.png',
        'conversaciones-con-mi-chamana': '/assets/images/books/conversaciones-chamana-3d.png',
        'cartas-corazon-chamanico': '/assets/images/oraculo/oraculo-real-1.jpg',
        'oraculo-ancestral': '/assets/images/shop/oraculo-ancestral.png',
        'oraculo-de-la-chamana': '/assets/images/shop/oraculo-chamana.png',
    };

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`/api/products/${slug}`);
                if (res.ok) {
                    const data = await res.json();
                    
                    const oldToNewMap: Record<string, string> = {
                        '/uploads/1779315877803-247618694.jpg': '/assets/images/oraculo/oraculo-real-1.jpg',
                        '/uploads/1779315882780-503008958.jpg': '/assets/images/oraculo/oraculo-real-2.jpg',
                        '/uploads/1779315902423-912018526.jpg': '/assets/images/oraculo/oraculo-real-3.jpg',
                    };

                    // Fix broken /uploads/ or empty image path
                    if (!data.image || data.image.startsWith('/uploads/')) {
                        if (data.image && oldToNewMap[data.image]) {
                            data.image = oldToNewMap[data.image];
                        } else {
                            data.image = STATIC_IMAGE_FALLBACK[data.slug] || '';
                        }
                    }
                    // Fix broken /uploads/ or empty in additional images
                    if (!data.images || data.images.length === 0 || (data.images.length === 1 && data.images[0] === '')) {
                        if (data.slug === 'cartas-corazon-chamanico') {
                            data.images = [
                                '/assets/images/oraculo/oraculo-real-2.jpg',
                                '/assets/images/oraculo/oraculo-real-3.jpg'
                            ];
                        }
                    } else if (Array.isArray(data.images)) {
                        data.images = data.images.map((img: string) => {
                            if (img && img.startsWith('/uploads/')) {
                                if (oldToNewMap[img]) {
                                    return oldToNewMap[img];
                                }
                                return STATIC_IMAGE_FALLBACK[data.slug] || img;
                            }
                            return img;
                        }).filter(Boolean);
                    }
                    setProduct(data);
                    setActiveImage(data.image || '');
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <main className="bg-[#FAF9F6] min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)]" />
                    <p className="text-stone-400 font-medium text-sm">Cargando la magia del producto...</p>
                </div>
            </main>
        );
    }

    if (error || !product) {
        notFound();
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const allImages = product ? [product.image, ...(product.images || [])].filter(Boolean) : [];

    return (
        <main className="bg-[#FAF9F6] min-h-screen pt-40 md:pt-44 lg:pt-48 pb-20">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <FadeIn>
                    <Link
                        href="/tienda"
                        className="inline-flex items-center gap-2 text-stone-500 hover:text-[var(--color-secondary)] transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a la tienda
                    </Link>
                </FadeIn>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Product Image Gallery */}
                    <FadeIn>
                        <div className="flex flex-col-reverse md:flex-row gap-6 items-start">
                            {/* Thumbnails Sidebar / Row */}
                            {allImages.length > 1 && (
                                <div className="flex md:flex-col gap-3 w-full md:w-24 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-none justify-start">
                                    {allImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(img)}
                                            onMouseEnter={() => setActiveImage(img)}
                                            className={`relative aspect-square w-16 md:w-full rounded-2xl overflow-hidden border-2 bg-white flex-shrink-0 transition-all duration-300 ${
                                                activeImage === img
                                                    ? 'border-[var(--color-secondary)] shadow-md scale-105'
                                                    : 'border-stone-200 hover:border-stone-400'
                                            }`}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${product.name} - Vista ${idx + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Main Image Container */}
                            <div className="relative aspect-square flex-1 w-full rounded-[3rem] overflow-hidden bg-white shadow-xl border border-stone-100">
                                <Image
                                    src={activeImage || product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-all duration-500"
                                    priority
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-stone-600 border border-white/50 shadow-sm">
                                        {CATEGORY_LABELS[product.category]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Product Details */}
                    <FadeIn delay={0.1}>
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] mb-3">
                                    {product.name}
                                </h1>
                                {product.subtitle && (
                                    <p className="text-xl text-stone-500 italic">{product.subtitle}</p>
                                )}
                            </div>

                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-[var(--color-secondary)]">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="text-stone-400">USD</span>
                            </div>

                            <p className="text-lg text-stone-600 leading-relaxed">
                                {product.description}
                            </p>

                            {/* Quantity & Add to Cart */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center border-2 border-stone-200 rounded-xl">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="px-4 py-3 text-xl font-bold text-stone-400 hover:text-[var(--color-primary)] transition-colors"
                                    >
                                        −
                                    </button>
                                    <span className="px-6 py-3 text-lg font-bold text-[var(--color-primary)]">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="px-4 py-3 text-xl font-bold text-stone-400 hover:text-[var(--color-primary)] transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Añadir al Carrito
                                </button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-stone-200">
                                <div className="flex items-center gap-3 text-sm text-stone-600">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    </div>
                                    <span>En Stock</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-stone-600">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Truck className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span>Envío a USA</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-stone-600">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <span>Pago Seguro</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </main>
    );
}
