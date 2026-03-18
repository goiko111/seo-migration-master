// ─── Wine Styles Data Model ─────────────────────────────

export type StyleFamily = "tinto" | "blanco" | "rosado" | "espumoso" | "generoso" | "dulce" | "naranja" | "eco";
export type BodyLevel = "ligero" | "medio" | "alto" | "muy-alto";
export type AcidityLevel = "baja" | "media" | "alta" | "muy-alta";
export type ComplexityLevel = "sencillo" | "medio" | "complejo" | "muy-complejo";
export type CartaRole = "seguro" | "diferencial" | "premium" | "descubrimiento" | "tendencia";
export type ClientRecognition = "muy-alto" | "alto" | "medio" | "bajo" | "nicho";

export interface StyleSubtype {
  name: string;
  slug: string;
  description: string;
}

export interface StyleEntry {
  id: string;
  slug: string;
  name: string;
  family: StyleFamily;
  description: string;
  intro: string;
  elaboration: string;
  // Sensory
  body: BodyLevel;
  acidity: AcidityLevel;
  fruitIntensity: "baja" | "media" | "alta";
  woodPresence: "ninguna" | "sutil" | "media" | "marcada";
  complexity: ComplexityLevel;
  servingTemp: string;
  glassRecommendation: string;
  // Relations
  mainGrapes: string[];
  keyRegions: string[];
  pairings: string[];
  agingPotential: string;
  subtypes: StyleSubtype[];
  relatedStyles: string[];
  // Commercial / Winerim layer
  clientRecognition: ClientRecognition;
  cartaRole: CartaRole[];
  cartaCommunication: string;
  clientProfile: string;
  sellByStrategy: string;
  whenSafe: string;
  whenDifferential: string;
  whenPremium: string;
  competingStyles: string[];
  bestConcepts: string[];
  faqs: { q: string; a: string }[];
  seo: { title: string; description: string };
}

// Lightweight catalog entry for styles without full Winerim layer
export interface StyleCatalogEntry {
  slug: string;
  name: string;
  family: StyleFamily;
  description: string;
  servingTemp: string;
  mainGrapes: string[];
  keyRegions: string[];
}

// ═══════════════════════════════════════════════════════════════
// FAMILY METADATA
// ═══════════════════════════════════════════════════════════════

export const familyMeta: Record<StyleFamily, { label: string; emoji: string; description: string }> = {
  tinto:    { label: "Tintos",                     emoji: "🍷", description: "El estilo más diverso del mundo del vino." },
  blanco:   { label: "Blancos",                    emoji: "🥂", description: "Frescura, acidez y aromas frutales o minerales." },
  rosado:   { label: "Rosados",                    emoji: "🌸", description: "La frescura del blanco con matices del tinto." },
  espumoso: { label: "Espumosos",                  emoji: "🫧", description: "Burbujas, celebración y versatilidad gastronómica." },
  generoso: { label: "Generosos / Fortificados",   emoji: "🏺", description: "Complejidad, longevidad y tradición centenaria." },
  dulce:    { label: "Dulces Naturales",            emoji: "🍯", description: "Concentración, elegancia y maridajes únicos." },
  naranja:  { label: "Vinos Naranjas",              emoji: "🍊", description: "Lo ancestral hecho tendencia contemporánea." },
  eco:      { label: "Ecológicos, Biodinámicos y Naturales", emoji: "🌿", description: "Respeto, terroir y mínima intervención." },
};

export const familyOrder: StyleFamily[] = ["tinto", "blanco", "rosado", "espumoso", "generoso", "dulce", "naranja", "eco"];

// ═══════════════════════════════════════════════════════════════
// FULL ENTRIES — with complete Winerim layer
// ═══════════════════════════════════════════════════════════════

