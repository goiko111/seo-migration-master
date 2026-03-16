import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, GlassWater, DollarSign, TrendingUp,
  Sparkles, Calculator, CheckCircle, BarChart3, Info,
  Clock, ShieldAlert,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/i18n/LanguageContext";

/* ─── i18n ─── */
interface WinePreset { id: string; label: string; glasses: number; shelfLife: string; preservation: number; mult: number; icon: string }
interface LangContent {
  seoTitle: string; seoDesc: string;
  breadTools: string; breadCalc: string; demoBadge: string;
  h1a: string; h1b: string; subtitle: string;
  demoTitle: string; demoDesc: string;
  wineTypes: WinePreset[];
  decides: string[]; avoids: string[]; impact: string[];
  inputTitle: string; wineTypeLabel: string;
  costLabel: string; costNote: string;
  glassesLabel: string; glassesMin: string; glassesMax: string;
  multLabel: string;
  recPrice: string; realCost: string; inclPreservation: string;
  marginPerGlass: string; breakEven: string; glassUnit: string; glassesUnit: string; toRecoverCost: string;
  shelfLife: string; onceOpened: string;
  preservationCost: string; noSystem: string; coravinLabel: string;
  totalProfit: string; totalProfitIf: (n: number) => string;
  revenue: string; cost: string; preservationLabel: string;
  insightExcellent: (breakEven: number, remaining: number) => string;
  insightWarning: string;
  insightNormal: (glasses: number, price: string, breakEven: number) => string;
  tipsTitle: string; tips: string[];
  faqs: { q: string; a: string }[];
  ctaBadge: string; ctaTitle: string; ctaTitleHighlight: string; ctaDesc: string;
  ctaPrimary: string; ctaSecondary: string;
  internalLinks: { to: string; label: string; type: string }[];
  notApplicable: string;
}

