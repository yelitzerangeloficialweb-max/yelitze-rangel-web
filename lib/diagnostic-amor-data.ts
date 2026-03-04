export type DiagnosticAmorType = 'Abandono' | 'Codependencia' | 'Desconfianza' | 'Auto-Sacrificio' | 'Relaciones Tóxicas';

export interface DiagnosticAmorOption {
    label: string;
    points: Partial<Record<DiagnosticAmorType, number>>;
}

export interface DiagnosticAmorQuestion {
    id: number;
    text: string;
    options: DiagnosticAmorOption[];
}

export const DIAGNOSTIC_AMOR_QUESTIONS: DiagnosticAmorQuestion[] = [
    // 1. Patrón de Abandono
    {
        id: 1,
        text: "En tus relaciones pasadas, ¿has sentido que te dejaban de lado, ya sea emocional o físicamente, incluso cuando intentabas mantener la conexión?",
        options: [
            { label: "Sí, frecuentemente.", points: { Abandono: 3 } },
            { label: "A veces.", points: { Abandono: 2 } },
            { label: "Rara vez.", points: { Abandono: 1 } },
            { label: "Nunca.", points: { Abandono: 0 } }
        ]
    },
    {
        id: 2,
        text: "¿Te da miedo que tu pareja te abandone o te rechace si eres demasiado vulnerable o expresas tus emociones profundamente?",
        options: [
            { label: "Sí, me siento muy ansiosa al respecto.", points: { Abandono: 3 } },
            { label: "A veces, pero trato de ignorarlo.", points: { Abandono: 2 } },
            { label: "Rara vez.", points: { Abandono: 1 } },
            { label: "Nunca.", points: { Abandono: 0 } }
        ]
    },
    {
        id: 3,
        text: "Cuando las cosas no van bien, ¿tiendes a retirarte emocionalmente o a dar espacio en exceso a tu pareja por miedo a ser asfixiante?",
        options: [
            { label: "Sí, siempre lo hago.", points: { Abandono: 3 } },
            { label: "A veces.", points: { Abandono: 2 } },
            { label: "Rara vez.", points: { Abandono: 1 } },
            { label: "Nunca.", points: { Abandono: 0 } }
        ]
    },
    // 2. Codependencia
    {
        id: 4,
        text: "¿Sientes que tus emociones dependen del estado de ánimo de tu pareja?",
        options: [
            { label: "Sí, totalmente.", points: { Codependencia: 3 } },
            { label: "Con frecuencia.", points: { Codependencia: 2 } },
            { label: "Rara vez.", points: { Codependencia: 1 } },
            { label: "Nunca.", points: { Codependencia: 0 } }
        ]
    },
    {
        id: 5,
        text: "¿Te cuesta poner límites por miedo a que la otra persona se aleje?",
        options: [
            { label: "Sí, me es casi imposible.", points: { Codependencia: 3 } },
            { label: "Me cuesta bastante.", points: { Codependencia: 2 } },
            { label: "A veces.", points: { Codependencia: 1 } },
            { label: "Nunca me cuesta.", points: { Codependencia: 0 } }
        ]
    },
    {
        id: 6,
        text: "¿Sientes que necesitas 'salvar' o 'cambiar' a tu pareja para que la relación funcione?",
        options: [
            { label: "Sí, siempre elijo personas que necesitan ayuda.", points: { Codependencia: 3 } },
            { label: "A veces me pasa.", points: { Codependencia: 2 } },
            { label: "Rara vez.", points: { Codependencia: 1 } },
            { label: "No.", points: { Codependencia: 0 } }
        ]
    },
    // 3. Desconfianza
    {
        id: 7,
        text: "¿Tiendes a revisar el celular o las redes sociales de tu pareja por inseguridad?",
        options: [
            { label: "Sí, lo hago seguido.", points: { Desconfianza: 3 } },
            { label: "A veces cuando sospecho algo.", points: { Desconfianza: 2 } },
            { label: "Rara vez.", points: { Desconfianza: 1 } },
            { label: "Nunca.", points: { Desconfianza: 0 } }
        ]
    },
    {
        id: 8,
        text: "¿Crees que tarde o temprano todas las personas terminan traicionando?",
        options: [
            { label: "Es mi creencia firme.", points: { Desconfianza: 3 } },
            { label: "Tengo esa sospecha constante.", points: { Desconfianza: 2 } },
            { label: "A veces lo pienso.", points: { Desconfianza: 1 } },
            { label: "No, confío en la honestidad.", points: { Desconfianza: 0 } }
        ]
    },
    {
        id: 9,
        text: "¿Te sientes alerta incluso en los momentos de paz de la relación?",
        options: [
            { label: "Siempre estoy esperando que pase algo malo.", points: { Desconfianza: 3 } },
            { label: "Frecuentemente.", points: { Desconfianza: 2 } },
            { label: "A veces.", points: { Desconfianza: 1 } },
            { label: "No, disfruto el presente.", points: { Desconfianza: 0 } }
        ]
    },
    // 4. Auto-Sacrificio
    {
        id: 10,
        text: "¿Sueles postergar tus propios deseos y metas por los de tu pareja?",
        options: [
            { label: "Sí, mi pareja es mi prioridad absoluta.", points: { 'Auto-Sacrificio': 3 } },
            { label: "Frecuentemente.", points: { 'Auto-Sacrificio': 2 } },
            { label: "A veces.", points: { 'Auto-Sacrificio': 1 } },
            { label: "No, mantengo mi individualidad.", points: { 'Auto-Sacrificio': 0 } }
        ]
    },
    {
        id: 11,
        text: "¿Te sientes culpable cuando haces algo solo para ti?",
        options: [
            { label: "Sí, siento que estoy fallando a la relación.", points: { 'Auto-Sacrificio': 3 } },
            { label: "A veces.", points: { 'Auto-Sacrificio': 2 } },
            { label: "Rara vez.", points: { 'Auto-Sacrificio': 1 } },
            { label: "No, sé que me hace bien.", points: { 'Auto-Sacrificio': 0 } }
        ]
    },
    {
        id: 12,
        text: "¿Sientes que si no das el 200% no eres digna de ser amada?",
        options: [
            { label: "Sí, tengo que ganarme el amor con esfuerzo.", points: { 'Auto-Sacrificio': 3 } },
            { label: "Es un sentimiento frecuente.", points: { 'Auto-Sacrificio': 2 } },
            { label: "A veces.", points: { 'Auto-Sacrificio': 1 } },
            { label: "No, me siento digna por quién soy.", points: { 'Auto-Sacrificio': 0 } }
        ]
    },
    // 5. Relaciones Tóxicas
    {
        id: 13,
        text: "¿Te has visto envuelta en ciclos de rupturas y reconciliaciones constantes?",
        options: [
            { label: "Sí, es mi patrón habitual.", points: { 'Relaciones Tóxicas': 3 } },
            { label: "Me ha pasado varias veces.", points: { 'Relaciones Tóxicas': 2 } },
            { label: "Me pasó una vez.", points: { 'Relaciones Tóxicas': 1 } },
            { label: "Nunca.", points: { 'Relaciones Tóxicas': 0 } }
        ]
    },
    {
        id: 14,
        text: "¿Sientes que en tus relaciones hay más drama que tranquilidad?",
        options: [
            { label: "Sí, el amor para mí tiene mucha intensidad y conflicto.", points: { 'Relaciones Tóxicas': 3 } },
            { label: "A menudo.", points: { 'Relaciones Tóxicas': 2 } },
            { label: "Pocas veces.", points: { 'Relaciones Tóxicas': 1 } },
            { label: "No, busco paz.", points: { 'Relaciones Tóxicas': 0 } }
        ]
    },
    {
        id: 15,
        text: "¿Te atraen personas distantes, emocionalmente no disponibles o que te hacen sufrir?",
        options: [
            { label: "Inconscientemente siempre termino ahí.", points: { 'Relaciones Tóxicas': 3 } },
            { label: "Me ha pasado frecuentemente.", points: { 'Relaciones Tóxicas': 2 } },
            { label: "A veces.", points: { 'Relaciones Tóxicas': 1 } },
            { label: "No, busco personas estables.", points: { 'Relaciones Tóxicas': 0 } }
        ]
    }
];
