import type { SupportedLang } from "@/i18n/types";

type Card = { title: string; body: string };
type FlowStep = Card & { label: string; capabilities: string };
type Plan = {
  name: string;
  annual: string;
  monthly: string;
  tagline: string;
  features: string[];
  badge?: string;
  highlight?: boolean;
};

export interface PresentationContent {
  metaTitle: string;
  metaDescription: string;
  shareLabel: string;
  shareCopied: string;
  fullscreenLabel: string;
  downloadLabel: string;
  ctaTalk: string;
  scrollDown: string;
  preparedFor: (group: string) => string;
  cover: { eyebrow: string; title: string; subtitle: string };
  challenge: { eyebrow: string; title: string; subtitle: string; items: Card[] };
  platform: { eyebrow: string; title: string; body: string; proof: string };
  flow: { eyebrow: string; title: string; subtitle: string; steps: FlowStep[]; footnote: string };
  cloudrim: { eyebrow: string; title: string; body: string; items: Card[]; caption: string };
  core: { eyebrow: string; title: string; body: string; items: Card[] };
  cellar: { eyebrow: string; title: string; subtitle: string; items: Card[]; mapCaption: string; lockersCaption: string };
  performance: { eyebrow: string; title: string; subtitle: string; items: Card[]; footnote: string };
  intelligence: { eyebrow: string; title: string; subtitle: string; rims: Card; savia: Card; approval: string; caption: string };
  groups: { eyebrow: string; title: string; subtitle: string; items: Card[] };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    annualLabel: string;
    monthlyLabel: string;
    plans: Plan[];
    footnote: string;
    cta: string;
  };
  rollout: { eyebrow: string; title: string; body: string; steps: Card[] };
  proof: { eyebrow: string; title: string; subtitle: string; quote: string; author: string };
  closing: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    email: string;
    phone: string;
  };
}

const es: PresentationContent = {
  metaTitle: "Presentación Winerim · El sistema operativo del vino",
  metaDescription: "Descubre cómo Winerim conecta carta, TPV, stock, compras, márgenes, CloudRIM, SAVia, RIMs, Wine Cellar y Wine Lockers para operar el vino con datos.",
  shareLabel: "Compartir",
  shareCopied: "Enlace copiado",
  fullscreenLabel: "Pantalla completa",
  downloadLabel: "Descargar PDF",
  ctaTalk: "Hablemos",
  scrollDown: "Desplazar",
  preparedFor: (group) => `Preparado para ${group}`,
  cover: {
    eyebrow: "Presentación oficial",
    title: "El sistema operativo del vino para restauración",
    subtitle: "Winerim conecta carta, bodega, ventas, compras y márgenes para que el equipo venda mejor y dirección decida con datos vivos.",
  },
  challenge: {
    eyebrow: "El reto",
    title: "El vino mueve margen, stock y experiencia. Pero sus datos siguen separados.",
    subtitle: "Cuando carta, TPV, albaranes, inventario y equipo trabajan por separado, aparecen errores, botellas paradas y decisiones tardías.",
    items: [
      { title: "Carta desactualizada", body: "El cliente ve referencias o precios que ya no reflejan la bodega." },
      { title: "Stock invisible", body: "Recuentos manuales, ubicaciones imprecisas y capital inmovilizado." },
      { title: "Margen opaco", body: "El coste cambia, el PVP no y la fuga se descubre demasiado tarde." },
      { title: "Datos sin decisión", body: "Hay ventas y documentos, pero falta una lectura común y accionable." },
    ],
  },
  platform: {
    eyebrow: "Qué es Winerim",
    title: "Una sola plataforma para operar todo el ciclo del vino",
    body: "Winerim mantiene la carta viva, ordena la bodega física, conecta ventas y compras, calcula rentabilidad y convierte cada señal en una decisión trazable.",
    proof: "Del documento recibido a la botella vendida, con el equipo humano siempre al mando.",
  },
  flow: {
    eyebrow: "Arquitectura Winerim",
    title: "Los datos entran una vez. Todo el sistema trabaja con ellos.",
    subtitle: "Cuatro capas conectadas convierten información dispersa en una operación de vino coherente.",
    steps: [
      { label: "01 · Recoger", title: "CloudRIM", body: "Recibe cartas, albaranes, facturas, tarifas, ventas y stock por el canal disponible.", capabilities: "Portal · email · carpeta · FTP/SFTP · API · proveedor" },
      { label: "02 · Operar", title: "Core, TPV y Gestión", body: "Normaliza referencias y conecta carta, ventas, inventario, costes y documentos.", capabilities: "Carta · TPV · compras · stock · distribuidores" },
      { label: "03 · Entender", title: "Márgenes y RIMs™", body: "Detecta rotación, fugas de margen, stock dormido y oportunidades por referencia.", capabilities: "Pricing · rotación · alertas · simulación · benchmark" },
      { label: "04 · Decidir", title: "SAVia", body: "Permite preguntar, comparar y preparar acciones con contexto operativo real.", capabilities: "Conversación · explicación · preview · aprobación humana" },
    ],
    footnote: "Wine Cellar, Wine Lockers y Winerim Supply amplían el sistema desde la ubicación física hasta la compra inteligente.",
  },
  cloudrim: {
    eyebrow: "CloudRIM",
    title: "La nube operativa que evita perseguir datos",
    body: "CloudRIM recoge la información donde ya existe y la enruta dentro de Winerim. El equipo deja de copiar archivos, rehacer inventarios y buscar la última versión.",
    items: [
      { title: "Entrada multicanal", body: "Portal, email, carpeta compartida, FTP/SFTP, API o conexión con proveedor." },
      { title: "Documentos útiles", body: "Cartas, albaranes, facturas, tarifas, reportes TPV y ficheros de stock." },
      { title: "Clasificación y trazabilidad", body: "Cada archivo se identifica, procesa y vincula con su local y flujo operativo." },
      { title: "Menos administración", body: "La información llega preparada para compras, costes, inventario y análisis." },
    ],
    caption: "Bandeja y carga documental de CloudRIM.",
  },
  core: {
    eyebrow: "Winerim Core",
    title: "Una carta viva para el cliente y para el equipo",
    body: "La experiencia de sala se conecta con la misma fuente de verdad que usa la operación. Precios, disponibilidad, fichas, filtros y maridajes permanecen alineados.",
    items: [
      { title: "Elegir sin bloqueo", body: "Filtros por estilo, origen, precio, gusto y ocasión." },
      { title: "Vender con criterio", body: "Notas de cata, maridajes, comparador y argumentos para sala." },
      { title: "Actualizar una vez", body: "El cambio de precio, formato o disponibilidad llega a toda la carta." },
      { title: "Atender en varios idiomas", body: "Una experiencia localizada para la clientela internacional." },
    ],
  },
  cellar: {
    eyebrow: "Bodega conectada",
    title: "Cada botella, en su lugar y con su contexto",
    subtitle: "Winerim no solo sabe qué vino existe. También puede saber dónde está y a quién pertenece.",
    items: [
      { title: "Wine Cellar", body: "Mapea zonas, armarios, estantes y posiciones para localizar botellas sin depender de la memoria del equipo." },
      { title: "Wine Lockers", body: "Gestiona botellas de clientes, custodias, movimientos y consumos con trazabilidad individual." },
      { title: "Stock operativo", body: "Conecta ubicación, disponibilidad, entradas, salidas y ajustes con la carta y la gestión." },
    ],
    mapCaption: "Wine Cellar: mapa real de bodega.",
    lockersCaption: "Wine Lockers: botellas de clientes bajo control.",
  },
  performance: {
    eyebrow: "Control y rentabilidad",
    title: "De saber qué pasó a saber qué conviene hacer",
    subtitle: "Ventas, costes y stock se leen juntos para actuar antes de que el margen o la rotación se deterioren.",
    items: [
      { title: "TPV conectado", body: "Mapea referencias y convierte tickets en rotación, ingresos y ticket medio por vino." },
      { title: "Márgenes reales", body: "Cruza coste, PVP, formatos y ventas para detectar fugas y simular cambios." },
      { title: "Winerim Supply", body: "Compara tarifas, protege el margen y prepara pedidos según ventas, stock y objetivo." },
      { title: "Decision Center", body: "Ordena prioridades y playbooks para carta, compras, copa, stock y multi-local." },
    ],
    footnote: "Menos Excel, menos recuentos y una lectura común para sumiller, F&B, compras y dirección.",
  },
  intelligence: {
    eyebrow: "Inteligencia Dinámica",
    title: "RIMs™ detecta. SAVia explica. El equipo decide.",
    subtitle: "La inteligencia de Winerim trabaja sobre datos reales del restaurante, no sobre recomendaciones genéricas.",
    rims: { title: "RIMs™", body: "Motores especializados que detectan señales de carta, rotación, margen, stock, compras y venta por copa, y preparan propuestas medibles." },
    savia: { title: "SAVia", body: "Agente conversacional para preguntar por ventas, stock, costes, márgenes, albaranes y oportunidades sin perderse en dashboards." },
    approval: "SAVia consulta, resume y prepara. Los cambios críticos de precio, stock, documentos o carta requieren aprobación humana.",
    caption: "SAVia responde con el contexto operativo de Winerim.",
  },
  groups: {
    eyebrow: "Hoteles y grupos",
    title: "Control central sin borrar la personalidad de cada local",
    subtitle: "Una capa común para comparar, gobernar y desplegar, con autonomía operativa donde importa.",
    items: [
      { title: "Multi-local", body: "Carta, inventario, ventas y márgenes consolidados con lectura por establecimiento." },
      { title: "Benchmarking", body: "Compara rotación, ticket, margen y surtido para extender buenas prácticas." },
      { title: "Estándares y permisos", body: "Define qué gobierna el grupo y qué puede adaptar cada equipo local." },
      { title: "Reporting ejecutivo", body: "KPIs comparables y seguimiento periódico para dirección y operaciones." },
    ],
  },
  pricing: {
    eyebrow: "Módulos y precios",
    title: "Empieza por lo que necesitas. Conecta el resto cuando aporte valor.",
    subtitle: "Seis módulos cubren desde la carta digital hasta la operación gestionada completa.",
    annualLabel: "Pago anual",
    monthlyLabel: "Pago mensual",
    plans: [
      { name: "Core", annual: "99 €/mes", monthly: "150 €/mes", tagline: "Carta y base operativa", features: ["Carta digital", "Fichas, filtros y maridajes", "Wine Cellar y Wine Lockers"], badge: "Punto de partida" },
      { name: "TPV", annual: "75 €/mes", monthly: "99 €/mes", tagline: "Ventas reales conectadas", features: ["Mapeo de referencias", "Sincronización de ventas", "Rotación y ticket medio"] },
      { name: "Gestión", annual: "179 €/mes", monthly: "220 €/mes", tagline: "Stock, compras y documentos", features: ["CloudRIM", "Inventario y costes", "Distribuidores y reposición"] },
      { name: "Márgenes", annual: "249 €/mes", monthly: "299 €/mes", tagline: "Rentabilidad por referencia", features: ["Margen real", "Stock dormido", "Pricing y simulaciones"] },
      { name: "Intelligence", annual: "349 €/mes", monthly: "425 €/mes", tagline: "Decisión con IA", features: ["RIMs™", "SAVia", "Alertas y previews"], badge: "Incluye RIMs™", highlight: true },
      { name: "Full / Managed", annual: "desde 599 €/mes", monthly: "desde 799 €/mes", tagline: "Suite y acompañamiento", features: ["Multi-local", "Integraciones avanzadas", "Reporting y seguimiento"] },
    ],
    footnote: "Precios por establecimiento. El alcance final de integraciones, implantación y servicio Managed se confirma en la propuesta.",
    cta: "Ver detalle de módulos",
  },
  rollout: {
    eyebrow: "Implantación",
    title: "De la carta actual a una operación conectada",
    body: "El despliegue se adapta al punto de partida, al número de referencias, a los sistemas existentes y al número de locales.",
    steps: [
      { title: "1. Recogemos", body: "Carta, stock, tarifas, documentos y fuentes de venta disponibles." },
      { title: "2. Normalizamos", body: "Referencias, formatos, precios, ubicaciones y conexiones." },
      { title: "3. Activamos", body: "Módulos, permisos, carta y flujos de datos acordados." },
      { title: "4. Medimos", body: "Uso, calidad del dato, rotación, margen y siguientes oportunidades." },
    ],
  },
  proof: {
    eyebrow: "Clientes",
    title: "Construido para operaciones de vino exigentes",
    subtitle: "Restaurantes, hoteles, wine bars y grupos usan Winerim para convertir la carta en una herramienta comercial y operativa.",
    quote: "Lo que antes eran 10 o 15 minutos para explicar la carta, ahora con Winerim en 3 minutos ya tienen una visión global de los vinos.",
    author: "Nacho Otamendi · Propietario y sommelier · Travieso Bar",
  },
  closing: {
    eyebrow: "Siguiente paso",
    title: "Veamos qué parte de tu operación del vino puede mejorar primero",
    body: "En una demo de 15 minutos revisamos tu carta, tus procesos y los módulos que realmente encajan.",
    primaryCta: "Solicitar demo",
    secondaryCta: "Compartir presentación",
    email: "info@winerim.com",
    phone: "+34 614 499 864",
  },
};

