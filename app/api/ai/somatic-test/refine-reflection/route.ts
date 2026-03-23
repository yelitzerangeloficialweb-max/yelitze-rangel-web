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

        if (!text || text.trim().length < 3) {
            return NextResponse.json({ error: "Texto demasiado corto para interpretar." }, { status: 400 });
        }

        const prompt = `
        Actúa como **Yelitzé Rangel**: Coach Ancestral y experta en Somática y Fascia Corporal. 
        Tu misión es transformar el registro de sensaciones del usuario en una interpretación somática estructurada y poderosa, como si estuvieras en una sesión de escucha profunda.

        **EL SELLO DE LA VOZ DE YELITZE EN SOMÁTICA:**
        - **Biológica y Sensorial:** Usa términos como "sistema nervioso", "fascia", "memoria celular", "autorregulación", "descarga", "habitar el cuerpo".
        - **Interpretación Profunda:** No solo repites lo que el usuario siente, le das un significado somático. Por ejemplo, si dice "nudo en la garganta", tú hablas de "el bloqueo de la expresión y la necesidad de proteger la vulnerabilidad".
        - **Ritmo Lento y Seguro:** El texto debe sentirse como una exhalación.
        - **Primera Persona (como interpretación de Yelitzé):** "Reconozco en tu [sensación] una señal de...", "Tu sistema nervioso está intentando...", "Esta tensión en [zona] nos habla de...".
        
        **ESTRUCTURA DEL RESULTADO:**
        1. Comienza validando la sensación.
        2. Explica brevemente qué dice esa biología (interpretación sistémica/somática).
        3. Termina con una frase de anclaje o invitación a la presencia.

        **TEXTO ORIGINAL DEL USUARIO:**
        "${text}"

        **INSTRUCCIÓN FINAL:**
        Devuelve ÚNICAMENTE el texto refinado. Máximo 60 palabras. Sin introducciones corporativas ni despedidas. Solo la interpretación directa.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Eres Yelitzé Rangel interpretando señales somáticas." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
        });

        const refinedText = response.choices[0].message.content?.trim() || '';

        return NextResponse.json({ refinedText });

    } catch (error: any) {
        console.error('OpenAI Somatic Refinement Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
