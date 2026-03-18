// ─── Wine Regions & Denominations Data Model ───────────────────────────

export type DenominationType =
  | "DOCa" | "DO" | "AOP" | "AVA" | "IGP" | "PDO" | "GI" | "DOCG" | "DOC" | "DOQ"
  | "Grand Cru" | "Premier Cru" | "Cru" | "Zone" | "Subzona"
  | "VP" | "IGT" | "VR" | "DAC" | "AOC" | "State" | "Region";

export type PrestigeLevel = "icónico" | "premium" | "reconocido" | "emergente" | "local";
export type ClientRecognition = "muy-alto" | "alto" | "medio" | "bajo" | "nicho";
export type CartaRole = "segura" | "diferencial" | "premium" | "identitaria" | "prestigio" | "descubrimiento" | "valor";
export type WineType = "tinto" | "blanco" | "rosado" | "espumoso" | "dulce" | "generoso" | "naranja";

// ─── Region Entry (individual denomination / region) ───────────────────
export interface RegionEntry {
  id: string;
  slug: string;
  name: string;
  altNames?: string[];
  country: string;        // slug of parent country
  parentRegion?: string;  // slug of parent region/zone
  denominationType: DenominationType;
  subzones?: string[];
  bodegasCount?: number;
  wineTypes: WineType[];
  mainGrapes: string[];
  styles: string[];
  prestige: PrestigeLevel;
  clientRecognition: ClientRecognition;
  description: string;
  intro: string;
  // Winerim unique layer
  cartaRole: CartaRole[];
  cartaReading: string;      // "Qué comunica esta región en una carta"
  whenToHighlight: string;   // "Cuándo conviene destacarla"
  clientProfile: string;     // "Qué tipo de cliente la reconoce"
  sellByStrategy: string;    // "Si vende mejor por región, por uva o por storytelling"
  competingRegions: string[];
  commonMistakes: string[];
  pairings?: string[];
  faqs: { q: string; a: string }[];
  seo: {
    title: string;
    description: string;
  };
}

// ─── Country ────────────────────────────────────────────────────────────
export interface WineCountry {
  slug: string;
  name: string;
  nameEn: string;
  flag: string;
  denominationsCount: number;
  bodegasCount: number;
  denominationTypes: string;
  intro: string;
  classificationExplainer: string;
  mainZones: string[];     // slugs of top zones
  topRegions: string[];    // slugs of most recognized regions
  differentialRegions: string[]; // slugs of emerging/differential
  howToReadInCarta: string;
  faqs: { q: string; a: string }[];
  seo: {
    title: string;
    description: string;
  };
}

// ═══════════════════════════════════════════════════════════════════════
// SEED DATA — Countries
// ═══════════════════════════════════════════════════════════════════════

