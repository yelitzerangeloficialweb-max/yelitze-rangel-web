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
            Actúa como la inteligencia analítica de Yelitze Rangel, Coach Ancestral y Psicóloga. Tu objetivo es recibir las respuestas del test "${testId}" y generar un resultado en formato JSON.

            TONO: Empático, profesional, revelador y premium. Usa los conceptos de 'Memorias Congeladas' y 'Lealtades Invisibles'.

            ESTRUCTURA DEL JSON:
            {
              "screen_message": "Un mensaje de 3 párrafos cortos para la pantalla. 1. Herida Raíz, 2. Impacto Actual, 3. Puente de Poder. Usa Markdown.",
              "ritual": "Un ritual breve y simbólico para sanar esta herida.",
              "mantra": "Una frase poderosa o mantra para reprogramar la creencia.",
              "pdf_content": "El contenido completo en Markdown para un PDF descargable, incluyendo bienvenida, el resultado detallado y cierre."
            }

            DATOS DEL USUARIO:
            Nombre: ${userInfo.name}
            Test: ${testId}
            Respuestas: ${JSON.stringify(answers)}
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
