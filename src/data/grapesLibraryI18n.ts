import type { GrapeEntry, GrapeCatalogEntry } from "./grapesLibrary";

// ─── Overlay-based i18n for grapes ──────────────────────────────────────
// Same pattern as newResourcesI18n.ts: keep ES as the base in grapesLibrary.ts
// and merge per-language overlays on top. Only text fields are translated;
// structural fields (slug, color, scope, ratings, related slugs, etc.) stay.

export type GrapeI18nOverlay = {
  tastingNotes?: string;
  description?: string;
  intro?: string;
  cartaPerception?: string;
  whenItHelps?: string;
  clientProfile?: string;
  sellByStrategy?: string;
  whenToWriteBig?: string;
  aromas?: string[];
  commonMistakes?: string[];
  pairings?: string[];
  faqs?: { q: string; a: string }[];
  seo?: { title?: string; description?: string };
};

export type GrapeCatalogI18nOverlay = {
  tastingNotes?: string;
};

type LangOverlays = Record<string, GrapeI18nOverlay>;
type CatalogLangOverlays = Record<string, GrapeCatalogI18nOverlay>;

// ─── Full entry overlays ────────────────────────────────────────────────
// Add new languages / new grapes here. Slugs not present fall back to ES.

export const grapeOverlays: Record<string, LangOverlays> = {
  tempranillo: {
    en: {
      tastingNotes:
        "Spain's flagship red. Red fruit, leather, vanilla. Excellent for barrel ageing.",
      description:
        "Spain's most important red variety, the backbone of the great wines of Rioja and Ribera del Duero, and one of the world's most versatile grapes.",
      intro:
        "Tempranillo is the quintessential Spanish red. Its name refers to its early ripening, and it's the backbone of some of the world's most recognised wines. Versatile and elegant, it adapts to diverse climates and produces wines ranging from young and fruity to long-aged Gran Reservas. Under names like Tinta de Toro, Cencibel or Tinta Roriz, it features on wine lists worldwide.",
      cartaPerception:
        "Tempranillo is the grape Spanish guests recognise most, though they often identify it through the region (Rioja, Ribera) rather than by varietal name. It's a safe bet on any list. Saying 'Tempranillo' adds clarity; saying 'Rioja Reserva' adds confidence.",
      whenItHelps:
        "Always. It is essential on any Spanish wine list. It works across every segment: from young by-the-glass to Gran Reserva as a premium anchor. It also works on international lists under its synonyms (Tinta Roriz in Portugal).",
      clientProfile:
        "Universal recognition in Spain. High among international travellers familiar with Rioja. Casual guests order it by region; the knowledgeable look for it by producer or vineyard.",
      sellByStrategy:
        "In Spain, it sells better by region ('a Rioja', 'a Ribera') than by varietal. In international markets, the name 'Tempranillo' is gaining its own pull. On the list, combining both references is ideal.",
      whenToWriteBig:
        "When the list targets an international audience or when you want to educate beyond the appellation. On a purely Spanish list, the region is usually more powerful than the grape name.",
      aromas: ["Cherry", "Plum", "Vanilla", "Leather", "Tobacco", "Sweet spices"],
      commonMistakes: [
        "Assuming all Tempranillo tastes the same: a Toro and a Rioja Alavesa are worlds apart",
        "Not exploring the synonyms: Tinta de Toro or Cencibel communicate differentiation",
        "Limiting the offer to Crianzas and Reservas without including quality young wines",
      ],
      pairings: ["Roast lamb", "Iberian ham", "Aged cheeses", "Pulse stews", "Grilled meats"],
      faqs: [
        { q: "Are Tempranillo and Tinta de Toro the same grape?", a: "Yes, genetically they are the same variety. In Toro, the extreme climate produces a more concentrated, powerful style than in Rioja." },
        { q: "Why is Tempranillo called different things in each region?", a: "Tradition. Each area gave it a local name: Cencibel in La Mancha, Ull de Llebre in Catalonia, Tinta Roriz in Portugal. They all refer to the same grape." },
        { q: "Does Tempranillo age well?", a: "Exceptionally well. A top Rioja Gran Reserva or premium Ribera del Duero can evolve for 20-30 years." },
      ],
      seo: {
        title: "Tempranillo: Complete grape guide | Winerim Library",
        description: "Everything about Tempranillo: synonyms, regions, sensory profile, role on the wine list and commercial criteria for hospitality. Winerim guide.",
      },
    },
  },
  "cabernet-sauvignon": {
    en: {
      tastingNotes:
        "The most international red. Cassis, cedar, graphite. Excellent ageing potential. Queen of left-bank Bordeaux.",
      description:
        "The world's most recognised red grape, known for its structure, longevity and universal character.",
      intro:
        "Cabernet Sauvignon is the global benchmark for red grapes. From Bordeaux to Napa Valley, from Chile to China, it produces powerful, structured wines with great ageing potential. Its firm tannins and complex aromatic profile make it the foundation of some of the most sought-after wines on the planet.",
      cartaPerception:
        "Cabernet Sauvignon communicates power, structure and seriousness. It's the variety most international guests recognise. Seeing it on the list provides instant confidence. It works as a universal premium reference.",
      whenItHelps:
        "On lists with international reach. A Napa or Bordeaux Cabernet anchors the premium segment. A Chilean Cabernet covers the value segment with high recognition.",
      clientProfile:
        "Recognition is virtually universal. From the executive ordering a Napa Cab to the casual guest who knows the name. It is probably the variety most people in the world can name.",
      sellByStrategy:
        "It sells equally well by varietal or by region, depending on the market. In Spain, the region leads (Bordeaux, Napa). In English-speaking markets, the grape name takes centre stage.",
      whenToWriteBig:
        "Whenever it's a pure or dominant varietal. The name Cabernet Sauvignon carries weight on any wine list in the world.",
      aromas: ["Cassis", "Green pepper", "Cedar", "Tobacco", "Dark chocolate", "Graphite"],
      commonMistakes: [
        "Serving too young: many Cabernets need maturity or at least decanting",
        "Not considering that a Chilean Cabernet and a Bordeaux are very different experiences",
        "Limiting perception to 'powerful wine': there are elegant, fresh Cabernets from cool climates",
      ],
      pairings: ["Ribeye steak", "Stews", "Very aged cheeses", "Lamb with herbs", "Truffle dishes"],
      faqs: [
        { q: "Why is Cabernet Sauvignon so popular?", a: "It combines universal recognition, structure that allows ageing, and an expression that works in virtually any wine-growing climate. It's the 'safest' red on a wine list." },
        { q: "What's the difference between a Bordeaux and a Napa Cabernet?", a: "Bordeaux tends to be more austere, elegant and blend-based (with Merlot). Napa produces more concentrated, fruit-forward, powerful Cabernets, generally as single varietals." },
      ],
      seo: {
        title: "Cabernet Sauvignon: Complete guide | Winerim Library",
        description: "Everything about Cabernet Sauvignon: regions, sensory profile, styles and its role in hospitality. Winerim guide with a commercial focus.",
      },
    },
  },
};

