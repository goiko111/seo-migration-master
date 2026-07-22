import type { SupportedLang } from "@/i18n/types";

type Card = { title: string; body: string };

type CapabilitySection = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Card[];
  outcomeLabel: string;
  outcome: string;
};

export type PresentationCapabilityDepth = {
  cloudrimFlow: string[];
  margins: CapabilitySection;
  supply: CapabilitySection;
  rims: CapabilitySection;
  savia: {
    eyebrow: string;
    title: string;
    subtitle: string;
    questions: string[];
    steps: Card[];
    approval: string;
    caption: string;
  };
};

export const PRESENTATION_CAPABILITY_DEPTH: Record<SupportedLang, PresentationCapabilityDepth> = {
  es: {
    cloudrimFlow: ["Recibe", "Clasifica", "Extrae", "Enruta", "Deja trazabilidad"],
    margins: {
      eyebrow: "Márgenes",
      title: "Saber qué vino deja dinero, cuál lo inmoviliza y por qué",
      subtitle: "Winerim cruza coste real, PVP, formatos, ventas, stock y rotación. El margen deja de ser una cifra aislada y se convierte en una decisión por referencia.",
      items: [
        { title: "Margen real", body: "Lee botella y copa con coste actualizado, descuentos, merma y contribución económica." },
        { title: "Erosión detectada", body: "Avisa cuando sube el coste, el PVP queda atrás o una compra deteriora la rentabilidad." },
        { title: "Capital inmovilizado", body: "Combina cobertura, días sin venta y valor de stock para cuantificar dinero parado." },
        { title: "Escenarios antes de actuar", body: "Simula precio, copa, visibilidad, reposición o retirada antes de tocar la carta." },
      ],
      outcomeLabel: "Decisiones que prepara",
      outcome: "Mantener · impulsar · pasar a copa · renegociar · ajustar PVP · no reponer · retirar",
    },
    supply: {
      eyebrow: "Winerim Supply",
      title: "Comprar con demanda, margen y stock en la misma conversación",
      subtitle: "Supply convierte tarifas, distribuidores, compras y consumo real en criterio de aprovisionamiento. No recomienda por precio unitario, sino por impacto operativo completo.",
      items: [
        { title: "Compara coste real", body: "Tarifa, portes, mínimos, disponibilidad, condiciones y sustituciones por proveedor." },
        { title: "Lee demanda y cobertura", body: "Cruza ventas, velocidad de salida, existencias y días de stock antes de reponer." },
        { title: "Protege la rentabilidad", body: "Señala sobreprecios, cambios de coste y compras que erosionan el margen objetivo." },
        { title: "Prepara el pedido", body: "Propone qué reponer, renegociar, sustituir o dejar de comprar, siempre para revisión." },
      ],
      outcomeLabel: "Resultado",
      outcome: "Menos sobrestock · menos roturas · mejor negociación · pedidos trazables",
    },
    rims: {
      eyebrow: "RIMs™",
      title: "Motores especializados para cada señal del negocio del vino",
      subtitle: "Cada RIM™ observa una lógica distinta. SmartRIM™ resuelve prioridades y combina señales para que margen, stock, contexto y experiencia no compitan entre sí.",
      items: [
        { title: "MarginRIM™", body: "Detecta contribución, erosión y oportunidades de rentabilidad." },
        { title: "StockRIM™", body: "Identifica exceso, baja rotación y riesgo de inmovilización." },
        { title: "FocusRIM™", body: "Prioriza referencias según el objetivo comercial activo." },
        { title: "ClimateRIM™", body: "Adapta relevancia a temperatura y contexto real de consumo." },
        { title: "CleanRIM™", body: "Prepara acciones para últimas unidades y stock que conviene mover." },
        { title: "SmartRIM™", body: "Orquesta los motores, resuelve conflictos y explica la prioridad." },
      ],
      outcomeLabel: "Cadena de decisión",
      outcome: "Señal → contexto → propuesta medible → preview → aprobación humana",
    },
    savia: {
      eyebrow: "SAVia",
      title: "Pregunta al negocio del vino, no a otro dashboard",
      subtitle: "SAVia conversa con la carta, ventas, stock, costes, márgenes, albaranes, facturas y señales RIM para explicar qué ocurre y preparar la siguiente decisión.",
      questions: [
        "¿Qué vinos llevan más de 30 días sin rotar y cuánto capital inmovilizan?",
        "¿Qué referencias han perdido margen desde la última factura?",
        "¿Qué debería reponer, renegociar o impulsar esta semana?",
        "¿Qué cambiaría en carta y rentabilidad si aplico esta propuesta?",
      ],
      steps: [
        { title: "Consulta", body: "Lee los datos conectados y conserva el contexto de local, periodo y objetivo." },
        { title: "Explica", body: "Muestra evidencia, impacto esperado y alternativas en lenguaje operativo." },
        { title: "Prepara", body: "Genera preview, informe o propuesta para que el responsable decida." },
      ],
      approval: "SAVia no cambia precios, stock, documentos, carta ni RIMs sin aprobación humana.",
      caption: "Conversación y respuesta real de SAVia dentro de Winerim.",
    },
  },
  en: {
    cloudrimFlow: ["Receives", "Classifies", "Extracts", "Routes", "Keeps an audit trail"],
    margins: {
      eyebrow: "Margins",
      title: "Know which wine creates value, which ties up cash and why",
      subtitle: "Winerim combines true cost, selling price, formats, sales, stock and rotation. Margin becomes a reference-level decision rather than an isolated number.",
      items: [
        { title: "True margin", body: "Reads bottle and glass with current cost, discounts, waste and economic contribution." },
        { title: "Erosion detected", body: "Flags cost increases, outdated selling prices and purchases that weaken profitability." },
        { title: "Tied-up capital", body: "Combines cover, days without sales and stock value to quantify sleeping cash." },
        { title: "Scenarios before action", body: "Simulates price, by-the-glass, visibility, replenishment or withdrawal before changing the list." },
      ],
      outcomeLabel: "Decisions prepared",
      outcome: "Keep · push · move to glass · renegotiate · adjust price · stop reordering · remove",
    },
    supply: {
      eyebrow: "Winerim Supply",
      title: "Purchase with demand, margin and stock in the same conversation",
      subtitle: "Supply turns catalogues, suppliers, purchasing and real consumption into replenishment criteria. It reads total operating impact, not unit price alone.",
      items: [
        { title: "Compare true cost", body: "Catalogue, delivery, minimums, availability, terms and substitutions by supplier." },
        { title: "Read demand and cover", body: "Combines sales, velocity, available units and days of stock before reordering." },
        { title: "Protect profitability", body: "Flags overpricing, cost changes and purchases that erode target margin." },
        { title: "Prepare the order", body: "Proposes what to reorder, renegotiate, replace or stop buying for review." },
      ],
      outcomeLabel: "Outcome",
      outcome: "Less overstock · fewer stockouts · stronger negotiation · traceable orders",
    },
    rims: {
      eyebrow: "RIMs™",
      title: "Specialist engines for every signal in the wine business",
      subtitle: "Each RIM™ follows a different logic. SmartRIM™ resolves priorities and combines signals so margin, stock, context and experience work together.",
      items: [
        { title: "MarginRIM™", body: "Detects contribution, erosion and profitability opportunities." },
        { title: "StockRIM™", body: "Identifies excess, slow rotation and immobilisation risk." },
        { title: "FocusRIM™", body: "Prioritises references against the active commercial objective." },
        { title: "ClimateRIM™", body: "Adapts relevance to temperature and real consumption context." },
        { title: "CleanRIM™", body: "Prepares actions for last units and stock worth moving." },
        { title: "SmartRIM™", body: "Orchestrates engines, resolves conflicts and explains priority." },
      ],
      outcomeLabel: "Decision chain",
      outcome: "Signal → context → measurable proposal → preview → human approval",
    },
    savia: {
      eyebrow: "SAVia",
      title: "Ask the wine business, not another dashboard",
      subtitle: "SAVia works with the list, sales, stock, costs, margins, delivery notes, invoices and RIM signals to explain what is happening and prepare the next decision.",
      questions: [
        "Which wines have not moved for 30 days and how much capital do they tie up?",
        "Which references lost margin after the latest invoice?",
        "What should I replenish, renegotiate or push this week?",
        "What would change in the list and profitability if I apply this proposal?",
      ],
      steps: [
        { title: "Consult", body: "Reads connected data while preserving venue, period and objective context." },
        { title: "Explain", body: "Shows evidence, expected impact and alternatives in operating language." },
        { title: "Prepare", body: "Creates a preview, report or proposal for the owner to decide." },
      ],
      approval: "SAVia does not change prices, stock, documents, the list or RIMs without human approval.",
      caption: "A real SAVia conversation and answer inside Winerim.",
    },
  },
  fr: {
    cloudrimFlow: ["Reçoit", "Classe", "Extrait", "Route", "Conserve la traçabilité"],
    margins: {
      eyebrow: "Marges", title: "Savoir quel vin crée de la valeur, lequel immobilise du cash et pourquoi", subtitle: "Winerim croise coût réel, prix, formats, ventes, stock et rotation. La marge devient une décision par référence.",
      items: [
        { title: "Marge réelle", body: "Lit bouteille et verre avec coût actualisé, remises, pertes et contribution." },
        { title: "Érosion détectée", body: "Alerte sur les hausses de coût, prix dépassés et achats qui dégradent la rentabilité." },
        { title: "Capital immobilisé", body: "Croise couverture, jours sans vente et valeur du stock pour chiffrer le cash dormant." },
        { title: "Scénarios avant action", body: "Simule prix, verre, visibilité, reassort ou retrait avant de modifier la carte." },
      ], outcomeLabel: "Décisions préparées", outcome: "Maintenir · pousser · passer au verre · renégocier · ajuster · ne plus commander · retirer",
    },
    supply: {
      eyebrow: "Winerim Supply", title: "Acheter avec demande, marge et stock dans la même conversation", subtitle: "Supply transforme tarifs, fournisseurs, achats et consommation réelle en critères de réassort, au-delà du seul prix unitaire.",
      items: [
        { title: "Comparer le coût réel", body: "Tarif, transport, minimums, disponibilité, conditions et substitutions." },
        { title: "Lire demande et couverture", body: "Croise ventes, vitesse, unités et jours de stock avant le reassort." },
        { title: "Protéger la rentabilité", body: "Signale surcoûts, changements de coût et achats qui érodent la marge." },
        { title: "Préparer la commande", body: "Propose quoi recommander, renégocier, remplacer ou arrêter d'acheter." },
      ], outcomeLabel: "Résultat", outcome: "Moins de surstock · moins de ruptures · meilleure négociation · commandes traçables",
    },
    rims: {
      eyebrow: "RIMs™", title: "Des moteurs spécialisés pour chaque signal du business vin", subtitle: "Chaque RIM™ suit une logique. SmartRIM™ combine les signaux afin que marge, stock, contexte et expérience travaillent ensemble.",
      items: [
        { title: "MarginRIM™", body: "Détecte contribution, érosion et opportunités de rentabilité." },
        { title: "StockRIM™", body: "Identifie excès, faible rotation et risque d'immobilisation." },
        { title: "FocusRIM™", body: "Priorise les références selon l'objectif commercial actif." },
        { title: "ClimateRIM™", body: "Adapte la pertinence à la météo et au contexte de consommation." },
        { title: "CleanRIM™", body: "Prépare les actions sur dernières unités et stock à déplacer." },
        { title: "SmartRIM™", body: "Orchestre les moteurs, résout les conflits et explique la priorité." },
      ], outcomeLabel: "Chaîne de décision", outcome: "Signal → contexte → proposition mesurable → aperçu → validation humaine",
    },
    savia: {
      eyebrow: "SAVia", title: "Interrogez le business du vin, pas un autre tableau de bord", subtitle: "SAVia dialogue avec carte, ventes, stock, coûts, marges, bons, factures et signaux RIM pour expliquer et préparer la prochaine décision.",
      questions: ["Quels vins ne tournent plus depuis 30 jours et quel capital bloquent-ils ?", "Quelles références ont perdu de la marge depuis la dernière facture ?", "Que faut-il recommander, renégocier ou pousser cette semaine ?", "Quel serait l'impact de cette proposition sur la carte et la rentabilité ?"],
      steps: [{ title: "Consulte", body: "Lit les données connectées avec le contexte du site, de la période et de l'objectif." }, { title: "Explique", body: "Montre preuves, impact attendu et alternatives en langage opérationnel." }, { title: "Prépare", body: "Crée aperçu, rapport ou proposition pour validation." }],
      approval: "SAVia ne change ni prix, stock, documents, carte ou RIMs sans validation humaine.", caption: "Conversation et réponse réelles de SAVia dans Winerim.",
    },
  },
  it: {
    cloudrimFlow: ["Riceve", "Classifica", "Estrae", "Instrada", "Mantiene la tracciabilità"],
    margins: {
      eyebrow: "Margini", title: "Sapere quale vino crea valore, quale immobilizza denaro e perché", subtitle: "Winerim incrocia costo reale, prezzo, formati, vendite, stock e rotazione. Il margine diventa una decisione per referenza.",
      items: [{ title: "Margine reale", body: "Legge bottiglia e calice con costo aggiornato, sconti, sprechi e contributo." }, { title: "Erosione rilevata", body: "Avvisa su aumenti di costo, prezzi arretrati e acquisti che riducono la redditività." }, { title: "Capitale immobilizzato", body: "Combina copertura, giorni senza vendita e valore stock per quantificare il denaro fermo." }, { title: "Scenari prima di agire", body: "Simula prezzo, calice, visibilità, riordino o ritiro prima di cambiare la carta." }],
      outcomeLabel: "Decisioni preparate", outcome: "Mantenere · spingere · passare al calice · rinegoziare · adeguare · non riordinare · ritirare",
    },
    supply: {
      eyebrow: "Winerim Supply", title: "Acquistare con domanda, margine e stock nella stessa conversazione", subtitle: "Supply trasforma listini, fornitori, acquisti e consumo reale in criteri di approvvigionamento, non solo prezzo unitario.",
      items: [{ title: "Confronta il costo reale", body: "Listino, trasporto, minimi, disponibilità, condizioni e sostituzioni." }, { title: "Legge domanda e copertura", body: "Incrocia vendite, velocità, unità e giorni di stock prima del riordino." }, { title: "Protegge la redditività", body: "Segnala sovrapprezzi, cambi di costo e acquisti che erodono il margine." }, { title: "Prepara l'ordine", body: "Propone cosa riordinare, rinegoziare, sostituire o non acquistare più." }],
      outcomeLabel: "Risultato", outcome: "Meno sovrastock · meno rotture · migliore negoziazione · ordini tracciabili",
    },
    rims: {
      eyebrow: "RIMs™", title: "Motori specializzati per ogni segnale del business del vino", subtitle: "Ogni RIM™ segue una logica diversa. SmartRIM™ combina i segnali perché margine, stock, contesto ed esperienza lavorino insieme.",
      items: [{ title: "MarginRIM™", body: "Rileva contributo, erosione e opportunità di redditività." }, { title: "StockRIM™", body: "Individua eccesso, bassa rotazione e rischio di immobilizzo." }, { title: "FocusRIM™", body: "Prioritizza le referenze secondo l'obiettivo commerciale." }, { title: "ClimateRIM™", body: "Adatta la rilevanza al clima e al contesto di consumo." }, { title: "CleanRIM™", body: "Prepara azioni per ultime unità e stock da muovere." }, { title: "SmartRIM™", body: "Orchestra i motori, risolve conflitti e spiega la priorità." }],
      outcomeLabel: "Catena decisionale", outcome: "Segnale → contesto → proposta misurabile → anteprima → approvazione umana",
    },
    savia: {
      eyebrow: "SAVia", title: "Interroga il business del vino, non un altro dashboard", subtitle: "SAVia dialoga con carta, vendite, stock, costi, margini, documenti e segnali RIM per spiegare e preparare la prossima decisione.",
      questions: ["Quali vini non ruotano da 30 giorni e quanto capitale bloccano?", "Quali referenze hanno perso margine dopo l'ultima fattura?", "Cosa devo riordinare, rinegoziare o spingere questa settimana?", "Cosa cambia in carta e redditività se applico questa proposta?"],
      steps: [{ title: "Consulta", body: "Legge i dati connessi con contesto di locale, periodo e obiettivo." }, { title: "Spiega", body: "Mostra evidenze, impatto previsto e alternative in linguaggio operativo." }, { title: "Prepara", body: "Crea anteprima, report o proposta per la decisione." }],
      approval: "SAVia non cambia prezzi, stock, documenti, carta o RIMs senza approvazione umana.", caption: "Conversazione e risposta reali di SAVia in Winerim.",
    },
  },
  de: {
    cloudrimFlow: ["Empfängt", "Klassifiziert", "Extrahiert", "Leitet weiter", "Dokumentiert"],
    margins: {
      eyebrow: "Margen", title: "Wissen, welcher Wein Wert schafft, Kapital bindet und warum", subtitle: "Winerim verbindet reale Kosten, Verkaufspreis, Formate, Absatz, Bestand und Rotation. Marge wird zur Entscheidung pro Referenz.",
      items: [{ title: "Echte Marge", body: "Liest Flasche und Glas mit aktuellen Kosten, Rabatten, Schwund und Beitrag." }, { title: "Erosion erkannt", body: "Warnt bei Kostenanstieg, veraltetem Preis und margenschwachem Einkauf." }, { title: "Gebundenes Kapital", body: "Verbindet Reichweite, Tage ohne Verkauf und Bestandswert." }, { title: "Szenarien vor der Aktion", body: "Simuliert Preis, Offenausschank, Sichtbarkeit, Nachkauf oder Entfernung." }],
      outcomeLabel: "Vorbereitete Entscheidungen", outcome: "Halten · fördern · offen anbieten · neu verhandeln · Preis anpassen · nicht nachkaufen · entfernen",
    },
    supply: {
      eyebrow: "Winerim Supply", title: "Einkaufen mit Nachfrage, Marge und Bestand in einer Sicht", subtitle: "Supply macht aus Preislisten, Lieferanten, Einkauf und Verbrauch Beschaffungskriterien statt nur Stückpreisvergleich.",
      items: [{ title: "Echte Kosten vergleichen", body: "Preisliste, Lieferung, Mindestmengen, Verfügbarkeit, Konditionen und Ersatz." }, { title: "Nachfrage und Reichweite", body: "Verbindet Absatz, Geschwindigkeit, Einheiten und Bestandstage vor dem Nachkauf." }, { title: "Rentabilität schützen", body: "Markiert Überpreise, Kostenänderungen und margenschwache Einkäufe." }, { title: "Bestellung vorbereiten", body: "Schlägt Nachkauf, Neuverhandlung, Ersatz oder Kaufstopp zur Prüfung vor." }],
      outcomeLabel: "Ergebnis", outcome: "Weniger Überbestand · weniger Fehlbestand · bessere Verhandlung · nachvollziehbare Bestellungen",
    },
    rims: {
      eyebrow: "RIMs™", title: "Spezialisierte Engines für jedes Signal im Weingeschäft", subtitle: "Jedes RIM™ folgt einer eigenen Logik. SmartRIM™ kombiniert Signale, damit Marge, Bestand, Kontext und Erlebnis zusammenarbeiten.",
      items: [{ title: "MarginRIM™", body: "Erkennt Beitrag, Erosion und Margenchancen." }, { title: "StockRIM™", body: "Erkennt Überschuss, langsame Rotation und Kapitalrisiko." }, { title: "FocusRIM™", body: "Priorisiert Referenzen nach aktivem Geschäftsziel." }, { title: "ClimateRIM™", body: "Passt Relevanz an Wetter und Konsumkontext an." }, { title: "CleanRIM™", body: "Bereitet Aktionen für Restmengen und zu bewegenden Bestand vor." }, { title: "SmartRIM™", body: "Orchestriert Engines, löst Konflikte und erklärt Prioritäten." }],
      outcomeLabel: "Entscheidungskette", outcome: "Signal → Kontext → messbarer Vorschlag → Vorschau → menschliche Freigabe",
    },
    savia: {
      eyebrow: "SAVia", title: "Fragen Sie das Weingeschäft, nicht ein weiteres Dashboard", subtitle: "SAVia verbindet Karte, Verkauf, Bestand, Kosten, Margen, Belege und RIM-Signale, um die nächste Entscheidung zu erklären und vorzubereiten.",
      questions: ["Welche Weine laufen seit 30 Tagen nicht und wie viel Kapital binden sie?", "Welche Referenzen verloren nach der letzten Rechnung Marge?", "Was sollte diese Woche nachgekauft, neu verhandelt oder gefördert werden?", "Wie verändern sich Karte und Rentabilität mit diesem Vorschlag?"],
      steps: [{ title: "Abfragen", body: "Liest verbundene Daten mit Standort-, Zeitraum- und Zielkontext." }, { title: "Erklären", body: "Zeigt Belege, erwartete Wirkung und Alternativen operativ verständlich." }, { title: "Vorbereiten", body: "Erstellt Vorschau, Bericht oder Vorschlag zur Entscheidung." }],
      approval: "SAVia ändert Preise, Bestand, Dokumente, Karte oder RIMs nie ohne menschliche Freigabe.", caption: "Echte SAVia-Konversation und Antwort in Winerim.",
    },
  },
  pt: {
    cloudrimFlow: ["Recebe", "Classifica", "Extrai", "Encaminha", "Mantém rastreabilidade"],
    margins: {
      eyebrow: "Margens", title: "Saber que vinho cria valor, qual imobiliza dinheiro e porquê", subtitle: "A Winerim cruza custo real, preço, formatos, vendas, stock e rotação. A margem torna-se uma decisão por referência.",
      items: [{ title: "Margem real", body: "Lê garrafa e copo com custo atualizado, descontos, perdas e contribuição." }, { title: "Erosão detetada", body: "Alerta para aumentos de custo, preço desatualizado e compras que reduzem rentabilidade." }, { title: "Capital imobilizado", body: "Combina cobertura, dias sem venda e valor de stock para quantificar dinheiro parado." }, { title: "Cenários antes de agir", body: "Simula preço, copo, visibilidade, reposição ou retirada antes de alterar a carta." }],
      outcomeLabel: "Decisões preparadas", outcome: "Manter · impulsionar · passar a copo · renegociar · ajustar · não repor · retirar",
    },
    supply: {
      eyebrow: "Winerim Supply", title: "Comprar com procura, margem e stock na mesma conversa", subtitle: "Supply transforma tabelas, distribuidores, compras e consumo real em critérios de aprovisionamento, para além do preço unitário.",
      items: [{ title: "Comparar custo real", body: "Tabela, transporte, mínimos, disponibilidade, condições e substituições." }, { title: "Ler procura e cobertura", body: "Cruza vendas, velocidade, unidades e dias de stock antes da reposição." }, { title: "Proteger rentabilidade", body: "Sinaliza sobrepreços, mudanças de custo e compras que reduzem a margem." }, { title: "Preparar pedido", body: "Propõe o que repor, renegociar, substituir ou deixar de comprar." }],
      outcomeLabel: "Resultado", outcome: "Menos excesso · menos ruturas · melhor negociação · pedidos rastreáveis",
    },
    rims: {
      eyebrow: "RIMs™", title: "Motores especializados para cada sinal do negócio do vinho", subtitle: "Cada RIM™ segue uma lógica. SmartRIM™ combina sinais para que margem, stock, contexto e experiência trabalhem em conjunto.",
      items: [{ title: "MarginRIM™", body: "Deteta contribuição, erosão e oportunidades de rentabilidade." }, { title: "StockRIM™", body: "Identifica excesso, baixa rotação e risco de imobilização." }, { title: "FocusRIM™", body: "Prioriza referências segundo o objetivo comercial ativo." }, { title: "ClimateRIM™", body: "Adapta relevância ao clima e contexto de consumo." }, { title: "CleanRIM™", body: "Prepara ações para últimas unidades e stock a mover." }, { title: "SmartRIM™", body: "Orquestra motores, resolve conflitos e explica prioridades." }],
      outcomeLabel: "Cadeia de decisão", outcome: "Sinal → contexto → proposta mensurável → prévia → aprovação humana",
    },
    savia: {
      eyebrow: "SAVia", title: "Pergunte ao negócio do vinho, não a outro dashboard", subtitle: "SAVia conversa com carta, vendas, stock, custos, margens, guias, faturas e sinais RIM para explicar e preparar a próxima decisão.",
      questions: ["Que vinhos não rodam há 30 dias e quanto capital imobilizam?", "Que referências perderam margem desde a última fatura?", "O que devo repor, renegociar ou impulsionar esta semana?", "O que muda na carta e rentabilidade se aplicar esta proposta?"],
      steps: [{ title: "Consulta", body: "Lê dados ligados com contexto de local, período e objetivo." }, { title: "Explica", body: "Mostra evidência, impacto previsto e alternativas em linguagem operacional." }, { title: "Prepara", body: "Cria prévia, relatório ou proposta para decisão." }],
      approval: "SAVia não altera preços, stock, documentos, carta ou RIMs sem aprovação humana.", caption: "Conversa e resposta reais de SAVia dentro da Winerim.",
    },
  },
};
