export const GENERIC_PROPOSAL_ROUTE = "/propuesta-comercial";
export const REVO_PROPOSAL_ROUTE = "/propuesta-comercial-revo";

export const COMMERCIAL_OFFER = {
  client: "Cliente",
  provider: "Basque Highlands S.L.",
  providerCif: "B01729607",
  providerAddress: "Askatasunaren Hiribidea 17, 2º · 20004 Donostia-San Sebastián",
  date: "15 de septiembre de 2026",
} as const;

export const COMMERCIAL_SCOPE = [
  ["Winerim", "Acceso a las funcionalidades vigentes de carta digital, catálogo y gestión del vino. La profundidad analítica depende de los datos disponibles y de su calidad."],
  ["SAVia", "Consulta, explica y prepara acciones. Los cambios que afecten a precios, stock, pedidos, albaranes, facturas o reglas comerciales requieren aprobación humana."],
  ["CloudRIM y documentos", "Entrada, clasificación y comparación documental para revisión. Estas capacidades pueden operar como beta o early access cuando corresponda."],
  ["Ágora", "Conector acotado a accesos, endpoints, campos y reglas que superen la validación técnica. No se promete compatibilidad o automatización fuera de ese perímetro."],
] as const;

export const COMMERCIAL_FEATURES = [
  ["Carta Inteligente", "Fichas navegables, búsqueda, filtros, idiomas, comparador, formatos y contexto gastronómico. El cliente revisa la exactitud de precios, disponibilidad y contenidos."],
  ["Carta Architect", "Arquitectura de carta, escenarios y propuestas revisables para ordenar surtido, precio, rotación y función gastronómica antes de aplicar cambios."],
  ["Gestión de grupos", "Panel de control para consolidar establecimientos, comparar indicadores y gobernar una base común con autonomía operativa por local. Requiere alcance multiestablecimiento."],
  ["Formación de sala", "Fichas simplificadas y guías de temperatura, copa, decantación y maridaje para acompañar la recomendación durante el servicio."],
  ["Analítica de vino", "KPIs de rotación, mix de precios, Beverage Cost, copa frente a botella, márgenes y evolución temporal cuando existe cobertura de datos suficiente."],
  ["Ventas, stock y márgenes", "Lectura conjunta de ventas importadas, existencias, costes y PVP cuando esos datos estén disponibles y sean consistentes."],
  ["RIMs y SAVia", "Señales y consultas para preparar decisiones de margen, rotación, últimas unidades y foco comercial. No ejecutan cambios críticos sin aprobación humana."],
  ["Trazabilidad de decisiones", "La plataforma conserva el contexto disponible para explicar por qué propone mantener, impulsar, pasar a copa, renegociar, ajustar, no reponer o retirar."],
] as const;

export const COMMERCIAL_ADOPTION_STEPS = [
  ["1", "Preparar", "Recogida de carta, formatos, precios, documentos y fuentes operativas disponibles."],
  ["2", "Normalizar", "Revisión de referencias, variantes, duplicados, idiomas y calidad de los datos antes de activar."],
  ["3", "Acompañar", "Fichas y guías de servicio para que sala, sumiller y dirección trabajen con el mismo contexto."],
  ["4", "Mejorar", "Seguimiento de uso, incidencias, calidad, rotación y oportunidades con revisión humana."],
] as const;

export const COMMERCIAL_INTEGRATION_CONTROLS = [
  ["Preflight y mapeo", "Se validan accesos, endpoints, identidades, variantes, campos y reglas antes de activar un flujo."],
  ["Sincronización controlada", "Catálogo, precios, ventas y efectos de stock se procesan solo dentro del perímetro aprobado."],
  ["Readback y auditoría", "Cada conexión comprueba el resultado y conserva estado, incidencias y trazabilidad para revisión."],
  ["Fallo seguro", "Ante datos ambiguos, duplicados o pérdida de autoridad, el flujo se detiene y solicita intervención."],
] as const;

export const COMMERCIAL_INCLUDED_CAPACITY = [
  ["CloudRIM / documentos", "100 créditos", "Procesamiento de cartas, catálogos, tarifas, pedidos, albaranes, facturas, ventas, inventarios y stock."],
  ["SAVia", "100 créditos", "Consultas, análisis e informes según la complejidad y el consumo estimado mostrado antes de ejecutar."],
  ["Conciliaciones", "30 unidades", "Comparación de factura, albaranes, líneas, importes, productos, cantidades, impuestos y diferencias disponibles."],
] as const;

export const COMMERCIAL_CAPACITY_INTRO = "Las bolsas incluidas están dimensionadas para cubrir la operativa habitual de un establecimiento: hasta 100 documentos estándar, 100 consultas SAVia y 30 conciliaciones al mes. Las ampliaciones están previstas para picos puntuales de actividad o volúmenes extraordinarios, no como un coste necesario para utilizar Winerim con normalidad.";

