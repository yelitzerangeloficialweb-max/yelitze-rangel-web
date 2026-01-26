export type AmorBeliefType =
    | 'Miedo / Desconfianza'
    | 'Sobreenfuerzo / Complacencia'
    | 'Evitación / Independencia'
    | 'Desesperanza / Resignación';

export interface AmorOption {
    label: string;
    points: Partial<Record<AmorBeliefType, number>>;
}

export interface AmorQuestion {
    id: number;
    text: string;
    options: AmorOption[];
}

export const AMOR_QUESTIONS: AmorQuestion[] = [
    {
        id: 1,
        text: "1. Cuando alguien se acerca emocionalmente a ti, tu cuerpo suele…",
        options: [
            { label: "Tensarse, como si algo pudiera salir mal", points: { 'Miedo / Desconfianza': 2 } },
            { label: "Activarse y querer dar más de lo que tienes", points: { 'Sobreenfuerzo / Complacencia': 2 } },
            { label: "Alejarse un poco, para no perder tu espacio", points: { 'Evitación / Independencia': 2 } },
            { label: "Sentirse en calma solo si no hay expectativas", points: { 'Desesperanza / Resignación': 2 } }
        ]
    },
    {
        id: 2,
        text: "2. En el amor, sientes que…",
        options: [
            { label: "Siempre terminas queriendo más de lo que recibes", points: { 'Miedo / Desconfianza': 1, 'Sobreenfuerzo / Complacencia': 1 } },
            { label: "Te adaptas para que la relación funcione", points: { 'Sobreenfuerzo / Complacencia': 2 } },
            { label: "Amar implica renunciar a partes de ti", points: { 'Evitación / Independencia': 2 } },
            { label: "Es mejor no esperar demasiado", points: { 'Desesperanza / Resignación': 2 } }
        ]
    },
    {
        id: 3,
        text: "3. Si una relación termina, lo primero que aparece es…",
        options: [
            { label: "La sensación de haber sido abandonada", points: { 'Miedo / Desconfianza': 2 } },
            { label: "Pensar qué hiciste mal", points: { 'Sobreenfuerzo / Complacencia': 2 } },
            { label: "Alivio mezclado con culpa", points: { 'Evitación / Independencia': 2 } },
            { label: "Confirmar que el amor no es estable", points: { 'Desesperanza / Resignación': 2 } }
        ]
    },
    {
        id: 4,
        text: "4. Cuando alguien te ama con facilidad…",
        options: [
            { label: "Desconfías", points: { 'Miedo / Desconfianza': 2 } },
            { label: "Te preguntas cuánto durará", points: { 'Desesperanza / Resignación': 1, 'Miedo / Desconfianza': 1 } },
            { label: "Sientes incomodidad", points: { 'Evitación / Independencia': 2 } },
            { label: "Te cuesta recibir sin hacer algo a cambio", points: { 'Sobreenfuerzo / Complacencia': 2 } }
        ]
    },
    {
        id: 5,
        text: "5. Para sentirte segura en una relación necesitas…",
        options: [
            { label: "Constantes pruebas de amor", points: { 'Miedo / Desconfianza': 2 } },
            { label: "Sentirte necesaria", points: { 'Sobreenfuerzo / Complacencia': 2 } },
            { label: "Mantener control emocional", points: { 'Evitación / Independencia': 2 } },
            { label: "No depender demasiado", points: { 'Desesperanza / Resignación': 1, 'Evitación / Independencia': 1 } }
        ]
    },
    {
        id: 6,
        text: "6. El amor para ti se parece más a…",
        options: [
            { label: "Una montaña rusa", points: { 'Miedo / Desconfianza': 2 } },
            { label: "Un trabajo constante", points: { 'Sobreenfuerzo / Complacencia': 2 } },
            { label: "Un riesgo", points: { 'Evitación / Independencia': 2 } },
            { label: "Algo frágil", points: { 'Desesperanza / Resignación': 2 } }
        ]
    },
    {
        id: 7,
        text: "7. Cuando amas, sueles…",
        options: [
            { label: "Entregarte rápido", points: { 'Miedo / Desconfianza': 1, 'Sobreenfuerzo / Complacencia': 1 } },
            { label: "Esperar señales antes de confiar", points: { 'Desesperanza / Resignación': 1, 'Miedo / Desconfianza': 1 } },
            { label: "Proteger tu independencia", points: { 'Evitación / Independencia': 2 } },
            { label: "Postergar el compromiso emocional", points: { 'Desesperanza / Resignación': 2 } }
        ]
    },
    {
        id: 8,
        text: "8. Una frase que resuena contigo (aunque no quieras):",
        options: [
            { label: "“El amor siempre termina doliendo”", points: { 'Miedo / Desconfianza': 2 } },
            { label: "“Si no doy, no me eligen”", points: { 'Sobreenfuerzo / Complacencia': 2 } },
            { label: "“Amar es perderme”", points: { 'Evitación / Independencia': 2 } },
            { label: "“Mejor sola que mal acompañada”", points: { 'Desesperanza / Resignación': 2 } }
        ]
    },
    {
        id: 9,
        text: "9. En el fondo, temes que…",
        options: [
            { label: "Te abandonen", points: { 'Miedo / Desconfianza': 2 } },
            { label: "No seas suficiente", points: { 'Sobreenfuerzo / Complacencia': 2 } },
            { label: "Te absorban", points: { 'Evitación / Independencia': 2 } },
            { label: "Te decepcionen", points: { 'Desesperanza / Resignación': 2 } }
        ]
    }
];
