import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
    console.warn('GOOGLE_GEMINI_API_KEY is missing.');
}

const genAI = new GoogleGenerativeAI(apiKey || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function refineTextWithGemini(prompt: string, context?: string) {
    try {
        const systemInstruction = `Eres un asistente de 'Arquitectura de Vida' experto en coaching ontológico.
    Tu objetivo es transformar intenciones vagas en declaraciones poderosas y afirmativas.
    Usa un tono cálido, profundo y breve.
    ${context ? `Contexto: ${context}` : ''}`;

        const fullPrompt = `${systemInstruction}\n\nUser Intention: "${prompt}"\n\nRefined Intention:`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Refinement Error:", error);
        return null; // Fail gracefully
    }
}

export async function generateImagePromptGemini(intention: string) {
    try {
        const systemInstruction = "Eres un experto en prompts visuales (Midjourney/DALL-E). Convierte la siguiente intención abstracta en una descripción visual física, minimalista y estética en INGLÉS. Solo devuelve el prompt, nada más.";
        const fullPrompt = `${systemInstruction}\n\nIntention: "${intention}"\n\nVisual Prompt in English:`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Prompt Error:", error);
        return "abstract spiritual minimalist art, golden light"; // Fallback
    }
}