export const COMMERCIAL_USAGE_EQUIVALENCE = "La capacidad mensual equivale orientativamente a procesar hasta 3 documentos estándar y realizar 3 consultas SAVia al día, además de aproximadamente una conciliación diaria.";

export const COMMERCIAL_TOP_UPS = [
  ["CloudRIM / documentos", "100 créditos adicionales", "39 € + IVA"],
  ["SAVia", "100 créditos adicionales", "29 € + IVA"],
  ["Conciliaciones", "30 unidades adicionales", "29 € + IVA"],
  ["Pack completo", "100 documentos + 100 SAVia + 30 conciliaciones", "79 € + IVA"],
] as const;

export const COMMERCIAL_EXPANSION_MESSAGE = "Las ampliaciones constituyen un recurso opcional para campañas, cargas históricas, catálogos extensos o incrementos puntuales de actividad. No son necesarias para acceder a las funcionalidades ordinarias de Winerim.";

export const COMMERCIAL_EXPANSION_RULES = [
  ["Facturación del mes", "La ampliación se suma al mes en que el cliente la solicita y acepta."],
  ["Modalidad anual", "Se emite una factura adicional independiente, sin descuento anual."],
  ["Compra puntual", "No se renueva automáticamente ni activa un cobro futuro."],
  ["Sin nueva cuota", "La compra no genera una nueva cuota recurrente."],
  ["Aceptación y validez", "Requiere aceptación previa y tiene 90 días de validez."],
  ["Uso recurrente", "Tras dos meses consecutivos de exceso, se propone por escrito una capacidad recurrente."],
] as const;

export const COMMERCIAL_DOCUMENT_EXAMPLES = [
  ["Albarán", "2 páginas · 80 líneas", "1 crédito"],
  ["Factura", "8 páginas", "2 créditos"],
  ["Catálogo", "1 página · 700 líneas", "3 créditos"],
  ["Catálogo", "20 páginas · 1.600 líneas", "7 créditos"],
] as const;

export const COMMERCIAL_SAVIA_USAGE = [
  ["Consulta estándar", "1 crédito"],
  ["Análisis complejo o cruce de módulos/periodos", "3–5 créditos"],
  ["Informe ejecutivo o exportación extensa", "10 créditos"],
] as const;

export const COMMERCIAL_RECONCILIATION_USAGE = [
  ["Unidad incluida", "1 factura + hasta 10 albaranes + 250 líneas"],
  ["Bloque adicional", "1 unidad por cada exceso de albaranes o líneas"],
  ["Nueva conciliación", "Factura distinta, nuevos albaranes o cambios materiales"],
] as const;

export const COMMERCIAL_SPEND_CONTROLS = [
  ["Aviso al 80 %", "La plataforma avisa antes de agotar cada bolsa."],
  ["Control al 100 %", "La plataforma solicita confirmación o bloquea el consumo adicional."],
  ["Aceptación previa", "Toda ampliación requiere solicitud y aceptación expresa del cliente."],
  ["Cortesía limitada", "Hasta un 20 % durante un único mes, sin recurrencia ni derecho adquirido."],
] as const;

export const COMMERCIAL_AGORA_SCOPE = [
  ["Incluido", "Conexión al endpoint facilitado, mapeo inicial de vinos y variantes acordadas, sincronización controlada de catálogo, familias y precios aprobados, y lectura de ventas o facturas cerradas para el historial de Winerim."],
  ["Controles", "Los efectos sobre stock, ratios de copa o composiciones solo se aplican conforme a reglas verificadas. Ante identidad, formato, variante o composición ambiguos, el conector se detiene de forma segura."],
  ["Dependencias", "La activación exige acceso válido, preflight, piloto y readback satisfactorio. Disponibilidad y frecuencia dependen de la API, el TPV, la red y terceros. No se garantiza tiempo real continuo."],
  ["Fuera de alcance", "Hardware, configuración interna del TPV, impresoras, comandas, SAT, red local, productos no vino, desarrollos a medida, backfill masivo y depuración extraordinaria, salvo presupuesto aceptado."],
] as const;

export const COMMERCIAL_REVO_SCOPE = [
  ["Incluido", "Conexión a Revo XEF con los accesos y permisos facilitados, mapeo inicial de vinos y variantes acordadas, lectura controlada de catálogo y ventas cerradas, y envío de esos datos al historial de Winerim."],
  ["Controles", "Las referencias, formatos, precios y unidades se validan antes de activar el flujo. Ante identidades ambiguas, duplicados, variantes desconocidas o una respuesta inconsistente, el conector se detiene para revisión."],
  ["Dependencias", "La activación exige credenciales válidas, disponibilidad de la API, preflight, piloto y readback satisfactorio. La frecuencia depende de Revo XEF, la red y terceros; no se garantiza tiempo real continuo."],
  ["Fuera de alcance", "Hardware, configuración interna de REVO, comandas, impresoras, SAT, red local, productos no vino, desarrollos a medida, backfill masivo y depuración extraordinaria, salvo presupuesto aceptado."],
] as const;

