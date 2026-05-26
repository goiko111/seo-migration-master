export type WineLibraryEditorialLang = "es" | "en" | "it" | "fr" | "de" | "pt";

type ListRoleKey =
  | "anchorRed"
  | "mediterraneanRed"
  | "seafoodWhite"
  | "entryWhite"
  | "premiumWhite"
  | "globalWhite"
  | "premiumGlobalRed"
  | "elegantRed"
  | "aromaticWhite"
  | "sommelierDiscovery";

type CueKey =
  | "regionFirst"
  | "oldVine"
  | "freshnessSalinity"
  | "easyFresh"
  | "textureMinerality"
  | "styleClarifier"
  | "structure"
  | "lightRed"
  | "aromaticFreshness"
  | "aciditySweetness";

type MarginKey =
  | "safeRotation"
  | "upsellByOrigin"
  | "byGlassVelocity"
  | "premiumStep"
  | "knownPremium"
  | "handSellDiscovery";

type AvoidKey =
  | "onlyCrianza"
  | "alcoholOverweight"
  | "warmService"
  | "genericHouseWhite"
  | "hiddenName"
  | "unspecifiedOak"
  | "tooYoung"
  | "overserveWarm"
  | "sameProfile"
  | "onlySweet";

type HookKey =
  | "roastedLamb"
  | "iberianPork"
  | "agedCheese"
  | "grilledMeat"
  | "roastedVegetables"
  | "riceDishes"
  | "shellfish"
  | "ceviche"
  | "sushi"
  | "tapas"
  | "salads"
  | "whiteFish"
  | "poultry"
  | "creamyFish"
  | "butterSauce"
  | "steak"
  | "duck"
  | "mushrooms"
  | "tuna"
  | "goatCheese"
  | "asianSpice"
  | "pork"
  | "blueCheese";

interface EditorialProfileSeed {
  slug: string;
  priority: number;
  serviceTemp: string;
  glass: string;
  decanting: string;
  listRole: ListRoleKey;
  cue: CueKey;
  margin: MarginKey;
  avoid: AvoidKey;
  menuHooks: HookKey[];
}

export interface LocalizedGrapeEditorialProfile {
  slug: string;
  priority: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  facts: { label: string; value: string }[];
  sections: { title: string; body: string }[];
  menuTitle: string;
  menuHooks: string[];
  faqs: { q: string; a: string }[];
}

export const priorityGrapeSlugs = [
  "tempranillo",
  "garnacha",
  "albarino",
  "verdejo",
  "godello",
  "chardonnay",
  "cabernet-sauvignon",
  "pinot-noir",
  "sauvignon-blanc",
  "riesling",
  "syrah",
  "merlot",
  "malbec",
  "nebbiolo",
  "sangiovese",
  "monastrell",
  "viura",
  "chenin-blanc",
  "xarello",
  "touriga-nacional",
  "mencia",
  "cabernet-franc",
  "gamay",
  "gewurztraminer",
  "viognier",
  "gruner-veltliner",
  "pinot-grigio",
  "barbera",
  "primitivo",
  "aglianico",
] as const;

