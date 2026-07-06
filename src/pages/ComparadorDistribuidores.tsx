import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, CheckCircle, ClipboardList, Scale, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CANONICAL_DOMAIN } from "@/seo/config";
import { trackAction } from "@/lib/intentTracking";
import { useLanguage } from "@/i18n/LanguageContext";
import type { I18nMap } from "@/i18n/types";
import { getI18n } from "@/i18n/types";

type Distributor = {
  name: string;
  references: string;
  price: string;
  service: string;
  docs: string;
  unique: string;
  rotation: string;
};

type DistributorField = Exclude<keyof Distributor, "name">;
type InternalLinkType = "guide" | "tool" | "resource" | "solution" | "decision-center";

type Copy = {
  seo: {
    title: string;
    description: string;
  };
  breadcrumbs: {
    tools: string;
    self: string;
  };
  initialRows: Distributor[];
  labels: {
    badge: string;
    distributor: string;
    updateRanking: string;
    supplyButton: string;
  };
  headers: {
    h1: string;
    subtitle: string;
    scoringTitle: string;
    scoringHelp: string;
  };
  fields: Record<DistributorField, string>;
  actions: {
    prioritize: string;
    maintain: string;
    review: string;
  };
  metrics: {
    bestFit: string;
    evaluatedReferences: string;
    supplierToReview: string;
    mainAction: string;
  };
  cards: {
    title: string;
    text: string;
  }[];
  cta: {
    badge: string;
    title: string;
    description: string;
    auditButton: string;
    cloudrimButton: string;
  };
  faq: {
    q: string;
    a: string;
  }[];
  internalLinks: {
    title: string;
    links: {
      to: string;
      label: string;
      type: InternalLinkType;
    }[];
  };
};

