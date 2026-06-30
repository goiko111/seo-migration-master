/**
 * Dynamic Rendering Edge Function — v2
 * 
 * Serves pre-rendered HTML to search engine bots and AI crawlers.
 * Human visitors get the normal SPA (index.html).
 * 
 * COVERAGE:
 * - 20+ static pages with full semantic HTML, hreflang, schema
 * - Dynamic SEO pages from seo_pages table
 * - Dynamic articles from articles table
 * - Fallback: SPA for humans
 */

const SITE = 'https://winerim.wine';
const OG_IMAGE = `${SITE}/og-image.png`;

const BOT_UA_PATTERNS = [
  'googlebot', 'bingbot', 'yandexbot', 'duckduckbot', 'baiduspider',
  'slurp', 'ia_archiver', 'facebot', 'facebookexternalhit',
  'twitterbot', 'linkedinbot', 'whatsapp', 'telegrambot',
  'applebot', 'semrushbot', 'ahrefsbot', 'mj12bot',
  'chatgpt-user', 'gptbot', 'claudebot', 'anthropic-ai',
  'perplexitybot', 'cohere-ai', 'bytespider',
  'google-extended', 'ccbot',
  'petalbot', 'sogou', 'exabot',
];

function isBot(ua: string): boolean {
  const lower = ua.toLowerCase();
  return BOT_UA_PATTERNS.some(p => lower.includes(p));
}

// ── Types ──
interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  lang: string;
  type: string;
  schemaType: string;
  robots?: string;
}

interface PageContent {
  h1: string;
  subtitle?: string;
  intro?: string;
  sections: { heading: string; content: string }[];
  faqs: { q: string; a: string }[];
  breadcrumbs: { name: string; url: string }[];
  internalLinks: { label: string; url: string }[];
}

interface HreflangEntry { lang: string; url: string }

const WINE_LIBRARY_HOME_HREFLANG: HreflangEntry[] = [
  { lang: 'es', url: `${SITE}/biblioteca-vino` },
  { lang: 'en', url: `${SITE}/en/wine-library` },
  { lang: 'it', url: `${SITE}/it/biblioteca-vino` },
  { lang: 'fr', url: `${SITE}/fr/bibliotheque-vin` },
  { lang: 'de', url: `${SITE}/de/weinbibliothek` },
  { lang: 'pt', url: `${SITE}/pt/biblioteca-vinho` },
  { lang: 'x-default', url: `${SITE}/biblioteca-vino` },
];

const WINE_LIBRARY_LANGS = ['es', 'en', 'it', 'fr', 'de', 'pt'] as const;
type WineLibraryLang = typeof WINE_LIBRARY_LANGS[number];

interface WineLibraryPathConfig {
  base: string;
  sections: Record<string, string>;
}

const WINE_LIBRARY_PATH_CONFIG: Record<WineLibraryLang, WineLibraryPathConfig> = {
  es: {
    base: '/biblioteca-vino',
    sections: {
      regiones: 'regiones',
      uvas: 'uvas',
      estilos: 'estilos',
      maridajes: 'maridajes',
      'guia-servicio': 'guia-servicio',
      glosario: 'glosario',
    },
  },
  en: {
    base: '/en/wine-library',
    sections: {
      regiones: 'regions',
      uvas: 'grapes',
      estilos: 'styles',
      maridajes: 'pairings',
      'guia-servicio': 'service-guide',
      glosario: 'glossary',
    },
  },
  it: {
    base: '/it/biblioteca-vino',
    sections: {
      regiones: 'regioni',
      uvas: 'vitigni',
      estilos: 'stili',
      maridajes: 'abbinamenti',
      'guia-servicio': 'guida-servizio',
      glosario: 'glossario',
    },
  },
  fr: {
    base: '/fr/bibliotheque-vin',
    sections: {
      regiones: 'regions',
      uvas: 'cepages',
      estilos: 'styles-de-vin',
      maridajes: 'accords',
      'guia-servicio': 'guide-service',
      glosario: 'glossaire',
    },
  },
  de: {
    base: '/de/weinbibliothek',
    sections: {
      regiones: 'regionen',
      uvas: 'rebsorten',
      estilos: 'weinstile',
      maridajes: 'weinbegleitung',
      'guia-servicio': 'service-guide',
      glosario: 'glossar',
    },
  },
  pt: {
    base: '/pt/biblioteca-vinho',
    sections: {
      regiones: 'regioes',
      uvas: 'castas',
      estilos: 'estilos',
      maridajes: 'harmonizacoes',
      'guia-servicio': 'guia-servico',
      glosario: 'glossario',
    },
  },
};

const WINE_LIBRARY_COPY: Record<WineLibraryLang, {
  home: string;
  sectionTitles: Record<string, string>;
  detailLabels: Record<string, string>;
  generatedIntro: (subject: string, type: string) => string;
  sectionIntro: (section: string) => string;
  breadcrumbsHome: string;
  faqTitle: string;
}> = {
  es: {
    home: 'Biblioteca de vino',
    sectionTitles: { regiones: 'Regiones vinícolas', uvas: 'Variedades de uva', estilos: 'Estilos de vino', maridajes: 'Maridajes', 'guia-servicio': 'Guía de servicio', glosario: 'Glosario del vino' },
    detailLabels: { regiones: 'región vinícola', uvas: 'variedad de uva', estilos: 'estilo de vino', maridajes: 'maridaje', article: 'guía de vino' },
    generatedIntro: (subject, type) => `${subject} forma parte de la biblioteca de vino de Winerim como ${type}. Esta página ayuda a equipos de sala y responsables de carta a conectar origen, estilo, servicio y decisión comercial.`,
    sectionIntro: (section) => `Explora ${section.toLowerCase()} con enfoque práctico para carta de vinos, venta en sala y formación interna.`,
    breadcrumbsHome: 'Inicio',
    faqTitle: 'Preguntas frecuentes',
  },
  en: {
    home: 'Wine library',
    sectionTitles: { regiones: 'Wine regions', uvas: 'Grape varieties', estilos: 'Wine styles', maridajes: 'Wine pairings', 'guia-servicio': 'Service guide', glosario: 'Wine glossary' },
    detailLabels: { regiones: 'wine region', uvas: 'grape variety', estilos: 'wine style', maridajes: 'wine pairing', article: 'wine guide' },
    generatedIntro: (subject, type) => `${subject} is part of the Winerim wine library as a ${type}. This page helps restaurant teams connect origin, style, service and commercial decisions.`,
    sectionIntro: (section) => `Explore ${section.toLowerCase()} with a practical angle for wine-list strategy, floor sales and staff training.`,
    breadcrumbsHome: 'Home',
    faqTitle: 'Frequently asked questions',
  },
  it: {
    home: 'Biblioteca del vino',
    sectionTitles: { regiones: 'Regioni vinicole', uvas: 'Vitigni', estilos: 'Stili di vino', maridajes: 'Abbinamenti', 'guia-servicio': 'Guida di servizio', glosario: 'Glossario del vino' },
    detailLabels: { regiones: 'regione vinicola', uvas: 'vitigno', estilos: 'stile di vino', maridajes: 'abbinamento', article: 'guida vino' },
    generatedIntro: (subject, type) => `${subject} fa parte della biblioteca del vino Winerim come ${type}. Questa pagina aiuta la sala a collegare origine, stile, servizio e decisione commerciale.`,
    sectionIntro: (section) => `Esplora ${section.toLowerCase()} con un taglio pratico per carta vini, vendita in sala e formazione interna.`,
    breadcrumbsHome: 'Home',
    faqTitle: 'Domande frequenti',
  },
  fr: {
    home: 'Bibliothèque du vin',
    sectionTitles: { regiones: 'Régions viticoles', uvas: 'Cépages', estilos: 'Styles de vin', maridajes: 'Accords mets-vins', 'guia-servicio': 'Guide de service', glosario: 'Glossaire du vin' },
    detailLabels: { regiones: 'région viticole', uvas: 'cépage', estilos: 'style de vin', maridajes: 'accord mets-vin', article: 'guide vin' },
    generatedIntro: (subject, type) => `${subject} fait partie de la bibliothèque du vin Winerim comme ${type}. Cette page aide les équipes à relier origine, style, service et décision commerciale.`,
    sectionIntro: (section) => `Explorez ${section.toLowerCase()} avec une approche pratique pour la carte, la vente en salle et la formation.`,
    breadcrumbsHome: 'Accueil',
    faqTitle: 'Questions fréquentes',
  },
  de: {
    home: 'Weinbibliothek',
    sectionTitles: { regiones: 'Weinregionen', uvas: 'Rebsorten', estilos: 'Weinstile', maridajes: 'Weinbegleitung', 'guia-servicio': 'Service-Guide', glosario: 'Weinglossar' },
    detailLabels: { regiones: 'Weinregion', uvas: 'Rebsorte', estilos: 'Weinstil', maridajes: 'Weinbegleitung', article: 'Wein-Guide' },
    generatedIntro: (subject, type) => `${subject} ist Teil der Winerim Weinbibliothek als ${type}. Diese Seite hilft Serviceteams, Herkunft, Stil, Service und kommerzielle Entscheidung zu verbinden.`,
    sectionIntro: (section) => `Entdecken Sie ${section.toLowerCase()} mit praktischem Fokus auf Weinkarte, Verkauf im Service und Teamtraining.`,
    breadcrumbsHome: 'Startseite',
    faqTitle: 'Häufige Fragen',
  },
  pt: {
    home: 'Biblioteca do vinho',
    sectionTitles: { regiones: 'Regiões vinícolas', uvas: 'Castas', estilos: 'Estilos de vinho', maridajes: 'Harmonizações', 'guia-servicio': 'Guia de serviço', glosario: 'Glossário do vinho' },
    detailLabels: { regiones: 'região vinícola', uvas: 'casta', estilos: 'estilo de vinho', maridajes: 'harmonização', article: 'guia de vinho' },
    generatedIntro: (subject, type) => `${subject} faz parte da biblioteca do vinho Winerim como ${type}. Esta página ajuda equipas de sala a ligar origem, estilo, serviço e decisão comercial.`,
    sectionIntro: (section) => `Explore ${section.toLowerCase()} com foco prático para carta de vinhos, venda em sala e formação interna.`,
    breadcrumbsHome: 'Início',
    faqTitle: 'Perguntas frequentes',
  },
};

function wineLibrarySectionFaqs(lang: WineLibraryLang, sectionTitle: string, description: string): { q: string; a: string }[] {
  const copy = ({
    es: {
      covers: `¿Qué incluye ${sectionTitle} en Winerim?`,
      use: '¿Cómo ayuda esta sección a gestionar una carta?',
      useAnswer: 'Ayuda a conectar origen, estilo, precio, servicio y maridaje para que el equipo de sala recomiende con más criterio.',
    },
    en: {
      covers: `What does ${sectionTitle} include in Winerim?`,
      use: 'How does this section help manage a wine list?',
      useAnswer: 'It helps connect origin, style, price, service and pairing so the floor team can recommend with more confidence.',
    },
    it: {
      covers: `Cosa include ${sectionTitle} in Winerim?`,
      use: 'Come aiuta questa sezione nella gestione della carta?',
      useAnswer: 'Aiuta a collegare origine, stile, prezzo, servizio e abbinamento per raccomandare con più criterio.',
    },
    fr: {
      covers: `Que comprend ${sectionTitle} dans Winerim ?`,
      use: 'Comment cette section aide-t-elle à gérer une carte ?',
      useAnswer: 'Elle aide à relier origine, style, prix, service et accord pour recommander avec plus de méthode.',
    },
    de: {
      covers: `Was umfasst ${sectionTitle} in Winerim?`,
      use: 'Wie hilft dieser Bereich bei der Weinkartensteuerung?',
      useAnswer: 'Er verbindet Herkunft, Stil, Preis, Service und Pairing, damit das Team sicherer empfehlen kann.',
    },
    pt: {
      covers: `O que inclui ${sectionTitle} na Winerim?`,
      use: 'Como é que esta secção ajuda a gerir a carta?',
      useAnswer: 'Ajuda a ligar origem, estilo, preço, serviço e harmonização para a equipa recomendar com mais critério.',
    },
  } as Record<WineLibraryLang, { covers: string; use: string; useAnswer: string }>)[lang];

  return [
    { q: copy.covers, a: description },
    { q: copy.use, a: copy.useAnswer },
  ];
}

interface WineLibraryPriorityProfile {
  serviceTemp: string;
  glass: string;
  role: Record<WineLibraryLang, string>;
  cue: Record<WineLibraryLang, string>;
  avoid: Record<WineLibraryLang, string>;
  hooks: Record<WineLibraryLang, string[]>;
}

const WINE_LIBRARY_PRIORITY_GRAPES: Record<string, WineLibraryPriorityProfile> = {
  tempranillo: {
    serviceTemp: '16-18 C',
    glass: 'Burdeos / Bordeaux',
    role: {
      es: 'Tinto de confianza para sostener rotación, ordenar la carta por regiones reconocibles y cubrir el espacio de Rioja, Ribera o Toro.',
      en: 'Trust-building red that supports rotation, organizes the list around recognizable regions and covers the Rioja, Ribera or Toro slot.',
      it: 'Rosso di fiducia per sostenere rotazione, ordinare la carta per regioni riconoscibili e coprire Rioja, Ribera o Toro.',
      fr: 'Rouge de confiance pour soutenir la rotation, structurer la carte par regions reconnues et couvrir Rioja, Ribera ou Toro.',
      de: 'Verlasslicher Rotwein fur Rotation, klare Regionenlogik und den Platz von Rioja, Ribera oder Toro.',
      pt: 'Tinto de confianca para sustentar rotacao, organizar a carta por regioes reconheciveis e cobrir Rioja, Ribera ou Toro.',
    },
    cue: {
      es: 'Presenta primero la región y después la uva: el cliente compra confianza antes que taxonomía.',
      en: 'Lead with the region, then the grape: guests buy confidence before taxonomy.',
      it: 'Presenta prima la regione e poi il vitigno: il cliente compra fiducia prima della tassonomia.',
      fr: 'Presentez la region puis le cepage : le client achete la confiance avant la taxonomie.',
      de: 'Zuerst die Region nennen, dann die Rebsorte: Gaste kaufen Vertrauen vor Taxonomie.',
      pt: 'Apresente primeiro a regiao e depois a casta: o cliente compra confianca antes de taxonomia.',
    },
    avoid: {
      es: 'No limitar la oferta a crianzas y reservas; deja también una lectura joven, fresca o de productor.',
      en: 'Do not limit the offer to crianza/reserva styles; include a younger, fresher or producer-led expression.',
      it: 'Non limitare la scelta a crianza e reserva; includi anche una lettura giovane, fresca o di produttore.',
      fr: 'Ne limitez pas la selection aux crianza et reserva ; ajoutez aussi une expression jeune, fraiche ou de producteur.',
      de: 'Nicht nur Crianza/Reserva zeigen; auch junge, frische oder produzentenstarke Ausdrucke anbieten.',
      pt: 'Nao limitar a oferta a crianzas e reservas; inclua tambem uma leitura jovem, fresca ou de produtor.',
    },
    hooks: {
      es: ['cordero asado', 'ibéricos', 'quesos curados'],
      en: ['roasted lamb', 'Iberian pork', 'aged cheeses'],
      it: ['agnello arrosto', 'maiale iberico', 'formaggi stagionati'],
      fr: ['agneau roti', 'porc iberique', 'fromages affines'],
      de: ['Lammbraten', 'Iberico', 'gereifter Kase'],
      pt: ['borrego assado', 'porco iberico', 'queijos curados'],
    },
  },
  albarino: {
    serviceTemp: '8-10 C',
    glass: 'Blanco aromático / aromatic white',
    role: {
      es: 'Blanco de mar y frescura, muy útil por copa y fácil de recomendar en mesas de pescado o marisco.',
      en: 'Seafood and freshness white, useful by the glass and easy to recommend at fish or shellfish tables.',
      it: 'Bianco di mare e freschezza, utile al calice e facile da consigliare con pesce o frutti di mare.',
      fr: 'Blanc de mer et de fraicheur, utile au verre et facile a recommander avec poisson ou fruits de mer.',
      de: 'Frischer Wein zu Fisch und Meer, stark im Glasverkauf und leicht im Service zu empfehlen.',
      pt: 'Branco de mar e frescura, util a copo e facil de recomendar em mesas de peixe ou marisco.',
    },
    cue: {
      es: 'Vende salinidad, precisión y frescura; debe sonar a costa, no a blanco genérico.',
      en: 'Sell salinity, precision and freshness; the message should feel coastal, not generic.',
      it: 'Vendi salinita, precisione e freschezza; deve evocare la costa, non un bianco generico.',
      fr: 'Vendez salinite, precision et fraicheur ; le message doit evoquer la cote, pas un blanc generique.',
      de: 'Salinitat, Prazision und Frische verkaufen; die Botschaft soll nach Kuste klingen.',
      pt: 'Venda salinidade, precisao e frescura; deve soar a costa, nao a branco generico.',
    },
    avoid: {
      es: 'No servir tibio; pierde tensión y se parece a cualquier blanco aromático.',
      en: 'Do not serve lukewarm; it loses tension and becomes just another aromatic white.',
      it: 'Non servirlo tiepido; perde tensione e diventa un bianco aromatico qualunque.',
      fr: 'Ne pas servir tiede ; il perd sa tension et devient un blanc aromatique quelconque.',
      de: 'Nicht lauwarm servieren; Spannung und Prazision gehen verloren.',
      pt: 'Nao servir morno; perde tensao e parece apenas mais um branco aromatico.',
    },
    hooks: {
      es: ['marisco', 'ceviche', 'sushi'],
      en: ['shellfish', 'ceviche', 'sushi'],
      it: ['frutti di mare', 'ceviche', 'sushi'],
      fr: ['fruits de mer', 'ceviche', 'sushi'],
      de: ['Meeresfruchte', 'Ceviche', 'Sushi'],
      pt: ['marisco', 'ceviche', 'sushi'],
    },
  },
  garnacha: {
    serviceTemp: '15-17 C',
    glass: 'Borgoña / Burgundy',
    role: {
      es: 'Tinto mediterráneo para diferenciar la carta con fruta, origen y viñas viejas sin alejarse del gusto reconocible.',
      en: 'Mediterranean red that differentiates the list through fruit, origin and old vines without losing familiarity.',
      it: 'Rosso mediterraneo che differenzia la carta con frutto, origine e vigne vecchie senza perdere familiarita.',
      fr: 'Rouge mediterraneen qui differencie la carte par fruit, origine et vieilles vignes sans perdre les reperes connus.',
      de: 'Mediterraner Rotwein fur Differenzierung durch Frucht, Herkunft und alte Reben.',
      pt: 'Tinto mediterranico para diferenciar a carta com fruta, origem e vinha velha sem perder familiaridade.',
    },
    cue: {
      es: 'Si hay viña vieja, altura u origen concreto, dilo pronto: ahí se justifica el precio.',
      en: 'If old vines, altitude or precise origin matter, say it early: that is where price is justified.',
      it: 'Se ci sono vigne vecchie, altitudine o origine precisa, dillo presto: li nasce il prezzo.',
      fr: 'Si vieilles vignes, altitude ou origine precise comptent, dites-le tot : c est la que le prix se justifie.',
      de: 'Wenn alte Reben, Hohe oder Herkunft wichtig sind, fruh nennen: dort entsteht der Preis.',
      pt: 'Se houver vinha velha, altitude ou origem precisa, diga cedo: e ai que o preco se justifica.',
    },
    avoid: {
      es: 'No servir demasiado caliente: el alcohol gana peso y la fruta se vuelve pesada.',
      en: 'Do not serve too warm: alcohol becomes heavier and fruit feels jammy.',
      it: 'Non servirlo troppo caldo: alcol e frutto diventano pesanti.',
      fr: 'Ne pas servir trop chaud : l alcool prend le dessus et le fruit devient lourd.',
      de: 'Nicht zu warm servieren: Alkohol wirkt schwerer und Frucht wird marmeladig.',
      pt: 'Nao servir demasiado quente: o alcool pesa e a fruta fica pesada.',
    },
    hooks: {
      es: ['carnes a la brasa', 'verduras asadas', 'arroces sabrosos'],
      en: ['grilled meats', 'roasted vegetables', 'savoury rice dishes'],
      it: ['carni alla griglia', 'verdure arrosto', 'risotti saporiti'],
      fr: ['viandes grillees', 'legumes rotis', 'riz savoureux'],
      de: ['Grillfleisch', 'gerostetes Gemuse', 'kraftige Reisgerichte'],
      pt: ['carnes grelhadas', 'legumes assados', 'arrozes saborosos'],
    },
  },
  verdejo: {
    serviceTemp: '7-9 C',
    glass: 'Blanco joven / young white',
    role: {
      es: 'Blanco de entrada y alta rotación que necesita contexto para no convertirse en commodity.',
      en: 'High-rotation entry white that needs context so it does not become a commodity.',
      it: 'Bianco di ingresso ad alta rotazione che richiede contesto per non diventare commodity.',
      fr: 'Blanc d entree a forte rotation qui demande du contexte pour ne pas devenir une commodity.',
      de: 'Weisser Einstieg mit hoher Rotation, der Kontext braucht, um nicht beliebig zu wirken.',
      pt: 'Branco de entrada e alta rotacao que precisa de contexto para nao virar commodity.',
    },
    cue: {
      es: 'Usa lenguaje directo: fresco, cítrico y ágil; después añade productor o zona.',
      en: 'Use direct language: fresh, citrus-driven and agile; then add producer or zone.',
      it: 'Usa un linguaggio diretto: fresco, agrumato e agile; poi aggiungi produttore o zona.',
      fr: 'Utilisez un langage direct : frais, agrume et agile ; puis ajoutez producteur ou zone.',
      de: 'Direkt sprechen: frisch, zitrisch und agil; danach Produzent oder Zone nennen.',
      pt: 'Use linguagem direta: fresco, citrico e agil; depois acrescente produtor ou zona.',
    },
    avoid: {
      es: 'No tratarlo como simple blanco de la casa si la referencia tiene origen o productor defendible.',
      en: 'Do not treat it as simple house white if the reference has a defendable producer or origin.',
      it: 'Non trattarlo come semplice vino della casa se produttore o origine sono difendibili.',
      fr: 'Ne pas le traiter comme simple blanc maison si producteur ou origine sont defendables.',
      de: 'Nicht als einfachen Hauswein behandeln, wenn Produzent oder Herkunft stark sind.',
      pt: 'Nao tratar como simples vinho da casa se houver produtor ou origem defensavel.',
    },
    hooks: {
      es: ['tapas', 'ensaladas', 'pescado blanco'],
      en: ['tapas', 'salads', 'white fish'],
      it: ['tapas', 'insalate', 'pesce bianco'],
      fr: ['tapas', 'salades', 'poisson blanc'],
      de: ['Tapas', 'Salate', 'weisser Fisch'],
      pt: ['tapas', 'saladas', 'peixe branco'],
    },
  },
  godello: {
    serviceTemp: '9-11 C',
    glass: 'Blanco con volumen / textured white',
    role: {
      es: 'Blanco premium para subir ticket: textura, mineralidad y gastronomía lo separan del blanco fácil.',
      en: 'Premium white for higher spend: texture, minerality and food relevance separate it from easy whites.',
      it: 'Bianco premium per alzare lo scontrino: texture, mineralita e gastronomia lo separano dai bianchi facili.',
      fr: 'Blanc premium pour augmenter le ticket : texture, mineralite et gastronomie le separent des blancs faciles.',
      de: 'Premium-Weisswein fur hoheren Bon: Textur, Mineralitat und Gastronomie heben ihn ab.',
      pt: 'Branco premium para subir ticket: textura, mineralidade e gastronomia separam-no do branco facil.',
    },
    cue: {
      es: 'Explica textura y mineralidad antes que aromas; es el puente hacia un blanco más serio.',
      en: 'Explain texture and minerality before aromas; it is the bridge to a more serious white.',
      it: 'Spiega texture e mineralita prima degli aromi; e il ponte verso un bianco piu serio.',
      fr: 'Expliquez texture et mineralite avant les aromes ; c est le pont vers un blanc plus serieux.',
      de: 'Textur und Mineralitat vor Aromen erklaren; das ist der Weg zum ernsteren Weisswein.',
      pt: 'Explique textura e mineralidade antes dos aromas; e a ponte para um branco mais serio.',
    },
    avoid: {
      es: 'No esconderlo entre blancos genéricos: necesita una frase de valor para capturar margen.',
      en: 'Do not hide it among generic whites: it needs one value sentence to capture margin.',
      it: 'Non nasconderlo tra bianchi generici: serve una frase di valore per catturare margine.',
      fr: 'Ne pas le cacher parmi les blancs generiques : une phrase de valeur capte la marge.',
      de: 'Nicht zwischen generischen Weissweinen verstecken: ein Wertsatz holt Marge heraus.',
      pt: 'Nao esconder entre brancos genericos: precisa de uma frase de valor para capturar margem.',
    },
    hooks: {
      es: ['aves', 'pescados con salsa', 'arroces'],
      en: ['poultry', 'fish with sauce', 'rice dishes'],
      it: ['pollame', 'pesce con salsa', 'risotti'],
      fr: ['volaille', 'poisson en sauce', 'riz'],
      de: ['Geflugel', 'Fisch mit Sauce', 'Reisgerichte'],
      pt: ['aves', 'peixe com molho', 'arrozes'],
    },
  },
  chardonnay: {
    serviceTemp: '9-12 C',
    glass: 'Borgoña blanco / white Burgundy',
    role: {
      es: 'Blanco global que necesita explicar estilo: con barrica, sin barrica, fresco, cremoso o mineral.',
      en: 'Global white that needs style clarity: oaked, unoaked, fresh, creamy or mineral.',
      it: 'Bianco globale che richiede chiarezza di stile: con legno, senza legno, fresco, cremoso o minerale.',
      fr: 'Blanc mondial qui exige une lecture de style : boise, non boise, frais, cremeux ou mineral.',
      de: 'Globaler Weisswein, der klare Stilbeschreibung braucht: Holz, kein Holz, frisch, cremig oder mineralisch.',
      pt: 'Branco global que precisa de clareza de estilo: com madeira, sem madeira, fresco, cremoso ou mineral.',
    },
    cue: {
      es: 'Aclara el estilo en una frase antes de hablar de aromas; evita que el cliente tema una barrica no deseada.',
      en: 'Clarify the style in one line before aromas; avoid unwanted oak anxiety.',
      it: 'Chiarisci lo stile in una frase prima degli aromi; evita il timore di legno indesiderato.',
      fr: 'Clarifiez le style en une phrase avant les aromes ; evitez la crainte du bois non souhaite.',
      de: 'Den Stil vor den Aromen klaren; so entsteht keine Sorge vor unerwunschtem Holz.',
      pt: 'Clarifique o estilo numa frase antes dos aromas; evita receio de madeira indesejada.',
    },
    avoid: {
      es: 'No dejar al cliente adivinar si tiene barrica. Es la primera pregunta comercial.',
      en: 'Do not leave guests guessing about oak. It is the first commercial question.',
      it: 'Non lasciare il cliente a indovinare se ha legno. E la prima domanda commerciale.',
      fr: 'Ne laissez pas le client deviner s il y a du bois. C est la premiere question commerciale.',
      de: 'Gaste nicht raten lassen, ob Holz im Spiel ist. Das ist die erste Verkaufsfrage.',
      pt: 'Nao deixe o cliente adivinhar se tem madeira. E a primeira pergunta comercial.',
    },
    hooks: {
      es: ['aves', 'salsas de mantequilla', 'pescados con salsa'],
      en: ['poultry', 'butter sauces', 'fish with creamy sauces'],
      it: ['pollame', 'salse al burro', 'pesce con salse cremose'],
      fr: ['volaille', 'sauces au beurre', 'poisson en sauce cremeuse'],
      de: ['Geflugel', 'Buttersaucen', 'Fisch mit cremigen Saucen'],
      pt: ['aves', 'molhos de manteiga', 'peixe com molhos cremosos'],
    },
  },
  'cabernet-sauvignon': {
    serviceTemp: '16-18 C',
    glass: 'Burdeos amplia / large Bordeaux',
    role: {
      es: 'Tinto premium internacional para carnes, estructura y comparación con tintos locales de gama alta.',
      en: 'International premium red for meat, structure and comparison with high-end local reds.',
      it: 'Rosso premium internazionale per carni, struttura e confronto con rossi locali di fascia alta.',
      fr: 'Rouge premium international pour viandes, structure et comparaison avec des rouges locaux haut de gamme.',
      de: 'Internationaler Premium-Rotwein fur Fleisch, Struktur und Vergleich mit hochwertigen lokalen Rotweinen.',
      pt: 'Tinto premium internacional para carnes, estrutura e comparacao com tintos locais de gama alta.',
    },
    cue: {
      es: 'Véndelo desde plato, tanino y estructura; funciona peor como copa casual si es joven.',
      en: 'Sell it through dish, tannin and structure; young bottles work less well as casual glasses.',
      it: 'Vendilo con piatto, tannino e struttura; da giovane funziona peggio come calice casuale.',
      fr: 'Vendez-le par le plat, le tanin et la structure ; jeune, il marche moins comme verre casual.',
      de: 'Uber Gericht, Tannin und Struktur verkaufen; jung weniger als spontanes Glas geeignet.',
      pt: 'Venda por prato, tanino e estrutura; jovem funciona pior como copo casual.',
    },
    avoid: {
      es: 'No recomendarlo sin comida si el tanino está duro; puede parecer agresivo.',
      en: 'Do not recommend a tannic young bottle without food; it may feel aggressive.',
      it: 'Non consigliarlo senza cibo se il tannino e duro; puo sembrare aggressivo.',
      fr: 'Ne pas le recommander sans plat si le tanin est dur ; il peut paraitre agressif.',
      de: 'Tanninreiche junge Flaschen nicht ohne Essen empfehlen; sie konnen aggressiv wirken.',
      pt: 'Nao recomende garrafas jovens e tanicas sem comida; podem parecer agressivas.',
    },
    hooks: {
      es: ['steak', 'carnes a la brasa', 'quesos curados'],
      en: ['steak', 'grilled meats', 'aged cheeses'],
      it: ['bistecca', 'carni alla griglia', 'formaggi stagionati'],
      fr: ['steak', 'viandes grillees', 'fromages affines'],
      de: ['Steak', 'Grillfleisch', 'gereifter Kase'],
      pt: ['bife', 'carnes grelhadas', 'queijos curados'],
    },
  },
  'pinot-noir': {
    serviceTemp: '13-15 C',
    glass: 'Borgoña amplia / large Burgundy',
    role: {
      es: 'Tinto fino y elegante para clientes que buscan menos potencia, menos madera y más precisión.',
      en: 'Elegant red for guests seeking less power, less oak and more precision.',
      it: 'Rosso fine ed elegante per clienti che cercano meno potenza, meno legno e piu precisione.',
      fr: 'Rouge fin et elegant pour clients qui cherchent moins de puissance, moins de bois et plus de precision.',
      de: 'Eleganter Rotwein fur Gaste, die weniger Kraft, weniger Holz und mehr Prazision suchen.',
      pt: 'Tinto fino e elegante para clientes que procuram menos potencia, menos madeira e mais precisao.',
    },
    cue: {
      es: 'Posiciónalo como elegante, no como ligero sin valor; sirve algo fresco y habla de finura.',
      en: 'Position it as elegant, not weak; serve slightly cool and talk about finesse.',
      it: 'Posizionalo come elegante, non debole; servilo leggermente fresco e parla di finezza.',
      fr: 'Positionnez-le comme elegant, pas faible ; servez un peu frais et parlez de finesse.',
      de: 'Als elegant positionieren, nicht als schwach; leicht kuhler servieren und uber Finesse sprechen.',
      pt: 'Posicione como elegante, nao como fraco; sirva ligeiramente fresco e fale de finura.',
    },
    avoid: {
      es: 'No servirlo a temperatura de tinto potente; pierde perfume y finura.',
      en: 'Do not serve it at powerful-red temperature; it loses perfume and finesse.',
      it: 'Non servirlo alla temperatura di un rosso potente; perde profumo e finezza.',
      fr: 'Ne pas servir a temperature de rouge puissant ; il perd parfum et finesse.',
      de: 'Nicht wie einen kraftigen Rotwein servieren; er verliert Duft und Finesse.',
      pt: 'Nao sirva a temperatura de tinto potente; perde perfume e finura.',
    },
    hooks: {
      es: ['pato', 'setas', 'atún marcado'],
      en: ['duck', 'mushrooms', 'seared tuna'],
      it: ['anatra', 'funghi', 'tonno scottato'],
      fr: ['canard', 'champignons', 'thon snacke'],
      de: ['Ente', 'Pilze', 'kurz gebratener Thunfisch'],
      pt: ['pato', 'cogumelos', 'atum braseado'],
    },
  },
  'sauvignon-blanc': {
    serviceTemp: '7-9 C',
    glass: 'Blanco aromático / aromatic white',
    role: {
      es: 'Blanco aromático y fresco para responder rápido a la petición de algo vivo, cítrico y directo.',
      en: 'Aromatic, fresh white for the quick request for something vivid, citrus-driven and direct.',
      it: 'Bianco aromatico e fresco per rispondere alla richiesta di qualcosa di vivo, agrumato e diretto.',
      fr: 'Blanc aromatique et frais pour repondre vite a une demande de vin vif, agrume et direct.',
      de: 'Aromatischer, frischer Weisswein fur den Wunsch nach etwas Lebendigem, Zitrischem und Direktem.',
      pt: 'Branco aromatico e fresco para responder ao pedido de algo vivo, citrico e direto.',
    },
    cue: {
      es: 'Hazlo reconocible por aromas verdes, cítricos y tensión; separa origen para no repetir perfiles.',
      en: 'Make green, citrus and tension cues clear; separate origins so profiles do not overlap.',
      it: 'Rendilo chiaro con note verdi, agrumi e tensione; separa le origini per non ripetere profili.',
      fr: 'Rendez-le lisible par notes vertes, agrumes et tension ; separez les origines pour eviter les doublons.',
      de: 'Grune Noten, Zitrus und Spannung klar machen; Herkunft trennen, damit Profile nicht doppeln.',
      pt: 'Torne claros aromas verdes, citrinos e tensao; separe origens para nao repetir perfis.',
    },
    avoid: {
      es: 'No poner varios blancos aromáticos que digan lo mismo; diferéncialos por origen o plato.',
      en: 'Do not list several aromatic whites that say the same thing; separate them by origin or dish.',
      it: 'Non inserire piu bianchi aromatici con lo stesso messaggio; separali per origine o piatto.',
      fr: 'Ne listez pas plusieurs blancs aromatiques qui disent la meme chose ; separez par origine ou plat.',
      de: 'Nicht mehrere aromatische Weissweine mit derselben Aussage listen; nach Herkunft oder Gericht trennen.',
      pt: 'Nao liste varios brancos aromaticos que dizem o mesmo; diferencie por origem ou prato.',
    },
    hooks: {
      es: ['queso de cabra', 'ensaladas', 'ceviche'],
      en: ['goat cheese', 'salads', 'ceviche'],
      it: ['formaggio di capra', 'insalate', 'ceviche'],
      fr: ['chevre', 'salades', 'ceviche'],
      de: ['Ziegenkase', 'Salate', 'Ceviche'],
      pt: ['queijo de cabra', 'saladas', 'ceviche'],
    },
  },
  riesling: {
    serviceTemp: '7-10 C',
    glass: 'Blanco aromático / aromatic white',
    role: {
      es: 'Blanco de descubrimiento para maridajes difíciles, clientes curiosos y cartas con ambición sommelier.',
      en: 'Discovery white for difficult pairings, curious guests and lists with sommelier ambition.',
      it: 'Bianco di scoperta per abbinamenti difficili, clienti curiosi e carte con ambizione sommelier.',
      fr: 'Blanc de decouverte pour accords difficiles, clients curieux et cartes a ambition sommelier.',
      de: 'Entdecker-Weisswein fur schwierige Pairings, neugierige Gaste und ambitionierte Karten.',
      pt: 'Branco de descoberta para harmonizacoes dificeis, clientes curiosos e cartas com ambicao sommelier.',
    },
    cue: {
      es: 'Aclara dulzor y acidez al inicio; cuando desaparece esa duda, el vino se vende.',
      en: 'Clarify sweetness and acidity upfront; once that doubt disappears, the wine sells.',
      it: 'Chiarisci subito dolcezza e acidita; quando il dubbio sparisce, il vino si vende.',
      fr: 'Clarifiez sucre et acidite des le debut ; quand le doute disparait, le vin se vend.',
      de: 'Susse und Saure sofort klaren; wenn dieser Zweifel weg ist, verkauft sich der Wein.',
      pt: 'Clarifique dulcor e acidez no inicio; quando a duvida desaparece, o vinho vende.',
    },
    avoid: {
      es: 'No presentarlo como dulce por defecto; seco, off-dry o dulce debe estar claro.',
      en: 'Do not present it as sweet by default; dry, off-dry or sweet must be clear.',
      it: 'Non presentarlo come dolce di default; secco, abboccato o dolce deve essere chiaro.',
      fr: 'Ne pas le presenter comme doux par defaut ; sec, demi-sec ou doux doit etre clair.',
      de: 'Nicht automatisch als suss prasentieren; trocken, feinherb oder suss muss klar sein.',
      pt: 'Nao apresente como doce por defeito; seco, meio-seco ou doce deve estar claro.',
    },
    hooks: {
      es: ['picante asiático', 'cerdo asado', 'quesos azules'],
      en: ['Asian spice', 'roast pork', 'blue cheeses'],
      it: ['spezie asiatiche', 'maiale arrosto', 'formaggi erborinati'],
      fr: ['epices asiatiques', 'porc roti', 'fromages bleus'],
      de: ['asiatische Scharfe', 'Schweinebraten', 'Blauschimmelkaese'],
      pt: ['picante asiatico', 'porco assado', 'queijos azuis'],
    },
  },
  syrah: {
    serviceTemp: '16-18 C',
    glass: 'Syrah / large Bordeaux',
    role: {
      es: 'Tinto premium para carnes, especias y cartas que necesitan potencia sin perder lectura de origen.',
      en: 'Premium red for meat, spice and lists that need power without losing origin clarity.',
      it: 'Rosso premium per carni, spezie e carte che cercano potenza senza perdere lettura di origine.',
      fr: 'Rouge premium pour viandes, epices et cartes qui cherchent puissance sans perdre la lecture d origine.',
      de: 'Premium-Rotwein fur Fleisch, Wurze und Karten, die Kraft mit klarer Herkunft verbinden wollen.',
      pt: 'Tinto premium para carnes, especiarias e cartas que precisam de potencia sem perder leitura de origem.',
    },
    cue: {
      es: 'Vende estructura, pimienta y plato; si hay clima fresco o altura, dilo pronto.',
      en: 'Sell structure, pepper and the dish; if cool climate or altitude matters, say it early.',
      it: 'Vendi struttura, pepe e piatto; se clima fresco o altitudine contano, dillo presto.',
      fr: 'Vendez structure, poivre et plat ; si climat frais ou altitude comptent, dites-le tot.',
      de: 'Struktur, Pfeffer und Gericht verkaufen; kuhle Herkunft oder Hohe fruh nennen.',
      pt: 'Venda estrutura, pimenta e prato; se houver clima fresco ou altitude, diga cedo.',
    },
    avoid: {
      es: 'No servir demasiado caliente: alcohol y especia pueden dominar la fruta.',
      en: 'Do not serve too warm: alcohol and spice can dominate the fruit.',
      it: 'Non servirlo troppo caldo: alcol e spezia possono dominare il frutto.',
      fr: 'Ne pas servir trop chaud : alcool et epice peuvent dominer le fruit.',
      de: 'Nicht zu warm servieren: Alkohol und Wurze konnen die Frucht uberdecken.',
      pt: 'Nao servir demasiado quente: alcool e especiaria podem dominar a fruta.',
    },
    hooks: {
      es: ['steak', 'carnes a la brasa', 'picante asiático'],
      en: ['steak', 'grilled meats', 'Asian spice'],
      it: ['bistecca', 'carni alla griglia', 'spezie asiatiche'],
      fr: ['steak', 'viandes grillees', 'epices asiatiques'],
      de: ['Steak', 'Grillfleisch', 'asiatische Scharfe'],
      pt: ['bife', 'carnes grelhadas', 'picante asiatico'],
    },
  },
  merlot: {
    serviceTemp: '15-17 C',
    glass: 'Burdeos / Bordeaux',
    role: {
      es: 'Tinto amable y textural para clientes que quieren suavidad, fruta negra y menos aristas que Cabernet.',
      en: 'Soft, textural red for guests who want plush fruit and fewer edges than Cabernet.',
      it: 'Rosso morbido e testurale per clienti che cercano frutto e meno spigoli del Cabernet.',
      fr: 'Rouge souple et textural pour clients qui veulent du fruit et moins d angles que le Cabernet.',
      de: 'Weicher, texturaler Rotwein fur Gaste, die Frucht und weniger Kanten als Cabernet suchen.',
      pt: 'Tinto macio e textural para clientes que querem fruta e menos arestas que Cabernet.',
    },
    cue: {
      es: 'Posicionalo como tinto elegante y accesible, no como opción menor frente a otros bordeleses.',
      en: 'Position it as elegant and accessible, not as a lesser option beside other Bordeaux grapes.',
      it: 'Posizionalo come elegante e accessibile, non come opzione minore tra i vitigni bordolesi.',
      fr: 'Positionnez-le comme elegant et accessible, pas comme option mineure parmi les cepages bordelais.',
      de: 'Als elegant und zuganglich positionieren, nicht als kleinere Bordeaux-Option.',
      pt: 'Posicione como elegante e acessivel, nao como opcao menor entre castas bordalesas.',
    },
    avoid: {
      es: 'No recomendar una botella joven y muy madura sin comida; puede parecer pesada.',
      en: 'Do not recommend a very ripe young bottle without food; it may feel heavy.',
      it: 'Non consigliare una bottiglia giovane e molto matura senza cibo; puo sembrare pesante.',
      fr: 'Ne pas recommander une bouteille jeune et tres mure sans plat ; elle peut paraitre lourde.',
      de: 'Sehr reife junge Flaschen nicht ohne Essen empfehlen; sie konnen schwer wirken.',
      pt: 'Nao recomendar garrafa jovem e muito madura sem comida; pode parecer pesada.',
    },
    hooks: {
      es: ['pato', 'setas', 'carnes a la brasa'],
      en: ['duck', 'mushrooms', 'grilled meats'],
      it: ['anatra', 'funghi', 'carni alla griglia'],
      fr: ['canard', 'champignons', 'viandes grillees'],
      de: ['Ente', 'Pilze', 'Grillfleisch'],
      pt: ['pato', 'cogumelos', 'carnes grelhadas'],
    },
  },
  malbec: {
    serviceTemp: '16-18 C',
    glass: 'Burdeos amplia / large Bordeaux',
    role: {
      es: 'Tinto de alto reconocimiento para carnes rojas, cartas internacionales y venta premium por origen.',
      en: 'Highly recognizable red for red meat, international lists and premium selling through origin.',
      it: 'Rosso molto riconoscibile per carni rosse, carte internazionali e vendita premium per origine.',
      fr: 'Rouge tres reconnaissable pour viandes rouges, cartes internationales et vente premium par origine.',
      de: 'Sehr bekannter Rotwein fur rotes Fleisch, internationale Karten und Premium-Verkauf uber Herkunft.',
      pt: 'Tinto muito reconhecivel para carnes vermelhas, cartas internacionais e venda premium por origem.',
    },
    cue: {
      es: 'Habla de altura, Mendoza o Cahors antes de decir solo intensidad y color.',
      en: 'Talk about altitude, Mendoza or Cahors before saying only intensity and colour.',
      it: 'Parla di altitudine, Mendoza o Cahors prima di dire solo intensita e colore.',
      fr: 'Parlez altitude, Mendoza ou Cahors avant de ne parler que d intensite et couleur.',
      de: 'Hohe, Mendoza oder Cahors nennen, bevor nur Intensitat und Farbe kommen.',
      pt: 'Fale de altitude, Mendoza ou Cahors antes de dizer apenas intensidade e cor.',
    },
    avoid: {
      es: 'No venderlo sin plato si el tanino y la madurez estan altos.',
      en: 'Do not sell it without a dish when tannin and ripeness are high.',
      it: 'Non venderlo senza piatto quando tannino e maturita sono alti.',
      fr: 'Ne pas le vendre sans plat si tanin et maturite sont eleves.',
      de: 'Bei viel Tannin und Reife nicht ohne Gericht verkaufen.',
      pt: 'Nao vender sem prato quando tanino e maturacao sao altos.',
    },
    hooks: {
      es: ['steak', 'carnes a la brasa', 'quesos curados'],
      en: ['steak', 'grilled meats', 'aged cheeses'],
      it: ['bistecca', 'carni alla griglia', 'formaggi stagionati'],
      fr: ['steak', 'viandes grillees', 'fromages affines'],
      de: ['Steak', 'Grillfleisch', 'gereifter Kase'],
      pt: ['bife', 'carnes grelhadas', 'queijos curados'],
    },
  },
  nebbiolo: {
    serviceTemp: '16-18 C',
    glass: 'Borgoña amplia / large Burgundy',
    role: {
      es: 'Tinto de descubrimiento premium para cartas con ambición italiana, tanino noble y gastronomía.',
      en: 'Premium discovery red for Italian-led lists, noble tannin and serious food pairing.',
      it: 'Rosso premium di scoperta per carte con ambizione italiana, tannino nobile e gastronomia.',
      fr: 'Rouge premium de decouverte pour cartes italiennes ambitieuses, tanin noble et gastronomie.',
      de: 'Premium-Entdeckerrotwein fur italienische Karten, nobles Tannin und ernsthafte Kuche.',
      pt: 'Tinto premium de descoberta para cartas italianas, tanino nobre e gastronomia.',
    },
    cue: {
      es: 'Explica tanino, perfume y tiempo; Barolo o Barbaresco necesitan contexto para venderse bien.',
      en: 'Explain tannin, perfume and time; Barolo or Barbaresco need context to sell well.',
      it: 'Spiega tannino, profumo e tempo; Barolo o Barbaresco richiedono contesto.',
      fr: 'Expliquez tanin, parfum et temps ; Barolo ou Barbaresco demandent du contexte.',
      de: 'Tannin, Duft und Zeit erklaren; Barolo oder Barbaresco brauchen Kontext.',
      pt: 'Explique tanino, perfume e tempo; Barolo ou Barbaresco precisam de contexto.',
    },
    avoid: {
      es: 'No abrirlo como tinto potente cualquiera: tanino y acidez piden plato y servicio cuidado.',
      en: 'Do not open it as just another powerful red: tannin and acidity need food and careful service.',
      it: 'Non aprirlo come rosso potente qualsiasi: tannino e acidita chiedono piatto e servizio.',
      fr: 'Ne pas le traiter comme un rouge puissant quelconque : tanin et acidite demandent plat et service.',
      de: 'Nicht wie irgendeinen kraftigen Rotwein behandeln: Tannin und Saure brauchen Essen und Service.',
      pt: 'Nao tratar como tinto potente qualquer: tanino e acidez pedem prato e servico cuidado.',
    },
    hooks: {
      es: ['pato', 'setas', 'quesos curados'],
      en: ['duck', 'mushrooms', 'aged cheeses'],
      it: ['anatra', 'funghi', 'formaggi stagionati'],
      fr: ['canard', 'champignons', 'fromages affines'],
      de: ['Ente', 'Pilze', 'gereifter Kase'],
      pt: ['pato', 'cogumelos', 'queijos curados'],
    },
  },
  sangiovese: {
    serviceTemp: '15-17 C',
    glass: 'Chianti / universal',
    role: {
      es: 'Tinto gastronómico mediterráneo para pasta, asados y cartas italianas con rotación.',
      en: 'Gastronomic Mediterranean red for pasta, roasts and Italian lists with rotation.',
      it: 'Rosso gastronomico mediterraneo per pasta, arrosti e carte italiane con rotazione.',
      fr: 'Rouge mediterraneen gastronomique pour pates, rotis et cartes italiennes en rotation.',
      de: 'Gastronomischer mediterraner Rotwein fur Pasta, Braten und italienische Karten.',
      pt: 'Tinto gastronomico mediterranico para massas, assados e cartas italianas com rotacao.',
    },
    cue: {
      es: 'Presenta Chianti, Brunello o Toscana antes de hablar solo de cereza y acidez.',
      en: 'Lead with Chianti, Brunello or Tuscany before only talking cherry and acidity.',
      it: 'Parti da Chianti, Brunello o Toscana prima di parlare solo di ciliegia e acidita.',
      fr: 'Commencez par Chianti, Brunello ou Toscane avant cerise et acidite.',
      de: 'Chianti, Brunello oder Toskana zuerst nennen, dann Kirsche und Saure.',
      pt: 'Apresente Chianti, Brunello ou Toscana antes de falar so de cereja e acidez.',
    },
    avoid: {
      es: 'No servirlo caliente; la acidez pierde gracia y el alcohol se adelanta.',
      en: 'Do not serve it warm; acidity loses charm and alcohol moves forward.',
      it: 'Non servirlo caldo; acidita e alcol perdono equilibrio.',
      fr: 'Ne pas servir chaud ; acidite et alcool perdent l equilibre.',
      de: 'Nicht warm servieren; Saure und Alkohol verlieren Balance.',
      pt: 'Nao servir quente; acidez e alcool perdem equilibrio.',
    },
    hooks: {
      es: ['cerdo asado', 'verduras asadas', 'quesos curados'],
      en: ['roast pork', 'roasted vegetables', 'aged cheeses'],
      it: ['maiale arrosto', 'verdure arrosto', 'formaggi stagionati'],
      fr: ['porc roti', 'legumes rotis', 'fromages affines'],
      de: ['Schweinebraten', 'gerostetes Gemuse', 'gereifter Kase'],
      pt: ['porco assado', 'legumes assados', 'queijos curados'],
    },
  },
  monastrell: {
    serviceTemp: '16-18 C',
    glass: 'Burdeos amplia / large Bordeaux',
    role: {
      es: 'Tinto mediterráneo potente para Jumilla, Yecla o Bandol, muy útil con brasa y platos intensos.',
      en: 'Powerful Mediterranean red for Jumilla, Yecla or Bandol, useful with grill and intense dishes.',
      it: 'Rosso mediterraneo potente per Jumilla, Yecla o Bandol, utile con griglia e piatti intensi.',
      fr: 'Rouge mediterraneen puissant pour Jumilla, Yecla ou Bandol, utile avec grillades et plats intenses.',
      de: 'Kraftiger mediterraner Rotwein fur Jumilla, Yecla oder Bandol, stark zu Grill und intensiven Gerichten.',
      pt: 'Tinto mediterranico potente para Jumilla, Yecla ou Bandol, util com grelha e pratos intensos.',
    },
    cue: {
      es: 'Si hay viña vieja, secano o altitud, dilo: convierte potencia en origen y valor.',
      en: 'If old vines, dry farming or altitude matter, say it: it turns power into origin and value.',
      it: 'Se ci sono vigne vecchie, secco o altitudine, dillo: trasforma potenza in origine e valore.',
      fr: 'Si vieilles vignes, sec ou altitude comptent, dites-le : la puissance devient origine et valeur.',
      de: 'Alte Reben, Trockenfeldbau oder Hohe nennen: so wird Kraft zu Herkunft und Wert.',
      pt: 'Se houver vinha velha, sequeiro ou altitude, diga: transforma potencia em origem e valor.',
    },
    avoid: {
      es: 'No servirlo demasiado caliente ni sin comida si tiene grado alto.',
      en: 'Do not serve it too warm or without food when alcohol is high.',
      it: 'Non servirlo troppo caldo o senza cibo se ha alcol alto.',
      fr: 'Ne pas servir trop chaud ni sans plat si l alcool est eleve.',
      de: 'Bei hohem Alkohol nicht zu warm und nicht ohne Essen servieren.',
      pt: 'Nao servir demasiado quente nem sem comida se tiver alcool alto.',
    },
    hooks: {
      es: ['carnes a la brasa', 'cordero asado', 'quesos curados'],
      en: ['grilled meats', 'roasted lamb', 'aged cheeses'],
      it: ['carni alla griglia', 'agnello arrosto', 'formaggi stagionati'],
      fr: ['viandes grillees', 'agneau roti', 'fromages affines'],
      de: ['Grillfleisch', 'Lammbraten', 'gereifter Kase'],
      pt: ['carnes grelhadas', 'borrego assado', 'queijos curados'],
    },
  },
  viura: {
    serviceTemp: '8-11 C',
    glass: 'Blanco universal / universal white',
    role: {
      es: 'Blanco gastronómico para Rioja blanco, Cava y cartas españolas que necesitan frescura con estructura.',
      en: 'Gastronomic white for white Rioja, Cava and Spanish lists that need freshness with structure.',
      it: 'Bianco gastronomico per Rioja bianco, Cava e carte spagnole che cercano freschezza con struttura.',
      fr: 'Blanc gastronomique pour Rioja blanc, Cava et cartes espagnoles qui cherchent fraicheur et structure.',
      de: 'Gastronomischer Weisswein fur weissen Rioja, Cava und spanische Karten mit Frische und Struktur.',
      pt: 'Branco gastronomico para Rioja branco, Cava e cartas espanholas com frescura e estrutura.',
    },
    cue: {
      es: 'Explica si es joven, con lías o con crianza; Viura cambia mucho por elaboración.',
      en: 'Explain whether it is young, lees-aged or oak-aged; Viura changes a lot by winemaking.',
      it: 'Spiega se e giovane, sulle fecce o con legno; Viura cambia molto per vinificazione.',
      fr: 'Expliquez s il est jeune, sur lies ou eleve sous bois ; Viura change beaucoup selon l elaboration.',
      de: 'Jung, auf Hefe oder mit Holz klaren; Viura verandert sich stark durch Ausbau.',
      pt: 'Explique se e jovem, com borras ou madeira; Viura muda muito pela elaboracao.',
    },
    avoid: {
      es: 'No convertirlo en blanco genérico: productor, Rioja o Cava deben estar visibles.',
      en: 'Do not make it generic white: producer, Rioja or Cava must be visible.',
      it: 'Non trasformarlo in bianco generico: produttore, Rioja o Cava devono essere visibili.',
      fr: 'Ne pas le rendre generique : producteur, Rioja ou Cava doivent etre visibles.',
      de: 'Nicht zum generischen Weisswein machen: Produzent, Rioja oder Cava sichtbar halten.',
      pt: 'Nao transformar em branco generico: produtor, Rioja ou Cava devem estar visiveis.',
    },
    hooks: {
      es: ['tapas', 'pescado blanco', 'aves'],
      en: ['tapas', 'white fish', 'poultry'],
      it: ['tapas', 'pesce bianco', 'pollame'],
      fr: ['tapas', 'poisson blanc', 'volaille'],
      de: ['Tapas', 'weisser Fisch', 'Geflugel'],
      pt: ['tapas', 'peixe branco', 'aves'],
    },
  },
  'chenin-blanc': {
    serviceTemp: '7-11 C',
    glass: 'Blanco aromatico / aromatic white',
    role: {
      es: 'Blanco de descubrimiento para cartas ambiciosas: seco, dulce o espumoso, con mucha lectura de maridaje.',
      en: 'Discovery white for ambitious lists: dry, sweet or sparkling, with strong pairing range.',
      it: 'Bianco di scoperta per carte ambiziose: secco, dolce o spumante, con grande ampiezza di abbinamento.',
      fr: 'Blanc de decouverte pour cartes ambitieuses : sec, doux ou effervescent, avec grand potentiel d accords.',
      de: 'Entdecker-Weisswein fur ambitionierte Karten: trocken, suss oder schaumend, mit grosser Pairing-Breite.',
      pt: 'Branco de descoberta para cartas ambiciosas: seco, doce ou espumante, com grande amplitude de harmonizacao.',
    },
    cue: {
      es: 'Aclara dulzor, acidez y origen al inicio; es versatil, pero necesita una frase precisa.',
      en: 'Clarify sweetness, acidity and origin upfront; it is versatile but needs one precise sentence.',
      it: 'Chiarisci dolcezza, acidita e origine subito; e versatile ma richiede una frase precisa.',
      fr: 'Clarifiez sucre, acidite et origine au depart ; il est polyvalent mais demande une phrase precise.',
      de: 'Susse, Saure und Herkunft sofort klaren; vielseitig, aber mit prazisem Satz.',
      pt: 'Clarifique dulcor, acidez e origem no inicio; e versatil, mas precisa de frase precisa.',
    },
    avoid: {
      es: 'No presentarlo como dulce por defecto; seco, off-dry, dulce o espumoso debe estar claro.',
      en: 'Do not present it as sweet by default; dry, off-dry, sweet or sparkling must be clear.',
      it: 'Non presentarlo come dolce di default; secco, abboccato, dolce o spumante deve essere chiaro.',
      fr: 'Ne pas le presenter comme doux par defaut ; sec, demi-sec, doux ou effervescent doit etre clair.',
      de: 'Nicht automatisch als suss prasentieren; trocken, feinherb, suss oder schaumend muss klar sein.',
      pt: 'Nao apresentar como doce por defeito; seco, meio-seco, doce ou espumante deve estar claro.',
    },
    hooks: {
      es: ['picante asiático', 'cerdo asado', 'quesos azules'],
      en: ['Asian spice', 'roast pork', 'blue cheeses'],
      it: ['spezie asiatiche', 'maiale arrosto', 'formaggi erborinati'],
      fr: ['epices asiatiques', 'porc roti', 'fromages bleus'],
      de: ['asiatische Scharfe', 'Schweinebraten', 'Blauschimmelkaese'],
      pt: ['picante asiatico', 'porco assado', 'queijos azuis'],
    },
  },
  xarello: {
    serviceTemp: '8-11 C',
    glass: 'Blanco con volumen / sparkling glass when needed',
    role: {
      es: 'Blanco catalán de textura y base clave para Cava, útil para diferenciar espumosos y blancos con identidad.',
      en: 'Catalan textured white and key Cava base, useful to differentiate sparkling wines and whites with identity.',
      it: 'Bianco catalano di texture e base chiave del Cava, utile per differenziare spumanti e bianchi identitari.',
      fr: 'Blanc catalan de texture et base cle du Cava, utile pour differencier effervescents et blancs identitaires.',
      de: 'Katalanischer Weisswein mit Textur und wichtige Cava-Basis, gut fur eigenstandige Schaumweine und Weissweine.',
      pt: 'Branco catalao de textura e base chave do Cava, util para diferenciar espumantes e brancos com identidade.',
    },
    cue: {
      es: 'Explica Penedes, Cava, lias o estructura: el nombre necesita contexto para capturar valor.',
      en: 'Explain Penedes, Cava, lees or structure: the name needs context to capture value.',
      it: 'Spiega Penedes, Cava, fecce o struttura: il nome richiede contesto per catturare valore.',
      fr: 'Expliquez Penedes, Cava, lies ou structure : le nom a besoin de contexte pour capter la valeur.',
      de: 'Penedes, Cava, Hefe oder Struktur erklaren: der Name braucht Kontext fur Wert.',
      pt: 'Explique Penedes, Cava, borras ou estrutura: o nome precisa de contexto para capturar valor.',
    },
    avoid: {
      es: 'No esconderlo entre blancos o espumosos genéricos; una explicación breve cambia la percepción.',
      en: 'Do not hide it among generic whites or sparkling wines; one short explanation changes perception.',
      it: 'Non nasconderlo tra bianchi o spumanti generici; una breve spiegazione cambia la percezione.',
      fr: 'Ne pas le cacher parmi blancs ou effervescents generiques ; une explication courte change la perception.',
      de: 'Nicht zwischen generischen Weiss- oder Schaumweinen verstecken; ein kurzer Satz verandert die Wahrnehmung.',
      pt: 'Nao esconder entre brancos ou espumantes genericos; uma explicacao breve muda a percecao.',
    },
    hooks: {
      es: ['arroces sabrosos', 'marisco', 'aves'],
      en: ['savoury rice dishes', 'shellfish', 'poultry'],
      it: ['risotti saporiti', 'frutti di mare', 'pollame'],
      fr: ['riz savoureux', 'fruits de mer', 'volaille'],
      de: ['kraftige Reisgerichte', 'Meeresfruchte', 'Geflugel'],
      pt: ['arrozes saborosos', 'marisco', 'aves'],
    },
  },
  'touriga-nacional': {
    serviceTemp: '16-18 C',
    glass: 'Burdeos amplia / large Bordeaux',
    role: {
      es: 'Tinto portugués premium para Douro, Dao y cartas ibéricas con ambición y relato de origen.',
      en: 'Premium Portuguese red for Douro, Dao and Iberian lists with origin-led ambition.',
      it: 'Rosso portoghese premium per Douro, Dao e carte iberiche con ambizione di origine.',
      fr: 'Rouge portugais premium pour Douro, Dao et cartes iberiques a ambition d origine.',
      de: 'Portugiesischer Premium-Rotwein fur Douro, Dao und iberische Karten mit Herkunftsanspruch.',
      pt: 'Tinto portugues premium para Douro, Dao e cartas ibericas com ambicao de origem.',
    },
    cue: {
      es: 'Habla de violeta, tanino y Douro/Dao; evita que se lea solo como tinto potente.',
      en: 'Talk violet, tannin and Douro/Dao; avoid letting it read only as a powerful red.',
      it: 'Parla di violetta, tannino e Douro/Dao; evita che sembri solo un rosso potente.',
      fr: 'Parlez violette, tanin et Douro/Dao ; evitez qu il soit lu seulement comme rouge puissant.',
      de: 'Veilchen, Tannin und Douro/Dao nennen; nicht nur als kraftigen Rotwein lesen lassen.',
      pt: 'Fale de violeta, tanino e Douro/Dao; evite que seja lido so como tinto potente.',
    },
    avoid: {
      es: 'No recomendarlo sin comida si el tanino es joven; necesita plato y tiempo.',
      en: 'Do not recommend it without food if tannin is young; it needs dish and time.',
      it: 'Non consigliarlo senza cibo se il tannino e giovane; richiede piatto e tempo.',
      fr: 'Ne pas le recommander sans plat si le tanin est jeune ; il demande plat et temps.',
      de: 'Bei jungem Tannin nicht ohne Essen empfehlen; er braucht Gericht und Zeit.',
      pt: 'Nao recomendar sem comida se o tanino for jovem; precisa de prato e tempo.',
    },
    hooks: {
      es: ['steak', 'cordero asado', 'quesos curados'],
      en: ['steak', 'roasted lamb', 'aged cheeses'],
      it: ['bistecca', 'agnello arrosto', 'formaggi stagionati'],
      fr: ['steak', 'agneau roti', 'fromages affines'],
      de: ['Steak', 'Lammbraten', 'gereifter Kase'],
      pt: ['bife', 'borrego assado', 'queijos curados'],
    },
  },
};

const WINE_LIBRARY_PRIORITY_REGIONS: Record<string, WineLibraryPriorityProfile> = {
  rioja: {
    serviceTemp: '16-18 C',
    glass: 'Burdeos / universal amplia',
    role: {
      es: 'Rioja es el tinto de confianza de la carta: reduce friccion, ordena la seccion espanola y permite subir desde crianza accesible hasta gran reserva.',
      en: 'Rioja is the trust red on the list: it reduces choice friction, structures the Spanish section and moves guests from crianza to gran reserva.',
      it: 'Rioja e il rosso di fiducia della carta: riduce incertezza, ordina la Spagna e porta dal crianza al gran reserva.',
      fr: 'Rioja est le rouge de confiance de la carte : il rassure, structure l Espagne et fait monter du crianza au gran reserva.',
      de: 'Rioja ist der Vertrauensanker der Karte: weniger Auswahlfriktion, klare Spanien-Struktur und ein Weg von Crianza bis Gran Reserva.',
      pt: 'Rioja e o tinto de confianca da carta: reduz friccao, organiza a secao espanhola e leva de crianza a gran reserva.',
    },
    cue: {
      es: 'Vendelo por estilo y subzona: Rioja Alta para elegancia, Alavesa para frescura y Oriental para fruta mas calida.',
      en: 'Sell it by style and subzone: Rioja Alta for elegance, Alavesa for freshness and Oriental for warmer fruit.',
      it: 'Vendilo per stile e sottozona: Rioja Alta per eleganza, Alavesa per freschezza e Oriental per frutto piu caldo.',
      fr: 'Vendez par style et sous-zone : Rioja Alta pour l elegance, Alavesa pour la fraicheur, Oriental pour le fruit plus solaire.',
      de: 'Nach Stil und Subzone verkaufen: Rioja Alta fur Eleganz, Alavesa fur Frische, Oriental fur warmere Frucht.',
      pt: 'Venda por estilo e subzona: Rioja Alta para elegancia, Alavesa para frescura e Oriental para fruta mais quente.',
    },
    avoid: {
      es: 'No dejar que Rioja sea una categoria plana: blanco, garnacha o vino de pueblo evitan seleccion automatica.',
      en: 'Do not make Rioja a flat category: white Rioja, Garnacha or village wines keep it from feeling automatic.',
      it: 'Non rendere Rioja una categoria piatta: bianco, Garnacha o vino di villaggio evitano l effetto automatico.',
      fr: 'Ne pas aplatir Rioja : blanc, Garnacha ou vin de village evitent l impression de choix automatique.',
      de: 'Rioja nicht als flache Kategorie behandeln: weisser Rioja, Garnacha oder Ortswein vermeiden Autopilot.',
      pt: 'Nao transformar Rioja numa categoria plana: branco, Garnacha ou vinho de vila evitam escolha automatica.',
    },
    hooks: {
      es: ['cordero asado', 'ibericos', 'quesos curados'],
      en: ['roasted lamb', 'Iberian pork', 'aged cheeses'],
      it: ['agnello arrosto', 'maiale iberico', 'formaggi stagionati'],
      fr: ['agneau roti', 'porc iberique', 'fromages affines'],
      de: ['Lammbraten', 'Iberico', 'gereifter Kase'],
      pt: ['borrego assado', 'porco iberico', 'queijos curados'],
    },
  },
  'ribera-del-duero': {
    serviceTemp: '16-18 C',
    glass: 'Burdeos amplia',
    role: {
      es: 'Ribera del Duero cubre el deseo de tinto espanol potente, reconocible y moderno. Es el contrapunto natural de Rioja.',
      en: 'Ribera del Duero covers the demand for powerful, recognizable and modern Spanish red. It is Rioja s natural counterpoint.',
      it: 'Ribera del Duero copre il desiderio di rosso spagnolo potente, riconoscibile e moderno. E il contrappunto di Rioja.',
      fr: 'Ribera del Duero couvre l envie d un rouge espagnol puissant, moderne et reconnu. C est le contrepoint de Rioja.',
      de: 'Ribera del Duero bedient den Wunsch nach kraftigem, erkennbarem und modernem spanischem Rotwein, als Gegenpol zu Rioja.',
      pt: 'Ribera del Duero cobre a procura por tinto espanhol potente, reconhecivel e moderno. E o contraponto de Rioja.',
    },
    cue: {
      es: 'Conecta rapido con carne, fruta negra y estructura. Si hay altitud o pueblo, dilo porque justifica precio.',
      en: 'Connect it to meat, black fruit and structure. If altitude or village matters, say it because it supports price.',
      it: 'Collegalo a carne, frutto nero e struttura. Altitudine o villaggio sostengono il prezzo.',
      fr: 'Reliez-le a la viande, au fruit noir et a la structure. Altitude ou village soutiennent le prix.',
      de: 'Mit Fleisch, dunkler Frucht und Struktur verbinden. Hohe oder Dorf rechtfertigen den Preis.',
      pt: 'Ligue a carne, fruta negra e estrutura. Altitude ou vila justificam preco.',
    },
    avoid: {
      es: 'No servirlo demasiado joven sin aire: un Ribera cerrado puede parecer duro incluso con calidad alta.',
      en: 'Do not serve a closed young Ribera without air; it can feel hard even when quality is high.',
      it: 'Non servirlo giovane e chiuso senza aria; puo sembrare duro anche con qualita alta.',
      fr: 'Ne pas servir un Ribera jeune et ferme sans air ; il peut paraitre dur malgre sa qualite.',
      de: 'Jungen, verschlossenen Ribera nicht ohne Luft servieren; er kann hart wirken.',
      pt: 'Nao servir jovem e fechado sem ar; pode parecer duro mesmo com qualidade alta.',
    },
    hooks: {
      es: ['lechazo', 'chuleton', 'queso de oveja'],
      en: ['roast lamb', 'ribeye', 'sheep cheese'],
      it: ['agnello arrosto', 'costata', 'formaggio di pecora'],
      fr: ['agneau roti', 'entrecote', 'fromage de brebis'],
      de: ['Lammbraten', 'Ribeye', 'Schafskase'],
      pt: ['borrego assado', 'entrecote', 'queijo de ovelha'],
    },
  },
  'rias-baixas': {
    serviceTemp: '8-10 C',
    glass: 'Blanco aromatico / universal',
    role: {
      es: 'Rias Baixas es el blanco de mar que el cliente reconoce. Da seguridad cuando pide un blanco bueno para pescado o marisco.',
      en: 'Rias Baixas is the seafood white guests recognize, giving confidence with fish and shellfish.',
      it: 'Rias Baixas e il bianco di mare riconosciuto dal cliente, sicuro con pesce e frutti di mare.',
      fr: 'Rias Baixas est le blanc de mer que le client reconnait, rassurant avec poisson et fruits de mer.',
      de: 'Rias Baixas ist der erkennbare Weisswein zum Meer und gibt Sicherheit bei Fisch und Meeresfruchten.',
      pt: 'Rias Baixas e o branco de mar que o cliente reconhece, seguro com peixe e marisco.',
    },
    cue: {
      es: 'Habla de Atlantico, salinidad y Albarino. Val do Salnes o lias ayudan a diferenciar.',
      en: 'Talk Atlantic, salinity and Albarino. Val do Salnes or lees ageing differentiate the recommendation.',
      it: 'Parla di Atlantico, salinita e Albarino. Val do Salnes o lias differenziano.',
      fr: 'Parlez Atlantique, salinite et Albarino. Val do Salnes ou lies differencient.',
      de: 'Atlantik, Salinitat und Albarino nennen. Val do Salnes oder Hefelager differenzieren.',
      pt: 'Fale de Atlantico, salinidade e Alvarinho. Val do Salnes ou lias diferenciam.',
    },
    avoid: {
      es: 'No servirlo helado ni como blanco generico. Pierde aroma y valor percibido.',
      en: 'Do not serve it ice cold or as a generic white. Aroma and perceived value disappear.',
      it: 'Non servirlo gelato o come bianco generico. Aroma e valore percepito spariscono.',
      fr: 'Ne pas servir glace ni comme blanc generique. Aromes et valeur percue disparaissent.',
      de: 'Nicht eiskalt oder generisch servieren. Aroma und Wert gehen verloren.',
      pt: 'Nao servir gelado nem como branco generico. Perde aroma e valor percebido.',
    },
    hooks: {
      es: ['marisco', 'ostras', 'pescado blanco'],
      en: ['shellfish', 'oysters', 'white fish'],
      it: ['frutti di mare', 'ostriche', 'pesce bianco'],
      fr: ['fruits de mer', 'huitres', 'poisson blanc'],
      de: ['Meeresfruchte', 'Austern', 'weisser Fisch'],
      pt: ['marisco', 'ostras', 'peixe branco'],
    },
  },
  rueda: {
    serviceTemp: '7-9 C',
    glass: 'Blanco joven / universal',
    role: {
      es: 'Rueda cubre el blanco facil, fresco y reconocible. Es una puerta de entrada util para cartas con alta rotacion.',
      en: 'Rueda covers the easy, fresh and recognizable white slot for high-rotation lists.',
      it: 'Rueda copre il bianco facile, fresco e riconoscibile per carte ad alta rotazione.',
      fr: 'Rueda couvre le blanc facile, frais et reconnu pour les cartes a forte rotation.',
      de: 'Rueda besetzt den einfachen, frischen und erkennbaren Weissweinplatz fur hohe Rotation.',
      pt: 'Rueda cobre o branco facil, fresco e reconhecivel para cartas de alta rotacao.',
    },
    cue: {
      es: 'Vendelo como Verdejo fresco y citrico, pero anade productor o vinedo para evitar commodity.',
      en: 'Sell it as fresh, citrus-driven Verdejo, then add producer or vineyard to avoid commodity perception.',
      it: 'Vendilo come Verdejo fresco e agrumato, poi aggiungi produttore o vigna.',
      fr: 'Vendez-le comme Verdejo frais et agrume, puis ajoutez producteur ou vigne.',
      de: 'Als frischen, zitrischen Verdejo verkaufen, dann Produzent oder Weinberg nennen.',
      pt: 'Venda como Verdejo fresco e citrico, depois acrescente produtor ou vinha.',
    },
    avoid: {
      es: 'No competir solo por precio. Si todo Rueda parece igual, la carta pierde criterio.',
      en: 'Do not compete only on price. If every Rueda feels identical, the list loses expertise.',
      it: 'Non competere solo sul prezzo. Se ogni Rueda sembra uguale, la carta perde criterio.',
      fr: 'Ne pas jouer seulement le prix. Si tous les Rueda se ressemblent, la carte perd son critere.',
      de: 'Nicht nur uber Preis konkurrieren. Wenn jeder Rueda gleich wirkt, verliert die Karte Kompetenz.',
      pt: 'Nao competir apenas por preco. Se todo Rueda parece igual, a carta perde criterio.',
    },
    hooks: {
      es: ['tapas', 'ensaladas', 'pescado blanco'],
      en: ['tapas', 'salads', 'white fish'],
      it: ['tapas', 'insalate', 'pesce bianco'],
      fr: ['tapas', 'salades', 'poisson blanc'],
      de: ['Tapas', 'Salate', 'weisser Fisch'],
      pt: ['tapas', 'saladas', 'peixe branco'],
    },
  },
  priorat: {
    serviceTemp: '16-18 C',
    glass: 'Burdeos amplia / Syrah',
    role: {
      es: 'Priorat comunica ambicion y criterio. Es la region espanola para intensidad, mineralidad y prestigio.',
      en: 'Priorat signals ambition and expertise: the Spanish region for intensity, minerality and prestige.',
      it: 'Priorat comunica ambizione e competenza: la Spagna di intensita, mineralita e prestigio.',
      fr: 'Priorat communique ambition et expertise : l Espagne de l intensite, de la mineralite et du prestige.',
      de: 'Priorat signalisiert Anspruch und Kompetenz: Spanien fur Intensitat, Mineralitat und Prestige.',
      pt: 'Priorat comunica ambicao e criterio: a Espanha de intensidade, mineralidade e prestigio.',
    },
    cue: {
      es: 'Explica llicorella, vina vieja y Garnacha/Carinena. Es una venta de terroir, no solo potencia.',
      en: 'Explain llicorella, old vines and Garnacha/Carinena. This is terroir selling, not only power.',
      it: 'Spiega llicorella, vigne vecchie e Garnacha/Carinena. E vendita di terroir, non solo potenza.',
      fr: 'Expliquez llicorella, vieilles vignes et Garnacha/Carinena. C est une vente de terroir, pas seulement de puissance.',
      de: 'Llicorella, alte Reben und Garnacha/Carinena erklaren. Das ist Terroir-Verkauf, nicht nur Kraft.',
      pt: 'Explique llicorella, vinha velha e Garnacha/Carinena. E venda de terroir, nao so potencia.',
    },
    avoid: {
      es: 'No servir demasiado caliente ni joven sin aire: la concentracion puede volverse pesada.',
      en: 'Do not serve too warm or too young without air: concentration can become heavy.',
      it: 'Non servire troppo caldo o giovane senza aria: la concentrazione diventa pesante.',
      fr: 'Ne pas servir trop chaud ni trop jeune sans air : la concentration devient lourde.',
      de: 'Nicht zu warm oder zu jung ohne Luft servieren: Konzentration kann schwer wirken.',
      pt: 'Nao servir demasiado quente nem jovem sem ar: a concentracao pode ficar pesada.',
    },
    hooks: {
      es: ['caza', 'carnes a la brasa', 'quesos curados'],
      en: ['game', 'grilled meats', 'aged cheeses'],
      it: ['selvaggina', 'carni alla griglia', 'formaggi stagionati'],
      fr: ['gibier', 'viandes grillees', 'fromages affines'],
      de: ['Wild', 'Grillfleisch', 'gereifter Kase'],
      pt: ['caca', 'carnes grelhadas', 'queijos curados'],
    },
  },
  bourgogne: {
    serviceTemp: '12-15 C tintos / 9-12 C blancos',
    glass: 'Borgona amplia',
    role: {
      es: 'Borgona es la senal maxima de terroir y finura. Eleva la carta incluso con referencias regionales bien elegidas.',
      en: 'Bourgogne is the ultimate signal of terroir and finesse, lifting the list even through well-chosen regional wines.',
      it: 'Bourgogne e il segnale massimo di terroir e finezza, anche con regionali scelti bene.',
      fr: 'La Bourgogne est le signal ultime de terroir et de finesse, meme avec de bons regionaux.',
      de: 'Bourgogne ist das starkste Signal fur Terroir und Finesse, selbst mit guten regionalen Weinen.',
      pt: 'Bourgogne e o sinal maximo de terroir e finura, mesmo com regionais bem escolhidos.',
    },
    cue: {
      es: 'Vende por productor, village y clasificacion. El cliente compra precision, no solo Pinot Noir o Chardonnay.',
      en: 'Sell by producer, village and classification. Guests buy precision, not just Pinot Noir or Chardonnay.',
      it: 'Vendi per produttore, village e classificazione. Il cliente compra precisione, non solo Pinot Noir o Chardonnay.',
      fr: 'Vendez par producteur, village et classement. Le client achete la precision, pas seulement Pinot Noir ou Chardonnay.',
      de: 'Nach Produzent, Village und Klassifikation verkaufen. Gaste kaufen Prazision, nicht nur Pinot Noir oder Chardonnay.',
      pt: 'Venda por produtor, village e classificacao. O cliente compra precisao, nao apenas Pinot Noir ou Chardonnay.',
    },
    avoid: {
      es: 'No llenar la seccion solo con etiquetas caras. Chablis, Macon o Bourgogne regional abren la puerta.',
      en: 'Do not fill the section only with expensive labels. Chablis, Macon or regional Bourgogne open the door.',
      it: 'Non riempire la sezione solo di etichette costose. Chablis, Macon o Bourgogne regionale aprono la porta.',
      fr: 'Ne pas remplir la section seulement avec des etiquettes cheres. Chablis, Macon ou Bourgogne regional ouvrent la porte.',
      de: 'Die Sektion nicht nur mit teuren Etiketten fullen. Chablis, Macon oder regionaler Bourgogne offnen die Tur.',
      pt: 'Nao encher a secao so com rotulos caros. Chablis, Macon ou Bourgogne regional abrem a porta.',
    },
    hooks: {
      es: ['setas', 'pescados nobles', 'quesos afinados'],
      en: ['mushrooms', 'noble fish', 'aged cheeses'],
      it: ['funghi', 'pesci nobili', 'formaggi affinati'],
      fr: ['champignons', 'poissons nobles', 'fromages affines'],
      de: ['Pilze', 'edle Fische', 'gereifter Kase'],
      pt: ['cogumelos', 'peixes nobres', 'queijos afinados'],
    },
  },
  bordeaux: {
    serviceTemp: '16-18 C',
    glass: 'Burdeos amplia',
    role: {
      es: 'Burdeos comunica prestigio internacional y seriedad. Es una referencia que muchos clientes entienden antes de leer la anada.',
      en: 'Bordeaux signals international prestige and seriousness. Many guests understand it before reading the vintage.',
      it: 'Bordeaux comunica prestigio internazionale e serieta. Molti clienti lo capiscono prima dell annata.',
      fr: 'Bordeaux communique prestige international et serieux. Beaucoup de clients le comprennent avant le millesime.',
      de: 'Bordeaux signalisiert internationales Prestige und Seriositat. Viele Gaste verstehen ihn vor dem Jahrgang.',
      pt: 'Bordeaux comunica prestigio internacional e seriedade. Muitos clientes entendem antes da colheita.',
    },
    cue: {
      es: 'Diferencia margen izquierda y derecha: Cabernet estructurado frente a Merlot mas redondo.',
      en: 'Separate left and right bank: structured Cabernet versus rounder Merlot.',
      it: 'Distingui riva sinistra e destra: Cabernet strutturato contro Merlot piu rotondo.',
      fr: 'Distinguez rive gauche et rive droite : Cabernet structure face a Merlot plus rond.',
      de: 'Linkes und rechtes Ufer trennen: strukturierter Cabernet gegen runderen Merlot.',
      pt: 'Separe margem esquerda e direita: Cabernet estruturado versus Merlot mais redondo.',
    },
    avoid: {
      es: 'No asumir que Burdeos solo es caro. Cotes y satelites de Saint-Emilion dan valor real.',
      en: 'Do not assume Bordeaux only means expensive. Cotes and Saint-Emilion satellites deliver real value.',
      it: 'Non pensare che Bordeaux sia solo caro. Cotes e satelliti di Saint-Emilion danno valore reale.',
      fr: 'Ne pas croire que Bordeaux est seulement cher. Les Cotes et satellites de Saint-Emilion offrent de la valeur.',
      de: 'Bordeaux nicht nur als teuer betrachten. Cotes und Satelliten von Saint-Emilion liefern echten Wert.',
      pt: 'Nao assumir que Bordeaux e apenas caro. Cotes e satelites de Saint-Emilion dao valor real.',
    },
    hooks: {
      es: ['entrecot', 'cordero', 'pato'],
      en: ['entrecote', 'lamb', 'duck'],
      it: ['entrecote', 'agnello', 'anatra'],
      fr: ['entrecote', 'agneau', 'canard'],
      de: ['Entrecote', 'Lamm', 'Ente'],
      pt: ['entrecote', 'borrego', 'pato'],
    },
  },
  champagne: {
    serviceTemp: '8-10 C',
    glass: 'Copa de vino blanco / tulipa',
    role: {
      es: 'Champagne es celebracion, aperitivo y maridaje premium a la vez. Ningun otro espumoso comunica lo mismo.',
      en: 'Champagne is celebration, aperitif and premium pairing at once. No other sparkling wine communicates the same thing.',
      it: 'Champagne e celebrazione, aperitivo e abbinamento premium insieme. Nessun altro spumante comunica lo stesso.',
      fr: 'Champagne est celebration, aperitif et accord premium a la fois. Aucun autre effervescent ne dit la meme chose.',
      de: 'Champagne ist Feier, Aperitif und Premium-Pairing zugleich. Kein anderer Schaumwein sendet dasselbe Signal.',
      pt: 'Champagne e celebracao, aperitivo e harmonizacao premium ao mesmo tempo. Nenhum espumante comunica igual.',
    },
    cue: {
      es: 'Vende por ocasion, estilo y productor: Blanc de Blancs para precision, Rose para mesa gastronomica.',
      en: 'Sell by occasion, style and producer: Blanc de Blancs for precision, Rose for gastronomic tables.',
      it: 'Vendi per occasione, stile e produttore: Blanc de Blancs per precisione, Rose per tavoli gastronomici.',
      fr: 'Vendez par occasion, style et producteur : Blanc de Blancs pour la precision, Rose pour la table gastronomique.',
      de: 'Nach Anlass, Stil und Produzent verkaufen: Blanc de Blancs fur Prazision, Rose fur gastronomische Tische.',
      pt: 'Venda por ocasiao, estilo e produtor: Blanc de Blancs para precisao, Rose para mesa gastronomica.',
    },
    avoid: {
      es: 'No servirlo en flauta estrecha ni demasiado frio. Pierde aroma y parece solo brindis.',
      en: 'Do not serve in a narrow flute or too cold. It loses aroma and becomes only a toast.',
      it: 'Non servirlo in flute stretto o troppo freddo. Perde aromi e diventa solo brindisi.',
      fr: 'Ne pas servir en flute etroite ni trop froid. Il perd ses aromes et devient seulement un toast.',
      de: 'Nicht in enger Flote oder zu kalt servieren. Er verliert Aroma und wirkt nur wie ein Toast.',
      pt: 'Nao servir em flute estreita nem demasiado frio. Perde aroma e vira apenas brinde.',
    },
    hooks: {
      es: ['ostras', 'caviar', 'quesos'],
      en: ['oysters', 'caviar', 'cheeses'],
      it: ['ostriche', 'caviale', 'formaggi'],
      fr: ['huitres', 'caviar', 'fromages'],
      de: ['Austern', 'Kaviar', 'Kase'],
      pt: ['ostras', 'caviar', 'queijos'],
    },
  },
  douro: {
    serviceTemp: '16-18 C tintos / 10-12 C Porto Tawny',
    glass: 'Burdeos amplia / copa generoso',
    role: {
      es: 'Douro aporta descubrimiento con autoridad. Sus tintos secos dan valor premium y el Porto cubre sobremesa unica.',
      en: 'Douro brings discovery with authority. Dry reds deliver premium value and Port covers a unique after-dinner role.',
      it: 'Douro porta scoperta con autorevolezza. I rossi secchi danno valore premium e il Porto copre il dopo cena.',
      fr: 'Douro apporte decouverte et autorite. Les rouges secs donnent une valeur premium et le Porto couvre l apres-repas.',
      de: 'Douro bringt Entdeckung mit Autoritat. Trockene Rotweine liefern Premiumwert, Port deckt den Abschluss ab.',
      pt: 'Douro traz descoberta com autoridade. Tintos secos dao valor premium e Porto cobre a sobremesa.',
    },
    cue: {
      es: 'Distingue siempre Douro seco y Porto. Touriga Nacional ayuda a explicar estructura, violeta y origen portugues.',
      en: 'Always separate dry Douro from Port. Touriga Nacional explains structure, violet and Portuguese origin.',
      it: 'Distingui sempre Douro secco e Porto. Touriga Nacional spiega struttura, violetta e origine portoghese.',
      fr: 'Separez toujours Douro sec et Porto. Touriga Nacional explique structure, violette et origine portugaise.',
      de: 'Trockenen Douro und Port immer trennen. Touriga Nacional erklart Struktur, Veilchen und portugiesische Herkunft.',
      pt: 'Separe sempre Douro seco e Porto. Touriga Nacional explica estrutura, violeta e origem portuguesa.',
    },
    avoid: {
      es: 'No mezclar DOC Douro y Porto como si fueran lo mismo. Confunde al cliente y reduce la venta.',
      en: 'Do not present DOC Douro and Port as the same thing. It confuses guests and weakens sales.',
      it: 'Non presentare DOC Douro e Porto come la stessa cosa. Confondono il cliente e riducono la vendita.',
      fr: 'Ne pas presenter DOC Douro et Porto comme identiques. Cela confond le client et affaiblit la vente.',
      de: 'DOC Douro und Port nicht gleichsetzen. Das verwirrt Gaste und schwacht den Verkauf.',
      pt: 'Nao apresentar DOC Douro e Porto como a mesma coisa. Confunde o cliente e reduz venda.',
    },
    hooks: {
      es: ['caza', 'bacalao', 'chocolate'],
      en: ['game', 'salt cod', 'chocolate'],
      it: ['selvaggina', 'baccala', 'cioccolato'],
      fr: ['gibier', 'morue', 'chocolat'],
      de: ['Wild', 'Bacalhau', 'Schokolade'],
      pt: ['caca', 'bacalhau', 'chocolate'],
    },
  },
  'vinho-verde': {
    serviceTemp: '7-9 C',
    glass: 'Blanco joven / universal',
    role: {
      es: 'Vinho Verde aporta frescura portuguesa, bajo peso y mucha bebibilidad. Es perfecto para copa, aperitivo y terraza.',
      en: 'Vinho Verde brings Portuguese freshness, low weight and high drinkability. It is ideal by the glass, aperitif and terrace.',
      it: 'Vinho Verde porta freschezza portoghese, leggerezza e grande bevibilita. Perfetto al calice e aperitivo.',
      fr: 'Vinho Verde apporte fraicheur portugaise, legerete et grande buvabilite. Ideal au verre et a l aperitif.',
      de: 'Vinho Verde bringt portugiesische Frische, Leichtigkeit und hohe Trinkigkeit. Ideal im Glas und als Aperitif.',
      pt: 'Vinho Verde traz frescura portuguesa, leveza e muita bebibilidade. Perfeito a copo, aperitivo e esplanada.',
    },
    cue: {
      es: 'Explica que verde significa joven y fresco, no color. Alvarinho y Loureiro dan dos lecturas claras.',
      en: 'Explain that verde means young and fresh, not the colour. Alvarinho and Loureiro give two clear readings.',
      it: 'Spiega che verde significa giovane e fresco, non colore. Alvarinho e Loureiro danno due letture chiare.',
      fr: 'Expliquez que verde signifie jeune et frais, pas la couleur. Alvarinho et Loureiro donnent deux lectures.',
      de: 'Erklaren, dass verde jung und frisch bedeutet, nicht die Farbe. Alvarinho und Loureiro geben zwei Lesarten.',
      pt: 'Explique que verde significa jovem e fresco, nao cor. Alvarinho e Loureiro dao duas leituras claras.',
    },
    avoid: {
      es: 'No tratarlo como vino simple con gas. Las mejores referencias tienen acidez, salinidad y origen.',
      en: 'Do not treat it as simple fizzy wine. The best references have acidity, salinity and origin.',
      it: 'Non trattarlo come semplice vino frizzante. I migliori hanno acidita, salinita e origine.',
      fr: 'Ne pas le traiter comme simple vin perlant. Les meilleurs ont acidite, salinite et origine.',
      de: 'Nicht als einfachen Perlwein behandeln. Gute Referenzen haben Saure, Salinitat und Herkunft.',
      pt: 'Nao tratar como vinho simples com gas. As melhores referencias tem acidez, salinidade e origem.',
    },
    hooks: {
      es: ['marisco', 'sardinas', 'bacalao'],
      en: ['shellfish', 'sardines', 'salt cod'],
      it: ['frutti di mare', 'sardine', 'baccala'],
      fr: ['fruits de mer', 'sardines', 'morue'],
      de: ['Meeresfruchte', 'Sardinen', 'Bacalhau'],
      pt: ['marisco', 'sardinhas', 'bacalhau'],
    },
  },
};

const WINE_LIBRARY_PRIORITY_STYLES: Record<string, WineLibraryPriorityProfile> = {
  'tinto-crianza': {
    serviceTemp: '16-18 C',
    glass: 'Burdeos / universal amplia',
    role: {
      es: 'El tinto crianza es el puente de confianza entre vino sencillo y botella premium: seguro, reconocible y con precio defendible.',
      en: 'Crianza red is the trust bridge between an easy red and a premium bottle: safe, recognizable and price-defendable.',
      it: 'Il rosso crianza e il ponte di fiducia tra rosso semplice e bottiglia premium: sicuro, riconoscibile e difendibile nel prezzo.',
      fr: 'Le rouge crianza est le pont de confiance entre rouge simple et bouteille premium : rassurant, lisible et defendable en prix.',
      de: 'Crianza-Rotwein ist die Vertrauensbrucke zwischen einfachem Rotwein und Premiumflasche: sicher, erkennbar und preislich erklarbar.',
      pt: 'O tinto crianza e a ponte de confianca entre tinto simples e garrafa premium: seguro, reconhecivel e com preco defensavel.',
    },
    cue: {
      es: 'Vender por region, productor y equilibrio: fruta madura, madera integrada y tanino amable.',
      en: 'Sell by region, producer and balance: ripe fruit, integrated oak and gentle tannin.',
      it: 'Vendere per regione, produttore ed equilibrio: frutto maturo, legno integrato e tannino gentile.',
      fr: 'Vendre par region, producteur et equilibre : fruit mur, bois integre et tanin souple.',
      de: 'Uber Region, Produzent und Balance verkaufen: reife Frucht, integriertes Holz und sanftes Tannin.',
      pt: 'Vender por regiao, produtor e equilibrio: fruta madura, madeira integrada e tanino amavel.',
    },
    avoid: {
      es: 'No servirlo demasiado caliente ni reducirlo a vino con madera; la clave es equilibrio.',
      en: 'Do not serve it too warm or reduce it to oaky wine; the key is balance.',
      it: 'Non servirlo troppo caldo ne ridurlo a vino boise; la chiave e equilibrio.',
      fr: 'Ne pas le servir trop chaud ni le reduire a un vin boise ; la cle est l equilibre.',
      de: 'Nicht zu warm servieren und nicht auf Holz reduzieren; entscheidend ist Balance.',
      pt: 'Nao servir demasiado quente nem reduzir a vinho com madeira; a chave e equilibrio.',
    },
    hooks: {
      es: ['cordero', 'carnes rojas', 'setas', 'quesos curados', 'guisos'],
      en: ['lamb', 'red meat', 'mushrooms', 'aged cheese', 'stews'],
      it: ['agnello', 'carni rosse', 'funghi', 'formaggi stagionati', 'stufati'],
      fr: ['agneau', 'viandes rouges', 'champignons', 'fromages affines', 'plats mijotes'],
      de: ['Lamm', 'rotes Fleisch', 'Pilze', 'gereifter Kase', 'Schmorgerichte'],
      pt: ['borrego', 'carnes vermelhas', 'cogumelos', 'queijos curados', 'estufados'],
    },
  },
  'tinto-reserva': {
    serviceTemp: '16-18 C',
    glass: 'Burdeos amplia',
    role: {
      es: 'El tinto reserva construye percepcion premium mediante envejecimiento, productor, anada y momento especial.',
      en: 'Reserva red builds premium perception through ageing, producer, vintage and special occasion.',
      it: 'Il rosso reserva costruisce percezione premium con affinamento, produttore, annata e occasione.',
      fr: 'Le rouge reserva cree une perception premium par elevage, producteur, millesime et occasion.',
      de: 'Reserva-Rotwein schafft Premiumwahrnehmung uber Ausbau, Produzent, Jahrgang und Anlass.',
      pt: 'O tinto reserva cria percecao premium atraves de estagio, produtor, colheita e ocasiao.',
    },
    cue: {
      es: 'Cuenta el tiempo: crianza, botella y evolucion. Asi el precio se entiende mejor.',
      en: 'Tell the time story: oak ageing, bottle ageing and evolution. Price becomes easier to understand.',
      it: 'Racconta il tempo: botte, bottiglia ed evoluzione. Il prezzo diventa piu chiaro.',
      fr: 'Racontez le temps : elevage, bouteille et evolution. Le prix devient plus lisible.',
      de: 'Die Zeit erzahlen: Fass, Flasche und Entwicklung. So wird der Preis verstandlicher.',
      pt: 'Conte o tempo: barrica, garrafa e evolucao. O preco torna-se mais claro.',
    },
    avoid: {
      es: 'No asumir que mas viejo siempre es mejor; revisar anada, conservacion y aireacion.',
      en: 'Do not assume older is always better; check vintage, storage and aeration.',
      it: 'Non dare per scontato che piu vecchio sia sempre meglio; controllare annata, conservazione e aria.',
      fr: 'Ne pas supposer que plus vieux est toujours meilleur ; verifier millesime, conservation et aeration.',
      de: 'Nicht annehmen, dass alter immer besser ist; Jahrgang, Lagerung und Luftbedarf prufen.',
      pt: 'Nao assumir que mais velho e sempre melhor; verificar colheita, conservacao e ar.',
    },
    hooks: {
      es: ['chuleton', 'caza', 'guisos lentos', 'trufa', 'quesos muy curados'],
      en: ['ribeye', 'game', 'slow stews', 'truffle', 'very aged cheese'],
      it: ['costata', 'selvaggina', 'brasati', 'tartufo', 'formaggi stagionati'],
      fr: ['entrecote', 'gibier', 'plats mijotes', 'truffe', 'fromages affines'],
      de: ['Ribeye', 'Wild', 'Schmorgerichte', 'Truffel', 'gereifter Kase'],
      pt: ['entrecote', 'caca', 'estufados lentos', 'trufa', 'queijos curados'],
    },
  },
  'blanco-crianza-lias': {
    serviceTemp: '10-12 C',
    glass: 'Blanco grande / universal',
    role: {
      es: 'El blanco con lias vende textura y precio superior sin depender de la barrica.',
      en: 'Lees-aged white sells texture and a higher white-wine price without relying on oak.',
      it: 'Il bianco sui lieviti vende texture e prezzo superiore senza dipendere dal legno.',
      fr: 'Le blanc sur lies vend texture et prix superieur sans dependre du bois.',
      de: 'Weisswein auf der Hefe verkauft Textur und hoheren Weissweinpreis ohne Holz als Hauptargument.',
      pt: 'O branco sobre lias vende textura e preco superior sem depender da madeira.',
    },
    cue: {
      es: 'Traducir lias a cremosidad, salinidad y volumen; la tecnica debe ser util para el cliente.',
      en: 'Translate lees into creaminess, salinity and volume; the technique must be useful to the guest.',
      it: 'Tradurre i lieviti in cremosita, salinita e volume; la tecnica deve essere utile.',
      fr: 'Traduire les lies en cremeux, salinite et volume ; la technique doit servir le client.',
      de: 'Hefelager in Cremigkeit, Salinitat und Volumen ubersetzen; Technik muss nutzlich werden.',
      pt: 'Traduzir lias em cremosidade, salinidade e volume; a tecnica deve ajudar o cliente.',
    },
    avoid: {
      es: 'No servirlo helado ni presentarlo como blanco pesado; la gracia es tension con volumen.',
      en: 'Do not serve it ice cold or present it as heavy white; the point is tension with volume.',
      it: 'Non servirlo gelato ne presentarlo come bianco pesante; il punto e tensione con volume.',
      fr: 'Ne pas servir glace ni comme blanc lourd ; l interet est la tension avec du volume.',
      de: 'Nicht eiskalt servieren und nicht als schweren Weisswein verkaufen; es geht um Spannung mit Volumen.',
      pt: 'Nao servir gelado nem apresentar como branco pesado; a chave e tensao com volume.',
    },
    hooks: {
      es: ['pescado blanco', 'marisco', 'arroces', 'aves', 'quesos cremosos'],
      en: ['white fish', 'shellfish', 'rice dishes', 'poultry', 'creamy cheeses'],
      it: ['pesce bianco', 'frutti di mare', 'risotti', 'pollame', 'formaggi cremosi'],
      fr: ['poisson blanc', 'fruits de mer', 'riz', 'volaille', 'fromages cremoses'],
      de: ['weisser Fisch', 'Meeresfruchte', 'Reisgerichte', 'Geflugel', 'cremiger Kase'],
      pt: ['peixe branco', 'marisco', 'arrozes', 'aves', 'queijos cremosos'],
    },
  },
  espumoso: {
    serviceTemp: '6-8 C',
    glass: 'Tulipa / copa de vino blanco',
    role: {
      es: 'El espumoso no es solo celebracion: es aperitivo, maridaje y herramienta de ticket medio.',
      en: 'Sparkling wine is not only celebration: it is aperitif, pairing tool and spend builder.',
      it: 'Lo spumante non e solo celebrazione: e aperitivo, abbinamento e leva di scontrino.',
      fr: 'L effervescent n est pas seulement celebration : c est aperitif, accord et levier de ticket.',
      de: 'Schaumwein ist nicht nur Feier: Er ist Aperitif, Pairing-Werkzeug und Bon-Hebel.',
      pt: 'O espumante nao e so celebracao: e aperitivo, harmonizacao e alavanca de ticket medio.',
    },
    cue: {
      es: 'Habla de metodo, crianza sobre lias y dosage para explicar Cava, Champagne y Prosecco.',
      en: 'Talk method, lees ageing and dosage to explain Cava, Champagne and Prosecco.',
      it: 'Parla di metodo, affinamento sui lieviti e dosage per spiegare Cava, Champagne e Prosecco.',
      fr: 'Parlez methode, elevage sur lies et dosage pour expliquer Cava, Champagne et Prosecco.',
      de: 'Methode, Hefelager und Dosage nennen, um Cava, Champagne und Prosecco zu erklaren.',
      pt: 'Fale de metodo, estagio sobre lias e dosage para explicar Cava, Champagne e Prosecco.',
    },
    avoid: {
      es: 'No relegarlo al postre ni servirlo en coupe; pierde precision y oportunidad comercial.',
      en: 'Do not relegate it to dessert or serve it in coupe glasses; precision and opportunity disappear.',
      it: 'Non relegarlo al dessert ne servirlo in coppa; perde precisione e opportunita.',
      fr: 'Ne pas le releguer au dessert ni le servir en coupe ; precision et opportunite baissent.',
      de: 'Nicht auf Dessert reduzieren und nicht in der Coupe servieren; Prazision und Chance gehen verloren.',
      pt: 'Nao relegar para sobremesa nem servir em coupe; perde precisao e oportunidade.',
    },
    hooks: {
      es: ['ostras', 'frituras', 'sushi', 'jamon iberico', 'quesos'],
      en: ['oysters', 'fried dishes', 'sushi', 'Iberian ham', 'cheese'],
      it: ['ostriche', 'fritti', 'sushi', 'jamon iberico', 'formaggi'],
      fr: ['huitres', 'fritures', 'sushi', 'jambon iberique', 'fromages'],
      de: ['Austern', 'Frittiertes', 'Sushi', 'Iberico-Schinken', 'Kase'],
      pt: ['ostras', 'fritos', 'sushi', 'presunto iberico', 'queijos'],
    },
  },
  'rosado-cuerpo': {
    serviceTemp: '9-11 C',
    glass: 'Blanco amplio / universal',
    role: {
      es: 'El rosado gastronomico une frescura de blanco y estructura de tinto; resuelve mesas que no se ponen de acuerdo.',
      en: 'Gastronomic rose bridges white freshness and red structure; it solves tables that cannot agree.',
      it: 'Il rosato gastronomico unisce freschezza del bianco e struttura del rosso; risolve tavoli indecisi.',
      fr: 'Le rose gastronomique relie fraicheur du blanc et structure du rouge ; il resout les tables hesitantes.',
      de: 'Gastronomischer Rose verbindet Weissweinfrische mit Rotweinstruktur und lost unentschlossene Tische.',
      pt: 'O rose gastronomico une frescura de branco e estrutura de tinto; resolve mesas sem consenso.',
    },
    cue: {
      es: 'Venderlo como rosado seco, serio y de comida; color no significa dulzor.',
      en: 'Sell it as dry, serious and food-friendly rose; colour does not mean sweetness.',
      it: 'Vendilo come rosato secco, serio e da tavola; colore non significa dolcezza.',
      fr: 'Vendez-le comme rose sec, serieux et de table ; la couleur ne signifie pas sucre.',
      de: 'Als trockenen, ernsthaften Speisenrose verkaufen; Farbe bedeutet nicht Suesse.',
      pt: 'Venda como rose seco, serio e de comida; cor nao significa docura.',
    },
    avoid: {
      es: 'No presentarlo como vino simple de verano; si tiene cuerpo, necesita rol gastronomico.',
      en: 'Do not present it as simple summer wine; if it has body, give it a gastronomic role.',
      it: 'Non presentarlo come semplice vino estivo; se ha corpo, merita ruolo gastronomico.',
      fr: 'Ne pas le presenter comme simple vin d ete ; s il a du corps, il merite un role gastronomique.',
      de: 'Nicht als einfachen Sommerwein vorstellen; mit Korper braucht er eine gastronomische Rolle.',
      pt: 'Nao apresentar como vinho simples de verao; se tem corpo, merece papel gastronomico.',
    },
    hooks: {
      es: ['arroces', 'atun', 'cocina picante', 'charcuteria', 'aves'],
      en: ['rice dishes', 'tuna', 'spicy food', 'charcuterie', 'poultry'],
      it: ['risotti', 'tonno', 'cucina piccante', 'salumi', 'pollame'],
      fr: ['riz', 'thon', 'cuisine epicee', 'charcuterie', 'volaille'],
      de: ['Reisgerichte', 'Thunfisch', 'scharfe Kuche', 'Charcuterie', 'Geflugel'],
      pt: ['arrozes', 'atum', 'comida picante', 'enchidos', 'aves'],
    },
  },
};

const WINE_LIBRARY_PRIORITY_PAIRINGS: Record<string, WineLibraryPriorityProfile> = {
  'carnes-rojas': {
    serviceTemp: 'Copa: Rioja Crianza, Ribera roble o Malbec',
    glass: 'Ruta: crianza -> productor -> reserva premium',
    role: {
      es: 'Carnes rojas es el maridaje de confianza para vender tinto con seguridad, leyendo corte, grasa, salsa y punto de coccion.',
      en: 'Red meat is the trust pairing for selling red wine with confidence by reading cut, fat, sauce and cooking point.',
      it: 'Le carni rosse sono l abbinamento di fiducia per vendere rosso leggendo taglio, grasso, salsa e cottura.',
      fr: 'Les viandes rouges sont l accord de confiance pour vendre du rouge en lisant morceau, gras, sauce et cuisson.',
      de: 'Rotes Fleisch ist das Vertrauenspairing fur Rotweinverkauf nach Schnitt, Fett, Sauce und Gargrad.',
      pt: 'Carnes vermelhas sao a harmonizacao de confianca para vender tinto lendo corte, gordura, molho e ponto.',
    },
    cue: {
      es: 'Empieza por la carne y termina por estructura: grasa, brasa, tanino y frescura.',
      en: 'Start with the meat and finish with structure: fat, grill, tannin and freshness.',
      it: 'Partire dalla carne e chiudere con struttura: grasso, brace, tannino e freschezza.',
      fr: 'Commencer par la viande et finir par la structure : gras, grill, tanin et fraicheur.',
      de: 'Beim Fleisch beginnen und mit Struktur enden: Fett, Grill, Tannin und Frische.',
      pt: 'Comecar pela carne e terminar na estrutura: gordura, grelha, tanino e frescura.',
    },
    avoid: {
      es: 'No recomendar siempre el tinto mas potente; solomillo o carpaccio necesitan menos tanino que chuleton.',
      en: 'Do not always recommend the most powerful red; fillet or carpaccio needs less tannin than ribeye.',
      it: 'Non consigliare sempre il rosso piu potente; filetto o carpaccio richiedono meno tannino.',
      fr: 'Ne pas recommander toujours le rouge le plus puissant ; filet ou carpaccio demandent moins de tanin.',
      de: 'Nicht immer den kraftigsten Rotwein empfehlen; Filet oder Carpaccio brauchen weniger Tannin.',
      pt: 'Nao recomendar sempre o tinto mais potente; filet ou carpaccio precisam de menos tanino.',
    },
    hooks: {
      es: ['chuleton', 'cordero', 'solomillo', 'estofados', 'quesos curados'],
      en: ['ribeye', 'lamb', 'fillet', 'stews', 'aged cheese'],
      it: ['costata', 'agnello', 'filetto', 'brasati', 'formaggi stagionati'],
      fr: ['entrecote', 'agneau', 'filet', 'plats mijotes', 'fromages affines'],
      de: ['Ribeye', 'Lamm', 'Filet', 'Schmorgerichte', 'gereifter Kase'],
      pt: ['entrecote', 'borrego', 'filet', 'estufados', 'queijos curados'],
    },
  },
  'lubina-dorada': {
    serviceTemp: 'Copa: Albarino, Verdejo, Chablis o Godello',
    glass: 'Ruta: blanco fresco -> mineral -> lias premium',
    role: {
      es: 'Pescado blanco debe vender frescura, precision y respeto por el producto.',
      en: 'White fish should sell freshness, precision and respect for the product.',
      it: 'Il pesce bianco deve vendere freschezza, precisione e rispetto del prodotto.',
      fr: 'Le poisson blanc doit vendre fraicheur, precision et respect du produit.',
      de: 'Weisser Fisch verkauft Frische, Prazision und Respekt vor dem Produkt.',
      pt: 'Peixe branco deve vender frescura, precisao e respeito pelo produto.',
    },
    cue: {
      es: 'Habla de delicadeza, acidez y salinidad; si hay salsa, deja que decida el cuerpo.',
      en: 'Talk delicacy, acidity and salinity; if there is sauce, let it decide the body.',
      it: 'Parlare di delicatezza, acidita e salinita; se c e salsa, decide il corpo.',
      fr: 'Parler delicatesse, acidite et salinite ; s il y a sauce, elle decide le corps.',
      de: 'Delikatesse, Saure und Salinitat nennen; Sauce entscheidet den Korper.',
      pt: 'Falar de delicadeza, acidez e salinidade; se houver molho, ele decide o corpo.',
    },
    avoid: {
      es: 'No tapar el pescado con madera excesiva ni servir el vino helado hasta borrar aromas.',
      en: 'Do not cover the fish with excessive oak or serve the wine so cold that aromatics disappear.',
      it: 'Non coprire il pesce con troppo legno ne servire il vino troppo freddo.',
      fr: 'Ne pas couvrir le poisson avec trop de bois ni servir le vin trop froid.',
      de: 'Den Fisch nicht mit Holz verdecken und den Wein nicht zu kalt servieren.',
      pt: 'Nao tapar o peixe com madeira excessiva nem servir o vinho demasiado frio.',
    },
    hooks: {
      es: ['lubina', 'dorada', 'merluza', 'rodaballo', 'salsas ligeras'],
      en: ['sea bass', 'sea bream', 'hake', 'turbot', 'light sauces'],
      it: ['branzino', 'orata', 'nasello', 'rombo', 'salse leggere'],
      fr: ['bar', 'daurade', 'merlu', 'turbot', 'sauces legeres'],
      de: ['Wolfsbarsch', 'Dorade', 'Seehecht', 'Steinbutt', 'leichte Saucen'],
      pt: ['robalo', 'dourada', 'pescada', 'pregado', 'molhos leves'],
    },
  },
  'pescados-y-mariscos': {
    serviceTemp: 'Copa: Albarino, Cava Brut Nature, Champagne o Muscadet',
    glass: 'Ruta: blanco fresco -> espumoso -> botella premium',
    role: {
      es: 'Marisco es una palanca de frescura, salinidad y ticket medio: puede vender blanco, espumoso o botella premium.',
      en: 'Seafood is a lever for freshness, salinity and spend: it can sell white, sparkling or premium bottles.',
      it: 'I frutti di mare sono leva di freschezza, salinita e scontrino: vendono bianco, spumante o premium.',
      fr: 'Les fruits de mer activent fraicheur, salinite et ticket : blanc, effervescent ou bouteille premium.',
      de: 'Meeresfruchte sind Hebel fur Frische, Salinitat und Bon: Weisswein, Schaumwein oder Premiumflasche.',
      pt: 'Marisco e alavanca de frescura, salinidade e ticket: vende branco, espumante ou garrafa premium.',
    },
    cue: {
      es: 'Conecta mar, sal y burbuja. En crudo manda la acidez; a la plancha entra mas volumen.',
      en: 'Connect sea, salt and bubbles. Raw seafood needs acidity; grilled seafood can take more volume.',
      it: 'Collegare mare, sale e bollicina. A crudo acidita; alla griglia piu volume.',
      fr: 'Relier mer, sel et bulle. Le cru demande acidite ; la plancha accepte plus de volume.',
      de: 'Meer, Salz und Perlage verbinden. Roh braucht Saure; gegrillt vertragt mehr Volumen.',
      pt: 'Ligar mar, sal e bolha. Em cru manda a acidez; na grelha entra mais volume.',
    },
    avoid: {
      es: 'No limitar marisco a un solo blanco fresco; hay margen en espumosos, lias y blancos minerales.',
      en: 'Do not reduce seafood to one fresh white; there is margin in sparkling, lees-aged and mineral whites.',
      it: 'Non ridurre il mare a un solo bianco fresco; c e margine in spumanti, lieviti e mineralita.',
      fr: 'Ne pas reduire les fruits de mer a un seul blanc frais ; la marge existe sur bulles, lies et mineralite.',
      de: 'Meeresfruchte nicht auf einen Weisswein reduzieren; Marge liegt in Schaumwein, Hefelager und Mineralitat.',
      pt: 'Nao limitar marisco a um branco fresco; ha margem em espumantes, lias e mineralidade.',
    },
    hooks: {
      es: ['ostras', 'gambas', 'pulpo', 'ceviche', 'sushi'],
      en: ['oysters', 'prawns', 'octopus', 'ceviche', 'sushi'],
      it: ['ostriche', 'gamberi', 'polpo', 'ceviche', 'sushi'],
      fr: ['huitres', 'crevettes', 'poulpe', 'ceviche', 'sushi'],
      de: ['Austern', 'Garnelen', 'Oktopus', 'Ceviche', 'Sushi'],
      pt: ['ostras', 'camarao', 'polvo', 'ceviche', 'sushi'],
    },
  },
  'pasta-arroces-y-legumbres': {
    serviceTemp: 'Copa: Garnacha, rose gastronomico, Verdejo o Chianti',
    glass: 'Ruta: por salsa -> por fondo -> por textura',
    role: {
      es: 'Arroces y pasta son maridajes de rotacion: salsa, fondo y grasa mandan mas que el ingrediente base.',
      en: 'Rice and pasta are rotation pairings: sauce, stock and fat matter more than the base ingredient.',
      it: 'Riso e pasta sono abbinamenti di rotazione: salsa, fondo e grasso contano piu della base.',
      fr: 'Riz et pates sont des accords de rotation : sauce, fond et gras comptent plus que la base.',
      de: 'Reis und Pasta sind Rotationspairings: Sauce, Fond und Fett zahlen mehr als die Basis.',
      pt: 'Arrozes e massas sao harmonizacoes de rotacao: molho, fundo e gordura mandam mais que a base.',
    },
    cue: {
      es: 'Pregunta por salsa y fondo: tomate pide acidez, setas piden tierra, marisco pide salinidad.',
      en: 'Ask about sauce and stock: tomato needs acidity, mushrooms need earth, seafood needs salinity.',
      it: 'Chiedere salsa e fondo: pomodoro vuole acidita, funghi terra, mare salinita.',
      fr: 'Demander sauce et fond : tomate veut acidite, champignons terre, mer salinite.',
      de: 'Nach Sauce und Fond fragen: Tomate braucht Saure, Pilze Erde, Meeresfruchte Salinitat.',
      pt: 'Perguntar pelo molho e fundo: tomate pede acidez, cogumelos terra, marisco salinidade.',
    },
    avoid: {
      es: 'No tratar todos los arroces como paella ni toda pasta como tomate; el condimento decide.',
      en: 'Do not treat every rice dish as paella or every pasta as tomato; seasoning decides.',
      it: 'Non trattare ogni riso come paella ne ogni pasta come pomodoro; decide il condimento.',
      fr: 'Ne pas traiter tous les riz comme paella ni toutes les pates comme tomate ; l assaisonnement decide.',
      de: 'Nicht jedes Reisgericht als Paella und jede Pasta als Tomate behandeln; Wurze entscheidet.',
      pt: 'Nao tratar todos os arrozes como paella nem todas as massas como tomate; o tempero decide.',
    },
    hooks: {
      es: ['paella', 'risotto', 'pasta con tomate', 'setas', 'legumbres'],
      en: ['paella', 'risotto', 'tomato pasta', 'mushrooms', 'legumes'],
      it: ['paella', 'risotto', 'pasta al pomodoro', 'funghi', 'legumi'],
      fr: ['paella', 'risotto', 'pates tomate', 'champignons', 'legumineuses'],
      de: ['Paella', 'Risotto', 'Tomatenpasta', 'Pilze', 'Hulsenfruchte'],
      pt: ['paella', 'risotto', 'massa com tomate', 'cogumelos', 'leguminosas'],
    },
  },
  'cocina-asiatica-y-fusion': {
    serviceTemp: 'Copa: Riesling, Gewurztraminer o espumoso brut',
    glass: 'Ruta: picante -> umami -> dulzor/acidez',
    role: {
      es: 'Cocina asiatica exige gestionar picante, umami, dulzor y acidez; es donde un buen maridaje mas sorprende.',
      en: 'Asian cuisine requires managing spice, umami, sweetness and acidity; it is where pairing surprises most.',
      it: 'La cucina asiatica richiede piccante, umami, dolcezza e acidita; qui l abbinamento sorprende.',
      fr: 'La cuisine asiatique demande piment, umami, douceur et acidite ; c est l accord qui surprend.',
      de: 'Asiatische Kuche verlangt Kontrolle von Scharfe, Umami, Suesse und Saure; hier uberrascht Pairing.',
      pt: 'Cozinha asiatica exige gerir picante, umami, docura e acidez; e onde a harmonizacao surpreende.',
    },
    cue: {
      es: 'No empieces por color; empieza por picante, soja, jengibre, coco o agridulce.',
      en: 'Do not start with colour; start with spice, soy, ginger, coconut or sweet-sour balance.',
      it: 'Non partire dal colore; partire da piccante, soia, zenzero, cocco o agrodolce.',
      fr: 'Ne pas commencer par la couleur ; commencer par piment, soja, gingembre, coco ou aigre-doux.',
      de: 'Nicht mit Farbe beginnen; mit Scharfe, Soja, Ingwer, Kokos oder Suss-Sauer starten.',
      pt: 'Nao comecar pela cor; comecar por picante, soja, gengibre, coco ou agridoce.',
    },
    avoid: {
      es: 'No usar tintos tanicos con picante o soja dominante; se endurecen y aumentan el calor.',
      en: 'Avoid tannic reds with heat or dominant soy; they harden and increase spice perception.',
      it: 'Evitare rossi tannici con piccante o soia dominante; si induriscono e aumentano il calore.',
      fr: 'Eviter les rouges tanniques avec piment ou soja dominant ; ils durcissent et augmentent la chaleur.',
      de: 'Tannische Rotweine bei Scharfe oder dominanter Soja vermeiden; sie wirken hart.',
      pt: 'Evitar tintos tanicos com picante ou soja dominante; endurecem e aumentam o calor.',
    },
    hooks: {
      es: ['sushi', 'ramen', 'thai curry', 'bao', 'ceviche fusion'],
      en: ['sushi', 'ramen', 'Thai curry', 'bao', 'fusion ceviche'],
      it: ['sushi', 'ramen', 'thai curry', 'bao', 'ceviche fusion'],
      fr: ['sushi', 'ramen', 'thai curry', 'bao', 'ceviche fusion'],
      de: ['Sushi', 'Ramen', 'Thai Curry', 'Bao', 'Fusion-Ceviche'],
      pt: ['sushi', 'ramen', 'thai curry', 'bao', 'ceviche fusion'],
    },
  },
  quesos: {
    serviceTemp: 'Copa: Amontillado, Riesling, Sauternes o PX',
    glass: 'Ruta: fresco -> cremoso -> curado -> azul',
    role: {
      es: 'Quesos es una categoria de margen alto si se vende por familias: fresco, cremoso, curado y azul.',
      en: 'Cheese is a high-margin category when sold by families: fresh, creamy, aged and blue.',
      it: 'I formaggi sono categoria ad alto margine se venduti per famiglie: freschi, cremosi, stagionati, erborinati.',
      fr: 'Le fromage est une categorie a forte marge vendu par familles : frais, cremeux, affine et bleu.',
      de: 'Kase ist margentragend, wenn nach Familien verkauft wird: frisch, cremig, gereift und blau.',
      pt: 'Queijos sao categoria de margem alta quando vendidos por familias: fresco, cremoso, curado e azul.',
    },
    cue: {
      es: 'No digas solo tinto con queso; lee sal, grasa, curacion e intensidad.',
      en: 'Do not just say red with cheese; read salt, fat, ageing and intensity.',
      it: 'Non dire solo rosso con formaggio; leggere sale, grasso, stagionatura e intensita.',
      fr: 'Ne dites pas seulement rouge avec fromage ; lisez sel, gras, affinage et intensite.',
      de: 'Nicht einfach Rotwein zu Kase sagen; Salz, Fett, Reife und Intensitat lesen.',
      pt: 'Nao dizer apenas tinto com queijo; ler sal, gordura, cura e intensidade.',
    },
    avoid: {
      es: 'No recomendar tintos tanicos con todos los quesos; muchos van mejor con blancos, generosos o dulces.',
      en: 'Do not recommend tannic reds with every cheese; many work better with whites, fortified or sweet wines.',
      it: 'Non consigliare rossi tannici con tutti i formaggi; molti funzionano meglio con bianchi o dolci.',
      fr: 'Ne pas recommander des rouges tanniques avec tous les fromages ; beaucoup vont mieux avec blancs ou doux.',
      de: 'Nicht tannische Rotweine zu jedem Kase empfehlen; viele passen besser zu Weisswein oder Susswein.',
      pt: 'Nao recomendar tintos tanicos com todos os queijos; muitos funcionam melhor com brancos ou doces.',
    },
    hooks: {
      es: ['manchego', 'queso azul', 'brie', 'parmigiano', 'tabla de quesos'],
      en: ['Manchego', 'blue cheese', 'Brie', 'Parmigiano', 'cheese board'],
      it: ['Manchego', 'erborinato', 'Brie', 'Parmigiano', 'tagliere'],
      fr: ['Manchego', 'fromage bleu', 'Brie', 'Parmigiano', 'plateau de fromages'],
      de: ['Manchego', 'Blauschimmel', 'Brie', 'Parmigiano', 'Kaseplatte'],
      pt: ['Manchego', 'queijo azul', 'Brie', 'Parmigiano', 'tabua de queijos'],
    },
  },
};

type WineLibraryExpansionTemplate =
  | 'freshWhite'
  | 'mineralWhite'
  | 'aromaticWhite'
  | 'elegantRed'
  | 'structuredRed'
  | 'mediterraneanRed'
  | 'sparkling'
  | 'fortified'
  | 'foodPairing'
  | 'dessertPairing'
  | 'aperitifPairing';

interface WineLibraryExpansionSeed {
  slug: string;
  serviceTemp: string;
  glass: string;
  template: WineLibraryExpansionTemplate;
  hooks: Record<WineLibraryLang, string[]>;
}

const WINE_LIBRARY_EXPANSION_TEXT: Record<WineLibraryExpansionTemplate, Record<WineLibraryLang, {
  role: string;
  cue: string;
  avoid: string;
}>> = {
  freshWhite: {
    es: { role: 'Referencia blanca de alta rotacion para vender frescura, origen y decision facil por copa.', cue: 'Explica acidez, aroma y plato en una frase clara.', avoid: 'No tratarlo como blanco generico de la casa.' },
    en: { role: 'High-rotation white reference for freshness, origin and easy by-the-glass decisions.', cue: 'Explain acidity, aroma and dish fit in one clear sentence.', avoid: 'Do not reduce it to generic house-white language.' },
    it: { role: 'Bianco ad alta rotazione per freschezza, origine e scelta facile al calice.', cue: 'Spiega acidita, aroma e piatto in una frase chiara.', avoid: 'Non ridurlo a bianco generico della casa.' },
    fr: { role: 'Blanc de forte rotation pour fraicheur, origine et decision facile au verre.', cue: 'Expliquez acidite, aromes et plat en une phrase claire.', avoid: 'Ne pas le reduire a un blanc maison generique.' },
    de: { role: 'Weisse Referenz mit hoher Rotation fur Frische, Herkunft und einfache Glasentscheidung.', cue: 'Saure, Aroma und Gericht in einem klaren Satz erklaren.', avoid: 'Nicht als generischen Hauswein behandeln.' },
    pt: { role: 'Branco de alta rotacao para frescura, origem e decisao facil a copo.', cue: 'Explique acidez, aroma e prato numa frase clara.', avoid: 'Nao reduzir a branco generico da casa.' },
  },
  mineralWhite: {
    es: { role: 'Blanco gastronomico para vender tension, salinidad y una botella mas seria.', cue: 'Traduce mineralidad en sal, acidez, textura y final limpio.', avoid: 'No describirlo solo como seco: explica su utilidad con comida.' },
    en: { role: 'Gastronomic white for tension, salinity and a more serious bottle step.', cue: 'Translate minerality into salt, acidity, texture and clean finish.', avoid: 'Do not describe it only as dry: explain why it works with food.' },
    it: { role: 'Bianco gastronomico per tensione, salinita e bottiglia piu seria.', cue: 'Traduci mineralita in sale, acidita, texture e finale pulito.', avoid: 'Non descriverlo solo come secco: spiega l uso col cibo.' },
    fr: { role: 'Blanc gastronomique pour tension, salinite et bouteille plus serieuse.', cue: 'Traduisez mineralite en sel, acidite, texture et finale nette.', avoid: 'Ne pas le decrire seulement comme sec : expliquez son role a table.' },
    de: { role: 'Gastronomischer Weisswein fur Spannung, Salinitat und eine ernstere Flasche.', cue: 'Mineralitat in Salz, Saure, Textur und klaren Nachhall ubersetzen.', avoid: 'Nicht nur als trocken beschreiben: den Nutzen zum Essen erklaren.' },
    pt: { role: 'Branco gastronomico para tensao, salinidade e garrafa mais seria.', cue: 'Traduza mineralidade em sal, acidez, textura e final limpo.', avoid: 'Nao descrever apenas como seco: explique o uso com comida.' },
  },
  aromaticWhite: {
    es: { role: 'Blanco aromatico para crear recuerdo, frescura y maridajes que no funcionan con tintos.', cue: 'Aclara dulzor, acidez y perfil aromatico antes de recomendar.', avoid: 'No servir demasiado frio ni dejar dudas sobre si es seco o dulce.' },
    en: { role: 'Aromatic white for memory, freshness and pairings that do not work with reds.', cue: 'Clarify sweetness, acidity and aromatic profile before recommending.', avoid: 'Do not serve too cold or leave doubt about dry versus sweet.' },
    it: { role: 'Bianco aromatico per memoria, freschezza e abbinamenti dove il rosso non funziona.', cue: 'Chiarisci dolcezza, acidita e profilo aromatico.', avoid: 'Non servire troppo freddo ne lasciare dubbi su secco o dolce.' },
    fr: { role: 'Blanc aromatique pour memoire, fraicheur et accords ou le rouge ne marche pas.', cue: 'Clarifiez sucre, acidite et profil aromatique.', avoid: 'Ne pas servir trop froid ni laisser le doute sec/doux.' },
    de: { role: 'Aromatischer Weisswein fur Erinnerung, Frische und Pairings, bei denen Rotwein nicht passt.', cue: 'Susse, Saure und Aromatik vor der Empfehlung klaren.', avoid: 'Nicht zu kalt servieren oder trocken/suss unklar lassen.' },
    pt: { role: 'Branco aromatico para memoria, frescura e harmonizacoes onde tinto nao funciona.', cue: 'Clarifique docura, acidez e perfil aromatico.', avoid: 'Nao servir demasiado frio nem deixar duvida seco/doce.' },
  },
  elegantRed: {
    es: { role: 'Tinto elegante para clientes que buscan finura, acidez y menos peso alcoholico.', cue: 'Sirve ligeramente fresco y vende textura antes que potencia.', avoid: 'No presentarlo como tinto ligero sin valor: la clave es precision.' },
    en: { role: 'Elegant red for guests seeking finesse, acidity and less alcoholic weight.', cue: 'Serve slightly cool and sell texture before power.', avoid: 'Do not present it as low-value light red: precision is the key.' },
    it: { role: 'Rosso elegante per chi cerca finezza, acidita e meno peso alcolico.', cue: 'Servi leggermente fresco e vendi texture prima della potenza.', avoid: 'Non presentarlo come rosso leggero senza valore: la chiave e precisione.' },
    fr: { role: 'Rouge elegant pour clients qui cherchent finesse, acidite et moins de poids alcoolique.', cue: 'Servez legerement frais et vendez texture avant puissance.', avoid: 'Ne pas le presenter comme rouge leger sans valeur : la cle est precision.' },
    de: { role: 'Eleganter Rotwein fur Gaste, die Finesse, Saure und weniger Alkoholgewicht suchen.', cue: 'Leicht kuhl servieren und Textur vor Kraft verkaufen.', avoid: 'Nicht als leichten Wein ohne Wert darstellen: Prazision ist der Kern.' },
    pt: { role: 'Tinto elegante para clientes que procuram finura, acidez e menos peso alcoolico.', cue: 'Sirva ligeiramente fresco e venda textura antes de potencia.', avoid: 'Nao apresentar como tinto leve sem valor: a chave e precisao.' },
  },
  structuredRed: {
    es: { role: 'Tinto estructurado para carnes, ticket alto y botellas con mayor presencia en mesa.', cue: 'Conecta tanino, grasa, brasa y tiempo de aireacion.', avoid: 'No recomendarlo joven y cerrado sin plato ni aire.' },
    en: { role: 'Structured red for meat, higher spend and bottles with more table presence.', cue: 'Connect tannin, fat, grill and aeration time.', avoid: 'Do not recommend it young and closed without food or air.' },
    it: { role: 'Rosso strutturato per carne, ticket alto e bottiglie di presenza.', cue: 'Collega tannino, grasso, brace e aria.', avoid: 'Non consigliarlo giovane e chiuso senza cibo o aria.' },
    fr: { role: 'Rouge structure pour viande, ticket eleve et bouteille de presence.', cue: 'Reliez tanin, gras, grill et aeration.', avoid: 'Ne pas le recommander jeune et ferme sans plat ni air.' },
    de: { role: 'Strukturierter Rotwein fur Fleisch, hoheren Bon und Flaschen mit Prasenz.', cue: 'Tannin, Fett, Grill und Luftzeit verbinden.', avoid: 'Jung und verschlossen nicht ohne Essen oder Luft empfehlen.' },
    pt: { role: 'Tinto estruturado para carne, ticket alto e garrafas com presenca.', cue: 'Ligue tanino, gordura, grelha e tempo de ar.', avoid: 'Nao recomendar jovem e fechado sem prato nem ar.' },
  },
  mediterraneanRed: {
    es: { role: 'Tinto mediterraneo para fruta, especia, brasa y diferenciacion sin perder facilidad.', cue: 'Vende origen, madurez y plato, manteniendo frescura.', avoid: 'No servir caliente: el alcohol pesa y reduce precision.' },
    en: { role: 'Mediterranean red for fruit, spice, grill and differentiation without losing ease.', cue: 'Sell origin, ripeness and dish fit while keeping freshness.', avoid: 'Do not serve warm: alcohol becomes heavy and precision drops.' },
    it: { role: 'Rosso mediterraneo per frutto, spezia, brace e differenza senza perdere facilita.', cue: 'Vendi origine, maturita e piatto mantenendo freschezza.', avoid: 'Non servire caldo: l alcol pesa e perde precisione.' },
    fr: { role: 'Rouge mediterraneen pour fruit, epice, grill et difference sans perdre lisibilite.', cue: 'Vendez origine, maturite et plat en gardant la fraicheur.', avoid: 'Ne pas servir chaud : l alcool pese et la precision baisse.' },
    de: { role: 'Mediterraner Rotwein fur Frucht, Wurze, Grill und Differenzierung ohne Schwierigkeit.', cue: 'Herkunft, Reife und Gericht verkaufen, Frische bewahren.', avoid: 'Nicht warm servieren: Alkohol wirkt schwer und Prazision sinkt.' },
    pt: { role: 'Tinto mediterranico para fruta, especiaria, grelha e diferenciacao sem perder facilidade.', cue: 'Venda origem, maturidade e prato mantendo frescura.', avoid: 'Nao servir quente: o alcool pesa e reduz precisao.' },
  },
  sparkling: {
    es: { role: 'Espumoso para aperitivo, celebracion y maridajes que suben ticket desde el primer servicio.', cue: 'Habla de metodo, crianza y dosage para justificar precio.', avoid: 'No relegarlo al postre ni servirlo en copa inadecuada.' },
    en: { role: 'Sparkling wine for aperitif, celebration and pairings that lift spend from the first service.', cue: 'Talk method, ageing and dosage to explain price.', avoid: 'Do not relegate it to dessert or unsuitable glassware.' },
    it: { role: 'Spumante per aperitivo, celebrazione e abbinamenti che alzano lo scontrino.', cue: 'Parla di metodo, affinamento e dosage per spiegare il prezzo.', avoid: 'Non relegarlo al dessert ne a calici inadatti.' },
    fr: { role: 'Effervescent pour aperitif, celebration et accords qui augmentent le ticket.', cue: 'Parlez methode, elevage et dosage pour expliquer le prix.', avoid: 'Ne pas le releguer au dessert ni au mauvais verre.' },
    de: { role: 'Schaumwein fur Aperitif, Anlass und Pairings, die den Bon ab dem ersten Service heben.', cue: 'Methode, Reife und Dosage erklaren, um Preis sichtbar zu machen.', avoid: 'Nicht auf Dessert reduzieren oder falsch servieren.' },
    pt: { role: 'Espumante para aperitivo, celebracao e harmonizacoes que sobem ticket desde o inicio.', cue: 'Fale de metodo, estagio e dosage para explicar preco.', avoid: 'Nao relegar a sobremesa nem servir em copo errado.' },
  },
  fortified: {
    es: { role: 'Vino de servicio experto para aperitivo, quesos, postres y cierre de mesa.', cue: 'Explica seco/dulce, temperatura y tamano de servicio.', avoid: 'No esconderlo como rareza; necesita un uso concreto.' },
    en: { role: 'Expert-service wine for aperitif, cheese, dessert and table closure.', cue: 'Explain dry/sweet, temperature and pour size.', avoid: 'Do not hide it as a curiosity; it needs a concrete use.' },
    it: { role: 'Vino di servizio esperto per aperitivo, formaggi, dessert e fine tavola.', cue: 'Spiega secco/dolce, temperatura e dose.', avoid: 'Non nasconderlo come curiosita; serve un uso concreto.' },
    fr: { role: 'Vin de service expert pour aperitif, fromage, dessert et fin de table.', cue: 'Expliquez sec/doux, temperature et dose.', avoid: 'Ne pas le cacher comme curiosite ; il demande un usage concret.' },
    de: { role: 'Expertenwein fur Aperitif, Kase, Dessert und Abschluss.', cue: 'Trocken/suss, Temperatur und Ausschankgrosse erklaren.', avoid: 'Nicht als Kuriositat verstecken; er braucht konkreten Einsatz.' },
    pt: { role: 'Vinho de servico especialista para aperitivo, queijo, sobremesa e fim de mesa.', cue: 'Explique seco/doce, temperatura e tamanho da dose.', avoid: 'Nao esconder como curiosidade; precisa de uso concreto.' },
  },
  foodPairing: {
    es: { role: 'Maridaje de alta utilidad para traducir plato, salsa y textura en recomendacion vendible.', cue: 'Empieza por grasa, salsa e intensidad antes de elegir color.', avoid: 'No aplicar una regla fija: el punto del plato decide el vino.' },
    en: { role: 'High-utility pairing that turns dish, sauce and texture into a sellable recommendation.', cue: 'Start with fat, sauce and intensity before choosing colour.', avoid: 'Do not apply a fixed rule: the dish details decide the wine.' },
    it: { role: 'Abbinamento utile per tradurre piatto, salsa e texture in raccomandazione vendibile.', cue: 'Parti da grasso, salsa e intensita prima del colore.', avoid: 'Non applicare una regola fissa: decide il piatto.' },
    fr: { role: 'Accord tres utile pour transformer plat, sauce et texture en recommandation vendable.', cue: 'Commencez par gras, sauce et intensite avant la couleur.', avoid: 'Ne pas appliquer une regle fixe : le detail du plat decide.' },
    de: { role: 'Nutzliches Pairing, das Gericht, Sauce und Textur in eine verkaufbare Empfehlung ubersetzt.', cue: 'Mit Fett, Sauce und Intensitat beginnen, erst dann Farbe wahlen.', avoid: 'Keine feste Regel anwenden: das Gericht entscheidet.' },
    pt: { role: 'Harmonizacao util para traduzir prato, molho e textura numa recomendacao vendavel.', cue: 'Comece por gordura, molho e intensidade antes da cor.', avoid: 'Nao aplicar regra fixa: o detalhe do prato decide.' },
  },
  dessertPairing: {
    es: { role: 'Maridaje de cierre para vender media copa, dulzor equilibrado y recuerdo final.', cue: 'Iguala o supera el dulzor del postre y conserva acidez.', avoid: 'No poner vinos secos contra chocolate o azucar alta.' },
    en: { role: 'Closing pairing for half-pours, balanced sweetness and a memorable finish.', cue: 'Match or exceed dessert sweetness while keeping acidity.', avoid: 'Do not put dry wines against chocolate or high sugar.' },
    it: { role: 'Abbinamento finale per mezzi calici, dolcezza equilibrata e ricordo.', cue: 'Eguaglia o supera la dolcezza del dessert mantenendo acidita.', avoid: 'Non usare vini secchi con cioccolato o zucchero alto.' },
    fr: { role: 'Accord de fin pour demi-verres, douceur equilibree et souvenir final.', cue: 'Egaler ou depasser le sucre du dessert en gardant acidite.', avoid: 'Ne pas mettre des vins secs face au chocolat ou sucre eleve.' },
    de: { role: 'Abschluss-Pairing fur kleine Glaser, balancierte Susse und Erinnerung.', cue: 'Dessertsusse erreichen oder ubertreffen und Saure behalten.', avoid: 'Trockene Weine nicht gegen Schokolade oder hohen Zucker stellen.' },
    pt: { role: 'Harmonizacao final para meios copos, docura equilibrada e memoria.', cue: 'Iguale ou supere a docura da sobremesa mantendo acidez.', avoid: 'Nao usar vinhos secos contra chocolate ou acucar alto.' },
  },
  aperitifPairing: {
    es: { role: 'Maridaje de apertura para acelerar decision, copa y primer upsell.', cue: 'Busca sal, acidez, burbuja o amargor fino segun aperitivo.', avoid: 'No empezar la mesa con un vino pesado si el plato es ligero.' },
    en: { role: 'Opening pairing for faster decision, first glass and first upsell.', cue: 'Look for salt, acidity, bubbles or fine bitterness depending on the snack.', avoid: 'Do not open the table with a heavy wine if the dish is light.' },
    it: { role: 'Abbinamento di apertura per decisione rapida, primo calice e upsell.', cue: 'Cerca sale, acidita, bollicina o amaro fine secondo aperitivo.', avoid: 'Non aprire con vino pesante se il piatto e leggero.' },
    fr: { role: 'Accord d ouverture pour decision rapide, premier verre et montee en gamme.', cue: 'Cherchez sel, acidite, bulle ou amertume fine selon aperitif.', avoid: 'Ne pas ouvrir avec un vin lourd si le plat est leger.' },
    de: { role: 'Start-Pairing fur schnelle Entscheidung, erstes Glas und ersten Upsell.', cue: 'Salz, Saure, Perlage oder feine Bitterkeit je nach Snack suchen.', avoid: 'Nicht mit schwerem Wein starten, wenn das Gericht leicht ist.' },
    pt: { role: 'Harmonizacao de abertura para decisao rapida, primeiro copo e upsell.', cue: 'Procure sal, acidez, bolha ou amargor fino conforme aperitivo.', avoid: 'Nao abrir com vinho pesado se o prato e leve.' },
  },
};

function buildExpandedProfile(seed: WineLibraryExpansionSeed): WineLibraryPriorityProfile {
  const copy = WINE_LIBRARY_EXPANSION_TEXT[seed.template];
  return {
    serviceTemp: seed.serviceTemp,
    glass: seed.glass,
    role: Object.fromEntries(WINE_LIBRARY_LANGS.map((lang) => [lang, copy[lang].role])) as Record<WineLibraryLang, string>,
    cue: Object.fromEntries(WINE_LIBRARY_LANGS.map((lang) => [lang, copy[lang].cue])) as Record<WineLibraryLang, string>,
    avoid: Object.fromEntries(WINE_LIBRARY_LANGS.map((lang) => [lang, copy[lang].avoid])) as Record<WineLibraryLang, string>,
    hooks: seed.hooks,
  };
}

function expandedProfileEntry(
  slug: string,
  serviceTemp: string,
  glass: string,
  template: WineLibraryExpansionTemplate,
  hookSet: Record<WineLibraryLang, string[]>,
): [string, WineLibraryPriorityProfile] {
  return [slug, buildExpandedProfile({ slug, serviceTemp, glass, template, hooks: hookSet })];
}

const hooks = {
  redMeat: {
    es: ['carnes rojas', 'cordero', 'quesos curados'],
    en: ['red meat', 'lamb', 'aged cheese'],
    it: ['carni rosse', 'agnello', 'formaggi stagionati'],
    fr: ['viandes rouges', 'agneau', 'fromages affines'],
    de: ['rotes Fleisch', 'Lamm', 'gereifter Kase'],
    pt: ['carnes vermelhas', 'borrego', 'queijos curados'],
  },
  seafood: {
    es: ['ostras', 'pescado blanco', 'marisco'],
    en: ['oysters', 'white fish', 'shellfish'],
    it: ['ostriche', 'pesce bianco', 'frutti di mare'],
    fr: ['huitres', 'poisson blanc', 'fruits de mer'],
    de: ['Austern', 'weisser Fisch', 'Meeresfruchte'],
    pt: ['ostras', 'peixe branco', 'marisco'],
  },
  vegetable: {
    es: ['verduras', 'setas', 'arroces'],
    en: ['vegetables', 'mushrooms', 'rice dishes'],
    it: ['verdure', 'funghi', 'risotti'],
    fr: ['legumes', 'champignons', 'riz'],
    de: ['Gemuse', 'Pilze', 'Reisgerichte'],
    pt: ['legumes', 'cogumelos', 'arrozes'],
  },
  aperitif: {
    es: ['aperitivo', 'tapas', 'frituras'],
    en: ['aperitif', 'tapas', 'fried dishes'],
    it: ['aperitivo', 'tapas', 'fritti'],
    fr: ['aperitif', 'tapas', 'fritures'],
    de: ['Aperitif', 'Tapas', 'Frittiertes'],
    pt: ['aperitivo', 'tapas', 'fritos'],
  },
  dessert: {
    es: ['chocolate', 'quesos azules', 'postres'],
    en: ['chocolate', 'blue cheese', 'desserts'],
    it: ['cioccolato', 'formaggi erborinati', 'dessert'],
    fr: ['chocolat', 'fromages bleus', 'desserts'],
    de: ['Schokolade', 'Blauschimmelkase', 'Desserts'],
    pt: ['chocolate', 'queijos azuis', 'sobremesas'],
  },
} satisfies Record<string, Record<WineLibraryLang, string[]>>;

const WINE_LIBRARY_EXPANDED_GRAPES: Record<string, WineLibraryPriorityProfile> = Object.fromEntries([
  expandedProfileEntry('mencia', '14-16 C', 'Borgona / universal', 'elegantRed', hooks.vegetable),
  expandedProfileEntry('cabernet-franc', '15-17 C', 'Burdeos / universal amplia', 'elegantRed', hooks.redMeat),
  expandedProfileEntry('gamay', '12-14 C', 'Borgona / universal', 'elegantRed', hooks.aperitif),
  expandedProfileEntry('gewurztraminer', '7-9 C', 'Blanco aromatico', 'aromaticWhite', hooks.dessert),
  expandedProfileEntry('viognier', '9-11 C', 'Blanco con volumen', 'aromaticWhite', hooks.seafood),
  expandedProfileEntry('gruner-veltliner', '7-9 C', 'Blanco aromatico / universal', 'freshWhite', hooks.vegetable),
  expandedProfileEntry('pinot-grigio', '7-9 C', 'Blanco joven / universal', 'freshWhite', hooks.seafood),
  expandedProfileEntry('barbera', '14-16 C', 'Universal / Borgona', 'mediterraneanRed', hooks.vegetable),
  expandedProfileEntry('primitivo', '15-17 C', 'Burdeos / universal amplia', 'mediterraneanRed', hooks.redMeat),
  expandedProfileEntry('aglianico', '16-18 C', 'Burdeos amplia', 'structuredRed', hooks.redMeat),
  expandedProfileEntry('graciano', '15-17 C', 'Rioja / Burdeos amplia', 'elegantRed', hooks.redMeat),
  expandedProfileEntry('muscadet', '7-9 C', 'Blanco joven / universal', 'freshWhite', hooks.seafood),
  expandedProfileEntry('semillon', '8-11 C', 'Blanco con volumen / universal amplia', 'mineralWhite', hooks.seafood),
  expandedProfileEntry('assyrtiko', '8-10 C', 'Blanco mineral / universal', 'mineralWhite', hooks.seafood),
  expandedProfileEntry('vermentino', '8-10 C', 'Blanco mediterraneo / universal', 'freshWhite', hooks.seafood),
  expandedProfileEntry('carmenere', '15-17 C', 'Burdeos / universal amplia', 'mediterraneanRed', hooks.redMeat),
  expandedProfileEntry('tannat', '16-18 C', 'Burdeos amplia', 'structuredRed', hooks.redMeat),
  expandedProfileEntry('petit-verdot', '16-18 C', 'Burdeos amplia', 'structuredRed', hooks.redMeat),
  expandedProfileEntry('torrontes', '7-9 C', 'Blanco aromatico', 'aromaticWhite', hooks.aperitif),
  expandedProfileEntry('corvina', '15-17 C', 'Borgona / universal amplia', 'structuredRed', hooks.redMeat),
]);

const WINE_LIBRARY_EXPANDED_REGIONS: Record<string, WineLibraryPriorityProfile> = Object.fromEntries([
  expandedProfileEntry('toscana', '16-18 C', 'Burdeos / universal amplia', 'structuredRed', hooks.redMeat),
  expandedProfileEntry('napa-valley', '16-18 C', 'Burdeos amplia', 'structuredRed', hooks.redMeat),
  expandedProfileEntry('jerez', '7-13 C', 'Copa pequena / blanco', 'fortified', hooks.aperitif),
  expandedProfileEntry('vallee-du-rhone', '15-18 C', 'Burdeos / Syrah', 'mediterraneanRed', hooks.redMeat),
  expandedProfileEntry('piemonte', '15-18 C', 'Borgona amplia', 'elegantRed', hooks.redMeat),
  expandedProfileEntry('barossa-valley', '16-18 C', 'Syrah / Burdeos amplia', 'structuredRed', hooks.redMeat),
  expandedProfileEntry('marlborough', '7-9 C', 'Blanco aromatico', 'aromaticWhite', hooks.seafood),
  expandedProfileEntry('mendoza', '16-18 C', 'Burdeos amplia', 'structuredRed', hooks.redMeat),
  expandedProfileEntry('mosel', '7-10 C', 'Blanco aromatico', 'aromaticWhite', hooks.seafood),
  expandedProfileEntry('willamette-valley', '13-15 C', 'Borgona amplia', 'elegantRed', hooks.vegetable),
  expandedProfileEntry('sancerre', '8-10 C', 'Blanco aromatico / universal', 'mineralWhite', hooks.seafood),
  expandedProfileEntry('barolo', '16-18 C', 'Borgona / Nebbiolo', 'structuredRed', hooks.redMeat),
  expandedProfileEntry('ribeira-sacra', '13-15 C', 'Borgona / universal', 'elegantRed', hooks.vegetable),
  expandedProfileEntry('bierzo', '14-16 C', 'Borgona / universal', 'elegantRed', hooks.vegetable),
  expandedProfileEntry('toro', '16-18 C', 'Burdeos amplia', 'structuredRed', hooks.redMeat),
  expandedProfileEntry('chablis', '8-10 C', 'Blanco mineral / universal', 'mineralWhite', hooks.seafood),
  expandedProfileEntry('alsacia', '7-10 C', 'Blanco aromatico', 'aromaticWhite', hooks.seafood),
  expandedProfileEntry('provence', '8-10 C', 'Universal / blanco', 'aromaticWhite', hooks.aperitif),
  expandedProfileEntry('santorini', '8-10 C', 'Blanco mineral / universal', 'mineralWhite', hooks.seafood),
  expandedProfileEntry('valpolicella', '14-16 C', 'Borgona / universal', 'elegantRed', hooks.vegetable),
  expandedProfileEntry('chianti-classico', '15-17 C', 'Burdeos / universal', 'structuredRed', hooks.redMeat),
  expandedProfileEntry('brunello-di-montalcino', '16-18 C', 'Burdeos amplia / Borgona amplia', 'structuredRed', hooks.redMeat),
  expandedProfileEntry('soave', '8-10 C', 'Blanco mineral / universal', 'mineralWhite', hooks.seafood),
  expandedProfileEntry('etna', '13-15 C', 'Borgona / universal', 'elegantRed', hooks.vegetable),
]);

const WINE_LIBRARY_EXPANDED_STYLES: Record<string, WineLibraryPriorityProfile> = Object.fromEntries([
  expandedProfileEntry('tinto-joven', '13-15 C', 'Universal', 'elegantRed', hooks.aperitif),
  expandedProfileEntry('tinto-ligero', '13-15 C', 'Borgona / universal', 'elegantRed', hooks.vegetable),
  expandedProfileEntry('tinto-cuerpo', '16-18 C', 'Burdeos amplia', 'structuredRed', hooks.redMeat),
  expandedProfileEntry('blanco-joven', '7-9 C', 'Blanco joven', 'freshWhite', hooks.seafood),
  expandedProfileEntry('blanco-mineral', '8-11 C', 'Blanco universal', 'mineralWhite', hooks.seafood),
  expandedProfileEntry('champagne', '6-8 C', 'Tulipa / blanco', 'sparkling', hooks.seafood),
  expandedProfileEntry('cava', '6-8 C', 'Tulipa / blanco', 'sparkling', hooks.aperitif),
  expandedProfileEntry('fino-manzanilla', '7-9 C', 'Copa pequena / blanco', 'fortified', hooks.aperitif),
  expandedProfileEntry('pedro-ximenez', '10-12 C', 'Copa pequena', 'fortified', hooks.dessert),
  expandedProfileEntry('orange-maceracion-corta', '10-12 C', 'Universal', 'mediterraneanRed', hooks.vegetable),
  expandedProfileEntry('prosecco', '6-8 C', 'Tulipa / blanco', 'sparkling', hooks.aperitif),
  expandedProfileEntry('cremant', '6-8 C', 'Tulipa / blanco', 'sparkling', hooks.aperitif),
  expandedProfileEntry('franciacorta', '6-8 C', 'Tulipa / blanco', 'sparkling', hooks.seafood),
  expandedProfileEntry('pet-nat', '6-8 C', 'Tulipa / universal', 'sparkling', hooks.aperitif),
  expandedProfileEntry('amontillado', '10-12 C', 'Copa pequena / blanco', 'fortified', hooks.aperitif),
  expandedProfileEntry('oloroso', '12-14 C', 'Copa pequena', 'fortified', hooks.aperitif),
  expandedProfileEntry('palo-cortado', '11-13 C', 'Copa pequena', 'fortified', hooks.aperitif),
  expandedProfileEntry('oporto-tawny', '12-14 C', 'Copa pequena', 'fortified', hooks.dessert),
  expandedProfileEntry('madeira', '12-14 C', 'Copa pequena', 'fortified', hooks.dessert),
  expandedProfileEntry('blanco-fermentado-barrica', '10-12 C', 'Blanco grande / universal', 'mineralWhite', hooks.seafood),
]);

const WINE_LIBRARY_EXPANDED_PAIRINGS: Record<string, WineLibraryPriorityProfile> = Object.fromEntries([
  expandedProfileEntry('aves-y-caza', 'Copa: Pinot Noir, Chardonnay o Garnacha fina', 'Ruta: blanco con cuerpo -> tinto elegante', 'foodPairing', hooks.redMeat),
  expandedProfileEntry('verduras-y-cocina-vegetariana', 'Copa: Verdejo serio, Gruner Veltliner o rosado', 'Ruta: fresco -> mineral -> textura', 'foodPairing', hooks.vegetable),
  expandedProfileEntry('postres-y-chocolate', 'Copa: PX, Oporto Tawny o Moscatel', 'Ruta: dulzor -> acidez -> final', 'dessertPairing', hooks.dessert),
  expandedProfileEntry('tapas-y-aperitivos', 'Copa: Cava, Fino, Verdejo o rosado', 'Ruta: aperitivo -> sal -> frescura', 'aperitifPairing', hooks.aperitif),
  expandedProfileEntry('solomillo-de-ternera', 'Copa: Rioja reserva, Cabernet o Pinot potente', 'Ruta: tinto elegante -> reserva', 'foodPairing', hooks.redMeat),
  expandedProfileEntry('cordero-asado', 'Copa: Rioja, Ribera o Garnacha vieja', 'Ruta: crianza -> reserva -> origen', 'foodPairing', hooks.redMeat),
  expandedProfileEntry('pato-confitado', 'Copa: Pinot Noir, Nebbiolo o Garnacha', 'Ruta: acidez -> fruta -> especia', 'foodPairing', hooks.vegetable),
  expandedProfileEntry('atun-rojo', 'Copa: Pinot Noir, rosado o blanco con lias', 'Ruta: mar -> umami -> textura', 'foodPairing', hooks.seafood),
  expandedProfileEntry('pulpo-gallego', 'Copa: Godello, Albarino, Mencia o espumoso', 'Ruta: sal -> pimenton -> frescura', 'foodPairing', hooks.seafood),
  expandedProfileEntry('risotto-setas', 'Copa: Pinot Noir, Nebbiolo o blanco con lias', 'Ruta: tierra -> textura -> acidez', 'foodPairing', hooks.vegetable),
  expandedProfileEntry('ostras', 'Copa: Champagne, Cava o Muscadet', 'Ruta: salinidad -> burbuja -> premium', 'aperitifPairing', hooks.seafood),
  expandedProfileEntry('chocolate-negro', 'Copa: PX, Oporto o Banyuls', 'Ruta: cacao -> dulzor -> amargor', 'dessertPairing', hooks.dessert),
  expandedProfileEntry('ceviche', 'Copa: Albarino, Sauvignon Blanc o Riesling seco', 'Ruta: acidez -> sal -> frescura', 'foodPairing', hooks.seafood),
  expandedProfileEntry('queso-azul', 'Copa: PX, Oporto Tawny o Sauternes', 'Ruta: sal -> dulzor -> cierre', 'dessertPairing', hooks.dessert),
  expandedProfileEntry('queso-de-cabra', 'Copa: Sancerre, Sauvignon Blanc o Verdejo', 'Ruta: acidez -> hierbas -> frescura', 'aperitifPairing', hooks.aperitif),
  expandedProfileEntry('jamon-iberico', 'Copa: Fino, Cava brut nature o Champagne', 'Ruta: sal -> grasa -> burbuja', 'aperitifPairing', hooks.aperitif),
  expandedProfileEntry('paella', 'Copa: Rosado, Albarino, Godello o Cava', 'Ruta: arroz -> socarrat -> frescura', 'foodPairing', hooks.seafood),
  expandedProfileEntry('curry', 'Copa: Riesling, Gewurztraminer o Gruner Veltliner', 'Ruta: especia -> dulzor -> acidez', 'foodPairing', hooks.vegetable),
  expandedProfileEntry('ramen', 'Copa: Riesling, Albarino o Pinot Noir ligero', 'Ruta: caldo -> umami -> acidez', 'foodPairing', hooks.vegetable),
  expandedProfileEntry('thai-curry', 'Copa: Gewurztraminer, Riesling o Sauvignon Blanc', 'Ruta: coco -> picante -> aroma', 'foodPairing', hooks.vegetable),
  expandedProfileEntry('setas-y-trufas', 'Copa: Pinot Noir, Nebbiolo o Chardonnay con lias', 'Ruta: tierra -> textura -> premium', 'foodPairing', hooks.vegetable),
  expandedProfileEntry('cochinillo-lechon', 'Copa: Rioja, Ribera o Garnacha', 'Ruta: piel -> grasa -> acidez', 'foodPairing', hooks.redMeat),
  expandedProfileEntry('queso-manchego', 'Copa: Fino, Cava, Rioja crianza o Garnacha', 'Ruta: sal -> curacion -> tinto suave', 'aperitifPairing', hooks.aperitif),
  expandedProfileEntry('tarta-de-queso', 'Copa: Moscatel, Sauternes o espumoso demi-sec', 'Ruta: crema -> dulzor -> acidez', 'dessertPairing', hooks.dessert),
]);

const WINE_LIBRARY_EDITORIAL_COPY: Record<WineLibraryLang, {
  role: string;
  service: string;
  cue: string;
  menu: string;
  avoid: string;
  faqService: (subject: string, temp: string) => { q: string; a: string };
  faqList: (subject: string) => { q: string; a: string };
}> = {
  es: {
    role: 'Rol en carta',
    service: 'Servicio recomendado',
    cue: 'Cómo venderlo en sala',
    menu: 'Maridajes útiles',
    avoid: 'Error a evitar',
    faqService: (subject, temp) => ({ q: `¿A qué temperatura servir ${subject}?`, a: `${subject} funciona como punto de partida a ${temp}. Ajusta según cuerpo, crianza y contexto de sala.` }),
    faqList: (subject) => ({ q: `¿Cómo incluir ${subject} en una carta de restaurante?`, a: `Inclúyelo con una pista clara de estilo, plato y ocasión. Así ayuda al equipo de sala a vender, no solo a listar una referencia.` }),
  },
  en: {
    role: 'Role on the wine list',
    service: 'Recommended service',
    cue: 'How to sell it on the floor',
    menu: 'Useful pairings',
    avoid: 'Mistake to avoid',
    faqService: (subject, temp) => ({ q: `What temperature works for ${subject}?`, a: `${subject} works as a starting point at ${temp}. Adjust by body, ageing and service context.` }),
    faqList: (subject) => ({ q: `How should a restaurant include ${subject}?`, a: `Include it with a clear cue for style, dish and occasion. That helps the floor team sell it, not just list it.` }),
  },
  it: {
    role: 'Ruolo in carta',
    service: 'Servizio consigliato',
    cue: 'Come venderlo in sala',
    menu: 'Abbinamenti utili',
    avoid: 'Errore da evitare',
    faqService: (subject, temp) => ({ q: `A che temperatura servire ${subject}?`, a: `${subject} funziona come punto di partenza a ${temp}. Regola in base a corpo, affinamento e contesto di servizio.` }),
    faqList: (subject) => ({ q: `Come includere ${subject} in una carta ristorante?`, a: `Inseriscilo con un'indicazione chiara di stile, piatto e occasione. Cosi aiuta la sala a vendere, non solo a listare una referenza.` }),
  },
  fr: {
    role: 'Role en carte',
    service: 'Service recommande',
    cue: 'Comment le vendre en salle',
    menu: 'Accords utiles',
    avoid: 'Erreur a eviter',
    faqService: (subject, temp) => ({ q: `A quelle temperature servir ${subject} ?`, a: `${subject} fonctionne comme point de depart a ${temp}. Ajustez selon le corps, l'elevage et le contexte de service.` }),
    faqList: (subject) => ({ q: `Comment inclure ${subject} dans une carte de restaurant ?`, a: `Ajoutez un repere clair de style, de plat et d'occasion. La carte aide ainsi l'equipe a vendre, pas seulement a lister une reference.` }),
  },
  de: {
    role: 'Rolle auf der Weinkarte',
    service: 'Empfohlener Service',
    cue: 'Wie der Service ihn verkauft',
    menu: 'Nutzliche Pairings',
    avoid: 'Fehler vermeiden',
    faqService: (subject, temp) => ({ q: `Bei welcher Temperatur ${subject} servieren?`, a: `${subject} funktioniert als Ausgangspunkt bei ${temp}. Je nach Korper, Ausbau und Servicekontext anpassen.` }),
    faqList: (subject) => ({ q: `Wie sollte ein Restaurant ${subject} aufnehmen?`, a: `Mit einem klaren Hinweis zu Stil, Gericht und Anlass. So hilft die Karte dem Team beim Verkaufen, nicht nur beim Auflisten.` }),
  },
  pt: {
    role: 'Papel na carta',
    service: 'Servico recomendado',
    cue: 'Como vender em sala',
    menu: 'Harmonizacoes uteis',
    avoid: 'Erro a evitar',
    faqService: (subject, temp) => ({ q: `A que temperatura servir ${subject}?`, a: `${subject} funciona como ponto de partida a ${temp}. Ajuste conforme corpo, estagio e contexto de sala.` }),
    faqList: (subject) => ({ q: `Como incluir ${subject} numa carta de restaurante?`, a: `Inclua com uma pista clara de estilo, prato e ocasiao. Assim ajuda a equipa a vender, nao apenas a listar uma referencia.` }),
  },
};

function wineLibraryPath(lang: WineLibraryLang, esPath: string): string {
  const config = WINE_LIBRARY_PATH_CONFIG[lang];
  if (lang === 'es') return esPath;
  if (esPath === '/biblioteca-vino') return config.base;

  const match = esPath.match(/^\/biblioteca-vino\/([^/]+)(.*)$/);
  if (!match) return esPath;
  const [, section, rest] = match;
  return `${config.base}/${config.sections[section] || section}${rest}`;
}

function wineLibraryHreflang(esPath: string): HreflangEntry[] {
  return [
    ...WINE_LIBRARY_LANGS.map((lang) => ({ lang, url: `${SITE}${wineLibraryPath(lang, esPath)}` })),
    { lang: 'x-default', url: `${SITE}${wineLibraryPath('es', esPath)}` },
  ];
}

type WineLibraryLocalizedText = Partial<Record<WineLibraryLang, string>> & { es: string; en: string };

interface WineLibraryHubRouteGroup {
  title: WineLibraryLocalizedText;
  description: WineLibraryLocalizedText;
  links: { label: string; esPath: string }[];
}

const hubText = (copy: WineLibraryLocalizedText, lang: WineLibraryLang): string =>
  copy[lang] || copy.en || copy.es;

const WINE_LIBRARY_STRATEGIC_LABELS: Record<string, Partial<Record<WineLibraryLang, string>>> = {
  Albarino: { es: 'Albariño', en: 'Albariño', it: 'Albariño', fr: 'Albariño', de: 'Albariño', pt: 'Alvarinho' },
  Arroces: { en: 'Rice dishes', it: 'Risotti e risi', fr: 'Riz et plats mijotes', de: 'Reisgerichte', pt: 'Arrozes' },
  'Aves y caza': { en: 'Poultry and game', it: 'Pollame e selvaggina', fr: 'Volailles et gibier', de: 'Gefluegel und Wild', pt: 'Aves e caca' },
  'Blanco con lias': { es: 'Blanco con lías', en: 'Lees-aged white', it: 'Bianco sui lieviti', fr: 'Blanc sur lies', de: 'Weißwein auf der Hefe', pt: 'Branco com borras' },
  'Blanco joven': { en: 'Young white', it: 'Bianco giovane', fr: 'Blanc jeune', de: 'Junger Weißwein', pt: 'Branco jovem' },
  'Blanco mineral': { en: 'Mineral white', it: 'Bianco minerale', fr: 'Blanc mineral', de: 'Mineralischer Weißwein', pt: 'Branco mineral' },
  Borgona: { en: 'Burgundy', it: 'Borgogna', fr: 'Bourgogne', de: 'Burgund', pt: 'Borgonha' },
  Burdeos: { en: 'Bordeaux', it: 'Bordeaux', fr: 'Bordeaux', de: 'Bordeaux', pt: 'Bordéus' },
  'Carnes rojas': { en: 'Red meat', it: 'Carni rosse', fr: 'Viandes rouges', de: 'Rotes Fleisch', pt: 'Carnes vermelhas' },
  'Cocina asiatica': { es: 'Cocina asiática', en: 'Asian cuisine', it: 'Cucina asiatica', fr: 'Cuisine asiatique', de: 'Asiatische Kueche', pt: 'Cozinha asiatica' },
  'Cordero asado': { en: 'Roast lamb', it: 'Agnello arrosto', fr: 'Agneau roti', de: 'Lammbraten', pt: 'Borrego assado' },
  Espumoso: { en: 'Sparkling wine', it: 'Spumante', fr: 'Effervescent', de: 'Schaumwein', pt: 'Espumante' },
  'Espumoso metodo tradicional': { es: 'Espumoso método tradicional', en: 'Traditional-method sparkling', it: 'Metodo classico', fr: 'Effervescent methode traditionnelle', de: 'Traditionelle Flaschengärung', pt: 'Espumante metodo tradicional' },
  'Lubina y dorada': { en: 'Sea bass and sea bream', it: 'Branzino e orata', fr: 'Bar et dorade', de: 'Wolfsbarsch und Dorade', pt: 'Robalo e dourada' },
  Marisco: { en: 'Seafood', it: 'Frutti di mare', fr: 'Fruits de mer', de: 'Meeresfruechte', pt: 'Marisco' },
  Mencia: { es: 'Mencía', en: 'Mencía', it: 'Mencía', fr: 'Mencía', de: 'Mencía', pt: 'Mencía' },
  Ostras: { en: 'Oysters', it: 'Ostriche', fr: 'Huîtres', de: 'Austern', pt: 'Ostras' },
  'Pato confitado': { en: 'Duck confit', it: 'Anatra confit', fr: 'Canard confit', de: 'Confit de canard', pt: 'Pato confitado' },
  'Pescado blanco': { en: 'White fish', it: 'Pesce bianco', fr: 'Poisson blanc', de: 'Weißfisch', pt: 'Peixe branco' },
  'Pescados y mariscos': { en: 'Fish and seafood', it: 'Pesce e frutti di mare', fr: 'Poissons et fruits de mer', de: 'Fisch und Meeresfrüchte', pt: 'Peixes e mariscos' },
  'Postres y chocolate': { en: 'Desserts and chocolate', it: 'Dessert e cioccolato', fr: 'Desserts et chocolat', de: 'Desserts und Schokolade', pt: 'Sobremesas e chocolate' },
  Quesos: { en: 'Cheese', it: 'Formaggi', fr: 'Fromages', de: 'Käse', pt: 'Queijos' },
  'Queso azul': { en: 'Blue cheese', it: 'Formaggio erborinato', fr: 'Fromage bleu', de: 'Blauschimmelkaese', pt: 'Queijo azul' },
  'Queso de cabra': { en: 'Goat cheese', it: 'Formaggio di capra', fr: 'Fromage de chevre', de: 'Ziegenkaese', pt: 'Queijo de cabra' },
  'Rias Baixas': { es: 'Rías Baixas', en: 'Rías Baixas', it: 'Rías Baixas', fr: 'Rías Baixas', de: 'Rías Baixas', pt: 'Rías Baixas' },
  'Ribera del Duero': { en: 'Ribera del Duero', it: 'Ribera del Duero', fr: 'Ribera del Duero', de: 'Ribera del Duero', pt: 'Ribera del Duero' },
  'Risotto de setas': { en: 'Mushroom risotto', it: 'Risotto ai funghi', fr: 'Risotto aux champignons', de: 'Pilzrisotto', pt: 'Risotto de cogumelos' },
  'Rosado gastronomico': { es: 'Rosado gastronómico', en: 'Gastronomic rose', it: 'Rosato gastronomico', fr: 'Rose gastronomique', de: 'Gastronomischer Rose', pt: 'Rosado gastronomico' },
  'Solomillo de ternera': { en: 'Beef tenderloin', it: 'Filetto di manzo', fr: 'Filet de boeuf', de: 'Rinderfilet', pt: 'Lombo de vitela' },
  'Tapas y aperitivos': { en: 'Tapas and appetizers', it: 'Tapas e antipasti', fr: 'Tapas et aperitifs', de: 'Tapas und Aperitifs', pt: 'Tapas e aperitivos' },
  'Tinto con cuerpo': { en: 'Full-bodied red', it: 'Rosso corposo', fr: 'Rouge corse', de: 'Kraeftiger Rotwein', pt: 'Tinto encorpado' },
  'Tinto crianza': { en: 'Crianza red', it: 'Rosso crianza', fr: 'Rouge crianza', de: 'Crianza-Rotwein', pt: 'Tinto crianza' },
  'Tinto ligero': { en: 'Light red', it: 'Rosso leggero', fr: 'Rouge leger', de: 'Leichter Rotwein', pt: 'Tinto leve' },
  'Tinto reserva': { en: 'Reserva red', it: 'Rosso reserva', fr: 'Rouge reserva', de: 'Reserva-Rotwein', pt: 'Tinto reserva' },
  'Verduras y cocina vegetariana': { en: 'Vegetables and vegetarian cuisine', it: 'Verdure e cucina vegetariana', fr: 'Legumes et cuisine vegetarienne', de: 'Gemuese und vegetarische Kueche', pt: 'Legumes e cozinha vegetariana' },
  'Xarel-lo': { es: 'Xarel·lo', en: 'Xarel·lo', it: 'Xarel·lo', fr: 'Xarel·lo', de: 'Xarel·lo', pt: 'Xarel·lo' },
};

const wineLibraryStrategicLabel = (label: string, lang: WineLibraryLang): string =>
  WINE_LIBRARY_STRATEGIC_LABELS[label]?.[lang] || label;

const WINE_LIBRARY_HUB_ROUTE_GROUPS: Record<string, WineLibraryHubRouteGroup[]> = {
  '/biblioteca-vino': [
    {
      title: { es: 'Rutas estrategicas para explorar la biblioteca', en: 'Strategic routes through the library', it: 'Percorsi strategici nella biblioteca', fr: 'Parcours strategiques dans la bibliotheque', de: 'Strategische Wege durch die Bibliothek', pt: 'Percursos estrategicos na biblioteca' },
      description: { es: 'Accesos directos que conectan uvas, regiones, estilos y maridajes con alta intencion de busqueda y uso real en carta.', en: 'Short paths that connect grapes, regions, styles and pairings with strong search intent and real wine-list use.', it: 'Accessi rapidi che collegano vitigni, regioni, stili e abbinamenti con forte intento di ricerca e uso reale in carta.', fr: 'Acces courts reliant cepages, regions, styles et accords a forte intention de recherche et usage reel en carte.', de: 'Kurze Wege, die Rebsorten, Regionen, Stile und Pairings mit hoher Suchintention und echtem Einsatz auf der Karte verbinden.', pt: 'Acessos diretos que ligam castas, regioes, estilos e harmonizacoes com forte intencao de pesquisa e uso real na carta.' },
      links: [
        { label: 'Tempranillo', esPath: '/biblioteca-vino/uvas/tempranillo' },
        { label: 'Rioja', esPath: '/biblioteca-vino/regiones/espana/rioja' },
        { label: 'Ribera del Duero', esPath: '/biblioteca-vino/regiones/espana/ribera-del-duero' },
        { label: 'Tinto crianza', esPath: '/biblioteca-vino/estilos/tinto-crianza' },
        { label: 'Albarino', esPath: '/biblioteca-vino/uvas/albarino' },
        { label: 'Rias Baixas', esPath: '/biblioteca-vino/regiones/espana/rias-baixas' },
        { label: 'Godello', esPath: '/biblioteca-vino/uvas/godello' },
        { label: 'Ostras', esPath: '/biblioteca-vino/maridajes/ostras' },
        { label: 'Champagne', esPath: '/biblioteca-vino/regiones/francia/champagne' },
        { label: 'Espumoso', esPath: '/biblioteca-vino/estilos/espumoso' },
      ],
    },
  ],
  '/biblioteca-vino/uvas': [
    {
      title: { es: 'Rutas de uvas con mayor valor para carta', en: 'Grape routes with the highest wine-list value', it: 'Percorsi di vitigni con maggiore valore in carta', fr: 'Parcours de cepages a forte valeur en carte', de: 'Rebsortenwege mit hohem Wert fuer die Weinkarte', pt: 'Rotas de castas com maior valor para a carta' },
      description: { es: 'Conecta variedades reconocibles y diferenciales con regiones, estilos y maridajes que activan la decision del comensal.', en: 'Connect recognizable and distinctive varieties with regions, styles and pairings that drive guest decisions.', it: 'Collega varieta riconoscibili e distintive a regioni, stili e abbinamenti che guidano la scelta del cliente.', fr: 'Reliez les cepages connus et differentiants aux regions, styles et accords qui declenchent la decision du client.', de: 'Verbindet bekannte und differenzierende Rebsorten mit Regionen, Stilen und Pairings, die Gaesteentscheidungen ausloesen.', pt: 'Liga castas reconheciveis e diferenciais a regioes, estilos e harmonizacoes que ajudam a decisao do cliente.' },
      links: [
        { label: 'Tempranillo', esPath: '/biblioteca-vino/uvas/tempranillo' },
        { label: 'Chardonnay', esPath: '/biblioteca-vino/uvas/chardonnay' },
        { label: 'Cabernet Sauvignon', esPath: '/biblioteca-vino/uvas/cabernet-sauvignon' },
        { label: 'Pinot Noir', esPath: '/biblioteca-vino/uvas/pinot-noir' },
        { label: 'Mencia', esPath: '/biblioteca-vino/uvas/mencia' },
        { label: 'Godello', esPath: '/biblioteca-vino/uvas/godello' },
        { label: 'Xarel-lo', esPath: '/biblioteca-vino/uvas/xarello' },
        { label: 'Touriga Nacional', esPath: '/biblioteca-vino/uvas/touriga-nacional' },
        { label: 'Sancerre', esPath: '/biblioteca-vino/regiones/francia/sancerre' },
        { label: 'Ostras', esPath: '/biblioteca-vino/maridajes/ostras' },
      ],
    },
  ],
  '/biblioteca-vino/regiones': [
    {
      title: { es: 'Regiones que ordenan la lectura de la carta', en: 'Regions that structure wine-list reading', it: 'Regioni che strutturano la lettura della carta', fr: 'Regions qui structurent la lecture de la carte', de: 'Regionen, die die Weinkarte strukturieren', pt: 'Regioes que estruturam a leitura da carta' },
      description: { es: 'Rutas desde denominaciones de referencia hacia uvas, estilos y maridajes utiles para servicio, compra y venta.', en: 'Routes from benchmark denominations into grapes, styles and pairings useful for service, purchasing and sales.', it: 'Percorsi da denominazioni di riferimento verso vitigni, stili e abbinamenti utili per servizio, acquisti e vendita.', fr: 'Parcours depuis les appellations de reference vers cepages, styles et accords utiles au service, aux achats et a la vente.', de: 'Wege von Referenzherkuenften zu Rebsorten, Stilen und Pairings fuer Service, Einkauf und Verkauf.', pt: 'Rotas desde denominacoes de referencia ate castas, estilos e harmonizacoes uteis para servico, compra e venda.' },
      links: [
        { label: 'Rioja', esPath: '/biblioteca-vino/regiones/espana/rioja' },
        { label: 'Ribera del Duero', esPath: '/biblioteca-vino/regiones/espana/ribera-del-duero' },
        { label: 'Rias Baixas', esPath: '/biblioteca-vino/regiones/espana/rias-baixas' },
        { label: 'Priorat', esPath: '/biblioteca-vino/regiones/espana/priorat' },
        { label: 'Bourgogne', esPath: '/biblioteca-vino/regiones/francia/bourgogne' },
        { label: 'Champagne', esPath: '/biblioteca-vino/regiones/francia/champagne' },
        { label: 'Sancerre', esPath: '/biblioteca-vino/regiones/francia/sancerre' },
        { label: 'Bordeaux', esPath: '/biblioteca-vino/regiones/francia/bordeaux' },
        { label: 'Douro', esPath: '/biblioteca-vino/regiones/portugal/douro' },
        { label: 'Touriga Nacional', esPath: '/biblioteca-vino/uvas/touriga-nacional' },
      ],
    },
  ],
  '/biblioteca-vino/estilos': [
    {
      title: { es: 'Estilos conectados con decision comercial', en: 'Styles connected to commercial decisions', it: 'Stili collegati alla decisione commerciale', fr: 'Styles lies a la decision commerciale', de: 'Stile mit kommerzieller Entscheidungskraft', pt: 'Estilos ligados a decisao comercial' },
      description: { es: 'Caminos desde el estilo hacia uvas, regiones y platos que facilitan explicar, vender y equilibrar una carta.', en: 'Paths from style into grapes, regions and dishes that make a list easier to explain, sell and balance.', it: 'Percorsi dallo stile verso vitigni, regioni e piatti che aiutano a spiegare, vendere ed equilibrare la carta.', fr: 'Chemins depuis le style vers cepages, regions et plats pour mieux expliquer, vendre et equilibrer une carte.', de: 'Wege vom Stil zu Rebsorten, Regionen und Gerichten, um eine Karte leichter zu erklaeren, zu verkaufen und auszubalancieren.', pt: 'Caminhos do estilo para castas, regioes e pratos que ajudam a explicar, vender e equilibrar uma carta.' },
      links: [
        { label: 'Tinto crianza', esPath: '/biblioteca-vino/estilos/tinto-crianza' },
        { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
        { label: 'Tempranillo', esPath: '/biblioteca-vino/uvas/tempranillo' },
        { label: 'Rioja', esPath: '/biblioteca-vino/regiones/espana/rioja' },
        { label: 'Blanco con lias', esPath: '/biblioteca-vino/estilos/blanco-crianza-lias' },
        { label: 'Chardonnay', esPath: '/biblioteca-vino/uvas/chardonnay' },
        { label: 'Espumoso', esPath: '/biblioteca-vino/estilos/espumoso' },
        { label: 'Cava', esPath: '/biblioteca-vino/estilos/cava' },
        { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
      ],
    },
  ],
  '/biblioteca-vino/maridajes': [
    {
      title: { es: 'Maridajes que abren rutas de venta', en: 'Pairings that open sales routes', it: 'Abbinamenti che aprono percorsi di vendita', fr: 'Accords qui ouvrent des chemins de vente', de: 'Pairings, die Verkaufswege oeffnen', pt: 'Harmonizacoes que abrem rotas de venda' },
      description: { es: 'Conecta platos de alta demanda con uvas, regiones y estilos que reducen friccion y elevan el ticket medio.', en: 'Connect high-demand dishes with grapes, regions and styles that reduce friction and lift average ticket.', it: 'Collega piatti ad alta domanda a vitigni, regioni e stili che riducono attrito e aumentano lo scontrino medio.', fr: 'Reliez les plats a forte demande aux cepages, regions et styles qui reduisent la friction et augmentent le ticket moyen.', de: 'Verbindet stark nachgefragte Gerichte mit Rebsorten, Regionen und Stilen, die Reibung senken und den Durchschnittsbon erhoehen.', pt: 'Liga pratos de alta procura a castas, regioes e estilos que reduzem friccao e aumentam o ticket medio.' },
      links: [
        { label: 'Ostras', esPath: '/biblioteca-vino/maridajes/ostras' },
        { label: 'Pescados y mariscos', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
        { label: 'Lubina y dorada', esPath: '/biblioteca-vino/maridajes/lubina-dorada' },
        { label: 'Albarino', esPath: '/biblioteca-vino/uvas/albarino' },
        { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
        { label: 'Tempranillo', esPath: '/biblioteca-vino/uvas/tempranillo' },
        { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
        { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
        { label: 'Champagne', esPath: '/biblioteca-vino/regiones/francia/champagne' },
      ],
    },
  ],
};

function wineLibraryHubRouteSections(lang: WineLibraryLang, esPath: string): { heading: string; content: string }[] {
  return (WINE_LIBRARY_HUB_ROUTE_GROUPS[esPath] || []).map((group) => ({
    heading: hubText(group.title, lang),
    content: `${hubText(group.description, lang)} ${group.links.map((link) => wineLibraryStrategicLabel(link.label, lang)).join(', ')}.`,
  }));
}

function wineLibraryHubRouteLinks(lang: WineLibraryLang, esPath: string): { label: string; url: string }[] {
  return (WINE_LIBRARY_HUB_ROUTE_GROUPS[esPath] || [])
    .flatMap((group) => group.links)
    .map((link) => ({
      label: wineLibraryStrategicLabel(link.label, lang),
      url: wineLibraryPath(lang, link.esPath),
    }));
}

function withWineLibraryHubRoutes(content: PageContent, lang: WineLibraryLang, esPath: string): PageContent {
  const routeSections = wineLibraryHubRouteSections(lang, esPath);
  const routeLinks = wineLibraryHubRouteLinks(lang, esPath);
  if (routeSections.length === 0 && routeLinks.length === 0) return content;

  const seen = new Set<string>();
  const internalLinks = [...routeLinks, ...content.internalLinks].filter((link) => {
    if (seen.has(link.url)) return false;
    seen.add(link.url);
    return true;
  });

  return {
    ...content,
    sections: [...content.sections, ...routeSections],
    internalLinks,
  };
}

const WINE_LIBRARY_STRATEGIC_LINKS: Record<string, { label: string; esPath: string }[]> = {
  '/biblioteca-vino/uvas/tempranillo': [
    { label: 'Rioja', esPath: '/biblioteca-vino/regiones/espana/rioja' },
    { label: 'Ribera del Duero', esPath: '/biblioteca-vino/regiones/espana/ribera-del-duero' },
    { label: 'Tinto crianza', esPath: '/biblioteca-vino/estilos/tinto-crianza' },
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
  ],
  '/biblioteca-vino/uvas/garnacha': [
    { label: 'Priorat', esPath: '/biblioteca-vino/regiones/espana/priorat' },
    { label: 'Rioja', esPath: '/biblioteca-vino/regiones/espana/rioja' },
    { label: 'Rosado gastronomico', esPath: '/biblioteca-vino/estilos/rosado-cuerpo' },
    { label: 'Tinto crianza', esPath: '/biblioteca-vino/estilos/tinto-crianza' },
    { label: 'Arroces', esPath: '/biblioteca-vino/maridajes/pasta-arroces-y-legumbres' },
  ],
  '/biblioteca-vino/uvas/albarino': [
    { label: 'Rias Baixas', esPath: '/biblioteca-vino/regiones/espana/rias-baixas' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
    { label: 'Pescado blanco', esPath: '/biblioteca-vino/maridajes/lubina-dorada' },
    { label: 'Cocina asiatica', esPath: '/biblioteca-vino/maridajes/cocina-asiatica-y-fusion' },
    { label: 'Blanco con lias', esPath: '/biblioteca-vino/estilos/blanco-crianza-lias' },
  ],
  '/biblioteca-vino/uvas/verdejo': [
    { label: 'Rueda', esPath: '/biblioteca-vino/regiones/espana/rueda' },
    { label: 'Pescado blanco', esPath: '/biblioteca-vino/maridajes/lubina-dorada' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
    { label: 'Arroces', esPath: '/biblioteca-vino/maridajes/pasta-arroces-y-legumbres' },
  ],
  '/biblioteca-vino/uvas/godello': [
    { label: 'Blanco con lias', esPath: '/biblioteca-vino/estilos/blanco-crianza-lias' },
    { label: 'Pescado blanco', esPath: '/biblioteca-vino/maridajes/lubina-dorada' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/uvas/chardonnay': [
    { label: 'Borgona', esPath: '/biblioteca-vino/regiones/francia/bourgogne' },
    { label: 'Champagne', esPath: '/biblioteca-vino/regiones/francia/champagne' },
    { label: 'Blanco con lias', esPath: '/biblioteca-vino/estilos/blanco-crianza-lias' },
    { label: 'Espumoso metodo tradicional', esPath: '/biblioteca-vino/estilos/espumoso' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/uvas/cabernet-sauvignon': [
    { label: 'Burdeos', esPath: '/biblioteca-vino/regiones/francia/bordeaux' },
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/uvas/pinot-noir': [
    { label: 'Borgona', esPath: '/biblioteca-vino/regiones/francia/bourgogne' },
    { label: 'Champagne', esPath: '/biblioteca-vino/regiones/francia/champagne' },
    { label: 'Rosado gastronomico', esPath: '/biblioteca-vino/estilos/rosado-cuerpo' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/uvas/sauvignon-blanc': [
    { label: 'Pescado blanco', esPath: '/biblioteca-vino/maridajes/lubina-dorada' },
    { label: 'Cocina asiatica', esPath: '/biblioteca-vino/maridajes/cocina-asiatica-y-fusion' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/uvas/riesling': [
    { label: 'Cocina asiatica', esPath: '/biblioteca-vino/maridajes/cocina-asiatica-y-fusion' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
    { label: 'Espumoso metodo tradicional', esPath: '/biblioteca-vino/estilos/espumoso' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/uvas/syrah': [
    { label: 'Priorat', esPath: '/biblioteca-vino/regiones/espana/priorat' },
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
    { label: 'Tinto crianza', esPath: '/biblioteca-vino/estilos/tinto-crianza' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
  ],
  '/biblioteca-vino/uvas/merlot': [
    { label: 'Burdeos', esPath: '/biblioteca-vino/regiones/francia/bordeaux' },
    { label: 'Tinto crianza', esPath: '/biblioteca-vino/estilos/tinto-crianza' },
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
  ],
  '/biblioteca-vino/uvas/malbec': [
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/uvas/nebbiolo': [
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
    { label: 'Arroces', esPath: '/biblioteca-vino/maridajes/pasta-arroces-y-legumbres' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/uvas/sangiovese': [
    { label: 'Tinto crianza', esPath: '/biblioteca-vino/estilos/tinto-crianza' },
    { label: 'Arroces', esPath: '/biblioteca-vino/maridajes/pasta-arroces-y-legumbres' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/uvas/monastrell': [
    { label: 'Tinto crianza', esPath: '/biblioteca-vino/estilos/tinto-crianza' },
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
    { label: 'Arroces', esPath: '/biblioteca-vino/maridajes/pasta-arroces-y-legumbres' },
  ],
  '/biblioteca-vino/uvas/viura': [
    { label: 'Rioja', esPath: '/biblioteca-vino/regiones/espana/rioja' },
    { label: 'Blanco con lias', esPath: '/biblioteca-vino/estilos/blanco-crianza-lias' },
    { label: 'Pescado blanco', esPath: '/biblioteca-vino/maridajes/lubina-dorada' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/uvas/chenin-blanc': [
    { label: 'Blanco con lias', esPath: '/biblioteca-vino/estilos/blanco-crianza-lias' },
    { label: 'Espumoso metodo tradicional', esPath: '/biblioteca-vino/estilos/espumoso' },
    { label: 'Cocina asiatica', esPath: '/biblioteca-vino/maridajes/cocina-asiatica-y-fusion' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/uvas/xarello': [
    { label: 'Penedes', esPath: '/biblioteca-vino/regiones/espana/penedes' },
    { label: 'Cava', esPath: '/biblioteca-vino/estilos/cava' },
    { label: 'Espumoso metodo tradicional', esPath: '/biblioteca-vino/estilos/espumoso' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
    { label: 'Arroces', esPath: '/biblioteca-vino/maridajes/pasta-arroces-y-legumbres' },
  ],
  '/biblioteca-vino/uvas/touriga-nacional': [
    { label: 'Douro', esPath: '/biblioteca-vino/regiones/portugal/douro' },
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/uvas/mencia': [
    { label: 'Bierzo', esPath: '/biblioteca-vino/regiones/espana/bierzo' },
    { label: 'Ribeira Sacra', esPath: '/biblioteca-vino/regiones/espana/ribeira-sacra' },
    { label: 'Tinto ligero', esPath: '/biblioteca-vino/estilos/tinto-ligero' },
    { label: 'Pato confitado', esPath: '/biblioteca-vino/maridajes/pato-confitado' },
    { label: 'Risotto de setas', esPath: '/biblioteca-vino/maridajes/risotto-setas' },
  ],
  '/biblioteca-vino/uvas/cabernet-franc': [
    { label: 'Burdeos', esPath: '/biblioteca-vino/regiones/francia/bordeaux' },
    { label: 'Tinto ligero', esPath: '/biblioteca-vino/estilos/tinto-ligero' },
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
    { label: 'Pato confitado', esPath: '/biblioteca-vino/maridajes/pato-confitado' },
    { label: 'Solomillo de ternera', esPath: '/biblioteca-vino/maridajes/solomillo-de-ternera' },
  ],
  '/biblioteca-vino/uvas/gamay': [
    { label: 'Beaujolais', esPath: '/biblioteca-vino/regiones/francia/beaujolais' },
    { label: 'Tinto ligero', esPath: '/biblioteca-vino/estilos/tinto-ligero' },
    { label: 'Tapas y aperitivos', esPath: '/biblioteca-vino/maridajes/tapas-y-aperitivos' },
    { label: 'Pato confitado', esPath: '/biblioteca-vino/maridajes/pato-confitado' },
    { label: 'Verduras y cocina vegetariana', esPath: '/biblioteca-vino/maridajes/verduras-y-cocina-vegetariana' },
  ],
  '/biblioteca-vino/uvas/gewurztraminer': [
    { label: 'Blanco joven', esPath: '/biblioteca-vino/estilos/blanco-joven' },
    { label: 'Cocina asiatica', esPath: '/biblioteca-vino/maridajes/cocina-asiatica-y-fusion' },
    { label: 'Queso azul', esPath: '/biblioteca-vino/maridajes/queso-azul' },
    { label: 'Postres y chocolate', esPath: '/biblioteca-vino/maridajes/postres-y-chocolate' },
    { label: 'Tapas y aperitivos', esPath: '/biblioteca-vino/maridajes/tapas-y-aperitivos' },
  ],
  '/biblioteca-vino/uvas/viognier': [
    { label: 'Blanco joven', esPath: '/biblioteca-vino/estilos/blanco-joven' },
    { label: 'Blanco con lias', esPath: '/biblioteca-vino/estilos/blanco-crianza-lias' },
    { label: 'Aves y caza', esPath: '/biblioteca-vino/maridajes/aves-y-caza' },
    { label: 'Cocina asiatica', esPath: '/biblioteca-vino/maridajes/cocina-asiatica-y-fusion' },
    { label: 'Queso de cabra', esPath: '/biblioteca-vino/maridajes/queso-de-cabra' },
  ],
  '/biblioteca-vino/uvas/gruner-veltliner': [
    { label: 'Blanco mineral', esPath: '/biblioteca-vino/estilos/blanco-mineral' },
    { label: 'Verduras y cocina vegetariana', esPath: '/biblioteca-vino/maridajes/verduras-y-cocina-vegetariana' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
    { label: 'Tapas y aperitivos', esPath: '/biblioteca-vino/maridajes/tapas-y-aperitivos' },
  ],
  '/biblioteca-vino/uvas/pinot-grigio': [
    { label: 'Blanco joven', esPath: '/biblioteca-vino/estilos/blanco-joven' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
    { label: 'Tapas y aperitivos', esPath: '/biblioteca-vino/maridajes/tapas-y-aperitivos' },
    { label: 'Verduras y cocina vegetariana', esPath: '/biblioteca-vino/maridajes/verduras-y-cocina-vegetariana' },
  ],
  '/biblioteca-vino/uvas/barbera': [
    { label: 'Piemonte', esPath: '/biblioteca-vino/regiones/italia/piemonte' },
    { label: 'Tinto ligero', esPath: '/biblioteca-vino/estilos/tinto-ligero' },
    { label: 'Risotto de setas', esPath: '/biblioteca-vino/maridajes/risotto-setas' },
    { label: 'Arroces', esPath: '/biblioteca-vino/maridajes/pasta-arroces-y-legumbres' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
  ],
  '/biblioteca-vino/uvas/primitivo': [
    { label: 'Tinto con cuerpo', esPath: '/biblioteca-vino/estilos/tinto-cuerpo' },
    { label: 'Solomillo de ternera', esPath: '/biblioteca-vino/maridajes/solomillo-de-ternera' },
    { label: 'Cordero asado', esPath: '/biblioteca-vino/maridajes/cordero-asado' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
  ],
  '/biblioteca-vino/uvas/aglianico': [
    { label: 'Tinto con cuerpo', esPath: '/biblioteca-vino/estilos/tinto-cuerpo' },
    { label: 'Cordero asado', esPath: '/biblioteca-vino/maridajes/cordero-asado' },
    { label: 'Solomillo de ternera', esPath: '/biblioteca-vino/maridajes/solomillo-de-ternera' },
    { label: 'Queso azul', esPath: '/biblioteca-vino/maridajes/queso-azul' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
  ],
  '/biblioteca-vino/uvas/graciano': [
    { label: 'Rioja', esPath: '/biblioteca-vino/regiones/espana/rioja' },
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
    { label: 'Cordero asado', esPath: '/biblioteca-vino/maridajes/cordero-asado' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/uvas/muscadet': [
    { label: 'Muscadet', esPath: '/biblioteca-vino/regiones/francia/muscadet' },
    { label: 'Blanco mineral', esPath: '/biblioteca-vino/estilos/blanco-mineral' },
    { label: 'Blanco con lias', esPath: '/biblioteca-vino/estilos/blanco-crianza-lias' },
    { label: 'Ostras', esPath: '/biblioteca-vino/maridajes/ostras' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
  ],
  '/biblioteca-vino/uvas/semillon': [
    { label: 'Blanco con lias', esPath: '/biblioteca-vino/estilos/blanco-crianza-lias' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
    { label: 'Postres y chocolate', esPath: '/biblioteca-vino/maridajes/postres-y-chocolate' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
  ],
  '/biblioteca-vino/uvas/assyrtiko': [
    { label: 'Santorini', esPath: '/biblioteca-vino/regiones/grecia/santorini' },
    { label: 'Blanco mineral', esPath: '/biblioteca-vino/estilos/blanco-mineral' },
    { label: 'Ostras', esPath: '/biblioteca-vino/maridajes/ostras' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
    { label: 'Tapas y aperitivos', esPath: '/biblioteca-vino/maridajes/tapas-y-aperitivos' },
  ],
  '/biblioteca-vino/uvas/vermentino': [
    { label: 'Vermentino di Gallura', esPath: '/biblioteca-vino/regiones/italia/vermentino-di-gallura' },
    { label: 'Blanco mineral', esPath: '/biblioteca-vino/estilos/blanco-mineral' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
    { label: 'Tapas y aperitivos', esPath: '/biblioteca-vino/maridajes/tapas-y-aperitivos' },
    { label: 'Verduras y cocina vegetariana', esPath: '/biblioteca-vino/maridajes/verduras-y-cocina-vegetariana' },
  ],
  '/biblioteca-vino/uvas/carmenere': [
    { label: 'Tinto con cuerpo', esPath: '/biblioteca-vino/estilos/tinto-cuerpo' },
    { label: 'Solomillo de ternera', esPath: '/biblioteca-vino/maridajes/solomillo-de-ternera' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
    { label: 'Cocina asiatica', esPath: '/biblioteca-vino/maridajes/cocina-asiatica-y-fusion' },
  ],
  '/biblioteca-vino/uvas/tannat': [
    { label: 'Tinto con cuerpo', esPath: '/biblioteca-vino/estilos/tinto-cuerpo' },
    { label: 'Solomillo de ternera', esPath: '/biblioteca-vino/maridajes/solomillo-de-ternera' },
    { label: 'Cordero asado', esPath: '/biblioteca-vino/maridajes/cordero-asado' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
    { label: 'Queso azul', esPath: '/biblioteca-vino/maridajes/queso-azul' },
  ],
  '/biblioteca-vino/uvas/petit-verdot': [
    { label: 'Tinto con cuerpo', esPath: '/biblioteca-vino/estilos/tinto-cuerpo' },
    { label: 'Solomillo de ternera', esPath: '/biblioteca-vino/maridajes/solomillo-de-ternera' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/uvas/torrontes': [
    { label: 'Blanco joven', esPath: '/biblioteca-vino/estilos/blanco-joven' },
    { label: 'Cocina asiatica', esPath: '/biblioteca-vino/maridajes/cocina-asiatica-y-fusion' },
    { label: 'Ceviche', esPath: '/biblioteca-vino/maridajes/ceviche' },
    { label: 'Tapas y aperitivos', esPath: '/biblioteca-vino/maridajes/tapas-y-aperitivos' },
    { label: 'Queso de cabra', esPath: '/biblioteca-vino/maridajes/queso-de-cabra' },
  ],
  '/biblioteca-vino/uvas/corvina': [
    { label: 'Valpolicella', esPath: '/biblioteca-vino/regiones/italia/valpolicella' },
    { label: 'Tinto con cuerpo', esPath: '/biblioteca-vino/estilos/tinto-cuerpo' },
    { label: 'Pato confitado', esPath: '/biblioteca-vino/maridajes/pato-confitado' },
    { label: 'Risotto de setas', esPath: '/biblioteca-vino/maridajes/risotto-setas' },
    { label: 'Queso azul', esPath: '/biblioteca-vino/maridajes/queso-azul' },
  ],
  '/biblioteca-vino/regiones/espana/rioja': [
    { label: 'Tempranillo', esPath: '/biblioteca-vino/uvas/tempranillo' },
    { label: 'Viura', esPath: '/biblioteca-vino/uvas/viura' },
    { label: 'Tinto crianza', esPath: '/biblioteca-vino/estilos/tinto-crianza' },
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
  ],
  '/biblioteca-vino/regiones/espana/ribera-del-duero': [
    { label: 'Tempranillo', esPath: '/biblioteca-vino/uvas/tempranillo' },
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
    { label: 'Tinto crianza', esPath: '/biblioteca-vino/estilos/tinto-crianza' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
  ],
  '/biblioteca-vino/regiones/espana/rias-baixas': [
    { label: 'Albarino', esPath: '/biblioteca-vino/uvas/albarino' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
    { label: 'Pescado blanco', esPath: '/biblioteca-vino/maridajes/lubina-dorada' },
    { label: 'Blanco con lias', esPath: '/biblioteca-vino/estilos/blanco-crianza-lias' },
  ],
  '/biblioteca-vino/regiones/espana/rueda': [
    { label: 'Verdejo', esPath: '/biblioteca-vino/uvas/verdejo' },
    { label: 'Pescado blanco', esPath: '/biblioteca-vino/maridajes/lubina-dorada' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
    { label: 'Arroces', esPath: '/biblioteca-vino/maridajes/pasta-arroces-y-legumbres' },
  ],
  '/biblioteca-vino/regiones/espana/priorat': [
    { label: 'Garnacha', esPath: '/biblioteca-vino/uvas/garnacha' },
    { label: 'Syrah', esPath: '/biblioteca-vino/uvas/syrah' },
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
  ],
  '/biblioteca-vino/regiones/francia/bourgogne': [
    { label: 'Pinot Noir', esPath: '/biblioteca-vino/uvas/pinot-noir' },
    { label: 'Chardonnay', esPath: '/biblioteca-vino/uvas/chardonnay' },
    { label: 'Blanco con lias', esPath: '/biblioteca-vino/estilos/blanco-crianza-lias' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/regiones/francia/bordeaux': [
    { label: 'Cabernet Sauvignon', esPath: '/biblioteca-vino/uvas/cabernet-sauvignon' },
    { label: 'Merlot', esPath: '/biblioteca-vino/uvas/merlot' },
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
  ],
  '/biblioteca-vino/regiones/francia/champagne': [
    { label: 'Chardonnay', esPath: '/biblioteca-vino/uvas/chardonnay' },
    { label: 'Pinot Noir', esPath: '/biblioteca-vino/uvas/pinot-noir' },
    { label: 'Espumoso metodo tradicional', esPath: '/biblioteca-vino/estilos/espumoso' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/regiones/portugal/douro': [
    { label: 'Touriga Nacional', esPath: '/biblioteca-vino/uvas/touriga-nacional' },
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/regiones/portugal/vinho-verde': [
    { label: 'Albarino', esPath: '/biblioteca-vino/uvas/albarino' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
    { label: 'Pescado blanco', esPath: '/biblioteca-vino/maridajes/lubina-dorada' },
    { label: 'Espumoso metodo tradicional', esPath: '/biblioteca-vino/estilos/espumoso' },
  ],
  '/biblioteca-vino/estilos/tinto-crianza': [
    { label: 'Tempranillo', esPath: '/biblioteca-vino/uvas/tempranillo' },
    { label: 'Rioja', esPath: '/biblioteca-vino/regiones/espana/rioja' },
    { label: 'Ribera del Duero', esPath: '/biblioteca-vino/regiones/espana/ribera-del-duero' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/estilos/tinto-reserva': [
    { label: 'Tempranillo', esPath: '/biblioteca-vino/uvas/tempranillo' },
    { label: 'Cabernet Sauvignon', esPath: '/biblioteca-vino/uvas/cabernet-sauvignon' },
    { label: 'Rioja', esPath: '/biblioteca-vino/regiones/espana/rioja' },
    { label: 'Burdeos', esPath: '/biblioteca-vino/regiones/francia/bordeaux' },
    { label: 'Carnes rojas', esPath: '/biblioteca-vino/maridajes/carnes-rojas' },
  ],
  '/biblioteca-vino/estilos/blanco-crianza-lias': [
    { label: 'Chardonnay', esPath: '/biblioteca-vino/uvas/chardonnay' },
    { label: 'Godello', esPath: '/biblioteca-vino/uvas/godello' },
    { label: 'Viura', esPath: '/biblioteca-vino/uvas/viura' },
    { label: 'Borgona', esPath: '/biblioteca-vino/regiones/francia/bourgogne' },
    { label: 'Pescado blanco', esPath: '/biblioteca-vino/maridajes/lubina-dorada' },
  ],
  '/biblioteca-vino/estilos/espumoso': [
    { label: 'Champagne', esPath: '/biblioteca-vino/regiones/francia/champagne' },
    { label: 'Cava', esPath: '/biblioteca-vino/estilos/cava' },
    { label: 'Chardonnay', esPath: '/biblioteca-vino/uvas/chardonnay' },
    { label: 'Xarel-lo', esPath: '/biblioteca-vino/uvas/xarello' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
  ],
  '/biblioteca-vino/estilos/cava': [
    { label: 'Penedes', esPath: '/biblioteca-vino/regiones/espana/penedes' },
    { label: 'Xarel-lo', esPath: '/biblioteca-vino/uvas/xarello' },
    { label: 'Espumoso metodo tradicional', esPath: '/biblioteca-vino/estilos/espumoso' },
    { label: 'Marisco', esPath: '/biblioteca-vino/maridajes/pescados-y-mariscos' },
    { label: 'Quesos', esPath: '/biblioteca-vino/maridajes/quesos' },
  ],
  '/biblioteca-vino/estilos/rosado-cuerpo': [
    { label: 'Garnacha', esPath: '/biblioteca-vino/uvas/garnacha' },
    { label: 'Syrah', esPath: '/biblioteca-vino/uvas/syrah' },
    { label: 'Priorat', esPath: '/biblioteca-vino/regiones/espana/priorat' },
    { label: 'Arroces', esPath: '/biblioteca-vino/maridajes/pasta-arroces-y-legumbres' },
    { label: 'Cocina asiatica', esPath: '/biblioteca-vino/maridajes/cocina-asiatica-y-fusion' },
  ],
  '/biblioteca-vino/maridajes/carnes-rojas': [
    { label: 'Tempranillo', esPath: '/biblioteca-vino/uvas/tempranillo' },
    { label: 'Syrah', esPath: '/biblioteca-vino/uvas/syrah' },
    { label: 'Cabernet Sauvignon', esPath: '/biblioteca-vino/uvas/cabernet-sauvignon' },
    { label: 'Rioja', esPath: '/biblioteca-vino/regiones/espana/rioja' },
    { label: 'Tinto reserva', esPath: '/biblioteca-vino/estilos/tinto-reserva' },
  ],
  '/biblioteca-vino/maridajes/pescados-y-mariscos': [
    { label: 'Albarino', esPath: '/biblioteca-vino/uvas/albarino' },
    { label: 'Verdejo', esPath: '/biblioteca-vino/uvas/verdejo' },
    { label: 'Rias Baixas', esPath: '/biblioteca-vino/regiones/espana/rias-baixas' },
    { label: 'Champagne', esPath: '/biblioteca-vino/regiones/francia/champagne' },
    { label: 'Espumoso metodo tradicional', esPath: '/biblioteca-vino/estilos/espumoso' },
  ],
  '/biblioteca-vino/maridajes/lubina-dorada': [
    { label: 'Albarino', esPath: '/biblioteca-vino/uvas/albarino' },
    { label: 'Verdejo', esPath: '/biblioteca-vino/uvas/verdejo' },
    { label: 'Godello', esPath: '/biblioteca-vino/uvas/godello' },
    { label: 'Rias Baixas', esPath: '/biblioteca-vino/regiones/espana/rias-baixas' },
    { label: 'Rueda', esPath: '/biblioteca-vino/regiones/espana/rueda' },
  ],
  '/biblioteca-vino/maridajes/pasta-arroces-y-legumbres': [
    { label: 'Sangiovese', esPath: '/biblioteca-vino/uvas/sangiovese' },
    { label: 'Nebbiolo', esPath: '/biblioteca-vino/uvas/nebbiolo' },
    { label: 'Garnacha', esPath: '/biblioteca-vino/uvas/garnacha' },
    { label: 'Tinto crianza', esPath: '/biblioteca-vino/estilos/tinto-crianza' },
    { label: 'Rosado gastronomico', esPath: '/biblioteca-vino/estilos/rosado-cuerpo' },
  ],
  '/biblioteca-vino/maridajes/paella': [
    { label: 'Garnacha', esPath: '/biblioteca-vino/uvas/garnacha' },
    { label: 'Albarino', esPath: '/biblioteca-vino/uvas/albarino' },
    { label: 'Verdejo', esPath: '/biblioteca-vino/uvas/verdejo' },
    { label: 'Rosado gastronomico', esPath: '/biblioteca-vino/estilos/rosado-cuerpo' },
    { label: 'Rueda', esPath: '/biblioteca-vino/regiones/espana/rueda' },
  ],
  '/biblioteca-vino/maridajes/cocina-asiatica-y-fusion': [
    { label: 'Riesling', esPath: '/biblioteca-vino/uvas/riesling' },
    { label: 'Sauvignon Blanc', esPath: '/biblioteca-vino/uvas/sauvignon-blanc' },
    { label: 'Albarino', esPath: '/biblioteca-vino/uvas/albarino' },
    { label: 'Espumoso metodo tradicional', esPath: '/biblioteca-vino/estilos/espumoso' },
    { label: 'Rosado gastronomico', esPath: '/biblioteca-vino/estilos/rosado-cuerpo' },
  ],
  '/biblioteca-vino/maridajes/quesos': [
    { label: 'Tempranillo', esPath: '/biblioteca-vino/uvas/tempranillo' },
    { label: 'Chardonnay', esPath: '/biblioteca-vino/uvas/chardonnay' },
    { label: 'Rioja', esPath: '/biblioteca-vino/regiones/espana/rioja' },
    { label: 'Champagne', esPath: '/biblioteca-vino/regiones/francia/champagne' },
    { label: 'Blanco con lias', esPath: '/biblioteca-vino/estilos/blanco-crianza-lias' },
  ],
};

function wineLibraryStrategicLinks(lang: WineLibraryLang, esPath: string): { label: string; url: string }[] {
  return (WINE_LIBRARY_STRATEGIC_LINKS[esPath] || []).map((link) => ({
    label: link.label,
    url: wineLibraryPath(lang, link.esPath),
  }));
}

function titleFromSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.length <= 3 ? part.toUpperCase() : `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

function resolveWineLibraryPath(path: string): { lang: WineLibraryLang; esPath: string } | null {
  for (const lang of WINE_LIBRARY_LANGS) {
    const config = WINE_LIBRARY_PATH_CONFIG[lang];
    if (path === config.base) return { lang, esPath: '/biblioteca-vino' };
    if (!path.startsWith(`${config.base}/`)) continue;

    const relative = path.slice(config.base.length + 1);
    const [localizedSection, ...restParts] = relative.split('/');
    const esSection = Object.entries(config.sections).find(([, value]) => value === localizedSection)?.[0] || localizedSection;
    const rest = restParts.length > 0 ? `/${restParts.join('/')}` : '';
    return { lang, esPath: `/biblioteca-vino/${esSection}${rest}` };
  }
  return null;
}

function renderWineLibraryPage(path: string): string | null {
  const resolved = resolveWineLibraryPath(path);
  if (!resolved) return null;

  const { lang, esPath } = resolved;
  const copy = WINE_LIBRARY_COPY[lang];
  const parts = esPath.split('/').filter(Boolean);
  const section = parts[1];
  const canonical = `${SITE}${wineLibraryPath(lang, esPath)}`;

  if (esPath === '/biblioteca-vino') {
    const localizedHomePath = wineLibraryPath(lang, esPath);
    const staticHomePage = STATIC_PAGES[localizedHomePath] || STATIC_PAGES['/biblioteca-vino'];
    return generateHTML(
      staticHomePage.meta,
      withWineLibraryHubRoutes(staticHomePage.content, lang, esPath),
      wineLibraryHreflang(esPath)
    );
  }

  const sectionTitle = copy.sectionTitles[section] || copy.home;
  const isSectionHub = parts.length === 2;
  const subject = isSectionHub ? sectionTitle : titleFromSlug(parts[parts.length - 1]);
  const type = isSectionHub ? sectionTitle.toLowerCase() : copy.detailLabels[section] || copy.detailLabels.article;
  const priorityGrapeProfile = !isSectionHub && section === 'uvas'
    ? WINE_LIBRARY_PRIORITY_GRAPES[parts[parts.length - 1]] || WINE_LIBRARY_EXPANDED_GRAPES[parts[parts.length - 1]]
    : undefined;
  const priorityRegionProfile = !isSectionHub && section === 'regiones'
    ? WINE_LIBRARY_PRIORITY_REGIONS[parts[parts.length - 1]] || WINE_LIBRARY_EXPANDED_REGIONS[parts[parts.length - 1]]
    : undefined;
  const priorityStyleProfile = !isSectionHub && section === 'estilos'
    ? WINE_LIBRARY_PRIORITY_STYLES[parts[parts.length - 1]] || WINE_LIBRARY_EXPANDED_STYLES[parts[parts.length - 1]]
    : undefined;
  const priorityPairingProfile = !isSectionHub && section === 'maridajes'
    ? WINE_LIBRARY_PRIORITY_PAIRINGS[parts[parts.length - 1]] || WINE_LIBRARY_EXPANDED_PAIRINGS[parts[parts.length - 1]]
    : undefined;
  const priorityProfile = priorityGrapeProfile || priorityRegionProfile || priorityStyleProfile || priorityPairingProfile;
  const editorialLang = priorityProfile ? lang : undefined;
  const priorityCopy = editorialLang
    ? WINE_LIBRARY_EDITORIAL_COPY[editorialLang]
    : undefined;
  const h1 = isSectionHub ? sectionTitle : `${subject}: ${type}`;
  const title = `${h1} | Winerim`;
  const description = isSectionHub
    ? copy.sectionIntro(sectionTitle)
    : priorityProfile && priorityCopy
      ? `${copy.generatedIntro(subject, type)} ${priorityProfile.role[editorialLang!]}`
      : copy.generatedIntro(subject, type);

  const hubPath = section ? wineLibraryPath(lang, `/biblioteca-vino/${section}`) : wineLibraryPath(lang, '/biblioteca-vino');
  const strategicInternalLinks = isSectionHub ? wineLibraryHubRouteLinks(lang, esPath) : wineLibraryStrategicLinks(lang, esPath);
  const baseSections = priorityProfile && priorityCopy
    ? [
        { heading: priorityCopy.role, content: priorityProfile.role[editorialLang!] },
        { heading: priorityCopy.service, content: `${subject}: ${priorityProfile.serviceTemp}. ${priorityProfile.glass}.` },
        { heading: priorityCopy.cue, content: priorityProfile.cue[editorialLang!] },
        { heading: priorityCopy.menu, content: priorityProfile.hooks[editorialLang!].join(', ') },
        { heading: priorityCopy.avoid, content: priorityProfile.avoid[editorialLang!] },
      ]
    : isSectionHub
    ? [
        { heading: sectionTitle, content: copy.sectionIntro(sectionTitle) },
        { heading: copy.home, content: copy.generatedIntro(sectionTitle, copy.detailLabels.article) },
      ]
    : [
        { heading: subject, content: copy.generatedIntro(subject, type) },
        { heading: sectionTitle, content: copy.sectionIntro(sectionTitle) },
        { heading: copy.home, content: copy.generatedIntro(subject, copy.detailLabels.article) },
      ];
  const sections = isSectionHub ? [...baseSections, ...wineLibraryHubRouteSections(lang, esPath)] : baseSections;

  return generateHTML(
    {
      title,
      description,
      canonical,
      ogImage: OG_IMAGE,
      lang,
      type: 'website',
      schemaType: isSectionHub ? 'CollectionPage' : 'Article',
    },
    {
      h1,
      subtitle: sectionTitle,
      intro: description,
      sections,
      faqs: priorityProfile && priorityCopy
        ? [
            priorityCopy.faqService(subject, priorityProfile.serviceTemp),
            priorityCopy.faqList(subject),
          ]
        : isSectionHub
        ? wineLibrarySectionFaqs(lang, sectionTitle, description)
        : [
            {
              q: copy.faqTitle,
              a: description,
            },
          ],
      breadcrumbs: [
        { name: copy.breadcrumbsHome, url: `${SITE}${lang === 'es' ? '/' : `/${lang}`}` },
        { name: copy.home, url: `${SITE}${wineLibraryPath(lang, '/biblioteca-vino')}` },
        ...(section ? [{ name: sectionTitle, url: `${SITE}${hubPath}` }] : []),
        ...(!isSectionHub ? [{ name: subject, url: canonical }] : []),
      ],
      internalLinks: [
        ...strategicInternalLinks,
        { label: copy.sectionTitles.uvas, url: wineLibraryPath(lang, '/biblioteca-vino/uvas') },
        { label: copy.sectionTitles.regiones, url: wineLibraryPath(lang, '/biblioteca-vino/regiones') },
        { label: copy.sectionTitles.estilos, url: wineLibraryPath(lang, '/biblioteca-vino/estilos') },
        { label: copy.sectionTitles.maridajes, url: wineLibraryPath(lang, '/biblioteca-vino/maridajes') },
        { label: copy.sectionTitles.glosario, url: wineLibraryPath(lang, '/biblioteca-vino/glosario') },
      ],
    },
    wineLibraryHreflang(esPath)
  );
}

// ── Hreflang map: ES path → other language paths ──
const HREFLANG_MAP: Record<string, HreflangEntry[]> = {
  '/': [
    { lang: 'es', url: `${SITE}/` },
    { lang: 'en', url: `${SITE}/en` },
    { lang: 'it', url: `${SITE}/it` },
    { lang: 'fr', url: `${SITE}/fr` },
    { lang: 'x-default', url: `${SITE}/` },
  ],
  '/funcionalidades': [
    { lang: 'es', url: `${SITE}/funcionalidades` },
    { lang: 'en', url: `${SITE}/en/features` },
    { lang: 'it', url: `${SITE}/it/funzionalita` },
    { lang: 'fr', url: `${SITE}/fr/fonctionnalites` },
    { lang: 'x-default', url: `${SITE}/funcionalidades` },
  ],
  '/precios': [
    { lang: 'es', url: `${SITE}/precios` },
    { lang: 'en', url: `${SITE}/en/pricing` },
    { lang: 'it', url: `${SITE}/it/prezzi` },
    { lang: 'fr', url: `${SITE}/fr/tarifs` },
    { lang: 'x-default', url: `${SITE}/precios` },
  ],
  '/software-carta-de-vinos': [
    { lang: 'es', url: `${SITE}/software-carta-de-vinos` },
    { lang: 'en', url: `${SITE}/en/wine-list-management-software` },
    { lang: 'it', url: `${SITE}/it/software-carta-vini` },
    { lang: 'fr', url: `${SITE}/fr/logiciel-carte-des-vins` },
    { lang: 'x-default', url: `${SITE}/software-carta-de-vinos` },
  ],
  '/contacto': [
    { lang: 'es', url: `${SITE}/contacto` },
    { lang: 'en', url: `${SITE}/en/contact` },
    { lang: 'it', url: `${SITE}/it/contatto` },
    { lang: 'x-default', url: `${SITE}/contacto` },
  ],
  '/demo': [
    { lang: 'es', url: `${SITE}/demo` },
    { lang: 'en', url: `${SITE}/en/demo` },
    { lang: 'it', url: `${SITE}/it/demo` },
    { lang: 'fr', url: `${SITE}/fr/demo` },
    { lang: 'x-default', url: `${SITE}/demo` },
  ],
  '/casos-exito': [
    { lang: 'es', url: `${SITE}/casos-exito` },
    { lang: 'en', url: `${SITE}/en/case-studies` },
    { lang: 'it', url: `${SITE}/it/casi-di-successo` },
    { lang: 'fr', url: `${SITE}/fr/cas-clients` },
    { lang: 'x-default', url: `${SITE}/casos-exito` },
  ],
  '/clientes': [
    { lang: 'es', url: `${SITE}/clientes` },
    { lang: 'en', url: `${SITE}/en/clients` },
    { lang: 'it', url: `${SITE}/it/clienti` },
    { lang: 'x-default', url: `${SITE}/clientes` },
  ],
  '/integraciones': [
    { lang: 'es', url: `${SITE}/integraciones` },
    { lang: 'en', url: `${SITE}/en/integrations` },
    { lang: 'it', url: `${SITE}/it/integrazioni` },
    { lang: 'x-default', url: `${SITE}/integraciones` },
  ],
  '/herramientas': [
    { lang: 'es', url: `${SITE}/herramientas` },
    { lang: 'en', url: `${SITE}/en/tools` },
    { lang: 'it', url: `${SITE}/it/strumenti` },
    { lang: 'fr', url: `${SITE}/fr/outils` },
    { lang: 'x-default', url: `${SITE}/herramientas` },
  ],
  '/guias-y-recursos': [
    { lang: 'es', url: `${SITE}/guias-y-recursos` },
    { lang: 'en', url: `${SITE}/en/guides` },
    { lang: 'it', url: `${SITE}/it/guide` },
    { lang: 'x-default', url: `${SITE}/guias-y-recursos` },
  ],
  '/soluciones': [
    { lang: 'es', url: `${SITE}/soluciones` },
    { lang: 'en', url: `${SITE}/en/solutions` },
    { lang: 'it', url: `${SITE}/it/soluzioni` },
    { lang: 'x-default', url: `${SITE}/soluciones` },
  ],
  '/problemas': [
    { lang: 'es', url: `${SITE}/problemas` },
    { lang: 'en', url: `${SITE}/en/challenges` },
    { lang: 'it', url: `${SITE}/it/sfide` },
    { lang: 'fr', url: `${SITE}/fr/defis` },
    { lang: 'x-default', url: `${SITE}/problemas` },
  ],
  '/producto/winerim-core': [
    { lang: 'es', url: `${SITE}/producto/winerim-core` },
    { lang: 'en', url: `${SITE}/en/product/winerim-core` },
    { lang: 'it', url: `${SITE}/it/prodotto/winerim-core` },
    { lang: 'fr', url: `${SITE}/fr/produit/winerim-core` },
    { lang: 'x-default', url: `${SITE}/producto/winerim-core` },
  ],
  '/producto/winerim-supply': [
    { lang: 'es', url: `${SITE}/producto/winerim-supply` },
    { lang: 'en', url: `${SITE}/en/product/winerim-supply` },
    { lang: 'it', url: `${SITE}/it/prodotto/winerim-supply` },
    { lang: 'fr', url: `${SITE}/fr/produit/winerim-supply` },
    { lang: 'x-default', url: `${SITE}/producto/winerim-supply` },
  ],
  '/producto/inteligencia-dinamica': [
    { lang: 'es', url: `${SITE}/producto/inteligencia-dinamica` },
    { lang: 'en', url: `${SITE}/en/product/dynamic-intelligence` },
    { lang: 'it', url: `${SITE}/it/prodotto/intelligenza-dinamica` },
    { lang: 'fr', url: `${SITE}/fr/produit/intelligence-dynamique` },
    { lang: 'x-default', url: `${SITE}/producto/inteligencia-dinamica` },
  ],
  '/analisis-carta': [
    { lang: 'es', url: `${SITE}/analisis-carta` },
    { lang: 'en', url: `${SITE}/en/wine-list-analysis` },
    { lang: 'it', url: `${SITE}/it/analisi-carta` },
    { lang: 'fr', url: `${SITE}/fr/analyse-carte` },
    { lang: 'x-default', url: `${SITE}/analisis-carta` },
  ],
  '/aprender-vino': [
    { lang: 'es', url: `${SITE}/aprender-vino` },
    { lang: 'en', url: `${SITE}/en/learn-wine` },
    { lang: 'it', url: `${SITE}/it/imparare-il-vino` },
    { lang: 'fr', url: `${SITE}/fr/apprendre-le-vin` },
    { lang: 'de', url: `${SITE}/de/wein-lernen` },
    { lang: 'pt', url: `${SITE}/pt/aprender-vinho` },
    { lang: 'x-default', url: `${SITE}/aprender-vino` },
  ],
  '/calculadora-margen-vino': [
    { lang: 'es', url: `${SITE}/calculadora-margen-vino` },
    { lang: 'en', url: `${SITE}/en/wine-margin-calculator` },
    { lang: 'it', url: `${SITE}/it/calcolatrice-margini-vino` },
    { lang: 'fr', url: `${SITE}/fr/calculateur-marge-vin` },
    { lang: 'x-default', url: `${SITE}/calculadora-margen-vino` },
  ],
  '/afiliate': [
    { lang: 'es', url: `${SITE}/afiliate` },
    { lang: 'en', url: `${SITE}/en/affiliate` },
    { lang: 'it', url: `${SITE}/it/affiliati` },
    { lang: 'fr', url: `${SITE}/fr/affilies` },
    { lang: 'x-default', url: `${SITE}/afiliate` },
  ],
  '/sommelier-corner': [
    { lang: 'es', url: `${SITE}/sommelier-corner` },
    { lang: 'en', url: `${SITE}/en/sommelier-corner` },
    { lang: 'it', url: `${SITE}/it/sommelier-corner` },
    { lang: 'fr', url: `${SITE}/fr/sommelier-corner` },
    { lang: 'x-default', url: `${SITE}/sommelier-corner` },
  ],
  '/que-es-winerim': [
    { lang: 'es', url: `${SITE}/que-es-winerim` },
    { lang: 'en', url: `${SITE}/en/what-is-winerim` },
    { lang: 'it', url: `${SITE}/it/cose-winerim` },
    { lang: 'fr', url: `${SITE}/fr/quest-ce-que-winerim` },
    { lang: 'x-default', url: `${SITE}/que-es-winerim` },
  ],
  '/en/what-is-winerim': [
    { lang: 'es', url: `${SITE}/que-es-winerim` },
    { lang: 'en', url: `${SITE}/en/what-is-winerim` },
    { lang: 'it', url: `${SITE}/it/cose-winerim` },
    { lang: 'fr', url: `${SITE}/fr/quest-ce-que-winerim` },
    { lang: 'x-default', url: `${SITE}/que-es-winerim` },
  ],
  '/en/wine-list-management-software': [
    { lang: 'es', url: `${SITE}/software-carta-de-vinos` },
    { lang: 'en', url: `${SITE}/en/wine-list-management-software` },
    { lang: 'it', url: `${SITE}/it/software-carta-vini` },
    { lang: 'fr', url: `${SITE}/fr/logiciel-carte-des-vins` },
    { lang: 'x-default', url: `${SITE}/software-carta-de-vinos` },
  ],
  '/biblioteca-vino': WINE_LIBRARY_HOME_HREFLANG,
  '/en/wine-library': WINE_LIBRARY_HOME_HREFLANG,
  '/it/biblioteca-vino': WINE_LIBRARY_HOME_HREFLANG,
  '/fr/bibliotheque-vin': WINE_LIBRARY_HOME_HREFLANG,
  '/de/weinbibliothek': WINE_LIBRARY_HOME_HREFLANG,
  '/pt/biblioteca-vinho': WINE_LIBRARY_HOME_HREFLANG,
};

type StaticLocalizedLang = Exclude<WineLibraryLang, 'es'>;

const STATIC_LOCALIZED_ROUTES: Record<StaticLocalizedLang, Record<string, string>> = {
  en: {
    '/': '/en',
    '/blog': '/en/blog',
    '/sommelier-corner': '/en/sommelier-corner',
    '/demo': '/en/demo',
    '/precios': '/en/pricing',
    '/contacto': '/en/contact',
    '/afiliate': '/en/affiliate',
    '/guias-y-recursos': '/en/guides',
    '/herramientas': '/en/tools',
    '/casos-exito': '/en/case-studies',
    '/integraciones': '/en/integrations',
    '/soluciones': '/en/solutions',
    '/problemas': '/en/challenges',
    '/clientes': '/en/clients',
    '/funcionalidades': '/en/features',
    '/privacidad': '/en/privacy',
    '/terminos': '/en/terms',
    '/software-carta-de-vinos': '/en/wine-list-management-software',
    '/que-es-winerim': '/en/what-is-winerim',
    '/producto/inteligencia-dinamica': '/en/product/dynamic-intelligence',
    '/producto/winerim-core': '/en/product/winerim-core',
    '/producto/winerim-supply': '/en/product/winerim-supply',
    '/analisis-carta': '/en/wine-list-analysis',
    '/aprender-vino': '/en/learn-wine',
    '/barometro-cartas-vino-2026': '/en/wine-list-barometer-2026',
    '/calculadora-margen-vino': '/en/wine-margin-calculator',
    '/soluciones/grupos-restauracion': '/en/solutions/restaurant-groups',
    '/soluciones/aumentar-ticket-medio-restaurante': '/en/solutions/increase-average-ticket',
  },
  it: {
    '/': '/it',
    '/blog': '/it/blog',
    '/sommelier-corner': '/it/sommelier-corner',
    '/demo': '/it/demo',
    '/precios': '/it/prezzi',
    '/contacto': '/it/contatto',
    '/afiliate': '/it/affiliati',
    '/guias-y-recursos': '/it/guide',
    '/herramientas': '/it/strumenti',
    '/casos-exito': '/it/casi-di-successo',
    '/integraciones': '/it/integrazioni',
    '/soluciones': '/it/soluzioni',
    '/problemas': '/it/sfide',
    '/clientes': '/it/clienti',
    '/funcionalidades': '/it/funzionalita',
    '/privacidad': '/it/privacy',
    '/terminos': '/it/termini',
    '/software-carta-de-vinos': '/it/software-carta-vini',
    '/que-es-winerim': '/it/cose-winerim',
    '/producto/inteligencia-dinamica': '/it/prodotto/intelligenza-dinamica',
    '/producto/winerim-core': '/it/prodotto/winerim-core',
    '/producto/winerim-supply': '/it/prodotto/winerim-supply',
    '/analisis-carta': '/it/analisi-carta',
    '/aprender-vino': '/it/imparare-il-vino',
    '/barometro-cartas-vino-2026': '/it/barometro-carte-vini-2026',
    '/calculadora-margen-vino': '/it/calcolatrice-margini-vino',
    '/soluciones/grupos-restauracion': '/it/soluzioni/gruppi-ristorazione',
    '/soluciones/aumentar-ticket-medio-restaurante': '/it/soluzioni/aumentare-scontrino-medio',
  },
  fr: {
    '/': '/fr',
    '/blog': '/fr/blog',
    '/sommelier-corner': '/fr/sommelier-corner',
    '/demo': '/fr/demo',
    '/precios': '/fr/tarifs',
    '/contacto': '/fr/contact',
    '/afiliate': '/fr/affilies',
    '/guias-y-recursos': '/fr/guides',
    '/herramientas': '/fr/outils',
    '/casos-exito': '/fr/cas-clients',
    '/integraciones': '/fr/integrations',
    '/soluciones': '/fr/solutions',
    '/problemas': '/fr/defis',
    '/clientes': '/fr/clients',
    '/funcionalidades': '/fr/fonctionnalites',
    '/privacidad': '/fr/confidentialite',
    '/terminos': '/fr/conditions',
    '/software-carta-de-vinos': '/fr/logiciel-carte-des-vins',
    '/que-es-winerim': '/fr/quest-ce-que-winerim',
    '/producto/inteligencia-dinamica': '/fr/produit/intelligence-dynamique',
    '/producto/winerim-core': '/fr/produit/winerim-core',
    '/producto/winerim-supply': '/fr/produit/winerim-supply',
    '/analisis-carta': '/fr/analyse-carte',
    '/aprender-vino': '/fr/apprendre-le-vin',
    '/barometro-cartas-vino-2026': '/fr/barometre-cartes-vins-2026',
    '/calculadora-margen-vino': '/fr/calculateur-marge-vin',
    '/soluciones/grupos-restauracion': '/fr/solutions/groupes-restauration',
    '/soluciones/aumentar-ticket-medio-restaurante': '/fr/solutions/augmenter-ticket-moyen',
  },
  de: {
    '/': '/de',
    '/blog': '/de/blog',
    '/sommelier-corner': '/de/sommelier-corner',
    '/demo': '/de/demo',
    '/precios': '/de/preise',
    '/contacto': '/de/kontakt',
    '/afiliate': '/de/partner',
    '/guias-y-recursos': '/de/ratgeber',
    '/herramientas': '/de/tools',
    '/casos-exito': '/de/erfolgsgeschichten',
    '/integraciones': '/de/integrationen',
    '/soluciones': '/de/loesungen',
    '/problemas': '/de/herausforderungen',
    '/clientes': '/de/kunden',
    '/funcionalidades': '/de/funktionen',
    '/privacidad': '/de/datenschutz',
    '/terminos': '/de/agb',
    '/software-carta-de-vinos': '/de/weinkarten-software',
    '/que-es-winerim': '/de/was-ist-winerim',
    '/producto/inteligencia-dinamica': '/de/produkt/dynamische-intelligenz',
    '/producto/winerim-core': '/de/produkt/winerim-core',
    '/producto/winerim-supply': '/de/produkt/winerim-supply',
    '/analisis-carta': '/de/weinkarten-analyse',
    '/aprender-vino': '/de/wein-lernen',
    '/barometro-cartas-vino-2026': '/de/weinkarten-barometer-2026',
    '/calculadora-margen-vino': '/de/wein-margen-rechner',
    '/soluciones/grupos-restauracion': '/de/loesungen/restaurant-gruppen',
    '/soluciones/aumentar-ticket-medio-restaurante': '/de/loesungen/durchschnittsbon-erhoehen',
  },
  pt: {
    '/': '/pt',
    '/blog': '/pt/blog',
    '/sommelier-corner': '/pt/sommelier-corner',
    '/demo': '/pt/demo',
    '/precios': '/pt/precos',
    '/contacto': '/pt/contacto',
    '/afiliate': '/pt/afiliados',
    '/guias-y-recursos': '/pt/guias',
    '/herramientas': '/pt/ferramentas',
    '/casos-exito': '/pt/casos-de-sucesso',
    '/integraciones': '/pt/integracoes',
    '/soluciones': '/pt/solucoes',
    '/problemas': '/pt/desafios',
    '/clientes': '/pt/clientes',
    '/funcionalidades': '/pt/funcionalidades',
    '/privacidad': '/pt/privacidade',
    '/terminos': '/pt/termos',
    '/software-carta-de-vinos': '/pt/software-carta-vinhos',
    '/que-es-winerim': '/pt/o-que-e-winerim',
    '/producto/inteligencia-dinamica': '/pt/produto/inteligencia-dinamica',
    '/producto/winerim-core': '/pt/produto/winerim-core',
    '/producto/winerim-supply': '/pt/produto/winerim-supply',
    '/analisis-carta': '/pt/analise-carta',
    '/aprender-vino': '/pt/aprender-vinho',
    '/barometro-cartas-vino-2026': '/pt/barometro-cartas-vinhos-2026',
    '/calculadora-margen-vino': '/pt/calculadora-margem-vinho',
    '/soluciones/grupos-restauracion': '/pt/solucoes/grupos-restauracao',
    '/soluciones/aumentar-ticket-medio-restaurante': '/pt/solucoes/aumentar-ticket-medio',
  },
};

const STATIC_MULTILINGUAL_ES_PATHS = new Set(Object.keys(STATIC_LOCALIZED_ROUTES.en));

const STATIC_PAGE_LABELS: Record<string, Record<WineLibraryLang, string>> = {
  '/': { es: 'Software de IA para cartas de vino', en: 'AI wine list software', it: 'Software IA per carte vini', fr: 'Logiciel IA pour cartes des vins', de: 'KI-Software fuer Weinkarten', pt: 'Software de IA para cartas de vinho' },
  '/blog': { es: 'Blog', en: 'Blog', it: 'Blog', fr: 'Blog', de: 'Blog', pt: 'Blog' },
  '/sommelier-corner': { es: 'Sommelier Corner', en: 'Sommelier Corner', it: 'Sommelier Corner', fr: 'Sommelier Corner', de: 'Sommelier Corner', pt: 'Sommelier Corner' },
  '/demo': { es: 'Demo gratuita', en: 'Free demo', it: 'Demo gratuita', fr: 'Demo gratuite', de: 'Kostenlose Demo', pt: 'Demo gratuita' },
  '/precios': { es: 'Precios', en: 'Pricing', it: 'Prezzi', fr: 'Tarifs', de: 'Preise', pt: 'Precos' },
  '/contacto': { es: 'Contacto', en: 'Contact', it: 'Contatto', fr: 'Contact', de: 'Kontakt', pt: 'Contacto' },
  '/afiliate': { es: 'Programa de afiliados', en: 'Affiliate program', it: 'Programma affiliati', fr: 'Programme partenaires', de: 'Partnerprogramm', pt: 'Programa de afiliados' },
  '/guias-y-recursos': { es: 'Guias y recursos', en: 'Guides and resources', it: 'Guide e risorse', fr: 'Guides et ressources', de: 'Ratgeber und Ressourcen', pt: 'Guias e recursos' },
  '/herramientas': { es: 'Herramientas', en: 'Tools', it: 'Strumenti', fr: 'Outils', de: 'Tools', pt: 'Ferramentas' },
  '/casos-exito': { es: 'Casos de exito', en: 'Case studies', it: 'Casi di successo', fr: 'Cas clients', de: 'Erfolgsgeschichten', pt: 'Casos de sucesso' },
  '/integraciones': { es: 'Integraciones', en: 'Integrations', it: 'Integrazioni', fr: 'Integrations', de: 'Integrationen', pt: 'Integracoes' },
  '/soluciones': { es: 'Soluciones', en: 'Solutions', it: 'Soluzioni', fr: 'Solutions', de: 'Loesungen', pt: 'Solucoes' },
  '/problemas': { es: 'Problemas', en: 'Challenges', it: 'Sfide', fr: 'Defis', de: 'Herausforderungen', pt: 'Desafios' },
  '/clientes': { es: 'Clientes', en: 'Clients', it: 'Clienti', fr: 'Clients', de: 'Kunden', pt: 'Clientes' },
  '/funcionalidades': { es: 'Funcionalidades', en: 'Features', it: 'Funzionalita', fr: 'Fonctionnalites', de: 'Funktionen', pt: 'Funcionalidades' },
  '/privacidad': { es: 'Privacidad', en: 'Privacy', it: 'Privacy', fr: 'Confidentialite', de: 'Datenschutz', pt: 'Privacidade' },
  '/terminos': { es: 'Terminos', en: 'Terms', it: 'Termini', fr: 'Conditions', de: 'AGB', pt: 'Termos' },
  '/software-carta-de-vinos': { es: 'Software de carta de vinos', en: 'Wine list management software', it: 'Software per carta vini', fr: 'Logiciel carte des vins', de: 'Weinkarten-Software', pt: 'Software de carta de vinhos' },
  '/que-es-winerim': { es: 'Que es Winerim', en: 'What is Winerim', it: 'Cos e Winerim', fr: 'Qu est-ce que Winerim', de: 'Was ist Winerim', pt: 'O que e Winerim' },
  '/producto/inteligencia-dinamica': { es: 'Inteligencia dinamica', en: 'Dynamic intelligence', it: 'Intelligenza dinamica', fr: 'Intelligence dynamique', de: 'Dynamische Intelligenz', pt: 'Inteligencia dinamica' },
  '/producto/winerim-core': { es: 'Winerim Core', en: 'Winerim Core', it: 'Winerim Core', fr: 'Winerim Core', de: 'Winerim Core', pt: 'Winerim Core' },
  '/producto/winerim-supply': { es: 'Winerim Supply', en: 'Winerim Supply', it: 'Winerim Supply', fr: 'Winerim Supply', de: 'Winerim Supply', pt: 'Winerim Supply' },
  '/analisis-carta': { es: 'Analisis de carta de vinos', en: 'Wine list analysis', it: 'Analisi carta vini', fr: 'Analyse de carte des vins', de: 'Weinkartenanalyse', pt: 'Analise de carta de vinhos' },
  '/aprender-vino': { es: 'Aprender vino', en: 'Learn wine', it: 'Imparare il vino', fr: 'Apprendre le vin', de: 'Wein lernen', pt: 'Aprender vinho' },
  '/barometro-cartas-vino-2026': { es: 'Barometro Winerim de cartas de vino', en: 'Winerim wine list barometer', it: 'Barometro Winerim delle carte vini', fr: 'Barometre Winerim des cartes des vins', de: 'Winerim Weinkarten-Barometer', pt: 'Barometro Winerim de cartas de vinhos' },
  '/calculadora-margen-vino': { es: 'Calculadora de margen de vino', en: 'Wine margin calculator', it: 'Calcolatrice margini vino', fr: 'Calculateur de marge vin', de: 'Wein-Margenrechner', pt: 'Calculadora de margem de vinho' },
  '/soluciones/grupos-restauracion': { es: 'Grupos de restauracion', en: 'Restaurant groups', it: 'Gruppi di ristorazione', fr: 'Groupes de restauration', de: 'Restaurantgruppen', pt: 'Grupos de restauracao' },
  '/soluciones/aumentar-ticket-medio-restaurante': { es: 'Aumentar ticket medio', en: 'Increase average ticket', it: 'Aumentare lo scontrino medio', fr: 'Augmenter le ticket moyen', de: 'Durchschnittsbon erhoehen', pt: 'Aumentar ticket medio' },
};

const LOCALIZED_STATIC_TEMPLATES: Record<StaticLocalizedLang, {
  home: string;
  description: (label: string) => string;
  subtitle: (label: string) => string;
  sections: (label: string) => { heading: string; content: string }[];
  faqs: (label: string) => { q: string; a: string }[];
  links: { label: string; esPath: string }[];
}> = {
  en: {
    home: 'Home',
    description: (label) => `${label} from Winerim: AI wine list software for restaurants, hotels and hospitality groups that need recommendations, pairing, stock control, pricing support and analytics.`,
    subtitle: (label) => `${label} for hospitality teams that want to sell more wine with better data and clearer service workflows.`,
    sections: (label) => [
      { heading: 'What this page covers', content: `${label} explains how Winerim helps restaurants connect their wine list, guest recommendations, service training, stock and margin decisions.` },
      { heading: 'Why it matters', content: 'Wine sales depend on clear recommendations, current stock, confident staff and pricing decisions based on data rather than intuition.' },
      { heading: 'How Winerim helps', content: 'Winerim combines a digital wine list, AI recommendations, food pairing, cellar intelligence and analytics in one operational platform.' },
    ],
    faqs: (label) => [{ q: `Is ${label} available in Winerim?`, a: `Yes. ${label} is part of the Winerim platform and connects with the wider wine list, recommendations, stock and analytics workflow.` }],
    links: [{ label: 'Product', esPath: '/software-carta-de-vinos' }, { label: 'Features', esPath: '/funcionalidades' }, { label: 'Pricing', esPath: '/precios' }, { label: 'Demo', esPath: '/demo' }],
  },
  it: {
    home: 'Home',
    description: (label) => `${label} di Winerim: software IA per carte vini per ristoranti, hotel e gruppi che hanno bisogno di raccomandazioni, abbinamenti, stock, pricing e analytics.`,
    subtitle: (label) => `${label} per team di ristorazione che vogliono vendere piu vino con dati migliori e un servizio piu chiaro.`,
    sections: (label) => [
      { heading: 'Cosa copre questa pagina', content: `${label} spiega come Winerim collega carta vini, raccomandazioni, formazione del personale, stock e margini.` },
      { heading: 'Perche conta', content: 'La vendita del vino dipende da raccomandazioni chiare, disponibilita aggiornata, personale sicuro e decisioni di prezzo basate sui dati.' },
      { heading: 'Come aiuta Winerim', content: 'Winerim combina carta vini digitale, raccomandazioni IA, abbinamenti, intelligence di cantina e analytics in una piattaforma operativa.' },
    ],
    faqs: (label) => [{ q: `${label} e disponibile in Winerim?`, a: `Si. ${label} fa parte della piattaforma Winerim e si collega a carta vini, raccomandazioni, stock e analytics.` }],
    links: [{ label: 'Prodotto', esPath: '/software-carta-de-vinos' }, { label: 'Funzionalita', esPath: '/funcionalidades' }, { label: 'Prezzi', esPath: '/precios' }, { label: 'Demo', esPath: '/demo' }],
  },
  fr: {
    home: 'Accueil',
    description: (label) => `${label} de Winerim : logiciel IA pour cartes des vins destine aux restaurants, hotels et groupes qui veulent recommandations, accords, stock, pricing et analytics.`,
    subtitle: (label) => `${label} pour les equipes de restauration qui veulent vendre plus de vin avec de meilleures donnees et un service plus clair.`,
    sections: (label) => [
      { heading: 'Ce que couvre cette page', content: `${label} explique comment Winerim relie carte des vins, recommandations, formation, stock et marge.` },
      { heading: 'Pourquoi c est important', content: 'La vente du vin depend de recommandations claires, d un stock a jour, d equipes confiantes et de decisions de prix fondees sur les donnees.' },
      { heading: 'Comment Winerim aide', content: 'Winerim combine carte des vins digitale, recommandations IA, accords mets-vins, intelligence de cave et analytics dans une plateforme operationnelle.' },
    ],
    faqs: (label) => [{ q: `${label} est-il disponible dans Winerim ?`, a: `Oui. ${label} fait partie de la plateforme Winerim et se connecte a la carte des vins, aux recommandations, au stock et aux analytics.` }],
    links: [{ label: 'Produit', esPath: '/software-carta-de-vinos' }, { label: 'Fonctionnalites', esPath: '/funcionalidades' }, { label: 'Tarifs', esPath: '/precios' }, { label: 'Demo', esPath: '/demo' }],
  },
  de: {
    home: 'Startseite',
    description: (label) => `${label} von Winerim: KI-Software fuer Weinkarten in Restaurants, Hotels und Gruppen mit Empfehlungen, Pairing, Bestand, Pricing und Analytics.`,
    subtitle: (label) => `${label} fuer Gastronomieteams, die mit besseren Daten und klareren Serviceablaeufen mehr Wein verkaufen wollen.`,
    sections: (label) => [
      { heading: 'Worum es auf dieser Seite geht', content: `${label} zeigt, wie Winerim Weinkarte, Empfehlungen, Teamschulung, Bestand und Marge verbindet.` },
      { heading: 'Warum das wichtig ist', content: 'Weinverkauf braucht klare Empfehlungen, aktuellen Bestand, sichere Serviceteams und datenbasierte Preisentscheidungen.' },
      { heading: 'Wie Winerim hilft', content: 'Winerim kombiniert digitale Weinkarte, KI-Empfehlungen, Food Pairing, Kellerintelligenz und Analytics in einer operativen Plattform.' },
    ],
    faqs: (label) => [{ q: `Ist ${label} in Winerim verfuegbar?`, a: `Ja. ${label} ist Teil der Winerim-Plattform und verbindet Weinkarte, Empfehlungen, Bestand und Analytics.` }],
    links: [{ label: 'Produkt', esPath: '/software-carta-de-vinos' }, { label: 'Funktionen', esPath: '/funcionalidades' }, { label: 'Preise', esPath: '/precios' }, { label: 'Demo', esPath: '/demo' }],
  },
  pt: {
    home: 'Inicio',
    description: (label) => `${label} da Winerim: software de IA para cartas de vinho em restaurantes, hoteis e grupos com recomendacoes, harmonizacoes, stock, pricing e analytics.`,
    subtitle: (label) => `${label} para equipas de restauracao que querem vender mais vinho com melhores dados e processos de servico mais claros.`,
    sections: (label) => [
      { heading: 'O que esta pagina cobre', content: `${label} explica como a Winerim liga carta de vinhos, recomendacoes, formacao da equipa, stock e margem.` },
      { heading: 'Porque importa', content: 'A venda de vinho depende de recomendacoes claras, stock actualizado, equipa confiante e decisoes de preco baseadas em dados.' },
      { heading: 'Como a Winerim ajuda', content: 'A Winerim combina carta de vinhos digital, recomendacoes IA, harmonizacoes, inteligencia de cave e analytics numa plataforma operacional.' },
    ],
    faqs: (label) => [{ q: `${label} esta disponivel na Winerim?`, a: `Sim. ${label} faz parte da plataforma Winerim e liga-se a carta de vinhos, recomendacoes, stock e analytics.` }],
    links: [{ label: 'Produto', esPath: '/software-carta-de-vinos' }, { label: 'Funcionalidades', esPath: '/funcionalidades' }, { label: 'Precos', esPath: '/precios' }, { label: 'Demo', esPath: '/demo' }],
  },
};

function localizedStaticPageOverride(lang: WineLibraryLang, esPath: string, label: string, canonical: string): Partial<PageContent> & { title?: string; description?: string } | null {
  if (esPath === '/aprender-vino' && lang !== 'es') {
    const copies: Record<StaticLocalizedLang, Partial<PageContent> & { title: string; description: string }> = {
      en: {
        title: 'Learn Wine from Scratch for Restaurants | Winerim',
        description: 'Practical wine learning path for restaurant teams: bottle basics, tasting, grapes, regions, styles, pairings, service and wine-list decisions.',
        h1: 'Learn wine from scratch and use it to sell better on the floor',
        subtitle: 'A clear path for teams to understand a bottle, describe wine without jargon, recommend with confidence and connect knowledge with margin, rotation and guest experience.',
        intro: 'The Wine Library is the structured reference database. Learn Wine is the guided path: what to study first, in which order and how to apply it during service.',
        sections: [
          { heading: 'Understand the bottle', content: 'Start with label, origin, grape, vintage, ageing, style and price so the team can explain why a wine belongs on the list.' },
          { heading: 'Taste and describe without jargon', content: 'Translate aroma, acidity, body, tannin, sweetness, alcohol and finish into simple service language guests understand.' },
          { heading: 'Connect grapes, regions and styles', content: 'Use the Wine Library to understand the references that appear most often on restaurant lists and the role each one plays.' },
          { heading: 'Recommend by food', content: 'Turn wine knowledge into practical pairings for fish, meat, rice, Asian cuisine, cheese, desserts and signature dishes.' },
          { heading: 'Serve and decide better', content: 'Temperature, glassware, pour size, by-the-glass strategy, margin, rotation and monthly review make learning operational.' },
        ],
        faqs: [
          { q: 'Does Learn Wine replace the Wine Library?', a: 'No. The Library is the database of grapes, regions, styles, pairings and glossary. Learn Wine is the guided path for using it on the floor.' },
          { q: 'Is it for beginners?', a: 'Yes. It is built for teams that need to recommend clearly and confidently without sounding like advanced sommeliers.' },
        ],
        breadcrumbs: [{ name: 'Home', url: `${SITE}/en` }, { name: label, url: canonical }],
        internalLinks: [
          { label: 'Wine Library', url: '/en/wine-library' },
          { label: 'Wine glossary', url: '/en/wine-library/glossary' },
          { label: 'Grapes', url: '/en/wine-library/grapes' },
          { label: 'Pairings', url: '/en/wine-library/pairings' },
          { label: 'Free wine-list analysis', url: '/en/wine-list-analysis' },
        ],
      },
      it: {
        title: 'Imparare il Vino da Zero per Ristoranti | Winerim',
        description: 'Percorso pratico per imparare il vino: bottiglia, degustazione, vitigni, regioni, stili, abbinamenti, servizio e decisioni di carta.',
        h1: 'Imparare il vino da zero e usarlo per vendere meglio in sala',
        subtitle: 'Un percorso ordinato per capire una bottiglia, descrivere un vino senza gergo, consigliare con sicurezza e collegare conoscenza, margine, rotazione ed esperienza cliente.',
        intro: 'La Biblioteca del vino è la base di riferimento. Imparare il vino è il percorso guidato: cosa studiare prima, in quale ordine e come applicarlo nel servizio.',
        sections: [
          { heading: 'Capire la bottiglia', content: 'Etichetta, origine, vitigno, annata, affinamento, stile e prezzo aiutano il team a spiegare perché una referenza è in carta.' },
          { heading: 'Degustare e descrivere senza gergo', content: 'Aroma, acidità, corpo, tannino, dolcezza, alcol e finale diventano linguaggio semplice da sala.' },
          { heading: 'Collegare vitigni, regioni e stili', content: 'La Biblioteca aiuta a capire le referenze più frequenti nelle carte dei ristoranti e il loro ruolo commerciale.' },
          { heading: 'Consigliare con il cibo', content: 'Il sapere deve diventare abbinamenti pratici per pesce, carne, riso, cucina asiatica, formaggi, dessert e piatti della casa.' },
          { heading: 'Servire e decidere meglio', content: 'Temperatura, calice, dosi, vino al calice, margine, rotazione e revisione mensile rendono operativo l apprendimento.' },
        ],
        faqs: [
          { q: 'Sostituisce la Biblioteca del vino?', a: 'No. La Biblioteca è la base dati di vitigni, regioni, stili, abbinamenti e glossario. Imparare il vino è il percorso guidato per usarla in sala.' },
          { q: 'È pensato per principianti?', a: 'Sì. È pensato per team che devono consigliare meglio e con sicurezza, senza parlare come sommelier avanzati.' },
        ],
        breadcrumbs: [{ name: 'Home', url: `${SITE}/it` }, { name: label, url: canonical }],
        internalLinks: [
          { label: 'Biblioteca del vino', url: '/it/biblioteca-vino' },
          { label: 'Glossario', url: '/it/biblioteca-vino/glossario' },
          { label: 'Vitigni', url: '/it/biblioteca-vino/vitigni' },
          { label: 'Abbinamenti', url: '/it/biblioteca-vino/abbinamenti' },
          { label: 'Analisi carta vini', url: '/it/analisi-carta' },
        ],
      },
      fr: {
        title: 'Apprendre le Vin depuis Zéro pour Restaurants | Winerim',
        description: 'Parcours pratique pour apprendre le vin : bouteille, dégustation, cépages, régions, styles, accords, service et décisions de carte.',
        h1: 'Apprendre le vin depuis zéro et mieux vendre en salle',
        subtitle: 'Un parcours clair pour comprendre une bouteille, décrire un vin sans jargon, recommander avec confiance et relier connaissance, marge, rotation et expérience client.',
        intro: 'La Bibliothèque du vin est la base de référence. Apprendre le vin est le parcours guidé : quoi étudier d abord, dans quel ordre et comment l appliquer en salle.',
        sections: [
          { heading: 'Comprendre la bouteille', content: 'Étiquette, origine, cépage, millésime, élevage, style et prix aident l équipe à expliquer pourquoi un vin est à la carte.' },
          { heading: 'Déguster et décrire sans jargon', content: 'Arômes, acidité, corps, tanin, sucrosité, alcool et finale deviennent un langage simple pour le service.' },
          { heading: 'Relier cépages, régions et styles', content: 'La Bibliothèque aide à comprendre les références les plus fréquentes en restauration et leur rôle commercial.' },
          { heading: 'Recommander avec les plats', content: 'Le savoir doit devenir accords pratiques pour poisson, viande, riz, cuisine asiatique, fromages, desserts et plats signature.' },
          { heading: 'Servir et mieux décider', content: 'Température, verre, dose, vin au verre, marge, rotation et revue mensuelle rendent l apprentissage opérationnel.' },
        ],
        faqs: [
          { q: 'Cela remplace-t-il la Bibliothèque du vin ?', a: 'Non. La Bibliothèque est la base de données des cépages, régions, styles, accords et glossaire. Apprendre le vin est le parcours guidé pour l utiliser en salle.' },
          { q: 'Est-ce pensé pour débutants ?', a: 'Oui. C est conçu pour des équipes qui doivent recommander clairement et avec confiance.' },
        ],
        breadcrumbs: [{ name: 'Accueil', url: `${SITE}/fr` }, { name: label, url: canonical }],
        internalLinks: [
          { label: 'Bibliothèque du vin', url: '/fr/bibliotheque-vin' },
          { label: 'Glossaire', url: '/fr/bibliotheque-vin/glossaire' },
          { label: 'Cépages', url: '/fr/bibliotheque-vin/cepages' },
          { label: 'Accords', url: '/fr/bibliotheque-vin/accords' },
          { label: 'Analyse de carte', url: '/fr/analyse-carte' },
        ],
      },
      de: {
        title: 'Wein Lernen von Grund auf für Restaurants | Winerim',
        description: 'Praktischer Lernpfad für Restaurantteams: Flasche, Verkostung, Rebsorten, Regionen, Stile, Pairings, Service und Weinkartenentscheidungen.',
        h1: 'Wein von Grund auf lernen und im Service besser verkaufen',
        subtitle: 'Ein klarer Pfad, damit Teams eine Flasche verstehen, Wein ohne Fachjargon beschreiben, sicher empfehlen und Wissen mit Marge, Rotation und Gästeerlebnis verbinden.',
        intro: 'Die Weinbibliothek ist die strukturierte Wissensbasis. Wein lernen ist der geführte Pfad: was zuerst lernen, in welcher Reihenfolge und wie es im Service genutzt wird.',
        sections: [
          { heading: 'Die Flasche verstehen', content: 'Etikett, Herkunft, Rebsorte, Jahrgang, Ausbau, Stil und Preis helfen dem Team zu erklären, warum ein Wein auf der Karte steht.' },
          { heading: 'Verkosten und ohne Fachjargon beschreiben', content: 'Aroma, Säure, Körper, Tannin, Süße, Alkohol und Abgang werden in einfache Servicesprache übersetzt.' },
          { heading: 'Rebsorten, Regionen und Stile verbinden', content: 'Die Weinbibliothek hilft, häufige Restaurantreferenzen und ihre kommerzielle Funktion zu verstehen.' },
          { heading: 'Zum Essen empfehlen', content: 'Wissen wird zu praktischen Pairings für Fisch, Fleisch, Reisgerichte, asiatische Küche, Käse, Desserts und Signature-Gerichte.' },
          { heading: 'Besser servieren und entscheiden', content: 'Temperatur, Glas, Ausschankmenge, Glaswein, Marge, Rotation und Monatsreview machen Lernen operativ.' },
        ],
        faqs: [
          { q: 'Ersetzt das die Weinbibliothek?', a: 'Nein. Die Bibliothek ist die Datenbasis für Rebsorten, Regionen, Stile, Pairings und Glossar. Wein lernen ist der geführte Pfad für den Service.' },
          { q: 'Ist es für Anfänger gedacht?', a: 'Ja. Es ist für Teams gedacht, die klar und sicher empfehlen sollen.' },
        ],
        breadcrumbs: [{ name: 'Startseite', url: `${SITE}/de` }, { name: label, url: canonical }],
        internalLinks: [
          { label: 'Weinbibliothek', url: '/de/weinbibliothek' },
          { label: 'Glossar', url: '/de/weinbibliothek/glossar' },
          { label: 'Rebsorten', url: '/de/weinbibliothek/rebsorten' },
          { label: 'Pairings', url: '/de/weinbibliothek/weinbegleitung' },
          { label: 'Weinkartenanalyse', url: '/de/weinkarten-analyse' },
        ],
      },
      pt: {
        title: 'Aprender Vinho do Zero para Restaurantes | Winerim',
        description: 'Percurso prático para aprender vinho: garrafa, prova, castas, regiões, estilos, harmonizações, serviço e decisões de carta.',
        h1: 'Aprender vinho do zero e vender melhor na sala',
        subtitle: 'Um percurso claro para a equipa entender uma garrafa, descrever vinho sem jargão, recomendar com segurança e ligar conhecimento a margem, rotação e experiência do cliente.',
        intro: 'A Biblioteca do vinho é a base de referência. Aprender vinho é o percurso guiado: o que estudar primeiro, em que ordem e como aplicar no serviço.',
        sections: [
          { heading: 'Entender a garrafa', content: 'Rótulo, origem, casta, ano, estágio, estilo e preço ajudam a equipa a explicar porque um vinho está na carta.' },
          { heading: 'Provar e descrever sem jargão', content: 'Aroma, acidez, corpo, tanino, doçura, álcool e final tornam-se linguagem simples de sala.' },
          { heading: 'Ligar castas, regiões e estilos', content: 'A Biblioteca ajuda a entender as referências mais frequentes em cartas de restaurante e o seu papel comercial.' },
          { heading: 'Recomendar com comida', content: 'O conhecimento deve tornar-se harmonizações práticas para peixe, carne, arroz, cozinha asiática, queijos, sobremesas e pratos da casa.' },
          { heading: 'Servir e decidir melhor', content: 'Temperatura, copo, dose, vinho a copo, margem, rotação e revisão mensal tornam a aprendizagem operacional.' },
        ],
        faqs: [
          { q: 'Isto substitui a Biblioteca do vinho?', a: 'Não. A Biblioteca é a base de dados de castas, regiões, estilos, harmonizações e glossário. Aprender vinho é o percurso guiado para usar essa base na sala.' },
          { q: 'É pensado para principiantes?', a: 'Sim. É pensado para equipas que precisam de recomendar melhor e com segurança.' },
        ],
        breadcrumbs: [{ name: 'Inicio', url: `${SITE}/pt` }, { name: label, url: canonical }],
        internalLinks: [
          { label: 'Biblioteca do vinho', url: '/pt/biblioteca-vinho' },
          { label: 'Glossário', url: '/pt/biblioteca-vinho/glossario' },
          { label: 'Castas', url: '/pt/biblioteca-vinho/castas' },
          { label: 'Harmonizações', url: '/pt/biblioteca-vinho/harmonizacoes' },
          { label: 'Análise de carta', url: '/pt/analise-carta' },
        ],
      },
    };

    return copies[lang as StaticLocalizedLang] || null;
  }

  if (esPath === '/barometro-cartas-vino-2026' && lang !== 'es') {
    const copies: Record<StaticLocalizedLang, Partial<PageContent> & { title: string; description: string }> = {
      en: {
        title: 'Winerim Wine List Barometer 2026 | Winerim',
        description: 'Winerim report on restaurant wine-list performance: methodology, measured variables, margin patterns and benchmarks by segment.',
        h1: 'Winerim wine list barometer',
        subtitle: 'Aggregated and anonymised data to understand where wine lists lose margin, which opportunities repeat and how to compare a restaurant with defensible references.',
        intro: 'The Winerim Barometer is a living report. It starts with methodology, variables and observable patterns, then adds numerical cuts by country, vertical and list type when sample size and anonymisation rules are strong enough.',
        sections: [
          { heading: 'Methodology and anonymisation', content: 'The analysis works with lists, references, prices, by-the-glass formats, styles, regions and structural signals. Names of restaurants, hotels, groups and clients are not published.' },
          { heading: 'Measured variables', content: 'Winerim measures reference count, price distribution, by-the-glass weight, regions, grapes, styles, pairings and, when available, sales, stock, margin and rotation by reference.' },
          { heading: 'Margin patterns', content: 'The Barometer looks for invisible margin, underused by-the-glass offers, cannibalisation between similar references, large lists without clear function and missing monthly review cycles.' },
          { heading: 'Priority segments', content: 'The first publishable cuts should cover fine dining restaurants, hotels, restaurant groups and restaurants without sommeliers because each needs a different benchmark.' },
        ],
        faqs: [
          { q: 'Does the Barometer publish client data?', a: 'No. It is designed for aggregated and anonymised data, without names, full lists or sensitive metrics from specific clients.' },
          { q: 'Can I compare my list with the Barometer?', a: 'Yes. Submit your list for the free analysis and use the benchmark as a framework for size, price, glass offer, styles and opportunities.' },
        ],
        breadcrumbs: [{ name: 'Home', url: `${SITE}/en` }, { name: 'Guides and resources', url: `${SITE}/en/guides` }, { name: label, url: canonical }],
        internalLinks: [
          { label: 'Free wine-list analysis', url: '/en/wine-list-analysis' },
          { label: 'Wine List Benchmark', url: '/en/wine-list-benchmark' },
          { label: 'Benchmarks and playbooks', url: '/en/benchmarks-playbooks' },
          { label: 'Winerim comparisons', url: '/en/comparisons' },
        ],
      },
      it: {
        title: 'Barometro Winerim 2026 delle Carte dei Vini | Winerim',
        description: 'Report Winerim su performance delle carte dei vini: metodologia, variabili misurate, pattern di margine e benchmark per segmento.',
        h1: 'Barometro Winerim delle carte dei vini',
        subtitle: 'Dati aggregati e anonimizzati per capire dove le carte perdono margine, quali opportunità si ripetono e come confrontare un ristorante con riferimenti difendibili.',
        intro: 'Il Barometro Winerim è un report vivo: prima metodologia, variabili e pattern osservabili; poi tagli numerici per paese, verticale e tipo di carta quando campione e anonimato saranno solidi.',
        sections: [
          { heading: 'Metodologia e anonimizzazione', content: 'L analisi lavora con carte, referenze, prezzi, formati al calice, stili, regioni e segnali di struttura. Non vengono pubblicati nomi di clienti o metriche sensibili.' },
          { heading: 'Variabili misurate', content: 'Winerim misura numero di referenze, distribuzione prezzi, peso del calice, regioni, vitigni, stili, abbinamenti e, quando disponibili, vendite, stock, margine e rotazione.' },
          { heading: 'Pattern di margine', content: 'Il Barometro cerca margine invisibile, calice sottoutilizzato, cannibalizzazione tra referenze simili, carte grandi senza funzione e assenza di revisione mensile.' },
          { heading: 'Segmenti prioritari', content: 'I primi tagli dovrebbero coprire ristoranti gastronomici, hotel, gruppi e locali senza sommelier, perché ogni verticale richiede benchmark diversi.' },
        ],
        faqs: [
          { q: 'Il Barometro pubblica dati dei clienti?', a: 'No. Usa dati aggregati e anonimizzati, senza nomi, carte complete o metriche sensibili di clienti specifici.' },
          { q: 'Posso confrontare la mia carta?', a: 'Si. Invia la carta all analisi gratuita e usa il benchmark come quadro per dimensione, prezzo, calice, stili e opportunità.' },
        ],
        breadcrumbs: [{ name: 'Home', url: `${SITE}/it` }, { name: 'Guide e risorse', url: `${SITE}/it/guide` }, { name: label, url: canonical }],
        internalLinks: [
          { label: 'Analisi gratuita carta vini', url: '/it/analisi-carta' },
          { label: 'Wine List Benchmark', url: '/it/benchmark-carta-vini' },
          { label: 'Benchmark e playbook', url: '/it/benchmarks-playbooks' },
          { label: 'Confronti Winerim', url: '/it/confronti' },
        ],
      },
      fr: {
        title: 'Baromètre Winerim 2026 des Cartes des Vins | Winerim',
        description: 'Rapport Winerim sur la performance des cartes des vins : méthodologie, variables mesurées, marge et benchmarks par segment.',
        h1: 'Baromètre Winerim des cartes des vins',
        subtitle: 'Données agrégées et anonymisées pour comprendre où les cartes perdent de la marge, quelles opportunités se répètent et comment comparer un restaurant.',
        intro: 'Le Baromètre Winerim est un rapport vivant : méthodologie, variables et motifs observables d abord, puis chiffres par pays, vertical et type de carte quand l échantillon est suffisant.',
        sections: [
          { heading: 'Méthodologie et anonymisation', content: 'L analyse travaille avec cartes, références, prix, formats au verre, styles, régions et signaux de structure. Les noms et données sensibles ne sont pas publiés.' },
          { heading: 'Variables mesurées', content: 'Winerim mesure nombre de références, distribution de prix, poids du vin au verre, régions, cépages, styles, accords et, si disponible, ventes, stock, marge et rotation.' },
          { heading: 'Motifs de marge', content: 'Le Baromètre recherche marge invisible, vin au verre sous exploité, cannibalisation entre références proches, grandes cartes sans fonction claire et absence de cycle mensuel.' },
          { heading: 'Segments prioritaires', content: 'Les premières coupes devraient couvrir restaurants gastronomiques, hôtels, groupes et restaurants sans sommelier, car chaque vertical demande un benchmark distinct.' },
        ],
        faqs: [
          { q: 'Le Baromètre publie-t-il des données clients ?', a: 'Non. Il utilise des données agrégées et anonymisées, sans noms, cartes complètes ni métriques sensibles de clients précis.' },
          { q: 'Puis-je comparer ma carte ?', a: 'Oui. Envoyez la carte pour l analyse gratuite puis utilisez le benchmark comme cadre pour taille, prix, verre, styles et opportunités.' },
        ],
        breadcrumbs: [{ name: 'Accueil', url: `${SITE}/fr` }, { name: 'Guides et ressources', url: `${SITE}/fr/guides` }, { name: label, url: canonical }],
        internalLinks: [
          { label: 'Analyse gratuite de carte', url: '/fr/analyse-carte' },
          { label: 'Wine List Benchmark', url: '/fr/benchmark-carte-vins' },
          { label: 'Benchmarks et playbooks', url: '/fr/benchmarks-playbooks' },
          { label: 'Comparatifs Winerim', url: '/fr/comparatifs' },
        ],
      },
      de: {
        title: 'Winerim Weinkarten-Barometer 2026 | Winerim',
        description: 'Winerim-Bericht zur Performance von Weinkarten: Methodik, Variablen, Margenmuster und Benchmarks nach Segment.',
        h1: 'Winerim Weinkarten-Barometer',
        subtitle: 'Aggregierte und anonymisierte Daten, um zu verstehen, wo Weinkarten Marge verlieren, welche Chancen sich wiederholen und wie ein Restaurant vergleichbar wird.',
        intro: 'Das Winerim Barometer ist ein Live-Bericht: zuerst Methodik, Variablen und beobachtbare Muster, danach Zahlen nach Land, Vertikal und Kartentyp, wenn Stichprobe und Anonymisierung ausreichen.',
        sections: [
          { heading: 'Methodik und Anonymisierung', content: 'Die Analyse arbeitet mit Karten, Referenzen, Preisen, Glasformaten, Stilen, Regionen und Struktursignalen. Namen und sensible Kundendaten werden nicht veröffentlicht.' },
          { heading: 'Gemessene Variablen', content: 'Winerim misst Referenzanzahl, Preisverteilung, Glasweinanteil, Regionen, Rebsorten, Stile, Pairings und, sofern vorhanden, Verkauf, Bestand, Marge und Rotation.' },
          { heading: 'Margenmuster', content: 'Das Barometer sucht nach unsichtbarer Marge, untergenutztem Glaswein, Kannibalisierung ähnlicher Referenzen, großen Karten ohne klare Funktion und fehlendem Monatszyklus.' },
          { heading: 'Priorisierte Segmente', content: 'Erste Schnitte sollten Fine Dining, Hotels, Restaurantgruppen und Restaurants ohne Sommelier abdecken, weil jedes Segment andere Benchmarks braucht.' },
        ],
        faqs: [
          { q: 'Veröffentlicht das Barometer Kundendaten?', a: 'Nein. Es nutzt aggregierte und anonymisierte Daten, ohne Namen, vollständige Karten oder sensible Kennzahlen einzelner Kunden.' },
          { q: 'Kann ich meine Karte vergleichen?', a: 'Ja. Senden Sie Ihre Karte zur kostenlosen Analyse und nutzen Sie den Benchmark als Rahmen für Größe, Preis, Glasangebot, Stile und Chancen.' },
        ],
        breadcrumbs: [{ name: 'Startseite', url: `${SITE}/de` }, { name: 'Ratgeber und Ressourcen', url: `${SITE}/de/ratgeber` }, { name: label, url: canonical }],
        internalLinks: [
          { label: 'Kostenlose Weinkartenanalyse', url: '/de/weinkarten-analyse' },
          { label: 'Wine List Benchmark', url: '/de/weinkarten-benchmark' },
          { label: 'Benchmarks und Playbooks', url: '/de/benchmarks-playbooks' },
          { label: 'Winerim Vergleiche', url: '/de/vergleiche' },
        ],
      },
      pt: {
        title: 'Barómetro Winerim 2026 de Cartas de Vinhos | Winerim',
        description: 'Relatório Winerim sobre desempenho de cartas de vinhos: metodologia, variáveis medidas, padrões de margem e benchmarks por segmento.',
        h1: 'Barómetro Winerim de cartas de vinhos',
        subtitle: 'Dados agregados e anonimizados para perceber onde as cartas perdem margem, que oportunidades se repetem e como comparar um restaurante com referências defensáveis.',
        intro: 'O Barómetro Winerim é um relatório vivo: primeiro metodologia, variáveis e padrões observáveis; depois cortes numéricos por país, vertical e tipo de carta quando a amostra for suficiente.',
        sections: [
          { heading: 'Metodologia e anonimização', content: 'A análise trabalha com cartas, referências, preços, formatos a copo, estilos, regiões e sinais de estrutura. Nomes e dados sensíveis não são publicados.' },
          { heading: 'Variáveis medidas', content: 'A Winerim mede número de referências, distribuição de preços, peso do vinho a copo, regiões, castas, estilos, harmonizações e, quando disponível, vendas, stock, margem e rotação.' },
          { heading: 'Padrões de margem', content: 'O Barómetro procura margem invisível, vinho a copo subutilizado, canibalização entre referências semelhantes, cartas grandes sem função clara e falta de ciclo mensal.' },
          { heading: 'Segmentos prioritários', content: 'Os primeiros cortes devem cobrir restaurantes gastronómicos, hotéis, grupos e restaurantes sem sommelier, porque cada vertical precisa de benchmark próprio.' },
        ],
        faqs: [
          { q: 'O Barómetro publica dados de clientes?', a: 'Não. Usa dados agregados e anonimizados, sem nomes, cartas completas ou métricas sensíveis de clientes específicos.' },
          { q: 'Posso comparar a minha carta?', a: 'Sim. Envie a carta para análise gratuita e use o benchmark como enquadramento para tamanho, preço, copo, estilos e oportunidades.' },
        ],
        breadcrumbs: [{ name: 'Inicio', url: `${SITE}/pt` }, { name: 'Guias e recursos', url: `${SITE}/pt/guias` }, { name: label, url: canonical }],
        internalLinks: [
          { label: 'Análise gratuita de carta', url: '/pt/analise-carta' },
          { label: 'Wine List Benchmark', url: '/pt/benchmark-carta-vinhos' },
          { label: 'Benchmarks e playbooks', url: '/pt/benchmarks-playbooks' },
          { label: 'Comparativos Winerim', url: '/pt/comparativos' },
        ],
      },
    };

    return copies[lang as StaticLocalizedLang] || null;
  }

  if (lang === 'it' && esPath === '/precios') {
    return {
      title: 'Prezzi Winerim | Software carta vini per ristoranti',
      description: 'Scopri quale piano Winerim si adatta al tuo ristorante, hotel o gruppo. Carta vini digitale, analytics, pricing, stock, integrazioni e supporto.',
      h1: 'Prezzi Winerim',
      subtitle: 'Piani per ristoranti, hotel e gruppi che vogliono vendere più vino, migliorare margini e gestire la carta con dati reali.',
      intro: 'Il prezzo dipende dal numero di referenze, locali e livello di integrazione richiesto. L’obiettivo non è solo pubblicare una carta digitale, ma trasformarla in uno strumento di vendita e decisione.',
      sections: [
        { heading: 'Piani per ogni operazione', content: 'Starter digitalizza la carta e migliora la presentazione. Pro aggiunge analytics, pricing, raccomandazioni e controllo della rotazione. Enterprise centralizza multi-locale, integrazioni POS/PMS, API e reporting direzionale.' },
        { heading: 'Cosa cambia con Winerim', content: 'Winerim aiuta a migliorare ticket medio del vino, identificare stock fermo, ottimizzare prezzi, formare il team e misurare l’impatto delle decisioni sulla carta.' },
        { heading: 'Come scegliere il piano', content: 'Un ristorante indipendente può iniziare con Starter o Pro. Un gastronomico, wine bar o hotel richiede Pro o Enterprise. Un gruppo multi-locale dovrebbe partire da Enterprise per governance e benchmarking.' },
      ],
      faqs: [
        { q: 'Come si calcola il prezzo di Winerim?', a: 'Dipende da referenze, locali, moduli e integrazioni. La proposta viene adattata al tipo di ristorante, hotel o gruppo.' },
        { q: 'Quale piano serve a un gruppo multi-locale?', a: 'Di solito Enterprise, perché include governance centralizzata, benchmark tra locali, integrazioni e reporting.' },
      ],
      breadcrumbs: [
        { name: 'Home', url: `${SITE}/it` },
        { name: label, url: canonical },
      ],
      internalLinks: [
        { label: 'Prodotto', url: '/it/software-carta-vini' },
        { label: 'Funzionalità', url: '/it/funzionalita' },
        { label: 'Integrazioni', url: '/it/integrazioni' },
        { label: 'Demo', url: '/it/demo' },
        { label: 'Biblioteca del vino', url: wineLibraryPath(lang, '/biblioteca-vino') },
      ],
    };
  }

  return null;
}

function staticLocalizedPath(lang: WineLibraryLang, esPath: string): string | undefined {
  if (lang === 'es') return esPath;
  return STATIC_LOCALIZED_ROUTES[lang]?.[esPath];
}

function resolveStaticRouteGroup(path: string): { lang: WineLibraryLang; esPath: string } | null {
  if (STATIC_MULTILINGUAL_ES_PATHS.has(path)) return { lang: 'es', esPath: path };

  for (const lang of ['en', 'it', 'fr', 'de', 'pt'] as StaticLocalizedLang[]) {
    for (const [esPath, localized] of Object.entries(STATIC_LOCALIZED_ROUTES[lang])) {
      if (localized === path) return { lang, esPath };
    }
  }

  return null;
}

function staticHreflang(esPath: string): HreflangEntry[] {
  const entries: HreflangEntry[] = [{ lang: 'es', url: `${SITE}${esPath === '/' ? '/' : esPath}` }];

  for (const lang of ['en', 'it', 'fr', 'de', 'pt'] as StaticLocalizedLang[]) {
    const path = staticLocalizedPath(lang, esPath);
    if (path) entries.push({ lang, url: `${SITE}${path}` });
  }

  entries.push({ lang: 'x-default', url: `${SITE}${esPath === '/' ? '/' : esPath}` });
  return entries;
}

function hreflangForPath(path: string): HreflangEntry[] | undefined {
  const group = resolveStaticRouteGroup(path);
  if (group) return staticHreflang(group.esPath);
  return HREFLANG_MAP[path];
}

function renderLocalizedStaticPage(path: string): string | null {
  const group = resolveStaticRouteGroup(path);
  if (!group || group.lang === 'es') return null;

  const source = STATIC_PAGES[group.esPath];
  if (!source) return null;

  const template = LOCALIZED_STATIC_TEMPLATES[group.lang];
  const label = STATIC_PAGE_LABELS[group.esPath]?.[group.lang] || source.content.h1;
  const canonicalPath = staticLocalizedPath(group.lang, group.esPath);
  if (!canonicalPath) return null;

  const canonical = `${SITE}${canonicalPath}`;
  const homePath = `/${group.lang}`;
  const override = localizedStaticPageOverride(group.lang, group.esPath, label, canonical);
  const content: PageContent = {
    h1: override?.h1 || label,
    subtitle: override?.subtitle || template.subtitle(label),
    intro: override?.intro || template.description(label),
    sections: override?.sections || template.sections(label),
    faqs: override?.faqs || template.faqs(label),
    breadcrumbs: override?.breadcrumbs || [
      { name: template.home, url: `${SITE}${homePath}` },
      { name: label, url: canonical },
    ],
    internalLinks: override?.internalLinks || [
      ...template.links
        .map((link) => {
          const localized = staticLocalizedPath(group.lang, link.esPath);
          return localized ? { label: link.label, url: localized } : null;
        })
        .filter((link): link is { label: string; url: string } => Boolean(link)),
      { label: 'Wine library', url: wineLibraryPath(group.lang, '/biblioteca-vino') },
    ],
  };

  return generateHTML(
    {
      ...source.meta,
      title: override?.title || `${label} | Winerim`,
      description: override?.description || template.description(label),
      canonical,
      lang: group.lang,
    },
    content,
    staticHreflang(group.esPath)
  );
}

const WINE_LIBRARY_LOCALIZED_HOME_STATIC_PAGES: Record<string, { meta: PageMeta; content: PageContent }> = {
  '/en/wine-library': {
    meta: { title: 'Wine Library — Grapes, Regions, Styles and Pairings | Winerim', description: 'Explore Winerim’s wine library: grape varieties, wine regions, wine styles, pairings and glossary for hospitality professionals.', canonical: `${SITE}/en/wine-library`, ogImage: OG_IMAGE, lang: 'en', type: 'website', schemaType: 'CollectionPage' },
    content: {
      h1: 'Wine library for hospitality professionals',
      subtitle: 'Structured wine knowledge for floor teams, sommeliers and purchasing managers.',
      sections: [
        { heading: 'Grape varieties', content: 'Guides to key varieties with sensory profile, regions, pairing logic and wine-list role.' },
        { heading: 'Wine regions', content: 'Country and denomination guides with restaurant-focused commercial reading.' },
        { heading: 'Wine styles', content: 'Service, glassware, temperature and pairing expectations by style.' },
        { heading: 'Pairings', content: 'Food and wine pairing principles for confident restaurant recommendations.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Home', url: `${SITE}/en` }, { name: 'Wine Library', url: `${SITE}/en/wine-library` }],
      internalLinks: [{ label: 'Grapes', url: '/en/wine-library/grapes' }, { label: 'Regions', url: '/en/wine-library/regions' }, { label: 'Styles', url: '/en/wine-library/styles' }, { label: 'Pairings', url: '/en/wine-library/pairings' }],
    },
  },
  '/it/biblioteca-vino': {
    meta: { title: 'Biblioteca del Vino — Vitigni, Regioni, Stili e Abbinamenti | Winerim', description: 'Esplora la biblioteca del vino Winerim: vitigni, regioni, stili, abbinamenti e glossario per professionisti della ristorazione.', canonical: `${SITE}/it/biblioteca-vino`, ogImage: OG_IMAGE, lang: 'it', type: 'website', schemaType: 'CollectionPage' },
    content: {
      h1: 'Biblioteca del vino per professionisti della ristorazione',
      subtitle: 'Conoscenza vinicola strutturata per sala, sommelier e responsabili acquisti.',
      sections: [
        { heading: 'Vitigni', content: 'Schede sui principali vitigni con profilo sensoriale, regioni e ruolo in carta.' },
        { heading: 'Regioni vinicole', content: 'Guide per paese e denominazione con lettura commerciale per la ristorazione.' },
        { heading: 'Stili di vino', content: 'Servizio, calice, temperatura e occasioni di vendita per stile.' },
        { heading: 'Abbinamenti', content: 'Principi di abbinamento per raccomandazioni più sicure in sala.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Home', url: `${SITE}/it` }, { name: 'Biblioteca del Vino', url: `${SITE}/it/biblioteca-vino` }],
      internalLinks: [{ label: 'Vitigni', url: '/it/biblioteca-vino/vitigni' }, { label: 'Regioni', url: '/it/biblioteca-vino/regioni' }, { label: 'Stili', url: '/it/biblioteca-vino/stili' }, { label: 'Abbinamenti', url: '/it/biblioteca-vino/abbinamenti' }],
    },
  },
  '/fr/bibliotheque-vin': {
    meta: { title: 'Bibliothèque du Vin — Cépages, Régions, Styles et Accords | Winerim', description: 'Explorez la bibliothèque du vin Winerim: cépages, régions, styles, accords et glossaire pour professionnels de la restauration.', canonical: `${SITE}/fr/bibliotheque-vin`, ogImage: OG_IMAGE, lang: 'fr', type: 'website', schemaType: 'CollectionPage' },
    content: {
      h1: 'Bibliothèque du vin pour professionnels de la restauration',
      subtitle: 'Connaissance du vin structurée pour la salle, les sommeliers et les achats.',
      sections: [
        { heading: 'Cépages', content: 'Guides des principaux cépages avec profil sensoriel, régions et rôle en carte.' },
        { heading: 'Régions viticoles', content: 'Guides par pays et appellation avec lecture commerciale pour la restauration.' },
        { heading: 'Styles de vin', content: 'Service, verrerie, température et attentes d’accord par style.' },
        { heading: 'Accords', content: 'Principes d’accords mets-vins pour mieux recommander en salle.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Accueil', url: `${SITE}/fr` }, { name: 'Bibliothèque du Vin', url: `${SITE}/fr/bibliotheque-vin` }],
      internalLinks: [{ label: 'Cépages', url: '/fr/bibliotheque-vin/cepages' }, { label: 'Régions', url: '/fr/bibliotheque-vin/regions' }, { label: 'Styles', url: '/fr/bibliotheque-vin/styles-de-vin' }, { label: 'Accords', url: '/fr/bibliotheque-vin/accords' }],
    },
  },
  '/de/weinbibliothek': {
    meta: { title: 'Weinbibliothek — Rebsorten, Regionen, Stile und Pairings | Winerim', description: 'Entdecken Sie die Winerim Weinbibliothek: Rebsorten, Weinregionen, Weinstile, Pairings und Glossar für Gastronomieprofis.', canonical: `${SITE}/de/weinbibliothek`, ogImage: OG_IMAGE, lang: 'de', type: 'website', schemaType: 'CollectionPage' },
    content: {
      h1: 'Weinbibliothek für Gastronomieprofis',
      subtitle: 'Strukturiertes Weinwissen für Service, Sommeliers und Einkauf.',
      sections: [
        { heading: 'Rebsorten', content: 'Profile wichtiger Rebsorten mit Sensorik, Regionen, Pairing-Logik und Rolle auf der Weinkarte.' },
        { heading: 'Weinregionen', content: 'Guides nach Ländern und Herkunftsbezeichnungen mit kommerzieller Lesart für Restaurants.' },
        { heading: 'Weinstile', content: 'Service, Glas, Temperatur und Pairing-Erwartung nach Stil.' },
        { heading: 'Pairings', content: 'Prinzipien für sichere Speise- und Weinempfehlungen im Service.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Startseite', url: `${SITE}/de` }, { name: 'Weinbibliothek', url: `${SITE}/de/weinbibliothek` }],
      internalLinks: [{ label: 'Rebsorten', url: '/de/weinbibliothek/rebsorten' }, { label: 'Regionen', url: '/de/weinbibliothek/regionen' }, { label: 'Weinstile', url: '/de/weinbibliothek/weinstile' }, { label: 'Pairings', url: '/de/weinbibliothek/weinbegleitung' }],
    },
  },
  '/pt/biblioteca-vinho': {
    meta: { title: 'Biblioteca do Vinho — Castas, Regiões, Estilos e Harmonizações | Winerim', description: 'Explore a biblioteca do vinho Winerim: castas, regiões, estilos, harmonizações e glossário para profissionais de restauração.', canonical: `${SITE}/pt/biblioteca-vinho`, ogImage: OG_IMAGE, lang: 'pt', type: 'website', schemaType: 'CollectionPage' },
    content: {
      h1: 'Biblioteca do vinho para profissionais de restauração',
      subtitle: 'Conhecimento de vinho estruturado para sala, sommeliers e responsáveis de compras.',
      sections: [
        { heading: 'Castas', content: 'Guias das principais castas com perfil sensorial, regiões, harmonizações e papel na carta.' },
        { heading: 'Regiões vitivinícolas', content: 'Guias por país e denominação com leitura comercial para restauração.' },
        { heading: 'Estilos de vinho', content: 'Serviço, copo, temperatura e expectativa de harmonização por estilo.' },
        { heading: 'Harmonizações', content: 'Princípios de harmonização para recomendações mais seguras em sala.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Início', url: `${SITE}/pt` }, { name: 'Biblioteca do Vinho', url: `${SITE}/pt/biblioteca-vinho` }],
      internalLinks: [{ label: 'Castas', url: '/pt/biblioteca-vinho/castas' }, { label: 'Regiões', url: '/pt/biblioteca-vinho/regioes' }, { label: 'Estilos', url: '/pt/biblioteca-vinho/estilos' }, { label: 'Harmonizações', url: '/pt/biblioteca-vinho/harmonizacoes' }],
    },
  },
};

interface LegalStaticPageSeed {
  path: string;
  lang: WineLibraryLang;
  title: string;
  description: string;
  sections: { heading: string; content: string }[];
}

function makeLegalStaticPage(seed: LegalStaticPageSeed): { meta: PageMeta; content: PageContent } {
  const homePath = seed.lang === 'es' ? '/' : `/${seed.lang}`;
  const demoPath = staticLocalizedPath(seed.lang, '/demo') || '/demo';
  const contactPath = staticLocalizedPath(seed.lang, '/contacto') || '/contacto';

  return {
    meta: {
      title: `${seed.title} | Winerim`,
      description: seed.description,
      canonical: `${SITE}${seed.path}`,
      ogImage: OG_IMAGE,
      lang: seed.lang,
      type: 'website',
      schemaType: 'WebPage',
      robots: 'noindex, follow',
    },
    content: {
      h1: seed.title,
      intro: seed.description,
      sections: seed.sections,
      faqs: [],
      breadcrumbs: [
        { name: seed.lang === 'es' ? 'Inicio' : 'Home', url: `${SITE}${homePath}` },
        { name: seed.title, url: `${SITE}${seed.path}` },
      ],
      internalLinks: [
        { label: 'Winerim', url: homePath },
        { label: 'Demo', url: demoPath },
        { label: 'Contacto', url: contactPath },
      ],
    },
  };
}

const LEGAL_STATIC_PAGES: Record<string, { meta: PageMeta; content: PageContent }> = Object.fromEntries([
  makeLegalStaticPage({
    path: '/privacidad',
    lang: 'es',
    title: 'Política de Privacidad',
    description: 'Política de privacidad de Winerim.',
    sections: [
      { heading: '1. Responsable del tratamiento', content: 'Winerim S.L. es responsable del tratamiento de los datos personales recogidos a través de este sitio web.' },
      { heading: '2. Datos recogidos', content: 'Recogemos los datos que nos proporcionas voluntariamente a través de nuestros formularios de contacto y demo.' },
      { heading: '3. Finalidad', content: 'Los datos se utilizan exclusivamente para gestionar las solicitudes de información, demos y contacto comercial.' },
      { heading: '4. Base legal', content: 'El tratamiento se basa en el consentimiento del interesado al enviar el formulario.' },
      { heading: '5. Derechos', content: 'Puedes ejercer tus derechos de acceso, rectificación y supresión enviando un email a info@winerim.com.' },
      { heading: '6. Cookies', content: 'Este sitio utiliza cookies propias y de terceros para mejorar la experiencia de navegación.' },
      { heading: '7. Conservación', content: 'Los datos se conservarán mientras exista interés mutuo y durante los plazos legalmente establecidos.' },
    ],
  }),
  makeLegalStaticPage({
    path: '/terminos',
    lang: 'es',
    title: 'Términos de Uso',
    description: 'Términos y condiciones de uso de Winerim.',
    sections: [
      { heading: '1. Titularidad', content: 'Este sitio web es propiedad de Winerim S.L. El acceso y uso del sitio implica la aceptación de estos términos.' },
      { heading: '2. Uso del servicio', content: 'El usuario se compromete a utilizar el sitio web y sus servicios de forma lícita.' },
      { heading: '3. Propiedad intelectual', content: 'Todos los contenidos del sitio son propiedad de Winerim o de sus licenciantes.' },
      { heading: '4. Limitación de responsabilidad', content: 'Winerim no se responsabiliza de los daños que puedan derivarse del uso de este sitio web.' },
      { heading: '5. Modificaciones', content: 'Winerim se reserva el derecho de modificar estos términos en cualquier momento.' },
      { heading: '6. Legislación aplicable', content: 'Estos términos se rigen por la legislación española.' },
    ],
  }),
  makeLegalStaticPage({
    path: '/en/privacy',
    lang: 'en',
    title: 'Privacy Policy',
    description: 'Winerim privacy policy.',
    sections: [
      { heading: '1. Data Controller', content: 'Winerim S.L. is the data controller for personal data collected through this website.' },
      { heading: '2. Data Collected', content: 'We collect data you voluntarily provide through our contact and demo forms.' },
      { heading: '3. Purpose', content: 'Data is used exclusively to manage information requests, demos and commercial contact.' },
      { heading: '4. Legal Basis', content: "Processing is based on the data subject's consent when submitting the form." },
      { heading: '5. Rights', content: 'You can exercise your rights of access, rectification and deletion by emailing info@winerim.com.' },
      { heading: '6. Cookies', content: 'This site uses first and third-party cookies to improve the browsing experience.' },
      { heading: '7. Retention', content: 'Data will be retained as long as there is mutual interest and for legally established periods.' },
    ],
  }),
  makeLegalStaticPage({
    path: '/en/terms',
    lang: 'en',
    title: 'Terms of Use',
    description: 'Terms and conditions of use for Winerim.',
    sections: [
      { heading: '1. Ownership', content: 'This website is owned by Winerim S.L. Access and use of the site implies acceptance of these terms.' },
      { heading: '2. Use of Service', content: 'The user agrees to use the website and its services lawfully.' },
      { heading: '3. Intellectual Property', content: 'All content on the site is the property of Winerim or its licensors.' },
      { heading: '4. Limitation of Liability', content: 'Winerim is not responsible for damages that may arise from the use of this website.' },
      { heading: '5. Modifications', content: 'Winerim reserves the right to modify these terms at any time.' },
      { heading: '6. Applicable Law', content: 'These terms are governed by Spanish law.' },
    ],
  }),
  makeLegalStaticPage({
    path: '/it/privacy',
    lang: 'it',
    title: 'Informativa sulla Privacy',
    description: 'Informativa sulla privacy di Winerim.',
    sections: [
      { heading: '1. Titolare del trattamento', content: 'Winerim S.L. è il titolare del trattamento dei dati personali raccolti attraverso questo sito web.' },
      { heading: '2. Dati raccolti', content: 'Raccogliamo i dati che ci fornisci volontariamente attraverso i nostri moduli di contatto e demo.' },
      { heading: '3. Finalità', content: 'I dati vengono utilizzati esclusivamente per gestire le richieste di informazioni, demo e contatti commerciali.' },
      { heading: '4. Base giuridica', content: "Il trattamento si basa sul consenso dell'interessato al momento dell'invio del modulo." },
      { heading: '5. Diritti', content: "Puoi esercitare i tuoi diritti di accesso, rettifica e cancellazione inviando un'email a info@winerim.com." },
      { heading: '6. Cookie', content: "Questo sito utilizza cookie propri e di terze parti per migliorare l'esperienza di navigazione." },
      { heading: '7. Conservazione', content: 'I dati saranno conservati finché esiste un interesse reciproco e per i periodi legalmente stabiliti.' },
    ],
  }),
  makeLegalStaticPage({
    path: '/it/termini',
    lang: 'it',
    title: 'Termini di Utilizzo',
    description: "Termini e condizioni d'uso di Winerim.",
    sections: [
      { heading: '1. Titolarità', content: "Questo sito web è di proprietà di Winerim S.L. L'accesso e l'utilizzo del sito implica l'accettazione di questi termini." },
      { heading: '2. Utilizzo del servizio', content: "L'utente si impegna a utilizzare il sito web e i suoi servizi in modo lecito." },
      { heading: '3. Proprietà intellettuale', content: 'Tutti i contenuti del sito sono di proprietà di Winerim o dei suoi licenzianti.' },
      { heading: '4. Limitazione di responsabilità', content: "Winerim non è responsabile dei danni che possano derivare dall'uso di questo sito web." },
      { heading: '5. Modifiche', content: 'Winerim si riserva il diritto di modificare questi termini in qualsiasi momento.' },
      { heading: '6. Legge applicabile', content: 'Questi termini sono regolati dalla legge spagnola.' },
    ],
  }),
  makeLegalStaticPage({
    path: '/fr/confidentialite',
    lang: 'fr',
    title: 'Politique de Confidentialité',
    description: 'Politique de confidentialité de Winerim.',
    sections: [
      { heading: '1. Responsable du traitement', content: 'Winerim S.L. est responsable du traitement des données personnelles collectées via ce site web.' },
      { heading: '2. Données collectées', content: 'Nous collectons les données que vous nous fournissez volontairement via nos formulaires de contact et de démo.' },
      { heading: '3. Finalité', content: "Les données sont utilisées exclusivement pour gérer les demandes d'information, démos et contacts commerciaux." },
      { heading: '4. Base légale', content: 'Le traitement est basé sur le consentement de la personne concernée lors de la soumission du formulaire.' },
      { heading: '5. Droits', content: "Vous pouvez exercer vos droits d'accès, rectification et suppression en envoyant un email à info@winerim.com." },
      { heading: '6. Cookies', content: "Ce site utilise des cookies propres et tiers pour améliorer l'expérience de navigation." },
      { heading: '7. Conservation', content: "Les données seront conservées tant qu'il existe un intérêt mutuel et pendant les délais légalement établis." },
    ],
  }),
  makeLegalStaticPage({
    path: '/fr/conditions',
    lang: 'fr',
    title: "Conditions d'Utilisation",
    description: "Conditions générales d'utilisation de Winerim.",
    sections: [
      { heading: '1. Propriété', content: "Ce site web est la propriété de Winerim S.L. L'accès et l'utilisation du site impliquent l'acceptation de ces conditions." },
      { heading: '2. Utilisation du service', content: "L'utilisateur s'engage à utiliser le site web et ses services de manière licite." },
      { heading: '3. Propriété intellectuelle', content: 'Tout le contenu du site est la propriété de Winerim ou de ses concédants.' },
      { heading: '4. Limitation de responsabilité', content: "Winerim n'est pas responsable des dommages pouvant résulter de l'utilisation de ce site web." },
      { heading: '5. Modifications', content: 'Winerim se réserve le droit de modifier ces conditions à tout moment.' },
      { heading: '6. Droit applicable', content: 'Ces conditions sont régies par le droit espagnol.' },
    ],
  }),
  makeLegalStaticPage({
    path: '/de/datenschutz',
    lang: 'de',
    title: 'Datenschutzrichtlinie',
    description: 'Datenschutzrichtlinie von Winerim.',
    sections: [
      { heading: '1. Verantwortlicher', content: 'Winerim S.L. ist verantwortlich für die Verarbeitung der über diese Website erhobenen personenbezogenen Daten.' },
      { heading: '2. Erhobene Daten', content: 'Wir erheben Daten, die Sie uns freiwillig über unsere Kontakt- und Demo-Formulare zur Verfügung stellen.' },
      { heading: '3. Zweck', content: 'Die Daten werden ausschließlich zur Bearbeitung von Informationsanfragen, Demos und geschäftlichen Kontakten verwendet.' },
      { heading: '4. Rechtsgrundlage', content: 'Die Verarbeitung basiert auf der Einwilligung der betroffenen Person bei Absendung des Formulars.' },
      { heading: '5. Rechte', content: 'Sie können Ihre Rechte auf Auskunft, Berichtigung und Löschung per E-Mail an info@winerim.com ausüben.' },
      { heading: '6. Cookies', content: 'Diese Website verwendet eigene und Drittanbieter-Cookies zur Verbesserung des Nutzererlebnisses.' },
      { heading: '7. Speicherdauer', content: 'Die Daten werden aufbewahrt, solange ein beiderseitiges Interesse besteht, sowie für die gesetzlich vorgeschriebenen Fristen.' },
    ],
  }),
  makeLegalStaticPage({
    path: '/de/agb',
    lang: 'de',
    title: 'Nutzungsbedingungen',
    description: 'Nutzungsbedingungen von Winerim.',
    sections: [
      { heading: '1. Eigentum', content: 'Diese Website ist Eigentum von Winerim S.L. Der Zugang und die Nutzung der Website setzen die Annahme dieser Bedingungen voraus.' },
      { heading: '2. Nutzung des Dienstes', content: 'Der Nutzer verpflichtet sich, die Website und ihre Dienste rechtmäßig zu nutzen.' },
      { heading: '3. Geistiges Eigentum', content: 'Alle Inhalte der Website sind Eigentum von Winerim oder ihrer Lizenzgeber.' },
      { heading: '4. Haftungsbeschränkung', content: 'Winerim haftet nicht für Schäden, die aus der Nutzung dieser Website entstehen können.' },
      { heading: '5. Änderungen', content: 'Winerim behält sich das Recht vor, diese Bedingungen jederzeit zu ändern.' },
      { heading: '6. Anwendbares Recht', content: 'Diese Bedingungen unterliegen dem spanischen Recht.' },
    ],
  }),
  makeLegalStaticPage({
    path: '/pt/privacidade',
    lang: 'pt',
    title: 'Política de Privacidade',
    description: 'Política de privacidade da Winerim.',
    sections: [
      { heading: '1. Responsável pelo tratamento', content: 'A Winerim S.L. é responsável pelo tratamento dos dados pessoais recolhidos através deste website.' },
      { heading: '2. Dados recolhidos', content: 'Recolhemos os dados que nos fornece voluntariamente através dos nossos formulários de contacto e demo.' },
      { heading: '3. Finalidade', content: 'Os dados são utilizados exclusivamente para gerir pedidos de informação, demos e contacto comercial.' },
      { heading: '4. Base legal', content: 'O tratamento baseia-se no consentimento do titular dos dados ao enviar o formulário.' },
      { heading: '5. Direitos', content: 'Pode exercer os seus direitos de acesso, retificação e eliminação enviando um e-mail para info@winerim.com.' },
      { heading: '6. Cookies', content: 'Este website utiliza cookies próprios e de terceiros para melhorar a experiência de navegação.' },
      { heading: '7. Conservação', content: 'Os dados serão conservados enquanto existir interesse mútuo e durante os prazos legalmente estabelecidos.' },
    ],
  }),
  makeLegalStaticPage({
    path: '/pt/termos',
    lang: 'pt',
    title: 'Termos de Utilização',
    description: 'Termos e condições de utilização da Winerim.',
    sections: [
      { heading: '1. Titularidade', content: 'Este website é propriedade da Winerim S.L. O acesso e utilização do website implica a aceitação destes termos.' },
      { heading: '2. Utilização do serviço', content: 'O utilizador compromete-se a utilizar o website e os seus serviços de forma lícita.' },
      { heading: '3. Propriedade intelectual', content: 'Todos os conteúdos do website são propriedade da Winerim ou dos seus licenciadores.' },
      { heading: '4. Limitação de responsabilidade', content: 'A Winerim não se responsabiliza pelos danos que possam resultar da utilização deste website.' },
      { heading: '5. Alterações', content: 'A Winerim reserva-se o direito de alterar estes termos a qualquer momento.' },
      { heading: '6. Legislação aplicável', content: 'Estes termos regem-se pela legislação espanhola.' },
    ],
  }),
].map((page) => [page.meta.canonical.replace(SITE, '') || '/', page]));

// ── Static page definitions ──
// Each page has full semantic content for bots — independent of React hydration.
const STATIC_PAGES: Record<string, { meta: PageMeta; content: PageContent }> = {
  ...WINE_LIBRARY_LOCALIZED_HOME_STATIC_PAGES,
  ...LEGAL_STATIC_PAGES,
  '/': {
    meta: {
      title: 'Software de IA para Restaurantes — Vende Más Vino | Winerim',
      description: 'Winerim es el software de IA que ayuda a restaurantes a vender más vino, mejorar el ticket medio, optimizar márgenes y controlar la bodega. Carta digital inteligente con recomendaciones, maridajes y analítica.',
      canonical: SITE,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'SoftwareApplication',
    },
    content: {
      h1: 'Convierte tu carta de vinos en ventas, margen y control',
      subtitle: 'Winerim es el software que ayuda a restaurantes a vender más vino, mejorar el ticket medio, optimizar márgenes y controlar la bodega — con inteligencia artificial, sin depender del sommelier.',
      sections: [
        { heading: 'El problema', content: 'La carta de vinos no vende, solo informa. El equipo de sala no tiene tiempo ni conocimiento para recomendar. Hay vinos parados sin rotación. No hay datos claros para tomar decisiones de compra ni pricing.' },
        { heading: 'La solución: 5 herramientas en una', content: 'Winerim transforma tu carta en herramienta de venta (guía al comensal), recomendación (IA + maridajes), gestión (stock y pricing), análisis (KPIs y datos) y formación (el equipo aprende mientras trabaja).' },
        { heading: 'Cómo ayuda a cada equipo', content: 'Equipo de sala: recomienda vino con confianza sin ser sommelier. Dirección: visibilidad sobre ventas, KPIs y margen en tiempo real. Compras: alertas de stock, datos de rotación y análisis de margen por referencia.' },
        { heading: 'Resultados', content: 'Los restaurantes que implementan Winerim pueden experimentar mejoras en ticket medio de vino, rotación de referencias y eficiencia de gestión. El potencial estimado de mejora oscila entre un 15 % y un 25 %, según el contexto del restaurante.' },
        { heading: 'Cómo funciona', content: '1. Envías tu carta actual en cualquier formato. 2. Winerim la digitaliza con fichas, maridajes y recomendaciones. 3. El comensal accede por QR, web o app. 4. Empiezas a vender más vino desde el primer día.' },
        { heading: 'Por qué no es un simple QR o PDF', content: 'Un QR con PDF es estático: no recomienda, no analiza, no se actualiza. Winerim es una plataforma activa con IA que personaliza la experiencia, genera datos de venta y optimiza precios automáticamente.' },
      ],
      faqs: [
        { q: '¿Qué es Winerim?', a: 'Winerim es un software de gestión de cartas de vinos para restaurantes. Combina carta digital interactiva, recomendaciones con IA, maridajes automáticos, analítica de ventas y optimización de precios.' },
        { q: '¿Cómo funciona?', a: 'El restaurante envía su carta. Winerim digitaliza las referencias, genera descripciones y maridajes. El comensal accede por QR o web y recibe recomendaciones inteligentes.' },
        { q: '¿Sustituye al sommelier?', a: 'No. Complementa al equipo de sala con datos y recomendaciones. En restaurantes sin sommelier, actúa como asistente inteligente.' },
        { q: '¿Qué resultados genera?', a: 'Los resultados varían según el restaurante. El potencial estimado de mejora en ticket medio de vino oscila entre un 15 % y un 25 %, según contexto e implementación.' },
        { q: '¿Puedo probarlo gratis?', a: 'Sí. Ofrecemos una demo personalizada gratuita con tu carta real.' },
      ],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }],
      internalLinks: [
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Inteligencia dinámica', url: '/producto/inteligencia-dinamica' },
        { label: 'Precios', url: '/precios' },
        { label: 'Casos de éxito', url: '/casos-exito' },
        { label: 'Herramientas', url: '/herramientas' },
        { label: 'Guías y recursos', url: '/guias-y-recursos' },
        { label: 'Sobre Winerim', url: '/sobre-winerim' },
        { label: 'Blog', url: '/blog' },
        { label: 'Demo gratuita', url: '/demo' },
      ],
    },
  },
  '/software-carta-de-vinos': {
    meta: {
      title: 'Software Carta Inteligente de Vinos para Restaurantes | Winerim',
      description: 'Winerim es el software de carta inteligente de vinos líder para restaurantes. Gestión inteligente, recomendador IA y análisis de rendimiento en una sola plataforma.',
      canonical: `${SITE}/software-carta-de-vinos`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'SoftwareApplication',
    },
    content: {
      h1: 'Software de carta inteligente de vinos para restaurantes',
      subtitle: 'Gestiona, optimiza y potencia tu carta de vinos con inteligencia artificial.',
      sections: [
        { heading: 'Carta inteligente interactiva', content: 'Tu carta de vinos disponible en tablet, móvil o QR. Actualizable en tiempo real, con fichas detalladas, notas de cata y maridajes inteligentes para cada plato.' },
        { heading: 'Recomendador inteligente', content: 'Winerim sugiere el vino perfecto según el plato, las preferencias del comensal y tu stock disponible. Aumenta el ticket medio sin presionar al cliente.' },
        { heading: 'Gestión de bodega', content: 'Control de stock, alertas de rotación, análisis de rendimiento por referencia y optimización automática de precios basada en datos reales.' },
        { heading: 'Analítica de ventas', content: 'Dashboards en tiempo real: ventas por referencia, márgenes por botella, rotación semanal, tendencias estacionales y comparativa entre períodos.' },
      ],
      faqs: [
        { q: '¿Necesito instalar algo?', a: 'No. Winerim funciona 100% en la nube. Solo necesitas un dispositivo con navegador.' },
        { q: '¿Puedo probarlo gratis?', a: 'Sí. Ofrecemos una demo personalizada gratuita para que veas cómo funciona con tu carta.' },
        { q: '¿Se integra con mi TPV?', a: 'Sí. Winerim se integra con los principales sistemas de punto de venta y gestión de restauración.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Software carta de vinos', url: `${SITE}/software-carta-de-vinos` },
      ],
      internalLinks: [
        { label: 'Funcionalidades completas', url: '/funcionalidades' },
        { label: 'Inteligencia dinámica', url: '/producto/inteligencia-dinamica' },
        { label: 'Precios y planes', url: '/precios' },
        { label: 'Casos de éxito', url: '/casos-exito' },
        { label: 'Integraciones', url: '/integraciones' },
        { label: 'Solicitar demo', url: '/demo' },
      ],
    },
  },
  '/funcionalidades': {
    meta: {
      title: 'Funcionalidades | Carta Inteligente de Vinos Winerim',
      description: 'Descubre todas las funcionalidades de Winerim: carta inteligente, recomendador IA, gestión de stock, analytics de ventas y automatizaciones.',
      canonical: `${SITE}/funcionalidades`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Funcionalidades de Winerim',
      subtitle: 'Todo lo que necesitas para gestionar y potenciar tu carta de vinos en una sola plataforma.',
      sections: [
        { heading: 'Carta inteligente interactiva', content: 'Carta de vinos accesible desde tablet, móvil o QR con fichas completas, notas de cata, imágenes y maridajes automáticos.' },
        { heading: 'Recomendador inteligente con IA', content: 'IA que sugiere vinos según el plato, presupuesto y preferencias del comensal. Aumenta el ticket medio de forma natural.' },
        { heading: 'Analytics y rendimiento', content: 'Dashboards en tiempo real: ventas por referencia, márgenes, rotación, tendencias estacionales y comparativas entre períodos.' },
        { heading: 'Gestión de stock y bodega', content: 'Control automático de inventario con alertas de reposición, detección de vinos muertos y optimización de compras.' },
        { heading: 'Maridajes automáticos', content: 'Sugerencias de maridaje generadas por IA para cada plato de tu carta, actualizadas automáticamente al cambiar el menú.' },
        { heading: 'Inteligencia dinámica', content: 'Motor de decisión en tiempo real que ajusta recomendaciones, precios sugeridos y alertas según datos de venta, stock y estacionalidad.' },
        { heading: 'Automatizaciones', content: 'Alertas de stock bajo, informes automáticos de rendimiento, notificaciones de vinos con baja rotación y sugerencias de descatalogación.' },
      ],
      faqs: [
        { q: '¿Cuántas funcionalidades incluye cada plan?', a: 'Todos los planes incluyen carta digital y recomendador. Los planes superiores añaden analytics avanzados, inteligencia dinámica y gestión multi-restaurante.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Funcionalidades', url: `${SITE}/funcionalidades` },
      ],
      internalLinks: [
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Inteligencia dinámica', url: '/producto/inteligencia-dinamica' },
        { label: 'Precios', url: '/precios' },
        { label: 'Demo', url: '/demo' },
        { label: 'Integraciones', url: '/integraciones' },
      ],
    },
  },
  '/precios': {
    meta: {
      title: 'Precios de Winerim | Planes para Restaurantes',
      description: 'Descubre los planes y precios de Winerim. Desde restaurantes independientes hasta grupos de restauración. Prueba gratuita disponible.',
      canonical: `${SITE}/precios`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Planes y precios de Winerim',
      subtitle: 'Encuentra el plan perfecto para tu restaurante. Sin permanencia, sin sorpresas.',
      sections: [
        { heading: 'Plan para restaurantes independientes', content: 'Carta digital con recomendador inteligente, fichas de vino completas y maridajes automáticos. Ideal para restaurantes con hasta 250 referencias.' },
        { heading: 'Plan para grupos y cadenas', content: 'Todo lo anterior más gestión multi-restaurante, analytics avanzados, inteligencia dinámica y soporte prioritario.' },
      ],
      faqs: [
        { q: '¿Hay período de prueba?', a: 'Sí. Ofrecemos una demo personalizada gratuita para que pruebes Winerim con tu carta real antes de decidir.' },
        { q: '¿Hay permanencia?', a: 'No. Puedes cancelar en cualquier momento sin penalización.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Precios', url: `${SITE}/precios` },
      ],
      internalLinks: [
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Demo gratuita', url: '/demo' },
        { label: 'Casos de éxito', url: '/casos-exito' },
      ],
    },
  },
  '/producto/inteligencia-dinamica': {
    meta: {
      title: 'Inteligencia Dinámica | IA para Cartas de Vinos | Winerim',
      description: 'Motor de inteligencia artificial para restaurantes que optimiza recomendaciones, precios y rotación de vinos en tiempo real.',
      canonical: `${SITE}/producto/inteligencia-dinamica`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'SoftwareApplication',
    },
    content: {
      h1: 'Inteligencia dinámica para cartas de vinos',
      subtitle: 'El motor de IA que analiza, recomienda y optimiza tu carta de vinos en tiempo real.',
      sections: [
        { heading: 'Qué es la inteligencia dinámica', content: 'Un sistema de IA que procesa datos de ventas, stock, estacionalidad y preferencias para generar recomendaciones y alertas automáticas que maximizan la rentabilidad de tu carta.' },
        { heading: 'Optimización de precios', content: 'Análisis continuo de márgenes y elasticidad para sugerir ajustes de precio que maximicen ingresos sin sacrificar la percepción de valor del comensal.' },
        { heading: 'Detección de vinos muertos', content: 'Identificación automática de referencias con baja rotación que ocupan capital y espacio en bodega, con sugerencias de acción (descuento, promoción o descatalogación).' },
        { heading: 'Recomendaciones contextuales', content: 'El recomendador se adapta al contexto real: hora del día, día de la semana, tipo de comida, perfil del comensal y stock disponible.' },
      ],
      faqs: [
        { q: '¿Cómo aprende la IA?', a: 'Procesa datos de venta, stock, estacionalidad y feedback del equipo para mejorar sus recomendaciones de forma continua.' },
        { q: '¿Necesita muchos datos para funcionar?', a: 'Empieza a generar valor desde el primer día con tu carta actual. Las recomendaciones mejoran con cada venta registrada.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Producto', url: `${SITE}/software-carta-de-vinos` },
        { name: 'Inteligencia dinámica', url: `${SITE}/producto/inteligencia-dinamica` },
      ],
      internalLinks: [
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Precios', url: '/precios' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/soluciones': {
    meta: {
      title: 'Soluciones para Restaurantes | Winerim',
      description: 'Soluciones de Winerim para restaurantes independientes, grupos de restauración y hoteles. Optimiza tu carta de vinos y aumenta el ticket medio.',
      canonical: `${SITE}/soluciones`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Soluciones de Winerim para hostelería',
      subtitle: 'Cada tipo de negocio tiene sus retos. Winerim se adapta a todos.',
      sections: [
        { heading: 'Para restaurantes independientes', content: 'Carta digital interactiva, recomendador inteligente y gestión de bodega simplificada. Aumenta tu ticket medio en vino sin necesidad de un sommelier a tiempo completo.' },
        { heading: 'Para grupos de restauración', content: 'Gestión centralizada de cartas multi-restaurante, coherencia de precios entre locales, analytics comparativos y control de stock unificado.' },
        { heading: 'Para hoteles', content: 'Cartas de vinos para restaurante, room service y eventos. Integración con sistemas de gestión hotelera y analytics de consumo por canal.' },
        { heading: 'Para aumentar el ticket medio', content: 'Estrategias probadas para incrementar el gasto en vino: recomendaciones contextuales, vino por copa optimizado y sugerencias de maridaje.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Soluciones', url: `${SITE}/soluciones` },
      ],
      internalLinks: [
        { label: 'Grupos de restauración', url: '/soluciones/grupos-restauracion' },
        { label: 'Aumentar ticket medio', url: '/soluciones/aumentar-ticket-medio-restaurante' },
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Casos de éxito', url: '/casos-exito' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/soluciones/grupos-restauracion': {
    meta: {
      title: 'Software Carta Vinos para Grupos de Restauración | Winerim',
      description: 'Gestión centralizada de cartas de vinos para grupos y cadenas de restaurantes. Control multi-local, precios coherentes y analytics comparativos.',
      canonical: `${SITE}/soluciones/grupos-restauracion`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Software de carta de vinos para grupos de restauración',
      subtitle: 'Gestión centralizada, coherencia de marca y control total de tu oferta de vinos en todos tus locales.',
      sections: [
        { heading: 'Gestión multi-restaurante', content: 'Una sola plataforma para gestionar las cartas de vinos de todos tus restaurantes. Actualiza referencias, precios y maridajes desde un panel central.' },
        { heading: 'Coherencia de precios', content: 'Asegura que los precios sean coherentes entre locales o aplica estrategias diferenciadas por zona, tipo de restaurante o canal de venta.' },
        { heading: 'Analytics comparativos', content: 'Compara el rendimiento de cada local: ventas por referencia, márgenes, rotación y tendencias. Detecta oportunidades y problemas rápidamente.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Soluciones', url: `${SITE}/soluciones` },
        { name: 'Grupos de restauración', url: `${SITE}/soluciones/grupos-restauracion` },
      ],
      internalLinks: [
        { label: 'Soluciones', url: '/soluciones' },
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Precios', url: '/precios' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/soluciones/aumentar-ticket-medio-restaurante': {
    meta: {
      title: 'Cómo Aumentar el Ticket Medio en Vino | Winerim',
      description: 'Estrategias probadas para aumentar el ticket medio en vino en tu restaurante: recomendaciones IA, vino por copa optimizado y maridajes inteligentes.',
      canonical: `${SITE}/soluciones/aumentar-ticket-medio-restaurante`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Cómo aumentar el ticket medio en vino en tu restaurante',
      subtitle: 'Estrategias basadas en datos para incrementar los ingresos por vino sin presionar al comensal.',
      sections: [
        { heading: 'Recomendaciones inteligentes', content: 'El recomendador IA sugiere vinos que equilibran satisfacción del comensal y margen del restaurante. Los restaurantes con recomendador activo aumentan un 23% el gasto medio en vino.' },
        { heading: 'Vino por copa optimizado', content: 'Selecciona las referencias óptimas para vino por copa basándote en datos de rotación, margen y complementariedad con tu carta de comidas.' },
        { heading: 'Maridajes como herramienta de venta', content: 'Los maridajes automáticos eliminan la barrera de elección del comensal y aumentan la probabilidad de pedido de vino con cada plato.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Soluciones', url: `${SITE}/soluciones` },
        { name: 'Aumentar ticket medio', url: `${SITE}/soluciones/aumentar-ticket-medio-restaurante` },
      ],
      internalLinks: [
        { label: 'Soluciones', url: '/soluciones' },
        { label: 'Vino por copa', url: '/vino-por-copa-restaurante' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/herramientas': {
    meta: {
      title: 'Herramientas Gratuitas para Cartas de Vinos | Winerim',
      description: 'Calculadoras, analizadores y diagnósticos gratuitos para optimizar tu carta de vinos: márgenes, precios por copa, stock muerto y más.',
      canonical: `${SITE}/herramientas`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Herramientas gratuitas para tu carta de vinos',
      subtitle: 'Calculadoras, analizadores y diagnósticos para optimizar la rentabilidad de tu carta.',
      sections: [
        { heading: 'Calculadora de margen de vino', content: 'Calcula el margen real de cada referencia de tu carta considerando coste de compra, precio de venta, merma y coste de bodega.' },
        { heading: 'Calculadora de precio por copa', content: 'Determina el precio óptimo por copa para maximizar la rentabilidad de tu oferta de vino por copa.' },
        { heading: 'Diagnóstico de vino por copa', content: 'Analiza tu oferta actual de vino por copa e identifica oportunidades de mejora en selección, precio y presentación.' },
        { heading: 'Wine List Score', content: 'Evalúa la calidad y completitud de tu carta de vinos con un análisis automático de diversidad, precios, maridajes y estructura.' },
        { heading: 'Calculadora de stock muerto', content: 'Identifica cuánto capital tienes inmovilizado en vinos con baja rotación y calcula el coste de oportunidad.' },
        { heading: 'Analizador de carta', content: 'Sube tu carta y obtén un diagnóstico completo: diversidad, precios, equilibrio por regiones y sugerencias de mejora.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Herramientas', url: `${SITE}/herramientas` },
      ],
      internalLinks: [
        { label: 'Calculadora de margen', url: '/calculadora-margen-vino' },
        { label: 'Calculadora precio por copa', url: '/herramientas/calculadora-precio-vino-por-copa' },
        { label: 'Diagnóstico vino por copa', url: '/herramientas/diagnostico-vino-por-copa' },
        { label: 'Wine List Score', url: '/herramientas/wine-list-score' },
        { label: 'Calculadora stock muerto', url: '/herramientas/calculadora-stock-muerto' },
        { label: 'Analizador de carta', url: '/analisis-carta' },
        { label: 'Guías y recursos', url: '/guias-y-recursos' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/guias-y-recursos': {
    meta: {
      title: 'Guías y Recursos para Cartas de Vinos | Winerim',
      description: 'Guías, plantillas, checklists y recursos descargables para diseñar, gestionar y rentabilizar tu carta de vinos en restauración.',
      canonical: `${SITE}/guias-y-recursos`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'CollectionPage',
    },
    content: {
      h1: 'Guías y recursos para cartas de vinos',
      subtitle: 'Guías prácticas, plantillas descargables y checklists para optimizar tu carta de vinos.',
      sections: [
        { heading: 'Guías de gestión', content: 'Guías paso a paso para diseñar una carta de vinos rentable, fijar estrategias de vino por copa, detectar vinos muertos y formar al equipo de sala.' },
        { heading: 'Plantillas descargables', content: 'Plantillas de carta de vinos, wine mapping, análisis de márgenes y scorecards de rendimiento listas para usar.' },
        { heading: 'Checklists', content: 'Checklists de lanzamiento de carta, detección de problemas y auditoría de rentabilidad para restauradores.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Guías y recursos', url: `${SITE}/guias-y-recursos` },
      ],
      internalLinks: [
        { label: 'Plantilla carta de vinos', url: '/recursos/plantilla-carta-de-vinos' },
        { label: 'Checklist carta rentable', url: '/recursos/checklist-carta-de-vinos-rentable' },
        { label: 'Guía vino por copa', url: '/recursos/guia-vino-por-copa-para-restaurantes' },
        { label: 'Guía rotación de vinos', url: '/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante' },
        { label: 'Guía formar equipo sala', url: '/guias/como-formar-equipo-sala-para-vender-vino' },
        { label: 'Herramientas', url: '/herramientas' },
        { label: 'Benchmarks y playbooks', url: '/benchmarks-playbooks' },
      ],
    },
  },
  '/benchmarks-playbooks': {
    meta: {
      title: 'Benchmarks y Playbooks para Cartas de Vinos | Winerim',
      description: 'Datos de referencia y playbooks estratégicos para la gestión de cartas de vinos en restaurantes: márgenes, rotación, precios y más.',
      canonical: `${SITE}/benchmarks-playbooks`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'CollectionPage',
    },
    content: {
      h1: 'Benchmarks y playbooks para cartas de vinos',
      subtitle: 'Datos de referencia del sector y estrategias probadas para optimizar la gestión de vinos en restauración.',
      sections: [
        { heading: 'Benchmarks del sector', content: 'Datos de referencia sobre márgenes medios, rotación por tipo de vino, número óptimo de referencias y distribución de precios en restauración.' },
        { heading: 'Playbooks estratégicos', content: 'Guías de acción paso a paso para resolver los problemas más comunes: lanzar una carta nueva, reducir stock muerto, aumentar ventas por copa y optimizar márgenes.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Benchmarks y playbooks', url: `${SITE}/benchmarks-playbooks` },
      ],
      internalLinks: [
        { label: 'Guías y recursos', url: '/guias-y-recursos' },
        { label: 'Herramientas', url: '/herramientas' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/barometro-cartas-vino-2026': {
    meta: {
      title: 'Barómetro Winerim 2026 de Cartas de Vino | Winerim',
      description: 'Informe Winerim sobre cómo rinden las cartas de vino en restauración: metodología, variables medidas, patrones de margen y benchmarks por segmento.',
      canonical: `${SITE}/barometro-cartas-vino-2026`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'article',
      schemaType: 'Report',
    },
    content: {
      h1: 'Barómetro Winerim de cartas de vino',
      subtitle: 'Datos agregados y anonimizados para entender dónde pierden margen las cartas, qué oportunidades se repiten y cómo comparar un restaurante con referencias defendibles.',
      intro: 'El Barómetro Winerim 2026 funciona como informe vivo. Primero publica metodología, variables y patrones observados; después incorporará cortes numéricos por país, vertical y tipo de carta cuando exista muestra suficiente y reglas de anonimato claras.',
      sections: [
        { heading: 'Metodología y anonimización', content: 'El análisis trabaja con cartas, referencias, precios, formatos por copa, estilos, regiones y señales de estructura. No se publican nombres de restaurantes, hoteles, grupos ni clientes, y los cortes por país, ciudad o vertical requieren umbrales mínimos antes de convertirse en benchmark público.' },
        { heading: 'Variables medidas', content: 'Winerim mide número de referencias, distribución de precios, peso del vino por copa, regiones, uvas, estilos, maridajes y, cuando el restaurante comparte datos operativos, ventas, stock, margen y rotación por referencia.' },
        { heading: 'Patrones de margen', content: 'El Barómetro busca señales como margen invisible, vino por copa infrautilizado, canibalización entre referencias parecidas, cartas grandes sin función clara, biblioteca de vino poco conectada y ausencia de revisión mensual.' },
        { heading: 'Segmentos prioritarios', content: 'Los primeros cortes publicables deberían cubrir restaurantes gastronómicos, hoteles, grupos de restauración y restaurantes sin sumiller, porque cada vertical necesita comparar estructura, margen, copa, stock y recomendaciones de forma distinta.' },
        { heading: 'Datos necesarios para escalar', content: 'Para llevar el Barómetro al máximo nivel hacen falta cartas completas con nombre, origen, estilo, formato, precio botella, precio copa, tipo de negocio, país, ciudad, ticket medio, número de locales, ventas, rotación, stock, margen, platos principales y periodo de análisis.' },
      ],
      faqs: [
        { q: '¿El Barómetro publica datos de clientes?', a: 'No. La página está diseñada para datos agregados y anonimizados. No publica nombres, cartas completas ni métricas sensibles de clientes concretos.' },
        { q: '¿Las cifras actuales son definitivas?', a: 'No. La primera versión prioriza metodología, variables y patrones observables. Las cifras segmentadas se deberían publicar solo con muestra suficiente y reglas claras de anonimato.' },
        { q: '¿Cómo se conecta con la biblioteca del vino?', a: 'La biblioteca aporta el lenguaje semántico de uvas, regiones, estilos y maridajes. El Barómetro usa esa estructura para explicar qué falta, qué sobra y qué bloque de la carta puede vender mejor.' },
        { q: '¿Puedo comparar mi carta con el Barómetro?', a: 'Sí. El flujo recomendado es enviar la carta en el análisis gratuito y usar el benchmark como marco para entender tamaño, precios, copa, estilos y oportunidades.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Guías y recursos', url: `${SITE}/guias-y-recursos` },
        { name: 'Barómetro Winerim', url: `${SITE}/barometro-cartas-vino-2026` },
      ],
      internalLinks: [
        { label: 'Analizar carta de vinos gratis', url: '/analisis-carta' },
        { label: 'Wine List Benchmark', url: '/wine-list-benchmark' },
        { label: 'Benchmarks y playbooks', url: '/benchmarks-playbooks' },
        { label: 'Comparativas Winerim', url: '/comparativas' },
        { label: 'Biblioteca de vino', url: '/biblioteca-vino' },
        { label: 'Demo gratuita', url: '/demo' },
      ],
    },
  },
  '/casos-exito': {
    meta: {
      title: 'Casos de Éxito | Restaurantes que usan Winerim',
      description: 'Descubre cómo restaurantes y hoteles han aumentado sus ventas de vino y optimizado su carta con Winerim.',
      canonical: `${SITE}/casos-exito`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Casos de éxito con Winerim',
      subtitle: 'Restaurantes y hoteles que han transformado su gestión de vinos con Winerim.',
      sections: [
        { heading: 'Restaurantes independientes', content: 'Restaurantes que han aumentado su ticket medio en vino entre un 15% y un 30% con el recomendador inteligente y la carta digital.' },
        { heading: 'Grupos de restauración', content: 'Cadenas y grupos que han unificado la gestión de cartas, reducido stock muerto y mejorado la coherencia de su oferta de vinos.' },
        { heading: 'Hoteles', content: 'Hoteles que han integrado Winerim en restaurante, room service y eventos para maximizar ingresos por vino en todos los canales.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Casos de éxito', url: `${SITE}/casos-exito` },
      ],
      internalLinks: [
        { label: 'Clientes', url: '/clientes' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/clientes': {
    meta: {
      title: 'Clientes de Winerim | Restaurantes y Hoteles',
      description: 'Conoce los restaurantes, hoteles y grupos de restauración que confían en Winerim para gestionar y optimizar su carta de vinos.',
      canonical: `${SITE}/clientes`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Nuestros clientes',
      subtitle: 'Restaurantes, hoteles y grupos de restauración de toda España y Europa confían en Winerim.',
      sections: [
        { heading: 'Restaurantes independientes', content: 'Desde bistrós con 30 referencias hasta restaurantes gastronómicos con más de 500 etiquetas.' },
        { heading: 'Grupos y cadenas', content: 'Grupos de restauración con múltiples locales que necesitan coherencia, control y eficiencia en la gestión de vinos.' },
        { heading: 'Hoteles', content: 'Cadenas hoteleras internacionales que integran Winerim en sus servicios de restauración.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Clientes', url: `${SITE}/clientes` },
      ],
      internalLinks: [
        { label: 'Casos de éxito', url: '/casos-exito' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/integraciones': {
    meta: {
      title: 'Integraciones de Winerim | TPV, PMS, ERP, Inventario y API',
      description: 'Winerim se integra con los sistemas que ya usas: TPV, PMS hotelero, ERP y gestión de inventario. Ecosistema conectado para restaurantes, hoteles y grupos.',
      canonical: `${SITE}/integraciones`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Integraciones de Winerim',
      subtitle: 'Conecta la carta de vinos con ventas, stock, costes, PMS hotelero, ERP y sistemas de punto de venta para tomar decisiones con datos reales.',
      sections: [
        { heading: 'Por qué importan las integraciones', content: 'Sin conexión con el TPV, el vino queda aislado: no sabes qué referencias se venden realmente, qué margen generan ni qué vinos se quedan sin rotación. Winerim conecta carta, ventas, stock y coste para convertir la carta en un sistema de decisión.' },
        { heading: 'TPV, POS y ventas reales', content: 'Winerim se integra con sistemas de punto de venta para sincronizar ventas por referencia, periodo y punto de servicio. Esto permite medir ticket medio de vino, rotación, margen y rendimiento por copa o botella.' },
        { heading: 'Inventario, ERP y compras', content: 'La integración con inventario y ERP ayuda a mantener stock actualizado, detectar sobrestock, revisar costes y decidir compras con información real en lugar de intuición o presión comercial.' },
        { heading: 'Hoteles, grupos y API', content: 'En hoteles y grupos, Winerim centraliza datos entre locales, outlets y sistemas PMS. Para equipos técnicos, la API permite proyectos personalizados y conexión con sistemas propios.' },
      ],
      faqs: [
        { q: '¿Winerim se integra con mi TPV?', a: 'Winerim se integra con múltiples sistemas de punto de venta y puede evaluar integraciones personalizadas según el stack del restaurante, hotel o grupo.' },
        { q: '¿Necesito cambiar de sistema?', a: 'No. Winerim está diseñado para conectarse con las herramientas existentes y evitar doble entrada de datos.' },
        { q: '¿Las integraciones están incluidas en todos los planes?', a: 'Las integraciones avanzadas suelen formar parte de planes Pro o Enterprise, dependiendo del sistema, volumen de datos y complejidad técnica.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Integraciones', url: `${SITE}/integraciones` },
      ],
      internalLinks: [
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Precios', url: '/precios' },
        { label: 'Winerim Supply', url: '/producto/winerim-supply' },
        { label: 'Analizar carta', url: '/analisis-carta' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/blog': {
    meta: {
      title: 'Blog | Winerim – Gestión de Vinos en Restauración',
      description: 'Artículos sobre gestión de cartas de vinos, estrategias de venta, IA en restauración, maridajes y tendencias del sector.',
      canonical: `${SITE}/blog`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'CollectionPage',
    },
    content: {
      h1: 'Blog de Winerim',
      subtitle: 'Artículos, análisis y tendencias sobre gestión de vinos en restauración.',
      sections: [
        { heading: 'Estrategia y negocio', content: 'Cómo diseñar una carta de vinos rentable, fijar precios óptimos y aumentar las ventas de vino en tu restaurante.' },
        { heading: 'Tecnología y IA', content: 'El papel de la inteligencia artificial en la restauración moderna: recomendaciones, analytics y automatización.' },
        { heading: 'Gestión de bodega', content: 'Mejores prácticas para gestionar el stock, reducir mermas y optimizar las compras de vino.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` },
      ],
      internalLinks: [
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Guías y recursos', url: '/guias-y-recursos' },
        { label: 'Herramientas', url: '/herramientas' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/problemas': {
    meta: {
      title: 'Problemas Comunes en Cartas de Vinos | Winerim',
      description: 'Identifica los problemas más comunes en la gestión de cartas de vinos: baja rotación, stock muerto, márgenes pobres y cartas que no venden.',
      canonical: `${SITE}/problemas`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Problemas comunes en cartas de vinos',
      subtitle: 'Diagnóstico de los retos más frecuentes en la gestión de vinos en restauración.',
      sections: [
        { heading: 'La carta no vende', content: 'Cartas extensas, mal organizadas o sin recomendaciones que generan parálisis de elección y bajan el ticket medio.' },
        { heading: 'Stock muerto', content: 'Referencias con baja rotación que inmovilizan capital y ocupan espacio en bodega sin generar ingresos.' },
        { heading: 'Márgenes pobres', content: 'Precios fijados sin datos que reducen la rentabilidad global de la oferta de vinos.' },
        { heading: 'Falta de datos', content: 'Decisiones de compra y carta basadas en intuición en lugar de datos de venta y rotación reales.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Problemas', url: `${SITE}/problemas` },
      ],
      internalLinks: [
        { label: 'Carta que no vende', url: '/problemas/carta-de-vinos-no-vende' },
        { label: 'Soluciones', url: '/soluciones' },
        { label: 'Herramientas', url: '/herramientas' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/como-vender-mas-vino-en-un-restaurante': {
    meta: {
      title: 'Cómo Vender Más Vino en un Restaurante | Winerim',
      description: 'Guía completa con estrategias probadas para aumentar las ventas de vino en restaurantes: carta optimizada, recomendaciones, formación y tecnología.',
      canonical: `${SITE}/como-vender-mas-vino-en-un-restaurante`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'article',
      schemaType: 'Article',
    },
    content: {
      h1: 'Cómo vender más vino en un restaurante',
      subtitle: 'Estrategias probadas para restauradores que quieren aumentar sus ingresos por vino.',
      sections: [
        { heading: 'Optimiza tu carta de vinos', content: 'Reduce referencias, mejora la estructura y usa descripciones que vendan. Una carta bien diseñada puede aumentar las ventas de vino un 20%.' },
        { heading: 'Activa las recomendaciones', content: 'El 68% de los comensales piden vino cuando reciben una recomendación. Usa tecnología para escalar las sugerencias personalizadas.' },
        { heading: 'Forma a tu equipo', content: 'Un camarero que conoce 5 vinos de la carta y sabe maridarlos con los platos principales genera un 30% más de ventas de vino.' },
        { heading: 'Vino por copa estratégico', content: 'Una oferta de vino por copa bien seleccionada reduce la barrera de entrada y aumenta la frecuencia de pedido.' },
      ],
      faqs: [
        { q: '¿Cuánto puede aumentar el ticket medio con un recomendador?', a: 'Los restaurantes con recomendador inteligente activo aumentan el ticket medio en vino entre un 15% y un 30%.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Cómo vender más vino', url: `${SITE}/como-vender-mas-vino-en-un-restaurante` },
      ],
      internalLinks: [
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Vino por copa', url: '/vino-por-copa-restaurante' },
        { label: 'Guía formar equipo', url: '/guias/como-formar-equipo-sala-para-vender-vino' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/vino-por-copa-restaurante': {
    meta: {
      title: 'Vino por Copa en Restaurantes: Guía Estratégica | Winerim',
      description: 'Cómo diseñar una oferta de vino por copa rentable: selección, precios, rotación y servicio. Guía completa para restauradores.',
      canonical: `${SITE}/vino-por-copa-restaurante`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'article',
      schemaType: 'Article',
    },
    content: {
      h1: 'Vino por copa en restaurantes: guía estratégica',
      subtitle: 'Cómo convertir el vino por copa en una fuente de ingresos rentable y diferenciadora.',
      sections: [
        { heading: 'Por qué el vino por copa es estratégico', content: 'El vino por copa representa la mayor oportunidad de margen en la oferta de vinos. Permite al comensal probar sin compromiso y al restaurante maximizar la rentabilidad por botella.' },
        { heading: 'Cuántas referencias ofrecer', content: 'Entre 6 y 12 referencias por copa es el rango óptimo. Menos limita la elección; más complica la rotación y aumenta la merma.' },
        { heading: 'Fijar precios por copa', content: 'El precio por copa debe cubrir el coste de la botella completa con las 3-4 primeras copas vendidas. Las restantes son margen puro.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Vino por copa', url: `${SITE}/vino-por-copa-restaurante` },
      ],
      internalLinks: [
        { label: 'Calculadora precio por copa', url: '/herramientas/calculadora-precio-vino-por-copa' },
        { label: 'Diagnóstico vino por copa', url: '/herramientas/diagnostico-vino-por-copa' },
        { label: 'Guía estrategia vino por copa', url: '/guias/como-fijar-estrategia-rentable-vino-por-copa' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/como-hacer-una-carta-de-vinos': {
    meta: {
      title: 'Cómo Hacer una Carta de Vinos para tu Restaurante | Winerim',
      description: 'Guía paso a paso para crear una carta de vinos rentable: selección, estructura, precios, diseño y presentación.',
      canonical: `${SITE}/como-hacer-una-carta-de-vinos`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'article',
      schemaType: 'Article',
    },
    content: {
      h1: 'Cómo hacer una carta de vinos para tu restaurante',
      subtitle: 'Guía práctica para diseñar una carta de vinos que venda, informe y genere margen.',
      sections: [
        { heading: 'Define tu identidad vinícola', content: 'Tu carta de vinos debe reflejar la personalidad de tu restaurante: cocina, nivel de servicio y perfil de cliente.' },
        { heading: 'Selecciona las referencias', content: 'Equilibra diversidad y manejabilidad. Un restaurante medio funciona bien con 40-80 referencias bien elegidas.' },
        { heading: 'Estructura y organización', content: 'Organiza por regiones, estilos o momentos. Facilita la navegación con categorías claras y descripciones breves.' },
        { heading: 'Fija los precios', content: 'Usa datos de margen, competencia y posicionamiento para fijar precios que maximicen ingresos y percepción de valor.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Cómo hacer una carta de vinos', url: `${SITE}/como-hacer-una-carta-de-vinos` },
      ],
      internalLinks: [
        { label: 'Plantilla carta de vinos', url: '/recursos/plantilla-carta-de-vinos' },
        { label: 'Ejemplos de carta', url: '/ejemplos-carta-vinos' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/analisis-carta': {
    meta: {
      title: 'Analiza tu Carta de Vinos Gratis | Winerim',
      description: 'Sube tu carta de vinos y recibe un diagnóstico completo gratuito: diversidad, precios, equilibrio y sugerencias de mejora con IA.',
      canonical: `${SITE}/analisis-carta`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Analiza tu carta de vinos con IA',
      subtitle: 'Diagnóstico gratuito de tu carta: identifica problemas y oportunidades en minutos.',
      sections: [
        { heading: 'Qué analiza', content: 'Diversidad de regiones y estilos, equilibrio de precios, cobertura de maridajes, número de referencias y estructura general.' },
        { heading: 'Cómo funciona', content: 'Sube tu carta en cualquier formato. Nuestra IA la procesa y genera un informe con puntuación, problemas detectados y recomendaciones concretas.' },
      ],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Análisis de carta', url: `${SITE}/analisis-carta` },
      ],
      internalLinks: [
        { label: 'Herramientas', url: '/herramientas' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/aprender-vino': {
    meta: {
      title: 'Aprender Vino desde Cero para Restaurantes | Winerim',
      description: 'Ruta para aprender vino desde cero: botella, cata, uvas, regiones, estilos, maridajes, servicio y decisiones de carta para equipos de sala.',
      canonical: `${SITE}/aprender-vino`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'LearningResource',
    },
    content: {
      h1: 'Aprender vino desde cero, aplicado a vender mejor en sala',
      subtitle: 'Guía ordenada para que un equipo entienda una botella, describa un vino sin jerga, recomiende con seguridad y conecte conocimiento con margen, rotación y experiencia del cliente.',
      intro: 'Aprender vino no debe ser memorizar enciclopedias. Para un restaurante, aprender vino significa poder explicar qué es cada referencia, con qué plato encaja, qué función cumple en la carta y cómo ayuda a vender mejor.',
      sections: [
        { heading: 'Entender la botella', content: 'El primer bloque cubre etiqueta, origen, variedad, añada, crianza, estilo y precio. El objetivo es que el equipo sepa explicar por qué un vino está en carta y qué espera el cliente al pedirlo.' },
        { heading: 'Catar y describir sin jerga', content: 'El segundo bloque traduce aroma, acidez, cuerpo, tanino, dulzor, alcohol y final a lenguaje de sala. La prioridad no es sonar técnico, sino recomendar con claridad.' },
        { heading: 'Conectar uvas, regiones y estilos', content: 'La Biblioteca del vino funciona como base de datos de uvas, regiones, estilos, maridajes y glosario. Aprender vino es la ruta guiada para usar esa base en conversaciones reales con clientes.' },
        { heading: 'Recomendar por comida', content: 'El aprendizaje debe aterrizar en maridajes prácticos: pescado, carne, arroces, cocina asiática, quesos, postres y platos de la casa. Así el conocimiento impacta ticket medio y experiencia.' },
        { heading: 'Servir y decidir mejor', content: 'Temperatura, copa, medidas, vino por copa, margen, rotación y revisión mensual convierten el conocimiento en gestión. Una carta que se entiende se vende y se mejora con más facilidad.' },
      ],
      faqs: [
        { q: '¿Aprender vino sustituye a la Biblioteca del vino?', a: 'No. La Biblioteca es la referencia estructurada de uvas, regiones, estilos, maridajes y glosario. Aprender vino es la capa guiada para saber por dónde empezar y cómo aplicar ese contenido en sala.' },
        { q: '¿Está pensado para principiantes?', a: 'Sí. Está diseñado para equipos de sala, responsables de restaurante y operadores que necesitan recomendar mejor sin hablar como un sumiller avanzado.' },
        { q: '¿Cómo se conecta con Winerim?', a: 'Winerim usa este conocimiento para enriquecer fichas de vino, maridajes, recomendaciones, análisis de carta, formación del equipo y decisiones de margen o rotación.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Aprender vino', url: `${SITE}/aprender-vino` },
      ],
      internalLinks: [
        { label: 'Biblioteca de vino', url: '/biblioteca-vino' },
        { label: 'Glosario del vino', url: '/biblioteca-vino/glosario' },
        { label: 'Uvas', url: '/biblioteca-vino/uvas' },
        { label: 'Regiones', url: '/biblioteca-vino/regiones' },
        { label: 'Maridajes', url: '/biblioteca-vino/maridajes' },
        { label: 'Guía de servicio', url: '/biblioteca-vino/guia-servicio' },
        { label: 'Analizar carta de vinos gratis', url: '/analisis-carta' },
        { label: 'Demo gratuita', url: '/demo' },
      ],
    },
  },
  '/contacto': {
    meta: {
      title: 'Contacto | Winerim',
      description: 'Contacta con el equipo de Winerim. Solicita información, una demo personalizada o soporte técnico.',
      canonical: `${SITE}/contacto`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Contacta con Winerim',
      subtitle: 'Cuéntanos sobre tu restaurante y te ayudamos a optimizar tu carta de vinos.',
      sections: [],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Contacto', url: `${SITE}/contacto` },
      ],
      internalLinks: [
        { label: 'Demo', url: '/demo' },
        { label: 'Precios', url: '/precios' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
      ],
    },
  },
  '/demo': {
    meta: {
      title: 'Demo Gratuita | Winerim',
      description: 'Solicita una demo personalizada de Winerim. Te mostramos cómo optimizar tu carta de vinos con IA en 30 minutos.',
      canonical: `${SITE}/demo`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: 'Solicita una demo gratuita de Winerim',
      subtitle: 'Te mostramos cómo Winerim puede transformar la gestión de vinos en tu restaurante.',
      sections: [],
      faqs: [],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Demo', url: `${SITE}/demo` },
      ],
      internalLinks: [
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Precios', url: '/precios' },
        { label: 'Casos de éxito', url: '/casos-exito' },
      ],
    },
  },
  '/que-es-winerim': {
    meta: {
      title: '¿Qué es Winerim? | Carta Inteligente de Vinos',
      description: 'Winerim es la plataforma de gestión inteligente de cartas de vinos para restaurantes. Descubre qué hace, cómo funciona y por qué es diferente.',
      canonical: `${SITE}/que-es-winerim`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'WebPage',
    },
    content: {
      h1: '¿Qué es Winerim?',
      subtitle: 'La plataforma que convierte tu carta de vinos en un motor de ventas inteligente.',
      sections: [
        { heading: 'Carta digital inteligente', content: 'Winerim digitaliza tu carta de vinos con fichas completas, imágenes, notas de cata y maridajes automáticos para cada plato.' },
        { heading: 'Recomendador con IA', content: 'Un motor de recomendación que sugiere el vino ideal para cada comensal y plato, maximizando satisfacción y margen.' },
        { heading: 'Analytics y gestión', content: 'Dashboards de ventas, control de stock, alertas de rotación y optimización de precios basados en datos reales.' },
      ],
      faqs: [
        { q: '¿Para quién es Winerim?', a: 'Para restaurantes, hoteles, vinotecas y grupos de restauración que quieren profesionalizar y rentabilizar su oferta de vinos.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: '¿Qué es Winerim?', url: `${SITE}/que-es-winerim` },
      ],
      internalLinks: [
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Demo', url: '/demo' },
      ],
    },
  },
  '/sobre-winerim': {
    meta: {
      title: 'Sobre Winerim — Metodología, Equipo y Expertise',
      description: 'Conoce quién está detrás de Winerim, nuestra metodología de trabajo, cómo medimos resultados y las áreas de expertise que avalan nuestra tecnología para restaurantes.',
      canonical: `${SITE}/sobre-winerim`,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'website',
      schemaType: 'AboutPage',
    },
    content: {
      h1: 'La tecnología detrás de cada copa vendida',
      subtitle: 'Winerim nace de la intersección entre tecnología, hostelería y vino. Construimos herramientas que ayudan a restaurantes a tomar mejores decisiones sobre su carta, su bodega y sus ventas de vino.',
      sections: [
        { heading: '¿Qué es Winerim?', content: 'Winerim es una plataforma de gestión inteligente de cartas de vino para restaurantes, hoteles y grupos de restauración. Combina carta digital interactiva, recomendaciones con IA, analítica de ventas y herramientas de optimización de precios. Fundada en 2024, con presencia en 15 países, +1.000 bodegas gestionadas y +300.000 referencias únicas de vino en la base de datos.' },
        { heading: 'Cómo trabajamos', content: 'Nuestra metodología combina rigor técnico con experiencia real en restauración. Integramos la carta existente, analizamos con benchmarks del sector, generamos recomendaciones con IA y medimos el impacto en tiempo real.' },
        { heading: 'Cómo medimos resultados', content: 'Métricas clave: ticket medio de vino por mesa, ratio copa vs. botella, rotación de referencias, margen bruto y porcentaje de vinos muertos. Los potenciales de mejora se presentan como rangos, no cifras absolutas.' },
        { heading: 'Áreas de expertise', content: 'Gestión de carta de vinos, analítica de ventas de vino, pricing y estrategia de precios, IA aplicada a restauración, gestión de bodega y stock, formación de equipos de sala.' },
        { heading: 'Quién valida el contenido', content: 'Todo el contenido editorial es revisado por profesionales con experiencia en sommellerie, dirección de restaurantes, análisis de datos en hostelería y tecnología SaaS.' },
      ],
      faqs: [
        { q: '¿Quién está detrás de Winerim?', a: 'Un equipo multidisciplinar con experiencia en tecnología, hostelería, sommellerie y análisis de datos.' },
        { q: '¿Cómo se generan las recomendaciones?', a: 'Se basan en datos de la carta, preferencias de maridaje, patrones de venta y objetivos comerciales configurados.' },
        { q: '¿Winerim vende datos de clientes finales?', a: 'No. Winerim no recopila datos personales de comensales. Trabaja exclusivamente con datos operativos del restaurante.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Sobre Winerim', url: `${SITE}/sobre-winerim` },
      ],
      internalLinks: [
        { label: '¿Qué es Winerim?', url: '/que-es-winerim' },
        { label: 'Funcionalidades', url: '/funcionalidades' },
        { label: 'Integraciones', url: '/integraciones' },
        { label: 'Clientes', url: '/clientes' },
        { label: 'Benchmarks & Playbooks', url: '/benchmarks-playbooks' },
      ],
    },
  },
  '/producto/winerim-core': {
    meta: { title: 'Winerim Core — Carta Digital Inteligente | Winerim', description: 'Winerim Core es el módulo central: carta digital interactiva, recomendador IA, fichas de vino, maridajes automáticos y experiencia de comensal personalizada.', canonical: `${SITE}/producto/winerim-core`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'SoftwareApplication' },
    content: {
      h1: 'Winerim Core — Carta digital inteligente para restaurantes',
      subtitle: 'El módulo central de Winerim: transforma tu carta de vinos en una experiencia interactiva que vende.',
      sections: [
        { heading: 'Carta digital interactiva', content: 'Carta accesible por QR, tablet o web con fichas completas, imágenes, notas de cata y filtros inteligentes por estilo, región y precio.' },
        { heading: 'Recomendador IA integrado', content: 'Motor de recomendación que sugiere vinos según plato, perfil del comensal y stock disponible. Aumenta el ticket medio de forma natural.' },
        { heading: 'Maridajes automáticos', content: 'Cada plato de tu carta recibe sugerencias de maridaje generadas por IA, actualizadas automáticamente al cambiar el menú.' },
      ],
      faqs: [{ q: '¿Qué incluye Winerim Core?', a: 'Carta digital interactiva, recomendador IA, fichas de vino completas, maridajes automáticos y panel de gestión básico.' }],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Producto', url: `${SITE}/software-carta-de-vinos` }, { name: 'Winerim Core', url: `${SITE}/producto/winerim-core` }],
      internalLinks: [{ label: 'Winerim Supply', url: '/producto/winerim-supply' }, { label: 'Inteligencia dinámica', url: '/producto/inteligencia-dinamica' }, { label: 'Funcionalidades', url: '/funcionalidades' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/producto/winerim-supply': {
    meta: { title: 'Winerim Supply — Gestión de Compras y Bodega | Winerim', description: 'Winerim Supply optimiza compras, stock y bodega con datos de rotación, alertas de reposición y análisis de margen por referencia.', canonical: `${SITE}/producto/winerim-supply`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'SoftwareApplication' },
    content: {
      h1: 'Winerim Supply — Gestión inteligente de compras y bodega',
      subtitle: 'Controla tu stock, optimiza las compras y maximiza el margen de cada referencia con datos reales.',
      sections: [
        { heading: 'Control de stock inteligente', content: 'Inventario en tiempo real con alertas de reposición, detección de vinos muertos y análisis de rotación por referencia.' },
        { heading: 'Inteligencia de compras', content: 'Datos de rotación, margen y estacionalidad para decidir qué vinos comprar, cuánto y cuándo. Reduce capital inmovilizado.' },
        { heading: 'Análisis de margen', content: 'Margen real por referencia considerando coste de compra, precio de venta, merma y coste de bodega.' },
      ],
      faqs: [{ q: '¿Winerim Supply sustituye mi ERP?', a: 'No. Se integra con tu sistema actual para enriquecer los datos de gestión de vinos con inteligencia de negocio.' }],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Producto', url: `${SITE}/software-carta-de-vinos` }, { name: 'Winerim Supply', url: `${SITE}/producto/winerim-supply` }],
      internalLinks: [{ label: 'Winerim Core', url: '/producto/winerim-core' }, { label: 'Inteligencia dinámica', url: '/producto/inteligencia-dinamica' }, { label: 'Funcionalidades', url: '/funcionalidades' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/biblioteca-vino': {
    meta: { title: 'Biblioteca de Vino — Uvas, Regiones, Estilos y Maridajes | Winerim', description: 'Explora la biblioteca de vino de Winerim: variedades de uva, regiones vinícolas, estilos de vino, maridajes y glosario para profesionales de restauración.', canonical: `${SITE}/biblioteca-vino`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'CollectionPage' },
    content: {
      h1: 'Biblioteca de vino para profesionales de restauración',
      subtitle: 'Conocimiento vinícola estructurado para equipos de sala, sommeliers y responsables de compras.',
      sections: [
        { heading: 'Variedades de uva', content: 'Fichas completas de las principales variedades: perfil aromático, regiones de origen, maridajes y potencial de guarda.' },
        { heading: 'Regiones vinícolas', content: 'Guía por países y denominaciones de origen: clima, suelos, variedades principales y estilos característicos.' },
        { heading: 'Estilos de vino', content: 'Clasificación por estilos (crianza, joven, espumoso, dulce) con perfiles de sabor y sugerencias de servicio.' },
        { heading: 'Maridajes', content: 'Base de datos de maridajes por tipo de cocina, ingrediente y técnica culinaria.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Biblioteca de vino', url: `${SITE}/biblioteca-vino` }],
      internalLinks: [{ label: 'Uvas', url: '/biblioteca-vino/uvas' }, { label: 'Regiones', url: '/biblioteca-vino/regiones' }, { label: 'Estilos', url: '/biblioteca-vino/estilos' }, { label: 'Maridajes', url: '/biblioteca-vino/maridajes' }, { label: 'Glosario', url: '/biblioteca-vino/glosario' }],
    },
  },
  '/calculadora-margen-vino': {
    meta: { title: 'Calculadora de Margen de Vino para Restaurantes | Winerim', description: 'Calcula el margen real de cada vino de tu carta: coste, precio de venta, merma y rentabilidad. Herramienta gratuita para restauradores.', canonical: `${SITE}/calculadora-margen-vino`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Calculadora de margen de vino para restaurantes',
      subtitle: 'Calcula el margen real de cada referencia de tu carta en segundos.',
      sections: [
        { heading: 'Cómo funciona', content: 'Introduce el coste de compra y precio de venta. La calculadora muestra el margen bruto, porcentaje y comparativa con benchmarks del sector.' },
        { heading: 'Por qué importa el margen real', content: 'Muchos restaurantes fijan precios por intuición. Conocer el margen real permite optimizar la carta para maximizar ingresos sin sacrificar calidad.' },
      ],
      faqs: [{ q: '¿Es gratuita?', a: 'Sí. La calculadora de margen es 100% gratuita y no requiere registro.' }],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Calculadora de margen', url: `${SITE}/calculadora-margen-vino` }],
      internalLinks: [{ label: 'Herramientas', url: '/herramientas' }, { label: 'Calculadora precio por copa', url: '/herramientas/calculadora-precio-vino-por-copa' }, { label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/inteligencia-artificial-restaurantes': {
    meta: { title: 'Inteligencia Artificial para Restaurantes | Winerim', description: 'Cómo la IA transforma la gestión de restaurantes: cartas inteligentes, recomendaciones personalizadas, optimización de precios y analítica predictiva.', canonical: `${SITE}/inteligencia-artificial-restaurantes`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Inteligencia artificial para restaurantes',
      subtitle: 'Cómo la IA está transformando la gestión, la venta y la experiencia del comensal en restauración.',
      sections: [
        { heading: 'IA aplicada a cartas de vinos', content: 'La IA permite crear cartas dinámicas que se adaptan al comensal, optimizan precios según datos de venta y detectan oportunidades de mejora automáticamente.' },
        { heading: 'Recomendaciones personalizadas', content: 'Motores de recomendación que sugieren vinos según el plato, perfil del comensal y contexto (hora, día, temporada).' },
        { heading: 'Analítica predictiva', content: 'Modelos que anticipan tendencias de demanda, estacionalidad y rotación para optimizar compras y reducir stock muerto.' },
      ],
      faqs: [{ q: '¿Qué restaurantes pueden usar IA?', a: 'Cualquier restaurante con carta de vinos puede beneficiarse. Winerim es apto desde restaurantes con 20 referencias hasta grupos con miles.' }],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'IA para restaurantes', url: `${SITE}/inteligencia-artificial-restaurantes` }],
      internalLinks: [{ label: 'Inteligencia dinámica', url: '/producto/inteligencia-dinamica' }, { label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/precio-vino-restaurante': {
    meta: { title: 'Precio del Vino en Restaurantes: Guía de Pricing | Winerim', description: 'Guía completa de pricing de vino en restaurantes: cómo fijar precios, márgenes de referencia, estrategias por copa y botella, y errores comunes.', canonical: `${SITE}/precio-vino-restaurante`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Precio del vino en restaurantes: guía de pricing',
      subtitle: 'Estrategias de fijación de precios de vino basadas en datos, márgenes y percepción de valor.',
      sections: [
        { heading: 'Factores que determinan el precio', content: 'Coste de compra, posicionamiento del restaurante, competencia, elasticidad de demanda y margen objetivo.' },
        { heading: 'Márgenes de referencia del sector', content: 'El margen bruto medio en vino en restauración oscila entre el 65% y el 75%. Los vinos por copa permiten márgenes superiores al 80%.' },
        { heading: 'Errores comunes de pricing', content: 'Aplicar multiplicador fijo a todas las referencias, no diferenciar entre copa y botella, no revisar precios periódicamente.' },
      ],
      faqs: [{ q: '¿Cuál es el margen ideal en vino?', a: 'Depende del tipo de restaurante. El rango habitual es 65%-75% en botella y 75%-85% en copa.' }],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Precio vino restaurante', url: `${SITE}/precio-vino-restaurante` }],
      internalLinks: [{ label: 'Calculadora de margen', url: '/calculadora-margen-vino' }, { label: 'Calculadora precio por copa', url: '/herramientas/calculadora-precio-vino-por-copa' }, { label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/carta-papel-vs-digital': {
    meta: { title: 'Carta de Vinos en Papel vs Digital | Winerim', description: 'Comparativa entre carta de vinos en papel y digital: ventajas, inconvenientes, costes y cuándo elegir cada formato.', canonical: `${SITE}/carta-papel-vs-digital`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Carta de vinos en papel vs digital',
      subtitle: 'Análisis objetivo de ventajas e inconvenientes de cada formato para tu restaurante.',
      sections: [
        { heading: 'Ventajas de la carta digital', content: 'Actualización instantánea, cero costes de impresión, datos de interacción, recomendaciones inteligentes y maridajes automáticos.' },
        { heading: 'Cuándo tiene sentido el papel', content: 'En restaurantes de alta gama donde la carta física forma parte de la experiencia de marca y el nivel de servicio.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Carta papel vs digital', url: `${SITE}/carta-papel-vs-digital` }],
      internalLinks: [{ label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Ejemplos carta', url: '/ejemplos-carta-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/ejemplos-carta-vinos': {
    meta: { title: 'Ejemplos de Cartas de Vinos para Restaurantes | Winerim', description: 'Ejemplos reales de cartas de vinos bien diseñadas: estructura, categorías, precios y presentación para diferentes tipos de restaurante.', canonical: `${SITE}/ejemplos-carta-vinos`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Ejemplos de cartas de vinos para restaurantes',
      subtitle: 'Inspiración y buenas prácticas para diseñar tu carta de vinos.',
      sections: [
        { heading: 'Carta para restaurante casual', content: 'Estructura sencilla con 30-50 referencias, organización por estilo y rango de precio accesible.' },
        { heading: 'Carta para gastronómico', content: 'Carta amplia con 100-300+ referencias, organización por región/denominación y selección premium.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Ejemplos carta vinos', url: `${SITE}/ejemplos-carta-vinos` }],
      internalLinks: [{ label: 'Cómo hacer una carta', url: '/como-hacer-una-carta-de-vinos' }, { label: 'Plantilla carta', url: '/recursos/plantilla-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/problemas/carta-de-vinos-no-vende': {
    meta: { title: 'Mi Carta de Vinos No Vende — Diagnóstico y Solución | Winerim', description: 'Tu carta de vinos no genera ventas? Diagnóstico de los problemas más comunes y soluciones prácticas para convertir tu carta en herramienta de venta.', canonical: `${SITE}/problemas/carta-de-vinos-no-vende`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Mi carta de vinos no vende — diagnóstico y solución',
      subtitle: 'Identifica por qué tu carta no genera ventas y cómo solucionarlo.',
      sections: [
        { heading: 'Síntomas de una carta que no vende', content: 'Bajo ticket medio en vino, comensales que no piden vino, vinos caros que nunca se venden y equipo de sala que no recomienda.' },
        { heading: 'Causas habituales', content: 'Carta demasiado larga, mal organizada, sin descripciones atractivas, precios desalineados y falta de recomendaciones activas.' },
        { heading: 'Soluciones concretas', content: 'Reducir referencias, mejorar descripciones, activar recomendaciones inteligentes, optimizar precios y formar al equipo.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Problemas', url: `${SITE}/problemas` }, { name: 'Carta no vende', url: `${SITE}/problemas/carta-de-vinos-no-vende` }],
      internalLinks: [{ label: 'Herramientas', url: '/herramientas' }, { label: 'Cómo vender más vino', url: '/como-vender-mas-vino-en-un-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/implantacion': {
    meta: { title: 'Implantación de Winerim — Cómo Empezar | Winerim', description: 'Proceso de implantación de Winerim en tu restaurante: onboarding, digitalización de carta, formación del equipo y puesta en marcha.', canonical: `${SITE}/implantacion`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Cómo implantar Winerim en tu restaurante',
      subtitle: 'Un proceso sencillo y acompañado para que empieces a vender más vino desde el primer día.',
      sections: [
        { heading: 'Onboarding personalizado', content: 'Analizamos tu carta actual, tu modelo de negocio y tus objetivos para configurar Winerim a medida.' },
        { heading: 'Digitalización de carta', content: 'Transformamos tu carta actual en una carta digital inteligente con fichas, maridajes y recomendaciones.' },
        { heading: 'Formación del equipo', content: 'Formamos a tu equipo de sala para que aproveche al máximo las herramientas de recomendación y venta.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Implantación', url: `${SITE}/implantacion` }],
      internalLinks: [{ label: 'Funcionalidades', url: '/funcionalidades' }, { label: 'Precios', url: '/precios' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/comparativas': {
    meta: { title: 'Comparativas de Software de Carta de Vinos | Winerim', description: 'Compara Winerim con otras soluciones de gestión de cartas de vinos. Análisis objetivo de funcionalidades, precios y resultados.', canonical: `${SITE}/comparativas`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'CollectionPage' },
    content: {
      h1: 'Comparativas de software de carta de vinos',
      subtitle: 'Análisis objetivo para elegir la mejor solución para tu restaurante.',
      sections: [
        { heading: 'Qué comparamos', content: 'Funcionalidades, precio, facilidad de uso, integraciones, soporte y resultados medidos en restaurantes reales.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Comparativas', url: `${SITE}/comparativas` }],
      internalLinks: [{ label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Funcionalidades', url: '/funcionalidades' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/blog/como-organizar-carta-de-vinos': {
    meta: { title: 'Cómo Organizar una Carta de Vinos | Winerim Blog', description: 'Guía para organizar tu carta de vinos: por regiones, estilos, precios o momentos. Mejora la experiencia del comensal y aumenta las ventas.', canonical: `${SITE}/blog/como-organizar-carta-de-vinos`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo organizar una carta de vinos',
      sections: [
        { heading: 'Organización por regiones', content: 'La clasificación geográfica facilita la navegación para comensales con preferencias regionales claras.' },
        { heading: 'Organización por estilos', content: 'Agrupar por estilo (ligeros, con cuerpo, dulces) facilita la elección a comensales menos expertos.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Blog', url: `${SITE}/blog` }, { name: 'Cómo organizar carta', url: `${SITE}/blog/como-organizar-carta-de-vinos` }],
      internalLinks: [{ label: 'Cómo hacer una carta', url: '/como-hacer-una-carta-de-vinos' }, { label: 'Ejemplos carta', url: '/ejemplos-carta-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/blog/cuantos-vinos-carta-restaurante': {
    meta: { title: 'Cuántos Vinos Debe Tener una Carta de Restaurante | Winerim Blog', description: 'Guía para definir el número óptimo de referencias en tu carta de vinos según tipo de restaurante, público y modelo de negocio.', canonical: `${SITE}/blog/cuantos-vinos-carta-restaurante`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cuántos vinos debe tener una carta de restaurante',
      sections: [
        { heading: 'El problema de la carta excesiva', content: 'Más referencias no significa más ventas. A partir de cierto punto, la parálisis de elección reduce el ticket medio.' },
        { heading: 'Rangos recomendados', content: 'Casual: 30-50 referencias. Gastronómico: 80-200. Vinoteca: 200+. El número óptimo depende del servicio y el público.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Blog', url: `${SITE}/blog` }, { name: 'Cuántos vinos', url: `${SITE}/blog/cuantos-vinos-carta-restaurante` }],
      internalLinks: [{ label: 'Cómo hacer una carta', url: '/como-hacer-una-carta-de-vinos' }, { label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/blog/como-disenar-carta-vinos-rentable': {
    meta: { title: 'Cómo Diseñar una Carta de Vinos Rentable | Winerim Blog', description: 'Claves para diseñar una carta de vinos que maximice ingresos y margen: selección, precios, estructura y análisis de rendimiento.', canonical: `${SITE}/blog/como-disenar-carta-vinos-rentable`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo diseñar una carta de vinos rentable',
      sections: [
        { heading: 'Selección estratégica', content: 'Elige referencias que cubran rangos de precio, estilos y ocasiones sin redundancia. Cada vino debe tener un rol claro.' },
        { heading: 'Pricing inteligente', content: 'Diferencia márgenes por rango de precio: mayor margen porcentual en vinos económicos, mayor margen absoluto en premium.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Blog', url: `${SITE}/blog` }, { name: 'Carta rentable', url: `${SITE}/blog/como-disenar-carta-vinos-rentable` }],
      internalLinks: [{ label: 'Calculadora de margen', url: '/calculadora-margen-vino' }, { label: 'Checklist carta rentable', url: '/recursos/checklist-carta-de-vinos-rentable' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante': {
    meta: { title: 'Cómo Mejorar la Rotación de Vinos en Restaurantes | Winerim', description: 'Estrategias para mejorar la rotación de vinos: detección de stock muerto, ajuste de carta, promoción por copa y análisis de datos.', canonical: `${SITE}/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo mejorar la rotación de vinos en un restaurante',
      sections: [
        { heading: 'Diagnóstico de rotación', content: 'Clasifica cada referencia por frecuencia de venta. Las que no se venden en 30 días necesitan acción inmediata.' },
        { heading: 'Estrategias de activación', content: 'Vino por copa, recomendación activa del equipo, maridajes visibles y promociones temporales.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Rotación de vinos', url: `${SITE}/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante` }],
      internalLinks: [{ label: 'Calculadora stock muerto', url: '/herramientas/calculadora-stock-muerto' }, { label: 'Guía detectar vinos muertos', url: '/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-crear-una-estrategia-de-maridaje-en-restauracion': {
    meta: { title: 'Cómo Crear una Estrategia de Maridaje en Restauración | Winerim', description: 'Guía para desarrollar una estrategia de maridaje efectiva: selección, formación del equipo y herramientas tecnológicas.', canonical: `${SITE}/guias/como-crear-una-estrategia-de-maridaje-en-restauracion`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo crear una estrategia de maridaje en restauración',
      sections: [
        { heading: 'Por qué el maridaje vende', content: 'Un maridaje bien presentado elimina la barrera de elección y aumenta la probabilidad de pedido de vino con cada plato.' },
        { heading: 'Diseñar maridajes rentables', content: 'Selecciona vinos que complementen los platos principales y tengan buen margen. Usa IA para automatizar sugerencias.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Estrategia maridaje', url: `${SITE}/guias/como-crear-una-estrategia-de-maridaje-en-restauracion` }],
      internalLinks: [{ label: 'Biblioteca maridajes', url: '/biblioteca-vino/maridajes' }, { label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-estructurar-carta-vinos-grupo-restauracion': {
    meta: { title: 'Cómo Estructurar la Carta de Vinos en Grupos de Restauración | Winerim', description: 'Guía para diseñar y gestionar cartas de vinos coherentes en grupos multi-restaurante: estandarización, diferenciación y control.', canonical: `${SITE}/guias/como-estructurar-carta-vinos-grupo-restauracion`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo estructurar la carta de vinos en grupos de restauración',
      sections: [
        { heading: 'Carta base vs diferenciación local', content: 'Define una estructura base común y permite adaptaciones locales controladas por zona, tipo de cocina o perfil de cliente.' },
        { heading: 'Control centralizado', content: 'Panel único para gestionar precios, referencias y maridajes en todos los locales con coherencia de marca.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Carta grupos restauración', url: `${SITE}/guias/como-estructurar-carta-vinos-grupo-restauracion` }],
      internalLinks: [{ label: 'Grupos restauración', url: '/soluciones/grupos-restauracion' }, { label: 'Funcionalidades', url: '/funcionalidades' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-fijar-estrategia-rentable-vino-por-copa': {
    meta: { title: 'Cómo Fijar una Estrategia Rentable de Vino por Copa | Winerim', description: 'Guía para diseñar una oferta de vino por copa rentable: selección, pricing, rotación y control de merma.', canonical: `${SITE}/guias/como-fijar-estrategia-rentable-vino-por-copa`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo fijar una estrategia rentable de vino por copa',
      sections: [
        { heading: 'Selección de referencias por copa', content: 'Elige vinos con buena rotación, margen alto y complementariedad con tu carta de comidas.' },
        { heading: 'Pricing por copa', content: 'El precio debe cubrir el coste de la botella con 3-4 copas. Las restantes son beneficio puro.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Estrategia vino por copa', url: `${SITE}/guias/como-fijar-estrategia-rentable-vino-por-copa` }],
      internalLinks: [{ label: 'Calculadora precio copa', url: '/herramientas/calculadora-precio-vino-por-copa' }, { label: 'Diagnóstico vino por copa', url: '/herramientas/diagnostico-vino-por-copa' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad': {
    meta: { title: 'Cómo Detectar Vinos Muertos en tu Carta | Winerim', description: 'Guía para identificar vinos con baja rotación que inmovilizan capital y frenan la rentabilidad de tu carta.', canonical: `${SITE}/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo detectar vinos muertos que frenan tu rentabilidad',
      sections: [
        { heading: 'Qué es un vino muerto', content: 'Referencia con menos de 1 venta/mes que ocupa capital, espacio en bodega y complejidad en la gestión.' },
        { heading: 'Protocolo de detección', content: 'Analiza rotación mensual por referencia. Clasifica en activos, lentos y muertos. Actúa sobre los muertos.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Detectar vinos muertos', url: `${SITE}/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad` }],
      internalLinks: [{ label: 'Calculadora stock muerto', url: '/herramientas/calculadora-stock-muerto' }, { label: 'Rotación de vinos', url: '/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-formar-equipo-sala-para-vender-vino': {
    meta: { title: 'Cómo Formar al Equipo de Sala para Vender Vino | Winerim', description: 'Guía de formación para equipos de sala: conocimiento básico, técnicas de recomendación y uso de herramientas digitales.', canonical: `${SITE}/guias/como-formar-equipo-sala-para-vender-vino`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo formar al equipo de sala para vender vino',
      sections: [
        { heading: 'Conocimiento mínimo viable', content: 'Un camarero no necesita ser sommelier. Con conocer 5-10 vinos clave de la carta y sus maridajes principales, puede recomendar con confianza.' },
        { heading: 'Herramientas de apoyo', content: 'El recomendador inteligente actúa como asistente digital: el equipo consulta en tiempo real y aprende mientras trabaja.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Formar equipo sala', url: `${SITE}/guias/como-formar-equipo-sala-para-vender-vino` }],
      internalLinks: [{ label: 'Cómo vender más vino', url: '/como-vender-mas-vino-en-un-restaurante' }, { label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-usar-datos-para-decidir-que-vinos-comprar': {
    meta: { title: 'Cómo Usar Datos para Decidir Qué Vinos Comprar | Winerim', description: 'Guía para tomar decisiones de compra de vino basadas en datos: rotación, margen, estacionalidad y tendencias de venta.', canonical: `${SITE}/guias/como-usar-datos-para-decidir-que-vinos-comprar`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo usar datos para decidir qué vinos comprar',
      sections: [
        { heading: 'Datos clave para decisiones de compra', content: 'Rotación por referencia, margen bruto, estacionalidad de demanda y análisis de categorías (tinto/blanco/rosado/espumoso).' },
        { heading: 'De la intuición a los datos', content: 'Sustituye el criterio subjetivo por métricas objetivas. Los datos revelan qué vinos realmente se venden y cuáles ocupan espacio.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Datos compra vinos', url: `${SITE}/guias/como-usar-datos-para-decidir-que-vinos-comprar` }],
      internalLinks: [{ label: 'Winerim Supply', url: '/producto/winerim-supply' }, { label: 'Inteligencia dinámica', url: '/producto/inteligencia-dinamica' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-conectar-carta-stock-ventas-margen': {
    meta: { title: 'Cómo Conectar Carta, Stock, Ventas y Margen | Winerim', description: 'Guía para integrar carta de vinos con datos de stock, ventas y margen en un solo flujo de gestión inteligente.', canonical: `${SITE}/guias/como-conectar-carta-stock-ventas-margen`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo conectar carta, stock, ventas y margen',
      sections: [
        { heading: 'El problema de los silos', content: 'Carta, stock, ventas y margen suelen gestionarse por separado. Sin conexión, las decisiones son lentas e imprecisas.' },
        { heading: 'Integración con Winerim', content: 'Winerim unifica los 4 pilares: la carta refleja el stock real, los datos de venta alimentan las recomendaciones y el margen se optimiza en tiempo real.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Conectar carta-stock-ventas', url: `${SITE}/guias/como-conectar-carta-stock-ventas-margen` }],
      internalLinks: [{ label: 'Funcionalidades', url: '/funcionalidades' }, { label: 'Winerim Supply', url: '/producto/winerim-supply' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-gestionar-carta-vinos-grupos-restauracion': {
    meta: { title: 'Cómo Gestionar la Carta de Vinos en Grupos de Restauración | Winerim', description: 'Guía para la gestión eficiente de cartas de vinos en cadenas y grupos multi-restaurante.', canonical: `${SITE}/guias/como-gestionar-carta-vinos-grupos-restauracion`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo gestionar la carta de vinos en grupos de restauración',
      sections: [
        { heading: 'Retos específicos de grupos', content: 'Coherencia de marca, diferenciación por local, negociación con proveedores y reporting consolidado.' },
        { heading: 'Solución multi-local', content: 'Panel centralizado con control de carta por local, analytics comparativos y gestión unificada de proveedores.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Gestionar carta grupos', url: `${SITE}/guias/como-gestionar-carta-vinos-grupos-restauracion` }],
      internalLinks: [{ label: 'Grupos restauración', url: '/soluciones/grupos-restauracion' }, { label: 'Auditor multi-local', url: '/herramientas/auditor-carta-multilocal' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-implantar-vino-por-copa-sin-perder-margen': {
    meta: { title: 'Cómo Implantar Vino por Copa sin Perder Margen | Winerim', description: 'Guía para implementar una oferta de vino por copa rentable controlando merma, rotación y pricing.', canonical: `${SITE}/guias/como-implantar-vino-por-copa-sin-perder-margen`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo implantar vino por copa sin perder margen',
      sections: [
        { heading: 'Control de merma', content: 'Sistemas de conservación, rotación diaria y seguimiento de botellas abiertas para minimizar pérdidas.' },
        { heading: 'Pricing que protege el margen', content: 'Calcula precio por copa para recuperar coste de botella con 3 copas. Todo lo vendido después es beneficio.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Vino por copa sin perder margen', url: `${SITE}/guias/como-implantar-vino-por-copa-sin-perder-margen` }],
      internalLinks: [{ label: 'Calculadora precio copa', url: '/herramientas/calculadora-precio-vino-por-copa' }, { label: 'Vino por copa', url: '/vino-por-copa-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-usar-winerim-sin-sumiller': {
    meta: { title: 'Cómo Usar Winerim sin Sumiller | Winerim', description: 'Guía para restaurantes sin sommelier: cómo Winerim actúa como asistente inteligente para que tu equipo recomiende vino con confianza.', canonical: `${SITE}/guias/como-usar-winerim-sin-sumiller`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo usar Winerim sin sumiller',
      sections: [
        { heading: 'El recomendador como sommelier digital', content: 'Winerim sugiere vinos al comensal basándose en plato, preferencias y stock. Tu equipo no necesita ser experto.' },
        { heading: 'Formación progresiva', content: 'El equipo aprende sobre vinos mientras usa la herramienta. Las fichas y maridajes funcionan como material de formación continua.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Winerim sin sumiller', url: `${SITE}/guias/como-usar-winerim-sin-sumiller` }],
      internalLinks: [{ label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Formar equipo sala', url: '/guias/como-formar-equipo-sala-para-vender-vino' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-decidir-surtido-segun-ticket-medio-tipo-local': {
    meta: { title: 'Cómo Decidir el Surtido de Vinos según Ticket Medio | Winerim', description: 'Guía para seleccionar el surtido de vinos adecuado según el ticket medio y tipo de local.', canonical: `${SITE}/guias/como-decidir-surtido-segun-ticket-medio-tipo-local`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo decidir el surtido de vinos según ticket medio y tipo de local',
      sections: [
        { heading: 'Ticket medio y selección', content: 'El ticket medio determina el rango de precios aceptable. Un restaurante con ticket de 40€ no necesita vinos de 200€.' },
        { heading: 'Adaptación por tipo de local', content: 'Casual, gastronómico, vinoteca y hotel requieren surtidos muy diferentes en profundidad y precio.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Surtido según ticket medio', url: `${SITE}/guias/como-decidir-surtido-segun-ticket-medio-tipo-local` }],
      internalLinks: [{ label: 'Calculadora ticket medio', url: '/herramientas/calculadora-ticket-medio-vino' }, { label: 'Aumentar ticket medio', url: '/soluciones/aumentar-ticket-medio-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-detectar-canibalizacion-vinos-carta': {
    meta: { title: 'Cómo Detectar Canibalización de Vinos en tu Carta | Winerim', description: 'Guía para identificar vinos que se canibalizan entre sí en tu carta y cómo optimizar la selección.', canonical: `${SITE}/guias/como-detectar-canibalizacion-vinos-carta`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo detectar canibalización de vinos en tu carta',
      sections: [
        { heading: 'Qué es la canibalización', content: 'Ocurre cuando dos o más referencias compiten por el mismo comensal: similar región, estilo y precio. Una vende, las otras no.' },
        { heading: 'Cómo detectarla', content: 'Agrupa referencias por perfil (región + estilo + rango precio). Si hay más de 2-3 en el mismo grupo, hay riesgo de canibalización.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Canibalización vinos', url: `${SITE}/guias/como-detectar-canibalizacion-vinos-carta` }],
      internalLinks: [{ label: 'Wine List Score', url: '/herramientas/wine-list-score' }, { label: 'Rotación de vinos', url: '/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/guias/como-revisar-carta-vinos-cada-mes': {
    meta: { title: 'Cómo Revisar tu Carta de Vinos Cada Mes | Winerim', description: 'Protocolo mensual para revisar y optimizar tu carta de vinos: métricas clave, acciones y calendario.', canonical: `${SITE}/guias/como-revisar-carta-vinos-cada-mes`, ogImage: OG_IMAGE, lang: 'es', type: 'article', schemaType: 'Article' },
    content: {
      h1: 'Cómo revisar tu carta de vinos cada mes',
      sections: [
        { heading: 'Métricas de revisión mensual', content: 'Ventas por referencia, rotación, margen bruto, vinos muertos y evolución del ticket medio en vino.' },
        { heading: 'Acciones tras la revisión', content: 'Descatalogar vinos muertos, ajustar precios, incorporar novedades y actualizar recomendaciones.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Guías', url: `${SITE}/guias-y-recursos` }, { name: 'Revisión mensual carta', url: `${SITE}/guias/como-revisar-carta-vinos-cada-mes` }],
      internalLinks: [{ label: 'Calculadora de margen', url: '/calculadora-margen-vino' }, { label: 'Detectar vinos muertos', url: '/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/afiliate': {
    meta: { title: 'Programa de Afiliados Winerim', description: 'Únete al programa de afiliados de Winerim y gana comisiones recomendando la carta inteligente de vinos a restaurantes.', canonical: `${SITE}/afiliate`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Programa de afiliados Winerim',
      sections: [{ heading: 'Cómo funciona', content: 'Recomienda Winerim a restaurantes de tu red. Por cada cliente que se convierta, recibes una comisión recurrente.' }],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Afíliate', url: `${SITE}/afiliate` }],
      internalLinks: [{ label: 'Software carta de vinos', url: '/software-carta-de-vinos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/sommelier-corner': {
    meta: { title: 'Sommelier Corner — Contenido para Profesionales del Vino | Winerim', description: 'Espacio dedicado a sommeliers y profesionales del vino: tendencias, análisis de mercado, herramientas y recursos premium.', canonical: `${SITE}/sommelier-corner`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'CollectionPage' },
    content: {
      h1: 'Sommelier Corner',
      subtitle: 'Contenido exclusivo para profesionales del vino en restauración.',
      sections: [{ heading: 'Recursos para sommeliers', content: 'Análisis de tendencias, benchmarks del sector, herramientas de gestión y contenido editorial curado para profesionales.' }],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Sommelier Corner', url: `${SITE}/sommelier-corner` }],
      internalLinks: [{ label: 'Biblioteca de vino', url: '/biblioteca-vino' }, { label: 'Benchmarks', url: '/benchmarks-playbooks' }, { label: 'Blog', url: '/blog' }],
    },
  },
  '/herramientas/calculadora-precio-vino-por-copa': {
    meta: { title: 'Calculadora de Precio de Vino por Copa | Winerim', description: 'Calcula el precio óptimo por copa para maximizar la rentabilidad de tu oferta de vino por copa. Herramienta gratuita.', canonical: `${SITE}/herramientas/calculadora-precio-vino-por-copa`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Calculadora de precio de vino por copa',
      subtitle: 'Determina el precio óptimo por copa para maximizar la rentabilidad.',
      sections: [
        { heading: 'Cómo funciona', content: 'Introduce el coste de la botella, número de copas por botella y margen objetivo. La calculadora sugiere el precio por copa ideal.' },
        { heading: 'Regla de las 3 copas', content: 'El precio debe permitir recuperar el coste total de la botella con las primeras 3 copas vendidas.' },
      ],
      faqs: [{ q: '¿Es gratuita?', a: 'Sí. 100% gratuita y sin registro.' }],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Calculadora precio copa', url: `${SITE}/herramientas/calculadora-precio-vino-por-copa` }],
      internalLinks: [{ label: 'Herramientas', url: '/herramientas' }, { label: 'Vino por copa', url: '/vino-por-copa-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/herramientas/diagnostico-vino-por-copa': {
    meta: { title: 'Diagnóstico de Vino por Copa | Winerim', description: 'Analiza tu oferta actual de vino por copa e identifica oportunidades de mejora en selección, precio y presentación.', canonical: `${SITE}/herramientas/diagnostico-vino-por-copa`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Diagnóstico de vino por copa',
      subtitle: 'Evalúa tu oferta actual de vino por copa y descubre oportunidades de mejora.',
      sections: [
        { heading: 'Qué evalúa', content: 'Diversidad de estilos, equilibrio de precios, rotación esperada, margen por copa y complementariedad con la carta de comidas.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Diagnóstico vino por copa', url: `${SITE}/herramientas/diagnostico-vino-por-copa` }],
      internalLinks: [{ label: 'Calculadora precio copa', url: '/herramientas/calculadora-precio-vino-por-copa' }, { label: 'Vino por copa', url: '/vino-por-copa-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/herramientas/wine-list-score': {
    meta: { title: 'Wine List Score — Evalúa tu Carta de Vinos | Winerim', description: 'Evalúa la calidad y completitud de tu carta de vinos con un análisis automático de diversidad, precios, maridajes y estructura.', canonical: `${SITE}/herramientas/wine-list-score`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Wine List Score — Evalúa tu carta de vinos',
      subtitle: 'Puntuación automática de calidad, diversidad y rentabilidad de tu carta.',
      sections: [
        { heading: 'Cómo funciona', content: 'Sube tu carta y obtén una puntuación basada en diversidad, equilibrio de precios, cobertura de estilos y estructura general.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Wine List Score', url: `${SITE}/herramientas/wine-list-score` }],
      internalLinks: [{ label: 'Herramientas', url: '/herramientas' }, { label: 'Analizador de carta', url: '/analisis-carta' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/herramientas/calculadora-stock-muerto': {
    meta: { title: 'Calculadora de Stock Muerto en Bodega | Winerim', description: 'Identifica cuánto capital tienes inmovilizado en vinos con baja rotación y calcula el coste de oportunidad.', canonical: `${SITE}/herramientas/calculadora-stock-muerto`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Calculadora de stock muerto en bodega',
      subtitle: 'Descubre cuánto capital tienes parado en vinos que no se venden.',
      sections: [
        { heading: 'Qué calcula', content: 'Capital inmovilizado, coste de oportunidad mensual y proyección de pérdida si no se actúa.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Calculadora stock muerto', url: `${SITE}/herramientas/calculadora-stock-muerto` }],
      internalLinks: [{ label: 'Detectar vinos muertos', url: '/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad' }, { label: 'Herramientas', url: '/herramientas' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/herramientas/calculadora-ticket-medio-vino': {
    meta: { title: 'Calculadora de Ticket Medio de Vino | Winerim', description: 'Calcula y optimiza el ticket medio de vino en tu restaurante. Herramienta gratuita con benchmarks del sector.', canonical: `${SITE}/herramientas/calculadora-ticket-medio-vino`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Calculadora de ticket medio de vino',
      subtitle: 'Mide y mejora el gasto medio en vino por mesa.',
      sections: [
        { heading: 'Cómo funciona', content: 'Introduce ventas de vino y número de mesas. Obtén tu ticket medio actual y comparativa con benchmarks.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Calculadora ticket medio', url: `${SITE}/herramientas/calculadora-ticket-medio-vino` }],
      internalLinks: [{ label: 'Aumentar ticket medio', url: '/soluciones/aumentar-ticket-medio-restaurante' }, { label: 'Herramientas', url: '/herramientas' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/herramientas/auditor-carta-multilocal': {
    meta: { title: 'Auditor de Carta Multi-Local | Winerim', description: 'Audita y compara las cartas de vinos de todos tus locales. Detecta inconsistencias y oportunidades de mejora.', canonical: `${SITE}/herramientas/auditor-carta-multilocal`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Auditor de carta de vinos multi-local',
      subtitle: 'Compara y optimiza las cartas de vinos de todos tus restaurantes.',
      sections: [
        { heading: 'Qué detecta', content: 'Inconsistencias de precios entre locales, referencias duplicadas, gaps de cobertura y oportunidades de estandarización.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Auditor multi-local', url: `${SITE}/herramientas/auditor-carta-multilocal` }],
      internalLinks: [{ label: 'Grupos restauración', url: '/soluciones/grupos-restauracion' }, { label: 'Herramientas', url: '/herramientas' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/herramientas/calculadora-compra-inteligente': {
    meta: { title: 'Calculadora de Compra Inteligente de Vino | Winerim', description: 'Optimiza tus compras de vino con datos de rotación, margen y estacionalidad. Herramienta gratuita para restauradores.', canonical: `${SITE}/herramientas/calculadora-compra-inteligente`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Calculadora de compra inteligente de vino',
      subtitle: 'Decide qué, cuánto y cuándo comprar basándote en datos reales.',
      sections: [
        { heading: 'Cómo funciona', content: 'Introduce rotación actual, margen objetivo y estacionalidad. Obtén recomendaciones de volumen de compra por referencia.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Herramientas', url: `${SITE}/herramientas` }, { name: 'Compra inteligente', url: `${SITE}/herramientas/calculadora-compra-inteligente` }],
      internalLinks: [{ label: 'Winerim Supply', url: '/producto/winerim-supply' }, { label: 'Guía compras con datos', url: '/guias/como-usar-datos-para-decidir-que-vinos-comprar' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/faqs': {
    meta: { title: 'Preguntas Frecuentes sobre Winerim | FAQ', description: 'Respuestas a las preguntas más habituales sobre Winerim: funcionalidades, precios, implantación, soporte y más.', canonical: `${SITE}/faqs`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'FAQPage' },
    content: {
      h1: 'Preguntas frecuentes sobre Winerim',
      subtitle: 'Todo lo que necesitas saber antes de empezar.',
      sections: [
        { heading: 'Sobre el producto', content: 'Winerim es un software de IA para gestionar la carta de vinos de restaurantes, hoteles y vinotecas.' },
        { heading: 'Implantación', content: 'La implantación típica dura entre 1 y 3 semanas, con soporte dedicado.' },
        { heading: 'Precios y planes', content: 'Ofrecemos planes adaptados al tamaño y tipo de negocio.' },
      ],
      faqs: [
        { q: '¿Qué es Winerim?', a: 'Winerim es un software de IA que ayuda a restaurantes a vender más vino, optimizar márgenes y controlar la bodega.' },
        { q: '¿Cuánto cuesta Winerim?', a: 'Ofrecemos planes desde 49€/mes. Consulta nuestra página de precios para más detalles.' },
        { q: '¿Necesito un sumiller?', a: 'No. Winerim está diseñado para funcionar sin sumiller, proporcionando recomendaciones automáticas.' },
        { q: '¿Cuánto tarda la implantación?', a: 'Entre 1 y 3 semanas, dependiendo del número de referencias y locales.' },
      ],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'FAQ', url: `${SITE}/faqs` }],
      internalLinks: [{ label: 'Precios', url: '/precios' }, { label: 'Demo', url: '/demo' }, { label: 'Contacto', url: '/contacto' }],
    },
  },
  '/what-is-winerim': {
    meta: { title: 'What Is Winerim? AI Wine List Software for Restaurants', description: 'Winerim is an AI-powered wine list management platform that helps restaurants sell more wine, optimize margins, and control inventory.', canonical: `${SITE}/what-is-winerim`, ogImage: OG_IMAGE, lang: 'en', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'What is Winerim?',
      subtitle: 'AI-powered wine list management for restaurants, hotels and wine bars.',
      sections: [
        { heading: 'The Problem', content: 'Most restaurants lose revenue because their wine list is static, unoptimized and disconnected from sales data.' },
        { heading: 'The Solution', content: 'Winerim uses AI to create dynamic, data-driven wine lists that increase average ticket, optimize margins and reduce dead stock.' },
        { heading: 'Key Features', content: 'Smart digital wine list, AI recommendations, food-wine pairing, margin analytics, stock rotation alerts, benchmarking and procurement intelligence.' },
      ],
      faqs: [
        { q: 'How does Winerim work?', a: 'Winerim connects to your POS and inventory systems to provide real-time insights and automated recommendations for your wine program.' },
        { q: 'Is Winerim available in English?', a: 'Yes. Winerim supports multiple languages including English, Spanish, Italian and French.' },
      ],
      breadcrumbs: [{ name: 'Home', url: `${SITE}/` }, { name: 'What is Winerim', url: `${SITE}/what-is-winerim` }],
      internalLinks: [{ label: 'Features', url: '/funcionalidades' }, { label: 'Pricing', url: '/precios' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/ai-wine-software': {
    meta: { title: 'AI Wine Software for Restaurants | Winerim', description: 'Discover how AI wine software helps restaurants optimize wine lists, increase revenue and reduce waste.', canonical: `${SITE}/ai-wine-software`, ogImage: OG_IMAGE, lang: 'en', type: 'website', schemaType: 'SoftwareApplication' },
    content: {
      h1: 'AI Wine Software for Restaurants',
      subtitle: 'Optimize your wine program with artificial intelligence.',
      sections: [
        { heading: 'Why AI for Wine?', content: 'AI analyzes sales patterns, margins, rotation and guest preferences to recommend the optimal wine list composition.' },
        { heading: 'What Winerim Does', content: 'Dynamic wine list management, automated pricing suggestions, dead stock alerts, food pairing engine and procurement intelligence.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Home', url: `${SITE}/` }, { name: 'AI Wine Software', url: `${SITE}/ai-wine-software` }],
      internalLinks: [{ label: 'What is Winerim', url: '/what-is-winerim' }, { label: 'Features', url: '/funcionalidades' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/wine-list-management-software': {
    meta: { title: 'Wine List Management Software | Winerim', description: 'Professional wine list management software for restaurants. Digital wine menus, AI recommendations, margin analytics and inventory control.', canonical: `${SITE}/wine-list-management-software`, ogImage: OG_IMAGE, lang: 'en', type: 'website', schemaType: 'SoftwareApplication' },
    content: {
      h1: 'Wine List Management Software',
      subtitle: 'The complete platform for restaurant wine programs.',
      sections: [
        { heading: 'Digital Wine List', content: 'Create beautiful, interactive digital wine lists that update in real-time across all your locations.' },
        { heading: 'Analytics & Insights', content: 'Track sales, margins, rotation and guest preferences with powerful analytics dashboards.' },
        { heading: 'AI Recommendations', content: 'Get data-driven suggestions for pricing, promotions, food pairings and list composition.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Home', url: `${SITE}/` }, { name: 'Wine List Software', url: `${SITE}/wine-list-management-software` }],
      internalLinks: [{ label: 'What is Winerim', url: '/what-is-winerim' }, { label: 'Pricing', url: '/precios' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/soluciones/hoteles': {
    meta: { title: 'Software de Carta de Vinos para Hoteles | Winerim', description: 'Gestiona la carta de vinos de tu hotel con IA: room service, restaurante, bar y eventos, todo centralizado.', canonical: `${SITE}/soluciones/hoteles`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Carta de vinos inteligente para hoteles',
      subtitle: 'Centraliza y optimiza el programa de vinos en todos los puntos de venta del hotel.',
      sections: [
        { heading: 'Múltiples puntos de venta', content: 'Restaurante, bar, room service y eventos: una sola plataforma para gestionar la carta en cada punto.' },
        { heading: 'Experiencia de huésped', content: 'Carta digital interactiva con maridajes y recomendaciones personalizadas.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Soluciones', url: `${SITE}/soluciones` }, { name: 'Hoteles', url: `${SITE}/soluciones/hoteles` }],
      internalLinks: [{ label: 'Grupos restauración', url: '/soluciones/grupos-restauracion' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/soluciones/restaurantes-sin-sumiller': {
    meta: { title: 'Software de Vinos para Restaurantes sin Sumiller | Winerim', description: 'Winerim actúa como tu sumiller digital: recomendaciones automáticas, maridajes y control de carta sin necesidad de experto.', canonical: `${SITE}/soluciones/restaurantes-sin-sumiller`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Software de vinos para restaurantes sin sumiller',
      subtitle: 'No necesitas un sumiller. Necesitas datos y automatización.',
      sections: [
        { heading: 'El problema', content: 'Sin sumiller, la carta se estanca, los márgenes bajan y el equipo de sala no sabe recomendar.' },
        { heading: 'La solución', content: 'Winerim automatiza recomendaciones, maridajes y control de stock.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Soluciones', url: `${SITE}/soluciones` }, { name: 'Sin sumiller', url: `${SITE}/soluciones/restaurantes-sin-sumiller` }],
      internalLinks: [{ label: 'Guía sin sumiller', url: '/guias/como-usar-winerim-sin-sumiller' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/soluciones/restaurantes-gastronomicos': {
    meta: { title: 'Software de Carta de Vinos para Restaurantes Gastronómicos | Winerim', description: 'Gestiona cartas premium con cientos de referencias, control de añadas, maridajes de autor y analítica avanzada.', canonical: `${SITE}/soluciones/restaurantes-gastronomicos`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Carta de vinos para restaurantes gastronómicos',
      subtitle: 'La herramienta que usan los mejores restaurantes.',
      sections: [
        { heading: 'Cartas extensas bajo control', content: 'Gestiona cientos de referencias con fichas detalladas, notas de cata, añadas y puntuaciones.' },
        { heading: 'Maridajes de autor', content: 'Crea experiencias de maridaje únicas con el motor de IA de Winerim.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Soluciones', url: `${SITE}/soluciones` }, { name: 'Gastronómicos', url: `${SITE}/soluciones/restaurantes-gastronomicos` }],
      internalLinks: [{ label: 'Carta amplia', url: '/soluciones/carta-amplia' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/soluciones/wine-bars': {
    meta: { title: 'Software de Carta de Vinos para Wine Bars y Vinotecas | Winerim', description: 'Optimiza tu wine bar con carta digital, vino por copa inteligente, rotación controlada y recomendaciones.', canonical: `${SITE}/soluciones/wine-bars`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Carta de vinos inteligente para wine bars',
      subtitle: 'Maximiza el vino por copa y la experiencia de cliente.',
      sections: [
        { heading: 'Vino por copa optimizado', content: 'Selecciona las mejores referencias para copa basándote en datos de rotación, margen y preferencias.' },
        { heading: 'Experiencia interactiva', content: 'Carta digital con notas de cata, maridajes y recomendaciones personalizadas.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Soluciones', url: `${SITE}/soluciones` }, { name: 'Wine Bars', url: `${SITE}/soluciones/wine-bars` }],
      internalLinks: [{ label: 'Vino por copa', url: '/vino-por-copa-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/soluciones/carta-amplia': {
    meta: { title: 'Gestión de Carta de Vinos Amplia (+100 refs) | Winerim', description: 'Gestiona cartas con más de 100 referencias sin perder el control: rotación, márgenes, stock muerto y optimización.', canonical: `${SITE}/soluciones/carta-amplia`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Gestión de carta de vinos amplia',
      subtitle: 'Más de 100 referencias bajo control con datos en tiempo real.',
      sections: [
        { heading: 'El reto', content: 'Con cartas grandes, el stock muerto crece y es difícil saber qué funciona.' },
        { heading: 'La solución', content: 'Winerim analiza cada referencia y te dice cuáles potenciar, sustituir o eliminar.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Soluciones', url: `${SITE}/soluciones` }, { name: 'Carta amplia', url: `${SITE}/soluciones/carta-amplia` }],
      internalLinks: [{ label: 'Detectar vinos muertos', url: '/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/soluciones/carta-crecimiento': {
    meta: { title: 'Cómo Hacer Crecer tu Carta de Vinos de Forma Rentable | Winerim', description: 'Estrategias para ampliar tu carta sin disparar costes: análisis de demanda, márgenes y rotación con IA.', canonical: `${SITE}/soluciones/carta-crecimiento`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Haz crecer tu carta de vinos de forma rentable',
      subtitle: 'Amplía con datos, no con intuición.',
      sections: [
        { heading: 'Crecer con criterio', content: 'Analiza gaps en tu oferta y oportunidades de margen antes de añadir referencias.' },
        { heading: 'Winerim te guía', content: 'Recomendaciones basadas en benchmarking, ventas históricas y tendencias.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Soluciones', url: `${SITE}/soluciones` }, { name: 'Carta en crecimiento', url: `${SITE}/soluciones/carta-crecimiento` }],
      internalLinks: [{ label: 'Cuántos vinos tener', url: '/blog/cuantos-vinos-carta-restaurante' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/soluciones/inteligencia-de-compras': {
    meta: { title: 'Inteligencia de Compras para Restaurantes | Winerim', description: 'Optimiza las compras de vino con datos de rotación, margen, estacionalidad y benchmarking.', canonical: `${SITE}/soluciones/inteligencia-de-compras`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Inteligencia de compras para restaurantes',
      subtitle: 'Compra mejor vino, en la cantidad justa, al mejor precio.',
      sections: [
        { heading: 'Datos para decidir', content: 'Rotación real, margen por referencia, estacionalidad y comparativa con el mercado.' },
        { heading: 'Automatización', content: 'Alertas de reposición, sugerencias de sustitución y negociación informada.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Soluciones', url: `${SITE}/soluciones` }, { name: 'Inteligencia de compras', url: `${SITE}/soluciones/inteligencia-de-compras` }],
      internalLinks: [{ label: 'Winerim Supply', url: '/producto/winerim-supply' }, { label: 'Guía compras', url: '/guias/como-usar-datos-para-decidir-que-vinos-comprar' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/decision-center': {
    meta: { title: 'Decision Center — Centro de Decisiones para tu Carta | Winerim', description: 'Insights accionables sobre carta, márgenes, rotación, compras y vino por copa.', canonical: `${SITE}/decision-center`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Decision Center de Winerim',
      subtitle: 'Insights accionables para cada área de tu programa de vinos.',
      sections: [
        { heading: 'Áreas de decisión', content: 'Carta y equilibrio, márgenes y pricing, stock y rotación, compras y reposición, vino por copa y benchmarking.' },
        { heading: 'Cómo funciona', content: 'Selecciona un área, explora los insights y aplica las recomendaciones directamente.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Decision Center', url: `${SITE}/decision-center` }],
      internalLinks: [{ label: 'Inteligencia dinámica', url: '/producto/inteligencia-dinamica' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/recursos': {
    meta: { title: 'Recursos Descargables para Restaurantes | Winerim', description: 'Plantillas, checklists y herramientas descargables para optimizar la gestión de vinos.', canonical: `${SITE}/recursos`, ogImage: OG_IMAGE, lang: 'es', type: 'website', schemaType: 'CollectionPage' },
    content: {
      h1: 'Recursos descargables para restaurantes',
      subtitle: 'Plantillas y herramientas prácticas para mejorar tu carta de vinos.',
      sections: [
        { heading: 'Plantillas', content: 'Descarga plantillas profesionales para diseñar y organizar tu carta.' },
        { heading: 'Checklists', content: 'Listas de verificación para revisión mensual, auditoría y optimización de márgenes.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Inicio', url: `${SITE}/` }, { name: 'Recursos', url: `${SITE}/recursos` }],
      internalLinks: [{ label: 'Guías y recursos', url: '/guias-y-recursos' }, { label: 'Demo', url: '/demo' }],
    },
  },
  '/en/digital-wine-list': {
    meta: { title: 'Digital Wine List for Restaurants | Winerim', description: 'Create interactive digital wine lists with AI-powered recommendations, food pairings and real-time analytics.', canonical: `${SITE}/en/digital-wine-list`, ogImage: OG_IMAGE, lang: 'en', type: 'website', schemaType: 'WebPage' },
    content: {
      h1: 'Digital Wine List for Restaurants',
      subtitle: 'Interactive, data-driven wine menus powered by AI.',
      sections: [
        { heading: 'Why Go Digital?', content: 'Digital wine lists update instantly, provide rich tasting notes and pair wines with your menu automatically.' },
        { heading: 'Features', content: 'QR access, real-time updates, AI recommendations, food pairing engine, multi-language support.' },
      ],
      faqs: [],
      breadcrumbs: [{ name: 'Home', url: `${SITE}/` }, { name: 'Digital Wine List', url: `${SITE}/en/digital-wine-list` }],
      internalLinks: [{ label: 'What is Winerim', url: '/en/what-is-winerim' }, { label: 'Demo', url: '/en/demo' }],
    },
  },
  '/en/what-is-winerim': {
    meta: {
      title: 'What is Winerim? Wine Intelligence Platform for Restaurants',
      description: 'Winerim is a wine intelligence platform that helps restaurants manage wine lists, recommend wines, analyze sales and optimize pricing using AI technology.',
      canonical: `${SITE}/en/what-is-winerim`,
      ogImage: OG_IMAGE,
      lang: 'en',
      type: 'website',
      schemaType: 'SoftwareApplication',
    },
    content: {
      h1: 'Winerim — Wine Intelligence Platform for Restaurants',
      subtitle: 'Winerim is a technology platform designed to help restaurants manage their wine list, increase sales and optimise their cellar using artificial intelligence.',
      sections: [
        { heading: 'What is Winerim?', content: 'Winerim is specialised software for managing and optimising restaurant wine lists. It combines an interactive digital wine list, AI recommendations, automatic pairings and sales analytics. It is not just a QR to a PDF: it is a complete platform designed to turn your wine list into an active sales engine.' },
        { heading: 'Key capabilities', content: 'Interactive digital wine list accessible via QR. AI-powered wine recommendation engine. Automatic food and wine pairings updated in real time. Analytics dashboard with sales, rotation and margin KPIs. Price optimisation and range scaling tools. Centralised management for multi-location groups.' },
        { heading: 'Who is Winerim for?', content: 'Winerim is designed for restaurants, wine bars, boutique hotels and restaurant groups that want to sell more wine, improve average ticket and manage their cellar with data — whether or not they have a sommelier.' },
        { heading: 'How does it work?', content: '1. You send your current wine list in any format. 2. Winerim digitises it with tasting notes, pairings and recommendations. 3. Guests access via QR, web or app. 4. You start selling more wine from day one.' },
        { heading: 'Why not just a PDF or QR?', content: 'A QR linking to a PDF is static: it does not recommend, does not analyse, does not update. Winerim is an active platform with AI that personalises the experience, generates sales data and optimises prices automatically.' },
        { heading: 'Results', content: 'Restaurants implementing Winerim typically see improvements in wine average ticket, reference rotation and management efficiency. Estimated improvement potential ranges from 15% to 25% depending on restaurant context.' },
      ],
      faqs: [
        { q: 'What is Winerim?', a: 'Winerim is a wine list management software for restaurants. It combines an interactive digital wine list, AI recommendations, automatic pairings, sales analytics and price optimisation.' },
        { q: 'Does Winerim replace the sommelier?', a: 'No. It complements the floor team with data and recommendations. In restaurants without a sommelier, it acts as an intelligent assistant.' },
        { q: 'Can I try it for free?', a: 'Yes. We offer a free personalised demo with your actual wine list.' },
        { q: 'Does it integrate with my POS?', a: 'Yes. Winerim integrates with leading POS and restaurant management systems.' },
      ],
      breadcrumbs: [
        { name: 'Home', url: `${SITE}/en` },
        { name: 'What is Winerim', url: `${SITE}/en/what-is-winerim` },
      ],
      internalLinks: [
        { label: 'Wine List Management Software', url: '/en/wine-list-management-software' },
        { label: 'Features', url: '/en/features' },
        { label: 'Pricing', url: '/en/pricing' },
        { label: 'Case Studies', url: '/en/case-studies' },
        { label: 'Request a Demo', url: '/en/demo' },
      ],
    },
  },
  '/en/wine-list-management-software': {
    meta: {
      title: 'Wine List Management Software for Restaurants | Winerim',
      description: 'Winerim is the leading wine list management software for restaurants. AI-powered recommendations, smart pricing, cellar analytics and digital wine menus in one platform.',
      canonical: `${SITE}/en/wine-list-management-software`,
      ogImage: OG_IMAGE,
      lang: 'en',
      type: 'website',
      schemaType: 'SoftwareApplication',
    },
    content: {
      h1: 'Wine List Management Software for Restaurants',
      subtitle: 'Manage, optimise and boost your wine list with artificial intelligence. The all-in-one platform for restaurants that take wine seriously.',
      sections: [
        { heading: 'The problem', content: 'Most restaurant wine lists are static PDFs or paper menus that do not sell, do not recommend and do not generate data. The floor team lacks time and expertise to upsell wine. Dead stock accumulates. Pricing is guesswork.' },
        { heading: 'The solution', content: 'Winerim transforms your wine list into a sales tool. An interactive digital wine list with AI-powered recommendations, automatic food pairings, real-time stock management, margin analytics and dynamic pricing — all in one platform.' },
        { heading: 'Interactive digital wine list', content: 'Your wine list available on tablet, mobile or QR code. Updated in real time with detailed tasting notes, images and intelligent food pairings for every dish on your menu.' },
        { heading: 'AI-powered recommendation engine', content: 'Winerim suggests the perfect wine based on the dish, guest preferences and available stock. Increases average ticket naturally without pressuring the customer.' },
        { heading: 'Cellar and stock management', content: 'Stock control, rotation alerts, per-reference performance analysis and automatic price optimisation based on real sales data. Detect dead stock before it costs you money.' },
        { heading: 'Sales analytics', content: 'Real-time dashboards: sales by reference, margin per bottle, weekly rotation, seasonal trends and period comparisons. Make data-driven purchasing and pricing decisions.' },
        { heading: 'Multi-location management', content: 'Centralised wine list management for restaurant groups. Standardise your offer, compare performance across locations and optimise purchasing at scale.' },
      ],
      faqs: [
        { q: 'Do I need to install anything?', a: 'No. Winerim is 100% cloud-based. All you need is a device with a browser.' },
        { q: 'Can I try it for free?', a: 'Yes. We offer a free personalised demo so you can see how it works with your actual wine list.' },
        { q: 'Does it integrate with my POS?', a: 'Yes. Winerim integrates with leading POS and restaurant management systems.' },
        { q: 'Is it suitable for groups with multiple locations?', a: 'Absolutely. Winerim offers centralised management with per-location analytics and purchasing intelligence.' },
      ],
      breadcrumbs: [
        { name: 'Home', url: `${SITE}/en` },
        { name: 'Wine List Management Software', url: `${SITE}/en/wine-list-management-software` },
      ],
      internalLinks: [
        { label: 'What is Winerim', url: '/en/what-is-winerim' },
        { label: 'Features', url: '/en/features' },
        { label: 'Pricing', url: '/en/pricing' },
        { label: 'Case Studies', url: '/en/case-studies' },
        { label: 'Integrations', url: '/en/integrations' },
        { label: 'Request a Demo', url: '/en/demo' },
      ],
    },
  },
};

interface WineLibraryDetailSchemaContext {
  termAnchor: string;
  termSetUrl: string;
  termSetName: string;
  termCode: string;
  additionalType: string;
}

function getWineLibraryDetailSchemaContext(canonical: string, lang: WineLibraryLang): WineLibraryDetailSchemaContext | null {
  let pathname = canonical;
  try {
    pathname = new URL(canonical).pathname;
  } catch (_) {
    pathname = canonical.replace(SITE, '');
  }

  const segments = pathname.split('/').filter(Boolean);
  const sectionConfig = WINE_LIBRARY_PATH_CONFIG[lang].sections;
  const copy = WINE_LIBRARY_COPY[lang];
  const detailSections: Array<{
    section: keyof WineLibraryPathConfig['sections'];
    termAnchor: string;
    termSetPath: string;
    termSetLabel: string;
    additionalType: string;
  }> = [
    {
      section: 'uvas',
      termAnchor: 'grape-term',
      termSetPath: '/biblioteca-vino/uvas',
      termSetLabel: copy.sectionTitles.uvas,
      additionalType: 'Wine grape variety',
    },
    {
      section: 'regiones',
      termAnchor: 'region-term',
      termSetPath: '/biblioteca-vino/regiones',
      termSetLabel: copy.sectionTitles.regiones,
      additionalType: 'Wine region or denomination',
    },
    {
      section: 'estilos',
      termAnchor: 'style-term',
      termSetPath: '/biblioteca-vino/estilos',
      termSetLabel: copy.sectionTitles.estilos,
      additionalType: 'Wine style',
    },
    {
      section: 'maridajes',
      termAnchor: 'pairing-term',
      termSetPath: '/biblioteca-vino/maridajes',
      termSetLabel: copy.sectionTitles.maridajes,
      additionalType: 'Wine pairing',
    },
  ];

  for (const detail of detailSections) {
    const localizedSection = sectionConfig[detail.section];
    const sectionIndex = segments.indexOf(localizedSection);
    if (sectionIndex < 0 || sectionIndex >= segments.length - 1) continue;
    return {
      termAnchor: detail.termAnchor,
      termSetUrl: `${SITE}${wineLibraryPath(lang, detail.termSetPath)}`,
      termSetName: `${detail.termSetLabel} | ${copy.home}`,
      termCode: segments.slice(sectionIndex + 1).join('/'),
      additionalType: detail.additionalType,
    };
  }

  return null;
}

// ── HTML Generator ──
function generateHTML(meta: PageMeta, content: PageContent, hreflang?: HreflangEntry[]): string {
  const navLang = WINE_LIBRARY_LANGS.includes(meta.lang as WineLibraryLang) ? meta.lang as WineLibraryLang : 'es';
  const absoluteUrl = (url: string) => url.startsWith('http') ? url : `${SITE}${url.startsWith('/') ? url : `/${url}`}`;
  const localizedStaticUrl = (esPath: string) => absoluteUrl(staticLocalizedPath(navLang, esPath) || esPath);
  const navCopy = ({
    es: {
      product: 'Producto', features: 'Funcionalidades', pricing: 'Precios', tools: 'Herramientas', guides: 'Guías', blog: 'Blog', demo: 'Demo', contact: 'Contacto',
      related: 'Enlaces relacionados', tagline: 'Carta inteligente de vinos para restaurantes.', privacy: 'Privacidad', terms: 'Términos',
    },
    en: {
      product: 'Product', features: 'Features', pricing: 'Pricing', tools: 'Tools', guides: 'Guides', blog: 'Blog', demo: 'Demo', contact: 'Contact',
      related: 'Related links', tagline: 'Intelligent wine list software for restaurants.', privacy: 'Privacy', terms: 'Terms',
    },
    it: {
      product: 'Prodotto', features: 'Funzionalità', pricing: 'Prezzi', tools: 'Strumenti', guides: 'Guide', blog: 'Blog', demo: 'Demo', contact: 'Contatto',
      related: 'Link correlati', tagline: 'Carta vini intelligente per ristoranti.', privacy: 'Privacy', terms: 'Termini',
    },
    fr: {
      product: 'Produit', features: 'Fonctionnalités', pricing: 'Tarifs', tools: 'Outils', guides: 'Guides', blog: 'Blog', demo: 'Démo', contact: 'Contact',
      related: 'Liens associés', tagline: 'Carte des vins intelligente pour restaurants.', privacy: 'Confidentialité', terms: 'Conditions',
    },
    de: {
      product: 'Produkt', features: 'Funktionen', pricing: 'Preise', tools: 'Tools', guides: 'Ratgeber', blog: 'Blog', demo: 'Demo', contact: 'Kontakt',
      related: 'Verwandte Links', tagline: 'Intelligente Weinkarten-Software für Restaurants.', privacy: 'Datenschutz', terms: 'AGB',
    },
    pt: {
      product: 'Produto', features: 'Funcionalidades', pricing: 'Preços', tools: 'Ferramentas', guides: 'Guias', blog: 'Blog', demo: 'Demo', contact: 'Contacto',
      related: 'Links relacionados', tagline: 'Carta de vinhos inteligente para restaurantes.', privacy: 'Privacidade', terms: 'Termos',
    },
  } as Record<WineLibraryLang, Record<string, string>>)[navLang];
  const faqSchema = content.faqs.length > 0 ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }) : '';

  const breadcrumbSchema = content.breadcrumbs.length > 0 ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: content.breadcrumbs.map((bc, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: bc.name,
      item: bc.url,
    })),
  }) : '';

  const collectionLinks = content.internalLinks
    .filter((link, index, links) => links.findIndex((candidate) => candidate.url === link.url) === index)
    .slice(0, 40);
  const isWineLibraryDetail = meta.schemaType === 'Article' && [
    '/biblioteca-vino/',
    '/wine-library/',
    '/bibliotheque-vin/',
    '/weinbibliothek/',
    '/biblioteca-vinho/',
  ].some((segment) => meta.canonical.includes(segment));
  const wineLibraryDetailContext = isWineLibraryDetail
    ? getWineLibraryDetailSchemaContext(meta.canonical, navLang)
    : null;
  const wineLibraryDetailTermId = wineLibraryDetailContext
    ? `${meta.canonical}#${wineLibraryDetailContext.termAnchor}`
    : `${meta.canonical}#wine-library-term`;
  const wineLibraryDetailEntity = isWineLibraryDetail ? {
    '@id': wineLibraryDetailTermId,
    '@type': 'DefinedTerm',
    name: content.h1,
    url: meta.canonical,
    description: meta.description,
    ...(wineLibraryDetailContext ? {
      termCode: wineLibraryDetailContext.termCode,
      additionalType: wineLibraryDetailContext.additionalType,
      inDefinedTermSet: { '@id': `${wineLibraryDetailContext.termSetUrl}#term-set` },
    } : {}),
  } : null;
  const mentionLinks = isWineLibraryDetail
    ? collectionLinks.slice(0, 12).map((link) => ({
        '@type': 'Thing',
        name: link.label,
        url: absoluteUrl(link.url),
      }))
    : [];

  const itemListSchema = meta.schemaType === 'CollectionPage' && collectionLinks.length > 0 ? JSON.stringify({
    '@context': 'https://schema.org',
    '@id': `${meta.canonical}#itemlist`,
    '@type': 'ItemList',
    name: content.h1,
    description: meta.description,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: collectionLinks.length,
    itemListElement: collectionLinks.map((link, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: link.label,
      url: absoluteUrl(link.url),
    })),
  }) : '';

  const reportDatasetSchema = meta.schemaType === 'Report' ? JSON.stringify({
    '@context': 'https://schema.org',
    '@id': `${meta.canonical}#dataset-framework`,
    '@type': 'Dataset',
    name: `${content.h1} dataset framework`,
    description: meta.description,
    url: meta.canonical,
    creator: { '@type': 'Organization', name: 'Winerim', url: SITE },
    publisher: { '@type': 'Organization', name: 'Winerim', url: SITE, logo: { '@type': 'ImageObject', url: OG_IMAGE } },
    license: localizedStaticUrl('/terminos'),
    isAccessibleForFree: true,
    inLanguage: meta.lang,
    measurementTechnique: 'Aggregated and anonymized wine-list analysis across references, prices, by-the-glass offer, wine styles, regions, pairings, margin and rotation signals.',
    variableMeasured: [
      'Number of wine references',
      'Bottle and glass price ranges',
      'By-the-glass offer',
      'Wine regions and grapes',
      'Wine styles and pairings',
      'Sales, stock, margin and rotation signals',
    ].map((name) => ({ '@type': 'PropertyValue', name })),
  }) : '';

  const mainSchema = meta.schemaType === 'SoftwareApplication'
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Winerim',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: meta.description,
        url: SITE,
        offers: { '@type': 'Offer', priceCurrency: 'EUR', url: `${SITE}/precios` },
      })
    : wineLibraryDetailContext && wineLibraryDetailEntity
      ? JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@id': `${meta.canonical}#webpage`,
              '@type': 'WebPage',
              name: content.h1,
              headline: meta.title,
              description: meta.description,
              url: meta.canonical,
              inLanguage: meta.lang,
              mainEntity: { '@id': wineLibraryDetailTermId },
              publisher: { '@id': `${SITE}#organization` },
            },
            {
              '@id': `${meta.canonical}#article`,
              '@type': 'Article',
              headline: meta.title,
              description: meta.description,
              keywords: [content.h1, ...collectionLinks.slice(0, 12).map((link) => link.label)].join(', '),
              author: { '@type': 'Organization', name: 'Winerim', url: SITE },
              publisher: { '@type': 'Organization', name: 'Winerim', url: SITE, logo: { '@type': 'ImageObject', url: OG_IMAGE } },
              mainEntityOfPage: { '@id': `${meta.canonical}#webpage` },
              about: { '@id': wineLibraryDetailTermId },
              ...(mentionLinks.length > 0 ? { mentions: mentionLinks } : {}),
            },
            {
              '@id': `${wineLibraryDetailContext.termSetUrl}#term-set`,
              '@type': 'DefinedTermSet',
              name: wineLibraryDetailContext.termSetName,
              url: wineLibraryDetailContext.termSetUrl,
              inLanguage: meta.lang,
            },
            wineLibraryDetailEntity,
          ],
        })
    : JSON.stringify({
        '@context': 'https://schema.org',
        '@type': meta.schemaType || 'WebPage',
        headline: meta.title,
        description: meta.description,
        url: meta.canonical,
        author: { '@type': 'Organization', name: 'Winerim', url: SITE },
        publisher: { '@type': 'Organization', name: 'Winerim', url: SITE, logo: { '@type': 'ImageObject', url: OG_IMAGE } },
        inLanguage: meta.lang,
        ...(meta.schemaType === 'CollectionPage' ? { mainEntity: { '@id': `${meta.canonical}#itemlist` } } : {}),
        ...(wineLibraryDetailEntity ? { mainEntity: wineLibraryDetailEntity, about: wineLibraryDetailEntity } : {}),
        ...(mentionLinks.length > 0 ? { mentions: mentionLinks } : {}),
      });

  const orgSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Winerim',
    url: SITE,
    logo: OG_IMAGE,
    description: navCopy.tagline,
    foundingDate: '2024',
    knowsAbout: ['Wine list management', 'Restaurant wine sales optimization', 'AI-powered wine recommendations', 'Digital wine menus', 'Wine pricing strategy', 'Food and wine pairing', 'Hospitality technology'],
    sameAs: [
      'https://www.instagram.com/winerim/',
      'https://www.youtube.com/@Winerim',
      'https://www.linkedin.com/company/winerim/',
    ],
  });

  const hreflangHTML = (hreflang || []).map(h =>
    `  <link rel="alternate" hreflang="${h.lang}" href="${h.url}" />`
  ).join('\n');

  const sections = withWineLibraryDepthSections(meta, content, withStaticDepthSections(meta, content));
  const sectionsHTML = sections.map(s => `
    <section>
      <h2>${escapeHtml(s.heading)}</h2>
      <p>${escapeHtml(s.content)}</p>
    </section>`).join('\n');

  const faqHeading = ({
    es: 'Preguntas frecuentes',
    en: 'Frequently asked questions',
    it: 'Domande frequenti',
    fr: 'Questions frequentes',
    de: 'Haeufige Fragen',
    pt: 'Perguntas frequentes',
  } as Record<string, string>)[meta.lang] || 'Frequently asked questions';

  const faqsHTML = content.faqs.length > 0 ? `
    <section>
      <h2>${escapeHtml(faqHeading)}</h2>
      <dl>
        ${content.faqs.map(f => `<dt>${escapeHtml(f.q)}</dt><dd>${escapeHtml(f.a)}</dd>`).join('\n        ')}
      </dl>
    </section>` : '';

  const navHTML = content.internalLinks.map(l =>
    `<a href="${absoluteUrl(l.url)}">${escapeHtml(l.label)}</a>`
  ).join(' | ');

  const breadcrumbHTML = content.breadcrumbs.length > 1
    ? `<nav aria-label="Breadcrumb"><ol>${content.breadcrumbs.map(bc => `<li><a href="${bc.url}">${escapeHtml(bc.name)}</a></li>`).join('')}</ol></nav>`
    : '';

  return `<!DOCTYPE html>
<html lang="${meta.lang}" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeAttr(meta.description)}">
  <meta name="robots" content="${escapeAttr(meta.robots || 'index, follow')}">
  <link rel="canonical" href="${meta.canonical}">
${hreflangHTML}
  
  <meta property="og:type" content="${meta.type}">
  <meta property="og:title" content="${escapeAttr(meta.title)}">
  <meta property="og:description" content="${escapeAttr(meta.description)}">
  <meta property="og:url" content="${meta.canonical}">
  <meta property="og:image" content="${meta.ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Winerim">
  <meta property="og:locale" content="${({ es: 'es_ES', en: 'en_GB', it: 'it_IT', fr: 'fr_FR', de: 'de_DE', pt: 'pt_PT' } as Record<string, string>)[meta.lang] || 'es_ES'}">
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(meta.title)}">
  <meta name="twitter:description" content="${escapeAttr(meta.description)}">
  <meta name="twitter:image" content="${meta.ogImage}">
  
  <script type="application/ld+json">${mainSchema}</script>
  ${itemListSchema ? `<script type="application/ld+json">${itemListSchema}</script>` : ''}
  ${reportDatasetSchema ? `<script type="application/ld+json">${reportDatasetSchema}</script>` : ''}
  ${faqSchema ? `<script type="application/ld+json">${faqSchema}</script>` : ''}
  ${breadcrumbSchema ? `<script type="application/ld+json">${breadcrumbSchema}</script>` : ''}
  <script type="application/ld+json">${orgSchema}</script>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <a href="${localizedStaticUrl('/')}">Winerim</a> |
      <a href="${localizedStaticUrl('/software-carta-de-vinos')}">${escapeHtml(navCopy.product)}</a> |
      <a href="${localizedStaticUrl('/funcionalidades')}">${escapeHtml(navCopy.features)}</a> |
      <a href="${localizedStaticUrl('/precios')}">${escapeHtml(navCopy.pricing)}</a> |
      <a href="${localizedStaticUrl('/herramientas')}">${escapeHtml(navCopy.tools)}</a> |
      <a href="${localizedStaticUrl('/guias-y-recursos')}">${escapeHtml(navCopy.guides)}</a> |
      <a href="${localizedStaticUrl('/blog')}">${escapeHtml(navCopy.blog)}</a> |
      <a href="${localizedStaticUrl('/demo')}">${escapeHtml(navCopy.demo)}</a> |
      <a href="${localizedStaticUrl('/contacto')}">${escapeHtml(navCopy.contact)}</a>
    </nav>
  </header>
  
  <main>
    ${breadcrumbHTML}
    <article>
      <h1>${escapeHtml(content.h1)}</h1>
      ${content.subtitle ? `<p><strong>${escapeHtml(content.subtitle)}</strong></p>` : ''}
      ${content.intro ? `<p>${escapeHtml(content.intro)}</p>` : ''}
      ${sectionsHTML}
      ${faqsHTML}
    </article>
    
    <nav aria-label="${escapeAttr(navCopy.related)}">
      ${navHTML}
    </nav>
  </main>
  
  <footer>
    <p>&copy; ${new Date().getFullYear()} Winerim. ${escapeHtml(navCopy.tagline)}</p>
    <nav aria-label="Legal">
      <a href="${localizedStaticUrl('/privacidad')}">${escapeHtml(navCopy.privacy)}</a> |
      <a href="${localizedStaticUrl('/terminos')}">${escapeHtml(navCopy.terms)}</a>
    </nav>
  </footer>
</body>
</html>`;
}

function withStaticDepthSections(meta: PageMeta, content: PageContent): PageContent['sections'] {
  if (/noindex/i.test(meta.robots || '')) return content.sections;

  const path = (() => {
    try { return new URL(meta.canonical).pathname; } catch (_) { return meta.canonical; }
  })();

  if (/biblioteca-vino|wine-library|biblioteca-vinho|bibliotheque-vin|weinbibliothek/.test(path)) {
    return content.sections;
  }

  const bodyText = [
    content.subtitle || '',
    content.intro || '',
    ...content.sections.flatMap(section => [section.heading, section.content]),
    ...content.faqs.flatMap(faq => [faq.q, faq.a]),
  ].join(' ');

  if (bodyText.trim().split(/\s+/).filter(Boolean).length >= 300) {
    return content.sections;
  }

  const lang = WINE_LIBRARY_LANGS.includes(meta.lang as WineLibraryLang) ? meta.lang as WineLibraryLang : 'es';
  const label = content.h1;
  const copy = STATIC_DEPTH_COPY[lang];

  return [
    ...content.sections,
    { heading: copy.workflowHeading, content: copy.workflow(label) },
    { heading: copy.dataHeading, content: copy.data(label) },
    { heading: copy.teamHeading, content: copy.team(label) },
    { heading: copy.libraryHeading, content: copy.library(label) },
    { heading: copy.nextHeading, content: copy.next(label) },
  ];
}

function withWineLibraryDepthSections(meta: PageMeta, content: PageContent, sections: PageContent['sections']): PageContent['sections'] {
  if (/noindex/i.test(meta.robots || '')) return sections;

  const path = (() => {
    try { return new URL(meta.canonical).pathname; } catch (_) { return meta.canonical; }
  })();
  const resolved = resolveWineLibraryPath(path);
  if (!resolved) return sections;

  const bodyText = [
    content.subtitle || '',
    content.intro || '',
    ...sections.flatMap(section => [section.heading, section.content]),
    ...content.faqs.flatMap(faq => [faq.q, faq.a]),
  ].join(' ');

  if (bodyText.trim().split(/\s+/).filter(Boolean).length >= 340) {
    return sections;
  }

  const { lang, esPath } = resolved;
  const parts = esPath.split('/').filter(Boolean);
  const section = parts[1] || 'home';
  const isHub = esPath === '/biblioteca-vino' || parts.length === 2;
  const kind = isHub ? 'hub' : section;
  const label = content.h1;
  const sectionLabel = content.subtitle || WINE_LIBRARY_COPY[lang].home;
  const copy = WINE_LIBRARY_DEPTH_COPY[lang];
  const kindLabel = WINE_LIBRARY_DEPTH_KIND_LABELS[lang][kind] || WINE_LIBRARY_DEPTH_KIND_LABELS[lang].article;

  return [
    ...sections,
    { heading: copy.useHeading, content: copy.use(label, kindLabel, sectionLabel) },
    { heading: copy.serviceHeading, content: copy.service(label, kindLabel, sectionLabel) },
    { heading: copy.dataHeading, content: copy.data(label, kindLabel, sectionLabel) },
    { heading: copy.compareHeading, content: copy.compare(label, kindLabel, sectionLabel) },
    { heading: copy.nextHeading, content: copy.next(label, kindLabel, sectionLabel) },
  ];
}

const WINE_LIBRARY_DEPTH_KIND_LABELS: Record<WineLibraryLang, Record<string, string>> = {
  es: { hub: 'ruta de biblioteca', uvas: 'uva', regiones: 'region', estilos: 'estilo', maridajes: 'maridaje', glosario: 'glosario', 'guia-servicio': 'guia de servicio', article: 'guia de vino' },
  en: { hub: 'library route', uvas: 'grape', regiones: 'region', estilos: 'style', maridajes: 'pairing', glosario: 'glossary', 'guia-servicio': 'service guide', article: 'wine guide' },
  it: { hub: 'percorso di biblioteca', uvas: 'vitigno', regiones: 'regione', estilos: 'stile', maridajes: 'abbinamento', glosario: 'glossario', 'guia-servicio': 'guida di servizio', article: 'guida vino' },
  fr: { hub: 'parcours de bibliotheque', uvas: 'cepage', regiones: 'region', estilos: 'style', maridajes: 'accord', glosario: 'glossaire', 'guia-servicio': 'guide de service', article: 'guide vin' },
  de: { hub: 'Bibliotheksroute', uvas: 'Rebsorte', regiones: 'Region', estilos: 'Stil', maridajes: 'Pairing', glosario: 'Glossar', 'guia-servicio': 'Service-Guide', article: 'Wein-Guide' },
  pt: { hub: 'rota de biblioteca', uvas: 'casta', regiones: 'regiao', estilos: 'estilo', maridajes: 'harmonizacao', glosario: 'glossario', 'guia-servicio': 'guia de servico', article: 'guia de vinho' },
};

const WINE_LIBRARY_DEPTH_COPY: Record<WineLibraryLang, {
  useHeading: string;
  use: (label: string, kind: string, section: string) => string;
  serviceHeading: string;
  service: (label: string, kind: string, section: string) => string;
  dataHeading: string;
  data: (label: string, kind: string, section: string) => string;
  compareHeading: string;
  compare: (label: string, kind: string, section: string) => string;
  nextHeading: string;
  next: (label: string, kind: string, section: string) => string;
}> = {
  es: {
    useHeading: 'Uso en carta real',
    use: (label, kind, section) => `${label} debe leerse como ${kind} dentro de ${section}, no como una ficha aislada. Sirve para decidir ubicacion en carta, precio relativo, plato de entrada y frase de venta. Cuando el equipo puede resumirlo en una linea, la biblioteca se convierte en material operativo para sala.`,
    serviceHeading: 'Claves de servicio y venta',
    service: (label) => `En sala, ${label} funciona mejor cuando se traduce a una recomendacion sencilla: perfil del vino, ocasion de consumo, temperatura aproximada y razon del maridaje. Esa lectura reduce dudas del cliente y ayuda a vender con confianza incluso cuando no hay sommelier en cada turno.`,
    dataHeading: 'Datos para priorizar',
    data: (label) => `Para decidir si ${label} merece mas presencia, conviene cruzar rotacion, margen, ventas por copa, platos mas pedidos y referencias sustitutivas. La biblioteca no sustituye al dato comercial: lo ordena para tomar decisiones de compra, precio, formacion y arquitectura de carta.`,
    compareHeading: 'Comparaciones utiles',
    compare: (label) => `Compara ${label} con uvas, regiones, estilos y maridajes cercanos antes de cambiar la carta. Esa comparacion evita duplicidades, descubre huecos de gama y permite construir rutas internas entre biblioteca, recomendaciones digitales, carta por copa y argumentos de venta del equipo.`,
    nextHeading: 'Siguiente accion',
    next: (label) => `El siguiente paso es convertir ${label} en una accion concreta: revisar una referencia actual, crear una recomendacion por plato, ajustar una copa o preparar una frase de formacion para el equipo antes del servicio.`,
  },
  en: {
    useHeading: 'Use in a real wine list',
    use: (label, kind, section) => `${label} should be read as a ${kind} inside ${section}, not as an isolated note. It helps decide list placement, relative price, first dish to mention and the short sales line. When the team can summarize it in one sentence, the library becomes operational floor material.`,
    serviceHeading: 'Service and sales cues',
    service: (label) => `On the floor, ${label} works best when it becomes a simple recommendation: wine profile, drinking occasion, approximate temperature and reason for the pairing. That reading reduces guest doubt and helps the team sell with confidence even when no sommelier is present every shift.`,
    dataHeading: 'Data to prioritize',
    data: (label) => `To decide whether ${label} deserves more space, compare rotation, margin, by-the-glass sales, most ordered dishes and substitute references. The library does not replace commercial data: it organizes it for purchasing, pricing, training and wine-list architecture decisions.`,
    compareHeading: 'Useful comparisons',
    compare: (label) => `Compare ${label} with nearby grapes, regions, styles and pairings before changing the list. That comparison avoids duplication, reveals missing price tiers and builds internal routes between the library, digital recommendations, by-the-glass strategy and the sales arguments used by the team.`,
    nextHeading: 'Next action',
    next: (label) => `The next step is to turn ${label} into one concrete action: review a current reference, create a dish recommendation, adjust a glass pour or prepare one training sentence for the team before service.`,
  },
  it: {
    useHeading: 'Uso in una carta reale',
    use: (label, kind, section) => `${label} va letto come ${kind} dentro ${section}, non come una scheda isolata. Aiuta a decidere posizione in carta, prezzo relativo, primo piatto da citare e frase di vendita. Quando la sala lo riassume in una riga, la biblioteca diventa materiale operativo.`,
    serviceHeading: 'Chiavi di servizio e vendita',
    service: (label) => `In sala, ${label} funziona meglio quando diventa una raccomandazione semplice: profilo del vino, occasione di consumo, temperatura indicativa e motivo dell abbinamento. Questa lettura riduce i dubbi del cliente e aiuta a vendere anche senza sommelier in ogni turno.`,
    dataHeading: 'Dati per dare priorita',
    data: (label) => `Per decidere se ${label} merita piu spazio, conviene confrontare rotazione, margine, vendite al calice, piatti piu richiesti e referenze sostitutive. La biblioteca non sostituisce il dato commerciale: lo ordina per acquisti, prezzi, formazione e architettura della carta.`,
    compareHeading: 'Confronti utili',
    compare: (label) => `Confronta ${label} con vitigni, regioni, stili e abbinamenti vicini prima di cambiare la carta. Il confronto evita doppioni, rivela fasce mancanti e costruisce percorsi interni tra biblioteca, raccomandazioni digitali, vino al calice e argomenti di vendita della sala.`,
    nextHeading: 'Prossima azione',
    next: (label) => `Il passo successivo e trasformare ${label} in una azione concreta: rivedere una referenza attuale, creare una raccomandazione per piatto, regolare un calice o preparare una frase di formazione prima del servizio.`,
  },
  fr: {
    useHeading: 'Usage dans une vraie carte',
    use: (label, kind, section) => `${label} doit etre lu comme ${kind} dans ${section}, pas comme une fiche isolee. Cela aide a choisir la place en carte, le prix relatif, le premier plat a citer et la phrase de vente. Quand l equipe le resume en une ligne, la bibliotheque devient un outil de salle.`,
    serviceHeading: 'Cles de service et de vente',
    service: (label) => `En salle, ${label} fonctionne mieux quand il devient une recommandation simple : profil du vin, occasion de consommation, temperature approximative et raison de l accord. Cette lecture reduit le doute client et aide a vendre avec methode meme sans sommelier a chaque service.`,
    dataHeading: 'Donnees a prioriser',
    data: (label) => `Pour savoir si ${label} merite plus de place, il faut croiser rotation, marge, ventes au verre, plats les plus commandes et references substituables. La bibliotheque ne remplace pas la donnee commerciale : elle l organise pour achats, prix, formation et architecture de carte.`,
    compareHeading: 'Comparaisons utiles',
    compare: (label) => `Comparez ${label} avec les cepages, regions, styles et accords proches avant de modifier la carte. Cette comparaison evite les doublons, revele les niveaux de prix manquants et cree des routes internes entre bibliotheque, recommandations digitales, vin au verre et arguments de vente.`,
    nextHeading: 'Action suivante',
    next: (label) => `L etape suivante consiste a transformer ${label} en action concrete : revoir une reference actuelle, creer une recommandation par plat, ajuster un verre ou preparer une phrase de formation avant le service.`,
  },
  de: {
    useHeading: 'Einsatz auf der echten Weinkarte',
    use: (label, kind, section) => `${label} sollte als ${kind} innerhalb von ${section} gelesen werden, nicht als isolierte Notiz. Es hilft bei Platzierung, relativem Preis, erstem Gericht und kurzer Verkaufszeile. Wenn das Team es in einem Satz zusammenfasst, wird die Bibliothek zu nutzbarem Servicematerial.`,
    serviceHeading: 'Service- und Verkaufshinweise',
    service: (label) => `Im Service funktioniert ${label} am besten als einfache Empfehlung: Weinprofil, Trinkmoment, ungefaehre Temperatur und Grund fur das Pairing. Diese Lesart reduziert Zweifel beim Gast und hilft dem Team, auch ohne Sommelier in jeder Schicht sicher zu verkaufen.`,
    dataHeading: 'Daten fur Priorisierung',
    data: (label) => `Um zu entscheiden, ob ${label} mehr Raum verdient, sollten Rotation, Marge, Offenweinverkauf, meistbestellte Gerichte und ersetzbare Referenzen verglichen werden. Die Bibliothek ersetzt keine Verkaufsdaten: Sie ordnet sie fur Einkauf, Preis, Training und Kartenarchitektur.`,
    compareHeading: 'Sinnvolle Vergleiche',
    compare: (label) => `Vergleiche ${label} vor einer Kartenanderung mit nahen Rebsorten, Regionen, Stilen und Pairings. So vermeidet das Team Dopplungen, erkennt fehlende Preisstufen und baut interne Wege zwischen Bibliothek, digitalen Empfehlungen, Offenweinstrategie und Verkaufsargumenten.`,
    nextHeading: 'Nachste Aktion',
    next: (label) => `Der nachste Schritt ist, ${label} in eine konkrete Aktion zu ubersetzen: eine aktuelle Referenz prufen, eine Empfehlung pro Gericht anlegen, ein Glasangebot anpassen oder einen Trainingssatz vor dem Service vorbereiten.`,
  },
  pt: {
    useHeading: 'Uso numa carta real',
    use: (label, kind, section) => `${label} deve ser lido como ${kind} dentro de ${section}, nao como uma ficha isolada. Ajuda a decidir posicao na carta, preco relativo, primeiro prato a mencionar e frase de venda. Quando a equipa resume em uma linha, a biblioteca vira material operacional de sala.`,
    serviceHeading: 'Chaves de servico e venda',
    service: (label) => `Em sala, ${label} funciona melhor quando se traduz numa recomendacao simples: perfil do vinho, ocasiao de consumo, temperatura aproximada e razao da harmonizacao. Essa leitura reduz duvidas do cliente e ajuda a vender com confianca mesmo sem sommelier em todos os turnos.`,
    dataHeading: 'Dados para priorizar',
    data: (label) => `Para decidir se ${label} merece mais espaco, convem cruzar rotacao, margem, vendas a copo, pratos mais pedidos e referencias substitutas. A biblioteca nao substitui o dado comercial: organiza-o para decisoes de compra, preco, formacao e arquitectura da carta.`,
    compareHeading: 'Comparacoes uteis',
    compare: (label) => `Compare ${label} com castas, regioes, estilos e harmonizacoes proximas antes de alterar a carta. Essa comparacao evita duplicidades, revela patamares de preco em falta e cria rotas internas entre biblioteca, recomendacoes digitais, vinho a copo e argumentos de venda da equipa.`,
    nextHeading: 'Proxima accao',
    next: (label) => `O passo seguinte e transformar ${label} numa accao concreta: rever uma referencia actual, criar uma recomendacao por prato, ajustar uma opcao a copo ou preparar uma frase de formacao antes do servico.`,
  },
};

const STATIC_DEPTH_COPY: Record<WineLibraryLang, {
  workflowHeading: string;
  workflow: (label: string) => string;
  dataHeading: string;
  data: (label: string) => string;
  teamHeading: string;
  team: (label: string) => string;
  libraryHeading: string;
  library: (label: string) => string;
  nextHeading: string;
  next: (label: string) => string;
}> = {
  es: {
    workflowHeading: 'Como encaja en la operativa de vino',
    workflow: (label) => `${label} no es una pagina aislada: forma parte del flujo de decision de Winerim para ordenar la carta, entender ventas, detectar referencias con baja rotacion y convertir la recomendacion de vino en una rutina sencilla para sala y direccion.`,
    dataHeading: 'Datos que conviene revisar',
    data: () => 'Antes de decidir, conviene cruzar ticket medio, margen por referencia, peso del vino sobre la facturacion, rotacion por estilo y vinos sin movimiento. Esas senales permiten priorizar acciones con impacto real en compras, precios y formacion del equipo.',
    teamHeading: 'Uso por el equipo de sala',
    team: (label) => `${label} tambien debe ser comprensible para camareros, responsables de sala y direccion. La pagina conecta la decision digital con argumentos de servicio: que recomendar, por que tiene sentido y como explicarlo sin depender siempre de un sommelier.`,
    libraryHeading: 'Conexion con biblioteca del vino',
    library: () => 'Cuando la decision afecta a estilos, regiones, uvas o maridajes, conviene apoyarla en la biblioteca del vino. Asi cada cambio de carta queda conectado con lenguaje de sala, argumentos de venta y formacion interna.',
    nextHeading: 'Siguiente paso recomendado',
    next: () => 'El siguiente paso natural es analizar la carta actual, identificar oportunidades de margen y seleccionar pocas acciones medibles: mejorar una categoria, activar vino por copa, reforzar maridajes o pedir una demo con datos reales del restaurante.',
  },
  en: {
    workflowHeading: 'How it fits the wine workflow',
    workflow: (label) => `${label} is not an isolated page: it belongs to the Winerim decision workflow for structuring the wine list, understanding sales, spotting slow-moving references and turning wine recommendations into a simple routine for the floor team and management.`,
    dataHeading: 'Data worth checking',
    data: () => 'Before changing the list, teams should review average ticket, margin by reference, wine weight in total revenue, rotation by style and bottles with no movement. Those signals help prioritize decisions that affect buying, pricing and staff training.',
    teamHeading: 'How the floor team uses it',
    team: (label) => `${label} should also be clear for waiters, floor managers and operators. The page connects the digital decision with service language: what to recommend, why it makes sense and how to explain it without relying on a sommelier every time.`,
    libraryHeading: 'Connection with the wine library',
    library: () => 'When the decision touches styles, regions, grapes or pairings, it should connect back to the wine library. That keeps each list change tied to service language, sales arguments and internal staff training.',
    nextHeading: 'Recommended next step',
    next: () => 'The natural next step is to analyse the current list, identify margin opportunities and choose a small number of measurable actions: improve one category, activate wine by the glass, strengthen pairings or request a demo with real restaurant data.',
  },
  it: {
    workflowHeading: 'Come entra nel flusso vino',
    workflow: (label) => `${label} non e una pagina isolata: fa parte del flusso decisionale Winerim per ordinare la carta, leggere le vendite, individuare referenze lente e trasformare la raccomandazione del vino in una routine semplice per sala e direzione.`,
    dataHeading: 'Dati da controllare',
    data: () => 'Prima di cambiare la carta conviene leggere scontrino medio, margine per referenza, peso del vino sul fatturato, rotazione per stile e bottiglie ferme. Questi segnali aiutano a decidere acquisti, prezzi e formazione con priorita reali.',
    teamHeading: 'Uso da parte della sala',
    team: (label) => `${label} deve essere chiaro anche per camerieri, responsabili di sala e direzione. La pagina collega la decisione digitale al linguaggio di servizio: cosa consigliare, perche ha senso e come spiegarlo senza dipendere sempre da un sommelier.`,
    libraryHeading: 'Connessione con la biblioteca del vino',
    library: () => 'Quando la decisione riguarda stili, regioni, vitigni o abbinamenti, conviene collegarla alla biblioteca del vino. Cosi ogni cambio di carta resta legato a linguaggio di sala, argomenti di vendita e formazione interna.',
    nextHeading: 'Prossimo passo consigliato',
    next: () => 'Il passo successivo e analizzare la carta attuale, identificare opportunita di margine e scegliere poche azioni misurabili: migliorare una categoria, attivare il vino al calice, rafforzare gli abbinamenti o richiedere una demo con dati reali.',
  },
  fr: {
    workflowHeading: 'Place dans le flux vin',
    workflow: (label) => `${label} n est pas une page isolee : elle appartient au flux de decision Winerim pour structurer la carte, comprendre les ventes, detecter les references lentes et transformer la recommandation vin en routine simple pour la salle et la direction.`,
    dataHeading: 'Donnees a verifier',
    data: () => 'Avant de modifier la carte, il faut regarder ticket moyen, marge par reference, poids du vin dans le chiffre d affaires, rotation par style et bouteilles sans mouvement. Ces signaux aident a prioriser achats, prix et formation.',
    teamHeading: 'Usage par l equipe de salle',
    team: (label) => `${label} doit aussi etre clair pour serveurs, responsables de salle et direction. La page relie la decision digitale au langage de service : quoi recommander, pourquoi cela a du sens et comment l expliquer sans dependra toujours d un sommelier.`,
    libraryHeading: 'Lien avec la bibliotheque du vin',
    library: () => 'Quand la decision touche styles, regions, cepages ou accords, elle doit revenir vers la bibliotheque du vin. Chaque changement de carte reste ainsi relie au langage de salle, aux arguments de vente et a la formation.',
    nextHeading: 'Etape suivante recommandee',
    next: () => 'L etape suivante consiste a analyser la carte actuelle, identifier les opportunites de marge et choisir quelques actions mesurables : ameliorer une categorie, activer le vin au verre, renforcer les accords ou demander une demo avec donnees reelles.',
  },
  de: {
    workflowHeading: 'Rolle im Wein-Workflow',
    workflow: (label) => `${label} ist keine isolierte Seite: Sie gehoert zum Winerim-Entscheidungsfluss, um die Weinkarte zu strukturieren, Verkaufe zu verstehen, langsam drehende Referenzen zu erkennen und Empfehlungen im Service einfacher zu machen.`,
    dataHeading: 'Relevante Datenpunkte',
    data: () => 'Vor einer Anderung sollten Teams Durchschnittsbon, Marge je Referenz, Weinanteil am Umsatz, Rotation nach Stil und Flaschen ohne Bewegung prufen. Diese Signale helfen bei Einkauf, Pricing und Teamtraining.',
    teamHeading: 'Nutzung im Serviceteam',
    team: (label) => `${label} muss auch fur Service, Leitung und Betreiber verstandlich sein. Die Seite verbindet digitale Entscheidung mit Servicesprache: was empfohlen wird, warum es passt und wie man es ohne standige Abhangigkeit vom Sommelier erklaert.`,
    libraryHeading: 'Verbindung zur Weinbibliothek',
    library: () => 'Wenn die Entscheidung Stile, Regionen, Rebsorten oder Pairings betrifft, sollte sie mit der Weinbibliothek verbunden sein. So bleiben Kartenanderungen an Servicesprache, Verkaufsargumente und internes Training gekoppelt.',
    nextHeading: 'Empfohlener nachster Schritt',
    next: () => 'Der nachste Schritt ist die Analyse der aktuellen Karte, das Erkennen von Margenchancen und die Auswahl weniger messbarer Massnahmen: Kategorie verbessern, Offenweine aktivieren, Pairings starken oder eine Demo mit echten Daten anfragen.',
  },
  pt: {
    workflowHeading: 'Como entra no fluxo de vinho',
    workflow: (label) => `${label} nao e uma pagina isolada: faz parte do fluxo de decisao da Winerim para estruturar a carta, compreender vendas, detectar referencias com baixa rotacao e transformar recomendacoes de vinho numa rotina simples para sala e direccao.`,
    dataHeading: 'Dados que vale a pena rever',
    data: () => 'Antes de alterar a carta, convem rever ticket medio, margem por referencia, peso do vinho na facturacao, rotacao por estilo e garrafas sem movimento. Esses sinais ajudam a priorizar compras, precos e formacao da equipa.',
    teamHeading: 'Uso pela equipa de sala',
    team: (label) => `${label} tambem deve ser claro para empregados, responsaveis de sala e direccao. A pagina liga a decisao digital a linguagem de servico: o que recomendar, porque faz sentido e como explicar sem depender sempre de um sommelier.`,
    libraryHeading: 'Ligacao com a biblioteca do vinho',
    library: () => 'Quando a decisao envolve estilos, regioes, castas ou harmonizacoes, deve voltar a biblioteca do vinho. Assim cada alteracao de carta fica ligada a linguagem de sala, argumentos de venda e formacao interna.',
    nextHeading: 'Proximo passo recomendado',
    next: () => 'O passo seguinte e analisar a carta actual, identificar oportunidades de margem e escolher poucas accoes mensuraveis: melhorar uma categoria, activar vinho a copo, reforcar harmonizacoes ou pedir uma demo com dados reais.',
  },
};

// ── Dynamic SEO page renderer ──
async function renderSeoPage(slug: string): Promise<string | null> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

  const res = await fetch(
    `${supabaseUrl}/rest/v1/seo_pages?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=*&limit=1`,
    { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
  );

  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  const page = data[0];
  const body = (typeof page.body === 'object' && page.body !== null ? page.body : {}) as Record<string, unknown>;
  const faqs = Array.isArray(page.faqs) ? page.faqs as { q: string; a: string }[] : [];

  const sections: { heading: string; content: string }[] = [];
  if (typeof body.intro === 'string') sections.push({ heading: 'Introducción', content: body.intro });
  if (Array.isArray(body.sections)) {
    for (const s of body.sections) {
      if (typeof s !== 'object' || s === null) continue;
      const section = s as Record<string, unknown>;
      if (typeof section.heading === 'string' && typeof section.content === 'string') {
        sections.push({ heading: section.heading, content: section.content });
      }
    }
  }
  if (Array.isArray(body.problems)) {
    sections.push({ heading: 'Retos habituales', content: body.problems.filter((item): item is string => typeof item === 'string').join('. ') });
  }
  if (Array.isArray(body.benefits)) {
    sections.push({ heading: 'Beneficios', content: body.benefits.filter((item): item is string => typeof item === 'string').join('. ') });
  }
  if (Array.isArray(body.features)) {
    const featText = body.features
      .map((f) => {
        if (typeof f !== 'object' || f === null) return '';
        const feature = f as Record<string, unknown>;
        const title = typeof feature.title === 'string' ? feature.title : '';
        const desc = typeof feature.desc === 'string' ? feature.desc : '';
        return title && desc ? `${title}: ${desc}` : title || desc;
      })
      .filter(Boolean)
      .join('. ');
    sections.push({ heading: 'Cómo te ayuda Winerim', content: featText });
  }

  const canonical = page.canonical_url || `${SITE}/${page.slug}`;

  const meta: PageMeta = {
    title: page.meta_title,
    description: page.meta_description,
    canonical,
    ogImage: page.og_image || OG_IMAGE,
    lang: page.lang || 'es',
    type: 'article',
    schemaType: page.schema_type || 'Article',
  };

  const internalLinks = Array.isArray(body.internal_links)
    ? body.internal_links.map((link) => {
        const l = typeof link === 'object' && link !== null ? link as Record<string, unknown> : {};
        const label = typeof l.label === 'string' ? l.label : typeof l.title === 'string' ? l.title : '';
        const url = typeof l.url === 'string' ? l.url : typeof l.to === 'string' ? l.to : '/';
        return { label, url };
      })
    : [
        { label: 'Solicitar demo', url: '/demo' },
        { label: 'Software carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Herramientas', url: '/herramientas' },
      ];

  const content: PageContent = {
    h1: page.hero_title,
    subtitle: page.hero_subtitle || undefined,
    intro: typeof body.intro === 'string' ? body.intro : undefined,
    sections,
    faqs,
    breadcrumbs: [
      { name: 'Inicio', url: `${SITE}/` },
      { name: page.hero_title, url: canonical },
    ],
    internalLinks,
  };

  return generateHTML(meta, content);
}

// ── Dynamic article renderer ──
function inferArticleLang(slug: string): WineLibraryLang {
  const match = slug.match(/_(en|it|fr|de|pt)$/);
  return match ? match[1] as WineLibraryLang : 'es';
}

function normalizeArticleLang(value: unknown): WineLibraryLang | null {
  return typeof value === 'string' && ['es', 'en', 'it', 'fr', 'de', 'pt'].includes(value)
    ? value as WineLibraryLang
    : null;
}

function stripArticleLangSuffix(slug: string): string {
  return slug.replace(/_(en|it|fr|de|pt)$/, '');
}

function localizedArticlePath(lang: WineLibraryLang, slug: string): string {
  const baseSlug = stripArticleLangSuffix(slug);
  return lang === 'es' ? `/article/${baseSlug}` : `/${lang}/article/${baseSlug}`;
}

function articleRequestFromPath(path: string): { dbSlug: string; routeLang: WineLibraryLang; baseSlug: string } | null {
  const localized = path.match(/^\/(en|it|fr|de|pt)\/article\/(.+)$/);
  if (localized) {
    const routeLang = localized[1] as WineLibraryLang;
    const baseSlug = stripArticleLangSuffix(localized[2]);
    return { dbSlug: `${baseSlug}_${routeLang}`, routeLang, baseSlug };
  }

  const spanish = path.match(/^\/article\/(.+)$/);
  if (!spanish) return null;

  const rawSlug = spanish[1];
  const legacyLang = normalizeArticleLang(rawSlug.match(/_(en|it|fr|de|pt)$/)?.[1]);
  const baseSlug = stripArticleLangSuffix(rawSlug);
  return { dbSlug: rawSlug, routeLang: legacyLang || 'es', baseSlug };
}

function normalizeArticleInternalUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const raw = value.trim();
  if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return null;

  if (raw.startsWith('/')) return raw;

  try {
    const parsed = new URL(raw);
    if (parsed.origin !== SITE) return null;
    return `${parsed.pathname}${parsed.search}`;
  } catch (_) {
    return null;
  }
}

function normalizeArticleLabel(value: unknown): string {
  return typeof value === 'string'
    ? value.replace(/[#*_`]/g, '').replace(/\s+/g, ' ').trim()
    : '';
}

function parseRelatedLinksValue(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function articleRelatedLinksFromDb(value: unknown): { label: string; url: string }[] {
  return parseRelatedLinksValue(value)
    .map((item) => {
      const link = typeof item === 'object' && item !== null ? item as Record<string, unknown> : {};
      const url = normalizeArticleInternalUrl(link.to || link.url || link.href);
      const label = normalizeArticleLabel(link.label || link.title || link.text);
      return url && label ? { label, url } : null;
    })
    .filter((link): link is { label: string; url: string } => Boolean(link));
}

function articleMarkdownInternalLinks(body: string): { label: string; url: string }[] {
  const links: { label: string; url: string }[] = [];
  const markdownLink = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;

  while ((match = markdownLink.exec(body))) {
    if (match.index > 0 && body[match.index - 1] === '!') continue;
    const label = normalizeArticleLabel(match[1]);
    const url = normalizeArticleInternalUrl(match[2]);
    if (label && url) links.push({ label, url });
  }

  return links;
}

function textIncludesAny(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}

function articleKeywordInternalLinks(lang: WineLibraryLang, slug: string, body: string): { label: string; url: string }[] {
  const normalizedText = `${slug} ${body}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const copy = WINE_LIBRARY_COPY[lang];
  const links: { label: string; url: string }[] = [];

  if (textIncludesAny(normalizedText, ['biblioteca', 'wine library', 'weinbibliothek', 'bibliotheque', 'biblioteca vinho'])) {
    links.push({ label: copy.home, url: wineLibraryPath(lang, '/biblioteca-vino') });
  }
  if (textIncludesAny(normalizedText, ['uva', 'uvas', 'variedad', 'variedades', 'grape', 'cepage', 'rebsorte', 'casta', 'tempranillo', 'albarino', 'mencia', 'godello'])) {
    links.push({ label: copy.sectionTitles.uvas, url: wineLibraryPath(lang, '/biblioteca-vino/uvas') });
  }
  if (textIncludesAny(normalizedText, ['region', 'rioja', 'ribera', 'rias baixas', 'sancerre', 'champagne', 'douro'])) {
    links.push({ label: copy.sectionTitles.regiones, url: wineLibraryPath(lang, '/biblioteca-vino/regiones') });
  }
  if (textIncludesAny(normalizedText, ['estilo', 'style', 'stil', 'crianza', 'reserva', 'espumoso', 'sparkling', 'copa', 'glass', 'calice', 'verre'])) {
    links.push({ label: copy.sectionTitles.estilos, url: wineLibraryPath(lang, '/biblioteca-vino/estilos') });
  }
  if (textIncludesAny(normalizedText, ['maridaje', 'pairing', 'abbinament', 'accord', 'harmonizacao', 'plato', 'dish'])) {
    links.push({ label: copy.sectionTitles.maridajes, url: wineLibraryPath(lang, '/biblioteca-vino/maridajes') });
  }

  return links;
}

function uniqueArticleInternalLinks(links: { label: string; url: string }[]): { label: string; url: string }[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (!link.url || seen.has(link.url)) return false;
    seen.add(link.url);
    return true;
  });
}

function articleStaticLink(lang: WineLibraryLang, esPath: string): string {
  return staticLocalizedPath(lang, esPath) || esPath;
}

async function renderArticle(slug: string): Promise<string | null> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

  const res = await fetch(
    `${supabaseUrl}/rest/v1/articles?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=*&limit=1`,
    { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
  );

  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  const article = data[0];
  const body = article.body || '';
  const lang = normalizeArticleLang(article.lang) || inferArticleLang(article.slug || slug);
  const baseSlug = stripArticleLangSuffix(article.slug || slug);
  const canonicalPath = localizedArticlePath(lang, baseSlug);
  const articleInternalLinks = uniqueArticleInternalLinks([
    ...articleRelatedLinksFromDb(article.related_links),
    ...articleMarkdownInternalLinks(body),
    ...articleKeywordInternalLinks(lang, article.slug || slug, body),
    { label: 'Blog', url: articleStaticLink(lang, '/blog') },
    { label: WINE_LIBRARY_COPY[lang].home, url: wineLibraryPath(lang, '/biblioteca-vino') },
    { label: STATIC_PAGE_LABELS['/software-carta-de-vinos']?.[lang] || 'Software carta de vinos', url: articleStaticLink(lang, '/software-carta-de-vinos') },
    { label: STATIC_PAGE_LABELS['/herramientas']?.[lang] || 'Herramientas', url: articleStaticLink(lang, '/herramientas') },
    { label: STATIC_PAGE_LABELS['/demo']?.[lang] || 'Demo', url: articleStaticLink(lang, '/demo') },
  ]).slice(0, 14);

  const sections: { heading: string; content: string }[] = [];
  const lines = body.split('\n');
  let currentHeading = '';
  let currentContent: string[] = [];

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      if (currentHeading || currentContent.length) {
        sections.push({ heading: currentHeading, content: currentContent.join(' ').replace(/[#*_`]/g, '').trim() });
      }
      currentHeading = h2Match[1].trim();
      currentContent = [];
    } else if (line.trim()) {
      currentContent.push(line.replace(/[#*_`]/g, '').trim());
    }
  }
  if (currentHeading || currentContent.length) {
    sections.push({ heading: currentHeading, content: currentContent.join(' ').trim() });
  }

  const canonical = `${SITE}${canonicalPath}`;

  return generateHTML(
    {
      title: article.title,
      description: article.excerpt || article.title,
      canonical,
      ogImage: article.image_url || OG_IMAGE,
      lang,
      type: 'article',
      schemaType: 'Article',
    },
    {
      h1: article.title,
      subtitle: article.excerpt || undefined,
      sections: sections.slice(0, 10),
      faqs: [],
      breadcrumbs: [
        { name: lang === 'es' ? 'Inicio' : 'Home', url: `${SITE}${lang === 'es' ? '/' : `/${lang}`}` },
        { name: 'Blog', url: `${SITE}${articleStaticLink(lang, '/blog')}` },
        { name: article.title, url: canonical },
      ],
      internalLinks: articleInternalLinks,
    }
  );
}

interface CompactDetailPrerenderPage {
  title: string;
  description: string;
  subtitle: string;
  problem: string;
  content: string;
}

const RESOURCE_DETAIL_PRERENDER_PAGES: Record<string, CompactDetailPrerenderPage> = {
  'plantilla-estrategia-vinos-por-copa': {
    title: 'Plantilla de estrategia de vinos por copa',
    description: 'Descarga gratis la plantilla para diseñar tu estrategia de vino por copa: selección, pricing, rotación, control de merma y objetivos de venta.',
    subtitle: 'Diseña, ejecuta y controla tu programa de vino por copa con un documento operativo que cubre selección, pricing, rotación y objetivos.',
    problem: 'El vino por copa es una de las palancas de margen más potentes en restauración, pero sin un plan estructurado se gestiona de forma reactiva: merma descontrolada, selección estancada y oportunidades de venta perdidas.',
    content: 'Un documento de trabajo completo para gestionar tu programa de vino por copa de forma profesional.',
  },
  'checklist-deteccion-vinos-muertos': {
    title: 'Checklist de detección de vinos muertos y baja rotación',
    description: 'Descarga la checklist para identificar vinos sin rotación en tu carta. Detecta stock muerto.',
    subtitle: 'Identifica las referencias que no rotan, cuantifica el capital inmovilizado y toma decisiones informadas sobre qué mantener, promocionar o retirar.',
    problem: 'Los vinos que no se venden no solo ocupan espacio en bodega: inmovilizan capital, generan costes de almacenaje y pueden deteriorarse.',
    content: 'Un proceso estructurado para auditar tu bodega e identificar las referencias que necesitan acción inmediata.',
  },
  'plantilla-formacion-equipo-sala': {
    title: 'Plantilla de formación exprés en vino para equipos de sala',
    description: 'Descarga la plantilla para formar a tu equipo de sala en vino en menos de 2 semanas.',
    subtitle: 'Un programa de formación práctico para que tu equipo recomiende vino con confianza en menos de 2 semanas, sin necesidad de conocimientos previos.',
    problem: 'La falta de formación en vino no es un problema de voluntad, sino de herramientas. Sin una guía clara y práctica, el personal evita recomendar vino por miedo a equivocarse.',
    content: 'Un programa completo de formación diseñado para sesiones cortas antes del servicio.',
  },
  'plantilla-analisis-margenes': {
    title: 'Plantilla de análisis de márgenes por referencia',
    description: 'Descarga la plantilla para analizar el margen de cada vino de tu carta. Coste, PVP, multiplicador, contribución al margen global y ranking de rentabilidad.',
    subtitle: 'Analiza la rentabilidad real de cada vino de tu carta: coste, PVP, multiplicador, margen bruto y contribución al resultado global.',
    problem: 'Muchos restaurantes conocen su margen bruto general de vino, pero no saben qué referencias contribuyen más o menos al resultado.',
    content: 'Una hoja de cálculo estructurada para analizar la rentabilidad de cada referencia de tu carta.',
  },
  'scorecard-rendimiento-carta': {
    title: 'Scorecard mensual de rendimiento de carta de vinos',
    description: 'Descarga el scorecard para medir el rendimiento de tu carta de vinos cada mes. KPIs de venta, rotación, margen, copa y ticket medio en un solo documento.',
    subtitle: 'Un cuadro de mando mensual con los KPIs esenciales para evaluar si tu carta de vinos está funcionando.',
    problem: 'Sin métricas claras, la gestión de la carta se basa en sensaciones. El scorecard convierte la intuición en datos accionables.',
    content: 'Un documento mensual que agrupa los indicadores más importantes de tu carta de vinos en un solo vistazo.',
  },
  'checklist-carta-que-vende': {
    title: 'Checklist: ¿Tu carta de vinos realmente vende?',
    description: 'Descarga la checklist para evaluar si tu carta de vinos está diseñada para vender.',
    subtitle: '30 puntos de control para evaluar si tu carta está diseñada para convertir, no solo para informar.',
    problem: 'Muchas cartas de vinos están técnicamente bien construidas pero no venden porque informan sin guiar la decisión del cliente.',
    content: '6 dimensiones de conversión con 30 puntos de control para diagnosticar la capacidad de venta de tu carta.',
  },
  'plantilla-equilibrio-carta': {
    title: 'Plantilla para evaluar el equilibrio de tu carta de vinos',
    description: 'Descarga la plantilla para analizar el equilibrio de tu carta por estilos, regiones, precios y tipologías. Detecta desequilibrios y mejora la composición.',
    subtitle: 'Analiza si tu carta está equilibrada por estilos, regiones, rangos de precio y tipologías.',
    problem: 'Muchas cartas acumulan referencias por inercia y los desequilibrios se acumulan sin que nadie los detecte.',
    content: 'Un análisis multidimensional de la composición de tu carta para detectar desequilibrios y oportunidades.',
  },
  'plantilla-revision-mensual-carta': {
    title: 'Plantilla de revisión mensual de carta de vinos',
    description: 'Descarga la plantilla para revisar tu carta de vinos cada mes: rendimiento por referencia, oportunidades de mejora, rotación, pricing y plan de acción.',
    subtitle: 'Un proceso estructurado para revisar tu carta cada mes: qué funciona, qué no, qué cambiar y qué investigar.',
    problem: 'Sin un proceso periódico, los problemas se acumulan: vinos muertos, precios desactualizados, oportunidades perdidas y una carta que envejece.',
    content: 'Un documento de trabajo mensual con 5 bloques que cubren todo el ciclo de revisión de tu carta.',
  },
  'plantilla-control-grupo-restauracion': {
    title: 'Plantilla de control y análisis de carta de vinos para grupos de restauración',
    description: 'Descarga la plantilla para gestionar y comparar la carta de vinos en múltiples locales.',
    subtitle: 'Gestiona, compara y optimiza la carta de vinos en todos tus locales con un framework de control centralizado.',
    problem: 'En grupos de restauración, cada local gestiona el vino de forma diferente y sin visibilidad cruzada.',
    content: 'Un framework completo para gestionar la carta de vinos de forma centralizada en grupos con múltiples locales.',
  },
  'plantilla-carta-de-vinos': {
    title: 'Plantilla de carta de vinos para restaurante',
    description: 'Descarga gratis una plantilla profesional para diseñar tu carta de vinos. Estructura de categorías, precios equilibrados y sección por copa incluida.',
    subtitle: 'Descarga una plantilla profesional para diseñar una carta de vinos clara, equilibrada y pensada para vender más.',
    problem: 'Diseñar una carta desde cero puede llevar a errores que afectan tanto a la experiencia del cliente como a la rentabilidad.',
    content: 'Todo lo que necesitas para diseñar una carta de vinos profesional desde el primer día.',
  },
  'checklist-carta-de-vinos-rentable': {
    title: 'Checklist: ¿Tu carta de vinos es rentable?',
    description: 'Descarga gratis la checklist para evaluar si tu carta de vinos está optimizada: estructura, precios, estilos, vino por copa y rotación.',
    subtitle: '25 puntos de control para evaluar si tu carta de vinos está optimizada para vender más.',
    problem: 'La mayoría de cartas de vinos tienen puntos ciegos que impactan directamente en ventas y márgenes.',
    content: '5 áreas de evaluación con 25 puntos de control para diagnosticar tu carta de vinos.',
  },
  'guia-vino-por-copa-para-restaurantes': {
    title: 'Guía de vino por copa para restaurantes',
    description: 'Descarga gratis la guía completa de vino por copa: cuántos ofrecer, cómo fijar precios, qué vinos elegir y cómo aumentar ventas en tu restaurante.',
    subtitle: 'Todo lo que necesitas para diseñar un programa de vino por copa rentable.',
    problem: 'La mayoría de restaurantes ofrece vino por copa sin una estrategia clara: pocas referencias, precios arbitrarios, sin rotación y sin medición.',
    content: '5 capítulos con todo lo necesario para lanzar o mejorar tu programa de vino por copa.',
  },
  'plantilla-wine-mapping-restaurante': {
    title: 'Plantilla de Wine Mapping para restaurantes',
    description: 'Descarga gratis la plantilla de wine mapping para estructurar los precios y la distribución de vinos en tu carta.',
    subtitle: 'Mapea tu carta de vinos en una matriz de precio por estilo para detectar huecos, solapamientos y oportunidades.',
    problem: 'Sin un mapa visual de tu carta es difícil detectar si hay demasiados vinos compitiendo en la misma franja o estilos sin cobertura.',
    content: 'Todo lo necesario para mapear tu carta de vinos y detectar oportunidades de mejora.',
  },
  'revision-mensual-margenes': {
    title: 'Revisión mensual de márgenes',
    description: 'Descarga la plantilla para revisar cada mes el margen de tu carta de vinos. Detecta erosión de rentabilidad.',
    subtitle: 'Una plantilla práctica para revisar cada mes cómo evoluciona el margen real de tu carta.',
    problem: 'Muchos restaurantes detectan tarde que están perdiendo margen por subida de costes, mala calibración de precios o referencias poco rentables.',
    content: 'Convierte la revisión mensual en una rutina útil para pricing, compras, copeo y rentabilidad real.',
  },
};

const BENCHMARK_DETAIL_PRERENDER_PAGES: Record<string, CompactDetailPrerenderPage & { kind: 'Benchmark' | 'Playbook' }> = {
  'benchmark-referencias-por-tipo-restaurante': {
    kind: 'Benchmark',
    title: 'Número ideal de referencias según tipo de restaurante',
    description: '¿Cuántas referencias debe tener tu carta de vinos? Benchmark por tipo de restaurante: gastronómico, casual, hotel, vinoteca.',
    subtitle: 'Descubre cuántas referencias de vino debería tener tu carta según el tipo de establecimiento, el ticket medio y el perfil de cliente.',
    problem: 'Una carta sobredimensionada genera stock muerto, confusión en el cliente y costes de almacenaje innecesarios. Una carta demasiado corta limita la experiencia.',
    content: 'El número ideal de referencias depende del tipo de restaurante, posicionamiento, rotación esperada y capacidad del equipo para recomendar.',
  },
  'benchmark-distribucion-rangos-precio': {
    kind: 'Benchmark',
    title: 'Distribución ideal por rangos de precio',
    description: 'Cómo distribuir los rangos de precio en tu carta de vinos para maximizar ventas y margen. Benchmark con criterios prácticos para hostelería.',
    subtitle: 'Aprende a estructurar los rangos de precio de tu carta para que el cliente navegue con facilidad y el restaurante maximice su margen.',
    problem: 'Una carta con precios mal distribuidos concentra pedidos en el vino más barato o hace que los caros parezcan inaccesibles.',
    content: 'La distribución de precios debe guiar al cliente hacia una zona de confort donde el restaurante obtiene su mejor margen.',
  },
  'benchmark-estrategia-por-copa': {
    kind: 'Benchmark',
    title: 'Estrategia de vino por copa: cuántos y cuáles',
    description: '¿Cuántos vinos por copa ofrecer? ¿Cuáles elegir? Benchmark con criterios prácticos para diseñar una oferta de vino por copa rentable.',
    subtitle: 'El vino por copa es una de las palancas más potentes para aumentar ventas. Descubre cuántos ofrecer, qué perfiles elegir y cómo rotarlos.',
    problem: 'Ofrecer pocos vinos por copa limita la experiencia. Ofrecer demasiados genera merma y complejidad operativa.',
    content: 'Una oferta de vino por copa bien diseñada aumenta ticket medio, reduce barreras de compra y permite explorar sin compromiso.',
  },
  'benchmark-equilibrio-regiones-estilos': {
    kind: 'Benchmark',
    title: 'Equilibrio entre regiones, estilos y tipologías',
    description: '¿Tu carta está equilibrada en regiones, estilos y tipologías? Benchmark para construir una carta diversa, coherente y alineada con tu cocina.',
    subtitle: 'Una carta equilibrada no es una carta que lo tiene todo: es una carta donde cada vino cumple una función.',
    problem: 'Cartas donde una región o estilo domina excesivamente limitan la experiencia del cliente y las posibilidades de maridaje.',
    content: 'El equilibrio significa que cada región, estilo y tipología responde a la cocina, el perfil del cliente y la identidad del establecimiento.',
  },
  'benchmark-peso-vino-ticket-medio': {
    kind: 'Benchmark',
    title: 'Peso del vino en el ticket medio',
    description: '¿Cuánto debería representar el vino en tu ticket medio? Benchmark por tipo de restaurante para evaluar y mejorar la contribución del vino a la facturación.',
    subtitle: 'El vino puede representar entre un 15% y un 40% del ticket medio. Conoce los rangos habituales y evalúa si estás por debajo de tu potencial.',
    problem: 'Muchos restaurantes desconocen qué porcentaje del ticket medio corresponde al vino y no pueden evaluar si aprovechan su potencial.',
    content: 'El peso del vino en el ticket medio varía según el tipo de restaurante, pero los rangos del sector permiten identificar oportunidades.',
  },
  'benchmark-margen-por-tipo-referencia': {
    kind: 'Benchmark',
    title: 'Margen por tipo de referencia',
    description: '¿Qué margen aplicar a cada tipo de vino? Benchmark con criterios por categoría: entrada, medio, premium, copa, espumoso. Estrategia de pricing real.',
    subtitle: 'No todos los vinos necesitan el mismo margen. Descubre cómo aplicar una estrategia de pricing diferenciada.',
    problem: 'Aplicar un multiplicador uniforme genera precios desproporcionados en referencias caras y márgenes insuficientes en referencias baratas.',
    content: 'Una estrategia inteligente aplica diferentes multiplicadores según coste, contexto competitivo y percepción de valor del cliente.',
  },
  'playbook-vender-mas-vino': {
    kind: 'Playbook',
    title: 'Cómo vender más vino en sala',
    description: 'Playbook práctico para aumentar las ventas de vino en tu restaurante. Técnicas de recomendación, formación de personal y diseño de carta.',
    subtitle: 'Un plan de acción con las técnicas más efectivas para que tu equipo venda más vino sin necesidad de ser sumiller.',
    problem: 'El personal no recomienda vino porque no se siente seguro, no tiene formación o la carta es demasiado compleja para explicarla.',
    content: 'Vender más vino requiere una carta bien diseñada, un equipo con herramientas claras y un sistema que facilite la recomendación.',
  },
  'playbook-mejorar-rotacion': {
    kind: 'Playbook',
    title: 'Cómo mejorar la rotación de vinos',
    description: 'Playbook para eliminar stock muerto y mejorar la rotación de tu bodega. Criterios de análisis, acciones correctivas y prevención.',
    subtitle: 'Un plan paso a paso para identificar los vinos que no rotan, decidir qué hacer con ellos y prevenir que se acumulen en el futuro.',
    problem: 'Stock muerto que ocupa espacio, inmoviliza capital y genera costes ocultos durante meses o años.',
    content: 'La rotación requiere análisis periódico, decisiones claras sobre qué mantener o retirar y un sistema de prevención.',
  },
  'playbook-carta-rentable': {
    kind: 'Playbook',
    title: 'Cómo construir una carta más rentable',
    description: 'Playbook completo para diseñar una carta de vinos que maximice márgenes, rotación y experiencia del cliente. Estructura, pricing y selección.',
    subtitle: 'Un marco de trabajo para rediseñar tu carta de vinos con foco en rentabilidad sin sacrificar experiencia.',
    problem: 'Cartas construidas por inercia acumulan referencias, precios sin estrategia y poca conexión con la cocina.',
    content: 'Una carta rentable es aquella donde cada referencia tiene propósito, precio bien calculado y conexión clara con la oferta gastronómica.',
  },
  'playbook-optimizar-vino-copa': {
    kind: 'Playbook',
    title: 'Cómo optimizar tu oferta de vino por copa',
    description: 'Playbook para diseñar, gestionar y rentabilizar tu oferta de vino por copa. Selección, pricing, control de merma y estrategia de rotación.',
    subtitle: 'La copa es tu mejor herramienta de venta de vino. Este playbook muestra cómo maximizar facturación y minimizar merma.',
    problem: 'Merma excesiva, selección poco atractiva, precios mal calculados o falta de rotación frenan la rentabilidad de la copa.',
    content: 'Una oferta de vino por copa rentable requiere selección inteligente, pricing ajustado y control operativo.',
  },
  'playbook-formar-personal': {
    kind: 'Playbook',
    title: 'Cómo formar al personal para recomendar vino',
    description: 'Playbook para formar al personal de sala en vino. Técnicas simples, sin jerga, para que tu equipo recomiende con confianza y aumente las ventas.',
    subtitle: 'Tu equipo no necesita ser sumiller. Necesita confianza, herramientas adecuadas y una carta que pueda explicar en 30 segundos.',
    problem: 'El personal no recomienda vino porque tiene miedo a equivocarse, no conoce la carta o siente que el vino es un tema de expertos.',
    content: 'La formación en vino debe ser práctica, centrada en la carta real del restaurante y orientada a venta.',
  },
  'playbook-decidir-compras-datos': {
    kind: 'Playbook',
    title: 'Cómo decidir qué vinos comprar con datos',
    description: 'Playbook para tomar decisiones de compra de vino basadas en datos reales: rotación, margen, demanda y tendencias. Reduce riesgos y mejora tu selección.',
    subtitle: 'Deja de comprar por intuición o por la relación con el proveedor. Aprende a usar datos de venta para comprar mejor.',
    problem: 'Decisiones de compra basadas en inercia, presión del distribuidor o gusto personal generan surtido débil y stock inmovilizado.',
    content: 'Comprar bien significa comprar lo que tu restaurante necesita según datos de venta, rotación, margen y demanda real.',
  },
};

function renderResourceDetailPage(path: string): string | null {
  const match = path.match(/^\/recursos\/([^/]+)$/);
  if (!match) return null;

  const slug = match[1];
  const page = RESOURCE_DETAIL_PRERENDER_PAGES[slug];
  if (!page) return null;

  const canonical = `${SITE}/recursos/${slug}`;
  return generateHTML(
    {
      title: `${page.title} | Winerim`,
      description: page.description,
      canonical,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'article',
      schemaType: 'CreativeWork',
    },
    {
      h1: page.title,
      subtitle: page.subtitle,
      intro: page.description,
      sections: [
        { heading: 'Problema que resuelve', content: page.problem },
        { heading: 'Qué incluye', content: page.content },
        { heading: 'Cómo usarlo en una carta de vinos', content: `Este recurso ayuda a ordenar decisiones de carta, precio, rotación, formación o compras con un criterio operativo. Está pensado para equipos de sala, responsables de F&B, propietarios y grupos que necesitan pasar de la intuición a procesos repetibles.` },
        { heading: 'Siguiente paso con Winerim', content: 'La plantilla te da el marco de trabajo. Winerim automatiza el análisis de carta, el seguimiento de ventas, la detección de oportunidades y la recomendación de acciones para vender más vino con mejores márgenes.' },
      ],
      faqs: [
        { q: `¿Para qué sirve ${page.title}?`, a: page.description },
        { q: '¿Cómo ayuda Winerim después de usar el recurso?', a: 'Winerim convierte el diagnóstico en seguimiento continuo: analiza ventas, margen, rotación, stock y oportunidades de mejora sobre la carta real del restaurante.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Recursos', url: `${SITE}/recursos` },
        { name: page.title, url: canonical },
      ],
      internalLinks: [
        { label: 'Recursos descargables', url: '/recursos' },
        { label: 'Guías y recursos', url: '/guias-y-recursos' },
        { label: 'Benchmarks y playbooks', url: '/benchmarks-playbooks' },
        { label: 'Software de carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Analizar mi carta gratis', url: '/analisis-carta' },
        { label: 'Solicitar demo', url: '/demo' },
      ],
    }
  );
}

function renderBenchmarkPlaybookDetailPage(path: string): string | null {
  const match = path.match(/^\/benchmarks-playbooks\/([^/]+)$/);
  if (!match) return null;

  const slug = match[1];
  const page = BENCHMARK_DETAIL_PRERENDER_PAGES[slug];
  if (!page) return null;

  const canonical = `${SITE}/benchmarks-playbooks/${slug}`;
  return generateHTML(
    {
      title: `${page.title} | Winerim`,
      description: page.description,
      canonical,
      ogImage: OG_IMAGE,
      lang: 'es',
      type: 'article',
      schemaType: 'Article',
    },
    {
      h1: page.title,
      subtitle: page.subtitle,
      intro: page.description,
      sections: [
        { heading: `Resumen del ${page.kind.toLowerCase()}`, content: page.content },
        { heading: 'Problema que resuelve', content: page.problem },
        { heading: 'Cómo aplicarlo en un restaurante', content: 'Úsalo para revisar la estructura de carta, el comportamiento de ventas, la rotación de referencias, el peso del vino en el ticket y la capacidad del equipo para recomendar con seguridad.' },
        { heading: 'Cómo lo convierte Winerim en acción', content: 'Winerim conecta carta, ventas, stock, margen y recomendaciones para que estos criterios no queden en una revisión puntual, sino en un sistema continuo de decisión.' },
      ],
      faqs: [
        { q: `¿Qué aporta este ${page.kind.toLowerCase()}?`, a: page.description },
        { q: '¿Necesito datos de ventas para aplicarlo?', a: 'Los datos reales mejoran la precisión, pero el contenido también sirve como marco cualitativo para detectar oportunidades antes de automatizar el seguimiento con Winerim.' },
      ],
      breadcrumbs: [
        { name: 'Inicio', url: `${SITE}/` },
        { name: 'Benchmarks y playbooks', url: `${SITE}/benchmarks-playbooks` },
        { name: page.title, url: canonical },
      ],
      internalLinks: [
        { label: 'Benchmarks y playbooks', url: '/benchmarks-playbooks' },
        { label: 'Guías y recursos', url: '/guias-y-recursos' },
        { label: 'Herramientas gratuitas', url: '/herramientas' },
        { label: 'Software de carta de vinos', url: '/software-carta-de-vinos' },
        { label: 'Analizar mi carta gratis', url: '/analisis-carta' },
        { label: 'Solicitar demo', url: '/demo' },
      ],
    }
  );
}

// ── Helpers ──
function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function normalizeRequestedPath(input: string | null): string | null {
  if (!input) return null;

  let value = input.trim();
  if (!value) return null;

  try {
    if (value.startsWith('http://') || value.startsWith('https://')) {
      value = new URL(value).pathname || '/';
    }
  } catch {
    // ignore malformed absolute URLs and continue normalizing as a path
  }

  if (!value.startsWith('/')) {
    const slashIndex = value.indexOf('/');
    value = slashIndex >= 0 ? value.slice(slashIndex) : `/${value}`;
  }

  try {
    const parsed = new URL(value, SITE);
    value = parsed.pathname || '/';
  } catch {
    // keep original value when it cannot be parsed as a relative path
  }

  try {
    value = decodeURIComponent(value);
  } catch {
    // keep non-decodable values as-is
  }

  value = value.replace(/\/+$|\?.*$|#.*$/g, '');
  return value || '/';
}

// ── Main handler ──
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const ua = req.headers.get('user-agent') || '';

    let path = normalizeRequestedPath(url.searchParams.get('url'))
      || normalizeRequestedPath(url.searchParams.get('path'))
      || normalizeRequestedPath(req.headers.get('x-original-path'))
      || normalizeRequestedPath(req.headers.get('x-forwarded-path'));

    if (!path) {
      const match = url.pathname.match(/\/prerender\/(.*)/);
      path = normalizeRequestedPath(match && match[1] ? '/' + match[1] : null) || '/';
    }

    console.log('Prerender request — resolved path:', path, '| raw url:', url.toString(), '| ua:', ua.substring(0, 60));

    if (!isBot(ua)) {
      return new Response(JSON.stringify({ prerender: false, reason: 'not-a-bot' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let html: string | null = null;
    const articleRequest = articleRequestFromPath(path);

    const staticPage = STATIC_PAGES[path];
    if (staticPage) {
      const hreflang = hreflangForPath(path);
      const wineLibraryHome = resolveWineLibraryPath(path);
      const content = wineLibraryHome?.esPath === '/biblioteca-vino'
        ? withWineLibraryHubRoutes(staticPage.content, wineLibraryHome.lang, wineLibraryHome.esPath)
        : staticPage.content;
      html = generateHTML(staticPage.meta, content, hreflang);
    }

    if (!html) {
      html = renderLocalizedStaticPage(path);
    }

    if (!html) {
      html = renderWineLibraryPage(path);
    }

    if (!html) {
      html = renderResourceDetailPage(path);
    }

    if (!html) {
      html = renderBenchmarkPlaybookDetailPage(path);
    }

    if (!html && articleRequest) {
      html = await renderArticle(articleRequest.dbSlug);
      if (!html && articleRequest.routeLang !== 'es') {
        html = await renderArticle(articleRequest.baseSlug);
      }
    }

    if (!html && (path.startsWith('/software-carta-de-vinos-') || path.startsWith('/software-vino-') || path.startsWith('/wine-list-software-'))) {
      const slug = path.replace(/^\//, '');
      html = await renderSeoPage(slug);
    }

    if (!html && !articleRequest) {
      const slug = path.replace(/^\//, '');
      if (slug) html = await renderSeoPage(slug);
    }

    if (html) {
      return new Response(html, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          'X-Prerender': 'true',
          'X-Prerender-Resolved-Path': path,
        },
      });
    }

    const fallbackPage = STATIC_PAGES['/'];
    const fallbackHreflang = HREFLANG_MAP['/'];
    html = generateHTML(fallbackPage.meta, fallbackPage.content, fallbackHreflang);
    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'X-Prerender': 'true',
        'X-Prerender-Fallback': 'homepage',
        'X-Prerender-Resolved-Path': path,
      },
    });

  } catch (error) {
    console.error('Prerender error:', error);
    return new Response(JSON.stringify({ prerender: false, reason: 'error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