const grapeEditorialProfiles: Record<string, EditorialProfileSeed> = {
  tempranillo: {
    slug: "tempranillo",
    priority: 1,
    serviceTemp: "16-18 C",
    glass: "Burdeos / universal amplia",
    decanting: "30-45 min en crianzas y reservas jovenes",
    listRole: "anchorRed",
    cue: "regionFirst",
    margin: "safeRotation",
    avoid: "onlyCrianza",
    menuHooks: ["roastedLamb", "iberianPork", "agedCheese"],
  },
  garnacha: {
    slug: "garnacha",
    priority: 2,
    serviceTemp: "15-17 C",
    glass: "Borgona / universal amplia",
    decanting: "15-30 min si tiene grado alto o reduccion",
    listRole: "mediterraneanRed",
    cue: "oldVine",
    margin: "upsellByOrigin",
    avoid: "alcoholOverweight",
    menuHooks: ["grilledMeat", "roastedVegetables", "riceDishes"],
  },
  albarino: {
    slug: "albarino",
    priority: 3,
    serviceTemp: "8-10 C",
    glass: "Blanco aromatico / universal",
    decanting: "No decantar; mantener frio estable",
    listRole: "seafoodWhite",
    cue: "freshnessSalinity",
    margin: "byGlassVelocity",
    avoid: "warmService",
    menuHooks: ["shellfish", "ceviche", "sushi"],
  },
  verdejo: {
    slug: "verdejo",
    priority: 4,
    serviceTemp: "7-9 C",
    glass: "Blanco joven / universal",
    decanting: "No decantar; servir en rotacion rapida",
    listRole: "entryWhite",
    cue: "easyFresh",
    margin: "byGlassVelocity",
    avoid: "genericHouseWhite",
    menuHooks: ["tapas", "salads", "whiteFish"],
  },
  godello: {
    slug: "godello",
    priority: 5,
    serviceTemp: "9-11 C",
    glass: "Blanco con volumen / universal amplia",
    decanting: "10-15 min si hay lias, barrica o reduccion",
    listRole: "premiumWhite",
    cue: "textureMinerality",
    margin: "premiumStep",
    avoid: "hiddenName",
    menuHooks: ["poultry", "creamyFish", "riceDishes"],
  },
  chardonnay: {
    slug: "chardonnay",
    priority: 6,
    serviceTemp: "9-12 C",
    glass: "Borgona blanco / universal amplia",
    decanting: "10-20 min si tiene crianza o reduccion",
    listRole: "globalWhite",
    cue: "styleClarifier",
    margin: "knownPremium",
    avoid: "unspecifiedOak",
    menuHooks: ["poultry", "butterSauce", "creamyFish"],
  },
  "cabernet-sauvignon": {
    slug: "cabernet-sauvignon",
    priority: 7,
    serviceTemp: "16-18 C",
    glass: "Burdeos amplia",
    decanting: "45-60 min en vinos jovenes estructurados",
    listRole: "premiumGlobalRed",
    cue: "structure",
    margin: "knownPremium",
    avoid: "tooYoung",
    menuHooks: ["steak", "grilledMeat", "agedCheese"],
  },
  "pinot-noir": {
    slug: "pinot-noir",
    priority: 8,
    serviceTemp: "13-15 C",
    glass: "Borgona amplia",
    decanting: "Aireacion suave; evitar exceso de oxigeno",
    listRole: "elegantRed",
    cue: "lightRed",
    margin: "premiumStep",
    avoid: "overserveWarm",
    menuHooks: ["duck", "mushrooms", "tuna"],
  },
  "sauvignon-blanc": {
    slug: "sauvignon-blanc",
    priority: 9,
    serviceTemp: "7-9 C",
    glass: "Blanco aromatico",
    decanting: "No decantar; proteger aromas",
    listRole: "aromaticWhite",
    cue: "aromaticFreshness",
    margin: "byGlassVelocity",
    avoid: "sameProfile",
    menuHooks: ["goatCheese", "salads", "ceviche"],
  },
  riesling: {
    slug: "riesling",
    priority: 10,
    serviceTemp: "7-10 C",
    glass: "Blanco aromatico / universal",
    decanting: "No decantar salvo grandes vinos con edad",
    listRole: "sommelierDiscovery",
    cue: "aciditySweetness",
    margin: "handSellDiscovery",
    avoid: "onlySweet",
    menuHooks: ["asianSpice", "pork", "blueCheese"],
  },
  syrah: {
    slug: "syrah",
    priority: 11,
    serviceTemp: "16-18 C",
    glass: "Syrah / Burdeos amplia",
    decanting: "30-60 min en vinos jovenes o de clima calido",
    listRole: "premiumGlobalRed",
    cue: "structure",
    margin: "knownPremium",
    avoid: "alcoholOverweight",
    menuHooks: ["steak", "grilledMeat", "asianSpice"],
  },
  merlot: {
    slug: "merlot",
    priority: 12,
    serviceTemp: "15-17 C",
    glass: "Burdeos / universal amplia",
    decanting: "20-40 min si es joven o viene de zona calida",
    listRole: "elegantRed",
    cue: "lightRed",
    margin: "knownPremium",
    avoid: "tooYoung",
    menuHooks: ["duck", "mushrooms", "grilledMeat"],
  },
  malbec: {
    slug: "malbec",
    priority: 13,
    serviceTemp: "16-18 C",
    glass: "Burdeos amplia",
    decanting: "30-45 min si hay concentracion o crianza",
    listRole: "premiumGlobalRed",
    cue: "structure",
    margin: "knownPremium",
    avoid: "tooYoung",
    menuHooks: ["steak", "grilledMeat", "agedCheese"],
  },
  nebbiolo: {
    slug: "nebbiolo",
    priority: 14,
    serviceTemp: "16-18 C",
    glass: "Borgona amplia / Nebbiolo",
    decanting: "45-90 min en Barolo, Barbaresco o vinos jovenes",
    listRole: "elegantRed",
    cue: "structure",
    margin: "handSellDiscovery",
    avoid: "tooYoung",
    menuHooks: ["duck", "mushrooms", "agedCheese"],
  },
  sangiovese: {
    slug: "sangiovese",
    priority: 15,
    serviceTemp: "15-17 C",
    glass: "Chianti / universal amplia",
    decanting: "20-40 min si hay crianza o tanino marcado",
    listRole: "mediterraneanRed",
    cue: "regionFirst",
    margin: "upsellByOrigin",
    avoid: "overserveWarm",
    menuHooks: ["pork", "roastedVegetables", "agedCheese"],
  },
  monastrell: {
    slug: "monastrell",
    priority: 16,
    serviceTemp: "16-18 C",
    glass: "Burdeos amplia",
    decanting: "30-60 min en vinos jovenes estructurados",
    listRole: "mediterraneanRed",
    cue: "oldVine",
    margin: "upsellByOrigin",
    avoid: "alcoholOverweight",
    menuHooks: ["grilledMeat", "roastedLamb", "agedCheese"],
  },
  viura: {
    slug: "viura",
    priority: 17,
    serviceTemp: "8-11 C",
    glass: "Blanco universal",
    decanting: "10-15 min si es Rioja blanco con crianza",
    listRole: "premiumWhite",
    cue: "textureMinerality",
    margin: "premiumStep",
    avoid: "genericHouseWhite",
    menuHooks: ["tapas", "whiteFish", "poultry"],
  },
  "chenin-blanc": {
    slug: "chenin-blanc",
    priority: 18,
    serviceTemp: "7-11 C",
    glass: "Blanco aromatico / universal",
    decanting: "No decantar salvo vinos secos con edad o reduccion",
    listRole: "sommelierDiscovery",
    cue: "aciditySweetness",
    margin: "handSellDiscovery",
    avoid: "onlySweet",
    menuHooks: ["asianSpice", "pork", "blueCheese"],
  },
  xarello: {
    slug: "xarello",
    priority: 19,
    serviceTemp: "8-11 C",
    glass: "Blanco con volumen / espumoso si aplica",
    decanting: "10-15 min en blancos tranquilos con lias",
    listRole: "premiumWhite",
    cue: "textureMinerality",
    margin: "premiumStep",
    avoid: "hiddenName",
    menuHooks: ["riceDishes", "shellfish", "poultry"],
  },
  "touriga-nacional": {
    slug: "touriga-nacional",
    priority: 20,
    serviceTemp: "16-18 C",
    glass: "Burdeos amplia",
    decanting: "45-60 min en tintos jovenes concentrados",
    listRole: "premiumGlobalRed",
    cue: "structure",
    margin: "handSellDiscovery",
    avoid: "tooYoung",
    menuHooks: ["steak", "roastedLamb", "agedCheese"],
  },
  mencia: {
    slug: "mencia",
    priority: 21,
    serviceTemp: "14-16 C",
    glass: "Borgona / universal amplia",
    decanting: "15-25 min si hay reduccion o crianza",
    listRole: "elegantRed",
    cue: "lightRed",
    margin: "handSellDiscovery",
    avoid: "overserveWarm",
    menuHooks: ["pork", "mushrooms", "grilledMeat"],
  },
  "cabernet-franc": {
    slug: "cabernet-franc",
    priority: 22,
    serviceTemp: "15-17 C",
    glass: "Burdeos / universal amplia",
    decanting: "20-40 min en vinos jovenes o con tanino vegetal",
    listRole: "elegantRed",
    cue: "structure",
    margin: "premiumStep",
    avoid: "tooYoung",
    menuHooks: ["duck", "mushrooms", "steak"],
  },
  gamay: {
    slug: "gamay",
    priority: 23,
    serviceTemp: "12-14 C",
    glass: "Borgona / universal",
    decanting: "No decantar; refrescar ligeramente",
    listRole: "elegantRed",
    cue: "lightRed",
    margin: "byGlassVelocity",
    avoid: "overserveWarm",
    menuHooks: ["pork", "roastedVegetables", "tuna"],
  },
  gewurztraminer: {
    slug: "gewurztraminer",
    priority: 24,
    serviceTemp: "7-9 C",
    glass: "Blanco aromatico",
    decanting: "No decantar; proteger aromas y servir frio estable",
    listRole: "aromaticWhite",
    cue: "aromaticFreshness",
    margin: "handSellDiscovery",
    avoid: "onlySweet",
    menuHooks: ["asianSpice", "blueCheese", "pork"],
  },
  viognier: {
    slug: "viognier",
    priority: 25,
    serviceTemp: "9-11 C",
    glass: "Blanco con volumen / universal amplia",
    decanting: "10 min si tiene crianza o reduccion",
    listRole: "globalWhite",
    cue: "styleClarifier",
    margin: "premiumStep",
    avoid: "warmService",
    menuHooks: ["poultry", "butterSauce", "asianSpice"],
  },
  "gruner-veltliner": {
    slug: "gruner-veltliner",
    priority: 26,
    serviceTemp: "7-9 C",
    glass: "Blanco aromatico / universal",
    decanting: "No decantar; mantener frescura y tension",
    listRole: "sommelierDiscovery",
    cue: "freshnessSalinity",
    margin: "byGlassVelocity",
    avoid: "genericHouseWhite",
    menuHooks: ["salads", "whiteFish", "pork"],
  },
  "pinot-grigio": {
    slug: "pinot-grigio",
    priority: 27,
    serviceTemp: "7-9 C",
    glass: "Blanco joven / universal",
    decanting: "No decantar; rotacion rapida",
    listRole: "entryWhite",
    cue: "easyFresh",
    margin: "byGlassVelocity",
    avoid: "genericHouseWhite",
    menuHooks: ["tapas", "salads", "shellfish"],
  },
  barbera: {
    slug: "barbera",
    priority: 28,
    serviceTemp: "14-16 C",
    glass: "Universal / Borgona",
    decanting: "15-25 min si tiene barrica o fruta reducida",
    listRole: "mediterraneanRed",
    cue: "structure",
    margin: "handSellDiscovery",
    avoid: "warmService",
    menuHooks: ["pork", "mushrooms", "roastedVegetables"],
  },
  primitivo: {
    slug: "primitivo",
    priority: 29,
    serviceTemp: "15-17 C",
    glass: "Burdeos / universal amplia",
    decanting: "20-40 min si tiene grado alto",
    listRole: "mediterraneanRed",
    cue: "oldVine",
    margin: "upsellByOrigin",
    avoid: "alcoholOverweight",
    menuHooks: ["grilledMeat", "pork", "agedCheese"],
  },
  aglianico: {
    slug: "aglianico",
    priority: 30,
    serviceTemp: "16-18 C",
    glass: "Burdeos amplia",
    decanting: "45-60 min en vinos jovenes estructurados",
    listRole: "premiumGlobalRed",
    cue: "structure",
    margin: "premiumStep",
    avoid: "tooYoung",
    menuHooks: ["steak", "roastedLamb", "agedCheese"],
  },
};

