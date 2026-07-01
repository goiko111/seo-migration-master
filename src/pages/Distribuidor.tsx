import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Globe, TrendingUp, Users, Shield, Briefcase, Target, Rocket, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { CANONICAL_DOMAIN } from "@/seo/config";

const WA_NUMBER = "34658718350";
const WA_MSG_ES = encodeURIComponent("Hola, me interesa ser distribuidor de Winerim. Podemos hablar?");
const WA_MSG_EN = encodeURIComponent("Hi, I am interested in becoming a Winerim distributor. Can we talk?");
const WA_MSG_DE = encodeURIComponent("Hallo, ich bin daran interessiert, Winerim-Distributor zu werden. Konnen wir sprechen?");
const WA_MSG_PT = encodeURIComponent("Ola, estou interessado em me tornar um distribuidor da Winerim. Podemos conversar?");

const i18n = {
  es: {
    seoTitle: "Distribuidores Winerim | Partner comercial para hosteleria",
    seoDescription: "Programa de distribucion Winerim para partners HORECA: venta de software de carta de vinos, analisis de margen, stock, compras y soporte centralizado.",
    distributorsLabel: "Distribuidores 2025",
    heroTitle: "Lleva Winerim a restaurantes, hoteles y grupos de tu mercado",
    heroSubtitle: "Un programa para partners HORECA que ya venden a hosteleria y quieren incorporar una plataforma de carta de vinos, stock, compras, margen y analitica.",
    whatsapp: "WhatsApp",
    email: "info@winerim.com",
    opportunityLabel: "La oportunidad",
    opportunityTitle: "Un mercado HORECA con mucho vino y poca inteligencia de gestion.",
    opportunityText1: "Muchos restaurantes siguen gestionando carta, stock, compras y margenes con hojas de calculo, PDFs o decisiones dispersas. Eso deja referencias paradas, precios desactualizados y poca visibilidad para negociar.",
    opportunityText2: "Winerim conecta carta digital, analisis de margen, stock, rotacion, compras y recomendaciones en una plataforma pensada para restaurantes, hoteles, wine bars y grupos.",
    opportunityText3: "Como partner, llevas esta solucion a tu mercado con un producto B2B claro, materiales comerciales, soporte centralizado y un proceso de implantacion acompanado.",
    businessModelLabel: "Tu modelo de negocio",
    businessModelTitle: "No eres empleado. Eres empresario.",
    requirementsLabel: "Requisitos",
    requirementsTitle: "Que buscamos en un distribuidor?",
    essentialLabel: "Imprescindible",
    desirableLabel: "Deseable",
    economicPotentialLabel: "Potencial economico",
    economicPotentialTitle: "Los numeros hablan solos.",
    economicPotentialText: "Estimaciones basadas en licencias anuales estandar. El ingreso real depende de tu capacidad comercial y del mercado.",
    processLabel: "Proceso",
    processTitle: "Proceso de seleccion",
    activeNetworkLabel: "Red activa",
    activeNetworkTitle: "Ya operamos en estos mercados",
    activeNetworkSubtitle: "Territorios con distribuidor asignado. El tuyo aun esta libre?",
    idealProfile: "Perfil ideal: Distribuidores de vino, distribuidores de software para hosteleria, o profesionales del canal HORECA con red consolidada.",
    lookingFor: "Buscamos distribuidores en: Portugal, Francia, Alemania, UK, USA, resto de LATAM",
    finalCTATitle: "Listo para cambiar tu negocio?",
    finalCTASubtitle: "Lleva Winerim a tu mercado con un producto B2B especializado, soporte del equipo central y una propuesta clara para hosteleria.",
    whatsappLabel: "WhatsApp: 658 718 350",
  },
  en: {
    seoTitle: "Winerim Distributors | Commercial Partner for Hospitality",
    seoDescription: "Winerim distribution programme for HORECA partners: sell wine-list software, margin analysis, stock intelligence, purchasing support and centralised onboarding.",
    distributorsLabel: "Distributors 2025",
    heroTitle: "Bring Winerim to restaurants, hotels and groups in your market",
    heroSubtitle: "A programme for HORECA partners already selling into hospitality who want to add a platform for wine lists, stock, purchasing, margin and analytics.",
    whatsapp: "WhatsApp",
    email: "info@winerim.com",
    opportunityLabel: "The Opportunity",
    opportunityTitle: "A hospitality market with serious wine spend and little management intelligence.",
    opportunityText1: "Many restaurants still manage lists, stock, purchasing and margin with spreadsheets, PDFs or scattered decisions. That leaves slow references, outdated prices and weak negotiating visibility.",
    opportunityText2: "Winerim connects the digital wine list, margin analysis, stock, rotation, purchasing and recommendations in a platform built for restaurants, hotels, wine bars and groups.",
    opportunityText3: "As a partner, you bring this solution to your market with a clear B2B product, sales materials, centralised support and guided implementation.",
    businessModelLabel: "Your Business Model",
    businessModelTitle: "You are not an employee. You are an entrepreneur.",
    requirementsLabel: "Requirements",
    requirementsTitle: "What do we look for in a distributor?",
    essentialLabel: "Essential",
    desirableLabel: "Desirable",
    economicPotentialLabel: "Economic Potential",
    economicPotentialTitle: "The numbers speak for themselves.",
    economicPotentialText: "Estimates based on standard annual licenses. Real income depends on your commercial ability and market.",
    processLabel: "Process",
    processTitle: "Selection Process",
    activeNetworkLabel: "Active Network",
    activeNetworkTitle: "We already operate in these markets",
    activeNetworkSubtitle: "Territories with assigned distributor. Is yours still free?",
    idealProfile: "Ideal profile: Wine distributors, hospitality software distributors, or HORECA professionals with established networks.",
    lookingFor: "We are looking for distributors in: Portugal, France, Germany, UK, USA, rest of LATAM",
    finalCTATitle: "Ready to change your business?",
    finalCTASubtitle: "Take Winerim to your market with a specialised B2B product, central team support and a clear proposal for hospitality.",
    whatsappLabel: "WhatsApp: 658 718 350",
  },
  it: {
    seoTitle: "Distributori Winerim | Partner commerciale per l'ospitalita",
    seoDescription: "Programma di distribuzione Winerim per partner HORECA: software per carta vini, analisi margini, stock, acquisti e onboarding centralizzato.",
    distributorsLabel: "Distributori 2025",
    heroTitle: "Porta Winerim a ristoranti, hotel e gruppi nel tuo mercato",
    heroSubtitle: "Un programma per partner HORECA che gia vendono alla ristorazione e vogliono aggiungere una piattaforma per carta vini, stock, acquisti, margini e analytics.",
    whatsapp: "WhatsApp",
    email: "info@winerim.com",
    opportunityLabel: "L'Opportunita",
    opportunityTitle: "Un mercato HORECA con molto vino e poca intelligence gestionale.",
    opportunityText1: "Molti ristoranti gestiscono carta, stock, acquisti e margini con fogli di calcolo, PDF o decisioni disperse. Questo lascia referenze ferme, prezzi non aggiornati e poca visibilita in negoziazione.",
    opportunityText2: "Winerim collega carta vini digitale, analisi margini, stock, rotazione, acquisti e raccomandazioni in una piattaforma per ristoranti, hotel, wine bar e gruppi.",
    opportunityText3: "Come partner, porti questa soluzione al tuo mercato con un prodotto B2B chiaro, materiali commerciali, supporto centralizzato e implementazione guidata.",
    businessModelLabel: "Il Tuo Modello di Business",
    businessModelTitle: "Non sei un dipendente. Sei un imprenditore.",
    requirementsLabel: "Requisiti",
    requirementsTitle: "Cosa cerchiamo in un distributore?",
    essentialLabel: "Essenziale",
    desirableLabel: "Desiderabile",
    economicPotentialLabel: "Potenziale Economico",
    economicPotentialTitle: "I numeri parlano da soli.",
    economicPotentialText: "Stime basate su licenze annuali standard. Il reddito reale dipende dalla tua capacita commerciale e dal mercato.",
    processLabel: "Processo",
    processTitle: "Processo di Selezione",
    activeNetworkLabel: "Rete Attiva",
    activeNetworkTitle: "Gia operiamo in questi mercati",
    activeNetworkSubtitle: "Territori con distributore assegnato. Il tuo e ancora libero?",
    idealProfile: "Profilo ideale: Distributori di vino, distributori di software per ospitalita o professionisti HORECA con reti consolidate.",
    lookingFor: "Cerchiamo distributori in: Portogallo, Francia, Germania, UK, USA, resto dell'America Latina",
    finalCTATitle: "Pronto a cambiare il tuo business?",
    finalCTASubtitle: "Porta Winerim al tuo mercato con un prodotto B2B specializzato, supporto centrale e una proposta chiara per l'ospitalita.",
    whatsappLabel: "WhatsApp: 658 718 350",
  },
  fr: {
    seoTitle: "Distributeurs Winerim | Partenaire commercial pour l'hotellerie-restauration",
    seoDescription: "Programme de distribution Winerim pour partenaires HORECA : logiciel de carte des vins, analyse de marge, stock, achats et accompagnement centralise.",
    distributorsLabel: "Distributeurs 2025",
    heroTitle: "Amenez Winerim aux restaurants, hotels et groupes de votre marche",
    heroSubtitle: "Un programme pour partenaires HORECA qui vendent deja a l'hospitality et veulent ajouter une plateforme pour carte des vins, stock, achats, marge et analytics.",
    whatsapp: "WhatsApp",
    email: "info@winerim.com",
    opportunityLabel: "L'Opportunite",
    opportunityTitle: "Un marche HORECA avec beaucoup de vin et peu d'intelligence de gestion.",
    opportunityText1: "Beaucoup de restaurants gerent encore carte, stock, achats et marges avec tableurs, PDF ou decisions dispersees. Cela laisse des references dormantes, des prix obsoletes et peu de visibilite pour negocier.",
    opportunityText2: "Winerim connecte carte des vins digitale, analyse de marge, stock, rotation, achats et recommandations dans une plateforme pour restaurants, hotels, bars a vin et groupes.",
    opportunityText3: "Comme partenaire, vous portez cette solution sur votre marche avec un produit B2B clair, des supports commerciaux, un support centralise et une implementation accompagnee.",
    businessModelLabel: "Votre Modele Commercial",
    businessModelTitle: "Vous n'etes pas un employe. Vous etes un entrepreneur.",
    requirementsLabel: "Conditions",
    requirementsTitle: "Que recherchons-nous chez un distributeur?",
    essentialLabel: "Essentiel",
    desirableLabel: "Souhaitable",
    economicPotentialLabel: "Potentiel Economique",
    economicPotentialTitle: "Les chiffres parlent d'eux-memes.",
    economicPotentialText: "Estimations basees sur les licences annuelles standard. Le revenu reel depend de votre capacite commerciale et du marche.",
    processLabel: "Processus",
    processTitle: "Processus de Selection",
    activeNetworkLabel: "Reseau Actif",
    activeNetworkTitle: "Nous operons deja sur ces marches",
    activeNetworkSubtitle: "Territoires avec distributeur assigne. Le votre est-il encore libre?",
    idealProfile: "Profil ideal: Distributeurs de vin, distributeurs de logiciels pour l'hospitalite ou professionnels HORECA avec reseaux etablis.",
    lookingFor: "Nous cherchons des distributeurs en: Portugal, France, Allemagne, UK, USA, reste d'Amerique Latine",
    finalCTATitle: "Pret a changer votre entreprise?",
    finalCTASubtitle: "Amenez Winerim sur votre marche avec un produit B2B specialise, le support de l'equipe centrale et une proposition claire pour l'hospitality.",
    whatsappLabel: "WhatsApp: 658 718 350",
  },
  de: {
    seoTitle: "Winerim Distributoren | Vertriebspartner fuer Hospitality",
    seoDescription: "Winerim Distributionsprogramm fuer HORECA-Partner: Weinkarten-Software, Margenanalyse, Bestand, Einkauf und zentraler Onboarding-Support.",
    distributorsLabel: "Distributoren 2025",
    heroTitle: "Bringen Sie Winerim zu Restaurants, Hotels und Gruppen in Ihrem Markt",
    heroSubtitle: "Ein Programm fuer HORECA-Partner, die bereits an Hospitality verkaufen und eine Plattform fuer Weinkarte, Bestand, Einkauf, Marge und Analytics ergaenzen wollen.",
    whatsapp: "WhatsApp",
    email: "info@winerim.com",
    opportunityLabel: "Die Chance",
    opportunityTitle: "Ein HORECA-Markt mit hohem Weinumsatz und wenig Management-Intelligenz.",
    opportunityText1: "Viele Restaurants steuern Karte, Bestand, Einkauf und Margen noch mit Tabellen, PDFs oder verstreuten Entscheidungen. Das fuehrt zu langsamen Referenzen, veralteten Preisen und schwacher Verhandlungsbasis.",
    opportunityText2: "Winerim verbindet digitale Weinkarte, Margenanalyse, Bestand, Rotation, Einkauf und Empfehlungen in einer Plattform fuer Restaurants, Hotels, Weinbars und Gruppen.",
    opportunityText3: "Als Partner bringen Sie diese Loesung in Ihren Markt: klares B2B-Produkt, Vertriebsmaterialien, zentraler Support und begleitete Implementierung.",
    businessModelLabel: "Ihr Geschaftsmodell",
    businessModelTitle: "Sie sind kein Angestellter. Sie sind ein Unternehmer.",
    requirementsLabel: "Anforderungen",
    requirementsTitle: "Was suchen wir in einem Distributor?",
    essentialLabel: "Notwendig",
    desirableLabel: "Wunschenswert",
    economicPotentialLabel: "Wirtschaftliches Potenzial",
    economicPotentialTitle: "Die Zahlen sprechen fur sich.",
    economicPotentialText: "Schatzungen basieren auf Standard-Jahreslizenzen. Das tatsachliche Einkommen hangt von Ihrer Vertriegsfahigkeit und dem Markt ab.",
    processLabel: "Prozess",
    processTitle: "Auswahlprozess",
    activeNetworkLabel: "Aktives Netzwerk",
    activeNetworkTitle: "Wir sind bereits auf diesen Markten tatig",
    activeNetworkSubtitle: "Gebiete mit zugewiesenenem Distributor. Ist Ihres noch frei?",
    idealProfile: "Ideales Profil: Weindistributoren, Hospitality-Softwaredistributoren oder HORECA-Profis mit etablierten Netzwerken.",
    lookingFor: "Wir suchen Distributoren in: Portugal, Frankreich, Deutschland, UK, USA, Rest Lateinamerikas",
    finalCTATitle: "Bereit, Ihr Geschaft zu verandern?",
    finalCTASubtitle: "Bringen Sie Winerim mit einem spezialisierten B2B-Produkt, zentralem Team-Support und einer klaren Hospitality-Positionierung in Ihren Markt.",
    whatsappLabel: "WhatsApp: 658 718 350",
  },
  pt: {
    seoTitle: "Distribuidores Winerim | Parceiro comercial para hotelaria",
    seoDescription: "Programa de distribuicao Winerim para parceiros HORECA: software de carta de vinhos, analise de margem, stock, compras e suporte centralizado.",
    distributorsLabel: "Distribuidores 2025",
    heroTitle: "Leve a Winerim a restaurantes, hoteis e grupos no seu mercado",
    heroSubtitle: "Um programa para parceiros HORECA que ja vendem a hotelaria e querem acrescentar uma plataforma para carta de vinhos, stock, compras, margem e analitica.",
    whatsapp: "WhatsApp",
    email: "info@winerim.com",
    opportunityLabel: "A Oportunidade",
    opportunityTitle: "Um mercado HORECA com muito vinho e pouca inteligencia de gestao.",
    opportunityText1: "Muitos restaurantes ainda gerem carta, stock, compras e margens com folhas de calculo, PDFs ou decisoes dispersas. Isso deixa referencias paradas, precos desatualizados e pouca visibilidade para negociar.",
    opportunityText2: "A Winerim liga carta digital, analise de margem, stock, rotacao, compras e recomendacoes numa plataforma para restaurantes, hoteis, wine bars e grupos.",
    opportunityText3: "Como parceiro, leva esta solucao ao seu mercado com um produto B2B claro, materiais comerciais, suporte centralizado e implementacao acompanhada.",
    businessModelLabel: "Seu Modelo de Negocios",
    businessModelTitle: "Voce nao e um funcionario. Voce e um empresario.",
    requirementsLabel: "Requisitos",
    requirementsTitle: "O que procuramos em um distribuidor?",
    essentialLabel: "Essencial",
    desirableLabel: "Desejavel",
    economicPotentialLabel: "Potencial Economico",
    economicPotentialTitle: "Os numeros falam por si.",
    economicPotentialText: "Estimativas baseadas em licencas anuais padrao. A receita real depende de sua capacidade comercial e do mercado.",
    processLabel: "Processo",
    processTitle: "Processo de Selecao",
    activeNetworkLabel: "Rede Ativa",
    activeNetworkTitle: "Ja operamos nesses mercados",
    activeNetworkSubtitle: "Territorios com distribuidor designado. O seu ainda esta livre?",
    idealProfile: "Perfil ideal: Distribuidores de vinho, distribuidores de software de hospitalidade ou profissionais HORECA com redes consolidadas.",
    lookingFor: "Procuramos distribuidores em: Portugal, Franca, Alemanha, UK, USA, resto da America Latina",
    finalCTATitle: "Pronto para transformar seu negocio?",
    finalCTASubtitle: "Leve a Winerim ao seu mercado com um produto B2B especializado, suporte da equipa central e uma proposta clara para hotelaria.",
    whatsappLabel: "WhatsApp: 658 718 350",
  },
};

