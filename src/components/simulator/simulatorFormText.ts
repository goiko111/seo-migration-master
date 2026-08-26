import type { SupportedLang } from "@/i18n/types";

/**
 * i18n for the wine-list simulator form.
 * IMPORTANT: option `value` strings are STABLE (Spanish canonical values already
 * expected by the backend/analytics). Only `label` is localized.
 */
export type Opt = { value: string; label: string };

export type SimulatorFormCopy = {
  steps: { restaurant: string; concept: string; client: string; list: string; contact: string };
  listIntro: string;
  contactIntro: string;
  labels: {
    name: string;
    city: string;
    country: string;
    cuisine: string;
    capacity: (n: number) => string;
    hasList: string;
    ticket: string;
    wps: string;
    wineService: string;
    sommelier: string;
    storage: string;
    clientProfile: string;
    priceSensitivity: string;
    priceQuality: string;
    pricePrice: string;
    wineKnowledge: string;
    originPreference: string;
    objective: string;
    budget: (v: string) => string;
    bevCost: string;
    minMargin: string;
    wineTypes: string;
    regions: string;
    listStyle: string;
    includeNatural: string;
    notes: string;
    yourName: string;
    email: string;
    phone: string;
    privacyPre: string;
    privacyLink: string;
  };
  placeholders: {
    name: string;
    city: string;
    select: string;
    notes: string;
    yourName: string;
    email: string;
    phone: string;
  };
  helpExistingListPre: string;
  helpExistingListLink: string;
  helpExistingListPost: string;
  errors: {
    name: string;
    city: string;
    country: string;
    cuisine: string;
    ticket: string;
    wps: string;
    wineService: string;
    sommelier: string;
    clientProfile: string;
    objective: string;
    yourName: string;
    email: string;
    privacy: string;
  };
  unlock: { sending: string; cta: string; invalidEmail: string; invalidName: string; invalidData: string };
  wpsLegendShow: string;
  wpsLegendHide: string;
  wpsZones: { name: string; desc: string; legend: string }[];
  options: {
    countries: Opt[];
    cuisine: Opt[];
    wineService: Opt[];
    clientProfiles: Opt[];
    wineKnowledge: Opt[];
    originPreference: Opt[];
    wineTypes: Opt[];
    bevCosts: Opt[];
    margins: Opt[];
    storage: Opt[];
    objective: Opt[];
    listStyle: Opt[];
    hasList: Opt[];
    sommelier: Opt[];
    includeNatural: Opt[];
  };
};

const COUNTRY_VALUES = ["ES", "FR", "IT", "PT", "UK", "US", "MX", "DE", "CH", "AR", "CL", "OTHER"];
const CUISINE_VALUES = ["Mediterránea", "Japonesa", "Fusión", "Bistrot", "Gastronómico", "Tapas", "Marisquería", "Parrilla", "Italiana", "Mexicana", "Asiática", "Otro"];
const SERVICE_VALUES = ["Solo botella", "Botella + copa", "Copa protagonista", "Maridaje incluido"];
const PROFILE_VALUES = ["Turista", "Local habitual", "Business", "Foodie", "Familiar", "Joven urbano"];
const KNOWLEDGE_VALUES = ["Bajo", "Medio", "Alto", "Experto"];
const ORIGIN_VALUES = ["Nacional", "Internacional", "Km0", "Sin preferencia"];
const WINE_TYPE_VALUES = ["Tinto", "Blanco", "Rosado", "Espumoso", "Champagne", "Postre", "Fortificado"];
const BEV_COST_VALUES = ["<25%", "25-30%", "30-35%", "35-40%", ">40%", "No sé"];
const MARGIN_VALUES = ["50%", "55%", "60%", "65%", "70%", "No sé"];
const STORAGE_VALUES = ["pequeno", "medio", "grande", "bodega_propia"];
const OBJECTIVE_VALUES = ["improve_margin", "increase_rotation", "reduce_waste", "new_list", "update_list"];
const LIST_STYLE_VALUES = ["clasica", "regiones", "progresiva", "mixta"];
const HAS_LIST_VALUES = ["no", "yes"];
const SOMMELIER_VALUES = ["si_dedicado", "si_compartido", "no"];
const NATURAL_VALUES = ["si", "no", "algunos"];

const zip = (values: string[], labels: string[]): Opt[] =>
  values.map((value, i) => ({ value, label: labels[i] ?? value }));

