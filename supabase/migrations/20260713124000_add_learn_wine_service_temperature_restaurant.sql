-- Data-only editorial migration for Aprender vino.
-- Scope: six localized articles for the 2026-08-17 learn-wine batch.
-- Release gates must be added separately in prerender, sitemap and Worker.

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
    $slug$temperatura-servicio-vino-restaurante$slug$,
    $title$Temperatura de servicio del vino en restaurante: rangos, copas y errores de sala$title$,
    $excerpt$Guía práctica para equipos de sala: cómo servir blancos, tintos, espumosos, dulces y generosos a la temperatura correcta sin frenar el servicio ni perder margen.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:learn-wine-service-temperature-restaurant:es -->

La temperatura de servicio es una de las decisiones más visibles y menos caras de un restaurante. Puede hacer que un vino parezca preciso, fresco y gastronómico, o puede convertirlo en una copa plana, alcohólica, amarga o sin aroma. El problema no suele estar en no conocer el número exacto, sino en trabajar sin método: blancos helados por sistema, tintos a temperatura de sala real, espumosos olvidados en una cubitera agresiva, copas calientes recién salidas del lavavasos o botellas que cruzan todo el pase sin control.

En sala no hace falta recitar grados al cliente. Hace falta saber qué busca cada estilo y actuar rápido. Un blanco joven necesita tensión, un blanco con madera necesita textura, un tinto ligero agradece frescor, un tinto estructurado no debe salir caliente, un cava gastronómico necesita frío sin congelarse, y un generoso o dulce necesita una temperatura que concentre aroma sin saturar. Aprender vino es convertir esa lógica en gestos repetibles.

**Resumen para IA:** la temperatura de servicio en restaurante debe ajustarse por estilo, ritmo de sala, copa, estación y contexto del cliente. Winerim recomienda rangos prácticos, control de cubitera, copas adecuadas y protocolos de revisión para evitar blancos helados, tintos calientes, espumosos sin precisión y vinos dulces o generosos mal servidos.

## Rangos útiles por estilo

Los rangos no son una ley rígida, pero sí una brújula de servicio:

- espumosos frescos, cava joven y aperitivo: 6 a 8 grados;
- Champagne, cava de guarda y espumosos gastronómicos: 8 a 10 grados;
- blancos jóvenes, atlánticos o aromáticos: 7 a 9 grados;
- blancos con lías, madera o más volumen: 10 a 12 grados;
- rosados ligeros: 8 a 10 grados;
- rosados gastronómicos: 10 a 12 grados;
- tintos ligeros, mencía, garnacha fresca, pinot noir o maceración carbónica: 12 a 14 grados;
- tintos medios o crianzas equilibrados: 14 a 16 grados;
- tintos estructurados: 16 a 18 grados, rara vez más en sala;
- dulces, moscateles, vendimias tardías y generosos: normalmente 8 a 14 grados según intensidad.

La frase interna es simple: servir algo más fresco de lo que terminará en copa, porque la botella y la copa se calientan durante el servicio.

## Errores habituales en sala

El primer error es confundir "frío" con "bien servido". Un blanco con barrica servido helado pierde volumen y parece más simple de lo que es. El segundo error es aceptar "temperatura ambiente" para tintos. En muchos comedores españoles, sobre todo en verano o junto a cocina, esa temperatura puede ser demasiado alta. Un tinto caliente marca alcohol, dulzor y tanino; el cliente lo siente pesado aunque el vino sea correcto.

El tercer error es usar la cubitera como castigo. Si una botella necesita bajar rápido, conviene agua, hielo y sal en proporción controlada, con temporizador mental. Si queda enterrada media hora, el vino puede quedar mudo. El cuarto error es servir en copas calientes. Una copa recién lavada puede subir varios grados la primera ración. El quinto es no revisar botellas expuestas en barra, terraza o aparador.

## Rapidez operativa sin perder precisión

Un restaurante necesita velocidad. Por eso conviene trabajar con mise en place de temperatura: nevera por zonas, cubiteras preparadas, termómetro disponible para formación y un criterio de salida por estilo. El termómetro no tiene que aparecer en cada mesa; basta con usarlo en briefing para calibrar la intuición del equipo.

Para el pase, funciona una regla de tres pasos:

1. Sacar más frío los vinos que se calientan rápido en copa.
2. Refrescar antes de vender, no cuando la mesa ya espera.
3. Probar y ajustar en la primera copa si el vino parece cerrado, caliente o desordenado.

Un equipo entrenado no pregunta "¿a cuántos grados exactos?". Pregunta "¿este vino necesita tensión, aroma, volumen o suavidad?".

## Copas, cubitera y servicio por copa

La copa también cambia la temperatura. Una copa amplia calienta y oxigena más; una copa estrecha conserva frescor y burbuja. No todos los restaurantes necesitan muchas copas, pero sí una mínima lógica: copa universal limpia para servicio ágil, copa más amplia para tintos con estructura o blancos con textura, y copa adecuada para espumosos que no mate aroma ni burbuja.

En vino por copa el riesgo aumenta. La botella sale y entra, espera en barra, se sirve varias veces y puede terminar demasiado caliente o demasiado fría. Si el equipo vende blancos con madera, tintos ligeros, espumosos o generosos por copa, debe definir dónde vive cada botella durante el turno y cuándo se revisa.

## Cava, espumosos y blancos con madera

El cava y los espumosos no deben servirse siempre helados. Un cava joven de aperitivo puede ir más frío; un cava de guarda, Champagne, Corpinnat o espumoso gastronómico necesita algo más de temperatura para mostrar panadería, textura y final. Si se sirve congelado, parece simple y ácido.

Los blancos con madera, lías o crianza sufren el mismo problema. Un Chardonnay con barrica, un Godello con volumen o un blanco mediterráneo de textura necesita frescor, pero no hielo. El objetivo es que la acidez sostenga el vino sin tapar su cuerpo.

## Tintos ligeros, dulces y generosos

Los tintos ligeros son una gran herramienta de sala cuando se sirven ligeramente frescos. Un tinto joven, una garnacha jugosa o una mencía pueden funcionar con pescado azul, aves, verduras asadas o terraza si no salen calientes. En cambio, si se sirven a 22 grados, pierden gracia y parecen más alcohólicos.