const i18n: Record<string, LangContent> = {
  es: {
    seoTitle: "Calculadora de Precio de Vino por Copa | Demo Winerim Core",
    seoDesc: "Calcula el precio óptimo del vino por copa en tu restaurante. Demo del motor de pricing de Winerim Core con lógica de conservación, merma y tipo de vino.",
    breadTools: "Herramientas", breadCalc: "Calculadora precio por copa", demoBadge: "Demo · Winerim Core",
    h1a: "Calculadora de precio de vino", h1b: "por copa",
    subtitle: "Calcula el precio óptimo, el margen por copa y el punto de equilibrio para tu programa de vino por copa.",
    demoTitle: "Decidir bien el copeo no es solo dividir una botella entre cinco",
    demoDesc: "Winerim tiene en cuenta rentabilidad, tipo de vino, conservación, merma y lógica comercial para ayudarte a decidir cuándo conviene sacar un vino por copa y a qué precio.",
    wineTypes: [
      { id: "still-white", label: "Blanco", glasses: 5, shelfLife: "48–72 h", preservation: 0, mult: 3.5, icon: "🥂" },
      { id: "still-red", label: "Tinto", glasses: 5, shelfLife: "48–72 h", preservation: 0, mult: 3.2, icon: "🍷" },
      { id: "sparkling", label: "Espumoso", glasses: 6, shelfLife: "12–24 h", preservation: 0.30, mult: 3.8, icon: "🍾" },
      { id: "fortified", label: "Generoso / Dulce", glasses: 8, shelfLife: "2–4 semanas", preservation: 0, mult: 3.0, icon: "🫗" },
      { id: "premium", label: "Premium (Coravin)", glasses: 5, shelfLife: "4–8 semanas", preservation: 0.80, mult: 2.5, icon: "🏆" },
    ],
    decides: [
      "Qué vinos merecen entrar en el programa de copeo y a qué precio",
      "Cuántas copas necesitas vender para cubrir la botella según tipo de vino",
      "Si un vino premium por copa es rentable con sistema de preservación",
    ],
    avoids: [
      "Vender copas por debajo del punto de equilibrio real (incluyendo merma)",
      "Ofrecer espumosos por copa sin considerar su vida útil limitada",
      "Ignorar el sobrecoste de preservación en vinos premium",
    ],
    impact: [
      "Margen por copa controlado y predecible según tipología",
      "Reducción de pérdidas por botellas abiertas no terminadas",
      "Programa de copeo más rentable y con mejor experiencia para el comensal",
    ],
    inputTitle: "Datos de la botella", wineTypeLabel: "Tipo de vino",
    costLabel: "Precio de compra", costNote: "Coste de adquisición (sin IVA)",
    glassesLabel: "Copas por botella", glassesMin: "3 (generosas)", glassesMax: "10 (catación)",
    multLabel: "Multiplicador",
    recPrice: "Precio por copa recomendado", realCost: "Coste real por copa", inclPreservation: "incl. {n} € preservación",
    marginPerGlass: "Margen por copa", breakEven: "Punto de equilibrio", glassUnit: "copa", glassesUnit: "copas", toRecoverCost: "para recuperar coste",
    shelfLife: "Vida útil estimada", onceOpened: "una vez abierta",
    preservationCost: "Sobrecoste preservación", noSystem: "Sin sistema especial", coravinLabel: "Coravin / gas inerte",
    totalProfit: "Beneficio total", totalProfitIf: (n) => `Beneficio total si se venden las ${n} copas`,
    revenue: "Ingreso", cost: "Coste", preservationLabel: "Preservación",
    notApplicable: "No aplica",
    insightExcellent: (be, rem) => `Excelente ratio: cubres la botella con solo ${be} copa${be > 1 ? "s" : ""}. Las restantes ${rem} son beneficio neto.`,
    insightWarning: "Atención: necesitas vender todas las copas para cubrir el coste. Revisa el multiplicador o considera otro formato.",
    insightNormal: (glasses, price, be) => `Con ${glasses} copas a ${price} € cada una, las primeras ${be} cubren el coste. El resto es beneficio neto.`,
    tipsTitle: "Consejos para fijar el precio por copa",
    tips: [
      "La regla clásica: el precio de la copa debería permitirte recuperar el coste de la botella con 2 copas vendidas.",
      "Las copas de espumoso suelen tener 6-7 por botella. Las de tinto, 4-5. Ajusta el cálculo según el tipo.",
      "Un multiplicador ×3–×4 es estándar. Los wine bars pueden llegar a ×4–×5 en copas premium.",
      "El precio de la copa no debe superar el 35-40% del precio de la misma botella en carta.",
      "Si una botella no se termina en 48-72 h, el coste de merma debe incluirse en el cálculo.",
    ],
    faqs: [
      { q: "¿Cuántas copas salen de una botella de vino?", a: "Una botella estándar de 750ml da entre 4 y 6 copas según el tamaño del servicio. Lo habitual en restaurantes son 5 copas de 150ml." },
      { q: "¿Qué multiplicador debo usar?", a: "Depende del tipo de establecimiento. Restaurantes casuales: ×3–×3.5. Restaurantes de gama media-alta: ×3.5–×4. Wine bars: ×4–×5." },
      { q: "¿Cómo gestiono la merma?", a: "Con sistemas de conservación (Coravin, gas inerte) puedes mantener el vino 5-7 días. Sin sistema, calcula 48-72 h." },
    ],
    ctaBadge: "Winerim Core", ctaTitle: "Esta calculadora es solo el", ctaTitleHighlight: "principio",
    ctaDesc: "Winerim Core gestiona el copeo completo: rentabilidad por copa, control de merma, alertas de botellas abiertas y rotación óptima — con datos reales de tu operativa, no con fórmulas genéricas.",
    ctaPrimary: "Ver cómo lo resuelve Winerim Core", ctaSecondary: "Analizar mi carta gratis",
    internalLinks: [
      { to: "/vino-por-copa-restaurante", label: "Vino por copa en restaurantes", type: "guide" },
      { to: "/calculadora-margen-vino", label: "Calculadora de márgenes", type: "tool" },
      { to: "/recursos/guia-vino-por-copa-para-restaurantes", label: "Guía vino por copa", type: "resource" },
      { to: "/producto/winerim-core", label: "Winerim Core: analítica completa", type: "solution" },
      { to: "/demo", label: "Solicitar demo de Winerim", type: "solution" },
    ],
  },
  en: {
    seoTitle: "Wine By-the-Glass Price Calculator | Winerim Core Demo",
    seoDesc: "Calculate the optimal by-the-glass wine price for your restaurant. Demo of Winerim Core's pricing engine with preservation, waste and wine type logic.",
    breadTools: "Tools", breadCalc: "By-the-glass calculator", demoBadge: "Demo · Winerim Core",
    h1a: "Wine by-the-glass price", h1b: "calculator",
    subtitle: "Calculate the optimal price, margin per glass and break-even point for your by-the-glass wine programme.",
    demoTitle: "Getting by-the-glass right is more than dividing a bottle by five",
    demoDesc: "Winerim considers profitability, wine type, preservation, waste and commercial logic to help you decide when to offer a wine by the glass and at what price.",
    wineTypes: [
      { id: "still-white", label: "White", glasses: 5, shelfLife: "48–72 h", preservation: 0, mult: 3.5, icon: "🥂" },
      { id: "still-red", label: "Red", glasses: 5, shelfLife: "48–72 h", preservation: 0, mult: 3.2, icon: "🍷" },
      { id: "sparkling", label: "Sparkling", glasses: 6, shelfLife: "12–24 h", preservation: 0.30, mult: 3.8, icon: "🍾" },
      { id: "fortified", label: "Fortified / Sweet", glasses: 8, shelfLife: "2–4 weeks", preservation: 0, mult: 3.0, icon: "🫗" },
      { id: "premium", label: "Premium (Coravin)", glasses: 5, shelfLife: "4–8 weeks", preservation: 0.80, mult: 2.5, icon: "🏆" },
    ],
    decides: [
      "Which wines deserve to be on the by-the-glass programme and at what price",
      "How many glasses you need to sell to cover the bottle by wine type",
      "Whether a premium wine by the glass is profitable with a preservation system",
    ],
    avoids: [
      "Selling glasses below the real break-even point (including waste)",
      "Offering sparkling by the glass without considering its limited shelf life",
      "Ignoring the preservation surcharge for premium wines",
    ],
    impact: [
      "Controlled and predictable margin per glass by typology",
      "Reduced losses from unfinished open bottles",
      "More profitable by-the-glass programme with better guest experience",
    ],
    inputTitle: "Bottle data", wineTypeLabel: "Wine type",
    costLabel: "Purchase price", costNote: "Acquisition cost (excl. VAT)",
    glassesLabel: "Glasses per bottle", glassesMin: "3 (generous)", glassesMax: "10 (tasting)",
    multLabel: "Multiplier",
    recPrice: "Recommended glass price", realCost: "Real cost per glass", inclPreservation: "incl. €{n} preservation",
    marginPerGlass: "Margin per glass", breakEven: "Break-even point", glassUnit: "glass", glassesUnit: "glasses", toRecoverCost: "to recover cost",
    shelfLife: "Estimated shelf life", onceOpened: "once opened",
    preservationCost: "Preservation surcharge", noSystem: "No special system", coravinLabel: "Coravin / inert gas",
    totalProfit: "Total profit", totalProfitIf: (n) => `Total profit if all ${n} glasses are sold`,
    revenue: "Revenue", cost: "Cost", preservationLabel: "Preservation",
    notApplicable: "N/A",
    insightExcellent: (be, rem) => `Excellent ratio: you cover the bottle with just ${be} glass${be > 1 ? "es" : ""}. The remaining ${rem} are net profit.`,
    insightWarning: "Warning: you need to sell all glasses to cover the cost. Review the multiplier or consider another format.",
    insightNormal: (glasses, price, be) => `With ${glasses} glasses at €${price} each, the first ${be} cover the cost. The rest is net profit.`,
    tipsTitle: "Tips for setting the by-the-glass price",
    tips: [
      "The classic rule: the glass price should let you recover the bottle cost with 2 glasses sold.",
      "Sparkling wines usually yield 6-7 glasses per bottle. Reds, 4-5. Adjust accordingly.",
      "A ×3–×4 multiplier is standard. Wine bars can go ×4–×5 for premium glasses.",
      "The glass price shouldn't exceed 35-40% of the same bottle's list price.",
      "If a bottle isn't finished within 48-72 h, waste cost should be included in the calculation.",
    ],
    faqs: [
      { q: "How many glasses come from a wine bottle?", a: "A standard 750ml bottle yields 4 to 6 glasses depending on pour size. The standard in restaurants is 5 glasses of 150ml." },
      { q: "What multiplier should I use?", a: "It depends on the type of venue. Casual restaurants: ×3–×3.5. Upscale: ×3.5–×4. Wine bars: ×4–×5." },
      { q: "How do I manage waste?", a: "With preservation systems (Coravin, inert gas) you can keep wine 5-7 days. Without, plan for 48-72 h." },
    ],
    ctaBadge: "Winerim Core", ctaTitle: "This calculator is just the", ctaTitleHighlight: "beginning",
    ctaDesc: "Winerim Core manages the complete by-the-glass programme: profitability per glass, waste control, open bottle alerts and optimal rotation — with real operational data, not generic formulas.",
    ctaPrimary: "See how Winerim Core solves it", ctaSecondary: "Analyse my list for free",
    internalLinks: [
      { to: "/vino-por-copa-restaurante", label: "Wine by the glass in restaurants", type: "guide" },
      { to: "/calculadora-margen-vino", label: "Margin calculator", type: "tool" },
      { to: "/recursos/guia-vino-por-copa-para-restaurantes", label: "By-the-glass guide", type: "resource" },
      { to: "/producto/winerim-core", label: "Winerim Core: full analytics", type: "solution" },
      { to: "/demo", label: "Request a Winerim demo", type: "solution" },
    ],
  },
  it: {
    seoTitle: "Calcolatore Prezzo Vino al Calice | Demo Winerim Core",
    seoDesc: "Calcola il prezzo ottimale del vino al calice nel tuo ristorante. Demo del motore di pricing di Winerim Core con logica di conservazione, scarti e tipo di vino.",
    breadTools: "Strumenti", breadCalc: "Calcolatore prezzo al calice", demoBadge: "Demo · Winerim Core",
    h1a: "Calcolatore prezzo vino", h1b: "al calice",
    subtitle: "Calcola il prezzo ottimale, il margine per calice e il punto di pareggio per il tuo programma di mescita.",
    demoTitle: "Decidere bene la mescita non è solo dividere una bottiglia per cinque",
    demoDesc: "Winerim tiene conto di redditività, tipo di vino, conservazione, scarti e logica commerciale per aiutarti a decidere quando conviene servire un vino al calice e a quale prezzo.",
    wineTypes: [
      { id: "still-white", label: "Bianco", glasses: 5, shelfLife: "48–72 h", preservation: 0, mult: 3.5, icon: "🥂" },
      { id: "still-red", label: "Rosso", glasses: 5, shelfLife: "48–72 h", preservation: 0, mult: 3.2, icon: "🍷" },
      { id: "sparkling", label: "Spumante", glasses: 6, shelfLife: "12–24 h", preservation: 0.30, mult: 3.8, icon: "🍾" },
      { id: "fortified", label: "Fortificato / Dolce", glasses: 8, shelfLife: "2–4 settimane", preservation: 0, mult: 3.0, icon: "🫗" },
      { id: "premium", label: "Premium (Coravin)", glasses: 5, shelfLife: "4–8 settimane", preservation: 0.80, mult: 2.5, icon: "🏆" },
    ],
    decides: [
      "Quali vini meritano di entrare nel programma al calice e a quale prezzo",
      "Quanti calici devi vendere per coprire la bottiglia per tipo di vino",
      "Se un vino premium al calice è redditizio con sistema di conservazione",
    ],
    avoids: [
      "Vendere calici sotto il punto di pareggio reale (inclusi scarti)",
      "Offrire spumanti al calice senza considerare la vita utile limitata",
      "Ignorare il sovraccosto di conservazione nei vini premium",
    ],
    impact: [
      "Margine per calice controllato e prevedibile per tipologia",
      "Riduzione delle perdite per bottiglie aperte non terminate",
      "Programma al calice più redditizio e con migliore esperienza per il cliente",
    ],
    inputTitle: "Dati della bottiglia", wineTypeLabel: "Tipo di vino",
    costLabel: "Prezzo d'acquisto", costNote: "Costo di acquisto (IVA esclusa)",
    glassesLabel: "Calici per bottiglia", glassesMin: "3 (generosi)", glassesMax: "10 (degustazione)",
    multLabel: "Moltiplicatore",
    recPrice: "Prezzo per calice consigliato", realCost: "Costo reale per calice", inclPreservation: "incl. {n} € conservazione",
    marginPerGlass: "Margine per calice", breakEven: "Punto di pareggio", glassUnit: "calice", glassesUnit: "calici", toRecoverCost: "per recuperare il costo",
    shelfLife: "Vita utile stimata", onceOpened: "una volta aperta",
    preservationCost: "Sovraccosto conservazione", noSystem: "Nessun sistema speciale", coravinLabel: "Coravin / gas inerte",
    totalProfit: "Profitto totale", totalProfitIf: (n) => `Profitto totale se si vendono tutti i ${n} calici`,
    revenue: "Ricavo", cost: "Costo", preservationLabel: "Conservazione",
    notApplicable: "Non applicabile",
    insightExcellent: (be, rem) => `Ottimo rapporto: copri la bottiglia con solo ${be} calice${be > 1 ? "i" : ""}. I restanti ${rem} sono profitto netto.`,
    insightWarning: "Attenzione: devi vendere tutti i calici per coprire il costo. Rivedi il moltiplicatore o considera un altro formato.",
    insightNormal: (glasses, price, be) => `Con ${glasses} calici a ${price} € ciascuno, i primi ${be} coprono il costo. Il resto è profitto netto.`,
    tipsTitle: "Consigli per fissare il prezzo al calice",
    tips: [
      "La regola classica: il prezzo del calice dovrebbe permetterti di recuperare il costo della bottiglia con 2 calici venduti.",
      "Gli spumanti danno 6-7 calici per bottiglia. I rossi, 4-5. Adegua il calcolo al tipo.",
      "Un moltiplicatore ×3–×4 è standard. Le enoteche possono arrivare a ×4–×5 per calici premium.",
      "Il prezzo del calice non dovrebbe superare il 35-40% del prezzo della stessa bottiglia in carta.",
      "Se una bottiglia non si finisce in 48-72 h, il costo degli scarti va incluso nel calcolo.",
    ],
    faqs: [
      { q: "Quanti calici escono da una bottiglia di vino?", a: "Una bottiglia standard da 750ml dà tra 4 e 6 calici a seconda della dimensione del servizio. Lo standard nei ristoranti sono 5 calici da 150ml." },
      { q: "Quale moltiplicatore devo usare?", a: "Dipende dal tipo di locale. Ristoranti casual: ×3–×3.5. Ristoranti di fascia medio-alta: ×3.5–×4. Enoteche: ×4–×5." },
      { q: "Come gestisco gli scarti?", a: "Con sistemi di conservazione (Coravin, gas inerte) puoi mantenere il vino 5-7 giorni. Senza sistema, calcola 48-72 h." },
    ],
    ctaBadge: "Winerim Core", ctaTitle: "Questo calcolatore è solo l'", ctaTitleHighlight: "inizio",
    ctaDesc: "Winerim Core gestisce la mescita completa: redditività per calice, controllo scarti, avvisi bottiglie aperte e rotazione ottimale — con dati reali della tua operatività.",
    ctaPrimary: "Scopri come lo risolve Winerim Core", ctaSecondary: "Analizza la mia carta gratis",
    internalLinks: [
      { to: "/vino-por-copa-restaurante", label: "Vino al calice nei ristoranti", type: "guide" },
      { to: "/calculadora-margen-vino", label: "Calcolatore di margini", type: "tool" },
      { to: "/recursos/guia-vino-por-copa-para-restaurantes", label: "Guida vino al calice", type: "resource" },
      { to: "/producto/winerim-core", label: "Winerim Core: analisi completa", type: "solution" },
      { to: "/demo", label: "Richiedi una demo di Winerim", type: "solution" },
    ],
  },
  fr: {
    seoTitle: "Calculateur de Prix du Vin au Verre | Démo Winerim Core",
    seoDesc: "Calculez le prix optimal du vin au verre dans votre restaurant. Démo du moteur de pricing de Winerim Core avec logique de conservation, perte et type de vin.",
    breadTools: "Outils", breadCalc: "Calculateur prix au verre", demoBadge: "Démo · Winerim Core",
    h1a: "Calculateur de prix du vin", h1b: "au verre",
    subtitle: "Calculez le prix optimal, la marge par verre et le seuil de rentabilité pour votre programme de vente au verre.",
    demoTitle: "Bien décider le service au verre, ce n'est pas juste diviser une bouteille par cinq",
    demoDesc: "Winerim prend en compte la rentabilité, le type de vin, la conservation, la perte et la logique commerciale pour vous aider à décider quand proposer un vin au verre et à quel prix.",
    wineTypes: [
      { id: "still-white", label: "Blanc", glasses: 5, shelfLife: "48–72 h", preservation: 0, mult: 3.5, icon: "🥂" },
      { id: "still-red", label: "Rouge", glasses: 5, shelfLife: "48–72 h", preservation: 0, mult: 3.2, icon: "🍷" },
      { id: "sparkling", label: "Effervescent", glasses: 6, shelfLife: "12–24 h", preservation: 0.30, mult: 3.8, icon: "🍾" },
      { id: "fortified", label: "Muté / Doux", glasses: 8, shelfLife: "2–4 semaines", preservation: 0, mult: 3.0, icon: "🫗" },
      { id: "premium", label: "Premium (Coravin)", glasses: 5, shelfLife: "4–8 semaines", preservation: 0.80, mult: 2.5, icon: "🏆" },
    ],
    decides: [
      "Quels vins méritent d'entrer dans le programme au verre et à quel prix",
      "Combien de verres vous devez vendre pour couvrir la bouteille selon le type de vin",
      "Si un vin premium au verre est rentable avec un système de conservation",
    ],
    avoids: [
      "Vendre des verres en dessous du seuil de rentabilité réel (y compris la perte)",
      "Proposer des effervescents au verre sans considérer leur durée de vie limitée",
      "Ignorer le surcoût de conservation pour les vins premium",
    ],
    impact: [
      "Marge par verre contrôlée et prévisible par typologie",
      "Réduction des pertes liées aux bouteilles ouvertes non terminées",
      "Programme au verre plus rentable avec une meilleure expérience client",
    ],
    inputTitle: "Données de la bouteille", wineTypeLabel: "Type de vin",
    costLabel: "Prix d'achat", costNote: "Coût d'acquisition (HT)",
    glassesLabel: "Verres par bouteille", glassesMin: "3 (généreux)", glassesMax: "10 (dégustation)",
    multLabel: "Multiplicateur",
    recPrice: "Prix par verre recommandé", realCost: "Coût réel par verre", inclPreservation: "incl. {n} € conservation",
    marginPerGlass: "Marge par verre", breakEven: "Seuil de rentabilité", glassUnit: "verre", glassesUnit: "verres", toRecoverCost: "pour récupérer le coût",
    shelfLife: "Durée de vie estimée", onceOpened: "une fois ouverte",
    preservationCost: "Surcoût conservation", noSystem: "Pas de système spécial", coravinLabel: "Coravin / gaz inerte",
    totalProfit: "Bénéfice total", totalProfitIf: (n) => `Bénéfice total si les ${n} verres sont vendus`,
    revenue: "Recette", cost: "Coût", preservationLabel: "Conservation",
    notApplicable: "Non applicable",
    insightExcellent: (be, rem) => `Excellent ratio : vous couvrez la bouteille avec seulement ${be} verre${be > 1 ? "s" : ""}. Les ${rem} restants sont du bénéfice net.`,
    insightWarning: "Attention : vous devez vendre tous les verres pour couvrir le coût. Revoyez le multiplicateur ou envisagez un autre format.",
    insightNormal: (glasses, price, be) => `Avec ${glasses} verres à ${price} € chacun, les ${be} premiers couvrent le coût. Le reste est du bénéfice net.`,
    tipsTitle: "Conseils pour fixer le prix au verre",
    tips: [
      "La règle classique : le prix du verre devrait vous permettre de récupérer le coût de la bouteille avec 2 verres vendus.",
      "Les effervescents donnent 6-7 verres par bouteille. Les rouges, 4-5. Ajustez le calcul selon le type.",
      "Un multiplicateur ×3–×4 est standard. Les bars à vin peuvent aller jusqu'à ×4–×5 pour les verres premium.",
      "Le prix du verre ne doit pas dépasser 35-40% du prix de la même bouteille en carte.",
      "Si une bouteille n'est pas terminée en 48-72 h, le coût de perte doit être inclus dans le calcul.",
    ],
    faqs: [
      { q: "Combien de verres tire-t-on d'une bouteille de vin ?", a: "Une bouteille standard de 750ml donne entre 4 et 6 verres selon la taille du service. Le standard en restaurant est de 5 verres de 150ml." },
      { q: "Quel multiplicateur dois-je utiliser ?", a: "Cela dépend du type d'établissement. Restaurants décontractés : ×3–×3.5. Haut de gamme : ×3.5–×4. Bars à vin : ×4–×5." },
      { q: "Comment gérer la perte ?", a: "Avec des systèmes de conservation (Coravin, gaz inerte) vous pouvez conserver le vin 5-7 jours. Sans système, comptez 48-72 h." },
    ],
    ctaBadge: "Winerim Core", ctaTitle: "Ce calculateur n'est que le", ctaTitleHighlight: "début",
    ctaDesc: "Winerim Core gère le programme au verre complet : rentabilité par verre, contrôle des pertes, alertes bouteilles ouvertes et rotation optimale — avec les données réelles de votre exploitation.",
    ctaPrimary: "Voir comment Winerim Core le résout", ctaSecondary: "Analyser ma carte gratuitement",
    internalLinks: [
      { to: "/vino-por-copa-restaurante", label: "Vin au verre en restaurant", type: "guide" },
      { to: "/calculadora-margen-vino", label: "Calculateur de marges", type: "tool" },
      { to: "/recursos/guia-vino-por-copa-para-restaurantes", label: "Guide vin au verre", type: "resource" },
      { to: "/producto/winerim-core", label: "Winerim Core : analyse complète", type: "solution" },
      { to: "/demo", label: "Demander une démo Winerim", type: "solution" },
    ],
  },
};

