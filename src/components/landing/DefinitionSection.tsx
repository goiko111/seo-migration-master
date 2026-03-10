import ScrollReveal from "@/components/ScrollReveal";
import SummaryBox from "@/components/seo/SummaryBox";
import ComparisonTable from "@/components/seo/ComparisonTable";
import NotForSection from "@/components/seo/NotForSection";
import { useLanguage } from "@/i18n/LanguageContext";

const definitionData = {
  es: {
    definition: "Winerim es un software de gestión de cartas de vinos para restaurantes que utiliza inteligencia artificial para recomendar vinos, generar maridajes automáticos, analizar ventas y optimizar precios. Funciona como una carta digital interactiva accesible por QR desde el móvil del comensal.",
    bullets: [
      "Carta de vinos digital interactiva con acceso por QR",
      "Recomendaciones de vino personalizadas con IA",
      "Maridajes automáticos para cada plato del menú",
      "Analítica de ventas de vino en tiempo real",
      "Optimización de precios y márgenes",
      "Multiplataforma: web, tablet y app nativa",
    ],
    summaryLabel: "¿Qué es Winerim?",
  },
  en: {
    definition: "Winerim is a wine list management software for restaurants that uses artificial intelligence to recommend wines, generate automatic pairings, analyze sales and optimize pricing. It works as an interactive digital wine list accessible via QR from the guest's phone.",
    bullets: [
      "Interactive digital wine list with QR access",
      "AI-powered personalized wine recommendations",
      "Automatic food and wine pairings for every dish",
      "Real-time wine sales analytics",
      "Price and margin optimization",
      "Multi-platform: web, tablet and native app",
    ],
    summaryLabel: "What is Winerim?",
  },
  it: {
    definition: "Winerim è un software di gestione della carta dei vini per ristoranti che utilizza l'intelligenza artificiale per raccomandare vini, generare abbinamenti automatici, analizzare le vendite e ottimizzare i prezzi.",
    bullets: [
      "Carta dei vini digitale interattiva con accesso QR",
      "Raccomandazioni personalizzate con IA",
      "Abbinamenti automatici per ogni piatto del menu",
      "Analisi delle vendite in tempo reale",
      "Ottimizzazione prezzi e margini",
      "Multipiattaforma: web, tablet e app nativa",
    ],
    summaryLabel: "Cos'è Winerim?",
  },
  fr: {
    definition: "Winerim est un logiciel de gestion de carte des vins pour restaurants qui utilise l'intelligence artificielle pour recommander des vins, générer des accords automatiques, analyser les ventes et optimiser les prix.",
    bullets: [
      "Carte des vins numérique interactive avec accès QR",
      "Recommandations personnalisées par IA",
      "Accords mets-vins automatiques pour chaque plat",
      "Analytique des ventes en temps réel",
      "Optimisation des prix et des marges",
      "Aucune application à télécharger",
    ],
    summaryLabel: "Qu'est-ce que Winerim ?",
  },
};

