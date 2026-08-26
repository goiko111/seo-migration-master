import type { SupportedLang } from "@/i18n/types";

export type SimulatorCopy = {
  lang?: SupportedLang | string;
  seoTitle: string;
  seoDescription: string;
  path: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  features: { title: string; desc: string }[];
  hasListQ: string;
  hasListLink: string;
  noListQ: string;
  simulatingTitle: string;
  simulatingSubtitle: string;
  almostTitle: string;
  almostBody: string;
  // progress
  preview: string;
  score: string;
  refs: string;
  profile: string;
  firstPurchase: string;
  stepWord: string;
  // teaser
  previewNote: string;
  keyMetrics: string;
  recommendedRefs: string;
  estimatedTotal: string;
  firstPurchaseInvestment: string;
  alerts: string;
  distributionByType: string;
  type: string;
  approxRefs: string;
  lockedSections: string[];
  // unlock
  unlockTitle: string;
  unlockContactCopy: string;
  unlockBullets: string[];
  unlockDone: string;
  // form
  stepOf: (n: number) => string;
  back: string;
  next: string;
  submit: string;
};

const es: SimulatorCopy = {
  seoTitle: "Simulador de Carta de Vinos · Winerim",
  seoDescription:
    "Diseña la carta de vinos perfecta para tu restaurante en 3 minutos. Gratis. Basado en datos de restaurantes reales.",
  path: "/simulador-carta",
  heroTitle: "Diseña la carta de vinos perfecta para tu restaurante",
  heroSubtitle: "Basado en datos de +1.000 restaurantes. Gratis. En 3 minutos.",
  heroCta: "Empezar simulación",
  features: [
    { title: "Estructura ideal", desc: "Nº de referencias óptimo para tu concepto" },
    { title: "Distribución por tipo", desc: "Tinto, blanco, rosado, espumoso, copa" },
    { title: "Presupuesto estimado", desc: "Inversión primera compra calculada" },
    { title: "Geografía del vino", desc: "Nacional vs internacional, regiones top" },
    { title: "Métricas financieras", desc: "Bev cost, margen, facturación mensual" },
    { title: "Recomendaciones IA", desc: "Análisis personalizado por IA" },
  ],
  hasListQ: "¿Ya tienes carta?",
  hasListLink: "Analízala aquí →",
  noListQ: "¿Aún no tienes carta? Simúlala aquí ↓",
  simulatingTitle: "Simulando tu carta...",
  simulatingSubtitle: "Esto tarda entre 15 y 30 segundos.",
  almostTitle: "Casi listo",
  almostBody:
    "Tu simulación se está terminando de procesar. Déjanos tus datos y te enviaremos el informe por email en menos de 48 horas.",
  preview: "Vista preliminar",
  score: "Score",
  refs: "Referencias",
  profile: "Perfil",
  firstPurchase: "Primera compra",
  stepWord: "Paso",
  previewNote: "Vista preliminar — el informe se sigue procesando en segundo plano.",
  keyMetrics: "Métricas clave",
  recommendedRefs: "Referencias recomendadas",
  estimatedTotal: "Total estimado",
  firstPurchaseInvestment: "Inversión primera compra",
  alerts: "Alertas",
  distributionByType: "Distribución por tipo",
  type: "Tipo",
  approxRefs: "Refs aprox.",
  lockedSections: ["Mapa de precios", "Geografía del vino", "Análisis financiero", "Recomendaciones IA"],
  unlockTitle: "Desbloquea el informe completo",
  unlockContactCopy: "Te enviaremos el informe por email en menos de 48 horas.",
  unlockBullets: [
    "📊 Mapa de precios detallado",
    "🗺️ Geografía del vino",
    "💰 Análisis financiero",
    "🤖 Recomendaciones IA personalizadas",
  ],
  unlockDone: "✅ ¡Desbloqueado! Cargando informe...",
  stepOf: (n) => `Paso ${n} de 5`,
  back: "Atrás",
  next: "Siguiente",
  submit: "Simular carta",
};

