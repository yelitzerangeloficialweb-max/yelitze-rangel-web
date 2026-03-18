import { NextResponse } from 'next/server';
import { sendSomaticEmail } from '@/lib/mail';
import { generateSomaticPDF } from '@/lib/pdf-generator';

export async function POST(req: Request) {
    try {
        const { email, result, reflection, stressResult, name = 'Explorador/a' } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // 1. Generate PDF on server side
        console.log(`Generating server-side PDF for ${name}...`);
        const pdfBuffer = await generateSomaticPDF(name, result, stressResult, reflection);

        // 2. Use the centralized mail service (same as Venezuela Tour & Vision Board)
        console.log(`Sending somatic email via shared mail service to: ${email}`);
        const mailResult = await sendSomaticEmail({
            email,
            name,
            result,
            pdfBuffer
        });

        if (!mailResult.success) {
            console.error('RESEND ERROR VIA MAIL SERVICE:', mailResult.error);
            return NextResponse.json({ 
                error: 'Error al enviar el correo a través del servicio central',
                details: mailResult.error 
            }, { status: 500 });
        }

        console.log('EMAIL SENT SUCCESSFULLY:', mailResult.data);
        return NextResponse.json({ success: true, data: mailResult.data });

    } catch (error: any) {
        console.error('CRITICAL Somatic Email Route Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
