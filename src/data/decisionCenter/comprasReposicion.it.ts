import { ShoppingCart } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const comprasReposicionIT: DeepAreaContent = {
  name: "Acquisti e riassortimento",
  tagline: "Acquista con i dati, non con l'intuizione",
  intro: "Questa sezione ti aiuta a prendere migliori decisioni di acquisto e riassortimento. Non si tratta di comprare a buon mercato: si tratta di comprare ciò che si venderà, al prezzo giusto, nella quantità giusta. Ogni decisione d'acquisto impatta direttamente sul tuo margine, sullo stock e sulla coerenza della tua carta dei vini.",
  icon: ShoppingCart,
  accent: "text-blue-500",
  bg: "bg-blue-500/10",
  audiences: ["compras-fb", "direccion"],
  topErrors: [
    { error: "Comprare per abitudine o pressione del fornitore", porQueOcurre: "Perché il fornitore chiama ogni settimana ed è più facile ripetere l'ordine che rivederlo. La routine sostituisce l'analisi.", consecuencia: "La tua cantina si riempie di ciò che ti vendono, non di ciò che ti serve. Lo stock cresce senza relazione con la domanda reale." },
    { error: "Valutare i fornitori solo per prezzo di listino", porQueOcurre: "Perché il prezzo per bottiglia è il dato più visibile. Ma ignori spedizioni, minimi, sconti quantità, termini di pagamento e resi.", consecuencia: "Scegli il fornitore 'più economico' che in realtà ti costa di più per bottiglia servita quando sommi tutto." },
    { error: "Non incrociare gli ordini con i dati di vendita", porQueOcurre: "Perché acquisti e sala operano come reparti separati. Chi ordina non guarda cosa si vende.", consecuencia: "Compri ciò che non si vende e resti senza ciò che si chiede. Il disallineamento cresce ordine dopo ordine." },
    { error: "Riassortire senza verificare lo stock attuale in cantina", porQueOcurre: "Perché contare lo stock richiede tempo e sembra inutile quando 'ne serve sempre'. Ma spesso ne hai già abbastanza.", consecuencia: "Accumuli eccesso di stock su referenze che avevi già coperte. Il capitale si blocca inutilmente." },
    { error: "Negoziare solo quando c'è un problema", porQueOcurre: "Perché il rapporto con il fornitore è dato per stabile. Si rivede solo quando c'è un errore o un aumento di prezzo.", consecuencia: "Perdi l'opportunità di migliorare le condizioni in modo proattivo. Il fornitore presume che tu sia soddisfatto e non ti offre nulla di meglio." },
  ],
  links: [
    { label: "Winerim Supply", href: "/producto/winerim-supply", description: "Intelligenza acquisti: comparazione prezzi, alert sovrapprezzi e riassortimento basato sui dati", type: "product" },
    { label: "Calcolatore acquisto intelligente", href: "/herramientas/calculadora-compra-inteligente", description: "Valuta se un acquisto ha senso incrociando rotazione, margine e stock attuale", type: "tool" },
    { label: "Template: Controllo gruppo ristorazione", href: "/recursos/plantilla-control-grupo-restauracion", description: "Coordina acquisti e assortimento tra locali dello stesso gruppo", type: "resource" },
    { label: "Template: Revisione mensile carta", href: "/recursos/plantilla-revision-mensual-carta", description: "Processo mensile per collegare performance della carta con decisioni d'acquisto", type: "resource" },
    { label: "Blog: Stai comprando male il vino?", href: "/blog/como-saber-si-estas-comprando-mal-vino-restaurante", description: "Segnali che il tuo processo d'acquisto ha bisogno di una revisione", type: "article" },
    { label: "Blog: Quali vini vale la pena riassortire?", href: "/blog/que-vinos-merece-la-pena-reponer", description: "Criteri per decidere cosa entra e cosa esce dal tuo prossimo ordine", type: "article" },
  ],
  miniCases: [
    {
      profile: "Gruppo casual con 4 locali",
      situation: "Ogni locale ordinava dal fornitore separatamente, senza coordinarsi. Lo stesso vino veniva acquistato a 3 prezzi diversi a seconda di chi negoziava.",
      action: "Ha centralizzato gli acquisti delle 15 referenze comuni. Ha negoziato un prezzo unico con volume aggregato e spedizione inclusa.",
      result: "Risparmio medio dell'11% sul costo d'acquisto. 4.200 €/anno solo sulle referenze condivise.",
    },
    {
      profile: "Ristorante gastronomico indipendente",
      situation: "Il sommelier comprava per intuizione e catalogo. Non incrociava mai l'ordine con i dati di vendita. Risultato: il 30% dell'ordine mensile andava a referenze con bassa rotazione.",
      action: "Prima di ogni ordine, esporta la top 20 per rotazione e l'elenco dello stock morto. Riassortisce solo ciò che ruota e prova 2 nuove referenze al mese.",
      result: "Ha ridotto l'ordine mensile del 20% senza perdere vendite. L'investimento si concentra su ciò che funziona.",
    },
  ],
  subtopics: [
    {
      id: "comprando-mal",
      title: "Come capire se stai comprando male",
      priority: "inmediato",
      porQueTeLoMostramos: { detected: "Winerim ha incrociato i tuoi ordini recenti con i dati di vendita e ha rilevato che parte del tuo budget va a referenze senza domanda reale.", whyMatters: "Se compri male, lo stock si gonfia, il margine si comprime e la carta si riempie di ciò che nessuno ordina.", riskIfIgnored: "Ogni ordine per inerzia finanzia un errore ricorrente che erode la tua redditività mese dopo mese." },
      queSignifica:
        "Comprare male non è solo pagare troppo. È comprare ciò che non si vende, in quantità che non servono, da fornitori che non hai confrontato, o riassortire per inerzia senza guardare i dati. Il segnale più chiaro di un acquisto sbagliato è uno stock che cresce mentre le vendite no. Se la tua cantina è più piena ogni mese ma il ticket medio non sale, qualcosa non va negli acquisti.",
      porQueImporta:
        "Perché l'acquisto è la prima decisione che condiziona tutto il resto. Se compri male, lo stock si gonfia, il margine si comprime e la carta si riempie di referenze che nessuno chiede. Correggere gli acquisti ha un effetto cascata positivo su tutta l'operazione: stock migliore, margine migliore, carta migliore.",
      queHacer: [
        "Incrocia il tuo ultimo ordine con i dati di vendita degli ultimi 30 giorni. Quante referenze ordinate non avevano domanda reale?",
        "Calcola quale percentuale del tuo budget d'acquisto va a referenze con rotazione bassa o nulla.",
        "Identifica se hai rotture di stock su referenze che i tuoi clienti chiedono (segnale che compri le cose sbagliate).",
        "Verifica se riassortisci per inerzia (stesso ordine ogni mese) o per dati (adattandoti alla domanda reale).",
      ],
      errores: [
        { mistake: "Ripetere lo stesso ordine ogni mese senza rivedere le vendite", consequence: "Accumuli ciò che non si vende e resti senza ciò che si chiede." },
        { mistake: "Comprare in volume per ottenere uno sconto senza domanda reale", consequence: "Lo sconto del 10% non compensa 6 mesi di stock fermo." },
        { mistake: "Nessuna visibilità sullo stock in cantina prima di ordinare", consequence: "Duplichi stock su referenze che già avevi, bloccando capitale." },
      ],
    },
    {
      id: "cuando-no-reponer",
      title: "Quando non riassortire una referenza",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim ha rilevato referenze con rotazione bassa sostenuta che continuano a essere riassortite automaticamente.", whyMatters: "Riassortire per inerzia è il modo più comune per accumulare stock morto. Ogni riassortimento senza dati è denaro che non torna.", riskIfIgnored: "Finanzi un errore ricorrente ogni mese, comprando ciò che non si vende mentre ciò che si vende si esaurisce." },
      queSignifica:
        "Non riassortire è una decisione attiva, non una dimenticanza. Smetti di riassortire quando i dati ti dicono che quella referenza non giustifica più il suo spazio: rotazione bassa sostenuta, margine insufficiente, cannibalizzazione con una referenza migliore, o cambio nel profilo della tua clientela. La chiave è che la decisione sia consapevole e documentata.",
      porQueImporta:
        "Perché riassortire per inerzia è il modo più comune per accumulare stock morto. Ogni referenza che riassortisci senza giustificazione toglie budget a una che potrebbe davvero vendere. E ogni mese che riassortisci un vino che non ruota, stai finanziando un errore ricorrente.",
      queHacer: [
        "Prima di ogni ordine, rivedi le referenze con rotazione < 1 volta/mese. Hai davvero bisogno di riassortire?",
        "Se una referenza ha avuto 2 mesi consecutivi con rotazione bassa, mettila in quarantena: non riassortire finché non si esaurisce, poi valuta.",
        "Se una volta esaurita non la rimpiangete (né voi né i clienti), non comprarla di nuovo.",
        "Documenta ogni decisione di non riassortimento così il team sa perché e non la riordina.",
      ],
      errores: [
        { mistake: "Riassortire tutto ciò che si esaurisce senza valutare le performance", consequence: "Tratti tutte le referenze come uguali quando non lo sono." },
        { mistake: "Non riassortire senza comunicarlo al team di sala", consequence: "Il cameriere promette un vino che non c'è più e il cliente resta deluso." },
        { mistake: "Lasciare che decida il fornitore ('ti mando il solito')", consequence: "La tua carta la decide chi ti vende, non chi gestisce il tuo locale." },
      ],
    },
    {
      id: "precios-compra",
      title: "Come leggere i prezzi d'acquisto",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim ha analizzato i tuoi costi d'acquisto includendo trasporto, minimi e condizioni per calcolare il costo totale reale.", whyMatters: "Ogni euro di differenza in acquisto è un euro diretto sul tuo margine. 0,80 € in più su 50 bottiglie/mese sono 480 €/anno persi su una sola referenza.", riskIfIgnored: "Scegli i fornitori per listino, non per costo reale. Il tuo margine si erode senza che lo vedi nel prezzo unitario." },
      queSignifica:
        "Il prezzo d'acquisto non è solo il numero in fattura. È quel numero più il trasporto, i minimi d'ordine, gli sconti quantità, i termini di pagamento e le condizioni di reso. Due fornitori possono offrirti lo stesso vino allo 'stesso prezzo' con costi reali molto diversi. Leggere bene un prezzo d'acquisto significa capire il costo totale di acquisizione, non solo il prezzo unitario.",
      porQueImporta:
        "Perché ogni euro di differenza in acquisto è un euro diretto sul tuo margine. Se compri 50 bottiglie al mese di una referenza e paghi 0,80 € in più del necessario, sono 480 € all'anno persi su una sola referenza. Moltiplicato per 10 referenze mal acquistate, parliamo di quasi 5.000 € annui.",
      queHacer: [
        "Per ogni referenza chiave, calcola il costo totale: prezzo + trasporto per unità + costo del capitale (pagamento a 30 gg vs. 60 gg).",
        "Confronta il costo totale tra fornitori, non solo il prezzo di listino.",
        "Verifica se le tue condizioni di reso coprono gli sprechi: un fornitore che accetta resi può essere più economico anche se il prezzo è più alto.",
        "Negozia con i dati: porta lo storico acquisti all'incontro con il fornitore.",
      ],
      errores: [
        { mistake: "Confrontare solo il prezzo unitario tra fornitori", consequence: "Scegli il più economico sulla carta ma il più caro nel costo reale." },
        { mistake: "Non rivedere i prezzi dopo la prima negoziazione", consequence: "Il fornitore aumenta del 5% ogni anno e tu non te ne accorgi finché non guardi i margini." },
        { mistake: "Non considerare il costo dei minimi d'ordine", consequence: "Compri 24 bottiglie per ottenere il prezzo ma ne servono solo 6." },
      ],
    },
    {
      id: "detectar-sobreprecio",
      title: "Come individuare il sovrapprezzo",
      priority: "inmediato",
      porQueTeLoMostramos: { detected: "Winerim ha confrontato i tuoi prezzi d'acquisto con i dati di mercato e ha rilevato referenze dove potresti pagare più del necessario.", whyMatters: "Il sovrapprezzo è invisibile finché non lo cerchi. In un gruppo, un 8% in più su 20 referenze può significare decine di migliaia di euro all'anno.", riskIfIgnored: "Continui a pagare troppo per non confrontare. La lealtà al fornitore non deve essere incompatibile con la gestione." },
      queSignifica:
        "Un sovrapprezzo è quando paghi più di quanto il mercato richieda per una referenza o per un vino con caratteristiche equivalenti. Non è sempre colpa del fornitore: a volte è perché non hai confrontato, perché compri dallo stesso da anni senza negoziare, o perché il tuo volume è cambiato e le tue condizioni non si sono aggiornate. Individuare il sovrapprezzo richiede confronto, non intuizione.",
      porQueImporta:
        "Perché il sovrapprezzo è invisibile finché non lo cerchi. Non appare come spesa extra nel tuo conto economico: semplicemente riduce il tuo margine senza che tu lo sappia. In un gruppo di ristorazione con acquisti centralizzati, un sovrapprezzo dell'8% su 20 referenze può significare decine di migliaia di euro all'anno.",
      queHacer: [
        "Seleziona le tue 10 referenze a maggior volume e richiedi preventivi ad almeno 2 fornitori alternativi.",
        "Confronta non solo il prezzo ma le condizioni: termini di pagamento, minimi, trasporto, resi.",
        "Se rilevi una differenza > 10%, negozia con il tuo fornitore attuale usando i dati come leva.",
        "Stabilisci una revisione dei prezzi almeno semestrale. I mercati cambiano e le tue condizioni devono adattarsi.",
      ],
      errores: [
        { mistake: "Non confrontare mai perché 'il mio fornitore è di fiducia'", consequence: "La fiducia non è incompatibile con il confronto. Confrontare è gestire." },
        { mistake: "Confrontare solo una volta all'anno o all'inizio del rapporto", consequence: "I prezzi cambiano trimestralmente. Se non revisioni, resti indietro." },
        { mistake: "Cambiare fornitore solo per il prezzo senza valutare il servizio", consequence: "Un fornitore economico ma poco affidabile ti costa di più in rotture di stock e problemi logistici." },
      ],
    },
    {
      id: "decidir-entre-similares",
      title: "Come scegliere tra referenze simili",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim ha rilevato coppie di referenze che competono nello stesso segmento della tua carta: stesso tipo, prezzo simile.", whyMatters: "Mantenere due vini ridondanti cannibalizza le vendite, divide l'attenzione e raddoppia lo stock. Consolidare libera spazio e migliora le condizioni d'acquisto.", riskIfIgnored: "Entrambi vendono poco anziché uno vendere bene. Perdi margine, efficienza e l'opportunità di coprire un vuoto reale." },
      queSignifica:
        "Quando hai due o più vini che competono nello stesso segmento (stesso tipo, prezzo simile, profilo simile), hai bisogno di un criterio chiaro per scegliere quale resta e quale va. Quel criterio deve combinare tre variabili: margine (quale rende di più), rotazione (quale vende di più) e ruolo in carta (quale soddisfa meglio la funzione che devi coprire).",
      porQueImporta:
        "Perché mantenere due referenze simili cannibalizza le vendite, divide l'attenzione del cliente e raddoppia lo stock necessario. Ogni coppia di vini ridondanti è un'opportunità persa per coprire un vuoto reale nella tua carta o per concentrare il volume e migliorare le condizioni d'acquisto.",
      queHacer: [
        "Identifica coppie o trii di referenze che competono nello stesso segmento (stesso tipo, ±3 € di differenza).",
        "Confronta: quale ha margine migliore? Quale ruota di più? Quale raccomanda di più il team di sala?",
        "Decidi quale resta e ritira l'altra. Se hai stock di quella in uscita, spostala al calice o in promozione.",
        "Usa lo spazio liberato per coprire un vuoto reale o per negoziare volumi migliori sulla referenza vincente.",
      ],
      errores: [
        { mistake: "Mantenere entrambe 'perché vendono entrambe un po''", consequence: "Entrambe vendono poco anziché una vendere bene. Perdi margine ed efficienza." },
        { mistake: "Decidere solo per margine senza guardare la rotazione", consequence: "Tieni la più redditizia per bottiglia ma che nessuno ordina." },
        { mistake: "Decidere per gusto personale del sommelier o dello chef", consequence: "La tua carta soddisfa chi la progetta, non chi la consuma." },
      ],
    },
    {
      id: "decision-compra-integrada",
      title: "Come combinare rotazione, margine e stock in una decisione d'acquisto",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim incrocia automaticamente rotazione, margine e livello di stock per classificare ogni referenza in una matrice decisionale.", whyMatters: "Guardare un solo dato porta a decisioni parziali. Solo quando incroci tutti e tre vedi il quadro completo di ogni referenza.", riskIfIgnored: "Compri ciò che non serve, riassortisci ciò che non ruota e resti senza ciò che si vende." },
      queSignifica:
        "La migliore decisione d'acquisto non guarda un solo dato: ne incrocia tre. La rotazione ti dice se il vino si vende. Il margine ti dice se vale la pena venderlo. Lo stock ti dice se ne hai bisogno o ne hai già abbastanza. Quando tutti e tre puntano nella stessa direzione, la decisione è chiara. Quando si contraddicono, devi dare priorità secondo la tua strategia.",
      porQueImporta:
        "Perché guardare un solo dato porta a decisioni parziali. Un vino con buona rotazione ma margine scarso ti fa lavorare tanto per guadagnare poco. Uno con buon margine ma senza rotazione riempie la cantina di capitale fermo. E comprare di più di qualcosa che hai già in eccesso è buttare soldi. Solo quando incroci tutti e tre vedi il quadro completo.",
      queHacer: [
        "Prima di ogni ordine, classifica ogni referenza in una matrice 2×2: rotazione alta/bassa × margine alto/basso.",
        "Rotazione alta + margine alto → riassortire senza esitare, negoziare volume.",
        "Rotazione alta + margine basso → riprezzare o rinegoziare il costo prima di riassortire.",
        "Rotazione bassa + margine alto → spingere in sala o al calice prima di riassortire.",
        "Rotazione bassa + margine basso → non riassortire. Esaurire lo stock e ritirare.",
        "Aggiungi la variabile stock: se hai già 3 mesi di inventario, non serve riassortire anche se ruota bene.",
      ],
      errores: [
        { mistake: "Basare le decisioni d'acquisto solo sulla rotazione", consequence: "Riassortisci il più venduto senza verificare se rende abbastanza margine." },
        { mistake: "Decidere solo per margine", consequence: "Compri ciò che rende di più per bottiglia ma che nessuno ordina." },
        { mistake: "Non verificare lo stock attuale prima di ordinare", consequence: "Duplichi l'inventario su referenze di cui avevi già abbastanza." },
      ],
    },
  ],
  nextStep: {
    label: "Valuta il tuo prossimo acquisto",
    href: "/herramientas/calculadora-compra-inteligente",
    description: "Incrocia rotazione, margine e stock attuale per decidere se un acquisto ha senso prima di farlo.",
  },
};

export default comprasReposicionIT;
