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

        // 3. Fetch the image from Pollinations and convert to base64
        console.log('Fetching image from Pollinations:', imageUrl);
        const response = await fetch(imageUrl);

        if (!response.ok) {
            console.error('Pollinations API error:', response.status, response.statusText);
            throw new Error(`Failed to fetch image from Pollinations: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Basic check if it's actually an image (PNG/JPG typically start with specific bytes)
        // But for now, we'll trust the success status.
        const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;

        console.log('Image generated and converted successfully');
        return NextResponse.json({ imageUrl: base64Image, prompt: visualPrompt });

    } catch (error) {
        console.error('Generate Pillar Image Error:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