const langFallback = (lang: string): WineLibraryEditorialLang =>
  ["es", "en", "it", "fr", "de", "pt"].includes(lang) ? (lang as WineLibraryEditorialLang) : "en";

const editorialCopy = {
  es: {
    title: (name: string) => `Inteligencia de servicio para ${name}`,
    subtitle: "Uso practico en carta, sala, copa y maridaje.",
    labels: {
      serviceTemp: "Servicio",
      glass: "Copa",
      decanting: "Aireacion",
      role: "Rol en carta",
      staffCue: "Guion de sala",
      margin: "Palanca comercial",
      avoid: "Error a evitar",
      menu: "Maridajes de menu",
      serviceIntelligence: "Inteligencia de servicio",
    },
    roles: {
      anchorRed: (name: string) => `${name} funciona como tinto de confianza: reduce friccion de eleccion, sostiene la rotacion y permite ordenar la carta por regiones reconocibles.`,
      mediterraneanRed: (name: string) => `${name} aporta perfil mediterraneo, fruta y origen. Es ideal para diferenciar tintos sin alejarse demasiado de lo que el cliente entiende.`,
      seafoodWhite: (name: string) => `${name} debe actuar como blanco de mar y frescura: facil de recomendar, muy util por copa y con lectura inmediata en mesas de pescado.`,
      entryWhite: (name: string) => `${name} es un blanco de entrada con alta rotacion. Conviene darle contexto para que no quede reducido a "el blanco de la casa".`,
      premiumWhite: (name: string) => `${name} permite subir ticket en blancos: textura, mineralidad y gastronomia lo colocan por encima del blanco facil.`,
      globalWhite: (name: string) => `${name} es una referencia global, pero necesita indicar estilo: con barrica, sin barrica, fresco, cremoso o mineral.`,
      premiumGlobalRed: (name: string) => `${name} aporta lectura premium internacional. Funciona como ancla para carnes y como comparador frente a tintos locales de gama alta.`,
      elegantRed: (name: string) => `${name} cubre el hueco de tinto fino y ligero. Es clave para clientes que no quieren potencia ni madera dominante.`,
      aromaticWhite: (name: string) => `${name} vende por aromaticidad y frescura. Es muy efectivo cuando la carta necesita blancos vivos, directos y faciles de explicar.`,
      sommelierDiscovery: (name: string) => `${name} es una herramienta de descubrimiento: fideliza al cliente curioso y abre maridajes donde otros blancos fallan.`,
    },
    cues: {
      regionFirst: (name: string) => `Presenta primero la zona y despues la uva: "Rioja o Ribera de Tempranillo". El cliente compra confianza antes que taxonomia.`,
      oldVine: (name: string) => `Si hay viña vieja, altura u origen concreto, dilo pronto. En ${name}, esos detalles justifican precio y diferenciacion.`,
      freshnessSalinity: (name: string) => `Vende frescura, salinidad y precision. El mensaje debe sonar a mar, no a blanco generico.`,
      easyFresh: (name: string) => `Usa un lenguaje sencillo: fresco, citrico, agil. Despues añade productor o zona para escapar del commodity.`,
      textureMinerality: (name: string) => `Explica textura y mineralidad antes que aromas. Es el puente para vender un blanco mas serio sin hacerlo dificil.`,
      styleClarifier: (name: string) => `Aclara el estilo en una frase: cremoso con barrica, mineral sin barrica o fresco de clima frio.`,
      structure: (name: string) => `Habla de estructura, tanino y comida. Es un vino que se vende mejor asociado a plato que como copa casual.`,
      lightRed: (name: string) => `Colocalo como tinto elegante, no como tinto flojo. Sirvelo algo fresco y habla de finura.`,
      aromaticFreshness: (name: string) => `Hazlo reconocible por aromas verdes, citricos y tension. Va muy bien cuando el cliente pide "algo fresco".`,
      aciditySweetness: (name: string) => `Aclara nivel de dulzor y acidez. Riesling se vende cuando desaparece la duda "sera dulce?".`,
    },
    margins: {
      safeRotation: (name: string) => `${name} da seguridad y rotacion. Usalo para sostener volumen y reservar margen alto para productores o crianzas diferenciadas.`,
      upsellByOrigin: (name: string) => `El upsell debe venir por origen, viña vieja o altitud, no solo por precio.`,
      byGlassVelocity: (name: string) => `Buen candidato a copa si la rotacion esta garantizada y la descripcion es clara.`,
      premiumStep: (name: string) => `Sirve como escalon premium: permite subir ticket sin exigir al cliente saltar a tintos caros.`,
      knownPremium: (name: string) => `La notoriedad ayuda a defender precio, pero solo si el estilo esta bien explicado.`,
      handSellDiscovery: (name: string) => `Necesita recomendacion activa; cuando el equipo lo domina, genera margen y recuerdo.`,
    },
    avoid: {
      onlyCrianza: "No limitar la oferta a crianzas y reservas; deja tambien una lectura joven, fresca o de productor.",
      alcoholOverweight: "No servir demasiado caliente: el alcohol gana peso y la fruta se vuelve pesada.",
      warmService: "No servir tibio; pierde precision y se parece a cualquier blanco aromatico.",
      genericHouseWhite: "No convertirlo en commodity. Nombre de productor, zona y estilo deben aparecer claros.",
      hiddenName: "No esconderlo entre blancos genericos: necesita explicacion breve para capturar valor.",
      unspecifiedOak: "No dejar al cliente adivinar si tiene barrica. Es la primera pregunta comercial.",
      tooYoung: "No recomendarlo sin comida si el tanino esta duro; puede parecer agresivo.",
      overserveWarm: "No servirlo a temperatura de tinto potente; pierde finura.",
      sameProfile: "No poner varios blancos aromaticos que digan lo mismo; diferenciarlos por origen o plato.",
      onlySweet: "No presentarlo como dulce por defecto; explicar seco, off-dry o dulce evita rechazo.",
    },
    hooks: {
      roastedLamb: "cordero asado",
      iberianPork: "ibericos y cerdo de calidad",
      agedCheese: "quesos curados",
      grilledMeat: "carnes a la brasa",
      roastedVegetables: "verduras asadas",
      riceDishes: "arroces y fondos sabrosos",
      shellfish: "marisco",
      ceviche: "ceviche y citricos",
      sushi: "sushi y crudos",
      tapas: "tapas y aperitivos",
      salads: "ensaladas y platos verdes",
      whiteFish: "pescado blanco",
      poultry: "aves",
      creamyFish: "pescados con salsa",
      butterSauce: "salsas de mantequilla",
      steak: "steak y carnes rojas",
      duck: "pato",
      mushrooms: "setas",
      tuna: "atun marcado",
      goatCheese: "queso de cabra",
      asianSpice: "picante asiatico",
      pork: "cerdo asado",
      blueCheese: "quesos azules",
    },
    faq: {
      service: (name: string, temp: string) => ({ q: `A que temperatura servir ${name}?`, a: `Como punto de partida, ${name} funciona bien a ${temp}. Ajusta segun cuerpo, crianza y contexto de sala.` }),
      list: (name: string) => ({ q: `Como vender ${name} mejor en carta?`, a: `Da una pista de estilo, plato y ocasion. La biblioteca debe ayudar al equipo a explicar ${name} en una frase, no solo listar datos tecnicos.` }),
    },
  },
  en: {
    title: (name: string) => `Service intelligence for ${name}`,
    subtitle: "Practical use across the list, floor team, by-the-glass and pairings.",
    labels: { serviceTemp: "Service", glass: "Glass", decanting: "Aeration", role: "Role on the list", staffCue: "Floor cue", margin: "Commercial lever", avoid: "Mistake to avoid", menu: "Menu pairings", serviceIntelligence: "Service intelligence" },
    roles: {
      anchorRed: (name: string) => `${name} works as a trust-building red: it reduces choice friction, supports rotation and lets the list be organized around recognizable regions.`,
      mediterraneanRed: (name: string) => `${name} brings Mediterranean fruit, warmth and origin. It differentiates reds without moving too far from what guests understand.`,
      seafoodWhite: (name: string) => `${name} should act as the seafood and freshness white: easy to recommend, useful by the glass and immediately clear at fish tables.`,
      entryWhite: (name: string) => `${name} is a high-rotation entry white. Give it context so it does not become just the house white.`,
      premiumWhite: (name: string) => `${name} raises the ceiling for white wines: texture, minerality and food relevance justify a premium step.`,
      globalWhite: (name: string) => `${name} is globally understood, but the list must state the style: oaked, unoaked, fresh, creamy or mineral.`,
      premiumGlobalRed: (name: string) => `${name} gives the list an international premium anchor for meat dishes and comparisons with local high-end reds.`,
      elegantRed: (name: string) => `${name} covers the elegant red slot for guests who do not want power, heat or dominant oak.`,
      aromaticWhite: (name: string) => `${name} sells through aroma and freshness. It is effective when guests ask for something crisp and direct.`,
      sommelierDiscovery: (name: string) => `${name} is a discovery tool: it rewards curious guests and unlocks pairings where many whites fail.`,
    },
    cues: {
      regionFirst: (name: string) => `Lead with the region, then the grape: "Rioja or Ribera based on Tempranillo". Guests buy confidence before taxonomy.`,
      oldVine: (name: string) => `If old vines, altitude or a precise origin matter, say it early. Those details justify price in ${name}.`,
      freshnessSalinity: (name: string) => `Sell freshness, salinity and precision. The message should feel coastal, not generic.`,
      easyFresh: (name: string) => `Use plain language: fresh, citrus-driven, agile. Then add producer or zone to avoid commodity perception.`,
      textureMinerality: (name: string) => `Explain texture and minerality before aromas. That is the bridge to a more serious white.`,
      styleClarifier: (name: string) => `Clarify the style in one line: creamy and oaked, mineral and unoaked, or cool-climate fresh.`,
      structure: (name: string) => `Talk about structure, tannin and food. It sells better with a dish than as a casual glass.`,
      lightRed: (name: string) => `Position it as elegant, not weak. Serve slightly cool and talk about finesse.`,
      aromaticFreshness: (name: string) => `Make it recognizable through green, citrus and high-tension aromas. It fits the "something fresh" request.`,
      aciditySweetness: (name: string) => `Clarify sweetness and acidity. Riesling sells when the "will it be sweet?" doubt disappears.`,
    },
    margins: {
      safeRotation: (name: string) => `${name} brings confidence and rotation. Use it for volume and reserve higher margin for distinctive producers or aged styles.`,
      upsellByOrigin: (name: string) => `Upsell through origin, old vines or altitude, not price alone.`,
      byGlassVelocity: (name: string) => `Strong by-the-glass candidate when rotation is guaranteed and the description is clear.`,
      premiumStep: (name: string) => `A premium step that lifts white-wine spend without forcing guests into expensive reds.`,
      knownPremium: (name: string) => `Recognition helps defend price, but only if the style is clearly explained.`,
      handSellDiscovery: (name: string) => `Needs active recommendation; once the team owns it, it creates margin and memory.`,
    },
    avoid: {
      onlyCrianza: "Do not limit the offer to crianza/reserva styles; include a younger, fresher or producer-led expression.",
      alcoholOverweight: "Do not serve too warm: alcohol becomes heavier and fruit feels jammy.",
      warmService: "Do not serve lukewarm; it loses precision and becomes just another aromatic white.",
      genericHouseWhite: "Do not turn it into a commodity. Producer, zone and style must be visible.",
      hiddenName: "Do not hide it among generic whites: a short explanation captures the value.",
      unspecifiedOak: "Do not leave guests guessing about oak. It is the first commercial question.",
      tooYoung: "Do not recommend a tannic young bottle without food; it may feel aggressive.",
      overserveWarm: "Do not serve it at powerful-red temperature; it loses finesse.",
      sameProfile: "Do not list several aromatic whites that say the same thing; separate them by origin or dish.",
      onlySweet: "Do not present it as sweet by default; dry, off-dry or sweet must be clear.",
    },
    hooks: {
      roastedLamb: "roasted lamb", iberianPork: "Iberian pork and charcuterie", agedCheese: "aged cheeses", grilledMeat: "grilled meats", roastedVegetables: "roasted vegetables", riceDishes: "rice dishes and savoury stocks", shellfish: "shellfish", ceviche: "ceviche and citrus", sushi: "sushi and raw fish", tapas: "tapas and aperitifs", salads: "salads and green dishes", whiteFish: "white fish", poultry: "poultry", creamyFish: "fish with creamy sauces", butterSauce: "butter sauces", steak: "steak and red meat", duck: "duck", mushrooms: "mushrooms", tuna: "seared tuna", goatCheese: "goat cheese", asianSpice: "Asian spice", pork: "roast pork", blueCheese: "blue cheeses",
    },
    faq: {
      service: (name: string, temp: string) => ({ q: `What temperature works for ${name}?`, a: `As a starting point, ${name} works well at ${temp}. Adjust by body, ageing and service context.` }),
      list: (name: string) => ({ q: `How should a restaurant sell ${name}?`, a: `Give one cue for style, dish and occasion. The library should help the team explain ${name} in one sentence, not just list technical facts.` }),
    },
  },
  it: {
    title: (name: string) => `Intelligenza di servizio per ${name}`,
    subtitle: "Uso pratico in carta, sala, calice e abbinamenti.",
    labels: { serviceTemp: "Servizio", glass: "Calice", decanting: "Aerazione", role: "Ruolo in carta", staffCue: "Indicazione di sala", margin: "Leva commerciale", avoid: "Errore da evitare", menu: "Abbinamenti menu", serviceIntelligence: "Intelligenza di servizio" },
    roles: {} as Record<ListRoleKey, (name: string) => string>,
    cues: {} as Record<CueKey, (name: string) => string>,
    margins: {} as Record<MarginKey, (name: string) => string>,
    avoid: {} as Record<AvoidKey, string>,
    hooks: {} as Record<HookKey, string>,
    faq: {
      service: (name: string, temp: string) => ({ q: `A che temperatura servire ${name}?`, a: `Come punto di partenza, ${name} funziona bene a ${temp}. Regola in base a corpo, affinamento e contesto di servizio.` }),
      list: (name: string) => ({ q: `Come vendere meglio ${name} in carta?`, a: `Dai un indizio di stile, piatto e occasione. La biblioteca deve aiutare la sala a spiegare ${name} in una frase.` }),
    },
  },
  fr: {
    title: (name: string) => `Intelligence de service pour ${name}`,
    subtitle: "Usage pratique en carte, en salle, au verre et en accords.",
    labels: { serviceTemp: "Service", glass: "Verre", decanting: "Aeration", role: "Role en carte", staffCue: "Argument de salle", margin: "Levier commercial", avoid: "Erreur a eviter", menu: "Accords menu", serviceIntelligence: "Intelligence de service" },
    roles: {} as Record<ListRoleKey, (name: string) => string>,
    cues: {} as Record<CueKey, (name: string) => string>,
    margins: {} as Record<MarginKey, (name: string) => string>,
    avoid: {} as Record<AvoidKey, string>,
    hooks: {} as Record<HookKey, string>,
    faq: {
      service: (name: string, temp: string) => ({ q: `A quelle temperature servir ${name} ?`, a: `Comme point de depart, ${name} fonctionne bien a ${temp}. Ajustez selon le corps, l'elevage et le contexte de service.` }),
      list: (name: string) => ({ q: `Comment mieux vendre ${name} en carte ?`, a: `Donnez un repere de style, de plat et d'occasion. La bibliotheque doit aider l'equipe a expliquer ${name} en une phrase.` }),
    },
  },
  de: {
    title: (name: string) => `Service-Intelligenz fur ${name}`,
    subtitle: "Praktischer Einsatz auf Karte, im Service, glasweise und im Pairing.",
    labels: { serviceTemp: "Service", glass: "Glas", decanting: "Beluftung", role: "Rolle auf der Karte", staffCue: "Service-Argument", margin: "Kommerzieller Hebel", avoid: "Fehler vermeiden", menu: "Menu-Pairings", serviceIntelligence: "Service-Intelligenz" },
    roles: {} as Record<ListRoleKey, (name: string) => string>,
    cues: {} as Record<CueKey, (name: string) => string>,
    margins: {} as Record<MarginKey, (name: string) => string>,
    avoid: {} as Record<AvoidKey, string>,
    hooks: {} as Record<HookKey, string>,
    faq: {
      service: (name: string, temp: string) => ({ q: `Bei welcher Temperatur ${name} servieren?`, a: `Als Ausgangspunkt funktioniert ${name} gut bei ${temp}. Je nach Korper, Ausbau und Servicekontext anpassen.` }),
      list: (name: string) => ({ q: `Wie verkauft man ${name} besser auf der Weinkarte?`, a: `Geben Sie einen Hinweis zu Stil, Gericht und Anlass. Die Bibliothek soll dem Team helfen, ${name} in einem Satz zu erklaren.` }),
    },
  },
  pt: {
    title: (name: string) => `Inteligencia de servico para ${name}`,
    subtitle: "Uso pratico na carta, sala, vinho a copo e harmonizacoes.",
    labels: { serviceTemp: "Servico", glass: "Copo", decanting: "Arejamento", role: "Papel na carta", staffCue: "Argumento de sala", margin: "Alavanca comercial", avoid: "Erro a evitar", menu: "Harmonizacoes de menu", serviceIntelligence: "Inteligencia de servico" },
    roles: {} as Record<ListRoleKey, (name: string) => string>,
    cues: {} as Record<CueKey, (name: string) => string>,
    margins: {} as Record<MarginKey, (name: string) => string>,
    avoid: {} as Record<AvoidKey, string>,
    hooks: {} as Record<HookKey, string>,
    faq: {
      service: (name: string, temp: string) => ({ q: `A que temperatura servir ${name}?`, a: `Como ponto de partida, ${name} funciona bem a ${temp}. Ajuste conforme corpo, estagio e contexto de sala.` }),
      list: (name: string) => ({ q: `Como vender melhor ${name} na carta?`, a: `De uma pista de estilo, prato e ocasiao. A biblioteca deve ajudar a equipa a explicar ${name} numa frase.` }),
    },
  },
};

