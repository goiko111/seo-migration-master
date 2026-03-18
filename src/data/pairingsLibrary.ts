// ─── Wine Pairings Data Model ─────────────────────────────

export type PairingCategory =
  | "carnes-rojas"
  | "aves-caza"
  | "pescados-mariscos"
  | "quesos"
  | "pasta-arroces-legumbres"
  | "verduras-vegetariana"
  | "embutidos-charcuteria"
  | "postres-chocolate"
  | "cocina-asiatica-fusion"
  | "tapas-aperitivos";

export type PairingLevel = "clasico" | "diferencial" | "premium";
export type IntensityLevel = "suave" | "media" | "intensa" | "muy-intensa";

export interface DishPairing {
  dish: string;
  wines: string[];
  notes: string;
}

export interface PairingEntry {
  id: string;
  slug: string;
  name: string;
  category: PairingCategory;
  level: "category" | "dish" | "ingredient";
  description: string;
  intro: string;
  principles: string[];
  dishes: DishPairing[];
  // Sensory axes
  intensity: IntensityLevel;
  fatLevel: "baja" | "media" | "alta";
  spiceLevel: "ninguno" | "suave" | "medio" | "alto";
  acidityInFood: "baja" | "media" | "alta";
  // Relations
  recommendedStyles: string[];
  recommendedRegions: string[];
  recommendedGrapes: string[];
  commonMistakes: string[];
  alternatives: string[];
  relatedPairings: string[];
  // Winerim commercial layer
  cartaUsage: string;
  salaLanguage: string;
  safeOptions: string;
  differentialOptions: string;
  restaurantMistakes: string;
  whenClassicLoses: string;
  pairingRole: PairingLevel[];
  bestConcepts: string[];
  faqs: { q: string; a: string }[];
  seo: { title: string; description: string };
}

// ═══════════════════════════════════════════════════════════════
// CATEGORY METADATA
// ═══════════════════════════════════════════════════════════════

export const categoryMeta: Record<PairingCategory, { label: string; emoji: string; description: string }> = {
  "carnes-rojas":           { label: "Carnes rojas",                emoji: "🥩", description: "El compañero clásico del vino tinto. Grasa, proteínas y taninos." },
  "aves-caza":              { label: "Aves y caza",                 emoji: "🍗", description: "Desde el pollo suave hasta la caza mayor potente." },
  "pescados-mariscos":      { label: "Pescados y mariscos",         emoji: "🐟", description: "El mar y el vino comparten salinidad como hilo conductor." },
  "quesos":                 { label: "Quesos",                      emoji: "🧀", description: "Una de las grandes parejas gastronómicas del mundo." },
  "pasta-arroces-legumbres": { label: "Pasta, arroces y legumbres", emoji: "🍝", description: "Vehículos neutros: el maridaje depende de la salsa." },
  "verduras-vegetariana":   { label: "Verduras y cocina vegetariana", emoji: "🥬", description: "Sabores complejos que requieren atención especial." },
  "embutidos-charcuteria":  { label: "Embutidos y charcutería",     emoji: "🥓", description: "Sal, grasa y curación: grandes aliados del vino." },
  "postres-chocolate":      { label: "Postres y chocolate",         emoji: "🍫", description: "Regla de oro: el vino debe ser más dulce que el postre." },
  "cocina-asiatica-fusion":  { label: "Cocina asiática y fusión",   emoji: "🍜", description: "Umami, picante y agridulce: retos únicos para el vino." },
  "tapas-aperitivos":       { label: "Tapas y aperitivos",          emoji: "🫒", description: "Versatilidad: Fino, espumosos y blancos frescos reinan." },
};

export const categoryOrder: PairingCategory[] = [
  "carnes-rojas", "aves-caza", "pescados-mariscos", "quesos",
  "pasta-arroces-legumbres", "verduras-vegetariana", "embutidos-charcuteria",
  "postres-chocolate", "cocina-asiatica-fusion", "tapas-aperitivos",
];

// ═══════════════════════════════════════════════════════════════
// FULL ENTRIES
// ═══════════════════════════════════════════════════════════════

