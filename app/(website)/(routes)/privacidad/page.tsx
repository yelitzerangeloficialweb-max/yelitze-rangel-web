export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-36 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] mb-8 text-center">
                    Política de Privacidad
                </h1>

                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[var(--color-primary)]/5 space-y-8 text-[var(--color-text)]">
                    <p className="italic text-gray-500">
                        Última actualización: {new Date().getFullYear()}
                    </p>

                    <section>
                        <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-4">1. Introducción</h2>
                        <p>
                            En Yelitzé Rangel ("nosotros", "nuestro"), respetamos tu privacidad y estamos comprometidos a proteger los datos personales que compartes con nosotros. Esta política explica cómo recopilamos, usamos y protegemos tu información cuando visitas nuestro sitio web y utilizas nuestros servicios.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-4">2. Información que Recopilamos</h2>
                        <p className="mb-2">Podemos recopilar la siguiente información:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Datos de Identificación:</strong> Nombre, apellido.</li>
                            <li><strong>Datos de Contacto:</strong> Correo electrónico, número de teléfono (WhatsApp).</li>
                            <li><strong>Información de Servicios:</strong> Respuestas a tests psicológicos (para generar resultados), historial de reservas y compras.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-4">3. Uso de la Información</h2>
                        <p className="mb-2">Utilizamos tus datos para:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Proveer los servicios de sanación y asesoría solicitados.</li>
                            <li>Enviar los resultados de los tests interactivos.</li>
                            <li>Procesar tus reservas y pagos.</li>
                            <li>Enviar comunicaciones relevantes, como recordatorios de citas o novedades (si te has suscrito).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-4">4. Confidencialidad y Seguridad</h2>
                        <p>
                            Tus respuestas a los tests y lo conversado en sesiones privadas es estrictamente confidencial. Implementamos medidas de seguridad razonables para proteger tu información contra acceso no autorizado. No vendemos ni compartimos tus datos con terceros para fines comerciales.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-4">5. Cookies</h2>
                        <p>
                            Este sitio puede utilizar cookies para mejorar tu experiencia de navegación. Puedes configurar tu navegador para rechazar todas las cookies si lo prefieres, aunque algunas funciones del sitio podrían no operar correctamente.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-4">6. Tus Derechos</h2>
                        <p>
                            Tienes derecho a acceder, rectificar o solicitar la eliminación de tu información personal de nuestras bases de datos en cualquier momento. Para ejercer estos derechos, contáctanos a través de nuestro formulario de contacto o email.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-4">7. Contacto</h2>
                        <p>
                            Si tienes preguntas sobre esta política, por favor escríbenos a <strong>contacto@yelitzerangel.com</strong>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