editorialCopy.it.roles = {
  anchorRed: (name) => `${name} funziona come rosso di fiducia: riduce l'incertezza di scelta, sostiene la rotazione e permette di ordinare la carta per regioni riconoscibili.`,
  mediterraneanRed: (name) => `${name} porta frutto mediterraneo, calore e origine. Differenzia i rossi senza allontanarsi troppo da cio che l'ospite capisce.`,
  seafoodWhite: (name) => `${name} deve agire come bianco di mare e freschezza: facile da consigliare, utile al calice e immediato sui tavoli di pesce.`,
  entryWhite: (name) => `${name} e un bianco d'ingresso ad alta rotazione. Serve contesto per non ridurlo al semplice vino della casa.`,
  premiumWhite: (name) => `${name} alza il valore dei bianchi: texture, mineralita e gastronomia giustificano un passo premium.`,
  globalWhite: (name) => `${name} e una referenza globale, ma la carta deve chiarire lo stile: con legno, senza legno, fresco, cremoso o minerale.`,
  premiumGlobalRed: (name) => `${name} offre alla carta un'ancora premium internazionale per carni e confronti con rossi locali di fascia alta.`,
  elegantRed: (name) => `${name} copre lo spazio del rosso fine ed elegante per ospiti che non cercano potenza o legno dominante.`,
  aromaticWhite: (name) => `${name} si vende per aromaticita e freschezza. Funziona quando l'ospite chiede qualcosa di vivace e diretto.`,
  sommelierDiscovery: (name) => `${name} e uno strumento di scoperta: fidelizza l'ospite curioso e apre abbinamenti dove molti bianchi falliscono.`,
};
editorialCopy.it.cues = {
  regionFirst: (name) => `Parti dalla zona e poi dal vitigno: "Rioja o Ribera da Tempranillo". L'ospite compra fiducia prima della tassonomia.`,
  oldVine: (name) => `Se ci sono vigne vecchie, altitudine o origine precisa, dillo subito. In ${name}, questi dettagli giustificano prezzo e differenziazione.`,
  freshnessSalinity: (name) => `Vendi freschezza, salinita e precisione. Il messaggio deve evocare il mare, non un bianco generico.`,
  easyFresh: (name) => `Usa parole semplici: fresco, agrumato, agile. Poi aggiungi produttore o zona per uscire dalla percezione commodity.`,
  textureMinerality: (name) => `Spiega texture e mineralita prima degli aromi. E il ponte per vendere un bianco piu serio senza renderlo difficile.`,
  styleClarifier: (name) => `Chiarisci lo stile in una frase: cremoso con legno, minerale senza legno o fresco da clima freddo.`,
  structure: (name) => `Parla di struttura, tannino e cibo. Si vende meglio legato a un piatto che come calice casuale.`,
  lightRed: (name) => `Posizionalo come elegante, non debole. Servilo leggermente fresco e parla di finezza.`,
  aromaticFreshness: (name) => `Rendilo riconoscibile con aromi verdi, agrumi e tensione. Risponde bene alla richiesta di "qualcosa di fresco".`,
  aciditySweetness: (name) => `Chiarisci grado di dolcezza e acidita. Riesling si vende quando sparisce il dubbio "sara dolce?".`,
};
editorialCopy.it.margins = {
  safeRotation: (name) => `${name} porta sicurezza e rotazione. Usalo per volume e riserva margine alto a produttori o affinamenti distintivi.`,
  upsellByOrigin: (name) => `L'upsell deve arrivare da origine, vigne vecchie o altitudine, non solo dal prezzo.`,
  byGlassVelocity: (name) => `Ottimo candidato al calice se la rotazione e garantita e la descrizione e chiara.`,
  premiumStep: (name) => `Funziona come scalino premium: alza lo scontrino sui bianchi senza spingere subito verso rossi costosi.`,
  knownPremium: (name) => `La notorieta aiuta a difendere il prezzo, ma solo se lo stile e spiegato bene.`,
  handSellDiscovery: (name) => `Richiede raccomandazione attiva; quando il team lo padroneggia, genera margine e memoria.`,
};
editorialCopy.it.avoid = {
  onlyCrianza: "Non limitare l'offerta a crianza e reserva; inserisci anche una lettura giovane, fresca o di produttore.",
  alcoholOverweight: "Non servirlo troppo caldo: l'alcol pesa e il frutto diventa pesante.",
  warmService: "Non servirlo tiepido; perde precisione e assomiglia a qualsiasi bianco aromatico.",
  genericHouseWhite: "Non trasformarlo in commodity. Produttore, zona e stile devono essere chiari.",
  hiddenName: "Non nasconderlo tra bianchi generici: una breve spiegazione cattura valore.",
  unspecifiedOak: "Non lasciare che l'ospite indovini se c'e legno. E la prima domanda commerciale.",
  tooYoung: "Non consigliare bottiglie giovani e tanniche senza cibo; possono sembrare aggressive.",
  overserveWarm: "Non servirlo alla temperatura di un rosso potente; perde finezza.",
  sameProfile: "Non inserire piu bianchi aromatici con lo stesso messaggio; differenziali per origine o piatto.",
  onlySweet: "Non presentarlo come dolce di default; secco, abboccato o dolce deve essere chiaro.",
};
editorialCopy.it.hooks = {
  roastedLamb: "agnello arrosto", iberianPork: "maiale iberico e salumi", agedCheese: "formaggi stagionati", grilledMeat: "carni alla griglia", roastedVegetables: "verdure arrosto", riceDishes: "risotti e fondi saporiti", shellfish: "crostacei e frutti di mare", ceviche: "ceviche e agrumi", sushi: "sushi e crudi", tapas: "tapas e aperitivi", salads: "insalate e piatti verdi", whiteFish: "pesce bianco", poultry: "pollame", creamyFish: "pesce con salse cremose", butterSauce: "salse al burro", steak: "bistecca e carni rosse", duck: "anatra", mushrooms: "funghi", tuna: "tonno scottato", goatCheese: "formaggio di capra", asianSpice: "spezie asiatiche", pork: "maiale arrosto", blueCheese: "formaggi erborinati",
};
editorialCopy.fr.roles = {
  anchorRed: (name) => `${name} fonctionne comme rouge de confiance : il reduit l'hesitation, soutient la rotation et structure la carte autour de regions reconnues.`,
  mediterraneanRed: (name) => `${name} apporte fruit mediterraneen, chaleur et origine. Il differencie les rouges sans eloigner le client de reperes connus.`,
  seafoodWhite: (name) => `${name} doit jouer le role de blanc de mer et de fraicheur : facile a recommander, utile au verre et lisible avec le poisson.`,
  entryWhite: (name) => `${name} est un blanc d'entree a forte rotation. Il lui faut du contexte pour ne pas devenir seulement le vin blanc maison.`,
  premiumWhite: (name) => `${name} permet de monter en gamme sur les blancs : texture, mineralite et gastronomie justifient le palier premium.`,
  globalWhite: (name) => `${name} est une reference mondiale, mais la carte doit annoncer le style : boise, non boise, frais, cremeux ou mineral.`,
  premiumGlobalRed: (name) => `${name} donne a la carte une ancre premium internationale pour les viandes et la comparaison avec des rouges locaux haut de gamme.`,
  elegantRed: (name) => `${name} couvre la place du rouge fin et elegant pour les clients qui ne veulent ni puissance ni bois dominant.`,
  aromaticWhite: (name) => `${name} se vend par l'aromatique et la fraicheur. Il fonctionne quand le client demande quelque chose de vif et direct.`,
  sommelierDiscovery: (name) => `${name} est un outil de decouverte : il fidelise le client curieux et ouvre des accords ou beaucoup de blancs echouent.`,
};
editorialCopy.fr.cues = {
  regionFirst: (name) => `Commencez par la region puis le cepage : "Rioja ou Ribera en Tempranillo". Le client achete la confiance avant la taxonomie.`,
  oldVine: (name) => `S'il y a vieilles vignes, altitude ou origine precise, dites-le tot. Pour ${name}, ces details justifient prix et difference.`,
  freshnessSalinity: (name) => `Vendez fraicheur, salinite et precision. Le message doit evoquer la cote, pas un blanc generique.`,
  easyFresh: (name) => `Utilisez un langage simple : frais, agrume, agile. Ajoutez ensuite producteur ou zone pour eviter l'effet commodity.`,
  textureMinerality: (name) => `Expliquez texture et mineralite avant les aromes. C'est le pont vers un blanc plus serieux.`,
  styleClarifier: (name) => `Clarifiez le style en une phrase : cremeux avec bois, mineral sans bois ou frais de climat froid.`,
  structure: (name) => `Parlez structure, tanin et cuisine. Il se vend mieux avec un plat que comme verre occasionnel.`,
  lightRed: (name) => `Positionnez-le comme elegant, pas faible. Servez-le un peu frais et parlez de finesse.`,
  aromaticFreshness: (name) => `Rendez-le reconnaissable par des notes vertes, agrumes et tension. Il repond bien a "quelque chose de frais".`,
  aciditySweetness: (name) => `Clarifiez le niveau de sucre et l'acidite. Riesling se vend quand le doute "sera-t-il sucre ?" disparait.`,
};
editorialCopy.fr.margins = {
  safeRotation: (name) => `${name} apporte securite et rotation. Utilisez-le pour le volume et gardez plus de marge sur producteurs ou elevages distinctifs.`,
  upsellByOrigin: (name) => `La montee en gamme doit venir de l'origine, des vieilles vignes ou de l'altitude, pas seulement du prix.`,
  byGlassVelocity: (name) => `Bon candidat au verre si la rotation est assuree et la description limpide.`,
  premiumStep: (name) => `Palier premium qui augmente le ticket blanc sans forcer le client vers des rouges chers.`,
  knownPremium: (name) => `La notoriete aide a defendre le prix, mais seulement si le style est clairement explique.`,
  handSellDiscovery: (name) => `Demande une recommandation active ; quand l'equipe le maitrise, il cree marge et memoire.`,
};
editorialCopy.fr.avoid = {
  onlyCrianza: "Ne pas limiter l'offre aux crianza et reserva ; garder aussi une expression jeune, fraiche ou de producteur.",
  alcoholOverweight: "Ne pas servir trop chaud : l'alcool prend le dessus et le fruit devient lourd.",
  warmService: "Ne pas servir tiede ; il perd sa precision et ressemble a n'importe quel blanc aromatique.",
  genericHouseWhite: "Ne pas le transformer en commodity. Producteur, zone et style doivent etre visibles.",
  hiddenName: "Ne pas le cacher parmi des blancs generiques : une courte explication capte la valeur.",
  unspecifiedOak: "Ne laissez pas le client deviner s'il y a du bois. C'est la premiere question commerciale.",
  tooYoung: "Ne pas recommander une bouteille jeune et tannique sans plat ; elle peut paraitre agressive.",
  overserveWarm: "Ne pas le servir a temperature de rouge puissant ; il perd sa finesse.",
  sameProfile: "Ne pas lister plusieurs blancs aromatiques qui disent la meme chose ; separez-les par origine ou plat.",
  onlySweet: "Ne pas le presenter comme doux par defaut ; sec, demi-sec ou doux doit etre clair.",
};
editorialCopy.fr.hooks = {
  roastedLamb: "agneau roti", iberianPork: "porc iberique et charcuterie", agedCheese: "fromages affines", grilledMeat: "viandes grillees", roastedVegetables: "legumes rotis", riceDishes: "riz et jus savoureux", shellfish: "fruits de mer", ceviche: "ceviche et agrumes", sushi: "sushi et poissons crus", tapas: "tapas et aperitifs", salads: "salades et plats vegetaux", whiteFish: "poisson blanc", poultry: "volaille", creamyFish: "poisson en sauce cremeuse", butterSauce: "sauces au beurre", steak: "steak et viandes rouges", duck: "canard", mushrooms: "champignons", tuna: "thon snacke", goatCheese: "chevre", asianSpice: "epices asiatiques", pork: "porc roti", blueCheese: "fromages bleus",
};
editorialCopy.de.roles = {
  anchorRed: (name) => `${name} funktioniert als verlasslicher Rotwein: weniger Auswahlfriktion, bessere Rotation und klare Orientierung uber bekannte Regionen.`,
  mediterraneanRed: (name) => `${name} bringt mediterrane Frucht, Warme und Herkunft. Ideal, um rote Weine zu differenzieren, ohne Gaste zu uberfordern.`,
  seafoodWhite: (name) => `${name} sollte als frischer Wein zu Fisch und Meer eingesetzt werden: leicht zu empfehlen, stark im Glasverkauf und sofort verstandlich.`,
  entryWhite: (name) => `${name} ist ein weisser Einstieg mit hoher Rotation. Er braucht Kontext, damit er nicht nur als Hauswein wahrgenommen wird.`,
  premiumWhite: (name) => `${name} hebt Weisswein auf ein Premium-Niveau: Textur, Mineralitat und Gastronomie rechtfertigen den Sprung im Preis.`,
  globalWhite: (name) => `${name} ist international bekannt, aber die Karte muss den Stil nennen: mit Holz, ohne Holz, frisch, cremig oder mineralisch.`,
  premiumGlobalRed: (name) => `${name} gibt der Karte einen internationalen Premium-Anker fur Fleischgerichte und den Vergleich mit hochwertigen lokalen Rotweinen.`,
  elegantRed: (name) => `${name} besetzt den Platz fur feine, elegante Rotweine, wenn Gaste weder Kraft noch dominantes Holz suchen.`,
  aromaticWhite: (name) => `${name} verkauft sich uber Aromatik und Frische. Er funktioniert gut, wenn Gaste nach etwas Knackigem fragen.`,
  sommelierDiscovery: (name) => `${name} ist ein Entdeckerwein: Er bindet neugierige Gaste und offnet Pairings, bei denen viele Weissweine scheitern.`,
};
editorialCopy.de.cues = {
  regionFirst: (name) => `Zuerst die Region, dann die Rebsorte nennen: "Rioja oder Ribera aus Tempranillo". Gaste kaufen Vertrauen vor Taxonomie.`,
  oldVine: (name) => `Wenn alte Reben, Hohe oder genaue Herkunft wichtig sind, fruh nennen. Diese Details rechtfertigen bei ${name} den Preis.`,
  freshnessSalinity: (name) => `Frische, Salinitat und Prazision verkaufen. Die Botschaft soll nach Meer klingen, nicht nach generischem Weisswein.`,
  easyFresh: (name) => `Einfach sprechen: frisch, zitrisch, agil. Danach Produzent oder Zone nennen, um Commodity-Wahrnehmung zu vermeiden.`,
  textureMinerality: (name) => `Textur und Mineralitat vor Aromen erklaren. So wird ein ernsthafter Weisswein leichter verkaufbar.`,
  styleClarifier: (name) => `Den Stil in einem Satz klaren: cremig mit Holz, mineralisch ohne Holz oder frisch aus kuhler Herkunft.`,
  structure: (name) => `Uber Struktur, Tannin und Essen sprechen. Dieser Wein verkauft sich besser zum Gericht als als spontanes Glas.`,
  lightRed: (name) => `Als elegant positionieren, nicht als schwach. Leicht kuhler servieren und uber Finesse sprechen.`,
  aromaticFreshness: (name) => `Uber grune, zitrische und spannungsreiche Aromen erkennbar machen. Passt zur Frage nach "etwas Frischem".`,
  aciditySweetness: (name) => `Sussegrad und Saure klaren. Riesling verkauft sich, wenn die Frage "ist er suss?" verschwindet.`,
};
editorialCopy.de.margins = {
  safeRotation: (name) => `${name} bringt Sicherheit und Rotation. Fur Volumen nutzen und hohere Marge uber Produzenten oder gereifte Stile holen.`,
  upsellByOrigin: (name) => `Upsell uber Herkunft, alte Reben oder Hohe aufbauen, nicht nur uber den Preis.`,
  byGlassVelocity: (name) => `Starker Kandidat fur den Glasverkauf, wenn Rotation gesichert und die Beschreibung klar ist.`,
  premiumStep: (name) => `Premium-Stufe, die den Weissweinbon erhoht, ohne Gaste direkt zu teuren Rotweinen zu schieben.`,
  knownPremium: (name) => `Bekanntheit hilft beim Preis, aber nur wenn der Stil klar erklart ist.`,
  handSellDiscovery: (name) => `Braucht aktive Empfehlung; wenn das Team ihn beherrscht, schafft er Marge und Erinnerung.`,
};
editorialCopy.de.avoid = {
  onlyCrianza: "Nicht nur Crianza/Reserva zeigen; auch junge, frische oder produzentenstarke Ausdrucke anbieten.",
  alcoholOverweight: "Nicht zu warm servieren: Alkohol wirkt schwerer und Frucht wird marmeladig.",
  warmService: "Nicht lauwarm servieren; Prazision geht verloren.",
  genericHouseWhite: "Nicht zur Ware machen. Produzent, Zone und Stil mussen sichtbar sein.",
  hiddenName: "Nicht zwischen generischen Weissweinen verstecken: eine kurze Erklarung holt den Wert heraus.",
  unspecifiedOak: "Gaste nicht raten lassen, ob Holz im Spiel ist. Das ist die erste Verkaufsfrage.",
  tooYoung: "Tanninreiche junge Flaschen nicht ohne Essen empfehlen; sie konnen aggressiv wirken.",
  overserveWarm: "Nicht wie einen kraftigen Rotwein servieren; er verliert Finesse.",
  sameProfile: "Nicht mehrere aromatische Weissweine mit derselben Aussage listen; nach Herkunft oder Gericht trennen.",
  onlySweet: "Nicht automatisch als suss prasentieren; trocken, feinherb oder suss muss klar sein.",
};
editorialCopy.de.hooks = {
  roastedLamb: "Lammbraten", iberianPork: "Iberico und hochwertiges Schwein", agedCheese: "gereifter Kase", grilledMeat: "Grillfleisch", roastedVegetables: "gerostetes Gemuse", riceDishes: "Reisgerichte und kraftige Fonds", shellfish: "Meeresfruchte", ceviche: "Ceviche und Zitrus", sushi: "Sushi und rohe Fische", tapas: "Tapas und Aperitifs", salads: "Salate und grune Gerichte", whiteFish: "weisser Fisch", poultry: "Geflugel", creamyFish: "Fisch mit cremigen Saucen", butterSauce: "Buttersaucen", steak: "Steak und rotes Fleisch", duck: "Ente", mushrooms: "Pilze", tuna: "kurz gebratener Thunfisch", goatCheese: "Ziegenkase", asianSpice: "asiatische Scharfe", pork: "Schweinebraten", blueCheese: "Blauschimmelkaese",
};
editorialCopy.pt.roles = {
  anchorRed: (name) => `${name} funciona como tinto de confianca: reduz friccao na escolha, sustenta rotacao e organiza a carta por regioes reconheciveis.`,
  mediterraneanRed: (name) => `${name} traz fruta, calor e origem mediterranica. Diferencia tintos sem afastar o cliente do que entende.`,
  seafoodWhite: (name) => `${name} deve atuar como branco de mar e frescura: facil de recomendar, util a copo e claro em mesas de peixe.`,
  entryWhite: (name) => `${name} e um branco de entrada com alta rotacao. Precisa de contexto para nao ficar reduzido ao vinho da casa.`,
  premiumWhite: (name) => `${name} permite subir o ticket nos brancos: textura, mineralidade e gastronomia justificam o patamar premium.`,
  globalWhite: (name) => `${name} e uma referencia global, mas a carta deve indicar estilo: com madeira, sem madeira, fresco, cremoso ou mineral.`,
  premiumGlobalRed: (name) => `${name} da a carta uma ancora premium internacional para carnes e comparacao com tintos locais de gama alta.`,
  elegantRed: (name) => `${name} cobre o espaco de tinto elegante para clientes que nao procuram potencia nem madeira dominante.`,
  aromaticWhite: (name) => `${name} vende por aromaticidade e frescura. Funciona quando o cliente pede algo vivo e direto.`,
  sommelierDiscovery: (name) => `${name} e uma ferramenta de descoberta: fideliza clientes curiosos e abre harmonizacoes onde outros brancos falham.`,
};
editorialCopy.pt.cues = {
  regionFirst: (name) => `Apresente primeiro a regiao e depois a casta: "Rioja ou Ribera de Tempranillo". O cliente compra confianca antes de taxonomia.`,
  oldVine: (name) => `Se houver vinha velha, altitude ou origem precisa, diga cedo. Em ${name}, esses detalhes justificam preco.`,
  freshnessSalinity: (name) => `Venda frescura, salinidade e precisao. A mensagem deve soar a mar, nao a branco generico.`,
  easyFresh: (name) => `Use linguagem simples: fresco, citrico, agil. Depois acrescente produtor ou zona para evitar percecao de commodity.`,
  textureMinerality: (name) => `Explique textura e mineralidade antes dos aromas. E a ponte para vender um branco mais serio.`,
  styleClarifier: (name) => `Clarifique o estilo numa frase: cremoso com madeira, mineral sem madeira ou fresco de clima frio.`,
  structure: (name) => `Fale de estrutura, tanino e comida. Vende melhor associado a prato do que como copo casual.`,
  lightRed: (name) => `Posicione como elegante, nao como fraco. Sirva ligeiramente fresco e fale de finura.`,
  aromaticFreshness: (name) => `Torne-o reconhecivel por aromas verdes, citricos e tensao. Encaixa no pedido de "algo fresco".`,
  aciditySweetness: (name) => `Clarifique dulcor e acidez. Riesling vende quando desaparece a duvida "sera doce?".`,
};
editorialCopy.pt.margins = {
  safeRotation: (name) => `${name} traz seguranca e rotacao. Use para volume e reserve margem alta para produtores ou estagios diferenciados.`,
  upsellByOrigin: (name) => `O upsell deve vir por origem, vinha velha ou altitude, nao apenas por preco.`,
  byGlassVelocity: (name) => `Bom candidato a copo se a rotacao estiver garantida e a descricao for clara.`,
  premiumStep: (name) => `Funciona como degrau premium: sobe o ticket dos brancos sem obrigar o cliente a passar para tintos caros.`,
  knownPremium: (name) => `A notoriedade ajuda a defender preco, mas so se o estilo estiver bem explicado.`,
  handSellDiscovery: (name) => `Precisa de recomendacao ativa; quando a equipa o domina, gera margem e memoria.`,
};
editorialCopy.pt.avoid = {
  onlyCrianza: "Nao limitar a oferta a crianzas e reservas; inclua tambem leitura jovem, fresca ou de produtor.",
  alcoholOverweight: "Nao servir demasiado quente: o alcool pesa e a fruta fica pesada.",
  warmService: "Nao servir morno; perde precisao.",
  genericHouseWhite: "Nao transformar em commodity. Produtor, zona e estilo devem estar claros.",
  hiddenName: "Nao esconder entre brancos genericos: uma explicacao breve captura valor.",
  unspecifiedOak: "Nao deixar o cliente adivinhar se tem madeira. E a primeira pergunta comercial.",
  tooYoung: "Nao recomendar garrafas jovens e tanicas sem comida; podem parecer agressivas.",
  overserveWarm: "Nao servir a temperatura de tinto potente; perde finura.",
  sameProfile: "Nao listar varios brancos aromaticos que dizem o mesmo; diferencie por origem ou prato.",
  onlySweet: "Nao apresentar como doce por defeito; seco, meio-seco ou doce deve estar claro.",
};
editorialCopy.pt.hooks = {
  roastedLamb: "borrego assado", iberianPork: "porco iberico e enchidos", agedCheese: "queijos curados", grilledMeat: "carnes grelhadas", roastedVegetables: "legumes assados", riceDishes: "arrozes e fundos saborosos", shellfish: "marisco", ceviche: "ceviche e citrinos", sushi: "sushi e peixe cru", tapas: "tapas e aperitivos", salads: "saladas e pratos verdes", whiteFish: "peixe branco", poultry: "aves", creamyFish: "peixe com molhos cremosos", butterSauce: "molhos de manteiga", steak: "bife e carnes vermelhas", duck: "pato", mushrooms: "cogumelos", tuna: "atum braseado", goatCheese: "queijo de cabra", asianSpice: "picante asiatico", pork: "porco assado", blueCheese: "queijos azuis",
};

