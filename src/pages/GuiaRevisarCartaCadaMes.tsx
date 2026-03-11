import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const data: GuidePageData = {
  slug: "guias/como-revisar-carta-vinos-cada-mes",
  metaTitle: "Cómo Revisar tu Carta de Vinos Cada Mes Sin Perder el Control | Winerim",
  metaDescription: "Guía con proceso estructurado para revisar tu carta de vinos mensualmente: qué medir, qué decidir, qué comunicar al equipo y cómo hacerlo en menos de 90 minutos.",
  heroTitle: "Cómo revisar una carta de vinos cada mes sin perder el control",
  heroSubtitle: "Las mejores cartas de vino no son las que tienen los mejores vinos. Son las que se revisan con disciplina. Un proceso mensual de 90 minutos puede transformar tu rentabilidad. Esta guía te dice exactamente qué hacer.",
  heroBadge: "Guía operativa",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  tableOfContents: [
    "Por qué la revisión mensual es imprescindible",
    "Los 5 bloques de una revisión mensual completa",
    "Bloque 1: Rendimiento — qué ha pasado este mes",
    "Bloque 2: Pricing — qué ajustar",
    "Bloque 3: Rotación — qué entra, qué sale",
    "Bloque 4: Equipo — qué comunicar",
    "Bloque 5: Objetivos — qué esperar el mes que viene",
    "Plantilla de la reunión de 90 minutos",
  ],
  sections: [
    {
      heading: "Por qué la revisión mensual es imprescindible",
      content: "Una carta de vinos no revisada es una carta que se degrada. Cada mes sin revisión es un mes donde:\n\n• Los vinos muertos acumulan capital inmovilizado.\n• Los precios de compra cambian sin que el PVP se ajuste.\n• Las oportunidades estacionales se pierden.\n• El equipo repite las mismas recomendaciones sin saber qué funciona.\n• Las decisiones se toman por inercia, no por datos.\n\nLa mayoría de restaurantes revisan la carta solo cuando 'toca' (cambio de temporada) o cuando algo falla (un proveedor deja de servir). Eso no es gestión. Es reacción.\n\nLa revisión mensual convierte tu carta en un activo dinámico que mejora cada mes.",
      tips: [
        "Un restaurante que revisa la carta cada mes genera un 12-18% más de margen bruto en vino que uno que la revisa cada 6 meses.",
        "El primer lunes de cada mes. Marca la reunión en el calendario y no la canceles. 90 minutos.",
        "Si no tienes datos, empieza registrando manualmente qué vinos se venden cada semana. Datos imperfectos son infinitamente mejores que ningún dato.",
      ],
      icon: "lightbulb",
    },
    {
      heading: "Los 5 bloques de una revisión mensual completa",
      content: "Una revisión eficaz cubre 5 áreas en orden. No necesitas profundizar en todas cada mes, pero sí revisarlas todas.\n\n1. Rendimiento: qué ha pasado con los números.\n2. Pricing: qué precios necesitan ajuste.\n3. Rotación: qué referencias deben entrar o salir.\n4. Equipo: qué debe saber el personal de sala.\n5. Objetivos: qué esperar del mes siguiente.\n\nTiempo estimado: 15-20 min por bloque. Total: 75-90 minutos.",
      tips: [
        "Sigue siempre el mismo orden. La disciplina de proceso genera resultados consistentes.",
        "Toma decisiones durante la reunión, no después. El objetivo es salir con acciones concretas.",
        "Documenta las decisiones en una plantilla estándar. Lo que no se documenta se olvida.",
      ],
      icon: "list",
    },
    {
      heading: "Bloque 1: Rendimiento — qué ha pasado este mes",
      content: "Dedica los primeros 20 minutos a entender qué ha pasado. No a opinar, a medir.",
      tips: [
        "Top 5 y bottom 5 referencias por ventas en unidades y en euros. ¿Son las esperadas?",
        "Ticket medio en vino por mesa. ¿Ha subido, bajado o se mantiene respecto al mes anterior?",
        "% de mesas que piden vino. ¿Está en línea con el objetivo?",
        "Ratio copa vs botella. ¿Evoluciona hacia donde quieres?",
        "Referencias sin venta en los últimos 30 días. ¿Cuántas son y cuánto capital representan?",
        "Comparación con el mes anterior: identifica tendencias, no solo números estáticos.",
      ],
      icon: "check",
    },
    {
      heading: "Bloque 2: Pricing — qué ajustar",
      content: "El pricing es el factor que más impacta en el margen y el menos revisado en la mayoría de restaurantes.",
      tips: [
        "Verifica si algún coste de compra ha cambiado. Los distribuidores ajustan precios sin avisarte. Compara facturas.",
        "Calcula el margen real de tus top 10 referencias. ¿Está en el objetivo (65-72% margen bruto)?",
        "Revisa la coherencia de la escalera de precios. ¿Hay saltos bruscos entre tramos? ¿Huecos?",
        "Identifica oportunidades: ¿algún vino podría subir 1-2€ sin afectar a la demanda? Los vinos con alta rotación y bajo precio relativo son candidatos.",
        "Copas: recalcula el PVP considerando la merma real del último mes (copas servidas / botellas abiertas).",
      ],
      icon: "lightbulb",
    },
    {
      heading: "Bloque 3: Rotación — qué entra, qué sale",
      content: "La carta es un organismo vivo. Cada mes debería tener al menos un cambio, aunque sea pequeño.",
      tips: [
        "Candidatos a salir: referencias con menos de 3 ventas en 30 días Y margen inferior al objetivo. No ambos: ambos.",
        "Candidatos a entrar: ¿hay un hueco en la escalera de precios? ¿Una zona geográfica sin representar? ¿Una copa que necesita renovarse?",
        "Estacionalidad: ¿el próximo mes requiere ajustes? Más blancos y rosados en primavera/verano. Más tintos con cuerpo en otoño/invierno.",
        "Antes de añadir: verifica que la nueva referencia no canibaliza una existente (mismo estilo + rango de precio).",
        "Máximo 2-3 cambios por mes. Demasiados cambios desestabilizan al equipo y al stock.",
      ],
      icon: "alert",
    },
    {
      heading: "Bloque 4: Equipo — qué comunicar",
      content: "Las mejores decisiones de carta no sirven de nada si el equipo no las conoce. Dedica 10 minutos a preparar la comunicación.",
      tips: [
        "Qué vinos son nuevos este mes y cómo describirlos en 15 segundos.",
        "Cuál es la 'copa de la semana' o la referencia que deben recomendar activamente.",
        "Qué vinos han salido de carta y por qué (evita que sigan recomendándolos).",
        "Un dato motivador: cuánto ha subido el ticket medio, cuántas copas se han vendido, qué mesa pidió algo interesante.",
        "Formato: un briefing de 5 minutos antes del servicio del lunes. No hace falta más.",
      ],
      icon: "check",
    },
    {
      heading: "Bloque 5: Objetivos — qué esperar el mes que viene",
      content: "Termina la revisión con 3-5 objetivos concretos para el mes siguiente. Sin objetivos, la revisión es un ejercicio intelectual.",
      tips: [
        "Objetivo de ticket medio en vino: 'Subir de 8,50€ a 9€ por mesa'.",
        "Objetivo de rotación: 'Eliminar 2 referencias sin movimiento y sustituirlas'.",
        "Objetivo de copa: 'Aumentar el ratio copa/botella del 35% al 40%'.",
        "Objetivo de equipo: 'Que cada camarero recomiende la copa del mes al menos 5 veces por servicio'.",
        "Máximo 5 objetivos. Menos es más. Los objetivos imposibles desmotivan.",
      ],
      icon: "list",
    },
    {
      heading: "Plantilla de la reunión de 90 minutos",
      content: "Usa esta estructura para tu reunión mensual. Adáptala a tu restaurante pero no te saltes ningún bloque.\n\n0:00-0:05 — Repaso de objetivos del mes anterior: ¿se cumplieron?\n0:05-0:25 — Bloque 1: Rendimiento (datos)\n0:25-0:40 — Bloque 2: Pricing (ajustes)\n0:40-0:55 — Bloque 3: Rotación (entradas/salidas)\n0:55-1:05 — Bloque 4: Equipo (comunicación)\n1:05-1:15 — Bloque 5: Objetivos mes siguiente\n1:15-1:20 — Resumen de acciones y responsables\n1:20-1:30 — Margen para imprevistos\n\nParticipantes: propietario/director + responsable de vino (sumiller, jefe de sala o quien gestione la carta). Opcional: jefe de cocina (para estacionalidad y maridajes).",
      tips: [
        "Lleva los datos preparados antes de la reunión. La reunión es para decidir, no para recopilar.",
        "Documenta todo en una plantilla estándar. Winerim genera automáticamente el informe mensual que alimenta esta reunión.",
        "Si no puedes hacer 90 minutos, haz 45: bloque 1 (datos) + bloque 3 (rotación) + bloque 5 (objetivos). Lo demás puede esperar.",
      ],
      icon: "list",
    },
  ],
  faqs: [
    { q: "¿Qué pasa si no tengo datos de ventas por referencia?", a: "Empieza con un registro manual: marca en una libreta qué botellas se abren cada día. En un mes tendrás datos suficientes para tu primera revisión seria." },
    { q: "¿Quién debe liderar la revisión?", a: "Idealmente, la persona que gestiona la carta (sumiller, jefe de sala). Si no hay nadie, el propietario o director con los datos que proporciona Winerim." },
    { q: "¿Y si mi carta es pequeña (15-20 referencias)?", a: "Mejor. La revisión será más rápida (45 min) y cada decisión tiene más impacto. Una carta pequeña bien gestionada supera a una carta grande descuidada." },
    { q: "¿Winerim automatiza esta revisión?", a: "Sí. Winerim genera un informe mensual con los 5 bloques prepoblados: rendimiento, alertas de pricing, candidatos a rotación, fichas para el equipo y seguimiento de objetivos." },
  ],
  relatedTools: [
    { label: "Scorecard mensual", url: "/recursos/scorecard-rendimiento-carta" },
    { label: "Plantilla de revisión mensual", url: "/recursos/plantilla-revision-mensual-carta" },
  ],
  relatedGuides: [
    { label: "Conectar carta, stock, ventas y margen", url: "/guias/como-conectar-carta-stock-ventas-margen" },
    { label: "Detectar vinos muertos", url: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad" },
    { label: "Mejorar la rotación de vinos", url: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante" },
  ],
  ctaPrimaryText: "Solicitar demo",
  ctaPrimaryUrl: "/demo",
  ctaSecondaryText: "Descargar plantilla de revisión",
  ctaSecondaryUrl: "/recursos/plantilla-revision-mensual-carta",
  ctaFinalTitle: "Con Winerim, la revisión mensual se prepara sola",
  ctaFinalDescription: "Rendimiento, pricing, rotación, formación y objetivos. Winerim genera el informe mensual de tu carta automáticamente para que tú solo decidas.",
};

const GuiaRevisarCartaCadaMes = () => <GuideTemplate data={data} />;
export default GuiaRevisarCartaCadaMes;