const es: SimulatorFormCopy = {
  steps: { restaurant: "Tu Restaurante", concept: "Tu Concepto", client: "Tu Cliente", list: "Tu Carta", contact: "Tus Datos" },
  listIntro: "Objetivos y preferencias para tu carta de vinos.",
  contactIntro: "Para enviarte el informe completo y guardar tu simulación.",
  labels: {
    name: "Nombre del restaurante", city: "Ciudad / Zona", country: "País", cuisine: "Tipo de cocina",
    capacity: (n) => `Aforo: ${n} comensales`, hasList: "¿Ya tiene carta de vinos?",
    ticket: "Ticket medio", wps: "Protagonismo del vino (WPS)", wineService: "Servicio de vino",
    sommelier: "¿Sommelier en sala?", storage: "Almacenamiento (opcional)",
    clientProfile: "Perfil de cliente", priceSensitivity: "Sensibilidad al precio",
    priceQuality: "Calidad ante todo", pricePrice: "El precio importa mucho",
    wineKnowledge: "Conocimiento de vino (opcional)", originPreference: "Preferencia de origen (opcional)",
    objective: "Objetivo principal", budget: (v) => `Presupuesto primera compra: ${v}`,
    bevCost: "Bev. Cost objetivo (opcional)", minMargin: "Margen mínimo deseado (opcional)",
    wineTypes: "Tipos de vino deseados (opcional)", regions: "Regiones preferidas (opcional)",
    listStyle: "Estilo de carta (opcional)", includeNatural: "¿Incluir vinos naturales? (opcional)",
    notes: "Notas adicionales (opcional)", yourName: "Tu nombre", email: "Email profesional",
    phone: "Teléfono (opcional)", privacyPre: "Acepto la", privacyLink: "política de privacidad",
  },
  placeholders: { name: "Casa Modelo", city: "Madrid", select: "Selecciona...", notes: "Ej: Queremos enfocarnos en vinos de autor...", yourName: "Ej: María García", email: "tu@restaurante.com", phone: "+34 600 000 000" },
  helpExistingListPre: "Si quieres analizar tu carta actual, usa nuestro",
  helpExistingListLink: "Analizador de Cartas",
  helpExistingListPost: "El simulador es para diseñar una carta nueva desde cero.",
  errors: {
    name: "Indica el nombre del restaurante", city: "Indica la ciudad o zona", country: "Selecciona el país",
    cuisine: "Selecciona al menos un tipo de cocina", ticket: "Selecciona el ticket medio",
    wps: "Define el protagonismo del vino", wineService: "Selecciona el servicio de vino",
    sommelier: "Indica si tienes sommelier", clientProfile: "Selecciona al menos un perfil de cliente",
    objective: "Selecciona tu objetivo principal", yourName: "Indica tu nombre", email: "Indica un email válido",
    privacy: "Debes aceptar la política de privacidad",
  },
  unlock: { sending: "Enviando...", cta: "🔓 Ver informe completo", invalidEmail: "Email inválido", invalidName: "Indica tu nombre", invalidData: "Datos inválidos" },
  wpsLegendShow: "Ver significado de cada nivel",
  wpsLegendHide: "Ocultar leyenda",
  wpsZones: [
    { name: "Complemento", desc: "El vino acompaña, la cocina manda", legend: "La cocina manda. El vino está ahí para acompañar, pero no es un diferencial. Ej: cafetería, bar de tapas informal." },
    { name: "Selección", desc: "Carta curada, no es lo principal pero importa", legend: "Hay una carta de vinos curada, pero no es el alma del local. Ej: bistró de barrio, gastrobar." },
    { name: "Enfoque", desc: "El vino es parte central de la experiencia", legend: "El vino es parte central de la experiencia. Se recomienda y hay cierta especialización." },
    { name: "Centro", desc: "Gran carta, sommelier activo, maridajes", legend: "Carta amplia, sommelier activo, maridajes y formación de equipo. Ej: restaurante gastronómico, hotel 4–5 estrellas." },
    { name: "Destino", desc: "Vinoteca / restaurante de vino, es la estrella", legend: "El vino es la razón de venir. Vinoteca, wine bar, listas de 500+ referencias, catas y eventos." },
  ],
  options: {
    countries: zip(COUNTRY_VALUES, ["España", "Francia", "Italia", "Portugal", "Reino Unido", "Estados Unidos", "México", "Alemania", "Suiza", "Argentina", "Chile", "Otro"]),
    cuisine: zip(CUISINE_VALUES, CUISINE_VALUES),
    wineService: zip(SERVICE_VALUES, SERVICE_VALUES),
    clientProfiles: zip(PROFILE_VALUES, PROFILE_VALUES),
    wineKnowledge: zip(KNOWLEDGE_VALUES, KNOWLEDGE_VALUES),
    originPreference: zip(ORIGIN_VALUES, ORIGIN_VALUES),
    wineTypes: zip(WINE_TYPE_VALUES, WINE_TYPE_VALUES),
    bevCosts: zip(BEV_COST_VALUES, ["<25%", "25-30%", "30-35%", "35-40%", ">40%", "No sé"]),
    margins: zip(MARGIN_VALUES, ["50%", "55%", "60%", "65%", "70%", "No sé"]),
    storage: zip(STORAGE_VALUES, ["Pequeño (<50 refs)", "Medio (50-150)", "Grande (150-300)", "Bodega propia (300+)"]),
    objective: zip(OBJECTIVE_VALUES, ["Mejorar margen", "Mayor rotación", "Reducir merma", "Carta desde cero", "Actualizar carta existente"]),
    listStyle: zip(LIST_STYLE_VALUES, ["Clásica (por tipos)", "Por regiones", "Progresiva (cuerpo/sabor)", "Mixta"]),
    hasList: zip(HAS_LIST_VALUES, ["No (nueva apertura)", "Sí (reestructuración)"]),
    sommelier: zip(SOMMELIER_VALUES, ["Sí, dedicado", "Sí, compartido", "No"]),
    includeNatural: zip(NATURAL_VALUES, ["Sí", "No", "Algunos"]),
  },
};

