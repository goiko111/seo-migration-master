import { BarChart3 } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const cartaEquilibrioIT: DeepAreaContent = {
  name: "Carta dei vini ed equilibrio",
  tagline: "La tua carta deve raccontare una storia coerente",
  intro: "Questa sezione ti aiuta a valutare se la tua carta ha la struttura giusta per vendere, non solo per impressionare. Equilibrare una carta non è avere 'un po' di tutto': è che ogni referenza abbia un ruolo chiaro. Soprattutto nelle carte ampie e complesse — dalle 250 referenze in su — l'equilibrio smette di essere una questione estetica e diventa una decisione strategica con impatto diretto su vendite, stock ed esperienza al tavolo.",
  icon: BarChart3,
  accent: "text-wine",
  bg: "bg-wine/10",
  audiences: ["sala", "direccion", "compras-fb"],
  topErrors: [
    { error: "Costruire la carta per accumulo anziché per design", porQueOcurre: "Perché ogni vino nuovo si aggiunge senza toglierne un altro. Il fornitore propone, il sommelier accetta, la carta cresce senza criterio.", consecuencia: "La carta si gonfia, si sbilancia e si riempie di ridondanze che cannibalizzano le vendite e generano stock morto." },
    { error: "Saturare una fascia di prezzo senza coprire le altre", porQueOcurre: "Perché si compra ciò che piace o ciò che propone il fornitore abituale, che opera di solito nella stessa fascia.", consecuencia: "Competi con te stesso nella fascia 25-35 € mentre il cliente che cerca qualcosa sotto i 20 € o sopra i 50 € non trova opzioni." },
    { error: "Squilibrio per origine: 80% da una sola denominazione", porQueOcurre: "Perché la zona di comfort dell'acquirente o la vicinanza geografica concentrano gli acquisti su poche origini.", consecuencia: "Dipendenza da un mercato (rischio prezzi), mancanza di diversità per il cliente e una carta che non racconta una storia interessante." },
    { error: "Aggiungere senza togliere: 'più opzioni, meglio è'", porQueOcurre: "Perché togliere sembra perdere, e aggiungere sembra guadagnare. Ma oltre un certo punto, ogni nuova referenza diluisce l'attenzione.", consecuencia: "Il cliente impiega più tempo a decidere, il team non può conoscere tutta la carta e le vendite si concentrano su 15-20 referenze mentre il resto è decorazione." },
    { error: "Non mappare la carta prima di prendere decisioni", porQueOcurre: "Perché si lavora con la lista delle referenze senza visualizzare la struttura. Le decisioni si prendono una a una, senza vedere l'insieme.", consecuencia: "Aggiungi dove sei già saturo e lasci vuoti dove c'è domanda. È come ristrutturare una casa senza guardare la planimetria." },
  ],
  links: [
    { label: "Template wine mapping", href: "/recursos/plantilla-wine-mapping-restaurante", description: "Mappa la tua carta per tipo, prezzo, origine e ruolo commerciale", type: "resource" as const },
    { label: "Template equilibrio carta", href: "/recursos/plantilla-equilibrio-carta", description: "Diagnostica saturazioni, vuoti e cannibalizzazione per fascia", type: "resource" as const },
    { label: "Checklist carta redditizia", href: "/recursos/checklist-carta-rentable", description: "Verifica se la tua carta soddisfa i criteri di una carta che vende", type: "resource" as const },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "Il motore analitico che valuta l'equilibrio della tua carta automaticamente", type: "product" as const },
    { label: "Blog: La tua carta è sbilanciata?", href: "/article/como-saber-si-carta-vinos-esta-descompensada", description: "Diagnosi rapida per individuare squilibri nella tua carta dei vini", type: "article" as const },
    { label: "Blog: La tua carta è troppo lunga?", href: "/article/cuando-carta-vinos-es-demasiado-larga", description: "Segnali di eccesso di referenze e come agire", type: "article" as const },
  ],
  subtopics: [
    {
      id: "carta-descompensada",
      title: "Come capire se una carta è sbilanciata",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim ha mappato la distribuzione della tua carta per tipo, prezzo e origine e ha trovato zone di saturazione e vuoti.", whyMatters: "Una carta sbilanciata perde vendite (il cliente non trova ciò che cerca), cannibalizza il margine e accumula stock dove c'è eccesso.", riskIfIgnored: "Ogni nuova referenza aggiunta senza criterio sbilancia ulteriormente la carta e amplifica il problema." },
      queSignifica:
        "Una carta sbilanciata è quella in cui la distribuzione delle referenze non riflette ciò che i tuoi clienti ordinano davvero. Può essere un eccesso di rossi e quasi nessuno spumante, una concentrazione esagerata in una fascia di prezzo, o il 40% della carta dedicato a una sola regione. Lo squilibrio non si vede a occhio nudo: si rileva quando mappi la carta per variabili e confronti con i dati di vendita.",
      porQueImporta:
        "Perché una carta sbilanciata genera tre problemi contemporaneamente: il cliente non trova ciò che cerca (vendita persa), le referenze sature si cannibalizzano tra loro (margine perso) e accumuli stock nelle zone con eccesso (capitale immobilizzato). Nelle carte ampie — dalle 250 referenze in su — lo squilibrio si amplifica esponenzialmente.",
      queHacer: [
        "Mappa la tua carta per tipo di vino (rosso, bianco, rosato, spumante, fortificato) e calcola la % di ciascuno.",
        "Incrocia quella distribuzione con i tuoi dati di vendita: il 70% della tua carta è rosso ma il 40% delle vendite sono bianchi?",
        "Identifica le 3 categorie più sature e le 2 più vuote. Lì ci sono le tue opportunità.",
        "Stabilisci una distribuzione obiettivo coerente con il tuo concept e rivedila ogni trimestre.",
      ],
      errores: [
        { mistake: "Presumere che la carta sia equilibrata perché 'ha un po' di tutto'", consequence: "Avere un po' di tutto non è equilibrio. Potresti avere 60 rossi e 4 bianchi." },
        { mistake: "Equilibrare per numero di referenze senza guardare le vendite", consequence: "Puoi avere 20 spumanti e venderne 2. L'equilibrio deve riflettere la domanda." },
        { mistake: "Non rivedere l'equilibrio dopo aver aggiunto nuove referenze", consequence: "Ogni inserimento senza criterio sbilancia la carta un po' di più." },
      ],
    },
    {
      id: "exceso-huecos-precio",
      title: "Eccesso e vuoti per fascia di prezzo",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim ha analizzato la distribuzione delle tue referenze per fascia di prezzo e ha trovato zone sature e fasce vuote.", whyMatters: "Il prezzo è il primo filtro del cliente. Saturare una fascia genera cannibalizzazione; lasciare vuoti perde vendite che non vedi mai.", riskIfIgnored: "Continui a saturare fasce dove già competi con te stesso mentre il cliente che cerca qualcosa di diverso se ne va senza ordinare." },
      queSignifica:
        "Le fasce di prezzo sono gli intervalli in cui si distribuiscono le tue referenze: 10-15 €, 15-25 €, 25-40 €, ecc. Un eccesso in una fascia significa che hai troppe referenze che competono per lo stesso cliente nello stesso intervallo. Un vuoto significa che c'è una fascia dove il cliente cerca e non trova. Entrambi sono problemi, ma l'eccesso è più costoso (genera cannibalizzazione e stock) e il vuoto è più invisibile (perdi vendite che non vedi mai).",
      porQueImporta:
        "Perché il prezzo è il primo filtro del cliente. Se la tua carta ha 15 rossi tra 18 e 22 € e nessuno tra 30 e 40 €, stai saturando il cliente indeciso in una fascia e perdendo quello che cerca qualcosa di speciale. Nelle carte ampie, questo effetto si moltiplica: ogni fascia satura è un nido di cannibalizzazione.",
      queHacer: [
        "Dividi la tua carta in fasce di prezzo (es. <15 €, 15-25 €, 25-40 €, 40-60 €, >60 €) e conta le referenze in ciascuna.",
        "Identifica le fasce con più di 10 referenze dello stesso tipo: lì c'è saturazione.",
        "Cerca fasce vuote o con meno di 2 opzioni: lì hai un vuoto da colmare.",
        "Confronta la distribuzione dei prezzi con il tuo ticket medio vino: la maggior parte delle tue opzioni è nella fascia che il tuo cliente sceglie?",
      ],
      errores: [
        { mistake: "Nessuna visibilità della distribuzione per fascia di prezzo", consequence: "Non sai dove sei saturo né dove hai vuoti finché un cliente non te lo dice." },
        { mistake: "Aggiungere referenze senza verificare in quale fascia ricadono", consequence: "Ogni nuova referenza che cade in una fascia satura peggiora il problema." },
        { mistake: "Colmare un vuoto con un vino che non si adatta al concept", consequence: "Avere qualcosa in quella fascia non basta: deve essere coerente con il tuo ristorante." },
      ],
    },
    {
      id: "equilibrio-estilos",
      title: "Equilibrio per stili",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim ha classificato la tua carta per profilo organolettico e ha rilevato concentrazione eccessiva in certi stili.", whyMatters: "Se tutti i tuoi rossi sono potenti o tutti i tuoi bianchi fruttati, limiti il tuo mercato potenziale a un solo tipo di palato.", riskIfIgnored: "Perdi il cliente che vuole qualcosa di diverso. E non lo saprai mai, perché non chiede: sceglie semplicemente altro o non ordina vino." },
      queSignifica:
        "Oltre rosso/bianco/rosato, l'equilibrio per stili guarda la diversità dei profili organolettici: hai vini leggeri e freschi oltre ai potenti? Ci sono opzioni giovani oltre alle riserve? La tua carta offre varietà di uve e vinificazioni, o tutto suona simile? L'equilibrio per stili determina se la tua carta copre l'ampiezza dei gusti della tua clientela o parla solo a un tipo di palato.",
      porQueImporta:
        "Perché il cliente non sceglie solo per tipo e prezzo: sceglie per ciò che gli va. Se tutti i tuoi rossi sono potenti e con legno, perdi chi vuole qualcosa di leggero. Se tutti i tuoi bianchi sono fruttati, perdi chi cerca mineralità. Un buon equilibrio di stili massimizza la probabilità che ogni cliente trovi qualcosa che gli calza.",
      queHacer: [
        "Classifica le tue referenze per profilo: leggero/medio/corposo, giovane/invecchiato/riserva, aromatico/minerale/strutturato.",
        "Verifica se hai opzioni in ogni quadrante o se tutto si concentra in un profilo.",
        "Chiedi al team di sala: ci sono richieste che non riescono a soddisfare con la carta attuale?",
        "Se l'80% della tua carta ha un profilo simile, stai limitando il tuo mercato potenziale.",
      ],
      errores: [
        { mistake: "Progettare la carta secondo i gusti del sommelier o dello chef", consequence: "La tua carta soddisfa chi la crea, ma potrebbe ignorare il 60% dei tuoi clienti." },
        { mistake: "Confondere varietà di produttori con varietà di stili", consequence: "20 produttori diversi possono fare vini molto simili se sono della stessa zona e uva." },
        { mistake: "Non adattare gli stili alla cucina del ristorante", consequence: "Una carta piena di rossi potenti in un ristorante di cucina leggera crea dissonanza." },
      ],
    },
    {
      id: "equilibrio-origen",
      title: "Equilibrio per origine",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim ha analizzato la distribuzione della tua carta per denominazione e origine e ha rilevato sovra-concentrazione o dispersione.", whyMatters: "La concentrazione di origine genera rischio d'acquisto (dipendenza da un mercato) e potrebbe non riflettere ciò che chiede la tua clientela.", riskIfIgnored: "Se la tua DO principale aumenta i prezzi, non hai alternative. E la tua carta racconta una storia che forse non coincide con il tuo cliente." },
      queSignifica:
        "L'equilibrio per origine valuta come si distribuiscono le tue referenze per denominazione, regione o paese. Una concentrazione eccessiva in un'origine può limitare la tua offerta e creare dipendenza da un mercato d'acquisto. Una distribuzione troppo dispersa può generare una carta senza identità. Il punto ottimale dipende dal tuo concept: un ristorante di cucina regionale ha una logica di concentrazione; uno cosmopolita ha bisogno di ampiezza.",
      porQueImporta:
        "Perché l'origine è parte della storia che la tua carta racconta. Se hai 30 Chianti e 2 Barolo, la tua carta dice qualcosa sulle tue priorità — che può o meno coincidere con ciò che ordina la tua clientela. Inoltre, la concentrazione di origine genera rischio d'acquisto: se la tua DO principale aumenta i prezzi, non hai alternative immediate.",
      queHacer: [
        "Elenca le 5 denominazioni o regioni con più referenze nella tua carta. Superano il 50% del totale?",
        "Confronta con i tuoi dati di vendita: la concentrazione è giustificata dalla domanda o dall'inerzia d'acquisto?",
        "Valuta se la distribuzione delle origini è coerente con il tipo di cucina e il profilo del tuo cliente.",
        "Se rilevi sovra-concentrazione, non eliminare tutto d'un colpo: sostituisci gradualmente al rinnovo delle referenze.",
      ],
      errores: [
        { mistake: "Sovra-rappresentare una DO per rapporti personali con cantine o distributori", consequence: "La tua carta riflette i tuoi contatti commerciali, non le esigenze del tuo cliente." },
        { mistake: "Diversificare per diversificare senza criterio", consequence: "Una carta con 30 paesi e nessuna profondità non trasmette competenza: trasmette dispersione." },
        { mistake: "Non adattare le origini alla stagionalità della cucina", consequence: "Bianchi di zone fredde in inverno e rossi potenti in estate non corrispondono a ciò che il cliente desidera." },
      ],
    },
    {
      id: "carta-demasiado-larga",
      title: "Quando una carta è troppo lunga",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim ha calcolato il tuo rapporto di efficacia: referenze con vendite reali vs. totale referenze in carta.", whyMatters: "L'eccesso di opzioni paralizza il cliente, concentra le vendite su 15-20 referenze e trasforma il resto in decorazione con costo.", riskIfIgnored: "Accumuli complessità, stock e gestione senza ritorno. Il tuo team raccomanda sempre lo stesso perché non può conoscere tutta la carta." },
      queSignifica:
        "Una carta è troppo lunga quando ha più referenze di quelle che la tua operatività può gestire, il tuo team può conoscere o il tuo cliente può processare. Non esiste un numero magico, ma ci sono segnali chiari: se più del 20% delle tue referenze non si è venduto in 60 giorni, se il tuo team di sala non riesce a descrivere metà della carta, o se il cliente impiega più di 5 minuti a scegliere, la tua carta è troppo lunga per il tuo contesto.",
      porQueImporta:
        "Perché una carta lunga non impressiona: paralizza. L'eccesso di opzioni (paradosso della scelta) riduce la conversione, aumenta il tempo di servizio e concentra le vendite sulle stesse 15-20 referenze che il team conosce e raccomanda. Il resto è decorazione che genera stock, gestione e costi senza ritorno. Nelle carte ampie dalle 250 referenze in su, questo rischio è strutturale.",
      queHacer: [
        "Calcola il tuo rapporto di efficacia: referenze con vendite reali negli ultimi 60 giorni / totale referenze.",
        "Se il tuo rapporto è < 70%, la tua carta ha troppe referenze per il tuo livello di domanda.",
        "Identifica le referenze che il team di sala non raccomanda mai: probabilmente sono di troppo.",
        "Stabilisci un limite operativo e rispettalo: ogni nuovo inserimento richiede una rimozione.",
      ],
      errores: [
        { mistake: "Credere che una carta lunga sia sinonimo di qualità o prestigio", consequence: "Una carta di 400 referenze dove 150 non si vendono non è prestigiosa: è inefficiente." },
        { mistake: "Non mettere un limite al numero di referenze", consequence: "La carta cresce per accumulo e non viene mai sfoltita, finché lo stock morto obbliga ad agire." },
        { mistake: "Ridurre la carta eliminando i vini più economici", consequence: "I vini d'ingresso sono quelli con più rotazione e spesso la porta d'accesso alla vendita al calice." },
      ],
    },
    {
      id: "carta-amplia-compleja",
      title: "Cosa significa una carta ampia e complessa",
      priority: "seguimiento",
      porQueTeLoMostramos: { detected: "La tua carta supera le 250 referenze: è un asset strategico se gestito con i dati, e un passivo se gestito con l'intuizione.", whyMatters: "La complessità aggiunge profondità ma anche frizione: più stock, più cannibalizzazione, più rischio senza visibilità.", riskIfIgnored: "Senza strumenti analitici, la complessità diventa caos. Non vedi cosa si cannibalizza né dove hai vuoti." },
      queSignifica:
        "Una carta ampia e complessa — dalle 250 referenze in su — non è intrinsecamente buona né cattiva. È un asset strategico se gestita con i dati, e un passivo operativo se gestita con l'intuizione. La complessità aggiunge profondità (più opzioni per il cliente esperto) ma anche frizione (più difficile da gestire, più stock, più rischio di cannibalizzazione). Winerim è progettato specificamente per questo scenario.",
      porQueImporta:
        "Perché gestire una carta di 250+ referenze senza strumenti analitici è come pilotare un aereo senza strumenti. Devi sapere cosa vende, cosa no, cosa si cannibalizza, dove hai vuoti e dove hai eccesso. Senza quella visibilità, la complessità diventa caos. Con essa, diventa vantaggio competitivo.",
      queHacer: [
        "Se la tua carta supera le 250 referenze, dai priorità all'implementazione di un sistema di analisi continua (non revisioni puntuali).",
        "Segmenta la carta in blocchi gestibili: per tipo, per fascia di prezzo, per origine. Analizza ogni blocco separatamente.",
        "Assegna un responsabile della salute della carta che revisioni mensilmente gli indicatori chiave.",
        "Accetta che la complessità richiede strumenti: ciò che funziona con 80 referenze non scala a 300.",
      ],
      errores: [
        { mistake: "Gestire una carta di 300 referenze con gli stessi metodi di una da 50", consequence: "La complessità cresce esponenzialmente, ma i metodi manuali non scalano." },
        { mistake: "Non segmentare: trattare tutta la carta come un blocco unico", consequence: "I problemi di un segmento si diluiscono nella media e non si rilevano finché non sono gravi." },
        { mistake: "Considerare la complessità come un problema da ridurre anziché un asset da gestire", consequence: "Se il tuo concept richiede ampiezza, la soluzione non è tagliare: è gestire meglio." },
      ],
    },
    {
      id: "wine-mapping",
      title: "Come interpretare il wine mapping e l'architettura della carta",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim ha generato automaticamente il wine mapping della tua carta incrociando tipo × prezzo × stile.", whyMatters: "Senza una mappa visiva, ogni decisione (inserimento, rimozione, repricing) viene presa senza contesto. La mappa ti dice dove agire in 5 minuti.", riskIfIgnored: "Prendi decisioni su una lista senza vedere la struttura. È come ristrutturare una casa senza planimetria." },
      queSignifica:
        "Il wine mapping è la rappresentazione visiva della tua carta in una matrice che incrocia almeno due variabili: tipicamente tipo di vino × fascia di prezzo, o stile × origine. L'architettura della carta è il passo successivo: assegnare un ruolo commerciale a ogni zona della mappa (attrazione, conversione, posizionamento, esplorazione). Una mappa ben letta ti dice dove agire. Un'architettura ben definita ti dice perché.",
      porQueImporta:
        "Perché senza una mappa non puoi vedere la struttura della tua carta. E senza struttura, ogni decisione (aggiungere, togliere, repricing) viene presa senza contesto. Il wine mapping converte una lista di 200 referenze in un'immagine che qualsiasi responsabile può interpretare in 5 minuti. È lo strumento diagnostico più rapido che esiste per una carta dei vini.",
      queHacer: [
        "Crea una mappa della tua carta con assi tipo × prezzo. Ogni referenza è un punto sulla mappa.",
        "Identifica le zone dense (saturazione) e le zone vuote (opportunità o irrilevanza).",
        "Assegna ruoli: quale zona attrae il cliente? Quale converte? Quale posiziona il tuo ristorante?",
        "Usa la mappa per decisioni di inserimento/rimozione: se un vino nuovo cade in una zona satura, devi togliere un altro prima.",
      ],
      errores: [
        { mistake: "Non avere una mappa visiva della carta", consequence: "Prendi decisioni su una lista senza vedere la struttura. È come ristrutturare una casa senza planimetria." },
        { mistake: "Fare il wine mapping una volta e non aggiornarlo", consequence: "La mappa scade con ogni cambio di carta. Deve essere un documento vivo." },
        { mistake: "Mappare solo per tipo e prezzo senza includere dati di vendita", consequence: "Vedi la struttura ma non sai quali zone funzionano e quali no." },
      ],
    },
  ],
  miniCases: [
    {
      profile: "Gastronomico con carta di 180 referenze",
      situation: "Il 65% della carta erano rossi di Rioja e Ribera, concentrati tra 25 € e 35 €. Bianchi e spumanti rappresentavano solo il 12%. Il team di sala riconosceva che molti clienti chiedevano 'qualcosa di fresco' e non trovavano opzioni.",
      action: "Ha mappato la carta per tipo × prezzo. Ha rimosso 14 rossi ridondanti nella fascia satura e aggiunto 6 bianchi e 3 spumanti in fasce vuote (15-25 € e 35-50 €). Ha redistribuito senza toccare il totale delle referenze.",
      result: "Le vendite di bianco sono salite del 28% nel primo mese. Il ticket medio vino è aumentato di 2,40 € perché i clienti trovavano opzioni dove prima non ce n'erano.",
    },
    {
      profile: "Hotel boutique con carta di 310 referenze",
      situation: "Carta ampia e complessa gestita come lista, senza wine mapping. Il 22% delle referenze non si era venduto in 90 giorni. Il team acquisti non sapeva cosa togliere perché 'tutto poteva vendersi'.",
      action: "Ha implementato Winerim Core per generare il wine mapping automatico. Ha identificato 68 referenze in zone di saturazione e 4 fasce di prezzo senza copertura. Ha rimosso 35 referenze in 3 fasi mensili.",
      result: "Il rapporto di efficacia è passato dal 72% all'89%. Capitale liberato dallo stock: 8.200 €. Il team di sala è passato dal raccomandare sempre gli stessi vini a coprire richieste diversificate.",
    },
    {
      profile: "Wine bar con 95 referenze e alta rotazione",
      situation: "Tutti i vini erano tra 18 € e 30 €. Niente sotto i 15 € (ingresso) né sopra i 45 € (speciale). Il cliente casual se ne andava senza ordinare e l'intenditore non trovava profondità.",
      action: "Ha creato tre nuove fasce: ingresso (<15 €, 4 vini), esplorazione (35-45 €, 5 vini) e immagine (>50 €, 3 vini). Ha ridotto la fascia centrale da 95 a 83 referenze.",
      result: "La penetrazione vino per tavolo è salita dal 62% al 74%. I vini d'immagine aprivano conversazioni che il team sfruttava per vendere la fascia esplorazione.",
    },
    {
      profile: "Gruppo di 5 locali casual-premium",
      situation: "Ogni locale aveva una carta diversa creata dal suo responsabile di sala. Non c'era uno standard di equilibrio per tipo né per prezzo. Due locali non avevano spumanti; uno aveva il 40% di rosati senza domanda.",
      action: "Ha definito un'architettura di carta comune: distribuzione obiettivo per tipo (50% rosso, 25% bianco, 15% spumante, 10% altro) con margine di adattamento locale del ±10%. Ha usato Winerim Core per monitorare le deviazioni mensili.",
      result: "In 3 mesi, tutti e 5 i locali hanno raggiunto l'equilibrio senza perdere identità. Il locale con eccesso di rosato ha ridotto lo stock morto del 60%. Il benchmarking tra locali ha permesso di individuare best practice replicabili.",
    },
  ],
  nextStep: {
    label: "Rivedi l'equilibrio della tua carta",
    href: "/recursos/plantilla-equilibrio-carta",
    description: "Scarica il template e diagnostica saturazioni, vuoti e cannibalizzazione nella tua carta attuale.",
  },
};

export default cartaEquilibrioIT;
