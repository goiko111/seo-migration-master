import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const data: GuidePageData = {
  slug: "guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad",
  metaTitle: "Cómo Detectar Vinos Muertos y Referencias que Frenan tu Rentabilidad | Guía",
  metaDescription: "Guía para identificar vinos sin rotación en tu carta. Aprende a detectar stock muerto, cuantificar el impacto y tomar decisiones para recuperar rentabilidad.",
  heroTitle: "Cómo detectar vinos muertos y referencias que frenan tu rentabilidad",
  heroSubtitle: "Cada referencia sin rotación es capital inmovilizado, espacio desperdiciado y una señal de que algo no funciona en tu selección, pricing o posicionamiento.",
  heroBadge: "Guía diagnóstica",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Analizar mi carta",
  ctaPrimaryUrl: "/analisis-carta",
  ctaSecondaryText: "Solicitar demo",
  ctaSecondaryUrl: "/demo",
  ctaFinalTitle: "Detecta vinos muertos antes de que acumulen meses",
  ctaFinalDescription: "Winerim monitoriza automáticamente la rotación de cada referencia y te alerta cuando un vino deja de venderse, antes de que se convierta en stock muerto.",
  tableOfContents: [
    "Qué es un vino muerto y por qué importa",
    "Causas habituales del stock sin rotación",
    "Cómo hacer una auditoría de rotación",
    "Criterios de decisión: mantener, mover o retirar",
    "Cómo prevenir la acumulación futura",
    "El sistema de alertas que necesitas",
  ],
  sections: [
    {
      heading: "1. Qué es un vino muerto y por qué importa",
      content: "Un vino muerto es una referencia que lleva más de 90 días sin venderse. No es un vino malo — puede ser un gran vino que simplemente no encaja con tu carta, tu público o tu pricing.\n\nEl problema no es tener uno o dos vinos lentos. El problema es no saberlo. Muchos restaurantes descubren que tienen entre el 15% y el 30% de su bodega en stock sin rotación — y no lo miden.\n\nEl coste es triple: capital inmovilizado que no genera retorno, espacio en bodega que podría dedicarse a referencias que sí rotan, y riesgo de deterioro si el vino pasa su ventana óptima de consumo.",
      tips: [
        "Un restaurante con 100 referencias y un 20% de vinos muertos puede tener entre 5.000€ y 20.000€ de capital inmovilizado",
        "Los vinos jóvenes sin crianza pierden frescura con el tiempo — cada mes que pasan sin venderse, pierden valor real",
        "El stock muerto ocupa espacio que podrían usar referencias que sí generan ingresos",
        "Sin un sistema de detección, los vinos muertos se acumulan por inercia: nadie los pide, nadie los retira",
      ],
      icon: "alert",
    },
    {
      heading: "2. Causas habituales del stock sin rotación",
      content: "Los vinos no mueren solos. Hay patrones claros que explican por qué ciertas referencias dejan de venderse. Entenderlos te ayuda a prevenir el problema.",
      tips: [
        "Precio fuera de rango: un vino demasiado caro para su categoría o un vino premium en un restaurante casual",
        "Competencia interna: dos o tres vinos similares en la misma sección — el cliente siempre elige el mismo y los demás no rotan",
        "Mal posicionamiento en carta: un buen vino escondido en una sección confusa o en la última página",
        "Cambio de menú sin ajustar la carta: si la cocina cambia de temporada pero la carta de vinos no, algunos maridajes dejan de funcionar",
        "Compras emocionales: el sumiller prueba un vino en una feria, compra 3 cajas y luego no encaja con la carta",
        "Falta de recomendación: el equipo de sala no conoce el vino y no lo recomienda — la venta orgánica es insuficiente para rotarlo",
      ],
      icon: "lightbulb",
    },
    {
      heading: "3. Cómo hacer una auditoría de rotación",
      content: "La auditoría de rotación es un proceso estructurado para identificar todas las referencias con problemas. Debería hacerse trimestralmente como mínimo.",
      tips: [
        "Paso 1 — Listar todas las referencias con la fecha de última venta. Si no tienes esta información en el TPV, usa la fecha de la última compra al proveedor como proxy",
        "Paso 2 — Clasificar por velocidad: activa (vendida en los últimos 30 días), lenta (30-90 días), muerta (> 90 días)",
        "Paso 3 — Calcular el capital inmovilizado de cada categoría: unidades × coste unitario",
        "Paso 4 — Identificar patrones: ¿las referencias muertas comparten características? ¿Son del mismo estilo, rango de precio o proveedor?",
        "Paso 5 — Comparar con la carta: ¿los vinos muertos están bien posicionados? ¿Tienen descripción? ¿El equipo los conoce?",
        "Paso 6 — Tomar decisiones usando la matriz del siguiente bloque",
      ],
      icon: "list",
    },
    {
      heading: "4. Criterios de decisión: mantener, mover o retirar",
      content: "No todos los vinos sin rotación deben retirarse. Algunos pueden recuperarse con acciones concretas. La clave es tener un criterio claro para decidir.\n\nUsa esta matriz de decisión para cada referencia identificada como lenta o muerta:",
      tips: [
        "Mantener si: tiene margen alto, marida con platos clave del menú, y puede reactivarse con mejor posicionamiento o recomendación activa del equipo",
        "Mover a copa si: es un buen vino que podría funcionar en formato copa, especialmente si la barrera es el precio de la botella",
        "Promocionar si: incluirlo en un menú degustación, maridaje del chef o evento temático puede darle visibilidad",
        "Negociar devolución si: el proveedor acepta devoluciones o cambios — especialmente viable si la compra fue reciente",
        "Retirar si: no encaja con la carta, no tiene margen suficiente y no hay forma viable de rotarlo. Mejor asumir la pérdida que seguir inmovilizando capital",
        "Regla de oro: si una referencia no se ha vendido en 180 días y no tiene un plan concreto de reactivación, debería salir de la carta",
      ],
      icon: "check",
    },
    {
      heading: "5. Cómo prevenir la acumulación futura",
      content: "La detección es necesaria, pero la prevención es más eficiente. Establecer reglas de entrada y seguimiento evita que el problema se repita.",
      tips: [
        "Regla de entrada: cada nueva referencia necesita una justificación: ¿qué función cumple? ¿A qué vino sustituye o complementa? ¿Cuál es el volumen esperado?",
        "Límite de stock: no comprar más de 6-12 unidades de una referencia nueva hasta validar que rota. Los pedidos iniciales grandes son la causa principal de acumulación",
        "Periodo de prueba: dar 60-90 días a una referencia nueva con soporte activo (recomendación del equipo, posición destacada). Si no funciona en 90 días con apoyo, es poco probable que funcione sola",
        "Protocolo 'uno entra, uno sale': cada referencia nueva debería reemplazar una referencia con peor rendimiento",
        "Revisión mensual de rotación: 30 minutos al mes mirando qué se vende y qué no. Es la mejor inversión de tiempo en la gestión de la carta",
      ],
      icon: "check",
    },
    {
      heading: "6. El sistema de alertas que necesitas",
      content: "Hacer auditorías trimestrales es el mínimo. Lo ideal es tener un sistema que te alerte en tiempo real cuando una referencia empieza a perder velocidad.\n\nLas alertas deben activarse en dos niveles:",
      tips: [
        "Alerta temprana (30 días sin venta): la referencia necesita atención. ¿Está bien posicionada? ¿El equipo la conoce? ¿Hay un problema de precio?",
        "Alerta urgente (90 días sin venta): decisión obligatoria. Aplicar la matriz de mantener/mover/retirar y actuar",
        "Alerta de stock excesivo: cuando el stock de una referencia supera los 90 días de venta estimada, la compra fue excesiva",
        "Dashboard mensual: un resumen con las referencias en alerta, el capital inmovilizado y la evolución respecto al mes anterior",
        "Sin este sistema, los vinos muertos se detectan demasiado tarde — cuando ya llevan meses acumulando coste de oportunidad",
      ],
      icon: "alert",
    },
  ],
  faqs: [
    { q: "¿A partir de cuántos días se considera un vino muerto?", a: "El estándar del sector es 90 días sin ninguna venta. Entre 30 y 90 días se considera rotación lenta o en alerta. Pero depende del tipo de restaurante y la frecuencia de servicio." },
    { q: "¿Qué porcentaje de la carta suele ser stock muerto?", a: "En restaurantes sin control activo de rotación, entre el 15% y el 30% de las referencias están sin movimiento. Con un sistema de monitorización, este porcentaje debería ser inferior al 5%." },
    { q: "¿Debería retirar todos los vinos sin venta?", a: "No automáticamente. Algunos pueden recuperarse con mejor posicionamiento, recomendación activa o formato copa. La clave es tener un criterio de decisión claro y no dejar que la inercia decida." },
    { q: "¿Cómo evito comprar más de lo que puedo vender?", a: "Establece un límite de stock inicial de 6-12 unidades para referencias nuevas. No amplíes el pedido hasta validar que la referencia rota al ritmo esperado en los primeros 60-90 días." },
  ],
  relatedTools: [
    { label: "Calculadora de stock muerto", url: "/herramientas/calculadora-stock-muerto" },
    { label: "Wine List Score", url: "/herramientas/wine-list-score" },
    { label: "Analizador de carta de vinos", url: "/wine-list-analyzer" },
  ],
  relatedGuides: [
    { label: "Checklist de detección de vinos muertos", url: "/recursos/checklist-deteccion-vinos-muertos" },
    { label: "Cómo mejorar la rotación de vinos", url: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante" },
    { label: "Playbook: mejorar la rotación", url: "/benchmarks-playbooks/playbook-mejorar-rotacion" },
  ],
};

const GuiaDetectarVinosMuertos = () => <GuideTemplate data={data} />;
export default GuiaDetectarVinosMuertos;