export function getGrapeEditorialProfile(
  slug: string,
  lang: string,
  grapeName: string,
): LocalizedGrapeEditorialProfile | undefined {
  const profile = grapeEditorialProfiles[slug];
  if (!profile) return undefined;
  const copy = editorialCopy[langFallback(lang)];

  return {
    slug,
    priority: profile.priority,
    eyebrow: copy.labels.serviceIntelligence,
    title: copy.title(grapeName),
    subtitle: copy.subtitle,
    facts: [
      { label: copy.labels.serviceTemp, value: profile.serviceTemp },
      { label: copy.labels.glass, value: profile.glass },
      { label: copy.labels.decanting, value: profile.decanting },
    ],
    sections: [
      { title: copy.labels.role, body: copy.roles[profile.listRole](grapeName) },
      { title: copy.labels.staffCue, body: copy.cues[profile.cue](grapeName) },
      { title: copy.labels.margin, body: copy.margins[profile.margin](grapeName) },
      { title: copy.labels.avoid, body: copy.avoid[profile.avoid] },
    ],
    menuTitle: copy.labels.menu,
    menuHooks: profile.menuHooks.map((hook) => copy.hooks[hook]),
    faqs: [
      copy.faq.service(grapeName, profile.serviceTemp),
      copy.faq.list(grapeName),
    ],
  };
}