const en: PresentationContent = {
  metaTitle: "Winerim presentation · The wine operating system",
  metaDescription: "See how Winerim connects wine list, POS, stock, purchasing, margins, CloudRIM, SAVia, RIMs, Wine Cellar and Wine Lockers in one operating system.",
  shareLabel: "Share",
  shareCopied: "Link copied",
  fullscreenLabel: "Fullscreen",
  downloadLabel: "Download PDF",
  ctaTalk: "Let's talk",
  scrollDown: "Scroll",
  preparedFor: (group) => `Prepared for ${group}`,
  cover: { eyebrow: "Official presentation", title: "The wine operating system for hospitality", subtitle: "Winerim connects wine list, cellar, sales, purchasing and margins so teams sell better and management decides with live data." },
  challenge: {
    eyebrow: "The challenge", title: "Wine drives margin, stock and guest experience. Yet its data remains disconnected.", subtitle: "When list, POS, delivery notes, inventory and teams work apart, errors, dormant bottles and late decisions follow.",
    items: [
      { title: "Outdated list", body: "Guests see wines or prices that no longer reflect the cellar." },
      { title: "Invisible stock", body: "Manual counts, unclear locations and cash tied up in bottles." },
      { title: "Opaque margin", body: "Cost changes, price does not, and leakage is found too late." },
      { title: "Data without decisions", body: "Sales and documents exist, but there is no shared actionable reading." },
    ],
  },
  platform: { eyebrow: "What Winerim is", title: "One platform for the entire wine operating cycle", body: "Winerim keeps the list live, organizes the physical cellar, connects sales and purchasing, calculates profitability and turns each signal into a traceable decision.", proof: "From the document received to the bottle sold, with the human team always in control." },
  flow: {
    eyebrow: "Winerim architecture", title: "Data enters once. The entire system works with it.", subtitle: "Four connected layers turn scattered information into a coherent wine operation.",
    steps: [
      { label: "01 · Collect", title: "CloudRIM", body: "Receives lists, delivery notes, invoices, catalogues, sales and stock through the available channel.", capabilities: "Portal · email · folder · FTP/SFTP · API · supplier" },
      { label: "02 · Operate", title: "Core, POS and Management", body: "Normalizes references and connects list, sales, inventory, costs and documents.", capabilities: "Wine list · POS · purchasing · stock · suppliers" },
      { label: "03 · Understand", title: "Margins and RIMs™", body: "Detects rotation, margin leakage, dormant stock and opportunities by reference.", capabilities: "Pricing · rotation · alerts · simulation · benchmark" },
      { label: "04 · Decide", title: "SAVia", body: "Lets teams ask, compare and prepare actions with real operating context.", capabilities: "Conversation · explanation · preview · human approval" },
    ],
    footnote: "Wine Cellar, Wine Lockers and Winerim Supply extend the system from physical location to intelligent purchasing.",
  },
  cloudrim: {
    eyebrow: "CloudRIM", title: "The operational cloud that stops teams chasing data", body: "CloudRIM collects information where it already lives and routes it into Winerim. Teams stop copying files, rebuilding inventories and hunting for the latest version.",
    items: [
      { title: "Multi-channel intake", body: "Portal, email, shared folder, FTP/SFTP, API or supplier connection." },
      { title: "Useful documents", body: "Lists, delivery notes, invoices, catalogues, POS reports and stock files." },
      { title: "Classification and traceability", body: "Each file is identified, processed and linked to its venue and operating flow." },
      { title: "Less administration", body: "Information arrives ready for purchasing, costs, inventory and analysis." },
    ],
    caption: "CloudRIM inbox and document upload.",
  },
  core: {
    eyebrow: "Winerim Core", title: "A live wine list for guests and teams", body: "The floor experience uses the same source of truth as operations. Prices, availability, wine profiles, filters and pairings stay aligned.",
    items: [
      { title: "Choose without friction", body: "Filters by style, origin, price, taste and occasion." },
      { title: "Sell with confidence", body: "Tasting notes, pairings, comparison and talking points for the floor." },
      { title: "Update once", body: "A price, format or availability change reaches the whole list." },
      { title: "Serve every language", body: "A localized experience for international guests." },
    ],
  },
  cellar: {
    eyebrow: "Connected cellar", title: "Every bottle in its place and with its context", subtitle: "Winerim knows more than which wine exists. It can also know where it is and who it belongs to.",
    items: [
      { title: "Wine Cellar", body: "Maps rooms, cabinets, shelves and positions so bottles can be found without relying on team memory." },
      { title: "Wine Lockers", body: "Manages guest-owned bottles, custody, movements and consumption with individual traceability." },
      { title: "Operational stock", body: "Connects location, availability, incoming, outgoing and adjustments with the list and management." },
    ],
    mapCaption: "Wine Cellar: a real cellar map.", lockersCaption: "Wine Lockers: guest bottles under control.",
  },
  performance: {
    eyebrow: "Control and profitability", title: "From knowing what happened to knowing what to do next", subtitle: "Sales, costs and stock are read together so action happens before margin or rotation deteriorates.",
    items: [
      { title: "Connected POS", body: "Maps references and turns tickets into rotation, revenue and average ticket by wine." },
      { title: "True margins", body: "Combines cost, selling price, formats and sales to detect leakage and simulate changes." },
      { title: "Winerim Supply", body: "Compares catalogues, protects margin and prepares orders using sales, stock and targets." },
      { title: "Decision Center", body: "Organizes priorities and playbooks for list, purchasing, by-the-glass, stock and multi-site." },
    ],
    footnote: "Less spreadsheet work, fewer counts and one shared reading for sommeliers, F&B, purchasing and management.",
  },
  intelligence: {
    eyebrow: "Dynamic Intelligence", title: "RIMs™ detects. SAVia explains. The team decides.", subtitle: "Winerim intelligence works with real venue data, not generic recommendations.",
    rims: { title: "RIMs™", body: "Specialist engines detect signals across list, rotation, margin, stock, purchasing and by-the-glass, then prepare measurable proposals." },
    savia: { title: "SAVia", body: "A conversational agent for asking about sales, stock, costs, margins, delivery notes and opportunities without getting lost in dashboards." },
    approval: "SAVia consults, summarizes and prepares. Critical changes to prices, stock, documents or list require human approval.", caption: "SAVia answers with Winerim operating context.",
  },
  groups: {
    eyebrow: "Hotels and groups", title: "Central control without erasing each venue's identity", subtitle: "One shared layer for comparison, governance and rollout, with local autonomy where it matters.",
    items: [
      { title: "Multi-site", body: "Consolidated list, inventory, sales and margins with venue-level visibility." },
      { title: "Benchmarking", body: "Compare rotation, ticket, margin and range to scale good practice." },
      { title: "Standards and permissions", body: "Define what the group governs and what each local team can adapt." },
      { title: "Executive reporting", body: "Comparable KPIs and recurring follow-up for management and operations." },
    ],
  },
  pricing: {
    eyebrow: "Modules and pricing", title: "Start with what you need. Connect the rest when it adds value.", subtitle: "Six modules cover everything from the digital list to a fully managed operation.", annualLabel: "Annual billing", monthlyLabel: "Monthly billing",
    plans: [
      { name: "Core", annual: "€99/month", monthly: "€150/month", tagline: "List and operating base", features: ["Digital wine list", "Profiles, filters and pairings", "Wine Cellar and Wine Lockers"], badge: "Starting point" },
      { name: "POS", annual: "€75/month", monthly: "€99/month", tagline: "Connected real sales", features: ["Reference mapping", "Sales synchronization", "Rotation and average ticket"] },
      { name: "Management", annual: "€179/month", monthly: "€220/month", tagline: "Stock, purchasing and documents", features: ["CloudRIM", "Inventory and costs", "Suppliers and replenishment"] },
      { name: "Margins", annual: "€249/month", monthly: "€299/month", tagline: "Profitability by reference", features: ["True margin", "Dormant stock", "Pricing and simulations"] },
      { name: "Intelligence", annual: "€349/month", monthly: "€425/month", tagline: "AI-assisted decisions", features: ["RIMs™", "SAVia", "Alerts and previews"], badge: "Includes RIMs™", highlight: true },
      { name: "Full / Managed", annual: "from €599/month", monthly: "from €799/month", tagline: "Suite and support", features: ["Multi-site", "Advanced integrations", "Reporting and follow-up"] },
    ],
    footnote: "Pricing per venue. Final integration, implementation and Managed scope is confirmed in the proposal.", cta: "See module details",
  },
  rollout: {
    eyebrow: "Implementation", title: "From today's list to a connected operation", body: "Rollout adapts to your starting point, number of references, existing systems and number of venues.",
    steps: [
      { title: "1. We collect", body: "Wine list, stock, catalogues, documents and available sales sources." },
      { title: "2. We normalize", body: "References, formats, prices, locations and connections." },
      { title: "3. We activate", body: "Agreed modules, permissions, list and data flows." },
      { title: "4. We measure", body: "Usage, data quality, rotation, margin and next opportunities." },
    ],
  },
  proof: { eyebrow: "Customers", title: "Built for demanding wine operations", subtitle: "Restaurants, hotels, wine bars and groups use Winerim to turn the list into a commercial and operating tool.", quote: "What used to take 10 or 15 minutes to explain now gives guests a complete view of the wines in 3 minutes with Winerim.", author: "Nacho Otamendi · Owner and sommelier · Travieso Bar" },
  closing: { eyebrow: "Next step", title: "Let's find which part of your wine operation should improve first", body: "In a 15-minute demo we review your list, processes and the modules that genuinely fit.", primaryCta: "Request a demo", secondaryCta: "Share presentation", email: "info@winerim.com", phone: "+34 614 499 864" },
};

