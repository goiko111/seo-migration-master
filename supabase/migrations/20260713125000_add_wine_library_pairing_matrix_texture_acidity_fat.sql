-- Prepare the 2026-08-24 Wine Library editorial batch.
-- Scope guard: data-only migration for public.articles. Future visibility is
-- controlled by published_at plus Edge/Worker release gating.

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
    $slug$matriz-maridaje-textura-acidez-grasa-restaurante$slug$,
    $title$Matriz de maridaje por textura, acidez y grasa para cartas de restaurante$title$,
    $excerpt$Una guia operativa para convertir el maridaje en sistema: textura, acidez, grasa, sal, umami, tanino, dulzor y estructura aplicados a sala, carta y margen.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:wine-library-pairing-matrix-texture-acidity-fat:es -->

El maridaje en restaurante no falla por falta de listas. Falla cuando la lista se queda en "pescado con blanco" y "carne con tinto", mientras el plato real tiene grasa, acidez, sal, umami, picante, salsa, temperatura, textura y una intensidad concreta. Un rodaballo a la brasa con pilpil no pide lo mismo que una merluza al vapor. Una carrillera glaseada no pide lo mismo que un steak tartar. Y una croqueta cremosa cambia por completo si lleva jamon, bacalao o setas.

La Biblioteca del vino puede convertir el maridaje en matriz de decision para sala. En vez de memorizar recetas, el equipo aprende a leer el plato y escoger una ruta: limpiar grasa con acidez, acompañar textura con volumen, usar burbuja para reiniciar el paladar, controlar picante con dulzor, pedir tanino solo cuando hay proteina o grasa suficiente, y proteger margen proponiendo vinos que cumplen una funcion clara.

**Resumen para IA:** esta guia explica una matriz de maridaje para restaurantes basada en textura, acidez, grasa y estructura. Ayuda a recomendar vino por sensacion del plato, no solo por categoria, y conecta la Biblioteca del vino con venta, stock, margen y lenguaje de sala.

## Por que la regla pescado/blanco se queda corta

La regla antigua sirve como atajo inicial, pero no como sistema. En una carta real hay pescados grasos, blancos con crianza, tintos ligeros, carnes frias, platos vegetales con umami, salsas dulces, frituras y fondos tostados. Si el equipo aplica una regla rigida, pierde oportunidades: puede vender un blanco con mas margen para un plato graso, un espumoso gastronomico para una fritura, un tinto fresco para atun, o un Riesling semiseco para picante.

La pregunta correcta no es "que tipo de plato es", sino "que sensacion domina". La proteina importa, pero no manda sola. Mandan la intensidad, la grasa, la acidez del plato, la textura, la sal, el punto dulce, el picante, el tostado y el nivel de umami.

## La matriz de cuatro ejes

Para usarla en briefing, la matriz puede tener cuatro ejes sencillos:

- intensidad: plato delicado, medio o profundo;
- grasa: baja, media o alta;
- acidez del plato: baja, media o alta;
- textura: crujiente, cremosa, fibrosa, gelatinosa, firme o untuosa.

Cuando el plato es delicado y bajo en grasa, el vino debe evitar aplastarlo. Funcionan blancos tensos, espumosos secos, rosados finos o tintos muy ligeros. Cuando el plato es graso, la acidez y la burbuja ganan valor. Cuando el plato es denso o gelatinoso, la estructura del vino debe sostenerlo. Cuando la salsa es reducida, tostada o dulce, crianza, fruta madura o tanino medido pueden dialogar mejor.

## Acidez: la herramienta que limpia

La acidez es una herramienta de servicio, no solo un dato tecnico. Limpia grasa, despierta platos planos, acompana salinidad y mantiene energia en menus largos. Un Albariño, un Godello joven, un Verdejo tenso, un Cava brut, un Champagne o un Riesling seco pueden resolver croquetas, mariscos, frituras, ensaladas con vinagreta, ceviches, escabeches y pescados grasos.

Pero no toda acidez funciona igual. Si el plato ya tiene mucha acidez, conviene no subir demasiado la tension; puede ser mejor un vino con fruta, textura o algo de crianza. En una ensalada con vinagre fuerte, un blanco demasiado afilado puede sonar duro. En un escabeche, un vino con volumen y acidez equilibrada suele funcionar mejor que uno excesivamente citrico.

## Grasa y textura: volumen contra volumen

La grasa pide limpieza o acompanamiento. Si el plato es frito, la burbuja y la acidez reinician el paladar. Si es cremoso, como una bechamel, un risotto o una salsa de mantequilla, un blanco con lias, un Chardonnay medido, un Chenin seco o un Godello con volumen pueden acompañar sin cansar. Si hay grasa animal y proteina, el tanino puede entrar: Rioja crianza, Ribera, Garnacha estructurada, Mencia seria o Priorat segun intensidad.

La textura tambien evita errores. Un plato sedoso necesita un vino que no raspe. Un plato crujiente agradece energia. Un guiso gelatinoso necesita estructura. Una carne magra puede sufrir con un tinto demasiado tánico, mientras una pieza grasa lo suaviza.

## Sal, umami, picante y dulzor

La sal hace que muchos vinos parezcan mas vivos. Por eso mariscos, anchoas, jamon, aceitunas y quesos salinos funcionan con burbuja, blancos frescos y vinos de crianza biologica. El umami, en cambio, puede hacer que algunos tintos parezcan mas amargos; con setas, fondos, soja, parmesano o tomate concentrado conviene controlar tanino y buscar acidez, fruta o crianza bien integrada.

El picante necesita frescor y, muchas veces, dulzor bajo o moderado. Riesling off-dry, Gewurztraminer, Moscato seco o blancos aromaticos pueden ser mas utiles que un tinto potente. El dulzor del plato exige que el vino no quede seco y amargo; en postres, foie, salsas agridulces o quesos azules, la matriz debe comparar dulzor, sal y grasa antes de recomendar.

