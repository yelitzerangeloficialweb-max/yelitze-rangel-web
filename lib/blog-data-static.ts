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
        title: 'Lib├⌐rate de tus Patrones: La Ciencia de la Decisi├│n',
        excerpt: '┬┐Por qu├⌐ sentimos que estamos "cableados" para el autosabotaje? Entiende c├│mo tu cerebro y tu sistema familiar trabajan juntos y c├│mo empezar a elegir diferente.',
        date: '24 de Enero, 2026',
        image: '/images/home_redesign/blog/Liberate_de_tus_patrones.png',
        category: 'Mentalidad',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCI├ôN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "┬┐Alguna vez has sentido que, sin importar cu├ínto te esfuerces por cambiar, terminas tropezando con la misma piedra, en el mismo lugar y con la misma intensidad?"
                </p>
                <p>
                    Esa sensaci├│n de estar en un "bucle" infinito no es mala suerte, ni falta de voluntad. Es, en realidad, el resultado de un sistema operativo biol├│gico y ancestral que se ejecuta en segundo plano. Nuestros patrones de comportamiento no son fallos de f├íbrica; son <strong>estrategias de supervivencia</strong> que un d├¡a aprendimos para pertenecer a nuestro sistema familiar. Sin embargo, lo que antes nos protegi├│ del dolor o la exclusi├│n, hoy puede ser la jaula que nos impide crecer.
                </p>

                <!-- INTER├ëS: LA CIENCIA -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">La Ciencia de la Decisi├│n: Tus Autopistas Mentales</h3>
                <p>
                    La neurociencia moderna nos ha revelado una verdad liberadora: el cerebro es pl├ístico, pero tambi├⌐n es perezoso. Para ahorrar energ├¡a, crea lo que llamamos "autopistas neuronales". Si durante a├▒os has reaccionado desde el miedo, la carencia o la complacencia, tu cerebro ha pavimentado una autopista de seis carriles hacia esa respuesta. 
                </p>
                <p>
                    Cuando te enfrentas a una decisi├│n importante ΓÇöya sea en el amor, el dinero o el ├⌐xitoΓÇö tu mente no elige el camino m├ís sano, sino el m├ís transitado. Es por eso que, aunque conscientemente quieras abundancia, tu sistema nervioso puede sentirse "seguro" en la escasez, simplemente porque es lo que conoce.
                </p>

                <!-- INTER├ëS: LO SIST├ëMICO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Lealtades Invisibles: El Peso que no te Pertenece</h3>
                <p>
                    Desde la mirada de la <strong>Sanaci├│n Sist├⌐mica</strong>, entendemos que no caminamos solos. Detr├ís de nosotros hay miles de destinos. A veces, repetimos un patr├│n de fracaso o de soledad no por incapacidad, sino por una lealtad inconsciente: "Yo, como t├║, querido abuelo, tampoco logro prosperar, para as├¡ seguir perteneciendo a nuestro clan". 
                </p>
                <div class="my-12 p-10 bg-[#fafcfe] rounded-3xl border border-stone-100 italic text-xl text-[var(--color-primary)] text-center shadow-sm">
                    "No est├ís roto, solo est├ís siendo leal a una historia que ya no necesitas cargar."
                </div>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Del Amor Ciego al Amor Consciente</h3>
                <p>
                    Liberarse de los patrones requiere consciencia, pero sobre todo, requiere <strong>el permiso interno</strong> para ser diferente a quienes vinieron antes. El deseo de libertad comienza cuando comprendes que honrar a tus ancestros no significa repetir sus dolores, sino florecer all├¡ donde ellos solo pudieron sobrevivir.
                </p>
                <p>
                    Imagina por un momento c├│mo ser├¡a tu vida si pudieras entrar en una habitaci├│n y tomar una decisi├│n basada en tus deseos actuales, sin el susurro del miedo heredado. Esa es la verdadera soberan├¡a biol├│gica. Es el estado donde el cuerpo y el alma se alinean para decir "s├¡" a la vida, sin condiciones.
                </p>

                <!-- ACCI├ôN Y EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Laboratorio de Transformaci├│n</h2>
                    <p class="text-center font-medium italic">T├│mate 15 minutos para realizar estos ejercicios. No leas solo con la mente, permite que tu cuerpo experimente el cambio.</p>

                    <!-- EJERCICIO 1 -->
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            Mapeo de la Repetici├│n (Journaling)
                        </h4>
                        <p class="pl-11">Identifica una situaci├│n que se repite constantemente en tu vida. Escr├¡bela. Ahora, preg├║ntate: ┬┐A qui├⌐n de mi familia le pas├│ algo similar? Identifica el rostro o la historia. Al ponerle nombre, el patr├│n pierde su poder oculto.</p>
                    </div>

                    <!-- EJERCICIO 2 -->
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            El Ritual de la Silla de las Lealtades
                        </h4>
                        <p class="pl-11">Coloca una silla frente a ti e imagina que en ella est├í sentado el ancestro que vivi├│ ese patr├│n. M├¡ralo con amor y dile internamente: <i>"Veo tu dolor, veo tu destino. Te honro dej├índote tu carga a ti, y d├índome el permiso de hacerlo diferente en tu honor"</i>. Observa qu├⌐ pasa en tu respiraci├│n.</p>
                    </div>

                    <!-- EJERCICIO 3 -->
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            Anclaje Som├ítico del Nuevo Camino
                        </h4>
                        <p class="pl-11 text-stone-600">Ponte de pie. Cierra los ojos y siente el peso de tus pies en la tierra. Imagina que frente a ti hay un camino nuevo, nunca antes transitado por tu linaje. Da un paso f├¡sico hacia adelante y registra la sensaci├│n de "novedad". Ese paso es tu declaraci├│n de libertad.</p>
                    </div>
                </div>

                <p class="mt-16 text-center text-xl font-heading text-[var(--color-primary)]">
                    Primero sana el cuerpoΓÇª y luego cambia la historia.
                </p>
                <p class="text-center italic pb-12">ΓÇö Yelitze Rangel</p>
            </div>
        `
    },
    {
        id: '9',
        slug: 'transforma-tu-miedo-en-exito',
        title: 'Transforma tu Miedo en ├ëxito: El Salto de la Valiente',
        excerpt: 'El miedo no es una se├▒al de que debas detenerte, sino el combustible que necesitas para el siguiente nivel de tu evoluci├│n.',
        date: '24 de Enero, 2026',
        image: '/images/blog_4k/fear_to_success.png',
        category: 'Empoderamiento',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCI├ôN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El miedo no es una se├▒al para detenerse, sino el motor de arranque hacia tu siguiente nivel de evoluci├│n."
                </p>
                <p>
                    El miedo suele ser la sombra de nuestro potencial m├ís brillante. Cuando estamos ante un gran cambio o un nuevo desaf├¡o, es natural que las alarmas internas se enciendan. Sin embargo, la mayor├¡a de nosotros interpretamos esa descarga de adrenalina como un peligro, cuando en realidad es <strong>combustible puro</strong> listo para ser utilizado. El secreto de las personas "valientes" no es la ausencia de miedo, sino su capacidad para caminar de la mano con ├⌐l.
                </p>

                <!-- INTER├ëS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">La Br├║jula Biol├│gica: ┬┐Por qu├⌐ tenemos miedo?</h3>
                <p>
                    Desde una perspectiva biol├│gica, el miedo es una herramienta de regulaci├│n. El problema surge cuando ese miedo se queda "atrapado" en el cuerpo bajo la forma de par├ílisis. Pero hay un miedo m├ís profundo: el miedo a la <strong>exclusi├│n</strong>. Inconscientemente pensamos: "Si soy muy exitosa, si gano m├ís que mis padres, si vuelo m├ís alto que mis hermanos... ┬┐seguir├⌐ perteneciendo?".
                </p>
                <p>
                    Entender esto nos permite darnos el permiso sist├⌐mico para brillar. Cuando comprendes que tu ├⌐xito no es una traici├│n a tus ra├¡ces, sino un regalo para todo tu linaje, el miedo se transforma en una fuerza de empuje imparable.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Reclamando tu Poder</h3>
                <p>
                    Cada vez que eliges atravesar el miedo, est├ís reclamando una parte de tu poder que estaba dormida. El ├⌐xito consciente es el resultado de haber integrado tu sombra y haber decidido, con todo y miedo, que tu prop├│sito es mayor que tu comodidad actual. 
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Ejercicios de Expansi├│n</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            Localizaci├│n del Miedo (Soma)
                        </h4>
                        <p class="pl-11">Piensa en un proyecto que te d├⌐ miedo. Cierra los ojos y localiza d├│nde lo sientes en el cuerpo (pecho, garganta, est├│mago). Pon tu mano en ese lugar y respira profundamente, d├índole permiso a esa sensaci├│n de estar ah├¡ sin intentar quitarla.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            La Venia a los que no pudieron
                        </h4>
                        <p class="pl-11">Imagina a tus ancestros frente a ti. Haz una peque├▒a inclinaci├│n y diles: <i>"Sus destinos fueron dif├¡ciles y los honro. Ahora yo me permito tener ├⌐xito para que su esfuerzo haya valido la pena"</i>. Siente la fuerza del linaje a tus espaldas.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            El Paso del S├¡
                        </h4>
                        <p class="pl-11">Pon m├║sica que te empodere. Visualiza tu meta al final de la habitaci├│n. Camina hacia ella lentamente, sintiendo que cada paso dejas atr├ís la necesidad de permiso externo. Al llegar, exhala fuerte un "S├ì".</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '10',
        slug: 'tu-energia-tu-destino',
        title: 'Tu Energ├¡a, tu Destino: La Alquimia del Ser',
        excerpt: 'No atraes lo que quieres, atraes lo que eres. Descubre c├│mo tu campo vibratorio moldea las experiencias que llegan a tu vida.',
        date: '24 de Enero, 2026',
        image: '/images/blog_4k/energy_destiny.png',
        category: 'Espiritualidad',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCI├ôN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "No atraes lo que quieres, atraes lo que eres. Tu campo vibratorio es el im├ín de tus experiencias."
                </p>
                <p>
                    Vivimos en un universo de frecuencias invisibles pero tangibles. Todo lo que piensas, sientes y sostienes en tu interior emite una vibraci├│n que resuena con el mundo exterior. Tu destino no es algo est├ítico escrito por un tercero; es un lienzo que se pinta cada d├¡a con el color de tu estado interno. Si tu energ├¡a est├í anclada en la queja o en deudas emocionales, el universo simplemente te devolver├í m├ís "puntos de resonancia" de ese mismo tipo.
                </p>

                <!-- INTER├ëS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">La F├¡sica de la Abundancia</h3>
                <p>
                    Para cambiar tu destino, primero debes cambiar tu frecuencia. La alquimia personal consiste en transformar el "plomo" emocional de resentimientos y juicios en el "oro" de la gratitud y la presencia. Cuando limpias tu campo energ├⌐tico de las lealtades que te mantienen atado a la escasez, las oportunidades comienzan a aparecer de forma sincr├│nica. No es magia, es <strong>alineaci├│n coherente</strong> entre tu deseo y tu vibraci├│n.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Convirti├⌐ndote en el Arquitecto</h3>
                <p>
                    Imagina ser capaz de sostener una frecuencia de paz incluso en medio del caos. Ese es el poder de la Alquimia del Ser. Al liberar las cargas densas de tu historia personal y familiar, permites que tu luz esencial brille sin obstrucciones. Eres el arquitecto de tu propia realidad energ├⌐tica, y es momento de empezar a construir desde la alta vibraci├│n.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">C├ímara Alqu├¡mica</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            Limpieza de Resonancia
                        </h4>
                        <p class="pl-11">Haz una lista de 3 personas o situaciones que te "drenen" energ├¡a. Preg├║ntate: ┬┐Qu├⌐ aspecto de m├¡ resuena con esto? Al reconocer tu parte, retiras el hilo energ├⌐tico y recuperas tu poder personal.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            Activaci├│n del Coraz├│n (Toroides)
                        </h4>
                        <p class="pl-11">Coloca tus manos en el coraz├│n. Respira imaginando que un campo de luz se expande desde tu pecho en forma de toroide hacia afuera. Siente c├│mo esta vibraci├│n armoniza todo lo que te rodea.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            Afirmaci├│n de Frecuencia
                        </h4>
                        <p class="pl-11">Repite durante 3 minutos frente al espejo: <i>"Yo soy la fuente de mi propia abundancia. Mi frecuencia atrae bendiciones en sinton├¡a con mi prop├│sito"</i>. Nota c├│mo cambia tu postura corporal al final.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '11',
        slug: 'clave-del-exito-sistemica',
        title: 'La Clave del ├ëxito: Una Mirada Sist├⌐mica',
        excerpt: 'Desde las figuras de los ancestros hasta la toma del lugar correcto: el ├⌐xito tiene reglas que van m├ís all├í del esfuerzo personal.',
        date: '24 de Enero, 2026',
        image: '/images/blog_4k/success_systemic.png',
        category: 'Sabidur├¡a Ancestral',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCI├ôN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El ├⌐xito tiene cara de madre y fuerza de padre. Si est├ís peleado con tus ra├¡ces, estar├ís peleado con tus resultados."
                </p>
                <p>
                    A menudo buscamos el ├⌐xito ├║nicamente en estrategias externas, cursos de marketing o redes de contactos profesionales. Sin embargo, en el mundo sist├⌐mico, el ├⌐xito profesional no es una meta, sino una consecuencia de estar en el lugar correcto dentro de tu sistema familiar. Cuando intentamos "salvar" a nuestros ancestros o cargar con sus frustraciones, perdemos la vitalidad necesaria para construir lo propio. El ├⌐xito requiere que estemos de espaldas a los ancestros (tomando su fuerza) y de frente a nuestra propia vida.
                </p>

                <!-- INTER├ëS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Ocupar el Lugar del Peque├▒o</h3>
                <p>
                    Una de las reglas de oro del ├⌐xito es la <strong>humildad sist├⌐mica</strong>. Solo cuando ocupamos nuestro lugar de "hijos" frente a nuestros padres podemos ser "grandes" frente a nuestras metas. Al juzgar lo que ellos hicieron o dejaron de hacer, nos convertimos en "padres de nuestros padres", agotando nuestra energ├¡a creativa en una batalla que no podemos ganar. Tomar a los padres tal como son es abrir la fuente de la nutrici├│n (madre) y de la estructura (padre) en nuestra carrera.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">La Recompensas del Orden</h3>
                <p>
                    El ├⌐xito aut├⌐ntico ΓÇöese que viene acompa├▒ado de paz interna y no solo de n├║merosΓÇö llega cuando dejas de luchar contra tu historia. Al asentir a todo lo que fue, liberas tu energ├¡a para estar disponible para tus clientes, tus proyectos y tu prosperidad. El ├⌐xito nos sonr├¡e cuando nosotros le sonre├¡mos a nuestro origen.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Laboratorio de Orden</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            El Retrato de mis Ra├¡ces
                        </h4>
                        <p class="pl-11">Busca una foto de tus padres. M├¡rala sin juicios. Di en voz alta: <i>"Ustedes son los grandes, yo soy la peque├▒a. Gracias por la vida"</i>. Siente c├│mo se libera la tensi├│n en tus hombros.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            Honra a tus Maestros Inconscientes
                        </h4>
                        <p class="pl-11">Haz una lista de tus 3 "fracasos" m├ís grandes. Debajo de cada uno escribe: <i>"Gracias por la lecci├│n, la honro y ahora elijo un camino de ├⌐xito en su lugar"</i>. Quema el papel simb├│licamente.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            La Llamada del ├ëxito
                        </h4>
                        <p class="pl-11">Cierra los ojos e imagina al ├ëxito personificado frente a ti. ┬┐Tiene la cara de alguien? Si es la de un padre, p├¡dele permiso para ser feliz. Si tiene tu propia cara, abraza esa versi├│n futura de ti.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '12',
        slug: 'tu-cuerpo-tiene-la-clave',
        title: '┬íTu Cuerpo tiene la Clave! Escuchando lo Invisible',
        excerpt: 'El cuerpo no miente. Cada s├¡ntoma, tensi├│n o cansancio es un mensaje del alma tratando de ser escuchado.',
        date: '24 de Enero, 2026',
        image: '/images/blog_4k/body_clue.png',
        category: 'Consciencia Corporal',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCI├ôN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El cuerpo es el mapa donde el alma escribe su historia. Lo que no se expresa con palabras, el s├¡ntoma lo grita."
                </p>
                <p>
                    Nuestro cuerpo es el receptor m├ís sensible y preciso de nuestra historia no resuelta. Cada dolor de cabeza cr├│nico, cada tensi├│n en los hombros o ese cansancio sist├⌐mico que no se quita durmiendo, es en realidad un mensaje tratando de ser escuchado. A menudo, el s├¡ntoma no es el problema, sino la <strong>soluci├│n biol├│gica</strong> que tu sistema ha encontrado para una emoci├│n o una lealtad que no has podido procesar conscientemente.
                </p>

                <!-- INTER├ëS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">El Idioma de la Biolog├¡a</h3>
                <p>
                    Aprender a descodificar el lenguaje del cuerpo es la herramienta de sanaci├│n m├ís poderosa que existe. Cuando sentimos un nudo en la garganta o una opresi├│n en el pecho, en lugar de intentar "anestesiar" la sensaci├│n con medicamentos o distracciones, debemos aprender a preguntarle: "┬┐A qui├⌐n le pertenece este peso? ┬┐Qu├⌐ se qued├│ sin decir?". Muchas veces, el s├¡ntoma es un "representante" de un ancestro excluido o de una vivencia traum├ítica que pide ser vista y honrada.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Habitar tu Santuario</h3>
                <p>
                    Escuchar a tu cuerpo te devuelve la soberan├¡a sobre tu salud y tu bienestar. Al integrar los mensajes que tus ├│rganos y m├║sculos te est├ín enviando, dejas de luchar contra ti misma y comienzas a colaborar con tu biolog├¡a. Tu cuerpo es tu santuario y tu mejor gu├¡a hacia la libertad emocional. Es momento de dejar de ignorarlo y empezar a dialogar con ├⌐l.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Escuela de Escucha Corporal</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            Di├ílogo con el S├¡ntoma
                        </h4>
                        <p class="pl-11">Identifica una molestia f├¡sica actual. Cierra los ojos y visualiza que esa molestia tiene una forma o un color. Preg├║ntale: <i>"┬┐Para qu├⌐ est├ís aqu├¡? ┬┐Qu├⌐ quieres que vea?"</i>. Anota lo primero que te venga a la mente.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            Barrido de Tensiones Heredadas
                        </h4>
                        <p class="pl-11">Sentada c├│modamente, recorre tu cuerpo de pies a cabeza. Al encontrar una tensi├│n, imagina que es un hilo que viene de atr├ís. Corta el hilo imaginariamente y di: <i>"Esto te lo devuelvo con amor, ya no necesito cargarlo por ti"</i>.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            La Pausa Sagrada (Voz del Cuerpo)
                        </h4>
                        <p class="pl-11">Durante un minuto, qu├⌐date en silencio total y solo observa los latidos de tu coraz├│n. Siente el milagro del orden biol├│gico que te sostiene sin que tengas que hacer nada. Agradece a tus c├⌐lulas su labor incansable.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '1',
        slug: 'sanar-heridas-infancia',
        title: '┬┐Por qu├⌐ repetimos patrones? Sanando las Heridas de la Infancia',
        excerpt: 'Descubre c├│mo las experiencias no resueltas de tu ni├▒ez moldean tus relaciones actuales y aprende el primer paso para liberarte.',
        date: '28 de Diciembre, 2025',
        image: '/images/blog_4k/childhood_wounds.png',
        category: 'Sanaci├│n Interior',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCI├ôN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "T├║ no eliges a tu pareja, la elige tu herida de la infancia."
                </p>
                <p>
                    Muchas veces nos preguntamos por qu├⌐ siempre terminamos con el mismo tipo de personas o por qu├⌐ ciertas situaciones cotidianas nos detonan una reacci├│n de rabia o tristeza desproporcionada. La respuesta no est├í en tu presente, sino en tu historia temprana. Lo que vivimos en los primeros siete a├▒os de vida configura el "parpado" a trav├⌐s del cual vemos el mundo. Si ese parpado est├í marcado por el dolor, seguiremos proyectando ese mismo dolor en nuestras relaciones adultas.
                </p>

                <!-- INTER├ëS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Las 5 M├íscaras del Alma</h3>
                <p>
                    Lise Bourbeau identific├│ cinco heridas fundamentales que todos, en menor o mayor medida, cargamos: <strong>Rechazo, Abandono, Humillaci├│n, Traici├│n e Injusticia</strong>. Para protegernos del dolor de estas heridas, nos ponemos "m├íscaras" (el huidizo, el dependiente, el masoquista, el controlador, el r├¡gido). El problema es que esas m├íscaras terminan alej├índonos de nuestra verdadera esencia y del amor real.
                </p>
                <p>
                    Sanar no significa olvidar lo que pas├│, sino mirar a ese ni├▒o interior con la compasi├│n y la fuerza del adulto que eres hoy. Es decirle: "Ahora yo me hago cargo de ti, ya no necesitas buscar a mam├í o a pap├í en tu pareja".
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">El Regreso a Casa</h3>
                <p>
                    Imagina vivir sin la necesidad constante de aprobaci├│n, o sin el miedo paralizante a ser abandonada. Ese es el regalo de sanar las heridas de la infancia. Al validar tu propio dolor y ocupar tu lugar de adulto, el ciclo de repetici├│n se rompe y permites que surja una versi├│n de ti m├ís libre, aut├⌐ntica y capaz de amar sanamente.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Terapia del Coraz├│n</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            La Carta al Ni├▒o que Fuiste
                        </h4>
                        <p class="pl-11">Escribe una carta a tu "yo" de 5 a├▒os. Dile todo lo que necesitaba escuchar en ese momento: <i>"Te veo, eres valioso, no fue tu culpa"</i>. Lee la carta en voz alta y permite que las emociones fluyan.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            Identificaci├│n de la M├íscara
                        </h4>
                        <p class="pl-11">Observa tu ├║ltima gran discusi├│n. ┬┐C├│mo reaccionaste? ┬┐Huyendo, controlando, atacando? Identifica la m├íscara y dile internamente: <i>"Gracias por protegerme antes, pero ahora yo puedo manejar esto desde mi adulta"</i>.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            El Abrazo Som├ítico
                        </h4>
                        <p class="pl-11">Cruza tus brazos sobre tu pecho, d├índote un abrazo firme. Imagina que est├ís abrazando a ese peque├▒o que sinti├│ miedo. Respira hacia el contacto y siente c├│mo tu cuerpo se calma al ser sostenido por ti misma.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '2',
        slug: 'enfoque-sistemico-amor',
        title: 'El Amor Ciego vs. El Amor Consciente',
        excerpt: 'La mirada sist├⌐mica nos ense├▒a que a veces sufrimos por lealtad a nuestros ancestros. ┬┐C├│mo podemos amar con los ojos abiertos?',
        date: '20 de Diciembre, 2025',
        image: '/images/blog_4k/blind_love.png',
        category: 'Relaciones',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCI├ôN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El amor ciego dice: 'Yo sufro como t├║ para pertenecer'. El amor consciente dice: 'Te honro siendo feliz'."
                </p>
                <p>
                    La Sanaci├│n Sist├⌐mica nos revela una paradoja dolorosa: a menudo sufrimos por un exceso de amor. Pero es un <strong>amor ciego</strong>, una lealtad infantil que nos lleva a repetir los destinos dif├¡ciles de nuestros padres o abuelos como una forma de decir "somos iguales". Este tipo de amor no sana, solo perpet├║a el dolor a trav├⌐s de las generaciones. El verdadero desaf├¡o es transitar hacia un amor consciente que sea capaz de mirar el pasado con respeto y, aun as├¡, elegir un camino de plenitud.
                </p>

                <!-- INTER├ëS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">La Fuerza de la Diferenciaci├│n</h3>
                <p>
                    Sanar en el amor implica romper con las tragedias familiares. No es falta de lealtad prosperar cuando otros no pudieron; es el mayor acto de honra. Cuando eres capaz de mirar a tu pareja como un individuo y no como un representante de tu padre o de tu madre, la relaci├│n tiene espacio para respirar. El amor consciente no carga maletas ajenas; celebra su propia libertad y desde ah├¡ construye un nosotros real.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Relaciones que Nutren</h3>
                <p>
                    Aprender a amar con los ojos abiertos te permite construir v├¡nculos basados en la realidad y no en la proyecci├│n. Al ocupar tu lugar de "hija" frente a tus padres, dejas de pedirle a tu pareja que te rescate o que te complete. El resultado es una relaci├│n m├ís ligera, m├ís presente y mucho m├ís gozosa.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">C├¡rculo de Consci├⌐ncia</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            El Espejo de las Proyecciones
                        </h4>
                        <p class="pl-11">Cuando te sientas irritada con tu pareja, preg├║ntate: ┬┐Qu├⌐ tono de voz estoy escuchando? ┬┐Me recuerda a mi padre o a mi madre? Al identificarlo, respira y di: <i>"Esa es mi historia, no eres t├║"</i>.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            La Frase Sanadora
                        </h4>
                        <p class="pl-11">Imagina a tus ancestros detr├ís de ti. Mira a tu pareja y dile: <i>"Tengo a los m├¡os conmigo, t├║ tienes a los tuyos. Nos miramos nosotros dos"</i>. Siente c├│mo la relaci├│n se vuelve m├ís presente y liviana.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            Anclaje del Aqu├¡ y Ahora
                        </h4>
                        <p class="pl-11">Toma las manos de tu pareja (o imagina que lo haces). M├¡ralo a los ojos y di su nombre. Reconoce su singularidad, fuera de los dramas de tu ├írbol geneal├│gico. Disfruta de ese instante de conexi├│n pura.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '3',
        slug: 'energia-del-dinero',
        title: 'El Dinero es Energ├¡a: Desbloquea tu Abundancia',
        excerpt: 'Tu cuenta bancaria es un reflejo de tu energ├¡a vital. Analizamos los bloqueos sist├⌐micos m├ís comunes que impiden el flujo del dinero.',
        date: '15 de Diciembre, 2025',
        image: '/images/blog_4k/money_mother.png',
        category: 'Abundancia',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCI├ôN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El dinero es una energ├¡a sist├⌐mica. En el enfoque sist├⌐mico, el dinero tiene la cara de la Madre."
                </p>
                <p>
                    Nuestra cuenta bancaria y nuestra capacidad de generar abundancia son, a menudo, un reflejo directo de nuestra relaci├│n con la vida y, espec├¡ficamente, con nuestra <strong>Madre</strong>. Ella fue nuestra primera fuente de alimento y sustento. Si hay rechazo, juicio o deuda emocional con ella, el dinero fluir├í con dificultad en nuestra vida adulta. El dinero no es solo papel o n├║meros; es una energ├¡a viva que responde a nuestra capacidad de "tomar" lo que la vida nos ofrece.
                </p>

                <!-- INTER├ëS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Limpiando el Cristal de la Abundancia</h3>
                <p>
                    A nivel inconsciente, muchas de nuestras carencias vienen de creencias limitantes heredadas: "El dinero corrompe", "No merezco tener m├ís que mis padres", "Si tengo dinero, me ver├ín como alguien malo". Estas lealtades act├║an como frenos invisibles. Sanar la relaci├│n con la abundancia implica limpiar esos cristales y darnos el permiso adulto para prosperar, sabiendo que el dinero en manos de una persona consciente es una herramienta de sanaci├│n y expansi├│n.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Fluyendo con la Prosperidad</h3>
                <p>
                    Imagina que el dinero es un amigo que quiere visitarte. ┬┐C├│mo lo recibes? ┬┐Con miedo, con culpa, con ansiedad? Cambiar tu estado interno frente a la prosperidad abre las puertas para que ├⌐sta llegue de forma sincr├│nica. Cuando te alineas con la gratitud por lo que ya tienes y tomas la fuerza de tu linaje materno, el flujo de la vida y del dinero comienza a normalizarse.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Ritual de Apertura Econ├│mica</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            Sanando el V├¡nculo con la Nutrici├│n
                        </h4>
                        <p class="pl-11">Cierra los ojos e imagina a tu madre frente a ti. Dale las gracias por haberte dado la vida, el mayor de todos los tesoros. Dile: <i>"Tomo lo que me diste y lo hago valer"</i>. Nota c├│mo se siente tu est├│mago despu├⌐s de esto.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            El ├ürbol del Dinero
                        </h4>
                        <p class="pl-11">Dibuja tu ├írbol geneal├│gico enfocado en el dinero. ┬┐Qui├⌐n perdi├│ dinero? ┬┐Qui├⌐n lo acumul├│ con dolor? Escribe al final: <i>"Libero estas lealtades de escasez. Me doy permiso para generar abundancia con ligereza"</i>.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            Bendici├│n de tu Herramienta
                        </h4>
                        <p class="pl-11">Toma tu billetera o tu tarjeta bancaria en tus manos. Visualiza que es un canal de luz. Di: <i>"Gracias por circular a trav├⌐s de m├¡. Te recibo y te entrego con amor y consciencia"</i>. Siente la paz que esto genera.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '4',
        slug: 'el-padre-estructura-y-vuelo',
        title: 'El Padre: Estructura, Orden y Vuelo',
        excerpt: 'Tomar al padre es tomar la capacidad de poner l├¡mites, tener ├⌐xito en el mundo y lanzarse a lo nuevo con seguridad.',
        date: '10 de Diciembre, 2025',
        image: '/assets/images/coaching-ancestral-new.jpg',
        category: 'Ancestralidad',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCI├ôN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "Mientras la Madre te da la vida, el Padre te da la fuerza para salir a conquistarla."
                </p>
                <p>
                    En el tejido de nuestra alma, la figura del padre representa la <strong>estructura, el orden y la direcci├│n</strong>. Es el primer "otro" que nos muestra que el mundo es un lugar vasto para ser explorado. Si sientes que te cuesta poner l├¡mites, que tus proyectos se quedan a medias o que te falta la disciplina necesaria para triunfar, es probable que necesites reconciliarte con la energ├¡a de tu padre. No importa c├│mo haya sido ├⌐l como persona; lo que importa es la fuerza arquet├¡pica que ├⌐l te entrega y que t├║ te permites tomar.
                </p>

                <!-- INTER├ëS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">El Escudo y la Espada: La Fuerza del Hacer</h3>
                <p>
                    Tomar al padre es tomar la capacidad de decir "no" cuando es necesario y "s├¡" a los desaf├¡os que nos hacen crecer. Cuando juzgamos a nuestro padre por sus ausencias o debilidades, perdemos el acceso a nuestra propia capacidad de concretar. El ├⌐xito profesional y la seguridad interna tienen la cara del padre. Al asentir a ├⌐l tal como fue ΓÇöni m├ís, ni menosΓÇö, recuperas el permiso para ser exitosa y ocupar tu lugar de autoridad en el mundo.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Volar con Ra├¡ces</h3>
                <p>
                    La verdadera madurez surge cuando dejamos de esperar que el padre sea perfecto y lo aceptamos como el hombre que nos dio la mitad de nuestra vida. Al hacerlo, te liberas de la necesidad de su aprobaci├│n constante y empiezas a actuar desde tu propio centro de poder. Est├ís lista para volar, sabiendo que tienes la estructura necesaria para aterrizar con seguridad y construir tu propio destino.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Taller de Estructura</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            Reclamando la Fuerza del Linaje
                        </h4>
                        <p class="pl-11">P├írate derecha. Siente que detr├ís de tu hombro derecho est├í tu padre, y detr├ís de ├⌐l, su padre. Visualiza una cadena de hombres d├índote fuerza. Di: <i>"Tomo la fuerza de mi padre, de mis abuelos y de todos los hombres de mi linaje"</i>.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            El Ejercicio del L├¡mite Sagrado
                        </h4>
                        <p class="pl-11">Extiende tus brazos frente a ti con las palmas abiertas hacia afuera. Siente que hay un muro invisible que protege tu espacio esencial. Di con firmeza: <i>"Hasta aqu├¡. Esto es m├¡o"</i>. Siente la fuerza que surge desde tu centro.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            Acci├│n de Concreci├│n
                        </h4>
                        <p class="pl-11">Elige una tarea peque├▒a que hayas estado posponiendo. Antes de empezar, respira e invoca la energ├¡a de disciplina del padre. Real├¡zala sin distracciones. Al terminar, celebra tu capacidad de concretar.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '5',
        slug: 'medicina-del-cacao-sistematica',
        title: 'La Medicina del Cacao: Un Viaje Sist├⌐mico del Coraz├│n',
        excerpt: 'C├│mo los rituales ancestrales potencian el trabajo sist├⌐mico al abrir el espacio sagrado del sentir.',
        date: '05 de Diciembre, 2025',
        image: '/assets/images/tablero-sesion.png',
        category: 'Rituales',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCI├ôN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El Cacao no es solo chocolate; es una planta maestra que act├║a como puente directo entre el ruido de la mente y la verdad del coraz├│n."
                </p>
                <p>
                    En el mundo de la sanaci├│n sist├⌐mica, a menudo nos enfrentamos a barreras mentales muy fuertes: el ego, el juicio y la necesidad de entenderlo todo. Aqu├¡ es donde la <strong>Medicina del Cacao</strong> entra en juego. Al ser una planta que expande el flujo sangu├¡neo y relaja el sistema nervioso, el cacao suavemente "suaviza" nuestras defensas, permiti├⌐ndonos sentir lo que antes solo pod├¡amos pensar. Es una medicina de apertura que nos invita a habitar el presente con una vulnerabilidad valiente.
                </p>

                <!-- INTER├ëS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Sentir para Sanar: El Espacio Sagrado</h3>
                <p>
                    A diferencia de las terapias puramente intelectuales, el ritual del cacao nos sumerge en la experiencia som├ítica. Cuando el coraz├│n se expande bajo el efecto nutritivo del cacao puro, los secretos sist├⌐micos y los nudos emocionales se revelan con mayor fluidez. Es en ese espacio de silencio compartido ΓÇöya sea en c├¡rculo o en solitarioΓÇö donde las frases sanadoras cobran una potencia real, porque no se dicen solo con la voz, sino con cada fibra de nuestro ser.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">La Alquimia del Encuentro</h3>
                <p>
                    Participar en un c├¡rculo de cacao o integrar esta medicina en tu pr├íctica personal es regalarte un momento de conexi├│n pura con tu esencia. Al unir la sabidur├¡a sist├⌐mica con la calidez del cacao, la sanaci├│n deja de ser un proceso ├írido y se convierte en un viaje amoroso hacia tu propia profundidad. Es una invitaci├│n a dejar de luchar y empezar a ser.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Ritual de Apertura del Coraz├│n</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            La Preparaci├│n de la Intenci├│n
                        </h4>
                        <p class="pl-11">Si tienes cacao puro, prep├íralo con consciencia. Mientras lo bates, pon una intenci├│n: <i>"Que este cacao abra mi coraz├│n a lo que necesito ver hoy"</i>. Siente el aroma y c├│mo ya empieza a cambiar tu estado.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            La Escucha del Latido
                        </h4>
                        <p class="pl-11">Toma un sorbo de cacao (o respira profundamente si no lo tienes). Pon tu mano en el pecho. Cierra los ojos y siente tu latido. Preg├║ntale a tu coraz├│n: <i>"┬┐Qu├⌐ est├ís sosteniendo que ya es tiempo de soltar?"</i>. Escucha sin juzgar.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            Gratitud Circular
                        </h4>
                        <p class="pl-11">Imag├¡nate sentada en un c├¡rculo con todas las mujeres de tu familia. P├ísales simb├│licamente esta medicina de amor. Di: <i>"Tomo el amor que viene de ustedes y lo multiplico"</i>. Siente la calidez expandirse por todo tu cuerpo.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '6',
        slug: 'coaching-tradicional-vs-ancestral',
        title: 'Coaching Tradicional vs. Ancestral: ┬┐Cu├íl es la diferencia?',
        excerpt: 'M├ís all├í de los objetivos y la acci├│n, el Coaching Ancestral busca el origen sist├⌐mico de lo que te detiene.',
        date: '01 de Diciembre, 2025',
        image: '/images/blog_4k/coaching_ancestral.png',
        category: 'Metodolog├¡a',
        author: 'Yelitze Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCI├ôN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El coaching tradicional te dice 'hacia d├│nde vas'. El Coaching Ancestral te revela adem├ís 'de d├│nde vienes' y por qu├⌐ te has detenido."
                </p>
                <p>
                    El coaching tradicional es una herramienta maravillosa para la acci├│n y el cumplimiento de metas externas. Sin embargo, muchas veces nos encontramos con bloqueos invisibles que no se resuelven con m├ís disciplina o mejores planes de marketing. Aqu├¡ es donde el <strong>Coaching Ancestral┬«</strong> marca la diferencia. Entendemos que no eres un individuo aislado, sino la punta de lanza de un sistema. Si tu sistema est├í mirando hacia el pasado o sosteniendo un duelo no resuelto, por m├ís que corras hacia adelante, sentir├ís que una fuerza invisible te retiene.
                </p>

                <!-- INTER├ëS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Mirar el Origen para Ganar Futuro</h3>
                <p>
                    En mi metodolog├¡a, unimos la estructura estrat├⌐gica del coaching con la profundidad de la sist├⌐mica. No solo definimos objetivos, sino que exploramos si tienes "el permiso de tu alma" para lograrlos. ┬┐Est├ís intentando tener ├⌐xito para demostrarle algo a alguien? ┬┐O quiz├ís est├ís fracasando para ser fiel a la escasez de tus abuelos? Al desatar estos nudos ancestrales, la acci├│n externa se vuelve fluida y natural, dejando de ser un esfuerzo agotador para convertirse en una expresi├│n de tu prop├│sito.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Una Visi├│n Integral del ├ëxito</h3>
                <p>
                    El Coaching Ancestral┬« te permite integrar todas tus facetas: la profesional, la personal y la sist├⌐mica. Al sanar el "de d├│nde vengo", el "hacia d├│nde voy" se despeja. Es un viaje de regreso a tu verdadera fuerza, donde tus logros no son solo tuyos, sino una forma de honrar a las generaciones que so├▒aron con tu libertad.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Laboratorio Estrat├⌐gico-Ancestral</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            El An├ílisis de la Resistencia
                        </h4>
                        <p class="pl-11">Piensa en una meta que te est├⌐ costando alcanzar. Cierra los ojos y siente qu├⌐ sucede cuando te imaginas logr├índola. ┬┐Hay culpa? ┬┐Hay miedo de ser diferente a tu familia? Anota esas sensaciones.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            La Entrega de lo que no es m├¡o
                        </h4>
                        <p class="pl-11">Escribe en un papel: <i>"Lograr este objetivo no me aleja de mi familia. Mi ├⌐xito es su alegr├¡a"</i>. Pon este papel en tu lugar de trabajo como un recordatorio visual de tu prop├│sito alineado.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            El Paso de la Autoridad
                        </h4>
                        <p class="pl-11">Si├⌐ntate en tu silla de trabajo e imagina que eres la CEO de tu propia vida. Siente el peso de tu responsabilidad y tambi├⌐n la libertad de elegir. Haz una llamada o env├¡a un correo que hayas estado postergando.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: '7',
        slug: 'proposito-de-vida-sistemico',
        title: 'Tu Prop├│sito de Vida: M├ís all├í del Ego',
        excerpt: '┬┐Sientes que lo tienes todo pero te falta algo? El prop├│sito no es una meta, es un lugar de servicio dentro de tu sistema.',
        date: '25 de Noviembre, 2025',
        image: '/images/blog_4k/purpose_of_life.png',
        category: 'Evoluci├│n',
        author: 'Yelitz├⌐ Rangel',
        content: `
            <div class="space-y-8 text-lg leading-relaxed text-stone-700">
                <!-- ATENCI├ôN -->
                <p class="text-xl font-medium text-[var(--color-primary)] italic border-l-4 border-[var(--color-secondary)] pl-6 py-2">
                    "El prop├│sito de vida no es una meta que debes alcanzar, sino un lugar de servicio que ya est├í disponible para ti."
                </p>
                <p>
                    Muchas personas pasan su vida buscando "su prop├│sito" como si fuera un tesoro escondido o un t├¡tulo profesional. Sin embargo, desde la mirada sist├⌐mica, el prop├│sito es un movimiento natural que surge cuando ocupas tu <strong>lugar correcto</strong> en el sistema y permites que la Vida fluya a trav├⌐s de ti hacia algo m├ís grande. Si no est├ís en paz con tu origen o si est├ís intentando ser "m├ís" que tus padres, tu b├║squeda de prop├│sito ser├í siempre una huida en lugar de un encuentro.
                </p>

                <!-- INTER├ëS -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">El Servicio a la Vida</h3>
                <p>
                    Tu prop├│sito ya est├í en ti; es la culminaci├│n de los sue├▒os, talentos y tambi├⌐n de las superaciones de todos tus ancestros. Eres el resultado de miles de vidas que lucharon para que hoy t├║ est├⌐s aqu├¡. Poner tus talentos al servicio de los dem├ís no es solo una elecci├│n profesional, es el mayor acto de agradecimiento hacia tu linaje. Cuando dejas de preguntar "┬┐Qu├⌐ puedo ganar yo?" y empiezas a preguntar "┬┐C├│mo puedo servir mejor?", la vida misma empieza a abrirte las puertas.
                </p>

                <!-- DESEO -->
                <h3 class="text-3xl font-heading text-[var(--color-primary)] mt-12 mb-6">Vivir con Sentido</h3>
                <p>
                    Vivir alineada con tu prop├│sito te da una fuerza inquebrantable. Ya no te agota el trabajo, porque no lo haces por ego, sino por resonancia. Descubrir que tus talentos son herramientas de sanaci├│n ΓÇöno solo para ti, sino para el mundoΓÇö le da un sentido sagrado a cada una de tus acciones. Es el momento de dejar de buscar fuera y empezar a dar desde dentro.
                </p>

                <!-- EJERCICIOS -->
                <div class="bg-[var(--color-bg-alt)] p-12 rounded-[2rem] border border-[var(--color-primary)]/10 mt-16 space-y-8">
                    <h2 class="text-4xl font-heading text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-6 text-center">Laboratorio de Prop├│sito</h2>
                    
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">01</span>
                            El Don Heredado
                        </h4>
                        <p class="pl-11">Haz una lista de 3 talentos que tengas (ej. comunicar, organizar, cuidar). Preg├║ntate: ┬┐Qui├⌐n en mi familia ten├¡a este don pero no pudo usarlo plenamente? Pon ese talento al servicio en su honor.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">02</span>
                            La Mirada al Mundo
                        </h4>
                        <p class="pl-11">Cierra los ojos e imagina que tienes a toda la humanidad frente a ti. ┬┐Qu├⌐ grupo de personas te "duele" m├ís o te genera m├ís ganas de ayudar? Ah├¡ es donde tu prop├│sito quiere expresarse.</p>
                    </div>

                    <div class="space-y-4">
                        <h4 class="text-xl font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">03</span>
                            Afirmaci├│n de Servicio
                        </h4>
                        <p class="pl-11">Cada ma├▒ana, antes de empezar tu d├¡a, di: <i>"Vida, ├║same como un instrumento para el bien mayor. Estoy disponible en mi lugar"</i>. Observa c├│mo cambia la energ├¡a de tus reuniones y tareas.</p>
                    </div>
                </div>
            </div>
        `
    }
];

export function getPostBySlug(slug: string) {
    return BLOG_POSTS.find(post => post.slug === slug);
}
