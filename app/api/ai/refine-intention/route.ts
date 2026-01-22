import { NextResponse } from 'next/server';
import { refineTextWithGemini } from '@/lib/ai/gemini';

export async function POST(req: Request) {
    try {
        const { text, pillar } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        const context = `El usuario está trabajando en el pilar: ${pillar || 'General'}. Ayúdalo a formular una intención poderosa y afirmativa.`
        let refined = await refineTextWithGemini(text, context);

        if (!refined) {
            // Fallback for blocked regions: Return original text but cleaned up
            refined = text.charAt(0).toUpperCase() + text.slice(1);
        }

        return NextResponse.json({ refined });
    } catch (error) {
        console.error('Refine Intention API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
