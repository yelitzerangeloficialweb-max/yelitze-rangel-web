import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, whatsapp, city } = body;

        if (!name || !email || !whatsapp || !city) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const registration = await db.venezuelaEnElCuerpoRegistration.create({
            data: {
                name,
                email,
                whatsapp,
                city,
            },
        });

        return NextResponse.json(registration, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 });
    }
}
