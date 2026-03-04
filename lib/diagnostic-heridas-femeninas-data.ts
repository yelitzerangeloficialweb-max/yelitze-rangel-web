export type FemeninaType = 'Abandono' | 'Rechazo' | 'Injusticia' | 'Humillación' | 'Traición';

export interface FemeninaOption {
    label: string;
    points: Partial<Record<FemeninaType, number>>;
}

export interface FemeninaQuestion {
    id: number;
    text: string;
    options: FemeninaOption[];
}

export const DIAGNOSTIC_FEMENINA_QUESTIONS: FemeninaQuestion[] = [
    // 1. Herida del Abandono
    {
        id: 1,
        text: "¿Sientes que a menudo te abandona la gente que amas, ya sea física o emocionalmente?",
        options: [
            { label: "Sí, constantemente.", points: { Abandono: 3 } },
            { label: "A veces, me siento sola incluso estando rodeada de gente.", points: { Abandono: 2 } },
            { label: "Rara vez, pero me pasa.", points: { Abandono: 1 } },
            { label: "Nunca.", points: { Abandono: 0 } }
        ]
    },
    {
        id: 2,
        text: "¿Tienes miedo a que las personas cercanas a ti (pareja, amigos, familiares) se alejen o te dejen?",
        options: [
            { label: "Sí, siempre me siento ansiosa por esto.", points: { Abandono: 3 } },
            { label: "A veces, pero trato de controlarlo.", points: { Abandono: 2 } },
            { label: "Rara vez, confío en las personas.", points: { Abandono: 1 } },
            { label: "Nunca.", points: { Abandono: 0 } }
        ]
    },
    {
        id: 3,
        text: "En tus relaciones, ¿sueles evitar ser vulnerable o abrirte emocionalmente por miedo al rechazo o abandono?",
        options: [
            { label: "Sí, evito mostrarme vulnerable.", points: { Abandono: 3 } },
            { label: "A veces, me cuesta mucho.", points: { Abandono: 2 } },
            { label: "Rara vez, soy abierta.", points: { Abandono: 1 } },
            { label: "Nunca.", points: { Abandono: 0 } }
        ]
    },
    // 2. Herida de la Rechazo
    {
        id: 4,
        text: "¿Sientes que no eres suficientemente buena, atractiva o valiosa para los demás?",
        options: [
            { label: "Sí, constantemente.", points: { Rechazo: 3 } },
            { label: "A veces, me siento insegura.", points: { Rechazo: 2 } },
            { label: "Rara vez, tengo buena autoestima.", points: { Rechazo: 1 } },
            { label: "Nunca.", points: { Rechazo: 0 } }
        ]
    },
    {
        id: 5,
        text: "Cuando recibes críticas o comentarios negativos, ¿te afectan profundamente y sientes que te rechazan como persona?",
        options: [
            { label: "Sí, me dude mucho.", points: { Rechazo: 3 } },
            { label: "A veces, pero trato de superarlo.", points: { Rechazo: 2 } },
            { label: "Rara vez, me cuesta pero lo paso.", points: { Rechazo: 1 } },
            { label: "Nunca, las críticas no me afectan.", points: { Rechazo: 0 } }
        ]
    },
    {
        id: 6,
        text: "¿Tiendes a buscar la validación de los demás constantemente para sentirte querida o aceptada?",
        options: [
            { label: "Sí, necesito que me validen para sentirme bien.", points: { Rechazo: 3 } },
            { label: "A veces, pero trato de confiar en mí misma.", points: { Rechazo: 2 } },
            { label: "Rara vez, no suelo buscar validación externa.", points: { Rechazo: 1 } },
            { label: "Nunca.", points: { Rechazo: 0 } }
        ]
    },
    // 3. Herida de la Injusticia
    {
        id: 7,
        text: "¿Te sientes constantemente frustrada o enojada por situaciones que consideras injustas en tu vida, especialmente en relaciones con otras personas?",
        options: [
            { label: "Sí, siento que la vida es injusta muchas veces.", points: { Injusticia: 3 } },
            { label: "A veces, me siento molesta por lo que me ha tocado vivir.", points: { Injusticia: 2 } },
            { label: "Rara vez, trato de aceptar las cosas tal como son.", points: { Injusticia: 1 } },
            { label: "Nunca, acepto lo que me pasa sin resentimientos.", points: { Injusticia: 0 } }
        ]
    },
    {
        id: 8,
        text: "¿Tienes dificultades para perdonar a los demás por acciones que consideras injustas, incluso después de mucho tiempo?",
        options: [
            { label: "Sí, me cuesta perdonar mucho.", points: { Injusticia: 3 } },
            { label: "A veces, lo intento, pero me cuesta.", points: { Injusticia: 2 } },
            { label: "Rara vez, perdono sin problema.", points: { Injusticia: 1 } },
            { label: "Nunca, perdono con facilidad.", points: { Injusticia: 0 } }
        ]
    },
    {
        id: 9,
        text: "¿Tiendes a sentir que el esfuerzo que pones en tus relaciones no se valora o no se reconoce lo suficiente?",
        options: [
            { label: "Sí, siempre siento que doy más de lo que recibo.", points: { Injusticia: 3 } },
            { label: "A veces, me siento poco valorada.", points: { Injusticia: 2 } },
            { label: "Rara vez, pero hay momentos así.", points: { Injusticia: 1 } },
            { label: "Nunca, siento que mis esfuerzos son reconocidos.", points: { Injusticia: 0 } }
        ]
    },
    // 4. Herida de la Humillación
    {
        id: 10,
        text: "¿Sientes que en tu vida o en tus relaciones has sido ridiculizada, humillada o puesta en una posición de inferioridad?",
        options: [
            { label: "Sí, muchas veces me han humillado.", points: { Humillación: 3 } },
            { label: "A veces, me siento humillada por los demás.", points: { Humillación: 2 } },
            { label: "Rara vez, pero me ha pasado.", points: { Humillación: 1 } },
            { label: "Nunca.", points: { Humillación: 0 } }
        ]
    },
    {
        id: 11,
        text: "¿Tiendes a tener miedo de que las personas descubran aspectos vulnerables de ti, como tus errores o inseguridades, porque temes ser rechazada o ridiculizada?",
        options: [
            { label: "Sí, siempre me siento vulnerable frente a los demás.", points: { Humillación: 3 } },
            { label: "A veces, me cuesta mostrarme tal como soy.", points: { Humillación: 2 } },
            { label: "Rara vez, soy bastante abierta.", points: { Humillación: 1 } },
            { label: "Nunca, me siento cómoda siendo yo misma.", points: { Humillación: 0 } }
        ]
    },
    {
        id: 12,
        text: "En tu vida, ¿te sientes a menudo incapaz de cumplir con las expectativas de los demás (familia, pareja, amigos)?",
        options: [
            { label: "Sí, siento que nunca es suficiente lo que hago.", points: { Humillación: 3 } },
            { label: "A veces, siento presión de ser perfecta.", points: { Humillación: 2 } },
            { label: "Rara vez, trato de dar lo mejor de mí sin presiones.", points: { Humillación: 1 } },
            { label: "Nunca, me acepto tal como soy.", points: { Humillación: 0 } }
        ]
    },
    // 5. Herida de la Traición
    {
        id: 13,
        text: "¿Has sufrido una traición importante en tu vida (por parte de una pareja, amigo o familiar) que te dejó una herida emocional profunda?",
        options: [
            { label: "Sí, me ha marcado profundamente.", points: { Traición: 3 } },
            { label: "A veces, me cuesta olvidar esa traición.", points: { Traición: 2 } },
            { label: "Rara vez, pero me afectó.", points: { Traición: 1 } },
            { label: "Nunca, nunca he experimentado una traición tan profunda.", points: { Traición: 0 } }
        ]
    },
    {
        id: 14,
        text: "¿Sientes que es difícil para si confiar en las personas después de haber sido traicionada?",
        options: [
            { label: "Sí, me cuesta mucho confiar.", points: { Traición: 3 } },
            { label: "A veces, me cuesta pero intento seguir confiando.", points: { Traición: 2 } },
            { label: "Rara vez, confío fácilmente.", points: { Traición: 1 } },
            { label: "Nunca, confío en los demás sin problema.", points: { Traición: 0 } }
        ]
    },
    {
        id: 15,
        text: "Cuando una persona te hace daño o te miente, ¿te cuesta dejarlo ir y seguir adelante?",
        options: [
            { label: "Sí, me quedo atrapada en el dolor por mucho tiempo.", points: { Traición: 3 } },
            { label: "A veces, me toma tiempo, pero lo supero.", points: { Traición: 2 } },
            { label: "Rara vez, trato de seguir adelante rápidamente.", points: { Traición: 1 } },
            { label: "Nunca, dejo ir las heridas fácilmente.", points: { Traición: 0 } }
        ]
    }
];
