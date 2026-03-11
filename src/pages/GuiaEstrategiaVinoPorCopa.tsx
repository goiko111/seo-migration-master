import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const data: GuidePageData = {
  slug: "guias/como-fijar-estrategia-rentable-vino-por-copa",
  metaTitle: "Cómo Fijar una Estrategia Rentable de Vino por Copa | Guía",
  metaDescription: "Guía completa para diseñar un programa de vino por copa rentable: selección, pricing, control de merma, rotación y formación del equipo de sala.",
  heroTitle: "Cómo fijar una estrategia rentable de vino por copa",
  heroSubtitle: "El vino por copa es una de las palancas de margen más potentes en restauración. Pero sin una estrategia clara, se convierte en una fuente de merma y oportunidades perdidas.",
  heroBadge: "Guía estratégica",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Analizar mi carta",
  ctaPrimaryUrl: "/analisis-carta",
  ctaSecondaryText: "Solicitar demo",
  ctaSecondaryUrl: "/demo",
  ctaFinalTitle: "Automatiza tu programa de vino por copa",
  ctaFinalDescription: "Winerim gestiona automáticamente la selección, el pricing y la rotación de tu oferta por copa, con alertas de merma y recomendaciones inteligentes para tu equipo.",
  tableOfContents: [
    "Por qué el vino por copa es una palanca estratégica",
    "Errores que destruyen la rentabilidad de la copa",
    "Cómo diseñar la selección de copas",
    "Pricing por copa: la fórmula que funciona",
    "Control de merma: el coste invisible",
    "Rotación y estacionalidad",
  ],
  sections: [
    {
      heading: "1. Por qué el vino por copa es una palanca estratégica",
      content: "El vino por copa permite al cliente experimentar sin compromiso. Eso reduce la barrera de entrada y aumenta el número de mesas que consumen vino.\n\nDesde la perspectiva del negocio, la copa ofrece márgenes superiores a la botella. Si una botella se vende con un multiplicador ×2.5, las copas de esa misma botella pueden generar un multiplicador efectivo de ×4-5 si se venden todas.\n\nEl dato clave: los restaurantes con un programa de copa bien diseñado venden entre un 20% y un 40% más de vino que los que solo ofrecen botella.",
      tips: [
        "La copa elimina la barrera de la botella: el cliente que no quiere comprometerse con 30-50€ sí pide una copa de 6-9€",
        "El margen por copa es superior al de la botella porque el cliente valora la flexibilidad y la experiencia",
        "La copa permite explorar: un comensal que prueba un blanco por copa puede acabar pidiendo una botella de tinto",
        "Los restaurantes con buena oferta por copa tienen un ratio copa/botella del 30-45% en facturación de vino",
      ],
      icon: "lightbulb",
    },
    {
      heading: "2. Errores que destruyen la rentabilidad de la copa",
      content: "La mayoría de restaurantes que ofrecen vino por copa cometen al menos dos de estos errores. Identificarlos es el primer paso para construir un programa rentable.",
      tips: [
        "Selección estancada: las mismas copas durante meses. El cliente habitual deja de explorar y el equipo deja de recomendar",
        "Pricing copiado de la botella: dividir el precio de la botella entre 5 copas no es una estrategia — es renunciar al margen que la copa permite",
        "Merma ignorada: no medir cuánto se tira cada semana. En restaurantes sin control, la merma puede llegar al 20-30% del coste de copas abiertas",
        "Demasiadas copas abiertas: más de 10-12 copas simultáneas sin sistema de preservación genera merma inevitable",
        "Solo tintos por copa: el espumoso y el blanco por copa tienen una demanda altísima que muchos restaurantes desaprovechan",
        "El equipo no recomienda: si los camareros no saben qué copas tienen abiertas, no las recomiendan",
      ],
      icon: "alert",
    },
    {
      heading: "3. Cómo diseñar la selección de copas",
      content: "La selección de vinos por copa debe cubrir tres objetivos: variedad para el cliente, maridaje con la cocina y rentabilidad para el negocio.\n\nUna selección equilibrada para un restaurante medio incluye entre 6 y 10 referencias distribuidas así:",
      tips: [
        "1-2 espumosos: uno accesible (cava/prosecco) y uno premium (champagne) si el posicionamiento lo permite",
        "2-3 blancos: uno fresco y ligero, uno con cuerpo, y opcionalmente uno aromático o diferente",
        "1 rosado: especialmente en primavera-verano, la demanda de rosado por copa es muy alta",
        "2-3 tintos: uno joven y fresco, uno con crianza media, y opcionalmente uno premium",
        "0-1 dulce/generoso: un fino, un PX o un moscatel pueden ser un cierre perfecto y tienen merma muy baja",
        "Cada copa debe cumplir una función distinta: no pongas dos blancos del mismo estilo y precio",
        "Prioriza vinos versátiles que mariden con varios platos de tu menú",
      ],
      icon: "check",
    },
    {
      heading: "4. Pricing por copa: la fórmula que funciona",
      content: "El pricing de la copa no debería ser una fracción del precio de la botella. Debería calcularse con el objetivo de cubrir el coste de la botella completa con las 2-3 primeras copas vendidas.\n\nEsto deja las copas restantes como beneficio neto, incluso asumiendo merma de 1-2 copas.\n\nLa fórmula práctica: PVP copa = (Coste botella / copas de equilibrio) × margen objetivo.\n\nSi una botella cuesta 8€ y quieres cubrir el coste con 2.5 copas: PVP copa = (8 / 2.5) × 2.5 = 8€ por copa. Con 5 copas por botella, generas 40€ de ingresos sobre un coste de 8€ — multiplicador efectivo ×5.",
      tips: [
        "Objetivo: cubrir el coste de la botella con las primeras 2-3 copas vendidas",
        "Multiplicador efectivo por copa: ×3.5 a ×5 es el rango óptimo según el posicionamiento",
        "No uses precios redondos exactos: 7.50€ funciona mejor que 8€ en percepción de valor",
        "Diferencia precios por estilo: el espumoso y los blancos premium admiten pricing más alto por copa",
        "Revisa el pricing mensualmente en función de costes actualizados y datos de venta",
      ],
      icon: "lightbulb",
    },
    {
      heading: "5. Control de merma: el coste invisible",
      content: "La merma es el gran enemigo del vino por copa. Un restaurante que no la mide probablemente está perdiendo entre el 15% y el 25% de su inversión en copas abiertas sin saberlo.\n\nLa merma tiene tres causas principales: oxidación (botellas abiertas demasiado tiempo), servicio excesivo (copas demasiado generosas) y producto no vendido (botellas que se abren y no se terminan).",
      tips: [
        "Registra cada apertura: fecha, hora, responsable y número de copas servidas antes de desechar",
        "Establece un protocolo de conservación: un blanco abierto dura 2-3 días con tapón; un tinto, 3-5 días. Con sistema de preservación, 7-14 días",
        "Mide la merma semanalmente en unidades y en euros — es el único dato que te dice si tu programa de copa es rentable",
        "Estandariza el servicio: 150ml por copa es el estándar. Usa marcadores en la copa o dosificadores",
        "Con más de 8 copas simultáneas, un sistema de preservación (Coravin, nitrógeno) se paga solo en semanas",
        "Objetivo de merma: < 10% del coste de copas abiertas. Si supera el 15%, tu programa tiene un problema",
      ],
      icon: "alert",
    },
    {
      heading: "6. Rotación y estacionalidad",
      content: "Una selección de copas que no cambia es una selección que deja de vender. La rotación mantiene el interés del cliente habitual y da al equipo algo nuevo que recomendar.\n\nEl modelo ideal combina referencias fijas (las que siempre se venden bien) con referencias rotativas (las que cambian cada 2-4 semanas).",
      tips: [
        "Mantén 60-70% de referencias fijas (tus best-sellers) y rota el 30-40% restante",
        "En verano, aumenta la proporción de blancos, rosados y espumosos; en invierno, tintos con cuerpo",
        "Usa la rotación para probar nuevos vinos del catálogo antes de incluirlos en la carta de botella",
        "Comunica los cambios al equipo antes de cada servicio: si no saben que hay una copa nueva, no la recomiendan",
        "Vincula la rotación a la cocina: cuando cambia el menú de temporada, ajusta las copas",
        "Registra el rendimiento de cada copa rotativa: algunas se convertirán en fijas, otras confirmarán que fue bueno probar pero no repetir",
      ],
      icon: "check",
    },
  ],
  faqs: [
    { q: "¿Cuántos vinos por copa debería ofrecer?", a: "Entre 6 y 10 para la mayoría de restaurantes. Menos de 4 limita al cliente; más de 12 genera merma difícil de controlar sin sistema de preservación." },
    { q: "¿Es rentable ofrecer vino por copa sin sistema de preservación?", a: "Sí, pero limitando a 6-8 copas y con un protocolo de conservación estricto. A partir de 8-10 copas simultáneas, el sistema de preservación se justifica económicamente." },
    { q: "¿Cuánto margen debería tener una copa de vino?", a: "El objetivo es un margen bruto superior al 70% sobre PVP. Esto es más alto que la botella porque el cliente paga por la flexibilidad." },
    { q: "¿Cada cuánto debería rotar las copas?", a: "Las referencias rotativas deberían cambiar cada 2-4 semanas. Las fijas se mantienen mientras vendan bien, revisándolas trimestralmente." },
    { q: "¿El vino por copa canibaliza la venta de botella?", a: "No. Los datos muestran que la copa funciona como puerta de entrada: muchos clientes que prueban una copa acaban pidiendo una botella, ya sea en esa visita o en la siguiente." },
  ],
  relatedTools: [
    { label: "Calculadora de precio por copa", url: "/herramientas/calculadora-precio-vino-por-copa" },
    { label: "Diagnóstico de vino por copa", url: "/herramientas/diagnostico-vino-por-copa" },
    { label: "Calculadora de margen de vino", url: "/calculadora-margen-vino" },
  ],
  relatedGuides: [
    { label: "Plantilla de estrategia de vinos por copa", url: "/recursos/plantilla-estrategia-vinos-por-copa" },
    { label: "Benchmark: estrategia por copa", url: "/benchmarks-playbooks/benchmark-estrategia-por-copa" },
    { label: "Playbook: optimizar vino por copa", url: "/benchmarks-playbooks/playbook-optimizar-vino-copa" },
  ],
};

const GuiaEstrategiaVinoPorCopa = () => <GuideTemplate data={data} />;
export default GuiaEstrategiaVinoPorCopa;
