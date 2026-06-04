import { ArrowRight, Network } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { getLocalizedGrapeCatalogEntry } from "@/data/grapesLibraryI18n";
import { getLocalizedPairingBySlug } from "@/data/pairingsLibraryI18n";
import { getLocalizedRegionBySlug } from "@/data/regionsLibraryI18n";
import { getLocalizedStyleBySlug, getLocalizedStyleCatalogEntry } from "@/data/stylesLibraryI18n";
import { getWineLibraryPath } from "@/data/wineLibraryI18n";
import { useLanguage } from "@/i18n/LanguageContext";

export type StrategicWineLibraryHub = "library" | "grapes" | "regions" | "styles" | "pairings";
type SupportedLang = "es" | "en" | "it" | "fr" | "de" | "pt";
type RouteType = "grape" | "region" | "style" | "pairing";
type GroupKey =
  | "classicRedPath"
  | "atlanticWhitePath"
  | "servicePairings"
  | "sparklingDiscovery"
  | "highRecognitionGrapes"
  | "differentialGrapesRoute"
  | "whiteGrapesToRegions"
  | "grapesForPairing"
  | "spanishRegions"
  | "frenchRegions"
  | "portugalRoutes"
  | "regionToStyle"
  | "redStructure"
  | "whiteTexture"
  | "sparklingAndRose"
  | "commercialStyles"
  | "seafoodPairings"
  | "meatPairings"
  | "vegetablePastaPairings"
  | "cheeseDessertService";

type LocalizedText = Record<SupportedLang, string>;

interface RouteDefinition {
  type: RouteType;
  slug: string;
}

interface RouteGroupDefinition {
  copyKey: GroupKey;
  routes: RouteDefinition[];
}

interface ResolvedRoute {
  label: string;
  path: string;
  type: RouteType;
}

export interface StrategicWineLibraryRouteItem extends ResolvedRoute {
  groupTitle: string;
  groupDescription: string;
}

interface StrategicWineLibraryRoutesProps {
  hub: StrategicWineLibraryHub;
  className?: string;
}

const langKey = (lang: string): SupportedLang => {
  if (["es", "en", "it", "fr", "de", "pt"].includes(lang)) return lang as SupportedLang;
  return "en";
};

const text = (copy: LocalizedText, lang: SupportedLang) => copy[lang] || copy.en;

const route = (type: RouteType, slug: string): RouteDefinition => ({ type, slug });