const en: SimulatorCopy = {
  seoTitle: "Wine List Simulator · Winerim",
  seoDescription:
    "Design the perfect wine list for your restaurant in 3 minutes. Free. Based on data from real restaurants.",
  path: "/en/wine-list-simulator",
  heroTitle: "Design the perfect wine list for your restaurant",
  heroSubtitle: "Based on data from 1,000+ restaurants. Free. In 3 minutes.",
  heroCta: "Start simulation",
  features: [
    { title: "Ideal structure", desc: "Optimal number of references for your concept" },
    { title: "Distribution by type", desc: "Red, white, rosé, sparkling, by the glass" },
    { title: "Estimated budget", desc: "Calculated first-purchase investment" },
    { title: "Wine geography", desc: "Domestic vs international, top regions" },
    { title: "Financial metrics", desc: "Bev cost, margin, monthly revenue" },
    { title: "AI recommendations", desc: "Personalised AI analysis" },
  ],
  hasListQ: "Already have a wine list?",
  hasListLink: "Analyse it here →",
  noListQ: "No wine list yet? Simulate it here ↓",
  simulatingTitle: "Simulating your wine list...",
  simulatingSubtitle: "This takes between 15 and 30 seconds.",
  almostTitle: "Almost there",
  almostBody:
    "Your simulation is still being processed. Leave your details and we will email you the report within 48 hours.",
  preview: "Preview",
  score: "Score",
  refs: "References",
  profile: "Profile",
  firstPurchase: "First purchase",
  stepWord: "Step",
  previewNote: "Preview — the full report is still being processed in the background.",
  keyMetrics: "Key metrics",
  recommendedRefs: "Recommended references",
  estimatedTotal: "Estimated total",
  firstPurchaseInvestment: "First-purchase investment",
  alerts: "Alerts",
  distributionByType: "Distribution by type",
  type: "Type",
  approxRefs: "Approx. refs",
  lockedSections: ["Price map", "Wine geography", "Financial analysis", "AI recommendations"],
  unlockTitle: "Unlock the full report",
  unlockContactCopy: "We will email you the report within 48 hours.",
  unlockBullets: [
    "📊 Detailed price map",
    "🗺️ Wine geography",
    "💰 Financial analysis",
    "🤖 Personalised AI recommendations",
  ],
  unlockDone: "✅ Unlocked! Loading report...",
  stepOf: (n) => `Step ${n} of 5`,
  back: "Back",
  next: "Next",
  submit: "Simulate list",
};

const it: SimulatorCopy = {
  seoTitle: "Simulatore Carta dei Vini · Winerim",
  seoDescription:
    "Progetta la carta dei vini perfetta per il tuo ristorante in 3 minuti. Gratis. Basato su dati di ristoranti reali.",
  path: "/it/simulatore-carta",
  heroTitle: "Progetta la carta dei vini perfetta per il tuo ristorante",
  heroSubtitle: "Basato sui dati di oltre 1.000 ristoranti. Gratis. In 3 minuti.",
  heroCta: "Avvia la simulazione",
  features: [
    { title: "Struttura ideale", desc: "Numero ottimale di referenze per il tuo concept" },
    { title: "Distribuzione per tipo", desc: "Rosso, bianco, rosato, spumante, al calice" },
    { title: "Budget stimato", desc: "Investimento del primo acquisto calcolato" },
    { title: "Geografia del vino", desc: "Nazionale vs internazionale, regioni top" },
    { title: "Metriche finanziarie", desc: "Bev cost, margine, fatturato mensile" },
    { title: "Raccomandazioni IA", desc: "Analisi personalizzata con IA" },
  ],
  hasListQ: "Hai già una carta dei vini?",
  hasListLink: "Analizzala qui →",
  noListQ: "Non hai ancora una carta? Simulala qui ↓",
  simulatingTitle: "Sto simulando la tua carta...",
  simulatingSubtitle: "Richiede tra 15 e 30 secondi.",
  almostTitle: "Ci siamo quasi",
  almostBody:
    "La tua simulazione è in fase di elaborazione. Lasciaci i tuoi dati e ti invieremo il report via email entro 48 ore.",
  preview: "Anteprima",
  score: "Score",
  refs: "Referenze",
  profile: "Profilo",
  firstPurchase: "Primo acquisto",
  stepWord: "Passo",
  previewNote: "Anteprima — il report è ancora in elaborazione in background.",
  keyMetrics: "Metriche chiave",
  recommendedRefs: "Referenze consigliate",
  estimatedTotal: "Totale stimato",
  firstPurchaseInvestment: "Investimento primo acquisto",
  alerts: "Avvisi",
  distributionByType: "Distribuzione per tipo",
  type: "Tipo",
  approxRefs: "Refs approx.",
  lockedSections: ["Mappa dei prezzi", "Geografia del vino", "Analisi finanziaria", "Raccomandazioni IA"],
  unlockTitle: "Sblocca il report completo",
  unlockContactCopy: "Ti invieremo il report via email entro 48 ore.",
  unlockBullets: [
    "📊 Mappa dei prezzi dettagliata",
    "🗺️ Geografia del vino",
    "💰 Analisi finanziaria",
    "🤖 Raccomandazioni IA personalizzate",
  ],
  unlockDone: "✅ Sbloccato! Caricamento report...",
  stepOf: (n) => `Passo ${n} di 5`,
  back: "Indietro",
  next: "Avanti",
  submit: "Simula la carta",
};

