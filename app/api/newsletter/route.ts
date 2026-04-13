import { NextResponse } from "next/server";
import { sendNewsletterSubscriptionEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: "Email inválido" }, { status: 400 });
        }

        const result = await sendNewsletterSubscriptionEmail(email);

        if (!result.success) {
            return NextResponse.json({ error: "Error al suscribirse" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[NEWSLETTER_API_ERROR]", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