const copy: I18nMap<Copy> = {
  es: {
    seo: {
      title: "Comparador de distribuidores de vino",
      description: "Compara distribuidores por precio, servicio, documentación, referencias diferenciales y rotación real para priorizar compras de vino.",
    },
    breadcrumbs: {
      tools: "Herramientas",
      self: "Comparador de distribuidores",
    },
    initialRows: [
      { name: "Distribuidor A", references: "42", price: "7", service: "8", docs: "6", unique: "9", rotation: "7" },
      { name: "Distribuidor B", references: "28", price: "8", service: "6", docs: "9", unique: "5", rotation: "6" },
      { name: "Distribuidor C", references: "18", price: "5", service: "9", docs: "7", unique: "4", rotation: "4" },
    ],
    labels: {
      badge: "Demo · Winerim Supply",
      distributor: "Distribuidor",
      updateRanking: "Actualizar ranking",
      supplyButton: "Ver Winerim Supply",
    },
    headers: {
      h1: "Comparador de distribuidores",
      subtitle: "Evalúa qué proveedor aporta más valor real a tu carta: precio, servicio, orden documental, referencias diferenciales y vinos que sí rotan.",
      scoringTitle: "Puntúa tus proveedores",
      scoringHelp: "Usa notas de 0 a 10 salvo el número de referencias.",
    },
    fields: {
      references: "Refs.",
      price: "Precio",
      service: "Servicio",
      docs: "Docs.",
      unique: "Diferencial",
      rotation: "Rotación",
    },
    actions: {
      prioritize: "Priorizar y negociar condiciones de crecimiento",
      maintain: "Mantener, pero revisar solapes y precios",
      review: "Revisar: posible simplificación o renegociación",
    },
    metrics: {
      bestFit: "Mejor encaje",
      evaluatedReferences: "Refs. evaluadas",
      supplierToReview: "Proveedor a revisar",
      mainAction: "Acción principal",
    },
    cards: [
      { title: "Precio real", text: "No mires solo descuento: compara coste, formato, servicio y referencias que realmente rotan." },
      { title: "Servicio", text: "Retrasos, pedidos incompletos y documentación desordenada también son coste operativo." },
      { title: "Catálogo", text: "Detecta solapes, huecos y proveedores que aportan vinos diferenciales a tu propuesta." },
    ],
    cta: {
      badge: "Distribuidores y compras",
      title: "En Winerim el proveedor se compara contra la carta viva.",
      description: "CloudRIM y Winerim Supply conectan catálogos, albaranes, facturas, costes, referencias y stock para decidir qué proveedor conviene en cada momento.",
      auditButton: "Descargar auditoría de distribuidores",
      cloudrimButton: "Ver CloudRIM",
    },
    faq: [
      {
        q: "¿Qué significa referencia diferencial?",
        a: "Una referencia que aporta algo que no cubren otros proveedores: estilo, DO, formato, margen, disponibilidad o encaje con tu propuesta.",
      },
      {
        q: "¿El proveedor con mejor precio siempre gana?",
        a: "No. Un proveedor barato puede salir caro si genera errores de albarán, roturas de stock o referencias que no rotan.",
      },
      {
        q: "¿Cómo lo haría Winerim con datos reales?",
        a: "Cruza catálogo, costes, stock, ventas, albaranes y facturas para comparar proveedores con evidencia continua.",
      },
    ],
    internalLinks: {
      title: "Sigue afinando compras",
      links: [
        { to: "/herramientas/calculadora-compra-inteligente", label: "Calculadora de compra inteligente", type: "tool" },
        { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: "Checklist albaranes y facturas", type: "resource" },
        { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
        { to: "/distribuidor", label: "Winerim para distribuidores", type: "solution" },
      ],
    },
  },
  en: {
    seo: {
      title: "Wine Distributor Comparator",
      description: "Compare wine suppliers by price, service, documentation, distinctive references and real rotation to prioritize purchasing decisions.",
    },
    breadcrumbs: {
      tools: "Tools",
      self: "Distributor comparator",
    },
    initialRows: [
      { name: "Distributor A", references: "42", price: "7", service: "8", docs: "6", unique: "9", rotation: "7" },
      { name: "Distributor B", references: "28", price: "8", service: "6", docs: "9", unique: "5", rotation: "6" },
      { name: "Distributor C", references: "18", price: "5", service: "9", docs: "7", unique: "4", rotation: "4" },
    ],
    labels: {
      badge: "Demo · Winerim Supply",
      distributor: "Distributor",
      updateRanking: "Update ranking",
      supplyButton: "See Winerim Supply",
    },
    headers: {
      h1: "Distributor comparator",
      subtitle: "Evaluate which supplier brings the most real value to your list: price, service, document order, distinctive references and wines that actually rotate.",
      scoringTitle: "Score your suppliers",
      scoringHelp: "Use scores from 0 to 10 except for the number of references.",
    },
    fields: {
      references: "Refs.",
      price: "Price",
      service: "Service",
      docs: "Docs",
      unique: "Distinctive",
      rotation: "Rotation",
    },
    actions: {
      prioritize: "Prioritize and negotiate growth conditions",
      maintain: "Keep, but review overlaps and prices",
      review: "Review: possible simplification or renegotiation",
    },
    metrics: {
      bestFit: "Best fit",
      evaluatedReferences: "Refs. evaluated",
      supplierToReview: "Supplier to review",
      mainAction: "Main action",
    },
    cards: [
      { title: "Real price", text: "Do not look only at discount: compare cost, format, service and references that actually rotate." },
      { title: "Service", text: "Delays, incomplete orders and disordered documentation are also operational costs." },
      { title: "Catalogue", text: "Spot overlaps, gaps and suppliers that add distinctive wines to your proposition." },
    ],
    cta: {
      badge: "Distributors and purchasing",
      title: "In Winerim, each supplier is compared against the live wine list.",
      description: "CloudRIM and Winerim Supply connect catalogues, delivery notes, invoices, costs, references and stock to decide which supplier makes sense at each moment.",
      auditButton: "Download distributor audit",
      cloudrimButton: "See CloudRIM",
    },
    faq: [
      {
        q: "What does a distinctive reference mean?",
        a: "A reference that covers something other suppliers do not: style, appellation, format, margin, availability or fit with your proposition.",
      },
      {
        q: "Does the supplier with the best price always win?",
        a: "No. A cheap supplier can become expensive if it creates delivery note errors, stockouts or references that do not rotate.",
      },
      {
        q: "How would Winerim do this with real data?",
        a: "It cross-references catalogue, costs, stock, sales, delivery notes and invoices to compare suppliers with continuous evidence.",
      },
    ],
    internalLinks: {
      title: "Keep refining purchasing",
      links: [
        { to: "/herramientas/calculadora-compra-inteligente", label: "Smart purchasing calculator", type: "tool" },
        { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: "Delivery notes and invoices checklist", type: "resource" },
        { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
        { to: "/distribuidor", label: "Winerim for distributors", type: "solution" },
      ],
    },
  },
  it: {
    seo: {
      title: "Comparatore distributori di vino",
      description: "Confronta i fornitori di vino per prezzo, servizio, documentazione, referenze differenzianti e rotazione reale per dare priorità agli acquisti.",
    },
    breadcrumbs: {
      tools: "Strumenti",
      self: "Comparatore distributori",
    },
    initialRows: [
      { name: "Distributore A", references: "42", price: "7", service: "8", docs: "6", unique: "9", rotation: "7" },
      { name: "Distributore B", references: "28", price: "8", service: "6", docs: "9", unique: "5", rotation: "6" },
      { name: "Distributore C", references: "18", price: "5", service: "9", docs: "7", unique: "4", rotation: "4" },
    ],
    labels: {
      badge: "Demo · Winerim Supply",
      distributor: "Distributore",
      updateRanking: "Aggiorna ranking",
      supplyButton: "Vedi Winerim Supply",
    },
    headers: {
      h1: "Comparatore distributori",
      subtitle: "Valuta quale fornitore porta più valore reale alla tua carta: prezzo, servizio, ordine documentale, referenze differenzianti e vini che ruotano davvero.",
      scoringTitle: "Valuta i tuoi fornitori",
      scoringHelp: "Usa punteggi da 0 a 10, tranne per il numero di referenze.",
    },
    fields: {
      references: "Ref.",
      price: "Prezzo",
      service: "Servizio",
      docs: "Doc.",
      unique: "Differenziale",
      rotation: "Rotazione",
    },
    actions: {
      prioritize: "Dare priorità e negoziare condizioni di crescita",
      maintain: "Mantenere, ma rivedere sovrapposizioni e prezzi",
      review: "Rivedere: possibile semplificazione o rinegoziazione",
    },
    metrics: {
      bestFit: "Miglior fit",
      evaluatedReferences: "Ref. valutate",
      supplierToReview: "Fornitore da rivedere",
      mainAction: "Azione principale",
    },
    cards: [
      { title: "Prezzo reale", text: "Non guardare solo lo sconto: confronta costo, formato, servizio e referenze che ruotano davvero." },
      { title: "Servizio", text: "Ritardi, ordini incompleti e documentazione disordinata sono anche costo operativo." },
      { title: "Catalogo", text: "Individua sovrapposizioni, vuoti e fornitori che aggiungono vini differenzianti alla tua proposta." },
    ],
    cta: {
      badge: "Distributori e acquisti",
      title: "In Winerim il fornitore si confronta con la carta viva.",
      description: "CloudRIM e Winerim Supply collegano cataloghi, documenti di consegna, fatture, costi, referenze e stock per decidere quale fornitore conviene in ogni momento.",
      auditButton: "Scarica audit distributori",
      cloudrimButton: "Vedi CloudRIM",
    },
    faq: [
      {
        q: "Cosa significa referenza differenziante?",
        a: "Una referenza che copre qualcosa che altri fornitori non coprono: stile, denominazione, formato, margine, disponibilità o fit con la tua proposta.",
      },
      {
        q: "Il fornitore con il prezzo migliore vince sempre?",
        a: "No. Un fornitore economico può diventare caro se genera errori nei documenti, rotture di stock o referenze che non ruotano.",
      },
      {
        q: "Come lo farebbe Winerim con dati reali?",
        a: "Incrocia catalogo, costi, stock, vendite, documenti di consegna e fatture per confrontare fornitori con evidenza continua.",
      },
    ],
    internalLinks: {
      title: "Continua ad affinare gli acquisti",
      links: [
        { to: "/herramientas/calculadora-compra-inteligente", label: "Calcolatrice acquisto intelligente", type: "tool" },
        { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: "Checklist documenti e fatture", type: "resource" },
        { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
        { to: "/distribuidor", label: "Winerim per distributori", type: "solution" },
      ],
    },
  },
  fr: {
    seo: {
      title: "Comparateur de distributeurs de vin",
      description: "Comparez les fournisseurs de vin par prix, service, documentation, références différenciantes et rotation réelle pour prioriser les achats.",
    },
    breadcrumbs: {
      tools: "Outils",
      self: "Comparateur distributeurs",
    },
    initialRows: [
      { name: "Distributeur A", references: "42", price: "7", service: "8", docs: "6", unique: "9", rotation: "7" },
      { name: "Distributeur B", references: "28", price: "8", service: "6", docs: "9", unique: "5", rotation: "6" },
      { name: "Distributeur C", references: "18", price: "5", service: "9", docs: "7", unique: "4", rotation: "4" },
    ],
    labels: {
      badge: "Démo · Winerim Supply",
      distributor: "Distributeur",
      updateRanking: "Mettre à jour le classement",
      supplyButton: "Voir Winerim Supply",
    },
    headers: {
      h1: "Comparateur distributeurs",
      subtitle: "Évaluez quel fournisseur apporte le plus de valeur réelle à votre carte : prix, service, ordre documentaire, références différenciantes et vins qui tournent vraiment.",
      scoringTitle: "Notez vos fournisseurs",
      scoringHelp: "Utilisez des notes de 0 à 10, sauf pour le nombre de références.",
    },
    fields: {
      references: "Réf.",
      price: "Prix",
      service: "Service",
      docs: "Docs",
      unique: "Différenciant",
      rotation: "Rotation",
    },
    actions: {
      prioritize: "Prioriser et négocier des conditions de croissance",
      maintain: "Conserver, mais revoir les doublons et les prix",
      review: "Revoir : simplification ou renégociation possible",
    },
    metrics: {
      bestFit: "Meilleur fit",
      evaluatedReferences: "Réf. évaluées",
      supplierToReview: "Fournisseur à revoir",
      mainAction: "Action principale",
    },
    cards: [
      { title: "Prix réel", text: "Ne regardez pas seulement la remise : comparez coût, format, service et références qui tournent vraiment." },
      { title: "Service", text: "Retards, commandes incomplètes et documentation désordonnée sont aussi des coûts opérationnels." },
      { title: "Catalogue", text: "Repérez les doublons, les manques et les fournisseurs qui apportent des vins différenciants à votre proposition." },
    ],
    cta: {
      badge: "Distributeurs et achats",
      title: "Dans Winerim, le fournisseur se compare à la carte vivante.",
      description: "CloudRIM et Winerim Supply connectent catalogues, bons de livraison, factures, coûts, références et stock pour décider quel fournisseur est pertinent à chaque moment.",
      auditButton: "Télécharger l'audit distributeurs",
      cloudrimButton: "Voir CloudRIM",
    },
    faq: [
      {
        q: "Que signifie référence différenciante ?",
        a: "Une référence qui couvre quelque chose que les autres fournisseurs ne couvrent pas : style, appellation, format, marge, disponibilité ou adéquation avec votre proposition.",
      },
      {
        q: "Le fournisseur au meilleur prix gagne-t-il toujours ?",
        a: "Non. Un fournisseur bon marché peut coûter cher s'il génère des erreurs de bons de livraison, des ruptures de stock ou des références qui ne tournent pas.",
      },
      {
        q: "Comment Winerim le ferait-il avec des données réelles ?",
        a: "Il croise catalogue, coûts, stock, ventes, bons de livraison et factures pour comparer les fournisseurs avec une évidence continue.",
      },
    ],
    internalLinks: {
      title: "Continuez à affiner vos achats",
      links: [
        { to: "/herramientas/calculadora-compra-inteligente", label: "Calculateur achat intelligent", type: "tool" },
        { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: "Checklist bons et factures", type: "resource" },
        { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
        { to: "/distribuidor", label: "Winerim pour distributeurs", type: "solution" },
      ],
    },
  },
  de: {
    seo: {
      title: "Wein-Distributoren-Vergleich",
      description: "Vergleichen Sie Weinlieferanten nach Preis, Service, Dokumentation, differenzierenden Referenzen und realer Rotation, um Einkaufsentscheidungen zu priorisieren.",
    },
    breadcrumbs: {
      tools: "Werkzeuge",
      self: "Distributoren-Vergleich",
    },
    initialRows: [
      { name: "Distributor A", references: "42", price: "7", service: "8", docs: "6", unique: "9", rotation: "7" },
      { name: "Distributor B", references: "28", price: "8", service: "6", docs: "9", unique: "5", rotation: "6" },
      { name: "Distributor C", references: "18", price: "5", service: "9", docs: "7", unique: "4", rotation: "4" },
    ],
    labels: {
      badge: "Demo · Winerim Supply",
      distributor: "Distributor",
      updateRanking: "Ranking aktualisieren",
      supplyButton: "Winerim Supply ansehen",
    },
    headers: {
      h1: "Distributoren-Vergleich",
      subtitle: "Bewerten Sie, welcher Lieferant Ihrer Weinkarte den größten realen Wert bringt: Preis, Service, Dokumentenordnung, differenzierende Referenzen und Weine, die wirklich rotieren.",
      scoringTitle: "Bewerten Sie Ihre Lieferanten",
      scoringHelp: "Nutzen Sie Werte von 0 bis 10, außer bei der Anzahl der Referenzen.",
    },
    fields: {
      references: "Refs.",
      price: "Preis",
      service: "Service",
      docs: "Dok.",
      unique: "Differenz.",
      rotation: "Rotation",
    },
    actions: {
      prioritize: "Priorisieren und Wachstumsbedingungen verhandeln",
      maintain: "Behalten, aber Überschneidungen und Preise prüfen",
      review: "Prüfen: mögliche Vereinfachung oder Neuverhandlung",
    },
    metrics: {
      bestFit: "Beste Passung",
      evaluatedReferences: "Bewertete Refs.",
      supplierToReview: "Zu prüfender Lieferant",
      mainAction: "Hauptaktion",
    },
    cards: [
      { title: "Realer Preis", text: "Schauen Sie nicht nur auf den Rabatt: Vergleichen Sie Kosten, Format, Service und Referenzen, die wirklich rotieren." },
      { title: "Service", text: "Verspätungen, unvollständige Bestellungen und ungeordnete Dokumentation sind ebenfalls operative Kosten." },
      { title: "Katalog", text: "Erkennen Sie Überschneidungen, Lücken und Lieferanten, die differenzierende Weine zu Ihrem Angebot beitragen." },
    ],
    cta: {
      badge: "Distributoren und Einkauf",
      title: "In Winerim wird der Lieferant mit der lebenden Weinkarte verglichen.",
      description: "CloudRIM und Winerim Supply verbinden Kataloge, Lieferscheine, Rechnungen, Kosten, Referenzen und Bestand, um zu entscheiden, welcher Lieferant gerade passt.",
      auditButton: "Distributoren-Audit herunterladen",
      cloudrimButton: "CloudRIM ansehen",
    },
    faq: [
      {
        q: "Was bedeutet differenzierende Referenz?",
        a: "Eine Referenz, die etwas abdeckt, das andere Lieferanten nicht abdecken: Stil, Herkunft, Format, Marge, Verfügbarkeit oder Passung zu Ihrem Angebot.",
      },
      {
        q: "Gewinnt immer der Lieferant mit dem besten Preis?",
        a: "Nein. Ein günstiger Lieferant kann teuer werden, wenn er Lieferscheinfehler, Bestandslücken oder Referenzen erzeugt, die nicht rotieren.",
      },
      {
        q: "Wie würde Winerim das mit echten Daten machen?",
        a: "Es verknüpft Katalog, Kosten, Bestand, Verkäufe, Lieferscheine und Rechnungen, um Lieferanten mit kontinuierlicher Evidenz zu vergleichen.",
      },
    ],
    internalLinks: {
      title: "Einkauf weiter verfeinern",
      links: [
        { to: "/herramientas/calculadora-compra-inteligente", label: "Rechner für intelligenten Einkauf", type: "tool" },
        { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: "Lieferscheine- und Rechnungscheckliste", type: "resource" },
        { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
        { to: "/distribuidor", label: "Winerim für Distributoren", type: "solution" },
      ],
    },
  },
  pt: {
    seo: {
      title: "Comparador de distribuidores de vinho",
      description: "Compare fornecedores de vinho por preço, serviço, documentação, referências diferenciais e rotação real para priorizar compras.",
    },
    breadcrumbs: {
      tools: "Ferramentas",
      self: "Comparador de distribuidores",
    },
    initialRows: [
      { name: "Distribuidor A", references: "42", price: "7", service: "8", docs: "6", unique: "9", rotation: "7" },
      { name: "Distribuidor B", references: "28", price: "8", service: "6", docs: "9", unique: "5", rotation: "6" },
      { name: "Distribuidor C", references: "18", price: "5", service: "9", docs: "7", unique: "4", rotation: "4" },
    ],
    labels: {
      badge: "Demo · Winerim Supply",
      distributor: "Distribuidor",
      updateRanking: "Atualizar ranking",
      supplyButton: "Ver Winerim Supply",
    },
    headers: {
      h1: "Comparador de distribuidores",
      subtitle: "Avalie que fornecedor traz mais valor real à sua carta: preço, serviço, ordem documental, referências diferenciais e vinhos que rodam de facto.",
      scoringTitle: "Pontue os seus fornecedores",
      scoringHelp: "Use notas de 0 a 10, exceto no número de referências.",
    },
    fields: {
      references: "Refs.",
      price: "Preço",
      service: "Serviço",
      docs: "Docs.",
      unique: "Diferencial",
      rotation: "Rotação",
    },
    actions: {
      prioritize: "Priorizar e negociar condições de crescimento",
      maintain: "Manter, mas rever sobreposições e preços",
      review: "Rever: possível simplificação ou renegociação",
    },
    metrics: {
      bestFit: "Melhor encaixe",
      evaluatedReferences: "Refs. avaliadas",
      supplierToReview: "Fornecedor a rever",
      mainAction: "Ação principal",
    },
    cards: [
      { title: "Preço real", text: "Não olhe apenas para o desconto: compare custo, formato, serviço e referências que rodam realmente." },
      { title: "Serviço", text: "Atrasos, encomendas incompletas e documentação desorganizada também são custo operacional." },
      { title: "Catálogo", text: "Detete sobreposições, lacunas e fornecedores que acrescentam vinhos diferenciais à sua proposta." },
    ],
    cta: {
      badge: "Distribuidores e compras",
      title: "Na Winerim, o fornecedor é comparado com a carta viva.",
      description: "CloudRIM e Winerim Supply ligam catálogos, guias de remessa, faturas, custos, referências e stock para decidir que fornecedor convém em cada momento.",
      auditButton: "Descarregar auditoria de distribuidores",
      cloudrimButton: "Ver CloudRIM",
    },
    faq: [
      {
        q: "O que significa referência diferencial?",
        a: "Uma referência que cobre algo que outros fornecedores não cobrem: estilo, denominação, formato, margem, disponibilidade ou encaixe com a sua proposta.",
      },
      {
        q: "O fornecedor com melhor preço ganha sempre?",
        a: "Não. Um fornecedor barato pode sair caro se gera erros em guias de remessa, ruturas de stock ou referências que não rodam.",
      },
      {
        q: "Como faria a Winerim com dados reais?",
        a: "Cruza catálogo, custos, stock, vendas, guias de remessa e faturas para comparar fornecedores com evidência contínua.",
      },
    ],
    internalLinks: {
      title: "Continue a afinar compras",
      links: [
        { to: "/herramientas/calculadora-compra-inteligente", label: "Calculadora de compra inteligente", type: "tool" },
        { to: "/recursos/checklist-albaranes-facturas-coste-vino", label: "Checklist guias e faturas", type: "resource" },
        { to: "/producto/winerim-supply", label: "Winerim Supply", type: "solution" },
        { to: "/distribuidor", label: "Winerim para distribuidores", type: "solution" },
      ],
    },
  },
};

const numberValue = (value: string) => {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

const clamp = (value: number, min = 0, max = 10) => Math.min(max, Math.max(min, value));

const ComparadorDistribuidores = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(copy, lang);
  const [rows, setRows] = useState<Distributor[]>(t.initialRows);

  useEffect(() => {
    setRows(t.initialRows);
  }, [lang, t.initialRows]);

  const results = useMemo(() => {
    return rows
      .map((row) => {
        const references = numberValue(row.references);
        const score =
          clamp(numberValue(row.price)) * 0.25 +
          clamp(numberValue(row.service)) * 0.2 +
          clamp(numberValue(row.docs)) * 0.2 +
          clamp(numberValue(row.unique)) * 0.2 +
          clamp(numberValue(row.rotation)) * 0.15;
        const normalized = Math.round(score * 10);
        const action =
          normalized >= 78
            ? t.actions.prioritize
            : normalized >= 62
              ? t.actions.maintain
              : t.actions.review;
        return { ...row, references, score: normalized, action };
      })
      .sort((a, b) => b.score - a.score);
  }, [rows, t.actions]);

  const best = results[0];
  const worst = results[results.length - 1];
  const totalReferences = results.reduce((sum, row) => sum + row.references, 0);
  const fieldEntries = Object.entries(t.fields) as [DistributorField, string][];
  const cardIcons = [Scale, Truck, ClipboardList];

  const updateRow = (index: number, key: keyof Distributor, value: string) => {
    setRows((current) => current.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title={t.seo.title}
        description={t.seo.description}
        url={`${CANONICAL_DOMAIN}${localePath("/herramientas/comparador-distribuidores")}`}
        hreflang={allLangPaths("/herramientas/comparador-distribuidores")}
      />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: t.breadcrumbs.tools, href: localePath("/herramientas") }, { label: t.breadcrumbs.self }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              {t.labels.badge}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold mb-6 max-w-4xl">
              {t.headers.h1}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {t.headers.subtitle}
            </motion.p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20 grid xl:grid-cols-[1.2fr_0.8fr] gap-8">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                  <Building2 size={20} className="text-wine" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold">{t.headers.scoringTitle}</h2>
                  <p className="text-sm text-muted-foreground">{t.headers.scoringHelp}</p>
                </div>
              </div>

              <div className="space-y-5">
                {rows.map((row, index) => (
                  <div key={index} className="rounded-lg border border-border bg-background/60 p-4">
                    <div className="grid md:grid-cols-[1.1fr_repeat(6,minmax(0,0.75fr))] gap-3">
                      <div className="space-y-2">
                        <Label htmlFor={`dist-${index}`}>{t.labels.distributor}</Label>
                        <Input id={`dist-${index}`} value={row.name} onChange={(e) => updateRow(index, "name", e.target.value)} />
                      </div>
                      {fieldEntries.map(([key, label]) => (
                        <div key={key} className="space-y-2">
                          <Label htmlFor={`${key}-${index}`}>{label}</Label>
                          <Input
                            id={`${key}-${index}`}
                            inputMode="decimal"
                            value={row[key]}
                            onChange={(e) => updateRow(index, key, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="mt-6 w-full bg-wine hover:bg-wine/90"
                onClick={() => trackAction("tool_use", "tool", "comparador-distribuidores")}
              >
                {t.labels.updateRanking}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-xl border border-border bg-gradient-card p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">{t.metrics.bestFit}</p>
                  <h2 className="font-heading text-2xl font-semibold">{best.name}</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle size={14} />
                  {best.score}/100
                </span>
              </div>

              <div className="grid sm:grid-cols-3 xl:grid-cols-1 gap-3 mb-6">
                <div className="rounded-lg bg-background/70 border border-border p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.metrics.evaluatedReferences}</p>
                  <p className="text-2xl font-semibold mt-1">{totalReferences}</p>
                </div>
                <div className="rounded-lg bg-background/70 border border-border p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.metrics.supplierToReview}</p>
                  <p className="text-lg font-semibold mt-1">{worst.name}</p>
                </div>
                <div className="rounded-lg bg-background/70 border border-border p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.metrics.mainAction}</p>
                  <p className="text-sm font-medium mt-1">{best.action}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {results.map((row, index) => (
                  <div key={row.name} className="rounded-lg border border-border bg-background/70 p-4">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="font-semibold">{index + 1}. {row.name}</p>
                      <p className="font-semibold text-wine">{row.score}/100</p>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden mb-2">
                      <div className="h-full bg-wine" style={{ width: `${row.score}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground">{row.action}</p>
                  </div>
                ))}
              </div>

              <Button asChild className="w-full bg-wine hover:bg-wine/90">
                <Link to={localePath("/producto/winerim-supply")}>
                  {t.labels.supplyButton}
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-3 gap-5">
            {t.cards.map((item, index) => {
              const Icon = cardIcons[index] || Scale;
              return (
                <ScrollReveal key={item.title}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full">
                    <Icon size={22} className="text-wine mb-4" />
                    <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
          <div className="rounded-2xl border border-wine/20 bg-wine text-white p-8 md:p-10">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4">{t.cta.badge}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-white/80 leading-relaxed max-w-3xl mb-6">
              {t.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to={localePath("/recursos/auditoria-distribuidores-catalogo")}>{t.cta.auditButton}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10">
                <Link to={localePath("/producto/cloudrim")}>{t.cta.cloudrimButton}</Link>
              </Button>
            </div>
          </div>
        </section>

        <FAQSection
          schemaId="comparador-distribuidores"
          faqs={t.faq}
        />

        <InternalLinks
          title={t.internalLinks.title}
          links={t.internalLinks.links.map((link) => ({ ...link, to: localePath(link.to) }))}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ComparadorDistribuidores;
