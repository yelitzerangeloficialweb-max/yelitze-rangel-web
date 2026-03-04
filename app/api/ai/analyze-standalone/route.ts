import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from '@/lib/db';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userInfo, testId, answers } = body;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        const prompt = `
            Actúa como la inteligencia analítica de Yelitze Rangel, Coach Ancestral y Psicóloga. Tu objetivo es recibir las respuestas del test "${testId}" y generar un resumen diagnóstico de 3 párrafos cortos.

            TONO: Empático, profesional, revelador y premium. Usa los conceptos de 'Memorias Congeladas' y 'Lealtades Invisibles'.
            ESTRUCTURA:
            1. Identificación de la Herida Raíz: Basado en las respuestas, define el patrón ancestral predominante.
            2. Impacto Actual: Cómo esto bloquea su bienestar hoy.
            3. Puente de Poder: Fraile motivadora para asistir a 'Tu Activación de Poder'.

            DATOS DEL USUARIO:
            Nombre: ${userInfo.name}
            Test: ${testId}
            Respuestas: ${JSON.stringify(answers)}
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Save to DB
        await db.testResult.create({
            data: {
                testTitle: `Standalone: ${testId}`,
                score: 0,
                maxScore: 100,
                answers: JSON.stringify(answers),
                aiAnalysis: responseText,
                userEmail: userInfo.email,
                userName: userInfo.name,
            },
        });

        return NextResponse.json({ analysis: responseText });

    } catch (error: any) {
        console.error("AI Standalone Analysis Error:", error);
        return NextResponse.json({
            error: "Failed to analyze",
            details: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