const fr: SimulatorCopy = {
  seoTitle: "Simulateur de Carte des Vins · Winerim",
  seoDescription:
    "Concevez la carte des vins idéale pour votre restaurant en 3 minutes. Gratuit. Basé sur des données de restaurants réels.",
  path: "/fr/simulateur-carte",
  heroTitle: "Concevez la carte des vins idéale pour votre restaurant",
  heroSubtitle: "Basé sur les données de plus de 1 000 restaurants. Gratuit. En 3 minutes.",
  heroCta: "Démarrer la simulation",
  features: [
    { title: "Structure idéale", desc: "Nombre de références optimal pour votre concept" },
    { title: "Répartition par type", desc: "Rouge, blanc, rosé, effervescent, au verre" },
    { title: "Budget estimé", desc: "Investissement du premier achat calculé" },
    { title: "Géographie du vin", desc: "National vs international, régions clés" },
    { title: "Indicateurs financiers", desc: "Bev cost, marge, chiffre d'affaires mensuel" },
    { title: "Recommandations IA", desc: "Analyse personnalisée par IA" },
  ],
  hasListQ: "Vous avez déjà une carte ?",
  hasListLink: "Analysez-la ici →",
  noListQ: "Pas encore de carte ? Simulez-la ici ↓",
  simulatingTitle: "Simulation de votre carte...",
  simulatingSubtitle: "Cela prend entre 15 et 30 secondes.",
  almostTitle: "Presque terminé",
  almostBody:
    "Votre simulation est en cours de traitement. Laissez-nous vos coordonnées et nous vous enverrons le rapport par e-mail sous 48 heures.",
  preview: "Aperçu",
  score: "Score",
  refs: "Références",
  profile: "Profil",
  firstPurchase: "Premier achat",
  stepWord: "Étape",
  previewNote: "Aperçu — le rapport complet est encore en cours de traitement.",
  keyMetrics: "Indicateurs clés",
  recommendedRefs: "Références recommandées",
  estimatedTotal: "Total estimé",
  firstPurchaseInvestment: "Investissement premier achat",
  alerts: "Alertes",
  distributionByType: "Répartition par type",
  type: "Type",
  approxRefs: "Réfs approx.",
  lockedSections: ["Carte des prix", "Géographie du vin", "Analyse financière", "Recommandations IA"],
  unlockTitle: "Débloquez le rapport complet",
  unlockContactCopy: "Nous vous enverrons le rapport par e-mail sous 48 heures.",
  unlockBullets: [
    "📊 Carte des prix détaillée",
    "🗺️ Géographie du vin",
    "💰 Analyse financière",
    "🤖 Recommandations IA personnalisées",
  ],
  unlockDone: "✅ Débloqué ! Chargement du rapport...",
  stepOf: (n) => `Étape ${n} sur 5`,
  back: "Retour",
  next: "Suivant",
  submit: "Simuler la carte",
};

const de: SimulatorCopy = {
  seoTitle: "Weinkarten-Simulator · Winerim",
  seoDescription:
    "Gestalten Sie in 3 Minuten die perfekte Weinkarte für Ihr Restaurant. Kostenlos. Basierend auf Daten echter Restaurants.",
  path: "/de/weinkarten-simulator",
  heroTitle: "Gestalten Sie die perfekte Weinkarte für Ihr Restaurant",
  heroSubtitle: "Basierend auf Daten von über 1.000 Restaurants. Kostenlos. In 3 Minuten.",
  heroCta: "Simulation starten",
  features: [
    { title: "Ideale Struktur", desc: "Optimale Anzahl an Positionen für Ihr Konzept" },
    { title: "Verteilung nach Typ", desc: "Rot, Weiß, Rosé, Schaumwein, offener Ausschank" },
    { title: "Geschätztes Budget", desc: "Berechnete Investition für den Erstkauf" },
    { title: "Weingeografie", desc: "National vs. international, Top-Regionen" },
    { title: "Finanzkennzahlen", desc: "Bev Cost, Marge, Monatsumsatz" },
    { title: "KI-Empfehlungen", desc: "Personalisierte KI-Analyse" },
  ],
  hasListQ: "Sie haben bereits eine Weinkarte?",
  hasListLink: "Hier analysieren →",
  noListQ: "Noch keine Weinkarte? Hier simulieren ↓",
  simulatingTitle: "Ihre Weinkarte wird simuliert...",
  simulatingSubtitle: "Das dauert 15 bis 30 Sekunden.",
  almostTitle: "Fast fertig",
  almostBody:
    "Ihre Simulation wird noch verarbeitet. Hinterlassen Sie Ihre Daten und wir senden Ihnen den Bericht innerhalb von 48 Stunden per E-Mail.",
  preview: "Vorschau",
  score: "Score",
  refs: "Positionen",
  profile: "Profil",
  firstPurchase: "Erstkauf",
  stepWord: "Schritt",
  previewNote: "Vorschau — der vollständige Bericht wird noch im Hintergrund verarbeitet.",
  keyMetrics: "Kennzahlen",
  recommendedRefs: "Empfohlene Positionen",
  estimatedTotal: "Geschätzte Gesamtzahl",
  firstPurchaseInvestment: "Investition Erstkauf",
  alerts: "Hinweise",
  distributionByType: "Verteilung nach Typ",
  type: "Typ",
  approxRefs: "Positionen ca.",
  lockedSections: ["Preiskarte", "Weingeografie", "Finanzanalyse", "KI-Empfehlungen"],
  unlockTitle: "Vollständigen Bericht freischalten",
  unlockContactCopy: "Wir senden Ihnen den Bericht innerhalb von 48 Stunden per E-Mail.",
  unlockBullets: [
    "📊 Detaillierte Preiskarte",
    "🗺️ Weingeografie",
    "💰 Finanzanalyse",
    "🤖 Personalisierte KI-Empfehlungen",
  ],
  unlockDone: "✅ Freigeschaltet! Bericht wird geladen...",
  stepOf: (n) => `Schritt ${n} von 5`,
  back: "Zurück",
  next: "Weiter",
  submit: "Weinkarte simulieren",
};

