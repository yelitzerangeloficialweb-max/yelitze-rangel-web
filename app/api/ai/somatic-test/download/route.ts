import { NextResponse } from 'next/server';
import { generateSomaticPDF } from '@/lib/pdf-generator';

export async function POST(req: Request) {
    try {
        const { email, result, reflection, stressResult, name = 'Explorador/a' } = await req.json();

        // Generate PDF
        const pdfBuffer = await generateSomaticPDF(name, result, stressResult, reflection);

        // Return as file download
        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="Diagnostico_Somatico_${name.replace(/\s+/g, '_')}.pdf"`,
            },
        });

    } catch (error: any) {
        console.error('Download PDF Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