const en: SimulatorFormCopy = {
  steps: { restaurant: "Your restaurant", concept: "Your concept", client: "Your guests", list: "Your wine list", contact: "Your details" },
  listIntro: "Goals and preferences for your wine list.",
  contactIntro: "So we can send you the full report and save your simulation.",
  labels: {
    name: "Restaurant name", city: "City / Area", country: "Country", cuisine: "Cuisine type",
    capacity: (n) => `Seating: ${n} covers`, hasList: "Do you already have a wine list?",
    ticket: "Average ticket", wps: "Wine prominence (WPS)", wineService: "Wine service",
    sommelier: "Sommelier on the floor?", storage: "Storage (optional)",
    clientProfile: "Guest profile", priceSensitivity: "Price sensitivity",
    priceQuality: "Quality first", pricePrice: "Price matters a lot",
    wineKnowledge: "Wine knowledge (optional)", originPreference: "Origin preference (optional)",
    objective: "Main objective", budget: (v) => `First-purchase budget: ${v}`,
    bevCost: "Target bev. cost (optional)", minMargin: "Minimum desired margin (optional)",
    wineTypes: "Preferred wine types (optional)", regions: "Preferred regions (optional)",
    listStyle: "List style (optional)", includeNatural: "Include natural wines? (optional)",
    notes: "Additional notes (optional)", yourName: "Your name", email: "Work email",
    phone: "Phone (optional)", privacyPre: "I accept the", privacyLink: "privacy policy",
  },
  placeholders: { name: "Sample House", city: "London", select: "Select...", notes: "E.g. We want to focus on grower wines...", yourName: "E.g. Mary Jones", email: "you@restaurant.com", phone: "+44 7000 000000" },
  helpExistingListPre: "If you want to analyse your current list, use our",
  helpExistingListLink: "Wine List Analyser",
  helpExistingListPost: "The simulator is for designing a new list from scratch.",
  errors: {
    name: "Enter the restaurant name", city: "Enter the city or area", country: "Select the country",
    cuisine: "Select at least one cuisine type", ticket: "Select the average ticket",
    wps: "Define the wine prominence", wineService: "Select the wine service",
    sommelier: "Tell us if you have a sommelier", clientProfile: "Select at least one guest profile",
    objective: "Select your main objective", yourName: "Enter your name", email: "Enter a valid email",
    privacy: "You must accept the privacy policy",
  },
  unlock: { sending: "Sending...", cta: "🔓 View full report", invalidEmail: "Invalid email", invalidName: "Enter your name", invalidData: "Invalid data" },
  wpsLegendShow: "See what each level means",
  wpsLegendHide: "Hide legend",
  wpsZones: [
    { name: "Complement", desc: "Wine accompanies, the kitchen leads", legend: "The kitchen leads. Wine is there to accompany but is not a differentiator. E.g. café, informal tapas bar." },
    { name: "Selection", desc: "Curated list, not the main draw but it matters", legend: "There is a curated wine list, but it is not the soul of the venue. E.g. neighbourhood bistro, gastrobar." },
    { name: "Focus", desc: "Wine is a central part of the experience", legend: "Wine is central to the experience. It is recommended and there is some specialisation." },
    { name: "Core", desc: "Large list, active sommelier, pairings", legend: "Broad list, active sommelier, pairings and team training. E.g. fine-dining restaurant, 4–5 star hotel." },
    { name: "Destination", desc: "Wine bar / wine restaurant, wine is the star", legend: "Wine is the reason to come. Wine bar, lists of 500+ references, tastings and events." },
  ],
  options: {
    countries: zip(COUNTRY_VALUES, ["Spain", "France", "Italy", "Portugal", "United Kingdom", "United States", "Mexico", "Germany", "Switzerland", "Argentina", "Chile", "Other"]),
    cuisine: zip(CUISINE_VALUES, ["Mediterranean", "Japanese", "Fusion", "Bistro", "Fine dining", "Tapas", "Seafood", "Grill", "Italian", "Mexican", "Asian", "Other"]),
    wineService: zip(SERVICE_VALUES, ["Bottle only", "Bottle + by the glass", "By the glass led", "Pairing included"]),
    clientProfiles: zip(PROFILE_VALUES, ["Tourist", "Regular local", "Business", "Foodie", "Family", "Young urban"]),
    wineKnowledge: zip(KNOWLEDGE_VALUES, ["Low", "Medium", "High", "Expert"]),
    originPreference: zip(ORIGIN_VALUES, ["Domestic", "International", "Local (km 0)", "No preference"]),
    wineTypes: zip(WINE_TYPE_VALUES, ["Red", "White", "Rosé", "Sparkling", "Champagne", "Dessert", "Fortified"]),
    bevCosts: zip(BEV_COST_VALUES, ["<25%", "25-30%", "30-35%", "35-40%", ">40%", "Not sure"]),
    margins: zip(MARGIN_VALUES, ["50%", "55%", "60%", "65%", "70%", "Not sure"]),
    storage: zip(STORAGE_VALUES, ["Small (<50 refs)", "Medium (50-150)", "Large (150-300)", "Own cellar (300+)"]),
    objective: zip(OBJECTIVE_VALUES, ["Improve margin", "Higher rotation", "Reduce waste", "List from scratch", "Update existing list"]),
    listStyle: zip(LIST_STYLE_VALUES, ["Classic (by type)", "By region", "Progressive (body/flavour)", "Mixed"]),
    hasList: zip(HAS_LIST_VALUES, ["No (new opening)", "Yes (restructuring)"]),
    sommelier: zip(SOMMELIER_VALUES, ["Yes, dedicated", "Yes, shared", "No"]),
    includeNatural: zip(NATURAL_VALUES, ["Yes", "No", "Some"]),
  },
};

