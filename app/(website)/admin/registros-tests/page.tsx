import { db } from '@/lib/db';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const dynamic = 'force-dynamic';

export default async function AdminTestResultsPage() {
    const results = await db.testResult.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div className="container mx-auto py-12 px-4 max-w-7xl">
            <div className="mb-8">
                <h1 className="text-3xl font-serif text-[#3A3A3A] mb-2">Registro de Resultados de Tests</h1>
                <p className="text-gray-500">Visualizando {results.length} registros</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E5] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FAF9F6] border-b border-[#E5E5E5]">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-[#666]">Fecha</th>
                                <th className="px-6 py-4 text-sm font-semibold text-[#666]">Usuario / Email</th>
                                <th className="px-6 py-4 text-sm font-semibold text-[#666]">Test</th>
                                <th className="px-6 py-4 text-sm font-semibold text-[#666]">Puntaje</th>
                                <th className="px-6 py-4 text-sm font-semibold text-[#666]">Resultado IA</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E5E5]">
                            {results.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                                        No hay registros todavía.
                                    </td>
                                </tr>
                            ) : (
                                results.map((result) => (
                                    <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-[#3A3A3A] whitespace-nowrap">
                                            {format(new Date(result.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
                                            <br />
                                            <span className="text-xs text-gray-400">
                                                {format(new Date(result.createdAt), "HH:mm a")}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="font-medium text-[#3A3A3A]">
                                                {result.userName || 'Anónimo'}
                                            </div>
                                            <div className="text-gray-500 text-xs">
                                                {result.userEmail || 'No email provided'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#3A3A3A]">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F5F0EB] text-[#8C6A4B]">
                                                {result.testTitle}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#3A3A3A]">
                                            {result.score} / {result.maxScore}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={result.aiAnalysis}>
                                            {result.aiAnalysis}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