// ─── Catalog overlays (lightweight tastingNotes only) ───────────────────
// Add per-language tasting notes for catalog (non-full) entries here.

export const grapeCatalogOverlays: Record<string, CatalogLangOverlays> = {
  // "garnacha": { en: { tastingNotes: "..." } },
};

// ─── Helpers ────────────────────────────────────────────────────────────

/** Merge a per-language overlay on top of a base grape entry. */
export function getLocalizedGrape(grape: GrapeEntry, lang: string): GrapeEntry {
  const overlay = grapeOverlays[grape.slug]?.[lang];
  if (!overlay) return grape;
  return {
    ...grape,
    tastingNotes: overlay.tastingNotes ?? grape.tastingNotes,
    description: overlay.description ?? grape.description,
    intro: overlay.intro ?? grape.intro,
    cartaPerception: overlay.cartaPerception ?? grape.cartaPerception,
    whenItHelps: overlay.whenItHelps ?? grape.whenItHelps,
    clientProfile: overlay.clientProfile ?? grape.clientProfile,
    sellByStrategy: overlay.sellByStrategy ?? grape.sellByStrategy,
    whenToWriteBig: overlay.whenToWriteBig ?? grape.whenToWriteBig,
    aromas: overlay.aromas ?? grape.aromas,
    commonMistakes: overlay.commonMistakes ?? grape.commonMistakes,
    pairings: overlay.pairings ?? grape.pairings,
    faqs: overlay.faqs ?? grape.faqs,
    seo: {
      title: overlay.seo?.title ?? grape.seo.title,
      description: overlay.seo?.description ?? grape.seo.description,
    },
  };
}

/** Merge a per-language overlay on top of a base catalog entry. */
export function getLocalizedCatalogEntry<T extends GrapeCatalogEntry | GrapeEntry>(
  entry: T,
  lang: string,
): T {
  const fullOverlay = grapeOverlays[entry.slug]?.[lang];
  const catalogOverlay = grapeCatalogOverlays[entry.slug]?.[lang];
  const tastingNotes = fullOverlay?.tastingNotes ?? catalogOverlay?.tastingNotes;
  if (!tastingNotes) return entry;
  return { ...entry, tastingNotes };
}
