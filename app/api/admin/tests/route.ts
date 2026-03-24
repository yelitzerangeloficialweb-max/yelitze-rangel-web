import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const results = await db.testResult.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(results);
    } catch (error) {
        console.error('Error fetching test results:', error);
        return NextResponse.json({ error: 'Error fetching test results' }, { status: 500 });
    }
}
