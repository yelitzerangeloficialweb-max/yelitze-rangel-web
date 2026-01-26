export type WoundType = 'Abandono' | 'Rechazo' | 'Humillación' | 'Traición' | 'Injusticia';

export interface HeridaOption {
    label: string;
    points: Partial<Record<WoundType, number>>;
}

export interface HeridaQuestion {
    id: number;
    text: string;
    options: HeridaOption[];
}

export const QUESTIONS: HeridaQuestion[] = [
    {
        id: 1,
        text: "¿Cómo te sientes cuando alguien importante para ti cancela un plan a último momento?",
        options: [
            { label: "Siento que no soy importante para esa persona (Me duele)", points: { Abandono: 3, Rechazo: 2 } },
            { label: "Pienso que seguro encontró algo mejor que hacer (Me enojo)", points: { Traición: 2, Injusticia: 1 } },
            { label: "Me siento tonto/a por haber esperado (Me da vergüenza)", points: { Humillación: 3 } },
            { label: "Entiendo que surgen cosas, pero me quedo triste", points: { Abandono: 1 } }
        ]
    },
    {
        id: 2,
        text: "En tus relaciones de pareja, ¿cuál es tu mayor miedo recurrente?",
        options: [
            { label: "Que me dejen solo/a o se vayan", points: { Abandono: 3 } },
            { label: "Que me rechacen o no me acepten como soy", points: { Rechazo: 3 } },
            { label: "Que me engañen o me mientan", points: { Traición: 3 } },
            { label: "Que me critiquen o me hagan sentir menos", points: { Humillación: 2, Injusticia: 1 } }
        ]
    },
    {
        id: 3,
        text: "¿Cuál de estas frases resuena más con tu infancia?",
        options: [
            { label: "Mis padres casi nunca estaban, me cuidé solo/a", points: { Abandono: 3 } },
            { label: "Sentía que debía ser perfecto/a para ser amado/a", points: { Injusticia: 3 } },
            { label: "Me comparaban mucho con otros o me ridiculizaban", points: { Humillación: 3 } },
            { label: "Me prometían cosas que nunca cumplían", points: { Traición: 3 } }
        ]
    },
    {
        id: 4,
        text: "Ante un error en el trabajo o en público, ¿cómo reaccionas?",
        options: [
            { label: "Quiero desaparecer, siento mucha vergüenza", points: { Humillación: 3, Rechazo: 1 } },
            { label: "Busco excusas o culpo a otros para defenderme", points: { Traición: 2, Injusticia: 2 } },
            { label: "Me castigo mentalmente, soy muy duro/a conmigo", points: { Injusticia: 3 } },
            { label: "Me da miedo que me despidan o me excluyan", points: { Abandono: 2 } }
        ]
    },
    {
        id: 5,
        text: "¿Qué es lo que más te cuesta perdonar?",
        options: [
            { label: "La mentira y la deslealtad", points: { Traición: 3 } },
            { label: "La indiferencia y el silencio", points: { Rechazo: 3, Abandono: 2 } },
            { label: "La falta de equidad o el abuso de poder", points: { Injusticia: 3 } },
            { label: "La burla o el desprecio", points: { Humillación: 3 } }
        ]
    },
    {
        id: 6,
        text: "Físicamente, ¿cómo sueles sentir tu cuerpo cuando hay estrés?",
        options: [
            { label: "Me hago pequeño/a, me encorvo (Quiero esconderme)", points: { Rechazo: 3, Humillación: 2 } },
            { label: "Me pongo rígido/a, tenso/a (Listo/a para pelear)", points: { Traición: 2, Injusticia: 2 } },
            { label: "Siento un vacío en el pecho o estómago", points: { Abandono: 3 } },
            { label: "Me siento pesado/a, lento/a", points: { Humillación: 1 } }
        ]
    },
    {
        id: 7,
        text: "En un grupo de amigos, sueles asumir el rol de...",
        options: [
            { label: "El que ayuda a todos y se olvida de sí mismo", points: { Abandono: 2, Humillación: 1 } },
            { label: "El líder o el que controla que todo salga bien", points: { Traición: 3 } },
            { label: "El perfeccionista o el correcto", points: { Injusticia: 3 } },
            { label: "El que prefiere pasar desapercibido", points: { Rechazo: 3 } }
        ]
    },
    {
        id: 8,
        text: "¿Qué actitud de los demás te irrita más?",
        options: [
            { label: "La frialdad o falta de empatía", points: { Injusticia: 2, Abandono: 1 } },
            { label: "La gente que no cumple su palabra", points: { Traición: 3 } },
            { label: "La gente que invade mi espacio", points: { Rechazo: 2 } },
            { label: "La gente que se cree superior", points: { Humillación: 2 } }
        ]
    },
    {
        id: 9,
        text: "Si pudieras sanar algo hoy mismo, ¿qué elegirías?",
        options: [
            { label: "Dejar de depender emocionalmente de otros", points: { Abandono: 3 } },
            { label: "Sentirme merecedor/a y valioso/a", points: { Rechazo: 3, Humillación: 1 } },
            { label: "Aprender a confiar de nuevo", points: { Traición: 3 } },
            { label: "Dejar de exigirme tanto y disfrutar más", points: { Injusticia: 3 } }
        ]
    },
    {
        id: 10,
        text: "¿Cuál de estas palabras describe mejor tu anhelo profundo?",
        options: [
            { label: "Pertenencia (Ser parte)", points: { Rechazo: 3 } },
            { label: "Apoyo (No estar solo)", points: { Abandono: 3 } },
            { label: "Respeto (Ser valorado)", points: { Humillación: 2, Injusticia: 2 } },
            { label: "Seguridad (Poder confiar)", points: { Traición: 3 } }
        ]
    }
];
