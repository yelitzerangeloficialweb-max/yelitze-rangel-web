export interface EventData {
    id: number;
    slug: string;
    title: string;
    type: 'Semillas de consciencia' | 'Círculo de expansión';
    date: string;
    time?: string;
    location: string;
    image: string;
    aida: {
        attention: string;
        interest: string;
        desire: string;
        action: string;
    };
    fullDescription: string[]; // Array of paragraphs for the detailed view
}

export const EVENTS_DATA: EventData[] = [
    {
        id: 1,
        slug: 'sanate-mujer',
        title: "Sánate Mujer",
        type: "Semillas de consciencia",
        date: "22 de Mayo",
        time: "10:00 AM",
        location: "Online (Zoom)",
        image: "/assets/images/img-sanate.jpg",
        aida: {
            attention: "¿Te has preguntado por qué repites las mismas historias que vivió tu madre o tu abuela? Si creciste viendo a las mujeres de tu familia sacrificarlo todo y sin darte cuenta estás siguiendo el mismo patrón, hoy puedes detener ese ciclo.",
            interest: "Dirigido a mujeres que dudan de sí mismas, que sienten que son 'demasiado intensas' y que, por más que intentan, terminan en relaciones que lastiman o trabajos frustrantes.",
            desire: "Aprenderás a identificar tu herida emocional dominante y cómo se manifiesta. Dejarás de atraer desde la carencia para comenzar a conectar desde la abundancia, la confianza y el amor propio.",
            action: "Registrarme Gratis"
        },
        fullDescription: [
            "Desde niña aprendiste a dudar de ti misma, a creer que eras demasiado sensible, demasiado emocional, demasiado intensa o que nunca era suficiente.",
            "Pero déjame decirte algo, no naciste sintiéndote así. Todas esas emociones son producto de una herida que se sembró en ti hace tanto tiempo que hoy está afectando tu autoestima, tus relaciones y tu capacidad de recibir amor y abundancia.",
            "Ahora dime, ¿Quieres identificar la herida emocional que te impide vivir con paz y en conexión contigo misma?",
            "Entonces, acompáñame el 22 de mayo en mi próximo encuentro online gratuito Sánate Mujer.",
            "Allí te enseñaré a identificar tu herida emocional dominante, comprender cómo se manifiesta en tu vida y reconocer el primer paso de tu proceso de sanación interior.",
            "Matrimonio fallido, compañeros tóxicos, socios desleales. Siempre atraes personas que te lastiman.",
            "¿Sabes por qué? Porque aunque no las ves, hay heridas del pasado que están eligiendo por ti a quienes dejas entrar a tu vida.",
            "Cuando no sanas, atraes desde la carencia, desde la herida, desde el miedo. Pero cuando sanas, todo cambia y atraes desde la abundancia, la confianza y el amor."
        ]
    },
    {
        id: 2,
        slug: 'sanando-linaje-femenino',
        title: "Sanando el Linaje Femenino",
        type: "Círculo de expansión",
        date: "Inscripciones Abiertas",
        location: "Formación Online (3 Etapas)",
        image: "/assets/images/img-linaje.jpg",
        aida: {
            attention: "¿Sientes que estás viviendo una historia que no te pertenece? Esa sensación de vacío no es falta de esfuerzo; es el eco de heridas emocionales heredadas. No tienes que cargar con el peso de las generaciones que te precedieron.",
            interest: "Para mujeres profesionales, madres o buscadoras espirituales que sienten un cansancio emocional inexplicable, les cuesta poner límites y buscan sanar su relación con la abundancia sin procesos eternos.",
            desire: "Rompe el ciclo. Suelta cargas ajenas, recupera tu energía vital y transforma el dolor en una confianza inquebrantable. Al finalizar, te sentirás reconciliada con tu historia y lista para manifestar la vida que mereces.",
            action: "Quiero Inscribirme Ahora"
        },
        fullDescription: [
            "**[Encabezado Magnético] Sanando el Linaje Femenino: Rompe el ciclo y recupera tu poder. Inscripciones Abiertas | Formación Online de 3 Etapas**",
            "Existe un dolor silencioso que no nació contigo. Se manifiesta en esa voz interna que te hace dudar de tu valor, en las relaciones donde repites patrones que te lastiman y en ese techo de cristal que bloquea tu abundancia y tu capacidad de amar.",
            "Esa sensación de vacío no es falta de esfuerzo; es el eco de heridas emocionales heredadas que echaron raíces en tu historia.",
            "No tienes que cargar con el peso de las generaciones que te precedieron. Cuando sanas tú, el camino se despeja para las que vienen.",
            "He creado la **Inmersión: Sanando el Linaje Femenino**, un viaje profundo diseñado para que logres en semanas lo que a muchas les toma años de terapia tradicional.",
            "A través de un método de 3 etapas, aprenderás a identificar, comprender y soltar las lealtades invisibles que te atan al pasado. Sin saturarte de teoría, nos enfocamos en prácticas reales y efectivas que te devuelven a tu centro.",
            "Este no es solo un curso, es el cierre de un ciclo de dolor y el inicio de tu libertad:",
            "- Sueltas cargas ajenas: Libérate del miedo y la culpa que heredaste de tu árbol genealógico.",
            "- Recuperas tu energía vital: Deja de invertir tu fuerza en sostener heridas del pasado y úsala para crear tu futuro.",
            "- Paz y claridad emocional: Transforma el dolor en fuerza y la duda en una confianza inquebrantable.",
            "- Escribe tu propio destino: Al finalizar, te sentirás ligera, reconciliada con tu historia y lista para manifestar la vida que mereces."
        ]
    },
    {
        id: 3,
        slug: 'diplomado-coaching-ancestral',
        title: "Diplomado de Coaching Ancestral",
        type: "Círculo de expansión",
        date: "Por Definir",
        time: "9:00 - 16:30",
        location: "Maracaibo",
        image: "/assets/images/diplomado-ancestral.png",
        aida: {
            attention: "“Los Órdenes del Chamanismo en la Terapia Sistémica”. Un viaje profundo donde el Chamanismo y las Constelaciones Familiares se encuentran para sanar el alma.",
            interest: "Una formación intensiva de 3 módulos para terapeutas, psicólogos y buscadores que desean integrar herramientas chamánicas y sistémicas en sus procesos de sanación propios y con clientes.",
            desire: "Aprende a trabajar con las capas del alma, rituales de paso, el campo de los ancestros y representaciones arquetípicas. Certifícate en Reconexión Sistémica® y lleva tu práctica terapéutica a un nuevo nivel de profundidad.",
            action: "Solicitar Información"
        },
        fullDescription: [
            "**Diplomado de Coaching Ancestral: 'Los Órdenes del Chamanismo en la Terapia Sistémica'**",
            "La madre del Coaching Ancestral es el Chamanismo, el padre es el trabajo de Constelaciones Familiares al viejo estilo. El niño tiene características de ambos, pero como cualquier otro niño de dos padres, se para por sí mismo.",
            "En el Coaching Ancestral puedes reconocer elementos del Chamanismo y de Constelaciones, pero es un método en sí mismo. Puede ser usado para dar al cliente un sentido de pertenencia, de ser una parte bienvenida dentro de una unidad mayor, atendido y apoyado en su salud y bienestar.",
            "De acuerdo con las Tradiciones Chamánicas, el alma tiene diferentes elementos o capas. Algunas son individuales, pero otros aspectos los compartimos con la familia u otros grupos.",
            "**Trabajamos con diferentes capas del alma como un soporte para la sanación de los enredos sistémicos**, explorando en cada constelación la relación entre el alma y el campo de los ancestros.",
            "---",
            "**ESTRUCTURA DE LA CAPACITACIÓN**",
            "**Módulo I: EMPRENDIENDO EL VUELO**",
            "- Las 4 Capas del Alma y cómo trabajar en consulta privada y grupal.",
            "- La familia y los ancestros: Reconociendo y buscando su medicina.",
            "- Rituales sistémicos vs Constelaciones Chamánicas.",
            "- Traumas transgeneracionales: Ubicarlos, resolución y práctica.",
            "- El círculo de la vida, muerte, pareja y despedidas.",
            "- Diferencia entre ritual y ceremonia, y el permiso para entrar al alma de los ancestros.",
            "**Módulo II: SURCANDO LOS CIELOS**",
            "- Diferencia entre constelaciones familiares, de trauma y Chamánicas.",
            "- Constelaciones Chamánicas en el tablero y el uso de objetos (tótems).",
            "- Uso de recursos: sonaja, tambor, abanicos de pluma, medicinas ancestrales y música.",
            "- Estructura y tiempo de una Constelación Chamánica.",
            "- El círculo de las 4 direcciones.",
            "**Módulo III: ATERRIZANDO EL VUELO**",
            "- Anclando el trabajo personal a la tierra.",
            "- Masaje Chamánico, el cuerpo y la familia.",
            "- Desprogramación de la personalidad y descongelamiento de trauma.",
            "- Prácticas con clientes dentro de la capacitación.",
            "- Toma de Medicina (ayahuasca, yopo o rapé) y Temazcal para anclar el trabajo.",
            "---",
            "**INFORMACIÓN GENERAL**",
            "Este método llamado **Coaching Ancestral®** fue creado por Yelitze Rangel, uniendo 14 años de conocimiento en psicofisiología corporal, trauma, principios chamánicos y constelaciones sistémicas.",
            "**Para quién:** Formación de aprox. 95 horas en 9 días continuos. Diseñada para profesionales (psicoterapeutas, consteladores, trabajadores sociales) y personas comprometidas con su crecimiento personal que deseen ampliar sus herramientas de sanación.",
            "**Certificación:** Al completar el entrenamiento, recibirás un certificado que te autoriza a utilizar el nombre de **Reconexión Sistémica®** (marca registrada).",
            "**Lugar:** Maracaibo.",
            "**Mayor Información:** 0414-6180005 (Whatsapp)"
        ]
    }
];

export function getEventBySlug(slug: string) {
    return EVENTS_DATA.find(event => event.slug === slug);
}