const it: SimulatorFormCopy = {
  steps: { restaurant: "Il tuo ristorante", concept: "Il tuo concept", client: "I tuoi clienti", list: "La tua carta", contact: "I tuoi dati" },
  listIntro: "Obiettivi e preferenze per la tua carta dei vini.",
  contactIntro: "Per inviarti il report completo e salvare la simulazione.",
  labels: {
    name: "Nome del ristorante", city: "Città / Zona", country: "Paese", cuisine: "Tipo di cucina",
    capacity: (n) => `Coperti: ${n}`, hasList: "Hai già una carta dei vini?",
    ticket: "Scontrino medio", wps: "Centralità del vino (WPS)", wineService: "Servizio del vino",
    sommelier: "Sommelier in sala?", storage: "Stoccaggio (opzionale)",
    clientProfile: "Profilo cliente", priceSensitivity: "Sensibilità al prezzo",
    priceQuality: "Prima la qualità", pricePrice: "Il prezzo conta molto",
    wineKnowledge: "Conoscenza del vino (opzionale)", originPreference: "Preferenza di origine (opzionale)",
    objective: "Obiettivo principale", budget: (v) => `Budget primo acquisto: ${v}`,
    bevCost: "Bev. cost obiettivo (opzionale)", minMargin: "Margine minimo desiderato (opzionale)",
    wineTypes: "Tipi di vino desiderati (opzionale)", regions: "Regioni preferite (opzionale)",
    listStyle: "Stile della carta (opzionale)", includeNatural: "Includere vini naturali? (opzionale)",
    notes: "Note aggiuntive (opzionale)", yourName: "Il tuo nome", email: "Email professionale",
    phone: "Telefono (opzionale)", privacyPre: "Accetto la", privacyLink: "informativa sulla privacy",
  },
  placeholders: { name: "Casa Modello", city: "Milano", select: "Seleziona...", notes: "Es: vogliamo puntare su vini d'autore...", yourName: "Es: Maria Rossi", email: "tu@ristorante.com", phone: "+39 300 000 0000" },
  helpExistingListPre: "Se vuoi analizzare la tua carta attuale, usa il nostro",
  helpExistingListLink: "Analizzatore di carte",
  helpExistingListPost: "Il simulatore serve a progettare una carta nuova da zero.",
  errors: {
    name: "Indica il nome del ristorante", city: "Indica la città o la zona", country: "Seleziona il paese",
    cuisine: "Seleziona almeno un tipo di cucina", ticket: "Seleziona lo scontrino medio",
    wps: "Definisci la centralità del vino", wineService: "Seleziona il servizio del vino",
    sommelier: "Indica se hai un sommelier", clientProfile: "Seleziona almeno un profilo cliente",
    objective: "Seleziona il tuo obiettivo principale", yourName: "Indica il tuo nome", email: "Indica un'email valida",
    privacy: "Devi accettare l'informativa sulla privacy",
  },
  unlock: { sending: "Invio...", cta: "🔓 Vedi il report completo", invalidEmail: "Email non valida", invalidName: "Indica il tuo nome", invalidData: "Dati non validi" },
  wpsLegendShow: "Vedi il significato di ogni livello",
  wpsLegendHide: "Nascondi la legenda",
  wpsZones: [
    { name: "Complemento", desc: "Il vino accompagna, comanda la cucina", legend: "Comanda la cucina. Il vino accompagna ma non è un elemento differenziante. Es: caffetteria, bar informale." },
    { name: "Selezione", desc: "Carta curata, non è il centro ma conta", legend: "C'è una carta curata, ma non è l'anima del locale. Es: bistrot di quartiere, gastrobar." },
    { name: "Focus", desc: "Il vino è parte centrale dell'esperienza", legend: "Il vino è centrale nell'esperienza. Viene consigliato e c'è una certa specializzazione." },
    { name: "Centro", desc: "Carta ampia, sommelier attivo, abbinamenti", legend: "Carta ampia, sommelier attivo, abbinamenti e formazione del team. Es: ristorante gastronomico, hotel 4–5 stelle." },
    { name: "Destinazione", desc: "Enoteca / ristorante di vino, il vino è la star", legend: "Il vino è il motivo della visita. Enoteca, wine bar, liste di 500+ referenze, degustazioni ed eventi." },
  ],
  options: {
    countries: zip(COUNTRY_VALUES, ["Spagna", "Francia", "Italia", "Portogallo", "Regno Unito", "Stati Uniti", "Messico", "Germania", "Svizzera", "Argentina", "Cile", "Altro"]),
    cuisine: zip(CUISINE_VALUES, ["Mediterranea", "Giapponese", "Fusion", "Bistrot", "Gastronomica", "Tapas", "Pesce", "Griglia", "Italiana", "Messicana", "Asiatica", "Altro"]),
    wineService: zip(SERVICE_VALUES, ["Solo bottiglia", "Bottiglia + calice", "Al calice protagonista", "Abbinamento incluso"]),
    clientProfiles: zip(PROFILE_VALUES, ["Turista", "Cliente abituale", "Business", "Foodie", "Famiglie", "Giovani urbani"]),
    wineKnowledge: zip(KNOWLEDGE_VALUES, ["Bassa", "Media", "Alta", "Esperto"]),
    originPreference: zip(ORIGIN_VALUES, ["Nazionale", "Internazionale", "Km 0", "Nessuna preferenza"]),
    wineTypes: zip(WINE_TYPE_VALUES, ["Rosso", "Bianco", "Rosato", "Spumante", "Champagne", "Dessert", "Fortificato"]),
    bevCosts: zip(BEV_COST_VALUES, ["<25%", "25-30%", "30-35%", "35-40%", ">40%", "Non so"]),
    margins: zip(MARGIN_VALUES, ["50%", "55%", "60%", "65%", "70%", "Non so"]),
    storage: zip(STORAGE_VALUES, ["Piccolo (<50 ref)", "Medio (50-150)", "Grande (150-300)", "Cantina propria (300+)"]),
    objective: zip(OBJECTIVE_VALUES, ["Migliorare il margine", "Maggiore rotazione", "Ridurre gli sprechi", "Carta da zero", "Aggiornare la carta esistente"]),
    listStyle: zip(LIST_STYLE_VALUES, ["Classica (per tipo)", "Per regioni", "Progressiva (corpo/sapore)", "Mista"]),
    hasList: zip(HAS_LIST_VALUES, ["No (nuova apertura)", "Sì (ristrutturazione)"]),
    sommelier: zip(SOMMELIER_VALUES, ["Sì, dedicato", "Sì, condiviso", "No"]),
    includeNatural: zip(NATURAL_VALUES, ["Sì", "No", "Alcuni"]),
  },
};

