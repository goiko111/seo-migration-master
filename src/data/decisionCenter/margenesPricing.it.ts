import { DollarSign } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const margenesPricingIT: DeepAreaContent = {
  name: "Margini e pricing",
  tagline: "Comprendi la redditività reale di ogni vino e agisci con criterio",
  intro: "Questa sezione ti aiuta a interpretare tutti gli indicatori di margine, pricing e redditività che Winerim ti mostra. Non devi essere un esperto finanziario: devi sapere cosa guardare, perché è importante e cosa fare con ogni dato.",
  icon: DollarSign,
  accent: "text-amber-500",
  bg: "bg-amber-500/10",
  audiences: ["direccion", "compras-fb"],
  topErrors: [
    { error: "Alzare il prezzo senza prima verificare il costo d'acquisto", porQueOcurre: "Perché è più facile modificare il PVP che negoziare con il fornitore. Si presume che il margine basso sia un problema di prezzo, quando spesso l'origine è nell'acquisto.", consecuencia: "Alzi il prezzo al cliente (che lo nota) quando avresti potuto migliorare il margine in modo invisibile rinegoziando il costo di acquisto." },
    { error: "Applicare un moltiplicatore unico a tutta la carta", porQueOcurre: "Perché semplifica la gestione e sembra 'equo'. Un ×3 su tutto sembra ragionevole.", consecuencia: "Perdi margine sui vini economici (dove il cliente è più sensibile al prezzo) e risulti poco competitivo sui costosi (dove il moltiplicatore dovrebbe essere inferiore)." },
    { error: "Non rivedere i margini ogni mese", porQueOcurre: "Perché la quotidianità assorbe tutto il tempo e i margini sembrano stabili. Ma i costi aumentano, lo spreco varia e la domanda cambia.", consecuencia: "Le deviazioni si accumulano silenziosamente. Le vedi solo quando chiudi il trimestre e i numeri non tornano." },
    { error: "Fissare il prezzo al calice dividendo la bottiglia per 5", porQueOcurre: "Perché è il calcolo mentale più rapido. Ma ignora lo spreco, il costo del servizio e il margine aggiuntivo che il calice dovrebbe generare.", consecuencia: "Vendi calici in perdita senza saperlo. Uno spreco reale del 25% trasforma il tuo margine teorico del 70% in un 35% reale." },
    { error: "Mantenere un vino con buon margine ma senza vendite", porQueOcurre: "Perché il dato del margine sembra positivo e rassicura. Ma un vino che non si vende non genera alcun margine reale.", consecuencia: "Capitale immobilizzato che occupa spazio in cantina e in carta senza generare ritorno. Il margine potenziale non si materializza mai." },
  ],
  links: [
    { label: "Calcolatore margini", href: "/calculadora-margen-vino", description: "Calcola il margine reale di qualsiasi referenza in pochi secondi", type: "tool" },
    { label: "Template: Revisione mensile margini", href: "/recursos/plantilla-revision-mensual-margenes", description: "Processo mensile per individuare deviazioni e opportunità", type: "resource" },
    { label: "Risorsa: Analisi margini", href: "/recursos/scorecard-mensual", description: "Scorecard per monitorare la salute del tuo pricing", type: "resource" },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "Il motore analitico che automatizza tutto questo per te", type: "product" },
    { label: "Blog: 7 errori nel pricing", href: "/article/errores-fijar-precios-vino-restaurante", description: "Gli errori di pricing più frequenti e come evitarli", type: "article" },
    { label: "Blog: Leve per migliorare il margine", href: "/article/palancas-mejorar-margen-vino-sin-rehacer-carta", description: "Come migliorare il margine senza rifare la carta dei vini", type: "article" },
    { label: "Blog: Metriche F&B vino", href: "/article/metricas-fb-vino-restaurante", description: "Le metriche che ogni F&B dovrebbe monitorare" },
  ],
  miniCases: [
    {
      profile: "Gastronomico con carta di 60 referenze",
      situation: "Margine medio del 58%, ma le 5 referenze più vendute avevano un moltiplicatore di ×2,2 perché non erano mai state aggiornate dopo l'ultimo aumento del fornitore.",
      action: "Ha ricalcolato i prezzi delle 5 referenze top. Aumento tra 1 € e 3 € a seconda della fascia. Al team di sala ha fornito argomentazioni di valore per giustificare il cambio.",
      result: "Il margine medio è salito al 63% senza perdere una singola vendita su quelle referenze. Impatto stimato: +1.800 €/mese.",
    },
    {
      profile: "Casual dining con 35 referenze",
      situation: "Applicava un ×3 uniforme a tutta la carta. I vini d'ingresso (costo <5 €) finivano a 15 € e non si vendevano; quelli >15 € di costo finivano a 45 € e nemmeno.",
      action: "Ha implementato un moltiplicatore scalato: ×3,5 per vini sotto 8 € di costo, ×2,8 nella fascia media, ×2,2 per i vini d'immagine.",
      result: "Lo scontrino medio vino è salito del 12% perché i clienti hanno smesso di scegliere sempre il più economico.",
    },
  ],
  subtopics: [
    {
      id: "margen-bruto",
      title: "Cos'è il margine lordo",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim ha calcolato il margine lordo di ogni referenza della tua carta incrociando PVP con costo d'acquisto reale.",
        whyMatters: "Se non distingui tra margine percentuale e contribuzione assoluta, potresti spingere i vini sbagliati.",
        riskIfIgnored: "Continui a promuovere vini che sembrano redditizi in percentuale ma che in euro ti lasciano meno di altri che nemmeno consideri.",
      },
      queSignifica:
        "Il margine lordo è la differenza tra quanto fai pagare un vino e quanto ti costa acquistarlo. Si esprime in euro (contribuzione) o in percentuale. È la metrica di redditività più basilare, ma non l'unica importante. Un vino con il 60% di margine può lasciarti meno soldi reali di uno al 45%, se il secondo si vende al doppio del prezzo.",
      porQueImporta:
        "Perché è il punto di partenza di qualsiasi decisione di pricing. Se non conosci il tuo margine lordo per referenza, stai prendendo decisioni alla cieca. E se guardi solo la percentuale senza vedere la contribuzione assoluta, potresti promuovere i vini sbagliati.",
      queHacer: [
        "Calcola il margine lordo in euro e in percentuale delle tue 10 referenze più vendute.",
        "Ordinale per contribuzione assoluta (€), non per percentuale.",
        "Confronta: i tuoi vini più venduti sono anche quelli che lasciano più margine?",
        "Se non lo sono, hai un'opportunità di repricing immediata.",
      ],
      errores: [
        { mistake: "Guardare solo la percentuale di margine", consequence: "Un vino da 8 € con il 65% di margine lascia 5,20 €. Uno da 25 € con il 50% lascia 12,50 €. Il secondo è un affare migliore." },
        { mistake: "Calcolare il margine sul PVP anziché sul costo", consequence: "Ti inganni con un numero più alto che non riflette quanto guadagni realmente." },
        { mistake: "Non aggiornare il costo dopo cambiamenti del fornitore", consequence: "Il tuo margine teorico non esiste più: vendi credendo di guadagnare, ma non è così." },
      ],
    },
    {
      id: "margen-sano",
      title: "Qual è un margine sano",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "Winerim ha confrontato il tuo moltiplicatore medio ponderato con il benchmark del tuo segmento.",
        whyMatters: "Se sei al di sotto della fascia sana, hai un problema strutturale che non si risolve vendendo di più.",
        riskIfIgnored: "Ogni mese che passa con il margine disallineato, perdi redditività accumulata che non puoi più recuperare.",
      },
      queSignifica:
        "Non esiste un margine universale 'corretto'. Dipende dal tuo segmento, scontrino medio, volume e struttura dei costi. Ma ci sono riferimenti di mercato: la maggior parte dei ristoranti redditizi opera con un moltiplicatore medio tra ×2,5 e ×3,5 sul costo, equivalente a margini lordi del 60-72%. L'importante non è un numero fisso, ma che il tuo margine medio ponderato per vendite sia in linea con il tuo modello di business.",
      porQueImporta:
        "Perché se il tuo margine medio è al di sotto del benchmark del tuo segmento, hai un problema strutturale che non si risolve vendendo di più. E se è molto al di sopra, potresti perdere competitività e volume senza saperlo.",
      queHacer: [
        "Calcola il tuo moltiplicatore medio ponderato per vendite (non per referenza).",
        "Confronta con il benchmark del tuo segmento: casual (×2,5-3), gastronomico (×2-2,5), hotel (×3-4).",
        "Se sei al di sotto, identifica le referenze che abbassano la media.",
        "Se sei al di sopra, valuta se il tuo volume calice e bottiglia è quello atteso.",
      ],
      errores: [
        { mistake: "Applicare un moltiplicatore unico a tutta la carta", consequence: "Perdi margine sui vini economici e non sei competitivo su quelli costosi." },
        { mistake: "Confrontare il tuo margine con quello di un segmento diverso", consequence: "Un hotel ha una struttura di costi diversa da un bistrot. Non sono confrontabili." },
        { mistake: "Non ponderare per vendite", consequence: "La tua media di margine sembra buona, ma i vini che vendi di più sono i peggiori in termini di margine." },
      ],
    },
    {
      id: "referencias-mal-calibradas",
      title: "Come individuare referenze mal calibrate",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim ha identificato referenze il cui prezzo non corrisponde al costo, alla posizione in carta o al ruolo commerciale.",
        whyMatters: "Una sola referenza mal calibrata nelle tue top 5 può costarti migliaia di euro all'anno senza che te ne accorga.",
        riskIfIgnored: "L'impatto si accumula giorno dopo giorno e lo vedi solo quando chiudi il trimestre e il margine non torna.",
      },
      queSignifica:
        "Una referenza mal calibrata è un vino il cui prezzo non riflette il suo costo reale, la sua posizione in carta o il suo ruolo commerciale. Può essere troppo economico (perdi margine), troppo caro (non ruota) o mal posizionato rispetto ad altri vini della stessa fascia.",
      porQueImporta:
        "Perché una sola referenza mal calibrata nelle tue top 5 di vendite può costarti migliaia di euro all'anno. E se ne hai diverse, l'impatto si accumula invisibilmente giorno dopo giorno.",
      queHacer: [
        "Incrocia le tue 10 referenze più vendute con il loro margine: cerca quelle che vendono di più ma lasciano di meno.",
        "Identifica referenze con moltiplicatore < ×2 o > ×4,5 (entrambi gli estremi sono segnali d'allarme).",
        "Verifica se ci sono vini allo stesso prezzo ma con costi molto diversi: uno dei due è mal calibrato.",
        "Correggi almeno una referenza questa settimana e misura l'impatto in 30 giorni.",
      ],
      errores: [
        { mistake: "Assumere che se si vende bene, il prezzo è giusto", consequence: "Un vino può vendere molto proprio perché è troppo economico." },
        { mistake: "Non verificare dopo cambiamenti di costo del fornitore", consequence: "Il margine scompare senza che te ne accorga fino alla fine del mese." },
        { mistake: "Calibrare solo sul costo, senza considerare la percezione del cliente", consequence: "Un repricing aggressivo può rompere la fiducia del cliente abituale." },
      ],
    },
    {
      id: "cuando-subir-precio",
      title: "Quando alzare il prezzo",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim ha trovato referenze con alto volume di vendita ma margine al di sotto della media della tua carta.",
        whyMatters: "Sono candidate chiare per un aumento di 1-2 € che raramente impatta sulla domanda ma migliora il tuo risultato ogni giorno.",
        riskIfIgnored: "Ogni servizio che passa senza correggere il prezzo è margine che perdi e che non puoi più recuperare.",
      },
      queSignifica:
        "Alzare il prezzo non è sempre la risposta, ma spesso è l'azione più diretta per migliorare la redditività. Il momento giusto è quando hai dati che lo giustificano: un margine sotto il benchmark, un costo aumentato, una referenza che vende bene con margine basso, o una fascia di prezzo senza competizione interna.",
      porQueImporta:
        "Perché molti ristoranti evitano di alzare i prezzi per paura di perdere clienti, ma la realtà è che aumenti di 1-2 € su referenze strategiche raramente impattano sulla domanda. Al contrario, non alzare quando dovresti ti costa margine ogni giorno.",
      queHacer: [
        "Identifica le 3 referenze con il maggior volume di vendita e margine sotto la media.",
        "Valuta un aumento di 1-2 € e calcola l'impatto annuale (volume × incremento).",
        "Verifica che il nuovo prezzo non entri in conflitto con un'altra referenza della stessa fascia.",
        "Implementa il cambio e rivedi le vendite dopo 30 giorni. Se il volume non cala, il prezzo era corretto.",
      ],
      errores: [
        { mistake: "Alzare tutti i prezzi contemporaneamente", consequence: "Il cliente abituale nota il cambio e la percezione di valore ne risente." },
        { mistake: "Non alzare mai per paura della reazione", consequence: "Il tuo margine si erode anno dopo anno mentre i costi continuano a salire." },
        { mistake: "Alzare senza verificare la fascia competitiva", consequence: "Crei un vuoto di prezzo o una sovrapposizione che prima non esisteva." },
      ],
    },
    {
      id: "cuando-revisar-compra",
      title: "Quando rivedere l'acquisto",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim ha trovato referenze con margine basso il cui costo d'acquisto è aumentato rispetto allo storico.",
        whyMatters: "Ogni euro risparmiato sull'acquisto è margine diretto, invisibile al cliente ma molto visibile nel tuo conto economico.",
        riskIfIgnored: "Continui a pagare più del dovuto per fedeltà al fornitore, non per valore ricevuto.",
      },
      queSignifica:
        "Un margine basso non si risolve sempre alzando il prezzo. A volte il problema è che stai comprando caro. Rivedere l'acquisto significa verificare se il costo di acquisizione di una referenza è ancora competitivo, se esistono alternative più economiche di qualità equivalente, o se puoi negoziare condizioni migliori.",
      porQueImporta:
        "Perché ogni euro risparmiato sull'acquisto è un euro di margine diretto. E a differenza dell'aumento di prezzo (che il cliente vede), migliorare l'acquisto è invisibile per il cliente ma molto visibile nel tuo conto economico.",
      queHacer: [
        "Identifica le referenze con margine basso e rivedi lo storico del costo: è aumentato?",
        "Richiedi almeno 2 preventivi alternativi per quelle referenze.",
        "Negozia con il tuo fornitore attuale usando i prezzi di mercato come leva.",
        "Se la differenza è >10%, valuta il cambio o usa la negoziazione per ottenere condizioni migliori.",
      ],
      errores: [
        { mistake: "Non rivedere i costi perché 'compri sempre dallo stesso'", consequence: "Paghi più del necessario per fedeltà, non per valore ricevuto." },
        { mistake: "Confrontare solo il prezzo senza valutare servizio e condizioni", consequence: "Un fornitore economico ma poco affidabile ti costa di più nel lungo termine." },
        { mistake: "Non collegare margine basso con origine d'acquisto", consequence: "Cerchi la soluzione nel PVP quando il problema è nel costo." },
      ],
    },
    {
      id: "cuando-revisar-copeo",
      title: "Quando rivedere il programma al calice",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim ha trovato referenze al calice il cui margine reale diverge significativamente dal margine teorico.",
        whyMatters: "Il calice può essere la tua miglior leva di margine o la tua maggior fonte di perdita invisibile. Un errore di 0,50 € per calice su 20 calici/settimana sono oltre 500 €/anno persi.",
        riskIfIgnored: "Continui a servire calici a un prezzo in perdita senza saperlo, perché non hai mai incrociato il dato dello spreco con il pricing.",
      },
      queSignifica:
        "Se una referenza ha margine basso e viene servita al calice, il problema può essere nel programma calice: prezzo mal calcolato, spreco non contabilizzato o rotazione insufficiente. Il calice moltiplica gli errori di pricing perché ogni bottiglia si divide in 4-6 servizi, e ogni deviazione si ripete ad ogni versata.",
      porQueImporta:
        "Perché il calice può essere la tua maggior leva di margine (fino a ×3 sulla bottiglia) o la tua maggior fonte di perdita invisibile. Un errore di 0,50 € per calice, moltiplicato per 20 calici a settimana, sono oltre 500 € all'anno persi su una singola referenza.",
      queHacer: [
        "Ricalcola il prezzo al calice includendo lo spreco reale (usa almeno il 20-25% di perdita).",
        "Confronta il margine al calice con il margine per bottiglia della stessa referenza.",
        "Se il calice non dà più margine della bottiglia, hai un problema di prezzo o di spreco.",
        "Verifica se la referenza al calice ha rotazione sufficiente per finire la bottiglia in 24-48 ore.",
      ],
      errores: [
        { mistake: "Dividere il prezzo della bottiglia per 5 per fissare il calice", consequence: "Non copri spreco, servizio né margine. Vendi in perdita senza saperlo." },
        { mistake: "Non misurare lo spreco reale per ogni referenza al calice", consequence: "Il tuo margine teorico e quello reale possono differire del 30% o più." },
        { mistake: "Mantenere calici con bassa rotazione 'perché stanno bene in carta'", consequence: "Ogni bottiglia aperta che non viene finita sono soldi buttati." },
      ],
    },
    {
      id: "revision-mensual",
      title: "Come leggere una revisione mensile dei margini",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "Winerim genera automaticamente un confronto mensile dei margini per individuare deviazioni prima che si accumulino.",
        whyMatters: "I fornitori alzano i prezzi, lo spreco varia con la stagione e la domanda cambia. Senza revisione mensile, le sorprese si accumulano.",
        riskIfIgnored: "Le deviazioni si sommano silenziosamente e le vedi solo quando il trimestre chiude peggio del previsto.",
      },
      queSignifica:
        "La revisione mensile dei margini è il processo di verificare, ogni mese, se la tua carta è ancora redditizia. Include il confronto dei margini attuali con quelli del mese precedente, l'individuazione delle deviazioni di costo, l'identificazione delle referenze che hanno cambiato rendimento e la decisione di aggiustamenti. Non è un report: è un processo decisionale ricorrente.",
      porQueImporta:
        "Perché i margini cambiano senza che tu faccia nulla. I fornitori alzano i prezzi, la domanda varia, i calici generano spreco diverso in base alla stagione. Se non rivedi ogni mese, le deviazioni si accumulano e si trasformano in sorprese spiacevoli a fine trimestre.",
      queHacer: [
        "Riserva 1 ora al mese per rivedere i margini. Mettilo in calendario come routine operativa.",
        "Confronta il margine medio ponderato di questo mese vs. il precedente. È salito o sceso?",
        "Identifica le 3 referenze con il maggior calo di margine e cerca la causa (costo, volume, spreco).",
        "Prendi almeno 1 decisione di aggiustamento per revisione: repricing, cambio calice, negoziazione con fornitore.",
      ],
      errores: [
        { mistake: "Non fare la revisione mensile perché 'non c'è tempo'", consequence: "Le deviazioni si accumulano e le vedi solo quando sono già un problema grave." },
        { mistake: "Rivedere solo il margine medio globale", consequence: "La media può andare bene mentre 5 referenze sono in rosso." },
        { mistake: "Rivedere senza prendere nessuna decisione concreta", consequence: "La revisione diventa un esercizio teorico che non cambia nulla." },
      ],
    },
  ],
  nextStep: {
    label: "Apri il calcolatore dei margini",
    href: "/calculadora-margen-vino",
    description: "Calcola il margine reale delle tue referenze e individua quelle che necessitano di un aggiustamento di prezzo.",
  },
};

export default margenesPricingIT;
