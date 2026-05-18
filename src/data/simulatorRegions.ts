export const COUNTRIES: Array<{ code: string; label: string }> = [
  { code: "ES", label: "España" },
  { code: "FR", label: "Francia" },
  { code: "IT", label: "Italia" },
  { code: "PT", label: "Portugal" },
  { code: "UK", label: "Reino Unido" },
  { code: "US", label: "Estados Unidos" },
  { code: "MX", label: "México" },
  { code: "DE", label: "Alemania" },
  { code: "CH", label: "Suiza" },
  { code: "AR", label: "Argentina" },
  { code: "CL", label: "Chile" },
  { code: "OTHER", label: "Otro" },
];

export const REGIONS_BY_COUNTRY: Record<string, string[]> = {
  ES: ["Rioja", "Ribera del Duero", "Rías Baixas", "Priorat", "Rueda", "Penedés", "Jerez", "Navarra", "Toro", "Bierzo"],
  FR: ["Bordeaux", "Bourgogne", "Champagne", "Vallée du Rhône", "Loire", "Alsace", "Languedoc", "Provence"],
  IT: ["Toscana", "Piemonte", "Veneto", "Sicilia", "Puglia", "Alto Adige", "Friuli", "Campania"],
  PT: ["Douro", "Alentejo", "Dão", "Vinho Verde", "Lisboa", "Bairrada", "Setúbal"],
  MX: ["Valle de Guadalupe", "Querétaro", "Aguascalientes", "Parras"],
  US: ["Napa Valley", "Sonoma", "Oregon", "Washington", "Central Coast"],
  DE: ["Mosel", "Rheingau", "Pfalz", "Baden", "Rheinhessen"],
  AR: ["Mendoza", "Salta", "Patagonia", "San Juan"],
  CL: ["Maipo", "Colchagua", "Casablanca", "Maule"],
};

export const CUISINE_TYPES = [
  "Mediterránea", "Japonesa", "Fusión", "Bistrot", "Gastronómico", "Tapas",
  "Marisquería", "Parrilla", "Italiana", "Mexicana", "Asiática", "Otro",
];

export const TICKET_RANGES = ["<15€", "15-25€", "25-40€", "40-60€", "60-100€", ">100€"];

export const WINE_SERVICE = ["Solo botella", "Botella + copa", "Copa protagonista", "Maridaje incluido"];

export const CLIENT_PROFILES = ["Turista", "Local habitual", "Business", "Foodie", "Familiar", "Joven urbano"];

export const WINE_KNOWLEDGE = ["Bajo", "Medio", "Alto", "Experto"];

export const ORIGIN_PREFERENCE = ["Nacional", "Internacional", "Km0", "Sin preferencia"];

export const WINE_TYPES = ["Tinto", "Blanco", "Rosado", "Espumoso", "Champagne", "Postre", "Fortificado"];

export const BEV_COSTS = ["<25%", "25-30%", "30-35%", "35-40%", ">40%", "No sé"];
export const MARGINS = ["50%", "55%", "60%", "65%", "70%", "No sé"];

export const WPS_ZONES = [
  { min: 0,  max: 20,  icon: "🍷",         name: "Complemento", desc: "El vino acompaña, la cocina manda" },
  { min: 21, max: 40,  icon: "🍷🍷",       name: "Selección",   desc: "Carta curada, no es lo principal pero importa" },
  { min: 41, max: 60,  icon: "🍷🍷🍷",     name: "Enfoque",     desc: "El vino es parte central de la experiencia" },
  { min: 61, max: 80,  icon: "🍷🍷🍷🍷",   name: "Centro",      desc: "Gran carta, sommelier activo, maridajes" },
  { min: 81, max: 100, icon: "🍷🍷🍷🍷🍷", name: "Destino",     desc: "Vinoteca / restaurante de vino, es la estrella" },
];

export const WINE_TYPE_META: Record<string, { emoji: string; label: string }> = {
  tinto:       { emoji: "🔴", label: "Tinto" },
  blanco:      { emoji: "⚪", label: "Blanco" },
  rosado:      { emoji: "🌸", label: "Rosado" },
  espumoso:    { emoji: "🫧", label: "Espumoso" },
  postre:      { emoji: "🍯", label: "Postre" },
  fortificado: { emoji: "🥃", label: "Fortificado" },
  champagne:   { emoji: "🥂", label: "Champagne" },
};