const fr: SimulatorFormCopy = {
  steps: { restaurant: "Votre restaurant", concept: "Votre concept", client: "Vos clients", list: "Votre carte", contact: "Vos coordonnées" },
  listIntro: "Objectifs et préférences pour votre carte des vins.",
  contactIntro: "Pour vous envoyer le rapport complet et enregistrer votre simulation.",
  labels: {
    name: "Nom du restaurant", city: "Ville / Zone", country: "Pays", cuisine: "Type de cuisine",
    capacity: (n) => `Capacité : ${n} couverts`, hasList: "Avez-vous déjà une carte des vins ?",
    ticket: "Ticket moyen", wps: "Place du vin (WPS)", wineService: "Service du vin",
    sommelier: "Sommelier en salle ?", storage: "Stockage (facultatif)",
    clientProfile: "Profil client", priceSensitivity: "Sensibilité au prix",
    priceQuality: "La qualité avant tout", pricePrice: "Le prix compte beaucoup",
    wineKnowledge: "Connaissance du vin (facultatif)", originPreference: "Préférence d'origine (facultatif)",
    objective: "Objectif principal", budget: (v) => `Budget premier achat : ${v}`,
    bevCost: "Bev. cost cible (facultatif)", minMargin: "Marge minimale souhaitée (facultatif)",
    wineTypes: "Types de vin souhaités (facultatif)", regions: "Régions préférées (facultatif)",
    listStyle: "Style de carte (facultatif)", includeNatural: "Inclure des vins naturels ? (facultatif)",
    notes: "Notes complémentaires (facultatif)", yourName: "Votre nom", email: "E-mail professionnel",
    phone: "Téléphone (facultatif)", privacyPre: "J'accepte la", privacyLink: "politique de confidentialité",
  },
  placeholders: { name: "Maison Modèle", city: "Paris", select: "Sélectionnez...", notes: "Ex : nous voulons privilégier les vins de vignerons...", yourName: "Ex : Marie Dupont", email: "vous@restaurant.com", phone: "+33 6 00 00 00 00" },
  helpExistingListPre: "Pour analyser votre carte actuelle, utilisez notre",
  helpExistingListLink: "Analyseur de cartes",
  helpExistingListPost: "Le simulateur sert à concevoir une nouvelle carte depuis zéro.",
  errors: {
    name: "Indiquez le nom du restaurant", city: "Indiquez la ville ou la zone", country: "Sélectionnez le pays",
    cuisine: "Sélectionnez au moins un type de cuisine", ticket: "Sélectionnez le ticket moyen",
    wps: "Définissez la place du vin", wineService: "Sélectionnez le service du vin",
    sommelier: "Indiquez si vous avez un sommelier", clientProfile: "Sélectionnez au moins un profil client",
    objective: "Sélectionnez votre objectif principal", yourName: "Indiquez votre nom", email: "Indiquez un e-mail valide",
    privacy: "Vous devez accepter la politique de confidentialité",
  },
  unlock: { sending: "Envoi...", cta: "🔓 Voir le rapport complet", invalidEmail: "E-mail invalide", invalidName: "Indiquez votre nom", invalidData: "Données invalides" },
  wpsLegendShow: "Voir la signification de chaque niveau",
  wpsLegendHide: "Masquer la légende",
  wpsZones: [
    { name: "Complément", desc: "Le vin accompagne, la cuisine domine", legend: "La cuisine domine. Le vin accompagne mais n'est pas un différenciateur. Ex : café, bar à tapas informel." },
    { name: "Sélection", desc: "Carte travaillée, importante sans être centrale", legend: "Il existe une carte travaillée, mais ce n'est pas l'âme du lieu. Ex : bistrot de quartier, gastrobar." },
    { name: "Focus", desc: "Le vin est au cœur de l'expérience", legend: "Le vin est central dans l'expérience. Il est recommandé et il y a une certaine spécialisation." },
    { name: "Centre", desc: "Grande carte, sommelier actif, accords", legend: "Carte large, sommelier actif, accords mets-vins et formation d'équipe. Ex : restaurant gastronomique, hôtel 4–5 étoiles." },
    { name: "Destination", desc: "Cave / restaurant de vin, le vin est la star", legend: "Le vin est la raison de la visite. Bar à vins, cartes de 500+ références, dégustations et événements." },
  ],
  options: {
    countries: zip(COUNTRY_VALUES, ["Espagne", "France", "Italie", "Portugal", "Royaume-Uni", "États-Unis", "Mexique", "Allemagne", "Suisse", "Argentine", "Chili", "Autre"]),
    cuisine: zip(CUISINE_VALUES, ["Méditerranéenne", "Japonaise", "Fusion", "Bistrot", "Gastronomique", "Tapas", "Fruits de mer", "Grillades", "Italienne", "Mexicaine", "Asiatique", "Autre"]),
    wineService: zip(SERVICE_VALUES, ["Bouteille uniquement", "Bouteille + verre", "Vin au verre en vedette", "Accord inclus"]),
    clientProfiles: zip(PROFILE_VALUES, ["Touriste", "Habitué local", "Business", "Foodie", "Familial", "Jeune urbain"]),
    wineKnowledge: zip(KNOWLEDGE_VALUES, ["Faible", "Moyenne", "Élevée", "Expert"]),
    originPreference: zip(ORIGIN_VALUES, ["National", "International", "Km 0", "Sans préférence"]),
    wineTypes: zip(WINE_TYPE_VALUES, ["Rouge", "Blanc", "Rosé", "Effervescent", "Champagne", "Dessert", "Muté"]),
    bevCosts: zip(BEV_COST_VALUES, ["<25%", "25-30%", "30-35%", "35-40%", ">40%", "Je ne sais pas"]),
    margins: zip(MARGIN_VALUES, ["50%", "55%", "60%", "65%", "70%", "Je ne sais pas"]),
    storage: zip(STORAGE_VALUES, ["Petit (<50 réfs)", "Moyen (50-150)", "Grand (150-300)", "Cave propre (300+)"]),
    objective: zip(OBJECTIVE_VALUES, ["Améliorer la marge", "Meilleure rotation", "Réduire la casse", "Carte depuis zéro", "Mettre à jour la carte"]),
    listStyle: zip(LIST_STYLE_VALUES, ["Classique (par type)", "Par régions", "Progressive (corps/saveur)", "Mixte"]),
    hasList: zip(HAS_LIST_VALUES, ["Non (nouvelle ouverture)", "Oui (restructuration)"]),
    sommelier: zip(SOMMELIER_VALUES, ["Oui, dédié", "Oui, partagé", "Non"]),
    includeNatural: zip(NATURAL_VALUES, ["Oui", "Non", "Quelques-uns"]),
  },
};

