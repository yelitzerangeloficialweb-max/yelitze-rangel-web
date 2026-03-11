import { NextResponse } from 'next/server';
import { generateVisionPrompt } from '@/lib/ai/gemini';

export const maxDuration = 60; // Aumentar a 60 segundos para evitar timeouts en Vercel

export async function POST(req: Request) {
    try {
        const { intention, images, pillarTitle } = await req.json();

        if (!images || images.length === 0) {
            return NextResponse.json({ error: 'Images are required' }, { status: 400 });
        }

        // 1. Generate descriptive prompt based on existing images + intention
        const visualPrompt = await generateVisionPrompt(`${pillarTitle}: ${intention}`, images);

        // 2. Clear prompt and encode for Pollinations
        // Flux is the premium model, but we'll use turbo or default if it fails
        let cleanPrompt = visualPrompt.replace(/[\n\r]/g, " ").trim();
        // Limit prompt length to avoid URL issues
        if (cleanPrompt.length > 800) {
            cleanPrompt = cleanPrompt.substring(0, 800);
        }

        const encodedPrompt = encodeURIComponent(cleanPrompt + ", cinematic lighting, conceptual architectural art, minimal aesthetic, high quality");
        const randomSeed = Math.floor(Math.random() * 1000000);
        
        // We'll try flux first, if it fails, we fall back to default
        const tryFetch = async (modelName: string | null = 'flux') => {
            const modelParam = modelName ? `&model=${modelName}` : '';
            const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${randomSeed}${modelParam}`;
            
            console.log(`Fetching image from Pollinations (${modelName || 'default'}):`, url);
            // Reducimos el timeout individual pero permitimos que la función total dure más
            const res = await fetch(url, { signal: AbortSignal.timeout(35000) }); // 35s timeout
            if (!res.ok) throw new Error(`Pollinations error ${res.status}: ${res.statusText}`);
            return res;
        };

        let response;
        try {
            response = await tryFetch('flux');
        } catch (e) {
            console.warn('Flux model failed, retrying with default model...', e);
            response = await tryFetch(null); // Default model fallback
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;

        console.log('Image generated successfully');
        return NextResponse.json({ imageUrl: base64Image, prompt: visualPrompt });

    } catch (error) {
        console.error('Generate Pillar Image Error:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : 'Error desconocido en la generación de imagen'
        }, { status: 500 });
    }
}