const pt: SimulatorCopy = {
  seoTitle: "Simulador de Carta de Vinhos · Winerim",
  seoDescription:
    "Desenhe a carta de vinhos perfeita para o seu restaurante em 3 minutos. Grátis. Baseado em dados de restaurantes reais.",
  path: "/pt/simulador-carta",
  heroTitle: "Desenhe a carta de vinhos perfeita para o seu restaurante",
  heroSubtitle: "Baseado em dados de mais de 1.000 restaurantes. Grátis. Em 3 minutos.",
  heroCta: "Iniciar simulação",
  features: [
    { title: "Estrutura ideal", desc: "Número ótimo de referências para o seu conceito" },
    { title: "Distribuição por tipo", desc: "Tinto, branco, rosé, espumante, a copo" },
    { title: "Orçamento estimado", desc: "Investimento da primeira compra calculado" },
    { title: "Geografia do vinho", desc: "Nacional vs internacional, regiões top" },
    { title: "Métricas financeiras", desc: "Bev cost, margem, faturação mensal" },
    { title: "Recomendações IA", desc: "Análise personalizada por IA" },
  ],
  hasListQ: "Já tem carta de vinhos?",
  hasListLink: "Analise-a aqui →",
  noListQ: "Ainda não tem carta? Simule-a aqui ↓",
  simulatingTitle: "A simular a sua carta...",
  simulatingSubtitle: "Demora entre 15 e 30 segundos.",
  almostTitle: "Quase pronto",
  almostBody:
    "A sua simulação está a ser processada. Deixe-nos os seus dados e enviaremos o relatório por email em menos de 48 horas.",
  preview: "Pré-visualização",
  score: "Score",
  refs: "Referências",
  profile: "Perfil",
  firstPurchase: "Primeira compra",
  stepWord: "Passo",
  previewNote: "Pré-visualização — o relatório continua a ser processado em segundo plano.",
  keyMetrics: "Métricas-chave",
  recommendedRefs: "Referências recomendadas",
  estimatedTotal: "Total estimado",
  firstPurchaseInvestment: "Investimento primeira compra",
  alerts: "Alertas",
  distributionByType: "Distribuição por tipo",
  type: "Tipo",
  approxRefs: "Refs aprox.",
  lockedSections: ["Mapa de preços", "Geografia do vinho", "Análise financeira", "Recomendações IA"],
  unlockTitle: "Desbloqueie o relatório completo",
  unlockContactCopy: "Enviaremos o relatório por email em menos de 48 horas.",
  unlockBullets: [
    "📊 Mapa de preços detalhado",
    "🗺️ Geografia do vinho",
    "💰 Análise financeira",
    "🤖 Recomendações IA personalizadas",
  ],
  unlockDone: "✅ Desbloqueado! A carregar relatório...",
  stepOf: (n) => `Passo ${n} de 5`,
  back: "Voltar",
  next: "Seguinte",
  submit: "Simular carta",
};

const DICT: Record<string, SimulatorCopy> = { es, en, it, fr, de, pt };

export function simulatorText(lang: SupportedLang | string): SimulatorCopy {
  const base = DICT[lang] ?? es;
  return { ...base, lang: DICT[lang] ? lang : "es" };
}
