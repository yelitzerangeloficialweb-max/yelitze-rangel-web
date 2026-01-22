import Link from "next/link";

export default function TerminosPage() {
    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-36 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] mb-8 text-center">
                    Términos y Condiciones
                </h1>

                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[var(--color-primary)]/5 space-y-8 text-[var(--color-text)]">
                    <p className="italic text-gray-500">
                        Última actualización: {new Date().getFullYear()}
                    </p>

                    <section>
                        <div className="p-4 bg-[var(--color-secondary)]/10 border-l-4 border-[var(--color-secondary)] rounded-r-lg mb-6">
                            <h3 className="font-bold text-[var(--color-primary)] mb-1">Descargo de Responsabilidad Importante</h3>
                            <p className="text-sm">
                                Los servicios ofrecidos por Yelitzé Rangel son de acompañamiento espiritual y crecimiento personal (coaching sistémico, constelaciones, tanatología). <strong>NO sustituyen el tratamiento médico, psiquiátrico o psicológico clínico.</strong> Si estás atravesando una crisis de salud mental grave, por favor acude a un profesional de la salud o servicio de emergencia.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-4">1. Aceptación de los Términos</h2>
                        <p>
                            Al acceder a este sitio web y reservar nuestros servicios, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguna parte de los términos, te recomendamos no utilizar nuestros servicios.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-4">2. Servicios y Pagos</h2>
                        <p className="mb-2">
                            Los precios de los servicios están expresados en dólares estadounidenses (USD).
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>El pago debe realizarse en su totalidad antes de la sesión o inicio del curso.</li>
                            <li>Aceptamos pagos vía PayPal y Zelle.</li>
                            <li>Nos reservamos el derecho de modificar los precios en cualquier momento, respetando las reservas ya confirmadas.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-4">3. Política de Cancelación y Reembolsos</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Reprogramaciones:</strong> Puedes reprogramar tu sesión con al menos 24 horas de anticipación sin costo adicional.</li>
                            <li><strong>Cancelaciones Tardías:</strong> Las cancelaciones con menos de 24 horas de antelación o la inasistencia (no-show) no son reembolsables, ya que el tiempo ha sido reservado exclusivamente para ti.</li>
                            <li><strong>Productos Digitales:</strong> Debido a la naturaleza de los productos digitales (ebooks, cursos grabados), no se ofrecen reembolsos una vez que se ha dado acceso al material.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-4">4. Propiedad Intelectual</h2>
                        <p>
                            Todo el contenido de este sitio web (textos, logos, imágenes, materiales de cursos, tests) es propiedad intelectual de Yelitzé Rangel. Está prohibida su reproducción, distribución o uso comercial sin autorización expresa por escrito.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-4">5. Conducta</h2>
                        <p>
                            Nos reservamos el derecho de rechazar el servicio a cualquier persona por cualquier motivo. Esperamos un trato respetuoso. Cualquier comportamiento ofensivo o inapropiado resultará en la terminación inmediata del servicio sin derecho a reembolso.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-4">6. Contacto</h2>
                        <p>
                            Para cualquier duda sobre estos términos, por favor contáctanos en <Link href="/contacto" className="text-[var(--color-secondary)] font-semibold hover:underline">nuestra página de contacto</Link>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
