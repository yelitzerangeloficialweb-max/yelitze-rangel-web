import BookShowcase from '@/components/books/BookShowcase';

export default function HilosDeConexionPage() {
    return (
        <main>
            <BookShowcase
                title="Hilos de Conexión"
                subtitle="Un viaje curativo a la memoria del origen"
                description={[
                    "La vida es más que una espiral interminable. Es un círculo que siempre vuelve a empezar. Por lo tanto, vivenciamos en el camino eventos que a ratos nos distraen, agobian y nos llenan de información que puede llegar a convertirse en creencias erróneas.",
                    "El diseño que hizo Dios, la energía universal, para nosotros busca que seamos absolutamente plenos, por eso es tiempo de un despertar espiritual que no sea para el beneficio de uno solo, sino de todos.",
                    "Este libro es una invitación a recordar, a sanar y a reconectar con esa memoria sagrada que habita en tu ADN."
                ]}
                price="$19.99"
                coverImage="/assets/images/books/hilos-cover.jpg"
                amazonLink="https://www.amazon.com/dp/B0CKW6595M" // Verify Link
                kindleLink="https://www.amazon.com/dp/B0CKW6595M"
                features={[
                    "Sanación Ancestral",
                    "Memoria Celular",
                    "Espiritualidad Práctica",
                    "Transformación Personal"
                ]}
            />
        </main>
    );
}
