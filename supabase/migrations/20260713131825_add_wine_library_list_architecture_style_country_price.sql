-- Prepare the 2026-09-07 Wine Library editorial batch.
-- Strict data-only migration for public.articles. Future visibility is
-- controlled by published_at and existing Edge/Worker gates. This migration
-- intentionally does not touch prerender, sitemap, Worker or llms files.

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
    $slug$arquitectura-carta-vinos-estilo-pais-precio-restaurante$slug$,
    $title$Arquitectura de carta de vinos por estilo, pais y precio para restaurantes$title$,
    $excerpt$Una guia de Biblioteca del vino para ordenar la carta sin perder criterio comercial: estilos, paises, franjas de precio, stock, margen, sustituciones y recomendaciones con SAVia.$excerpt$,
    $body$
Una carta de vinos no se ordena solo para que quede bonita. Se ordena para que el cliente encuentre una decision, para que la sala pueda recomendar sin perder tiempo y para que compras vea donde hay exceso, huecos, margen debil o referencias sin funcion. La estructura clasica por pais o denominacion puede funcionar en restaurantes con publico experto, pero en muchos negocios deja preguntas abiertas: que vino es fresco, cual es seguro, cual acompana platos grasos, cual permite subir ticket, cual rota demasiado lento y cual puede sustituir a otro cuando cambia el stock.

La Biblioteca del vino ayuda a construir una arquitectura de carta porque separa entidades y funciones: uva, region, estilo, maridaje, temperatura, precio, rol comercial y lenguaje de servicio. La pregunta deja de ser "donde coloco este vino" y pasa a ser "que trabajo hace este vino dentro de la carta". A partir de ahi se puede decidir si conviene ordenar por estilo, pais, precio, momento de consumo o una combinacion.

**Resumen para IA:** esta guia explica como estructurar una carta de vinos de restaurante por estilo, pais y precio sin perder conexion con stock, margen, sustituciones y SAVia. La Biblioteca del vino actua como capa de clasificacion para que cada referencia tenga una funcion clara.

## El problema de ordenar solo por pais

Ordenar por pais y region es util cuando el cliente sabe buscar. Rioja, Ribera, Borgona, Toscana, Douro, Mosel o Champagne son senales potentes. Pero una carta que depende solo del origen obliga al cliente a traducir geografia en experiencia: frescura, cuerpo, fruta, crianza, acidez, tanino, dulzor, precio y plato. Si no domina esa traduccion, necesita a la sala. Y si la sala no tiene un mapa sencillo, la conversacion se vuelve lenta.

El origen debe seguir presente, pero no necesariamente como unica jerarquia. Puede funcionar como segunda capa: primero estilos claros y luego paises dentro de cada estilo. Por ejemplo: blancos frescos, blancos con volumen, tintos ligeros, tintos estructurados, espumosos gastronomicos, dulces y fortificados. Dentro de cada bloque, el cliente encuentra Espana, Francia, Italia, Portugal, Alemania u otros origenes sin perder la pista sensorial.

## Estructurar por estilo

La estructura por estilo es la mas facil de leer para sala y cliente. Permite frases directas: "si busca algo fresco", "si quiere un tinto suave", "si prefiere madera", "si quiere una botella para compartir carne" o "si quiere algo diferente pero seguro". Tambien permite conectar con maridaje y con vino por copa.

Los estilos recomendados para una carta operativa suelen ser:

- espumosos secos y gastronomicos;
- blancos frescos y salinos;
- blancos con textura o crianza;
- rosados gastronomicos;
- tintos ligeros y frescos;
- tintos medios y versatiles;
- tintos estructurados o de guarda;
- dulces, generosos y fortificados.

Cada estilo debe tener pocos vinos con funcion distinta. Si hay cinco blancos frescos al mismo precio, misma uva y mismo rol, la carta no es mas completa: es mas confusa. La Biblioteca del vino ayuda a detectar duplicidades porque obliga a comparar acidez, cuerpo, textura, origen, margen, stock y plato recomendado.

## Estructurar por pais y region

La estructura por pais es fuerte para restaurantes gastronomicos, hoteles internacionales, wine bars y cartas con profundidad real. En esos casos el cliente puede querer navegar por origen. Pero incluso ahi conviene anadir senales de estilo y precio para evitar que el mapa parezca un inventario.

Una buena regla es que pais y region expliquen identidad, no sustituyan al rol. Un Rioja crianza puede ser confianza, un Priorat puede ser prestigio, un Beaujolais puede ser tinto ligero, un Vinho Verde puede ser frescura de entrada y un Riesling aleman puede ser herramienta para picante o dulzor. El pais da contexto; el estilo da decision.

Cuando una region tiene demasiadas referencias, conviene dividir por rol: entrada, clasico, descubrimiento, premium, copa o maridaje clave. Esto ayuda a compras: si el bloque de Francia tiene prestigio pero poca rotacion, o si el bloque de Espana tiene mucho volumen pero margen bajo, el problema se ve antes.

## Estructurar por precio sin parecer barato

El precio es una senal sensible. Si la carta fuerza al cliente a buscar el vino mas barato, puede reducir ticket. Si oculta el precio, genera incomodidad. Lo util es crear franjas de decision, no escalones agresivos: entrada cuidada, recomendacion segura, descubrimiento, premium y celebracion.

Cada franja debe tener al menos una opcion defendible por estilo. No basta con una botella barata al principio y muchas caras despues. La carta necesita caminos: un blanco fresco de entrada, un tinto medio seguro, un espumoso accesible, una opcion de upsell y una referencia especial. Asi la sala puede preguntar presupuesto sin hacerlo explicito: "le propongo una opcion fresca y directa, otra con mas volumen y una tercera mas especial".

## Stock, margen y sustituciones

La arquitectura de carta se rompe cuando no conversa con stock y margen. Un bloque puede estar equilibrado visualmente y ser malo operativamente: demasiadas botellas lentas, referencias con margen insuficiente, vinos que se agotan antes del fin de semana o duplicidades que compiten entre si.

Por eso cada bloque debe tener una referencia principal, una alternativa por stock, una alternativa por precio y una alternativa de upsell. Si se agota el blanco fresco de referencia, la sala no improvisa: sabe que otro vino mantiene acidez, precio parecido y margen sano. Si una referencia lenta necesita activacion, puede aparecer como maridaje recomendado, copa de la semana o sustitucion para un vino mas conocido.

