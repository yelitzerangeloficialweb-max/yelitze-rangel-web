export type SearchResultType = 'blog' | 'evento' | 'test' | 'libro';

export interface SearchResult {
    id: string;
    type: SearchResultType;
    title: string;
    description: string;
    slug: string;
    image: string;
    link: string;
}

// Searchable content embedded directly for client-side compatibility
const SEARCHABLE_CONTENT: SearchResult[] = [
    // BLOGS
    { id: '8', type: 'blog', title: 'Libérate de tus Patrones: La Ciencia de la Decisión', description: '¿Por qué sentimos que estamos "cableados" para el autosabotaje? Entiende cómo tu cerebro y tu sistema familiar trabajan juntos.', slug: 'liberate-de-tus-patrones', image: '/images/home_redesign/blog/Liberate_de_tus_patrones.png', link: '/blog/liberate-de-tus-patrones' },
    { id: '9', type: 'blog', title: 'Transforma tu Miedo en Éxito: El Salto de la Valiente', description: 'El miedo no es una señal de que debas detenerte, sino el combustible que necesitas para el siguiente nivel de tu evolución.', slug: 'transforma-tu-miedo-en-exito', image: '/assets/images/blog/miedo-exito.jpg', link: '/blog/transforma-tu-miedo-en-exito' },
    { id: '10', type: 'blog', title: 'Sanación Sistémica: Un Viaje a tu Árbol Genealógico', description: 'Descubre cómo las dinámicas familiares ocultas influyen en tu vida y cómo la sanación sistémica puede ayudarte a sanar.', slug: 'sanacion-sistemica-viaje-arbol-genealogico', image: '/assets/images/blog/sanacion-arbol.jpg', link: '/blog/sanacion-sistemica-viaje-arbol-genealogico' },
    { id: '11', type: 'blog', title: 'Sanación del Niño Interior: Reconectando con tu Esencia', description: 'Tu niño interior guarda la clave de muchas de tus reacciones adultas. Aprende a reconectarte con él para sanar.', slug: 'sanacion-nino-interior-reconectando-esencia', image: '/assets/images/blog/nino-interior.jpg', link: '/blog/sanacion-nino-interior-reconectando-esencia' },
    { id: '12', type: 'blog', title: 'Abundancia y Dinero: Desbloquea tu Flujo de Prosperidad', description: 'Las creencias limitantes sobre el dinero se heredan. Descubre cómo transformar tu relación con la abundancia.', slug: 'abundancia-dinero-desbloquea-prosperidad', image: '/assets/images/blog/abundancia-dinero.jpg', link: '/blog/abundancia-dinero-desbloquea-prosperidad' },
    // EVENTOS
    { id: '1', type: 'evento', title: 'Sánate Mujer', description: '¿Te has preguntado por qué repites las mismas historias que vivió tu madre o tu abuela? Hoy puedes detener ese ciclo.', slug: 'sanate-mujer', image: '/assets/images/img-sanate.jpg', link: '/eventos/sanate-mujer' },
    { id: '2', type: 'evento', title: 'Sanación Sistémica Grupales', description: 'Taller presencial para explorar las dinámicas ocultas de tu sistema familiar y encontrar soluciones sanadoras.', slug: 'sanacion-sistemica-grupal', image: '/assets/images/events/sanacion-grupal.jpg', link: '/eventos/sanacion-sistemica-grupal' },
    { id: '3', type: 'evento', title: 'Círculo de Mujeres', description: 'Un espacio sagrado para conectar con otras mujeres, compartir experiencias y sanar juntas.', slug: 'circulo-de-mujeres', image: '/assets/images/events/circulo-mujeres.jpg', link: '/eventos/circulo-de-mujeres' },
    // TESTS
    { id: 'heridas-infancia', type: 'test', title: 'Test de Heridas de la Infancia', description: 'Descubre qué herida emocional (Abandono, Rechazo, Humillación, Traición, Injusticia) está influyendo más en tu vida actual.', slug: 'heridas-infancia', image: '/assets/images/tests/test_childhood_wounds_realistic.png', link: '/tests/heridas-infancia' },
    { id: 'creencias-amor', type: 'test', title: 'Test de Creencias sobre el Amor', description: 'Identifica los bloqueos inconscientes que te impiden vivir una relación de pareja plena, consciente y en equilibrio.', slug: 'creencias-amor', image: '/assets/images/tests/test_love_beliefs_realistic.png', link: '/tests/creencias-amor' },
    { id: 'creencias-dinero', type: 'test', title: 'Test de Creencias sobre el Dinero', description: 'Explora tu relación con la abundancia y detecta lealtades familiares que limitan tu flujo de prosperidad.', slug: 'creencias-dinero', image: '/assets/images/tests/test_money_beliefs_realistic.png', link: '/tests/creencias-dinero' },
    // LIBROS
    { id: 'hilos-de-conexion', type: 'libro', title: 'Hilos de Conexión', description: 'Una invitación a recordar, a sanar y a reconectar con esa memoria sagrada que habita en tu ADN.', slug: 'hilos-de-conexion', image: '/assets/images/books/hilos-conexion-3d.png', link: '/libros' },
    { id: 'conversaciones-con-mi-chamana', type: 'libro', title: 'Conversaciones con mi Chamana', description: 'Reflexiones, meditaciones y diálogos internos para acompañarte en tu día a día.', slug: 'conversaciones-con-mi-chamana', image: '/assets/images/books/conversaciones-chamana-3d.png', link: '/libros' },
    // SERVICIOS (para que "masaje" devuelva resultados)
    { id: 'sesiones-corporales', type: 'evento', title: 'Sesiones Corporales y Masajes', description: 'Shirodhara, Masaje Abhyanga, Cabeza Indio, Tantra Sistémico y más técnicas de renovación celular.', slug: 'sesiones-corporales', image: '/assets/images/hero-corporales.png', link: '/servicios/sesiones-corporales' },
];

export function getAllSearchableContent(): SearchResult[] {
    return SEARCHABLE_CONTENT;
}

function normalize(text: string): string {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

export function searchContent(query: string): SearchResult[] {
    if (!query) return [];

    const all = getAllSearchableContent();
    const normalizedQuery = normalize(query);

    if (normalizedQuery === "") return [];

    return all.filter(item => {
        const normalizedTitle = normalize(item.title);
        const normalizedDesc = normalize(item.description);
        const normalizedType = normalize(item.type);

        return normalizedTitle.includes(normalizedQuery) ||
            normalizedDesc.includes(normalizedQuery) ||
            normalizedType.includes(normalizedQuery);
    });
}

// Para depuración: permite ver cuántos items hay en total
export function getSearchStats() {
    return {
        total: getAllSearchableContent().length
    };
}