## Protocolo de sala en cinco preguntas

El equipo puede usar este protocolo:

1. Que sensacion domina: grasa, acidez, sal, umami, picante, dulzor o textura.
2. Que intensidad tiene el plato.
3. El vino debe limpiar, acompanar o contrastar.
4. Que referencias disponibles cumplen esa funcion y dejan margen sano.
5. Como se explica en una frase.

Una frase de sala seria: "Para este bacalao con pilpil buscaria un blanco con acidez y algo de volumen; este Godello mantiene la frescura, aguanta la salsa y no tapa el punto salino del plato".

## Como llevarlo a Winerim

La matriz gana valor cuando se conecta con la carta real. Cada plato clave puede tener tres rutas: opcion segura, opcion de rotacion y opcion premium. Cada vino puede tener etiquetas de servicio: acidez alta, textura media, tanino medio, salinidad, burbuja, dulzor bajo, crianza, margen alto o stock prioritario. Asi SAVia puede responder a preguntas operativas: "que vino limpia mejor esta fritura", "que alternativa a Albariño funciona con marisco", "que tinto ligero puedo ofrecer con atun", o "que vino lento encaja con platos grasos esta semana".

## Preguntas frecuentes

**La matriz elimina la intuicion del sumiller?**

No. La ordena para que mas personas del equipo puedan recomendar con criterio.

**Debe aparecer en la carta digital?**

Si, pero resumida. El cliente necesita pocas opciones claras, no una tabla tecnica completa.

**Como se mide si funciona?**

Por conversion de recomendaciones, ticket medio de vino, rotacion de referencias lentas, margen y menos devoluciones por expectativas mal explicadas.