const routeGroups: Record<StrategicWineLibraryHub, RouteGroupDefinition[]> = {
  library: [
    {
      copyKey: "classicRedPath",
      routes: [route("grape", "tempranillo"), route("region", "rioja"), route("region", "ribera-del-duero"), route("style", "tinto-crianza")],
    },
    {
      copyKey: "atlanticWhitePath",
      routes: [route("grape", "albarino"), route("region", "rias-baixas"), route("grape", "godello"), route("style", "blanco-crianza-lias")],
    },
    {
      copyKey: "servicePairings",
      routes: [route("pairing", "ostras"), route("pairing", "pescados-y-mariscos"), route("pairing", "quesos"), route("pairing", "carnes-rojas")],
    },
    {
      copyKey: "sparklingDiscovery",
      routes: [route("region", "champagne"), route("style", "espumoso"), route("style", "cava"), route("grape", "xarello")],
    },
  ],
  grapes: [
    {
      copyKey: "highRecognitionGrapes",
      routes: [route("grape", "tempranillo"), route("grape", "chardonnay"), route("grape", "cabernet-sauvignon"), route("grape", "pinot-noir")],
    },
    {
      copyKey: "differentialGrapesRoute",
      routes: [route("grape", "mencia"), route("grape", "godello"), route("grape", "xarello"), route("grape", "touriga-nacional")],
    },
    {
      copyKey: "whiteGrapesToRegions",
      routes: [route("grape", "albarino"), route("region", "rias-baixas"), route("grape", "sauvignon-blanc"), route("region", "sancerre")],
    },
    {
      copyKey: "grapesForPairing",
      routes: [route("grape", "garnacha"), route("pairing", "paella"), route("grape", "riesling"), route("pairing", "cocina-asiatica-y-fusion")],
    },
  ],
  regions: [
    {
      copyKey: "spanishRegions",
      routes: [route("region", "rioja"), route("region", "ribera-del-duero"), route("region", "rias-baixas"), route("region", "priorat")],
    },
    {
      copyKey: "frenchRegions",
      routes: [route("region", "bourgogne"), route("region", "champagne"), route("region", "sancerre"), route("region", "bordeaux")],
    },
    {
      copyKey: "portugalRoutes",
      routes: [route("region", "douro"), route("grape", "touriga-nacional"), route("style", "tinto-reserva"), route("pairing", "carnes-rojas")],
    },
    {
      copyKey: "regionToStyle",
      routes: [route("region", "rueda"), route("grape", "verdejo"), route("region", "penedes"), route("style", "cava")],
    },
  ],
  styles: [
    {
      copyKey: "redStructure",
      routes: [route("style", "tinto-crianza"), route("style", "tinto-reserva"), route("grape", "tempranillo"), route("region", "rioja")],
    },
    {
      copyKey: "whiteTexture",
      routes: [route("style", "blanco-crianza-lias"), route("grape", "chardonnay"), route("grape", "godello"), route("region", "bourgogne")],
    },
    {
      copyKey: "sparklingAndRose",
      routes: [route("style", "espumoso"), route("style", "cava"), route("style", "rosado-cuerpo"), route("pairing", "tapas-y-aperitivos")],
    },
    {
      copyKey: "commercialStyles",
      routes: [route("style", "tinto-reserva"), route("pairing", "carnes-rojas"), route("style", "blanco-crianza-lias"), route("pairing", "pescados-y-mariscos")],
    },
  ],
  pairings: [
    {
      copyKey: "seafoodPairings",
      routes: [route("pairing", "ostras"), route("pairing", "pescados-y-mariscos"), route("pairing", "lubina-dorada"), route("grape", "albarino")],
    },
    {
      copyKey: "meatPairings",
      routes: [route("pairing", "carnes-rojas"), route("grape", "tempranillo"), route("style", "tinto-reserva"), route("region", "ribera-del-duero")],
    },
    {
      copyKey: "vegetablePastaPairings",
      routes: [route("pairing", "pasta-arroces-y-legumbres"), route("pairing", "paella"), route("style", "rosado-cuerpo"), route("grape", "garnacha")],
    },
    {
      copyKey: "cheeseDessertService",
      routes: [route("pairing", "quesos"), route("pairing", "postres-y-chocolate"), route("style", "espumoso"), route("region", "champagne")],
    },
  ],
};

