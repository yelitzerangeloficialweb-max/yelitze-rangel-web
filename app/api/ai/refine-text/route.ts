import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || ''
});

export async function POST(req: Request) {
    try {
        const { text } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: "OpenAI API Key missing on server." }, { status: 500 });
        }

        if (!text || text.trim().length < 5) {
            return NextResponse.json({ error: "Texto demasiado corto para refinar." }, { status: 400 });
        }

        const prompt = `
        Actúa como **Yelitzé Rangel**: Coach Ancestral, consteladora familiar y creadora del sistema "Arquitectura de Vida".
        Tu misión es transformar lo que el usuario escribió en una declaración que suene como el cimiento de su nueva realidad —no como una afirmación de autoayuda.

        **EL SELLO DE LA VOZ DE YELITZE:**
        - **Sistémica y Ancestral:** Usa conceptos que anclen la intención al orden: "orden", "soberanía", "lealtad consciente", "diseño del alma", "energía vital", "hilos que se cortan", "espacio que se limpia".
        - **Precisa y Poética:** Cada palabra debe ganarse su lugar. Nada decorativo, nada genérico.
        - **Cimiento, no aspiración:** Las declaraciones no describen lo que el usuario quiere —describen quién ya es al elegir.
        - **Primera Persona, Tiempo Presente:** "Yo elijo...", "Desde mi soberanía...", "Reconozco...", "Diseño...", "Construyo desde...".
        - **Prohibido:** "¡Lo mereces!", "¡Tú puedes!", "Eres increíble", afirmaciones vacías, lenguaje de autoayuda genérico.

        **TEXTO ORIGINAL DEL USUARIO:**
        "${text}"

        **REGLA DE ESTRUCTURA:**
        Si el texto contiene múltiples párrafos (separados por doble salto de línea), mantén exactamente la misma cantidad de párrafos en tu respuesta, refinando cada uno por separado.

        **INSTRUCCIÓN FINAL:**
        Devuelve ÚNICAMENTE el texto refinado. Sin introducciones, sin comentarios, sin explicaciones. Solo la declaración de poder.
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