const fr: PresentationContent = {
  metaTitle: "Présentation Winerim · Le système d'exploitation du vin",
  metaDescription: "Découvrez comment Winerim relie carte, caisse, stock, achats, marges, CloudRIM, SAVia, RIMs, Wine Cellar et Wine Lockers.",
  shareLabel: "Partager", shareCopied: "Lien copié", fullscreenLabel: "Plein écran", downloadLabel: "Télécharger le PDF", ctaTalk: "Parlons-en", scrollDown: "Faire défiler", preparedFor: (group) => `Préparé pour ${group}`,
  cover: { eyebrow: "Présentation officielle", title: "Le système d'exploitation du vin pour la restauration", subtitle: "Winerim relie carte, cave, ventes, achats et marges pour mieux vendre et décider avec des données vivantes." },
  challenge: {
    eyebrow: "Le défi", title: "Le vin pèse sur la marge, le stock et l'expérience. Pourtant, ses données restent dispersées.", subtitle: "Quand carte, caisse, bons de livraison, inventaire et équipes travaillent séparément, les erreurs et les décisions tardives s'accumulent.",
    items: [
      { title: "Carte obsolète", body: "Le client voit des références ou des prix qui ne reflètent plus la cave." },
      { title: "Stock invisible", body: "Comptages manuels, emplacements flous et argent immobilisé." },
      { title: "Marge opaque", body: "Le coût évolue, le prix reste figé et la fuite est détectée trop tard." },
      { title: "Données sans décision", body: "Les ventes et documents existent, mais pas de lecture commune et actionnable." },
    ],
  },
  platform: { eyebrow: "Winerim en bref", title: "Une plateforme pour tout le cycle opérationnel du vin", body: "Winerim maintient la carte à jour, organise la cave physique, relie ventes et achats, calcule la rentabilité et transforme chaque signal en décision traçable.", proof: "Du document reçu à la bouteille vendue, avec l'équipe humaine toujours aux commandes." },
  flow: {
    eyebrow: "Architecture Winerim", title: "Les données entrent une fois. Tout le système les exploite.", subtitle: "Quatre couches connectées transforment l'information dispersée en une opération cohérente.",
    steps: [
      { label: "01 · Collecter", title: "CloudRIM", body: "Reçoit cartes, bons, factures, tarifs, ventes et stocks par le canal disponible.", capabilities: "Portail · email · dossier · FTP/SFTP · API · fournisseur" },
      { label: "02 · Opérer", title: "Core, caisse et Gestion", body: "Normalise les références et relie carte, ventes, inventaire, coûts et documents.", capabilities: "Carte · caisse · achats · stock · fournisseurs" },
      { label: "03 · Comprendre", title: "Marges et RIMs™", body: "Détecte rotation, pertes de marge, stock dormant et opportunités par référence.", capabilities: "Pricing · rotation · alertes · simulation · benchmark" },
      { label: "04 · Décider", title: "SAVia", body: "Permet d'interroger, comparer et préparer des actions avec le contexte réel.", capabilities: "Conversation · explication · aperçu · validation humaine" },
    ],
    footnote: "Wine Cellar, Wine Lockers et Winerim Supply prolongent le système de l'emplacement physique à l'achat intelligent.",
  },
  cloudrim: {
    eyebrow: "CloudRIM", title: "Le cloud opérationnel qui évite de courir après les données", body: "CloudRIM recueille l'information là où elle existe et l'achemine dans Winerim. Plus besoin de recopier des fichiers, refaire l'inventaire ou chercher la dernière version.",
    items: [
      { title: "Entrée multicanale", body: "Portail, email, dossier partagé, FTP/SFTP, API ou connexion fournisseur." },
      { title: "Documents utiles", body: "Cartes, bons, factures, tarifs, rapports de caisse et fichiers de stock." },
      { title: "Classement et traçabilité", body: "Chaque fichier est identifié, traité et relié à son établissement et à son flux." },
      { title: "Moins d'administration", body: "L'information arrive prête pour les achats, coûts, stocks et analyses." },
    ], caption: "Boîte de réception et chargement documentaire CloudRIM.",
  },
  core: {
    eyebrow: "Winerim Core", title: "Une carte vivante pour le client et l'équipe", body: "La salle utilise la même source de vérité que l'exploitation. Prix, disponibilité, fiches, filtres et accords restent alignés.",
    items: [
      { title: "Choisir sans hésiter", body: "Filtres par style, origine, prix, goût et occasion." },
      { title: "Vendre avec assurance", body: "Notes de dégustation, accords, comparateur et arguments pour la salle." },
      { title: "Mettre à jour une fois", body: "Tout changement de prix, format ou disponibilité atteint la carte entière." },
      { title: "Servir en plusieurs langues", body: "Une expérience localisée pour la clientèle internationale." },
    ],
  },
  cellar: {
    eyebrow: "Cave connectée", title: "Chaque bouteille à sa place, avec son contexte", subtitle: "Winerim sait quel vin existe, mais aussi où il se trouve et à qui il appartient.",
    items: [
      { title: "Wine Cellar", body: "Cartographie zones, armoires, étagères et positions pour retrouver chaque bouteille sans dépendre de la mémoire." },
      { title: "Wine Lockers", body: "Gère les bouteilles des clients, la garde, les mouvements et la consommation avec traçabilité." },
      { title: "Stock opérationnel", body: "Relie emplacement, disponibilité, entrées, sorties et ajustements à la carte et à la gestion." },
    ], mapCaption: "Wine Cellar : carte réelle de la cave.", lockersCaption: "Wine Lockers : bouteilles clients sous contrôle.",
  },
  performance: {
    eyebrow: "Contrôle et rentabilité", title: "Savoir ce qui s'est passé, puis savoir quoi faire", subtitle: "Ventes, coûts et stocks sont lus ensemble pour agir avant la dégradation de la marge ou de la rotation.",
    items: [
      { title: "Caisse connectée", body: "Associe les références et transforme les tickets en rotation, chiffre et panier moyen par vin." },
      { title: "Marges réelles", body: "Croise coût, prix, formats et ventes pour détecter les fuites et simuler des changements." },
      { title: "Winerim Supply", body: "Compare les tarifs, protège la marge et prépare les commandes selon ventes, stock et objectifs." },
      { title: "Decision Center", body: "Organise priorités et playbooks pour carte, achats, vin au verre, stock et multi-sites." },
    ], footnote: "Moins d'Excel, moins de comptages et une lecture commune pour sommellerie, F&B, achats et direction.",
  },
  intelligence: {
    eyebrow: "Intelligence Dynamique", title: "RIMs™ détecte. SAVia explique. L'équipe décide.", subtitle: "L'intelligence Winerim s'appuie sur les données réelles de l'établissement, pas sur des conseils génériques.",
    rims: { title: "RIMs™", body: "Des moteurs spécialisés détectent les signaux de carte, rotation, marge, stock, achats et vin au verre, puis préparent des propositions mesurables." },
    savia: { title: "SAVia", body: "Un agent conversationnel pour interroger ventes, stock, coûts, marges, bons et opportunités sans se perdre dans les tableaux de bord." },
    approval: "SAVia consulte, résume et prépare. Les changements critiques de prix, stock, documents ou carte exigent une validation humaine.", caption: "SAVia répond avec le contexte opérationnel de Winerim.",
  },
  groups: {
    eyebrow: "Hôtels et groupes", title: "Un contrôle central sans effacer l'identité de chaque établissement", subtitle: "Une couche commune pour comparer, gouverner et déployer, avec l'autonomie locale nécessaire.",
    items: [
      { title: "Multi-sites", body: "Carte, inventaire, ventes et marges consolidés avec lecture par établissement." },
      { title: "Benchmarking", body: "Compare rotation, panier, marge et assortiment pour diffuser les bonnes pratiques." },
      { title: "Standards et droits", body: "Définissez ce que le groupe gouverne et ce que chaque équipe peut adapter." },
      { title: "Reporting exécutif", body: "KPIs comparables et suivi régulier pour direction et opérations." },
    ],
  },
  pricing: {
    eyebrow: "Modules et tarifs", title: "Commencez par l'essentiel. Connectez le reste quand il crée de la valeur.", subtitle: "Six modules couvrent la carte digitale jusqu'à l'exploitation entièrement accompagnée.", annualLabel: "Paiement annuel", monthlyLabel: "Paiement mensuel",
    plans: [
      { name: "Core", annual: "99 €/mois", monthly: "150 €/mois", tagline: "Carte et socle opérationnel", features: ["Carte digitale", "Fiches, filtres et accords", "Wine Cellar et Wine Lockers"], badge: "Point de départ" },
      { name: "Caisse", annual: "75 €/mois", monthly: "99 €/mois", tagline: "Ventes réelles connectées", features: ["Association des références", "Synchronisation des ventes", "Rotation et panier moyen"] },
      { name: "Gestion", annual: "179 €/mois", monthly: "220 €/mois", tagline: "Stock, achats et documents", features: ["CloudRIM", "Inventaire et coûts", "Fournisseurs et réassort"] },
      { name: "Marges", annual: "249 €/mois", monthly: "299 €/mois", tagline: "Rentabilité par référence", features: ["Marge réelle", "Stock dormant", "Pricing et simulations"] },
      { name: "Intelligence", annual: "349 €/mois", monthly: "425 €/mois", tagline: "Décision assistée par IA", features: ["RIMs™", "SAVia", "Alertes et aperçus"], badge: "Inclut RIMs™", highlight: true },
      { name: "Full / Managed", annual: "dès 599 €/mois", monthly: "dès 799 €/mois", tagline: "Suite et accompagnement", features: ["Multi-sites", "Intégrations avancées", "Reporting et suivi"] },
    ], footnote: "Tarifs par établissement. Le périmètre final des intégrations, du déploiement et du service Managed est confirmé dans la proposition.", cta: "Voir le détail des modules",
  },
  rollout: {
    eyebrow: "Déploiement", title: "De la carte actuelle à une opération connectée", body: "Le déploiement s'adapte au point de départ, au nombre de références, aux systèmes existants et aux établissements.",
    steps: [
      { title: "1. Nous collectons", body: "Carte, stock, tarifs, documents et sources de vente disponibles." },
      { title: "2. Nous normalisons", body: "Références, formats, prix, emplacements et connexions." },
      { title: "3. Nous activons", body: "Modules, droits, carte et flux de données convenus." },
      { title: "4. Nous mesurons", body: "Usage, qualité des données, rotation, marge et prochaines opportunités." },
    ],
  },
  proof: { eyebrow: "Clients", title: "Conçu pour des opérations vin exigeantes", subtitle: "Restaurants, hôtels, bars à vin et groupes transforment leur carte en outil commercial et opérationnel avec Winerim.", quote: "Ce qui demandait auparavant 10 ou 15 minutes d'explication donne maintenant, avec Winerim, une vision globale des vins en 3 minutes.", author: "Nacho Otamendi · Propriétaire et sommelier · Travieso Bar" },
  closing: { eyebrow: "Prochaine étape", title: "Voyons quelle partie de votre opération vin doit progresser en premier", body: "En 15 minutes, nous examinons votre carte, vos processus et les modules réellement adaptés.", primaryCta: "Demander une démo", secondaryCta: "Partager la présentation", email: "info@winerim.com", phone: "+34 614 499 864" },
};

