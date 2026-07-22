export interface MarketSize {
  tam: number;
  filtered: number;
  sam: number;
  som: number;
}

export interface ChannelMixItem {
  label: string;
  value: number;
}

export interface PartnerMarket {
  code: string;
  name: string;
  duration: string;
  phase: 1 | 2 | 3;
  size: MarketSize;
  targetPartners: string[];
  targetIntegrations: string[];
  targetAnchors: string[];
  execution: string[];
  channelMix: ChannelMixItem[];
  risks: string[];
}

export const SPAIN_BASE = {
  code: "ES",
  name: "Espana",
  size: { tam: 80_000, filtered: 48_000, sam: 19_200, som: 4_800 },
  traction: [
    { value: "+2.000", label: "Restaurantes", note: "Experiencia acumulada con operaciones de vino" },
    { value: "+1.000", label: "Bodegas", note: "Gestionadas dentro del ecosistema Winerim" },
    { value: "15", label: "Paises", note: "Presencia y aprendizaje internacional" },
    { value: "6", label: "Idiomas", note: "ES, EN, FR, IT, DE y PT" },
  ],
  proof: [
    {
      title: "Producto operativo",
      items: ["Core Carta y Core Bodega", "Wine Cellar y Wine Lockers", "CloudRIM, Margenes, Supply, RIMs y SAVia"],
    },
    {
      title: "Clientes y casos reales",
      items: ["Restaurantes Michelin y Soles Repsol", "Hoteles y grupos de restauracion", "Testimonios y operativas reales de vino"],
    },
    {
      title: "Activos para escalar",
      items: ["Demo, web y producto en seis idiomas", "Onboarding, integraciones y soporte", "Contenido, Biblioteca del vino y formacion"],
    },
  ],
} as const;

