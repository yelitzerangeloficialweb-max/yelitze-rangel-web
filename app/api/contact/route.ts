import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mail";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, lastname, email, subject, message, turnstileToken } = body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
        }

        // Verify Turnstile Token
        const isTokenValid = await verifyTurnstileToken(turnstileToken);
        if (!isTokenValid) {
            return NextResponse.json({ error: "Verificación de seguridad fallida" }, { status: 400 });
        }

        // Send email
        const result = await sendContactEmail({
            name: `${name} ${lastname}`.trim(),
            email,
            subject,
            message
        });

        if (!result.success) {
            return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "¡Mensaje enviado con éxito!" });
    } catch (error) {
        console.error("[CONTACT_API_ERROR]", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
