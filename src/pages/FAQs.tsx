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
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang } from "@/i18n/types";

/* ─── Image base ─── */
const WP = "https://winerim.wine/wp-content/uploads/2025/11";

/* ─── Types ─── */
interface FAQ { q: string; a: string; images?: { src: string; alt: string }[] }
interface FAQCategory { title: string; faqs: FAQ[] }

interface PageChrome {
  seoTitle: string;
  seoDesc: string;
  badge: string;
  h1pre: string;
  h1accent: string;
  subtitle: string;
}

const slugify = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!""''()]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

/* ─── Page chrome i18n ─── */
const CHROME: Record<SupportedLang, PageChrome> = {
  es: {
    seoTitle: "Preguntas Frecuentes (FAQs) | Winerim",
    seoDesc: "Resuelve todas tus dudas sobre Winerim: cómo añadir vinos, reorganizar la carta, gestionar stock, pedidos, maridajes, IA y mucho más.",
    badge: "Centro de ayuda",
    h1pre: "Preguntas", h1accent: "frecuentes",
    subtitle: "Todo lo que necesitas saber sobre el panel de gestión, la carta de vinos, stock, pedidos e inteligencia artificial de Winerim.",
  },
  en: {
    seoTitle: "Frequently Asked Questions (FAQs) | Winerim",
    seoDesc: "Get all your questions about Winerim answered: how to add wines, reorganize your list, manage stock, orders, pairings, AI and more.",
    badge: "Help centre",
    h1pre: "Frequently asked", h1accent: "questions",
    subtitle: "Everything you need to know about the management panel, wine list, stock, orders and artificial intelligence in Winerim.",
  },
  it: {
    seoTitle: "Domande Frequenti (FAQ) | Winerim",
    seoDesc: "Risolvi tutti i tuoi dubbi su Winerim: come aggiungere vini, riorganizzare la carta, gestire stock, ordini, abbinamenti, IA e molto altro.",
    badge: "Centro assistenza",
    h1pre: "Domande", h1accent: "frequenti",
    subtitle: "Tutto ciò che devi sapere sul pannello di gestione, la carta dei vini, stock, ordini e intelligenza artificiale di Winerim.",
  },
  fr: {
    seoTitle: "Questions Fréquentes (FAQ) | Winerim",
    seoDesc: "Trouvez toutes les réponses à vos questions sur Winerim : ajout de vins, réorganisation de la carte, gestion de stock, commandes, accords, IA et plus.",
    badge: "Centre d'aide",
    h1pre: "Questions", h1accent: "fréquentes",
    subtitle: "Tout ce que vous devez savoir sur le panneau de gestion, la carte des vins, le stock, les commandes et l'intelligence artificielle de Winerim.",
  },
};