export const pairingEntries: PairingEntry[] = [
  {
    id: "carnes-rojas",
    slug: "carnes-rojas",
    name: "Maridaje con carnes rojas",
    category: "carnes-rojas",
    level: "category",
    description: "Las carnes rojas son el compañero clásico del vino tinto. La grasa y las proteínas suavizan los taninos, mientras que la acidez del vino limpia el paladar.",
    intro: "El maridaje de carne roja y vino tinto es uno de los más intuitivos de la gastronomía. Pero no basta con decir 'tinto con carne': el corte, la cocción, la salsa y el punto determinan qué vino funcionará mejor. Un filete poco hecho pide algo muy diferente a un estofado lento.",
    principles: [
      "A mayor intensidad de la carne, mayor cuerpo del vino.",
      "Las salsas definen el maridaje tanto como la carne: salsa de tomate pide Sangiovese; salsa de pimienta pide Syrah.",
      "La grasa marmoleada necesita taninos firmes o acidez alta para limpiar el paladar.",
      "Carnes poco hechas armonizan con tintos más suaves; carnes a la brasa con tintos potentes.",
      "La cocción lenta permite tintos con cuerpo medio y buena acidez.",
    ],
    dishes: [
      { dish: "Chuletón / T-bone a la brasa", wines: ["Ribera del Duero Reserva", "Cabernet Sauvignon de Napa", "Malbec de Mendoza", "Barolo"], notes: "Taninos firmes para cortar la grasa. Temperatura del vino: 16–18 °C." },
      { dish: "Cordero asado / lechazo", wines: ["Rioja Reserva/Gran Reserva", "Châteauneuf-du-Pape", "Priorat"], notes: "Clásico español: el cordero lechal de Castilla con Ribera del Duero es emblemático." },
      { dish: "Solomillo de ternera (poco hecho)", wines: ["Pinot Noir de Borgoña", "Rioja Crianza", "Chianti Classico"], notes: "Carne delicada pide tinto elegante, no demasiado potente." },
      { dish: "Entrecot con salsa de pimienta", wines: ["Syrah/Shiraz del Ródano o Barossa", "Monastrell de Jumilla"], notes: "La pimienta del plato se refleja en las notas especiadas del Syrah." },
      { dish: "Estofado de buey / rabo de toro", wines: ["Toro", "Jumilla", "Cahors (Malbec)", "Amarone della Valpolicella"], notes: "Cocción lenta con salsas ricas necesita vinos concentrados y complejos." },
      { dish: "Hamburguesa gourmet", wines: ["Zinfandel", "Malbec", "Garnacha joven", "Mencía del Bierzo"], notes: "Vinos afrutados y directos, sin excesiva complejidad." },
      { dish: "Carpaccio de ternera", wines: ["Pinot Noir ligero", "Barbera d'Asti", "Beaujolais (Morgon)"], notes: "Carne cruda pide tintos ligeros con buena acidez y mínimos taninos." },
      { dish: "Cochinillo asado", wines: ["Rioja Crianza", "Mencía", "Côtes du Rhône"], notes: "La piel crujiente contrasta con tintos de taninos suaves y buena fruta." },
    ],
    intensity: "intensa",
    fatLevel: "alta",
    spiceLevel: "suave",
    acidityInFood: "baja",
    recommendedStyles: ["Tinto con cuerpo", "Tinto crianza", "Tinto reserva"],
    recommendedRegions: ["Rioja", "Ribera del Duero", "Burdeos", "Napa Valley", "Mendoza", "Piamonte"],
    recommendedGrapes: ["Tempranillo", "Cabernet Sauvignon", "Malbec", "Syrah", "Nebbiolo", "Garnacha"],
    commonMistakes: [
      "Servir tintos demasiado templados (>20 °C) que pierden frescura.",
      "Usar tintos muy tánicos con carnes poco hechas.",
      "Ignorar la salsa: es la salsa la que manda en muchos platos.",
      "No ofrecer tintos ligeros como opción para quien prefiere algo menos potente.",
    ],
    alternatives: ["Un Chardonnay con barrica puede funcionar con carnes blancas o pollo", "Un rosado con estructura para carnes a la plancha en verano"],
    relatedPairings: ["embutidos-charcuteria", "quesos"],
    cartaUsage: "Las carnes rojas son la categoría donde más fácil es recomendar vino. Tener 2–3 opciones claras (uno accesible, uno de gama media, uno premium) cubre el 90% de las necesidades.",
    salaLanguage: "«Este Ribera del Duero acompaña perfecto al chuletón: tiene la estructura para equilibrar la grasa y las notas de fruta madura que redondean cada bocado.»",
    safeOptions: "Un Rioja Crianza o un Malbec argentino son siempre opciones seguras con cualquier carne roja.",
    differentialOptions: "Un Nebbiolo o un Mencía aportan diferenciación y dan pie a conversación en sala.",
    restaurantMistakes: "Ofrecer solo tintos pesados. Muchos comensales prefieren algo más ligero incluso con carne. Incluir un Pinot Noir o una Mencía amplía la venta.",
    whenClassicLoses: "El maridaje 'Ribera con chuletón' es tan conocido que pierde capacidad de sorprender. Ofrecer una alternativa (Barolo, Malbec) genera mayor percepción de valor.",
    pairingRole: ["clasico", "premium"],
    bestConcepts: ["Asador", "Steakhouse", "Restaurante gastronómico", "Parrilla argentina", "Cocina castellana"],
    faqs: [
      { q: "¿Solo tintos con carne roja?", a: "Principalmente sí, pero un Chardonnay con barrica puede funcionar con cortes menos intensos. Y un rosado con estructura es sorprendente con carnes a la plancha." },
      { q: "¿Qué vino pido si no sé qué elegir con carne?", a: "Un Rioja Reserva o un Malbec argentino son comodines seguros que funcionan con prácticamente cualquier carne roja." },
      { q: "¿La salsa importa más que la carne?", a: "Muchas veces sí. Un solomillo con salsa de pimienta pide un Syrah, no un Pinot Noir. La salsa modifica completamente el perfil del plato." },
    ],
    seo: {
      title: "Maridaje con Carnes Rojas: Guía de Vinos por Plato | Winerim",
      description: "Qué vino elegir con chuletón, cordero, solomillo y estofados. 8 combinaciones plato+vino, principios clave y errores frecuentes. Guía profesional para hostelería.",
    },
  },
  {
    id: "aves-caza",
    slug: "aves-y-caza",
    name: "Maridaje con aves y caza",
    category: "aves-caza",
    level: "category",
    description: "Las aves ofrecen un espectro enorme: desde el pollo suave hasta la caza mayor potente. El vino debe adaptarse a la intensidad y al método de cocción.",
    intro: "El maridaje con aves requiere leer la intensidad del plato. Un pollo asado con limón pide un blanco fresco; un ciervo con salsa de frutos rojos necesita un Barolo. La caza de pluma y la caza mayor abren la puerta a algunos de los maridajes más sofisticados.",
    principles: [
      "Pollo y pavo: versátiles. Si es asado, tanto blanco como tinto ligero.",
      "Pato y oca: la grasa y la intensidad piden Pinot Noir, Garnacha o blancos con cuerpo.",
      "Caza de pluma (perdiz, faisán, codorniz): tintos de cuerpo medio con notas terrosas.",
      "Caza mayor (ciervo, jabalí): requiere tintos potentes y complejos.",
      "Los asados con hierbas aromáticas armonizan con vinos del Mediterráneo.",
    ],
    dishes: [
      { dish: "Pollo asado con limón y hierbas", wines: ["Chardonnay (sin barrica)", "Verdejo", "Viognier", "Côtes du Rhône blanco"], notes: "La acidez del limón pide un blanco fresco o un tinto muy ligero." },
      { dish: "Pato confitado / magret", wines: ["Pinot Noir de Borgoña", "Garnacha de Campo de Borja", "Madiran (Tannat)"], notes: "La grasa del pato necesita acidez. El Pinot Noir es un clásico." },
      { dish: "Perdiz escabechada", wines: ["Mencía del Bierzo", "Rioja Crianza", "Côtes du Rhône tinto"], notes: "El escabeche aporta acidez que necesita un tinto con estructura similar." },
      { dish: "Pavo al horno", wines: ["Pinot Noir (Oregon/Borgoña)", "Beaujolais Cru", "Riesling seco de Alsacia"], notes: "El pavo es delicado; evitar tintos muy tánicos." },
      { dish: "Ciervo / venado con frutos rojos", wines: ["Barolo", "Brunello di Montalcino", "Ribera del Duero Reserva"], notes: "Caza mayor potente pide grandes tintos con estructura." },
      { dish: "Codornices a la brasa", wines: ["Garnacha joven", "Nero d'Avola", "Rosado de Navarra"], notes: "Aves pequeñas a la brasa combinan con tintos afrutados o rosados con cuerpo." },
      { dish: "Foie gras", wines: ["Sauternes", "Tokaji Aszú", "Gewürztraminer Vendanges Tardives", "Pedro Ximénez"], notes: "Contraste grasa-dulzor. También funciona con Champagne vintage." },
    ],
    intensity: "media",
    fatLevel: "media",
    spiceLevel: "suave",
    acidityInFood: "media",
    recommendedStyles: ["Tinto ligero", "Blanco con cuerpo", "Tinto crianza", "Vino dulce (foie gras)"],
    recommendedRegions: ["Borgoña", "Rioja", "Beaujolais", "Alsacia", "Piamonte"],
    recommendedGrapes: ["Pinot Noir", "Garnacha", "Mencía", "Chardonnay", "Nebbiolo"],
    commonMistakes: [
      "Servir tintos pesados con pollo o pavo.",
      "Ignorar la opción de blanco con cuerpo para aves ligeras.",
      "No considerar vinos dulces para foie gras.",
    ],
    alternatives: ["Un rosado con estructura para aves a la brasa en verano", "Un espumoso con foie gras como alternativa al Sauternes"],
    relatedPairings: ["carnes-rojas", "verduras-vegetariana"],
    cartaUsage: "Las aves son la categoría más versátil. Ofrecer tanto blanco como tinto ligero amplía la venta. El foie gras merece una recomendación específica que suba el ticket.",
    salaLanguage: "«Para el pato confitado le sugiero este Pinot Noir de Borgoña: la acidez del vino equilibra la grasa del pato y las notas terrosas se complementan.»",
    safeOptions: "Un Pinot Noir es siempre una opción segura con aves. Un Chardonnay sin barrica para pollo.",
    differentialOptions: "Un Mencía con perdiz, un Riesling seco con pavo, un Madiran con pato.",
    restaurantMistakes: "No aprovechar el foie gras como oportunidad de venta de copa premium (Sauternes, Tokaji).",
    whenClassicLoses: "El clásico 'blanco con pollo' puede parecer genérico. Recomendar un tinto ligero o un blanco específico genera mayor confianza.",
    pairingRole: ["clasico", "diferencial", "premium"],
    bestConcepts: ["Restaurante gastronómico", "Cocina francesa", "Asador", "Restaurante de caza", "Fine dining"],
    faqs: [
      { q: "¿Tinto o blanco con pollo?", a: "Depende de la preparación. Asado con limón: blanco. Con salsas potentes o a la brasa: tinto ligero. Es uno de los platos más versátiles." },
      { q: "¿Qué vino con foie gras?", a: "El clásico es Sauternes (contraste dulce-grasa), pero Champagne vintage, Tokaji Aszú y PX también funcionan extraordinariamente." },
    ],
    seo: {
      title: "Maridaje con Aves y Caza: Vinos para Pollo, Pato, Ciervo | Winerim",
      description: "Guía de maridaje con aves y caza: pollo, pato, perdiz, ciervo y foie gras. Vinos recomendados, principios y errores frecuentes para hostelería.",
    },
  },
  {
    id: "pescados-mariscos",
    slug: "pescados-y-mariscos",
    name: "Maridaje con pescados y mariscos",
    category: "pescados-mariscos",
    level: "category",
    description: "El mar y el vino comparten la salinidad como hilo conductor. Pescados blancos con blancos ligeros; mariscos con espumosos o Albariño.",
    intro: "El maridaje con pescado requiere equilibrio: el vino no debe dominar la delicadeza del mar. La acidez y la frescura son aliados naturales, pero hay excepciones fascinantes como tintos ligeros con atún o rosados con pulpo a la brasa.",
    principles: [
      "Pescado blanco (merluza, lenguado, lubina): blancos secos, jóvenes, con buena acidez.",
      "Pescado azul (atún, salmón, sardinas): blancos con cuerpo, rosados, o tintos ligeros.",
      "Marisco crudo (ostras, ceviche): acidez y salinidad máximas. Albariño, Muscadet, Champagne.",
      "Marisco cocido/a la plancha: blancos algo más complejos o con crianza.",
      "Evitar tintos tánicos: los taninos + aceites de pescado producen sabor metálico.",
      "Las salsas mandan: pescado con mantequilla pide Chardonnay; con soja pide Riesling.",
    ],
    dishes: [
      { dish: "Ostras al natural", wines: ["Champagne Brut", "Muscadet sur Lie", "Albariño", "Chablis Premier Cru"], notes: "El maridaje más emblemático. Mineralidad y salinidad se potencian." },
      { dish: "Gambas al ajillo / langostinos", wines: ["Albariño", "Godello", "Vermentino", "Rueda Verdejo"], notes: "El ajo y el aceite piden blancos con cuerpo pero frescos." },
      { dish: "Merluza a la plancha", wines: ["Txakolí", "Chablis", "Verdicchio", "Greco di Tufo"], notes: "Pescado blanco delicado pide máxima frescura." },
      { dish: "Salmón (al horno/ahumado)", wines: ["Pinot Noir (Oregon)", "Chardonnay de Borgoña", "Rosado de Provenza"], notes: "La grasa del salmón admite Pinot Noir. Si es ahumado, Riesling seco." },
      { dish: "Atún rojo (tataki/tartar)", wines: ["Rosado con cuerpo", "Pinot Noir ligero", "Mencía joven"], notes: "El atún rojo casi se trata como carne; admite tintos suaves." },
      { dish: "Paella / arroz marinero", wines: ["Rosado de Navarra", "Verdejo", "Albariño", "Rosado de Provenza"], notes: "La paella de mariscos es versátil; los rosados son ideales." },
      { dish: "Pulpo a la gallega", wines: ["Albariño", "Godello de Valdeorras", "Mencía del Bierzo joven"], notes: "Clásico gallego. Albariño es el maridaje regional perfecto." },
      { dish: "Bacalao al pil-pil / a la vizcaína", wines: ["Txakolí", "Rioja Blanco", "Chardonnay sin barrica"], notes: "El bacalao es contundente; admite blancos con algo más de cuerpo." },
      { dish: "Sushi y sashimi", wines: ["Champagne", "Cava Brut Nature", "Riesling seco"], notes: "La sutileza del sushi pide vinos delicados, con acidez y sin madera." },
    ],
    intensity: "suave",
    fatLevel: "baja",
    spiceLevel: "ninguno",
    acidityInFood: "media",
    recommendedStyles: ["Blanco joven", "Blanco mineral", "Espumoso", "Rosado"],
    recommendedRegions: ["Rías Baixas", "Chablis", "Champagne", "Rueda", "Marlborough", "Loira"],
    recommendedGrapes: ["Albariño", "Chardonnay", "Sauvignon Blanc", "Godello", "Riesling", "Verdejo"],
    commonMistakes: [
      "Servir tintos tánicos con pescado (sabor metálico).",
      "Blancos con demasiada barrica que enmascaran la delicadeza del plato.",
      "No ofrecer espumosos como opción para marisco.",
    ],
    alternatives: ["Un Pinot Noir ligero con salmón o atún", "Un orange wine con pescado especiado"],
    relatedPairings: ["tapas-aperitivos", "cocina-asiatica-fusion"],
    cartaUsage: "El pescado es donde más se vende vino blanco. Tener una selección de blancos bien diferenciada (fresco, mineral, con barrica) amplía ventas. Los espumosos por copa con marisco son una palanca de ticket medio.",
    salaLanguage: "«Con las ostras le recomiendo este Chablis: la mineralidad del vino y la salinidad de la ostra se potencian mutuamente. Es el maridaje perfecto.»",
    safeOptions: "Albariño con cualquier pescado o marisco. Champagne/Cava con ostras o sushi.",
    differentialOptions: "Un Txakolí con merluza, un Godello con pulpo, un Pinot Noir con salmón.",
    restaurantMistakes: "No vender espumosos con marisco. Tener solo 1–2 blancos en carta cuando el restaurante es de cocina de mar.",
    whenClassicLoses: "El 'Albariño con marisco' es tan automático que no genera sorpresa. Un Muscadet, un Vermentino o un Txakolí aportan diferenciación.",
    pairingRole: ["clasico", "diferencial"],
    bestConcepts: ["Marisquería", "Restaurante costero", "Cocina japonesa", "Cocina mediterránea", "Restaurante de mercado"],
    faqs: [
      { q: "¿Puedo beber tinto con pescado?", a: "Sí, pero elige tintos ligeros y sin taninos marcados. Un Pinot Noir con salmón o un Mencía con atún funcionan muy bien." },
      { q: "¿Qué vino con sushi?", a: "Champagne Brut, Cava Brut Nature o Riesling seco. La clave es acidez, delicadeza y cero madera." },
    ],
    seo: {
      title: "Maridaje con Pescados y Mariscos: Guía de Vinos | Winerim",
      description: "Qué vino elegir con ostras, salmón, merluza, pulpo y sushi. Guía profesional de maridaje con pescados y mariscos para hostelería.",
    },
  },
  {
    id: "quesos",
    slug: "quesos",
    name: "Maridaje con quesos",
    category: "quesos",
    level: "category",
    description: "El queso y el vino son una de las grandes parejas gastronómicas, pero no todo vale. La regla clásica de 'tinto con queso' tiene excepciones importantes.",
    intro: "El maridaje vino-queso es un clásico, pero las combinaciones más exitosas no siempre son las más obvias. Los quesos frescos piden blancos ligeros, los curados necesitan tintos con cuerpo, y los azules encuentran su pareja ideal en vinos dulces. La regla de maridar por región (queso local con vino local) suele ser infalible.",
    principles: [
      "Quesos frescos y tiernos: blancos ligeros, rosados, espumosos.",
      "Quesos semicurados: blancos con cuerpo o tintos de cuerpo medio.",
      "Quesos curados e intensos: tintos con estructura, generosos (Oloroso, Amontillado).",
      "Quesos azules: vinos dulces (Sauternes, PX, Oporto). Contraste salado-dulce.",
      "Quesos de cabra: Sauvignon Blanc (clásico del Loira).",
      "Regla general: maridar por región funciona casi siempre.",
    ],
    dishes: [
      { dish: "Queso manchego curado", wines: ["Rioja Reserva", "Ribera del Duero", "Tempranillo de La Mancha", "Amontillado"], notes: "Clásico español. También funciona con membrillo y un Oloroso." },
      { dish: "Roquefort / queso azul", wines: ["Sauternes", "Pedro Ximénez", "Oporto Tawny 20 años", "Tokaji Aszú"], notes: "El maridaje salado-dulce más célebre del mundo." },
      { dish: "Brie / Camembert", wines: ["Champagne", "Chardonnay de Borgoña", "Pinot Noir ligero"], notes: "Quesos de corteza florida con espumosos es un clásico francés." },
      { dish: "Parmigiano Reggiano", wines: ["Lambrusco", "Chianti Classico", "Sangiovese", "Barbera"], notes: "Maridaje italiano por excelencia. El Lambrusco es sorprendente." },
      { dish: "Queso de cabra (Chèvre)", wines: ["Sancerre / Sauvignon Blanc del Loira", "Verdejo", "Rueda"], notes: "La acidez del Sauvignon Blanc corta la grasa del chèvre." },
      { dish: "Idiazábal ahumado", wines: ["Txakolí", "Rioja Crianza", "Navarra tinto"], notes: "Queso vasco-navarro con vinos de la zona." },
      { dish: "Gruyère / Comté", wines: ["Vin Jaune del Jura", "Chardonnay", "Pinot Noir de Borgoña"], notes: "El Vin Jaune con Comté es uno de los grandes maridajes franceses." },
      { dish: "Torta del Casar / quesos cremosos", wines: ["Cava Brut", "Champagne", "Albariño", "Godello"], notes: "Quesos cremosos extremeños con espumosos o blancos frescos." },
      { dish: "Tabla de quesos variada", wines: ["Amontillado", "Oloroso seco", "Champagne Rosé", "Riesling"], notes: "Los generosos de Jerez son el secreto mejor guardado para tablas." },
    ],
    intensity: "intensa",
    fatLevel: "alta",
    spiceLevel: "ninguno",
    acidityInFood: "baja",
    recommendedStyles: ["Tinto crianza", "Blanco con cuerpo", "Generoso", "Vino dulce", "Espumoso"],
    recommendedRegions: ["Rioja", "Jerez", "Champagne", "Loira", "Borgoña", "Piamonte"],
    recommendedGrapes: ["Tempranillo", "Sauvignon Blanc", "Chardonnay", "Palomino Fino", "Sangiovese"],
    commonMistakes: [
      "Servir solo tintos con queso. Muchos quesos funcionan mejor con blancos o generosos.",
      "Ignorar el contraste salado-dulce con quesos azules.",
      "No aprovechar los generosos de Jerez como comodín para tablas de quesos.",
    ],
    alternatives: ["Un Amontillado como comodín para cualquier tabla", "Un Champagne como opción elegante y versátil"],
    relatedPairings: ["embutidos-charcuteria", "postres-chocolate"],
    cartaUsage: "El queso es una categoría infrautilizada. Una sugerencia de maridaje junto a la tabla de quesos (una copa de Amontillado, un PX) puede generar ventas adicionales con margen alto.",
    salaLanguage: "«Con el Roquefort le sugiero una copa de Sauternes: el contraste entre lo salado del queso y lo dulce del vino crea una experiencia extraordinaria.»",
    safeOptions: "Un Rioja Reserva con queso curado. Un Champagne con cualquier tabla.",
    differentialOptions: "Un Vin Jaune con Comté. Un Lambrusco con Parmigiano. Un PX con azul.",
    restaurantMistakes: "No tener vinos dulces ni generosos para ofrecer con quesos. El queso es una de las mejores oportunidades de upselling.",
    whenClassicLoses: "El 'tinto con queso' es genérico. Especificar (Amontillado con Manchego, PX con Cabrales) transmite conocimiento y genera mayor valor percibido.",
    pairingRole: ["clasico", "diferencial", "premium"],
    bestConcepts: ["Restaurante gastronómico", "Wine bar", "Tapas bar", "Cocina francesa", "Fine dining"],
    faqs: [
      { q: "¿Siempre tinto con queso?", a: "No. Muchos quesos (frescos, de cabra, azules) funcionan mejor con blancos, espumosos o vinos dulces que con tintos." },
      { q: "¿Qué vino con una tabla variada de quesos?", a: "Un Amontillado o un Champagne son los mejores comodines. Los generosos de Jerez son especialmente versátiles." },
    ],
    seo: {
      title: "Maridaje con Quesos: Guía de Vinos por Tipo de Queso | Winerim",
      description: "Qué vino elegir con manchego, roquefort, brie, parmigiano y más. Guía profesional de maridaje vino-queso con 9 combinaciones para hostelería.",
    },
  },
  {
    id: "pasta-arroces-legumbres",
    slug: "pasta-arroces-y-legumbres",
    name: "Maridaje con pasta, arroces y legumbres",
    category: "pasta-arroces-legumbres",
    level: "category",
    description: "La pasta, el arroz y las legumbres son vehículos neutros que adoptan el sabor de sus acompañamientos. El maridaje depende de la salsa.",
    intro: "En estos platos, el ingrediente principal es neutro: lo que manda es la salsa, la proteína o el condimento. Una carbonara pide un vino completamente diferente a una boloñesa. Entender esto es clave para recomendar bien.",
    principles: [
      "Pasta con tomate: tintos italianos con acidez (Sangiovese, Barbera).",
      "Pasta con crema/mantequilla: blancos con cuerpo (Chardonnay, Viognier).",
      "Pasta con pesto: blancos ligures y piamonteses (Vermentino, Arneis).",
      "Risotto: depende del ingrediente principal; con setas pide Nebbiolo o Pinot Noir.",
      "Legumbres estofadas: tintos de cuerpo medio y buena acidez.",
      "Arroces españoles: depende del tipo de arroz y los ingredientes.",
    ],
    dishes: [
      { dish: "Spaghetti boloñesa / ragú", wines: ["Chianti Classico", "Sangiovese di Romagna", "Barbera d'Alba", "Montepulciano d'Abruzzo"], notes: "Salsa de tomate y carne pide acidez italiana." },
      { dish: "Carbonara / Alfredo", wines: ["Chardonnay", "Soave", "Fiano di Avellino", "Gavi"], notes: "La cremosidad pide blancos con cuerpo o mínima barrica." },
      { dish: "Pasta al pesto genovés", wines: ["Vermentino di Liguria", "Pigato", "Arneis"], notes: "Maridaje regional: pesto de Liguria con blancos ligures." },
      { dish: "Risotto de setas", wines: ["Pinot Noir", "Nebbiolo (Langhe)", "Barbera d'Asti", "Rioja Crianza"], notes: "Las setas piden tintos con notas terrosas." },
      { dish: "Arroz con costillas / arroz al horno", wines: ["Monastrell", "Garnacha", "Bobal"], notes: "Arroces de interior levantino con tintos mediterráneos." },
      { dish: "Cocido madrileño / fabada", wines: ["Mencía", "Garnacha", "Rioja joven", "Toro"], notes: "Platos contundentes con tintos con estructura." },
      { dish: "Lentejas estofadas", wines: ["Tempranillo joven", "Garnacha", "Côtes du Rhône"], notes: "Tintos sin demasiada complejidad." },
      { dish: "Lasaña", wines: ["Chianti", "Barbera", "Sangiovese", "Nero d'Avola"], notes: "Acidez del tomate + queso gratinado pide tinto italiano." },
    ],
    intensity: "media",
    fatLevel: "media",
    spiceLevel: "suave",
    acidityInFood: "media",
    recommendedStyles: ["Tinto joven", "Tinto ligero", "Blanco con cuerpo"],
    recommendedRegions: ["Toscana", "Piamonte", "Rioja", "Liguria", "Levante español"],
    recommendedGrapes: ["Sangiovese", "Barbera", "Chardonnay", "Vermentino", "Garnacha", "Tempranillo"],
    commonMistakes: [
      "Elegir vino por el tipo de pasta en vez de por la salsa.",
      "Servir blancos ligeros con salsas de tomate potentes.",
      "No considerar tintos italianos para cocina italiana.",
    ],
    alternatives: ["Un rosado con pasta ligera en verano", "Un Lambrusco con pizza o pasta informal"],
    relatedPairings: ["verduras-vegetariana", "carnes-rojas"],
    cartaUsage: "La pasta y los arroces son platos de alta rotación. Tener tintos italianos en carta (Chianti, Barbera) es imprescindible si hay menú italiano. Para cocina española, Garnacha y Tempranillo joven.",
    salaLanguage: "«Con la carbonara le sugiero este Soave: la cremosidad del plato pide un blanco con cuerpo que no domine sino que acompañe.»",
    safeOptions: "Un Chianti con cualquier pasta con tomate. Un Garnacha joven con arroces y legumbres.",
    differentialOptions: "Un Vermentino con pesto. Un Nebbiolo con risotto de setas.",
    restaurantMistakes: "No tener vinos italianos en un restaurante italiano. Es un error de coherencia que resta credibilidad.",
    whenClassicLoses: "La pasta es tan cotidiana que el comensal no siempre espera una recomendación. Hacer una sugerencia proactiva con el plato genera ventas que no existirían.",
    pairingRole: ["clasico"],
    bestConcepts: ["Trattoria", "Restaurante italiano", "Arrocería", "Cocina castellana", "Gastrobar"],
    faqs: [
      { q: "¿Qué importa más, la pasta o la salsa?", a: "La salsa, siempre. La pasta es un vehículo neutro. El maridaje se hace con la salsa y los ingredientes que la acompañan." },
      { q: "¿Un blanco con pasta?", a: "Sí, especialmente con salsas cremosas (carbonara, alfredo) o con pesto. No todo en pasta es 'tinto'." },
    ],
    seo: {
      title: "Maridaje con Pasta, Arroces y Legumbres: Guía de Vinos | Winerim",
      description: "Qué vino elegir con boloñesa, carbonara, risotto, paella y cocido. Guía de maridaje por salsa e ingrediente para hostelería.",
    },
  },
  {
    id: "verduras-vegetariana",
    slug: "verduras-y-cocina-vegetariana",
    name: "Maridaje con verduras y cocina vegetariana",
    category: "verduras-vegetariana",
    level: "category",
    description: "El maridaje vegetariano es un campo en auge. Las verduras tienen sabores complejos que requieren atención especial.",
    intro: "Las verduras ofrecen perfiles amargos, dulces, terrosos y herbáceos que requieren vinos pensados. Los blancos y rosados suelen funcionar, pero muchas verduras asadas o con setas armonizan perfectamente con tintos.",
    principles: [
      "Verduras verdes (espárragos, alcachofas): difíciles. Sauvignon Blanc o Grüner Veltliner.",
      "Verduras asadas/caramelizadas: admiten tintos con cuerpo medio.",
      "Setas y trufas: Pinot Noir, Nebbiolo, Rioja. Notas terrosas se complementan.",
      "Hummus, falafel, especias suaves: rosados o blancos aromáticos.",
      "Curry y especias fuertes: Riesling o Gewürztraminer con dulzura residual.",
      "Tofu y tempeh absorben sabores: seguir la salsa del plato.",
    ],
    dishes: [
      { dish: "Espárragos a la plancha", wines: ["Sauvignon Blanc", "Grüner Veltliner", "Verdejo"], notes: "Los espárragos son difíciles; la acidez y notas herbáceas del Sauvignon Blanc funcionan." },
      { dish: "Pimientos asados / escalivada", wines: ["Garnacha", "Rosado de Navarra", "Monastrell joven"], notes: "Verduras asadas mediterráneas con tintos del Mediterráneo." },
      { dish: "Setas salteadas / a la plancha", wines: ["Pinot Noir", "Nebbiolo Langhe", "Mencía", "Rioja Crianza"], notes: "Setas y Pinot Noir comparten notas terrosas y de sotobosque." },
      { dish: "Ratatouille / pisto", wines: ["Côtes de Provence rosado", "Garnacha", "Côtes du Rhône tinto"], notes: "Verduras guisadas provenzales con vinos de la misma región." },
      { dish: "Ensalada con vinagreta", wines: ["Sauvignon Blanc", "Txakolí", "Muscadet", "Vinho Verde"], notes: "El vinagre pide vinos con acidez alta." },
      { dish: "Curry vegetal / dhal", wines: ["Riesling (off-dry)", "Gewürztraminer", "Torrontés"], notes: "Platos especiados equilibran con ligera dulzura." },
      { dish: "Pizza Margherita / vegetariana", wines: ["Chianti", "Barbera", "Lambrusco", "Garnacha joven"], notes: "Tomate + mozzarella pide acidez italiana." },
    ],
    intensity: "suave",
    fatLevel: "baja",
    spiceLevel: "medio",
    acidityInFood: "media",
    recommendedStyles: ["Blanco joven", "Rosado", "Tinto ligero", "Blanco aromático"],
    recommendedRegions: ["Loira", "Alsacia", "Navarra", "Provenza", "Austria"],
    recommendedGrapes: ["Sauvignon Blanc", "Grüner Veltliner", "Garnacha", "Pinot Noir", "Riesling"],
    commonMistakes: [
      "Servir tintos pesados con verduras delicadas.",
      "No considerar la dificultad de espárragos y alcachofas con vino.",
      "Ignorar la opción de orange wine para cocina vegetariana.",
    ],
    alternatives: ["Un orange wine con platos de verduras especiadas", "Un Lambrusco con pizza vegetariana"],
    relatedPairings: ["cocina-asiatica-fusion", "pasta-arroces-legumbres"],
    cartaUsage: "Con el auge de la cocina vegetariana, tener opciones claras de maridaje vegetal es una ventaja competitiva. Los rosados y blancos aromáticos son los comodines perfectos.",
    salaLanguage: "«Con las setas le sugiero este Pinot Noir: ambos comparten esas notas terrosas y de sotobosque que se complementan de forma natural.»",
    safeOptions: "Un Sauvignon Blanc con verduras verdes. Un rosado con verduras asadas.",
    differentialOptions: "Un Grüner Veltliner con espárragos. Un orange wine con platos especiados.",
    restaurantMistakes: "No tener opciones de maridaje vegetariano cuando el menú incluye platos sin carne.",
    whenClassicLoses: "El 'blanco con verduras' es vago. Ser específico (Sauvignon Blanc con espárragos, Garnacha con pimientos) genera confianza.",
    pairingRole: ["diferencial", "clasico"],
    bestConcepts: ["Restaurante vegetariano", "Cocina de mercado", "Restaurante km0", "Gastrobar", "Cocina mediterránea"],
    faqs: [
      { q: "¿Hay vinos para vegetarianos?", a: "El maridaje vegetal es un campo fascinante. Blancos aromáticos, rosados y tintos ligeros funcionan muy bien con verduras, setas y platos especiados." },
      { q: "¿Por qué los espárragos son difíciles con vino?", a: "Los espárragos contienen compuestos azufrados que pueden crear un sabor metálico con muchos vinos. El Sauvignon Blanc y el Grüner Veltliner son los que mejor resuelven este reto." },
    ],
    seo: {
      title: "Maridaje con Verduras y Cocina Vegetariana: Guía de Vinos | Winerim",
      description: "Qué vino elegir con espárragos, setas, curry vegetal y pizza. Guía de maridaje vegetariano con criterio profesional para hostelería.",
    },
  },
  {
    id: "embutidos-charcuteria",
    slug: "embutidos-y-charcuteria",
    name: "Maridaje con embutidos y charcutería",
    category: "embutidos-charcuteria",
    level: "category",
    description: "Los embutidos curados son grandes aliados del vino. Sal, grasa y curación crean sabores intensos que necesitan vinos con carácter.",
    intro: "Desde el jamón ibérico hasta la bresaola, cada embutido tiene su vino ideal. La sal y la grasa de los curados piden acidez o burbujas para limpiar el paladar. Los generosos de Jerez son imbatibles en este territorio.",
    principles: [
      "Jamón ibérico: Fino, Manzanilla o Cava son insuperables.",
      "Embutidos picantes (chorizo, sobrasada): tintos jóvenes, afrutados, con buena acidez.",
      "Embutidos suaves (mortadela, jamón cocido): blancos ligeros, Lambrusco, rosados.",
      "La grasa del embutido pide acidez o burbujas para limpiar el paladar.",
      "Las tablas mixtas funcionan con Champagne, Cava o generosos de Jerez.",
    ],
    dishes: [
      { dish: "Jamón ibérico de bellota", wines: ["Fino", "Manzanilla", "Cava Reserva", "Amontillado"], notes: "El maridaje español por excelencia. El Fino realza la grasa infiltrada." },
      { dish: "Chorizo ibérico / chistorra", wines: ["Garnacha", "Rioja joven", "Mencía", "Monastrell"], notes: "El pimentón del chorizo armoniza con tintos afrutados." },
      { dish: "Salchichón / fuet", wines: ["Cava", "Garnacha del Priorat", "Penedès tinto"], notes: "Embutidos catalanes con vinos catalanes." },
      { dish: "Prosciutto di Parma", wines: ["Lambrusco", "Prosecco", "Sangiovese di Romagna"], notes: "La dulzura del prosciutto con la efervescencia del Lambrusco." },
      { dish: "Bresaola", wines: ["Chianti", "Nebbiolo Langhe", "Valpolicella"], notes: "Cecina de buey curada con tintos italianos elegantes." },
      { dish: "Foie gras mi-cuit / paté", wines: ["Sauternes", "Champagne Vintage", "Tokaji Aszú"], notes: "La untuosidad del foie con la dulzura y acidez del Sauternes." },
      { dish: "Tabla de charcutería variada", wines: ["Champagne/Cava", "Amontillado", "Rosado con cuerpo"], notes: "Los espumosos y generosos son comodines perfectos para mezclas." },
    ],
    intensity: "intensa",
    fatLevel: "alta",
    spiceLevel: "suave",
    acidityInFood: "baja",
    recommendedStyles: ["Generoso seco", "Espumoso", "Tinto joven"],
    recommendedRegions: ["Jerez", "Champagne", "Penedès", "Rioja", "Piamonte"],
    recommendedGrapes: ["Palomino Fino", "Garnacha", "Sangiovese", "Tempranillo"],
    commonMistakes: [
      "No ofrecer Fino/Manzanilla con jamón ibérico.",
      "Usar tintos pesados con embutidos delicados.",
      "No considerar espumosos como opción para tablas.",
    ],
    alternatives: ["Un Amontillado como comodín universal para charcutería", "Un Cava Reserva con cualquier tabla mixta"],
    relatedPairings: ["carnes-rojas", "quesos", "tapas-aperitivos"],
    cartaUsage: "Las tablas de embutidos son un momento ideal para vender copas de Fino, Cava o Amontillado. Es una oportunidad de upselling con margen alto.",
    salaLanguage: "«Con el jamón ibérico le sugiero una copa de Manzanilla: la salinidad del vino realza la grasa infiltrada de la bellota. Es el maridaje español quintaesencial.»",
    safeOptions: "Fino con jamón. Cava con tabla mixta. Garnacha joven con chorizo.",
    differentialOptions: "Un Amontillado con tabla. Un Lambrusco con prosciutto.",
    restaurantMistakes: "No tener generosos de Jerez. El jamón ibérico es uno de los platos estrella de España y su mejor compañero es un Fino.",
    whenClassicLoses: "Ofrecer solo 'un tinto' con embutidos es perder una oportunidad. Los generosos y espumosos generan mayor percepción de conocimiento.",
    pairingRole: ["clasico", "diferencial"],
    bestConcepts: ["Tapas bar", "Jamonería", "Wine bar", "Restaurante español", "Gastrobar"],
    faqs: [
      { q: "¿Qué vino con jamón ibérico?", a: "Fino, Manzanilla o Cava son las opciones perfectas. La salinidad del Fino es insuperable con la grasa del ibérico de bellota." },
      { q: "¿Tinto o blanco con embutidos?", a: "Depende. Con embutidos picantes: tinto joven. Con jamón o tabla: Fino, Manzanilla o espumoso. Los generosos de Jerez son comodines perfectos." },
    ],
    seo: {
      title: "Maridaje con Embutidos y Charcutería: Guía de Vinos | Winerim",
      description: "Qué vino elegir con jamón ibérico, chorizo, prosciutto y tabla de charcutería. Guía profesional de maridaje para hostelería.",
    },
  },
  {
    id: "postres-chocolate",
    slug: "postres-y-chocolate",
    name: "Maridaje con postres y chocolate",
    category: "postres-chocolate",
    level: "category",
    description: "Regla de oro: el vino debe ser siempre más dulce que el postre. Los dulces, fortificados y espumosos semisecos son los compañeros naturales.",
    intro: "El mundo dulce tiene una regla fundamental: si el vino es menos dulce que el postre, parecerá ácido y delgado. Los vinos dulces, los fortificados y los espumosos semisecos son los aliados naturales del postre. El chocolate negro necesita vinos potentes; las frutas, espumosos delicados.",
    principles: [
      "El vino debe ser más dulce que el postre (regla fundamental).",
      "Chocolate negro (>70%): Oporto, Banyuls, PX.",
      "Chocolate con leche: Oporto Tawny, Moscatel, Maury.",
      "Frutas frescas y tartas: Moscato d'Asti, Riesling Auslese.",
      "Postres con crema/nata: Sauternes, Late Harvest, Champagne Demi-Sec.",
      "Evitar tintos secos con postres: crean sabor metálico desagradable.",
    ],
    dishes: [
      { dish: "Tarta de chocolate negro", wines: ["Oporto Vintage", "Banyuls", "Pedro Ximénez", "Maury"], notes: "Chocolate intenso pide vinos dulces con notas de cacao y frutos negros." },
      { dish: "Crème brûlée / crema catalana", wines: ["Sauternes", "Tokaji Aszú 5 puttonyos", "Riesling TBA"], notes: "La vainilla y el caramelo armonizan con botrytizados." },
      { dish: "Tarta de manzana / tatin", wines: ["Riesling Auslese", "Gewürztraminer VT"], notes: "Las notas de manzana del Riesling reflejan el postre." },
      { dish: "Fresas con nata", wines: ["Moscato d'Asti", "Champagne Rosé Demi-Sec", "Brachetto d'Acqui"], notes: "Espumosos dulces y rosados con fruta fresca." },
      { dish: "Tiramisú", wines: ["Marsala dolce", "Vin Santo", "Recioto di Soave"], notes: "El tiramisú lleva Marsala; servirlo con Vin Santo crea armonía." },
      { dish: "Turrón / mazapán", wines: ["Moscatel de Valencia", "Pedro Ximénez", "Malvasía de Sitges"], notes: "Clásico navideño: turrón de Jijona con Moscatel." },
      { dish: "Helado de vainilla", wines: ["Pedro Ximénez (vertido encima)", "Moscatel", "Madeira Malmsey"], notes: "PX sobre helado de vainilla: postre instantáneo espectacular." },
      { dish: "Macarons / petit fours", wines: ["Champagne Demi-Sec", "Moscato d'Asti", "Cava semiseco"], notes: "Dulces delicados con espumosos delicados." },
      { dish: "Queso con membrillo", wines: ["Oloroso dulce", "Pedro Ximénez", "Oporto Tawny"], notes: "Queso curado + membrillo + generoso: triángulo perfecto." },
    ],
    intensity: "intensa",
    fatLevel: "media",
    spiceLevel: "ninguno",
    acidityInFood: "baja",
    recommendedStyles: ["Vino dulce natural", "Generoso dulce", "Espumoso semiseco"],
    recommendedRegions: ["Sauternes", "Tokaj", "Jerez", "Oporto", "Asti", "Alsacia"],
    recommendedGrapes: ["Pedro Ximénez", "Sémillon", "Riesling", "Moscatel", "Furmint"],
    commonMistakes: [
      "Servir tintos secos con postres.",
      "No tener vinos dulces en carta.",
      "Ofrecer solo PX y olvidar otras opciones como Sauternes o Tokaji.",
    ],
    alternatives: ["Un Champagne Demi-Sec como alternativa ligera", "Un Madeira Malmsey para postres con caramelo"],
    relatedPairings: ["quesos"],
    cartaUsage: "El postre es una de las mayores oportunidades de venta por copa. Una copa de PX, Sauternes o Moscato d'Asti con el postre sube el ticket medio y cierra la experiencia.",
    salaLanguage: "«Para cerrar, le sugiero una copa de Pedro Ximénez con su tarta de chocolate: las notas de higo y caramelo del vino se funden con el cacao.»",
    safeOptions: "Un PX o Moscatel con cualquier postre de chocolate. Un Moscato d'Asti con frutas.",
    differentialOptions: "Un Sauternes con crème brûlée. Un Tokaji Aszú con foie gras como postre.",
    restaurantMistakes: "No ofrecer vino con el postre. Es la venta por copa más fácil y con mayor margen de toda la comida.",
    whenClassicLoses: "Ofrecer 'un PX' de forma genérica pierde fuerza. Especificar qué PX y por qué funciona con ese postre concreto genera mucha mayor confianza.",
    pairingRole: ["clasico", "premium"],
    bestConcepts: ["Fine dining", "Restaurante con repostería", "Hotel F&B", "Menú degustación", "Cocina francesa"],
    faqs: [
      { q: "¿Se puede beber vino con chocolate?", a: "Sí, pero debe ser dulce y potente. Oporto, Banyuls, PX y Maury son perfectos con chocolate negro. Nunca un tinto seco." },
      { q: "¿Qué es la regla del postre?", a: "El vino siempre debe ser más dulce que el postre. Si no, el vino parecerá ácido, amargo y sin cuerpo." },
    ],
    seo: {
      title: "Maridaje con Postres y Chocolate: Vinos Dulces y Generosos | Winerim",
      description: "Qué vino elegir con chocolate, crème brûlée, tarta de manzana y helado. Guía profesional de maridaje dulce para hostelería.",
    },
  },
  {
    id: "cocina-asiatica-fusion",
    slug: "cocina-asiatica-y-fusion",
    name: "Maridaje con cocina asiática y fusión",
    category: "cocina-asiatica-fusion",
    level: "category",
    description: "Umami intenso, picantes, dulces, ácidos y amargos conviven en un mismo plato. Los vinos aromáticos con dulzura residual son la clave.",
    intro: "La cocina asiática presenta retos únicos para el vino: umami, picante, agridulce y texturas complejas. Los vinos aromáticos, con ligera dulzura residual y buena acidez, son la solución. Los orange wines también funcionan sorprendentemente bien.",
    principles: [
      "Umami (soja, miso, dashi): evitar tintos tánicos. Riesling, Grüner Veltliner, espumosos.",
      "Picante (chili, wasabi): la dulzura residual del vino apaga el fuego.",
      "Agridulce (cocina china): Riesling Spätlese, Torrontés, rosados con dulzura.",
      "Cocina japonesa (minimalista): Champagne, Chablis, sake.",
      "Thai/vietnamita: blancos aromáticos (Sauvignon Blanc, Albariño).",
      "Orange wines: sorprendentemente versátiles con cocina asiática.",
    ],
    dishes: [
      { dish: "Sushi y sashimi", wines: ["Champagne Brut", "Chablis", "Albariño", "Cava Brut Nature"], notes: "Pescado crudo pide vinos delicados con acidez." },
      { dish: "Ramen / pho", wines: ["Riesling seco", "Grüner Veltliner", "Beaujolais (Gamay)"], notes: "Caldos intensos con umami: vinos frescos y versátiles." },
      { dish: "Pad Thai / noodles salteados", wines: ["Riesling Spätlese", "Torrontés", "Gewürztraminer"], notes: "El dulce-salado-ácido del Pad Thai pide ligera dulzura." },
      { dish: "Dim sum variado", wines: ["Champagne", "Cava", "Crémant", "Prosecco"], notes: "Las burbujas limpian entre bocado y bocado." },
      { dish: "Curry tailandés (rojo/verde)", wines: ["Riesling off-dry", "Gewürztraminer", "Moscato d'Asti"], notes: "El picante se equilibra con dulzura residual." },
      { dish: "Pato pekín / pato laqueado", wines: ["Pinot Noir", "Garnacha", "Côtes du Rhône", "Rioja Crianza"], notes: "La grasa y el dulce del pato laqueado admiten tintos suaves." },
      { dish: "Tempura", wines: ["Champagne", "Txakolí", "Muscadet", "Verdejo"], notes: "Frituras delicadas con vinos crujientes y con acidez." },
      { dish: "Tandoori / tikka masala", wines: ["Torrontés", "Viognier", "Rosado de Provenza"], notes: "Especias indias con blancos aromáticos o rosados frescos." },
    ],
    intensity: "intensa",
    fatLevel: "media",
    spiceLevel: "alto",
    acidityInFood: "alta",
    recommendedStyles: ["Blanco aromático", "Espumoso", "Riesling off-dry", "Orange wine"],
    recommendedRegions: ["Alsacia", "Mosela", "Champagne", "Marlborough", "Argentina (Torrontés)"],
    recommendedGrapes: ["Riesling", "Gewürztraminer", "Grüner Veltliner", "Torrontés", "Albariño"],
    commonMistakes: [
      "Servir tintos tánicos con umami (multiplica la astringencia).",
      "Ignorar la opción de Riesling off-dry con cocina picante.",
      "No considerar orange wines para cocina asiática.",
    ],
    alternatives: ["Un Grüner Veltliner como comodín universal para cocina asiática", "Un orange wine con curry o platos especiados"],
    relatedPairings: ["pescados-mariscos", "verduras-vegetariana"],
    cartaUsage: "Si el restaurante tiene platos asiáticos o fusión, un Riesling y un Gewürztraminer son imprescindibles. Los espumosos también son grandes comodines.",
    salaLanguage: "«Con el curry le recomiendo este Riesling: la ligera dulzura del vino apaga el picante y las notas florales complementan las especias.»",
    safeOptions: "Un Riesling con casi cualquier plato asiático. Un Champagne/Cava con sushi.",
    differentialOptions: "Un orange wine con curry. Un Grüner Veltliner con ramen.",
    restaurantMistakes: "No tener Riesling ni aromáticos en carta cuando hay platos con especias o umami.",
    whenClassicLoses: "El 'cerveza con asiático' es el competidor real. Un vino bien recomendado puede convencer al comensal de que la experiencia mejora con vino.",
    pairingRole: ["diferencial", "clasico"],
    bestConcepts: ["Restaurante japonés", "Thai/vietnamita", "Fusión", "Nikkei", "Dim sum"],
    faqs: [
      { q: "¿Se puede beber vino con comida picante?", a: "Sí. La clave es dulzura residual: un Riesling off-dry o un Gewürztraminer apagan el picante. Evitar tintos tánicos." },
      { q: "¿Qué vino con sushi?", a: "Champagne, Cava Brut Nature o Chablis. La delicadeza del sushi pide vinos con acidez y sin madera." },
    ],
    seo: {
      title: "Maridaje con Cocina Asiática y Fusión: Guía de Vinos | Winerim",
      description: "Qué vino elegir con sushi, curry, ramen, dim sum y tandoori. Guía de maridaje asiático con criterio profesional para hostelería.",
    },
  },
  {
    id: "tapas-aperitivos",
    slug: "tapas-y-aperitivos",
    name: "Maridaje con tapas y aperitivos",
    category: "tapas-aperitivos",
    level: "category",
    description: "Las tapas son la máxima expresión de la versatilidad del vino español. Fino, Manzanilla, espumosos y blancos frescos reinan.",
    intro: "La variedad de sabores en una mesa de tapas requiere vinos comodín: los generosos de Jerez, los espumosos y los blancos frescos son imbatibles. No se trata de maridar cada tapa individualmente, sino de encontrar el vino que acompañe la experiencia completa.",
    principles: [
      "Fino y Manzanilla: el vino de tapas por excelencia. Funciona con casi todo.",
      "Espumosos (Cava, Champagne): las burbujas limpian entre tapas diferentes.",
      "Variedad en la mesa: mejor un vino versátil que uno muy específico.",
      "Tapas calientes (croquetas, bravas): blancos con cuerpo o tintos jóvenes.",
      "Tapas frías (aceitunas, anchoas, conservas): Fino, Manzanilla, blancos ácidos.",
      "Tortilla española: Fino, Manzanilla, Verdejo, Cava. Maridaje icónico.",
    ],
    dishes: [
      { dish: "Tortilla española", wines: ["Fino", "Manzanilla", "Verdejo", "Cava Brut"], notes: "Maridaje español quintaesencial." },
      { dish: "Croquetas", wines: ["Cava", "Amontillado", "Albariño"], notes: "Las burbujas del Cava contrastan con la cremosidad de la croqueta." },
      { dish: "Patatas bravas", wines: ["Garnacha rosado", "Mencía joven", "Monastrell"], notes: "El tomate picante de la brava pide tinto joven o rosado." },
      { dish: "Aceitunas y encurtidos", wines: ["Fino", "Manzanilla", "Txakolí", "Verdejo"], notes: "La salinidad del Fino armoniza con aceitunas." },
      { dish: "Boquerones en vinagre", wines: ["Manzanilla", "Muscadet", "Albariño", "Vinho Verde"], notes: "El vinagre pide vinos con acidez alta." },
      { dish: "Conservas", wines: ["Albariño", "Godello", "Txakolí", "Muscadet"], notes: "Conservas de mar con blancos atlánticos." },
      { dish: "Pimientos de Padrón", wines: ["Albariño", "Godello", "Mencía rosado"], notes: "Clásico gallego con vinos gallegos." },
      { dish: "Mesa de tapas variada", wines: ["Fino/Manzanilla", "Cava", "Amontillado"], notes: "Los generosos de Jerez son imbatibles para mesa de tapas." },
    ],
    intensity: "media",
    fatLevel: "media",
    spiceLevel: "suave",
    acidityInFood: "media",
    recommendedStyles: ["Generoso seco", "Espumoso", "Blanco joven", "Rosado"],
    recommendedRegions: ["Jerez", "Rías Baixas", "Penedès", "Rueda", "Navarra", "País Vasco"],
    recommendedGrapes: ["Palomino Fino", "Albariño", "Verdejo", "Macabeo", "Garnacha"],
    commonMistakes: [
      "Ofrecer solo cerveza como opción para tapas.",
      "No tener Fino ni Manzanilla en un restaurante de tapas.",
      "Servir tintos pesados con tapas ligeras.",
    ],
    alternatives: ["Un Amontillado como upgrade sobre el Fino", "Un Champagne para una experiencia premium de tapas"],
    relatedPairings: ["embutidos-charcuteria", "pescados-mariscos"],
    cartaUsage: "Las tapas son la mejor excusa para vender generosos de Jerez por copa. Un Fino o Manzanilla por copa tiene margen alto y genera percepción de conocimiento.",
    salaLanguage: "«Para acompañar las tapas les sugiero una copa de Fino: es el vino que mejor funciona con la variedad de sabores de una mesa de tapas. Funciona con todo.»",
    safeOptions: "Fino o Manzanilla. Cava Brut. Albariño.",
    differentialOptions: "Un Amontillado. Un Txakolí. Un Champagne.",
    restaurantMistakes: "El mayor error es no tener Fino/Manzanilla en un restaurante de tapas. Es como no tener pan.",
    whenClassicLoses: "El 'una caña' es el competidor principal. Un Fino bien servido (copa correcta, temperatura) puede convencer al comensal de que la tapa merece algo mejor.",
    pairingRole: ["clasico", "diferencial"],
    bestConcepts: ["Tapas bar", "Taberna", "Gastrobar", "Wine bar español", "Restaurante andaluz"],
    faqs: [
      { q: "¿Qué vino pido con tapas variadas?", a: "Un Fino o Manzanilla funciona con casi todo. Un Cava Brut es la alternativa espumosa perfecta." },
      { q: "¿Y si no me gusta el Fino?", a: "Un Cava Brut, un Albariño o un Verdejo son alternativas excelentes. Para mesa con embutidos, un Amontillado." },
    ],
    seo: {
      title: "Maridaje con Tapas y Aperitivos: Guía de Vinos | Winerim",
      description: "Qué vino elegir con tortilla, croquetas, jamón, bravas y tapas variadas. Guía de maridaje para tapas con Fino, Cava y más. Criterio para hostelería.",
    },
  },
];

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

export const getPairingBySlug = (slug: string): PairingEntry | undefined =>
  pairingEntries.find(e => e.slug === slug);

export const getPairingsByCategory = (cat: PairingCategory): PairingEntry[] =>
  pairingEntries.filter(e => e.category === cat);