export const wineCountries: WineCountry[] = [
  {
    slug: "espana",
    name: "España",
    nameEn: "Spain",
    flag: "🇪🇸",
    denominationsCount: 526,
    bodegasCount: 18742,
    denominationTypes: "2 DOCa, 69 DO, 46 IGP, 18 VP",
    intro: "España es el país con mayor superficie de viñedo del mundo y uno de los más diversos en denominaciones de origen. Desde los tintos estructurados de Rioja y Ribera del Duero hasta los blancos minerales de Rías Baixas y los generosos de Jerez, España ofrece un abanico enorme de estilos y regiones que cubren todos los segmentos de carta.",
    classificationExplainer: "El sistema español distingue DOCa (máximo nivel, solo Rioja y Priorat), DO (Denominación de Origen), VP (Vino de Pago, fincas individuales), IGP (Indicación Geográfica Protegida) y Vino de España (sin indicación geográfica).",
    mainZones: ["rioja", "ribera-del-duero", "priorat", "rias-baixas", "jerez", "penedes", "rueda", "toro", "navarra", "somontano"],
    topRegions: ["rioja", "ribera-del-duero", "priorat", "rias-baixas", "jerez"],
    differentialRegions: ["bierzo", "gredos", "txakoli", "jumilla", "calatayud"],
    howToReadInCarta: "España funciona como un país de alta confianza en carta. Rioja es la apuesta segura por excelencia, mientras que denominaciones como Priorat o Ribera del Duero aportan prestigio. Incluir regiones emergentes como Bierzo o Gredos comunica criterio y actualidad.",
    faqs: [
      { q: "¿Cuántas denominaciones de origen tiene España?", a: "España cuenta con más de 90 denominaciones de origen, incluyendo 2 DOCa (Rioja y Priorat), 69 DO, 18 Vinos de Pago y 46 IGP." },
      { q: "¿Cuál es la diferencia entre DOCa y DO?", a: "DOCa (Denominación de Origen Calificada) es el máximo nivel de clasificación, que exige requisitos más estrictos de calidad y trazabilidad. Solo Rioja y Priorat tienen esta categoría." },
      { q: "¿Qué denominaciones españolas son más reconocidas en hostelería?", a: "Rioja, Ribera del Duero, Albariño (Rías Baixas) y Priorat son las más reconocidas por el comensal medio. Jerez tiene alta reputación pero menor rotación en carta convencional." },
    ],
    seo: {
      title: "Regiones vinícolas de España | Denominaciones de Origen",
      description: "Guía completa de las regiones vinícolas y denominaciones de origen de España. DOCa, DO, IGP, VP: toda la información para hostelería, con criterio Winerim.",
    },
  },
  {
    slug: "francia",
    name: "Francia",
    nameEn: "France",
    flag: "🇫🇷",
    denominationsCount: 1387,
    bodegasCount: 36388,
    denominationTypes: "632 AOP, 443 Premier Cru, 183 IGP, 117 Grand Cru, 12 Zone",
    intro: "Francia es la referencia mundial del vino. Con un sistema de clasificación basado en el terroir que lleva siglos de perfeccionamiento, sus regiones han definido los estándares de calidad que sigue el resto del mundo. Borgoña, Burdeos, Champagne, el Valle del Ródano y el Valle del Loira son pilares de cualquier carta de vinos seria.",
    classificationExplainer: "Francia clasifica sus vinos en AOP (Appellation d'Origine Protégée), con niveles adicionales de Grand Cru y Premier Cru en regiones como Borgoña y Alsacia. Las IGP ofrecen vinos de calidad con mayor flexibilidad. Las Zones representan grandes áreas geográficas.",
    mainZones: ["bordeaux", "bourgogne", "champagne", "vallee-du-rhone", "val-de-loire", "alsace", "languedoc-roussillon", "provence-corse"],
    topRegions: ["bordeaux", "bourgogne", "champagne", "vallee-du-rhone"],
    differentialRegions: ["jura-savoie", "beaujolais", "sud-ouest", "languedoc-roussillon"],
    howToReadInCarta: "Francia transmite prestigio inmediato. Borgoña y Burdeos funcionan como ancla premium en cualquier carta. Champagne es sinónimo de celebración. El Ródano aporta potencia accesible. Incluir Jura o Beaujolais cru comunica tendencia y conocimiento.",
    faqs: [
      { q: "¿Cuántas denominaciones tiene Francia?", a: "Francia tiene más de 1.380 denominaciones registradas en el sistema Winerim, incluyendo 632 AOP, 443 Premier Cru y 117 Grand Cru." },
      { q: "¿Qué diferencia hay entre AOP, Grand Cru y Premier Cru?", a: "AOP es la denominación base. Premier Cru y Grand Cru son clasificaciones superiores dentro de ciertas denominaciones, especialmente en Borgoña y Alsacia, que indican parcelas de máxima calidad reconocida." },
      { q: "¿Qué región francesa funciona mejor en carta de restaurante español?", a: "Burdeos y Borgoña tienen reconocimiento universal. Champagne es imprescindible. El Valle del Ródano ofrece excelente relación calidad-precio para tintos con cuerpo." },
    ],
    seo: {
      title: "Regiones vinícolas de Francia | AOP, Grand Cru, Premier Cru",
      description: "Guía completa de las regiones vinícolas francesas: Burdeos, Borgoña, Champagne, Ródano y más. Denominaciones, clasificaciones y su papel en hostelería.",
    },
  },
  {
    slug: "italia",
    name: "Italia",
    nameEn: "Italy",
    flag: "🇮🇹",
    denominationsCount: 688,
    bodegasCount: 17632,
    denominationTypes: "76 DOCG, 332 DOC, 118 IGT, Regione, Zone",
    intro: "Italia es el mayor productor de vino del mundo y el país con más diversidad de variedades autóctonas. Cada región, de Piamonte a Sicilia, tiene una identidad vinícola propia que refleja siglos de tradición local. Italia aporta a cualquier carta una profundidad y variedad que ningún otro país puede igualar.",
    classificationExplainer: "Italia utiliza DOCG (máxima calidad garantizada), DOC (Denominación de Origen Controlada) e IGT (Indicación Geográfica Típica, que permite mayor creatividad enológica, como los Super Toscanos).",
    mainZones: ["piemonte", "toscana", "veneto", "sicilia", "puglia", "trentino-alto-adige", "friuli-venezia-giulia", "campania", "sardegna"],
    topRegions: ["piemonte", "toscana", "veneto"],
    differentialRegions: ["sicilia", "campania", "etna", "friuli-venezia-giulia", "sardegna"],
    howToReadInCarta: "Italia comunica autenticidad y variedad. Barolo y Brunello anclan el segmento premium. Chianti aporta familiaridad. Prosecco cubre espumosos accesibles. Incluir Etna, Campania o Friuli muestra ambición y criterio.",
    faqs: [
      { q: "¿Cuántas denominaciones tiene Italia?", a: "Italia cuenta con más de 680 denominaciones, incluyendo 76 DOCG, 332 DOC y 118 IGT registradas en el sistema Winerim." },
      { q: "¿Qué es un Super Toscano?", a: "Los Super Toscanos son vinos que se elaboran fuera de las normas de las DOC tradicionales, usando variedades internacionales o técnicas innovadoras. Se clasifican como IGT pero alcanzan precios premium." },
      { q: "¿Cuáles son las regiones italianas imprescindibles en carta?", a: "Piamonte (Barolo, Barbaresco), Toscana (Chianti, Brunello, Bolgheri) y Veneto (Amarone, Valpolicella, Prosecco) cubren el núcleo. Sicilia y Campania aportan diferenciación." },
    ],
    seo: {
      title: "Regiones vinícolas de Italia | DOCG, DOC, IGT",
      description: "Guía completa de las regiones vinícolas italianas: Piamonte, Toscana, Veneto, Sicilia y más. Denominaciones, clasificaciones y su papel en hostelería.",
    },
  },
  {
    slug: "portugal",
    name: "Portugal",
    nameEn: "Portugal",
    flag: "🇵🇹",
    denominationsCount: 85,
    bodegasCount: 4321,
    denominationTypes: "31 DOC, 14 IGP, Região",
    intro: "Portugal es uno de los países vinícolas más interesantes y con mejor relación calidad-precio del mundo. Con variedades autóctonas únicas y una tradición que va del Oporto al Vinho Verde, Portugal ofrece vinos con personalidad que cada vez tienen más espacio en las cartas de restaurantes internacionales.",
    classificationExplainer: "Portugal utiliza DOC (Denominação de Origem Controlada) e IGP (Indicação Geográfica Protegida). Las Regiões vinícolas principales son Douro, Alentejo, Dão, Bairrada y Vinho Verde.",
    mainZones: ["douro", "alentejo", "vinho-verde", "dao", "bairrada", "lisboa"],
    topRegions: ["douro", "alentejo", "vinho-verde"],
    differentialRegions: ["dao", "bairrada", "madeira"],
    howToReadInCarta: "Portugal es una oportunidad estratégica en carta: alta calidad, precios competitivos y cada vez más reconocimiento del comensal. Douro ancla tintos de carácter, Vinho Verde cubre blancos frescos y Alentejo ofrece tintos accesibles y potentes.",
    faqs: [
      { q: "¿Por qué Portugal es interesante para una carta de vinos?", a: "Ofrece una relación calidad-precio excepcional, variedades autóctonas únicas y un reconocimiento creciente por parte del comensal." },
      { q: "¿Qué regiones portuguesas incluir en carta?", a: "Douro para tintos premium, Alentejo para tintos accesibles, Vinho Verde para blancos frescos y Dão para tintos elegantes con buena acidez." },
    ],
    seo: {
      title: "Regiones vinícolas de Portugal | DOC y denominaciones",
      description: "Guía completa de las regiones vinícolas de Portugal: Douro, Alentejo, Vinho Verde y más. Denominaciones y su papel en hostelería.",
    },
  },
  {
    slug: "estados-unidos",
    name: "Estados Unidos",
    nameEn: "United States",
    flag: "🇺🇸",
    denominationsCount: 267,
    bodegasCount: 5847,
    denominationTypes: "267 AVA, State",
    intro: "Estados Unidos es el cuarto productor mundial de vino, con California como motor principal. Napa Valley se ha consolidado como una de las regiones más prestigiosas del mundo para Cabernet Sauvignon, mientras que Oregón y Washington ofrecen Pinot Noir y Syrah de clase mundial.",
    classificationExplainer: "El sistema americano se basa en AVA (American Viticultural Areas), que definen zonas geográficas reconocidas por sus condiciones únicas de suelo y clima, sin imponer restricciones de variedades ni métodos.",
    mainZones: ["napa-valley", "sonoma", "oregon", "washington", "central-coast"],
    topRegions: ["napa-valley", "sonoma"],
    differentialRegions: ["oregon", "washington", "finger-lakes"],
    howToReadInCarta: "Napa Valley es la referencia premium americana y compite directamente con Burdeos en percepción. Sonoma aporta diversidad a menor coste. Oregon posiciona como alternativa elegante para Pinot Noir. Washington sorprende por calidad-precio.",
    faqs: [
      { q: "¿Cuántas AVA tiene Estados Unidos?", a: "Estados Unidos tiene más de 260 AVA reconocidas, con la mayor concentración en California (más de 140)." },
      { q: "¿Qué vinos americanos funcionan en carta de restaurante europeo?", a: "Napa Cabernet es la apuesta segura para premium. Oregon Pinot Noir atrae al comensal curioso. Sonoma Chardonnay cubre el segmento de blancos con cuerpo." },
    ],
    seo: {
      title: "Regiones vinícolas de Estados Unidos | AVA y denominaciones",
      description: "Guía completa de las regiones vinícolas de EE.UU.: Napa Valley, Sonoma, Oregón y más. AVA, clasificaciones y su papel en hostelería.",
    },
  },
  {
    slug: "alemania",
    name: "Alemania",
    nameEn: "Germany",
    flag: "🇩🇪",
    denominationsCount: 92,
    bodegasCount: 2145,
    denominationTypes: "13 Anbaugebiet, 39 Bereich, Großlage, Einzellage",
    intro: "Alemania es el reino del Riesling, una variedad que alcanza aquí su máxima expresión. Desde los secos y minerales de Mosel hasta los dulces de Rheingau, Alemania ofrece una gama única de vinos blancos que pueden aportar una dimensión muy especial a cualquier carta.",
    classificationExplainer: "El sistema alemán distingue Qualitätswein (vino de calidad), Prädikatswein (con niveles de madurez: Kabinett, Spätlese, Auslese, Beerenauslese, Trockenbeerenauslese, Eiswein), y VDP con sus clasificaciones de parcela (Große Lage, Erste Lage).",
    mainZones: ["mosel", "rheingau", "pfalz", "rheinhessen", "baden", "franken"],
    topRegions: ["mosel", "rheingau"],
    differentialRegions: ["pfalz", "baden", "franken"],
    howToReadInCarta: "Alemania = Riesling en la mente del comensal. Funciona muy bien en cartas que buscan diferenciación en blancos. Un Riesling Kabinett o Spätlese aporta una experiencia que ninguna otra región puede ofrecer.",
    faqs: [
      { q: "¿Los vinos alemanes son siempre dulces?", a: "No. La tendencia actual es claramente hacia los Riesling secos (Trocken). Alemania produce también excelentes tintos de Spätburgunder (Pinot Noir)." },
      { q: "¿Cómo leer una etiqueta alemana?", a: "Lo clave es entender los niveles de Prädikat (Kabinett, Spätlese, Auslese...) que indican el grado de madurez de la uva, y si dice 'Trocken' (seco) o no." },
    ],
    seo: {
      title: "Regiones vinícolas de Alemania | Riesling y más",
      description: "Guía completa de las regiones vinícolas alemanas: Mosel, Rheingau, Pfalz y más. Clasificaciones y su papel en hostelería.",
    },
  },
  {
    slug: "argentina",
    name: "Argentina",
    nameEn: "Argentina",
    flag: "🇦🇷",
    denominationsCount: 42,
    bodegasCount: 2987,
    denominationTypes: "DOC, IG, Región",
    intro: "Argentina es sinónimo de Malbec, pero su diversidad vinícola va mucho más allá. Desde los viñedos de altura de Mendoza hasta los Torrontés aromáticos de Salta, Argentina produce vinos con una personalidad que refleja su geografía única entre los Andes y la Patagonia.",
    classificationExplainer: "Argentina utiliza DOC (solo para Luján de Cuyo y San Rafael), IG (Indicación Geográfica) y denominaciones regionales. La altitud es un factor diferenciador único.",
    mainZones: ["mendoza", "salta", "patagonia", "san-juan"],
    topRegions: ["mendoza"],
    differentialRegions: ["salta", "patagonia", "uco-valley"],
    howToReadInCarta: "Malbec argentino es una referencia universal para tintos accesibles y potentes. Mendoza ancla el segmento. Incluir Valle de Uco eleva la percepción. Patagonia comunica exclusividad.",
    faqs: [
      { q: "¿Argentina solo produce Malbec?", a: "No. Argentina produce excelentes Cabernet Sauvignon, Bonarda, Torrontés (blanco aromático único) y cada vez más tintos de altura con Cabernet Franc." },
    ],
    seo: {
      title: "Regiones vinícolas de Argentina | Malbec y más",
      description: "Guía completa de las regiones vinícolas argentinas: Mendoza, Salta, Patagonia. Denominaciones y su papel en hostelería.",
    },
  },
  {
    slug: "chile",
    name: "Chile",
    nameEn: "Chile",
    flag: "🇨🇱",
    denominationsCount: 38,
    bodegasCount: 1876,
    denominationTypes: "DO, IG, Valle",
    intro: "Chile es uno de los productores de vino con mejor relación calidad-precio del mundo. Su geografía privilegiada, entre los Andes, el Pacífico y el desierto de Atacama, crea condiciones únicas. El Carménère, variedad prácticamente exclusiva de Chile, es su gran seña de identidad.",
    classificationExplainer: "Chile clasifica sus vinos por Valle (zona geográfica), con denominaciones como Costa, Entre Cordilleras y Andes según la ubicación.",
    mainZones: ["maipo", "colchagua", "casablanca", "aconcagua", "bio-bio"],
    topRegions: ["maipo", "colchagua", "casablanca"],
    differentialRegions: ["itata", "malleco", "limari"],
    howToReadInCarta: "Chile funciona como vino fiable y accesible en carta. Maipo Cabernet es la apuesta segura. Casablanca cubre blancos frescos. Incluir valles emergentes como Itata o Malleco muestra conocimiento y aporta diferenciación.",
    faqs: [
      { q: "¿Qué tiene de especial el Carménère?", a: "El Carménère es una variedad tinta originaria de Burdeos que prácticamente desapareció en Europa y encontró su hogar ideal en Chile. Produce vinos con notas herbáceas, pimienta y fruta madura." },
    ],
    seo: {
      title: "Regiones vinícolas de Chile | Valles y denominaciones",
      description: "Guía completa de las regiones vinícolas chilenas: Maipo, Colchagua, Casablanca y más. Denominaciones y su papel en hostelería.",
    },
  },
  {
    slug: "australia",
    name: "Australia",
    nameEn: "Australia",
    flag: "🇦🇺",
    denominationsCount: 95,
    bodegasCount: 2134,
    denominationTypes: "65 GI, State, Zone",
    intro: "Australia ha revolucionado el mundo del vino con un enfoque moderno, innovador y orientado al mercado. Desde los potentes Shiraz de Barossa Valley hasta los elegantes Pinot Noir de Yarra Valley, Australia ofrece vinos que combinan carácter, técnica y accesibilidad.",
    classificationExplainer: "Australia utiliza GI (Geographical Indication), que define zonas vinícolas sin imponer restricciones de variedades. La clasificación Langton's es una referencia de mercado para los vinos de élite.",
    mainZones: ["barossa-valley", "mclaren-vale", "yarra-valley", "margaret-river", "hunter-valley", "adelaide-hills"],
    topRegions: ["barossa-valley", "margaret-river"],
    differentialRegions: ["yarra-valley", "adelaide-hills", "tasmania"],
    howToReadInCarta: "Australia = Shiraz/Syrah potente en la mente del comensal. Barossa ancla esa percepción. Margaret River compite con Burdeos en Cabernet. Incluir Yarra Valley o Tasmania posiciona hacia elegancia y modernidad.",
    faqs: [
      { q: "¿Australia solo produce Shiraz?", a: "No. Australia tiene una diversidad enorme: excelentes Cabernet (Margaret River), Pinot Noir (Yarra Valley, Tasmania), Riesling (Clare Valley, Eden Valley) y Chardonnay." },
    ],
    seo: {
      title: "Regiones vinícolas de Australia | GI y denominaciones",
      description: "Guía completa de las regiones vinícolas australianas: Barossa, Margaret River, Yarra Valley y más. Denominaciones y su papel en hostelería.",
    },
  },
  {
    slug: "nueva-zelanda",
    name: "Nueva Zelanda",
    nameEn: "New Zealand",
    flag: "🇳🇿",
    denominationsCount: 18,
    bodegasCount: 987,
    denominationTypes: "GI, Region",
    intro: "Nueva Zelanda ha conquistado el mundo con sus Sauvignon Blanc de Marlborough, pero ofrece mucho más. Central Otago produce Pinot Noir de clase mundial, y Hawke's Bay tiene excelentes tintos de variedades bordelesas.",
    classificationExplainer: "Nueva Zelanda utiliza GI (Geographical Indication) con regiones bien definidas pero sin restricciones estrictas de variedades.",
    mainZones: ["marlborough", "central-otago", "hawkes-bay", "martinborough"],
    topRegions: ["marlborough", "central-otago"],
    differentialRegions: ["hawkes-bay", "martinborough", "waipara"],
    howToReadInCarta: "Marlborough Sauvignon Blanc es casi un commodity premium: reconocimiento altísimo del comensal. Central Otago Pinot Noir aporta diferenciación. Hawke's Bay tintos sorprenden por calidad y precio.",
    faqs: [
      { q: "¿Todos los vinos neozelandeses son Sauvignon Blanc?", a: "No. Central Otago produce Pinot Noir de primerísimo nivel. Hawke's Bay tiene excelentes Syrah y Cabernet. Martinborough destaca también en Pinot Noir." },
    ],
    seo: {
      title: "Regiones vinícolas de Nueva Zelanda | Marlborough y más",
      description: "Guía completa de las regiones vinícolas neozelandesas: Marlborough, Central Otago, Hawke's Bay. Denominaciones y su papel en hostelería.",
    },
  },
  {
    slug: "austria",
    name: "Austria",
    nameEn: "Austria",
    flag: "🇦🇹",
    denominationsCount: 43,
    bodegasCount: 1245,
    denominationTypes: "DAC, Qualitätswein",
    intro: "Austria es una de las joyas ocultas del vino europeo. El Grüner Veltliner es su variedad insignia y produce blancos secos con una versatilidad gastronómica extraordinaria. Los Riesling de Wachau compiten con los mejores del mundo.",
    classificationExplainer: "Austria utiliza el sistema DAC (Districtus Austriae Controllatus) para sus denominaciones de origen. Wachau tiene su propia clasificación: Steinfeder (ligero), Federspiel (medio) y Smaragd (poderoso).",
    mainZones: ["wachau", "kamptal", "kremstal", "burgenland", "wien"],
    topRegions: ["wachau", "kamptal"],
    differentialRegions: ["burgenland", "wien", "sudsteiermark"],
    howToReadInCarta: "Austria comunica sofisticación y criterio. Grüner Veltliner funciona extraordinariamente bien con gastronomía y es una apuesta diferencial en carta. Wachau Riesling aporta prestigio real.",
    faqs: [
      { q: "¿Qué es el Grüner Veltliner?", a: "Es la variedad blanca más plantada en Austria. Produce vinos secos, aromáticos, con notas de pimienta blanca y lenteja, y una versatilidad con comida que la hace ideal para restaurantes." },
    ],
    seo: {
      title: "Regiones vinícolas de Austria | Grüner Veltliner y más",
      description: "Guía completa de las regiones vinícolas austriacas: Wachau, Kamptal, Kremstal. Denominaciones DAC y su papel en hostelería.",
    },
  },
  {
    slug: "sudafrica",
    name: "Sudáfrica",
    nameEn: "South Africa",
    flag: "🇿🇦",
    denominationsCount: 62,
    bodegasCount: 1654,
    denominationTypes: "WO (Wine of Origin), Ward, District",
    intro: "Sudáfrica combina tradición vinícola europea con un enfoque moderno y precios competitivos. Stellenbosch es la referencia para tintos de calidad, Swartland lidera la revolución de vinos naturales y de parcela, y Constantia tiene una historia de vinos dulces que se remonta a siglos.",
    classificationExplainer: "El sistema sudafricano WO (Wine of Origin) define Region, District y Ward con precisión creciente. La variedad Pinotage es exclusiva del país.",
    mainZones: ["stellenbosch", "swartland", "constantia", "franschhoek", "walker-bay", "elgin"],
    topRegions: ["stellenbosch", "constantia"],
    differentialRegions: ["swartland", "elgin", "walker-bay"],
    howToReadInCarta: "Sudáfrica es una oportunidad de carta: alta calidad, buenos precios y reconocimiento creciente. Stellenbosch ancla tintos. Incluir Swartland o Walker Bay comunica tendencia.",
    faqs: [
      { q: "¿Qué es el Pinotage?", a: "El Pinotage es un cruce de Pinot Noir y Cinsault creado en Sudáfrica en 1925. Produce tintos con carácter propio, desde accesibles y frutales hasta complejos y de guarda." },
    ],
    seo: {
      title: "Regiones vinícolas de Sudáfrica | Stellenbosch y más",
      description: "Guía completa de las regiones vinícolas sudafricanas: Stellenbosch, Swartland, Constantia. Denominaciones WO y su papel en hostelería.",
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════
// SEED DATA — Region Detail Entries (model entries)
// ═══════════════════════════════════════════════════════════════════════

export const regionEntries: RegionEntry[] = [
  {
    id: "rioja",
    slug: "rioja",
    name: "Rioja",
    altNames: ["La Rioja", "DOCa Rioja"],
    country: "espana",
    denominationType: "DOCa",
    subzones: ["Rioja Alta", "Rioja Alavesa", "Rioja Oriental"],
    bodegasCount: 1247,
    wineTypes: ["tinto", "blanco", "rosado", "espumoso"],
    mainGrapes: ["Tempranillo", "Garnacha", "Graciano", "Mazuelo", "Viura", "Malvasía"],
    styles: ["Joven afrutado", "Crianza clásica", "Reserva elegante", "Gran Reserva de guarda", "Blanco moderno fermentado en barrica"],
    prestige: "icónico",
    clientRecognition: "muy-alto",
    description: "La denominación de origen más prestigiosa de España, con más de un siglo de historia y una diversidad que va desde jóvenes frescos hasta Gran Reservas con décadas de evolución.",
    intro: "Rioja es sinónimo de vino español de calidad. Con sus tres subzonas — Rioja Alta (elegancia y altitud), Rioja Alavesa (finura atlántica) y Rioja Oriental (potencia mediterránea) — ofrece un abanico de estilos que cubre cualquier necesidad de carta. La nueva generación de viticultores está redefiniendo la región con vinos de pueblo, parcela y viñedo viejo que coexisten con los grandes clásicos de crianza.",
    cartaRole: ["segura", "premium", "identitaria"],
    cartaReading: "Rioja es la apuesta más segura de cualquier carta española. Comunica calidad, tradición y confianza. Un Reserva de Rioja rara vez falla: el comensal lo reconoce, lo entiende y lo pide con seguridad.",
    whenToHighlight: "Siempre. Es imprescindible en cualquier carta con presencia de vino español. Funciona en todos los segmentos: desde el joven para copa hasta el Gran Reserva como referencia premium.",
    clientProfile: "Desde el comensal casual hasta el entendido. Rioja tiene la capacidad única de ser reconocida por todos los perfiles de cliente.",
    sellByStrategy: "Vende igual de bien por región ('un Rioja') que por estilo ('un Crianza' o 'un Reserva'). La mención de la subzona (Rioja Alta, Alavesa) aporta un nivel adicional de sofisticación.",
    competingRegions: ["Ribera del Duero", "Navarra", "Toro"],
    commonMistakes: [
      "Asumir que todos los Rioja son iguales: las diferencias entre subzonas son enormes",
      "Limitar la carta a Crianza/Reserva/Gran Reserva sin explorar los nuevos vinos de pueblo y parcela",
      "No incluir blancos de Rioja, que están viviendo un momento excepcional",
    ],
    pairings: ["Cordero asado", "Chuletillas", "Jamón ibérico", "Quesos curados", "Patatas a la riojana"],
    faqs: [
      { q: "¿Cuáles son las diferencias entre las tres subzonas de Rioja?", a: "Rioja Alta produce vinos elegantes con buena acidez. Rioja Alavesa tiende a mayor finura y frescura (influencia atlántica). Rioja Oriental (antes Rioja Baja) da vinos más cálidos, potentes y generosos." },
      { q: "¿Un Crianza es mejor que un Joven?", a: "No necesariamente. Son estilos diferentes. Un joven de garnacha vieja puede ser más interesante que un crianza industrial. Lo importante es el productor y el concepto." },
      { q: "¿Cuántas bodegas hay en Rioja?", a: "Winerim tiene registradas más de 1.240 bodegas en la DOCa Rioja, lo que la convierte en una de las denominaciones con mayor densidad de productores del mundo." },
    ],
    seo: {
      title: "Rioja: Guía completa de la DOCa | Regiones, uvas, estilos",
      description: "Todo sobre la DOCa Rioja: subzonas, uvas, estilos de vino, rol en carta y criterio para hostelería. Guía Winerim con enfoque comercial.",
    },
  },
  {
    id: "bordeaux",
    slug: "bordeaux",
    name: "Burdeos",
    altNames: ["Bordeaux", "Bordelais"],
    country: "francia",
    denominationType: "Zone",
    subzones: ["Médoc", "Haut-Médoc", "Saint-Émilion", "Pomerol", "Graves", "Pessac-Léognan", "Sauternes", "Entre-deux-Mers", "Côtes de Bordeaux"],
    bodegasCount: 599,
    wineTypes: ["tinto", "blanco", "dulce", "rosado"],
    mainGrapes: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Sauvignon Blanc", "Sémillon"],
    styles: ["Tinto estructurado de guarda", "Tinto elegante de margen derecha", "Blanco seco mineral", "Dulce noble (Sauternes)", "Rosé fresco"],
    prestige: "icónico",
    clientRecognition: "muy-alto",
    description: "La región vinícola más famosa del mundo, hogar de los grandes châteaux y de un sistema de clasificación que lleva casi dos siglos.",
    intro: "Burdeos es el epicentro del vino mundial. Su sistema de clasificación de 1855, sus grandes châteaux y su influencia en la enología global lo convierten en referencia ineludible. Pero Burdeos es mucho más que Premiers Crus: hay cientos de productores que ofrecen vinos excepcionales a precios accesibles, especialmente en las Côtes y en Saint-Émilion satellite.",
    cartaRole: ["premium", "prestigio", "segura"],
    cartaReading: "Burdeos en carta comunica estatus, tradición y calidad. Un comensal que ve Burdeos sabe que está en un restaurante que toma el vino en serio. Incluso un Burdeos de entrada transmite más que muchos vinos de otras regiones.",
    whenToHighlight: "En cartas que buscan posicionamiento premium o internacional. Imprescindible en restaurantes gastronómicos y hoteles de alto nivel.",
    clientProfile: "Atrae al comensal experimentado, al viajero internacional y al que busca referencia segura de prestigio. También al coleccionista y al empresario.",
    sellByStrategy: "Vende mejor por château/marca o por appellation (Saint-Émilion, Margaux, Pauillac). La mención de la clasificación (Cru Classé, Grand Cru) añade valor percibido.",
    competingRegions: ["Napa Valley", "Piamonte", "Borgoña"],
    commonMistakes: [
      "Pensar que Burdeos es inalcanzable en precio: hay excelentes Bordeaux Supérieur y Côtes a precios muy razonables",
      "Ignorar los blancos secos de Pessac-Léognan y Graves, que son extraordinarios",
      "Servir Burdeos demasiado joven: muchos necesitan al menos 5-8 años",
    ],
    pairings: ["Entrecot", "Cordero", "Pato confitado", "Foie gras", "Quesos de pasta semiblanda"],
    faqs: [
      { q: "¿Cuál es la diferencia entre margen izquierda y margen derecha?", a: "La margen izquierda (Médoc, Graves) se basa en Cabernet Sauvignon: vinos potentes y estructurados. La margen derecha (Saint-Émilion, Pomerol) usa más Merlot: vinos redondos y accesibles más jóvenes." },
      { q: "¿Es necesario tener vinos de Burdeos en carta?", a: "Si tu carta tiene ambición internacional o premium, sí. Burdeos funciona como referencia que el comensal reconoce y respeta." },
      { q: "¿Hay Burdeos buenos a precio razonable?", a: "Absolutamente. Las Côtes de Bordeaux, Fronsac, Canon-Fronsac y muchos Bordeaux Supérieur ofrecen calidad excepcional por 10-20€ la botella." },
    ],
    seo: {
      title: "Burdeos (Bordeaux): Guía completa de la región vinícola",
      description: "Todo sobre Burdeos: appellations, châteaux, uvas, estilos y su rol en hostelería. Guía Winerim con enfoque comercial para restaurantes.",
    },
  },
  {
    id: "toscana",
    slug: "toscana",
    name: "Toscana",
    altNames: ["Tuscany", "Toskana"],
    country: "italia",
    denominationType: "Region",
    subzones: ["Chianti Classico", "Brunello di Montalcino", "Vino Nobile di Montepulciano", "Bolgheri", "Maremma", "Vernaccia di San Gimignano"],
    bodegasCount: 3241,
    wineTypes: ["tinto", "blanco", "rosado"],
    mainGrapes: ["Sangiovese", "Cabernet Sauvignon", "Merlot", "Vernaccia", "Trebbiano"],
    styles: ["Chianti Classico elegante", "Brunello de guarda", "Super Toscano potente", "Bolgheri estructurado", "Blanco fresco de Vernaccia"],
    prestige: "icónico",
    clientRecognition: "muy-alto",
    description: "La región vinícola italiana más reconocida internacionalmente, hogar de Chianti, Brunello di Montalcino y los revolucionarios Super Toscanos.",
    intro: "Toscana es la esencia del vino italiano. El Sangiovese alcanza aquí su máxima expresión, desde el accesible Chianti hasta el majestuoso Brunello di Montalcino. Pero Toscana es también la tierra de la revolución: los Super Toscanos demostraron que Italia podía competir con Burdeos en su propio terreno.",
    cartaRole: ["segura", "premium", "prestigio"],
    cartaReading: "Toscana en carta comunica Italia auténtica y calidad reconocida. Chianti es la referencia familiar, Brunello el ancla premium y los Super Toscanos aportan exclusividad. Es prácticamente imposible hacer una carta italiana sin Toscana.",
    whenToHighlight: "Siempre que la carta tenga presencia italiana. Chianti Classico funciona en cualquier segmento. Brunello y Super Toscanos para posicionamiento premium.",
    clientProfile: "Reconocimiento universal. Desde el turista que identifica 'Chianti' hasta el conocedor que busca un Brunello Riserva o un Sassicaia.",
    sellByStrategy: "Vende bien por denominación (Chianti, Brunello), por estilo (Super Toscano) y por marca/bodega. La mención 'Riserva' y 'Gran Selezione' eleva la percepción.",
    competingRegions: ["Piamonte", "Burdeos", "Ribera del Duero"],
    commonMistakes: [
      "Confundir Chianti genérico con Chianti Classico: son calidades muy diferentes",
      "No incluir Vernaccia di San Gimignano o blancos toscanos, que son una sorpresa positiva",
      "Asumir que Super Toscano = caro. Hay excelentes opciones en Maremma y Bolgheri accesibles",
    ],
    pairings: ["Bistecca alla fiorentina", "Pasta con ragú", "Pecorino toscano", "Crostini di fegato", "Cinghiale"],
    faqs: [
      { q: "¿Qué es un Super Toscano?", a: "Son vinos elaborados fuera de las normas DOC/DOCG tradicionales, generalmente con variedades internacionales como Cabernet Sauvignon. Sassicaia, Tignanello y Ornellaia son los más famosos." },
      { q: "¿Cuál es la diferencia entre Chianti y Chianti Classico?", a: "Chianti Classico proviene de la zona original y más prestigiosa, con requisitos más estrictos. El Chianti genérico puede venir de un área mucho más amplia." },
      { q: "¿Brunello es siempre caro?", a: "Brunello tiene un precio medio-alto, pero Rosso di Montalcino, su 'hermano menor' de la misma zona, ofrece el carácter de la región a precios más accesibles." },
    ],
    seo: {
      title: "Toscana: Guía completa de la región vinícola italiana",
      description: "Todo sobre Toscana: Chianti, Brunello, Super Toscanos, Bolgheri. Uvas, estilos y su rol en hostelería. Guía Winerim.",
    },
  },
  {
    id: "champagne",
    slug: "champagne",
    name: "Champagne",
    altNames: ["Champaña", "Champán"],
    country: "francia",
    parentRegion: "champagne",
    denominationType: "Zone",
    subzones: ["Montagne de Reims", "Côte des Blancs", "Vallée de la Marne", "Côte des Bar", "Aube"],
    bodegasCount: 795,
    wineTypes: ["espumoso"],
    mainGrapes: ["Chardonnay", "Pinot Noir", "Pinot Meunier"],
    styles: ["Brut Non Vintage", "Vintage / Millésimé", "Blanc de Blancs", "Blanc de Noirs", "Rosé", "Prestige Cuvée"],
    prestige: "icónico",
    clientRecognition: "muy-alto",
    description: "La región que inventó el vino espumoso tal como lo conocemos. Champagne es sinónimo de celebración, lujo y excelencia.",
    intro: "Champagne no necesita presentación: es la referencia absoluta del vino espumoso. Pero más allá de las grandes marcas, la región vive una revolución de pequeños viticultores (grower champagne) que elaboran vinos de terroir con una expresividad y personalidad que están redefiniendo la categoría.",
    cartaRole: ["prestigio", "segura", "identitaria"],
    cartaReading: "Champagne en carta comunica celebración, estatus y calidad. Es imprescindible. La presencia de un grower champagne junto a grandes maisons comunica conocimiento y criterio.",
    whenToHighlight: "Siempre. Es una categoría obligatoria. Para copa, para maridaje, para celebración. El Champagne tiene un papel que ningún otro espumoso puede sustituir del todo.",
    clientProfile: "Reconocimiento prácticamente universal. Desde el comensal que lo pide para brindar hasta el que busca un Blanc de Blancs específico.",
    sellByStrategy: "Vende por marca (Moët, Veuve, Dom Pérignon), por estilo (Blanc de Blancs, Rosé) y cada vez más por productor/vignerón. La mención 'Grand Cru' o 'Premier Cru' en etiqueta aporta valor.",
    competingRegions: ["Cava", "Franciacorta", "Crémant", "English Sparkling"],
    commonMistakes: [
      "Limitar la oferta a las grandes maisons sin explorar los grower champagnes",
      "No ofrecer Champagne por copa: es una de las categorías con mayor potencial de venta por copa",
      "Servir demasiado frío: entre 8-10°C permite expresar los aromas",
    ],
    pairings: ["Ostras", "Caviar", "Sushi de alta gama", "Jamón ibérico", "Aperitivos refinados", "Postres ligeros"],
    faqs: [
      { q: "¿Qué diferencia hay entre Champagne y Cava?", a: "Ambos se elaboran con método tradicional (segunda fermentación en botella), pero proceden de regiones, climas y variedades distintas. Champagne tiene un perfil más ácido, mineral y de levadura." },
      { q: "¿Qué es un grower champagne?", a: "Es un Champagne elaborado por el propio viticultor con uvas de sus propios viñedos, en contraste con las grandes maisons que compran uva a muchos proveedores. Se identifican por las letras RM en la etiqueta." },
    ],
    seo: {
      title: "Champagne: Guía completa de la región vinícola",
      description: "Todo sobre Champagne: estilos, Grand Cru, grower champagne y su rol imprescindible en hostelería. Guía Winerim.",
    },
  },
  {
    id: "napa-valley",
    slug: "napa-valley",
    name: "Napa Valley",
    altNames: ["Valle de Napa"],
    country: "estados-unidos",
    denominationType: "AVA",
    subzones: ["Oakville", "Rutherford", "Stags Leap District", "Howell Mountain", "Carneros", "Atlas Peak", "Mount Veeder", "Spring Mountain"],
    bodegasCount: 982,
    wineTypes: ["tinto", "blanco", "espumoso"],
    mainGrapes: ["Cabernet Sauvignon", "Chardonnay", "Merlot", "Sauvignon Blanc"],
    styles: ["Cabernet potente y concentrado", "Chardonnay rico con barrica", "Cult wines de colección", "Espumosos de Carneros"],
    prestige: "icónico",
    clientRecognition: "alto",
    description: "El valle californiano que demostró que el Nuevo Mundo podía competir con los mejores vinos de Francia.",
    intro: "Napa Valley es la región vinícola más prestigiosa de Estados Unidos y una de las más reconocidas del mundo. Desde el histórico Juicio de París en 1976, sus Cabernet Sauvignon han competido con los Premiers Crus de Burdeos. Con más de 16 sub-AVA, Napa ofrece una diversidad de terroirs que permite vinos desde concentrados y potentes hasta elegantes y frescos.",
    cartaRole: ["premium", "prestigio"],
    cartaReading: "Napa Valley en carta comunica ambición internacional. Es la referencia para quien busca Cabernet de primer nivel fuera de Francia. Su presencia eleva el perfil general de la sección internacional.",
    whenToHighlight: "En cartas con ambición premium o internacional. Funciona especialmente bien en restaurantes de cocina moderna, steakhouses y fine dining.",
    clientProfile: "Atrae al comensal viajero, al empresario, al aficionado que conoce las marcas (Opus One, Silver Oak, Caymus).",
    sellByStrategy: "Vende mejor por bodega/marca que por denominación. Las sub-AVA (Oakville, Rutherford, Stags Leap) aportan diferenciación para el conocedor.",
    competingRegions: ["Burdeos", "Margaret River", "Bolgheri"],
    commonMistakes: [
      "Asumir que todo Napa es caro: hay opciones accesibles en AVA generales",
      "Servir Napa Cabernet demasiado joven: benefician de decantación mínima",
      "No explorar las sub-AVA: la diferencia entre un Oakville y un Howell Mountain es enorme",
    ],
    pairings: ["Chuletón de buey", "Costillas BBQ", "Cordero con romero", "Quesos artesanales maduros"],
    faqs: [
      { q: "¿Por qué Napa es tan caro?", a: "Napa combina tierra cara, rendimientos bajos, técnica de alto nivel y alta demanda global. Los vinos premium justifican el precio por calidad y consistencia." },
      { q: "¿Cuáles son las sub-AVA más importantes?", a: "Oakville y Rutherford para Cabernet clásico. Stags Leap District para elegancia. Howell Mountain para potencia de montaña. Carneros para Pinot Noir y espumosos." },
    ],
    seo: {
      title: "Napa Valley: Guía completa de la región vinícola",
      description: "Todo sobre Napa Valley: sub-AVAs, Cabernet Sauvignon, estilos y su rol en hostelería. Guía Winerim con enfoque comercial.",
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════

export const getCountryBySlug = (slug: string) =>
  wineCountries.find((c) => c.slug === slug);

export const getRegionBySlug = (slug: string) =>
  regionEntries.find((r) => r.slug === slug);

export const getRegionsByCountry = (countrySlug: string) =>
  regionEntries.filter((r) => r.country === countrySlug);

export const getAllCountrySlugs = () =>
  wineCountries.map((c) => c.slug);

export const getAllRegionSlugs = () =>
  regionEntries.map((r) => r.slug);
