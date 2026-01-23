export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // HTML or Markdown
    date: string;
    image: string;
    category: string;
    author: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        slug: 'sanar-heridas-infancia',
        title: '¿Por qué repetimos patrones? Sanando las Heridas de la Infancia',
        excerpt: 'Descubre cómo las experiencias no resueltas de tu niñez moldean tus relaciones actuales y aprende el primer paso para liberarte.',
        date: '28 de Diciembre, 2025',
        image: '/assets/images/tests/blog_childhood_wounds.png',
        category: 'Sanación Interior',
        author: 'Yelitzé Rangel',
        content: `
            <p class="mb-4">Muchas veces nos preguntamos por qué siempre terminamos con el mismo tipo de pareja o por qué ciertas situaciones nos detonan una reacción desproporcionada. La respuesta suele esconderse en nuestra historia temprana.</p>
            <h3 class="text-2xl font-heading text-[var(--color-primary)] mt-8 mb-4">El Niño Interior Herido</h3>
            <p class="mb-4">Todos llevamos dentro al niño que fuimos. Si ese niño se sintió abandonado, rechazado o injustamente tratado, el adulto de hoy buscará inconscientemente reparar esa herida a través de sus relaciones.</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>La Herida de Abandono:</strong> Crea adultos dependientes que temen a la soledad.</li>
                <li><strong>La Herida de Rechazo:</strong> Crea adultos huidizos que temen a la intimidad.</li>
                <li><strong>La Herida de Traición:</strong> Crea adultos controladores que temen confiar.</li>
            </ul>
            <p class="mb-4">El primer paso para sanar no es culpar a nuestros padres, sino mirar esa herida con compasión y hacernos cargo de ella hoy. Tú eres el padre/madre que tu niño interior necesita.</p>
        `
    },
    {
        id: '2',
        slug: 'constelaciones-familiares-amor',
        title: 'El Amor Ciego vs. El Amor Consciente',
        excerpt: 'Las constelaciones familiares nos enseñan que a veces sufrimos por lealtad a nuestros ancestros. ¿Cómo podemos amar con los ojos abiertos?',
        date: '20 de Diciembre, 2025',
        image: '/assets/images/tests/blog_blind_vs_conscious_love.png',
        category: 'Relaciones',
        author: 'Yelitzé Rangel',
        content: `
            <p class="mb-4">El "Amor Ciego" es aquel que dice inconscientemente: "Yo sufro como tú para pertenecer". Es una lealtad invisible hacia nuestros padres o abuelos que nos lleva a repetir sus destinos difíciles.</p>
            <h3 class="text-2xl font-heading text-[var(--color-primary)] mt-8 mb-4">Mirar con Amor</h3>
            <p class="mb-4">El "Amor Consciente", por otro lado, es capaz de mirar el dolor del pasado, honrarlo y dejarlo ahí, con quienes corresponde. Dice: "Te honro viviendo una vida feliz, aunque tú no pudiste".</p>
            <p class="mb-4">Para tener una pareja plena, primero debemos ocupar nuestro lugar de "hijos" frente a nuestros padres. Solo cuando tomamos la fuerza de nuestros ancestros sin juzgarlos, estamos listos para mirar hacia adelante, hacia nuestra propia vida.</p>
        `
    },
    {
        id: '3',
        slug: 'energia-del-dinero',
        title: 'El Dinero es Energía: Desbloquea tu Abundancia',
        excerpt: 'Tu cuenta bancaria es un reflejo de tu energía vital. Analizamos los bloqueos sistémicos más comunes que impiden el flujo del dinero.',
        date: '15 de Diciembre, 2025',
        image: '/assets/images/tests/blog_money_energy.png',
        category: 'Abundancia',
        author: 'Yelitzé Rangel',
        content: `
            <p class="mb-4">En el pensamiento sistémico, el dinero se equipara a la Vida y a la Madre. ¿Cómo es tu relación con tu madre? A menudo, tomar a la madre es tomar el dinero.</p>
            <h3 class="text-2xl font-heading text-[var(--color-primary)] mt-8 mb-4">Creencias Limitantes</h3>
            <p class="mb-4">Si creciste escuchando que "el dinero es sucio" o que "los ricos son malos", tu inconsciente te protegerá de tener dinero para que no seas "malo" o "sucio".</p>
            <p class="mb-4">Sanar tu relación con la abundancia implica limpiar esas lealtades y darte permiso para prosperar. El dinero es una energía neutra; tú le das la intención. En manos de una persona consciente, el dinero construye y sana.</p>
        `
    }
];
