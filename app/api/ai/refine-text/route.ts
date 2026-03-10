import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || ''
});

export async function POST(req: Request) {
    try {
        const { text, context } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: "OpenAI API Key missing on server." }, { status: 500 });
        }

        if (!text || text.trim().length < 5) {
            return NextResponse.json({ error: "Texto demasiado corto para refinar." }, { status: 400 });
        }

        const prompt = `
        Actúa como **Yelitzé Rangel**, **tu coach ancestral** y experta en **Arquitectura de Vida**.
        Tu misión es ser la guía que ayuda al usuario a que lo invisible cobre voz a través de la **Anatomía del Alma**.
        
        **EL SELLO Y VOZ DE YELITZE:**
        - **Identidad:** Habla siempre desde el lugar de **tu coach ancestral**, esa voz sabia y cercana que guía a restaurar el orden sistémico.
        - **Sistémico y Elevado:** Usa conceptos clave como "orden", "lealtad", "soberanía", "espacio sagrado", "diseño del alma", "energía vital" e "hilos invisibles".
        - **La Voz de lo Invisible:** Tu redacción debe permitir que aquello que el usuario siente pero no sabe nombrar (lo invisible) tome una forma bella, rítmica y poderosa.
        - **Cercanía con Autoridad:** Eres la voz de la experiencia que acompaña a cada persona a habitar su propia anatomía interna con dignidad.
        - **Transformación:** Convierte las notas del usuario en una declaración que se sienta como el cimiento maestro de su nueva realidad.
        - **Primera Persona:** Mantén la perspectiva del usuario ("Yo reconozco...", "Elijo habitar...").
        
        **TEXTO ORIGINAL DEL USUARIO:**
        "${text}"
        
        **ESTRUCTURA:**
        Si el texto contiene múltiples párrafos separados por doble salto de línea, mantén exactamente la misma cantidad de párrafos en tu respuesta (refinando cada uno por separado) para conservar la estructura de los módulos.
        
        **INSTRUCCIÓN:**
        Devuelve ÚNICAMENTE el texto refinado, sin introducciones ni comentarios adicionales. Que suene como una declaración de poder.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Faster and cheaper for this task
            messages: [
                { role: "system", content: "Eres Yelitzé Rangel, una mentora experimentada." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
        });

        const refinedText = response.choices[0].message.content?.trim() || '';

        return NextResponse.json({ refinedText });

    } catch (error: any) {
        console.error('OpenAI Refinement Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
