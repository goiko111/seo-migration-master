import type { PresentationContent } from "./presentationContent";
import type { PresentationCapabilityDepth } from "./presentationCapabilityDepth";

// Presentation-only review: preserve the source archive and other commercial surfaces.
export function reviewSpanishCapabilities(content: PresentationContent): PresentationContent {
  return {
    ...content,
    flow: {
      ...content.flow,
      title: "Conectar datos exige comprobar el recorrido.",
      subtitle: "Arquitectura propuesta: el alcance operativo de cada capa se valida en la implantación.",
      steps: [
        { label: "01 · Recoger", title: "CloudRIM", body: "Confirmar documentos y canales disponibles para el restaurante.", capabilities: "Canales y tratamiento sujetos a validación" },
        { label: "02 · Operar", title: "Core, TPV y Gestión", body: "Alinear referencias y formatos; comprobar origen, destino y efecto de cada movimiento.", capabilities: "Conector y permisos por validar" },
        { label: "03 · Entender", title: "Márgenes y RIMs™", body: "Interpretar señales con costes, periodos e histórico fiables.", capabilities: "Cobertura y semántica de métricas explícitas" },
        { label: "04 · Decidir", title: "SAVia", body: "Revisar alcance y estado productivo antes de ofrecer acciones sobre datos reales.", capabilities: "Permisos, aprobación y readback por comprobar" },
      ],
      footnote: "Una captura acredita una interfaz, no la certificación del flujo completo ni su disponibilidad en todos los planes.",
    },
    cloudrim: {
      ...content.cloudrim,
      title: "Documentos con un recorrido verificable",
      body: "La bandeja documental tiene evidencia visual. Los canales de entrada, extracción y efectos sobre compras o stock requieren confirmar alcance y estado productivo.",
      items: [
        { title: "Canal acordado", body: "Confirmar el canal habilitado; no dar por disponibles email, FTP/SFTP o API por defecto." },
        { title: "Documento identificado", body: "Acordar tipos de documento, campos y tratamiento de errores." },
        { title: "Resultado contrastado", body: "Comparar el original con lo extraído antes de usarlo en cálculos o movimientos." },
        { title: "Permisos definidos", body: "Validar quién revisa, aprueba y recupera una operación fallida." },
      ],
      caption: "Captura existente de la bandeja. Lifecycle y flujo completo pendientes de validación de Producto.",
    },
    cellar: {
      ...content.cellar,
      subtitle: "Ubicaciones y custodia tienen pantallas documentadas. Confirmar su alcance y los movimientos antes de incorporarlos a una operativa.",
      items: [
        { title: "Wine Cellar", body: "Revisar la configuración de ubicaciones y su relación con el inventario registrado." },
        { title: "Wine Lockers", body: "Validar acceso, custodia y trazabilidad de cada movimiento antes de su uso con clientes." },
        { title: "Stock operativo", body: "Conciliar existencias y efectos de los conectores; no sustituye el conteo físico." },
      ],
      mapCaption: "Captura existente de ubicaciones; alcance por validar.",
      lockersCaption: "Captura existente de Wine Lockers; permisos y movimientos por validar.",
    },
    performance: {
      ...content.performance,
      subtitle: "La lectura conjunta necesita costes, ventas y stock fiables. Un resultado depende del periodo, el formato y la cobertura de origen.",
      footnote: "Capital inmovilizado no es ahorro mensual; contribución no es beneficio neto. No se garantiza rentabilidad.",
    },
    intelligence: {
      ...content.intelligence,
      title: "Señales para revisar. Decisiones del equipo.",
      subtitle: "RIMs y SAVia: alcance y estado productivo por confirmar para cada operativa.",
      rims: { title: "RIMs™", body: "Familia de análisis mostrada en la documentación; confirmar motores activos y datos disponibles." },
      savia: { title: "SAVia", body: "Interfaz conversacional con evidencia visual; el acceso a datos y las acciones requieren validación específica." },
      approval: "La aprobación humana y el resultado de cada acción deben verificarse como requisito de implantación, no deducirse del texto comercial.",
      caption: "Interfaz documentada. No acredita por sí sola una función productiva certificada.",
    },
  };
}

export function reviewSpanishDepth(depth: PresentationCapabilityDepth): PresentationCapabilityDepth {
  return {
    ...depth,
    cloudrimFlow: ["Acordar canal", "Validar campos", "Revisar extracción", "Comprobar destino", "Conciliar resultado"],
    margins: {
      ...depth.margins,
      subtitle: "Revisar coste, PVP, formato y periodo antes de interpretar ventas y stock. Las pantallas no certifican la cobertura ni la fórmula de cada indicador.",
      items: [
        { title: "Coste y formato", body: "Confirmar coste y precio por botella o copa, impuestos y equivalencias." },
        { title: "Cambios de coste", body: "Contrastar origen y fecha antes de interpretar una variación de margen." },
        { title: "Capital inmovilizado", body: "Separar valor del stock de ahorro o beneficio mensual." },
        { title: "Escenarios", body: "Hacer explícitos los supuestos. Una simulación no garantiza el resultado comercial." },
      ],
    },
    supply: {
      ...depth.supply,
      title: "Compras que se puedan contrastar",
      subtitle: "Catálogos y comparador tienen documentación visual. Cobertura de proveedores, cálculos y pedidos deben validarse para cada implantación.",
      items: [
        { title: "Tarifas comparables", body: "Revisar formato, impuestos, portes, mínimos y fecha de vigencia." },
        { title: "Demanda y stock", body: "Confirmar cobertura antes de usar ventas como criterio de reposición." },
        { title: "Impacto económico", body: "Validar coste efectivo y PVP, sin prometer protección automática del margen." },
        { title: "Pedido revisado", body: "Comprobar aprobación y recepción; una propuesta no equivale a un pedido enviado." },
      ],
      outcomeLabel: "Criterio de aceptación",
      outcome: "Origen conocido · cálculo revisado · aprobación · resultado comprobado",
    },
    rims: {
      ...depth.rims,
      subtitle: "Familia de motores descrita en la presentación. Confirmar disponibilidad, fuentes y cálculo de cada señal antes de ofrecerla como operativa.",
      items: depth.rims.items.map(item => ({ ...item, body: `Ámbito a validar: ${item.body.charAt(0).toLowerCase()}${item.body.slice(1)}` })),
      outcomeLabel: "Flujo a validar",
    },
    savia: {
      ...depth.savia,
      title: "Preguntas que merecen datos verificables",
      subtitle: "Ejemplos de preguntas para evaluar durante la validación de SAVia. No acreditan respuestas ni acciones ya habilitadas para todos los restaurantes.",
      steps: [
        { title: "Acceso", body: "Confirmar fuentes, permisos, local y periodo." },
        { title: "Respuesta", body: "Contrastar evidencia, supuestos y límites con los datos originales." },
        { title: "Acción", body: "Verificar aprobación humana y resultado antes de habilitar cambios." },
      ],
      approval: "Gate: comprobar permisos, aprobación, trazabilidad y recuperación. La interfaz no demuestra por sí sola estas garantías.",
      caption: "Capturas existentes de SAVia. Alcance y lifecycle productivo pendientes de confirmación.",
    },
  };
}