const CalculadoraPrecioCopa = () => {
  const { lang, localePath } = useLanguage();
  const t = i18n[lang] || i18n.es;

  const [wineType, setWineType] = useState("still-red");
  const [costeBotella, setCosteBotella] = useState(12);
  const [copasPorBotella, setCopasPorBotella] = useState(5);
  const [multiplicador, setMultiplicador] = useState(3.2);

  const preset = t.wineTypes.find((w) => w.id === wineType)!;

  const handleWineType = (id: string) => {
    const p = t.wineTypes.find((w) => w.id === id)!;
    setWineType(id);
    setCopasPorBotella(p.glasses);
    setMultiplicador(p.mult);
  };

  const results = useMemo(() => {
    const costePorCopa = costeBotella / copasPorBotella;
    const costeRealPorCopa = costePorCopa + preset.preservation;
    const precioCopa = +(costeRealPorCopa * multiplicador).toFixed(2);
    const margenCopa = +(precioCopa - costeRealPorCopa).toFixed(2);
    const margenPct = precioCopa > 0 ? +((margenCopa / precioCopa) * 100).toFixed(1) : 0;
    const copasEquilibrio = precioCopa > 0 ? Math.ceil(costeBotella / precioCopa) : 0;
    const beneficioTotal = +(precioCopa * copasPorBotella - costeBotella - preset.preservation * copasPorBotella).toFixed(2);
    const ingresoTotal = +(precioCopa * copasPorBotella).toFixed(2);
    return { costePorCopa, costeRealPorCopa, precioCopa, margenCopa, margenPct, copasEquilibrio, beneficioTotal, ingresoTotal };
  }, [costeBotella, copasPorBotella, multiplicador, preset]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seoTitle} description={t.seoDesc} url="https://winerim.wine/herramientas/calculadora-precio-vino-por-copa" />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadTools, href: localePath("/guias-y-recursos") }, { label: t.breadCalc }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 mb-6">
            <BarChart3 size={14} className="text-amber-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-500">{t.demoBadge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
            {t.h1a}{" "}<span className="text-gradient-wine italic">{t.h1b}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* DEMO INTRO */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-4">
        <ScrollReveal>
          <div className="relative bg-gradient-card rounded-2xl border border-amber-500/20 p-6 md:p-8 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,hsl(38_90%_55%/0.05),transparent_60%)]" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-amber-500" />
              </div>
              <div>
                <h2 className="font-heading text-base font-bold text-foreground mb-1">{t.demoTitle}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.demoDesc}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ToolStrategicBlock layer="core" decides={t.decides} avoids={t.avoids} impact={t.impact} />

      {/* CALCULATOR */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* INPUTS */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl border border-border bg-gradient-card space-y-7">
            <h2 className="font-heading text-xl font-bold flex items-center gap-2">
              <Calculator size={20} className="text-wine" /> {t.inputTitle}
            </h2>

            <div>
              <label className="text-sm font-medium mb-2 block">{t.wineTypeLabel}</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {t.wineTypes.map((w) => (
                  <button key={w.id} onClick={() => handleWineType(w.id)}
                    className={`flex items-center gap-2 px-3 py-3 rounded-lg border text-left text-sm font-semibold transition-all ${wineType === w.id ? "bg-wine/20 border-wine/50 text-wine" : "bg-secondary/50 border-border hover:border-wine/30"}`}>
                    <span className="text-base">{w.icon}</span>
                    <div>
                      <span className="block text-xs leading-tight">{w.label}</span>
                      <span className="block text-[10px] text-muted-foreground font-normal">{w.glasses} {t.glassesUnit} · {w.shelfLife}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">{t.costLabel}</label>
                <span className="text-sm font-bold text-wine">{costeBotella.toFixed(2)} €</span>
              </div>
              <input type="number" min={1} max={200} step={0.5} value={costeBotella}
                onChange={(e) => setCosteBotella(Math.max(0.5, Math.min(200, parseFloat(e.target.value) || 0.5)))}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine/50 transition-all mb-2" />
              <Slider value={[costeBotella]} onValueChange={([v]) => setCosteBotella(v)} min={1} max={100} step={0.5} />
              <p className="text-xs text-muted-foreground mt-1">{t.costNote}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">{t.glassesLabel}</label>
                <span className="text-sm font-bold text-wine">{copasPorBotella}</span>
              </div>
              <Slider value={[copasPorBotella]} onValueChange={([v]) => setCopasPorBotella(v)} min={3} max={10} step={1} />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{t.glassesMin}</span><span>{t.glassesMax}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">{t.multLabel}</label>
                <span className="text-sm font-bold text-wine">×{multiplicador.toFixed(1)}</span>
              </div>
              <Slider value={[multiplicador]} onValueChange={([v]) => setMultiplicador(v)} min={2} max={6} step={0.1} />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>×2</span><span>×{multiplicador.toFixed(1)}</span><span>×6</span>
              </div>
            </div>
          </motion.div>

          {/* OUTPUTS */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="space-y-5">
            <div className="p-8 rounded-2xl border border-wine/30 bg-wine/5 text-center">
              <GlassWater size={28} className="text-wine mx-auto mb-3" />
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">{t.recPrice}</p>
              <p className="font-heading text-5xl md:text-6xl font-bold text-wine">{results.precioCopa.toFixed(2)} €</p>
              <p className="text-sm text-muted-foreground mt-2">
                {t.realCost}: {results.costeRealPorCopa.toFixed(2)} €
                {preset.preservation > 0 && (
                  <span className="text-xs ml-1">({t.inclPreservation.replace("{n}", preset.preservation.toFixed(2))})</span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <TrendingUp size={18} className="text-wine mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">{t.marginPerGlass}</p>
                <p className="font-heading text-2xl font-bold">{results.margenCopa.toFixed(2)} €</p>
                <p className="text-xs text-wine font-semibold">{results.margenPct}%</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <DollarSign size={18} className="text-wine mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">{t.breakEven}</p>
                <p className="font-heading text-2xl font-bold">{results.copasEquilibrio} {results.copasEquilibrio === 1 ? t.glassUnit : t.glassesUnit}</p>
                <p className="text-xs text-muted-foreground">{t.toRecoverCost}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <Clock size={18} className="text-wine mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">{t.shelfLife}</p>
                <p className="font-heading text-lg font-bold">{preset.shelfLife}</p>
                <p className="text-xs text-muted-foreground">{t.onceOpened}</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <ShieldAlert size={18} className={`mx-auto mb-2 ${preset.preservation > 0 ? "text-amber-500" : "text-muted-foreground/40"}`} />
                <p className="text-xs text-muted-foreground mb-1">{t.preservationCost}</p>
                <p className={`font-heading text-lg font-bold ${preset.preservation > 0 ? "text-amber-500" : "text-muted-foreground/60"}`}>
                  {preset.preservation > 0 ? `${preset.preservation.toFixed(2)} €/${t.glassUnit}` : t.notApplicable}
                </p>
                <p className="text-xs text-muted-foreground">{preset.preservation > 0 ? t.coravinLabel : t.noSystem}</p>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
              <p className="text-xs text-muted-foreground mb-1">{t.totalProfitIf(copasPorBotella)}</p>
              <p className="font-heading text-3xl font-bold text-wine">{results.beneficioTotal.toFixed(2)} €</p>
              <p className="text-sm text-muted-foreground mt-1">
                {t.revenue}: {results.ingresoTotal.toFixed(2)} € — {t.cost}: {costeBotella.toFixed(2)} €
                {preset.preservation > 0 && <span> — {t.preservationLabel}: {(preset.preservation * copasPorBotella).toFixed(2)} €</span>}
              </p>
            </div>

            <div className="bg-wine/5 border border-wine/20 rounded-xl p-4">
              <p className="text-xs text-muted-foreground flex items-start gap-2">
                <Info size={14} className="text-wine shrink-0 mt-0.5" />
                {results.copasEquilibrio <= 2
                  ? t.insightExcellent(results.copasEquilibrio, copasPorBotella - results.copasEquilibrio)
                  : results.copasEquilibrio >= copasPorBotella
                  ? t.insightWarning
                  : t.insightNormal(copasPorBotella, results.precioCopa.toFixed(2), results.copasEquilibrio)
                }
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TIPS */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t.tipsTitle}</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {t.tips.map((tip, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-5 rounded-xl border border-border bg-background">
                  <CheckCircle size={16} className="text-wine shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={t.faqs} schemaId="calculadora-copa" />

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-amber-500/20 p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_90%_55%/0.06),transparent_70%)]" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-amber-500/70 mb-4">
                <span className="w-1 h-1 rounded-full bg-amber-500/50" /> {t.ctaBadge}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight">
                {t.ctaTitle}{" "}<span className="text-gradient-wine italic">{t.ctaTitleHighlight}</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={localePath("/producto/winerim-core")}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                  {t.ctaPrimary} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/analisis-carta")}
                  className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
                  {t.ctaSecondary}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={t.internalLinks} />
      <Footer />
    </div>
  );
};

export default CalculadoraPrecioCopa;