const de: SimulatorFormCopy = {
  steps: { restaurant: "Ihr Restaurant", concept: "Ihr Konzept", client: "Ihre Gäste", list: "Ihre Weinkarte", contact: "Ihre Daten" },
  listIntro: "Ziele und Präferenzen für Ihre Weinkarte.",
  contactIntro: "Damit wir Ihnen den vollständigen Bericht senden und Ihre Simulation speichern können.",
  labels: {
    name: "Name des Restaurants", city: "Stadt / Gebiet", country: "Land", cuisine: "Küchenstil",
    capacity: (n) => `Plätze: ${n} Gäste`, hasList: "Haben Sie bereits eine Weinkarte?",
    ticket: "Durchschnittsbon", wps: "Stellenwert des Weins (WPS)", wineService: "Weinservice",
    sommelier: "Sommelier im Service?", storage: "Lagerung (optional)",
    clientProfile: "Gästeprofil", priceSensitivity: "Preissensibilität",
    priceQuality: "Qualität zuerst", pricePrice: "Preis ist sehr wichtig",
    wineKnowledge: "Weinkenntnisse (optional)", originPreference: "Herkunftspräferenz (optional)",
    objective: "Hauptziel", budget: (v) => `Budget Erstkauf: ${v}`,
    bevCost: "Ziel-Bev-Cost (optional)", minMargin: "Gewünschte Mindestmarge (optional)",
    wineTypes: "Gewünschte Weintypen (optional)", regions: "Bevorzugte Regionen (optional)",
    listStyle: "Kartenstil (optional)", includeNatural: "Naturweine aufnehmen? (optional)",
    notes: "Zusätzliche Notizen (optional)", yourName: "Ihr Name", email: "Geschäftliche E-Mail",
    phone: "Telefon (optional)", privacyPre: "Ich akzeptiere die", privacyLink: "Datenschutzerklärung",
  },
  placeholders: { name: "Musterhaus", city: "Berlin", select: "Auswählen...", notes: "Z. B.: Wir möchten uns auf Winzerweine konzentrieren...", yourName: "Z. B.: Maria Müller", email: "sie@restaurant.com", phone: "+49 170 0000000" },
  helpExistingListPre: "Wenn Sie Ihre aktuelle Karte analysieren möchten, nutzen Sie unseren",
  helpExistingListLink: "Weinkarten-Analyzer",
  helpExistingListPost: "Der Simulator dient dazu, eine neue Karte von Grund auf zu gestalten.",
  errors: {
    name: "Bitte Namen des Restaurants angeben", city: "Bitte Stadt oder Gebiet angeben", country: "Bitte Land auswählen",
    cuisine: "Bitte mindestens einen Küchenstil auswählen", ticket: "Bitte Durchschnittsbon auswählen",
    wps: "Bitte Stellenwert des Weins festlegen", wineService: "Bitte Weinservice auswählen",
    sommelier: "Bitte angeben, ob Sie einen Sommelier haben", clientProfile: "Bitte mindestens ein Gästeprofil auswählen",
    objective: "Bitte Hauptziel auswählen", yourName: "Bitte Ihren Namen angeben", email: "Bitte gültige E-Mail angeben",
    privacy: "Sie müssen die Datenschutzerklärung akzeptieren",
  },
  unlock: { sending: "Senden...", cta: "🔓 Vollständigen Bericht ansehen", invalidEmail: "Ungültige E-Mail", invalidName: "Bitte Ihren Namen angeben", invalidData: "Ungültige Daten" },
  wpsLegendShow: "Bedeutung der Stufen anzeigen",
  wpsLegendHide: "Legende ausblenden",
  wpsZones: [
    { name: "Ergänzung", desc: "Wein begleitet, die Küche führt", legend: "Die Küche führt. Wein begleitet, ist aber kein Differenzierungsmerkmal. Z. B. Café, informelle Tapas-Bar." },
    { name: "Auswahl", desc: "Kuratierte Karte, wichtig, aber nicht zentral", legend: "Es gibt eine kuratierte Weinkarte, sie ist aber nicht die Seele des Lokals. Z. B. Stadtteil-Bistro, Gastrobar." },
    { name: "Fokus", desc: "Wein ist zentraler Teil des Erlebnisses", legend: "Wein ist zentral für das Erlebnis. Er wird empfohlen, es gibt eine gewisse Spezialisierung." },
    { name: "Zentrum", desc: "Große Karte, aktiver Sommelier, Pairings", legend: "Breite Karte, aktiver Sommelier, Weinbegleitungen und Teamschulungen. Z. B. Gourmetrestaurant, 4–5-Sterne-Hotel." },
    { name: "Destination", desc: "Vinothek / Weinrestaurant, Wein ist der Star", legend: "Wein ist der Grund zu kommen. Weinbar, Karten mit 500+ Positionen, Tastings und Events." },
  ],
  options: {
    countries: zip(COUNTRY_VALUES, ["Spanien", "Frankreich", "Italien", "Portugal", "Vereinigtes Königreich", "Vereinigte Staaten", "Mexiko", "Deutschland", "Schweiz", "Argentinien", "Chile", "Andere"]),
    cuisine: zip(CUISINE_VALUES, ["Mediterran", "Japanisch", "Fusion", "Bistro", "Gourmet", "Tapas", "Fisch & Meeresfrüchte", "Grill", "Italienisch", "Mexikanisch", "Asiatisch", "Andere"]),
    wineService: zip(SERVICE_VALUES, ["Nur Flasche", "Flasche + Glas", "Offener Ausschank im Fokus", "Weinbegleitung inklusive"]),
    clientProfiles: zip(PROFILE_VALUES, ["Touristen", "Stammgäste", "Business", "Foodies", "Familien", "Junges urbanes Publikum"]),
    wineKnowledge: zip(KNOWLEDGE_VALUES, ["Gering", "Mittel", "Hoch", "Experte"]),
    originPreference: zip(ORIGIN_VALUES, ["National", "International", "Regional (km 0)", "Keine Präferenz"]),
    wineTypes: zip(WINE_TYPE_VALUES, ["Rot", "Weiß", "Rosé", "Schaumwein", "Champagner", "Dessert", "Likörwein"]),
    bevCosts: zip(BEV_COST_VALUES, ["<25%", "25-30%", "30-35%", "35-40%", ">40%", "Weiß nicht"]),
    margins: zip(MARGIN_VALUES, ["50%", "55%", "60%", "65%", "70%", "Weiß nicht"]),
    storage: zip(STORAGE_VALUES, ["Klein (<50 Pos.)", "Mittel (50-150)", "Groß (150-300)", "Eigener Keller (300+)"]),
    objective: zip(OBJECTIVE_VALUES, ["Marge verbessern", "Höhere Rotation", "Schwund reduzieren", "Karte von Grund auf", "Bestehende Karte aktualisieren"]),
    listStyle: zip(LIST_STYLE_VALUES, ["Klassisch (nach Typ)", "Nach Regionen", "Progressiv (Körper/Geschmack)", "Gemischt"]),
    hasList: zip(HAS_LIST_VALUES, ["Nein (Neueröffnung)", "Ja (Neugestaltung)"]),
    sommelier: zip(SOMMELIER_VALUES, ["Ja, fest", "Ja, geteilt", "Nein"]),
    includeNatural: zip(NATURAL_VALUES, ["Ja", "Nein", "Einige"]),
  },
};