const hubCopy: Record<StrategicWineLibraryHub, { title: LocalizedText; description: LocalizedText }> = {
  library: {
    title: {
      es: "Rutas estratégicas para explorar la biblioteca",
      en: "Strategic routes through the library",
      it: "Percorsi strategici nella biblioteca",
      fr: "Parcours stratégiques dans la bibliothèque",
      de: "Strategische Wege durch die Bibliothek",
      pt: "Percursos estratégicos na biblioteca",
    },
    description: {
      es: "Accesos directos que conectan uvas, regiones, estilos y maridajes con alta intención de búsqueda y uso real en carta.",
      en: "Short paths that connect grapes, regions, styles and pairings with strong search intent and real wine-list use.",
      it: "Accessi rapidi che collegano vitigni, regioni, stili e abbinamenti con forte intento di ricerca e uso reale in carta.",
      fr: "Accès courts reliant cépages, régions, styles et accords à forte intention de recherche et usage réel en carte.",
      de: "Kurze Wege, die Rebsorten, Regionen, Stile und Pairings mit hoher Suchintention und echtem Einsatz auf der Karte verbinden.",
      pt: "Acessos diretos que ligam castas, regiões, estilos e harmonizações com forte intenção de pesquisa e uso real na carta.",
    },
  },
  grapes: {
    title: {
      es: "Rutas de uvas con mayor valor para carta",
      en: "Grape routes with the highest wine-list value",
      it: "Percorsi di vitigni con maggiore valore in carta",
      fr: "Parcours de cépages à forte valeur en carte",
      de: "Rebsortenwege mit hohem Wert für die Weinkarte",
      pt: "Rotas de castas com maior valor para a carta",
    },
    description: {
      es: "Conecta variedades reconocibles y diferenciales con regiones, estilos y maridajes que suelen activar la decisión del comensal.",
      en: "Connect recognizable and distinctive varieties with regions, styles and pairings that usually drive guest decisions.",
      it: "Collega varietà riconoscibili e distintive a regioni, stili e abbinamenti che guidano la scelta del cliente.",
      fr: "Reliez les cépages connus et différenciants aux régions, styles et accords qui déclenchent la décision du client.",
      de: "Verbindet bekannte und differenzierende Rebsorten mit Regionen, Stilen und Pairings, die Gästeentscheidungen auslösen.",
      pt: "Liga castas reconhecíveis e diferenciais a regiões, estilos e harmonizações que ajudam a decisão do cliente.",
    },
  },
  regions: {
    title: {
      es: "Regiones que ordenan la lectura de la carta",
      en: "Regions that structure wine-list reading",
      it: "Regioni che strutturano la lettura della carta",
      fr: "Régions qui structurent la lecture de la carte",
      de: "Regionen, die die Weinkarte strukturieren",
      pt: "Regiões que estruturam a leitura da carta",
    },
    description: {
      es: "Rutas desde denominaciones de referencia hacia uvas, estilos y maridajes útiles para servicio, compra y venta.",
      en: "Routes from benchmark denominations into grapes, styles and pairings useful for service, purchasing and sales.",
      it: "Percorsi da denominazioni di riferimento verso vitigni, stili e abbinamenti utili per servizio, acquisti e vendita.",
      fr: "Parcours depuis les appellations de référence vers cépages, styles et accords utiles au service, aux achats et à la vente.",
      de: "Wege von Referenzherkünften zu Rebsorten, Stilen und Pairings für Service, Einkauf und Verkauf.",
      pt: "Rotas desde denominações de referência até castas, estilos e harmonizações úteis para serviço, compra e venda.",
    },
  },
  styles: {
    title: {
      es: "Estilos conectados con decisión comercial",
      en: "Styles connected to commercial decisions",
      it: "Stili collegati alla decisione commerciale",
      fr: "Styles liés à la décision commerciale",
      de: "Stile mit kommerzieller Entscheidungskraft",
      pt: "Estilos ligados à decisão comercial",
    },
    description: {
      es: "Caminos desde el estilo hacia uvas, regiones y platos que facilitan explicar, vender y equilibrar una carta.",
      en: "Paths from style into grapes, regions and dishes that make a list easier to explain, sell and balance.",
      it: "Percorsi dallo stile verso vitigni, regioni e piatti che aiutano a spiegare, vendere ed equilibrare la carta.",
      fr: "Chemins depuis le style vers cépages, régions et plats pour mieux expliquer, vendre et équilibrer une carte.",
      de: "Wege vom Stil zu Rebsorten, Regionen und Gerichten, um eine Karte leichter zu erklären, zu verkaufen und auszubalancieren.",
      pt: "Caminhos do estilo para castas, regiões e pratos que ajudam a explicar, vender e equilibrar uma carta.",
    },
  },
  pairings: {
    title: {
      es: "Maridajes que abren rutas de venta",
      en: "Pairings that open sales routes",
      it: "Abbinamenti che aprono percorsi di vendita",
      fr: "Accords qui ouvrent des chemins de vente",
      de: "Pairings, die Verkaufswege öffnen",
      pt: "Harmonizações que abrem rotas de venda",
    },
    description: {
      es: "Conecta platos de alta demanda con uvas, regiones y estilos que reducen fricción y elevan el ticket medio.",
      en: "Connect high-demand dishes with grapes, regions and styles that reduce friction and lift average ticket.",
      it: "Collega piatti ad alta domanda a vitigni, regioni e stili che riducono l'attrito e aumentano lo scontrino medio.",
      fr: "Reliez les plats à forte demande aux cépages, régions et styles qui réduisent la friction et augmentent le ticket moyen.",
      de: "Verbindet stark nachgefragte Gerichte mit Rebsorten, Regionen und Stilen, die Reibung senken und den Durchschnittsbon erhöhen.",
      pt: "Liga pratos de alta procura a castas, regiões e estilos que reduzem fricção e aumentam o ticket médio.",
    },
  },
};

