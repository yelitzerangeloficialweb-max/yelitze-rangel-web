import { BLOG_POSTS } from './blog-data';
import { EVENTS_DATA } from './events';
import { TESTS_DATA } from './tests-data';

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

const BOOKS = [
    {
        title: "Hilos de Conexión",
        slug: "hilos-de-conexion",
        cover: "/assets/images/books/hilos-conexion-3d.png",
        description: "Una invitación a recordar, a sanar y a reconectar con esa memoria sagrada que habita en tu ADN.",
        link: "/libros"
    },
    {
        title: "Conversaciones con mi Chamana",
        slug: "conversaciones-con-mi-chamana",
        cover: "/assets/images/books/conversaciones-chamana-3d.png",
        description: "Reflexiones, meditaciones y diálogos internos para acompañarte en tu día a día.",
        link: "/libros"
    }
];

export function getAllSearchableContent(): SearchResult[] {
    const results: SearchResult[] = [];

    // Blogs
    BLOG_POSTS.forEach(post => {
        results.push({
            id: post.id,
            type: 'blog',
            title: post.title,
            description: post.excerpt,
            slug: post.slug,
            image: post.image,
            link: `/blog/${post.slug}`
        });
    });

    // Eventos
    EVENTS_DATA.forEach(event => {
        results.push({
            id: String(event.id),
            type: 'evento',
            title: event.title,
            description: event.aida.attention,
            slug: event.slug,
            image: event.image,
            link: `/eventos/${event.slug}`
        });
    });

    // Tests
    TESTS_DATA.forEach(test => {
        let testImage = '/assets/images/tests-bg.jpg';
        if (test.id === 'heridas-infancia') testImage = '/assets/images/tests/test_childhood_wounds.png';
        if (test.id === 'creencias-amor') testImage = '/assets/images/tests/test_love_beliefs.png';
        if (test.id === 'creencias-dinero') testImage = '/assets/images/tests/test_money_beliefs.png';

        results.push({
            id: test.id,
            type: 'test',
            title: test.title,
            description: test.description,
            slug: test.slug,
            image: testImage,
            link: `/tests/${test.slug}`
        });
    });

    // Books
    BOOKS.forEach(book => {
        results.push({
            id: book.slug,
            type: 'libro',
            title: book.title,
            description: book.description,
            slug: book.slug,
            image: book.cover,
            link: book.link
        });
    });

    return results;
}

export function searchContent(query: string): SearchResult[] {
    const all = getAllSearchableContent();
    if (!query) return [];

    const lowerQuery = query.toLowerCase();

    return all.filter(item =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
    );
}
