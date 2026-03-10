import { NextResponse } from 'next/server';
import { generateVisionPrompt } from '@/lib/ai/gemini';

export async function POST(req: Request) {
    try {
        const { intention, images, pillarTitle } = await req.json();

        if (!images || images.length === 0) {
            return NextResponse.json({ error: 'Images are required' }, { status: 400 });
        }

        // 1. Generate descriptive prompt based on existing images + intention
        const visualPrompt = await generateVisionPrompt(`${pillarTitle}: ${intention}`, images);

        // 2. Clear prompt and encode for Pollinations
        // We use Flux model from Pollinations for high quality
        const cleanPrompt = visualPrompt.replace(/[\n\r]/g, " ").trim();
        const encodedPrompt = encodeURIComponent(cleanPrompt + ", cinematic lighting, conceptual architectural art, 4k, masterpiece, minimal aesthetic");

        const randomSeed = Math.floor(Math.random() * 1000000);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${randomSeed}&model=flux`;

        // 3. Optional: In a production app, we would fetch the image and convert to base64 or upload to a bucket.
        // For now, returning the URL is enough if the frontend handles it.
        // But since we store images as base64 in the Wizard, we should probably fetch and convert.

        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;

        return NextResponse.json({ imageUrl: base64Image, prompt: visualPrompt });

    } catch (error) {
        console.error('Generate Pillar Image Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
