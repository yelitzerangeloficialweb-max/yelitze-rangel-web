import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from '@/lib/db';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
    try {
        if (!process.env.GOOGLE_GEMINI_API_KEY) {
            console.error("ERROR: GOOGLE_GEMINI_API_KEY no detectada en el entorno.");
            return NextResponse.json({ error: "Configuración incompleta: Falta la API Key de Gemini" }, { status: 500 });
        }

        const body = await req.json();
        const { userInfo, testId, answers } = body;

        console.log(`Iniciando análisis standalone para ${userInfo?.email} - Test: ${testId}`);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Actúa como **Yelitzé Rangel**: Coach Ancestral, terapeuta sistémica y consteladora familiar.

            **IDENTIDAD Y VOZ:**
            - Tu metodología une lo ancestral, lo somático y lo psicológico. No eres coaching motivacional.
            - Vocabulario obligatorio: Lealtades Invisibles, Memorias del Linaje, Memorias Congeladas, Orden Sistémico, Soberanía, Fascia Corporal.
            - Tono: Directo, poético, sistémico. Dirígete directamente a ${userInfo.name}.
            - PROHIBIDO: Diagnósticos clínicos, consejos médicos, lenguaje de autoayuda genérico.

            **USUARIO:** ${userInfo.name}
            **TEST:** ${testId}
            **RESPUESTAS:** ${JSON.stringify(answers)}

            **MISIÓN:** Analiza el patrón sistémico que revelan las respuestas de ${userInfo.name}. Conecta el patrón con su posible origen en el linaje (¿qué Memoria Congelada o Lealtad Invisible está activa?) y con el cuerpo (¿dónde se almacena este peso físicamente?).

            **RESPONDE ÚNICAMENTE CON UN JSON VÁLIDO:**
            {
              "screen_message": "3 párrafos en Markdown. **Huella del Linaje**: el patrón heredado específico que revelan las respuestas —nómbralo con precisión. **El Cuerpo Recuerda**: cómo y dónde vive este patrón físicamente (zona corporal concreta). **Primer Movimiento de Orden**: el paso sistémico inicial practicable esta semana. (máx 180 palabras total)",
              "ritual": "Ritual somático concreto: una acción con el cuerpo (respiración, voz, movimiento físico) para comenzar a liberar este patrón. Breve y practicable. (máx 40 palabras)",
              "mantra": "Declaración de soberanía en PRIMERA PERSONA y PRESENTE que reprograme la creencia central de este test. Que resuene como un cimiento de identidad, no como afirmación de autoayuda. (máx 15 palabras)",
              "pdf_content": "Contenido completo en Markdown para PDF: bienvenida de Yelitzé a ${userInfo.name}, diagnóstico sistémico detallado con vocabulario de linaje, análisis de la zona corporal afectada, ritual somático, mantra y cierre con invitación al trabajo profundo."
            }
        `;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        const responseText = result.response.text();
        const parsedData = JSON.parse(responseText);

        // Save to DB
        await db.testResult.create({
            data: {
                testTitle: `Standalone: ${testId}`,
                score: 0,
                maxScore: 100,
                answers: JSON.stringify(answers),
                aiAnalysis: parsedData.screen_message,
                userEmail: userInfo.email,
                userName: userInfo.name,
            },
        });

        return NextResponse.json({ ...parsedData });

    } catch (error: any) {
        console.error("AI Standalone Analysis Error:", error);
        return NextResponse.json({
            error: "Failed to analyze",
            details: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