const sharedCopy: Record<SupportedLang, { eyebrow: string; typeLabels: Record<RouteType, string> }> = {
  es: { eyebrow: "Biblioteca conectada", typeLabels: { grape: "Uva", region: "Región", style: "Estilo", pairing: "Maridaje" } },
  en: { eyebrow: "Connected library", typeLabels: { grape: "Grape", region: "Region", style: "Style", pairing: "Pairing" } },
  it: { eyebrow: "Biblioteca collegata", typeLabels: { grape: "Vitigno", region: "Regione", style: "Stile", pairing: "Abbinamento" } },
  fr: { eyebrow: "Bibliothèque connectée", typeLabels: { grape: "Cépage", region: "Région", style: "Style", pairing: "Accord" } },
  de: { eyebrow: "Vernetzte Bibliothek", typeLabels: { grape: "Rebsorte", region: "Region", style: "Stil", pairing: "Pairing" } },
  pt: { eyebrow: "Biblioteca ligada", typeLabels: { grape: "Casta", region: "Região", style: "Estilo", pairing: "Harmonização" } },
};

const groupCopy: Record<GroupKey, { title: LocalizedText; description: LocalizedText }> = {
  classicRedPath: {
    title: { es: "Ruta tinta clásica", en: "Classic red route", it: "Percorso rosso classico", fr: "Parcours rouge classique", de: "Klassische Rotweinroute", pt: "Rota tinta clássica" },
    description: { es: "Para unir reconocimiento, denominación y crianza.", en: "Link recognition, denomination and ageing.", it: "Unisce riconoscibilità, denominazione e affinamento.", fr: "Relie notoriété, appellation et élevage.", de: "Verbindet Bekanntheit, Herkunft und Ausbau.", pt: "Liga reconhecimento, denominação e estágio." },
  },
  atlanticWhitePath: {
    title: { es: "Blancos atlánticos", en: "Atlantic whites", it: "Bianchi atlantici", fr: "Blancs atlantiques", de: "Atlantische Weißweine", pt: "Brancos atlânticos" },
    description: { es: "Frescura, salinidad y textura para carta gastronómica.", en: "Freshness, salinity and texture for food-led lists.", it: "Freschezza, salinità e texture per carte gastronomiche.", fr: "Fraîcheur, salinité et texture pour cartes gastronomiques.", de: "Frische, Salinität und Textur für gastronomische Karten.", pt: "Frescura, salinidade e textura para cartas gastronómicas." },
  },
  servicePairings: {
    title: { es: "Maridajes de servicio", en: "Service pairings", it: "Abbinamenti di servizio", fr: "Accords de service", de: "Pairings für den Service", pt: "Harmonizações de serviço" },
    description: { es: "Platos que suelen necesitar una recomendación rápida.", en: "Dishes that often need a quick recommendation.", it: "Piatti che spesso richiedono una raccomandazione rapida.", fr: "Plats qui demandent souvent une recommandation rapide.", de: "Gerichte, die oft eine schnelle Empfehlung brauchen.", pt: "Pratos que costumam pedir uma recomendação rápida." },
  },
  sparklingDiscovery: {
    title: { es: "Espumosos y descubrimiento", en: "Sparkling and discovery", it: "Bollicine e scoperta", fr: "Effervescents et découverte", de: "Schaumwein und Entdeckung", pt: "Espumantes e descoberta" },
    description: { es: "Conecta método, origen y uvas con alta utilidad en sala.", en: "Connect method, origin and grapes with strong service value.", it: "Collega metodo, origine e vitigni con grande utilità in sala.", fr: "Relie méthode, origine et cépages utiles au service.", de: "Verbindet Methode, Herkunft und Rebsorten mit hohem Servicewert.", pt: "Liga método, origem e castas com forte utilidade em sala." },
  },
  highRecognitionGrapes: {
    title: { es: "Variedades reconocibles", en: "Recognizable varieties", it: "Varietà riconoscibili", fr: "Cépages reconnaissables", de: "Bekannte Rebsorten", pt: "Castas reconhecíveis" },
    description: { es: "Nombres que el comensal identifica y compara.", en: "Names guests identify and compare.", it: "Nomi che il cliente riconosce e confronta.", fr: "Noms que le client reconnaît et compare.", de: "Namen, die Gäste erkennen und vergleichen.", pt: "Nomes que o cliente reconhece e compara." },
  },
  differentialGrapesRoute: {
    title: { es: "Uvas diferenciales", en: "Distinctive grapes", it: "Vitigni distintivi", fr: "Cépages différenciants", de: "Differenzierende Rebsorten", pt: "Castas diferenciais" },
    description: { es: "Para cartas que quieren profundidad sin perder claridad.", en: "For lists that want depth without losing clarity.", it: "Per carte che cercano profondità senza perdere chiarezza.", fr: "Pour les cartes qui veulent de la profondeur sans perdre en clarté.", de: "Für Karten mit Tiefe, ohne Klarheit zu verlieren.", pt: "Para cartas que procuram profundidade sem perder clareza." },
  },
  whiteGrapesToRegions: {
    title: { es: "Blancas hacia región", en: "Whites into regions", it: "Bianchi verso le regioni", fr: "Blancs vers les régions", de: "Weiße Rebsorten nach Region", pt: "Brancas por região" },
    description: { es: "La región aclara expectativas de acidez, aroma y precio.", en: "Region clarifies acidity, aroma and price expectations.", it: "La regione chiarisce acidità, aromi e prezzo.", fr: "La région clarifie acidité, arômes et prix.", de: "Region klärt Säure, Aroma und Preiserwartung.", pt: "A região clarifica acidez, aroma e preço." },
  },
  grapesForPairing: {
    title: { es: "Uvas para maridar", en: "Grapes for pairing", it: "Vitigni per abbinare", fr: "Cépages pour accorder", de: "Rebsorten fürs Pairing", pt: "Castas para harmonizar" },
    description: { es: "Rutas prácticas cuando la decisión empieza en el plato.", en: "Practical routes when the decision starts with the dish.", it: "Percorsi pratici quando la scelta parte dal piatto.", fr: "Parcours pratiques quand la décision part du plat.", de: "Praktische Wege, wenn die Entscheidung beim Gericht beginnt.", pt: "Rotas práticas quando a decisão começa no prato." },
  },
  spanishRegions: {
    title: { es: "España de referencia", en: "Benchmark Spain", it: "Spagna di riferimento", fr: "Espagne de référence", de: "Spanien als Referenz", pt: "Espanha de referência" },
    description: { es: "Denominaciones que estructuran muchas cartas.", en: "Denominations that structure many lists.", it: "Denominazioni che strutturano molte carte.", fr: "Appellations qui structurent de nombreuses cartes.", de: "Herkünfte, die viele Karten strukturieren.", pt: "Denominações que estruturam muitas cartas." },
  },
  frenchRegions: {
    title: { es: "Francia por intención", en: "France by intent", it: "Francia per intenzione", fr: "France par intention", de: "Frankreich nach Suchintention", pt: "França por intenção" },
    description: { es: "Regiones con búsqueda, prestigio y lectura de estilo.", en: "Regions with search demand, prestige and style clarity.", it: "Regioni con domanda, prestigio e lettura di stile.", fr: "Régions avec demande, prestige et lecture de style.", de: "Regionen mit Nachfrage, Prestige und Stilverständnis.", pt: "Regiões com procura, prestígio e leitura de estilo." },
  },
  portugalRoutes: {
    title: { es: "Portugal en carta", en: "Portugal on the list", it: "Portogallo in carta", fr: "Portugal en carte", de: "Portugal auf der Karte", pt: "Portugal na carta" },
    description: { es: "Conecta origen, uva y uso comercial.", en: "Connect origin, grape and commercial use.", it: "Collega origine, vitigno e uso commerciale.", fr: "Relie origine, cépage et usage commercial.", de: "Verbindet Herkunft, Rebsorte und kommerzielle Nutzung.", pt: "Liga origem, casta e uso comercial." },
  },
  regionToStyle: {
    title: { es: "De región a estilo", en: "Region into style", it: "Da regione a stile", fr: "De région à style", de: "Von Region zu Stil", pt: "Da região ao estilo" },
    description: { es: "Ayuda a convertir denominaciones en decisiones de servicio.", en: "Turn denominations into service decisions.", it: "Trasforma denominazioni in decisioni di servizio.", fr: "Transforme les appellations en décisions de service.", de: "Macht Herkunft zu Serviceentscheidungen.", pt: "Transforma denominações em decisões de serviço." },
  },
  redStructure: {
    title: { es: "Estructura tinta", en: "Red structure", it: "Struttura rossa", fr: "Structure rouge", de: "Rotweinstruktur", pt: "Estrutura tinta" },
    description: { es: "Crianza, reserva y regiones que ordenan el precio.", en: "Ageing, reserve styles and regions that frame price.", it: "Affinamento, riserva e regioni che ordinano il prezzo.", fr: "Élevage, réserve et régions qui structurent le prix.", de: "Ausbau, Reserve-Stile und Regionen, die Preise einordnen.", pt: "Estágio, reserva e regiões que organizam o preço." },
  },
  whiteTexture: {
    title: { es: "Textura blanca", en: "White texture", it: "Texture nei bianchi", fr: "Texture des blancs", de: "Textur bei Weißwein", pt: "Textura branca" },
    description: { es: "Lías, cuerpo y origen para vender blancos gastronómicos.", en: "Lees, body and origin to sell gastronomic whites.", it: "Lieviti, corpo e origine per vendere bianchi gastronomici.", fr: "Lies, corps et origine pour vendre des blancs gastronomiques.", de: "Hefe, Körper und Herkunft für gastronomische Weißweine.", pt: "Borras, corpo e origem para vender brancos gastronómicos." },
  },
  sparklingAndRose: {
    title: { es: "Espumoso y rosado", en: "Sparkling and rosé", it: "Bollicine e rosato", fr: "Effervescent et rosé", de: "Schaumwein und Rosé", pt: "Espumante e rosé" },
    description: { es: "Dos estilos versátiles para aperitivo y menú.", en: "Two versatile styles for aperitif and menu.", it: "Due stili versatili per aperitivo e menu.", fr: "Deux styles polyvalents pour apéritif et menu.", de: "Zwei vielseitige Stile für Aperitif und Menü.", pt: "Dois estilos versáteis para aperitivo e menu." },
  },
  commercialStyles: {
    title: { es: "Estilos de venta", en: "Sales-driving styles", it: "Stili che vendono", fr: "Styles moteurs de vente", de: "Verkaufsstarke Stile", pt: "Estilos que vendem" },
    description: { es: "Cruces directos entre estilo, plato y recomendación.", en: "Direct bridges between style, dish and recommendation.", it: "Ponti diretti tra stile, piatto e raccomandazione.", fr: "Ponts directs entre style, plat et recommandation.", de: "Direkte Brücken zwischen Stil, Gericht und Empfehlung.", pt: "Pontes diretas entre estilo, prato e recomendação." },
  },
  seafoodPairings: {
    title: { es: "Mar y acidez", en: "Sea and acidity", it: "Mare e acidità", fr: "Mer et acidité", de: "Meer und Säure", pt: "Mar e acidez" },
    description: { es: "Rutas rápidas para marisco, pescado blanco y salinidad.", en: "Fast routes for shellfish, white fish and salinity.", it: "Percorsi rapidi per frutti di mare, pesce bianco e salinità.", fr: "Parcours rapides pour fruits de mer, poisson blanc et salinité.", de: "Schnelle Wege für Meeresfrüchte, Weißfisch und Salinität.", pt: "Rotas rápidas para marisco, peixe branco e salinidade." },
  },
  meatPairings: {
    title: { es: "Carne y estructura", en: "Meat and structure", it: "Carne e struttura", fr: "Viande et structure", de: "Fleisch und Struktur", pt: "Carne e estrutura" },
    description: { es: "Tanino, crianza y región para platos intensos.", en: "Tannin, ageing and region for intense dishes.", it: "Tannino, affinamento e regione per piatti intensi.", fr: "Tanins, élevage et région pour plats intenses.", de: "Tannin, Ausbau und Region für intensive Gerichte.", pt: "Tanino, estágio e região para pratos intensos." },
  },
  vegetablePastaPairings: {
    title: { es: "Arroces, pasta y verduras", en: "Rice, pasta and vegetables", it: "Riso, pasta e verdure", fr: "Riz, pâtes et légumes", de: "Reis, Pasta und Gemüse", pt: "Arroz, massa e legumes" },
    description: { es: "Donde salsa, textura e intensidad deciden más que la proteína.", en: "Where sauce, texture and intensity matter more than protein.", it: "Dove salsa, texture e intensità contano più della proteina.", fr: "Là où sauce, texture et intensité comptent plus que la protéine.", de: "Wo Sauce, Textur und Intensität wichtiger sind als Protein.", pt: "Onde molho, textura e intensidade contam mais do que a proteína." },
  },
  cheeseDessertService: {
    title: { es: "Queso, postre y cierre", en: "Cheese, dessert and close", it: "Formaggio, dessert e chiusura", fr: "Fromage, dessert et finale", de: "Käse, Dessert und Abschluss", pt: "Queijo, sobremesa e fecho" },
    description: { es: "Opciones que amplían el consumo al final del servicio.", en: "Options that extend wine consumption at the end of service.", it: "Opzioni che estendono il consumo a fine servizio.", fr: "Options qui prolongent la consommation en fin de service.", de: "Optionen, die Weinkonsum am Ende des Service verlängern.", pt: "Opções que prolongam o consumo no fim do serviço." },
  },
};

