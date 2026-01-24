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
            <p class="mb-6 text-lg">Muchas veces nos preguntamos por qué siempre terminamos con el mismo tipo de pareja o por qué ciertas situaciones nos detonan una reacción desproporcionada. La respuesta suele esconderse en nuestra historia temprana.</p>
            <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">El Niño Interior Herido</h3>
            <p class="mb-6">Todos llevamos dentro al niño que fuimos. Si ese niño se sintió abandonado, rechazado o injustamente tratado, el adulto de hoy buscará inconscientemente reparar esa herida a través de sus relaciones.</p>
            <ul class="list-disc pl-8 mb-8 space-y-4 text-lg">
                <li><strong>La Herida de Abandono:</strong> Crea adultos dependientes que temen a la soledad.</li>
                <li><strong>La Herida de Rechazo:</strong> Crea adultos huidizos que temen a la intimidad.</li>
                <li><strong>La Herida de Traición:</strong> Crea adultos controladores que temen confiar.</li>
            </ul>
            <p class="mb-6 text-lg italic border-l-4 border-[var(--color-secondary)] pl-6">"El primer paso para sanar no es culpar a nuestros padres, sino mirar esa herida con compasión y hacernos cargo de ella hoy."</p>
            <p class="mb-6 text-lg">Tú eres el padre/madre que tu niño interior necesita. Solo cuando validas tu propio dolor, el ciclo de repetición comienza a romperse.</p>
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
            <p class="mb-6 text-lg">El "Amor Ciego" es aquel que dice inconscientemente: "Yo sufro como tú para pertenecer". Es una lealtad invisible hacia nuestros padres o abuelos que nos lleva a repetir sus destinos difíciles.</p>
            <h2 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Mirar con Amor</h2>
            <p class="mb-6 text-lg">El "Amor Consciente", por otro lado, es capaz de mirar el dolor del pasado, honrarlo y dejarlo ahí, con quienes corresponde. Dice: "Te honro viviendo una vida feliz, aunque tú no pudiste".</p>
            <div class="my-12 p-10 bg-[#fafcfe] rounded-3xl border border-stone-100 italic text-xl text-[var(--color-primary)]">
                Para tener una pareja plena, primero debemos ocupar nuestro lugar de "hijos" frente a nuestros padres.
            </div>
            <p class="mb-6 text-lg text-stone-600 leading-relaxed">Solo cuando tomamos la fuerza de nuestros ancestros sin juzgarlos, estamos listos para mirar hacia adelante, hacia nuestra propia vida. El amor consciente no carga maletas ajenas, celebra su propia libertad.</p>
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
            <p class="mb-6 text-lg">En el pensamiento sistémico, el dinero se equipara a la Vida y a la Madre. ¿Cómo es tu relación con tu madre? A menudo, tomar a la madre es tomar el dinero.</p>
            <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Creencias Limitantes</h3>
            <p class="mb-6 text-lg">Si creciste escuchando que "el dinero es sucio" o que "los ricos son malos", tu inconsciente te protegerá de tener dinero para que no seas "malo" o "sucio".</p>
            <p class="mb-6 text-lg">Sanar tu relación con la abundancia implica limpiar esas lealtades y darte permiso para prosperar. El dinero es una energía neutra; tú le das la intención. En manos de una persona consciente, el dinero construye y sana.</p>
        `
    },
    {
        id: '4',
        slug: 'el-padre-estructura-y-vuelo',
        title: 'El Padre: Estructura, Orden y Vuelo',
        excerpt: 'Tomar al padre es tomar la capacidad de poner límites, tener éxito en el mundo y lanzarse a lo nuevo con seguridad.',
        date: '10 de Diciembre, 2025',
        image: '/assets/images/coaching-bg-new.jpg',
        category: 'Ancestralidad',
        author: 'Yelitzé Rangel',
        content: `
            <p class="mb-6 text-lg">Mientras que la madre nos da la vida y la nutrición, el padre es quien nos da la fuerza para salir de casa y enfrentar el mundo exterior.</p>
            <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">La Fuerza del Hacer</h3>
            <p class="mb-6 text-lg">Si sientes que te cuesta concretar proyectos, que te falta disciplina o que el mundo te abruma, puede que necesites reconciliarte con la figura de tu padre. No importa cómo haya sido él como persona; lo que importa es la energía de "autoridad" y "estructura" que representa.</p>
            <p class="mb-6 text-lg">Asentir a nuestro padre tal como fue nos da el permiso de ser exitosos. El éxito tiene la cara del padre.</p>
        `
    },
    {
        id: '5',
        slug: 'medicina-del-cacao-sistematica',
        title: 'La Medicina del Cacao: Un Viaje Sistémico del Corazón',
        excerpt: 'Cómo los rituales ancestrales potencian el trabajo de constelaciones al abrir el espacio sagrado del sentir.',
        date: '05 de Diciembre, 2025',
        image: '/assets/images/about-ritual.jpg',
        category: 'Rituales',
        author: 'Yelitzé Rangel',
        content: `
            <p class="mb-6 text-lg">El Cacao no es solo una bebida; es una planta maestra que actúa como puente entre la mente y el corazón. En nuestros círculos, lo usamos para suavizar las defensas del ego.</p>
            <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Sentir para Sanar</h3>
            <p class="mb-6 text-lg">A diferencia de la terapia puramente intelectual, el ritual del cacao nos invita a habitar el cuerpo. Cuando el corazón se abre, los secretos sistémicos y los nudos emocionales se revelan con mayor facilidad y suavidad.</p>
            <p class="mb-6 text-lg">Es en ese espacio de vulnerabilidad compartida donde ocurre la verdadera alquimia: la transformación del dolor en sabiduría compartida.</p>
        `
    },
    {
        id: '6',
        slug: 'coaching-tradicional-vs-ancestral',
        title: 'Coaching Tradicional vs. Ancestral: ¿Cuál es la diferencia?',
        excerpt: 'Más allá de los objetivos y la acción, el Coaching Ancestral busca el origen sistémico de lo que te detiene.',
        date: '01 de Diciembre, 2025',
        image: '/assets/images/vortex-hero-clean.png',
        category: 'Metodología',
        author: 'Yelitzé Rangel',
        content: `
            <p class="mb-6 text-lg">El coaching tradicional se enfoca en el "aquí y ahora" y en el "hacia dónde voy". Es excelente para la acción, pero a veces insuficiente cuando existen bloqueos profundos.</p>
            <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">El Alma en el Proceso</h3>
            <p class="mb-6 text-lg">El Coaching Ancestral® añade una dimensión crucial: el "de dónde vengo". Entendemos que muchas veces no podemos avanzar no por falta de herramientas, sino porque estamos mirando hacia el pasado, sosteniendo algo por alguien más.</p>
            <p class="mb-6 text-lg">Mi enfoque une la estructura del coaching con la profundidad de la sistémica, permitiendo que la persona no solo logre sus metas, sino que lo haga desde un lugar de paz interna y orden familiar.</p>
        `
    },
    {
        id: '7',
        slug: 'proposito-de-vida-sistemico',
        title: 'Tu Propósito de Vida: Más allá del Ego',
        excerpt: '¿Sientes que lo tienes todo pero te falta algo? El propósito no es una meta, es un lugar de servicio dentro de tu sistema.',
        date: '25 de Noviembre, 2025',
        image: '/assets/images/about-experience.jpg',
        category: 'Evolución',
        author: 'Yelitzé Rangel',
        content: `
            <p class="mb-6 text-lg">A menudo confundimos el propósito con el éxito profesional o el reconocimiento. Sin embargo, el verdadero propósito surge cuando ocupamos nuestro lugar correcto en el sistema y permitimos que la Vida fluya a través de nosotros.</p>
            <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">El Servicio a algo Mayor</h3>
            <p class="mb-6 text-lg">Desde las Constelaciones Familiares, vemos que el propósito es un movimiento hacia afuera, hacia los demás, pero que nace de estar bien anclados en nuestras raíces. Si no estamos en paz con nuestra historia, nuestro "Hacer" en el mundo será una huida en lugar de un propósito.</p>
            <p class="mb-6 text-lg">Cuando sanas el vínculo con tus ancestros, descubres que tus talentos no son solo tuyos, sino que son la culminación de los sueños de quienes vinieron antes. Poner esos talentos al servicio es tu propósito más elevado.</p>
        `
    }
];

export function getPostBySlug(slug: string) {
    return BLOG_POSTS.find(post => post.slug === slug);
}
