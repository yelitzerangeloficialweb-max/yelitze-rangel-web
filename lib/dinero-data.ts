export type DineroBeliefType =
    | 'Carencia / Esfuerzo'
    | 'Miedo / Inseguridad'
    | 'Evitación / Conflicto'
    | 'Culpa / Desvalorización';

export type NervousSystemType =
    | 'Hiperactivación (Lucha/Huida)'
    | 'Congelamiento (Desconexión)'
    | 'Complacencia (Fawning)';

export interface DineroOption {
    label: string;
    points: Partial<Record<DineroBeliefType, number>>;
    ns: NervousSystemType;
}

export interface DineroQuestion {
    id: number;
    text: string;
    options: DineroOption[];
}

export const DINERO_QUESTIONS: DineroQuestion[] = [
    {
        id: 1,
        text: "1. Cuando piensas en dinero, tu cuerpo suele…",
        options: [
            { label: "Tensarse, como si nunca fuera suficiente", points: { 'Carencia / Esfuerzo': 2 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "Sentir ansiedad por perderlo", points: { 'Miedo / Inseguridad': 2 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "Desconectarse, prefiero no pensar en eso", points: { 'Evitación / Conflicto': 2 }, ns: 'Congelamiento (Desconexión)' },
            { label: "Sentir culpa por querer más", points: { 'Culpa / Desvalorización': 2 }, ns: 'Complacencia (Fawning)' }
        ]
    },
    {
        id: 2,
        text: "2. Cuando recibes dinero inesperado…",
        options: [
            { label: "Lo guardas “por si acaso”", points: { 'Miedo / Inseguridad': 2 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "Piensas que pronto se irá", points: { 'Carencia / Esfuerzo': 2 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "Te cuesta disfrutarlo", points: { 'Evitación / Conflicto': 1, 'Culpa / Desvalorización': 1 }, ns: 'Congelamiento (Desconexión)' },
            { label: "Sientes que no lo mereces", points: { 'Culpa / Desvalorización': 2 }, ns: 'Complacencia (Fawning)' }
        ]
    },
    {
        id: 3,
        text: "3. Cobrar por tu trabajo se siente como…",
        options: [
            { label: "Una incomodidad", points: { 'Evitación / Conflicto': 2 }, ns: 'Congelamiento (Desconexión)' },
            { label: "Un conflicto interno", points: { 'Miedo / Inseguridad': 1, 'Culpa / Desvalorización': 1 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "Algo que te cuesta sostener", points: { 'Carencia / Esfuerzo': 2 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "Algo que siempre dudas", points: { 'Culpa / Desvalorización': 2 }, ns: 'Complacencia (Fawning)' }
        ]
    },
    {
        id: 4,
        text: "4. En tu familia, el dinero era…",
        options: [
            { label: "Motivo de preocupación constante", points: { 'Carencia / Esfuerzo': 2 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "Motivo de peleas", points: { 'Miedo / Inseguridad': 2 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "Algo que nunca alcanzaba", points: { 'Carencia / Esfuerzo': 2 }, ns: 'Hiperactivación (Lucha/Huida)' }, // Adjusted based on context
            { label: "Algo que se sacrificaba", points: { 'Culpa / Desvalorización': 2 }, ns: 'Complacencia (Fawning)' }
        ]
    },
    {
        id: 5,
        text: "5. Cuando gastas dinero en ti…",
        options: [
            { label: "Sientes culpa después", points: { 'Culpa / Desvalorización': 2 }, ns: 'Complacencia (Fawning)' },
            { label: "Te justificas mentalmente", points: { 'Miedo / Inseguridad': 1, 'Carencia / Esfuerzo': 1 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "Te prometes “no volver a hacerlo”", points: { 'Evitación / Conflicto': 2 }, ns: 'Congelamiento (Desconexión)' },
            { label: "Te cuesta permitirte disfrutar", points: { 'Carencia / Esfuerzo': 2 }, ns: 'Congelamiento (Desconexión)' }
        ]
    },
    {
        id: 6,
        text: "6. Ahorrar dinero para ti se siente…",
        options: [
            { label: "Difícil de sostener", points: { 'Carencia / Esfuerzo': 2 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "Inseguro", points: { 'Miedo / Inseguridad': 2 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "Innecesario", points: { 'Evitación / Conflicto': 2 }, ns: 'Congelamiento (Desconexión)' },
            { label: "Amenazante", points: { 'Miedo / Inseguridad': 2 }, ns: 'Hiperactivación (Lucha/Huida)' }
        ]
    },
    {
        id: 7,
        text: "7. Cuando piensas en ganar más dinero…",
        options: [
            { label: "Sientes miedo a perder estabilidad", points: { 'Miedo / Inseguridad': 2 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "Sientes que podrías afectar a otros", points: { 'Culpa / Desvalorización': 2 }, ns: 'Complacencia (Fawning)' },
            { label: "Dudas de tu capacidad", points: { 'Carencia / Esfuerzo': 2 }, ns: 'Congelamiento (Desconexión)' },
            { label: "Sientes presión y exigencia", points: { 'Carencia / Esfuerzo': 2 }, ns: 'Hiperactivación (Lucha/Huida)' }
        ]
    },
    {
        id: 8,
        text: "8. Tu relación con el dinero hoy se parece más a…",
        options: [
            { label: "Control constante", points: { 'Miedo / Inseguridad': 2 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "Distancia", points: { 'Evitación / Conflicto': 2 }, ns: 'Congelamiento (Desconexión)' },
            { label: "Confusión", points: { 'Carencia / Esfuerzo': 1, 'Evitación / Conflicto': 1 }, ns: 'Congelamiento (Desconexión)' },
            { label: "Tensión", points: { 'Carencia / Esfuerzo': 2 }, ns: 'Hiperactivación (Lucha/Huida)' }
        ]
    },
    {
        id: 9,
        text: "9. Cuando el dinero falta, tú…",
        options: [
            { label: "Te exiges más", points: { 'Carencia / Esfuerzo': 2 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "Te paralizas", points: { 'Evitación / Conflicto': 2 }, ns: 'Congelamiento (Desconexión)' },
            { label: "Te angustias", points: { 'Miedo / Inseguridad': 2 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "Te desconectas", points: { 'Evitación / Conflicto': 2 }, ns: 'Congelamiento (Desconexión)' }
        ]
    },
    {
        id: 10,
        text: "10. Si el dinero pudiera hablarte, diría…",
        options: [
            { label: "“Nunca es suficiente”", points: { 'Carencia / Esfuerzo': 2 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "“No confíes”", points: { 'Miedo / Inseguridad': 2 }, ns: 'Hiperactivación (Lucha/Huida)' },
            { label: "“No te apoyes en mí”", points: { 'Evitación / Conflicto': 2 }, ns: 'Congelamiento (Desconexión)' },
            { label: "“No lo mereces”", points: { 'Culpa / Desvalorización': 2 }, ns: 'Complacencia (Fawning)' }
        ]
    }
];