const resolveRoute = (definition: RouteDefinition, lang: SupportedLang): ResolvedRoute | null => {
  if (definition.type === "grape") {
    const entry = getLocalizedGrapeCatalogEntry(definition.slug, lang);
    return entry ? { label: entry.name, path: getWineLibraryPath(lang, `/biblioteca-vino/uvas/${entry.slug}`), type: definition.type } : null;
  }

  if (definition.type === "region") {
    const entry = getLocalizedRegionBySlug(definition.slug, lang);
    return entry ? { label: entry.name, path: getWineLibraryPath(lang, `/biblioteca-vino/regiones/${entry.country}/${entry.slug}`), type: definition.type } : null;
  }

  if (definition.type === "style") {
    const entry = getLocalizedStyleBySlug(definition.slug, lang) || getLocalizedStyleCatalogEntry(definition.slug, lang);
    return entry ? { label: entry.name, path: getWineLibraryPath(lang, `/biblioteca-vino/estilos/${entry.slug}`), type: definition.type } : null;
  }

  const entry = getLocalizedPairingBySlug(definition.slug, lang);
  return entry ? { label: entry.name, path: getWineLibraryPath(lang, `/biblioteca-vino/maridajes/${entry.slug}`), type: definition.type } : null;
};

// eslint-disable-next-line react-refresh/only-export-components -- Keeps visible strategic routes and JSON-LD schema on the same source.
export const getStrategicWineLibraryRouteItems = (hub: StrategicWineLibraryHub, lang: string): StrategicWineLibraryRouteItem[] => {
  const language = langKey(lang);
  return routeGroups[hub].flatMap((group) => {
    const groupText = groupCopy[group.copyKey];
    return group.routes
      .map((definition) => resolveRoute(definition, language))
      .filter((entry): entry is ResolvedRoute => Boolean(entry))
      .map((entry) => ({
        ...entry,
        groupTitle: text(groupText.title, language),
        groupDescription: text(groupText.description, language),
      }));
  });
};