const pt: SimulatorFormCopy = {
  steps: { restaurant: "O seu restaurante", concept: "O seu conceito", client: "Os seus clientes", list: "A sua carta", contact: "Os seus dados" },
  listIntro: "Objetivos e preferências para a sua carta de vinhos.",
  contactIntro: "Para lhe enviarmos o relatório completo e guardar a sua simulação.",
  labels: {
    name: "Nome do restaurante", city: "Cidade / Zona", country: "País", cuisine: "Tipo de cozinha",
    capacity: (n) => `Lotação: ${n} lugares`, hasList: "Já tem carta de vinhos?",
    ticket: "Ticket médio", wps: "Protagonismo do vinho (WPS)", wineService: "Serviço de vinho",
    sommelier: "Escanção em sala?", storage: "Armazenamento (opcional)",
    clientProfile: "Perfil de cliente", priceSensitivity: "Sensibilidade ao preço",
    priceQuality: "Qualidade acima de tudo", pricePrice: "O preço importa muito",
    wineKnowledge: "Conhecimento de vinho (opcional)", originPreference: "Preferência de origem (opcional)",
    objective: "Objetivo principal", budget: (v) => `Orçamento primeira compra: ${v}`,
    bevCost: "Bev. cost objetivo (opcional)", minMargin: "Margem mínima desejada (opcional)",
    wineTypes: "Tipos de vinho desejados (opcional)", regions: "Regiões preferidas (opcional)",
    listStyle: "Estilo de carta (opcional)", includeNatural: "Incluir vinhos naturais? (opcional)",
    notes: "Notas adicionais (opcional)", yourName: "O seu nome", email: "Email profissional",
    phone: "Telefone (opcional)", privacyPre: "Aceito a", privacyLink: "política de privacidade",
  },
  placeholders: { name: "Casa Modelo", city: "Lisboa", select: "Selecione...", notes: "Ex: queremos focar em vinhos de autor...", yourName: "Ex: Maria Santos", email: "voce@restaurante.com", phone: "+351 900 000 000" },
  helpExistingListPre: "Se quiser analisar a sua carta atual, use o nosso",
  helpExistingListLink: "Analisador de Cartas",
  helpExistingListPost: "O simulador serve para desenhar uma carta nova de raiz.",
  errors: {
    name: "Indique o nome do restaurante", city: "Indique a cidade ou zona", country: "Selecione o país",
    cuisine: "Selecione pelo menos um tipo de cozinha", ticket: "Selecione o ticket médio",
    wps: "Defina o protagonismo do vinho", wineService: "Selecione o serviço de vinho",
    sommelier: "Indique se tem escanção", clientProfile: "Selecione pelo menos um perfil de cliente",
    objective: "Selecione o seu objetivo principal", yourName: "Indique o seu nome", email: "Indique um email válido",
    privacy: "Tem de aceitar a política de privacidade",
  },
  unlock: { sending: "A enviar...", cta: "🔓 Ver relatório completo", invalidEmail: "Email inválido", invalidName: "Indique o seu nome", invalidData: "Dados inválidos" },
  wpsLegendShow: "Ver o significado de cada nível",
  wpsLegendHide: "Ocultar legenda",
  wpsZones: [
    { name: "Complemento", desc: "O vinho acompanha, a cozinha manda", legend: "A cozinha manda. O vinho acompanha, mas não é um diferencial. Ex: cafetaria, bar de petiscos informal." },
    { name: "Seleção", desc: "Carta curada, não é o principal mas importa", legend: "Existe uma carta curada, mas não é a alma do espaço. Ex: bistrô de bairro, gastrobar." },
    { name: "Foco", desc: "O vinho é parte central da experiência", legend: "O vinho é central na experiência. É recomendado e há alguma especialização." },
    { name: "Centro", desc: "Carta ampla, escanção ativo, harmonizações", legend: "Carta ampla, escanção ativo, harmonizações e formação de equipa. Ex: restaurante gastronómico, hotel 4–5 estrelas." },
    { name: "Destino", desc: "Garrafeira / restaurante de vinho, é a estrela", legend: "O vinho é a razão da visita. Wine bar, cartas de 500+ referências, provas e eventos." },
  ],
  options: {
    countries: zip(COUNTRY_VALUES, ["Espanha", "França", "Itália", "Portugal", "Reino Unido", "Estados Unidos", "México", "Alemanha", "Suíça", "Argentina", "Chile", "Outro"]),
    cuisine: zip(CUISINE_VALUES, ["Mediterrânica", "Japonesa", "Fusão", "Bistrô", "Gastronómica", "Petiscos", "Marisqueira", "Grelhados", "Italiana", "Mexicana", "Asiática", "Outro"]),
    wineService: zip(SERVICE_VALUES, ["Só garrafa", "Garrafa + copo", "Copo protagonista", "Harmonização incluída"]),
    clientProfiles: zip(PROFILE_VALUES, ["Turista", "Local habitual", "Business", "Foodie", "Familiar", "Jovem urbano"]),
    wineKnowledge: zip(KNOWLEDGE_VALUES, ["Baixo", "Médio", "Alto", "Especialista"]),
    originPreference: zip(ORIGIN_VALUES, ["Nacional", "Internacional", "Km 0", "Sem preferência"]),
    wineTypes: zip(WINE_TYPE_VALUES, ["Tinto", "Branco", "Rosé", "Espumante", "Champagne", "Sobremesa", "Fortificado"]),
    bevCosts: zip(BEV_COST_VALUES, ["<25%", "25-30%", "30-35%", "35-40%", ">40%", "Não sei"]),
    margins: zip(MARGIN_VALUES, ["50%", "55%", "60%", "65%", "70%", "Não sei"]),
    storage: zip(STORAGE_VALUES, ["Pequeno (<50 refs)", "Médio (50-150)", "Grande (150-300)", "Garrafeira própria (300+)"]),
    objective: zip(OBJECTIVE_VALUES, ["Melhorar margem", "Maior rotação", "Reduzir quebras", "Carta de raiz", "Atualizar carta existente"]),
    listStyle: zip(LIST_STYLE_VALUES, ["Clássica (por tipos)", "Por regiões", "Progressiva (corpo/sabor)", "Mista"]),
    hasList: zip(HAS_LIST_VALUES, ["Não (nova abertura)", "Sim (reestruturação)"]),
    sommelier: zip(SOMMELIER_VALUES, ["Sim, dedicado", "Sim, partilhado", "Não"]),
    includeNatural: zip(NATURAL_VALUES, ["Sim", "Não", "Alguns"]),
  },
};

