export type ProfundasType = 'Dolor No Sanado' | 'Desconfianza' | 'Culpa y Vergüenza' | 'Sobrecarga y Agobio' | 'Desamor o Pérdida';

export interface ProfundasOption {
    label: string;
    points: Partial<Record<ProfundasType, number>>;
}

export interface ProfundasQuestion {
    id: number;
    text: string;
    options: ProfundasOption[];
}

export const PROFUNDAS_QUESTIONS: ProfundasQuestion[] = [
    // 1. Herida del Dolor No Sanado (Trauma del Pasado)
    {
        id: 1,
        text: "¿Te encuentras a menudo pensando en eventos dolorosos del pasado que todavía te generan tristeza o enojo, a pesar de que haya pasado mucho tiempo?",
        options: [
            { label: "Sí, constantemente.", points: { 'Dolor No Sanado': 3 } },
            { label: "A veces, cuando algo me lo recuerda.", points: { 'Dolor No Sanado': 2 } },
            { label: "Rara vez, trato de olvidar el pasado.", points: { 'Dolor No Sanado': 1 } },
            { label: "Nunca, he superado mis experiencias pasadas.", points: { 'Dolor No Sanado': 0 } }
        ]
    },
    {
        id: 2,
        text: "¿Sientes que hay un peso emocional en tu pecho o espalda que no desaparece, incluso cuando intentas relajarte?",
        options: [
            { label: "Sí, siempre siento esa carga física.", points: { 'Dolor No Sanado': 3 } },
            { label: "A veces lo siento en momentos de estrés.", points: { 'Dolor No Sanado': 2 } },
            { label: "Rara vez, pero me pasa.", points: { 'Dolor No Sanado': 1 } },
            { label: "Nunca, me siento ligera físicamente.", points: { 'Dolor No Sanado': 0 } }
        ]
    },
    {
        id: 3,
        text: "¿Evitas hablar sobre ciertos recuerdos o personas porque el dolor se siente demasiado fresco y abrumador?",
        options: [
            { label: "Sí, prefiero no tocar esos temas.", points: { 'Dolor No Sanado': 3 } },
            { label: "A veces lo hago inconscientemente.", points: { 'Dolor No Sanado': 2 } },
            { label: "Rara vez, trato de ser honesta con lo que siento.", points: { 'Dolor No Sanado': 1 } },
            { label: "Nunca, hablo de mi pasado con tranquilidad.", points: { 'Dolor No Sanado': 0 } }
        ]
    },
    // 2. Herida de la Desconfianza y el Miedo al Futuro
    {
        id: 4,
        text: "¿Tienes dificultades para confiar plenamente en las personas, incluso en aquellas que son cercanas a ti?",
        options: [
            { label: "Sí, siempre espero que me fallen.", points: { Desconfianza: 3 } },
            { label: "A veces, me cuesta soltar el control.", points: { Desconfianza: 2 } },
            { label: "Rara vez, confío en la buena voluntad.", points: { Desconfianza: 1 } },
            { label: "Nunca, soy una persona muy confiada.", points: { Desconfianza: 0 } }
        ]
    },
    {
        id: 5,
        text: "¿Sueles preocuparte excesivamente por lo que podría salir mal en el futuro, sintiendo ansiedad de manera frecuente?",
        options: [
            { label: "Sí, la ansiedad es parte de mi día a día.", points: { Desconfianza: 3 } },
            { label: "A veces, me preocupo por cosas que no han pasado.", points: { Desconfianza: 2 } },
            { label: "Rara vez, trato de vivir el presente.", points: { Desconfianza: 1 } },
            { label: "Nunca, confío en que todo saldrá bien.", points: { Desconfianza: 0 } }
        ]
    },
    {
        id: 6,
        text: "¿Te sientes paralizada o incapaz de tomar decisiones importantes por miedo a cometer un error irreparable?",
        options: [
            { label: "Sí, el miedo me paraliza muchas veces.", points: { Desconfianza: 3 } },
            { label: "A veces me cuesta decidir.", points: { Desconfianza: 2 } },
            { label: "Rara vez, soy decidida.", points: { Desconfianza: 1 } },
            { label: "Nunca, tomo decisiones con seguridad.", points: { Desconfianza: 0 } }
        ]
    },
    // 3. Herida de la Culpa y la Vergüenza
    {
        id: 7,
        text: "¿Te sientes culpable por cosas que hiciste o dejaste de hacer en el pasado, incluso si ya has intentado remediarlo?",
        options: [
            { label: "Sí, la culpa me persigue constantemente.", points: { 'Culpa y Vergüenza': 3 } },
            { label: "A veces me siento mal conmigo misma.", points: { 'Culpa y Vergüenza': 2 } },
            { label: "Rara vez, trato de aprender de mis errores.", points: { 'Culpa y Vergüenza': 1 } },
            { label: "Nunca, me perdono con facilidad.", points: { 'Culpa y Vergüenza': 0 } }
        ]
    },
    {
        id: 8,
        text: "¿Tienes miedo de que, si las personas conocieran tu 'verdadero yo' con todas sus fallas e inseguridades, te rechazarían o juzgarían?",
        options: [
            { label: "Sí, siento que debo esconder mis sombras.", points: { 'Culpa y Vergüenza': 3 } },
            { label: "A veces me siento expuesta.", points: { 'Culpa y Vergüenza': 2 } },
            { label: "Rara vez, trato de ser auténtica.", points: { 'Culpa y Vergüenza': 1 } },
            { label: "Nunca, me acepto así como soy.", points: { 'Culpa y Vergüenza': 0 } }
        ]
    },
    {
        id: 9,
        text: "¿Sueles disculparte excesivamente, incluso por cosas que no son tu responsabilidad o que no requieren una disculpa?",
        options: [
            { label: "Sí, pido perdón por todo.", points: { 'Culpa y Vergüenza': 3 } },
            { label: "A veces lo hago sin darme cuenta.", points: { 'Culpa y Vergüenza': 2 } },
            { label: "Rara vez, solo cuando es necesario.", points: { 'Culpa y Vergüenza': 1 } },
            { label: "Nunca me disculpo si no es mi falta.", points: { 'Culpa y Vergüenza': 0 } }
        ]
    },
    // 4. Herida de la Sobrecarga y el Agobio
    {
        id: 10,
        text: "¿Sientes que llevas demasiadas responsabilidades sobre tus hombros, tanto tuyas como de los demás, y que estás al borde del agotamiento?",
        options: [
            { label: "Sí, me siento completamente abrumada.", points: { 'Sobrecarga y Agobio': 3 } },
            { label: "A veces, siento que ya no puedo más.", points: { 'Sobrecarga y Agobio': 2 } },
            { label: "Rara vez, trato de delegar.", points: { 'Sobrecarga y Agobio': 1 } },
            { label: "Nunca, sé equilibrar mis cargas.", points: { 'Sobrecarga y Agobio': 0 } }
        ]
    },
    {
        id: 11,
        text: "¿Tienes dificultades para decir 'no' a las peticiones de los demás, incluso cuando esto afecta tu propio bienestar?",
        options: [
            { label: "Sí, me cuesta mucho poner límites.", points: { 'Sobrecarga y Agobio': 3 } },
            { label: "A veces cedo para no generar conflicto.", points: { 'Sobrecarga y Agobio': 2 } },
            { label: "Rara vez, priorizo mis necesidades.", points: { 'Sobrecarga y Agobio': 1 } },
            { label: "Nunca, digo 'no' con total seguridad.", points: { 'Sobrecarga y Agobio': 0 } }
        ]
    },
    {
        id: 12,
        text: "¿Sientes que no tienes tiempo para ti misma, para descansar o para hacer las cosas que realmente disfrutas?",
        options: [
            { label: "Sí, mi vida es puro compromiso y deber.", points: { 'Sobrecarga y Agobio': 3 } },
            { label: "Me cuesta mucho encontrar esos espacios.", points: { 'Sobrecarga y Agobio': 2 } },
            { label: "A veces tengo momentos para mí.", points: { 'Sobrecarga y Agobio': 1 } },
            { label: "Nunca, siempre hago tiempo para mí.", points: { 'Sobrecarga y Agobio': 0 } }
        ]
    },
    // 5. Herida del Desamor o de la Pérdida de Conexión
    {
        id: 13,
        text: "¿Sientes que no eres verdaderamente amada o comprendida por las personas más importantes en tu vida (pareja, familia, amigos)?",
        options: [
            { label: "Sí, me siento muy sola emocionalmente.", points: { 'Desamor o Pérdida': 3 } },
            { label: "A veces, siento que falta profundidad.", points: { 'Desamor o Pérdida': 2 } },
            { label: "Rara vez, me siento acompañada.", points: { 'Desamor o Pérdida': 1 } },
            { label: "Nunca, me siento profundamente amada.", points: { 'Desamor o Pérdida': 0 } }
        ]
    },
    {
        id: 14,
        text: "¿Te cuesta expresar tus sentimientos más profundos porque temes que no sean tomados en serio o que sean rechazados?",
        options: [
            { label: "Sí, prefiero guardármelo todo.", points: { 'Desamor o Pérdida': 3 } },
            { label: "A veces, me cuesta abrirme.", points: { 'Desamor o Pérdida': 2 } },
            { label: "Rara vez, soy transparente.", points: { 'Desamor o Pérdida': 1 } },
            { label: "Nunca, hablo de mis emociones con facilidad.", points: { 'Desamor o Pérdida': 0 } }
        ]
    },
    {
        id: 15,
        text: "¿Has sentido que has perdido la conexión contigo misma, como si no supieras quién eres realmente o qué es lo que deseas en la vida?",
        options: [
            { label: "Sí, me siento perdida y desconectada.", points: { 'Desamor o Pérdida': 3 } },
            { label: "A veces no me reconozco.", points: { 'Desamor o Pérdida': 2 } },
            { label: "Rara vez me pasa.", points: { 'Desamor o Pérdida': 1 } },
            { label: "Nunca, estoy muy bien conectada con mi esencia.", points: { 'Desamor o Pérdida': 0 } }
        ]
    }
];
