import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const data: GuidePageData = {
  slug: "guias/como-formar-equipo-sala-para-vender-vino",
  metaTitle: "Cómo Formar al Equipo de Sala para Vender Vino sin Ser Sumiller | Guía",
  metaDescription: "Guía práctica para formar a tu equipo de sala en vino sin necesidad de ser sumiller. Técnicas de recomendación, fichas simplificadas y plan de formación en 2 semanas.",
  heroTitle: "Cómo formar al equipo de sala para vender vino sin ser sumiller",
  heroSubtitle: "Tu equipo no necesita ser experto en vino. Necesita saber lo suficiente para recomendar con confianza, resolver dudas del cliente y convertir cada mesa en una oportunidad de venta.",
  heroBadge: "Guía formativa",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Solicitar demo",
  ctaPrimaryUrl: "/demo",
  ctaSecondaryText: "Analizar mi carta",
  ctaSecondaryUrl: "/analisis-carta",
  ctaFinalTitle: "Equipa a tu equipo con Winerim",
  ctaFinalDescription: "Winerim genera fichas de vino, guías de maridaje y recomendaciones automáticas para tu equipo de sala. Siempre preparados, sin depender de un sumiller.",
  tableOfContents: [
    "Por qué la formación en vino impacta directamente en ventas",
    "Qué necesita saber tu equipo (y qué no)",
    "Las 5 técnicas de recomendación que funcionan",
    "Cómo crear fichas de vino que se memorizan",
    "Plan de formación en 2 semanas",
    "Cómo mantener la formación con alta rotación de personal",
  ],
  sections: [
    {
      heading: "1. Por qué la formación en vino impacta directamente en ventas",
      content: "La ecuación es simple: cuando el equipo sabe recomendar vino, más mesas piden vino. No es una cuestión de presión comercial — es una cuestión de servicio.\n\nEl cliente que no sabe qué vino elegir tiene tres opciones: pedir 'el más barato', no pedir vino, o preguntar al camarero. Si el camarero puede ayudarle, la venta se produce. Si no puede, el cliente elige agua o cerveza.\n\nRestaurantes que invierten en formación básica de vino para sala reportan incrementos del 15-30% en ventas de vino en las primeras semanas.",
      tips: [
        "El 60-70% de las decisiones de vino en un restaurante están influidas por la recomendación del equipo de sala",
        "No necesitas sumilleres en cada turno — necesitas camareros que sepan 3-5 vinos de confianza y los recomienden con naturalidad",
        "La formación no es un evento puntual — es un proceso continuo adaptado a los cambios de carta",
        "El retorno de la formación es inmediato: el primer servicio después de una sesión ya genera más recomendaciones",
      ],
      icon: "lightbulb",
    },
    {
      heading: "2. Qué necesita saber tu equipo (y qué no)",
      content: "El error más común es intentar convertir a los camareros en sumilleres. No lo necesitan. Lo que necesitan es un conocimiento práctico y limitado que les permita recomendar con confianza.\n\nLo que SÍ necesitan saber es diferente de lo que aprenderían en un curso de enología.",
      tips: [
        "SÍ: Conocer 3-5 vinos de confianza de la carta y poder describirlos en 2 frases sencillas",
        "SÍ: Saber con qué platos va bien cada uno de esos vinos — sin necesidad de entender la teoría del maridaje",
        "SÍ: Tener frases preparadas para ofrecer vino de forma natural: 'Con su lubina, el Albariño va perfecto'",
        "SÍ: Saber responder a las objeciones habituales: 'solo agua', 'el más barato', 'no sé de vinos'",
        "NO: Conocer la diferencia entre denominaciones de origen ni las regiones vinícolas del mundo",
        "NO: Explicar técnicas de vinificación, tipos de barrica o perfiles aromáticos complejos",
        "NO: Saber de añadas, cepas minoritarias o puntuaciones de críticos",
        "La regla de oro: si el camarero no puede explicar un vino en 10 segundos, necesita una ficha más simple",
      ],
      icon: "check",
    },
    {
      heading: "3. Las 5 técnicas de recomendación que funcionan",
      content: "Recomendar vino no es vender — es guiar la elección del cliente. Estas cinco técnicas funcionan en la mayoría de situaciones sin requerir conocimiento profundo de enología.",
      tips: [
        "Técnica 1 — La copa como puerta de entrada: 'Mientras miran la carta, ¿les apetece una copa de nuestro Verdejo? Está muy fresco'. Bajo compromiso, alta conversión",
        "Técnica 2 — El maridaje directo: 'Con el chuletón, les recomiendo el Crianza de Ribera — van muy bien juntos'. Simple, específico, útil",
        "Técnica 3 — La recomendación del chef: 'El chef lo ha probado con este vino y dice que es la mejor combinación'. Autoridad sin necesidad de que el camarero sea experto",
        "Técnica 4 — La pregunta abierta: '¿Prefieren algo más fresco o algo con más cuerpo?' Ayuda al cliente a elegir sin abrumarlo",
        "Técnica 5 — El upgrade sutil: 'Si les ha gustado la copa del blanco, tienen la botella que sale muy bien para la mesa'. De copa a botella de forma natural",
      ],
      icon: "lightbulb",
    },
    {
      heading: "4. Cómo crear fichas de vino que se memorizan",
      content: "La ficha de vino para sala no es la ficha técnica del proveedor. Es un documento de 30 segundos de lectura que contiene exactamente lo que el camarero necesita para recomendar ese vino.",
      tips: [
        "Nombre del vino: tal como aparece en la carta — el camarero debe poder señalarlo",
        "En 3 palabras: el descriptor rápido. Ej: 'fresco, afrutado, fácil'. Esto es lo que el camarero dice al cliente",
        "Va perfecto con: 2-3 platos concretos del menú. No genéricos ('pescados') sino específicos ('lubina a la plancha, ensalada de burrata')",
        "La frase de venta: una frase completa que el camarero puede usar tal cual. Ej: 'Es nuestro blanco más refrescante, ideal para empezar'",
        "Precio: copa y botella, bien visible para que pueda informar sin consultar la carta",
        "Formato visual: tarjeta de bolsillo o laminada para tener en el office. No más de 6-8 fichas activas a la vez",
      ],
      icon: "list",
    },
    {
      heading: "5. Plan de formación en 2 semanas",
      content: "La formación debe ser corta, práctica y frecuente. Sesiones de 30 minutos antes del servicio, 2 veces por semana durante 2 semanas, son suficientes para un cambio notable.",
      tips: [
        "Sesión 1 — Los 5 vinos de confianza: el equipo prueba 5 vinos de la carta, aprende a describirlos en 3 palabras y practica la frase de venta",
        "Sesión 2 — Maridaje práctico: se prueban 3 combinaciones vino+plato. El equipo experimenta de primera mano por qué funcionan",
        "Sesión 3 — Técnicas de recomendación: role-play con escenarios reales. Cada camarero practica las 5 técnicas con compañeros",
        "Sesión 4 — Simulación de servicio: un servicio completo simulado donde cada camarero debe recomendar vino al menos una vez por mesa",
        "Después de las 4 sesiones: sesiones de refresco de 10 minutos cada vez que cambie la carta o se incorpore personal nuevo",
        "Medición: compara las ventas de vino de las 2 semanas posteriores a la formación con las 2 semanas anteriores",
      ],
      icon: "check",
    },
    {
      heading: "6. Cómo mantener la formación con alta rotación de personal",
      content: "La alta rotación de personal es la realidad de la hostelería. Un programa de formación que depende de personas específicas no es sostenible. Necesitas un sistema que funcione independientemente de quién esté en el equipo.",
      tips: [
        "Material autoformativo: fichas de vino, guión de recomendación y tabla de maridajes disponibles permanentemente en el office",
        "Formación de onboarding: una sesión de 45 minutos para cada nueva incorporación, usando el material existente",
        "Buddy system: asignar un miembro experimentado a cada nuevo empleado durante sus primeras 2 semanas",
        "Reuniones pre-servicio de 5 minutos: repasar las copas abiertas, los platos del día y la recomendación del turno",
        "Herramientas digitales: Winerim genera fichas actualizadas automáticamente cada vez que cambia la carta",
        "No depender de la memoria: el equipo debe poder consultar las fichas en cualquier momento, no memorizar todo",
      ],
      icon: "lightbulb",
    },
  ],
  faqs: [
    { q: "¿Cuánto tiempo lleva formar a un equipo en vino?", a: "Con un programa estructurado, 2 semanas (4 sesiones de 30 minutos) son suficientes para un cambio notable. La formación continua se mantiene con sesiones breves de 5-10 minutos antes de cada servicio." },
    { q: "¿Qué pasa si mi equipo no tiene interés en el vino?", a: "No necesitan tener interés — necesitan tener herramientas. Un guión de recomendación bien hecho permite vender vino sin ser apasionado del tema. La motivación viene cuando ven que las mesas responden positivamente." },
    { q: "¿Es mejor contratar un sumiller o formar al equipo?", a: "Depende del volumen. Para la mayoría de restaurantes, formar al equipo es más efectivo y sostenible. Un sumiller añade valor en restaurantes con cartas grandes (100+ referencias) y público conocedor." },
    { q: "¿Cómo mido si la formación funciona?", a: "Compara las ventas de vino por mesa (ticket medio en vino), el ratio de mesas que piden vino y el ratio copa/botella antes y después de la formación." },
  ],
  relatedTools: [
    { label: "Wine List Score", url: "/herramientas/wine-list-score" },
    { label: "Generador de maridajes con IA", url: "/wine-pairing-generator" },
  ],
  relatedGuides: [
    { label: "Plantilla de formación exprés para sala", url: "/recursos/plantilla-formacion-equipo-sala" },
    { label: "Playbook: formar al personal para recomendar vino", url: "/benchmarks-playbooks/playbook-formar-personal" },
    { label: "Playbook: vender más vino en sala", url: "/benchmarks-playbooks/playbook-vender-mas-vino" },
  ],
};

const GuiaFormarEquipoSala = () => <GuideTemplate data={data} />;
export default GuiaFormarEquipoSala;