const it: PresentationContent = {
  metaTitle: "Presentazione Winerim · Il sistema operativo del vino",
  metaDescription: "Scopri come Winerim collega carta, POS, stock, acquisti, margini, CloudRIM, SAVia, RIMs, Wine Cellar e Wine Lockers.",
  shareLabel: "Condividi", shareCopied: "Link copiato", fullscreenLabel: "Schermo intero", downloadLabel: "Scarica PDF", ctaTalk: "Parliamone", scrollDown: "Scorri", preparedFor: (group) => `Preparato per ${group}`,
  cover: { eyebrow: "Presentazione ufficiale", title: "Il sistema operativo del vino per la ristorazione", subtitle: "Winerim collega carta, cantina, vendite, acquisti e margini per vendere meglio e decidere con dati vivi." },
  challenge: {
    eyebrow: "La sfida", title: "Il vino muove margine, stock ed esperienza. Ma i suoi dati restano separati.", subtitle: "Quando carta, POS, documenti, inventario e team lavorano separatamente, aumentano errori, bottiglie ferme e decisioni tardive.",
    items: [
      { title: "Carta non aggiornata", body: "Il cliente vede referenze o prezzi che non riflettono più la cantina." },
      { title: "Stock invisibile", body: "Conteggi manuali, posizioni incerte e capitale immobilizzato." },
      { title: "Margine opaco", body: "Il costo cambia, il prezzo no e la perdita emerge troppo tardi." },
      { title: "Dati senza decisione", body: "Vendite e documenti esistono, ma manca una lettura comune e operativa." },
    ],
  },
  platform: { eyebrow: "Cos'è Winerim", title: "Un'unica piattaforma per tutto il ciclo operativo del vino", body: "Winerim mantiene viva la carta, ordina la cantina fisica, collega vendite e acquisti, calcola la redditività e trasforma ogni segnale in una decisione tracciabile.", proof: "Dal documento ricevuto alla bottiglia venduta, con il team umano sempre al comando." },
  flow: {
    eyebrow: "Architettura Winerim", title: "I dati entrano una volta. Tutto il sistema li utilizza.", subtitle: "Quattro livelli connessi trasformano informazioni disperse in un'operatività coerente.",
    steps: [
      { label: "01 · Raccogliere", title: "CloudRIM", body: "Riceve carte, bolle, fatture, listini, vendite e stock dal canale disponibile.", capabilities: "Portale · email · cartella · FTP/SFTP · API · fornitore" },
      { label: "02 · Operare", title: "Core, POS e Gestione", body: "Normalizza le referenze e collega carta, vendite, inventario, costi e documenti.", capabilities: "Carta · POS · acquisti · stock · fornitori" },
      { label: "03 · Capire", title: "Margini e RIMs™", body: "Rileva rotazione, perdite di margine, stock fermo e opportunità per referenza.", capabilities: "Pricing · rotazione · alert · simulazione · benchmark" },
      { label: "04 · Decidere", title: "SAVia", body: "Permette di chiedere, confrontare e preparare azioni con il contesto reale.", capabilities: "Conversazione · spiegazione · anteprima · approvazione umana" },
    ], footnote: "Wine Cellar, Wine Lockers e Winerim Supply estendono il sistema dalla posizione fisica all'acquisto intelligente.",
  },
  cloudrim: {
    eyebrow: "CloudRIM", title: "Il cloud operativo che evita di inseguire i dati", body: "CloudRIM raccoglie le informazioni dove già esistono e le instrada in Winerim. Il team smette di copiare file, rifare inventari e cercare l'ultima versione.",
    items: [
      { title: "Ingresso multicanale", body: "Portale, email, cartella condivisa, FTP/SFTP, API o connessione al fornitore." },
      { title: "Documenti utili", body: "Carte, bolle, fatture, listini, report POS e file di stock." },
      { title: "Classificazione e tracciabilità", body: "Ogni file viene identificato, elaborato e collegato al locale e al flusso." },
      { title: "Meno amministrazione", body: "Le informazioni arrivano pronte per acquisti, costi, inventario e analisi." },
    ], caption: "Inbox e caricamento documentale CloudRIM.",
  },
  core: {
    eyebrow: "Winerim Core", title: "Una carta viva per il cliente e per il team", body: "La sala usa la stessa fonte di verità dell'operatività. Prezzi, disponibilità, schede, filtri e abbinamenti restano allineati.",
    items: [
      { title: "Scegliere senza blocchi", body: "Filtri per stile, origine, prezzo, gusto e occasione." },
      { title: "Vendere con criterio", body: "Note di degustazione, abbinamenti, confronto e argomenti per la sala." },
      { title: "Aggiornare una volta", body: "Ogni modifica di prezzo, formato o disponibilità raggiunge tutta la carta." },
      { title: "Servire in più lingue", body: "Un'esperienza localizzata per la clientela internazionale." },
    ],
  },
  cellar: {
    eyebrow: "Cantina connessa", title: "Ogni bottiglia al suo posto e con il suo contesto", subtitle: "Winerim sa quale vino esiste, ma anche dove si trova e a chi appartiene.",
    items: [
      { title: "Wine Cellar", body: "Mappa zone, armadi, scaffali e posizioni per trovare le bottiglie senza dipendere dalla memoria." },
      { title: "Wine Lockers", body: "Gestisce bottiglie dei clienti, custodia, movimenti e consumi con tracciabilità individuale." },
      { title: "Stock operativo", body: "Collega posizione, disponibilità, entrate, uscite e rettifiche con carta e gestione." },
    ], mapCaption: "Wine Cellar: mappa reale della cantina.", lockersCaption: "Wine Lockers: bottiglie dei clienti sotto controllo.",
  },
  performance: {
    eyebrow: "Controllo e redditività", title: "Da sapere cosa è successo a sapere cosa conviene fare", subtitle: "Vendite, costi e stock vengono letti insieme per agire prima che margine o rotazione peggiorino.",
    items: [
      { title: "POS connesso", body: "Mappa le referenze e trasforma gli scontrini in rotazione, ricavi e ticket medio per vino." },
      { title: "Margini reali", body: "Incrocia costo, prezzo, formati e vendite per rilevare perdite e simulare cambiamenti." },
      { title: "Winerim Supply", body: "Confronta listini, protegge il margine e prepara ordini secondo vendite, stock e obiettivi." },
      { title: "Decision Center", body: "Ordina priorità e playbook per carta, acquisti, mescita, stock e multi-locale." },
    ], footnote: "Meno Excel, meno conteggi e una lettura comune per sommelier, F&B, acquisti e direzione.",
  },
  intelligence: {
    eyebrow: "Intelligenza Dinamica", title: "RIMs™ rileva. SAVia spiega. Il team decide.", subtitle: "L'intelligenza Winerim lavora sui dati reali del locale, non su consigli generici.",
    rims: { title: "RIMs™", body: "Motori specializzati rilevano segnali di carta, rotazione, margine, stock, acquisti e mescita, preparando proposte misurabili." },
    savia: { title: "SAVia", body: "Agente conversazionale per chiedere di vendite, stock, costi, margini, documenti e opportunità senza perdersi nei dashboard." },
    approval: "SAVia consulta, riassume e prepara. Le modifiche critiche a prezzi, stock, documenti o carta richiedono approvazione umana.", caption: "SAVia risponde con il contesto operativo di Winerim.",
  },
  groups: {
    eyebrow: "Hotel e gruppi", title: "Controllo centrale senza cancellare l'identità di ogni locale", subtitle: "Un livello comune per confrontare, governare e distribuire, con autonomia locale dove serve.",
    items: [
      { title: "Multi-locale", body: "Carta, inventario, vendite e margini consolidati con lettura per struttura." },
      { title: "Benchmarking", body: "Confronta rotazione, ticket, margine e assortimento per diffondere le buone pratiche." },
      { title: "Standard e permessi", body: "Definisci cosa governa il gruppo e cosa può adattare ogni team locale." },
      { title: "Reporting direzionale", body: "KPI confrontabili e monitoraggio periodico per direzione e operazioni." },
    ],
  },
  pricing: {
    eyebrow: "Moduli e prezzi", title: "Parti da ciò che serve. Collega il resto quando crea valore.", subtitle: "Sei moduli coprono dalla carta digitale alla gestione completa accompagnata.", annualLabel: "Pagamento annuale", monthlyLabel: "Pagamento mensile",
    plans: [
      { name: "Core", annual: "99 €/mese", monthly: "150 €/mese", tagline: "Carta e base operativa", features: ["Carta digitale", "Schede, filtri e abbinamenti", "Wine Cellar e Wine Lockers"], badge: "Punto di partenza" },
      { name: "POS", annual: "75 €/mese", monthly: "99 €/mese", tagline: "Vendite reali connesse", features: ["Mappatura referenze", "Sincronizzazione vendite", "Rotazione e ticket medio"] },
      { name: "Gestione", annual: "179 €/mese", monthly: "220 €/mese", tagline: "Stock, acquisti e documenti", features: ["CloudRIM", "Inventario e costi", "Fornitori e riordino"] },
      { name: "Margini", annual: "249 €/mese", monthly: "299 €/mese", tagline: "Redditività per referenza", features: ["Margine reale", "Stock fermo", "Pricing e simulazioni"] },
      { name: "Intelligence", annual: "349 €/mese", monthly: "425 €/mese", tagline: "Decisioni assistite da IA", features: ["RIMs™", "SAVia", "Alert e anteprime"], badge: "Include RIMs™", highlight: true },
      { name: "Full / Managed", annual: "da 599 €/mese", monthly: "da 799 €/mese", tagline: "Suite e supporto", features: ["Multi-locale", "Integrazioni avanzate", "Reporting e monitoraggio"] },
    ], footnote: "Prezzi per struttura. Ambito finale di integrazioni, avvio e servizio Managed confermato nella proposta.", cta: "Vedi il dettaglio dei moduli",
  },
  rollout: {
    eyebrow: "Implementazione", title: "Dalla carta attuale a un'operatività connessa", body: "Il lancio si adatta al punto di partenza, al numero di referenze, ai sistemi esistenti e ai locali.",
    steps: [
      { title: "1. Raccogliamo", body: "Carta, stock, listini, documenti e fonti di vendita disponibili." },
      { title: "2. Normalizziamo", body: "Referenze, formati, prezzi, posizioni e connessioni." },
      { title: "3. Attiviamo", body: "Moduli, permessi, carta e flussi di dati concordati." },
      { title: "4. Misuriamo", body: "Uso, qualità dei dati, rotazione, margine e nuove opportunità." },
    ],
  },
  proof: { eyebrow: "Clienti", title: "Creato per operazioni vino esigenti", subtitle: "Ristoranti, hotel, wine bar e gruppi trasformano la carta in uno strumento commerciale e operativo con Winerim.", quote: "Quello che prima richiedeva 10 o 15 minuti di spiegazione, con Winerim offre in 3 minuti una visione globale dei vini.", author: "Nacho Otamendi · Proprietario e sommelier · Travieso Bar" },
  closing: { eyebrow: "Prossimo passo", title: "Scopriamo quale parte della tua operazione vino deve migliorare per prima", body: "In una demo di 15 minuti esaminiamo carta, processi e moduli davvero adatti.", primaryCta: "Richiedi una demo", secondaryCta: "Condividi la presentazione", email: "info@winerim.com", phone: "+34 614 499 864" },
};

