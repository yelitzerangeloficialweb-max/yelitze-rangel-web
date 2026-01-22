export type TestOption = {
    label: string;
    value: number; // Score value (e.g., 1-5 or specific category weight)
};

export type TestQuestion = {
    id: string;
    text: string;
    options: TestOption[];
};

export type TestDefinition = {
    id: string;
    title: string;
    slug: string; // URL slug
    description: string;
    questions: TestQuestion[];
};

export const TESTS_DATA: TestDefinition[] = [
    {
        id: 'heridas-infancia',
        title: 'Test de Heridas de la Infancia',
        slug: 'heridas-infancia',
        description: 'Descubre qué herida emocional (Abandono, Rechazo, Humillación, Traición, Injusticia) está influyendo más en tu vida actual.',
        questions: [
            {
                id: 'q1',
                text: 'Cuando era niño/a, sentía que mis padres...',
                options: [
                    { label: 'Estaban ocupados y no tenían tiempo para mí', value: 1 }, // Abandono
                    { label: 'Me criticaban o no me aceptaban como era', value: 2 }, // Rechazo
                    { label: 'Me comparaban constantemente con otros', value: 3 }, // Humillación
                ],
            },
            {
                id: 'q2',
                text: 'En mis relaciones actuales, mi mayor miedo es...',
                options: [
                    { label: 'Que me dejen o se vayan sin explicación', value: 1 },
                    { label: 'Que no me valoren o me rechacen', value: 2 },
                    { label: 'Sentirme avergonzado/a o expuesto/a', value: 3 },
                ],
            },
            {
                id: 'q3',
                text: 'Ante un conflicto, mi reacción suele ser...',
                options: [
                    { label: 'Aferrarme a la persona para no perderla', value: 1 },
                    { label: 'Huir o aislarme para no sufrir', value: 2 },
                    { label: 'Ponerme a la defensiva o atacar', value: 3 },
                ],
            },
            // More questions can be added here
        ],
    },
    {
        id: 'creencias-amor',
        title: 'Creencias sobre el Amor',
        slug: 'creencias-amor',
        description: 'Identifica los bloqueos inconscientes que te impiden vivir una relación de pareja plena y consciente.',
        questions: [
            {
                id: 'q1',
                text: 'Para mí, el amor verdadero significa...',
                options: [
                    { label: 'Sufrimiento y sacrificio', value: 1 },
                    { label: 'Lucha constante para mantenerlo', value: 2 },
                    { label: 'Paz, crecimiento y compañía', value: 3 },
                ],
            },
            // Placeholder questions
            {
                id: 'q2',
                text: 'Cuando pienso en comprometerme...',
                options: [
                    { label: 'Siento que perderé mi libertad', value: 1 },
                    { label: 'Me da miedo que me lastimen', value: 2 },
                    { label: 'Me siento entusiasmado/a', value: 3 },
                ],
            },
        ],
    },
    {
        id: 'creencias-dinero',
        title: 'Creencias sobre el Dinero',
        slug: 'creencias-dinero',
        description: 'Explora tu relación con la abundancia y detecta lealtades familiares que limitan tu prosperidad.',
        questions: [
            {
                id: 'q1',
                text: 'En mi familia, el dinero siempre fue...',
                options: [
                    { label: 'Motivo de peleas y conflictos', value: 1 },
                    { label: 'Escaso y difícil de conseguir', value: 2 },
                    { label: 'Una herramienta para vivir bien', value: 3 },
                ],
            },
            {
                id: 'q2',
                text: 'Si tuviera mucho dinero, siento que...',
                options: [
                    { label: 'La gente me envidiaría o me buscaría por interés', value: 1 },
                    { label: 'Me volvería una mala persona', value: 2 },
                    { label: 'Podría ayudar a más personas y disfrutar', value: 3 },
                ],
            },
        ],
    },
];
