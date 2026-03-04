import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

export async function POST(req: Request) {
    let resultId = null;
    try {
        if (!process.env.GOOGLE_GEMINI_API_KEY) {
            return NextResponse.json({ error: "Missing Gemini API Key" }, { status: 500 });
        }

        const body = await req.json();
        const { userInfo, results } = body;

        // Construct context from the 3 current tests
        const context = `
            TEST 1: Relaciones (Patrones de Dolor)
            Resultados: ${JSON.stringify(results.relaciones)}

            TEST 2: Heridas Profundas (Somática - Huellas en Mente, Alma y Cuerpo)
            Resultados: ${JSON.stringify(results.heridas_profundas)}

            TEST 3: Heridas Femeninas (Identificando Heridas)
            Resultados: ${JSON.stringify(results.heridas_femeninas)}
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        const prompt = `
            Actúa como la inteligencia analítica de Yelitze Rangel, Coach Ancestral y Psicóloga. Tu objetivo es recibir las respuestas de 3 tests (Relaciones, Heridas Profundas, Heridas Femeninas) y generar un resumen diagnóstico de 3 párrafos cortos.

            DATOS DEL USUARIO:
            Nombre: ${userInfo.name}
            Contexto del Test: ${context}

            Tono: Empático, profesional, revelador y premium. Usa el concepto de 'Memorias Congeladas' y 'Lealtades Invisibles'.

            Estructura del Output:
            1. Identificación de la Herida Raíz: Basado en las respuestas, define cuál es el patrón ancestral predominante.
            2. Impacto Actual: Cómo esto está bloqueando su abundancia o paz hoy.
            3. Puente de Poder: Una frase que genere urgencia para asistir a 'Tu Activación de Poder' para transmutar este hallazgo.

            Restricción: No des consejos médicos. Mantén un lenguaje de soberanía y merecimiento. Max 250 palabras.
        `;

        const aiResult = await model.generateContent(prompt);
        const analysis = aiResult.response.text();

        // Save to DB
        const saved = await db.testResult.create({
            data: {
                testTitle: "Diagnóstico Unificado - Activación de Poder",
                score: 0, // Not applicable for unified
                maxScore: 100,
                answers: JSON.stringify(results),
                aiAnalysis: analysis,
                userName: userInfo.name,
                userEmail: userInfo.email
            }
        });

        return NextResponse.json({
            analysis,
            id: saved.id,
            success: true
        });

    } catch (error: any) {
        console.error('API ERROR:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
