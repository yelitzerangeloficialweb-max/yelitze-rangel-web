import { NextResponse } from 'next/server';
import { generateImagePromptGemini } from '@/lib/ai/gemini';

export async function POST(req: Request) {
    try {
        const { intention } = await req.json();

        if (!intention) {
            return NextResponse.json({ error: 'Intention is required' }, { status: 400 });
        }

        // 1. Generate Prompt (Try Gemini, fallback to user intention)
        let visualPrompt = await generateImagePromptGemini(intention);

        // If Gemini failed (returned the generic fallback), use the user's intention directly
        // to get specific imagery instead of generic "spiritual art"
        if (visualPrompt.includes("spiritual abstract art")) {
            visualPrompt = intention;
        }

        // Clean prompt for URL
        // Translate casual intention to visual keywords essentially by appending style terms
        const encodedPrompt = encodeURIComponent(visualPrompt + ", mystic, golden lighting, minimal, 4k resolution, cinematic composition");

        // 2. Use Pollinations.ai (No API Key required)
        const randomSeed = Math.floor(Math.random() * 1000);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${randomSeed}&model=flux`;

        return NextResponse.json({ imageUrl, prompt: visualPrompt });

    } catch (error) {
        console.error('Generate Symbol API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
