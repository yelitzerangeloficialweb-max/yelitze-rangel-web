import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || ''
});

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { pillars, reflections, userName, userGender } = await req.json();

        // Build context from all user answers
        const pillarsText = (pillars as any[]).map((p: any) =>
            `- ${p.title}: Intención="${p.intention}", Propósito="${p.direction}", Acción="${p.action}"`
        ).join('\n');

        const reflectionsText = Object.entries(reflections as Record<string, string>).map(([k, v]) =>
            `- Portal ${k}: "${v}"`
        ).join('\n');

        const gender = userGender === 'hombre' ? 'masculino' : 'femenino';
        const archetype = userGender === 'hombre' ? 'Arquitecto' : 'Arquitecta';

        const prompt = `
        Actúa como Yelitzé Rangel, Coach Ancestral.

        IDENTIDAD: ${userName || 'La persona'} es un/a ${archetype} consciente, construyendo su realidad desde el orden sistémico.
        
        REFLEXIONES DE LOS PORTALES:
        ${reflectionsText}

        VISIÓN DE CADA PILAR:
        ${pillarsText}

        TU MISIÓN:
        Basándote en TODO lo que escribió, genera una DECLARACIÓN "YO SOY" poderosa, integrada y personalizada.
        
        REGLAS ESTRICTAS:
        1. Debe empezar con "YO SOY" o "YO, ${userName || 'Arquitecta/o'}..."
        2. Debe incluir referencias directas a las intenciones, propósitos y reflexiones concretas que escribió.
        3. Debe sonar como un CIMIENTO de identidad, no como una afirmación de autoayuda genérica.
        4. Vocabulario: soberanía, orden, lealtad, linaje, arquitectura, diseño, luz, anclaje.
        5. Longitud: entre 5 y 7 oraciones contundentes.
        6. Lenguaje en ${gender}.
        7. PROHIBIDO: lenguaje motivacional vacío, repetición de pilares sin personalización.

        RESPONDE ÚNICAMENTE CON UN JSON VÁLIDO:
        {
          "yo_soy": "La declaración completa YO SOY, en primera persona, tiempo presente.",
          "ancla": "Una frase corta de anclaje (máx 10 palabras) que sinterice su identidad. Ej: 'Soy orden. Soy abundancia. Soy soberanía.'",
          "decreto_diario": "Una acción ritual concreta para repetir la declaración diariamente (máx 15 palabras)."
        }
        `;

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({
                yo_soy: `YO SOY ${archetype} de mi propia vida. Desde mi soberanía construyo con orden y precisión cada uno de mis pilares: propósito, abundancia, vínculos, expansión y vitalidad. Suelto las lealtades que no me pertenecen y habito plenamente mi diseño de realidad.`,
                ancla: "Soy orden. Soy abundancia. Soy soberanía.",
                decreto_diario: "Lee tu declaración en voz alta frente al espejo cada mañana."
            });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Eres Yelitzé Rangel. Responde siempre en JSON válido." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.8
        });

        const result = JSON.parse(response.choices[0].message.content || '{}');
        return NextResponse.json(result);

    } catch (error: any) {
        console.error('[YO SOY API Error]:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
