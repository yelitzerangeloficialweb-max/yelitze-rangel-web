export type ProductCategory = 'libro' | 'oraculo' | 'accesorio';

export interface Product {
    id: string;
    slug: string;
    name: string;
    subtitle?: string;
    description: string;
    price: number;
    currency: 'USD';
    image: string;
    images?: string[];
    category: ProductCategory;
    stock: number;
    featured?: boolean;
}

export const PRODUCTS: Product[] = [
    // LIBROS
    {
        id: 'libro-hilos',
        slug: 'hilos-de-conexion',
        name: 'Hilos de Conexión',
        subtitle: 'Un viaje curativo a la memoria del origen',
        description: 'Una invitación a recordar, a sanar y a reconectar con esa memoria sagrada que habita en tu ADN. Un manual para quienes buscan su origen y desean tejer puentes entre generaciones.',
        price: 24.99,
        currency: 'USD',
        image: '/assets/images/books/hilos-conexion-3d.png',
        category: 'libro',
        stock: 50,
        featured: true
    },
    {
        id: 'libro-chamana',
        slug: 'conversaciones-con-mi-chamana',
        name: 'Conversaciones con mi Chamana',
        subtitle: '107 pláticas para despertar tu medicina interior',
        description: 'Reflexiones, meditaciones y diálogos internos para acompañarte en tu día a día y despertar tu sabiduría interior más profunda. Un compañero de viaje para el alma.',
        price: 22.99,
        currency: 'USD',
        image: '/assets/images/books/conversaciones-chamana-3d.png',
        category: 'libro',
        stock: 50,
        featured: true
    },

    // ORÁCULO
    {
        id: 'oraculo-ancestral',
        slug: 'oraculo-ancestral',
        name: 'Oráculo Ancestral',
        subtitle: '44 cartas de sabiduría del linaje',
        description: 'Un oráculo diseñado para conectar con la sabiduría de tus ancestros. Cada carta es un portal hacia mensajes profundos que te ayudarán a encontrar claridad en tu camino.',
        price: 34.99,
        currency: 'USD',
        image: '/assets/images/shop/oraculo-placeholder.jpg',
        category: 'oraculo',
        stock: 30,
        featured: true
    },
    {
        id: 'oraculo-chamana',
        slug: 'oraculo-de-la-chamana',
        name: 'Oráculo de la Chamana',
        subtitle: '33 cartas de medicina interior',
        description: 'Baraja intuitiva para el autoconocimiento y la sanación. Cada carta contiene una enseñanza de la chamana interior que todos llevamos dentro.',
        price: 29.99,
        currency: 'USD',
        image: '/assets/images/shop/oraculo-chamana-placeholder.jpg',
        category: 'oraculo',
        stock: 25
    },

    // ACCESORIOS
    {
        id: 'vela-intencion',
        slug: 'vela-de-intencion',
        name: 'Vela de Intención',
        subtitle: 'Ritual de luz y propósito',
        description: 'Vela artesanal con aceites esenciales para acompañar tus meditaciones y rituales. Incluye guía de uso para establecer intenciones poderosas.',
        price: 18.99,
        currency: 'USD',
        image: '/assets/images/shop/vela-placeholder.jpg',
        category: 'accesorio',
        stock: 40
    },
    {
        id: 'pulsera-proteccion',
        slug: 'pulsera-proteccion-ancestral',
        name: 'Pulsera de Protección Ancestral',
        subtitle: 'Amuleto de conexión',
        description: 'Pulsera tejida a mano con piedras semipreciosas y símbolos sagrados. Un recordatorio físico de tu conexión con el linaje.',
        price: 24.99,
        currency: 'USD',
        image: '/assets/images/shop/pulsera-placeholder.jpg',
        category: 'accesorio',
        stock: 20
    },
    {
        id: 'incienso-ritual',
        slug: 'incienso-ritual-sagrado',
        name: 'Incienso Ritual Sagrado',
        subtitle: 'Set de 12 varitas aromáticas',
        description: 'Inciensos naturales con mezcla de hierbas sagradas para limpiar espacios y elevar la vibración. Perfecto para ceremonias y meditación.',
        price: 12.99,
        currency: 'USD',
        image: '/assets/images/shop/incienso-placeholder.jpg',
        category: 'accesorio',
        stock: 60
    }
];

export function getProductBySlug(slug: string): Product | undefined {
    return PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
    return PRODUCTS.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
    return PRODUCTS.filter(p => p.featured);
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
    libro: 'Libros',
    oraculo: 'Oráculo',
    accesorio: 'Accesorios'
};