export const styleEntries: StyleEntry[] = [
  {
    id: "tinto",
    slug: "tinto",
    name: "Vino Tinto",
    family: "tinto",
    description: "Elaborado a partir de uvas tintas con maceración de hollejos para extraer color, taninos y aromas. El estilo más diverso del mundo del vino.",
    intro: "El vino tinto es el resultado de la fermentación del mosto de uvas tintas en contacto con sus pieles. Este proceso de maceración extrae color, taninos y compuestos aromáticos que definen el carácter del vino. Desde jóvenes afrutados hasta grandes reservas con décadas de evolución, el tinto abarca la mayor diversidad estilística de toda la enología.",
    elaboration: "Las uvas tintas se despalillan, se estrujan y se someten a maceración con sus hollejos durante días o semanas. La fermentación alcohólica se produce en depósitos de acero inoxidable, hormigón o barricas de roble. Muchos tintos pasan por fermentación maloláctica para suavizar la acidez. La crianza puede realizarse en barrica de roble (francés, americano o húngaro) y posterior afinamiento en botella.",
    body: "alto",
    acidity: "media",
    fruitIntensity: "alta",
    woodPresence: "media",
    complexity: "complejo",
    servingTemp: "14–18 °C",
    glassRecommendation: "Copa Burdeos (amplia) para tintos con cuerpo; copa Borgoña (abombada) para tintos delicados como Pinot Noir.",
    mainGrapes: ["Cabernet Sauvignon", "Merlot", "Pinot Noir", "Syrah/Shiraz", "Tempranillo", "Sangiovese", "Nebbiolo", "Garnacha", "Malbec", "Monastrell", "Mencía", "Touriga Nacional", "Gamay"],
    keyRegions: ["Burdeos", "Borgoña", "Valle del Ródano", "Rioja", "Ribera del Duero", "Toscana", "Piamonte", "Napa Valley", "Mendoza", "Barossa Valley", "Douro"],
    pairings: ["Carnes rojas a la brasa", "Cordero", "Guisos", "Embutidos curados", "Quesos semicurados y curados", "Pasta con salsas de tomate o ragú", "Legumbres estofadas"],
    agingPotential: "Desde consumo inmediato (jóvenes) hasta 30+ años para grandes reservas y vinos de guarda premium.",
    subtypes: [
      { name: "Tinto joven / sin crianza", slug: "tinto-joven", description: "Afrutado, fresco, sin paso por barrica. Ideal para consumo inmediato." },
      { name: "Tinto crianza", slug: "tinto-crianza", description: "Mínimo 6–12 meses en barrica y posterior botella." },
      { name: "Tinto reserva / gran reserva", slug: "tinto-reserva", description: "Crianza prolongada (18–36+ meses barrica). Mayor complejidad." },
      { name: "Tinto ligero", slug: "tinto-ligero", description: "Poco tanino, alta acidez, perfil delicado. Ej: Pinot Noir de Borgoña, Gamay del Beaujolais." },
      { name: "Tinto con cuerpo", slug: "tinto-cuerpo", description: "Rico en taninos, concentrado, potente. Ej: Cabernet Sauvignon de Napa, Barolo." },
      { name: "Tinto maceración carbónica", slug: "tinto-maceracion-carbonica", description: "Fermentación intracelular de racimos enteros. Muy afrutado y aromático." },
    ],
    relatedStyles: ["rosado", "generoso"],
    clientRecognition: "muy-alto",
    cartaRole: ["seguro", "premium"],
    cartaCommunication: "El tinto es el estilo que más confianza genera en el comensal medio. Comunicarlo bien en carta —diferenciando jóvenes de crianzas— ayuda a que el cliente se atreva a subir de gama.",
    clientProfile: "Todos los perfiles. El tinto es el estilo más universal, aunque los tintos ligeros y de maceración carbónica atraen a un público más joven y explorador.",
    sellByStrategy: "Conviene vender por región o denominación cuando la zona es reconocida (Rioja, Burdeos). Por variedad cuando el cliente busca algo concreto (Malbec, Pinot Noir).",
    whenSafe: "Siempre. Un tinto crianza de denominación conocida es la opción más segura de cualquier carta.",
    whenDifferential: "Tintos ligeros, maceración carbónica o variedades menos conocidas (Mencía, Gamay, Nerello Mascalese).",
    whenPremium: "Grandes Reservas, vinos de parcela, añadas especiales.",
    competingStyles: ["Vino blanco con cuerpo (para carnes blancas)", "Rosado con estructura"],
    bestConcepts: ["Asadores", "Cocina mediterránea", "Restaurante gastronómico", "Tapas bar", "Cocina de autor"],
    faqs: [
      { q: "¿A qué temperatura se sirve un vino tinto?", a: "Entre 14 y 18 °C. Los tintos ligeros más frescos (14–16 °C) y los de crianza más templados (16–18 °C). Nunca a temperatura ambiente en verano." },
      { q: "¿Cuánto dura un tinto abierto?", a: "Generalmente 2–4 días en nevera con tapón. Los tintos con más estructura aguantan mejor que los ligeros." },
      { q: "¿Qué diferencia un crianza de un reserva?", a: "El tiempo de crianza en barrica y botella. Un Crianza tiene al menos 6 meses en barrica; un Reserva, 12 meses; y un Gran Reserva, 18–24 meses." },
    ],
    seo: {
      title: "Vino Tinto: Guía Completa de Estilos, Subtipos y Maridajes | Winerim",
      description: "Todo sobre el vino tinto: elaboración, subtipos (joven, crianza, reserva), uvas principales, regiones destacadas y maridajes. Guía profesional para hostelería.",
    },
  },
  {
    id: "blanco",
    slug: "blanco",
    name: "Vino Blanco",
    family: "blanco",
    description: "Elaborado generalmente a partir de uvas blancas, se caracteriza por su frescura, acidez y aromas frutales, florales o minerales.",
    intro: "El vino blanco se elabora fermentando el mosto sin contacto prolongado con las pieles, lo que resulta en vinos de color claro, frescos y generalmente más ligeros que los tintos. La diversidad es enorme: desde Albariños minerales hasta Chardonnays cremosos fermentados en barrica.",
    elaboration: "Las uvas se prensan rápidamente para separar el mosto de los hollejos. La fermentación se realiza a temperatura controlada (15–20 °C) para preservar aromas. Algunos blancos fermentan o se crían en barrica de roble para mayor complejidad. La fermentación maloláctica es opcional.",
    body: "medio",
    acidity: "alta",
    fruitIntensity: "alta",
    woodPresence: "ninguna",
    complexity: "medio",
    servingTemp: "8–12 °C",
    glassRecommendation: "Copa blanca estándar (más estrecha que la de tinto) para preservar aromas y frescura.",
    mainGrapes: ["Chardonnay", "Sauvignon Blanc", "Riesling", "Albariño", "Verdejo", "Godello", "Gewürztraminer", "Pinot Grigio/Gris", "Viognier", "Chenin Blanc", "Garganega", "Moscatel"],
    keyRegions: ["Borgoña", "Loira", "Alsacia", "Rías Baixas", "Rueda", "Mosela", "Marlborough", "Chablis", "Friuli", "Valdeorras"],
    pairings: ["Pescados", "Mariscos", "Ensaladas", "Sushi", "Quesos frescos", "Aves suaves", "Tapas", "Verduras a la plancha", "Arroces"],
    agingPotential: "La mayoría para consumo en 1–3 años. Grandes blancos de Borgoña, Riesling seco alemán y algunos Chenin Blanc pueden evolucionar 10–20+ años.",
    subtypes: [
      { name: "Blanco joven / aromático", slug: "blanco-joven", description: "Sin barrica, máxima expresión frutal y floral. Ej: Albariño, Sauvignon Blanc de Marlborough." },
      { name: "Blanco fermentado en barrica", slug: "blanco-fermentado-barrica", description: "Fermentación y/o crianza en roble. Más cremoso, con notas de vainilla. Ej: Meursault." },
      { name: "Blanco con crianza sobre lías", slug: "blanco-crianza-lias", description: "Contacto prolongado con levaduras muertas. Textura untuosa. Ej: Muscadet sur Lie." },
      { name: "Blanco mineral", slug: "blanco-mineral", description: "Perfil marcado por la mineralidad del terroir. Ej: Chablis, Riesling de Mosela, Godello." },
      { name: "Blanco semidulce / dulce", slug: "blanco-semidulce", description: "Con azúcar residual. Ej: Riesling Spätlese, Gewürztraminer Vendanges Tardives." },
    ],
    relatedStyles: ["espumoso", "naranja"],
    clientRecognition: "muy-alto",
    cartaRole: ["seguro", "diferencial"],
    cartaCommunication: "El blanco ha ganado protagonismo en carta. Comunicar subtipos (mineral, con barrica, aromático) permite al comensal elegir mejor y al restaurante ofrecer opciones de mayor margen.",
    clientProfile: "Público amplio. Los blancos jóvenes y aromáticos atraen a perfiles jóvenes y comensales de cocina ligera. Los fermentados en barrica conectan con clientes más experimentados.",
    sellByStrategy: "Por variedad cuando es conocida (Albariño, Verdejo). Por subtipo cuando la carta es extensa (mineral, con barrica). Por región cuando la zona tiene marca (Rías Baixas, Chablis).",
    whenSafe: "Albariño, Verdejo, Sauvignon Blanc son opciones seguras y universales.",
    whenDifferential: "Blancos minerales (Godello, Chablis), blancos con barrica, Riesling seco.",
    whenPremium: "Grandes blancos de Borgoña, Riesling Grand Cru, Chenin Blanc de guarda.",
    competingStyles: ["Rosado", "Espumoso (como aperitivo)"],
    bestConcepts: ["Restaurante costero", "Cocina japonesa", "Tapas de mercado", "Cocina de producto", "Marisquería"],
    faqs: [
      { q: "¿A qué temperatura se sirve un vino blanco?", a: "Entre 8 y 12 °C. Más frío para blancos ligeros, algo más templado para blancos con crianza en barrica." },
      { q: "¿Un blanco puede envejecer?", a: "Sí. Grandes Chardonnays de Borgoña, Rieslings alemanes y Chenin Blanc del Loira pueden evolucionar 10–20+ años." },
      { q: "¿Qué es un blanco mineral?", a: "Un blanco con perfil aromático dominado por notas de pedernal, tiza o piedra mojada, más que por fruta. Chablis y Godello son ejemplos clásicos." },
    ],
    seo: {
      title: "Vino Blanco: Tipos, Subtipos y Maridajes | Guía Profesional Winerim",
      description: "Guía completa del vino blanco: desde jóvenes aromáticos hasta blancos con crianza. Uvas, regiones, temperatura, copa y maridajes para hostelería.",
    },
  },
  {
    id: "rosado",
    slug: "rosado",
    name: "Vino Rosado",
    family: "rosado",
    description: "Vino de color rosa pálido a salmón intenso, elaborado con uvas tintas pero con un contacto breve con los hollejos.",
    intro: "El rosado ha dejado de ser un vino de segunda para convertirse en protagonista de la escena gastronómica. Elaborado con uvas tintas pero con una maceración corta, ofrece la frescura de un blanco con cierta estructura de un tinto. Provenza, Navarra y Tavel son referencias mundiales.",
    elaboration: "Tres métodos principales: (1) Sangrado/saignée: se extrae parte del mosto de un depósito de tinto tras pocas horas. (2) Prensado directo: se prensan uvas tintas como si fueran blancas. (3) Maceración corta: contacto controlado de 2–24 horas antes de separar hollejos.",
    body: "ligero",
    acidity: "alta",
    fruitIntensity: "alta",
    woodPresence: "ninguna",
    complexity: "sencillo",
    servingTemp: "8–10 °C",
    glassRecommendation: "Copa de vino blanco o copa tulipa ligeramente abierta.",
    mainGrapes: ["Garnacha", "Cinsault", "Syrah", "Mourvèdre", "Tempranillo", "Cabernet Franc", "Pinot Noir", "Sangiovese"],
    keyRegions: ["Provenza", "Navarra", "Cigales", "Tavel", "Bandol", "Abruzzo"],
    pairings: ["Ensaladas mediterráneas", "Pizza", "Pasta ligera", "Paella", "Sushi", "Tapas variadas", "Quesos suaves", "Aperitivos"],
    agingPotential: "Consumo inmediato, idealmente en el año de cosecha o el siguiente.",
    subtypes: [
      { name: "Rosado provenzal (pálido)", slug: "rosado-provenzal", description: "Color muy pálido salmón, seco, elegante, floral. Ej: Côtes de Provence." },
      { name: "Rosado con cuerpo", slug: "rosado-cuerpo", description: "Color más intenso, más estructura frutal. Ej: Navarra, Tavel, Cerasuolo d'Abruzzo." },
      { name: "Rosado semidulce", slug: "rosado-semidulce", description: "Con algo de azúcar residual. Popular en mercados anglosajones. Ej: White Zinfandel." },
      { name: "Clarete", slug: "clarete", description: "Estilo tradicional español. Mezcla de uvas tintas y blancas co-fermentadas. Ej: Claretes de Cigales." },
    ],
    relatedStyles: ["blanco", "tinto-ligero"],
    clientRecognition: "alto",
    cartaRole: ["seguro", "tendencia"],
    cartaCommunication: "El rosado es un puente ideal entre blancos y tintos. En carta, posicionarlo como opción de terraza y aperitivo sube su rotación. Comunicar procedencia (Provenza, Navarra) ayuda a percibir calidad.",
    clientProfile: "Público joven, comensales de terraza, turismo internacional. Cada vez más valorado por perfiles gastronómicos.",
    sellByStrategy: "Por estilo (provenzal, con cuerpo) o por región. La variedad importa menos que la procedencia y el color.",
    whenSafe: "Siempre en primavera-verano. Un rosado de Provence o Navarra nunca falla como opción ligera.",
    whenDifferential: "Rosados de autor, Tavel, Cerasuolo d'Abruzzo, rosados de prensado directo de Pinot Noir.",
    whenPremium: "Rosados de Bandol o provenzales de finca con crianza.",
    competingStyles: ["Blanco joven", "Espumoso rosé"],
    bestConcepts: ["Terraza mediterránea", "Beach club", "Cocina asiática fusión", "Brunch", "Tapas de mercado"],
    faqs: [
      { q: "¿El rosado es un vino de baja calidad?", a: "No. Los mejores rosados del mundo (Provenza, Tavel, Bandol) son vinos sofisticados con identidad propia. El rosado ha vivido un renacimiento global." },
      { q: "¿Cómo se hace un rosado?", a: "Principalmente por sangrado, prensado directo o maceración corta de uvas tintas. Nunca mezclando vino tinto con blanco (excepto en Champagne rosé)." },
    ],
    seo: {
      title: "Vino Rosado: Tipos, Elaboración y Maridajes | Winerim",
      description: "Guía completa del vino rosado: estilos (provenzal, con cuerpo, clarete), uvas, regiones y maridajes. Criterio profesional para hostelería.",
    },
  },
  {
    id: "espumoso",
    slug: "espumoso",
    name: "Vino Espumoso",
    family: "espumoso",
    description: "Vino con presencia de gas carbónico disuelto, obtenido por una segunda fermentación. Desde Champagne hasta Cava y Prosecco.",
    intro: "Los vinos espumosos son sinónimo de celebración, pero también de gastronomía. La segunda fermentación genera las burbujas que los caracterizan. Desde el refinamiento del Champagne hasta la frescura del Prosecco, los espumosos ofrecen una experiencia sensorial única.",
    elaboration: "Dos métodos principales: (1) Método tradicional/champenoise: segunda fermentación en botella, crianza sobre lías, degüelle. Burbujas finas y persistentes. (2) Método Charmat/Martinotti: segunda fermentación en grandes depósitos de acero. Preserva aromas frutales primarios. Otros: método ancestral (Pét-Nat), método transfer.",
    body: "ligero",
    acidity: "alta",
    fruitIntensity: "media",
    woodPresence: "ninguna",
    complexity: "complejo",
    servingTemp: "6–8 °C",
    glassRecommendation: "Copa flauta (preserva burbujas) o copa tulipa (mejor expresión aromática). Evitar copas anchas tipo coupe.",
    mainGrapes: ["Chardonnay", "Pinot Noir", "Pinot Meunier", "Macabeo", "Xarel-lo", "Parellada", "Glera", "Riesling", "Chenin Blanc"],
    keyRegions: ["Champagne", "Penedès", "Prosecco (Conegliano-Valdobbiadene)", "Franciacorta", "Alsacia", "Loira", "Mosela", "Tasmania"],
    pairings: ["Aperitivos", "Ostras", "Caviar", "Sushi", "Quesos brie y camembert", "Frituras ligeras", "Postres ligeros", "Jamón ibérico"],
    agingPotential: "Prosecco: 1–2 años. Cava: 2–5 años. Champagne vintage: 10–20+ años.",
    subtypes: [
      { name: "Champagne", slug: "champagne", description: "Exclusivo de la región de Champagne (Francia). Método tradicional. El espumoso de referencia mundial." },
      { name: "Cava", slug: "cava", description: "Método tradicional español, principalmente de Penedès. Uvas: Macabeo, Xarel-lo, Parellada." },
      { name: "Prosecco", slug: "prosecco", description: "Método Charmat del Véneto (Italia). Uva Glera. Ligero, afrutado, ideal como aperitivo." },
      { name: "Crémant", slug: "cremant", description: "Espumosos franceses de método tradicional fuera de Champagne." },
      { name: "Sekt", slug: "sekt", description: "Espumoso alemán. Los mejores con Riesling." },
      { name: "Franciacorta", slug: "franciacorta", description: "Método tradicional de Lombardía (Italia). Comparable al Champagne." },
      { name: "Pét-Nat", slug: "pet-nat", description: "Método ancestral. Una sola fermentación se completa en botella. Turbio, natural, tendencia actual." },
      { name: "Espumante", slug: "espumante", description: "Espumosos portugueses y brasileños. Método tradicional o Charmat." },
    ],
    relatedStyles: ["blanco", "rosado"],
    clientRecognition: "muy-alto",
    cartaRole: ["seguro", "premium", "tendencia"],
    cartaCommunication: "El espumoso genera percepción de celebración y calidad. Tener una selección visible —no solo Champagne— incentiva el consumo por copa y sube el ticket medio.",
    clientProfile: "Universal. Desde el turista que pide Prosecco hasta el gourmet que busca un Champagne de récoltant. El espumoso es el estilo con mayor rango de precios y ocasiones.",
    sellByStrategy: "Por tipo/marca (Champagne, Cava, Prosecco) más que por variedad. El método de elaboración y la procedencia son los ejes de venta.",
    whenSafe: "Un Cava Brut o Prosecco por copa es la opción aperitivo más segura y rentable.",
    whenDifferential: "Crémant, Franciacorta, Cava de Paraje, Pét-Nat.",
    whenPremium: "Champagne vintage, cuvées prestige, Franciacorta Riserva.",
    competingStyles: ["Blanco fresco (como aperitivo)", "Cocktails"],
    bestConcepts: ["Restaurante de autor", "Coctelería", "Hotel F&B", "Marisquería", "Brunch", "Fine dining"],
    faqs: [
      { q: "¿Qué diferencia hay entre Champagne y Cava?", a: "Ambos usan método tradicional, pero proceden de regiones distintas y usan uvas diferentes. Champagne es exclusivo de su región en Francia; Cava se elabora principalmente en Penedès." },
      { q: "¿Qué es un Pét-Nat?", a: "Un Pétillant Naturel es un espumoso de método ancestral: una sola fermentación que se completa en botella, sin adición de licor. Suelen ser turbios y con carácter natural." },
    ],
    seo: {
      title: "Vino Espumoso: Champagne, Cava, Prosecco y Más | Winerim",
      description: "Guía completa de vinos espumosos: métodos de elaboración, subtipos (Champagne, Cava, Prosecco, Crémant), maridajes y criterio para hostelería.",
    },
  },
  {
    id: "generoso",
    slug: "generoso",
    name: "Vino Generoso / Fortificado",
    family: "generoso",
    description: "Vinos a los que se añade alcohol vínico durante o después de la fermentación, elevando su graduación a 15–22%.",
    intro: "Los vinos generosos incluyen algunos de los vinos más complejos y longevos del mundo. Desde el Fino de Jerez hasta el Oporto Vintage, estos vinos ofrecen una profundidad de sabor y una historia cultural difíciles de igualar.",
    elaboration: "El momento del encabezado (adición de alcohol) es clave: si se añade durante la fermentación, quedan azúcares residuales (vino dulce, ej: Oporto). Si se añade después, el vino puede ser seco (ej: Fino de Jerez). La crianza posterior define el estilo: biológica (bajo velo de flor), oxidativa (en contacto con aire), o una combinación.",
    body: "alto",
    acidity: "media",
    fruitIntensity: "media",
    woodPresence: "marcada",
    complexity: "muy-complejo",
    servingTemp: "6–18 °C (según subtipo)",
    glassRecommendation: "Catavino de Jerez (copa pequeña tulipa) o copa de vino dulce/generoso.",
    mainGrapes: ["Palomino Fino", "Pedro Ximénez", "Moscatel", "Touriga Nacional", "Touriga Franca", "Tinta Roriz", "Tinta Negra", "Sercial", "Verdelho", "Bual", "Malmsey"],
    keyRegions: ["Marco de Jerez", "Valle del Douro/Oporto", "Madeira", "Marsala (Sicilia)", "Setúbal", "Rutherglen"],
    pairings: ["Finos: tapas, aceitunas, jamón, marisco", "Amontillados: setas, consomés, quesos curados", "Olorosos: estofados, caza", "PX: chocolate, helados, foie gras", "Oporto Tawny: frutos secos, postres de caramelo", "Madeira: postres, quesos azules"],
    agingPotential: "Finos: consumir jóvenes. Amontillados/Olorosos: décadas. Oporto Vintage: 50–100+ años. Madeira: prácticamente inmortal.",
    subtypes: [
      { name: "Fino / Manzanilla", slug: "fino-manzanilla", description: "Jerez seco, crianza biológica bajo velo de flor. Pálido, salino, almendrado." },
      { name: "Amontillado", slug: "amontillado", description: "Empieza como Fino, luego crianza oxidativa. Ámbar, seco, frutos secos." },
      { name: "Oloroso", slug: "oloroso", description: "Crianza oxidativa pura. Oscuro, potente, nueces, especias. Seco en origen." },
      { name: "Palo Cortado", slug: "palo-cortado", description: "El más misterioso: aroma de Amontillado, cuerpo de Oloroso." },
      { name: "Pedro Ximénez (PX)", slug: "pedro-ximenez", description: "Vino dulce de uvas pasificadas al sol. Denso, sirope, higos, chocolate." },
      { name: "Oporto Ruby", slug: "oporto-ruby", description: "Tinto dulce, crianza corta. Afrutado, intenso." },
      { name: "Oporto Tawny", slug: "oporto-tawny", description: "Crianza oxidativa en barricas pequeñas. Ámbar, frutos secos, caramelo." },
      { name: "Oporto Vintage", slug: "oporto-vintage", description: "De una sola añada excepcional. Gran capacidad de guarda (50+ años)." },
      { name: "Madeira", slug: "madeira", description: "Fortificado de la isla de Madeira. Prácticamente inmortal." },
      { name: "Marsala", slug: "marsala", description: "Fortificado siciliano. Desde seco a dulce. Usado también en cocina (salsa Marsala)." },
      { name: "Moscatel de Setúbal", slug: "moscatel-de-setubal", description: "Fortificado portugués de uva Moscatel. Dulce, aromático, floral." },
    ],
    relatedStyles: ["dulce", "tinto"],
    clientRecognition: "medio",
    cartaRole: ["diferencial", "premium", "descubrimiento"],
    cartaCommunication: "Los generosos son uno de los secretos mejor guardados de la restauración. Un Fino bien servido y explicado genera un 'momento wow'. En carta, posicionarlos como experiencia los eleva de categoría.",
    clientProfile: "Clientes exploradores, gourmets, aficionados a la gastronomía clásica. Los Finos conectan con turismo gastronómico en España.",
    sellByStrategy: "Por subtipo (Fino, Amontillado, Tawny) más que por variedad. La marca de la región (Jerez, Oporto) es el eje.",
    whenSafe: "Fino o Manzanilla como aperitivo. PX con postre. Son opciones seguras dentro del nicho.",
    whenDifferential: "Amontillado, Palo Cortado, Tawny 20 años.",
    whenPremium: "Oporto Vintage, Amontillados viejos, VOS/VORS de Jerez, Madeira centenaria.",
    competingStyles: ["Espumoso (como aperitivo)", "Vino dulce natural"],
    bestConcepts: ["Tapas bar", "Restaurante andaluz", "Fine dining", "Marisquería", "Hotel con F&B premium"],
    faqs: [
      { q: "¿Un Fino y una Manzanilla son lo mismo?", a: "Muy parecidos. Ambos son Jereces secos con crianza biológica, pero la Manzanilla se elabora exclusivamente en Sanlúcar de Barrameda, lo que le da un carácter más salino." },
      { q: "¿Cuánto dura un Fino abierto?", a: "Poco. Idealmente 1–3 días en nevera. Es un vino vivo que pierde frescura rápidamente al abrir." },
    ],
    seo: {
      title: "Vinos Generosos y Fortificados: Jerez, Oporto, Madeira | Winerim",
      description: "Guía completa de vinos generosos: Fino, Amontillado, Oloroso, Oporto y Madeira. Elaboración, subtipos, maridajes y criterio para hostelería.",
    },
  },
  {
    id: "dulce",
    slug: "dulce-natural",
    name: "Vino Dulce Natural",
    family: "dulce",
    description: "Vinos con azúcar residual significativo, obtenido por métodos que concentran los azúcares naturales de la uva.",
    intro: "Desde vinos de vendimia tardía hasta los legendarios vinos de hielo y botrytizados, los dulces naturales representan la cima de la enología en concentración, elegancia y capacidad de guarda.",
    elaboration: "Métodos de concentración: (1) Vendimia tardía: uvas sobremaduradas en viña. (2) Botrytis cinerea: hongo que deshidrata la uva. (3) Pasificación: secado en esteras. (4) Eiswein: vendimia con uvas congeladas a -7°C. (5) Mutage: adición de alcohol para detener fermentación (VDN).",
    body: "alto",
    acidity: "alta",
    fruitIntensity: "alta",
    woodPresence: "sutil",
    complexity: "muy-complejo",
    servingTemp: "6–10 °C",
    glassRecommendation: "Copa pequeña de vino dulce o copa de postre.",
    mainGrapes: ["Sémillon", "Sauvignon Blanc", "Riesling", "Furmint", "Hárslevelű", "Moscatel/Muscat", "Gewürztraminer", "Chenin Blanc", "Garganega", "Corvina"],
    keyRegions: ["Sauternes/Barsac", "Tokaj", "Mosela/Rheingau", "Alsacia", "Niágara (Canadá)", "Valpolicella", "Pantelleria", "Banyuls"],
    pairings: ["Foie gras", "Quesos azules (Roquefort, Stilton)", "Postres de frutas", "Tartas de manzana", "Crème brûlée", "Chocolate blanco"],
    agingPotential: "Los mejores Sauternes, Tokaji y Eiswein pueden evolucionar 50–100+ años.",
    subtypes: [
      { name: "Sauternes / Botrytizados", slug: "sauternes-botrytizados", description: "Podredumbre noble. Miel, albaricoque, azafrán." },
      { name: "Vendimia tardía", slug: "vendimia-tardia", description: "Uvas sobremaduradas. Más sencillo que botrytizado." },
      { name: "Vino de hielo (Eiswein)", slug: "eiswein", description: "Vendimia con uvas congeladas. Acidez brillante + dulzor concentrado." },
      { name: "Passito / Vino de pasas", slug: "passito", description: "Uvas secadas al sol. Ej: Amarone (seco), Recioto (dulce), Vin Santo." },
      { name: "VDN (Vin Doux Naturel)", slug: "vdn", description: "Mutage con alcohol. Ej: Banyuls, Maury, Rivesaltes." },
      { name: "Moscatel dulce", slug: "moscatel-dulce", description: "Vinos dulces aromáticos de uva Moscatel." },
      { name: "Tokaji Aszú", slug: "tokaji-aszu", description: "Legendario vino húngaro. Patrimonio vinícola mundial." },
    ],
    relatedStyles: ["generoso", "blanco"],
    clientRecognition: "medio",
    cartaRole: ["premium", "descubrimiento"],
    cartaCommunication: "El dulce natural es un cierre perfecto de experiencia gastronómica. En carta, posicionarlo como 'maridaje de postre' o 'copa para cerrar' es más efectivo que listarlo aparte.",
    clientProfile: "Gourmets, parejas en celebración, clientes de menú degustación. Poco conocido por el gran público, pero genera impacto alto cuando se recomienda bien.",
    sellByStrategy: "Por estilo (botrytizado, vendimia tardía, ice wine) más que por variedad. La historia del proceso es el mejor argumento de venta.",
    whenSafe: "Un Moscato d'Asti o una vendimia tardía son opciones accesibles y seguras.",
    whenDifferential: "Sauternes, Tokaji Aszú, Eiswein.",
    whenPremium: "Château d'Yquem, Tokaji Essencia, TBA alemana.",
    competingStyles: ["Pedro Ximénez (generoso)", "Postre sin vino"],
    bestConcepts: ["Fine dining", "Menú degustación", "Restaurante gastronómico", "Hotel F&B", "Cocina francesa"],
    faqs: [
      { q: "¿Qué es la podredumbre noble?", a: "La Botrytis cinerea es un hongo que, en condiciones ideales, deshidrata la uva sin pudrirla, concentrando azúcares, acidez y sabores. Es la base de Sauternes y Tokaji." },
      { q: "¿El vino dulce natural tiene alcohol añadido?", a: "No necesariamente. Los dulces naturales concentran azúcar sin añadir alcohol (a diferencia de los generosos). La excepción son los VDN franceses." },
    ],
    seo: {
      title: "Vinos Dulces Naturales: Sauternes, Tokaji, Eiswein | Winerim",
      description: "Guía completa de vinos dulces naturales: botrytizados, vendimia tardía, vinos de hielo, passito. Elaboración, maridajes y criterio para hostelería.",
    },
  },
  {
    id: "naranja",
    slug: "orange-wine",
    name: "Vino Naranja (Orange Wine)",
    family: "naranja",
    description: "Vino blanco elaborado con maceración de hollejos, como si fuera un tinto. Color ámbar/anaranjado, taninos y complejidad textural única.",
    intro: "El vino naranja es un estilo ancestral redescubierto. Con raíces en Georgia (8.000 años de historia), hoy es tendencia global. Se elabora fermentando uvas blancas en contacto prolongado con sus pieles, lo que otorga color ámbar, taninos y una complejidad extraordinaria.",
    elaboration: "Uvas blancas se fermentan en contacto con sus hollejos durante días, semanas o meses (skin-contact). Tradicionalmente en ánforas de barro (qvevri en Georgia, tinajas en España). Muchos productores siguen filosofía natural: levaduras autóctonas, sin filtrar, mínimo sulfito.",
    body: "medio",
    acidity: "media",
    fruitIntensity: "media",
    woodPresence: "ninguna",
    complexity: "complejo",
    servingTemp: "12–14 °C",
    glassRecommendation: "Copa de vino tinto (para apreciar complejidad aromática y taninos).",
    mainGrapes: ["Rkatsiteli", "Mtsvane", "Ribolla Gialla", "Pinot Grigio", "Friulano", "Malvasía", "Garnacha Blanca", "Macabeo"],
    keyRegions: ["Kakheti (Georgia)", "Friuli-Venezia Giulia", "Eslovenia (Brda)", "Jura (Francia)", "Catalunya", "Austria (Estiria)"],
    pairings: ["Cocina asiática (curry, thai, coreana)", "Platos especiados", "Tajines", "Quesos de corteza lavada", "Charcutería", "Verduras asadas", "Cocina turca y libanesa"],
    agingPotential: "Los mejores pueden evolucionar 5–15 años. Maceración corta: consumir en 2–3 años.",
    subtypes: [
      { name: "Orange wine maceración corta", slug: "orange-maceracion-corta", description: "3–7 días. Color dorado pálido, estructura ligera. Más accesible." },
      { name: "Orange wine maceración larga", slug: "orange-maceracion-larga", description: "Semanas o meses. Color ámbar intenso, taninos marcados." },
      { name: "Vino de ánfora (Qvevri wine)", slug: "qvevri-wine", description: "Fermentación en ánforas de barro enterradas. Tradición georgiana de 8.000 años. Patrimonio UNESCO." },
      { name: "Vino de tinaja", slug: "vino-tinaja", description: "Versión española/mediterránea. Fermentación en tinajas de barro." },
    ],
    relatedStyles: ["blanco", "eco"],
    clientRecognition: "bajo",
    cartaRole: ["diferencial", "tendencia", "descubrimiento"],
    cartaCommunication: "El orange wine genera conversación y curiosidad. En carta, una breve explicación ('blanco con maceración, como un tinto') ayuda al comensal a entender y atreverse.",
    clientProfile: "Foodies, millennials exploradores, clientes de cocina asiática o fusión. Nicho pero en crecimiento.",
    sellByStrategy: "Por estilo ('orange wine' o 'vino naranja') más que por variedad o región. La historia del proceso es el gancho.",
    whenSafe: "Nunca es la opción más segura, pero una maceración corta es más accesible.",
    whenDifferential: "Siempre. El orange wine es diferenciación pura.",
    whenPremium: "Gravner, Radikon, qvevris georgianos de calidad.",
    competingStyles: ["Blanco con barrica", "Rosado con estructura"],
    bestConcepts: ["Cocina asiática", "Restaurante natural/km0", "Wine bar contemporáneo", "Cocina de fusión", "Gastrobar de autor"],
    faqs: [
      { q: "¿Un orange wine es un vino naranja de sabor?", a: "No. Es un vino blanco elaborado con maceración de hollejos (como un tinto). El color ámbar/naranja proviene de las pieles de las uvas blancas." },
      { q: "¿Un orange wine es un vino natural?", a: "No necesariamente, aunque muchos productores de orange wine siguen filosofía de mínima intervención. El orange wine es un método de elaboración, no una filosofía." },
    ],
    seo: {
      title: "Orange Wine / Vino Naranja: Qué Es, Cómo Se Hace y Maridajes | Winerim",
      description: "Guía completa del orange wine: elaboración, subtipos, uvas, regiones destacadas y maridajes. Tendencia y diferenciación para hostelería.",
    },
  },
  {
    id: "eco",
    slug: "ecologico-biodinamico-natural",
    name: "Vino Ecológico, Biodinámico y Natural",
    family: "eco",
    description: "Tres filosofías de viticultura y vinificación que comparten el respeto por el medio ambiente pero difieren en sus reglas y certificaciones.",
    intro: "Ecológico, biodinámico y natural representan una tendencia creciente que redefine el mundo del vino. Comparten el respeto por el terroir y la mínima intervención, pero con diferencias significativas en método y certificación.",
    elaboration: "Ecológico: viticultura sin pesticidas de síntesis, certificación EU/USDA. Biodinámico: principios de Rudolf Steiner, calendario lunar, preparados homeopáticos, certificación Demeter. Natural: mínima intervención en bodega, sin aditivos, levaduras autóctonas, sin filtrar. No existe certificación oficial universal para vino natural.",
    body: "medio",
    acidity: "media",
    fruitIntensity: "media",
    woodPresence: "sutil",
    complexity: "complejo",
    servingTemp: "Según el estilo base",
    glassRecommendation: "Según el estilo base del vino.",
    mainGrapes: ["Cualquier variedad — muchos productores rescatan autóctonas olvidadas"],
    keyRegions: ["Loira", "Jura", "Beaujolais", "Cataluña", "Georgia", "Eslovenia", "Friuli", "Sicilia", "Austria", "Oregon"],
    pairings: ["Cocina ecológica", "Productos de proximidad", "Cocina de mercado"],
    agingPotential: "Variable. Algunos naturales sin sulfitos son para consumo inmediato. Los biodinámicos de calidad pueden tener excelente capacidad de guarda.",
    subtypes: [
      { name: "Vino ecológico certificado", slug: "ecologico-certificado", description: "Viña ecológica + vinificación con restricciones. Certificado EU o USDA." },
      { name: "Vino biodinámico", slug: "biodinamico", description: "Filosofía holística: preparados biodinámicos, calendario lunar. Demeter/Biodyvin." },
      { name: "Vino natural (vin naturel)", slug: "vino-natural", description: "Mínima intervención. Sin sulfitos añadidos (o mínimos). Estilo polarizante pero en auge." },
      { name: "Vino en ánfora / ancestral", slug: "vino-anfora", description: "Recupera técnicas milenarias. Cruce con orange wine." },
    ],
    relatedStyles: ["naranja", "tinto", "blanco"],
    clientRecognition: "medio",
    cartaRole: ["tendencia", "diferencial", "descubrimiento"],
    cartaCommunication: "Etiquetar 'ecológico' o 'biodinámico' en carta genera percepción de calidad y compromiso. El 'natural' atrae a un público específico. Conviene explicar brevemente la diferencia.",
    clientProfile: "Millennials y Gen Z, clientes concienciados, foodies, público de restaurantes km0 y de producto.",
    sellByStrategy: "Por filosofía (eco, bio, natural) como capa adicional al estilo base. Funciona bien como sección diferenciada en carta o como etiqueta junto a cada vino.",
    whenSafe: "Un ecológico certificado de denominación conocida es seguro y valorado.",
    whenDifferential: "Biodinámicos de autor, naturales con identidad.",
    whenPremium: "Domaine Leroy, Zind-Humbrecht, Álvaro Palacios (bio), naturales de culto.",
    competingStyles: ["Versiones convencionales de los mismos estilos"],
    bestConcepts: ["Restaurante km0", "Cocina de producto", "Wine bar natural", "Gastrobar contemporáneo", "Hotel wellness"],
    faqs: [
      { q: "¿Qué diferencia hay entre ecológico, biodinámico y natural?", a: "Ecológico: certificación oficial, sin pesticidas de síntesis. Biodinámico: filosofía holística (Steiner), certificación Demeter. Natural: mínima intervención sin certificación oficial." },
      { q: "¿Un vino natural puede ser malo?", a: "Como cualquier vino. El mínimo uso de sulfitos hace que algunos naturales sean inestables o desarrollen defectos. Los buenos son extraordinarios; los malos, difíciles de beber." },
    ],
    seo: {
      title: "Vino Ecológico, Biodinámico y Natural: Diferencias y Guía | Winerim",
      description: "Guía completa: diferencias entre vino ecológico, biodinámico y natural. Certificaciones, elaboración, regiones y criterio para hostelería.",
    },
  },
];

