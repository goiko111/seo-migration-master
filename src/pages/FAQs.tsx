import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";

/* ─── FAQ data by category ─── */
interface FAQ { q: string; a: string }
interface FAQCategory { title: string; faqs: FAQ[] }

const faqCategories: FAQCategory[] = [
  {
    title: "Panel general",
    faqs: [
      {
        q: "¿Cómo añadir una nueva referencia a la carta?",
        a: `Para incorporar una nueva referencia a tu carta de vinos, sigue estos pasos desde tu panel de control:\n\n1. Añadir un nuevo vino: Haz clic en el botón "Añadir vino". En la barra de búsqueda, escribe el nombre del vino y selecciona el icono + cuando aparezca el resultado correcto. Introduce las variables de precio y guarda los cambios. El vino se añadirá automáticamente a tu carta.\n\n2. Solicitar un vino que no aparece: Si el vino que deseas añadir no está en el listado, haz clic en "Solicitar vino". En el buscador, escribe el nombre del vino. Si el sistema lo encuentra en nuestra base de datos, solo tendrás que completar las variables de precio que desees incluir.\n\n💡 Consejo: Winerim te mostrará precios de referencia utilizados por restaurantes de tu misma categoría, para ayudarte a definir tus tarifas.\n\n3. Enviar una solicitud manual: Si el vino no aparece en el buscador, rellena los siguientes campos: Nombre del vino, Bodega, Tipo de vino, Añada y Variables de precio. Después, haz clic en "Enviar solicitud". Nuestro equipo añadirá el vino a tu carta en el menor tiempo posible.`,
      },
      {
        q: "¿Cómo reorganizar los vinos de la carta?",
        a: `Reorganizar los vinos para que aparezcan en el orden que desees dentro de tu carta es muy sencillo.\n\n1. Accede a la categoría correspondiente: Desde el panel de gestión, selecciona la categoría de vinos que quieras reorganizar: Espumosos, Blancos, Tintos, Rosados o Fortificados.\n\n2. Entra en el modo de ordenación: Pulsa el botón situado en la parte superior derecha de la lista de vinos.\n\n3. Arrastra y suelta: Aparecerá un listado con todos los vinos de esa categoría. Haz clic y arrastra el vino hasta colocarlo en la posición que prefieras.\n\n4. Ordenar automáticamente: Si prefieres que la lista se organice automáticamente, puedes utilizar la opción "Organizar por:" con criterios como Nombre, Bodega, Región, País o Precio.\n\n5. Guarda los cambios: Cuando tengas los vinos en el orden deseado, pulsa el botón "Guardar cambios".\n\n6. Cancelar los cambios: Si prefieres volver al menú anterior sin realizar modificaciones, haz clic en "Cancelar".`,
      },
      {
        q: "¿Cómo utilizar los filtros del editor?",
        a: `Para localizar un vino dentro del listado que compone tu carta, puedes utilizar una serie de filtros:\n\n• Todos — Muestra todos los vinos que componen la carta, estén activos o inactivos. Filtro activado por defecto.\n• Activos — Muestra únicamente los vinos activos, visibles actualmente en la carta.\n• Inactivos — Muestra los vinos desactivados, no visibles pero que siguen en tu base de datos.\n• Con precio — Filtra y muestra solo aquellos vinos que tienen un precio asignado.\n• Sin precio — Muestra los vinos a los que todavía no se les ha asignado precio.\n• Sin stock — Muestra los vinos que no disponen de stock actualmente.\n• Agotados — Filtra los vinos etiquetados como agotados.\n• Copa — Muestra únicamente los vinos que pueden servirse por copa.\n• Últimos añadidos — Permite visualizar los últimos vinos incorporados a la carta.`,
      },
      {
        q: "¿Cómo utilizar el buscador del editor?",
        a: `Las cartas de vino suelen ser muy extensas, por lo que encontrar una referencia concreta puede resultar complicado. Además de los filtros, puedes utilizar el buscador:\n\n1. Accede al buscador: Haz clic en la barra superior de búsqueda situada en el editor de la carta.\n\n2. Escribe el nombre del vino: Introduce el nombre completo o parcial del vino que deseas localizar.\n\n3. Visualiza los resultados: A medida que escribas, el sistema mostrará automáticamente los resultados coincidentes dentro de la carta. Podrás acceder de forma inmediata a cualquier vino sin necesidad de recorrer toda la lista.`,
      },
      {
        q: "¿Cómo gestionar los idiomas de la carta?",
        a: `La carta de vinos puede configurarse en múltiples idiomas, una función útil si recibes clientes internacionales.\n\n1. Idioma principal y gestión de idiomas: Siempre existirá un idioma principal predefinido, pero puedes añadir o modificar otros idiomas desde el panel del editor pulsando en "Gestionar idioma".\n\n2. Añadir nuevos idiomas: Al activar un idioma, se traducirán automáticamente todos los elementos gestionados por Winerim.\n\n3. Traducción de textos del restaurante: Los textos personalizados del restaurante deben traducirse manualmente. Dentro del editor, Winerim te indicará los textos pendientes de traducir mediante un destacado en rojo con el aviso "Faltan traducciones".\n\n4. Introducir traducciones: Al hacer clic sobre el icono de aviso, se desplegará un panel donde podrás introducir la traducción correspondiente.`,
      },
      {
        q: "¿Qué es el módulo Pairing o Maridaje Avanzado?",
        a: `La versión básica de Winerim incluye un maridaje genérico entre la botella y tipos de alimentos estándar. Además, Winerim ofrece un módulo avanzado de maridaje (Pairing PRO), que permite vincular cada vino con los platos específicos de la carta del restaurante o con los menús degustación.\n\nActivación: En el menú lateral izquierdo del panel de control encontrarás el botón "Gestionar Pairing (PRO)". Si aún no tienes el módulo activado, podrás solicitar su activación.\n\nIntroducir tipos de plato: Comienza por los tipos de plato de tu carta (entrantes, primeros, segundos, postres). Haz clic en "Añadir tipo de plato".\n\nAñadir platos: Introduce el nombre del plato, selecciona su tipo, marca si está activo y selecciona los vinos con los que marida.\n\nMaridaje con menús degustación: Si tu restaurante ofrece menús degustación, también puedes configurar maridaje específico por menú desde la opción "Menús".`,
      },
      {
        q: "¿Cómo imprimir la carta de vinos?",
        a: `Desde el panel de control puedes imprimir en PDF la carta actualizada.\n\n1. Generar el PDF: Haz clic en "Imprimir PDF". Configura: correo electrónico de destino, idioma de la carta, si incluir imágenes de las botellas y la sección del vino.\n\n2. Exportar en formato CSV: También puedes exportar las referencias en formato CSV haciendo clic en "Exportar CSV". Obtendrás un archivo ideal para gestión interna o análisis de datos.`,
      },
    ],
  },
  {
    title: "Visualización de las referencias",
    faqs: [
      {
        q: "¿Qué acciones se pueden realizar sobre cada botella de vino?",
        a: `Al pasar el ratón por encima de una botella del listado, se muestran varios iconos de acción:\n\n1. Editar botella — Icono del lápiz para modificar la ficha de la botella.\n2. Duplicar vino — Para crear una nueva referencia basada en una existente (por ejemplo, otra añada).\n3. Eliminar botella — Icono de la papelera para eliminar definitivamente una referencia. ⚠️ Esta acción no se puede deshacer.\n4. Añadir a "Selección" — Incluye la botella en la lista de Selección, una categoría especial que agrupa los vinos más representativos del restaurante.\n5. Añadir a "Recomendados" — Icono de la estrella para destacar el vino en la sección de Recomendados.\n6. Marcar como "Novedad" — El vino aparecerá destacado como nueva referencia dentro de la carta.`,
      },
      {
        q: "¿Cómo funciona la sección de vinos recomendados?",
        a: `Puedes crear una selección especial de vinos recomendados para destacar referencias que desees sugerir al comensal.\n\n1. Marcar los vinos recomendados: Desde el panel del editor, marca el icono de la estrella en las referencias que quieras incluir.\n\n2. Configurar la visualización: Accede al menú "Mi cuenta" → "Ajustes" → "Etiquetas y secciones" para activar o desactivar la visualización de Recomendados.\n\n3. Personalizar el nombre de la sección: Puedes asignarle el nombre que desees (máximo 27 caracteres).\n\n4. Traducción: Si tu carta está en varios idiomas, recuerda traducir el nombre de la sección en todos los idiomas activos.`,
      },
      {
        q: "¿Cómo funciona el destacado de novedades?",
        a: `Cuando añades un vino nuevo, puedes marcarlo con la etiqueta de "Novedad" para que el comensal identifique las últimas incorporaciones.\n\n1. Marcar un vino como novedad: Desde el panel del editor, activa el botón o icono de novedades.\n\n2. Configurar la sección: Accede al menú "Mi cuenta" → "Ajustes" → "Etiquetas y secciones" para activar o desactivar la visualización de novedades.\n\n3. Personalizar el nombre: Puedes editar el nombre con el que se mostrará esta sección al comensal.`,
      },
      {
        q: "¿Se puede cambiar la imagen de la botella?",
        a: `No, no es posible cambiar la imagen de la botella. El motivo es garantizar la uniformidad visual y la coherencia estética de todas las referencias que componen la carta de vinos. De este modo, se preserva un estilo homogéneo, de alta calidad y profesional, que asegura una mejor experiencia para el comensal.`,
      },
    ],
  },
  {
    title: "Comparativa de precios",
    faqs: [
      {
        q: "¿Cómo funciona el módulo de comparativa de precios?",
        a: `El módulo de comparativa de precios permite conocer el precio medio al que otros restaurantes de tu misma categoría están ofreciendo una determinada botella. Winerim muestra tres datos clave de cada referencia:\n\n• Precio medio\n• Precio mínimo\n• Precio máximo\n\nAdemás, con un simple vistazo podrás saber si el precio de tu carta está o no dentro de la media. Esta información es muy valiosa para ajustar los precios o para orientarte al incorporar nuevas referencias.\n\nEstos datos se obtienen mediante un algoritmo interno que tiene en cuenta criterios como el precio medio del cubierto o el tamaño de la bodega. Winerim categoriza los restaurantes para ofrecer siempre comparativas precisas.`,
      },
    ],
  },
  {
    title: "Valoraciones de críticos",
    faqs: [
      {
        q: "¿Cómo gestionar las valoraciones de críticos?",
        a: `Puedes añadir o gestionar las valoraciones de críticos de vino directamente desde la ficha de cada referencia.\n\nAccede al panel editor, selecciona el vino que deseas modificar y ve a la última sección: Valoraciones.\n\nPulsa en Editar para acceder a la lista de valoraciones. Desde ahí podrás gestionar las existentes, eliminar las que ya no sean relevantes o añadir nuevas puntuaciones de críticos reconocidos como Parker, Peñín u otros.\n\nEstas valoraciones aparecerán en la ficha del vino dentro de tu carta digital, aportando valor añadido a la presentación de cada referencia.`,
      },
    ],
  },
  {
    title: "Visualización de la carta",
    faqs: [
      {
        q: "¿Qué modos de visualización existen?",
        a: `Winerim ofrece tres modos de visualización para mostrar tu carta de vinos:\n\n• Carrusel — Muestra las botellas de forma destacada, una a una, con desplazamiento horizontal.\n• Rejilla / Lista — Organiza los vinos en formato visual o en listado, facilitando la lectura rápida.\n• Carta tradicional — Reproduce el formato clásico de carta impresa, con un diseño elegante y estructurado.\n\nPuedes configurar el modo de visualización por defecto desde el panel editor, accediendo a la sección Ajustes del menú superior.`,
      },
      {
        q: "¿Cómo compartir la carta con QR y enlace?",
        a: `Desde el menú superior del panel editor, accede a la sección Códigos QR. Encontrarás varias opciones:\n\n• Descarga de la app — Enlaces para descargar la aplicación en iOS y Android.\n• QR de descarga — Tus clientes podrán descargar directamente la app. Una vez instalada, solo deberán introducir el código de acceso.\n• Enlace público y QR directo — Un enlace web y su QR para acceder a la carta sin necesidad de app. Puedes utilizar este QR en soportes físicos como cartas impresas, mesas, etiquetas o displays.\n\nCon estas opciones podrás ofrecer la carta de forma cómoda y versátil, ya sea desde el dispositivo del comensal o mediante una tablet del restaurante.`,
      },
    ],
  },
  {
    title: "Stock y pedidos",
    faqs: [
      {
        q: "¿Cómo funciona el control de stock?",
        a: `Desde el panel de control puedes acceder a la pestaña Stock para realizar un seguimiento detallado de las botellas disponibles.\n\nEncontrarás el listado completo de referencias con la posibilidad de:\n\n• Modificar el stock actual de cada vino.\n• Definir un umbral mínimo para que la referencia desaparezca automáticamente al agotarse.\n• Restar ventas manualmente cuando se produzcan.\n\nPara editar cualquiera de estos datos, pulsa sobre el icono del lápiz. Podrás introducir el número de botellas disponibles, establecer el umbral de aviso y ubicar la botella dentro de tu bodega para que cualquier miembro del equipo pueda localizarla rápidamente.`,
      },
      {
        q: "¿Cómo registrar un pedido?",
        a: `Desde la pestaña Pedidos de la página Stock puedes llevar un seguimiento completo de las compras.\n\nAl acceder encontrarás: Listado de pedidos realizados, Pedidos en curso, Registrar un nuevo pedido y Agenda de distribuidores.\n\n📦 Seguimiento de pedidos en curso: Accede a la pestaña Pedidos en curso para ver el listado detallado.\n\n🧾 Agenda de proveedores: Antes de registrar un pedido, configura tu agenda de proveedores. Pulsa en "Agenda de distribuidores", haz clic en "Añadir" e introduce los datos del proveedor. Luego selecciona las referencias que te provee.\n\n🍷 Registrar un nuevo pedido: Selecciona el proveedor, haz clic en "Añadir vino", marca las referencias a reponer, introduce el número de botellas y el importe de compra.\n\nEl pedido quedará registrado y se sumará automáticamente al stock una vez recibido. El sistema contabiliza el importe total para analizar la rentabilidad de la bodega.`,
      },
    ],
  },
  {
    title: "Personal y ventas",
    faqs: [
      {
        q: "¿Cómo registrar ventas por camarero?",
        a: `Desde la pantalla de personal es posible añadir a todos los profesionales que trabajan en el restaurante en contacto con el vino. Cuando efectúen una venta, ingresarán su código y queda registrada por ese camarero.\n\nDesde la pestaña de historial de ventas, podrás conocer qué se ha vendido y quién ha atendido ese servicio.`,
      },
    ],
  },
  {
    title: "Inteligencia Artificial (IA) en Winerim",
    faqs: [
      {
        q: "¿Qué hace exactamente la IA en Winerim?",
        a: `La IA de Winerim te ayuda a generar, completar y mejorar automáticamente la información de tu carta de vinos y platos. Analiza datos como el tipo de vino, la bodega, las notas de cata o el maridaje, y te propone textos profesionales listos para publicar.`,
      },
      {
        q: "¿Dónde puedo acceder a las herramientas de IA?",
        a: `Puedes acceder desde varios lugares:\n\n• En Ajustes → Automatizaciones IA, encontrarás todos los módulos de IA, desde Atributos de vino hasta Maridajes con IA y Automatizaciones IA.\n\n• En el apartado Pairing Pro, la IA se encarga de automatizar los maridajes al importar tu carta.\n\n• Dentro de cada vino o plato, verás los iconos de estrella ✨ en secciones como Información general, Características generales, Notas de cata, Bodega, Storytelling o Quick Sheet.`,
      },
      {
        q: "¿Cómo funciona la generación automática de contenido?",
        a: `Solo tienes que hacer clic en el botón de estrella ✨ que aparece junto a cada bloque de texto. La IA generará automáticamente un contenido adaptado a tu vino o plato, usando la información disponible (nombre, tipo, DO, uva, bodega, etc.). Puedes editar, reescribir o regenerar el texto tantas veces como quieras hasta que quede a tu gusto.`,
      },
      {
        q: "¿Qué son los maridajes automáticos con IA?",
        a: `Cuando importas tu carta o añades un nuevo plato, la IA analiza los ingredientes, el estilo culinario y las características de tus vinos para proponer combinaciones perfectas entre vinos y platos. Esto te ahorra tiempo y mejora la coherencia de tu carta, especialmente si tienes muchos vinos o un menú cambiante.`,
      },
      {
        q: '¿Qué hacen las "Automatizaciones IA"?',
        a: `Las Automatizaciones IA te permiten mantener tu carta viva y actualizada sin hacerlo todo manualmente.\n\nPuedes activar procesos automáticos como:\n\n🔄 Rotación de recomendados — La IA cambia periódicamente los vinos destacados según la estrategia que elijas (por ejemplo, mostrar los más caros o los mejor valorados), el número máximo de recomendados y la frecuencia de rotación en días.\n\n🍷 Rotación de maridajes — Automatiza la renovación de maridajes entre vinos y platos, definiendo cuántos maridajes máximos quieres y cada cuánto se actualizan.\n\n🆕 Automatización de novedades — Cuando añades nuevos vinos, la IA los incorpora a la sección de Novedades y los retira pasado el número de días configurado.`,
      },
      {
        q: "¿Puedo editar los textos generados por la IA?",
        a: `Sí, por supuesto. Todo lo que genera la IA puede editarse, ampliarse o reescribirse manualmente. Winerim te da el control total: la IA te ayuda a ganar tiempo, pero tú decides el tono final y el estilo.`,
      },
      {
        q: "¿Qué tipo de contenido puede generar la IA?",
        a: `La IA puede generar:\n\n• Fichas de vino completas (características, notas de cata, información de la bodega, etc.).\n• Fichas rápidas (Quick Sheets) con datos resumidos para el servicio.\n• Sugerencias de maridajes entre vinos y platos.\n• Descripciones automáticas de platos al importarlos.`,
      },
      {
        q: "¿La IA sustituye al sumiller o solo le ayuda?",
        a: `La IA no sustituye al sumiller: lo asiste. Está pensada para agilizar el trabajo diario, mantener la carta siempre actualizada y ofrecer descripciones coherentes y profesionales. El conocimiento humano sigue siendo clave para ajustar los matices y la personalidad de cada carta.`,
      },
      {
        q: "¿Necesito conocimientos técnicos para usar la IA?",
        a: `No. Todo está integrado dentro del panel de Winerim, con botones visibles y acciones guiadas. Solo necesitas seleccionar dónde quieres aplicar la IA y hacer clic. El sistema se encarga del resto.`,
      },
      {
        q: "¿Puedo usar la IA en varios idiomas?",
        a: `Sí. La IA de Winerim está preparada para generar contenido en varios idiomas según la configuración de tu carta o del sitio. Esto te permite mantener una carta multilingüe sin tener que traducir manualmente cada texto.`,
      },
    ],
  },
];

