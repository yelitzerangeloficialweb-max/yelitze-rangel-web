export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // HTML or Markdown
    date: string;
    image: string;
    category: string;
    author: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: '8',
        slug: 'liberate-de-tus-patrones',
        title: 'Libérate de tus Patrones: La Ciencia de la Decisión',
        excerpt: '¿Por qué sentimos que estamos "cableados" para el autosabotaje? Entiende cómo tu cerebro y tu sistema familiar trabajan juntos y cómo empezar a elegir diferente.',
        date: '24 de Enero, 2026',
        image: '/images/home_redesign/blog/Liberate_de_tus_patrones.png',
        category: 'Mentalidad',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCIÓN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "¿Alguna vez has sentido que, sin importar cuánto te esfuerces por cambiar, terminas tropezando con la misma piedra, en el mismo lugar y con la misma intensidad?"
                </p>
                <p>
                    Esa sensación de estar en un "bucle" infinito no es mala suerte, ni falta de voluntad. Es, en realidad, el resultado de un sistema operativo biológico y ancestral que se ejecuta en segundo plano. Nuestros patrones de comportamiento no son fallos de fábrica; son <strong>estrategias de supervivencia</strong> que un día aprendimos para pertenecer a nuestro sistema familiar. Sin embargo, lo que antes nos protegió del dolor o la exclusión, hoy puede ser la jaula que nos impide crecer.
                </p>

                <!-- INTERÉS: LA CIENCIA -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">La Ciencia de la Decisión: Tus Autopistas Mentales</h3>
                <p>
                    La neurociencia moderna nos ha revelado una verdad liberadora: el cerebro es plástico, pero también es perezoso. Para ahorrar energía, crea lo que llamamos "autopistas neuronales". Si durante años has reaccionado desde el miedo, la carencia o la complacencia, tu cerebro ha pavimentado una autopista de seis carriles hacia esa respuesta. 
                </p>
                <p>
                    Cuando te enfrentas a una decisión importante —ya sea en el amor, el dinero o el éxito— tu mente no elige el camino más sano, sino el más transitado. Es por eso que, aunque conscientemente quieras abundancia, tu sistema nervioso puede sentirse "seguro" en la escasez, simplemente porque es lo que conoce.
                </p>

                <!-- INTERÉS: LO SISTÉMICO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Lealtades Invisibles: El Peso que no te Pertenece</h3>
                <p>
                    Desde la mirada de la <strong>Sanación Sistémica</strong>, entendemos que no caminamos solos. Detrás de nosotros hay miles de destinos. A veces, repetimos un patrón de fracaso o de soledad no por incapacidad, sino por una lealtad inconsciente: "Yo, como tú, querido abuelo, tampoco logro prosperar, para así seguir perteneciendo a nuestro clan". 
                </p>
                <div class="my-12 p-10 bg-[#fafcfe] rounded-3xl border border-stone-100 italic text-xl text-[var(--color-primary)] text-center shadow-sm">
                    "No estás roto, solo estás siendo leal a una historia que ya no necesitas cargar."
                </div>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Del Amor Ciego al Amor Consciente</h3>
                <p>
                    Liberarse de los patrones requiere consciencia, pero sobre todo, requiere <strong>el permiso interno</strong> para ser diferente a quienes vinieron antes. El deseo de libertad comienza cuando comprendes que honrar a tus ancestros no significa repetir sus dolores, sino florecer allí donde ellos solo pudieron sobrevivir.
                </p>
                <p>
                    Imagina por un momento cómo sería tu vida si pudieras entrar en una habitación y tomar una decisión basada en tus deseos actuales, sin el susurro del miedo heredado. Esa es la verdadera soberanía biológica. Es el estado donde el cuerpo y el alma se alinean para decir "sí" a la vida, sin condiciones.
                </p>

                <!-- ACCIÓN Y EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Laboratorio de Transformación</h2>
                    <p class="text-center font-medium italic">Tómate 15 minutos para realizar estos ejercicios. No leas solo con la mente, permite que tu cuerpo experimente el cambio.</p>

                    <!-- EJERCICIO 1 -->
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            Mapeo de la Repetición (Journaling)
                        </h4>
                        <p class="pl-11">Identifica una situación que se repite constantemente en tu vida. Escríbela. Ahora, pregúntate: ¿A quién de mi familia le pasó algo similar? Identifica el rostro o la historia. Al ponerle nombre, el patrón pierde su poder oculto.</p>
                    </div>

                    <!-- EJERCICIO 2 -->
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            El Ritual de la Silla de las Lealtades
                        </h4>
                        <p class="pl-11">Coloca una silla frente a ti e imagina que en ella está sentado el ancestro que vivió ese patrón. Míralo con amor y dile internamente: <i>"Veo tu dolor, veo tu destino. Te honro dejándote tu carga a ti, y dándome el permiso de hacerlo diferente en tu honor"</i>. Observa qué pasa en tu respiración.</p>
                    </div>

                    <!-- EJERCICIO 3 -->
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            Anclaje Somático del Nuevo Camino
                        </h4>
                        <p class="pl-11 text-stone-600">Ponte de pie. Cierra los ojos y siente el peso de tus pies en la tierra. Imagina que frente a ti hay un camino nuevo, nunca antes transitado por tu linaje. Da un paso físico hacia adelante y registra la sensación de "novedad". Ese paso es tu declaración de libertad.</p>
                    </div>
                </div>

                <p class="mt-16 text-center text-xl font-heading text-[var(--color-primary)]">
                    Primero sana el cuerpo… y luego cambia la historia.
                </p>
                <p class="text-center italic pb-12">— Yelitze Rangel</p>
            </div>
        `
    },
    {
        id: '9',
        slug: 'transforma-tu-miedo-en-exito',
        title: 'Transforma tu Miedo en Éxito: El Salto de la Valiente',
        excerpt: 'El miedo no es una señal de que debas detenerte, sino el combustible que necesitas para el siguiente nivel de tu evolución.',
        date: '24 de Enero, 2026',
        image: '/images/blog_4k/fear_to_success.png',
        category: 'Empoderamiento',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCIÓN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El miedo no es una señal para detenerse, sino el motor de arranque hacia tu siguiente nivel de evolución."
                </p>
                <p>
                    El miedo suele ser la sombra de nuestro potencial más brillante. Cuando estamos ante un gran cambio o un nuevo desafío, es natural que las alarmas internas se enciendan. Sin embargo, la mayoría de nosotros interpretamos esa descarga de adrenalina como un peligro, cuando en realidad es <strong>combustible puro</strong> listo para ser utilizado. El secreto de las personas "valientes" no es la ausencia de miedo, sino su capacidad para caminar de la mano con él.
                </p>

                <!-- INTERÉS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">La Brújula Biológica: ¿Por qué tenemos miedo?</h3>
                <p>
                    Desde una perspectiva biológica, el miedo es una herramienta de regulación. El problema surge cuando ese miedo se queda "atrapado" en el cuerpo bajo la forma de parálisis. Pero hay un miedo más profundo: el miedo a la <strong>exclusión</strong>. Inconscientemente pensamos: "Si soy muy exitosa, si gano más que mis padres, si vuelo más alto que mis hermanos... ¿seguiré perteneciendo?".
                </p>
                <p>
                    Entender esto nos permite darnos el permiso sistémico para brillar. Cuando comprendes que tu éxito no es una traición a tus raíces, sino un regalo para todo tu linaje, el miedo se transforma en una fuerza de empuje imparable.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Reclamando tu Poder</h3>
                <p>
                    Cada vez que eliges atravesar el miedo, estás reclamando una parte de tu poder que estaba dormida. El éxito consciente es el resultado de haber integrado tu sombra y haber decidido, con todo y miedo, que tu propósito es mayor que tu comodidad actual. 
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Ejercicios de Expansión</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            Localización del Miedo (Soma)
                        </h4>
                        <p class="pl-11">Piensa en un proyecto que te dé miedo. Cierra los ojos y localiza dónde lo sientes en el cuerpo (pecho, garganta, estómago). Pon tu mano en ese lugar y respira profundamente, dándole permiso a esa sensación de estar ahí sin intentar quitarla.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            La Venia a los que no pudieron
                        </h4>
                        <p class="pl-11">Imagina a tus ancestros frente a ti. Haz una pequeña inclinación y diles: <i>"Sus destinos fueron difíciles y los honro. Ahora yo me permito tener éxito para que su esfuerzo haya valido la pena"</i>. Siente la fuerza del linaje a tus espaldas.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            El Paso del Sí
                        </h4>
                        <p class="pl-11">Pon música que te empodere. Visualiza tu meta al final de la habitación. Camina hacia ella lentamente, sintiendo que cada paso dejas atrás la necesidad de permiso externo. Al llegar, exhala fuerte un "SÍ".</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '10',
        slug: 'tu-energia-tu-destino',
        title: 'Tu Energía, tu Destino: La Alquimia del Ser',
        excerpt: 'No atraes lo que quieres, atraes lo que eres. Descubre cómo tu campo vibratorio moldea las experiencias que llegan a tu vida.',
        date: '24 de Enero, 2026',
        image: '/images/blog_4k/energy_destiny.png',
        category: 'Espiritualidad',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCIÓN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "No atraes lo que quieres, atraes lo que eres. Tu campo vibratorio es el imán de tus experiencias."
                </p>
                <p>
                    Vivimos en un universo de frecuencias invisibles pero tangibles. Todo lo que piensas, sientes y sostienes en tu interior emite una vibración que resuena con el mundo exterior. Tu destino no es algo estático escrito por un tercero; es un lienzo que se pinta cada día con el color de tu estado interno. Si tu energía está anclada en la queja o en deudas emocionales, el universo simplemente te devolverá más "puntos de resonancia" de ese mismo tipo.
                </p>

                <!-- INTERÉS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">La Física de la Abundancia</h3>
                <p>
                    Para cambiar tu destino, primero debes cambiar tu frecuencia. La alquimia personal consiste en transformar el "plomo" emocional de resentimientos y juicios en el "oro" de la gratitud y la presencia. Cuando limpias tu campo energético de las lealtades que te mantienen atado a la escasez, las oportunidades comienzan a aparecer de forma sincrónica. No es magia, es <strong>alineación coherente</strong> entre tu deseo y tu vibración.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Convirtiéndote en el Arquitecto</h3>
                <p>
                    Imagina ser capaz de sostener una frecuencia de paz incluso en medio del caos. Ese es el poder de la Alquimia del Ser. Al liberar las cargas densas de tu historia personal y familiar, permites que tu luz esencial brille sin obstrucciones. Eres el arquitecto de tu propia realidad energética, y es momento de empezar a construir desde la alta vibración.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Cámara Alquímica</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            Limpieza de Resonancia
                        </h4>
                        <p class="pl-11">Haz una lista de 3 personas o situaciones que te "drenen" energía. Pregúntate: ¿Qué aspecto de mí resuena con esto? Al reconocer tu parte, retiras el hilo energético y recuperas tu poder personal.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            Activación del Corazón (Toroides)
                        </h4>
                        <p class="pl-11">Coloca tus manos en el corazón. Respira imaginando que un campo de luz se expande desde tu pecho en forma de toroide hacia afuera. Siente cómo esta vibración armoniza todo lo que te rodea.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            Afirmación de Frecuencia
                        </h4>
                        <p class="pl-11">Repite durante 3 minutos frente al espejo: <i>"Yo soy la fuente de mi propia abundancia. Mi frecuencia atrae bendiciones en sintonía con mi propósito"</i>. Nota cómo cambia tu postura corporal al final.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '11',
        slug: 'clave-del-exito-sistemica',
        title: 'La Clave del Éxito: Una Mirada Sistémica',
        excerpt: 'Desde las figuras de los ancestros hasta la toma del lugar correcto: el éxito tiene reglas que van más allá del esfuerzo personal.',
        date: '24 de Enero, 2026',
        image: '/images/blog_4k/success_systemic.png',
        category: 'Sabiduría Ancestral',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCIÓN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El éxito tiene cara de madre y fuerza de padre. Si estás peleado con tus raíces, estarás peleado con tus resultados."
                </p>
                <p>
                    A menudo buscamos el éxito únicamente en estrategias externas, cursos de marketing o redes de contactos profesionales. Sin embargo, en el mundo sistémico, el éxito profesional no es una meta, sino una consecuencia de estar en el lugar correcto dentro de tu sistema familiar. Cuando intentamos "salvar" a nuestros ancestros o cargar con sus frustraciones, perdemos la vitalidad necesaria para construir lo propio. El éxito requiere que estemos de espaldas a los ancestros (tomando su fuerza) y de frente a nuestra propia vida.
                </p>

                <!-- INTERÉS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Ocupar el Lugar del Pequeño</h3>
                <p>
                    Una de las reglas de oro del éxito es la <strong>humildad sistémica</strong>. Solo cuando ocupamos nuestro lugar de "hijos" frente a nuestros padres podemos ser "grandes" frente a nuestras metas. Al juzgar lo que ellos hicieron o dejaron de hacer, nos convertimos en "padres de nuestros padres", agotando nuestra energía creativa en una batalla que no podemos ganar. Tomar a los padres tal como son es abrir la fuente de la nutrición (madre) y de la estructura (padre) en nuestra carrera.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">La Recompensas del Orden</h3>
                <p>
                    El éxito auténtico —ese que viene acompañado de paz interna y no solo de números— llega cuando dejas de luchar contra tu historia. Al asentir a todo lo que fue, liberas tu energía para estar disponible para tus clientes, tus proyectos y tu prosperidad. El éxito nos sonríe cuando nosotros le sonreímos a nuestro origen.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Laboratorio de Orden</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            El Retrato de mis Raíces
                        </h4>
                        <p class="pl-11">Busca una foto de tus padres. Mírala sin juicios. Di en voz alta: <i>"Ustedes son los grandes, yo soy la pequeña. Gracias por la vida"</i>. Siente cómo se libera la tensión en tus hombros.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            Honra a tus Maestros Inconscientes
                        </h4>
                        <p class="pl-11">Haz una lista de tus 3 "fracasos" más grandes. Debajo de cada uno escribe: <i>"Gracias por la lección, la honro y ahora elijo un camino de éxito en su lugar"</i>. Quema el papel simbólicamente.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            La Llamada del Éxito
                        </h4>
                        <p class="pl-11">Cierra los ojos e imagina al Éxito personificado frente a ti. ¿Tiene la cara de alguien? Si es la de un padre, pídele permiso para ser feliz. Si tiene tu propia cara, abraza esa versión futura de ti.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '12',
        slug: 'tu-cuerpo-tiene-la-clave',
        title: '¡Tu Cuerpo tiene la Clave! Escuchando lo Invisible',
        excerpt: 'El cuerpo no miente. Cada síntoma, tensión o cansancio es un mensaje del alma tratando de ser escuchado.',
        date: '24 de Enero, 2026',
        image: '/images/blog_4k/body_clue.png',
        category: 'Consciencia Corporal',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCIÓN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El cuerpo es el mapa donde el alma escribe su historia. Lo que no se expresa con palabras, el síntoma lo grita."
                </p>
                <p>
                    Nuestro cuerpo es el receptor más sensible y preciso de nuestra historia no resuelta. Cada dolor de cabeza crónico, cada tensión en los hombros o ese cansancio sistémico que no se quita durmiendo, es en realidad un mensaje tratando de ser escuchado. A menudo, el síntoma no es el problema, sino la <strong>solución biológica</strong> que tu sistema ha encontrado para una emoción o una lealtad que no has podido procesar conscientemente.
                </p>

                <!-- INTERÉS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">El Idioma de la Biología</h3>
                <p>
                    Aprender a descodificar el lenguaje del cuerpo es la herramienta de sanación más poderosa que existe. Cuando sentimos un nudo en la garganta o una opresión en el pecho, en lugar de intentar "anestesiar" la sensación con medicamentos o distracciones, debemos aprender a preguntarle: "¿A quién le pertenece este peso? ¿Qué se quedó sin decir?". Muchas veces, el síntoma es un "representante" de un ancestro excluido o de una vivencia traumática que pide ser vista y honrada.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Habitar tu Santuario</h3>
                <p>
                    Escuchar a tu cuerpo te devuelve la soberanía sobre tu salud y tu bienestar. Al integrar los mensajes que tus órganos y músculos te están enviando, dejas de luchar contra ti misma y comienzas a colaborar con tu biología. Tu cuerpo es tu santuario y tu mejor guía hacia la libertad emocional. Es momento de dejar de ignorarlo y empezar a dialogar con él.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Escuela de Escucha Corporal</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            Diálogo con el Síntoma
                        </h4>
                        <p class="pl-11">Identifica una molestia física actual. Cierra los ojos y visualiza que esa molestia tiene una forma o un color. Pregúntale: <i>"¿Para qué estás aquí? ¿Qué quieres que vea?"</i>. Anota lo primero que te venga a la mente.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            Barrido de Tensiones Heredadas
                        </h4>
                        <p class="pl-11">Sentada cómodamente, recorre tu cuerpo de pies a cabeza. Al encontrar una tensión, imagina que es un hilo que viene de atrás. Corta el hilo imaginariamente y di: <i>"Esto te lo devuelvo con amor, ya no necesito cargarlo por ti"</i>.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            La Pausa Sagrada (Voz del Cuerpo)
                        </h4>
                        <p class="pl-11">Durante un minuto, quédate en silencio total y solo observa los latidos de tu corazón. Siente el milagro del orden biológico que te sostiene sin que tengas que hacer nada. Agradece a tus células su labor incansable.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '1',
        slug: 'sanar-heridas-infancia',
        title: '¿Por qué repetimos patrones? Sanando las Heridas de la Infancia',
        excerpt: 'Descubre cómo las experiencias no resueltas de tu niñez moldean tus relaciones actuales y aprende el primer paso para liberarte.',
        date: '28 de Diciembre, 2025',
        image: '/images/blog_4k/childhood_wounds.png',
        category: 'Sanación Interior',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCIÓN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "Tú no eliges a tu pareja, la elige tu herida de la infancia."
                </p>
                <p>
                    Muchas veces nos preguntamos por qué siempre terminamos con el mismo tipo de personas o por qué ciertas situaciones cotidianas nos detonan una reacción de rabia o tristeza desproporcionada. La respuesta no está en tu presente, sino en tu historia temprana. Lo que vivimos en los primeros siete años de vida configura el "parpado" a través del cual vemos el mundo. Si ese parpado está marcado por el dolor, seguiremos proyectando ese mismo dolor en nuestras relaciones adultas.
                </p>

                <!-- INTERÉS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Las 5 Máscaras del Alma</h3>
                <p>
                    Lise Bourbeau identificó cinco heridas fundamentales que todos, en menor o mayor medida, cargamos: <strong>Rechazo, Abandono, Humillación, Traición e Injusticia</strong>. Para protegernos del dolor de estas heridas, nos ponemos "máscaras" (el huidizo, el dependiente, el masoquista, el controlador, el rígido). El problema es que esas máscaras terminan alejándonos de nuestra verdadera esencia y del amor real.
                </p>
                <p>
                    Sanar no significa olvidar lo que pasó, sino mirar a ese niño interior con la compasión y la fuerza del adulto que eres hoy. Es decirle: "Ahora yo me hago cargo de ti, ya no necesitas buscar a mamá o a papá en tu pareja".
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">El Regreso a Casa</h3>
                <p>
                    Imagina vivir sin la necesidad constante de aprobación, o sin el miedo paralizante a ser abandonada. Ese es el regalo de sanar las heridas de la infancia. Al validar tu propio dolor y ocupar tu lugar de adulto, el ciclo de repetición se rompe y permites que surja una versión de ti más libre, auténtica y capaz de amar sanamente.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Terapia del Corazón</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            La Carta al Niño que Fuiste
                        </h4>
                        <p class="pl-11">Escribe una carta a tu "yo" de 5 años. Dile todo lo que necesitaba escuchar en ese momento: <i>"Te veo, eres valioso, no fue tu culpa"</i>. Lee la carta en voz alta y permite que las emociones fluyan.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            Identificación de la Máscara
                        </h4>
                        <p class="pl-11">Observa tu última gran discusión. ¿Cómo reaccionaste? ¿Huyendo, controlando, atacando? Identifica la máscara y dile internamente: <i>"Gracias por protegerme antes, pero ahora yo puedo manejar esto desde mi adulta"</i>.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            El Abrazo Somático
                        </h4>
                        <p class="pl-11">Cruza tus brazos sobre tu pecho, dándote un abrazo firme. Imagina que estás abrazando a ese pequeño que sintió miedo. Respira hacia el contacto y siente cómo tu cuerpo se calma al ser sostenido por ti misma.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '2',
        slug: 'enfoque-sistemico-amor',
        title: 'El Amor Ciego vs. El Amor Consciente',
        excerpt: 'La mirada sistémica nos enseña que a veces sufrimos por lealtad a nuestros ancestros. ¿Cómo podemos amar con los ojos abiertos?',
        date: '20 de Diciembre, 2025',
        image: '/images/blog_4k/blind_love.png',
        category: 'Relaciones',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCIÓN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El amor ciego dice: 'Yo sufro como tú para pertenecer'. El amor consciente dice: 'Te honro siendo feliz'."
                </p>
                <p>
                    La Sanación Sistémica nos revela una paradoja dolorosa: a menudo sufrimos por un exceso de amor. Pero es un <strong>amor ciego</strong>, una lealtad infantil que nos lleva a repetir los destinos difíciles de nuestros padres o abuelos como una forma de decir "somos iguales". Este tipo de amor no sana, solo perpetúa el dolor a través de las generaciones. El verdadero desafío es transitar hacia un amor consciente que sea capaz de mirar el pasado con respeto y, aun así, elegir un camino de plenitud.
                </p>

                <!-- INTERÉS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">La Fuerza de la Diferenciación</h3>
                <p>
                    Sanar en el amor implica romper con las tragedias familiares. No es falta de lealtad prosperar cuando otros no pudieron; es el mayor acto de honra. Cuando eres capaz de mirar a tu pareja como un individuo y no como un representante de tu padre o de tu madre, la relación tiene espacio para respirar. El amor consciente no carga maletas ajenas; celebra su propia libertad y desde ahí construye un nosotros real.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Relaciones que Nutren</h3>
                <p>
                    Aprender a amar con los ojos abiertos te permite construir vínculos basados en la realidad y no en la proyección. Al ocupar tu lugar de "hija" frente a tus padres, dejas de pedirle a tu pareja que te rescate o que te complete. El resultado es una relación más ligera, más presente y mucho más gozosa.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Círculo de Consciéncia</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            El Espejo de las Proyecciones
                        </h4>
                        <p class="pl-11">Cuando te sientas irritada con tu pareja, pregúntate: ¿Qué tono de voz estoy escuchando? ¿Me recuerda a mi padre o a mi madre? Al identificarlo, respira y di: <i>"Esa es mi historia, no eres tú"</i>.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            La Frase Sanadora
                        </h4>
                        <p class="pl-11">Imagina a tus ancestros detrás de ti. Mira a tu pareja y dile: <i>"Tengo a los míos conmigo, tú tienes a los tuyos. Nos miramos nosotros dos"</i>. Siente cómo la relación se vuelve más presente y liviana.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            Anclaje del Aquí y Ahora
                        </h4>
                        <p class="pl-11">Toma las manos de tu pareja (o imagina que lo haces). Míralo a los ojos y di su nombre. Reconoce su singularidad, fuera de los dramas de tu árbol genealógico. Disfruta de ese instante de conexión pura.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '3',
        slug: 'energia-del-dinero',
        title: 'El Dinero es Energía: Desbloquea tu Abundancia',
        excerpt: 'Tu cuenta bancaria es un reflejo de tu energía vital. Analizamos los bloqueos sistémicos más comunes que impiden el flujo del dinero.',
        date: '15 de Diciembre, 2025',
        image: '/images/blog_4k/money_mother.png',
        category: 'Abundancia',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCIÓN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El dinero es una energía sistémica. En el enfoque sistémico, el dinero tiene la cara de la Madre."
                </p>
                <p>
                    Nuestra cuenta bancaria y nuestra capacidad de generar abundancia son, a menudo, un reflejo directo de nuestra relación con la vida y, específicamente, con nuestra <strong>Madre</strong>. Ella fue nuestra primera fuente de alimento y sustento. Si hay rechazo, juicio o deuda emocional con ella, el dinero fluirá con dificultad en nuestra vida adulta. El dinero no es solo papel o números; es una energía viva que responde a nuestra capacidad de "tomar" lo que la vida nos ofrece.
                </p>

                <!-- INTERÉS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Limpiando el Cristal de la Abundancia</h3>
                <p>
                    A nivel inconsciente, muchas de nuestras carencias vienen de creencias limitantes heredadas: "El dinero corrompe", "No merezco tener más que mis padres", "Si tengo dinero, me verán como alguien malo". Estas lealtades actúan como frenos invisibles. Sanar la relación con la abundancia implica limpiar esos cristales y darnos el permiso adulto para prosperar, sabiendo que el dinero en manos de una persona consciente es una herramienta de sanación y expansión.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Fluyendo con la Prosperidad</h3>
                <p>
                    Imagina que el dinero es un amigo que quiere visitarte. ¿Cómo lo recibes? ¿Con miedo, con culpa, con ansiedad? Cambiar tu estado interno frente a la prosperidad abre las puertas para que ésta llegue de forma sincrónica. Cuando te alineas con la gratitud por lo que ya tienes y tomas la fuerza de tu linaje materno, el flujo de la vida y del dinero comienza a normalizarse.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Ritual de Apertura Económica</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            Sanando el Vínculo con la Nutrición
                        </h4>
                        <p class="pl-11">Cierra los ojos e imagina a tu madre frente a ti. Dale las gracias por haberte dado la vida, el mayor de todos los tesoros. Dile: <i>"Tomo lo que me diste y lo hago valer"</i>. Nota cómo se siente tu estómago después de esto.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            El Árbol del Dinero
                        </h4>
                        <p class="pl-11">Dibuja tu árbol genealógico enfocado en el dinero. ¿Quién perdió dinero? ¿Quién lo acumuló con dolor? Escribe al final: <i>"Libero estas lealtades de escasez. Me doy permiso para generar abundancia con ligereza"</i>.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            Bendición de tu Herramienta
                        </h4>
                        <p class="pl-11">Toma tu billetera o tu tarjeta bancaria en tus manos. Visualiza que es un canal de luz. Di: <i>"Gracias por circular a través de mí. Te recibo y te entrego con amor y consciencia"</i>. Siente la paz que esto genera.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '4',
        slug: 'el-padre-estructura-y-vuelo',
        title: 'El Padre: Estructura, Orden y Vuelo',
        excerpt: 'Tomar al padre es tomar la capacidad de poner límites, tener éxito en el mundo y lanzarse a lo nuevo con seguridad.',
        date: '10 de Diciembre, 2025',
        image: '/assets/images/coaching-ancestral-new.jpg',
        category: 'Ancestralidad',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCIÓN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "Mientras la Madre te da la vida, el Padre te da la fuerza para salir a conquistarla."
                </p>
                <p>
                    En el tejido de nuestra alma, la figura del padre representa la <strong>estructura, el orden y la dirección</strong>. Es el primer "otro" que nos muestra que el mundo es un lugar vasto para ser explorado. Si sientes que te cuesta poner límites, que tus proyectos se quedan a medias o que te falta la disciplina necesaria para triunfar, es probable que necesites reconciliarte con la energía de tu padre. No importa cómo haya sido él como persona; lo que importa es la fuerza arquetípica que él te entrega y que tú te permites tomar.
                </p>

                <!-- INTERÉS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">El Escudo y la Espada: La Fuerza del Hacer</h3>
                <p>
                    Tomar al padre es tomar la capacidad de decir "no" cuando es necesario y "sí" a los desafíos que nos hacen crecer. Cuando juzgamos a nuestro padre por sus ausencias o debilidades, perdemos el acceso a nuestra propia capacidad de concretar. El éxito profesional y la seguridad interna tienen la cara del padre. Al asentir a él tal como fue —ni más, ni menos—, recuperas el permiso para ser exitosa y ocupar tu lugar de autoridad en el mundo.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Volar con Raíces</h3>
                <p>
                    La verdadera madurez surge cuando dejamos de esperar que el padre sea perfecto y lo aceptamos como el hombre que nos dio la mitad de nuestra vida. Al hacerlo, te liberas de la necesidad de su aprobación constante y empiezas a actuar desde tu propio centro de poder. Estás lista para volar, sabiendo que tienes la estructura necesaria para aterrizar con seguridad y construir tu propio destino.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Taller de Estructura</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            Reclamando la Fuerza del Linaje
                        </h4>
                        <p class="pl-11">Párate derecha. Siente que detrás de tu hombro derecho está tu padre, y detrás de él, su padre. Visualiza una cadena de hombres dándote fuerza. Di: <i>"Tomo la fuerza de mi padre, de mis abuelos y de todos los hombres de mi linaje"</i>.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            El Ejercicio del Límite Sagrado
                        </h4>
                        <p class="pl-11">Extiende tus brazos frente a ti con las palmas abiertas hacia afuera. Siente que hay un muro invisible que protege tu espacio esencial. Di con firmeza: <i>"Hasta aquí. Esto es mío"</i>. Siente la fuerza que surge desde tu centro.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            Acción de Concreción
                        </h4>
                        <p class="pl-11">Elige una tarea pequeña que hayas estado posponiendo. Antes de empezar, respira e invoca la energía de disciplina del padre. Realízala sin distracciones. Al terminar, celebra tu capacidad de concretar.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '5',
        slug: 'medicina-del-cacao-sistematica',
        title: 'La Medicina del Cacao: Un Viaje Sistémico del Corazón',
        excerpt: 'Cómo los rituales ancestrales potencian el trabajo sistémico al abrir el espacio sagrado del sentir.',
        date: '05 de Diciembre, 2025',
        image: '/assets/images/tablero-sesion.png',
        category: 'Rituales',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCIÓN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El Cacao no es solo chocolate; es una planta maestra que actúa como puente directo entre el ruido de la mente y la verdad del corazón."
                </p>
                <p>
                    En el mundo de la sanación sistémica, a menudo nos enfrentamos a barreras mentales muy fuertes: el ego, el juicio y la necesidad de entenderlo todo. Aquí es donde la <strong>Medicina del Cacao</strong> entra en juego. Al ser una planta que expande el flujo sanguíneo y relaja el sistema nervioso, el cacao suavemente "suaviza" nuestras defensas, permitiéndonos sentir lo que antes solo podíamos pensar. Es una medicina de apertura que nos invita a habitar el presente con una vulnerabilidad valiente.
                </p>

                <!-- INTERÉS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Sentir para Sanar: El Espacio Sagrado</h3>
                <p>
                    A diferencia de las terapias puramente intelectuales, el ritual del cacao nos sumerge en la experiencia somática. Cuando el corazón se expande bajo el efecto nutritivo del cacao puro, los secretos sistémicos y los nudos emocionales se revelan con mayor fluidez. Es en ese espacio de silencio compartido —ya sea en círculo o en solitario— donde las frases sanadoras cobran una potencia real, porque no se dicen solo con la voz, sino con cada fibra de nuestro ser.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">La Alquimia del Encuentro</h3>
                <p>
                    Participar en un círculo de cacao o integrar esta medicina en tu práctica personal es regalarte un momento de conexión pura con tu esencia. Al unir la sabiduría sistémica con la calidez del cacao, la sanación deja de ser un proceso árido y se convierte en un viaje amoroso hacia tu propia profundidad. Es una invitación a dejar de luchar y empezar a ser.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Ritual de Apertura del Corazón</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            La Preparación de la Intención
                        </h4>
                        <p class="pl-11">Si tienes cacao puro, prepáralo con consciencia. Mientras lo bates, pon una intención: <i>"Que este cacao abra mi corazón a lo que necesito ver hoy"</i>. Siente el aroma y cómo ya empieza a cambiar tu estado.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            La Escucha del Latido
                        </h4>
                        <p class="pl-11">Toma un sorbo de cacao (o respira profundamente si no lo tienes). Pon tu mano en el pecho. Cierra los ojos y siente tu latido. Pregúntale a tu corazón: <i>"¿Qué estás sosteniendo que ya es tiempo de soltar?"</i>. Escucha sin juzgar.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            Gratitud Circular
                        </h4>
                        <p class="pl-11">Imagínate sentada en un círculo con todas las mujeres de tu familia. Pásales simbólicamente esta medicina de amor. Di: <i>"Tomo el amor que viene de ustedes y lo multiplico"</i>. Siente la calidez expandirse por todo tu cuerpo.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '6',
        slug: 'coaching-tradicional-vs-ancestral',
        title: 'Coaching Tradicional vs. Ancestral: ¿Cuál es la diferencia?',
        excerpt: 'Más allá de los objetivos y la acción, el Coaching Ancestral busca el origen sistémico de lo que te detiene.',
        date: '01 de Diciembre, 2025',
        image: '/images/blog_4k/coaching_ancestral.png',
        category: 'Metodología',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCIÓN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El coaching tradicional te dice 'hacia dónde vas'. El Coaching Ancestral te revela además 'de dónde vienes' y por qué te has detenido."
                </p>
                <p>
                    El coaching tradicional es una herramienta maravillosa para la acción y el cumplimiento de metas externas. Sin embargo, muchas veces nos encontramos con bloqueos invisibles que no se resuelven con más disciplina o mejores planes de marketing. Aquí es donde el <strong>Coaching Ancestral®</strong> marca la diferencia. Entendemos que no eres un individuo aislado, sino la punta de lanza de un sistema. Si tu sistema está mirando hacia el pasado o sosteniendo un duelo no resuelto, por más que corras hacia adelante, sentirás que una fuerza invisible te retiene.
                </p>

                <!-- INTERÉS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Mirar el Origen para Ganar Futuro</h3>
                <p>
                    En mi metodología, unimos la estructura estratégica del coaching con la profundidad de la sistémica. No solo definimos objetivos, sino que exploramos si tienes "el permiso de tu alma" para lograrlos. ¿Estás intentando tener éxito para demostrarle algo a alguien? ¿O quizás estás fracasando para ser fiel a la escasez de tus abuelos? Al desatar estos nudos ancestrales, la acción externa se vuelve fluida y natural, dejando de ser un esfuerzo agotador para convertirse en una expresión de tu propósito.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Una Visión Integral del Éxito</h3>
                <p>
                    El Coaching Ancestral® te permite integrar todas tus facetas: la profesional, la personal y la sistémica. Al sanar el "de dónde vengo", el "hacia dónde voy" se despeja. Es un viaje de regreso a tu verdadera fuerza, donde tus logros no son solo tuyos, sino una forma de honrar a las generaciones que soñaron con tu libertad.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Laboratorio Estratégico-Ancestral</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            El Análisis de la Resistencia
                        </h4>
                        <p class="pl-11">Piensa en una meta que te esté costando alcanzar. Cierra los ojos y siente qué sucede cuando te imaginas lográndola. ¿Hay culpa? ¿Hay miedo de ser diferente a tu familia? Anota esas sensaciones.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            La Entrega de lo que no es mío
                        </h4>
                        <p class="pl-11">Escribe en un papel: <i>"Lograr este objetivo no me aleja de mi familia. Mi éxito es su alegría"</i>. Pon este papel en tu lugar de trabajo como un recordatorio visual de tu propósito alineado.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            El Paso de la Autoridad
                        </h4>
                        <p class="pl-11">Siéntate en tu silla de trabajo e imagina que eres la CEO de tu propia vida. Siente el peso de tu responsabilidad y también la libertad de elegir. Haz una llamada o envía un correo que hayas estado postergando.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '7',
        slug: 'proposito-de-vida-sistemico',
        title: 'Tu Propósito de Vida: Más allá del Ego',
        excerpt: '¿Sientes que lo tienes todo pero te falta algo? El propósito no es una meta, es un lugar de servicio dentro de tu sistema.',
        date: '25 de Noviembre, 2025',
        image: '/images/blog_4k/purpose_of_life.png',
        category: 'Evolución',
        author: 'Yelitzé Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCIÓN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El propósito de vida no es una meta que debes alcanzar, sino un lugar de servicio que ya está disponible para ti."
                </p>
                <p>
                    Muchas personas pasan su vida buscando "su propósito" como si fuera un tesoro escondido o un título profesional. Sin embargo, desde la mirada sistémica, el propósito es un movimiento natural que surge cuando ocupas tu <strong>lugar correcto</strong> en el sistema y permites que la Vida fluya a través de ti hacia algo más grande. Si no estás en paz con tu origen o si estás intentando ser "más" que tus padres, tu búsqueda de propósito será siempre una huida en lugar de un encuentro.
                </p>

                <!-- INTERÉS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">El Servicio a la Vida</h3>
                <p>
                    Tu propósito ya está en ti; es la culminación de los sueños, talentos y también de las superaciones de todos tus ancestros. Eres el resultado de miles de vidas que lucharon para que hoy tú estés aquí. Poner tus talentos al servicio de los demás no es solo una elección profesional, es el mayor acto de agradecimiento hacia tu linaje. Cuando dejas de preguntar "¿Qué puedo ganar yo?" y empiezas a preguntar "¿Cómo puedo servir mejor?", la vida misma empieza a abrirte las puertas.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Vivir con Sentido</h3>
                <p>
                    Vivir alineada con tu propósito te da una fuerza inquebrantable. Ya no te agota el trabajo, porque no lo haces por ego, sino por resonancia. Descubrir que tus talentos son herramientas de sanación —no solo para ti, sino para el mundo— le da un sentido sagrado a cada una de tus acciones. Es el momento de dejar de buscar fuera y empezar a dar desde dentro.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Laboratorio de Propósito</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            El Don Heredado
                        </h4>
                        <p class="pl-11">Haz una lista de 3 talentos que tengas (ej. comunicar, organizar, cuidar). Pregúntate: ¿Quién en mi familia tenía este don pero no pudo usarlo plenamente? Pon ese talento al servicio en su honor.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            La Mirada al Mundo
                        </h4>
                        <p class="pl-11">Cierra los ojos e imagina que tienes a toda la humanidad frente a ti. ¿Qué grupo de personas te "duele" más o te genera más ganas de ayudar? Ahí es donde tu propósito quiere expresarse.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            Afirmación de Servicio
                        </h4>
                        <p class="pl-11">Cada mañana, antes de empezar tu día, di: <i>"Vida, úsame como un instrumento para el bien mayor. Estoy disponible en mi lugar"</i>. Observa cómo cambia la energía de tus reuniones y tareas.</p>
                    </div>
                </div>
            </div>
        `
    }
];

export function getPostBySlug(slug: string) {
    return BLOG_POSTS.find(post => post.slug === slug);
}