export const COMMERCIAL_IMPLEMENTATION = [
  ["1", "Datos y accesos completos"],
  ["2", "Preflight, piloto y readback"],
  ["3", "Activación controlada"],
] as const;

export const COMMERCIAL_PRICING = [
  ["Winerim", "175 € + IVA / mes", "1.500 € + IVA / año", "125 € + IVA / mes", "600 €"],
  ["Integración Winerim–Ágora", "175 € + IVA / mes", "1.500 € + IVA / año", "125 € + IVA / mes", "600 €"],
  ["Ambos servicios", "350 € + IVA / mes", "3.000 € + IVA / año", "250 € + IVA / mes", "1.200 €"],
] as const;

export const COMMERCIAL_REVO_PRICING = [
  ["Winerim", "175 € + IVA / mes", "1.500 € + IVA / año", "125 € + IVA / mes", "600 €"],
  ["Integración Winerim–REVO XEF", "175 € + IVA / mes", "1.500 € + IVA / año", "125 € + IVA / mes", "600 €"],
  ["Ambos servicios", "350 € + IVA / mes", "3.000 € + IVA / año", "250 € + IVA / mes", "1.200 €"],
] as const;

export const COMMERCIAL_TERMS = [
  ["Servicios y precio", "Cada servicio es independiente. La modalidad y el importe solo quedan cerrados cuando las partes completan la selección. Los precios indicados no incluyen IVA."],
  ["Sin condiciones implícitas", "Esta propuesta no fija permanencia, cuota de alta, SLA, renovación automática ni otros costes. Cualquier condición adicional requiere acuerdo escrito."],
  ["Bolsas mensuales", "Las capacidades incluidas se renuevan cada mes natural, también en modalidad anual. No se anticipan doce mensualidades de créditos ni se acumula el saldo no consumido."],
  ["Ampliaciones puntuales", "Requieren aceptación previa, no reciben descuento anual, no se renuevan automáticamente y son válidas durante 90 días."],
  ["Facturación de ampliaciones", "En modalidad mensual se añaden a la factura del mes en curso. En modalidad anual se emite una factura adicional independiente."],
  ["Uso recurrente", "Si se supera la capacidad durante dos meses consecutivos, cualquier ampliación mensual recurrente o cambio de capacidad requiere acuerdo escrito."],
  ["Datos y permisos", "El cliente responde de la exactitud de carta, precios, stock, composiciones y permisos. Basque Highlands conserva los derechos sobre Winerim. El cliente conserva sus datos, marcas y contenidos."],
  ["Protección y confidencialidad", "Ambas partes protegerán la información no pública y cumplirán la normativa de protección de datos. Cuando proceda, formalizarán el acuerdo de encargo de tratamiento correspondiente."],
  ["Términos complementarios", "Los Términos B2B de Winerim complementan esta propuesta. Esta pieza prevalece únicamente respecto del alcance y precio que las partes hayan seleccionado y firmado."],
] as const;

export const COMMERCIAL_SELECTION = [
  ["Winerim", "175 € + IVA / mes", "1.500 € + IVA / año"],
  ["Integración Ágora", "175 € + IVA / mes", "1.500 € + IVA / año"],
] as const;

export const COMMERCIAL_REVO_SELECTION = [
  ["Winerim", "175 € + IVA / mes", "1.500 € + IVA / año"],
  ["Integración REVO XEF", "175 € + IVA / mes", "1.500 € + IVA / año"],
] as const;

export const COMMERCIAL_PAYMENT_LINKS = {
  monthly: {
    winerim: {
      label: "Pago mensual de Winerim · 175 € + IVA",
      href: "https://pagos.winerim.wine/p/ftjeeh",
    },
    integration: {
      label: "Pago mensual de Integración TPV · 175 € + IVA",
      href: "https://pagos.winerim.wine/p/x3ya3x",
    },
    both: {
      label: "Pago mensual de Winerim + Integración TPV · 350 € + IVA",
      href: "https://pagos.winerim.wine/p/tbnxge",
    },
  },
  annual: {
    winerim: {
      label: "Pago anual de Winerim · 1.500 € + IVA",
      href: "https://pagos.winerim.wine/p/4w46ah",
    },
    integration: {
      label: "Pago anual de Integración TPV · 1.500 € + IVA",
      href: "https://pagos.winerim.wine/p/jzyxpx",
    },
    both: {
      label: "Pago anual de Winerim + Integración TPV · 3.000 € + IVA",
      href: "https://pagos.winerim.wine/p/rf33vb",
    },
  },
} as const;