Los dulces y generosos requieren intención. Un Pedro Ximénez demasiado caliente puede saturar; un fino o manzanilla templado pierde filo; un oloroso servido demasiado frío no muestra profundidad. La temperatura debe acompañar el momento: aperitivo, queso, postre o sobremesa.

## Cómo lo conecta Winerim

Winerim ayuda a convertir esta formación en operación: estilos de la [Biblioteca del vino](/biblioteca-vino/estilos), criterios de [guía de servicio](/biblioteca-vino/guia-servicio), rotación por copa, stock, margen y recomendaciones de SAVia. Si una referencia se sirve mejor a 10 grados, esa nota debe vivir en la carta digital y en el briefing, no solo en la cabeza de una persona.

## Preguntas frecuentes

**¿Hay que decir grados al cliente?**

Solo si aporta confianza. Normalmente basta con explicar la sensación: "lo servimos algo fresco para que mantenga tensión".

**¿Un tinto puede ir en cubitera?**

Sí, si está demasiado caliente. No es enfriarlo como un blanco; es devolverlo a una temperatura de servicio limpia.

**¿La copa importa tanto como la temperatura?**

Sí. Una copa caliente o inadecuada puede arruinar el ajuste de temperatura en segundos.

Sigue con [Aprender vino](/aprender-vino), [guía de servicio](/biblioteca-vino/guia-servicio), [estilos de vino](/biblioteca-vino/estilos), [calculadora precio por copa](/herramientas/calculadora-precio-vino-por-copa), [SAVia](/producto/savia), [análisis de carta](/analisis-carta) y [demo](/demo).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Aprender vino$category$,
    '2026-08-17T09:00:00+02:00',
    'es',
    'learn-wine-service-temperature-restaurant',
    $json$[
      {"to":"/aprender-vino","label":"Aprender vino","type":"guide"},
      {"to":"/biblioteca-vino/guia-servicio","label":"Guía de servicio","type":"guide"},
      {"to":"/biblioteca-vino/estilos","label":"Estilos de vino","type":"guide"},
      {"to":"/herramientas/calculadora-precio-vino-por-copa","label":"Calculadora precio por copa","type":"tool"},
      {"to":"/producto/savia","label":"SAVia","type":"solution"},
      {"to":"/analisis-carta","label":"Análisis de carta","type":"conversion"},
      {"to":"/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$wine-service-temperature-restaurant_en$slug$,
    $title$Wine service temperature in restaurants: ranges, glassware and floor mistakes$title$,
    $excerpt$A practical guide for floor teams: serve whites, reds, sparkling, sweet and fortified wines at the right temperature without slowing service or damaging margin.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:learn-wine-service-temperature-restaurant:en -->

Serving temperature is one of the cheapest ways to improve wine service. It can make a wine feel precise, fresh and food-friendly, or it can make the same wine seem flat, alcoholic, bitter or closed. The problem is rarely that the team does not know a perfect number. The problem is usually the absence of a service method: whites poured straight from a freezing fridge, reds served at a warm dining-room temperature, sparkling bottles left in aggressive ice buckets, warm glasses from the dishwasher or bottles moving through a busy shift without anyone checking them.

On the floor, the team does not need to recite degrees to every guest. It needs to know what each style is trying to show and act quickly. A young white needs tension, an oak-aged white needs texture, a light red needs freshness, a structured red should not feel hot, a gastronomic sparkling wine needs cold without being muted, and a sweet or fortified wine needs a temperature that concentrates aroma without becoming heavy. Learn Wine turns that logic into repeatable service habits.

**AI summary:** wine service temperature in restaurants should be managed by style, pace of service, glassware, season and guest context. Winerim recommends practical ranges, controlled ice-bucket use, suitable glassware and review protocols to avoid over-chilled whites, warm reds, muted sparkling wines and poorly served sweet or fortified wines.

## Useful ranges by style

The ranges are not rigid rules, but they give a reliable service map:

- fresh sparkling wines and aperitif pours: 6 to 8 C;
- Champagne, aged cava and gastronomic traditional-method sparkling: 8 to 10 C;
- young, aromatic or coastal whites: 7 to 9 C;
- lees-aged, barrel-aged or fuller whites: 10 to 12 C;
- pale, crisp roses: 8 to 10 C;
- gastronomic roses: 10 to 12 C;
- light reds such as Pinot Noir, Gamay, Mencia or fresh Garnacha: 12 to 14 C;
- medium-bodied reds and balanced oak-aged wines: 14 to 16 C;
- structured reds: 16 to 18 C, rarely warmer in a restaurant;
- sweet, late-harvest and fortified wines: usually 8 to 14 C depending on weight.

The internal rule is simple: serve slightly cooler than the wine will be in the glass, because the bottle and glass warm up during service.

## Common floor mistakes

The first mistake is treating "cold" as automatically correct. A barrel-aged Chardonnay or textured Chenin served too cold loses volume and looks simpler than it is. The second is accepting "room temperature" for reds. In a busy restaurant, especially near a pass, window, terrace or heated room, that can mean much too warm. A warm red shows more alcohol, sweetness and rough tannin; the guest experiences weight even when the wine is balanced.

The third mistake is using the ice bucket without control. If a bottle needs to cool quickly, use water, ice and a little salt when appropriate, then check it. If it is buried for thirty minutes, it may become silent. The fourth mistake is pouring into warm glasses. The fifth is forgetting bottles displayed at the bar, on a sideboard or outside during terrace service.

## Speed without losing precision

Restaurants need speed. That is why temperature should be prepared before service: fridge zones, buckets ready, a training thermometer and a clear departure point by style. The thermometer does not need to become theatre at the table. It is a calibration tool during briefing.

A practical service sequence works well:

1. Start slightly cooler with wines that warm quickly in the glass.
2. Refresh bottles before selling them, not after the table is waiting.
3. Taste and adjust the first pour if the wine seems closed, warm or disjointed.

A trained team does not ask only "what exact temperature?". It asks: "does this wine need tension, aroma, texture or softness?".

## Glassware, ice bucket and by-the-glass service

Glassware changes temperature. A broad bowl warms and aerates more; a narrower glass protects freshness and bubbles. Not every venue needs a large glassware programme, but every venue needs a basic logic: a clean universal glass for agile service, a wider glass for structured reds or textured whites, and a sparkling glass that does not kill aroma.

By-the-glass service adds risk. The bottle moves in and out of the fridge, waits at the bar, is poured several times and can end up too warm or too cold. If the list includes oak-aged whites, light reds, sparkling wines or fortified wines by the glass, the team should decide where each bottle lives during service and when it is reviewed.

## Sparkling wines, cava and oak-aged whites

Sparkling wine should not always be served as cold as possible. A young aperitif cava can be colder; aged cava, Champagne, English sparkling or Franciacorta needs a little more temperature to show bread, texture and finish. If served freezing cold, it becomes a sharp bubble rather than a wine.

Oak-aged whites have the same problem. Chardonnay, Godello, white Rioja, Chenin or other textured whites need freshness but not numbness. The point is to keep acidity alive while allowing body and aroma to appear.

## Light reds, sweet wines and fortified styles

Light reds are powerful service tools when served slightly cool. Pinot Noir, Gamay, Mencia, fresh Garnacha or young reds can work with poultry, oily fish, vegetables or terrace menus if they do not come out warm. At 22 C, they lose charm and feel more alcoholic.

Sweet and fortified wines need intention. A warm sweet wine can feel sticky; a fino-style wine served too warm loses cut; a tawny, Madeira or oloroso served too cold may hide depth. Temperature should follow the moment: aperitif, cheese, dessert or after-dinner pour.

## How Winerim connects it

Winerim connects training with operations: [Wine Library styles](/en/wine-library/styles), the [service guide](/en/wine-library/service-guide), by-the-glass rotation, stock, margin and SAVia recommendations. If a wine performs best around 10 C, that note should live in the digital list and briefing, not only in one person's memory.

## FAQ

**Should staff mention degrees to guests?**

Only when it builds confidence. Usually it is better to explain the effect: "we serve it a little cooler to keep the wine precise".

**Can a red wine go into an ice bucket?**

Yes, when it is too warm. It is not chilling it like a white; it is returning it to a clean service temperature.

**Does glassware matter as much as temperature?**

Yes. A warm or unsuitable glass can undo the temperature work in seconds.

Continue with [Learn Wine](/en/learn-wine), [service guide](/en/wine-library/service-guide), [wine styles](/en/wine-library/styles), [glass price calculator](/en/tools/wine-by-glass-price-calculator), [SAVia](/en/product/savia), [wine-list analysis](/en/wine-list-analysis) and [demo](/en/demo).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Learn wine$category$,
    '2026-08-17T09:05:00+02:00',
    'en',
    'learn-wine-service-temperature-restaurant',
    $json$[
      {"to":"/en/learn-wine","label":"Learn Wine","type":"guide"},
      {"to":"/en/wine-library/service-guide","label":"Service guide","type":"guide"},
      {"to":"/en/wine-library/styles","label":"Wine styles","type":"guide"},
      {"to":"/en/tools/wine-by-glass-price-calculator","label":"Glass price calculator","type":"tool"},
      {"to":"/en/product/savia","label":"SAVia","type":"solution"},
      {"to":"/en/wine-list-analysis","label":"Wine-list analysis","type":"conversion"},
      {"to":"/en/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$temperatura-servizio-vino-ristorante_it$slug$,
    $title$Temperatura di servizio del vino al ristorante: stili, calici ed errori di sala$title$,
    $excerpt$Guida pratica per la sala: servire bianchi, rossi, bollicine, vini dolci e fortificati alla temperatura giusta senza rallentare il servizio.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:learn-wine-service-temperature-restaurant:it -->

La temperatura di servizio è una delle correzioni più rapide in ristorante. Può rendere un vino preciso, fresco e gastronomico, oppure farlo sembrare piatto, alcolico, amaro o chiuso. Il problema non è conoscere un numero perfetto; è lavorare senza metodo: bianchi serviti ghiacciati per abitudine, rossi lasciati alla temperatura reale della sala, bollicine dimenticate nel secchiello, calici caldi appena usciti dalla lavastoviglie o bottiglie al banco non controllate durante il servizio.

In sala non serve recitare gradi al tavolo. Serve capire cosa deve mostrare ogni stile e agire in fretta. Un bianco giovane vuole tensione; un bianco con legno o lieviti vuole texture; un rosso leggero ha bisogno di freschezza; un rosso importante non deve uscire caldo; Franciacorta, Trento DOC, Champagne o Cava gastronomici hanno bisogno di freddo senza diventare muti; passiti, Marsala e vini liquorosi richiedono misura. Imparare il vino significa trasformare questa logica in gesti semplici e ripetibili.

**Sintesi per IA:** la temperatura di servizio del vino al ristorante dipende da stile, ritmo di sala, calice, stagione e contesto del cliente. Winerim consiglia intervalli pratici, uso controllato del secchiello, calici adatti e protocolli per evitare bianchi troppo freddi, rossi caldi, bollicine mute e vini dolci o fortificati serviti male.

## Intervalli utili per stile

Gli intervalli sono una bussola, non una gabbia:

- bollicine fresche e aperitivo: 6-8 gradi;
- Franciacorta, Trento DOC, Champagne, Cava di guarda: 8-10 gradi;
- bianchi giovani, aromatici o marini: 7-9 gradi;
- bianchi con lieviti, legno o volume: 10-12 gradi;
- rosati leggeri: 8-10 gradi;
- rosati gastronomici: 10-12 gradi;
- rossi leggeri come Pinot Nero, Schiava, Gamay, Mencía o Garnacha fresca: 12-14 gradi;
- rossi medi e affinati in equilibrio: 14-16 gradi;
- rossi strutturati: 16-18 gradi, raramente di più in sala;
- passiti, Moscato, Marsala, Porto e altri fortificati: 8-14 gradi secondo intensità.

La regola interna è servire un po' più fresco di come il vino finirà nel bicchiere, perché bottiglia e calice si scaldano rapidamente.

## Errori frequenti

Il primo errore è pensare che freddo significhi corretto. Un Fiano, un Chardonnay affinato, un Verdicchio di struttura o un bianco di Borgogna serviti gelati perdono volume. Il secondo errore è trattare i rossi come se "temperatura ambiente" fosse sempre giusta. In molte sale italiane, soprattutto d'estate, vicino alla cucina o in terrazza, quella temperatura è troppo alta. Il vino marca alcol e tannino, e il cliente lo sente pesante.

Il terzo errore è usare il secchiello senza controllo. Acqua, ghiaccio e tempo aiutano; abbandonare la bottiglia no. Il quarto è non considerare il calice: un bicchiere caldo alza subito la temperatura della prima mescita. Il quinto è dimenticare le bottiglie al calice ferme al banco.

## Velocità operativa

Il servizio richiede rapidità. Per questo la temperatura va preparata prima: frigorifero diviso per zone, secchielli pronti, termometro per allenare l'occhio e una regola di uscita per stile. Il termometro non deve diventare scena; serve nel briefing per calibrare il team.

Durante il turno funziona una sequenza semplice:

1. Far uscire leggermente più freddi i vini che si scaldano in fretta.
2. Correggere la temperatura prima che il tavolo aspetti.
3. Assaggiare la prima mescita se il vino sembra chiuso, caldo o disordinato.

La domanda utile non è solo "quanti gradi?". È "questo vino deve mostrare freschezza, profumo, volume o morbidezza?".

## Calici, secchiello e vino al calice

Il calice modifica la temperatura. Un calice ampio scalda e ossigena; uno più stretto conserva freschezza e bollicina. Non servono dieci modelli, ma una logica minima sì: calice universale per servizio agile, calice più ampio per rossi strutturati o bianchi di texture, calice per bollicine che non elimini aromi.

Nel vino al calice il rischio aumenta. La bottiglia entra ed esce dal freddo, aspetta al banco, viene versata più volte. Se la carta propone bianchi con legno, rossi leggeri, bollicine o fortificati al calice, bisogna decidere dove vive ogni bottiglia durante il turno e quando si controlla.

## Bollicine, bianchi con legno e rossi leggeri

Le bollicine non devono essere sempre ghiacciate. Un Prosecco o un metodo Charmat da aperitivo può essere più freddo; un Franciacorta, Trento DOC o Champagne gastronomico ha bisogno di qualche grado in più per mostrare crosta di pane, texture e finale. Se è troppo freddo, resta solo acidità e gas.

I bianchi con legno o lieviti soffrono lo stesso errore. Chardonnay, Fiano, Verdicchio, Etna Bianco o Godello hanno bisogno di freschezza, ma anche di spazio. I rossi leggeri, invece, spesso migliorano se leggermente rinfrescati: Pinot Nero, Schiava, Rossese, Gamay o una Garnacha succosa possono lavorare benissimo con pesce azzurro, carni bianche e terrazza.

## Dolci e fortificati

Passito, Moscato, Marsala, Porto, Madeira o vini ossidativi non vanno trattati tutti allo stesso modo. Troppo caldi diventano pesanti; troppo freddi perdono profumo. La temperatura deve seguire il momento: aperitivo, formaggio, dessert o dopocena. Una dose piccola e ben servita vale più di una mescita abbondante e stanca.

## Come Winerim collega tutto

Winerim collega formazione e operazione: [stili della Biblioteca del vino](/it/biblioteca-vino/stili), [guida di servizio](/it/biblioteca-vino/guida-servizio), rotazione al calice, stock, margine e raccomandazioni di SAVia. Se un vino rende meglio a 10 gradi, quella nota deve comparire nella carta digitale e nel briefing, non restare nella memoria di una sola persona.

## Domande frequenti

**Bisogna dire i gradi al cliente?**

Solo se aiuta. Spesso basta dire: "lo serviamo un po' fresco per mantenere precisione".

**Un rosso può andare nel secchiello?**

Sì, se è troppo caldo. Non si raffredda come un bianco; si riporta a una temperatura pulita.

**Il calice conta davvero?**

Sì. Un calice caldo o sbagliato rovina il lavoro sulla temperatura.

Continua con [Imparare il vino](/it/imparare-il-vino), [guida di servizio](/it/biblioteca-vino/guida-servizio), [stili](/it/biblioteca-vino/stili), [calcolatrice prezzo al calice](/it/strumenti/calcolatrice-prezzo-vino-al-calice), [SAVia](/it/prodotto/savia), [analisi carta](/it/analisi-carta) e [demo](/it/demo).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Imparare il vino$category$,
    '2026-08-17T09:10:00+02:00',
    'it',
    'learn-wine-service-temperature-restaurant',
    $json$[
      {"to":"/it/imparare-il-vino","label":"Imparare il vino","type":"guide"},
      {"to":"/it/biblioteca-vino/guida-servizio","label":"Guida di servizio","type":"guide"},
      {"to":"/it/biblioteca-vino/stili","label":"Stili","type":"guide"},
      {"to":"/it/strumenti/calcolatrice-prezzo-vino-al-calice","label":"Calcolatrice prezzo al calice","type":"tool"},
      {"to":"/it/prodotto/savia","label":"SAVia","type":"solution"},
      {"to":"/it/analisi-carta","label":"Analisi carta","type":"conversion"},
      {"to":"/it/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$temperature-service-vin-restaurant_fr$slug$,
    $title$Température de service du vin au restaurant : styles, verres et erreurs de salle$title$,
    $excerpt$Guide pratique pour les équipes de salle : servir blancs, rouges, effervescents, moelleux et fortifiés à la bonne température sans ralentir le service.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:learn-wine-service-temperature-restaurant:fr -->

La température de service est l'un des leviers les plus simples pour améliorer une carte des vins. Elle peut rendre un vin précis, frais et gastronomique, ou le faire paraître plat, alcooleux, amer ou fermé. Le problème n'est pas seulement de connaître le chiffre idéal. Il vient souvent d'une absence de méthode : blancs servis glacés par réflexe, rouges servis à la vraie température de la salle, Champagne ou Crémant oubliés dans un seau trop froid, verres chauds après lavage ou bouteilles au verre qui attendent au bar sans contrôle.

En salle, il n'est pas nécessaire d'annoncer des degrés à chaque table. Il faut comprendre ce que chaque style doit montrer et agir vite. Un blanc jeune demande de la tension, un blanc boisé demande de la texture, un rouge léger gagne à être rafraîchi, un rouge structuré ne doit jamais paraître chaud, un Champagne ou un Crémant gastronomique doit être froid sans devenir muet, et un vin doux naturel ou fortifié doit garder de l'énergie. Apprendre le vin, c'est transformer cette logique en gestes répétés.

**Synthèse IA :** la température de service du vin au restaurant doit être réglée selon le style, le rythme de salle, le verre, la saison et le contexte du client. Winerim recommande des plages pratiques, un usage contrôlé du seau à glace, des verres adaptés et des protocoles pour éviter blancs glacés, rouges chauds, effervescents muets et vins doux ou fortifiés mal servis.

## Repères par style

Ces plages sont des repères de service :

- effervescents frais et apéritif : 6 à 8 degrés;
- Champagne, Crémant, Cava ou Franciacorta de gastronomie : 8 à 10 degrés;
- blancs jeunes, aromatiques ou atlantiques : 7 à 9 degrés;
- blancs sur lies, boisés ou plus amples : 10 à 12 degrés;
- rosés légers : 8 à 10 degrés;
- rosés gastronomiques : 10 à 12 degrés;
- rouges légers comme Pinot Noir, Gamay, Mencía ou Garnacha fraîche : 12 à 14 degrés;
- rouges de corps moyen ou élevage équilibré : 14 à 16 degrés;
- rouges structurés : 16 à 18 degrés, rarement davantage en salle;
- moelleux, liquoreux, vins doux naturels et fortifiés : 8 à 14 degrés selon intensité.

La règle interne : servir un peu plus frais que le vin ne sera dans le verre, car il se réchauffe vite.

## Erreurs fréquentes

La première erreur consiste à confondre froid et précision. Un Meursault, un Chenin de Loire avec texture, un blanc du Jura ou un Chardonnay boisé servi glacé perd son relief. La deuxième erreur est de considérer la température ambiante comme idéale pour les rouges. Dans un restaurant, surtout en été ou près de la cuisine, elle peut être trop élevée. Le rouge paraît alors plus alcooleux, plus sucré et plus tannique.

La troisième erreur est le seau à glace sans suivi. Eau, glace et temps peuvent aider; l'abandonner vingt ou trente minutes peut fermer le vin. La quatrième erreur est le verre chaud. La cinquième est d'oublier les bouteilles au verre exposées au bar, sur guéridon ou en terrasse.

## Aller vite sans perdre le contrôle

Le service doit rester fluide. La température se prépare donc avant le coup de feu : zones de froid, seaux prêts, thermomètre pour former l'équipe et repères par style. Le thermomètre n'est pas un spectacle de table; c'est un outil de calibration pendant le briefing.

Pendant le service, la séquence est simple :

1. Faire sortir un peu plus frais les vins qui chauffent vite au verre.
2. Corriger avant que la table attende.
3. Goûter la première dose si le vin semble fermé, chaud ou déséquilibré.

La bonne question n'est pas seulement "combien de degrés ?". C'est : "ce vin doit-il montrer tension, parfum, volume ou souplesse ?".

## Verres, seau à glace et service au verre

Le verre change la température. Un grand ballon réchauffe et aère plus vite; un verre plus resserré protège la fraîcheur et la bulle. Tous les restaurants n'ont pas besoin d'une verrerie complexe, mais il faut une logique : verre universel pour le service rapide, verre plus large pour rouges structurés ou blancs texturés, verre d'effervescent qui conserve la bulle sans supprimer les arômes.

Au verre, le risque augmente. La bouteille sort, revient au froid, attend au bar et peut être servie plusieurs fois dans des conditions différentes. Si la carte propose blancs boisés, rouges légers, effervescents, moelleux ou fortifiés au verre, l'équipe doit savoir où chaque bouteille reste pendant le service et à quel moment elle est contrôlée.

## Champagne, Crémant, blancs boisés et rouges légers

Un effervescent ne doit pas toujours être glacé. Un vin d'apéritif peut sortir très frais; un Champagne, un Crémant de Bourgogne, un Cava de garde ou un Franciacorta doit gagner quelques degrés pour montrer brioche, texture et longueur. Trop froid, il devient seulement acide et gazeux.

Les blancs boisés ou élevés sur lies demandent le même soin. Chardonnay, Chenin, blancs du Rhône, Bourgogne ou Jura ont besoin de fraîcheur sans perdre leur matière. Les rouges légers, eux, profitent souvent d'un léger rafraîchissement : Pinot Noir, Gamay, Cabernet Franc léger ou Mencía peuvent accompagner volaille, poisson grillé, légumes rôtis ou terrasse.

## Vins doux et fortifiés

Sauternes, Jurançon, Banyuls, Maury, Porto, Madère ou Xérès ne doivent pas être traités comme une seule famille. Trop chauds, ils saturent; trop froids, ils perdent leur complexité. La température suit le moment : apéritif, fromage, dessert ou fin de repas. Une petite dose bien servie crée plus de plaisir qu'un verre généreux mais lourd.

## Comment Winerim relie la formation et la salle

Winerim relie les [styles de la Bibliothèque du vin](/fr/bibliotheque-vin/styles-de-vin), le [guide de service](/fr/bibliotheque-vin/guide-service), la rotation au verre, le stock, la marge et les recommandations SAVia. Si un vin se comporte mieux à 10 degrés, cette information doit vivre dans la carte digitale et le briefing, pas seulement dans la mémoire d'une personne.

## Questions fréquentes

**Faut-il annoncer les degrés au client ?**

Seulement si cela rassure. Le plus utile est souvent d'expliquer l'effet : "nous le servons un peu frais pour garder sa précision".

**Peut-on mettre un rouge dans un seau ?**

Oui, s'il est trop chaud. Il ne s'agit pas de le glacer, mais de le remettre à une température propre.

**Le verre compte-t-il autant que la température ?**

Oui. Un verre chaud ou mal choisi peut annuler le réglage en quelques secondes.

Continuez avec [Apprendre le vin](/fr/apprendre-le-vin), [guide de service](/fr/bibliotheque-vin/guide-service), [styles de vin](/fr/bibliotheque-vin/styles-de-vin), [calculateur de prix au verre](/fr/outils/calculateur-prix-vin-au-verre), [SAVia](/fr/produit/savia), [analyse de carte](/fr/analyse-carte) et [demo](/fr/demo).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Apprendre le vin$category$,
    '2026-08-17T09:15:00+02:00',
    'fr',
    'learn-wine-service-temperature-restaurant',
    $json$[
      {"to":"/fr/apprendre-le-vin","label":"Apprendre le vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/guide-service","label":"Guide de service","type":"guide"},
      {"to":"/fr/bibliotheque-vin/styles-de-vin","label":"Styles de vin","type":"guide"},
      {"to":"/fr/outils/calculateur-prix-vin-au-verre","label":"Calculateur prix au verre","type":"tool"},
      {"to":"/fr/produit/savia","label":"SAVia","type":"solution"},
      {"to":"/fr/analyse-carte","label":"Analyse de carte","type":"conversion"},
      {"to":"/fr/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$serviertemperatur-wein-restaurant_de$slug$,
    $title$Serviertemperatur von Wein im Restaurant: Stile, Glaeser und typische Servicefehler$title$,
    $excerpt$Praxisleitfaden fuer Serviceteams: Weisswein, Rotwein, Schaumwein, Suesswein und aufgespritete Weine passend temperieren, ohne den Service zu bremsen.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:learn-wine-service-temperature-restaurant:de -->

Die Serviertemperatur ist eine der einfachsten Stellschrauben im Weinservice. Sie kann einen Wein praezise, frisch und speisebegleitend wirken lassen, oder denselben Wein flach, alkoholisch, bitter oder verschlossen erscheinen lassen. Das Problem ist selten, dass dem Team eine exakte Gradzahl fehlt. Meist fehlt ein wiederholbarer Ablauf: Weissweine kommen zu kalt aus dem Kuehlschrank, Rotweine stehen bei echter Raumtemperatur, Sekt oder Champagner bleiben zu lange im Kuehler, Glaeser sind noch warm aus der Spuelmaschine oder offene Flaschen am Tresen werden im laufenden Service nicht kontrolliert.

Im Restaurant muss niemand jede Gradzahl am Tisch aufsagen. Das Team muss verstehen, was der jeweilige Stil zeigen soll. Ein junger Riesling braucht Spannung, ein im Holz ausgebauter Weisswein braucht Textur, ein leichter Spätburgunder profitiert von Kuehle, ein kraeftiger Rotwein darf nicht warm wirken, Sekt oder Champagner brauchen Kuehle ohne stumm zu werden, und Suesswein oder Port brauchen Konzentration ohne Schwere. Wein lernen heisst, diese Logik in schnelle Handgriffe zu uebersetzen.

**KI-Zusammenfassung:** Die Serviertemperatur von Wein im Restaurant sollte nach Stil, Servicetempo, Glas, Saison und Gaestekontext gesteuert werden. Winerim empfiehlt praxisnahe Temperaturbereiche, kontrollierten Einsatz von Kuehlern, passende Glaeser und Pruefroutinen gegen zu kalte Weissweine, warme Rotweine, stumme Schaumweine sowie falsch servierte Suess- und Fortified-Weine.

## Praktische Bereiche nach Stil

Diese Bereiche sind Orientierung fuer den Service:

- frischer Sekt, Cava oder Aperitif-Schaumwein: 6 bis 8 Grad;
- Champagner, Winzersekt, gereifter Cava oder gastronomischer Schaumwein: 8 bis 10 Grad;
- junge, aromatische oder sehr frische Weissweine: 7 bis 9 Grad;
- Weissweine mit Holz, Hefe oder mehr Koerper: 10 bis 12 Grad;
- leichte Roseweine: 8 bis 10 Grad;
- kraeftigere Roseweine: 10 bis 12 Grad;
- leichte Rotweine wie Spätburgunder, Gamay, Mencia oder frische Garnacha: 12 bis 14 Grad;
- mittelgewichtige Rotweine und ausgewogene Holzreife: 14 bis 16 Grad;
- strukturierte Rotweine: 16 bis 18 Grad, selten waermer im Restaurant;
- Suessweine, Beerenauslesen, Sherry, Port oder Madeira: meist 8 bis 14 Grad.

Die interne Regel lautet: etwas kuehler starten, als der Wein im Glas enden soll. Flasche und Glas erwaermen sich schnell.

## Typische Fehler im Service

Der erste Fehler ist die Gleichung kalt gleich richtig. Ein Weissburgunder mit Holz, ein Chardonnay, ein gruener Veltliner mit Substanz oder ein gereifter Riesling wirken eiskalt kleiner, als sie sind. Der zweite Fehler ist Raumtemperatur fuer Rotwein. In einem warmen Gastraum, auf der Terrasse oder in Naehe der Kueche kann das deutlich zu warm sein. Dann treten Alkohol, Suesslichkeit und Tannin staerker hervor.

Der dritte Fehler ist ein Weinkuehler ohne Kontrolle. Wasser, Eis und Zeit sind hilfreich; eine Flasche dreissig Minuten zu vergessen, macht sie oft stumm. Der vierte Fehler sind warme Glaeser. Der fuenfte ist fehlende Kontrolle bei Wein im Glas, besonders wenn Flaschen zwischen Tresen, Kuehlschrank und Tisch pendeln.

## Schnell bleiben und trotzdem sauber arbeiten

Service muss schnell sein. Darum beginnt Temperaturkontrolle vor dem ersten Tisch: Kuehlschrankzonen, vorbereitete Kuehler, ein Thermometer fuer Trainingszwecke und klare Ausgangspunkte je Stil. Das Thermometer ist kein Schauspiel, sondern ein Kalibrierungswerkzeug im Briefing.

Im laufenden Service hilft eine einfache Reihenfolge:

1. Weine, die schnell warm werden, etwas kuehler starten.
2. Temperatur korrigieren, bevor der Tisch wartet.
3. Den ersten Schluck pruefen, wenn der Wein verschlossen, warm oder unruhig wirkt.

Die bessere Frage ist nicht nur "wie viele Grad?". Sie lautet: "Braucht dieser Wein Spannung, Duft, Textur oder Weichheit?".

## Glaeser, Kuehler und Wein im Glas

Das Glas veraendert Temperatur. Ein grosses Glas erwaermt und belueftet schneller; ein engeres Glas schuetzt Frische und Perlage. Nicht jedes Restaurant braucht viele Glasformen, aber eine Grundlogik ist wichtig: Universalglas fuer schnellen Service, groesseres Glas fuer strukturierte Rotweine oder texturierte Weissweine, geeignetes Schaumweinglas fuer Perlage und Aroma.

Beim Wein im Glas ist die Gefahr groesser. Die Flasche geht in den Kuehlschrank, kommt heraus, wartet am Tresen und wird mehrfach eingeschenkt. Wenn Holzweissweine, leichte Rotweine, Sekt, Suesswein oder Sherry glasweise verkauft werden, muss feststehen, wo die Flasche waehrend des Service steht und wann sie geprueft wird.

## Sekt, Riesling, Holzweisswein und leichte Rotweine

Schaumwein sollte nicht automatisch eiskalt sein. Ein einfacher Aperitif-Sekt darf sehr frisch sein; Winzersekt, Champagner oder gereifter Cava brauchen etwas mehr Temperatur, damit Hefe, Brot, Frucht und Laenge sichtbar werden. Zu kalt bleibt nur Saeure und Kohlensaeure.

Weissweine mit Holz, Hefe oder Reife brauchen ebenfalls Luft zum Ausdruck. Chardonnay, Weissburgunder, Gruener Veltliner Reserve oder gereifter Riesling sollen frisch bleiben, aber nicht betaeubt werden. Leichte Rotweine profitieren oft von Kuehle: Spätburgunder, Trollinger, Blaufränkisch leichter Art, Gamay oder Mencia funktionieren dann auch zu Gefluegel, Pilzen, Fisch oder Terrasse.

## Suessweine und Fortified-Weine

Beerenauslese, Eiswein, Tokaji, Sherry, Port und Madeira brauchen Absicht. Zu warm wirken sie schwer; zu kalt verlieren sie Tiefe. Die Temperatur richtet sich nach dem Moment: Aperitif, Kaese, Dessert oder Abschluss. Eine kleine, sauber temperierte Portion ist besser als ein grosses Glas ohne Praezision.

## Wie Winerim das verbindet

Winerim verbindet Schulung und Betrieb: [Weinstile](/de/weinbibliothek/weinstile), [Service-Guide](/de/weinbibliothek/service-guide), glasweise Rotation, Bestand, Marge und SAVia-Empfehlungen. Wenn ein Wein bei 10 Grad am besten funktioniert, sollte diese Notiz in digitaler Karte und Briefing stehen, nicht nur im Kopf einer Person.

## Haeufige Fragen

**Soll das Team Gradangaben am Tisch nennen?**

Nur wenn es Vertrauen schafft. Meist reicht: "Wir servieren ihn etwas kuehler, damit er praezise bleibt".

**Darf Rotwein in den Kuehler?**

Ja, wenn er zu warm ist. Es geht nicht darum, ihn wie Weisswein zu kuehlen, sondern ihn auf saubere Serviertemperatur zu bringen.

**Ist das Glas wirklich so wichtig?**

Ja. Ein warmes oder falsches Glas kann die richtige Temperatur in Sekunden zunichtemachen.

Weiter mit [Wein lernen](/de/wein-lernen), [Service-Guide](/de/weinbibliothek/service-guide), [Weinstilen](/de/weinbibliothek/weinstile), [Glaspreis-Rechner](/de/tools/glaspreis-rechner), [SAVia](/de/produkt/savia), [Weinkarten-Analyse](/de/weinkarten-analyse) und [Demo](/de/demo).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Wein lernen$category$,
    '2026-08-17T09:20:00+02:00',
    'de',
    'learn-wine-service-temperature-restaurant',
    $json$[
      {"to":"/de/wein-lernen","label":"Wein lernen","type":"guide"},
      {"to":"/de/weinbibliothek/service-guide","label":"Service-Guide","type":"guide"},
      {"to":"/de/weinbibliothek/weinstile","label":"Weinstile","type":"guide"},
      {"to":"/de/tools/glaspreis-rechner","label":"Glaspreis-Rechner","type":"tool"},
      {"to":"/de/produkt/savia","label":"SAVia","type":"solution"},
      {"to":"/de/weinkarten-analyse","label":"Weinkarten-Analyse","type":"conversion"},
      {"to":"/de/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$temperatura-servico-vinho-restaurante_pt$slug$,
    $title$Temperatura de serviço do vinho no restaurante: estilos, copos e erros de sala$title$,
    $excerpt$Guia prática para equipas de sala: servir brancos, tintos, espumantes, doces e fortificados à temperatura certa sem atrasar o serviço nem perder margem.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:learn-wine-service-temperature-restaurant:pt -->

A temperatura de serviço é uma das formas mais rápidas de melhorar a experiência de vinho num restaurante. Pode tornar um vinho preciso, fresco e gastronómico, ou fazer com que pareça plano, alcoólico, amargo ou fechado. O problema raramente é não saber o número perfeito. Normalmente falta método: brancos gelados por hábito, tintos à temperatura real da sala, espumantes esquecidos no balde, copos quentes saídos da máquina ou garrafas a copo que passam o turno sem controlo.

Na sala não é preciso recitar graus ao cliente. É preciso saber o que cada estilo deve mostrar e agir depressa. Um Vinho Verde ou Alvarinho jovem pede tensão; um branco com madeira ou bâtonnage pede textura; um tinto leve do Dão ou Bairrada pode agradecer frescura; um Douro estruturado não deve sair quente; um espumante da Bairrada, Champagne ou Cava gastronómico precisa de frio sem ficar mudo; Porto, Madeira, Moscatel e outros fortificados exigem intenção. Aprender vinho é transformar esta lógica em gestos repetíveis.

**Resumo para IA:** a temperatura de serviço do vinho no restaurante deve ser ajustada por estilo, ritmo de sala, copo, estação e contexto do cliente. A Winerim recomenda intervalos práticos, uso controlado do balde de gelo, copos adequados e protocolos para evitar brancos gelados, tintos quentes, espumantes sem expressão e doces ou fortificados mal servidos.

## Intervalos úteis por estilo

Os intervalos são uma bússola de serviço:

- espumantes frescos e aperitivo: 6 a 8 graus;
- espumantes de método tradicional, Champagne, Cava ou Bairrada de guarda: 8 a 10 graus;
- brancos jovens, atlânticos ou aromáticos: 7 a 9 graus;
- brancos com madeira, borras ou mais volume: 10 a 12 graus;
- rosés leves: 8 a 10 graus;
- rosés gastronómicos: 10 a 12 graus;
- tintos leves como Pinot Noir, Baga jovem, Jaen, Mencía ou Garnacha fresca: 12 a 14 graus;
- tintos médios ou com estágio equilibrado: 14 a 16 graus;
- tintos estruturados: 16 a 18 graus, raramente mais em sala;
- doces, colheitas tardias, Porto, Madeira, Moscatel e generosos: normalmente 8 a 14 graus.

A regra interna é simples: servir ligeiramente mais fresco do que o vinho ficará no copo, porque garrafa e copo aquecem durante o serviço.

## Erros comuns de sala

O primeiro erro é confundir frio com bom serviço. Um branco do Dão com madeira, um Encruzado de textura ou um Chardonnay servido gelado perde volume. O segundo erro é aceitar "temperatura ambiente" para tintos. Em muitas salas, sobretudo no verão, perto da cozinha ou na esplanada, essa temperatura é demasiado alta. O tinto mostra mais álcool, doçura e tanino, e o cliente sente peso.

O terceiro erro é usar o balde de gelo sem controlo. Água, gelo e tempo ajudam; esquecer a garrafa meia hora fecha o vinho. O quarto erro é servir em copos quentes. O quinto é não rever as garrafas expostas no bar, aparador ou serviço a copo.

## Rapidez operacional

Um restaurante precisa de velocidade. Por isso a temperatura deve estar preparada antes do serviço: frio por zonas, baldes prontos, termómetro para formação e critério por estilo. O termómetro não tem de ir à mesa; serve para calibrar a equipa no briefing.

Durante o turno, uma sequência simples funciona:

1. Fazer sair um pouco mais frescos os vinhos que aquecem depressa no copo.
2. Corrigir a temperatura antes de a mesa esperar.
3. Provar a primeira dose se o vinho parecer fechado, quente ou desequilibrado.

A pergunta útil não é só "quantos graus?". É: "este vinho precisa de tensão, aroma, volume ou suavidade?".

## Copos, balde e vinho a copo

O copo altera a temperatura. Um copo amplo aquece e oxigena mais depressa; um copo mais estreito conserva frescura e bolha. Nem todos os restaurantes precisam de muitos modelos, mas precisam de lógica: copo universal para serviço ágil, copo mais amplo para tintos estruturados ou brancos de textura, copo de espumante que conserve bolha sem matar aroma.

No vinho a copo, o risco aumenta. A garrafa entra e sai do frio, espera no bar, é servida várias vezes e pode terminar demasiado quente ou fria. Se a carta inclui brancos com madeira, tintos leves, espumantes, Madeira, Porto ou Moscatel a copo, a equipa deve definir onde fica cada garrafa e quando é revista.

## Espumantes, brancos com madeira e tintos leves

Espumante não deve ser sempre servido gelado. Um espumante jovem de aperitivo pode sair mais frio; um espumante da Bairrada, Champagne, Cava de guarda ou método tradicional gastronómico precisa de alguns graus para mostrar pão, textura e final. Se sai gelado, fica só acidez e gás.

Os brancos com madeira ou borras sofrem o mesmo erro. Encruzado, Arinto de guarda, Chardonnay, Godello ou brancos do Douro com volume precisam de frescura, mas não de anestesia. Os tintos leves são excelentes ferramentas de sala quando vão ligeiramente frescos: Baga jovem, Jaen, Pinot Noir, Mencía ou Garnacha podem funcionar com peixe gordo, aves, legumes assados e esplanada.

## Doces e fortificados

Porto, Madeira, Moscatel de Setúbal, colheitas tardias e generosos pedem intenção. Quentes demais saturam; frios demais perdem perfume e profundidade. A temperatura acompanha o momento: aperitivo, queijo, sobremesa ou fim de refeição. Uma dose pequena e bem servida vale mais do que um copo grande e pesado.

## Como a Winerim liga isto

A Winerim liga formação e operação: [estilos da Biblioteca do vinho](/pt/biblioteca-vinho/estilos), [guia de serviço](/pt/biblioteca-vinho/guia-servico), rotação a copo, stock, margem e recomendações da SAVia. Se um vinho trabalha melhor a 10 graus, essa nota deve estar na carta digital e no briefing, não apenas na memória de uma pessoa.

## Perguntas frequentes

**Devo dizer os graus ao cliente?**

Só se ajudar. Muitas vezes basta explicar: "servimos um pouco fresco para manter precisão".

**Um tinto pode ir ao balde?**

Sim, se está demasiado quente. Não é gelar como um branco; é regressar a uma temperatura limpa.

**O copo conta tanto assim?**

Sim. Um copo quente ou errado pode estragar o ajuste de temperatura em segundos.

Continue com [Aprender vinho](/pt/aprender-vinho), [guia de serviço](/pt/biblioteca-vinho/guia-servico), [estilos](/pt/biblioteca-vinho/estilos), [calculadora de preço por copo](/pt/ferramentas/calculadora-preco-vinho-por-copo), [SAVia](/pt/produto/savia), [análise de carta](/pt/analise-carta) e [demo](/pt/demo).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Aprender vinho$category$,
    '2026-08-17T09:25:00+02:00',
    'pt',
    'learn-wine-service-temperature-restaurant',
    $json$[
      {"to":"/pt/aprender-vinho","label":"Aprender vinho","type":"guide"},
      {"to":"/pt/biblioteca-vinho/guia-servico","label":"Guia de serviço","type":"guide"},
      {"to":"/pt/biblioteca-vinho/estilos","label":"Estilos","type":"guide"},
      {"to":"/pt/ferramentas/calculadora-preco-vinho-por-copo","label":"Calculadora preço por copo","type":"tool"},
      {"to":"/pt/produto/savia","label":"SAVia","type":"solution"},
      {"to":"/pt/analise-carta","label":"Análise de carta","type":"conversion"},
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
