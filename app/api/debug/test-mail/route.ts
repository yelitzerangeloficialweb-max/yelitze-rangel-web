import { NextResponse } from 'next/server';
import { sendGenericTestEmail } from '@/lib/mail';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email') || 'kickoffdevelopment@gmail.com';
    
    console.log(`[DEBUG API] Testing email delivery to: ${email}`);
    
    try {
        const result = await sendGenericTestEmail({
            email,
            name: 'Tester Debug',
            testTitle: 'Debug Test Email',
            analysis: 'Este es un correo de prueba para verificar la configuración de Resend en el servidor.'
        });
        
        return NextResponse.json({
            success: result.success,
            data: result.data,
            error: result.error,
            env_key_present: !!process.env.RESEND_API_KEY,
            env_key_length: process.env.RESEND_API_KEY?.length || 0,
            env_key_prefix: process.env.RESEND_API_KEY?.substring(0, 7) || 'none'
        });
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            error: err.message,
            stack: err.stack
        }, { status: 500 });
    }
}