const StrategicWineLibraryRoutes = ({ hub, className = "" }: StrategicWineLibraryRoutesProps) => {
  const { lang } = useLanguage();
  const language = langKey(String(lang));
  const copy = hubCopy[hub];
  const shared = sharedCopy[language];
  const groups = routeGroups[hub]
    .map((group) => ({
      ...group,
      routes: group.routes.map((definition) => resolveRoute(definition, language)).filter((entry): entry is ResolvedRoute => Boolean(entry)),
    }))
    .filter((group) => group.routes.length > 0);

  if (groups.length === 0) return null;

  return (
    <section className={`section-padding ${className}`}>
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <Network size={18} className="text-wine" />
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gradient-gold">{shared.eyebrow}</p>
          </div>
          <h2 className="font-heading text-2xl font-bold md:text-3xl">{text(copy.title, language)}</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">{text(copy.description, language)}</p>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {groups.map((group, index) => {
            const groupText = groupCopy[group.copyKey];
            return (
              <ScrollReveal key={group.copyKey} delay={index * 0.05}>
                <div className="h-full rounded-lg border border-border bg-gradient-card p-5">
                  <h3 className="font-heading text-lg font-semibold">{text(groupText.title, language)}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted-foreground">{text(groupText.description, language)}</p>
                  <div className="mt-5 divide-y divide-border/70">
                    {group.routes.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="group flex items-center justify-between gap-3 py-3 text-sm transition-colors hover:text-wine"
                      >
                        <span>
                          <span className="block font-medium leading-snug">{item.label}</span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">{shared.typeLabels[item.type]}</span>
                        </span>
                        <ArrowRight size={14} className="shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-wine" />
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StrategicWineLibraryRoutes;