export const PARTNER_MARKETS: PartnerMarket[] = [
  {
    code: "FR",
    name: "Francia",
    duration: "90-120 dias",
    phase: 1,
    size: { tam: 180_000, filtered: 108_000, sam: 43_200, som: 10_800 },
    targetPartners: ["UMIH", "Ecole du Vin de Bordeaux", "Distribuidores vinicolas regionales"],
    targetIntegrations: ["Lightspeed", "Zelty"],
    targetAnchors: ["Grupos hoteleros", "Restaurantes Michelin de Paris", "Grupos de brasseries"],
    execution: ["1 BDM + 0,5 SDR fractional", "Caso Michelin localizado", "Demo en frances", "Activacion sectorial en Bordeaux"],
    channelMix: [
      { label: "Partners", value: 40 }, { label: "Integraciones", value: 20 },
      { label: "Venta directa", value: 25 }, { label: "Referidos", value: 15 },
    ],
    risks: ["Ramp lento de canal", "Revision legal y GDPR", "Localizacion enologica profunda"],
  },
  {
    code: "IT",
    name: "Italia",
    duration: "90-120 dias",
    phase: 1,
    size: { tam: 150_000, filtered: 90_000, sam: 36_000, som: 9_000 },
    targetPartners: ["FIPE", "Associazione Italiana Sommelier", "Redes de distribucion vinculadas a Vinitaly"],
    targetIntegrations: ["Zucchetti", "GastroSoft"],
    targetAnchors: ["Osterie d'Italia", "Restaurantes Michelin de Milan y Roma", "Grupos hoteleros premium"],
    execution: ["1 BDM + 0,5 SDR fractional", "Casos Toscana/Piamonte", "Demo italiana", "Activacion Vinitaly"],
    channelMix: [
      { label: "Partners", value: 35 }, { label: "Integraciones", value: 25 },
      { label: "Venta directa", value: 25 }, { label: "Referidos", value: 15 },
    ],
    risks: ["Cultura del vino tradicional", "Integraciones POS lentas", "Estacionalidad turistica"],
  },
  {
    code: "PT",
    name: "Portugal",
    duration: "90-120 dias",
    phase: 1,
    size: { tam: 35_000, filtered: 21_000, sam: 8_400, som: 2_100 },
    targetPartners: ["AHRESP", "ViniPortugal", "Distribuidores de Douro y Alentejo"],
    targetIntegrations: ["PHC Software", "Vendus", "Sage Portugal"],
    targetAnchors: ["Restaurantes premiados de Lisboa y Porto", "Grupos hoteleros", "Bodegas premium"],
    execution: ["0,5 BDM + 0,25 SDR fractional", "Casos Vinho Verde/Douro", "Demo en portugues", "Activacion Essencia do Vinho"],
    channelMix: [
      { label: "Partners", value: 50 }, { label: "Integraciones", value: 20 },
      { label: "Venta directa", value: 20 }, { label: "Referidos", value: 10 },
    ],
    risks: ["Mercado de menor escala", "Diferenciacion frente a Espana", "Estacionalidad turistica"],
  },
  {
    code: "GB",
    name: "Reino Unido",
    duration: "120-150 dias",
    phase: 2,
    size: { tam: 90_000, filtered: 54_000, sam: 21_600, som: 5_400 },
    targetPartners: ["UKHospitality", "Wine & Spirit Trade Association", "Restaurant Association"],
    targetIntegrations: ["Epos Now", "Sage UK", "TouchBistro"],
    targetAnchors: ["Grupos de restauracion premium", "Restaurantes Michelin de Londres", "Hoteles internacionales"],
    execution: ["1 BDM + 0,5 SDR fractional", "Casos de vino premium", "Demo en ingles", "Activacion London Wine Fair"],
    channelMix: [
      { label: "Partners", value: 35 }, { label: "Integraciones", value: 30 },
      { label: "Venta directa", value: 25 }, { label: "Referidos", value: 10 },
    ],
    risks: ["Marco post-Brexit", "Foco fuera del canal pub", "Coste operativo elevado"],
  },
  {
    code: "DE",
    name: "Alemania",
    duration: "150-180 dias",
    phase: 2,
    size: { tam: 100_000, filtered: 60_000, sam: 24_000, som: 6_000 },
    targetPartners: ["DEHOGA", "Deutsches Weininstitut", "Distribuidores de Hamburgo y Munich"],
    targetIntegrations: ["SAP Business One", "Gastrofix", "DATEV"],
    targetAnchors: ["Restaurantes Michelin de Berlin y Munich", "Hoteles premium", "Grupos de restauracion de autor"],
    execution: ["1 BDM + 0,5 SDR fractional", "Casos Riesling e importacion", "Demo en aleman", "Activacion ProWein"],
    channelMix: [
      { label: "Partners", value: 40 }, { label: "Integraciones", value: 25 },
      { label: "Venta directa", value: 25 }, { label: "Referidos", value: 10 },
    ],
    risks: ["Foco en restaurantes de vino", "GDPR y proteccion de datos", "Altos estandares de calidad"],
  },
  {
    code: "MX",
    name: "Mexico",
    duration: "180-210 dias",
    phase: 2,
    size: { tam: 200_000, filtered: 120_000, sam: 48_000, som: 12_000 },
    targetPartners: ["CANIRAC", "Asociacion Mexicana de Sommeliers", "Distribuidores premium de CDMX y Guadalajara"],
    targetIntegrations: ["CONTPAQi", "Aspel", "Revel Systems"],
    targetAnchors: ["Restaurantes de Polanco y Roma Norte", "Hoteles premium", "Grupos de restauracion"],
    execution: ["1 BDM + 0,5 SDR fractional", "Casos de vino importado", "Demo localizada", "Activacion sectorial en CDMX"],
    channelMix: [
      { label: "Partners", value: 45 }, { label: "Integraciones", value: 20 },
      { label: "Venta directa", value: 25 }, { label: "Referidos", value: 10 },
    ],
    risks: ["Competencia de otras bebidas", "Volatilidad MXN", "Concentracion inicial en CDMX"],
  },
  {
    code: "US",
    name: "Estados Unidos",
    duration: "210-240 dias",
    phase: 3,
    size: { tam: 500_000, filtered: 450_000, sam: 180_000, som: 45_000 },
    targetPartners: ["National Restaurant Association", "Guild of Sommeliers", "Wine Institute of California"],
    targetIntegrations: ["Square for Restaurants", "Toast POS", "Resy"],
    targetAnchors: ["Restaurantes Michelin de Nueva York y San Francisco", "Grupos de fine dining", "Hospitality groups"],
    execution: ["2 BDM + 1 SDR fractional", "Casos Napa y vino europeo", "Demo en ingles", "Activacion Vinexpo America"],
    channelMix: [
      { label: "Partners", value: 30 }, { label: "Integraciones", value: 40 },
      { label: "Venta directa", value: 20 }, { label: "Referidos", value: 10 },
    ],
    risks: ["Competencia elevada", "Preferencias regionales", "CAC alto: foco enterprise"],
  },
  {
    code: "AR",
    name: "Argentina",
    duration: "120-150 dias",
    phase: 3,
    size: { tam: 40_000, filtered: 24_000, sam: 9_600, som: 2_400 },
    targetPartners: ["FEHGRA", "Asociacion Argentina de Sommeliers", "Distribuidores de Mendoza y Salta"],
    targetIntegrations: ["Bejerman", "Gestion Simple", "Siigo Argentina"],
    targetAnchors: ["Restaurantes de Palermo y Puerto Madero", "Hoteles boutique", "Grupos de restauracion"],
    execution: ["1 BDM + 0,5 SDR fractional", "Casos Malbec/Torrontes", "Demo localizada", "Activacion en Mendoza"],
    channelMix: [
      { label: "Partners", value: 40 }, { label: "Integraciones", value: 20 },
      { label: "Venta directa", value: 25 }, { label: "Referidos", value: 15 },
    ],
    risks: ["Inflacion y devaluacion", "Facturacion local", "Casos premium locales"],
  },
  {
    code: "CL",
    name: "Chile",
    duration: "120-150 dias",
    phase: 3,
    size: { tam: 30_000, filtered: 18_000, sam: 7_200, som: 1_800 },
    targetPartners: ["ACHIGA", "Asociacion de Sommeliers de Chile", "Distribuidores del Valle Central"],
    targetIntegrations: ["AURUS", "Bind ERP", "Siigo Chile"],
    targetAnchors: ["Restaurantes de Las Condes y Providencia", "Hoteles premium", "Vinas premium"],
    execution: ["1 BDM + 0,5 SDR fractional", "Casos Carmenere/Sauvignon Blanc", "Demo localizada", "Activacion sectorial"],
    channelMix: [
      { label: "Partners", value: 40 }, { label: "Integraciones", value: 25 },
      { label: "Venta directa", value: 20 }, { label: "Referidos", value: 15 },
    ],
    risks: ["Concentracion en Santiago", "Diferenciacion tecnologica", "Estacionalidad"],
  },
  {
    code: "CO",
    name: "Colombia",
    duration: "150-180 dias",
    phase: 3,
    size: { tam: 50_000, filtered: 30_000, sam: 12_000, som: 3_000 },
    targetPartners: ["ACODRES", "Academia Colombiana de Gastronomia", "Distribuidores de vino importado"],
    targetIntegrations: ["Siigo Colombia", "World Office", "Bind ERP Colombia"],
    targetAnchors: ["Restaurantes de Zona Rosa y Chapinero", "Hoteles internacionales", "Grupos de restauracion"],
    execution: ["1 BDM + 0,5 SDR fractional", "Casos de vino importado", "Demo localizada", "Activacion Expovinos"],
    channelMix: [
      { label: "Partners", value: 40 }, { label: "Integraciones", value: 20 },
      { label: "Venta directa", value: 30 }, { label: "Referidos", value: 10 },
    ],
    risks: ["Mercado emergente", "Volatilidad economica", "Concentracion inicial en Bogota"],
  },
  {
    code: "BR",
    name: "Brasil",
    duration: "180-240 dias",
    phase: 3,
    size: { tam: 250_000, filtered: 150_000, sam: 60_000, som: 15_000 },
    targetPartners: ["ABRASEL", "Associacao Brasileira de Sommeliers", "Distribuidores de Sao Paulo y Rio"],
    targetIntegrations: ["TOTVS", "iFood para empresas", "Linx"],
    targetAnchors: ["Restaurantes de Jardins y Vila Madalena", "Hoteles premium", "Grupos de restauracion"],
    execution: ["2 BDM + 1 SDR", "Casos de vino importado", "Demo en portugues", "Activacion Wine South America"],
    channelMix: [
      { label: "Partners", value: 35 }, { label: "Integraciones", value: 25 },
      { label: "Venta directa", value: 25 }, { label: "Referidos", value: 15 },
    ],
    risks: ["Complejidad fiscal", "Educacion de mercado", "Expansion gradual SP/RJ"],
  },
  {
    code: "PE",
    name: "Peru",
    duration: "120-150 dias",
    phase: 3,
    size: { tam: 35_000, filtered: 21_000, sam: 8_400, som: 2_100 },
    targetPartners: ["AHORA", "Le Cordon Bleu Lima", "Distribuidores de Miraflores y San Isidro"],
    targetIntegrations: ["Bind ERP Peru", "Siigo Peru", "Contifico"],
    targetAnchors: ["Restaurantes gourmet de Miraflores", "Hoteles premium", "Grupos de gastronomia peruana"],
    execution: ["1 BDM + 0,5 SDR fractional", "Casos de maridaje local", "Demo localizada", "Activacion gastronomica"],
    channelMix: [
      { label: "Partners", value: 45 }, { label: "Integraciones", value: 15 },
      { label: "Venta directa", value: 25 }, { label: "Referidos", value: 15 },
    ],
    risks: ["Concentracion en Lima", "Vino emergente frente a gastronomia", "Sensibilidad al precio"],
  },
];

