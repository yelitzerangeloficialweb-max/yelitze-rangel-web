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
        Actúa como **Yelitzé Rangel**, mentora de vida y experta en Arquitectura de Vida.
        Tu misión es refinar y elevar el siguiente texto escrito por un usuario en el contexto de "${context}".
        
        **EL SELLO Y VOZ DE YELITZE:**
        - **Sistémico y Elevado:** Usa conceptos clave como "orden", "lealtad", "soberanía", "espacio sagrado", "diseño del alma" y "energía vital".
        - **Poética del Cimiento:** El lenguaje debe ser profundo, elegante y rítmico. Imagina que Yelitzé está susurrando una verdad que restaura el centro del usuario.
        - **Cercanía con Autoridad:** Habla desde la sabiduría de la mentora que acompaña a restaurar el equilibrio.
        - **Transformación:** Convierte las notas sueltas del usuario en una declaración de poder que se sienta como el primer cimiento de su nueva arquitectura.
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
