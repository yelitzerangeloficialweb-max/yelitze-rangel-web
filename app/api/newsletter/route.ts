import { NextResponse } from "next/server";
import { sendNewsletterSubscriptionEmail } from "@/lib/mail";
import { z } from "zod";
import { verifyTurnstileToken } from "@/lib/turnstile";

// Schema de validación robusto
const EmailSchema = z.object({
    email: z.string()
        .email("Email inválido")
        .min(5, "Demasiado corto")
        .max(100, "Demasiado largo")
        .trim()
        .toLowerCase(),
    turnstileToken: z.string().min(1, "Verificación de seguridad requerida")
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Validar y sanear el input con Zod
        const validation = EmailSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ 
                error: "El formato del email no es válido o falta verificación de seguridad." 
            }, { status: 400 });
        }

        const { email, turnstileToken } = validation.data;

        // Verificar Turnstile Token
        const isTokenValid = await verifyTurnstileToken(turnstileToken);
        if (!isTokenValid) {
            return NextResponse.json({ error: "Verificación de seguridad fallida" }, { status: 400 });
        }

        // Protección adicional: evitar caracteres de control o inyección común
        if (/[<>{}$%()]/.test(email)) {
             return NextResponse.json({ error: "Input no permitido" }, { status: 400 });
        }

        const result = await sendNewsletterSubscriptionEmail(email);

        if (!result.success) {
            return NextResponse.json({ error: "Error al procesar la suscripción" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[NEWSLETTER_API_ERROR]", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