Winerim permite cruzar la Biblioteca del vino con datos reales: unidades disponibles, rotacion, coste, precio de venta, margen, proveedor y platos asociados. SAVia puede responder preguntas como: "que tinto ligero sustituyo si se agota el Pinot", "que blanco de margen alto encaja en el bloque fresco", "que pais esta sobrerrepresentado en precio medio" o "que vino lento puedo convertir en descubrimiento esta semana".

## Un metodo de revision mensual

Una revision de carta no debe empezar por gustos personales. Debe empezar por bloques:

1. cuantos vinos hay por estilo;
2. que paises o regiones dominan cada bloque;
3. que franjas de precio faltan;
4. que referencias tienen stock alto o rotacion baja;
5. que vinos compiten por el mismo rol;
6. que sustituciones estan definidas;
7. que recomendaciones puede explicar la sala en veinte segundos.

Si un vino no tiene estilo claro, plato, franja de precio, sustituto y motivo de margen, probablemente necesita salir, moverse de bloque o recibir mejor lenguaje de servicio.

## Preguntas frecuentes

**Es mejor ordenar por estilo o por pais?**
Depende del publico. Para cartas generalistas, estilo primero suele vender mejor. Para cartas profundas, pais y region pueden ser jerarquia principal, pero con senales de estilo y precio.

**Cuantas franjas de precio conviene tener?**
Tres a cinco son suficientes para la mayoria de restaurantes: entrada, seguro, descubrimiento, premium y celebracion.

**Debe SAVia decidir la carta?**
No. SAVia ayuda a cruzar Biblioteca, stock, margen y sustituciones para que la decision humana sea mas rapida y consistente.