const de: PresentationContent = {
  metaTitle: "Winerim Präsentation · Das Betriebssystem für Wein",
  metaDescription: "Erfahren Sie, wie Winerim Weinkarte, Kasse, Bestand, Einkauf, Margen, CloudRIM, SAVia, RIMs, Wine Cellar und Wine Lockers verbindet.",
  shareLabel: "Teilen", shareCopied: "Link kopiert", fullscreenLabel: "Vollbild", downloadLabel: "PDF herunterladen", ctaTalk: "Sprechen wir", scrollDown: "Scrollen", preparedFor: (group) => `Vorbereitet für ${group}`,
  cover: { eyebrow: "Offizielle Präsentation", title: "Das Betriebssystem für Wein in der Gastronomie", subtitle: "Winerim verbindet Weinkarte, Keller, Verkauf, Einkauf und Margen, damit Teams besser verkaufen und die Leitung mit Live-Daten entscheidet." },
  challenge: {
    eyebrow: "Die Herausforderung", title: "Wein beeinflusst Marge, Bestand und Erlebnis. Doch seine Daten bleiben getrennt.", subtitle: "Wenn Karte, Kasse, Lieferscheine, Inventur und Teams getrennt arbeiten, entstehen Fehler, ruhende Flaschen und späte Entscheidungen.",
    items: [
      { title: "Veraltete Karte", body: "Gäste sehen Weine oder Preise, die den Keller nicht mehr abbilden." },
      { title: "Unsichtbarer Bestand", body: "Manuelle Zählungen, unklare Lagerorte und gebundenes Kapital." },
      { title: "Undurchsichtige Marge", body: "Kosten ändern sich, Preise nicht, und Verluste werden zu spät erkannt." },
      { title: "Daten ohne Entscheidung", body: "Verkäufe und Dokumente sind vorhanden, aber keine gemeinsame Handlungsgrundlage." },
    ],
  },
  platform: { eyebrow: "Was Winerim ist", title: "Eine Plattform für den gesamten Weinbetrieb", body: "Winerim hält die Karte aktuell, ordnet den physischen Keller, verbindet Verkauf und Einkauf, berechnet Rentabilität und macht jedes Signal zu einer nachvollziehbaren Entscheidung.", proof: "Vom eingehenden Dokument bis zur verkauften Flasche, mit dem Menschen stets in Kontrolle." },
  flow: {
    eyebrow: "Winerim Architektur", title: "Daten kommen einmal hinein. Das ganze System arbeitet damit.", subtitle: "Vier verbundene Ebenen machen aus verstreuten Informationen einen stimmigen Weinbetrieb.",
    steps: [
      { label: "01 · Erfassen", title: "CloudRIM", body: "Empfängt Karten, Lieferscheine, Rechnungen, Preislisten, Verkäufe und Bestände über vorhandene Kanäle.", capabilities: "Portal · E-Mail · Ordner · FTP/SFTP · API · Lieferant" },
      { label: "02 · Betreiben", title: "Core, Kasse und Management", body: "Normalisiert Referenzen und verbindet Karte, Verkauf, Inventar, Kosten und Dokumente.", capabilities: "Karte · Kasse · Einkauf · Bestand · Lieferanten" },
      { label: "03 · Verstehen", title: "Margen und RIMs™", body: "Erkennt Rotation, Margenverluste, ruhenden Bestand und Chancen pro Referenz.", capabilities: "Pricing · Rotation · Alerts · Simulation · Benchmark" },
      { label: "04 · Entscheiden", title: "SAVia", body: "Ermöglicht Fragen, Vergleiche und vorbereitete Aktionen mit echtem Betriebskontext.", capabilities: "Dialog · Erklärung · Vorschau · menschliche Freigabe" },
    ], footnote: "Wine Cellar, Wine Lockers und Winerim Supply erweitern das System vom Lagerort bis zum intelligenten Einkauf.",
  },
  cloudrim: {
    eyebrow: "CloudRIM", title: "Die operative Cloud, die Datensuche beendet", body: "CloudRIM sammelt Informationen dort, wo sie bereits liegen, und leitet sie in Winerim. Teams kopieren keine Dateien mehr, bauen Inventuren neu oder suchen die aktuelle Version.",
    items: [
      { title: "Mehrkanal-Eingang", body: "Portal, E-Mail, geteilter Ordner, FTP/SFTP, API oder Lieferantenanbindung." },
      { title: "Nutzbare Dokumente", body: "Karten, Lieferscheine, Rechnungen, Preislisten, Kassenberichte und Bestandsdateien." },
      { title: "Klassifizierung und Nachvollziehbarkeit", body: "Jede Datei wird erkannt, verarbeitet und ihrem Standort und Prozess zugeordnet." },
      { title: "Weniger Administration", body: "Informationen kommen vorbereitet für Einkauf, Kosten, Inventar und Analyse an." },
    ], caption: "CloudRIM Posteingang und Dokumentenupload.",
  },
  core: {
    eyebrow: "Winerim Core", title: "Eine lebendige Weinkarte für Gäste und Team", body: "Der Service nutzt dieselbe Datenquelle wie der Betrieb. Preise, Verfügbarkeit, Weinprofile, Filter und Pairings bleiben konsistent.",
    items: [
      { title: "Ohne Hürde wählen", body: "Filter nach Stil, Herkunft, Preis, Geschmack und Anlass." },
      { title: "Sicher verkaufen", body: "Verkostungsnotizen, Pairings, Vergleich und Argumente für den Service." },
      { title: "Einmal aktualisieren", body: "Preis-, Format- oder Verfügbarkeitsänderungen erreichen die ganze Karte." },
      { title: "Mehrsprachig bedienen", body: "Ein lokalisiertes Erlebnis für internationale Gäste." },
    ],
  },
  cellar: {
    eyebrow: "Verbundener Keller", title: "Jede Flasche an ihrem Platz und im richtigen Kontext", subtitle: "Winerim weiß nicht nur, welcher Wein vorhanden ist, sondern auch wo er liegt und wem er gehört.",
    items: [
      { title: "Wine Cellar", body: "Kartiert Räume, Schränke, Regale und Positionen, damit Flaschen ohne Gedächtnisarbeit gefunden werden." },
      { title: "Wine Lockers", body: "Verwaltet Gästeflaschen, Verwahrung, Bewegungen und Verbrauch mit individueller Nachvollziehbarkeit." },
      { title: "Operativer Bestand", body: "Verbindet Lagerort, Verfügbarkeit, Zu- und Abgänge sowie Korrekturen mit Karte und Management." },
    ], mapCaption: "Wine Cellar: reale Kellerkarte.", lockersCaption: "Wine Lockers: Gästeflaschen unter Kontrolle.",
  },
  performance: {
    eyebrow: "Kontrolle und Rentabilität", title: "Nicht nur wissen, was geschah, sondern was jetzt sinnvoll ist", subtitle: "Verkauf, Kosten und Bestand werden gemeinsam gelesen, bevor Marge oder Rotation leiden.",
    items: [
      { title: "Verbundene Kasse", body: "Ordnet Referenzen zu und macht aus Bons Rotation, Umsatz und Durchschnittsbon pro Wein." },
      { title: "Echte Margen", body: "Verbindet Kosten, Verkaufspreis, Formate und Absatz, erkennt Verluste und simuliert Änderungen." },
      { title: "Winerim Supply", body: "Vergleicht Preislisten, schützt die Marge und bereitet Bestellungen nach Verkauf, Bestand und Ziel vor." },
      { title: "Decision Center", body: "Ordnet Prioritäten und Playbooks für Karte, Einkauf, Offenausschank, Bestand und Multi-Standort." },
    ], footnote: "Weniger Excel, weniger Zählungen und eine gemeinsame Sicht für Sommellerie, F&B, Einkauf und Leitung.",
  },
  intelligence: {
    eyebrow: "Dynamische Intelligenz", title: "RIMs™ erkennt. SAVia erklärt. Das Team entscheidet.", subtitle: "Winerim Intelligenz arbeitet mit echten Betriebsdaten, nicht mit allgemeinen Empfehlungen.",
    rims: { title: "RIMs™", body: "Spezialisierte Engines erkennen Signale aus Karte, Rotation, Marge, Bestand, Einkauf und Offenausschank und bereiten messbare Vorschläge vor." },
    savia: { title: "SAVia", body: "Ein Dialog-Agent für Fragen zu Verkauf, Bestand, Kosten, Margen, Lieferscheinen und Chancen, ohne Dashboard-Suche." },
    approval: "SAVia fragt ab, fasst zusammen und bereitet vor. Kritische Änderungen an Preis, Bestand, Dokumenten oder Karte brauchen menschliche Freigabe.", caption: "SAVia antwortet mit dem Betriebskontext von Winerim.",
  },
  groups: {
    eyebrow: "Hotels und Gruppen", title: "Zentrale Kontrolle, ohne die Identität jedes Standorts zu verlieren", subtitle: "Eine gemeinsame Ebene für Vergleich, Steuerung und Rollout, mit lokaler Freiheit dort, wo sie zählt.",
    items: [
      { title: "Multi-Standort", body: "Karte, Inventar, Verkauf und Margen konsolidiert und pro Standort lesbar." },
      { title: "Benchmarking", body: "Rotation, Bon, Marge und Sortiment vergleichen und gute Praxis übertragen." },
      { title: "Standards und Rechte", body: "Festlegen, was die Gruppe steuert und was lokale Teams anpassen dürfen." },
      { title: "Executive Reporting", body: "Vergleichbare KPIs und regelmäßiges Monitoring für Leitung und Betrieb." },
    ],
  },
  pricing: {
    eyebrow: "Module und Preise", title: "Starten Sie mit dem Nötigen. Verbinden Sie mehr, wenn es Wert schafft.", subtitle: "Sechs Module reichen von der digitalen Karte bis zum vollständig begleiteten Betrieb.", annualLabel: "Jährliche Zahlung", monthlyLabel: "Monatliche Zahlung",
    plans: [
      { name: "Core", annual: "99 €/Monat", monthly: "150 €/Monat", tagline: "Karte und Betriebsbasis", features: ["Digitale Weinkarte", "Profile, Filter und Pairings", "Wine Cellar und Wine Lockers"], badge: "Startpunkt" },
      { name: "Kasse", annual: "75 €/Monat", monthly: "99 €/Monat", tagline: "Echte Verkäufe verbunden", features: ["Referenz-Zuordnung", "Verkaufs-Synchronisierung", "Rotation und Durchschnittsbon"] },
      { name: "Management", annual: "179 €/Monat", monthly: "220 €/Monat", tagline: "Bestand, Einkauf und Dokumente", features: ["CloudRIM", "Inventar und Kosten", "Lieferanten und Nachbestellung"] },
      { name: "Margen", annual: "249 €/Monat", monthly: "299 €/Monat", tagline: "Rentabilität pro Referenz", features: ["Echte Marge", "Ruhender Bestand", "Pricing und Simulationen"] },
      { name: "Intelligence", annual: "349 €/Monat", monthly: "425 €/Monat", tagline: "KI-gestützte Entscheidungen", features: ["RIMs™", "SAVia", "Alerts und Vorschauen"], badge: "RIMs™ enthalten", highlight: true },
      { name: "Full / Managed", annual: "ab 599 €/Monat", monthly: "ab 799 €/Monat", tagline: "Suite und Begleitung", features: ["Multi-Standort", "Erweiterte Integrationen", "Reporting und Monitoring"] },
    ], footnote: "Preise pro Standort. Der endgültige Umfang von Integrationen, Einführung und Managed Service wird im Angebot bestätigt.", cta: "Moduldetails ansehen",
  },
  rollout: {
    eyebrow: "Einführung", title: "Von der heutigen Karte zum verbundenen Betrieb", body: "Die Einführung richtet sich nach Ausgangslage, Referenzzahl, vorhandenen Systemen und Standorten.",
    steps: [
      { title: "1. Wir erfassen", body: "Karte, Bestand, Preislisten, Dokumente und verfügbare Verkaufsquellen." },
      { title: "2. Wir normalisieren", body: "Referenzen, Formate, Preise, Lagerorte und Verbindungen." },
      { title: "3. Wir aktivieren", body: "Vereinbarte Module, Rechte, Karte und Datenflüsse." },
      { title: "4. Wir messen", body: "Nutzung, Datenqualität, Rotation, Marge und nächste Chancen." },
    ],
  },
  proof: { eyebrow: "Kunden", title: "Für anspruchsvolle Weinbetriebe entwickelt", subtitle: "Restaurants, Hotels, Weinbars und Gruppen machen mit Winerim aus der Karte ein Verkaufs- und Betriebswerkzeug.", quote: "Was früher 10 oder 15 Minuten Erklärung brauchte, gibt Gästen mit Winerim in 3 Minuten einen Gesamtüberblick über die Weine.", author: "Nacho Otamendi · Inhaber und Sommelier · Travieso Bar" },
  closing: { eyebrow: "Nächster Schritt", title: "Finden wir heraus, welcher Teil Ihres Weinbetriebs zuerst besser werden sollte", body: "In einer 15-minütigen Demo prüfen wir Karte, Prozesse und die wirklich passenden Module.", primaryCta: "Demo anfragen", secondaryCta: "Präsentation teilen", email: "info@winerim.com", phone: "+34 614 499 864" },
};

