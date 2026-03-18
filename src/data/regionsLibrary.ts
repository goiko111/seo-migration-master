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
  // ── Batch 1 — 10 new regions ──────────────────────────────────────────
  {
    id: "ribera-del-duero",
    slug: "ribera-del-duero",
    name: "Ribera del Duero",
    altNames: ["Ribera"],
    country: "espana",
    denominationType: "DO",
    subzones: ["Roa", "Aranda de Duero", "Peñafiel", "San Esteban de Gormaz", "Sotillo de la Ribera"],
    bodegasCount: 823,
    wineTypes: ["tinto", "rosado"],
    mainGrapes: ["Tempranillo", "Cabernet Sauvignon", "Merlot", "Malbec", "Garnacha"],
    styles: ["Tinto joven de alta expresión", "Crianza concentrada", "Reserva estructurada", "Rosado de Tempranillo"],
    prestige: "icónico",
    clientRecognition: "muy-alto",
    description: "La gran denominación de tintos de la meseta castellana. Ribera del Duero produce algunos de los vinos más potentes y expresivos de España, con Vega Sicilia como icono global.",
    intro: "Ribera del Duero se ha consolidado como la segunda denominación más importante de España, con un estilo propio que combina la potencia de un clima continental extremo con la elegancia que aportan los suelos calcáreos y la altitud (700-1.000 m). Aquí el Tempranillo — llamado Tinto Fino o Tinta del País — alcanza una expresión diferente a Rioja: más concentrada, más oscura, con taninos firmes y una fruta negra intensa.",
    cartaRole: ["premium", "segura", "identitaria"],
    cartaReading: "Ribera del Duero comunica potencia, seriedad y calidad. Es la alternativa de prestigio a Rioja: más moderna, más directa, con un perfil de fruta negra que conecta bien con el paladar contemporáneo.",
    whenToHighlight: "En cartas con presencia española sólida. Funciona como ancla para tintos potentes. Es casi obligatoria junto a Rioja para cubrir los dos estilos principales de Tempranillo español.",
    clientProfile: "El comensal que busca tintos con cuerpo y los identifica con calidad española. Nombres como Vega Sicilia, Pingus o Pesquera tienen reconocimiento propio.",
    sellByStrategy: "Vende bien por denominación ('un Ribera') y especialmente por marca/bodega. Las zonas de pueblo empiezan a ganar relevancia (Roa, Peñafiel).",
    competingRegions: ["Rioja", "Toro", "Bierzo"],
    commonMistakes: [
      "Asumir que todos los Ribera son iguales: la diferencia entre un joven industrial y un vino de parcela es abismal",
      "No decantar: la mayoría de Ribera de calidad necesitan aire para expresarse",
      "Ignorar el potencial de los rosados de la DO, que están ganando mucha calidad",
    ],
    pairings: ["Lechazo asado", "Morcilla de Burgos", "Chuletón de buey", "Queso de oveja curado", "Cochinillo"],
    faqs: [
      { q: "¿Cuál es la diferencia entre Ribera del Duero y Rioja?", a: "Ambas se basan en Tempranillo, pero el clima continental extremo de Ribera da vinos más oscuros, concentrados y tánicos. Rioja tiende a mayor elegancia y aromas terciarios en crianza." },
      { q: "¿Por qué Vega Sicilia es tan caro?", a: "Vega Sicilia fue la primera bodega de élite de España (fundada en 1864). Único combina Tempranillo con variedades bordelesas y tiene envejecimientos de 10+ años antes de salir al mercado." },
      { q: "¿Es necesario tener Ribera del Duero en carta?", a: "Si la carta tiene presencia española, sí. Es la gran alternativa a Rioja y muchos comensales tienen preferencia clara por uno u otro estilo." },
    ],
    seo: {
      title: "Ribera del Duero: Guía completa de la DO | Uvas, estilos y hostelería",
      description: "Todo sobre Ribera del Duero: Tempranillo, estilos, bodegas y su rol en carta de restaurante. Guía Winerim con enfoque comercial.",
    },
  },
  {
    id: "priorat",
    slug: "priorat",
    name: "Priorat",
    altNames: ["Priorato", "DOQ Priorat"],
    country: "espana",
    denominationType: "DOCa",
    subzones: ["Gratallops", "Porrera", "Bellmunt del Priorat", "Escaladei", "La Morera de Montsant", "Torroja del Priorat"],
    bodegasCount: 124,
    wineTypes: ["tinto", "blanco"],
    mainGrapes: ["Garnacha", "Cariñena", "Cabernet Sauvignon", "Syrah", "Garnacha Blanca"],
    styles: ["Tinto mineral y concentrado", "Garnacha de pizarra", "Cariñena vieja de parcela", "Blanco de Garnacha Blanca"],
    prestige: "icónico",
    clientRecognition: "alto",
    description: "Junto a Rioja, la única DOCa de España. Priorat produce tintos de pizarra con una mineralidad, concentración y profundidad que los sitúan entre los grandes del mundo.",
    intro: "Priorat es el milagro vinícola español. Una región olvidada que renació en los años 80 de la mano de un grupo de viticultores visionarios (los 'pioneros del Priorat') y que en pocas décadas ha alcanzado el máximo nivel de clasificación. Sus suelos de llicorella (pizarra) y las cepas viejas de Garnacha y Cariñena producen vinos de una intensidad, complejidad y mineralidad únicas.",
    cartaRole: ["premium", "diferencial", "prestigio"],
    cartaReading: "Priorat en carta comunica conocimiento, criterio y ambición. Es la denominación española que más impresiona al comensal experto. Su presencia eleva la percepción de toda la sección de vinos.",
    whenToHighlight: "En cartas con ambición premium. Ideal como referencia de alta gama española junto a Rioja Gran Reserva o Vega Sicilia. También funciona para comunicar que el restaurante tiene criterio propio.",
    clientProfile: "Comensal entendido, aficionado, crítico gastronómico. No es una denominación de impulso: quien la pide sabe lo que busca.",
    sellByStrategy: "Vende mejor por bodega/marca (Álvaro Palacios, Clos Mogador, Clos Erasmus) y por concepto de terroir (pizarra, viñedo viejo). La mención de la parcela o pueblo aporta valor.",
    competingRegions: ["Montsant", "Terra Alta", "Ribera del Duero"],
    commonMistakes: [
      "Confundir Priorat con Montsant: son denominaciones vecinas pero diferentes en calidad y precio",
      "No decantar: los vinos de Priorat necesitan tiempo y oxígeno para abrirse",
      "Servir demasiado joven los reservas: muchos necesitan 5-10 años mínimo",
    ],
    pairings: ["Caza mayor", "Carnes rojas a la brasa", "Cordero con romero", "Quesos de montaña curados", "Guisos catalanes de montaña"],
    faqs: [
      { q: "¿Por qué Priorat es DOCa?", a: "Priorat alcanzó la categoría DOCa en 2009 (junto a Rioja) por la excepcional calidad de sus vinos y la singularidad de sus suelos de llicorella, que aportan una mineralidad inconfundible." },
      { q: "¿Qué es la llicorella?", a: "Es el nombre local para la pizarra y cuarcita que forman los suelos del Priorat. Las raíces de la vid penetran profundamente en estas capas, extrayendo minerales que dan a los vinos su carácter único." },
      { q: "¿Es Priorat siempre caro?", a: "Los vinos de autor sí tienen precios altos, pero hay opciones de entrada en la DO (y en la vecina DO Montsant) que permiten acercarse al estilo a precios razonables." },
    ],
    seo: {
      title: "Priorat: Guía completa de la DOCa | Llicorella, Garnacha y hostelería",
      description: "Todo sobre el Priorat: llicorella, Garnacha, Cariñena, bodegas icónicas y su rol premium en carta de restaurante. Guía Winerim.",
    },
  },
  {
    id: "rias-baixas",
    slug: "rias-baixas",
    name: "Rías Baixas",
    altNames: ["Rias Baixas"],
    country: "espana",
    denominationType: "DO",
    subzones: ["Val do Salnés", "Condado do Tea", "O Rosal", "Soutomaior", "Ribeira do Ulla"],
    bodegasCount: 178,
    wineTypes: ["blanco", "tinto"],
    mainGrapes: ["Albariño", "Treixadura", "Loureiro", "Godello", "Caiño Tinto"],
    styles: ["Albariño fresco y mineral", "Albariño con lías y crianza", "Blanco de coupage atlántico", "Tinto atlántico ligero"],
    prestige: "reconocido",
    clientRecognition: "alto",
    description: "La denominación de referencia para el vino blanco en España. Rías Baixas y su Albariño han revolucionado la percepción del blanco español.",
    intro: "Rías Baixas es la historia de éxito del vino blanco español. En solo tres décadas, el Albariño ha pasado de ser un vino local desconocido a la referencia blanca más solicitada en la hostelería española. La influencia atlántica, los suelos graníticos y la proximidad al mar dan a estos vinos una frescura, salinidad y versatilidad gastronómica excepcionales.",
    cartaRole: ["segura", "identitaria", "valor"],
    cartaReading: "Rías Baixas = Albariño en la mente del comensal. Comunica blanco de calidad, fresco y gastronómico. Es la respuesta perfecta cuando alguien pide 'un blanco bueno'.",
    whenToHighlight: "Siempre en cartas con marisco, pescado o cocina mediterránea. Es la referencia blanca española que todo comensal reconoce y acepta.",
    clientProfile: "Reconocimiento muy amplio. Desde el comensal casual que pide 'un Albariño' hasta el que distingue entre subzonas (Val do Salnés vs. O Rosal).",
    sellByStrategy: "Vende muy bien por uva ('un Albariño') y por denominación. La mención de la subzona aporta diferenciación para el conocedor. Los de crianza sobre lías están ganando terreno.",
    competingRegions: ["Rueda", "Godello (Valdeorras/Bierzo)", "Vinho Verde"],
    commonMistakes: [
      "Ofrecer solo un Albariño: la diversidad dentro de Rías Baixas merece al menos 2-3 referencias",
      "Servir demasiado frío: por debajo de 8°C se pierden los aromas",
      "No explorar los Albariños con crianza sobre lías, que ofrecen una dimensión extra",
    ],
    pairings: ["Marisco gallego", "Pulpo á feira", "Pescados blancos", "Empanada gallega", "Ostras", "Ceviche"],
    faqs: [
      { q: "¿Albariño y Rías Baixas es lo mismo?", a: "No exactamente. Rías Baixas es la denominación de origen. Albariño es la variedad principal pero no la única: Treixadura, Loureiro y Godello también se cultivan. Sin embargo, el 95% de la producción es Albariño." },
      { q: "¿Cuáles son las subzonas más importantes?", a: "Val do Salnés es la cuna del Albariño y la más reconocida. O Rosal y Condado do Tea aportan perfiles diferentes, con más cuerpo y complejidad." },
      { q: "¿Por qué el Albariño marida tan bien con marisco?", a: "Su acidez vibrante, salinidad atlántica y aromas cítricos y de hueso complementan perfectamente la salinidad y dulzor natural del marisco." },
    ],
    seo: {
      title: "Rías Baixas: Guía completa del Albariño y la DO gallega",
      description: "Todo sobre Rías Baixas: Albariño, subzonas, estilos y su rol imprescindible en hostelería. Guía Winerim con enfoque comercial.",
    },
  },
  {
    id: "jerez",
    slug: "jerez",
    name: "Jerez-Xérès-Sherry",
    altNames: ["Jerez", "Sherry", "Xérès"],
    country: "espana",
    denominationType: "DO",
    subzones: ["Jerez de la Frontera", "El Puerto de Santa María", "Sanlúcar de Barrameda"],
    bodegasCount: 68,
    wineTypes: ["generoso", "blanco", "dulce"],
    mainGrapes: ["Palomino Fino", "Pedro Ximénez", "Moscatel"],
    styles: ["Fino seco y ligero", "Manzanilla de Sanlúcar", "Amontillado complejo", "Oloroso potente", "Palo Cortado raro", "Pedro Ximénez dulce", "Cream"],
    prestige: "icónico",
    clientRecognition: "medio",
    description: "Una de las grandes regiones vinícolas del mundo, con un sistema de crianza único (solera y criaderas) que produce vinos sin equivalente en ningún otro lugar.",
    intro: "Jerez es una de las joyas más infravaloradas del vino mundial. Su sistema de crianza biológica y oxidativa bajo el sistema de soleras produce una gama de vinos — del Fino al PX — que no tiene paralelo. Cada estilo de Jerez es radicalmente diferente de los demás, ofreciendo una versatilidad gastronómica extraordinaria. Los expertos lo consideran uno de los grandes vinos del mundo; el reto es trasladar ese reconocimiento al comensal medio.",
    cartaRole: ["diferencial", "premium", "descubrimiento"],
    cartaReading: "Jerez en carta comunica sofisticación y criterio. Es el vino de los que saben de vino. Su presencia distingue a la carta que tiene ambición de conocimiento.",
    whenToHighlight: "En cartas que quieran comunicar profundidad y conocimiento. Ideal para oferta por copa. El maridaje de tapas y jamón ibérico con Fino/Manzanilla es imbatible.",
    clientProfile: "Reconocimiento bajo-medio entre el gran público, pero altísimo entre aficionados, sommeliers y gastrónomos. Es un vino de prescripción: necesita recomendación activa.",
    sellByStrategy: "Vende mejor por estilo (Fino, Amontillado, PX) que por región. La recomendación del sommelier o camarero es clave. Maridajes sugeridos multiplican la venta.",
    competingRegions: ["Montilla-Moriles", "Madeira", "Porto"],
    commonMistakes: [
      "No explicar los estilos: el comensal medio no sabe la diferencia entre Fino y Oloroso",
      "No ofrecer por copa: Jerez funciona mucho mejor en formato copa que en botella",
      "Servir el Fino demasiado caliente o con la botella abierta hace días: el Fino es un vino fresco que pierde con el tiempo",
    ],
    pairings: ["Jamón ibérico (Fino/Manzanilla)", "Atún rojo (Amontillado)", "Queso azul (PX)", "Tapas andaluzas", "Postres de chocolate (Oloroso)", "Gambas al ajillo"],
    faqs: [
      { q: "¿Todos los Jerez son dulces?", a: "No. El Fino y la Manzanilla son completamente secos, con solo 15% de alcohol. El Amontillado y el Oloroso también son secos. Solo el PX y el Cream son dulces." },
      { q: "¿Qué es el sistema de solera?", a: "Es un sistema de envejecimiento dinámico donde se mezclan vinos de diferentes añadas. Las botas de abajo (solera) contienen el vino más viejo, y se van alimentando con vino más joven de las criaderas superiores." },
      { q: "¿Por qué la Manzanilla solo es de Sanlúcar?", a: "La Manzanilla solo puede elaborarse en Sanlúcar de Barrameda, donde la proximidad al mar crea unas condiciones de humedad que permiten una crianza biológica más intensa bajo el velo de flor." },
    ],
    seo: {
      title: "Jerez (Sherry): Guía completa de la DO | Fino, Amontillado, PX",
      description: "Todo sobre Jerez: Fino, Manzanilla, Amontillado, Oloroso, PX. Sistema de solera, estilos y su rol en hostelería. Guía Winerim.",
    },
  },
  {
    id: "bourgogne",
    slug: "bourgogne",
    name: "Borgoña",
    altNames: ["Bourgogne", "Burgundy"],
    country: "francia",
    denominationType: "Zone",
    subzones: ["Chablis", "Côte de Nuits", "Côte de Beaune", "Côte Chalonnaise", "Mâconnais", "Beaujolais"],
    bodegasCount: 4218,
    wineTypes: ["tinto", "blanco", "espumoso"],
    mainGrapes: ["Pinot Noir", "Chardonnay", "Gamay", "Aligoté"],
    styles: ["Pinot Noir elegante y terroir", "Chardonnay mineral (Chablis)", "Chardonnay rico (Meursault)", "Grand Cru de guarda", "Crémant de Bourgogne", "Beaujolais cru"],
    prestige: "icónico",
    clientRecognition: "muy-alto",
    description: "La región que elevó el concepto de terroir a su máxima expresión. Borgoña produce los Pinot Noir y Chardonnay más refinados y codiciados del mundo.",
    intro: "Borgoña es el sancta sanctorum del vino. Aquí nació el concepto de terroir: la idea de que cada parcela, cada 'climat', produce un vino diferente. Su jerarquía — Regional, Village, Premier Cru, Grand Cru — es el sistema de clasificación más admirado e imitado del mundo. Los precios de los Grand Cru son astronómicos, pero Borgoña ofrece vinos extraordinarios en todos los niveles.",
    cartaRole: ["premium", "prestigio", "diferencial"],
    cartaReading: "Borgoña en carta es la máxima señal de seriedad vinícola. Un Village de un buen productor comunica más que muchos vinos más caros de otras regiones. La presencia de Premier y Grand Cru ancla el segmento ultra-premium.",
    whenToHighlight: "En cartas con ambición gastronómica y premium. Chablis es imprescindible para blancos. Un Pinot Noir de Village o Premier Cru aporta una dimensión que no se encuentra en ningún otro lugar.",
    clientProfile: "Desde el aficionado que busca Chablis como blanco de referencia hasta el coleccionista que investiga productores de Côte de Nuits. Muy valorado por el comensal francés y anglófono.",
    sellByStrategy: "Vende por productor/domaine, por village (Gevrey-Chambertin, Meursault, Puligny-Montrachet) y por clasificación. La educación es clave: el comensal que entiende el sistema se convierte en comprador recurrente.",
    competingRegions: ["Oregón", "Nueva Zelanda (Central Otago)", "Alsacia"],
    commonMistakes: [
      "Ofrecer solo Borgoña cara sin opciones accesibles como Bourgogne regional o Mâcon",
      "No incluir Chablis, que es la puerta de entrada más efectiva a Borgoña para muchos comensales",
      "Servir el Pinot Noir demasiado frío: 14-16°C es ideal",
    ],
    pairings: ["Boeuf bourguignon", "Pollo de Bresse", "Queso Epoisses", "Escargots", "Pescados nobles (Chablis)", "Jamón de Borgoña"],
    faqs: [
      { q: "¿Cuál es la diferencia entre Village, Premier Cru y Grand Cru?", a: "Village es el vino de un pueblo entero. Premier Cru proviene de parcelas reconocidas dentro del pueblo. Grand Cru son las parcelas de máxima excelencia (solo 33 en toda Borgoña). Calidad y precio suben en cada nivel." },
      { q: "¿Por qué Borgoña es tan cara?", a: "Producción muy limitada (parcelas pequeñas), demanda global altísima y un sistema de herencia que fragmenta aún más la propiedad. Un Grand Cru puede tener menos de 1 hectárea." },
      { q: "¿Se puede disfrutar Borgoña sin gastar una fortuna?", a: "Sí. Bourgogne regional, Mâcon-Villages, Chablis de entrada y Beaujolais cru ofrecen el espíritu de Borgoña a precios accesibles." },
    ],
    seo: {
      title: "Borgoña (Bourgogne): Guía completa | Pinot Noir, Chardonnay, Grand Cru",
      description: "Todo sobre Borgoña: Pinot Noir, Chardonnay, sistema de clasificación, terroir y su rol en hostelería. Guía Winerim con enfoque comercial.",
    },
  },
  {
    id: "vallee-du-rhone",
    slug: "vallee-du-rhone",
    name: "Valle del Ródano",
    altNames: ["Vallée du Rhône", "Rhône Valley", "Ródano"],
    country: "francia",
    denominationType: "Zone",
    subzones: ["Côte-Rôtie", "Hermitage", "Châteauneuf-du-Pape", "Condrieu", "Saint-Joseph", "Crozes-Hermitage", "Gigondas", "Vacqueyras", "Côtes du Rhône"],
    bodegasCount: 5120,
    wineTypes: ["tinto", "blanco", "rosado"],
    mainGrapes: ["Syrah", "Grenache", "Mourvèdre", "Viognier", "Marsanne", "Roussanne"],
    styles: ["Syrah norteña elegante y mineral", "Coupage sureño cálido", "Viognier aromático", "Tinto potente de Châteauneuf", "Rosé de Tavel"],
    prestige: "icónico",
    clientRecognition: "alto",
    description: "La gran región francesa de tintos con cuerpo y carácter. Dos zonas muy diferentes — Norte (Syrah pura) y Sur (coupages de Grenache) — que cubren un espectro enorme de estilos.",
    intro: "El Valle del Ródano es la segunda región vinícola de Francia en tamaño y una de las más fascinantes por su dualidad: el Norte, frío y empinado, produce Syrah de parcela con una elegancia mineral incomparable (Côte-Rôtie, Hermitage). El Sur, mediterráneo y generoso, elabora coupages cálidos liderados por Grenache (Châteauneuf-du-Pape, Gigondas). Entre ambos, Côtes du Rhône ofrece algunos de los mejores vinos de Francia en relación calidad-precio.",
    cartaRole: ["segura", "premium", "valor"],
    cartaReading: "Ródano comunica potencia francesa accesible. Côtes du Rhône es perfecto para copa y como tinto de carta del día. Châteauneuf-du-Pape aporta prestigio. Côte-Rôtie y Hermitage compiten con los mejores del mundo.",
    whenToHighlight: "En cualquier carta con sección francesa. Côtes du Rhône como valor seguro accesible. Châteauneuf para premium. Côte-Rôtie/Hermitage para anclar el ultra-premium junto a Borgoña.",
    clientProfile: "Amplio. Desde quien busca un tinto con cuerpo a buen precio (Côtes du Rhône) hasta el conocedor que valora un Hermitage o un Condrieu.",
    sellByStrategy: "Côtes du Rhône vende por denominación y precio. Las appellations del Norte venden por nombre (Côte-Rôtie, Hermitage). Châteauneuf vende por reputación y por productor.",
    competingRegions: ["Burdeos", "Barossa Valley", "Priorat"],
    commonMistakes: [
      "Tratar el Ródano como una única región: Norte y Sur son mundos diferentes",
      "No explorar los crus del Sur (Gigondas, Vacqueyras, Lirac) que ofrecen calidad excepcional a precios razonables",
      "Servir los tintos del Ródano Norte demasiado cálidos: 16-17°C es ideal",
    ],
    pairings: ["Carnes a la brasa", "Cassoulet", "Daube provençal", "Quesos fuertes", "Tapenade y aceitunas"],
    faqs: [
      { q: "¿Cuál es la diferencia entre Ródano Norte y Sur?", a: "El Norte es Syrah pura en laderas empinadas: vinos elegantes, minerales, con pimienta y violeta. El Sur son coupages de Grenache, Syrah y Mourvèdre en terreno más llano: vinos cálidos, generosos, con fruta madura y especias." },
      { q: "¿Châteauneuf-du-Pape usa 13 variedades?", a: "Sí, la appellation permite hasta 13 variedades, pero la mayoría de productores se centran en Grenache, Syrah y Mourvèdre. Algunos elaboran blancos extraordinarios con Roussanne y Clairette." },
    ],
    seo: {
      title: "Valle del Ródano: Guía completa | Syrah, Châteauneuf, Côte-Rôtie",
      description: "Todo sobre el Valle del Ródano: Ródano Norte vs. Sur, appellations, uvas y su rol en hostelería. Guía Winerim.",
    },
  },
  {
    id: "piemonte",
    slug: "piemonte",
    name: "Piamonte",
    altNames: ["Piemonte", "Piedmont"],
    country: "italia",
    denominationType: "Region",
    subzones: ["Barolo", "Barbaresco", "Langhe", "Roero", "Gavi", "Asti", "Monferrato", "Alta Langa"],
    bodegasCount: 3876,
    wineTypes: ["tinto", "blanco", "espumoso", "dulce"],
    mainGrapes: ["Nebbiolo", "Barbera", "Dolcetto", "Moscato", "Cortese", "Arneis"],
    styles: ["Barolo de guarda", "Barbaresco elegante", "Barbera d'Asti frutal", "Gavi mineral", "Moscato d'Asti dulce", "Alta Langa espumoso"],
    prestige: "icónico",
    clientRecognition: "alto",
    description: "El Piamonte es la gran región de tintos italianos, hogar de Barolo y Barbaresco: dos de los vinos más admirados del mundo, elaborados con Nebbiolo.",
    intro: "Piamonte compite con Borgoña como la región que mejor traduce el terroir en el vino. El Nebbiolo, con su transparencia, taninos firmes y capacidad de envejecimiento, produce en las colinas de las Langhe dos obras maestras: Barolo ('el rey de los vinos') y Barbaresco ('la reina'). Pero Piamonte es mucho más: Barbera ofrece tintos accesibles, Gavi cubre blancos frescos, y Moscato d'Asti es el mejor vino dulce ligero del mundo.",
    cartaRole: ["premium", "prestigio", "diferencial"],
    cartaReading: "Piamonte en carta comunica Italia de alto nivel. Barolo es el equivalente italiano de un Grand Cru de Borgoña: prestigio absoluto. Barbaresco aporta elegancia. Barbera cubre el segmento de valor con personalidad.",
    whenToHighlight: "En cartas con presencia italiana seria. Barolo/Barbaresco para anclar el premium. Barbera d'Asti o Dolcetto para el segmento accesible. Gavi para blancos.",
    clientProfile: "Barolo atrae al conocedor y al coleccionista. Barbera y Dolcetto al comensal que busca tinto italiano con carácter a buen precio. Moscato d'Asti conecta con el público joven.",
    sellByStrategy: "Barolo y Barbaresco venden por productor y por cru/viñedo (Cannubi, Bussia, Asili). Barbera vende por denominación y precio. Gavi por uva y frescura.",
    competingRegions: ["Toscana", "Borgoña", "Ribera del Duero"],
    commonMistakes: [
      "Ofrecer solo Barolo sin Barbaresco: son experiencias complementarias y Barbaresco suele ser más accesible",
      "Subestimar Barbera: los mejores Barbera d'Asti y Barbera d'Alba son vinos extraordinarios",
      "Servir Barolo demasiado joven sin decantar: necesita oxígeno y tiempo para mostrar su complejidad",
    ],
    pairings: ["Tartufo bianco (Barolo)", "Brasato al Barolo", "Risotto al Barolo", "Tajarin con ragú", "Bagna cauda (Barbera)", "Vitello tonnato"],
    faqs: [
      { q: "¿Cuál es la diferencia entre Barolo y Barbaresco?", a: "Ambos son 100% Nebbiolo de las Langhe. Barolo tiende a mayor estructura, taninos más firmes y mayor longevidad. Barbaresco es generalmente más elegante, accesible joven y con un perfil aromático más floral." },
      { q: "¿Cuánto tiempo necesita un Barolo para estar listo?", a: "Un Barolo joven necesita mínimo 5-7 años para empezar a abrirse. Los grandes Barolo pueden evolucionar durante 20-30 años o más." },
      { q: "¿Qué es un Nebbiolo de Langhe?", a: "Es Nebbiolo de la misma zona que Barolo y Barbaresco pero sin las restricciones de envejecimiento. Ofrece el carácter de la variedad a un precio más accesible y listo para beber antes." },
    ],
    seo: {
      title: "Piamonte: Guía completa | Barolo, Barbaresco, Nebbiolo",
      description: "Todo sobre Piamonte: Barolo, Barbaresco, Barbera, Nebbiolo y su rol en hostelería. Guía Winerim con enfoque comercial.",
    },
  },
  {
    id: "barossa-valley",
    slug: "barossa-valley",
    name: "Barossa Valley",
    altNames: ["Barossa"],
    country: "australia",
    denominationType: "GI",
    subzones: ["Northern Barossa", "Southern Barossa", "Eden Valley", "High Eden"],
    bodegasCount: 674,
    wineTypes: ["tinto", "blanco"],
    mainGrapes: ["Shiraz", "Cabernet Sauvignon", "Grenache", "Riesling", "Sémillon"],
    styles: ["Shiraz potente y concentrado", "Old vine Shiraz de parcela", "GSM coupage", "Riesling seco de Eden Valley", "Cabernet estructurado"],
    prestige: "icónico",
    clientRecognition: "alto",
    description: "La gran región de Shiraz del mundo. Barossa Valley produce tintos con una potencia, concentración y generosidad que la han convertido en referencia global.",
    intro: "Barossa Valley es la capital mundial del Shiraz. Con cepas que superan los 150 años — entre las más viejas del planeta — esta región del sur de Australia produce tintos de una concentración y profundidad inigualables. Penfolds Grange, uno de los vinos más coleccionables del mundo, nació aquí. Pero Barossa es más que Shiraz potente: Eden Valley aporta Riesling de clase mundial y las nuevas generaciones buscan mayor elegancia.",
    cartaRole: ["premium", "diferencial"],
    cartaReading: "Barossa en carta comunica Nuevo Mundo de alto nivel. Un Shiraz de Barossa es la alternativa potente al Syrah del Ródano. Su presencia diversifica la oferta internacional con un estilo que tiene muchos seguidores.",
    whenToHighlight: "En cartas internacionales con sección de Nuevo Mundo. Funciona especialmente bien en steakhouses y restaurantes de carnes. Los Shiraz de viñedo viejo compiten en precio-calidad con los mejores del mundo.",
    clientProfile: "Comensal que disfruta tintos potentes y con cuerpo. Viajeros que han visitado Australia. Aficionados que buscan alternativa al estilo europeo.",
    sellByStrategy: "Vende bien por variedad (Shiraz), por marca/bodega (Penfolds, Henschke, Torbreck) y por concepto (old vine, single vineyard). La mención de la edad de las cepas impresiona.",
    competingRegions: ["Ródano Norte", "Priorat", "Ribera del Duero"],
    commonMistakes: [
      "Asumir que todo Barossa es 'bomba de fruta': hay productores haciendo Shiraz elegante y contenido",
      "No explorar Eden Valley Riesling, que es uno de los mejores del mundo",
      "Servir demasiado caliente: incluso los Shiraz potentes se benefician de 16-17°C",
    ],
    pairings: ["Carnes rojas a la brasa", "BBQ ahumado", "Costillas de cerdo", "Cordero especiado", "Quesos blue vein"],
    faqs: [
      { q: "¿Qué edad tienen las cepas más viejas de Barossa?", a: "Barossa tiene cepas de Shiraz de más de 170 años, plantadas antes de la filoxera. Son de las viñas más antiguas del mundo y producen vinos de una concentración extraordinaria." },
      { q: "¿Cuál es la diferencia entre Barossa Valley y Eden Valley?", a: "Barossa Valley es más cálida y baja: Shiraz potente. Eden Valley está en las colinas, más fresca: produce Riesling excepcional y Shiraz más elegante." },
    ],
    seo: {
      title: "Barossa Valley: Guía completa | Shiraz, old vines y hostelería",
      description: "Todo sobre Barossa Valley: Shiraz, viñedos centenarios, estilos y su rol en hostelería internacional. Guía Winerim.",
    },
  },
  {
    id: "marlborough",
    slug: "marlborough",
    name: "Marlborough",
    country: "nueva-zelanda",
    denominationType: "GI",
    subzones: ["Wairau Valley", "Southern Valleys", "Awatere Valley"],
    bodegasCount: 312,
    wineTypes: ["blanco", "espumoso", "tinto"],
    mainGrapes: ["Sauvignon Blanc", "Pinot Noir", "Chardonnay", "Pinot Gris"],
    styles: ["Sauvignon Blanc herbáceo y cítrico", "Pinot Noir elegante", "Espumoso método tradicional", "Chardonnay fresco"],
    prestige: "reconocido",
    clientRecognition: "alto",
    description: "La región que redefinió el Sauvignon Blanc a nivel mundial. Marlborough produce blancos con una expresividad aromática que los ha convertido en fenómeno global.",
    intro: "Marlborough revolucionó el mundo del vino blanco en los años 80 cuando Cloudy Bay demostró que el Sauvignon Blanc podía alcanzar un nivel de intensidad aromática desconocido hasta entonces. Hoy, Marlborough Sauvignon Blanc es una de las categorías más vendidas del mundo: maracuyá, pomelo, hierba cortada y una acidez vibrante que lo hacen inconfundible. Pero la región también produce Pinot Noir de creciente calidad.",
    cartaRole: ["segura", "valor"],
    cartaReading: "Marlborough Sauvignon Blanc es casi una categoría en sí misma. El comensal lo reconoce, lo pide y raramente decepciona. Es la opción segura para quien busca blanco aromático y refrescante.",
    whenToHighlight: "En cartas con sección internacional de blancos. Funciona como alternativa al Albariño o al Verdejo para quien busca un perfil más expresivo y aromático.",
    clientProfile: "Muy amplio. Desde el comensal casual hasta el viajero internacional. El reconocimiento de Marlborough Sauvignon Blanc es global.",
    sellByStrategy: "Vende por variedad y denominación conjuntamente: 'Marlborough Sauvignon Blanc' funciona como unidad de decisión. Las subzonas (Awatere Valley) empiezan a diferenciarse.",
    competingRegions: ["Sancerre", "Rías Baixas", "Rueda"],
    commonMistakes: [
      "Ofrecer solo el Sauvignon Blanc más barato: hay rangos de calidad enormes dentro de Marlborough",
      "No explorar el Pinot Noir de Marlborough, que está ganando mucha calidad",
      "Servir demasiado frío: 8-10°C permite apreciar la complejidad aromática",
    ],
    pairings: ["Ceviche", "Ensaladas frescas", "Queso de cabra", "Espárragos", "Sushi", "Mariscos ligeros"],
    faqs: [
      { q: "¿Por qué Marlborough Sauvignon Blanc es tan aromático?", a: "La combinación de clima frío, mucha luz solar y noches frescas permite una maduración lenta que preserva los tioles volátiles responsables de los aromas de maracuyá, pomelo y hierba que definen el estilo." },
      { q: "¿Marlborough solo hace Sauvignon Blanc?", a: "Principalmente, pero produce Pinot Noir de calidad creciente, Chardonnay y espumosos de método tradicional que merecen atención." },
    ],
    seo: {
      title: "Marlborough: Guía completa | Sauvignon Blanc de Nueva Zelanda",
      description: "Todo sobre Marlborough: Sauvignon Blanc, Pinot Noir, estilos y su rol en hostelería internacional. Guía Winerim.",
    },
  },
  {
    id: "douro",
    slug: "douro",
    name: "Douro",
    altNames: ["Alto Douro", "Duero portugués"],
    country: "portugal",
    denominationType: "DOC",
    subzones: ["Baixo Corgo", "Cima Corgo", "Douro Superior"],
    bodegasCount: 1342,
    wineTypes: ["tinto", "blanco", "generoso"],
    mainGrapes: ["Touriga Nacional", "Touriga Franca", "Tinta Roriz", "Tinto Cão", "Rabigato", "Viosinho"],
    styles: ["Tinto DOC concentrado", "Tinto de parcela elegante", "Porto Vintage", "Porto Tawny", "Blanco de altitude", "Porto Late Bottled Vintage"],
    prestige: "icónico",
    clientRecognition: "medio",
    description: "La región vinícola demarcada más antigua del mundo (1756). El Douro produce los vinos de Oporto y, cada vez más, tintos secos de clase mundial.",
    intro: "El Douro es una de las regiones vinícolas más espectaculares y antiguas del mundo. Sus terrazas escarpadas sobre el río Duero (Patrimonio de la Humanidad) son el hogar del vino de Oporto, pero la revolución de los últimos 20 años ha sido la producción de tintos secos DOC Douro que rivalizan con los mejores del mundo. Las variedades autóctonas — Touriga Nacional, Touriga Franca, Tinta Roriz — dan vinos con una profundidad y carácter únicos a precios sorprendentemente competitivos.",
    cartaRole: ["diferencial", "valor", "premium"],
    cartaReading: "Douro en carta comunica descubrimiento y criterio. Los tintos secos del Douro son una de las mejores oportunidades de calidad-precio del mundo vinícola. El Porto cubre una categoría única (sobremesa, maridaje con quesos, aperitivo).",
    whenToHighlight: "En cartas que buscan diferenciación en tintos internacionales. Ideal para quien quiere ofrecer calidad excepcional a precios que sorprenden. Porto es imprescindible para la sección de sobremesa.",
    clientProfile: "Reconocimiento medio para los tintos secos (oportunidad de prescripción). Alto para Porto entre comensal internacional. Creciente entre aficionados que descubren la región.",
    sellByStrategy: "Tintos secos venden mejor por recomendación y maridaje. Porto vende por estilo (Tawny, LBV, Vintage). Las quintas (bodegas) de renombre empiezan a tener reconocimiento propio.",
    competingRegions: ["Ribera del Duero", "Priorat", "Ródano"],
    commonMistakes: [
      "No distinguir entre DOC Douro (tintos secos) y Porto (generosos): son productos muy diferentes",
      "No ofrecer Porto por copa: es la forma más efectiva de vender esta categoría",
      "Subestimar los blancos del Douro, que están ganando calidad y personalidad",
    ],
    pairings: ["Bacalhau à Brás (blanco)", "Carnes de caza (tinto)", "Queso Stilton (Porto Tawny)", "Chocolate (Porto LBV)", "Foie gras (Porto Vintage)"],
    faqs: [
      { q: "¿Cuál es la diferencia entre DOC Douro y Porto?", a: "DOC Douro son vinos secos (tintos y blancos) de la misma región. Porto es un vino fortificado (se añade aguardiente durante la fermentación) que puede ser dulce o seco, tinto o blanco." },
      { q: "¿Qué es un Porto Tawny?", a: "Es un Porto envejecido en barricas pequeñas por muchos años, desarrollando notas de frutos secos, caramelo y especias. Los Tawny con indicación de edad (10, 20, 30, 40 años) son extraordinarios." },
      { q: "¿Por qué los tintos del Douro son tan baratos para su calidad?", a: "El reconocimiento del Douro como región de tintos secos es relativamente reciente. A medida que crece la reputación, los precios suben, pero aún hay oportunidades excepcionales." },
    ],
    seo: {
      title: "Douro: Guía completa | Tintos, Porto y hostelería",
      description: "Todo sobre el Douro: Touriga Nacional, tintos DOC, vinos de Oporto y su rol en hostelería. Guía Winerim con enfoque comercial.",
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