/* ─── FAQ data by category & language ─── */
const faqData: Record<SupportedLang, FAQCategory[]> = {
  es: [
    {
      title: "Panel general",
      faqs: [
        { q: "¿Cómo añadir una nueva referencia a la carta?", a: `Para incorporar una nueva referencia a tu carta de vinos, sigue estos pasos desde tu panel de control:\n\n1. Añadir un nuevo vino: Haz clic en el botón "Añadir vino". En la barra de búsqueda, escribe el nombre del vino y selecciona el icono + cuando aparezca el resultado correcto. Introduce las variables de precio y guarda los cambios. El vino se añadirá automáticamente a tu carta.\n\n2. Solicitar un vino que no aparece: Si el vino que deseas añadir no está en el listado, haz clic en "Solicitar vino". En el buscador, escribe el nombre del vino. Si el sistema lo encuentra en nuestra base de datos, solo tendrás que completar las variables de precio que desees incluir.\n\n💡 Consejo: Winerim te mostrará precios de referencia utilizados por restaurantes de tu misma categoría, para ayudarte a definir tus tarifas.\n\n3. Enviar una solicitud manual: Si el vino no aparece en el buscador, rellena los siguientes campos: Nombre del vino, Bodega, Tipo de vino, Añada y Variables de precio. Después, haz clic en "Enviar solicitud". Nuestro equipo añadirá el vino a tu carta en el menor tiempo posible.` },
        { q: "¿Cómo reorganizar los vinos de la carta?", a: `Reorganizar los vinos para que aparezcan en el orden que desees dentro de tu carta es muy sencillo.\n\n1. Accede a la categoría correspondiente: Desde el panel de gestión, selecciona la categoría de vinos que quieras reorganizar: Espumosos, Blancos, Tintos, Rosados o Fortificados.\n\n2. Entra en el modo de ordenación: Pulsa el botón situado en la parte superior derecha de la lista de vinos.\n\n3. Arrastra y suelta: Aparecerá un listado con todos los vinos de esa categoría. Haz clic y arrastra el vino hasta colocarlo en la posición que prefieras.\n\n4. Ordenar automáticamente: Si prefieres que la lista se organice automáticamente, puedes utilizar la opción "Organizar por:" con criterios como Nombre, Bodega, Región, País o Precio.\n\n5. Guarda los cambios: Cuando tengas los vinos en el orden deseado, pulsa el botón "Guardar cambios".\n\n6. Cancelar los cambios: Si prefieres volver al menú anterior sin realizar modificaciones, haz clic en "Cancelar".` },
        { q: "¿Cómo utilizar los filtros del editor?", a: `Para localizar un vino dentro del listado que compone tu carta, puedes utilizar una serie de filtros:\n\n• Todos — Muestra todos los vinos que componen la carta, estén activos o inactivos. Filtro activado por defecto.\n• Activos — Muestra únicamente los vinos activos, visibles actualmente en la carta.\n• Inactivos — Muestra los vinos desactivados, no visibles pero que siguen en tu base de datos.\n• Con precio — Filtra y muestra solo aquellos vinos que tienen un precio asignado.\n• Sin precio — Muestra los vinos a los que todavía no se les ha asignado precio.\n• Sin stock — Muestra los vinos que no disponen de stock actualmente.\n• Agotados — Filtra los vinos etiquetados como agotados.\n• Copa — Muestra únicamente los vinos que pueden servirse por copa.\n• Últimos añadidos — Permite visualizar los últimos vinos incorporados a la carta.`, images: [{ src: `${WP}/filtros-768x576.png`, alt: "Filtros del editor de carta de vinos en Winerim" }, { src: `${WP}/filtro_todos-300x126.png`, alt: "Filtro Todos" }, { src: `${WP}/filtro_activos-300x126.png`, alt: "Filtro Activos" }, { src: `${WP}/filtro_conprecio-300x126.png`, alt: "Filtro Con precio" }, { src: `${WP}/filtro_sinprecio-300x126.png`, alt: "Filtro Sin precio" }, { src: `${WP}/filtro_sinstock-300x126.png`, alt: "Filtro Sin stock" }, { src: `${WP}/filtro_agotados-300x126.png`, alt: "Filtro Agotados" }, { src: `${WP}/filtro_copa-300x126.png`, alt: "Filtro Copa" }, { src: `${WP}/filtro_ultimos-add-300x126.png`, alt: "Filtro Últimos añadidos" }] },
        { q: "¿Cómo utilizar el buscador del editor?", a: `Las cartas de vino suelen ser muy extensas, por lo que encontrar una referencia concreta puede resultar complicado. Además de los filtros, puedes utilizar el buscador:\n\n1. Accede al buscador: Haz clic en la barra superior de búsqueda situada en el editor de la carta.\n\n2. Escribe el nombre del vino: Introduce el nombre completo o parcial del vino que deseas localizar.\n\n3. Visualiza los resultados: A medida que escribas, el sistema mostrará automáticamente los resultados coincidentes dentro de la carta. Podrás acceder de forma inmediata a cualquier vino sin necesidad de recorrer toda la lista.`, images: [{ src: `${WP}/listado-principal-busqueda-768x576.png`, alt: "Buscador del editor de carta de vinos" }] },
        { q: "¿Cómo gestionar los idiomas de la carta?", a: `La carta de vinos puede configurarse en múltiples idiomas, una función útil si recibes clientes internacionales.\n\n1. Idioma principal y gestión de idiomas: Siempre existirá un idioma principal predefinido, pero puedes añadir o modificar otros idiomas desde el panel del editor pulsando en "Gestionar idioma".\n\n2. Añadir nuevos idiomas: Al activar un idioma, se traducirán automáticamente todos los elementos gestionados por Winerim.\n\n3. Traducción de textos del restaurante: Los textos personalizados del restaurante deben traducirse manualmente. Dentro del editor, Winerim te indicará los textos pendientes de traducir mediante un destacado en rojo con el aviso "Faltan traducciones".\n\n4. Introducir traducciones: Al hacer clic sobre el icono de aviso, se desplegará un panel donde podrás introducir la traducción correspondiente.`, images: [{ src: `${WP}/listado-principal-gestionar-idiomas-768x576.png`, alt: "Gestionar idiomas de la carta" }, { src: `${WP}/editar_idiomas-768x576.png`, alt: "Editar idiomas" }, { src: `${WP}/Gestionar-pairing-768x576.png`, alt: "Gestionar traducciones de secciones" }] },
        { q: "¿Qué es el módulo Pairing o Maridaje Avanzado?", a: `La versión básica de Winerim incluye un maridaje genérico entre la botella y tipos de alimentos estándar. Además, Winerim ofrece un módulo avanzado de maridaje (Pairing PRO), que permite vincular cada vino con los platos específicos de la carta del restaurante o con los menús degustación.\n\nActivación: En el menú lateral izquierdo del panel de control encontrarás el botón "Gestionar Pairing (PRO)". Si aún no tienes el módulo activado, podrás solicitar su activación.\n\nIntroducir tipos de plato: Comienza por los tipos de plato de tu carta (entrantes, primeros, segundos, postres). Haz clic en "Añadir tipo de plato".\n\nAñadir platos: Introduce el nombre del plato, selecciona su tipo, marca si está activo y selecciona los vinos con los que marida.\n\nMaridaje con menús degustación: Si tu restaurante ofrece menús degustación, también puedes configurar maridaje específico por menú desde la opción "Menús".`, images: [{ src: `${WP}/listado-principal-gestionar-pairing-768x576.png`, alt: "Módulo Pairing avanzado" }, { src: `${WP}/Gestionar-pairing-768x576.png`, alt: "Gestionar Pairing PRO" }, { src: `${WP}/Nuevo-plato-768x576.png`, alt: "Añadir nuevo plato" }, { src: `${WP}/add-menu-768x576.png`, alt: "Añadir menú degustación" }] },
        { q: "¿Cómo imprimir la carta de vinos?", a: `Desde el panel de control puedes imprimir en PDF la carta actualizada.\n\n1. Generar el PDF: Haz clic en "Imprimir PDF". Configura: correo electrónico de destino, idioma de la carta, si incluir imágenes de las botellas y la sección del vino.\n\n2. Exportar en formato CSV: También puedes exportar las referencias en formato CSV haciendo clic en "Exportar CSV". Obtendrás un archivo ideal para gestión interna o análisis de datos.`, images: [{ src: `${WP}/Imprimir-PDF-768x576.png`, alt: "Imprimir carta de vinos en PDF" }] },
      ],
    },
    {
      title: "Visualización de las referencias",
      faqs: [
        { q: "¿Qué acciones se pueden realizar sobre cada botella de vino?", a: `Al pasar el ratón por encima de una botella del listado, se muestran varios iconos de acción:\n\n1. Editar botella — Icono del lápiz para modificar la ficha de la botella.\n2. Duplicar vino — Para crear una nueva referencia basada en una existente (por ejemplo, otra añada).\n3. Eliminar botella — Icono de la papelera para eliminar definitivamente una referencia. ⚠️ Esta acción no se puede deshacer.\n4. Añadir a "Selección" — Incluye la botella en la lista de Selección, una categoría especial que agrupa los vinos más representativos del restaurante.\n5. Añadir a "Recomendados" — Icono de la estrella para destacar el vino en la sección de Recomendados.\n6. Marcar como "Novedad" — El vino aparecerá destacado como nueva referencia dentro de la carta.`, images: [{ src: `${WP}/Listado-principal-acciones-wine-768x576.png`, alt: "Acciones sobre cada botella de vino" }, { src: `${WP}/icono-editar.png`, alt: "Icono editar botella" }, { src: `${WP}/icono-duplicar.png`, alt: "Icono duplicar vino" }, { src: `${WP}/icono-eliminar.png`, alt: "Icono eliminar botella" }, { src: `${WP}/icono-seleccion.png`, alt: "Icono añadir a Selección" }, { src: `${WP}/icono-destacado.png`, alt: "Icono añadir a Recomendados" }, { src: `${WP}/icono-novedad.png`, alt: "Icono marcar como Novedad" }] },
        { q: "¿Cómo funciona la sección de vinos recomendados?", a: `Puedes crear una selección especial de vinos recomendados para destacar referencias que desees sugerir al comensal.\n\n1. Marcar los vinos recomendados: Desde el panel del editor, marca el icono de la estrella en las referencias que quieras incluir.\n\n2. Configurar la visualización: Accede al menú "Mi cuenta" → "Ajustes" → "Etiquetas y secciones" para activar o desactivar la visualización de Recomendados.\n\n3. Personalizar el nombre de la sección: Puedes asignarle el nombre que desees (máximo 27 caracteres).\n\n4. Traducción: Si tu carta está en varios idiomas, recuerda traducir el nombre de la sección en todos los idiomas activos.`, images: [{ src: `${WP}/icono-destacado.png`, alt: "Icono de Recomendados" }, { src: `${WP}/desplegable-perfil-ajustes-768x576.png`, alt: "Menú Mi cuenta – Ajustes" }, { src: `${WP}/ajustes-link-secciones-768x576.png`, alt: "Ajustes – Etiquetas y secciones" }, { src: `${WP}/ajustes-secciones-768x576.png`, alt: "Configurar sección Recomendados" }] },
        { q: "¿Cómo funciona el destacado de novedades?", a: `Cuando añades un vino nuevo, puedes marcarlo con la etiqueta de "Novedad" para que el comensal identifique las últimas incorporaciones.\n\n1. Marcar un vino como novedad: Desde el panel del editor, activa el botón o icono de novedades.\n\n2. Configurar la sección: Accede al menú "Mi cuenta" → "Ajustes" → "Etiquetas y secciones" para activar o desactivar la visualización de novedades.\n\n3. Personalizar el nombre: Puedes editar el nombre con el que se mostrará esta sección al comensal.`, images: [{ src: `${WP}/icono-novedad.png`, alt: "Icono de Novedad" }, { src: `${WP}/ajustes-link-secciones-768x576.png`, alt: "Ajustes – Etiquetas y secciones" }, { src: `${WP}/ajustes-secciones-768x576.png`, alt: "Configurar sección Novedades" }] },
        { q: "¿Se puede cambiar la imagen de la botella?", a: `No, no es posible cambiar la imagen de la botella. El motivo es garantizar la uniformidad visual y la coherencia estética de todas las referencias que componen la carta de vinos. De este modo, se preserva un estilo homogéneo, de alta calidad y profesional, que asegura una mejor experiencia para el comensal.` },
      ],
    },
    {
      title: "Comparativa de precios",
      faqs: [
        { q: "¿Cómo funciona el módulo de comparativa de precios?", a: `El módulo de comparativa de precios permite conocer el precio medio al que otros restaurantes de tu misma categoría están ofreciendo una determinada botella. Winerim muestra tres datos clave de cada referencia:\n\n• Precio medio\n• Precio mínimo\n• Precio máximo\n\nAdemás, con un simple vistazo podrás saber si el precio de tu carta está o no dentro de la media. Esta información es muy valiosa para ajustar los precios o para orientarte al incorporar nuevas referencias.\n\nEstos datos se obtienen mediante un algoritmo interno que tiene en cuenta criterios como el precio medio del cubierto o el tamaño de la bodega. Winerim categoriza los restaurantes para ofrecer siempre comparativas precisas.`, images: [{ src: `${WP}/listado-principal-comparativa-de-precio-768x576.png`, alt: "Comparativa de precios de vinos en Winerim" }] },
      ],
    },
    {
      title: "Valoraciones de críticos",
      faqs: [
        { q: "¿Cómo gestionar las valoraciones de críticos?", a: `Puedes añadir o gestionar las valoraciones de críticos de vino directamente desde la ficha de cada referencia.\n\nAccede al panel editor, selecciona el vino que deseas modificar y ve a la última sección: Valoraciones.\n\nPulsa en Editar para acceder a la lista de valoraciones. Desde ahí podrás gestionar las existentes, eliminar las que ya no sean relevantes o añadir nuevas puntuaciones de críticos reconocidos como Parker, Peñín u otros.\n\nEstas valoraciones aparecerán en la ficha del vino dentro de tu carta digital, aportando valor añadido a la presentación de cada referencia.`, images: [{ src: `${WP}/editar-ficha-vino-1-768x576.png`, alt: "Ficha de vino – Secciones" }, { src: `${WP}/editar-ficha-vino-valoraciones-768x576.png`, alt: "Editar valoraciones de críticos" }, { src: `${WP}/editar-ficha-vino-lista-valoraciones-768x576.png`, alt: "Lista de valoraciones" }, { src: `${WP}/editar-ficha-vino-lista-valoraciones-add-768x576.png`, alt: "Añadir nueva valoración" }] },
      ],
    },
    {
      title: "Visualización de la carta",
      faqs: [
        { q: "¿Qué modos de visualización existen?", a: `Winerim ofrece tres modos de visualización para mostrar tu carta de vinos:\n\n• Carrusel — Muestra las botellas de forma destacada, una a una, con desplazamiento horizontal.\n• Rejilla / Lista — Organiza los vinos en formato visual o en listado, facilitando la lectura rápida.\n• Carta tradicional — Reproduce el formato clásico de carta impresa, con un diseño elegante y estructurado.\n\nPuedes configurar el modo de visualización por defecto desde el panel editor, accediendo a la sección Ajustes del menú superior.`, images: [{ src: `${WP}/desplegable-perfil-ajustes-768x576.png`, alt: "Menú Mi cuenta – Ajustes" }, { src: `${WP}/ajustes-general-seccion-vision-768x576.png`, alt: "Ajustes de modo de visualización" }] },
        { q: "¿Cómo compartir la carta con QR y enlace?", a: `Desde el menú superior del panel editor, accede a la sección Códigos QR. Encontrarás varias opciones:\n\n• Descarga de la app — Enlaces para descargar la aplicación en iOS y Android.\n• QR de descarga — Tus clientes podrán descargar directamente la app. Una vez instalada, solo deberán introducir el código de acceso.\n• Enlace público y QR directo — Un enlace web y su QR para acceder a la carta sin necesidad de app. Puedes utilizar este QR en soportes físicos como cartas impresas, mesas, etiquetas o displays.\n\nCon estas opciones podrás ofrecer la carta de forma cómoda y versátil, ya sea desde el dispositivo del comensal o mediante una tablet del restaurante.`, images: [{ src: `${WP}/codigos-qr-768x576.png`, alt: "Códigos QR y enlace a la carta" }] },
      ],
    },
    {
      title: "Stock y pedidos",
      faqs: [
        { q: "¿Cómo funciona el control de stock?", a: `Desde el panel de control puedes acceder a la pestaña Stock para realizar un seguimiento detallado de las botellas disponibles.\n\nEncontrarás el listado completo de referencias con la posibilidad de:\n\n• Modificar el stock actual de cada vino.\n• Definir un umbral mínimo para que la referencia desaparezca automáticamente al agotarse.\n• Restar ventas manualmente cuando se produzcan.\n\nPara editar cualquiera de estos datos, pulsa sobre el icono del lápiz. Podrás introducir el número de botellas disponibles, establecer el umbral de aviso y ubicar la botella dentro de tu bodega para que cualquier miembro del equipo pueda localizarla rápidamente.`, images: [{ src: `${WP}/listado-principal-stock-768x576.png`, alt: "Control de stock de vinos" }, { src: `${WP}/gestionar-stock-2-768x576.png`, alt: "Gestionar stock por referencia" }, { src: `${WP}/editar-stock-768x576.png`, alt: "Editar stock y ubicación de bodega" }] },
        { q: "¿Cómo registrar un pedido?", a: `Desde la pestaña Pedidos de la página Stock puedes llevar un seguimiento completo de las compras.\n\nAl acceder encontrarás: Listado de pedidos realizados, Pedidos en curso, Registrar un nuevo pedido y Agenda de distribuidores.\n\n📦 Seguimiento de pedidos en curso: Accede a la pestaña Pedidos en curso para ver el listado detallado.\n\n🧾 Agenda de proveedores: Antes de registrar un pedido, configura tu agenda de proveedores. Pulsa en "Agenda de distribuidores", haz clic en "Añadir" e introduce los datos del proveedor. Luego selecciona las referencias que te provee.\n\n🍷 Registrar un nuevo pedido: Selecciona el proveedor, haz clic en "Añadir vino", marca las referencias a reponer, introduce el número de botellas y el importe de compra.\n\nEl pedido quedará registrado y se sumará automáticamente al stock una vez recibido. El sistema contabiliza el importe total para analizar la rentabilidad de la bodega.`, images: [{ src: `${WP}/pedidos-listado-768x576.png`, alt: "Listado de pedidos" }, { src: `${WP}/pedido-en-curso-768x576.png`, alt: "Pedidos en curso" }, { src: `${WP}/agenda-distribuidores-768x576.png`, alt: "Agenda de distribuidores" }, { src: `${WP}/nuevo-pedido-768x576.png`, alt: "Registrar nuevo pedido" }] },
      ],
    },
    {
      title: "Personal y ventas",
      faqs: [
        { q: "¿Cómo registrar ventas por camarero?", a: `Desde la pantalla de personal es posible añadir a todos los profesionales que trabajan en el restaurante en contacto con el vino. Cuando efectúen una venta, ingresarán su código y queda registrada por ese camarero.\n\nDesde la pestaña de historial de ventas, podrás conocer qué se ha vendido y quién ha atendido ese servicio.` },
      ],
    },
    {
      title: "Inteligencia Artificial (IA) en Winerim",
      faqs: [
        { q: "¿Qué hace exactamente la IA en Winerim?", a: `La IA de Winerim te ayuda a generar, completar y mejorar automáticamente la información de tu carta de vinos y platos. Analiza datos como el tipo de vino, la bodega, las notas de cata o el maridaje, y te propone textos profesionales listos para publicar.` },
        { q: "¿Dónde puedo acceder a las herramientas de IA?", a: `Puedes acceder desde varios lugares:\n\n• En Ajustes → Automatizaciones IA, encontrarás todos los módulos de IA, desde Atributos de vino hasta Maridajes con IA y Automatizaciones IA.\n\n• En el apartado Pairing Pro, la IA se encarga de automatizar los maridajes al importar tu carta.\n\n• Dentro de cada vino o plato, verás los iconos de estrella ✨ en secciones como Información general, Características generales, Notas de cata, Bodega, Storytelling o Quick Sheet.` },
        { q: "¿Cómo funciona la generación automática de contenido?", a: `Solo tienes que hacer clic en el botón de estrella ✨ que aparece junto a cada bloque de texto. La IA generará automáticamente un contenido adaptado a tu vino o plato, usando la información disponible (nombre, tipo, DO, uva, bodega, etc.). Puedes editar, reescribir o regenerar el texto tantas veces como quieras hasta que quede a tu gusto.` },
        { q: "¿Qué son los maridajes automáticos con IA?", a: `Cuando importas tu carta o añades un nuevo plato, la IA analiza los ingredientes, el estilo culinario y las características de tus vinos para proponer combinaciones perfectas entre vinos y platos. Esto te ahorra tiempo y mejora la coherencia de tu carta, especialmente si tienes muchos vinos o un menú cambiante.` },
        { q: '¿Qué hacen las "Automatizaciones IA"?', a: `Las Automatizaciones IA te permiten mantener tu carta viva y actualizada sin hacerlo todo manualmente.\n\nPuedes activar procesos automáticos como:\n\n🔄 Rotación de recomendados — La IA cambia periódicamente los vinos destacados según la estrategia que elijas (por ejemplo, mostrar los más caros o los mejor valorados), el número máximo de recomendados y la frecuencia de rotación en días.\n\n🍷 Rotación de maridajes — Automatiza la renovación de maridajes entre vinos y platos, definiendo cuántos maridajes máximos quieres y cada cuánto se actualizan.\n\n🆕 Automatización de novedades — Cuando añades nuevos vinos, la IA los incorpora a la sección de Novedades y los retira pasado el número de días configurado.` },
        { q: "¿Puedo editar los textos generados por la IA?", a: `Sí, por supuesto. Todo lo que genera la IA puede editarse, ampliarse o reescribirse manualmente. Winerim te da el control total: la IA te ayuda a ganar tiempo, pero tú decides el tono final y el estilo.` },
        { q: "¿Qué tipo de contenido puede generar la IA?", a: `La IA puede generar:\n\n• Fichas de vino completas (características, notas de cata, información de la bodega, etc.).\n• Fichas rápidas (Quick Sheets) con datos resumidos para el servicio.\n• Sugerencias de maridajes entre vinos y platos.\n• Descripciones automáticas de platos al importarlos.` },
        { q: "¿La IA sustituye al sumiller o solo le ayuda?", a: `La IA no sustituye al sumiller: lo asiste. Está pensada para agilizar el trabajo diario, mantener la carta siempre actualizada y ofrecer descripciones coherentes y profesionales. El conocimiento humano sigue siendo clave para ajustar los matices y la personalidad de cada carta.` },
        { q: "¿Necesito conocimientos técnicos para usar la IA?", a: `No. Todo está integrado dentro del panel de Winerim, con botones visibles y acciones guiadas. Solo necesitas seleccionar dónde quieres aplicar la IA y hacer clic. El sistema se encarga del resto.` },
        { q: "¿Puedo usar la IA en varios idiomas?", a: `Sí. La IA de Winerim está preparada para generar contenido en varios idiomas según la configuración de tu carta o del sitio. Esto te permite mantener una carta multilingüe sin tener que traducir manualmente cada texto.` },
      ],
    },
  ],
  en: [
    {
      title: "General panel",
      faqs: [
        { q: "How do I add a new wine to the list?", a: `To add a new wine to your wine list, follow these steps from your control panel:\n\n1. Add a new wine: Click the "Add wine" button. In the search bar, type the wine name and select the + icon when the correct result appears. Enter the price variables and save the changes. The wine will be automatically added to your list.\n\n2. Request a wine not listed: If the wine you want to add isn't in the database, click "Request wine". In the search bar, type the wine name. If the system finds it in our database, you'll only need to complete the price variables.\n\n💡 Tip: Winerim will show you reference prices used by restaurants in your same category, to help you set your rates.\n\n3. Submit a manual request: If the wine doesn't appear in the search, fill in these fields: Wine name, Winery, Wine type, Vintage and Price variables. Then click "Submit request". Our team will add the wine to your list as soon as possible.` },
        { q: "How do I reorganize wines on my list?", a: `Reorganizing wines to appear in your preferred order is very simple.\n\n1. Go to the relevant category: From the management panel, select the wine category you want to reorganize: Sparkling, White, Red, Rosé or Fortified.\n\n2. Enter sorting mode: Click the button in the top right of the wine list.\n\n3. Drag and drop: A list will appear with all wines in that category. Click and drag any wine to your preferred position.\n\n4. Auto-sort: If you prefer automatic sorting, use the "Sort by:" option with criteria like Name, Winery, Region, Country or Price.\n\n5. Save changes: When wines are in the desired order, click "Save changes".\n\n6. Cancel changes: To return to the previous menu without changes, click "Cancel".` },
        { q: "How do I use the editor filters?", a: `To locate a wine within your list, you can use several filters:\n\n• All — Shows all wines in the list, active or inactive. Default filter.\n• Active — Shows only active wines, currently visible on the list.\n• Inactive — Shows deactivated wines, not visible but still in your database.\n• With price — Filters and shows only wines with an assigned price.\n• Without price — Shows wines without a price yet.\n• Out of stock — Shows wines currently out of stock.\n• Sold out — Filters wines labelled as sold out.\n• By the glass — Shows only wines available by the glass.\n• Recently added — Displays the most recently added wines.`, images: [{ src: `${WP}/filtros-768x576.png`, alt: "Wine list editor filters in Winerim" }] },
        { q: "How do I use the editor search?", a: `Wine lists can be very long, so finding a specific reference can be tricky. In addition to filters, you can use the search bar:\n\n1. Access the search: Click the search bar at the top of the list editor.\n\n2. Type the wine name: Enter the full or partial name of the wine you're looking for.\n\n3. View results: As you type, the system will automatically show matching results within your list. You can instantly access any wine without scrolling through the entire list.`, images: [{ src: `${WP}/listado-principal-busqueda-768x576.png`, alt: "Wine list editor search" }] },
        { q: "How do I manage wine list languages?", a: `The wine list can be configured in multiple languages, a useful feature if you welcome international guests.\n\n1. Main language and language management: There will always be a default main language, but you can add or modify other languages from the editor panel by clicking "Manage languages".\n\n2. Add new languages: When you activate a language, all Winerim-managed elements will be automatically translated.\n\n3. Restaurant custom texts: Custom restaurant texts must be translated manually. Within the editor, Winerim will flag pending translations with a red highlight saying "Missing translations".\n\n4. Enter translations: Clicking the warning icon will open a panel where you can enter the corresponding translation.`, images: [{ src: `${WP}/listado-principal-gestionar-idiomas-768x576.png`, alt: "Manage wine list languages" }] },
        { q: "What is the Pairing / Advanced Pairing module?", a: `The basic version of Winerim includes generic pairing between wines and standard food types. Additionally, Winerim offers an advanced pairing module (Pairing PRO), which links each wine to specific dishes on your restaurant's menu or tasting menus.\n\nActivation: In the left sidebar of the control panel, you'll find the "Manage Pairing (PRO)" button. If the module isn't activated yet, you can request activation.\n\nEnter dish types: Start with your menu dish types (starters, first courses, main courses, desserts). Click "Add dish type".\n\nAdd dishes: Enter the dish name, select its type, mark if it's active and select the wines it pairs with.\n\nTasting menu pairing: If your restaurant offers tasting menus, you can also configure specific pairing per menu from the "Menus" option.`, images: [{ src: `${WP}/listado-principal-gestionar-pairing-768x576.png`, alt: "Advanced Pairing module" }] },
        { q: "How do I print the wine list?", a: `From the control panel you can print the updated wine list as a PDF.\n\n1. Generate PDF: Click "Print PDF". Configure: destination email, list language, whether to include bottle images and the wine section.\n\n2. Export as CSV: You can also export references as CSV by clicking "Export CSV". You'll get a file ideal for internal management or data analysis.`, images: [{ src: `${WP}/Imprimir-PDF-768x576.png`, alt: "Print wine list as PDF" }] },
      ],
    },
    {
      title: "Wine reference display",
      faqs: [
        { q: "What actions can I perform on each wine?", a: `When hovering over a wine in the list, several action icons appear:\n\n1. Edit wine — Pencil icon to modify the wine card.\n2. Duplicate wine — To create a new reference based on an existing one (e.g. another vintage).\n3. Delete wine — Bin icon to permanently remove a reference. ⚠️ This action cannot be undone.\n4. Add to "Selection" — Includes the wine in the Selection list, a special category grouping your most representative wines.\n5. Add to "Recommended" — Star icon to highlight the wine in the Recommended section.\n6. Mark as "New" — The wine will appear highlighted as a new addition to the list.` },
        { q: "How does the recommended wines section work?", a: `You can create a special selection of recommended wines to highlight references you want to suggest to guests.\n\n1. Mark recommended wines: From the editor panel, click the star icon on the references you want to include.\n\n2. Configure display: Go to "My account" → "Settings" → "Labels and sections" to enable or disable the Recommended display.\n\n3. Customise the section name: You can assign any name you like (max 27 characters).\n\n4. Translation: If your list is in multiple languages, remember to translate the section name in all active languages.` },
        { q: "How do new arrivals work?", a: `When you add a new wine, you can tag it as "New" so guests can identify the latest additions.\n\n1. Mark a wine as new: From the editor panel, activate the new arrivals button or icon.\n\n2. Configure the section: Go to "My account" → "Settings" → "Labels and sections" to enable or disable the new arrivals display.\n\n3. Customise the name: You can edit the name shown to guests.` },
        { q: "Can I change the bottle image?", a: `No, it's not possible to change the bottle image. The reason is to ensure visual uniformity and aesthetic consistency across all references in the wine list. This preserves a homogeneous, high-quality, professional style that ensures a better experience for guests.` },
      ],
    },
    {
      title: "Price comparison",
      faqs: [
        { q: "How does the price comparison module work?", a: `The price comparison module lets you see the average price at which other restaurants in your category are offering a particular wine. Winerim shows three key data points for each reference:\n\n• Average price\n• Minimum price\n• Maximum price\n\nAt a glance you can see whether your list price is within the average. This information is invaluable for adjusting prices or for guidance when adding new references.\n\nThis data comes from an internal algorithm that considers criteria like average cover price and cellar size. Winerim categorises restaurants to always provide accurate comparisons.`, images: [{ src: `${WP}/listado-principal-comparativa-de-precio-768x576.png`, alt: "Wine price comparison in Winerim" }] },
      ],
    },
    {
      title: "Critic ratings",
      faqs: [
        { q: "How do I manage critic ratings?", a: `You can add or manage wine critic ratings directly from each reference's card.\n\nGo to the editor panel, select the wine you want to modify and navigate to the last section: Ratings.\n\nClick Edit to access the ratings list. From there you can manage existing ones, remove outdated ratings or add new scores from recognised critics like Parker, Peñín and others.\n\nThese ratings will appear on the wine card within your digital list, adding value to the presentation of each reference.`, images: [{ src: `${WP}/editar-ficha-vino-1-768x576.png`, alt: "Wine card – Sections" }] },
      ],
    },
    {
      title: "List display",
      faqs: [
        { q: "What display modes are available?", a: `Winerim offers three display modes for your wine list:\n\n• Carousel — Shows bottles prominently, one at a time, with horizontal scrolling.\n• Grid / List — Organises wines in a visual or list format for quick reading.\n• Traditional list — Reproduces the classic printed list format with an elegant, structured design.\n\nYou can set the default display mode from the editor panel, in the Settings section of the top menu.` },
        { q: "How do I share the list with QR and link?", a: `From the editor panel's top menu, go to the QR Codes section. You'll find several options:\n\n• App download — Links to download the application on iOS and Android.\n• Download QR — Your guests can download the app directly. Once installed, they just enter the access code.\n• Public link and direct QR — A web link and its QR to access the list without an app. You can use this QR on physical supports like printed menus, tables, labels or displays.\n\nWith these options you can offer the list conveniently and flexibly, whether from the guest's device or via a restaurant tablet.` },
      ],
    },
    {
      title: "Stock and orders",
      faqs: [
        { q: "How does stock control work?", a: `From the control panel you can access the Stock tab for detailed tracking of available bottles.\n\nYou'll find the complete list of references with the ability to:\n\n• Modify current stock for each wine.\n• Set a minimum threshold so the reference disappears automatically when depleted.\n• Manually subtract sales when they occur.\n\nTo edit any of these, click the pencil icon. You can enter the number of available bottles, set the alert threshold and locate the bottle within your cellar so any team member can find it quickly.` },
        { q: "How do I register an order?", a: `From the Orders tab on the Stock page, you can track purchases fully.\n\nYou'll find: List of placed orders, Orders in progress, Register a new order and Distributor directory.\n\n📦 Track orders in progress: Go to the Orders in progress tab for a detailed list.\n\n🧾 Supplier directory: Before registering an order, set up your supplier directory. Click "Distributor directory", click "Add" and enter the supplier's details. Then select the references they supply.\n\n🍷 Register a new order: Select the supplier, click "Add wine", mark the references to restock, enter the number of bottles and the purchase amount.\n\nThe order will be registered and automatically added to stock once received. The system tracks the total amount to analyse cellar profitability.` },
      ],
    },
    {
      title: "Staff and sales",
      faqs: [
        { q: "How do I record sales by waiter?", a: `From the staff screen you can add all professionals who work with wine at the restaurant. When they make a sale, they enter their code and the sale is recorded under that waiter.\n\nFrom the sales history tab, you can see what was sold and who served that table.` },
      ],
    },
    {
      title: "Artificial Intelligence (AI) in Winerim",
      faqs: [
        { q: "What exactly does AI do in Winerim?", a: `Winerim's AI helps you automatically generate, complete and improve information on your wine list and dishes. It analyses data like wine type, winery, tasting notes and pairings, and proposes professional texts ready to publish.` },
        { q: "Where can I access the AI tools?", a: `You can access them from several places:\n\n• In Settings → AI Automations, you'll find all AI modules, from Wine attributes to AI Pairings and AI Automations.\n\n• In the Pairing Pro section, AI handles automating pairings when importing your list.\n\n• Within each wine or dish, you'll see the star ✨ icons in sections like General information, General characteristics, Tasting notes, Winery, Storytelling or Quick Sheet.` },
        { q: "How does automatic content generation work?", a: `Simply click the star ✨ button next to any text block. The AI will automatically generate content adapted to your wine or dish, using available information (name, type, DO, grape, winery, etc.). You can edit, rewrite or regenerate the text as many times as you like until you're satisfied.` },
        { q: "What are automatic AI pairings?", a: `When you import your list or add a new dish, the AI analyses the ingredients, culinary style and your wine characteristics to propose perfect wine-food combinations. This saves you time and improves list coherence, especially with many wines or a changing menu.` },
        { q: 'What do "AI Automations" do?', a: `AI Automations let you keep your list dynamic and up-to-date without doing everything manually.\n\nYou can activate automatic processes such as:\n\n🔄 Recommended rotation — AI periodically changes highlighted wines based on your chosen strategy (e.g. show the most expensive or highest rated), maximum number of recommendations and rotation frequency in days.\n\n🍷 Pairing rotation — Automates the renewal of wine-dish pairings, defining maximum pairings and update frequency.\n\n🆕 New arrivals automation — When you add new wines, AI adds them to the New Arrivals section and removes them after the configured number of days.` },
        { q: "Can I edit AI-generated texts?", a: `Yes, absolutely. Everything generated by AI can be edited, expanded or manually rewritten. Winerim gives you full control: AI helps you save time, but you decide the final tone and style.` },
        { q: "What type of content can AI generate?", a: `AI can generate:\n\n• Complete wine cards (characteristics, tasting notes, winery information, etc.).\n• Quick Sheets with summarised service data.\n• Wine-dish pairing suggestions.\n• Automatic dish descriptions when importing them.` },
        { q: "Does AI replace the sommelier or just assist?", a: `AI doesn't replace the sommelier: it assists them. It's designed to speed up daily work, keep the list always updated and offer coherent, professional descriptions. Human expertise remains key for adjusting nuances and the personality of each list.` },
        { q: "Do I need technical skills to use AI?", a: `No. Everything is integrated within Winerim's panel, with visible buttons and guided actions. You just need to select where you want to apply AI and click. The system handles the rest.` },
        { q: "Can I use AI in multiple languages?", a: `Yes. Winerim's AI is ready to generate content in several languages based on your list or site configuration. This lets you maintain a multilingual list without manually translating each text.` },
      ],
    },
  ],
  it: [
    {
      title: "Pannello generale",
      faqs: [
        { q: "Come aggiungere un nuovo vino alla carta?", a: `Per aggiungere un nuovo vino alla tua carta, segui questi passaggi dal pannello di controllo:\n\n1. Aggiungi un nuovo vino: Clicca sul pulsante "Aggiungi vino". Nella barra di ricerca, digita il nome del vino e seleziona l'icona + quando appare il risultato corretto. Inserisci le variabili di prezzo e salva le modifiche.\n\n2. Richiedi un vino non presente: Se il vino non è nel database, clicca "Richiedi vino". Se il sistema lo trova, dovrai solo completare le variabili di prezzo.\n\n💡 Suggerimento: Winerim ti mostrerà i prezzi di riferimento usati da ristoranti della tua stessa categoria.\n\n3. Richiesta manuale: Se il vino non appare, compila: Nome del vino, Cantina, Tipo, Annata e Variabili di prezzo. Clicca "Invia richiesta".` },
        { q: "Come riorganizzare i vini nella carta?", a: `Riorganizzare i vini è molto semplice.\n\n1. Vai alla categoria: Dal pannello, seleziona la categoria (Spumanti, Bianchi, Rossi, Rosati o Fortificati).\n2. Entra in modalità ordinamento: Clicca il pulsante in alto a destra.\n3. Trascina e rilascia: Trascina ogni vino nella posizione desiderata.\n4. Ordinamento automatico: Usa "Ordina per:" con criteri come Nome, Cantina, Regione, Paese o Prezzo.\n5. Salva le modifiche.\n6. Annulla le modifiche se necessario.` },
        { q: "Come usare i filtri dell'editor?", a: `Per trovare un vino nella lista, usa i filtri:\n\n• Tutti — Mostra tutti i vini, attivi o inattivi.\n• Attivi — Solo i vini visibili nella carta.\n• Inattivi — Vini disattivati ma ancora nel database.\n• Con prezzo — Solo vini con prezzo assegnato.\n• Senza prezzo — Vini senza prezzo.\n• Esaurito stock — Vini senza stock disponibile.\n• Esauriti — Vini etichettati come esauriti.\n• Al calice — Solo vini disponibili al calice.\n• Ultimi aggiunti — Gli ultimi vini inseriti.` },
        { q: "Come usare la ricerca dell'editor?", a: `Le carte dei vini possono essere molto lunghe. Oltre ai filtri, puoi usare la barra di ricerca:\n\n1. Accedi alla ricerca: Clicca sulla barra in alto nell'editor.\n2. Digita il nome del vino.\n3. Visualizza i risultati: Il sistema mostrerà automaticamente i risultati corrispondenti.` },
        { q: "Come gestire le lingue della carta?", a: `La carta può essere configurata in più lingue.\n\n1. Lingua principale: Puoi aggiungere o modificare le lingue dal pannello cliccando "Gestisci lingue".\n2. Nuove lingue: Attivando una lingua, tutti gli elementi gestiti da Winerim verranno tradotti automaticamente.\n3. Testi personalizzati: I testi del ristorante devono essere tradotti manualmente. Winerim segnalerà le traduzioni mancanti con un avviso rosso.\n4. Inserire traduzioni: Cliccando sull'icona di avviso si aprirà un pannello per inserire la traduzione.` },
        { q: "Cos'è il modulo Pairing Avanzato?", a: `La versione base di Winerim include un abbinamento generico. Il modulo avanzato (Pairing PRO) permette di collegare ogni vino ai piatti specifici del ristorante o ai menu degustazione.\n\nAttivazione: Nel menu laterale troverai "Gestisci Pairing (PRO)".\nTipi di piatto: Inizia con i tipi (antipasti, primi, secondi, dessert).\nAggiungi piatti: Inserisci il nome, seleziona il tipo e i vini abbinati.\nMenu degustazione: Configura abbinamenti specifici per menu.` },
        { q: "Come stampare la carta dei vini?", a: `Dal pannello di controllo puoi stampare la carta aggiornata in PDF.\n\n1. Genera il PDF: Clicca "Stampa PDF". Configura: email di destinazione, lingua, immagini delle bottiglie e sezione.\n\n2. Esporta in CSV: Puoi anche esportare le referenze in formato CSV cliccando "Esporta CSV".` },
      ],
    },
    {
      title: "Visualizzazione delle referenze",
      faqs: [
        { q: "Quali azioni si possono fare su ogni vino?", a: `Passando il mouse su un vino, appaiono diverse icone:\n\n1. Modifica — Icona matita per modificare la scheda.\n2. Duplica — Per creare una nuova referenza basata su una esistente.\n3. Elimina — Icona cestino per eliminare definitivamente. ⚠️ Azione irreversibile.\n4. Aggiungi a "Selezione" — Categoria speciale dei vini più rappresentativi.\n5. Aggiungi a "Consigliati" — Icona stella per evidenziare il vino.\n6. Segna come "Novità" — Il vino apparirà come nuova aggiunta.` },
        { q: "Come funziona la sezione vini consigliati?", a: `Puoi creare una selezione speciale di vini consigliati.\n\n1. Segna i vini: Clicca l'icona stella sulle referenze desiderate.\n2. Configura la visualizzazione: Vai a "Il mio account" → "Impostazioni" → "Etichette e sezioni".\n3. Personalizza il nome: Massimo 27 caratteri.\n4. Traduzione: Ricorda di tradurre il nome in tutte le lingue attive.` },
        { q: "Come funzionano le novità?", a: `Quando aggiungi un nuovo vino, puoi contrassegnarlo come "Novità".\n\n1. Segna il vino come novità dall'editor.\n2. Configura la sezione nelle Impostazioni.\n3. Personalizza il nome mostrato al cliente.` },
        { q: "Si può cambiare l'immagine della bottiglia?", a: `No. Questo garantisce uniformità visiva e coerenza estetica in tutta la carta, preservando uno stile omogeneo e professionale.` },
      ],
    },
    {
      title: "Confronto prezzi",
      faqs: [
        { q: "Come funziona il modulo di confronto prezzi?", a: `Il modulo mostra il prezzo medio a cui altri ristoranti della tua categoria offrono un determinato vino. Winerim mostra:\n\n• Prezzo medio\n• Prezzo minimo\n• Prezzo massimo\n\nPuoi verificare se il tuo prezzo è nella media. I dati provengono da un algoritmo che considera prezzo medio del coperto e dimensione della cantina.` },
      ],
    },
    {
      title: "Valutazioni dei critici",
      faqs: [
        { q: "Come gestire le valutazioni dei critici?", a: `Puoi aggiungere o gestire le valutazioni dei critici dalla scheda di ogni vino.\n\nVai all'editor, seleziona il vino e vai alla sezione Valutazioni. Clicca Modifica per accedere alla lista. Puoi gestire quelle esistenti o aggiungere nuovi punteggi di critici come Parker, Peñín e altri.` },
      ],
    },
    {
      title: "Visualizzazione della carta",
      faqs: [
        { q: "Quali modalità di visualizzazione esistono?", a: `Winerim offre tre modalità:\n\n• Carosello — Mostra le bottiglie una alla volta con scorrimento orizzontale.\n• Griglia / Lista — Organizza i vini in formato visivo o elenco.\n• Carta tradizionale — Riproduce il formato classico stampato.\n\nPuoi configurare la modalità predefinita nelle Impostazioni.` },
        { q: "Come condividere la carta con QR e link?", a: `Dal menu superiore, vai a Codici QR. Troverai:\n\n• Download app — Link per iOS e Android.\n• QR download — I clienti possono scaricare l'app direttamente.\n• Link pubblico e QR diretto — Un link web e il suo QR per accedere senza app. Puoi usare il QR su supporti fisici.` },
      ],
    },
    {
      title: "Stock e ordini",
      faqs: [
        { q: "Come funziona il controllo stock?", a: `Dal pannello, accedi alla scheda Stock per il monitoraggio dettagliato.\n\nPuoi:\n• Modificare lo stock attuale di ogni vino.\n• Definire una soglia minima per la rimozione automatica.\n• Sottrarre vendite manualmente.\n\nClicca l'icona matita per modificare. Puoi inserire il numero di bottiglie, impostare la soglia di avviso e indicare la posizione in cantina.` },
        { q: "Come registrare un ordine?", a: `Dalla scheda Ordini nella pagina Stock puoi gestire completamente gli acquisti.\n\nTroverai: Lista ordini effettuati, Ordini in corso, Registra nuovo ordine e Rubrica distributori.\n\n📦 Monitoraggio ordini in corso dalla scheda dedicata.\n🧾 Rubrica fornitori: Configura i fornitori prima di registrare un ordine.\n🍷 Nuovo ordine: Seleziona il fornitore, aggiungi vini, inserisci quantità e importo.\n\nL'ordine viene registrato e sommato automaticamente allo stock una volta ricevuto.` },
      ],
    },
    {
      title: "Personale e vendite",
      faqs: [
        { q: "Come registrare le vendite per cameriere?", a: `Dalla schermata del personale puoi aggiungere tutti i professionisti che lavorano con il vino. Quando effettuano una vendita, inseriscono il loro codice e la vendita viene registrata.\n\nDalla scheda cronologia vendite puoi vedere cosa è stato venduto e chi ha servito.` },
      ],
    },
    {
      title: "Intelligenza Artificiale (IA) in Winerim",
      faqs: [
        { q: "Cosa fa esattamente l'IA in Winerim?", a: `L'IA di Winerim ti aiuta a generare, completare e migliorare automaticamente le informazioni della tua carta dei vini e dei piatti. Analizza dati come tipo di vino, cantina, note di degustazione e abbinamenti, proponendo testi professionali pronti per la pubblicazione.` },
        { q: "Dove posso accedere agli strumenti IA?", a: `Da diversi punti:\n\n• In Impostazioni → Automatizzazioni IA trovi tutti i moduli.\n• Nella sezione Pairing Pro, l'IA automatizza gli abbinamenti.\n• All'interno di ogni vino o piatto, vedrai le icone stella ✨.` },
        { q: "Come funziona la generazione automatica di contenuti?", a: `Clicca il pulsante stella ✨ accanto a qualsiasi blocco di testo. L'IA genererà contenuto adattato al tuo vino o piatto. Puoi modificare, riscrivere o rigenerare il testo quante volte vuoi.` },
        { q: "Cosa sono gli abbinamenti automatici con IA?", a: `Quando importi la carta o aggiungi un piatto, l'IA analizza ingredienti, stile culinario e caratteristiche dei vini per proporre combinazioni perfette.` },
        { q: 'Cosa fanno le "Automatizzazioni IA"?', a: `Le Automatizzazioni IA mantengono la carta aggiornata automaticamente.\n\n🔄 Rotazione consigliati — L'IA cambia periodicamente i vini in evidenza.\n🍷 Rotazione abbinamenti — Rinnova automaticamente gli abbinamenti.\n🆕 Automatizzazione novità — I nuovi vini vengono aggiunti e rimossi dalla sezione Novità automaticamente.` },
        { q: "Posso modificare i testi generati dall'IA?", a: `Sì, certamente. Tutto ciò che genera l'IA può essere modificato, ampliato o riscritto manualmente. Hai il controllo totale.` },
        { q: "Che tipo di contenuti può generare l'IA?", a: `L'IA può generare:\n\n• Schede vino complete.\n• Quick Sheet con dati riassuntivi.\n• Suggerimenti di abbinamento.\n• Descrizioni automatiche dei piatti.` },
        { q: "L'IA sostituisce il sommelier?", a: `No, lo assiste. È pensata per velocizzare il lavoro quotidiano e offrire descrizioni coerenti. La competenza umana resta fondamentale.` },
        { q: "Servono competenze tecniche per usare l'IA?", a: `No. Tutto è integrato nel pannello con pulsanti visibili e azioni guidate. Basta selezionare dove applicare l'IA e cliccare.` },
        { q: "Posso usare l'IA in più lingue?", a: `Sì. L'IA è pronta per generare contenuti in diverse lingue in base alla configurazione della carta. Puoi mantenere una carta multilingue senza tradurre manualmente ogni testo.` },
      ],
    },
  ],
  fr: [
    {
      title: "Panneau général",
      faqs: [
        { q: "Comment ajouter un nouveau vin à la carte ?", a: `Pour ajouter un nouveau vin, suivez ces étapes depuis votre panneau de contrôle :\n\n1. Ajouter un vin : Cliquez sur "Ajouter un vin". Dans la barre de recherche, tapez le nom et sélectionnez l'icône + quand le résultat apparaît. Entrez les variables de prix et sauvegardez.\n\n2. Demander un vin non répertorié : Si le vin n'est pas dans la base, cliquez "Demander un vin". Le système le trouvera peut-être dans notre base de données.\n\n💡 Conseil : Winerim vous montrera les prix de référence utilisés par des restaurants de votre catégorie.\n\n3. Demande manuelle : Si le vin n'apparaît pas, remplissez : Nom, Domaine, Type, Millésime et Variables de prix. Cliquez "Envoyer la demande".` },
        { q: "Comment réorganiser les vins de la carte ?", a: `Réorganiser les vins est très simple.\n\n1. Accédez à la catégorie : Sélectionnez la catégorie (Effervescents, Blancs, Rouges, Rosés ou Fortifiés).\n2. Mode tri : Cliquez le bouton en haut à droite.\n3. Glisser-déposer : Faites glisser chaque vin à la position souhaitée.\n4. Tri automatique : Utilisez "Trier par :" (Nom, Domaine, Région, Pays ou Prix).\n5. Sauvegardez les modifications.\n6. Annulez si nécessaire.` },
        { q: "Comment utiliser les filtres de l'éditeur ?", a: `Pour trouver un vin, utilisez les filtres :\n\n• Tous — Affiche tous les vins, actifs ou inactifs.\n• Actifs — Uniquement les vins visibles.\n• Inactifs — Vins désactivés mais toujours dans la base.\n• Avec prix — Vins avec un prix attribué.\n• Sans prix — Vins sans prix.\n• Rupture de stock — Vins sans stock disponible.\n• Épuisés — Vins étiquetés comme épuisés.\n• Au verre — Vins disponibles au verre.\n• Derniers ajoutés — Les derniers vins ajoutés.` },
        { q: "Comment utiliser la recherche de l'éditeur ?", a: `En plus des filtres, utilisez la barre de recherche :\n\n1. Cliquez sur la barre de recherche en haut de l'éditeur.\n2. Tapez le nom du vin.\n3. Les résultats s'affichent automatiquement au fur et à mesure de la saisie.` },
        { q: "Comment gérer les langues de la carte ?", a: `La carte peut être configurée en plusieurs langues.\n\n1. Langue principale : Ajoutez ou modifiez les langues en cliquant "Gérer les langues".\n2. Nouvelles langues : L'activation traduit automatiquement les éléments gérés par Winerim.\n3. Textes personnalisés : Les textes du restaurant doivent être traduits manuellement. Winerim signalera les traductions manquantes.\n4. Saisir les traductions : Cliquez sur l'icône d'alerte pour ouvrir le panneau de traduction.` },
        { q: "Qu'est-ce que le module Pairing Avancé ?", a: `La version de base inclut un accord générique. Le module avancé (Pairing PRO) permet de lier chaque vin aux plats spécifiques de votre carte ou menus dégustation.\n\nActivation : Bouton "Gérer Pairing (PRO)" dans le menu latéral.\nTypes de plat : Commencez par les types (entrées, plats, desserts).\nAjouter des plats : Nom, type, statut et vins associés.\nMenus dégustation : Configurez des accords spécifiques par menu.` },
        { q: "Comment imprimer la carte des vins ?", a: `Depuis le panneau, vous pouvez imprimer la carte en PDF.\n\n1. Générer le PDF : Cliquez "Imprimer PDF". Configurez : email, langue, images et section.\n\n2. Exporter en CSV : Cliquez "Exporter CSV" pour un fichier de gestion interne.` },
      ],
    },
    {
      title: "Affichage des références",
      faqs: [
        { q: "Quelles actions peut-on faire sur chaque vin ?", a: `En survolant un vin, plusieurs icônes apparaissent :\n\n1. Modifier — Icône crayon.\n2. Dupliquer — Pour créer une nouvelle référence basée sur une existante.\n3. Supprimer — Icône poubelle. ⚠️ Irréversible.\n4. Ajouter à "Sélection" — Catégorie spéciale des vins les plus représentatifs.\n5. Ajouter aux "Recommandés" — Icône étoile.\n6. Marquer comme "Nouveauté".` },
        { q: "Comment fonctionne la section vins recommandés ?", a: `Créez une sélection de vins recommandés.\n\n1. Marquez les vins avec l'icône étoile.\n2. Configurez l'affichage dans "Mon compte" → "Paramètres" → "Étiquettes et sections".\n3. Personnalisez le nom (max 27 caractères).\n4. N'oubliez pas de traduire le nom dans toutes les langues actives.` },
        { q: "Comment fonctionnent les nouveautés ?", a: `Marquez un vin comme "Nouveauté" pour que les clients identifient les derniers ajouts.\n\n1. Activez l'étiquette depuis l'éditeur.\n2. Configurez la section dans les Paramètres.\n3. Personnalisez le nom affiché.` },
        { q: "Peut-on changer l'image de la bouteille ?", a: `Non. Cela garantit l'uniformité visuelle et la cohérence esthétique de toute la carte, préservant un style homogène et professionnel.` },
      ],
    },
    {
      title: "Comparatif de prix",
      faqs: [
        { q: "Comment fonctionne le module de comparaison de prix ?", a: `Le module montre le prix moyen auquel d'autres restaurants de votre catégorie proposent un vin donné. Winerim affiche :\n\n• Prix moyen\n• Prix minimum\n• Prix maximum\n\nVous pouvez vérifier si votre prix est dans la moyenne. Les données proviennent d'un algorithme tenant compte du prix moyen du couvert et de la taille de la cave.` },
      ],
    },
    {
      title: "Notes des critiques",
      faqs: [
        { q: "Comment gérer les notes des critiques ?", a: `Vous pouvez ajouter ou gérer les notes des critiques depuis la fiche de chaque vin.\n\nAllez dans l'éditeur, sélectionnez le vin et naviguez vers la section Évaluations. Cliquez Modifier pour accéder à la liste. Vous pouvez gérer les existantes ou ajouter de nouveaux scores de critiques reconnus.` },
      ],
    },
    {
      title: "Affichage de la carte",
      faqs: [
        { q: "Quels modes d'affichage sont disponibles ?", a: `Winerim propose trois modes :\n\n• Carrousel — Affiche les bouteilles une par une avec défilement horizontal.\n• Grille / Liste — Organisation visuelle ou en liste.\n• Carte traditionnelle — Reproduit le format classique imprimé.\n\nConfigurez le mode par défaut dans les Paramètres.` },
        { q: "Comment partager la carte avec QR et lien ?", a: `Depuis le menu supérieur, allez à Codes QR. Vous trouverez :\n\n• Téléchargement de l'app — Liens iOS et Android.\n• QR de téléchargement — Les clients téléchargent l'app directement.\n• Lien public et QR direct — Un lien web et son QR pour accéder sans app. Utilisable sur supports physiques.` },
      ],
    },
    {
      title: "Stock et commandes",
      faqs: [
        { q: "Comment fonctionne le contrôle de stock ?", a: `Depuis le panneau, accédez à l'onglet Stock.\n\nVous pouvez :\n• Modifier le stock actuel de chaque vin.\n• Définir un seuil minimum pour le retrait automatique.\n• Soustraire les ventes manuellement.\n\nCliquez l'icône crayon pour modifier. Vous pouvez entrer le nombre de bouteilles, le seuil d'alerte et l'emplacement en cave.` },
        { q: "Comment enregistrer une commande ?", a: `Depuis l'onglet Commandes dans la page Stock.\n\nVous trouverez : Liste des commandes, Commandes en cours, Nouvelle commande et Répertoire distributeurs.\n\n📦 Suivi des commandes en cours.\n🧾 Répertoire fournisseurs : Configurez vos fournisseurs avant d'enregistrer.\n🍷 Nouvelle commande : Sélectionnez le fournisseur, ajoutez les vins, quantités et montants.\n\nLa commande est enregistrée et ajoutée automatiquement au stock à réception.` },
      ],
    },
    {
      title: "Personnel et ventes",
      faqs: [
        { q: "Comment enregistrer les ventes par serveur ?", a: `Depuis l'écran du personnel, ajoutez les professionnels travaillant avec le vin. Lors d'une vente, ils saisissent leur code et la vente est enregistrée.\n\nDepuis l'historique des ventes, vous voyez ce qui a été vendu et par qui.` },
      ],
    },
    {
      title: "Intelligence Artificielle (IA) dans Winerim",
      faqs: [
        { q: "Que fait exactement l'IA dans Winerim ?", a: `L'IA de Winerim vous aide à générer, compléter et améliorer automatiquement les informations de votre carte des vins et plats. Elle analyse les données et propose des textes professionnels prêts à publier.` },
        { q: "Où accéder aux outils IA ?", a: `Depuis plusieurs endroits :\n\n• Dans Paramètres → Automatisations IA.\n• Dans la section Pairing Pro.\n• Dans chaque fiche vin ou plat, via les icônes étoile ✨.` },
        { q: "Comment fonctionne la génération automatique de contenu ?", a: `Cliquez le bouton étoile ✨ à côté de tout bloc de texte. L'IA générera du contenu adapté. Vous pouvez modifier, réécrire ou régénérer autant de fois que souhaité.` },
        { q: "Que sont les accords automatiques IA ?", a: `Lors de l'import de la carte ou l'ajout d'un plat, l'IA analyse les ingrédients, le style culinaire et les caractéristiques des vins pour proposer des combinaisons parfaites.` },
        { q: 'Que font les "Automatisations IA" ?', a: `Elles maintiennent votre carte dynamique automatiquement.\n\n🔄 Rotation des recommandés — L'IA change périodiquement les vins mis en avant.\n🍷 Rotation des accords — Renouvellement automatique des accords.\n🆕 Automatisation des nouveautés — Les nouveaux vins sont ajoutés et retirés automatiquement.` },
        { q: "Peut-on modifier les textes générés par l'IA ?", a: `Oui, absolument. Tout ce que génère l'IA peut être modifié, enrichi ou réécrit manuellement. Vous gardez le contrôle total.` },
        { q: "Quels types de contenus l'IA peut-elle générer ?", a: `L'IA peut générer :\n\n• Fiches vin complètes.\n• Quick Sheets avec données résumées.\n• Suggestions d'accords.\n• Descriptions automatiques des plats.` },
        { q: "L'IA remplace-t-elle le sommelier ?", a: `Non, elle l'assiste. Elle est conçue pour accélérer le travail quotidien et offrir des descriptions cohérentes. L'expertise humaine reste essentielle.` },
        { q: "Faut-il des compétences techniques pour utiliser l'IA ?", a: `Non. Tout est intégré au panneau avec des boutons visibles et des actions guidées. Il suffit de sélectionner et cliquer.` },
        { q: "Peut-on utiliser l'IA en plusieurs langues ?", a: `Oui. L'IA est prête à générer du contenu en plusieurs langues selon la configuration de votre carte. Vous pouvez maintenir une carte multilingue sans traduction manuelle.` },
      ],
    },
  ],
};

