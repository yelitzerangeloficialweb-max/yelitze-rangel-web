import { NextResponse } from 'next/server';
import { generateVisionPrompt } from '@/lib/ai/gemini';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || ''
});

export const maxDuration = 120;

export async function POST(req: Request) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            console.error('Missing OPENAI_API_KEY');
            return NextResponse.json({ error: 'Configuración incompleta: falta OpenAI API Key' }, { status: 500 });
        }

        const body = await req.json();
        const { intention, images, pillarTitle, direction, action } = body;

        console.log(`[AI Image Gen] Iniciando generación para Pilar: ${pillarTitle}`);
        console.log(`[AI Image Gen] Con contexto: Propósito=${direction}, Acción=${action}`);
        console.log(`[AI Image Gen] Recibidas ${images?.length || 0} imágenes de referencia.`);

        if (!images || images.length === 0) {
            return NextResponse.json({ error: 'Se requieren imágenes de referencia.' }, { status: 400 });
        }

        // 1. Generar prompt descriptivo basado en las imágenes (usando Gemini)
        console.log('[AI Image Gen] Llamando a Gemini para análisis visual con contexto...');
        let visualPrompt: string;
        try {
            visualPrompt = await generateVisionPrompt(`${pillarTitle}: ${intention}`, images, direction, action);
            console.log(`[AI Image Gen] Gemini generó el prompt: ${visualPrompt.substring(0, 100)}...`);
        } catch (gemError) {
            console.warn('[AI Image Gen] Gemini falló, usando el prompt de respaldo.');
            visualPrompt = `${pillarTitle}: ${intention}`;
        }

        const cleanPrompt = visualPrompt.replace(/[\n\r]/g, " ").trim();

        // 2. Generar imagen real con DALL-E 3
        console.log('[AI Image Gen] Llamando a DALL-E 3...');
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: cleanPrompt + ", conceptual architectural photography, minimal aesthetic, high quality, realistic textures, high artistic precision",
            n: 1,
            size: "1024x1024",
            quality: "standard",
        });

        if (!response.data || response.data.length === 0 || !response.data[0].url) {
            throw new Error('DALL-E 3 no devolvió ninguna URL de imagen.');
        }

        const dalLeUrl = response.data[0].url;
        console.log('[AI Image Gen] Imagen generada por OpenAI, extrayendo Base64...');

        // Convertir a Base64 para persistencia inmediata y evitar expiración de URL externa
        const imageRes = await fetch(dalLeUrl!);
        const arrayBuffer = await imageRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = `data:image/png;base64,${buffer.toString('base64')}`;

        console.log('[AI Image Gen] Generación completada con éxito.');
        return NextResponse.json({ imageUrl: base64Image, prompt: visualPrompt });

    } catch (error: any) {
        console.error('[AI Image Gen Error]:', error);

        // Rate limit de OpenAI — ocurre cuando muchos usuarios generan al mismo tiempo
        if (error?.status === 429 || error?.code === 'rate_limit_exceeded') {
            return NextResponse.json({
                error: 'Servidor ocupado',
                details: 'Hay mucha demanda en este momento. Espera unos segundos e intenta de nuevo.'
            }, { status: 429 });
        }

        // Timeout del servidor
        if (error.message?.includes('timeout') || error.code === 'ETIMEDOUT') {
            return NextResponse.json({
                error: 'Timeout',
                details: 'La generación tardó demasiado. Intenta de nuevo.'
            }, { status: 504 });
        }

        return NextResponse.json({
            error: 'Error en la generación de imagen',
            details: error instanceof Error ? error.message : 'Error interno desconocido'
        }, { status: 500 });
    }
}