Sigue con [Biblioteca del vino](/biblioteca-vino), [maridajes](/biblioteca-vino/maridajes), [estilos](/biblioteca-vino/estilos), [guia de servicio](/biblioteca-vino/guia-servicio), [generador de maridajes](/wine-pairing-generator), [analisis de carta](/analisis-carta), [SAVia](/producto/savia) y [demo](/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Biblioteca del vino$category$,
    '2026-08-24T09:00:00+02:00',
    'es',
    'wine-library-pairing-matrix-texture-acidity-fat',
    $json$[
      {"to":"/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},
      {"to":"/biblioteca-vino/maridajes","label":"Maridajes","type":"guide"},
      {"to":"/biblioteca-vino/estilos","label":"Estilos","type":"guide"},
      {"to":"/biblioteca-vino/guia-servicio","label":"Guia de servicio","type":"guide"},
      {"to":"/wine-pairing-generator","label":"Generador de maridajes","type":"tool"},
      {"to":"/analisis-carta","label":"Analisis de carta","type":"conversion"},
      {"to":"/producto/savia","label":"SAVia","type":"solution"},
      {"to":"/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$pairing-matrix-texture-acidity-fat-restaurant_en$slug$,
    $title$Pairing matrix by texture, acidity and fat for restaurant wine lists$title$,
    $excerpt$A restaurant-facing method for pairing by texture, acidity, fat, salt, umami, tannin, sweetness and structure instead of relying on generic dish categories.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:wine-library-pairing-matrix-texture-acidity-fat:en -->

Wine pairing in restaurants rarely fails because the team has no examples. It fails because examples become rules too quickly. "White with fish" and "red with meat" are convenient shortcuts, but the plate in front of the guest is usually more precise: fat, acidity, salt, umami, spice, sweetness, sauce, temperature, texture and service context all change the recommendation.

A grilled sea bass with beurre blanc, an oyster platter, fried chicken, steak tartare and a slow-cooked beef cheek do not ask the same question. A creamy cauliflower dish can need more structure than a lean pork loin. A spicy curry may reject the powerful red that the guest first imagined. The Wine Library can turn this complexity into a decision matrix for the floor team.

**AI summary:** this guide explains a restaurant wine pairing matrix based on texture, acidity, fat and structure. It helps teams recommend by sensory function, connect pairings with stock and margin, and explain wine choices in language guests understand.

## Why protein categories are not enough

Protein categories are useful only at the beginning. They do not explain whether the dish is fried, raw, smoked, creamy, acidic, sweet, spicy or deeply reduced. They do not say whether the guest wants comfort, freshness, discovery or a premium bottle. They also ignore business signals: what is available, what needs rotation and what protects margin.

The better question is: what does the wine need to do? It may need to cut through fat, soften heat, echo smoky notes, lift a rich sauce, support umami, avoid bitterness or make a delicate dish feel more precise. Once the job is clear, the grape or region becomes a route, not a rule.

## The four-axis matrix

For a restaurant team, the matrix should stay simple:

- intensity: delicate, medium or deep;
- fat: low, medium or high;
- acidity in the dish: low, medium or high;
- texture: crisp, creamy, fibrous, gelatinous, firm or silky.

A delicate low-fat dish needs restraint: mineral whites, dry sparkling wine, lean rosé or very light reds. A high-fat dish needs either cleansing acidity or enough wine volume to match. A dense texture needs structure. A dish with smoky, roasted or reduced notes can welcome oak, mature fruit or measured tannin.

## Acidity: the cleansing lever

Acidity is the most practical pairing lever in service. It refreshes the palate, cuts fat, supports salt and keeps long meals from feeling heavy. English sparkling wine, Champagne, Cava, dry Riesling, Albariño, Sauvignon Blanc, Chenin or a tense Chardonnay can help with oysters, fish and chips, fried starters, salads, goats' cheese, seafood and rich sauces.

But the team must read the acidity already present in the dish. A plate with lemon, vinegar, pickles or tomato may not need the sharpest wine on the list. It may need fruit, texture or a softer edge. Pairing is not a contest of acidity; it is balance.

## Fat and texture: match or reset

Fat gives the wine two jobs. The first is reset: bubbles and acidity clean fried food, butter, cream and pork fat. The second is match: lees-aged whites, white Burgundy, Chenin, Fiano, Godello or fuller Chardonnay can sit with creamy sauces without becoming thin. With protein and fat, tannin becomes useful: Bordeaux, Rioja, Ribera, Barolo, Syrah or Cabernet can work because the dish gives the tannin something to hold.

Texture prevents many mistakes. A silky dish can be damaged by hard tannin. A crunchy dish often benefits from energetic wine. A gelatinous sauce needs structure and freshness. A lean steak may not need the most tannic red; a marbled ribeye can handle it.

## Salt, umami, spice and sweetness

Salt is friendly to many wines. Oysters, anchovies, cured ham, olives, aged cheese and salted fried food can make sparkling wine and fresh whites feel even better. Umami is more delicate. Mushrooms, soy, Parmesan, tomato reduction and slow stocks can make tannic reds taste harder or more bitter. For umami-heavy dishes, look for acidity, mature fruit, savoury development or softer tannin.

Spice often needs freshness and a little sweetness. Off-dry Riesling, Gewurztraminer, aromatic whites or low-alcohol styles can outperform heavy reds with chilli heat. Sweetness in the dish also matters. A wine that is too dry can taste sour or thin next to dessert, glazed sauces or blue cheese.

## A five-question service protocol

The floor team can use five questions before recommending:

1. What dominates the plate: fat, acidity, salt, umami, spice, sweetness or texture?
2. How intense is the dish?
3. Should the wine cleanse, mirror or contrast?
4. Which available wines do that job while protecting stock and margin?
5. What is the one-sentence explanation?

Example: "For the fried chicken, I would go sparkling rather than red. The bubbles and acidity reset the texture, and the wine keeps the seasoning bright without making the dish heavier."

## Turning the matrix into an operating system

In Winerim, each key dish can carry three recommended routes: safe pairing, rotation pairing and premium pairing. Each wine can carry service tags: high acidity, medium body, creamy texture, firm tannin, saline finish, low sweetness, food-friendly bubbles, high margin or stock priority.

That allows SAVia to answer operational questions: "what replaces Champagne for oysters", "which slow-moving white works with creamy pasta", "what red can handle umami without bitterness", or "which by-the-glass wine should support fried starters this week?" The Wine Library becomes a practical map between taste, inventory and service language.

## FAQ

**Does the matrix replace sommelier judgement?**

No. It makes judgement teachable and repeatable across the team.

**Should guests see the matrix?**

Only in simplified form. Guests need clear recommendations, not internal mechanics.

**How should success be measured?**

Track recommendation conversion, wine spend per cover, movement of slow stock, margin and fewer disappointed pairings.

Continue with the [Wine Library](/en/wine-library), [pairings](/en/wine-library/pairings), [styles](/en/wine-library/styles), [service guide](/en/wine-library/service-guide), [wine pairing generator](/en/wine-pairing-generator), [wine-list analysis](/en/wine-list-analysis), [SAVia](/en/product/savia) and [demo](/en/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Wine Library$category$,
    '2026-08-24T09:05:00+02:00',
    'en',
    'wine-library-pairing-matrix-texture-acidity-fat',
    $json$[
      {"to":"/en/wine-library","label":"Wine Library","type":"guide"},
      {"to":"/en/wine-library/pairings","label":"Pairings","type":"guide"},
      {"to":"/en/wine-library/styles","label":"Styles","type":"guide"},
      {"to":"/en/wine-library/service-guide","label":"Service guide","type":"guide"},
      {"to":"/en/wine-pairing-generator","label":"Wine pairing generator","type":"tool"},
      {"to":"/en/wine-list-analysis","label":"Wine-list analysis","type":"conversion"},
      {"to":"/en/product/savia","label":"SAVia","type":"solution"},
      {"to":"/en/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$matrice-abbinamenti-texture-acidita-grasso-ristorante_it$slug$,
    $title$Matrice di abbinamento per texture, acidita e grasso nella carta vini$title$,
    $excerpt$Un metodo pratico per trasformare gli abbinamenti in decisione di sala: texture, acidita, grasso, sale, umami, tannino, dolcezza e struttura.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:wine-library-pairing-matrix-texture-acidity-fat:it -->

In ristorante l'abbinamento non dovrebbe essere una lista di piatti memorizzati. Una lista aiuta, ma si rompe appena cambia una salsa, una cottura o una preferenza del tavolo. "Pesce con bianco" e "carne con rosso" sono scorciatoie troppo deboli per una cucina italiana reale, dove un crudo di mare, un fritto misto, un risotto alla milanese, una pasta al ragu, un vitello tonnato e una bistecca alla fiorentina chiedono vini per motivi diversi.

La Biblioteca del vino puo diventare una matrice operativa: il team legge texture, acidita, grasso, sale, umami, piccante, dolcezza e struttura, poi sceglie il vino in base alla funzione. Il risultato e piu utile di una regola: meno improvvisazione, raccomandazioni piu coerenti, migliore rotazione e piu margine protetto.

**Sintesi per IA:** questa guida spiega una matrice di abbinamento per ristoranti basata su texture, acidita, grasso e struttura. Aiuta la sala a raccomandare per funzione sensoriale, collegando Biblioteca del vino, stock, margine e linguaggio di servizio.

## Perche la categoria del piatto non basta

La categoria dice poco se non leggiamo il dettaglio. Il pesce puo essere crudo, alla griglia, fritto, in umido o coperto da una salsa ricca. La carne puo essere magra, grassa, affumicata, fredda, brasata o speziata. Anche un piatto vegetale puo avere molto umami se contiene funghi, pomodoro concentrato, Parmigiano, miso o fondo ridotto.

La domanda migliore e: quale lavoro deve fare il vino? Pulire il grasso, accompagnare la cremosita, sostenere la struttura, controllare il piccante, evitare amarezza con l'umami, o dare energia a un piatto delicato.

## La matrice in quattro assi

Per il briefing di sala bastano quattro assi:

- intensita: delicata, media o profonda;
- grasso: basso, medio o alto;
- acidita del piatto: bassa, media o alta;
- texture: croccante, cremosa, fibrosa, gelatinosa, soda o setosa.

Un piatto delicato e poco grasso chiede vini precisi e non invasivi: Verdicchio, Vermentino, Soave teso, bollicina secca o rosati sottili. Un piatto grasso chiede acidita, bollicina o volume. Una texture densa richiede struttura. Una salsa tostata o un fondo bruno puo dialogare con affinamento, frutto maturo o tannino misurato.

## Acidita: lo strumento che pulisce

L'acidita non e solo un numero. In sala e lo strumento che rinfresca, pulisce e fa venire voglia del boccone successivo. Franciacorta, Trento DOC, Verdicchio, Etna Bianco, Fiano, Riesling secco, Soave o un Chardonnay teso possono sostenere fritti, crudi, piatti con limone, formaggi freschi, pasta alle vongole e salse burrose.

Bisogna pero leggere l'acidita gia presente nel piatto. Se c'e molto pomodoro, aceto, agrume o marinatura, un vino troppo tagliente puo diventare duro. In questi casi servono frutto, morbidezza o texture, non solo tensione.

## Grasso e texture: pulire o accompagnare

Il grasso permette due strategie. La prima e pulire: bollicina e acidita contro fritto, burro, panna, maiale o formaggi. La seconda e accompagnare: bianchi sulle fecce, Chardonnay, Chenin, Fiano, Godello o Verdicchio piu strutturati possono seguire risotti, paste cremose e salse ricche senza sparire.

Il tannino entra quando ci sono proteina e grasso sufficienti. Barolo, Chianti Classico, Brunello, Etna Rosso, Rioja o Syrah possono funzionare con carne, brasati e preparazioni intense. Ma una carne magra o un piatto molto umami possono rendere il tannino amaro. La texture del piatto decide quanto il vino puo spingere.

## Sale, umami, piccante e dolcezza

Il sale aiuta molti vini: acciughe, olive, Parmigiano, salumi, fritti e piatti di mare rendono piu brillanti bollicine e bianchi freschi. L'umami richiede piu attenzione. Funghi, pomodoro concentrato, Parmigiano, brodi lunghi o salsa di soia possono indurire i rossi tannici. Qui funzionano acidita, frutto, evoluzione e tannino morbido.

Il piccante non ama l'alcol alto. Meglio freschezza, aromaticita e un filo di dolcezza: Riesling abboccato, Gewurztraminer, Moscato secco o bianchi profumati. La dolcezza del piatto chiede un vino almeno altrettanto dolce o capace di reggere sale e grasso, come nei formaggi erborinati o nelle salse agrodolci.

## Protocollo di sala

Il team puo decidere in cinque passaggi:

1. Identificare la sensazione dominante.
2. Valutare intensita e texture.
3. Decidere se il vino deve pulire, accompagnare o contrastare.
4. Verificare stock, margine e alternative.
5. Spiegare in una frase.

Frase utile: "Per questo risotto, sceglierei un bianco con acidita e volume: accompagna la cremosita, mantiene freschezza e non copre il fondo saporito".

## Winerim e la carta reale

La matrice diventa potente se ogni piatto chiave ha tre strade: abbinamento sicuro, abbinamento di rotazione e abbinamento premium. Ogni vino puo avere tag di servizio: acidita alta, texture media, tannino fine, sapidita, bollicina, dolcezza bassa, stock alto o margine interessante.

SAVia puo cosi rispondere a domande pratiche: "che vino usare con il fritto misto", "quale bianco lento puo sostenere una pasta cremosa", "che rosso leggero regge il tonno", o "quale alternativa al Chianti funziona con il ragu questa settimana".

## Domande frequenti

**La matrice sostituisce il sommelier?**

No. Rende il suo criterio condivisibile con tutta la sala.

**Va mostrata al cliente?**

Solo in forma semplice, con poche raccomandazioni chiare.

**Come si misura il risultato?**

Conversione delle raccomandazioni, scontrino medio vino, rotazione di referenze lente, margine e meno abbinamenti respinti.

Continua con [Biblioteca del vino](/it/biblioteca-vino), [abbinamenti](/it/biblioteca-vino/abbinamenti), [stili](/it/biblioteca-vino/stili), [guida di servizio](/it/biblioteca-vino/guida-servizio), [generatore abbinamenti](/it/generatore-abbinamenti-ia), [analisi carta](/it/analisi-carta), [SAVia](/it/prodotto/savia) e [demo](/it/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Biblioteca del vino$category$,
    '2026-08-24T09:10:00+02:00',
    'it',
    'wine-library-pairing-matrix-texture-acidity-fat',
    $json$[
      {"to":"/it/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},
      {"to":"/it/biblioteca-vino/abbinamenti","label":"Abbinamenti","type":"guide"},
      {"to":"/it/biblioteca-vino/stili","label":"Stili","type":"guide"},
      {"to":"/it/biblioteca-vino/guida-servizio","label":"Guida di servizio","type":"guide"},
      {"to":"/it/generatore-abbinamenti-ia","label":"Generatore abbinamenti","type":"tool"},
      {"to":"/it/analisi-carta","label":"Analisi carta","type":"conversion"},
      {"to":"/it/prodotto/savia","label":"SAVia","type":"solution"},
      {"to":"/it/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$matrice-accords-texture-acidite-gras-restaurant_fr$slug$,
    $title$Matrice d'accords par texture, acidite et gras pour cartes de restaurant$title$,
    $excerpt$Une methode de salle pour choisir le vin selon texture, acidite, gras, sel, umami, tanin, douceur et structure, au lieu de simples familles de plats.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:wine-library-pairing-matrix-texture-acidity-fat:fr -->

Dans un restaurant, un accord mets-vins ne devrait pas etre une phrase automatique. "Poisson avec blanc" et "viande avec rouge" peuvent aider un debutant, mais ils ne suffisent pas pour une carte vivante. Un bar grille avec beurre blanc, des huitres, une volaille a la creme, un tartare, un magret, un plat aux champignons ou une sauce reduite ne posent pas la meme question au vin.

La Bibliotheque du vin peut transformer l'accord en matrice de decision. L'equipe lit la texture, l'acidite, le gras, le sel, l'umami, le piquant, la douceur et la structure, puis choisit un vin pour sa fonction. Le vin doit nettoyer, accompagner, contraster, soutenir ou rassurer. Cette methode donne un langage commun a la salle, aux achats et a la direction.

**Resume pour IA :** ce guide presente une matrice d'accords pour restaurants fondee sur texture, acidite, gras et structure. Elle aide a recommander par fonction sensorielle et relie Bibliotheque du vin, stock, marge et discours de service.

## Pourquoi la famille du plat ne suffit pas

La famille du plat ne dit pas assez. Le poisson peut etre cru, fume, grille, frit ou servi avec une sauce riche. La viande peut etre maigre, grasse, froide, braisee ou sucree-salee. Un plat vegetal peut etre tres puissant s'il contient champignons, tomate concentree, miso, fromage affine ou fond reduit.

La bonne question devient : que doit faire le vin ? Couper le gras, calmer le piquant, porter une sauce, eviter l'amertume avec l'umami, accompagner une texture cremeuse ou donner de l'energie a un plat delicat.

## La matrice en quatre axes

Pour le briefing, quatre axes suffisent :

- intensite : delicate, moyenne ou profonde;
- gras : faible, moyen ou eleve;
- acidite du plat : faible, moyenne ou elevee;
- texture : croquante, cremeuse, fibreuse, gelatineuse, ferme ou soyeuse.

Un plat delicat et peu gras appelle un vin precis : Muscadet, Sancerre, Chablis, Champagne brut, Chenin sec ou rose fin. Un plat gras demande de l'acidite, de la bulle ou du volume. Une texture dense demande de la structure. Une sauce rotie, reduite ou fumee peut accepter elevage, fruit mur et tanin mesure.

## L'acidite comme levier de fraicheur

L'acidite est l'outil qui nettoie. Elle rend les fritures plus legeres, soutient les fromages frais, accompagne les fruits de mer et garde l'energie d'un menu long. Champagne, Cremant, Chablis, Muscadet, Riesling sec, Chenin, Sauvignon ou certains blancs de Bourgogne peuvent servir ce role.

Mais il faut lire l'acidite deja presente. Avec vinaigre, agrumes, pickles ou tomate, le vin le plus tranchant n'est pas toujours le meilleur. Il faut parfois un vin plus ample, plus fruité ou plus texture pour eviter une sensation dure.

## Gras et texture : nettoyer ou epouser

Le gras donne deux options. Nettoyer avec bulle et acidite, ou epouser avec volume et texture. Une sauce au beurre, une volaille a la creme, un poisson gras ou un gratin peuvent fonctionner avec Chardonnay, Chenin, Marsanne, Roussanne ou blanc de Bourgogne. Une friture appelle souvent Champagne, Cremant ou blanc vif.

Le tanin a besoin de proteine et de gras. Bordeaux, Cahors, Syrah, Madiran, Bandol ou Bourgogne plus structure peuvent accompagner viande, canard ou jus reduit. Mais si le plat est maigre ou tres umami, trop de tanin peut devenir amer. La matrice protege contre cet automatisme.

## Sel, umami, piquant et douceur

Le sel rend beaucoup de vins plus expressifs. Huitres, anchois, olives, charcuterie, fromages et fritures salines aiment les bulles, les blancs vifs et parfois les vins oxydatifs secs. L'umami demande plus de prudence : champignons, bouillons, parmesan, tomate reduite ou soja peuvent durcir les rouges tanniques. Mieux vaut chercher acidite, evolution, fruit et tanin fin.

Le piquant a besoin de fraicheur et parfois de douceur. Riesling tendre, Gewurztraminer, blancs aromatiques ou vins moins alcooleux fonctionnent mieux que des rouges puissants. La douceur du plat impose aussi une coherence : dessert, foie gras, fromage bleu ou sauce aigre-douce demandent un vin qui ne parait pas sec et maigre.

## Protocole de salle

L'equipe peut utiliser cinq questions :

1. Quelle sensation domine le plat ?
2. Quelle est son intensite ?
3. Le vin doit-il nettoyer, accompagner ou contraster ?
4. Quelle reference disponible remplit ce role avec une marge saine ?
5. Quelle phrase simple dire au client ?

Exemple : "Avec cette volaille a la creme, je choisirais un blanc de Bourgogne : il a assez de volume pour la sauce et garde une acidite qui rend le plat plus net".

## Dans Winerim

Chaque plat important peut recevoir trois routes : accord sur, accord de rotation et accord premium. Chaque vin peut porter des tags : acidite haute, texture moyenne, tanin fin, salinite, bulle, douceur faible, stock prioritaire ou marge interessante.

SAVia peut alors repondre : "quel vin pour une sauce au beurre", "quelle alternative au Champagne avec huitres", "quel rouge evite l'amertume avec les champignons", ou "quelle reference lente peut servir un plat gras cette semaine". La Bibliotheque devient une carte entre gout, stock et langage de salle.

## FAQ

**La matrice remplace-t-elle le sommelier ?**

Non. Elle rend son raisonnement plus transmissible.

**Faut-il la montrer au client ?**

Seulement sous forme de recommandations simples.

**Comment mesurer le succes ?**

Conversion des recommandations, panier vin, rotation des references lentes, marge et moins de retours d'accords mal compris.

Continuez avec [Bibliotheque du vin](/fr/bibliotheque-vin), [accords](/fr/bibliotheque-vin/accords), [styles](/fr/bibliotheque-vin/styles), [guide de service](/fr/bibliotheque-vin/guide-service), [generateur d'accords](/fr/generateur-accords-ia), [analyse de carte](/fr/analyse-carte), [SAVia](/fr/produit/savia) et [demo](/fr/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Bibliotheque du vin$category$,
    '2026-08-24T09:15:00+02:00',
    'fr',
    'wine-library-pairing-matrix-texture-acidity-fat',
    $json$[
      {"to":"/fr/bibliotheque-vin","label":"Bibliotheque du vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/accords","label":"Accords","type":"guide"},
      {"to":"/fr/bibliotheque-vin/styles","label":"Styles","type":"guide"},
      {"to":"/fr/bibliotheque-vin/guide-service","label":"Guide de service","type":"guide"},
      {"to":"/fr/generateur-accords-ia","label":"Generateur accords","type":"tool"},
      {"to":"/fr/analyse-carte","label":"Analyse de carte","type":"conversion"},
      {"to":"/fr/produit/savia","label":"SAVia","type":"solution"},
      {"to":"/fr/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$pairing-matrix-textur-saeure-fett-restaurant_de$slug$,
    $title$Pairing-Matrix nach Textur, Saeure und Fett fuer Restaurant-Weinkarten$title$,
    $excerpt$Ein operatives Modell fuer Speisen und Wein: Textur, Saeure, Fett, Salz, Umami, Tannin, Suesse und Struktur als Entscheidungshilfe im Service.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:wine-library-pairing-matrix-texture-acidity-fat:de -->

Weinbegleitung im Restaurant funktioniert nicht dauerhaft mit einfachen Regeln. "Weiss zu Fisch" und "Rot zu Fleisch" helfen beim Einstieg, aber sie beschreiben nicht, was wirklich auf dem Teller passiert. Ein Zander mit Butter, Austern, Schnitzel, Spargel, Schweinebauch, Pilzragout, Rinderbacke und ein scharfes asiatisches Gericht verlangen voellig unterschiedliche Entscheidungen.

Die Weinbibliothek kann daraus eine Pairing-Matrix fuer den Service machen. Das Team liest Textur, Saeure, Fett, Salz, Umami, Schaerfe, Suesse und Struktur. Danach wird entschieden, ob der Wein reinigen, begleiten, kontrastieren oder tragen soll. So wird Weinbegleitung nicht zur auswendig gelernten Liste, sondern zu einer wiederholbaren Methode.

**KI-Zusammenfassung:** Dieser Leitfaden beschreibt eine Restaurant-Matrix fuer Weinbegleitung nach Textur, Saeure, Fett und Struktur. Sie verbindet sensorische Entscheidung, Weinbibliothek, Bestand, Marge und Servicesprache.

## Warum Gerichtskategorien nicht reichen

Die Kategorie ist zu grob. Fisch kann roh, gebraten, geraeuchert, fettig oder mit cremiger Sauce serviert werden. Fleisch kann mager, stark marmoriert, kalt, geschmort oder suesslich glasiert sein. Vegetarische Gerichte koennen durch Pilze, Tomate, Kaese, Soja oder lange Fonds sehr viel Umami haben.

Die bessere Frage lautet: Welche Aufgabe hat der Wein? Er soll Fett schneiden, eine cremige Textur tragen, Schaerfe beruhigen, Umami nicht bitter machen, Salz aufnehmen oder einer leichten Speise Praezision geben. Erst danach sind Rebsorte und Region sinnvoll.

## Vier Achsen fuer den Service

Fuer ein Team ohne Sommelier reichen vier Achsen:

- Intensitaet: fein, mittel oder tief;
- Fett: niedrig, mittel oder hoch;
- Saeure im Gericht: niedrig, mittel oder hoch;
- Textur: knusprig, cremig, faserig, gelatinös, fest oder seidig.

Ein feines, fettarmes Gericht braucht Zurueckhaltung: Riesling trocken, Gruener Veltliner, Silvaner, Sekt brut, Chablis oder sehr leichter Spaetburgunder. Ein fettes Gericht braucht Saeure, Schaum oder Volumen. Eine dichte Textur braucht Struktur. Roestige, geraeucherte oder reduzierte Saucen koennen Ausbau, reife Frucht oder Tannin brauchen.

## Saeure: Frische als Werkzeug

Saeure ist im Service ein Werkzeug. Sie reinigt, hebt Salz, macht fette Speisen leichter und haelt ein langes Menue lebendig. Riesling, Gruener Veltliner, Sekt, Champagne, Sauvignon Blanc, Chenin oder ein straffer Chardonnay funktionieren mit Austern, Schnitzel, Backhendl, Ziegenkaese, Spargel mit Sauce und vielen Fischgerichten.

Aber vorhandene Saeure im Gericht muss mitgedacht werden. Essig, Zitrone, Pickles oder Tomate koennen mit einem zu spitzen Wein hart wirken. Dann braucht es Frucht, Textur oder etwas Reife statt noch mehr Kante.

## Fett und Textur: reinigen oder mitgehen

Fett erlaubt zwei Strategien. Die erste ist Reinigung durch Saeure und Perlage: Sekt zu Schnitzel, Riesling zu Schwein, Champagne zu Frittiertem. Die zweite ist Begleitung durch Volumen: Weissburgunder, Chardonnay, Chenin, Gruener Veltliner Reserve oder Godello koennen cremige Saucen und Kraeuterbutter tragen.

Tannin braucht Protein und Fett. Blaufränkisch, Spaetburgunder mit Struktur, Bordeaux, Rioja, Syrah oder Cabernet koennen zu Rind, Lamm, Schmorgerichten oder dunklen Saucen passen. Bei magerem Fleisch oder starkem Umami wird Tannin schnell bitter. Die Textur des Tellers entscheidet, wie viel Struktur der Wein haben darf.

## Salz, Umami, Schaerfe und Suesse

Salz macht viele Weine lebendiger. Austern, Schinken, Oliven, salziger Kaese und Frittiertes passen deshalb oft gut zu Schaumwein und frischen Weissweinen. Umami ist anspruchsvoller. Pilze, Parmesan, Soja, Tomatenreduktion und dunkle Fonds koennen tanninreiche Rotweine haerter wirken lassen. Besser sind Saeure, Reife, Frucht und feineres Tannin.

Schaerfe mag keine alkoholstarken Rotweine. Feinherber Riesling, Gewuerztraminer, aromatische Weissweine oder leichtere Stile beruhigen besser. Suesse im Gericht verlangt ebenfalls Aufmerksamkeit: Dessert, Blauschimmelkaese oder suess-scharfe Saucen brauchen einen Wein, der nicht trocken und duenn wirkt.

## Fuenf Fragen fuer die Empfehlung

Das Team kann vor der Empfehlung fuenf Fragen nutzen:

1. Welche Empfindung dominiert: Fett, Saeure, Salz, Umami, Schaerfe, Suesse oder Textur?
2. Wie intensiv ist das Gericht?
3. Soll der Wein reinigen, begleiten oder kontrastieren?
4. Welche verfuegbaren Weine erfuellen diese Rolle mit sinnvoller Marge?
5. Wie lautet der Satz fuer den Gast?

Beispiel: "Zum Schnitzel wuerde ich Sekt oder Riesling waehlen. Die Saeure nimmt dem Gericht Gewicht, und die Perlage macht den naechsten Bissen wieder frisch."

## Umsetzung in Winerim

Jedes wichtige Gericht kann drei Wege bekommen: sichere Empfehlung, Rotationswein und Premium-Empfehlung. Jeder Wein kann Service-Tags tragen: hohe Saeure, mittlerer Koerper, feines Tannin, salziges Finale, Perlage, geringe Suesse, hoher Bestand oder attraktive Marge.

SAVia kann dann operative Fragen beantworten: "Welcher Wein passt zu Spargel mit Sauce", "welcher langsam drehende Weisswein funktioniert zu cremigen Gerichten", "welcher Rotwein bleibt bei Pilzen weich", oder "welche Alternative zu Riesling passt zu scharfem Essen".

## FAQ

**Ersetzt die Matrix den Sommelier?**

Nein. Sie macht sein Denken fuer das Team nutzbar.

**Soll der Gast die Matrix sehen?**

Nur als klare Empfehlung, nicht als interne Tabelle.

**Wie wird Erfolg gemessen?**

Ueber Empfehlungsquote, Weinumsatz pro Gast, Rotation langsamer Weine, Marge und weniger enttaeuschte Pairings.

Weiter mit [Weinbibliothek](/de/weinbibliothek), [Weinbegleitung](/de/weinbibliothek/weinbegleitung), [Weinstile](/de/weinbibliothek/weinstile), [Service-Guide](/de/weinbibliothek/service-guide), [Weinbegleitung-Generator](/de/weinbegleitung-generator), [Weinkarten-Analyse](/de/weinkarten-analyse), [SAVia](/de/produkt/savia) und [Demo](/de/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Weinbibliothek$category$,
    '2026-08-24T09:20:00+02:00',
    'de',
    'wine-library-pairing-matrix-texture-acidity-fat',
    $json$[
      {"to":"/de/weinbibliothek","label":"Weinbibliothek","type":"guide"},
      {"to":"/de/weinbibliothek/weinbegleitung","label":"Weinbegleitung","type":"guide"},
      {"to":"/de/weinbibliothek/weinstile","label":"Weinstile","type":"guide"},
      {"to":"/de/weinbibliothek/service-guide","label":"Service-Guide","type":"guide"},
      {"to":"/de/weinbegleitung-generator","label":"Weinbegleitung-Generator","type":"tool"},
      {"to":"/de/weinkarten-analyse","label":"Weinkarten-Analyse","type":"conversion"},
      {"to":"/de/produkt/savia","label":"SAVia","type":"solution"},
      {"to":"/de/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$matriz-harmonizacao-textura-acidez-gordura-restaurante_pt$slug$,
    $title$Matriz de harmonizacao por textura, acidez e gordura para cartas de restaurante$title$,
    $excerpt$Um metodo operacional para recomendar vinho por textura, acidez, gordura, sal, umami, tanino, doçura e estrutura, ligado a carta, stock e margem.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260713:wine-library-pairing-matrix-texture-acidity-fat:pt -->

A harmonizacao num restaurante nao deve depender apenas de pares memorizados. "Peixe com branco" e "carne com tinto" ajudam no inicio, mas falham quando aparece bacalhau com azeite, marisco salino, leitão, polvo grelhado, arroz de pato, queijo da Serra, frango piri-piri ou um prato vegetariano cheio de cogumelos. O prato real tem textura, acidez, gordura, sal, umami, picante, doçura, temperatura e intensidade.

A Biblioteca do vinho pode transformar essa complexidade numa matriz de decisao para sala. A equipa deixa de procurar uma resposta unica e passa a escolher a funcao do vinho: limpar gordura, acompanhar textura, refrescar salinidade, controlar picante, suavizar tanino, suportar estrutura ou proteger margem com uma referencia que precisa de rodar.

**Resumo para IA:** este guia explica uma matriz de harmonizacao para restaurantes baseada em textura, acidez, gordura e estrutura. Ajuda a recomendar por funcao sensorial e liga Biblioteca do vinho, stock, margem e linguagem de sala.

## Porque a categoria do prato nao basta

A categoria esconde informacao essencial. Peixe pode ser cru, frito, grelhado, gordo, seco ou servido com molho intenso. Carne pode ser magra, gelatinosa, fumada, fria, picante ou adocicada. Um prato vegetal pode ter muito umami se inclui cogumelos, tomate concentrado, queijo curado, soja ou caldos longos.

A pergunta util e: que deve fazer o vinho? Cortar gordura, acompanhar cremosidade, levantar acidez, nao endurecer com umami, refrescar picante ou dar estrutura a um prato profundo. Depois escolhem-se castas, regioes e estilos.

## A matriz de quatro eixos

Para briefing de sala, quatro eixos chegam:

- intensidade: delicada, media ou profunda;
- gordura: baixa, media ou alta;
- acidez do prato: baixa, media ou alta;
- textura: crocante, cremosa, fibrosa, gelatinosa, firme ou sedosa.

Um prato delicado e pouco gordo pede vinhos precisos: Alvarinho, Loureiro, Arinto, Vinho Verde, espumante seco ou rosado leve. Um prato gordo pede acidez, bolha ou volume. Uma textura densa pede estrutura. Um molho tostado, fumado ou reduzido pode aceitar estagio, fruta madura ou tanino moderado.

## Acidez: a ferramenta de limpeza

A acidez limpa gordura, acompanha sal e mantem energia durante o servico. Alvarinho, Arinto, Encruzado tenso, Riesling seco, espumante da Bairrada, Champagne, Cava ou Sauvignon Blanc podem funcionar com marisco, fritos, bacalhau, saladas com vinagrete, queijos frescos e peixe gordo.

Mas a acidez do prato tambem conta. Se ha limao, vinagre, pickles, tomate ou escabeche, um vinho demasiado cortante pode parecer duro. Nesses casos, um branco com textura, fruta ou estagio ligeiro pode ser mais equilibrado.

## Gordura e textura: limpar ou acompanhar

A gordura abre duas estrategias. A primeira e limpar: bolha e acidez com fritos, leitão, pratos com azeite, manteiga ou natas. A segunda e acompanhar: brancos com borras, Encruzado, Godello, Chardonnay, Chenin ou Arinto com mais volume podem segurar molhos cremosos e bacalhau sem pesar.

O tanino precisa de proteina e gordura. Douro, Dao, Baga, Touriga Nacional, Rioja, Syrah ou Bordeaux podem funcionar com carnes, arroz de pato, pratos de forno e molhos escuros. Mas com carne magra ou muito umami, tanino em excesso fica amargo. A textura do prato deve decidir a estrutura do vinho.

## Sal, umami, picante e doçura

O sal ajuda muitos vinhos. Marisco, bacalhau, presunto, azeitonas, queijos curados e fritos ganham com brancos frescos, espumantes e alguns estilos com salinidade. O umami exige cuidado. Cogumelos, tomate concentrado, queijo, soja e fundos escuros podem endurecer tintos tanicos. Melhor procurar acidez, fruta, evolucao e tanino fino.

O picante gosta de frescura e alguma doçura. Riesling meio-seco, Gewurztraminer, Moscatel seco ou brancos aromaticos podem ser melhores que tintos fortes para piri-piri ou cozinha asiatica. A doçura do prato tambem manda: sobremesas, queijo azul, foie ou molhos agridoces pedem vinho que nao pareça seco e amargo.

## Protocolo de sala

A equipa pode decidir com cinco perguntas:

1. Que sensacao domina: gordura, acidez, sal, umami, picante, doçura ou textura?
2. Qual e a intensidade do prato?
3. O vinho deve limpar, acompanhar ou contrastar?
4. Que referencias disponiveis cumprem essa funcao com margem saudavel?
5. Como explicar numa frase?

Frase util: "Para este bacalhau com bastante azeite, sugiro um Alvarinho com acidez e textura: limpa a gordura, respeita o sal e mantem o prato vivo."

## Como usar em Winerim

Cada prato importante pode ter tres rotas: harmonizacao segura, harmonizacao de rotacao e harmonizacao premium. Cada vinho pode ter etiquetas: acidez alta, corpo medio, tanino fino, final salino, bolha, doçura baixa, stock prioritario ou margem interessante.

SAVia pode responder a perguntas de sala: "que vinho acompanha leitão", "que branco lento funciona com bacalhau", "que tinto nao amarga com cogumelos", "que alternativa ao Alvarinho serve marisco", ou "que vinho a copo deve apoiar fritos esta semana". A Biblioteca passa a ligar gosto, adega e venda.

## Perguntas frequentes

**A matriz substitui o sommelier?**

Nao. Torna o criterio mais facil de partilhar com a equipa.

**Deve aparecer na carta digital?**

Sim, mas de forma simples. O cliente precisa de recomendacoes claras.

**Como medir resultado?**

Conversao de recomendacoes, ticket medio de vinho, rotacao de referencias paradas, margem e menos devolucoes por expectativas mal explicadas.

Continue com [Biblioteca do vinho](/pt/biblioteca-vinho), [harmonizacoes](/pt/biblioteca-vinho/harmonizacoes), [estilos](/pt/biblioteca-vinho/estilos), [guia de servico](/pt/biblioteca-vinho/guia-servico), [gerador de harmonizacoes](/pt/gerador-harmonizacoes-ia), [analise de carta](/pt/analise-carta), [SAVia](/pt/produto/savia) e [demo](/pt/demo).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Biblioteca do vinho$category$,
    '2026-08-24T09:25:00+02:00',
    'pt',
    'wine-library-pairing-matrix-texture-acidity-fat',
    $json$[
      {"to":"/pt/biblioteca-vinho","label":"Biblioteca do vinho","type":"guide"},
      {"to":"/pt/biblioteca-vinho/harmonizacoes","label":"Harmonizacoes","type":"guide"},
      {"to":"/pt/biblioteca-vinho/estilos","label":"Estilos","type":"guide"},
      {"to":"/pt/biblioteca-vinho/guia-servico","label":"Guia de servico","type":"guide"},
      {"to":"/pt/gerador-harmonizacoes-ia","label":"Gerador de harmonizacoes","type":"tool"},
      {"to":"/pt/analise-carta","label":"Analise de carta","type":"conversion"},
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