/* ─── Component ─── */
const FAQs = () => {
  const { lang } = useLanguage();
  const chrome = CHROME[lang];
  const categories = faqData[lang];
  const allFaqs = categories.flatMap((c) => c.faqs);

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
  }, [allFaqs]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={chrome.seoTitle}
        description={chrome.seoDesc}
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
              {chrome.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6"
          >
            {chrome.h1pre} <span className="text-gradient-wine italic">{chrome.h1accent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            {chrome.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Category navigation */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={`#${slugify(cat.title)}`}
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
          {categories.map((cat, catIdx) => (
            <ScrollReveal key={cat.title} delay={catIdx * 0.05}>
              <div id={slugify(cat.title)} className="scroll-mt-28">
                <h2 className="font-heading text-xl md:text-2xl font-bold mb-5 text-wine">
                  {cat.title}
                </h2>
                <Accordion type="multiple" className="space-y-3">
                  {cat.faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`cat-${catIdx}-faq-${i}`}
                      id={slugify(faq.q)}
                      className="scroll-mt-28 rounded-xl border border-border bg-gradient-card px-6 data-[state=open]:border-wine/20 transition-colors"
                    >
                      <AccordionTrigger className="text-left font-heading font-semibold text-sm hover:no-underline py-5 gap-4">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                        <div className="whitespace-pre-line mb-4">{faq.a}</div>
                        {faq.images && faq.images.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            {faq.images.map((img, imgIdx) => (
                              <img
                                key={imgIdx}
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                decoding="async"
                                className="w-full rounded-lg border border-border object-cover"
                              />
                            ))}
                          </div>
                        )}
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