const pt: PresentationContent = {
  metaTitle: "Apresentação Winerim · O sistema operativo do vinho",
  metaDescription: "Descubra como a Winerim liga carta, POS, stock, compras, margens, CloudRIM, SAVia, RIMs, Wine Cellar e Wine Lockers.",
  shareLabel: "Partilhar", shareCopied: "Ligação copiada", fullscreenLabel: "Ecrã inteiro", downloadLabel: "Descarregar PDF", ctaTalk: "Falemos", scrollDown: "Deslocar", preparedFor: (group) => `Preparado para ${group}`,
  cover: { eyebrow: "Apresentação oficial", title: "O sistema operativo do vinho para restauração", subtitle: "A Winerim liga carta, garrafeira, vendas, compras e margens para vender melhor e decidir com dados vivos." },
  challenge: {
    eyebrow: "O desafio", title: "O vinho move margem, stock e experiência. Mas os seus dados continuam separados.", subtitle: "Quando carta, POS, guias, inventário e equipas trabalham em separado, surgem erros, garrafas paradas e decisões tardias.",
    items: [
      { title: "Carta desatualizada", body: "O cliente vê referências ou preços que já não refletem a garrafeira." },
      { title: "Stock invisível", body: "Contagens manuais, localizações imprecisas e capital imobilizado." },
      { title: "Margem opaca", body: "O custo muda, o preço não e a fuga é descoberta demasiado tarde." },
      { title: "Dados sem decisão", body: "Existem vendas e documentos, mas falta uma leitura comum e acionável." },
    ],
  },
  platform: { eyebrow: "O que é a Winerim", title: "Uma plataforma para todo o ciclo operacional do vinho", body: "A Winerim mantém a carta viva, organiza a garrafeira física, liga vendas e compras, calcula rentabilidade e transforma cada sinal numa decisão rastreável.", proof: "Do documento recebido à garrafa vendida, com a equipa humana sempre no controlo." },
  flow: {
    eyebrow: "Arquitetura Winerim", title: "Os dados entram uma vez. Todo o sistema trabalha com eles.", subtitle: "Quatro camadas ligadas transformam informação dispersa numa operação coerente.",
    steps: [
      { label: "01 · Recolher", title: "CloudRIM", body: "Recebe cartas, guias, faturas, tabelas, vendas e stock pelo canal disponível.", capabilities: "Portal · email · pasta · FTP/SFTP · API · fornecedor" },
      { label: "02 · Operar", title: "Core, POS e Gestão", body: "Normaliza referências e liga carta, vendas, inventário, custos e documentos.", capabilities: "Carta · POS · compras · stock · fornecedores" },
      { label: "03 · Entender", title: "Margens e RIMs™", body: "Deteta rotação, fugas de margem, stock parado e oportunidades por referência.", capabilities: "Pricing · rotação · alertas · simulação · benchmark" },
      { label: "04 · Decidir", title: "SAVia", body: "Permite perguntar, comparar e preparar ações com contexto operacional real.", capabilities: "Conversa · explicação · prévia · aprovação humana" },
    ], footnote: "Wine Cellar, Wine Lockers e Winerim Supply estendem o sistema da localização física à compra inteligente.",
  },
  cloudrim: {
    eyebrow: "CloudRIM", title: "A nuvem operacional que evita perseguir dados", body: "A CloudRIM recolhe a informação onde ela já existe e encaminha-a dentro da Winerim. A equipa deixa de copiar ficheiros, refazer inventários e procurar a última versão.",
    items: [
      { title: "Entrada multicanal", body: "Portal, email, pasta partilhada, FTP/SFTP, API ou ligação ao fornecedor." },
      { title: "Documentos úteis", body: "Cartas, guias, faturas, tabelas, relatórios POS e ficheiros de stock." },
      { title: "Classificação e rastreabilidade", body: "Cada ficheiro é identificado, processado e ligado ao respetivo local e fluxo." },
      { title: "Menos administração", body: "A informação chega preparada para compras, custos, inventário e análise." },
    ], caption: "Caixa de entrada e carregamento documental CloudRIM.",
  },
  core: {
    eyebrow: "Winerim Core", title: "Uma carta viva para o cliente e para a equipa", body: "A sala usa a mesma fonte de verdade da operação. Preços, disponibilidade, fichas, filtros e harmonizações mantêm-se alinhados.",
    items: [
      { title: "Escolher sem bloqueios", body: "Filtros por estilo, origem, preço, gosto e ocasião." },
      { title: "Vender com critério", body: "Notas de prova, harmonizações, comparador e argumentos para a sala." },
      { title: "Atualizar uma vez", body: "Uma mudança de preço, formato ou disponibilidade chega a toda a carta." },
      { title: "Atender em vários idiomas", body: "Uma experiência localizada para a clientela internacional." },
    ],
  },
  cellar: {
    eyebrow: "Garrafeira ligada", title: "Cada garrafa no seu lugar e com o seu contexto", subtitle: "A Winerim não sabe apenas que vinho existe. Pode também saber onde está e a quem pertence.",
    items: [
      { title: "Wine Cellar", body: "Mapeia zonas, armários, prateleiras e posições para localizar garrafas sem depender da memória." },
      { title: "Wine Lockers", body: "Gere garrafas de clientes, custódia, movimentos e consumos com rastreabilidade individual." },
      { title: "Stock operacional", body: "Liga localização, disponibilidade, entradas, saídas e ajustes à carta e à gestão." },
    ], mapCaption: "Wine Cellar: mapa real da garrafeira.", lockersCaption: "Wine Lockers: garrafas de clientes sob controlo.",
  },
  performance: {
    eyebrow: "Controlo e rentabilidade", title: "De saber o que aconteceu a saber o que convém fazer", subtitle: "Vendas, custos e stock são lidos em conjunto para agir antes de a margem ou a rotação piorarem.",
    items: [
      { title: "POS ligado", body: "Mapeia referências e transforma talões em rotação, receita e ticket médio por vinho." },
      { title: "Margens reais", body: "Cruza custo, preço, formatos e vendas para detetar fugas e simular mudanças." },
      { title: "Winerim Supply", body: "Compara tabelas, protege a margem e prepara pedidos segundo vendas, stock e objetivo." },
      { title: "Decision Center", body: "Ordena prioridades e playbooks para carta, compras, vinho a copo, stock e multi-local." },
    ], footnote: "Menos Excel, menos contagens e uma leitura comum para sommelier, F&B, compras e direção.",
  },
  intelligence: {
    eyebrow: "Inteligência Dinâmica", title: "RIMs™ deteta. SAVia explica. A equipa decide.", subtitle: "A inteligência da Winerim trabalha sobre dados reais do restaurante, não sobre recomendações genéricas.",
    rims: { title: "RIMs™", body: "Motores especializados detetam sinais de carta, rotação, margem, stock, compras e vinho a copo, preparando propostas mensuráveis." },
    savia: { title: "SAVia", body: "Agente conversacional para perguntar por vendas, stock, custos, margens, guias e oportunidades sem se perder em dashboards." },
    approval: "SAVia consulta, resume e prepara. Mudanças críticas de preço, stock, documentos ou carta exigem aprovação humana.", caption: "SAVia responde com o contexto operacional da Winerim.",
  },
  groups: {
    eyebrow: "Hotéis e grupos", title: "Controlo central sem apagar a identidade de cada local", subtitle: "Uma camada comum para comparar, governar e implementar, com autonomia local onde importa.",
    items: [
      { title: "Multi-local", body: "Carta, inventário, vendas e margens consolidados com leitura por estabelecimento." },
      { title: "Benchmarking", body: "Compara rotação, ticket, margem e sortido para expandir boas práticas." },
      { title: "Normas e permissões", body: "Define o que o grupo governa e o que cada equipa local pode adaptar." },
      { title: "Reporting executivo", body: "KPIs comparáveis e acompanhamento periódico para direção e operações." },
    ],
  },
  pricing: {
    eyebrow: "Módulos e preços", title: "Comece pelo que precisa. Ligue o resto quando acrescentar valor.", subtitle: "Seis módulos cobrem desde a carta digital até à operação totalmente acompanhada.", annualLabel: "Pagamento anual", monthlyLabel: "Pagamento mensal",
    plans: [
      { name: "Core", annual: "99 €/mês", monthly: "150 €/mês", tagline: "Carta e base operacional", features: ["Carta digital", "Fichas, filtros e harmonizações", "Wine Cellar e Wine Lockers"], badge: "Ponto de partida" },
      { name: "POS", annual: "75 €/mês", monthly: "99 €/mês", tagline: "Vendas reais ligadas", features: ["Mapeamento de referências", "Sincronização de vendas", "Rotação e ticket médio"] },
      { name: "Gestão", annual: "179 €/mês", monthly: "220 €/mês", tagline: "Stock, compras e documentos", features: ["CloudRIM", "Inventário e custos", "Fornecedores e reposição"] },
      { name: "Margens", annual: "249 €/mês", monthly: "299 €/mês", tagline: "Rentabilidade por referência", features: ["Margem real", "Stock parado", "Pricing e simulações"] },
      { name: "Intelligence", annual: "349 €/mês", monthly: "425 €/mês", tagline: "Decisão assistida por IA", features: ["RIMs™", "SAVia", "Alertas e prévias"], badge: "Inclui RIMs™", highlight: true },
      { name: "Full / Managed", annual: "desde 599 €/mês", monthly: "desde 799 €/mês", tagline: "Suite e acompanhamento", features: ["Multi-local", "Integrações avançadas", "Reporting e seguimento"] },
    ], footnote: "Preços por estabelecimento. O âmbito final de integrações, implementação e serviço Managed é confirmado na proposta.", cta: "Ver detalhe dos módulos",
  },
  rollout: {
    eyebrow: "Implementação", title: "Da carta atual a uma operação ligada", body: "A implementação adapta-se ao ponto de partida, ao número de referências, aos sistemas existentes e aos locais.",
    steps: [
      { title: "1. Recolhemos", body: "Carta, stock, tabelas, documentos e fontes de venda disponíveis." },
      { title: "2. Normalizamos", body: "Referências, formatos, preços, localizações e ligações." },
      { title: "3. Ativamos", body: "Módulos, permissões, carta e fluxos de dados acordados." },
      { title: "4. Medimos", body: "Utilização, qualidade dos dados, rotação, margem e próximas oportunidades." },
    ],
  },
  proof: { eyebrow: "Clientes", title: "Criado para operações de vinho exigentes", subtitle: "Restaurantes, hotéis, wine bars e grupos transformam a carta numa ferramenta comercial e operacional com a Winerim.", quote: "O que antes exigia 10 ou 15 minutos para explicar a carta, agora com a Winerim dá em 3 minutos uma visão global dos vinhos.", author: "Nacho Otamendi · Proprietário e sommelier · Travieso Bar" },
  closing: { eyebrow: "Próximo passo", title: "Vamos ver que parte da sua operação de vinho deve melhorar primeiro", body: "Numa demo de 15 minutos analisamos a carta, os processos e os módulos que realmente se adequam.", primaryCta: "Solicitar demo", secondaryCta: "Partilhar apresentação", email: "info@winerim.com", phone: "+34 614 499 864" },
};

export const PRESENTATION_CONTENT: Record<SupportedLang, PresentationContent> = {
  es,
  en,
  fr,
  it,
  de,
  pt,
};

export const PRESENTATION_ROUTE: Record<SupportedLang, string> = {
  es: "/presentacion",
  en: "/en/presentation",
  fr: "/fr/presentation",
  it: "/it/presentazione",
  de: "/de/praesentation",
  pt: "/pt/apresentacao",
};
