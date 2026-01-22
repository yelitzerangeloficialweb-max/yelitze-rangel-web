import BookShowcase from '@/components/books/BookShowcase';

export default function ConversacionesPage() {
    return (
        <main>
            <BookShowcase
                title="Conversaciones con mi Chamana"
                subtitle="107 pláticas para despertar tu medicina interior"
                description={[
                    "Hay una voz antigua que vive dentro de ti. Una abuela, una guía, una chamana que conoce los caminos del alma, que guarda las cenizas de las mujeres que vinieron antes, y enciende con ellas el fuego de tu despertar.",
                    "Este libro nació en el umbral de un nuevo tiempo, cuando logré escuchar la voz de mi parte sabia. Esa mujer que habita en todas nosotras y que espera pacientemente a ser escuchada.",
                    "Una recopilación de 107 reflexiones, meditaciones y diálogos internos para acompañarte en tu día a día."
                ]}
                price="$16.99"
                coverImage="/assets/images/books/chamana-cover.jpg"
                amazonLink="https://www.amazon.com/dp/B0CSXW7R2J" // Verify Link
                features={[
                    "Sabiduría Femenina",
                    "Meditaciones Diarias",
                    "Conexión Interior",
                    "Sanación del Alma"
                ]}
            />
        </main>
    );
}