const FORM_DICT: Record<string, SimulatorFormCopy> = { es, en, it, fr, de, pt };

export function simulatorFormText(lang: SupportedLang | string | undefined): SimulatorFormCopy {
  return FORM_DICT[lang ?? "es"] ?? es;
}

/** Locale used for number formatting in the simulator. */
export const NUMBER_LOCALE: Record<string, string> = {
  es: "es-ES", en: "en-GB", it: "it-IT", fr: "fr-FR", de: "de-DE", pt: "pt-PT",
};

/** Localized progress-step labels (mirrors SIMULATION_TIMELINE order). */
export const TIMELINE_LABELS: Record<string, string[]> = {
  es: ["Analizando tu concepto...", "Calculando referencias ideales...", "Distribuyendo por tipo de vino...", "Definiendo gamas de precio...", "Configurando geografía del vino...", "Calculando métricas financieras...", "Generando recomendaciones IA..."],
  en: ["Analysing your concept...", "Calculating ideal references...", "Distributing by wine type...", "Defining price tiers...", "Setting up wine geography...", "Calculating financial metrics...", "Generating AI recommendations..."],
  it: ["Analisi del tuo concept...", "Calcolo delle referenze ideali...", "Distribuzione per tipo di vino...", "Definizione delle fasce di prezzo...", "Configurazione della geografia del vino...", "Calcolo delle metriche finanziarie...", "Generazione delle raccomandazioni IA..."],
  fr: ["Analyse de votre concept...", "Calcul des références idéales...", "Répartition par type de vin...", "Définition des gammes de prix...", "Configuration de la géographie du vin...", "Calcul des indicateurs financiers...", "Génération des recommandations IA..."],
  de: ["Ihr Konzept wird analysiert...", "Ideale Positionsanzahl wird berechnet...", "Verteilung nach Weintyp...", "Preisstufen werden definiert...", "Weingeografie wird konfiguriert...", "Finanzkennzahlen werden berechnet...", "KI-Empfehlungen werden erstellt..."],
  pt: ["A analisar o seu conceito...", "A calcular as referências ideais...", "A distribuir por tipo de vinho...", "A definir gamas de preço...", "A configurar a geografia do vinho...", "A calcular métricas financeiras...", "A gerar recomendações IA..."],
};