type DistributorExtra = {
  breadcrumbs: { label: string; href?: string }[];
  businessModelItems: string[];
  essentialItems: string[];
  desirableItems: string[];
  economicScenarios: { clients: string; annual: string; label: string; desc: string }[];
  renewalNote: string;
  processSteps: { step: string; title: string; desc: string }[];
  activeMarkets: { flag: string; country: string }[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  internalLinks: { to: string; label: string; type: "guide" | "tool" | "resource" | "solution" | "decision-center" }[];
};

const pageExtras: Record<string, DistributorExtra> = {
  es: {
    breadcrumbs: [{ label: "Funcionalidades", href: "/funcionalidades" }, { label: "Distribuidores" }],
    businessModelItems: [
      "Relacion B2B: trabajas como partner independiente con tu propia estructura comercial.",
      "Margen por licencia vendida y renovacion anual recurrente, segun acuerdo de territorio.",
      "Soporte tecnico centralizado: tu vendes y acompanamos la implantacion.",
      "Materiales co-branded: presentacion, argumentos, demos y activos comerciales.",
      "Posibilidad de construir red local de subpartners si el territorio lo permite.",
      "Seguimiento comercial conjunto durante los primeros meses de activacion.",
    ],
    essentialItems: [
      "Red activa en restaurantes, hoteles, grupos o canal HORECA.",
      "Experiencia B2B demostrable en venta consultiva.",
      "Empresa registrada y capacidad de facturacion local.",
      "Conocimiento del idioma y dinamicas comerciales del mercado objetivo.",
    ],
    desirableItems: [
      "Experiencia en vino, distribucion, software horeca o tecnologia para restauracion.",
      "Capacidad para abrir demos, reuniones y pilotos con cuentas cualificadas.",
      "Compromiso con objetivos de activacion realistas por territorio.",
      "Equipo comercial propio o capacidad para crearlo.",
    ],
    economicScenarios: [
      { clients: "50", annual: "12.500 - 15.000 EUR", label: "Arranque", desc: "Primer ano con cartera inicial y foco en cuentas cercanas." },
      { clients: "150", annual: "37.500 - 45.000 EUR", label: "Consolidacion", desc: "Segundo ano con proceso comercial repetible." },
      { clients: "500", annual: "125.000 - 150.000 EUR", label: "Escalado", desc: "Red local activa y mayor penetracion en el territorio." },
    ],
    renewalNote: "Los ingresos dependen del acuerdo final, la renovacion de clientes y la capacidad comercial del partner.",
    processSteps: [
      { step: "01", title: "Conversacion de descubrimiento", desc: "Entendemos tu red, tu mercado y el encaje con Winerim." },
      { step: "02", title: "Demo y plan de territorio", desc: "Revisamos producto, tipo de cliente, objeciones y ruta de entrada." },
      { step: "03", title: "Acuerdo de distribucion", desc: "Definimos condiciones, objetivos, zona y responsabilidades." },
      { step: "04", title: "Onboarding comercial", desc: "Recibes materiales, formacion y argumentario para vender con criterio." },
      { step: "05", title: "Primeras cuentas acompanadas", desc: "El equipo central apoya las primeras demos, implantaciones y aprendizajes." },
    ],
    activeMarkets: [
      { flag: "MX", country: "Mexico" },
      { flag: "IT", country: "Italia" },
      { flag: "PR", country: "Puerto Rico" },
      { flag: "CH", country: "Suiza" },
    ],
    faqTitle: "Preguntas frecuentes para distribuidores Winerim",
    faqs: [
      { q: "Que tipo de partner encaja mejor?", a: "Distribuidores de vino, consultores HORECA, empresas de software para hosteleria y profesionales con acceso real a restaurantes, hoteles o grupos." },
      { q: "Winerim sustituye la relacion del restaurante con sus proveedores?", a: "No. Winerim ayuda a gestionar carta, stock, margen y compras con datos. El partner comercial vende la plataforma, no sustituye a los proveedores del restaurante." },
      { q: "Hay exclusividad territorial?", a: "Puede existir si el mercado, la capacidad comercial y los objetivos lo justifican. Se define en el acuerdo de distribucion." },
      { q: "Que soporte recibe el distribuidor?", a: "Materiales comerciales, formacion de producto, soporte en demos iniciales y acompanamiento durante las primeras implantaciones." },
    ],
    internalLinks: [
      { to: "/producto/winerim-supply", label: "Winerim Supply: compras y distribuidores", type: "solution" },
      { to: "/producto/winerim-core", label: "Winerim Core: margen, stock y analitica", type: "solution" },
      { to: "/calculadora-margen-vino", label: "Calculadora de margen de vino", type: "tool" },
      { to: "/soluciones/grupos-restauracion", label: "Winerim para grupos de restauracion", type: "solution" },
      { to: "/demo", label: "Solicitar demo", type: "solution" },
    ],
  },
  en: {
    breadcrumbs: [{ label: "Features", href: "/en/features" }, { label: "Distributors" }],
    businessModelItems: [
      "B2B relationship: you operate as an independent partner with your own commercial structure.",
      "Margin per licence sold and annual recurring renewals, depending on territory agreement.",
      "Centralised technical support: you sell and Winerim supports implementation.",
      "Co-branded materials: deck, arguments, demos and commercial assets.",
      "Potential to build a local subpartner network where the territory allows it.",
      "Joint commercial follow-up during the first activation months.",
    ],
    essentialItems: [
      "Active network in restaurants, hotels, groups or HORECA channels.",
      "Proven B2B consultative sales experience.",
      "Registered company and local invoicing capacity.",
      "Native or fluent language and market knowledge.",
    ],
    desirableItems: [
      "Experience in wine, distribution, hospitality software or restaurant technology.",
      "Ability to open demos, meetings and pilots with qualified accounts.",
      "Commitment to realistic activation targets by territory.",
      "Own sales team or capacity to build one.",
    ],
    economicScenarios: [
      { clients: "50", annual: "EUR 12,500 - 15,000", label: "Launch", desc: "First year with an initial portfolio and nearby accounts." },
      { clients: "150", annual: "EUR 37,500 - 45,000", label: "Consolidation", desc: "Second year with a repeatable sales process." },
      { clients: "500", annual: "EUR 125,000 - 150,000", label: "Scale", desc: "Active local network and deeper territory penetration." },
    ],
    renewalNote: "Income depends on the final agreement, client renewal and the partner's commercial capacity.",
    processSteps: [
      { step: "01", title: "Discovery conversation", desc: "We understand your network, market and fit with Winerim." },
      { step: "02", title: "Demo and territory plan", desc: "We review product, customer type, objections and entry route." },
      { step: "03", title: "Distribution agreement", desc: "We define terms, targets, area and responsibilities." },
      { step: "04", title: "Commercial onboarding", desc: "You receive materials, product training and sales arguments." },
      { step: "05", title: "First accounts with support", desc: "The central team supports early demos, implementations and learnings." },
    ],
    activeMarkets: [
      { flag: "MX", country: "Mexico" },
      { flag: "IT", country: "Italy" },
      { flag: "PR", country: "Puerto Rico" },
      { flag: "CH", country: "Switzerland" },
    ],
    faqTitle: "FAQ for Winerim distributors",
    faqs: [
      { q: "What type of partner is the best fit?", a: "Wine distributors, HORECA consultants, hospitality software companies and professionals with real access to restaurants, hotels or groups." },
      { q: "Does Winerim replace the restaurant's supplier relationships?", a: "No. Winerim helps manage list, stock, margin and purchasing with data. The commercial partner sells the platform; suppliers remain the restaurant's own network." },
      { q: "Is territorial exclusivity available?", a: "It can be, if the market, commercial capacity and targets justify it. It is defined in the distribution agreement." },
      { q: "What support does a distributor receive?", a: "Sales materials, product training, support in early demos and guidance during the first implementations." },
    ],
    internalLinks: [
      { to: "/en/product/winerim-supply", label: "Winerim Supply: purchasing and distributors", type: "solution" },
      { to: "/en/product/winerim-core", label: "Winerim Core: margin, stock and analytics", type: "solution" },
      { to: "/en/wine-margin-calculator", label: "Wine margin calculator", type: "tool" },
      { to: "/en/solutions/restaurant-groups", label: "Winerim for restaurant groups", type: "solution" },
      { to: "/en/demo", label: "Request a demo", type: "solution" },
    ],
  },
  it: {
    breadcrumbs: [{ label: "Funzionalita", href: "/it/funzionalita" }, { label: "Distributori" }],
    businessModelItems: [
      "Relazione B2B: operi come partner indipendente con la tua struttura commerciale.",
      "Margine per licenza venduta e rinnovi annuali ricorrenti, secondo l'accordo di territorio.",
      "Supporto tecnico centralizzato: tu vendi e Winerim accompagna l'implementazione.",
      "Materiali co-branded: presentazione, argomenti, demo e asset commerciali.",
      "Possibilita di costruire una rete locale di subpartner dove il territorio lo consente.",
      "Follow-up commerciale congiunto nei primi mesi di attivazione.",
    ],
    essentialItems: [
      "Rete attiva in ristoranti, hotel, gruppi o canale HORECA.",
      "Esperienza B2B dimostrabile nella vendita consulenziale.",
      "Societa registrata e capacita di fatturazione locale.",
      "Lingua e conoscenza commerciale del mercato target.",
    ],
    desirableItems: [
      "Esperienza in vino, distribuzione, software hospitality o tecnologia per ristorazione.",
      "Capacita di aprire demo, meeting e piloti con account qualificati.",
      "Impegno su obiettivi di attivazione realistici per territorio.",
      "Team commerciale proprio o capacita di crearlo.",
    ],
    economicScenarios: [
      { clients: "50", annual: "12.500 - 15.000 EUR", label: "Avvio", desc: "Primo anno con portfolio iniziale e account vicini." },
      { clients: "150", annual: "37.500 - 45.000 EUR", label: "Consolidamento", desc: "Secondo anno con processo commerciale ripetibile." },
      { clients: "500", annual: "125.000 - 150.000 EUR", label: "Scala", desc: "Rete locale attiva e maggiore penetrazione del territorio." },
    ],
    renewalNote: "Il reddito dipende dall'accordo finale, dai rinnovi clienti e dalla capacita commerciale del partner.",
    processSteps: [
      { step: "01", title: "Conversazione iniziale", desc: "Comprendiamo la tua rete, il mercato e il fit con Winerim." },
      { step: "02", title: "Demo e piano territorio", desc: "Rivediamo prodotto, cliente target, obiezioni e strada di ingresso." },
      { step: "03", title: "Accordo di distribuzione", desc: "Definiamo condizioni, obiettivi, area e responsabilita." },
      { step: "04", title: "Onboarding commerciale", desc: "Ricevi materiali, formazione prodotto e argomentario di vendita." },
      { step: "05", title: "Prime account accompagnate", desc: "Il team centrale supporta prime demo, implementazioni e apprendimenti." },
    ],
    activeMarkets: [
      { flag: "MX", country: "Messico" },
      { flag: "IT", country: "Italia" },
      { flag: "PR", country: "Porto Rico" },
      { flag: "CH", country: "Svizzera" },
    ],
    faqTitle: "Domande frequenti per distributori Winerim",
    faqs: [
      { q: "Che tipo di partner e piu adatto?", a: "Distributori di vino, consulenti HORECA, aziende software hospitality e professionisti con accesso reale a ristoranti, hotel o gruppi." },
      { q: "Winerim sostituisce i fornitori del ristorante?", a: "No. Winerim aiuta a gestire carta, stock, margini e acquisti con dati. Il partner vende la piattaforma, non sostituisce i fornitori." },
      { q: "Esiste esclusivita territoriale?", a: "Puo esistere se mercato, capacita commerciale e obiettivi lo giustificano. Si definisce nell'accordo." },
      { q: "Che supporto riceve il distributore?", a: "Materiali commerciali, formazione prodotto, supporto nelle prime demo e accompagnamento nelle prime implementazioni." },
    ],
    internalLinks: [
      { to: "/it/prodotto/winerim-supply", label: "Winerim Supply: acquisti e distributori", type: "solution" },
      { to: "/it/prodotto/winerim-core", label: "Winerim Core: margine, stock e analytics", type: "solution" },
      { to: "/it/calcolatrice-margini-vino", label: "Calcolatore margini vino", type: "tool" },
      { to: "/it/demo", label: "Richiedi una demo", type: "solution" },
    ],
  },
  fr: {
    breadcrumbs: [{ label: "Fonctionnalites", href: "/fr/fonctionnalites" }, { label: "Distributeurs" }],
    businessModelItems: [
      "Relation B2B : vous travaillez comme partenaire independant avec votre propre structure commerciale.",
      "Marge par licence vendue et renouvellements annuels recurrents, selon l'accord de territoire.",
      "Support technique centralise : vous vendez et Winerim accompagne l'implementation.",
      "Supports co-brandes : presentation, arguments, demos et actifs commerciaux.",
      "Possibilite de creer un reseau local de sous-partenaires si le territoire le permet.",
      "Suivi commercial conjoint pendant les premiers mois d'activation.",
    ],
    essentialItems: [
      "Reseau actif dans restaurants, hotels, groupes ou canal HORECA.",
      "Experience B2B prouvee en vente consultative.",
      "Entreprise enregistree et capacite de facturation locale.",
      "Langue et connaissance commerciale du marche cible.",
    ],
    desirableItems: [
      "Experience vin, distribution, logiciel hospitality ou technologie restauration.",
      "Capacite a ouvrir demos, rendez-vous et pilotes avec comptes qualifies.",
      "Engagement sur objectifs d'activation realistes par territoire.",
      "Equipe commerciale propre ou capacite a la creer.",
    ],
    economicScenarios: [
      { clients: "50", annual: "12.500 - 15.000 EUR", label: "Lancement", desc: "Premiere annee avec portefeuille initial et comptes proches." },
      { clients: "150", annual: "37.500 - 45.000 EUR", label: "Consolidation", desc: "Deuxieme annee avec processus commercial repetable." },
      { clients: "500", annual: "125.000 - 150.000 EUR", label: "Echelle", desc: "Reseau local actif et penetration plus forte du territoire." },
    ],
    renewalNote: "Le revenu depend de l'accord final, du renouvellement client et de la capacite commerciale du partenaire.",
    processSteps: [
      { step: "01", title: "Conversation de decouverte", desc: "Nous comprenons votre reseau, votre marche et le fit avec Winerim." },
      { step: "02", title: "Demo et plan territoire", desc: "Nous revoyons produit, client cible, objections et route d'entree." },
      { step: "03", title: "Accord de distribution", desc: "Nous definissons conditions, objectifs, zone et responsabilites." },
      { step: "04", title: "Onboarding commercial", desc: "Vous recevez supports, formation produit et arguments de vente." },
      { step: "05", title: "Premiers comptes accompagnes", desc: "L'equipe centrale soutient les premieres demos, implementations et apprentissages." },
    ],
    activeMarkets: [
      { flag: "MX", country: "Mexique" },
      { flag: "IT", country: "Italie" },
      { flag: "PR", country: "Porto Rico" },
      { flag: "CH", country: "Suisse" },
    ],
    faqTitle: "Questions frequentes pour distributeurs Winerim",
    faqs: [
      { q: "Quel type de partenaire convient le mieux ?", a: "Distributeurs de vin, consultants HORECA, editeurs logiciels hospitality et professionnels avec acces reel aux restaurants, hotels ou groupes." },
      { q: "Winerim remplace-t-il les fournisseurs du restaurant ?", a: "Non. Winerim aide a gerer carte, stock, marge et achats avec donnees. Le partenaire vend la plateforme, il ne remplace pas les fournisseurs." },
      { q: "L'exclusivite territoriale est-elle possible ?", a: "Oui, si le marche, la capacite commerciale et les objectifs le justifient. Elle se definit dans l'accord." },
      { q: "Quel support recoit le distributeur ?", a: "Supports commerciaux, formation produit, support sur les premieres demos et accompagnement des premieres implementations." },
    ],
    internalLinks: [
      { to: "/fr/produit/winerim-supply", label: "Winerim Supply : achats et distributeurs", type: "solution" },
      { to: "/fr/produit/winerim-core", label: "Winerim Core : marge, stock et analytics", type: "solution" },
      { to: "/fr/calculateur-marge-vin", label: "Calculateur de marge vin", type: "tool" },
      { to: "/fr/demo", label: "Demander une demo", type: "solution" },
    ],
  },
  de: {
    breadcrumbs: [{ label: "Funktionen", href: "/de/funktionen" }, { label: "Distributoren" }],
    businessModelItems: [
      "B2B-Beziehung: Sie arbeiten als unabhaengiger Partner mit eigener Vertriebsstruktur.",
      "Marge pro verkaufter Lizenz und wiederkehrende Jahresverlaengerungen je nach Gebietsvertrag.",
      "Zentraler technischer Support: Sie verkaufen, Winerim begleitet die Implementierung.",
      "Co-Branded-Materialien: Praesentation, Argumente, Demos und Vertriebsassets.",
      "Moeglichkeit, ein lokales Subpartner-Netzwerk aufzubauen, wenn das Gebiet es erlaubt.",
      "Gemeinsames Vertriebs-Follow-up in den ersten Aktivierungsmonaten.",
    ],
    essentialItems: [
      "Aktives Netzwerk in Restaurants, Hotels, Gruppen oder HORECA-Kanaelen.",
      "Nachweisbare B2B-Erfahrung im beratenden Verkauf.",
      "Registriertes Unternehmen und lokale Rechnungsfaehigkeit.",
      "Sprach- und Marktkenntnis im Zielmarkt.",
    ],
    desirableItems: [
      "Erfahrung in Wein, Distribution, Hospitality-Software oder Restaurant-Technologie.",
      "Faehigkeit, Demos, Termine und Piloten mit qualifizierten Accounts zu eroeffnen.",
      "Commitment zu realistischen Aktivierungszielen je Gebiet.",
      "Eigenes Vertriebsteam oder Faehigkeit, eines aufzubauen.",
    ],
    economicScenarios: [
      { clients: "50", annual: "12.500 - 15.000 EUR", label: "Start", desc: "Erstes Jahr mit Anfangsportfolio und nahen Accounts." },
      { clients: "150", annual: "37.500 - 45.000 EUR", label: "Konsolidierung", desc: "Zweites Jahr mit wiederholbarem Vertriebsprozess." },
      { clients: "500", annual: "125.000 - 150.000 EUR", label: "Skalierung", desc: "Aktives lokales Netzwerk und tiefere Gebietsdurchdringung." },
    ],
    renewalNote: "Einnahmen haengen vom finalen Vertrag, Kundenerneuerung und der Vertriebsleistung des Partners ab.",
    processSteps: [
      { step: "01", title: "Discovery-Gespraech", desc: "Wir verstehen Ihr Netzwerk, Ihren Markt und den Fit mit Winerim." },
      { step: "02", title: "Demo und Gebietsplan", desc: "Wir pruefen Produkt, Kundentyp, Einwaende und Markteintritt." },
      { step: "03", title: "Distributionsvertrag", desc: "Wir definieren Konditionen, Ziele, Gebiet und Verantwortlichkeiten." },
      { step: "04", title: "Commercial Onboarding", desc: "Sie erhalten Materialien, Produktschulung und Vertriebsargumente." },
      { step: "05", title: "Erste Accounts mit Begleitung", desc: "Das zentrale Team unterstuetzt erste Demos, Implementierungen und Learnings." },
    ],
    activeMarkets: [
      { flag: "MX", country: "Mexiko" },
      { flag: "IT", country: "Italien" },
      { flag: "PR", country: "Puerto Rico" },
      { flag: "CH", country: "Schweiz" },
    ],
    faqTitle: "FAQ fuer Winerim Distributoren",
    faqs: [
      { q: "Welcher Partner passt am besten?", a: "Weindistributoren, HORECA-Berater, Hospitality-Softwareunternehmen und Profis mit echtem Zugang zu Restaurants, Hotels oder Gruppen." },
      { q: "Ersetzt Winerim Lieferantenbeziehungen?", a: "Nein. Winerim hilft bei Karte, Bestand, Marge und Einkauf mit Daten. Der Partner verkauft die Plattform, ersetzt aber keine Lieferanten." },
      { q: "Gibt es Gebietsexklusivitaet?", a: "Moeglich, wenn Markt, Vertriebsleistung und Ziele es rechtfertigen. Das wird im Vertrag definiert." },
      { q: "Welche Unterstuetzung erhaelt der Distributor?", a: "Vertriebsmaterialien, Produktschulung, Support bei ersten Demos und Begleitung der ersten Implementierungen." },
    ],
    internalLinks: [
      { to: "/de/produkt/winerim-supply", label: "Winerim Supply: Einkauf und Distributoren", type: "solution" },
      { to: "/de/produkt/winerim-core", label: "Winerim Core: Marge, Bestand und Analytics", type: "solution" },
      { to: "/de/wein-margen-rechner", label: "Wein-Margenrechner", type: "tool" },
      { to: "/de/demo", label: "Demo anfragen", type: "solution" },
    ],
  },
  pt: {
    breadcrumbs: [{ label: "Funcionalidades", href: "/pt/funcionalidades" }, { label: "Distribuidores" }],
    businessModelItems: [
      "Relacao B2B: trabalha como parceiro independente com a sua propria estrutura comercial.",
      "Margem por licenca vendida e renovacoes anuais recorrentes, segundo o acordo de territorio.",
      "Suporte tecnico centralizado: vende e a Winerim acompanha a implementacao.",
      "Materiais co-branded: apresentacao, argumentos, demos e ativos comerciais.",
      "Possibilidade de criar rede local de subparceiros se o territorio o permitir.",
      "Acompanhamento comercial conjunto nos primeiros meses de ativacao.",
    ],
    essentialItems: [
      "Rede ativa em restaurantes, hoteis, grupos ou canal HORECA.",
      "Experiencia B2B demonstravel em venda consultiva.",
      "Empresa registada e capacidade de faturacao local.",
      "Idioma e conhecimento comercial do mercado-alvo.",
    ],
    desirableItems: [
      "Experiencia em vinho, distribuicao, software hotelaria ou tecnologia para restauracao.",
      "Capacidade para abrir demos, reunioes e pilotos com contas qualificadas.",
      "Compromisso com objetivos realistas de ativacao por territorio.",
      "Equipa comercial propria ou capacidade para a criar.",
    ],
    economicScenarios: [
      { clients: "50", annual: "12.500 - 15.000 EUR", label: "Arranque", desc: "Primeiro ano com carteira inicial e contas proximas." },
      { clients: "150", annual: "37.500 - 45.000 EUR", label: "Consolidacao", desc: "Segundo ano com processo comercial repetivel." },
      { clients: "500", annual: "125.000 - 150.000 EUR", label: "Escala", desc: "Rede local ativa e maior penetracao no territorio." },
    ],
    renewalNote: "A receita depende do acordo final, da renovacao dos clientes e da capacidade comercial do parceiro.",
    processSteps: [
      { step: "01", title: "Conversa de descoberta", desc: "Entendemos a sua rede, mercado e encaixe com a Winerim." },
      { step: "02", title: "Demo e plano de territorio", desc: "Revemos produto, tipo de cliente, objecoes e rota de entrada." },
      { step: "03", title: "Acordo de distribuicao", desc: "Definimos condicoes, objetivos, zona e responsabilidades." },
      { step: "04", title: "Onboarding comercial", desc: "Recebe materiais, formacao de produto e argumentos de venda." },
      { step: "05", title: "Primeiras contas acompanhadas", desc: "A equipa central apoia primeiras demos, implementacoes e aprendizagens." },
    ],
    activeMarkets: [
      { flag: "MX", country: "Mexico" },
      { flag: "IT", country: "Italia" },
      { flag: "PR", country: "Porto Rico" },
      { flag: "CH", country: "Suica" },
    ],
    faqTitle: "Perguntas frequentes para distribuidores Winerim",
    faqs: [
      { q: "Que tipo de parceiro encaixa melhor?", a: "Distribuidores de vinho, consultores HORECA, empresas de software para hotelaria e profissionais com acesso real a restaurantes, hoteis ou grupos." },
      { q: "A Winerim substitui os fornecedores do restaurante?", a: "Nao. A Winerim ajuda a gerir carta, stock, margem e compras com dados. O parceiro vende a plataforma, nao substitui fornecedores." },
      { q: "Existe exclusividade territorial?", a: "Pode existir se mercado, capacidade comercial e objetivos o justificarem. Define-se no acordo de distribuicao." },
      { q: "Que suporte recebe o distribuidor?", a: "Materiais comerciais, formacao de produto, apoio nas primeiras demos e acompanhamento das primeiras implementacoes." },
    ],
    internalLinks: [
      { to: "/pt/produto/winerim-supply", label: "Winerim Supply: compras e distribuidores", type: "solution" },
      { to: "/pt/produto/winerim-core", label: "Winerim Core: margem, stock e analitica", type: "solution" },
      { to: "/pt/calculadora-margem-vinho", label: "Calculadora de margem de vinho", type: "tool" },
      { to: "/pt/demo", label: "Pedir demo", type: "solution" },
    ],
  },
};

const Check = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 size={18} className="text-wine shrink-0 mt-0.5" />
    <span className="text-sm text-muted-foreground leading-relaxed">{children}</span>
  </li>
);

