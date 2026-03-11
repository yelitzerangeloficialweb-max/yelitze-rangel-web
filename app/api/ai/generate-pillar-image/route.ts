import { NextResponse } from 'next/server';
import { generateVisionPrompt } from '@/lib/ai/gemini';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || ''
});

export const maxDuration = 60; // Aumentar a 60 segundos para evitar timeouts en Vercel

export async function POST(req: Request) {
    try {
        const { intention, images, pillarTitle } = await req.json();

        if (!images || images.length === 0) {
            return NextResponse.json({ error: 'Images are required' }, { status: 400 });
        }

        // 1. Generate descriptive prompt based on existing images + intention
        const visualPrompt = await generateVisionPrompt(`${pillarTitle}: ${intention}`, images);
        const cleanPrompt = visualPrompt.replace(/[\n\r]/g, " ").trim();

        // 2. Generate Image with DALL-E 3 (Highest Quality & Stable)
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: cleanPrompt + ", conceptual architectural photography, minimal aesthetic, high quality, 8k, realistic textures",
            n: 1,
            size: "1024x1024",
            quality: "hd",
        });

        if (!response.data || response.data.length === 0 || !response.data[0].url) {
            throw new Error('DALL-E 3 failed to return an image URL');
        }

        const dalLeUrl = response.data[0].url;
        
        // Fetch and convert to Base64 to ensure persistence
        const imageRes = await fetch(dalLeUrl!);
        const arrayBuffer = await imageRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = `data:image/png;base64,${buffer.toString('base64')}`;

        console.log('Image generated successfully with DALL-E 3');
        return NextResponse.json({ imageUrl: base64Image, prompt: visualPrompt });

    } catch (error: any) {
        console.error('Generate Pillar Image Error:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : 'Error desconocido en la generación de imagen'
        }, { status: 500 });
    }
}