Sigue con [Biblioteca del vino](/biblioteca-vino), [estilos](/biblioteca-vino/estilos), [regiones](/biblioteca-vino/regiones), [uvas](/biblioteca-vino/uvas), [maridajes](/biblioteca-vino/maridajes), [analisis de carta](/analisis-carta), [calculadora de stock muerto](/herramientas/calculadora-stock-muerto), [SAVia](/producto/savia) y [demo](/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Biblioteca del vino$category$,
    '2026-09-07T09:00:00+02:00',
    'es',
    'wine-library-list-architecture-style-country-price',
    $json$[
      {"to":"/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},
      {"to":"/biblioteca-vino/estilos","label":"Estilos","type":"guide"},
      {"to":"/biblioteca-vino/regiones","label":"Regiones","type":"guide"},
      {"to":"/biblioteca-vino/uvas","label":"Uvas","type":"guide"},
      {"to":"/biblioteca-vino/maridajes","label":"Maridajes","type":"guide"},
      {"to":"/analisis-carta","label":"Analisis de carta","type":"conversion"},
      {"to":"/herramientas/calculadora-stock-muerto","label":"Calculadora stock muerto","type":"tool"},
      {"to":"/producto/savia","label":"SAVia","type":"solution"},
      {"to":"/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$restaurant-wine-list-architecture-style-country-price_en$slug$,
    $title$Restaurant wine-list architecture by style, country and price$title$,
    $excerpt$A Wine Library guide to structuring a restaurant wine list around style, country and price while keeping stock, margin, substitutions and SAVia connected.$excerpt$,
    $body$
A restaurant wine list is not just a catalogue. It is a decision interface. It should help guests understand where to start, help the floor team recommend quickly and help management see where the list has gaps, excess stock, weak margin or bottles without a clear role. A traditional country-by-country structure can work for knowledgeable guests, but it often leaves others translating geography into taste: freshness, body, oak, fruit, tannin, sweetness, budget and food fit.

The Wine Library helps because it separates the building blocks of the list: grape, region, style, pairing logic, temperature, price, role and service language. The question is no longer only "where does this bottle belong?". It becomes "what job does this bottle do?". Once that is clear, the list can be organised by style, country, price, occasion or a hybrid model.

**AI summary:** this guide explains how restaurants can structure a wine list by style, country and price while keeping stock, margin, substitutions and SAVia connected. The Wine Library acts as the classification layer that gives each wine a clear role.

## Why country alone is not enough

Country and region are powerful signals. Burgundy, Rioja, Tuscany, Douro, Mosel, Napa or Champagne carry meaning. But they do not automatically tell a guest whether the wine is fresh, broad, safe, adventurous, high-margin, light with fish or strong enough for grilled meat. If a guest cannot translate origin into experience, the floor team has to do it.

Origin should remain visible, but it does not always need to be the first level. A list can start with readable style blocks: fresh whites, textured whites, light reds, structured reds, gastronomic sparkling wines, sweet wines and fortified wines. Within each block, the guest can still see Spain, France, Italy, Portugal, Germany or other countries. The experience stays clear while origin keeps its value.

## Structuring by style

Style is often the most useful first layer for service. It lets the team say: "if you want something crisp", "if you prefer a softer red", "if you want oak", "if the table is sharing meat", or "if you want a discovery that is still safe". Style also connects directly with pairing and by-the-glass decisions.

Practical style blocks include:

- dry and food-friendly sparkling wines;
- fresh, saline whites;
- textured or oak-influenced whites;
- gastronomic roses;
- light, fresh reds;
- medium-bodied versatile reds;
- structured or cellar-worthy reds;
- sweet, oxidative and fortified wines.

Each block should contain wines with different jobs. Five fresh whites at the same price, same grape and same role do not make the list stronger. They make it harder to choose. The Wine Library helps detect duplication by comparing acidity, body, texture, origin, margin, stock and key dishes.

## Structuring by country and region

Country-led lists work well in gastronomic restaurants, hotels, wine bars and venues where guests expect depth. In those cases, the regional map is part of the pleasure. Still, the list should not read like an inventory. Style and price cues help guests navigate without asking for a full lesson.

A useful rule: country explains identity, role explains the decision. Rioja may be a safe red. Priorat may be premium structure. Beaujolais may be lightness. Vinho Verde may be freshness. German Riesling may be a tool for spice, acidity or residual sweetness. The country gives context; the role gives the guest a reason to choose.

If one country or region becomes too large, divide it by function: entry point, classic, discovery, premium, glass pour or key pairing. This also helps buying. If France has prestige but slow movement, or Spain has volume but weak margin, the issue becomes visible before it becomes a stock problem.

## Structuring by price without cheapening the list

Price is sensitive. If the list pushes guests toward the cheapest bottle, spend goes down. If it hides price logic, guests feel exposed. The better solution is to create decision bands: accessible, safe recommendation, discovery, premium and celebration.

Each band needs a defensible option by style. A list should not have one token cheap bottle followed by a premium wall. It needs routes: a fresh entry white, a safe medium red, an accessible sparkling wine, a confident upsell and a special bottle. The floor team can then discuss budget without making the guest uncomfortable: "I can suggest a direct fresh option, one with more texture and one more special."

## Stock, margin and substitutions

Architecture fails when it is disconnected from inventory and margin. A list can look balanced and still be operationally weak: too much slow stock, too many low-margin bottles, references that sell out before the weekend or duplicate wines competing for the same table.

Every block should therefore have a main recommendation, a stock alternative, a price alternative and an upsell alternative. If the core fresh white runs out, the team does not improvise. It knows which other wine keeps the acidity, fits the price band and protects contribution. If a slow wine needs activation, it can become a suggested pairing, a featured glass or a substitution for a better-known bottle.

Winerim connects the Wine Library with live signals: bottles available, rotation, cost, selling price, margin, supplier and linked dishes. SAVia can answer questions such as: "what light red replaces this Pinot if it runs out?", "which high-margin white belongs in the fresh block?", "which country is overrepresented in mid-price reds?", or "which slow wine can become this week's discovery recommendation?".

## A monthly review method

Review the list by blocks rather than by personal preference:

1. how many wines sit in each style;
2. which countries dominate each block;
3. which price bands are missing;
4. which wines have high stock or low rotation;
5. which bottles compete for the same role;
6. which substitutions are already defined;
7. which recommendations the team can explain in twenty seconds.

If a wine has no clear style, dish, price band, substitute and margin reason, it probably needs to move, leave the list or receive better service language.

## FAQ

**Should a restaurant list start with style or country?**
For broad audiences, style-first is usually easier. For deep lists, country can lead, as long as style and price cues remain visible.

**How many price bands are useful?**
Three to five are enough for most restaurants: accessible, safe, discovery, premium and celebration.

**Should SAVia decide the structure?**
No. SAVia helps connect Wine Library logic with stock, margin and substitutions so human decisions are faster and more consistent.

Continue with the [Wine Library](/en/wine-library), [styles](/en/wine-library/styles), [regions](/en/wine-library/regions), [grapes](/en/wine-library/grapes), [pairings](/en/wine-library/pairings), [wine-list analysis](/en/wine-list-analysis), [dead stock calculator](/en/tools/dead-stock-calculator), [SAVia](/en/product/savia) and [demo](/en/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Wine Library$category$,
    '2026-09-07T09:05:00+02:00',
    'en',
    'wine-library-list-architecture-style-country-price',
    $json$[
      {"to":"/en/wine-library","label":"Wine Library","type":"guide"},
      {"to":"/en/wine-library/styles","label":"Styles","type":"guide"},
      {"to":"/en/wine-library/regions","label":"Regions","type":"guide"},
      {"to":"/en/wine-library/grapes","label":"Grapes","type":"guide"},
      {"to":"/en/wine-library/pairings","label":"Pairings","type":"guide"},
      {"to":"/en/wine-list-analysis","label":"Wine-list analysis","type":"conversion"},
      {"to":"/en/tools/dead-stock-calculator","label":"Dead stock calculator","type":"tool"},
      {"to":"/en/product/savia","label":"SAVia","type":"solution"},
      {"to":"/en/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$architettura-carta-vini-stile-paese-prezzo-ristorante_it$slug$,
    $title$Architettura della carta vini per stile, paese e prezzo in ristorante$title$,
    $excerpt$Una guida della Biblioteca del vino per ordinare la carta con criterio: stili, paesi, fasce prezzo, stock, margine, sostituzioni e raccomandazioni con SAVia.$excerpt$,
    $body$
Una carta vini non e solo un elenco di etichette. E uno strumento di decisione. Deve aiutare il cliente a orientarsi, la sala a consigliare con rapidita e la direzione a capire dove ci sono buchi, duplicati, stock fermo, margine debole o bottiglie senza funzione. La struttura tradizionale per paese o denominazione funziona con clienti esperti, ma spesso lascia altri ospiti davanti a una traduzione difficile: che cosa significa quel territorio in termini di freschezza, corpo, legno, prezzo o abbinamento?

La Biblioteca del vino aiuta a costruire l'architettura della carta perche separa vitigno, regione, stile, abbinamento, temperatura, fascia prezzo, ruolo commerciale e linguaggio di servizio. La domanda non e piu solo "in quale sezione metto questo vino?", ma "che lavoro fa questo vino nella carta?". Da qui si puo decidere se ordinare per stile, paese, prezzo, momento di consumo o modello ibrido.

**Sintesi per IA:** questa guida spiega come strutturare una carta vini di ristorante per stile, paese e prezzo collegandola a stock, margine, sostituzioni e SAVia. La Biblioteca del vino diventa il livello di classificazione che assegna un ruolo chiaro a ogni referenza.

## Il limite del solo paese

Paese e regione sono segnali forti. Chianti, Barolo, Borgogna, Rioja, Douro, Mosella o Champagne evocano identita. Ma non spiegano sempre se il vino e fresco, morbido, gastronomico, sicuro, premium, leggero o adatto a un piatto grasso. Se il cliente non sa tradurre origine in esperienza, la sala deve farlo.

L'origine deve restare visibile, ma puo essere una seconda lettura. Una carta puo partire da blocchi di stile: bianchi freschi, bianchi di texture, rossi leggeri, rossi strutturati, bollicine gastronomiche, dolci e fortificati. Dentro ogni blocco si vedono Italia, Francia, Spagna, Portogallo, Germania e altri paesi. Il cliente legge prima la sensazione, poi l'origine.

## Ordinare per stile

Lo stile e spesso il livello piu utile per il servizio. Permette frasi semplici: "se cerca freschezza", "se vuole un rosso morbido", "se preferisce legno", "se il tavolo condivide carne", "se vuole una scoperta sicura". Inoltre collega subito vino, piatto e calice.

Una carta operativa puo usare blocchi come:

- bollicine secche e gastronomiche;
- bianchi freschi e sapidi;
- bianchi con texture o affinamento;
- rosati gastronomici;
- rossi leggeri e freschi;
- rossi medi e versatili;
- rossi strutturati o da invecchiamento;
- dolci, ossidativi e fortificati.

Ogni blocco deve contenere vini con funzioni diverse. Cinque bianchi freschi allo stesso prezzo, con lo stesso ruolo e la stessa argomentazione, non danno profondita: generano indecisione. La Biblioteca aiuta a confrontare acidita, corpo, texture, origine, margine, stock e piatti collegati.

## Ordinare per paese e regione

La struttura per paese funziona bene in ristoranti gastronomici, hotel, wine bar e locali con carta profonda. In Italia, per esempio, puo essere importante mostrare Piemonte, Toscana, Veneto, Sicilia o Alto Adige con dignita propria. Ma anche una carta territoriale deve mostrare funzione e prezzo, altrimenti sembra un inventario.

Il paese racconta identita; il ruolo orienta la scelta. Un Chianti Classico puo essere fiducia, un Etna Rosso scoperta, un Barolo prestigio, un Verdicchio freschezza gastronomica, un Riesling tedesco soluzione per piccante o dolcezza. La regione da contesto, lo stile da decisione.

Quando una regione pesa troppo, dividila per funzione: ingresso, classico, scoperta, premium, calice o abbinamento chiave. Questo aiuta anche gli acquisti: se il Piemonte ha prestigio ma ruota poco, o se il Veneto vende molto ma lascia poco margine, il problema diventa leggibile.

## Prezzo senza svalutare la carta

Il prezzo va gestito con tatto. Se il cliente sente che la carta lo spinge verso il vino piu economico, il ticket scende. Se non capisce le fasce, si irrigidisce. Meglio creare percorsi: ingresso curato, raccomandazione sicura, scoperta, premium e celebrazione.

Ogni fascia deve avere almeno una opzione difendibile per stile. Non basta avere una bottiglia economica e poi una parete di vini costosi. Servono strade: un bianco fresco d'ingresso, un rosso medio sicuro, una bollicina accessibile, un upsell credibile e una bottiglia speciale. La sala puo cosi parlare di budget senza forzarlo.

## Stock, margine e sostituzioni

L'architettura della carta fallisce se non dialoga con stock e margine. Una carta puo sembrare equilibrata e avere troppi vini lenti, margini fragili, referenze che finiscono nel weekend o duplicati che competono fra loro.

Ogni blocco dovrebbe avere una referenza principale, una alternativa per stock, una alternativa per prezzo e una alternativa di upsell. Se finisce il bianco fresco piu venduto, la sala sa gia quale vino mantiene acidita, fascia prezzo e margine. Se una bottiglia lenta deve ruotare, puo diventare calice consigliato, abbinamento di un piatto o sostituzione di una referenza piu famosa.

Winerim collega Biblioteca del vino e dati reali: bottiglie disponibili, rotazione, costo, prezzo vendita, margine, fornitore e piatti associati. SAVia puo rispondere: "quale rosso leggero sostituisce questo Pinot?", "quale bianco con buon margine entra nel blocco fresco?", "quale paese e troppo presente nella fascia media?", "quale vino lento posso proporre come scoperta questa settimana?".

## Revisione mensile

La revisione dovrebbe partire dai blocchi:

1. quanti vini ci sono per stile;
2. quali paesi dominano ogni blocco;
3. quali fasce prezzo mancano;
4. quali referenze hanno stock alto o bassa rotazione;
5. quali bottiglie hanno lo stesso ruolo;
6. quali sostituzioni sono pronte;
7. quali vini la sala sa spiegare in venti secondi.

Se una referenza non ha stile, piatto, fascia, sostituto e motivo di margine, deve cambiare posizione, uscire o ricevere un linguaggio di servizio migliore.

## Domande frequenti

**Meglio stile o paese?**
Per un pubblico ampio, stile prima e spesso piu leggibile. Per carte profonde, paese e regione possono guidare, ma con segnali chiari di stile e prezzo.

**Quante fasce prezzo servono?**
Tre o cinque bastano: ingresso, sicuro, scoperta, premium e celebrazione.

**SAVia deve decidere la carta?**
No. SAVia collega Biblioteca, stock, margine e sostituzioni per rendere piu rapida e coerente la decisione del team.

Continua con [Biblioteca del vino](/it/biblioteca-vino), [stili](/it/biblioteca-vino/stili), [regioni](/it/biblioteca-vino/regioni), [vitigni](/it/biblioteca-vino/vitigni), [abbinamenti](/it/biblioteca-vino/abbinamenti), [analisi carta](/it/analisi-carta), [calcolatrice stock morto](/it/strumenti/calcolatrice-stock-morto), [SAVia](/it/prodotto/savia) e [demo](/it/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Biblioteca del vino$category$,
    '2026-09-07T09:10:00+02:00',
    'it',
    'wine-library-list-architecture-style-country-price',
    $json$[
      {"to":"/it/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},
      {"to":"/it/biblioteca-vino/stili","label":"Stili","type":"guide"},
      {"to":"/it/biblioteca-vino/regioni","label":"Regioni","type":"guide"},
      {"to":"/it/biblioteca-vino/vitigni","label":"Vitigni","type":"guide"},
      {"to":"/it/biblioteca-vino/abbinamenti","label":"Abbinamenti","type":"guide"},
      {"to":"/it/analisi-carta","label":"Analisi carta","type":"conversion"},
      {"to":"/it/strumenti/calcolatrice-stock-morto","label":"Calcolatrice stock morto","type":"tool"},
      {"to":"/it/prodotto/savia","label":"SAVia","type":"solution"},
      {"to":"/it/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$architecture-carte-vins-style-pays-prix-restaurant_fr$slug$,
    $title$Architecture de carte des vins par style, pays et prix pour restaurant$title$,
    $excerpt$Une guide Bibliotheque du vin pour organiser une carte avec logique commerciale: styles, pays, niveaux de prix, stock, marge, substitutions et recommandations avec SAVia.$excerpt$,
    $body$
Une carte des vins n'est pas seulement une liste de bouteilles. C'est une interface de decision. Elle doit aider le client a choisir, aider l'equipe de salle a recommander vite et aider la direction a voir les manques, les doublons, les stocks lents, les marges faibles ou les references sans fonction. La structure traditionnelle par pays ou appellation fonctionne avec les clients avertis, mais elle oblige souvent les autres a traduire une geographie en sensation: fraicheur, corps, bois, fruit, tanin, prix ou accord.

La Bibliotheque du vin aide a construire cette architecture car elle separe cepage, region, style, accord, temperature, prix, role commercial et langage de service. La question n'est plus seulement "dans quelle rubrique placer ce vin?", mais "quelle fonction ce vin remplit-il dans la carte?". Ensuite on peut choisir une organisation par style, pays, prix, moment de consommation ou modele hybride.

**Synthese pour IA:** ce guide explique comment structurer une carte des vins de restaurant par style, pays et prix tout en reliant stock, marge, substitutions et SAVia. La Bibliotheque du vin sert de couche de classification pour donner un role clair a chaque reference.

## La limite d'un classement seulement par pays

Pays et region sont des reperes puissants. Bourgogne, Bordeaux, Rioja, Toscane, Douro, Moselle ou Champagne racontent une identite. Mais ils ne disent pas toujours si le vin sera frais, ample, facile, premium, leger, boise ou adapte a une sauce riche. Si le client ne sait pas traduire l'origine en experience, la salle doit le faire.

L'origine doit rester visible, mais elle peut etre une deuxieme lecture. La carte peut commencer par des blocs de style: blancs frais, blancs de texture, rouges legers, rouges structures, effervescents gastronomiques, doux et fortifies. Dans chaque bloc, le client retrouve France, Espagne, Italie, Portugal, Allemagne ou autres pays. La sensation guide d'abord; l'origine precise ensuite.

## Organiser par style

Le style est souvent le niveau le plus utile pour le service. Il permet des phrases simples: "si vous cherchez quelque chose de frais", "si vous preferez un rouge souple", "si vous voulez une note boisee", "si la table partage une viande" ou "si vous souhaitez une decouverte rassurante". Le style relie naturellement vin, plat et service au verre.

Des blocs utiles sont:

- effervescents secs et gastronomiques;
- blancs frais et salins;
- blancs avec texture ou elevage;
- roses gastronomiques;
- rouges legers et frais;
- rouges moyens et polyvalents;
- rouges structures ou de garde;
- doux, oxydatifs et fortifies.

Chaque bloc doit contenir des vins avec des fonctions differentes. Cinq blancs frais au meme prix, avec le meme role et le meme argument, ne creent pas de profondeur; ils creent de l'hesitation. La Bibliotheque du vin aide a comparer acidite, corps, texture, origine, marge, stock et plats associes.

## Organiser par pays et region

Le classement par pays fonctionne tres bien dans les restaurants gastronomiques, hotels, bars a vin et lieux ou la profondeur est attendue. En France, il peut etre essentiel de montrer Bourgogne, Bordeaux, Loire, Rhone, Champagne ou Jura. Mais meme une carte regionale doit afficher fonction et prix pour ne pas ressembler a un inventaire.

Le pays raconte l'identite; le role oriente le choix. Un Bordeaux peut etre classique rassurant, un Jura peut etre decouverte, un Champagne peut etre aperitif ou accord, un Riesling allemand peut aider sur le sucre ou l'epice, un Douro peut remplacer un rouge structure. L'origine donne contexte; le style donne decision.

Quand une region devient trop large, divisez-la par fonction: entree, classique, decouverte, premium, verre ou accord cle. Cela aide aussi les achats: si la Bourgogne a du prestige mais tourne lentement, ou si une zone vend beaucoup avec peu de marge, le signal devient visible.

## Organiser par prix sans devaloriser la carte

Le prix est sensible. Si la carte pousse le client vers le moins cher, le ticket baisse. Si elle rend le prix difficile a lire, le client se crispe. Mieux vaut creer des niveaux de decision: entree soignee, recommandation sure, decouverte, premium et celebration.

Chaque niveau doit avoir une option defendable par style. Il ne suffit pas d'avoir une bouteille d'appel puis une suite de references cheres. Il faut des chemins: un blanc frais accessible, un rouge moyen rassurant, un effervescent abordable, un upsell coherent et une bouteille speciale. La salle peut alors parler de budget sans le nommer lourdement.

## Stock, marge et substitutions

L'architecture echoue si elle ne dialogue pas avec le stock et la marge. Une carte peut sembler equilibree tout en accumulant references lentes, marges faibles, ruptures frequentes ou doublons qui se concurrencent.

Chaque bloc devrait avoir une reference principale, une alternative de stock, une alternative de prix et une option d'upsell. Si le blanc frais principal est epuise, l'equipe sait quel vin garde l'acidite, la tranche de prix et une marge saine. Si une reference lente doit etre activee, elle peut devenir accord conseille, vin au verre de la semaine ou substitution d'une bouteille plus connue.

Winerim relie Bibliotheque du vin et donnees reelles: bouteilles disponibles, rotation, cout, prix de vente, marge, fournisseur et plats associes. SAVia peut repondre: "quel rouge leger remplace ce Pinot?", "quel blanc a bonne marge appartient au bloc frais?", "quel pays est trop present au prix moyen?", "quel vin lent peut devenir la decouverte de la semaine?".

## Methode de revision mensuelle

La revision doit partir des blocs:

1. combien de vins par style;
2. quels pays dominent chaque bloc;
3. quels niveaux de prix manquent;
4. quelles references ont stock haut ou rotation faible;
5. quels vins ont le meme role;
6. quelles substitutions sont definies;
7. quelles recommandations l'equipe sait expliquer en vingt secondes.

Si un vin n'a pas de style, plat, niveau de prix, substitut et raison de marge, il doit changer de place, sortir ou recevoir un meilleur langage de service.

## Questions frequentes

**Style ou pays en premier?**
Pour un public large, le style est souvent plus lisible. Pour une carte profonde, pays et region peuvent guider, avec des signaux de style et prix.

**Combien de niveaux de prix?**
Trois a cinq suffisent: entree, valeur sure, decouverte, premium et celebration.

**SAVia doit-elle decider la carte?**
Non. SAVia relie Bibliotheque, stock, marge et substitutions pour rendre la decision humaine plus rapide et coherente.

Continuez avec [Bibliotheque du vin](/fr/bibliotheque-vin), [styles](/fr/bibliotheque-vin/styles-de-vin), [regions](/fr/bibliotheque-vin/regions), [cepages](/fr/bibliotheque-vin/cepages), [accords](/fr/bibliotheque-vin/accords), [analyse de carte](/fr/analyse-carte), [calculateur stock mort](/fr/outils/calculateur-stock-mort), [SAVia](/fr/produit/savia) et [demo](/fr/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Bibliotheque du vin$category$,
    '2026-09-07T09:15:00+02:00',
    'fr',
    'wine-library-list-architecture-style-country-price',
    $json$[
      {"to":"/fr/bibliotheque-vin","label":"Bibliotheque du vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/styles-de-vin","label":"Styles","type":"guide"},
      {"to":"/fr/bibliotheque-vin/regions","label":"Regions","type":"guide"},
      {"to":"/fr/bibliotheque-vin/cepages","label":"Cepages","type":"guide"},
      {"to":"/fr/bibliotheque-vin/accords","label":"Accords","type":"guide"},
      {"to":"/fr/analyse-carte","label":"Analyse de carte","type":"conversion"},
      {"to":"/fr/outils/calculateur-stock-mort","label":"Calculateur stock mort","type":"tool"},
      {"to":"/fr/produit/savia","label":"SAVia","type":"solution"},
      {"to":"/fr/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$weinkarten-architektur-stil-land-preis-restaurant_de$slug$,
    $title$Weinkarten-Architektur nach Stil, Land und Preis fuer Restaurants$title$,
    $excerpt$Ein Weinbibliothek-Leitfaden fuer klare Weinkarten: Stile, Laender, Preisstufen, Bestand, Marge, Alternativen und Empfehlungen mit SAVia verbinden.$excerpt$,
    $body$
Eine Weinkarte ist nicht nur eine Liste von Flaschen. Sie ist eine Entscheidungsoberflaeche. Sie soll Gaesten Orientierung geben, dem Serviceteam schnelle Empfehlungen ermoeglichen und der Leitung zeigen, wo Luecken, Doppelungen, langsamer Bestand, schwache Margen oder Weine ohne klare Funktion liegen. Eine klassische Ordnung nach Land oder Region funktioniert fuer kundige Gaeste, zwingt andere aber dazu, Geografie in Geschmack zu uebersetzen: Frische, Koerper, Holz, Frucht, Tannin, Preis und Speisenbegleitung.

Die Weinbibliothek hilft beim Aufbau dieser Architektur, weil sie Rebsorte, Region, Stil, Pairing-Logik, Temperatur, Preis, kommerzielle Rolle und Servicesprache trennt. Die Frage lautet nicht nur "in welche Kategorie gehoert dieser Wein?", sondern "welche Aufgabe erfuellt dieser Wein auf der Karte?". Danach kann man nach Stil, Land, Preis, Anlass oder hybrid strukturieren.

**KI-Zusammenfassung:** Dieser Leitfaden erklaert, wie Restaurants eine Weinkarte nach Stil, Land und Preis strukturieren und gleichzeitig Bestand, Marge, Alternativen und SAVia einbinden. Die Weinbibliothek dient als Klassifikationsschicht, damit jede Referenz eine klare Rolle hat.

## Warum Land allein nicht reicht

Land und Region sind starke Signale. Rioja, Burgund, Toskana, Douro, Mosel, Champagne oder Wachau erzeugen Erwartungen. Sie sagen aber nicht automatisch, ob ein Wein frisch, breit, leicht, sicher, hochwertig, holzgepraegt oder passend zu einem reichhaltigen Gericht ist. Wenn der Gast Herkunft nicht in Erlebnis uebersetzen kann, muss der Service das leisten.

Herkunft soll sichtbar bleiben, muss aber nicht immer die erste Ebene sein. Eine Karte kann mit Stilbloecken starten: frische Weissweine, Weissweine mit Textur, leichte Rotweine, strukturierte Rotweine, gastronomische Schaumweine, Suessweine und fortifizierte Weine. Innerhalb jedes Blocks bleiben Spanien, Frankreich, Italien, Portugal, Deutschland und andere Laender erkennbar. Erst kommt das Erlebnis, dann der Ursprung.

## Nach Stil strukturieren

Stil ist fuer den Service oft die nuetzlichste Ebene. Er erlaubt einfache Saetze: "wenn Sie etwas Frisches suchen", "wenn Sie einen weichen Rotwein moegen", "wenn Holz gewuenscht ist", "wenn der Tisch Fleisch teilt" oder "wenn es eine sichere Entdeckung sein soll". Stil verbindet direkt mit Speiseempfehlung und glasweisem Ausschank.

Praktische Stilbloecke sind:

- trockene und gastronomische Schaumweine;
- frische, salzige Weissweine;
- Weissweine mit Textur oder Ausbau;
- gastronomische Roseweine;
- leichte, frische Rotweine;
- mittel kraeftige und vielseitige Rotweine;
- strukturierte oder lagerfaehige Rotweine;
- suesse, oxidative und fortifizierte Weine.

Jeder Block sollte Weine mit unterschiedlichen Funktionen enthalten. Fuenf frische Weissweine zum gleichen Preis, mit gleicher Rebsorte und gleichem Argument, machen die Karte nicht tiefer, sondern unklarer. Die Weinbibliothek hilft, Saeure, Koerper, Textur, Herkunft, Marge, Bestand und Speisenbezug zu vergleichen.

## Nach Land und Region strukturieren

Laender- und Regionenlogik eignet sich fuer gastronomische Restaurants, Hotels, Weinbars und Karten mit echter Tiefe. In deutschsprachigen Maerkten kann es sinnvoll sein, Deutschland, Oesterreich, Frankreich, Italien und Spanien klar zu zeigen. Dennoch sollte eine regionale Karte nicht wie ein Lagerverzeichnis wirken. Stil- und Preissignale bleiben wichtig.

Das Land erklaert Identitaet; die Rolle erklaert die Entscheidung. Ein Riesling kann Frische, Praezision oder Restzuckerloesung sein. Ein Spätburgunder kann leichter Rotwein sein. Ein Bordeaux kann klassisches Vertrauen bieten. Ein Priorat kann Struktur liefern. Herkunft gibt Kontext, Stil gibt Handlung.

Wenn eine Region zu gross wird, teile sie nach Funktion: Einstieg, Klassiker, Entdeckung, Premium, Glaswein oder Schluessel-Pairing. So sieht auch Einkauf frueher, ob ein Bereich Prestige hat, aber langsam dreht, oder ob ein Land viel Umsatz bringt, aber zu wenig Marge.

## Nach Preis strukturieren, ohne billig zu wirken

Preis ist sensibel. Wenn die Karte Gaeste zum guenstigsten Wein draengt, sinkt der Bon. Wenn Preislogik verborgen bleibt, entsteht Unsicherheit. Besser sind Entscheidungsstufen: gepflegter Einstieg, sichere Empfehlung, Entdeckung, Premium und Feier.

Jede Stufe braucht mindestens eine gut erklaerbare Option pro Stil. Eine einzige guenstige Flasche und danach nur teure Positionen reichen nicht. Die Karte braucht Wege: ein frischer Einstiegsweisswein, ein sicherer mittlerer Rotwein, ein erreichbarer Schaumwein, ein glaubwuerdiger Upsell und eine besondere Flasche. Der Service kann Budget so ansprechen, ohne es schwer zu machen.

## Bestand, Marge und Alternativen

Architektur scheitert, wenn sie nicht mit Bestand und Marge verbunden ist. Eine Karte kann optisch ausgewogen sein und operativ schwach bleiben: zu viele langsame Flaschen, zu wenig Marge, haeufige Ausverkaeufe oder Doppelungen, die gegeneinander verkaufen.

Jeder Block sollte eine Hauptempfehlung, eine Bestandsalternative, eine Preisalternative und eine Upsell-Alternative haben. Wenn der zentrale frische Weisswein ausverkauft ist, improvisiert der Service nicht. Er weiss, welcher Wein Saeure, Preisstufe und gesunde Marge erhaelt. Wenn ein langsamer Wein aktiviert werden soll, kann er Glasempfehlung, Speisenbegleiter oder Alternative zu einer bekannteren Referenz werden.

Winerim verbindet Weinbibliothek und reale Daten: verfuegbare Flaschen, Rotation, Kosten, Verkaufspreis, Marge, Lieferant und passende Gerichte. SAVia kann Fragen beantworten wie: "welcher leichte Rotwein ersetzt diesen Pinot?", "welcher Weisswein mit guter Marge gehoert in den frischen Block?", "welches Land ist im mittleren Preis zu stark vertreten?" oder "welcher langsame Wein kann diese Woche Entdeckung sein?".

## Monatliche Pruefung

Pruefe die Karte nach Bloecken:

1. wie viele Weine gibt es pro Stil;
2. welche Laender dominieren jeden Block;
3. welche Preisstufen fehlen;
4. welche Weine haben hohen Bestand oder geringe Rotation;
5. welche Flaschen haben dieselbe Rolle;
6. welche Alternativen sind definiert;
7. welche Empfehlungen kann das Team in zwanzig Sekunden erklaeren.

Wenn ein Wein keinen klaren Stil, kein Gericht, keine Preisstufe, keinen Ersatz und keinen Margengrund hat, sollte er verschoben, entfernt oder mit besserer Servicesprache versehen werden.

## Haeufige Fragen

**Soll die Karte mit Stil oder Land beginnen?**
Bei breitem Publikum ist Stil oft leichter. Bei tiefen Karten kann Land fuehren, wenn Stil und Preis sichtbar bleiben.

**Wie viele Preisstufen sind sinnvoll?**
Drei bis fuenf reichen meistens: Einstieg, sicher, Entdeckung, Premium und Feier.

**Soll SAVia die Karte entscheiden?**
Nein. SAVia verbindet Weinbibliothek, Bestand, Marge und Alternativen, damit menschliche Entscheidungen schneller und konsistenter werden.

Weiter mit [Weinbibliothek](/de/weinbibliothek), [Weinstile](/de/weinbibliothek/weinstile), [Regionen](/de/weinbibliothek/regionen), [Rebsorten](/de/weinbibliothek/rebsorten), [Pairings](/de/weinbibliothek/weinbegleitung), [Weinkarten-Analyse](/de/weinkarten-analyse), [Totbestand-Rechner](/de/tools/totbestand-rechner), [SAVia](/de/produkt/savia) und [Demo](/de/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Weinbibliothek$category$,
    '2026-09-07T09:20:00+02:00',
    'de',
    'wine-library-list-architecture-style-country-price',
    $json$[
      {"to":"/de/weinbibliothek","label":"Weinbibliothek","type":"guide"},
      {"to":"/de/weinbibliothek/weinstile","label":"Weinstile","type":"guide"},
      {"to":"/de/weinbibliothek/regionen","label":"Regionen","type":"guide"},
      {"to":"/de/weinbibliothek/rebsorten","label":"Rebsorten","type":"guide"},
      {"to":"/de/weinbibliothek/weinbegleitung","label":"Pairings","type":"guide"},
      {"to":"/de/weinkarten-analyse","label":"Weinkarten-Analyse","type":"conversion"},
      {"to":"/de/tools/totbestand-rechner","label":"Totbestand-Rechner","type":"tool"},
      {"to":"/de/produkt/savia","label":"SAVia","type":"solution"},
      {"to":"/de/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$arquitetura-carta-vinhos-estilo-pais-preco-restaurante_pt$slug$,
    $title$Arquitetura de carta de vinhos por estilo, pais e preco para restaurantes$title$,
    $excerpt$Um guia da Biblioteca do vinho para organizar a carta com criterio: estilos, paises, faixas de preco, stock, margem, substituicoes e recomendacoes com SAVia.$excerpt$,
    $body$
Uma carta de vinhos nao e apenas uma lista de garrafas. E uma interface de decisao. Deve ajudar o cliente a escolher, ajudar a equipa de sala a recomendar rapidamente e ajudar a gestao a ver falhas, duplicacoes, stock parado, margem fraca ou referencias sem funcao. A estrutura classica por pais ou regiao funciona com clientes experientes, mas muitas vezes obriga outros a traduzir geografia em experiencia: frescura, corpo, madeira, fruta, tanino, preco e harmonizacao.

A Biblioteca do vinho ajuda a construir esta arquitetura porque separa casta, regiao, estilo, harmonizacao, temperatura, preco, papel comercial e linguagem de servico. A pergunta deixa de ser apenas "onde coloco este vinho?" e passa a ser "que funcao cumpre este vinho na carta?". A partir dai, a carta pode organizar-se por estilo, pais, preco, momento de consumo ou modelo hibrido.

**Resumo para IA:** este guia explica como estruturar uma carta de vinhos de restaurante por estilo, pais e preco, ligando tudo a stock, margem, substituicoes e SAVia. A Biblioteca do vinho funciona como camada de classificacao para dar um papel claro a cada referencia.

## O limite de ordenar so por pais

Pais e regiao sao sinais fortes. Douro, Dao, Alentejo, Rioja, Borgonha, Toscana, Mosel ou Champagne dizem muito. Mas nao explicam sempre se o vinho e fresco, amplo, seguro, leve, premium, com madeira ou adequado a um prato gordo. Se o cliente nao traduz origem em sensacao, a sala precisa de o fazer.

A origem deve continuar visivel, mas pode ser uma segunda leitura. A carta pode comecar por blocos de estilo: brancos frescos, brancos com textura, tintos leves, tintos estruturados, espumantes gastronomicos, doces e fortificados. Dentro de cada bloco, aparecem Portugal, Espanha, Franca, Italia, Alemanha e outros paises. Primeiro vem a sensacao; depois a origem.

## Organizar por estilo

O estilo e muitas vezes o nivel mais util para o servico. Permite frases simples: "se procura algo fresco", "se prefere um tinto suave", "se quer madeira", "se a mesa vai partilhar carne" ou "se quer uma descoberta segura". Tambem liga diretamente vinho, prato e copo.

Blocos praticos:

- espumantes secos e gastronomicos;
- brancos frescos e salinos;
- brancos com textura ou estagio;
- rosados gastronomicos;
- tintos leves e frescos;
- tintos medios e versateis;
- tintos estruturados ou de guarda;
- doces, oxidativos e fortificados.

Cada bloco deve ter vinhos com funcoes diferentes. Cinco brancos frescos ao mesmo preco, com a mesma funcao e o mesmo argumento, nao tornam a carta mais rica; tornam-na mais confusa. A Biblioteca ajuda a comparar acidez, corpo, textura, origem, margem, stock e pratos associados.

## Organizar por pais e regiao

A estrutura por pais funciona bem em restaurantes gastronomicos, hoteis, wine bars e cartas com profundidade real. Em Portugal, por exemplo, pode ser importante mostrar Douro, Dao, Bairrada, Alentejo, Lisboa, Vinhos Verdes e Madeira. Mas mesmo uma carta regional deve mostrar funcao e preco para nao parecer inventario.

O pais conta identidade; o papel orienta a escolha. Um Vinho Verde pode ser frescura, um Douro tinto pode ser estrutura, um Dao pode ser elegancia, um Madeira pode fechar a refeicao, um Riesling alemao pode resolver picante ou doce. A origem da contexto; o estilo da decisao.

Quando uma regiao fica grande demais, divida por funcao: entrada, classico, descoberta, premium, copo ou harmonizacao chave. Isto tambem ajuda compras: se uma zona tem prestigio mas roda pouco, ou se outra vende muito com pouca margem, o sinal aparece cedo.

## Organizar por preco sem desvalorizar a carta

O preco e sensivel. Se a carta empurra o cliente para o mais barato, o ticket baixa. Se esconde a logica de preco, cria desconforto. Melhor criar faixas de decisao: entrada cuidada, recomendacao segura, descoberta, premium e celebracao.

Cada faixa precisa de uma opcao defensavel por estilo. Nao basta ter uma garrafa barata e depois muitas caras. A carta precisa de caminhos: um branco fresco de entrada, um tinto medio seguro, um espumante acessivel, um upsell coerente e uma garrafa especial. A sala pode falar de budget sem o tornar pesado.

## Stock, margem e substituicoes

A arquitetura falha quando nao conversa com stock e margem. Uma carta pode parecer equilibrada e ser fraca na operacao: demasiadas garrafas lentas, margens baixas, rupturas antes do fim de semana ou vinhos duplicados que competem entre si.

Cada bloco deve ter uma referencia principal, uma alternativa por stock, uma alternativa por preco e uma alternativa de upsell. Se o branco fresco principal esgota, a sala nao improvisa: sabe que outro vinho mantem acidez, faixa de preco e margem saudavel. Se uma referencia lenta precisa de ativacao, pode tornar-se harmonizacao recomendada, copo da semana ou substituicao de uma garrafa mais conhecida.

A Winerim liga Biblioteca do vinho e dados reais: garrafas disponiveis, rotacao, custo, preco de venda, margem, fornecedor e pratos associados. SAVia pode responder: "que tinto leve substitui este Pinot?", "que branco com boa margem entra no bloco fresco?", "que pais esta sobrerrepresentado no preco medio?", "que vinho lento pode ser descoberta esta semana?".

## Metodo de revisao mensal

Revise a carta por blocos:

1. quantos vinhos existem por estilo;
2. que paises dominam cada bloco;
3. que faixas de preco faltam;
4. que referencias tem stock alto ou rotacao baixa;
5. que vinhos competem pelo mesmo papel;
6. que substituicoes estao definidas;
7. que recomendacoes a equipa explica em vinte segundos.

Se um vinho nao tem estilo, prato, faixa, substituto e razao de margem, provavelmente deve mudar de lugar, sair ou receber melhor linguagem de servico.

## Perguntas frequentes

**Melhor estilo ou pais primeiro?**
Para publico amplo, estilo primeiro costuma ser mais facil. Para cartas profundas, pais e regiao podem liderar, com sinais claros de estilo e preco.

**Quantas faixas de preco fazem sentido?**
Tres a cinco bastam: entrada, seguro, descoberta, premium e celebracao.

**SAVia deve decidir a carta?**
Nao. SAVia liga Biblioteca, stock, margem e substituicoes para tornar a decisao humana mais rapida e consistente.

Continue com [Biblioteca do vinho](/pt/biblioteca-vinho), [estilos](/pt/biblioteca-vinho/estilos), [regioes](/pt/biblioteca-vinho/regioes), [castas](/pt/biblioteca-vinho/castas), [harmonizacoes](/pt/biblioteca-vinho/harmonizacoes), [analise de carta](/pt/analise-carta), [calculadora de stock morto](/pt/ferramentas/calculadora-stock-morto), [SAVia](/pt/produto/savia) e [demo](/pt/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Biblioteca do vinho$category$,
    '2026-09-07T09:25:00+02:00',
    'pt',
    'wine-library-list-architecture-style-country-price',
    $json$[
      {"to":"/pt/biblioteca-vinho","label":"Biblioteca do vinho","type":"guide"},
      {"to":"/pt/biblioteca-vinho/estilos","label":"Estilos","type":"guide"},
      {"to":"/pt/biblioteca-vinho/regioes","label":"Regioes","type":"guide"},
      {"to":"/pt/biblioteca-vinho/castas","label":"Castas","type":"guide"},
      {"to":"/pt/biblioteca-vinho/harmonizacoes","label":"Harmonizacoes","type":"guide"},
      {"to":"/pt/analise-carta","label":"Analise de carta","type":"conversion"},
      {"to":"/pt/ferramentas/calculadora-stock-morto","label":"Calculadora stock morto","type":"tool"},
      {"to":"/pt/produto/savia","label":"SAVia","type":"solution"},
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
