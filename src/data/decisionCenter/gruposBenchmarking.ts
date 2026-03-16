import { Building2 } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const gruposBenchmarkingContent: DeepAreaContent = {
  name: "Grupos y benchmarking",
  tagline: "Gobierna la categoría vino a escala",
  intro: "Esta sección te ayuda a tomar decisiones sobre la categoría vino cuando gestionas más de un local. No se trata de estandarizar por estandarizar: se trata de detectar qué funciona, dónde funciona y por qué, para decidir con datos qué merece la pena escalar, qué corregir y qué retirar. El benchmarking interno no es un ranking: es una herramienta de gobierno.",
  icon: Building2,
  accent: "text-rose-500",
  bg: "bg-rose-500/10",
  audiences: ["grupo", "direccion"],
  links: [
    { label: "Soluciones para grupos", href: "/soluciones/grupos-restauracion", description: "Cómo Winerim ayuda a grupos multiunidad a gobernar la categoría vino", type: "solution" },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "Motor analítico con benchmarking interno, desviaciones y scoring por local", type: "product" },
    { label: "Winerim Supply", href: "/producto/winerim-supply", description: "Inteligencia de compras centralizada con alertas de sobreprecio por unidad", type: "product" },
    { label: "Plantilla: Control grupo restauración", href: "/recursos/plantilla-control-grupo-restauracion", description: "Cuadro de mando para comparar métricas clave entre locales", type: "resource" },
    { label: "Plantilla: Scorecard mensual", href: "/recursos/plantilla-scorecard-mensual", description: "Revisión mensual estructurada de rendimiento por unidad", type: "resource" },
    { label: "Blog: Estandarizar oferta en grupos", href: "/article/estandarizar-oferta-vino-grupo-restauracion", description: "Cómo estandarizar sin perder la identidad de cada local", type: "article" },
    { label: "Auditor multi-local", href: "/herramientas/auditor-carta-multilocal", description: "Compara surtido, pricing y copa entre locales de un mismo grupo", type: "tool" },
  ],
  miniCases: [
    {
      profile: "Grupo de 6 restaurantes en 3 ciudades",
      situation: "Cada local tenía carta propia. El mejor local tenía un margen del 64%; el peor, un 41%. Nadie lo sabía porque no comparaban.",
      action: "Implementó un scorecard mensual unificado. Identificó que el peor local tenía 15 referencias que no vendía y precios un 15% por debajo del grupo.",
      result: "En 4 meses, el local rezagado subió al 56% de margen. Solo replicando el mix de copas y el pricing del líder.",
    },
    {
      profile: "Cadena de hoteles con F&B centralizado",
      situation: "La compra era centralizada pero cada hotel fijaba precios libremente. Mismo vino a 28 € en un hotel y a 19 € en otro.",
      action: "Definió bandas de precio por categoría y tipo de hotel (urbano vs resort). Cada hotel tiene margen de ±2 € dentro de la banda.",
      result: "Coherencia de marca, margen homogéneo del 58% en todos los hoteles y negociación de compra más fuerte por volumen.",
    },
  ],
  subtopics: [
    { id: "comparar-unidades", title: "Cómo comparar unidades de forma útil", priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim ha normalizado las métricas de tus locales por tipología para que la comparación sea justa.", whyMatters: "Sin comparación normalizada, los datos engañan: el local que más factura puede ser el que peor margen tiene.", riskIfIgnored: "Cada director opera con su criterio sin detectar ni mejores prácticas ni problemas sistémicos." },
      queSignifica:
        "Comparar unidades no es ordenar locales de mejor a peor por facturación. Es cruzar métricas normalizadas (margen medio, rotación, ticket medio de vino, ratio copa/botella, % de vinos muertos) entre locales con contextos comparables. Un gastronómico y un casual no se comparan igual. Una unidad de hotel y una de calle tampoco. La comparación útil agrupa por tipología y mide desviaciones sobre la media del grupo, no valores absolutos.",
      porQueImporta:
        "Porque sin comparación normalizada, los datos engañan. El local que más factura puede ser el que peor margen tiene. El que menos vende puede ser el más eficiente. Sin benchmarking interno, cada director de local opera con su criterio y no hay forma de detectar ni las mejores prácticas ni los problemas sistémicos.",
      queHacer: [
        "Agrupa tus locales por tipología (casual, gastro, hotel, terraza) antes de comparar.",
        "Define 5-6 KPIs comunes: margen medio, rotación, % vinos muertos, ticket medio vino, ratio copa/botella, coste medio de compra.",
        "Calcula la media del grupo por tipología y mide la desviación de cada local sobre esa media.",
        "Usa la Plantilla de Control de Grupo para estructurar la comparación mensualmente.",
      ],
      errores: [
        { mistake: "Comparar locales de distinta tipología con los mismos baremos", consequence: "Penalizas al gastronómico por tener menos rotación que el casual. No es comparable." },
        { mistake: "Usar solo la facturación como métrica de comparación", consequence: "El local que más factura puede ser el que peor margen genera. Facturar no es ganar." },
        { mistake: "No normalizar por número de referencias o tamaño de carta", consequence: "Un local con 300 referencias y otro con 80 no se pueden leer igual sin ajustar." },
      ],
    },
    { id: "metricas-por-local", title: "Qué métricas mirar por local", priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim ha generado un dashboard de 6 KPIs homogéneos para cada uno de tus locales.", whyMatters: "Si cada local mide distinto, no puedes gobernar. Las decisiones de grupo se toman sobre datos comparables.", riskIfIgnored: "Cada local reporta lo que le conviene. No detectas desviaciones hasta que son crisis." },
      queSignifica:
        "Cada local debe ser legible con un conjunto mínimo de métricas que reveles su salud comercial en la categoría vino. No necesitas 30 indicadores: necesitas los 6 correctos. Margen medio ponderado (no el teórico, el real tras descuentos y merma), rotación media por referencia, porcentaje de vinos muertos (sin venta en 60+ días), ticket medio de vino por mesa, ratio copa/botella y coste medio de compra por referencia.",
      porQueImporta:
        "Porque si cada local reporta métricas diferentes o no reporta ninguna, no puedes gobernar. Las decisiones de grupo se toman sobre datos comparables. Si un local mide margen bruto y otro margen neto, la comparación es inútil. El primer paso para gestionar un grupo es homogeneizar qué se mide y cómo.",
      queHacer: [
        "Define un dashboard mínimo de 6 KPIs idénticos para todos los locales.",
        "Asegúrate de que todos calculan el margen de la misma forma (mismo criterio de coste).",
        "Revisa estos KPIs mensualmente con la Scorecard mensual.",
        "Identifica los 2-3 locales que más se desvían de la media en cada métrica y analiza por qué.",
      ],
      errores: [
        { mistake: "Dejar que cada local defina sus propias métricas", consequence: "No puedes comparar. Cada uno mide lo que le conviene y los datos no son cruzables." },
        { mistake: "Medir demasiados indicadores sin priorizar", consequence: "Parálisis por análisis. 30 KPIs que nadie mira equivalen a 0 KPIs." },
        { mistake: "No diferenciar margen teórico de margen real", consequence: "Crees que un local tiene un 68% de margen, pero con merma y descuentos reales es un 52%." },
      ],
    },
    { id: "referencias-que-funcionan", title: "Cómo detectar referencias que sí funcionan y dónde", priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim ha cruzado rendimiento por referencia entre todos tus locales para identificar qué funciona y dónde.", whyMatters: "Escalar lo que funciona multiplica el impacto. Pero hacerlo sin contexto multiplica el error.", riskIfIgnored: "Replicas a ciegas o retiras sin criterio. Pierdes la oportunidad de entender a tu cliente por local." },
      queSignifica:
        "Una referencia 'que funciona' no es solo la que se vende: es la que se vende con buen margen, rota a un ritmo saludable y no canibaliza a otras. El benchmarking interno te permite identificar qué referencias cumplen esas tres condiciones en cada local. A veces un vino funciona en 3 de 5 locales: eso te dice algo sobre el perfil de cliente, no sobre el vino.",
      porQueImporta:
        "Porque escalar una referencia que funciona en un local pero no en otro es una decisión que requiere contexto. Si un Verdejo a 22 € funciona en tus locales de costa pero no en los urbanos, la conclusión no es 'el Verdejo no funciona': es que tu cliente urbano tiene otras preferencias. Sin este análisis, replicas a ciegas o retiras sin criterio.",
      queHacer: [
        "Cruza las 10 referencias más vendidas de cada local con su margen y rotación.",
        "Identifica las que aparecen en el top de varios locales: son candidatas a referencia corporativa.",
        "Analiza las que funcionan solo en un local: ¿es por el cliente, el equipo, el precio o la carta?",
        "Usa Winerim Core para visualizar el rendimiento cruzado por referencia y local.",
      ],
      errores: [
        { mistake: "Asumir que lo que funciona en un local funciona en todos", consequence: "Escalas una referencia que no encaja en 3 de tus 5 locales. Stock muerto multiplicado por 3." },
        { mistake: "Medir solo ventas sin cruzar con margen", consequence: "Tu referencia estrella puede ser la que peor margen te da. Vender mucho no es vender bien." },
        { mistake: "No investigar por qué una referencia funciona en un sitio y no en otro", consequence: "Pierdes la oportunidad de entender a tu cliente por local. Ese dato vale más que la venta." },
      ],
    },
    { id: "cuando-replicar", title: "Cuándo replicar una referencia en otros locales", priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim ha detectado referencias con rendimiento sostenido en un local que podrían funcionar en otros de perfil similar.", whyMatters: "Una replicación bien hecha multiplica el rendimiento. Mal hecha, multiplica stock parado en varios locales.", riskIfIgnored: "Pierdes oportunidades de escalar éxitos o, peor, replicas sin datos y generas problemas en múltiples unidades." },
      queSignifica:
        "Replicar una referencia significa incluirla en la carta de otro local porque ha demostrado rendimiento en uno o varios. Pero la decisión no es automática: requiere que el perfil de cliente sea comparable, que el precio encaje en la carta destino, que haya espacio sin generar canibalización y que el proveedor pueda servir a ese local con las mismas condiciones.",
      porQueImporta:
        "Porque una replicación bien hecha multiplica el rendimiento de una buena decisión. Pero una replicación mal hecha multiplica el problema: stock parado en varios locales, capital inmovilizado y una referencia que 'debería funcionar' pero no lo hace porque el contexto es distinto.",
      queHacer: [
        "Confirma que la referencia tiene al menos 3 meses de buen rendimiento (margen + rotación) en el local de origen.",
        "Verifica que el perfil de cliente del local destino es comparable al del origen.",
        "Comprueba que el precio encaja en la arquitectura de carta del local destino sin duplicar franja.",
        "Negocia las mismas condiciones de compra para el local destino antes de incorporar.",
      ],
      errores: [
        { mistake: "Replicar tras un solo mes bueno", consequence: "Puede ser estacionalidad o una mesa grande que la pidió. Un mes no es tendencia." },
        { mistake: "No comprobar si la franja de precio ya está cubierta en el local destino", consequence: "Creas canibalización. Ahora tienes dos referencias compitiendo por el mismo comensal." },
        { mistake: "Replicar sin negociar condiciones para el nuevo local", consequence: "Compras al mismo proveedor pero sin el descuento por volumen. Tu margen en el local destino es peor." },
      ],
    },
    { id: "cuando-retirar-compra", title: "Cuándo retirar una compra en una unidad", priority: "inmediato",
      porQueTeLoMostramos: { detected: "Winerim ha identificado referencias sin rendimiento en locales específicos: candidatas a retirada activa.", whyMatters: "En un grupo, una referencia muerta en 4 locales es 4 veces el problema. La retirada con datos es de las decisiones más rentables.", riskIfIgnored: "Mantienes stock muerto multiplicado por el número de locales. El capital inmovilizado del grupo se dispara." },
      queSignifica:
        "Retirar una compra significa dejar de reponer una referencia en un local concreto. No significa que el vino sea malo: significa que en ese local, con ese cliente, a ese precio, no rinde. Los indicadores de retirada son: más de 60 días sin venta, margen real por debajo del umbral mínimo, o existencia de una referencia mejor en la misma franja que la canibaliza.",
      porQueImporta:
        "Porque cada referencia que no rinde ocupa espacio en carta, capital en stock y atención del equipo. En un grupo, una referencia muerta en 4 locales es 4 veces el problema. La retirada activa (decidida con datos, no por inercia) es una de las decisiones más rentables que puede tomar un F&B de grupo.",
      queHacer: [
        "Revisa mensualmente las referencias con más de 45 días sin venta en cada local.",
        "Cruza con el margen: si además de no rotar tiene bajo margen, es candidata inmediata a retirada.",
        "Antes de retirar, verifica si el problema es el vino o la carta (¿está bien posicionado? ¿el equipo lo conoce?).",
        "Comunica la retirada al equipo de sala con contexto: por qué sale y qué la sustituye.",
      ],
      errores: [
        { mistake: "Esperar a que se acabe el stock para retirar", consequence: "Mientras esperas, el capital sigue inmovilizado y la carta sigue desequilibrada." },
        { mistake: "Retirar sin analizar por qué no funcionó", consequence: "Introduces otra referencia en la misma franja que puede fallar por la misma razón." },
        { mistake: "No comunicar al equipo de sala los cambios en carta", consequence: "El camarero sigue recomendando un vino que ya no está. O peor: no recomienda nada porque no sabe qué hay nuevo." },
      ],
    },
    { id: "benchmarking-interno-externo", title: "Cómo leer benchmarking interno y externo", priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim compara tus locales entre sí (interno) y tu grupo con el mercado (externo) para darte perspectiva completa.", whyMatters: "Sin benchmarking interno no sabes quién lo hace bien. Sin externo, no sabes si tu mejor local es bueno o simplemente el menos malo.", riskIfIgnored: "Operas a ciegas dentro de tu grupo y sin referencia de mercado. Las desviaciones se detectan tarde." },
      queSignifica:
        "El benchmarking interno compara tus locales entre sí: quién rinde mejor en cada métrica y por qué. El benchmarking externo compara tu grupo con el mercado: ¿tu margen medio está por encima o por debajo de la media del sector? ¿Tu rotación es normal o excepcional? Ambos son necesarios. El interno te dice dónde mejorar dentro de tu grupo. El externo te dice si tu grupo en conjunto está bien posicionado.",
      porQueImporta:
        "Porque sin benchmarking interno operas a ciegas dentro de tu propio grupo: no sabes quién lo hace bien ni quién necesita ayuda. Y sin benchmarking externo no sabes si tu 'mejor local' es realmente bueno o simplemente el menos malo. La combinación de ambos te da una visión completa: mejora interna con perspectiva de mercado.",
      queHacer: [
        "Ejecuta benchmarking interno mensualmente con la Scorecard mensual: compara los 6 KPIs entre locales.",
        "Identifica los locales que lideran en cada métrica y analiza qué hacen diferente.",
        "Usa Winerim Core para acceder a benchmarking externo: compara tus métricas con la media del sector.",
        "Cruza ambos: si tu mejor local está por debajo de la media del mercado, tienes un problema sistémico, no local.",
      ],
      errores: [
        { mistake: "Hacer solo benchmarking interno sin referencia externa", consequence: "Tu mejor local puede estar por debajo de la media del mercado. Sin contexto externo, no lo sabes." },
        { mistake: "Usar el benchmarking como herramienta punitiva", consequence: "Los directores de local dejan de compartir datos. El benchmarking deja de funcionar." },
        { mistake: "Comparar solo una vez al año", consequence: "Las desviaciones se detectan tarde. Un problema que dura 6 meses cuesta 6 veces más que uno que se detecta en 30 días." },
      ],
    },
  ],
  nextStep: {
    label: "Comparar tus locales con el auditor",
    href: "/herramientas/auditor-carta-multilocal",
    description: "Compara surtido, pricing y copa entre unidades para detectar desviaciones y mejores prácticas.",
  },
};

export default gruposBenchmarkingContent;
