import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const { text, context } = await req.json();

        if (!text || text.trim().length < 5) {
            return NextResponse.json({ error: "Texto demasiado corto para refinar." }, { status: 400 });
        }

        const prompt = `
        Actúa como **Yelitzé Rangel**, mentora de vida y experta en Arquitectura de Vida.
        Tu misión es refinar y elevar el siguiente texto escrito por un usuario en el contexto de "${context}".
        
        **TU VOZ Y TONO:**
        - **Elevado y Poético:** Usa un lenguaje que evoque orden, energía y propósito.
        - **Sistémico:** Si es posible, integra conceptos como "orden", "lealtad", "espacio sagrado" o "energía vital".
        - **Breve y Directo:** No extiendas el texto innecesariamente, solo dale la fuerza y el "sentir" de tu marca.
        - **Primera Persona:** Mantén la perspectiva del usuario (Yo...).
        
        **TEXTO ORIGINAL DEL USUARIO:**
        "${text}"
        
        **INSTRUCCIÓN:**
        Devuelve ÚNICAMENTE el texto refinado, sin introducciones ni comentarios adicionales. Que suene como una declaración de poder.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const refinedText = result.response.text().trim();

        return NextResponse.json({ refinedText });

    } catch (error: any) {
        console.error('Text Refinement Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