export const ALL_MARKET_SIZES = [
  { code: SPAIN_BASE.code, name: SPAIN_BASE.name, ...SPAIN_BASE.size },
  ...PARTNER_MARKETS.map((market) => ({ code: market.code, name: market.name, ...market.size })),
];

export const MARKET_TOTALS = ALL_MARKET_SIZES.reduce(
  (totals, market) => ({
    tam: totals.tam + market.tam,
    filtered: totals.filtered + market.filtered,
    sam: totals.sam + market.sam,
    som: totals.som + market.som,
  }),
  { tam: 0, filtered: 0, sam: 0, som: 0 },
);

export const PHASES = [
  {
    number: 1,
    title: "Europa Sur",
    markets: "Espana, Francia, Italia y Portugal",
    reason: "Cultura del vino, proximidad operativa y activos ya localizados.",
  },
  {
    number: 2,
    title: "Mercados premium",
    markets: "Reino Unido, Alemania y Mexico",
    reason: "Alta densidad de restauracion premium, hubs urbanos y ecosistemas hospitality maduros.",
  },
  {
    number: 3,
    title: "Americas",
    markets: "Estados Unidos, Brasil, Colombia, Argentina, Chile y Peru",
    reason: "Escala, especializacion regional y entrada apoyada por partners locales.",
  },
] as const;