// ═══════════════════════════════════════════════════════════════
// CATALOG — All subtypes as lightweight entries
// ═══════════════════════════════════════════════════════════════

export const styleCatalog: StyleCatalogEntry[] = [
  // Generate from all subtypes across families
  ...styleEntries.flatMap(entry =>
    entry.subtypes.map(sub => ({
      slug: sub.slug,
      name: sub.name,
      family: entry.family,
      description: sub.description,
      servingTemp: entry.servingTemp,
      mainGrapes: entry.mainGrapes.slice(0, 5),
      keyRegions: entry.keyRegions.slice(0, 5),
    }))
  ),
];

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

export const getStyleBySlug = (slug: string): StyleEntry | undefined =>
  styleEntries.find(e => e.slug === slug);

export const getStyleCatalogEntry = (slug: string): StyleCatalogEntry | undefined =>
  styleCatalog.find(e => e.slug === slug);

export const getStylesByFamily = (family: StyleFamily): StyleEntry[] =>
  styleEntries.filter(e => e.family === family);

export const getAllStyles = (): (StyleEntry | StyleCatalogEntry)[] => {
  const fullSlugs = new Set(styleEntries.map(e => e.slug));
  return [
    ...styleEntries,
    ...styleCatalog.filter(c => !fullSlugs.has(c.slug)),
  ];
};
