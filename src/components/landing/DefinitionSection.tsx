import ScrollReveal from "@/components/ScrollReveal";
import SummaryBox from "@/components/seo/SummaryBox";
import NotForSection from "@/components/seo/NotForSection";
import { useLanguage } from "@/i18n/LanguageContext";

const definitionData = {
  es: {
    definition: "Winerim es una carta inteligente de vinos para restaurantes que utiliza inteligencia artificial para recomendar vinos, generar maridajes automáticos, analizar ventas y optimizar precios. Accesible por QR desde el móvil del comensal, tablet o app nativa.",
    bullets: [
      "Carta inteligente de vinos interactiva con acceso por QR",
      "Recomendaciones de vino personalizadas con IA",
      "Maridajes automáticos para cada plato del menú",
      "Analítica de ventas de vino en tiempo real",
      "Optimización de precios y márgenes",
      "Multiplataforma: web, tablet y app nativa",
    ],
    summaryLabel: "¿Qué es Winerim?",
  },
  en: {
    definition: "Winerim is a smart wine list for restaurants that uses artificial intelligence to recommend wines, generate automatic pairings, analyze sales and optimize pricing. Accessible via QR from the guest's phone, tablet or native app.",
    bullets: [
      "Smart interactive wine list with QR access",
      "AI-powered personalized wine recommendations",
      "Automatic food and wine pairings for every dish",
      "Real-time wine sales analytics",
      "Price and margin optimization",
      "Multi-platform: web, tablet and native app",
    ],
    summaryLabel: "What is Winerim?",
  },
  it: {
    definition: "Winerim è una carta dei vini intelligente per ristoranti che utilizza l'intelligenza artificiale per raccomandare vini, generare abbinamenti automatici, analizzare le vendite e ottimizzare i prezzi.",
    bullets: [
      "Carta dei vini intelligente interattiva con accesso QR",
      "Raccomandazioni personalizzate con IA",
      "Abbinamenti automatici per ogni piatto del menu",
      "Analisi delle vendite in tempo reale",
      "Ottimizzazione prezzi e margini",
      "Multipiattaforma: web, tablet e app nativa",
    ],
    summaryLabel: "Cos'è Winerim?",
  },
  fr: {
    definition: "Winerim est une carte des vins intelligente pour restaurants qui utilise l'intelligence artificielle pour recommander des vins, générer des accords automatiques, analyser les ventes et optimiser les prix.",
    bullets: [
      "Carte des vins intelligente interactive avec accès QR",
      "Recommandations personnalisées par IA",
      "Accords mets-vins automatiques pour chaque plat",
      "Analytique des ventes en temps réel",
      "Optimisation des prix et des marges",
      "Multiplateforme : web, tablette et app native",
    ],
    summaryLabel: "Qu'est-ce que Winerim ?",
  },
};

const notForData = {
  es: {
    idealFor: [
      "Restaurantes con 50 o más referencias de vino en carta",
      "Wine bars y vinotecas con alta rotación",
      "Hoteles con servicio de vino en restaurante, room service y eventos",
      "Grupos de restauración que necesitan gestión centralizada",
      "Establecimientos que quieren aumentar el ticket medio con vino",
    ],
    notFor: [
      "Bares sin carta de vinos estructurada",
      "Establecimientos con menos de 50 referencias de vino",
      "Negocios que no sirven vino (cervecerías, coctelerías puras)",
      "Restaurantes que no buscan optimizar sus ventas de vino",
    ],
    titleIdeal: "Winerim es ideal para",
    titleNot: "Winerim no es para",
  },
  en: {
    idealFor: [
      "Restaurants with 50+ wine references on their list",
      "Wine bars with high rotation",
      "Hotels with wine service across multiple outlets",
      "Restaurant groups needing centralized management",
      "Venues looking to increase average ticket with wine",
    ],
    notFor: [
      "Bars without a structured wine list",
      "Venues with fewer than 50 wine references",
      "Businesses that don't serve wine (brewpubs, cocktail bars)",
      "Restaurants not interested in optimizing wine sales",
    ],
    titleIdeal: "Winerim is ideal for",
    titleNot: "Winerim is not for",
  },
  it: {
    idealFor: [
      "Ristoranti con 50+ referenze di vino in carta",
      "Wine bar con alta rotazione",
      "Hotel con servizio vini in più punti vendita",
      "Gruppi di ristorazione con gestione centralizzata",
      "Locali che vogliono aumentare lo scontrino medio",
    ],
    notFor: [
      "Bar senza carta dei vini strutturata",
      "Locali con meno di 50 referenze",
      "Attività che non servono vino",
      "Ristoranti non interessati a ottimizzare le vendite",
    ],
    titleIdeal: "Winerim è ideale per",
    titleNot: "Winerim non è per",
  },
  fr: {
    idealFor: [
      "Restaurants avec 50+ références de vin",
      "Bars à vin avec rotation élevée",
      "Hôtels avec service de vin multi-points",
      "Groupes de restauration avec gestion centralisée",
      "Établissements cherchant à augmenter le ticket moyen",
    ],
    notFor: [
      "Bars sans carte des vins structurée",
      "Établissements avec moins de 50 références",
      "Commerces ne servant pas de vin",
      "Restaurants non intéressés par l'optimisation",
    ],
    titleIdeal: "Winerim est idéal pour",
    titleNot: "Winerim n'est pas pour",
  },
};

