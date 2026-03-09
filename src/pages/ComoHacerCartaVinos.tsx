import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const data: GuidePageData = {
  slug: "como-hacer-una-carta-de-vinos",
  metaTitle: "Cómo Hacer una Carta de Vinos Rentable | Guía Completa",
  metaDescription: "Aprende a diseñar una carta de vinos que venda: estructura, selección de referencias, pricing y presentación paso a paso para restaurantes.",
  heroTitle: "Cómo Hacer una Carta de Vinos",
  heroSubtitle: "Guía paso a paso para diseñar una carta de vinos rentable, bien estructurada y pensada para vender más en tu restaurante.",
  heroBadge: "Guía práctica",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Solicitar demo",
  ctaPrimaryUrl: "/demo",
  ctaSecondaryText: "Analiza tu carta",
  ctaSecondaryUrl: "/analisis-carta",
  ctaFinalTitle: "Diseña una carta de vinos que venda",
  ctaFinalDescription: "Winerim te ayuda a crear, optimizar y gestionar tu carta de vinos con datos, IA y herramientas pensadas para restaurantes.",
  tableOfContents: [
    "Define el perfil de tu restaurante",
    "Selecciona las referencias adecuadas",
    "Estructura la carta por secciones",
    "Fija los precios correctamente",
    "Diseña la presentación visual",
    "Incluye vino por copa",
    "Actualiza y optimiza periódicamente",
  ],
  sections: [
    {
      heading: "1. Define el perfil de tu restaurante",
      content: "Antes de elegir un solo vino, necesitas entender qué tipo de experiencia ofrece tu restaurante. La carta de vinos debe estar alineada con tu cocina, tu público y tu ticket medio.\n\nUn steakhouse no necesita la misma carta que un restaurante japonés. Un wine bar no tiene las mismas necesidades que un hotel con restaurante.",
      tips: [
        "Analiza tu menú gastronómico: ¿qué tipo de platos predominan?",
        "Identifica a tu cliente tipo: ¿busca explorar vinos o quiere una elección segura?",
        "Define tu rango de precios objetivo: ¿cuál es el ticket medio que buscas en vino?",
        "Estudia a tu competencia directa: ¿qué ofrecen y dónde puedes diferenciarte?",
      ],
      icon: "lightbulb",
    },
    {
      heading: "2. Selecciona las referencias adecuadas",
      content: "El número de referencias es clave. Demasiadas generan parálisis de elección y aumentan el stock muerto. Muy pocas limitan las oportunidades de venta.\n\nLa regla general es: entre 40 y 80 referencias para un restaurante medio, entre 100 y 200 para restaurantes con foco en vino.",
      tips: [
        "Incluye un equilibrio entre blancos, tintos, rosados y espumosos",
        "No olvides opciones accesibles: el vino de entrada es el que más se vende",
        "Añade 2-3 referencias premium que eleven el ticket medio",
        "Incorpora vinos locales o de denominación que conecten con tu identidad",
        "Rota las referencias que no se venden en 60-90 días",
      ],
      icon: "list",
    },
    {
      heading: "3. Estructura la carta por secciones",
      content: "Una carta bien estructurada guía al cliente hacia la decisión de compra. No se trata de listar vinos, sino de crear un recorrido lógico.\n\nLas estructuras más efectivas agrupan por estilo (fresco, afrutado, estructurado) o por momento de consumo, no solo por región o uva.",
      tips: [
        "Agrupa por estilo sensorial: fresco, afrutado, intenso, elegante",
        "Crea categorías claras con títulos descriptivos, no técnicos",
        "Coloca los vinos con mejor margen en las posiciones de mayor visibilidad",
        "Usa la técnica del ʻanclajeʼ: sitúa un vino premium junto a los de margen objetivo",
      ],
      icon: "check",
    },
    {
      heading: "4. Fija los precios correctamente",
      content: "El pricing del vino es uno de los factores que más impactan en la rentabilidad del restaurante. Un error común es aplicar un multiplicador fijo (x2, x3) sin considerar la elasticidad del precio.\n\nLos vinos de entrada deben tener un margen porcentual menor pero un volumen de venta alto. Los vinos premium pueden tener un margen bruto mayor con menor rotación.",
      tips: [
        "No uses un multiplicador fijo: adapta el margen por franja de precio",
        "Los vinos de 15-25€ en carta son los más vendidos: optimiza esa franja",
        "El vino más barato de la carta marca la percepción de precio: cuídalo",
        "Revisa los precios cada trimestre en función de las ventas reales",
      ],
      icon: "alert",
    },
    {
      heading: "5. Diseña la presentación visual",
      content: "La forma en que presentas la carta influye directamente en la decisión del cliente. Una carta clara, limpia y bien diseñada genera confianza y facilita la elección.\n\nLas cartas digitales permiten añadir notas de cata, maridajes y filtros que una carta en papel no puede ofrecer.",
      tips: [
        "Usa tipografías legibles y un diseño limpio sin saturar de información",
        "Incluye notas de cata breves que ayuden al cliente a elegir",
        "Añade sugerencias de maridaje junto a cada vino o sección",
        "Considera una carta digital que permita filtros y recomendaciones inteligentes",
      ],
      icon: "lightbulb",
    },
    {
      heading: "6. Incluye vino por copa",
      content: "El vino por copa es una de las herramientas más potentes para aumentar las ventas de vino. Reduce la barrera de entrada, permite explorar y genera márgenes superiores.\n\nLa selección de vino por copa debe rotar y estar alineada con la temporada y el menú.",
      tips: [
        "Ofrece entre 6 y 12 referencias por copa como punto de partida",
        "Incluye al menos un espumoso, un blanco, un rosado y dos tintos",
        "Fija el precio de la copa al equivalente del 30-40% de la botella",
        "Rota las referencias por copa cada 2-4 semanas para generar novedad",
      ],
      icon: "check",
    },
    {
      heading: "7. Actualiza y optimiza periódicamente",
      content: "Una carta de vinos no es estática. Debe evolucionar con los datos de venta, la temporada y la oferta gastronómica.\n\nLos restaurantes que revisan su carta trimestralmente venden entre un 15% y un 25% más de vino que los que la mantienen fija durante todo el año.",
      tips: [
        "Revisa las ventas por referencia cada mes y elimina los vinos que no rotan",
        "Ajusta la carta a la temporada: blancos frescos en verano, tintos potentes en invierno",
        "Analiza qué secciones de la carta generan más conversión",
        "Usa herramientas como Winerim para obtener datos reales de rendimiento",
      ],
      icon: "check",
    },
  ],
  faqs: [
    {
      q: "¿Cuántos vinos debe tener una carta de restaurante?",
      a: "Depende del tipo de restaurante. Un restaurante medio debería tener entre 40 y 80 referencias. Los restaurantes con foco en vino pueden llegar a 150-200. Lo importante es que cada referencia justifique su presencia con datos de venta.",
    },
    {
      q: "¿Es mejor organizar la carta por región o por estilo?",
      a: "Organizar por estilo sensorial (fresco, afrutado, intenso) es más efectivo para la mayoría de restaurantes. Facilita la elección del cliente y permite recomendar mejor. La organización por región funciona mejor en restaurantes especializados.",
    },
    {
      q: "¿Qué margen debe tener el vino en un restaurante?",
      a: "No hay un margen único. Los vinos de entrada (coste < 5€) suelen venderse con un multiplicador x3-x4. Los vinos de gama media (5-15€ coste) con x2.5-x3. Los premium (>15€ coste) con x2-x2.5. Lo importante es optimizar el margen bruto total, no el porcentaje individual.",
    },
    {
      q: "¿Cómo sé si mi carta de vinos funciona bien?",
      a: "Mide tres indicadores clave: porcentaje de mesas que piden vino, ticket medio en vino por mesa, y rotación de referencias. Si más del 30% de las referencias no se venden en 90 días, tu carta necesita optimización.",
    },
    {
      q: "¿Qué ventajas tiene una carta de vinos digital?",
      a: "Una carta digital permite filtros inteligentes, recomendaciones personalizadas, maridajes automáticos, actualización en tiempo real y análisis de datos de consumo. Todo esto se traduce en más ventas y mejor experiencia.",
    },
  ],
  relatedTools: [
    { label: "Calculadora de margen de vino", url: "/calculadora-margen-vino" },
    { label: "Analizador de carta de vinos", url: "/analisis-carta" },
  ],
  relatedGuides: [
    { label: "Cómo vender más vino en un restaurante", url: "/como-vender-mas-vino-en-un-restaurante" },
    { label: "Cómo fijar el precio del vino", url: "/precio-vino-restaurante" },
    { label: "Vino por copa en restaurante", url: "/vino-por-copa-restaurante" },
    { label: "Carta papel vs carta digital", url: "/carta-papel-vs-digital" },
  ],
};

const ComoHacerCartaVinos = () => <GuideTemplate data={data} />;

export default ComoHacerCartaVinos;