const Distribuidor = () => {
  const { localePath, allLangPaths, lang } = useLanguage();
  const t = i18n[lang as keyof typeof i18n];
  const extra = pageExtras[lang] || pageExtras.es;

  const getWhatsappMessage = () => {
    switch(lang) {
      case 'en': return WA_MSG_EN;
      case 'de': return WA_MSG_DE;
      case 'pt': return WA_MSG_PT;
      case 'it':
      case 'fr':
      default: return WA_MSG_ES;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDescription}
        url={`${CANONICAL_DOMAIN}${localePath("/distribuidor")}`}
        hreflang={allLangPaths("/distribuidor")}
      />
      <Navbar />

      <main>
        {/* ── HERO ──────────────────────────────── */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={extra.breadcrumbs} />
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8">
                <Globe size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.distributorsLabel}</span>
              </span>
            </ScrollReveal>
            <ScrollReveal>
              <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8 max-w-4xl">
                {t.heroTitle}
              </h1>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-10">
                {t.heroSubtitle}
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${getWhatsappMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
                >
                  <MessageCircle size={16} /> {t.whatsapp}
                </a>
                <a
                  href="mailto:info@winerim.com?subject=Distribuidor%20Winerim"
                  className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                >
                  <Mail size={16} /> {t.email}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── LA OPORTUNIDAD ─────────────────────── */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                🌍 {t.opportunityLabel}
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-6">
                {t.opportunityTitle}
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  {t.opportunityText1}
                </p>
                <p>
                  {t.opportunityText2}
                </p>
                <p>
                  {t.opportunityText3}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── TU MODELO DE NEGOCIO ──────────────── */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                💼 {t.businessModelLabel}
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-8">
                {t.businessModelTitle}
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-10">
                <ul className="space-y-4">
                  {extra.businessModelItems.map((item) => <Check key={item}>{item}</Check>)}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── REQUISITOS ──────────────────────────── */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                📋 {t.requirementsLabel}
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-8">
                {t.requirementsTitle}
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-card rounded-2xl border border-border p-8">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Shield size={18} className="text-wine" /> {t.essentialLabel}
                  </h3>
                  <ul className="space-y-3">
                    {extra.essentialItems.map((item) => <Check key={item}>{item}</Check>)}
                  </ul>
                </div>
                <div className="bg-gradient-card rounded-2xl border border-border p-8">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Target size={18} className="text-wine" /> {t.desirableLabel}
                  </h3>
                  <ul className="space-y-3">
                    {extra.desirableItems.map((item) => <Check key={item}>{item}</Check>)}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── POTENCIAL ECONÓMICO ─────────────────── */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                📈 {t.economicPotentialLabel}
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                {t.economicPotentialTitle}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                {t.economicPotentialText}
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="grid sm:grid-cols-3 gap-6">
                {extra.economicScenarios.map((s) => (
                  <div key={s.clients} className="bg-gradient-card rounded-2xl border border-border p-7 text-center hover:border-wine/30 transition-all">
                    <span className="text-xs font-semibold tracking-widest uppercase text-wine">{s.label}</span>
                    <p className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">{s.clients}</p>
                    <p className="text-xs text-muted-foreground mb-3">clientes</p>
                    <p className="font-heading text-lg font-bold text-wine">{s.annual}</p>
                    <p className="text-xs text-muted-foreground">anuales</p>
                    <p className="text-xs text-muted-foreground mt-4 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-sm text-muted-foreground mt-6 text-center">
                {extra.renewalNote}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ── PROCESO DE SELECCIÓN ────────────────── */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                🔄 {t.processLabel}
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-10">
                {t.processTitle}
              </h2>
            </ScrollReveal>
            <div className="space-y-4">
              {extra.processSteps.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.04}>
                  <div className="flex items-start gap-5 bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/20 transition-all">
                    <span className="font-heading text-2xl font-bold text-wine shrink-0 w-10">{item.step}</span>
                    <div>
                      <h3 className="font-heading text-base font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── DISTRIBUIDORES ACTUALES ──────────────── */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold tracking-widest uppercase mb-4">
                🌎 {t.activeNetworkLabel}
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-4">
                {t.activeNetworkTitle}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
                {t.activeNetworkSubtitle}
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {extra.activeMarkets.map((d) => (
                  <div key={d.country} className="bg-gradient-card rounded-xl border border-border p-5 text-center">
                    <span className="text-xs font-semibold tracking-widest text-wine">{d.flag}</span>
                    <p className="font-heading font-bold text-foreground mt-2">{d.country}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="mt-8 max-w-xl mx-auto">
                <p className="text-sm text-muted-foreground mb-4">
                  💡 <strong className="text-foreground">{t.idealProfile}</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  📍 {t.lookingFor}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <FAQSection faqs={extra.faqs} title={extra.faqTitle} schemaId={`distributor-${lang}`} />
        <InternalLinks links={extra.internalLinks} />

        {/* ── CTA FINAL ──────────────────────────── */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-10 sm:p-14 md:p-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
                <div className="relative z-10">
                  <Rocket size={32} className="text-wine mx-auto mb-6" />
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-[1.15]">
                    {t.finalCTATitle}
                  </h2>
                  <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                    {t.finalCTASubtitle}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${getWhatsappMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
                    >
                      <MessageCircle size={16} /> {t.whatsappLabel}
                    </a>
                    <a
                      href="mailto:info@winerim.com?subject=Distribuidor%20Winerim"
                      className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/30 hover:text-wine transition-all"
                    >
                      <Mail size={16} /> {t.email}
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Distribuidor;