const homeFaqs = {
  es: [
    { q: "¿Qué es Winerim?", a: "Winerim es un software de gestión de cartas de vinos para restaurantes. Combina una carta digital interactiva con recomendaciones de vino basadas en inteligencia artificial, maridajes automáticos, analítica de ventas y optimización de precios. No es un simple QR a un PDF: es una plataforma completa que convierte la carta de vinos en un motor de ventas." },
    { q: "¿Cómo funciona Winerim?", a: "El restaurante envía su carta actual en cualquier formato. Winerim digitaliza todas las referencias, genera descripciones, maridajes y recomendaciones automáticas. El comensal accede a la carta desde un QR en mesa o desde la web del restaurante, y puede filtrar, comparar y recibir sugerencias inteligentes según el plato elegido." },
    { q: "¿Cuánto cuesta Winerim?", a: "Winerim ofrece planes desde restaurantes individuales hasta grupos de restauración. Los precios están disponibles en winerim.wine/precios o puedes solicitar una demo personalizada gratuita." },
    { q: "¿En qué se diferencia de un QR con PDF?", a: "Un QR con PDF es un archivo estático: no se actualiza en tiempo real, no recomienda vinos, no ofrece filtros ni maridajes y no genera datos de venta. Winerim es una plataforma interactiva con inteligencia artificial que personaliza la experiencia del comensal y proporciona analítica al restaurante." },
    { q: "¿Cómo accede el comensal a la carta?", a: "Winerim es multiplataforma. El comensal puede acceder a la carta digital desde un QR en mesa (se abre en el navegador), desde la web del restaurante o desde la app nativa de Winerim disponible en iOS y Android." },
    { q: "¿Winerim sustituye al sommelier?", a: "No. Winerim complementa al equipo de sala. En restaurantes con sommelier, la herramienta enriquece la experiencia con datos y recomendaciones. En restaurantes sin sommelier, actúa como asistente inteligente para que el personal pueda recomendar vino con confianza." },
    { q: "¿Qué resultados obtienen los restaurantes con Winerim?", a: "Los restaurantes que implementan Winerim pueden experimentar mejoras en ventas de vino, ticket medio y rotación de bodega. Los resultados varían según el tipo de establecimiento, la estrategia de implementación y el punto de partida de cada negocio. El potencial estimado de mejora en ticket medio de vino oscila entre un 15 % y un 25 %, según contexto." },
    { q: "¿Funciona en varios idiomas?", a: "Sí. La carta digital de Winerim puede mostrarse en español, inglés, italiano y francés. El sistema detecta el idioma del dispositivo del comensal y adapta la interfaz automáticamente." },
  ],
  en: [
    { q: "What is Winerim?", a: "Winerim is a wine list management software for restaurants. It combines an interactive digital wine list with AI-powered wine recommendations, automatic pairings, sales analytics, and pricing optimization." },
    { q: "How does Winerim work?", a: "The restaurant sends its current wine list in any format. Winerim digitizes all references, generates descriptions, pairings, and automatic recommendations. Guests access the list via QR or the restaurant's website." },
    { q: "How much does Winerim cost?", a: "Winerim offers plans for individual restaurants to restaurant groups. Pricing is available at winerim.wine/en/pricing or request a free personalized demo." },
    { q: "How is it different from a QR with PDF?", a: "A QR with PDF is a static file: no real-time updates, no recommendations, no filters, no analytics. Winerim is an interactive AI-powered platform." },
    { q: "How does the guest access the wine list?", a: "Winerim is multi-platform. Guests can access the digital wine list via a QR code at the table (opens in the browser), from the restaurant's website, or from the native Winerim app on iOS and Android." },
    { q: "Does Winerim replace the sommelier?", a: "No. Winerim complements the front-of-house team. It acts as an intelligent assistant that helps staff recommend wine with confidence." },
    { q: "What results do restaurants get with Winerim?", a: "Restaurants using Winerim can experience improvements in wine sales, average ticket and cellar rotation. Results vary by venue type and implementation strategy. Estimated potential improvement in wine average ticket ranges between 15% and 25%, depending on context." },
    { q: "Does it work in multiple languages?", a: "Yes. Winerim's digital wine list supports Spanish, English, Italian, and French. The system detects the guest's device language automatically." },
  ],
  it: [
    { q: "Cos'è Winerim?", a: "Winerim è un software di gestione della carta dei vini per ristoranti con raccomandazioni IA, abbinamenti automatici e analisi delle vendite." },
    { q: "Come funziona?", a: "Il ristorante invia la propria carta. Winerim digitalizza tutto e genera descrizioni, abbinamenti e raccomandazioni. Il cliente accede via QR." },
    { q: "Quanto costa?", a: "Piani disponibili su winerim.wine/it/prezzi o richiedi una demo gratuita personalizzata." },
    { q: "Funziona in più lingue?", a: "Sì. La carta digitale supporta spagnolo, inglese, italiano e francese." },
  ],
  fr: [
    { q: "Qu'est-ce que Winerim ?", a: "Winerim est un logiciel de gestion de carte des vins pour restaurants avec recommandations IA, accords automatiques et analytique des ventes." },
    { q: "Comment ça marche ?", a: "Le restaurant envoie sa carte actuelle. Winerim la digitalise et génère descriptions, accords et recommandations. Le client accède via QR." },
    { q: "Combien ça coûte ?", a: "Plans disponibles sur winerim.wine/fr/tarifs ou demandez une démo gratuite personnalisée." },
    { q: "Fonctionne en plusieurs langues ?", a: "Oui. La carte numérique supporte l'espagnol, l'anglais, l'italien et le français." },
  ],
};

