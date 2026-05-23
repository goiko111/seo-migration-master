import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Globe, TrendingUp, Users, Shield, Briefcase, Target, Rocket, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { CANONICAL_DOMAIN } from "@/seo/config";

const WA_NUMBER = "34658718350";
const WA_MSG_ES = encodeURIComponent("Hola, me interesa ser distribuidor de Winerim. Podemos hablar?");
const WA_MSG_EN = encodeURIComponent("Hi, I am interested in becoming a Winerim distributor. Can we talk?");
const WA_MSG_DE = encodeURIComponent("Hallo, ich bin daran interessiert, Winerim-Distributor zu werden. Konnen wir sprechen?");
const WA_MSG_PT = encodeURIComponent("Ola, estou interessado em me tornar um distribuidor da Winerim. Podemos conversar?");

const i18n = {
  es: {
    seoTitle: "Se Distribuidor Exclusivo de Winerim",
    seoDescription: "Unete como distribuidor exclusivo de Winerim en tu territorio. Margenes del 25-30%, soporte tecnico, marketing co-branded y potencial de escalado real.",
    distributorsLabel: "Distribuidores 2025",
    heroTitle: "Se Distribuidor Exclusivo de Winerim",
    heroSubtitle: "El software de carta inteligente que estan adoptando los mejores restaurantes del mundo. Llevalo a tu mercado con exclusividad territorial.",
    whatsapp: "WhatsApp",
    email: "info@winerim.com",
    opportunityLabel: "La oportunidad",
    opportunityTitle: "Un mercado global de 15M+ restaurantes. La mayoria sin digitalizar.",
    opportunityText1: "El 90% de los restaurantes gestionan su carta de vinos con Excel, papel o intuicion. No tienen datos de rotacion, no conocen su margen real por referencia y pierden dinero cada mes con stock muerto.",
    opportunityText2: "Winerim resuelve esto. Una plataforma que conecta carta, stock, pricing, ventas y compras inteligentes en un solo ecosistema con IA. Ya opera en 15 paises y 4 idiomas.",
    opportunityText3: "Como distribuidor, tu llevas esta solucion a tu mercado con exclusividad territorial, margenes atractivos y soporte tecnico centralizado.",
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
    finalCTASubtitle: "Lleva Winerim a tu mercado. Exclusividad, margenes reales y un producto que se vende solo.",
    whatsappLabel: "WhatsApp: 658 718 350",
  },
  en: {
    seoTitle: "Become Exclusive Winerim Distributor",
    seoDescription: "Join as an exclusive Winerim distributor in your territory. 25-30% margins, technical support, co-branded marketing and real scaling potential.",
    distributorsLabel: "Distributors 2025",
    heroTitle: "Become Exclusive Winerim Distributor",
    heroSubtitle: "The smart menu software that top restaurants worldwide are adopting. Take it to your market with territorial exclusivity.",
    whatsapp: "WhatsApp",
    email: "info@winerim.com",
    opportunityLabel: "The Opportunity",
    opportunityTitle: "A global market of 15M+ restaurants. Most not yet digitalized.",
    opportunityText1: "90% of restaurants manage their wine lists with Excel, paper or intuition. They have no rotation data, don't know their real margins per item, and lose money every month with dead stock.",
    opportunityText2: "Winerim solves this. A platform that connects menu, inventory, pricing, sales and smart purchasing in one AI-powered ecosystem. Already operating in 15 countries and 4 languages.",
    opportunityText3: "As a distributor, you bring this solution to your market with territorial exclusivity, attractive margins and centralized technical support.",
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
    finalCTASubtitle: "Take Winerim to your market. Exclusivity, real margins and a product that sells itself.",
    whatsappLabel: "WhatsApp: 658 718 350",
  },
  it: {
    seoTitle: "Diventa Distributore Esclusivo di Winerim",
    seoDescription: "Unisciti come distributore esclusivo di Winerim nel tuo territorio. Margini del 25-30%, supporto tecnico, marketing co-branded e vero potenziale di scalabilita.",
    distributorsLabel: "Distributori 2025",
    heroTitle: "Diventa Distributore Esclusivo di Winerim",
    heroSubtitle: "Il software per menu intelligente che i migliori ristoranti del mondo stanno adottando. Portalo al tuo mercato con esclusivita territoriale.",
    whatsapp: "WhatsApp",
    email: "info@winerim.com",
    opportunityLabel: "L'Opportunita",
    opportunityTitle: "Un mercato globale di 15M+ ristoranti. La maggior parte non ancora digitalizzata.",
    opportunityText1: "Il 90% dei ristoranti gestisce le proprie liste di vini con Excel, carta o intuizione. Non hanno dati di rotazione, non conoscono i loro margini reali per articolo e perdono denaro ogni mese con giacenze morte.",
    opportunityText2: "Winerim risolve questo. Una piattaforma che connette menu, inventario, prezzi, vendite e acquisti intelligenti in un unico ecosistema basato su IA. Gia operativa in 15 paesi e 4 lingue.",
    opportunityText3: "Come distributore, porti questa soluzione al tuo mercato con esclusivita territoriale, margini interessanti e supporto tecnico centralizzato.",
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
    finalCTASubtitle: "Porta Winerim al tuo mercato. Esclusivita, margini reali e un prodotto che si vende da solo.",
    whatsappLabel: "WhatsApp: 658 718 350",
  },
  fr: {
    seoTitle: "Devenez Distributeur Exclusif Winerim",
    seoDescription: "Rejoignez en tant que distributeur exclusif de Winerim sur votre territoire. Marges de 25-30%, support technique, marketing co-marque et vrai potentiel d'evolutivite.",
    distributorsLabel: "Distributeurs 2025",
    heroTitle: "Devenez Distributeur Exclusif Winerim",
    heroSubtitle: "Le logiciel de menu intelligent que les meilleurs restaurants du monde adoptent. Amenez-le sur votre marche avec exclusivite territoriale.",
    whatsapp: "WhatsApp",
    email: "info@winerim.com",
    opportunityLabel: "L'Opportunite",
    opportunityTitle: "Un marche mondial de 15M+ restaurants. La plupart pas encore numerises.",
    opportunityText1: "90% des restaurants gerent leurs cartes des vins avec Excel, papier ou intuition. Ils n'ont pas de donnees de rotation, ne connaissent pas leurs marges reelles par article et perdent de l'argent chaque mois avec un stock mort.",
    opportunityText2: "Winerim resout cela. Une plateforme qui connecte le menu, l'inventaire, les prix, les ventes et les achats intelligents dans un seul ecosysteme base sur l'IA. Deja operationnelle dans 15 pays et 4 langues.",
    opportunityText3: "En tant que distributeur, vous apportez cette solution a votre marche avec exclusivite territoriale, marges attractives et support technique centralise.",
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
    finalCTASubtitle: "Amenez Winerim sur votre marche. Exclusivite, marges reelles et un produit qui se vend tout seul.",
    whatsappLabel: "WhatsApp: 658 718 350",
  },
  de: {
    seoTitle: "Werden Sie Winerim Exklusivdistributor",
    seoDescription: "Werden Sie Exklusivdistributor von Winerim in Ihrem Gebiet. 25-30% Margen, technischer Support, Co-Branding-Marketing und echtes Skalierungspotenzial.",
    distributorsLabel: "Distributoren 2025",
    heroTitle: "Werden Sie Winerim Exklusivdistributor",
    heroSubtitle: "Die intelligente Menusoftware, die die besten Restaurants der Welt ubernehmen. Bringen Sie sie mit territorialer Exklusivitat auf Ihren Markt.",
    whatsapp: "WhatsApp",
    email: "info@winerim.com",
    opportunityLabel: "Die Chance",
    opportunityTitle: "Ein globaler Markt mit 15 Millionen+ Restaurants. Die meisten nicht digitalisiert.",
    opportunityText1: "90% der Restaurants verwalten ihre Weinkarten mit Excel, Papier oder Intuition. Sie haben keine Rotationsdaten, kennen ihre echten Margen pro Artikel nicht und verlieren jeden Monat Geld mit totem Bestand.",
    opportunityText2: "Winerim lost das. Eine Plattform, die Menu, Inventar, Preisgestaltung, Verkaufe und intelligente Einkaufe in einem KI-gesteuerten Okosystem verbindet. Bereits in 15 Landern und 4 Sprachen am Markt.",
    opportunityText3: "Als Distributor bringen Sie diese Losung mit territorialer Exklusivitat, attraktiven Margen und zentralisiertem technischen Support auf Ihren Markt.",
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
    finalCTASubtitle: "Bringen Sie Winerim auf Ihren Markt. Exklusivitat, echte Margen und ein Produkt, das sich von selbst verkauft.",
    whatsappLabel: "WhatsApp: 658 718 350",
  },
  pt: {
    seoTitle: "Torne-se Distribuidor Exclusivo da Winerim",
    seoDescription: "Junte-se como distribuidor exclusivo da Winerim em seu territorio. Margens de 25-30%, suporte tecnico, marketing co-branded e verdadeiro potencial de escalabilidade.",
    distributorsLabel: "Distribuidores 2025",
    heroTitle: "Torne-se Distribuidor Exclusivo da Winerim",
    heroSubtitle: "O software de cardapio inteligente que os melhores restaurantes do mundo estao adotando. Traga para seu mercado com exclusividade territorial.",
    whatsapp: "WhatsApp",
    email: "info@winerim.com",
    opportunityLabel: "A Oportunidade",
    opportunityTitle: "Um mercado global de 15M+ restaurantes. A maioria ainda nao digitalizada.",
    opportunityText1: "90% dos restaurantes gerenciam suas cartas de vinhos com Excel, papel ou intuicao. Nao tem dados de rotacao, nao conhecem suas margens reais por item e perdem dinheiro todo mes com estoque parado.",
    opportunityText2: "Winerim resolve isso. Uma plataforma que conecta cardapio, inventario, precificacao, vendas e compras inteligentes em um unico ecosistema baseado em IA. Ja operacional em 15 paises e 4 idiomas.",
    opportunityText3: "Como distribuidor, voce leva essa solucao para seu mercado com exclusividade territorial, margens atrativas e suporte tecnico centralizado.",
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
    finalCTASubtitle: "Leve Winerim para seu mercado. Exclusividade, margens reais e um produto que se vende sozinho.",
    whatsappLabel: "WhatsApp: 658 718 350",
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
        url={`${CANONICAL_DOMAIN}/distribuidor`}
        hreflang={allLangPaths("/distribuidor")}
      />
      <Navbar />

      <main>
        {/* ── HERO ──────────────────────────────── */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
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
                  <strong className="text-foreground">Winerim resuelve esto.</strong> {t.opportunityText2}
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
                  <Check>B2B relationship: you are an independent distributor with your own structure</Check>
                  <Check>Margins of <strong className="text-foreground">25-30% per license</strong> sold</Check>
                  <Check>Centralized technical support — you sell, we implement</Check>
                  <Check>Co-branded marketing: materials with your brand + Winerim</Check>
                  <Check>Ability to create your own sub-distributor network</Check>
                  <Check>Recurring revenue: licenses are annual with automatic renewal</Check>
                  <Check>No billing limit — the more you sell, the more you earn</Check>
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
                    <Check>Established network in hospitality (restaurants, hotels, groups)</Check>
                    <Check>B2B distribution experience (5+ years)</Check>
                    <Check>Registered company in your country</Check>
                    <Check>Native language of target market</Check>
                  </ul>
                </div>
                <div className="bg-gradient-card rounded-2xl border border-border p-8">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Target size={18} className="text-wine" /> {t.desirableLabel}
                  </h3>
                  <ul className="space-y-3">
                    <Check>Initial startup capital (8,000-25,000EUR depending on country)</Check>
                    <Check>Commitment to annual acquisition targets</Check>
                    <Check>Knowledge of HORECA sector and its dynamics</Check>
                    <Check>Ability to build own sales team</Check>
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
                {[
                  { clients: "50", annual: "12.500 – 15.000€", label: "Arranque", desc: "Primer año, un distribuidor a tiempo parcial" },
                  { clients: "150", annual: "37.500 – 45.000€", label: "Consolidación", desc: "Segundo año con equipo comercial básico" },
                  { clients: "500", annual: "125.000 – 150.000€", label: "Escalado", desc: "Red de sub-distribuidores activa" },
                ].map((s) => (
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
                💡 Los ingresos son recurrentes: cada cliente que se renueva, sigues cobrando tu margen.
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
              {[
                { step: "01", title: "Conversación de descubrimiento", desc: "Nos conocemos, entendemos tu mercado y evaluamos el encaje mutuo." },
                { step: "02", title: "Demo + plan de lanzamiento", desc: "Te mostramos el producto en profundidad y diseñamos juntos el plan de go-to-market para tu territorio." },
                { step: "03", title: "Acuerdo de distribución", desc: "Firmamos el contrato con exclusividad territorial, condiciones claras y objetivos realistas." },
                { step: "04", title: "Onboarding + kit de materiales", desc: "Formación comercial y técnica completa. Kit de ventas co-branded listo para usar." },
                { step: "05", title: "Soporte intensivo 6 meses", desc: "Acompañamiento directo del equipo de Winerim durante los primeros 6 meses de operación." },
              ].map((item, i) => (
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
                {[
                  { flag: "🇲🇽", country: "México" },
                  { flag: "🇮🇹", country: "Italia" },
                  { flag: "🇵🇷", country: "Puerto Rico" },
                  { flag: "🇨🇭", country: "Suiza" },
                ].map((d) => (
                  <div key={d.country} className="bg-gradient-card rounded-xl border border-border p-5 text-center">
                    <span className="text-2xl">{d.flag}</span>
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
