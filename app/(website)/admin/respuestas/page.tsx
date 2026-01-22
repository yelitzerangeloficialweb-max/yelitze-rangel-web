import { db } from "@/lib/db";
import AdminResponsesList from "@/components/admin/AdminResponsesList";

// Disable caching for this admin page to see fresh results
export const dynamic = 'force-dynamic';

export default async function AdminRespuestasPage() {
    // Fetch all results ordered by newest first
    const results = await db.testResult.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    // Group results by testTitle
    const groupedResults = results.reduce((acc: Record<string, typeof results>, result: any) => {
        const title = result.testTitle || "Sin Título";
        if (!acc[title]) acc[title] = [];
        acc[title].push(result);
        return acc;
    }, {} as Record<string, typeof results>);

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-heading text-[var(--color-primary)] mb-2">
                            Consola de Respuestas
                        </h1>
                        <p className="text-gray-500">Gestiona y descarga los reportes de tus usuarios en un solo lugar.</p>
                    </div>
                </div>

                {results.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <p className="text-gray-500">Aún no hay respuestas registradas.</p>
                    </div>
                ) : (
                    <AdminResponsesList groupedResults={groupedResults} />
                )}
            </div>
        </div>
    );
}