const faqTitles: Record<string, string> = {
  es: "Preguntas frecuentes sobre Winerim",
  en: "Frequently asked questions about Winerim",
  it: "Domande frequenti su Winerim",
  fr: "Questions fréquentes sur Winerim",
};

/**
 * Section combining Definition, Comparison, NotFor and FAQs for the Home page.
 * Optimized for AI search engine citability.
 */
const DefinitionSection = () => {
  const { lang } = useLanguage();

  const def = definitionData[lang] || definitionData.es;
  const nf = notForData[lang] || notForData.es;
  const faqs = homeFaqs[lang] || homeFaqs.es;
  const faqTitle = faqTitles[lang] || faqTitles.es;

  return (
    <>
      {/* Definition summary box */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <SummaryBox
              label={def.summaryLabel}
              definition={def.definition}
              bullets={def.bullets}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Not For section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <NotForSection
            idealFor={nf.idealFor}
            notFor={nf.notFor}
            titleIdeal={nf.titleIdeal}
            titleNot={nf.titleNot}
          />
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gradient-dark">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-20">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">{faqTitle}</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <details className="group bg-gradient-card rounded-xl border border-border hover:border-wine/20 transition-colors">
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-foreground font-semibold">
                    <span className="pr-4">{faq.q}</span>
                    <span className="text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180">▾</span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DefinitionSection;
