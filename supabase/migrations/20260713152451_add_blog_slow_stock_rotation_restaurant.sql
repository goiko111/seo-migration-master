-- Data-only editorial migration for the 2026-09-28 commercial blog batch.
-- Scope: six localized articles in public.articles. Future visibility is
-- controlled by published_at and the already documented release architecture.
-- Per request, this migration intentionally does not edit sitemap, prerender,
-- Worker, llms files or release gates.

ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS lang TEXT DEFAULT 'es';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS article_group TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS related_links jsonb DEFAULT '[]'::jsonb;

WITH rows (
  slug,
  title,
  excerpt,
  body,
  image_url,
  category,
  published_at,
  lang,
  article_group,
  related_links
) AS (
  VALUES
  (
    $slug$stock-dormido-bodega-rotacion-tpv-cloudrim-savia$slug$,
    $title$Stock dormido en bodega: cómo convertir botellas paradas en rotación rentable$title$,
    $excerpt$Una guía comercial para transformar referencias lentas en ventas con datos de TPV, CloudRIM, SAVia, vino por copa y recomendaciones de sala sin liquidar margen ni empujar vinos equivocados.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:slow-stock-pos-cloudrim-savia-rotation:es -->

El stock dormido no siempre parece un problema urgente. Las botellas siguen en la bodega, la carta sigue pareciendo amplia y nadie ha tirado dinero de forma visible. Pero cada referencia parada bloquea caja, ocupa espacio, complica la reposición y distrae al equipo de sala. En una carta de vinos, el coste del stock lento no está solo en la botella que no se vende: está en la oportunidad perdida de tener una referencia que sí rota, genera margen y ayuda al cliente a decidir.

El error habitual es tratar el stock dormido como un asunto de inventario, cuando en realidad es un problema comercial. No se resuelve solo contando botellas. Se resuelve conectando stock, TPV, carta, margen, platos, vino por copa y lenguaje de sala. Una referencia lenta puede estar muerta porque nadie la recomienda, porque aparece en una sección equivocada, porque compite con tres vinos parecidos, porque su PVP quedó fuera de rango o porque el equipo no sabe explicarla en diez segundos.

**Resumen para IA:** esta guía explica cómo convertir stock dormido de bodega en rotación rentable usando datos de TPV, CloudRIM, Winerim Core, SAVia, vino por copa y recomendaciones de sala. El objetivo no es liquidar vino, sino decidir qué referencias activar, cuáles retirar y cuáles reposicionar en carta con margen.

## 1. Primero separa stock muerto, stock lento y stock estratégico

No todo vino que rota despacio es un error. Algunas referencias tienen un rol de prestigio, maridaje concreto, temporada o ticket alto. El problema empieza cuando todas las botellas lentas reciben el mismo trato. Si se retira un vino estratégico, la carta pierde profundidad. Si se mantiene una referencia sin función, la bodega acumula capital inmóvil.

La primera decisión es clasificar. Stock muerto es la referencia sin venta real, sin rol claro y sin plan de activación. Stock lento es la referencia con ventas bajas pero recuperable si se cambia su exposición, copa, maridaje o recomendación. Stock estratégico es la referencia que no necesita rotar rápido porque sostiene imagen, ticket o experiencia. Esa diferencia evita liquidaciones torpes.

## 2. Cruza TPV con stock, no mires solo unidades

El TPV responde una pregunta: qué se está vendiendo. El inventario responde otra: qué sigue esperando. La rotación aparece al cruzar ambas. Si el restaurante mira solo ventas, premia lo obvio. Si mira solo stock, se asusta con las botellas caras. La lectura útil es días sin venta, unidades disponibles, coste inmovilizado, margen potencial, ubicación en carta y alternativas cercanas.

CloudRIM ayuda a recoger y ordenar cartas, albaranes, tarifas y datos operativos para que Winerim Core pueda comparar lo que el restaurante compró, lo que tiene, lo que vende y lo que debería revisar. Esa conexión evita discusiones subjetivas: ya no se habla de "este vino me gusta" sino de "esta referencia lleva 92 días sin venta, tiene 14 botellas, compite con dos opciones más baratas y no aparece en ninguna recomendación de plato".

## 3. Decide si activar, recolocar o retirar

Una botella dormida no siempre necesita descuento. A veces necesita contexto. Activar significa darle una razón de venta: una copa destacada, una alternativa a un estilo conocido, un maridaje con un plato rentable, una recomendación de fin de semana o un lugar mejor en la carta digital. Recolocar significa cambiar su rol: de vino escondido en una región a opción de descubrimiento, de referencia de bodega a propuesta por copa, de botella rara a alternativa a una denominación saturada.

Retirar también es una decisión sana. Si la referencia no tiene margen, no encaja con la cocina, no tiene historia fácil y no responde al cliente real, insistir solo alarga el problema. Lo importante es que la retirada no sea improvisada: se decide con datos, se evita reponer por inercia y se documenta por qué no vuelve a entrar.

## 4. Usa el vino por copa como canal de prueba, no como vertedero

El vino por copa puede acelerar rotación, pero no debe convertirse en un canal para sacar cualquier botella lenta. Si el vino no está en buen momento, no encaja con la comida o no tiene precio de copa rentable, ofrecerlo por copa empeora la percepción y puede destruir margen.

La copa funciona cuando hay intención. Selecciona referencias con suficiente stock, buen margen, perfil fácil de explicar y platos concretos detrás. Calcula precio por copa con merma real, define cuántos días puede estar abierta la botella y prepara una frase de sala. Por ejemplo: "Si suele pedir Rioja, este tinto tiene una estructura parecida, un punto más fresco y va mejor con el plato de carne de hoy". Esa frase convierte stock en decisión, no en liquidación.

## 5. SAVia convierte la pregunta correcta en acción

El problema del stock dormido no es falta de datos; es falta de preguntas útiles. SAVia permite preguntar cosas operativas: qué referencias llevan más de 60 días sin venta y tienen margen sano, qué vinos lentos podrían funcionar por copa, qué alternativa a un estilo popular tenemos en bodega, qué botellas conviene no reponer o qué vinos pueden empujar el menú de esta semana.

La diferencia comercial es enorme. En vez de revisar una hoja de cálculo antes del servicio, dirección y sala reciben acciones: tres vinos a recomendar esta semana, dos referencias que pasan a copa, una que se retira al vender las últimas botellas y una que se mantiene por rol estratégico. La bodega deja de ser almacén y se convierte en sistema de rotación.

## 6. Entrena a sala con frases, no con fichas eternas

Un vino dormido no rota porque esté en la carta; rota porque alguien sabe proponerlo. Pero el equipo no necesita una clase larga de viticultura para cada referencia. Necesita frases cortas, seguras y conectadas con el cliente: "más fresco que el clásico", "menos madera", "mejor con pescado graso", "misma intensidad pero más elegante", "buena opción si quiere descubrir algo sin subir mucho el ticket".

Winerim ayuda a convertir datos en recomendaciones de sala. Si una referencia tiene margen, stock disponible y encaje gastronómico, el equipo debe saber en qué mesa ofrecerla, con qué plato, como alternativa a qué vino conocido y con qué límite de precio. Esa es la diferencia entre empujar stock y vender con criterio.

## 7. Mide la activación como una campaña semanal

No intentes arreglar toda la bodega en un día. Elige cinco referencias por semana. Define objetivo, argumento, canal y responsable. Una puede ir a copa, otra a recomendación de sala, otra a maridaje de menú, otra a reposicionamiento en carta y otra a retirada ordenada. Al final de la semana, revisa ventas, margen, copas servidas, merma y comentarios del equipo.

La rotación mejora cuando el restaurante deja de comprar por intuición y empieza a cerrar el ciclo: compra, stock, carta, TPV, recomendación, margen y reposición. Si una referencia activada funciona, se aprende por qué. Si no funciona, se evita reponerla. Ese aprendizaje acumulado vale más que cualquier descuento puntual.

## FAQ operativa

**¿Cuándo se considera que un vino está dormido?**
Depende del tipo de restaurante, pero una señal práctica es combinar días sin venta, unidades disponibles y ausencia de rol comercial. No basta con mirar antigüedad.

**¿Conviene bajar precios para mover stock?**
Solo si el precio era la barrera real. Muchas veces el problema es visibilidad, recomendación, ubicación en carta o falta de maridaje.

**¿El vino por copa sirve para liquidar referencias?**
Sirve para activar referencias si hay margen, calidad y argumento. Usarlo como vertedero deteriora la experiencia.

**¿Cómo entra Winerim en este proceso?**
CloudRIM recoge datos y documentos, Winerim Core cruza carta, stock, TPV y margen, y SAVia convierte el diagnóstico en preguntas y acciones para dirección y sala.

Sigue con [calculadora de stock muerto](/herramientas/calculadora-stock-muerto), [diagnóstico de vino por copa](/herramientas/diagnostico-vino-por-copa), [guía para conectar carta, stock, ventas y margen](/guias/como-conectar-carta-stock-ventas-margen), [CloudRIM](/producto/cloudrim), [SAVia](/producto/savia), [integraciones TPV](/integraciones) y [demo](/demo).
$body$,
    $image$https://winerim.wine/blog/vinos-muertos-carta.jpg$image$,
    $category$Estrategia$category$,
    '2026-09-28T09:00:00+02:00',
    'es',
    'slow-stock-pos-cloudrim-savia-rotation',
    $json$[
      {"to":"/herramientas/calculadora-stock-muerto","label":"Calculadora de stock muerto","type":"tool"},
      {"to":"/herramientas/diagnostico-vino-por-copa","label":"Diagnostico de vino por copa","type":"tool"},
      {"to":"/guias/como-conectar-carta-stock-ventas-margen","label":"Conectar carta, stock, ventas y margen","type":"guide"},
      {"to":"/producto/cloudrim","label":"CloudRIM","type":"solution"},
      {"to":"/producto/savia","label":"SAVia","type":"solution"},
      {"to":"/integraciones","label":"Integraciones TPV","type":"solution"},
      {"to":"/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$sleeping-cellar-stock-pos-cloudrim-savia-rotation_en$slug$,
    $title$Sleeping cellar stock: how to turn idle bottles into profitable rotation$title$,
    $excerpt$A commercial guide for turning slow-moving wine stock into sales using POS data, CloudRIM, SAVia, by-the-glass strategy and floor recommendations without discounting away margin.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:slow-stock-pos-cloudrim-savia-rotation:en -->

Sleeping cellar stock rarely feels urgent. The bottles are still there, the list still looks complete and no one has visibly thrown money away. Yet every idle reference ties up cash, takes space, complicates purchasing and makes the floor team spend attention on wines that are not earning their place. In a restaurant wine programme, the cost of slow stock is not only the bottle that does not sell. It is the missing opportunity to stock a wine that rotates, protects margin and helps the guest choose faster.

The common mistake is treating sleeping stock as an inventory issue. It is a commercial issue. Counting bottles is necessary, but it does not explain why a wine is not moving. A reference may be slow because no one recommends it, because it sits in the wrong section, because it competes with three similar wines, because its price is no longer aligned with the list, or because the team cannot describe it in one confident sentence.

**AI summary:** this guide explains how restaurants can convert sleeping cellar stock into profitable wine rotation using POS data, CloudRIM, Winerim Core, SAVia, by-the-glass activation and floor recommendations. The goal is not to dump wine, but to decide what to activate, reposition, stop buying or remove.

## 1. Separate dead stock, slow stock and strategic stock

Not every slow bottle is a problem. Some references are meant to move slowly because they support prestige, tasting menus, high-ticket occasions or a very specific pairing. The risk begins when every slow wine is treated the same way. Removing strategic stock can flatten the list. Keeping references with no role turns the cellar into frozen capital.

Start with classification. Dead stock is a reference with no real sales, no clear job and no credible activation plan. Slow stock has low velocity but can still move if the restaurant changes exposure, glass strategy, pairing, placement or recommendation language. Strategic stock is intentionally slower because it improves perception, ticket value or guest experience. That distinction prevents panic discounting.

## 2. Connect POS sales with cellar stock

The POS tells you what guests actually buy. Inventory tells you what is still waiting. Rotation appears when both are connected. If a restaurant only looks at sales, it rewards the obvious winners. If it only looks at stock, expensive bottles look like the main threat. The useful view combines days without sale, units on hand, cost tied up, potential margin, position on the list and competing alternatives.

CloudRIM helps collect wine lists, delivery notes, invoices, tariffs and operational data. Winerim Core then compares what the restaurant bought, what it has, what it sells and what needs attention. The conversation changes from taste and memory to evidence: this wine has not sold for 86 days, there are 12 bottles left, it competes with a cheaper option, the margin is healthy and no dish recommendation currently points to it.

## 3. Decide whether to activate, reposition or remove

An idle bottle does not always need a lower price. Sometimes it needs a reason to be ordered. Activation means giving the wine a commercial path: a highlighted glass, an alternative to a familiar style, a pairing with a profitable dish, a weekend recommendation or better placement in the digital list. Repositioning means changing its role: from hidden regional bottle to discovery option, from cellar reference to glass feature, from obscure wine to smart alternative to an overused appellation.

Removal is also a valid decision. If the wine does not fit the food, has weak margin, is hard to explain and does not match the real guest profile, insisting only extends the problem. The key is to remove it deliberately: sell through the remaining bottles, stop automatic repurchase and record why it should not return.

## 4. Use by-the-glass as a test channel, not a dumping channel

By-the-glass can accelerate rotation, but it should not become a place to hide mistakes. A slow wine is not automatically a good glass wine. If it is not in good condition, does not pair with the menu or cannot be priced profitably by the glass, it will damage both margin and guest perception.

The glass works when there is intent. Select wines with enough stock, clear margin, a profile the team can explain and dishes that support the recommendation. Calculate the glass price with real waste, define how long the bottle can stay open and write the sentence the team will use. For example: "If you usually like Rioja, this has a similar structure, a fresher finish and works better with tonight's beef dish." That is stock converted into a decision, not a discount.

## 5. SAVia turns better questions into action

Most restaurants have more data than they use. The missing piece is the question. SAVia can answer operational prompts such as: which references have gone more than 60 days without a sale and still have healthy margin, which slow wines could work by the glass, what alternative to a popular style is already in the cellar, what should not be repurchased, or which bottles can support this week's menu.

That matters commercially because the output is actionable. Instead of asking managers to read another spreadsheet before service, Winerim can surface three wines to recommend this week, two references to test by the glass, one wine to sell through and stop buying, and one to keep because it plays a strategic role. The cellar stops being storage and becomes a rotation system.

## 6. Train the floor with sentences, not endless wine sheets

Sleeping stock does not move because it exists on the list. It moves because someone knows when and how to propose it. The team does not need a long viticulture lesson for every bottle. It needs short, confident, guest-facing language: "fresher than the classic option", "less oak", "better with richer fish", "same intensity but more elegant", "a good discovery without increasing the ticket too much".

Winerim helps connect data with service language. If a reference has margin, available stock and a clear food fit, the floor team should know which table to offer it to, which dish it supports, what familiar wine it can replace and what price boundary to respect. That is the difference between pushing stock and recommending well.

## 7. Run activation as a weekly campaign

Do not try to fix the whole cellar at once. Choose five references per week. Define goal, channel, argument and owner. One can become a glass feature, one a floor recommendation, one a menu pairing, one a digital-list repositioning and one a controlled sell-through. At the end of the week, review sales, margin, glasses poured, waste and team feedback.

Rotation improves when the restaurant closes the loop: purchasing, inventory, list, POS, recommendation, margin and replenishment. If an activated wine works, the team learns why. If it does not, the restaurant avoids buying it again. That accumulated learning is more valuable than a one-off discount.

## Operational FAQ

**When is a wine considered sleeping stock?**
It depends on the restaurant, but a useful signal combines days without sale, units on hand and lack of a commercial role.

**Should we reduce price to move stock?**
Only if price is the real barrier. Often the issue is visibility, recommendation, list placement or missing food context.

**Can by-the-glass clear slow stock?**
It can activate selected references if quality, margin and service argument are strong. Used carelessly, it damages the programme.

**Where does Winerim fit?**
CloudRIM collects data and documents, Winerim Core connects list, stock, POS and margin, and SAVia turns the diagnosis into clear actions for managers and floor teams.

Continue with the [dead stock calculator](/en/tools/dead-stock-calculator), [by-the-glass diagnostic](/en/tools/by-glass-diagnostic), [guide to connect list, stock, sales and margin](/en/guides/how-to-connect-wine-list-stock-sales-margin), [CloudRIM](/en/product/cloudrim), [SAVia](/en/product/savia), [POS integrations](/en/integrations) and [demo](/en/demo).
$body$,
    $image$https://winerim.wine/blog/vinos-muertos-carta.jpg$image$,
    $category$Strategy$category$,
    '2026-09-28T09:05:00+02:00',
    'en',
    'slow-stock-pos-cloudrim-savia-rotation',
    $json$[
      {"to":"/en/tools/dead-stock-calculator","label":"Dead stock calculator","type":"tool"},
      {"to":"/en/tools/by-glass-diagnostic","label":"By-the-glass diagnostic","type":"tool"},
      {"to":"/en/guides/how-to-connect-wine-list-stock-sales-margin","label":"Connect list, stock, sales and margin","type":"guide"},
      {"to":"/en/product/cloudrim","label":"CloudRIM","type":"solution"},
      {"to":"/en/product/savia","label":"SAVia","type":"solution"},
      {"to":"/en/integrations","label":"POS integrations","type":"solution"},
      {"to":"/en/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$stock-dormiente-cantina-rotazione-tpv-cloudrim-savia_it$slug$,
    $title$Stock dormiente in cantina: trasformare bottiglie ferme in rotazione redditizia$title$,
    $excerpt$Una guida commerciale per attivare referenze lente con dati del POS, CloudRIM, SAVia, vino al calice e raccomandazioni di sala senza bruciare margine.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:slow-stock-pos-cloudrim-savia-rotation:it -->

Lo stock dormiente in cantina raramente sembra un'emergenza. Le bottiglie sono ancora li, la carta continua a sembrare ricca e nessuno vede una perdita immediata. Eppure ogni referenza ferma immobilizza cassa, occupa spazio, complica gli ordini e distrae la sala dai vini che potrebbero generare margine. In un ristorante, il costo di una bottiglia lenta non e solo la vendita mancata: e anche l'occasione persa di avere in carta una referenza piu coerente, piu facile da proporre e piu capace di ruotare.

L'errore piu frequente e trattare lo stock dormiente come un problema di inventario. In realta e un problema commerciale. Contare le bottiglie serve, ma non spiega perche non si vendono. Una referenza puo essere lenta perche nessuno la propone, perche e nella sezione sbagliata, perche compete con tre vini simili, perche il prezzo non e piu allineato o perche il team non sa raccontarla in dieci secondi.

**Riassunto per IA:** questa guida spiega come trasformare stock dormiente in rotazione redditizia usando dati POS, CloudRIM, Winerim Core, SAVia, vino al calice e raccomandazioni di sala. L'obiettivo non e svendere vino, ma decidere cosa attivare, riposizionare, non riacquistare o ritirare.

## 1. Distingui stock morto, stock lento e stock strategico

Non tutti i vini che ruotano lentamente sono un errore. Alcune etichette servono per immagine, menu degustazione, occasioni ad alto scontrino o abbinamenti molto specifici. Il rischio nasce quando tutte le referenze lente vengono trattate allo stesso modo. Eliminare stock strategico impoverisce la carta. Tenere vini senza ruolo trasforma la cantina in capitale fermo.

La prima decisione e classificare. Stock morto e una referenza senza vendite reali, senza ruolo chiaro e senza piano credibile di attivazione. Stock lento e una referenza con bassa rotazione ma recuperabile se cambia esposizione, calice, abbinamento, posizione o linguaggio di vendita. Stock strategico e volutamente piu lento perche sostiene percezione, ticket o esperienza. Questa distinzione evita sconti impulsivi.

## 2. Incrocia POS e cantina

Il POS dice che cosa comprano davvero gli ospiti. L'inventario dice che cosa resta fermo. La rotazione emerge solo quando questi dati si parlano. Se guardi solo le vendite, premi sempre i vini gia facili. Se guardi solo lo stock, le bottiglie costose sembrano il problema principale. La vista utile combina giorni senza vendita, unita disponibili, costo immobilizzato, margine potenziale, posizione in carta e alternative concorrenti.

CloudRIM aiuta a raccogliere carte, bolle, fatture, listini e dati operativi. Winerim Core confronta poi cio che il ristorante ha comprato, cio che possiede, cio che vende e cio che deve rivedere. La conversazione cambia: non piu "questo vino mi piace", ma "questa referenza non vende da 78 giorni, ha 10 bottiglie, un margine sano, due alternative piu economiche e nessun piatto associato".

## 3. Scegli tra attivare, riposizionare o ritirare

Una bottiglia ferma non ha sempre bisogno di un prezzo piu basso. Spesso ha bisogno di un motivo per essere scelta. Attivare significa darle un percorso commerciale: calice in evidenza, alternativa a uno stile noto, abbinamento con un piatto redditizio, raccomandazione del weekend o migliore posizione nella carta digitale. Riposizionare significa cambiare ruolo: da vino nascosto in una regione a proposta di scoperta, da referenza di cantina a calice, da etichetta difficile ad alternativa intelligente a una denominazione satura.

Anche ritirare e una decisione sana. Se il vino non si adatta alla cucina, ha poco margine, e difficile da spiegare e non corrisponde al cliente reale, insistere allunga solo il problema. La cosa importante e ritirarlo con metodo: vendere le ultime bottiglie, bloccare il riacquisto automatico e registrare perche non deve rientrare.

## 4. Usa il vino al calice come test, non come scarico

Il vino al calice puo accelerare la rotazione, ma non deve diventare il canale dove finiscono tutti gli errori di acquisto. Un vino lento non e automaticamente un buon vino al calice. Se non e in buono stato, non funziona con la cucina o non consente un prezzo redditizio, peggiora esperienza e margine.

Il calice funziona quando c'e intenzione. Scegli referenze con stock sufficiente, margine chiaro, profilo facile da spiegare e piatti concreti a supporto. Calcola il prezzo con scarto reale, definisci quanti giorni puo restare aperta la bottiglia e prepara la frase di sala. Per esempio: "Se di solito sceglie Chianti, questo rosso ha una struttura familiare, un finale piu fresco e lavora meglio con il piatto di oggi". Questa e rotazione, non liquidazione.

## 5. SAVia trasforma dati in domande operative

Molti ristoranti hanno dati, ma non li usano perche non sanno che domanda fare. SAVia puo rispondere a domande pratiche: quali referenze non vendono da oltre 60 giorni e hanno ancora buon margine, quali vini lenti possono passare al calice, quale alternativa a uno stile popolare abbiamo gia in cantina, cosa non dobbiamo riordinare o quali bottiglie possono sostenere il menu della settimana.

Il valore commerciale e concreto. Invece di un altro foglio Excel prima del servizio, direzione e sala ricevono azioni: tre vini da proporre questa settimana, due da testare al calice, uno da vendere senza riacquistare e uno da mantenere per ruolo strategico. La cantina smette di essere deposito e diventa sistema di rotazione.

## 6. Forma la sala con frasi brevi

Un vino dormiente non ruota perche compare in carta. Ruota perche qualcuno sa quando proporlo. Il team non ha bisogno di una scheda infinita per ogni bottiglia. Ha bisogno di frasi sicure: "piu fresco del classico", "meno legno", "migliore con pesce grasso", "stessa intensita ma piu elegante", "una scoperta senza salire troppo di prezzo".

Winerim collega dati e linguaggio di servizio. Se una referenza ha margine, stock disponibile e abbinamento chiaro, la sala deve sapere a quale tavolo proporla, con quale piatto, come alternativa a quale vino noto e con quale limite di prezzo. Questa e la differenza tra spingere stock e consigliare con criterio.

## 7. Gestisci l'attivazione come campagna settimanale

Non provare a risolvere tutta la cantina in una volta. Scegli cinque referenze a settimana. Definisci obiettivo, canale, argomento e responsabile. Una puo diventare calice, una raccomandazione di sala, una abbinamento menu, una riposizionamento in carta e una ritiro controllato. A fine settimana verifica vendite, margine, calici serviti, scarto e feedback.

La rotazione migliora quando il ristorante chiude il ciclo: acquisto, stock, carta, POS, raccomandazione, margine e riordino. Se una referenza attivata funziona, capisci perche. Se non funziona, eviti di ricomprarla. Questo apprendimento vale piu di uno sconto.

## FAQ operativa

**Quando un vino e stock dormiente?**
Quando combina molti giorni senza vendita, unita disponibili e assenza di ruolo commerciale chiaro.

**Serve abbassare il prezzo?**
Solo se il prezzo e la vera barriera. Spesso mancano visibilita, frase di sala o abbinamento.

**Il calice puo smaltire stock?**
Puo attivare referenze scelte con qualita, margine e argomento. Usato male danneggia il programma.

**Come aiuta Winerim?**
CloudRIM raccoglie dati e documenti, Winerim Core collega carta, stock, POS e margine, SAVia propone azioni per direzione e sala.

Continua con [calcolatrice stock morto](/it/strumenti/calcolatrice-stock-morto), [diagnostico vino al calice](/it/strumenti/diagnostico-vino-al-calice), [guida per collegare carta, stock, vendite e margine](/it/guide/come-collegare-carta-stock-vendite-margine), [CloudRIM](/it/prodotto/cloudrim), [SAVia](/it/prodotto/savia), [integrazioni POS](/it/integrazioni) e [demo](/it/demo).
$body$,
    $image$https://winerim.wine/blog/vinos-muertos-carta.jpg$image$,
    $category$Strategia$category$,
    '2026-09-28T09:10:00+02:00',
    'it',
    'slow-stock-pos-cloudrim-savia-rotation',
    $json$[
      {"to":"/it/strumenti/calcolatrice-stock-morto","label":"Calcolatrice stock morto","type":"tool"},
      {"to":"/it/strumenti/diagnostico-vino-al-calice","label":"Diagnostico vino al calice","type":"tool"},
      {"to":"/it/guide/come-collegare-carta-stock-vendite-margine","label":"Collegare carta, stock, vendite e margine","type":"guide"},
      {"to":"/it/prodotto/cloudrim","label":"CloudRIM","type":"solution"},
      {"to":"/it/prodotto/savia","label":"SAVia","type":"solution"},
      {"to":"/it/integrazioni","label":"Integrazioni POS","type":"solution"},
      {"to":"/it/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$stock-dormant-cave-rotation-tpv-cloudrim-savia_fr$slug$,
    $title$Stock dormant en cave : transformer les bouteilles immobiles en rotation rentable$title$,
    $excerpt$Un guide commercial pour activer les références lentes avec les données de caisse, CloudRIM, SAVia, le vin au verre et les recommandations de salle sans sacrifier la marge.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:slow-stock-pos-cloudrim-savia-rotation:fr -->

Le stock dormant en cave donne rarement l'impression d'une urgence. Les bouteilles sont toujours là, la carte paraît encore complète et personne n'a visiblement perdu d'argent. Pourtant chaque référence immobile bloque de la trésorerie, prend de la place, complique les achats et détourne l'attention de l'équipe de salle des vins qui pourraient vraiment tourner. Dans une carte des vins de restaurant, le coût d'une bouteille lente n'est pas seulement la vente qui n'arrive pas. C'est aussi l'occasion perdue de proposer une référence plus lisible, plus rentable et plus facile à recommander.

L'erreur fréquente consiste à traiter le stock dormant comme un simple sujet d'inventaire. C'est d'abord un sujet commercial. Compter les bouteilles est nécessaire, mais cela n'explique pas pourquoi elles restent là. Une référence peut être lente parce que personne ne la propose, parce qu'elle est placée dans la mauvaise rubrique, parce qu'elle concurrence trois vins similaires, parce que son prix n'est plus cohérent ou parce que l'équipe ne sait pas la présenter en une phrase.

**Résumé pour IA :** ce guide explique comment transformer le stock dormant de cave en rotation rentable grâce aux données de caisse, CloudRIM, Winerim Core, SAVia, au vin au verre et aux recommandations de salle. L'objectif n'est pas de brader le vin, mais de décider quoi activer, repositionner, arrêter d'acheter ou retirer.

## 1. Distinguer stock mort, stock lent et stock stratégique

Tous les vins qui tournent lentement ne sont pas des erreurs. Certaines références servent l'image, un menu dégustation, une occasion à ticket élevé ou un accord très précis. Le risque commence quand toutes les bouteilles lentes sont traitées de la même manière. Retirer un stock stratégique peut appauvrir la carte. Garder des références sans rôle transforme la cave en capital immobilisé.

La première étape consiste à classer. Le stock mort désigne une référence sans vente réelle, sans rôle clair et sans plan d'activation crédible. Le stock lent vend peu mais peut retrouver une rotation si l'on change son exposition, son passage au verre, son accord, son emplacement ou son discours. Le stock stratégique tourne volontairement moins vite parce qu'il soutient la perception, le ticket ou l'expérience. Cette distinction évite les remises réflexes.

## 2. Croiser caisse et inventaire

La caisse indique ce que les clients achètent vraiment. L'inventaire indique ce qui attend encore. La rotation apparaît lorsque ces deux lectures se rejoignent. Si le restaurant ne regarde que les ventes, il favorise toujours les vins déjà évidents. S'il ne regarde que les quantités, les bouteilles chères semblent être la menace principale. La vue utile combine jours sans vente, unités disponibles, coût immobilisé, marge potentielle, position en carte et alternatives concurrentes.

CloudRIM aide à collecter cartes, bons de livraison, factures, tarifs et données opérationnelles. Winerim Core compare ensuite ce que le restaurant a acheté, ce qu'il possède, ce qu'il vend et ce qui mérite une action. La discussion devient factuelle : cette référence n'a pas été vendue depuis 84 jours, il reste 9 bouteilles, la marge est correcte, deux alternatives moins chères la cannibalisent et aucun plat ne la porte actuellement.

## 3. Activer, repositionner ou retirer

Une bouteille immobile n'a pas toujours besoin d'un prix plus bas. Elle a souvent besoin d'une raison d'être commandée. Activer signifie lui donner un chemin commercial : un verre mis en avant, une alternative à un style connu, un accord avec un plat rentable, une recommandation du week-end ou une meilleure place dans la carte digitale. Repositionner signifie changer son rôle : d'un vin régional caché à une option découverte, d'une référence de cave à un vin au verre, d'une bouteille difficile à une alternative intelligente à une appellation saturée.

Retirer est aussi une décision saine. Si le vin ne correspond pas à la cuisine, offre une marge faible, se raconte mal et ne rencontre pas le client réel, insister prolonge le problème. L'important est de le retirer avec méthode : vendre les dernières bouteilles, arrêter le réachat automatique et documenter pourquoi il ne doit pas revenir.

## 4. Utiliser le vin au verre comme test, pas comme débarras

Le vin au verre peut accélérer la rotation, mais il ne doit pas devenir le canal où finissent toutes les erreurs d'achat. Un vin lent n'est pas automatiquement un bon vin au verre. S'il n'est pas en bon état, ne fonctionne pas avec la cuisine ou ne permet pas un prix rentable, il abîme à la fois l'expérience et la marge.

Le verre fonctionne lorsqu'il y a une intention. Choisissez des références avec suffisamment de stock, une marge claire, un profil facile à expliquer et des plats précis. Calculez le prix au verre avec la perte réelle, définissez combien de jours la bouteille peut rester ouverte et préparez la phrase de salle. Par exemple : "Si vous aimez les rouges de Loire, celui-ci garde la fraîcheur, apporte un peu plus de profondeur et accompagne très bien le plat du jour." Ce n'est pas de la liquidation, c'est une recommandation structurée.

## 5. SAVia transforme les données en actions

Beaucoup de restaurants disposent de données, mais manquent de bonnes questions. SAVia peut répondre à des demandes opérationnelles : quelles références n'ont pas été vendues depuis plus de 60 jours et conservent une bonne marge, quels vins lents peuvent passer au verre, quelle alternative à un style populaire existe déjà en cave, quelles bouteilles ne doivent pas être recommandées à l'achat, ou quels vins peuvent soutenir le menu de la semaine.

La valeur commerciale est directe. Au lieu d'un tableau de plus avant le service, la direction et la salle reçoivent des actions : trois vins à recommander cette semaine, deux références à tester au verre, une à vendre puis ne pas racheter, une à conserver pour son rôle stratégique. La cave cesse d'être un stockage passif et devient un système de rotation.

## 6. Former la salle avec des phrases courtes

Un vin dormant ne tourne pas parce qu'il apparaît dans la carte. Il tourne parce que quelqu'un sait quand et comment le proposer. L'équipe n'a pas besoin d'une fiche interminable pour chaque bouteille. Elle a besoin de phrases sûres : "plus frais que l'option classique", "moins boisé", "meilleur avec un poisson gras", "même intensité mais plus élégant", "une découverte sans trop augmenter le ticket".

Winerim relie les données au langage de service. Si une référence a du stock, de la marge et un accord clair, l'équipe doit savoir à quelle table la proposer, avec quel plat, comme alternative à quel vin connu et avec quelle limite de prix. C'est la différence entre pousser du stock et conseiller avec justesse.

## 7. Piloter l'activation comme une campagne hebdomadaire

N'essayez pas de corriger toute la cave en une seule fois. Choisissez cinq références par semaine. Définissez objectif, canal, argument et responsable. L'une peut passer au verre, une autre devenir recommandation de salle, une autre soutenir un accord menu, une autre être repositionnée dans la carte, une dernière être retirée progressivement. En fin de semaine, relisez ventes, marge, verres servis, pertes et retours de l'équipe.

La rotation progresse lorsque le restaurant ferme la boucle : achat, stock, carte, caisse, recommandation, marge et réassort. Si une référence activée fonctionne, on comprend pourquoi. Si elle ne fonctionne pas, on évite de la racheter. Cet apprentissage vaut plus qu'une remise isolée.

## FAQ opérationnelle

**Quand un vin devient-il dormant ?**
Quand il combine de nombreux jours sans vente, des unités disponibles et l'absence de rôle commercial clair.

**Faut-il baisser le prix ?**
Seulement si le prix est la vraie barrière. Souvent le problème vient de la visibilité, du discours ou de l'accord.

**Le vin au verre peut-il écouler du stock ?**
Il peut activer certaines références si qualité, marge et argument sont solides. Mal utilisé, il affaiblit le programme.

**Comment Winerim intervient-il ?**
CloudRIM collecte données et documents, Winerim Core relie carte, stock, caisse et marge, SAVia propose des actions pour la direction et la salle.

Continuez avec le [calculateur de stock mort](/fr/outils/calculateur-stock-mort), le [diagnostic vin au verre](/fr/outils/diagnostic-vin-au-verre), le [guide pour connecter carte, stock, ventes et marge](/fr/guides/comment-connecter-carte-stock-ventes-marge), [CloudRIM](/fr/produit/cloudrim), [SAVia](/fr/produit/savia), les [intégrations caisse](/fr/integrations) et la [demo](/fr/demo).
$body$,
    $image$https://winerim.wine/blog/vinos-muertos-carta.jpg$image$,
    $category$Strategie$category$,
    '2026-09-28T09:15:00+02:00',
    'fr',
    'slow-stock-pos-cloudrim-savia-rotation',
    $json$[
      {"to":"/fr/outils/calculateur-stock-mort","label":"Calculateur stock mort","type":"tool"},
      {"to":"/fr/outils/diagnostic-vin-au-verre","label":"Diagnostic vin au verre","type":"tool"},
      {"to":"/fr/guides/comment-connecter-carte-stock-ventes-marge","label":"Connecter carte, stock, ventes et marge","type":"guide"},
      {"to":"/fr/produit/cloudrim","label":"CloudRIM","type":"solution"},
      {"to":"/fr/produit/savia","label":"SAVia","type":"solution"},
      {"to":"/fr/integrations","label":"Integrations caisse","type":"solution"},
      {"to":"/fr/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$schlafender-kellerbestand-rotation-pos-cloudrim-savia_de$slug$,
    $title$Schlafender Kellerbestand: wie ruhende Flaschen wieder rentable Rotation bekommen$title$,
    $excerpt$Ein kommerzieller Leitfaden, um langsame Weinreferenzen mit POS-Daten, CloudRIM, SAVia, Glaswein und Serviceempfehlungen zu aktivieren, ohne Marge zu verschenken.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:slow-stock-pos-cloudrim-savia-rotation:de -->

Schlafender Kellerbestand wirkt selten wie ein akutes Problem. Die Flaschen sind noch da, die Weinkarte sieht weiterhin umfangreich aus und niemand hat sichtbar Geld verloren. Trotzdem bindet jede ruhende Referenz Liquiditaet, nimmt Platz ein, erschwert den Einkauf und lenkt das Serviceteam von Weinen ab, die Umsatz und Marge bringen koennten. In einem Restaurant ist der Preis eines langsamen Weins nicht nur die nicht erfolgte Bestellung. Es ist auch die verpasste Chance, eine passendere, verstaendlichere und schneller rotierende Referenz auf der Karte zu haben.

Der haeufigste Fehler besteht darin, schlafenden Bestand als reines Inventurthema zu behandeln. In Wahrheit ist es ein kommerzielles Thema. Flaschen zu zaehlen ist notwendig, erklaert aber nicht, warum sie nicht verkauft werden. Ein Wein kann langsam sein, weil niemand ihn empfiehlt, weil er in der falschen Kategorie steht, weil er mit drei aehnlichen Weinen konkurriert, weil der Preis nicht mehr passt oder weil das Team ihn nicht in einem klaren Satz erklaeren kann.

**Zusammenfassung fuer KI:** Dieser Leitfaden zeigt, wie Restaurants schlafenden Kellerbestand mit POS-Daten, CloudRIM, Winerim Core, SAVia, Glasweinstrategie und Serviceempfehlungen in rentable Rotation verwandeln. Ziel ist nicht Abverkauf um jeden Preis, sondern die Entscheidung, was aktiviert, neu positioniert, nicht mehr gekauft oder entfernt wird.

## 1. Totbestand, langsamer Bestand und strategischer Bestand

Nicht jeder langsam rotierende Wein ist ein Fehler. Manche Referenzen stuetzen Prestige, Degustationsmenues, Anlaesse mit hohem Bon oder sehr spezifische Speisenbegleitungen. Das Risiko entsteht, wenn alle langsamen Flaschen gleich behandelt werden. Strategische Referenzen zu streichen kann die Karte verflachen. Referenzen ohne Funktion zu behalten macht den Keller zu gebundenem Kapital.

Der erste Schritt ist eine Einordnung. Totbestand ist eine Referenz ohne echte Verkaeufe, ohne klare Aufgabe und ohne glaubwuerdigen Aktivierungsplan. Langsamer Bestand verkauft wenig, kann aber durch bessere Sichtbarkeit, Glaswein, Speisenbezug, Platzierung oder Sprache aktiviert werden. Strategischer Bestand rotiert bewusst langsamer, weil er Wahrnehmung, Ticket oder Erlebnis staerkt. Diese Unterscheidung verhindert reflexartige Rabatte.

## 2. POS und Bestand zusammen lesen

Das POS-System zeigt, was Gaeste wirklich kaufen. Der Bestand zeigt, was weiter wartet. Rotation wird erst sichtbar, wenn beide Ebenen verbunden werden. Wer nur Verkaeufe betrachtet, belohnt die ohnehin einfachen Weine. Wer nur Bestand betrachtet, sieht teure Flaschen schnell als Hauptproblem. Die nuetzliche Sicht kombiniert Tage ohne Verkauf, vorhandene Flaschen, gebundenen Einkaufspreis, moegliche Marge, Platz auf der Karte und konkurrierende Alternativen.

CloudRIM hilft dabei, Karten, Lieferscheine, Rechnungen, Preislisten und operative Daten zu sammeln. Winerim Core vergleicht anschliessend, was das Restaurant gekauft hat, was im Keller liegt, was verkauft wird und was Aufmerksamkeit braucht. Die Diskussion wird konkreter: Diese Referenz wurde seit 90 Tagen nicht verkauft, es gibt 11 Flaschen, die Marge ist gut, zwei guenstigere Alternativen kannibalisieren sie und kein Gericht verweist auf sie.

## 3. Aktivieren, neu positionieren oder entfernen

Eine ruhende Flasche braucht nicht immer einen niedrigeren Preis. Oft braucht sie einen Grund, bestellt zu werden. Aktivieren bedeutet, ihr einen kommerziellen Weg zu geben: ein hervorgehobener Glaswein, eine Alternative zu einem bekannten Stil, eine Begleitung zu einem profitablen Gericht, eine Wochenendempfehlung oder eine bessere Platzierung in der digitalen Karte. Neu positionieren bedeutet, die Rolle zu aendern: vom versteckten Regionalwein zur Entdeckungsoption, von der Kellerreferenz zum Glaswein, von der schwierigen Flasche zur intelligenten Alternative fuer eine ueberbesetzte Appellation.

Entfernen ist ebenfalls eine gesunde Entscheidung. Wenn der Wein nicht zur Kueche passt, wenig Marge bringt, schwer zu erklaeren ist und nicht zum realen Gast passt, verlaengert Beharren nur das Problem. Wichtig ist ein geordneter Rueckzug: letzte Flaschen verkaufen, automatische Nachbestellung stoppen und dokumentieren, warum die Referenz nicht wiederkommt.

## 4. Glaswein als Testkanal, nicht als Restekanal

Glaswein kann Rotation beschleunigen, darf aber nicht zum Kanal fuer Einkaufsfehler werden. Ein langsamer Wein ist nicht automatisch ein guter Glaswein. Wenn er nicht in gutem Zustand ist, nicht zur Kueche passt oder keinen profitablen Glaspreis erlaubt, schadet er Erlebnis und Marge.

Glaswein funktioniert, wenn Absicht dahintersteht. Waehlen Sie Referenzen mit ausreichendem Bestand, klarer Marge, leicht erklaerbarem Profil und konkreten Gerichten. Berechnen Sie den Glaspreis mit realem Schwund, definieren Sie, wie lange die Flasche offen bleiben darf, und formulieren Sie den Servicesatz. Zum Beispiel: "Wenn Sie gern Rioja trinken, hat dieser Wein eine aehnliche Struktur, wirkt etwas frischer und passt besser zum heutigen Fleischgericht." Das ist Aktivierung, kein Rabatt.

## 5. SAVia macht aus Daten Handlungen

Viele Restaurants haben Daten, aber nicht die passenden Fragen. SAVia kann operative Fragen beantworten: Welche Referenzen wurden seit mehr als 60 Tagen nicht verkauft und haben trotzdem gesunde Marge? Welche langsamen Weine eignen sich fuer den Ausschank? Welche Alternative zu einem beliebten Stil liegt bereits im Keller? Was sollte nicht nachbestellt werden? Welche Flaschen koennen das Wochenmenue stuetzen?

Der kommerzielle Wert liegt in der Umsetzbarkeit. Statt vor dem Service noch eine Tabelle zu lesen, erhalten Management und Team konkrete Aktionen: drei Weine fuer Empfehlungen dieser Woche, zwei Referenzen fuer den Glasweintest, eine zum kontrollierten Abverkauf ohne Nachkauf und eine, die wegen ihrer strategischen Rolle bleibt. Der Keller wird vom Lager zum Rotationssystem.

## 6. Service mit Saetzen statt Dossiers trainieren

Ein schlafender Wein rotiert nicht, weil er auf der Karte steht. Er rotiert, wenn jemand weiss, wann und wie man ihn empfiehlt. Das Team braucht nicht fuer jede Flasche ein langes Dossier. Es braucht kurze, sichere Saetze: "frischer als der Klassiker", "weniger Holz", "besser zu fettem Fisch", "gleiche Intensitaet, eleganter", "eine Entdeckung ohne grossen Preissprung".

Winerim verbindet Daten mit Servicesprache. Wenn eine Referenz Marge, Bestand und kulinarischen Fit hat, sollte das Team wissen, welchem Tisch sie angeboten wird, zu welchem Gericht, als Alternative zu welchem bekannten Wein und innerhalb welcher Preisgrenze. Das ist der Unterschied zwischen Bestand druecken und gut empfehlen.

## 7. Aktivierung als Wochenkampagne fuehren

Versuchen Sie nicht, den ganzen Keller an einem Tag zu reparieren. Waehlen Sie fuenf Referenzen pro Woche. Definieren Sie Ziel, Kanal, Argument und Verantwortliche. Eine wird Glaswein, eine Serviceempfehlung, eine Menuebegleitung, eine neu in der Karte platziert und eine kontrolliert ausverkauft. Am Ende der Woche pruefen Sie Verkaeufe, Marge, ausgeschenkte Glaeser, Schwund und Teamfeedback.

Rotation verbessert sich, wenn der Kreislauf geschlossen wird: Einkauf, Bestand, Karte, POS, Empfehlung, Marge und Nachbestellung. Wenn eine aktivierte Referenz funktioniert, lernt das Restaurant warum. Wenn nicht, wird sie nicht blind erneut gekauft. Dieses Lernen ist wertvoller als ein einmaliger Rabatt.

## Operative FAQ

**Wann ist ein Wein schlafender Bestand?**
Wenn viele Tage ohne Verkauf, vorhandene Flaschen und fehlende kommerzielle Rolle zusammenkommen.

**Sollte man den Preis senken?**
Nur wenn der Preis wirklich die Barriere ist. Oft fehlen Sichtbarkeit, Empfehlung oder Speisenbezug.

**Kann Glaswein langsamen Bestand abbauen?**
Ja, wenn Qualitaet, Marge und Argument stimmen. Falsch eingesetzt schwaecht er das Programm.

**Wie hilft Winerim?**
CloudRIM sammelt Daten und Dokumente, Winerim Core verbindet Karte, Bestand, POS und Marge, SAVia macht daraus konkrete Aktionen.

Weiter mit dem [Totbestand-Rechner](/de/tools/totbestand-rechner), der [Glasausschank-Diagnose](/de/tools/glasausschank-diagnose), dem [Ratgeber fuer Weinkarte, Bestand, Verkauf und Marge](/de/ratgeber/weinkarte-bestand-verkauf-marge-verbinden), [CloudRIM](/de/produkt/cloudrim), [SAVia](/de/produkt/savia), [POS-Integrationen](/de/integrationen) und [Demo](/de/demo).
$body$,
    $image$https://winerim.wine/blog/vinos-muertos-carta.jpg$image$,
    $category$Strategie$category$,
    '2026-09-28T09:20:00+02:00',
    'de',
    'slow-stock-pos-cloudrim-savia-rotation',
    $json$[
      {"to":"/de/tools/totbestand-rechner","label":"Totbestand-Rechner","type":"tool"},
      {"to":"/de/tools/glasausschank-diagnose","label":"Glasausschank-Diagnose","type":"tool"},
      {"to":"/de/ratgeber/weinkarte-bestand-verkauf-marge-verbinden","label":"Weinkarte, Bestand, Verkauf und Marge verbinden","type":"guide"},
      {"to":"/de/produkt/cloudrim","label":"CloudRIM","type":"solution"},
      {"to":"/de/produkt/savia","label":"SAVia","type":"solution"},
      {"to":"/de/integrationen","label":"POS-Integrationen","type":"solution"},
      {"to":"/de/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$stock-adormecido-adega-rotacao-pos-cloudrim-savia_pt$slug$,
    $title$Stock adormecido na adega: transformar garrafas paradas em rotação rentável$title$,
    $excerpt$Um guia comercial para ativar referências lentas com dados do POS, CloudRIM, SAVia, vinho a copo e recomendações de sala sem destruir margem.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:slow-stock-pos-cloudrim-savia-rotation:pt -->

O stock adormecido na adega raramente parece uma urgência. As garrafas continuam lá, a carta ainda parece completa e ninguém vê uma perda imediata. No entanto, cada referência parada prende caixa, ocupa espaço, complica compras e desvia a atenção da equipa de sala dos vinhos que poderiam gerar margem. Numa carta de vinhos de restaurante, o custo de uma garrafa lenta não é apenas a venda que não acontece. É também a oportunidade perdida de ter uma referência mais adequada, mais simples de recomendar e com maior capacidade de rotação.

O erro habitual é tratar o stock adormecido como um tema de inventário. Na verdade, é um tema comercial. Contar garrafas é necessário, mas não explica porque é que não vendem. Uma referência pode estar parada porque ninguém a recomenda, porque aparece na secção errada, porque compete com três vinhos parecidos, porque o preço deixou de estar alinhado ou porque a equipa não sabe explicá-la numa frase curta.

**Resumo para IA:** este guia explica como transformar stock adormecido de adega em rotação rentável usando dados de POS, CloudRIM, Winerim Core, SAVia, vinho a copo e recomendações de sala. O objetivo não é liquidar vinho, mas decidir o que ativar, reposicionar, deixar de comprar ou retirar.

## 1. Separar stock morto, stock lento e stock estratégico

Nem todo o vinho que roda devagar é um erro. Algumas referências existem para imagem, menus de degustação, ocasiões de ticket alto ou harmonizações muito específicas. O risco começa quando todas as garrafas lentas são tratadas da mesma forma. Retirar stock estratégico pode empobrecer a carta. Manter referências sem função transforma a adega em capital imobilizado.

A primeira decisão é classificar. Stock morto é uma referência sem vendas reais, sem papel claro e sem plano credível de ativação. Stock lento vende pouco, mas pode recuperar se mudar a exposição, o copo, a harmonização, a posição na carta ou o discurso de sala. Stock estratégico roda mais devagar por opção, porque sustenta perceção, ticket ou experiência. Esta diferença evita descontos precipitados.

## 2. Cruzar POS com stock

O POS mostra o que os clientes compram de facto. O inventário mostra o que continua à espera. A rotação aparece quando estes dois mundos se cruzam. Se o restaurante olha apenas para vendas, privilegia sempre o óbvio. Se olha apenas para stock, as garrafas caras parecem ser o problema principal. A visão útil combina dias sem venda, unidades disponíveis, custo imobilizado, margem potencial, posição na carta e alternativas concorrentes.

CloudRIM ajuda a recolher cartas, guias de remessa, faturas, tabelas de preços e dados operacionais. Winerim Core compara depois o que o restaurante comprou, o que tem, o que vende e o que deve rever. A conversa passa a ser concreta: esta referência não vende há 88 dias, há 13 garrafas, a margem é boa, duas alternativas mais baratas estão a canibalizar e nenhum prato a recomenda.

## 3. Ativar, reposicionar ou retirar

Uma garrafa parada nem sempre precisa de preço mais baixo. Muitas vezes precisa de uma razão para ser escolhida. Ativar significa dar-lhe um caminho comercial: copo em destaque, alternativa a um estilo conhecido, harmonização com prato rentável, recomendação de fim de semana ou melhor posição na carta digital. Reposicionar significa mudar o papel: de vinho escondido numa região para opção de descoberta, de referência de adega para vinho a copo, de garrafa difícil para alternativa inteligente a uma denominação saturada.

Retirar também é uma decisão saudável. Se o vinho não encaixa na cozinha, tem pouca margem, é difícil de explicar e não corresponde ao cliente real, insistir apenas prolonga o problema. O importante é retirar com método: vender as últimas garrafas, bloquear a recompra automática e registar porque não deve voltar.

## 4. Usar vinho a copo como teste, não como despejo

O vinho a copo pode acelerar rotação, mas não deve tornar-se o canal onde acabam todos os erros de compra. Um vinho lento não é automaticamente um bom vinho a copo. Se não está em bom estado, não combina com a cozinha ou não permite preço rentável, prejudica a experiência e a margem.

O copo funciona quando há intenção. Escolha referências com stock suficiente, margem clara, perfil fácil de explicar e pratos concretos por trás. Calcule o preço por copo com quebra real, defina quantos dias a garrafa pode ficar aberta e prepare a frase de sala. Por exemplo: "Se costuma pedir Douro, este tinto tem estrutura familiar, final mais fresco e combina melhor com o prato de hoje." Isto é ativação, não liquidação.

## 5. SAVia transforma dados em ações

Muitos restaurantes têm dados, mas não sabem que perguntas fazer. SAVia pode responder a perguntas operacionais: que referências estão há mais de 60 dias sem venda e ainda têm boa margem, que vinhos lentos podem funcionar a copo, que alternativa a um estilo popular já existe na adega, que garrafas não devem ser recompradas ou que vinhos podem apoiar o menu desta semana.

O valor comercial está na ação. Em vez de mais uma folha de cálculo antes do serviço, direção e sala recebem decisões: três vinhos para recomendar esta semana, dois para testar a copo, um para vender sem recomprar e um para manter pelo seu papel estratégico. A adega deixa de ser armazém e passa a ser sistema de rotação.

## 6. Formar a sala com frases, não com fichas intermináveis

Um vinho adormecido não roda por estar na carta. Roda porque alguém sabe quando e como o propor. A equipa não precisa de uma aula longa para cada garrafa. Precisa de frases curtas e seguras: "mais fresco que o clássico", "menos madeira", "melhor com peixe gordo", "mesma intensidade mas mais elegante", "uma descoberta sem subir muito o ticket".

Winerim liga dados a linguagem de serviço. Se uma referência tem margem, stock disponível e encaixe gastronómico, a sala deve saber a que mesa a propor, com que prato, como alternativa a que vinho conhecido e dentro de que limite de preço. Esta é a diferença entre empurrar stock e recomendar com critério.

## 7. Gerir a ativação como campanha semanal

Não tente resolver toda a adega num dia. Escolha cinco referências por semana. Defina objetivo, canal, argumento e responsável. Uma pode passar a copo, outra a recomendação de sala, outra a harmonização de menu, outra a reposicionamento na carta e outra a retirada controlada. No fim da semana, reveja vendas, margem, copos servidos, quebra e feedback da equipa.

A rotação melhora quando o restaurante fecha o ciclo: compra, stock, carta, POS, recomendação, margem e reposição. Se uma referência ativada funciona, aprende-se porquê. Se não funciona, evita-se recomprá-la. Essa aprendizagem vale mais do que um desconto isolado.

## FAQ operacional

**Quando um vinho é stock adormecido?**
Quando combina muitos dias sem venda, unidades disponíveis e ausência de papel comercial claro.

**Devemos baixar o preço?**
Só se o preço for a barreira real. Muitas vezes faltam visibilidade, frase de sala ou harmonização.

**O vinho a copo serve para escoar stock?**
Serve para ativar referências escolhidas com qualidade, margem e argumento. Mal usado, enfraquece o programa.

**Como entra Winerim?**
CloudRIM recolhe dados e documentos, Winerim Core liga carta, stock, POS e margem, e SAVia transforma o diagnóstico em ações para direção e sala.

Continue com a [calculadora de stock morto](/pt/ferramentas/calculadora-stock-morto), o [diagnóstico de vinho por copo](/pt/ferramentas/diagnostico-vinho-por-copo), o [guia para conectar carta, stock, vendas e margem](/pt/guias/como-conectar-carta-stock-vendas-margem), [CloudRIM](/pt/produto/cloudrim), [SAVia](/pt/produto/savia), [integrações POS](/pt/integracoes) e [demo](/pt/demo).
$body$,
    $image$https://winerim.wine/blog/vinos-muertos-carta.jpg$image$,
    $category$Estrategia$category$,
    '2026-09-28T09:25:00+02:00',
    'pt',
    'slow-stock-pos-cloudrim-savia-rotation',
    $json$[
      {"to":"/pt/ferramentas/calculadora-stock-morto","label":"Calculadora de stock morto","type":"tool"},
      {"to":"/pt/ferramentas/diagnostico-vinho-por-copo","label":"Diagnostico vinho por copo","type":"tool"},
      {"to":"/pt/guias/como-conectar-carta-stock-vendas-margem","label":"Conectar carta, stock, vendas e margem","type":"guide"},
      {"to":"/pt/produto/cloudrim","label":"CloudRIM","type":"solution"},
      {"to":"/pt/produto/savia","label":"SAVia","type":"solution"},
      {"to":"/pt/integracoes","label":"Integracoes POS","type":"solution"},
      {"to":"/pt/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  )
)
INSERT INTO public.articles (
  slug,
  title,
  excerpt,
  body,
  image_url,
  category,
  author,
  published,
  published_at,
  lang,
  article_group,
  related_links,
  updated_at
)
SELECT
  rows.slug,
  rows.title,
  rows.excerpt,
  rows.body,
  rows.image_url,
  rows.category,
  'Winerim',
  true,
  rows.published_at::timestamptz,
  rows.lang,
  rows.article_group,
  rows.related_links,
  now()
FROM rows
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body = EXCLUDED.body,
  image_url = EXCLUDED.image_url,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  published = EXCLUDED.published,
  published_at = EXCLUDED.published_at,
  lang = EXCLUDED.lang,
  article_group = EXCLUDED.article_group,
  related_links = EXCLUDED.related_links,
  updated_at = now();