const comparisonData = {
  es: {
    title: "Winerim vs. carta impresa, PDF y QR genérico",
    subtitle: "Comparativa funcional entre los formatos más habituales de carta de vinos en restauración.",
    columns: ["Carta impresa", "PDF / QR básico", "Winerim"],
    rows: [
      { feature: "Actualización en tiempo real", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Recomendaciones de vino personalizadas", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Maridajes automáticos con cada plato", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Filtros por tipo, precio, región o estilo", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Analítica de ventas de vino", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Comparador de vinos", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Sin coste de impresión", options: [false, true, true] as (boolean | "partial")[] },
      { feature: "Accesible desde el móvil", options: [false, "partial" as const, true] },
      { feature: "Experiencia visual e interactiva", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Gestión centralizada multi-local", options: [false, false, true] as (boolean | "partial")[] },
    ],
  },
  en: {
    title: "Winerim vs. printed list, PDF and basic QR",
    subtitle: "Functional comparison between the most common wine list formats in hospitality.",
    columns: ["Printed list", "PDF / Basic QR", "Winerim"],
    rows: [
      { feature: "Real-time updates", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Personalized wine recommendations", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Automatic pairings for each dish", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Filters by type, price, region or style", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Wine sales analytics", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Wine comparator", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "No printing costs", options: [false, true, true] as (boolean | "partial")[] },
      { feature: "Mobile accessible", options: [false, "partial" as const, true] },
      { feature: "Visual & interactive experience", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Centralized multi-venue management", options: [false, false, true] as (boolean | "partial")[] },
    ],
  },
  it: {
    title: "Winerim vs. carta stampata, PDF e QR generico",
    subtitle: "Confronto funzionale tra i formati di carta dei vini più comuni nella ristorazione.",
    columns: ["Carta stampata", "PDF / QR base", "Winerim"],
    rows: [
      { feature: "Aggiornamento in tempo reale", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Raccomandazioni personalizzate", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Abbinamenti automatici", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Filtri per tipo, prezzo, regione", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Analisi vendite", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Comparatore vini", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Nessun costo di stampa", options: [false, true, true] as (boolean | "partial")[] },
      { feature: "Accessibile da mobile", options: [false, "partial" as const, true] },
      { feature: "Esperienza visiva e interattiva", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Gestione centralizzata multi-locale", options: [false, false, true] as (boolean | "partial")[] },
    ],
  },
  fr: {
    title: "Winerim vs. carte imprimée, PDF et QR basique",
    subtitle: "Comparaison fonctionnelle entre les formats de carte des vins les plus courants.",
    columns: ["Carte imprimée", "PDF / QR basique", "Winerim"],
    rows: [
      { feature: "Mise à jour en temps réel", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Recommandations personnalisées", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Accords automatiques", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Filtres par type, prix, région", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Analytique des ventes", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Comparateur de vins", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Pas de frais d'impression", options: [false, true, true] as (boolean | "partial")[] },
      { feature: "Accessible sur mobile", options: [false, "partial" as const, true] },
      { feature: "Expérience visuelle interactive", options: [false, false, true] as (boolean | "partial")[] },
      { feature: "Gestion centralisée multi-sites", options: [false, false, true] as (boolean | "partial")[] },
    ],
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

const competitorData = {
  es: {
    title: "Winerim vs. otras plataformas de carta digital de vinos",
    subtitle: "Comparativa funcional con las soluciones de gestión de carta de vinos más habituales del mercado.",
    columns: ["Cartas digitales genéricas", "Plataformas de vino B2C", "Software sommelier básico", "Winerim"],
    rows: [
      { feature: "Recomendaciones IA personalizadas al comensal", options: [false, false, "partial" as const, true] },
      { feature: "Maridajes automáticos con cada plato", options: [false, false, false, true] },
      { feature: "Analítica de ventas y rotación en tiempo real", options: [false, false, "partial" as const, true] },
      { feature: "Optimización de precios y márgenes", options: [false, false, false, true] },
      { feature: "Comparador de vinos para el comensal", options: [false, "partial" as const, false, true] },
      { feature: "Gestión centralizada multi-local", options: ["partial" as const, false, false, true] },
      { feature: "Alertas de stock y obsolescencia", options: [false, false, false, true] },
      { feature: "Experiencia visual e interactiva en móvil", options: ["partial" as const, true, false, true] },
      { feature: "Especializado 100% en hostelería", options: [false, false, "partial" as const, true] },
      { feature: "Multiplataforma: web, tablet y app", options: [false, false, "partial" as const, true] },
    ],
  },
  en: {
    title: "Winerim vs. other digital wine list platforms",
    subtitle: "Functional comparison with the most common wine list management solutions on the market.",
    columns: ["Generic digital menus", "B2C wine platforms", "Basic sommelier software", "Winerim"],
    rows: [
      { feature: "AI-powered guest recommendations", options: [false, false, "partial" as const, true] },
      { feature: "Automatic food-wine pairings", options: [false, false, false, true] },
      { feature: "Real-time sales & rotation analytics", options: [false, false, "partial" as const, true] },
      { feature: "Price & margin optimization", options: [false, false, false, true] },
      { feature: "Wine comparator for guests", options: [false, "partial" as const, false, true] },
      { feature: "Centralized multi-venue management", options: ["partial" as const, false, false, true] },
      { feature: "Stock & obsolescence alerts", options: [false, false, false, true] },
      { feature: "Visual & interactive mobile experience", options: ["partial" as const, true, false, true] },
      { feature: "100% hospitality-focused", options: [false, false, "partial" as const, true] },
      { feature: "Multi-platform: web, tablet & app", options: [false, false, "partial" as const, true] },
    ],
  },
  it: {
    title: "Winerim vs. altre piattaforme di carta dei vini digitale",
    subtitle: "Confronto funzionale con le soluzioni di gestione più comuni sul mercato.",
    columns: ["Menu digitali generici", "Piattaforme vino B2C", "Software sommelier base", "Winerim"],
    rows: [
      { feature: "Raccomandazioni IA personalizzate", options: [false, false, "partial" as const, true] },
      { feature: "Abbinamenti automatici per ogni piatto", options: [false, false, false, true] },
      { feature: "Analisi vendite e rotazione in tempo reale", options: [false, false, "partial" as const, true] },
      { feature: "Ottimizzazione prezzi e margini", options: [false, false, false, true] },
      { feature: "Comparatore vini per ospiti", options: [false, "partial" as const, false, true] },
      { feature: "Gestione centralizzata multi-locale", options: ["partial" as const, false, false, true] },
      { feature: "Alert stock e obsolescenza", options: [false, false, false, true] },
      { feature: "Esperienza mobile visiva e interattiva", options: ["partial" as const, true, false, true] },
      { feature: "100% focalizzato sulla ristorazione", options: [false, false, "partial" as const, true] },
      { feature: "Multipiattaforma: web, tablet e app", options: [false, false, "partial" as const, true] },
    ],
  },
  fr: {
    title: "Winerim vs. autres plateformes de carte des vins digitale",
    subtitle: "Comparaison fonctionnelle avec les solutions de gestion les plus courantes du marché.",
    columns: ["Menus digitaux génériques", "Plateformes vin B2C", "Logiciel sommelier basique", "Winerim"],
    rows: [
      { feature: "Recommandations IA personnalisées", options: [false, false, "partial" as const, true] },
      { feature: "Accords mets-vins automatiques", options: [false, false, false, true] },
      { feature: "Analytique ventes & rotation en temps réel", options: [false, false, "partial" as const, true] },
      { feature: "Optimisation prix et marges", options: [false, false, false, true] },
      { feature: "Comparateur de vins pour convives", options: [false, "partial" as const, false, true] },
      { feature: "Gestion centralisée multi-sites", options: ["partial" as const, false, false, true] },
      { feature: "Alertes stock et obsolescence", options: [false, false, false, true] },
      { feature: "Expérience mobile visuelle interactive", options: ["partial" as const, true, false, true] },
      { feature: "100% dédié à la restauration", options: [false, false, "partial" as const, true] },
      { feature: "Multiplateforme : web, tablette et app", options: [false, false, "partial" as const, true] },
    ],
  },
};

const homeFaqs = {
  es: [
    { q: "¿Qué es Winerim?", a: "Winerim es un software de gestión de cartas de vinos para restaurantes. Combina una carta digital interactiva con recomendaciones de vino basadas en inteligencia artificial, maridajes automáticos, analítica de ventas y optimización de precios. No es un simple QR a un PDF: es una plataforma completa que convierte la carta de vinos en un motor de ventas." },
    { q: "¿Cómo funciona Winerim?", a: "El restaurante envía su carta actual en cualquier formato. Winerim digitaliza todas las referencias, genera descripciones, maridajes y recomendaciones automáticas. El comensal accede a la carta desde un QR en mesa o desde la web del restaurante, y puede filtrar, comparar y recibir sugerencias inteligentes según el plato elegido." },
    { q: "¿Cuánto cuesta Winerim?", a: "Winerim ofrece planes desde restaurantes individuales hasta grupos de restauración. Los precios están disponibles en winerim.wine/precios o puedes solicitar una demo personalizada gratuita." },
    { q: "¿En qué se diferencia de un QR con PDF?", a: "Un QR con PDF es un archivo estático: no se actualiza en tiempo real, no recomienda vinos, no ofrece filtros ni maridajes y no genera datos de venta. Winerim es una plataforma interactiva con inteligencia artificial que personaliza la experiencia del comensal y proporciona analítica al restaurante." },
    { q: "¿Necesito instalar una app?", a: "No. Ni el restaurante ni el comensal necesitan instalar ninguna aplicación. Winerim funciona directamente en el navegador web. El comensal escanea un QR y accede a la carta digital sin descargas." },
    { q: "¿Winerim sustituye al sommelier?", a: "No. Winerim complementa al equipo de sala. En restaurantes con sommelier, la herramienta enriquece la experiencia con datos y recomendaciones. En restaurantes sin sommelier, actúa como asistente inteligente para que el personal pueda recomendar vino con confianza." },
    { q: "¿Qué resultados obtienen los restaurantes con Winerim?", a: "Los restaurantes que utilizan Winerim reportan un incremento medio del 30% en ventas de vino, un 20% de aumento en ticket medio y un 35% de mejora en la rotación de referencias. Estos resultados varían según el tipo de establecimiento y la estrategia de implementación." },
    { q: "¿Funciona en varios idiomas?", a: "Sí. La carta digital de Winerim puede mostrarse en español, inglés, italiano y francés. El sistema detecta el idioma del dispositivo del comensal y adapta la interfaz automáticamente." },
  ],
  en: [
    { q: "What is Winerim?", a: "Winerim is a wine list management software for restaurants. It combines an interactive digital wine list with AI-powered wine recommendations, automatic pairings, sales analytics, and pricing optimization." },
    { q: "How does Winerim work?", a: "The restaurant sends its current wine list in any format. Winerim digitizes all references, generates descriptions, pairings, and automatic recommendations. Guests access the list via QR or the restaurant's website." },
    { q: "How much does Winerim cost?", a: "Winerim offers plans for individual restaurants to restaurant groups. Pricing is available at winerim.wine/en/pricing or request a free personalized demo." },
    { q: "How is it different from a QR with PDF?", a: "A QR with PDF is a static file: no real-time updates, no recommendations, no filters, no analytics. Winerim is an interactive AI-powered platform." },
    { q: "Do I need to install an app?", a: "No. Neither the restaurant nor the guest needs to install any app. Winerim works directly in the web browser." },
    { q: "Does Winerim replace the sommelier?", a: "No. Winerim complements the front-of-house team. It acts as an intelligent assistant that helps staff recommend wine with confidence." },
    { q: "What results do restaurants get with Winerim?", a: "Restaurants using Winerim report an average 30% increase in wine sales, 20% increase in average ticket, and 35% improvement in wine rotation." },
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
  const comp = comparisonData[lang] || comparisonData.es;
  const nf = notForData[lang] || notForData.es;
  const faqs = homeFaqs[lang] || homeFaqs.es;
  const faqTitle = faqTitles[lang] || faqTitles.es;
  const compet = competitorData[lang] || competitorData.es;

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

      {/* Comparison table: Winerim vs formats */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ComparisonTable
            title={comp.title}
            subtitle={comp.subtitle}
            columns={comp.columns}
            rows={comp.rows}
            highlightColumn={2}
          />
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

      {/* Competitor comparison table */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ComparisonTable
            title={compet.title}
            subtitle={compet.subtitle}
            columns={compet.columns}
            rows={compet.rows}
            highlightColumn={3}
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