const allFaqs = faqCategories.flatMap((c) => c.faqs);

const FAQs = () => {
  // Inject FAQPage schema
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "faq-page-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Preguntas Frecuentes (FAQs) | Winerim"
        description="Resuelve todas tus dudas sobre Winerim: cómo añadir vinos, reorganizar la carta, gestionar stock, pedidos, maridajes, IA y mucho más."
        url="https://winerim.wine/faqs"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ label: "FAQs" }]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6 mt-6"
          >
            <HelpCircle size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">
              Centro de ayuda
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6"
          >
            Preguntas <span className="text-gradient-wine italic">frecuentes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            Todo lo que necesitas saber sobre el panel de gestión, la carta de
            vinos, stock, pedidos e inteligencia artificial de Winerim.
          </motion.p>
        </div>
      </section>

      {/* Category navigation */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-8">
        <div className="flex flex-wrap gap-2">
          {faqCategories.map((cat) => (
            <a
              key={cat.title}
              href={`#${cat.title.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")}`}
              className="px-3 py-1.5 rounded-full text-sm border border-border hover:border-wine/30 hover:bg-wine/5 transition-all"
            >
              {cat.title}
            </a>
          ))}
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <div className="space-y-12">
          {faqCategories.map((cat, catIdx) => (
            <ScrollReveal key={cat.title} delay={catIdx * 0.05}>
              <div
                id={cat.title.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")}
                className="scroll-mt-28"
              >
                <h2 className="font-heading text-xl md:text-2xl font-bold mb-5 text-wine">
                  {cat.title}
                </h2>
                <Accordion type="multiple" className="space-y-3">
                  {cat.faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`cat-${catIdx}-faq-${i}`}
                      className="rounded-xl border border-border bg-gradient-card px-6 data-[state=open]:border-wine/20 transition-colors"
                    >
                      <AccordionTrigger className="text-left font-heading font-semibold text-sm hover:no-underline py-5 gap-4">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 whitespace-pre-line">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQs;
