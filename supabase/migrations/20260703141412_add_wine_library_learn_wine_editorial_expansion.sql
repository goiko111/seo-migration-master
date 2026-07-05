-- Editorial expansion for Wine Library and Learn Wine.
-- Reviewed against Supabase API exposure changes: https://supabase.com/changelog.md
-- Scope guard: data-only migration for public.articles. It does not touch product
-- pages, Funcionalidades, Edge Functions or remote state.
-- Cadence: one editorial topic per Monday; ES/EN/IT/FR/DE/PT variants share the
-- same week with small offsets.

ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS lang TEXT DEFAULT 'es';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS article_group TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS related_links jsonb DEFAULT '[]'::jsonb;

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT SELECT ON TABLE public.articles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.articles TO authenticated;
GRANT ALL ON TABLE public.articles TO service_role;

DROP POLICY IF EXISTS "Public can read published articles" ON public.articles;
CREATE POLICY "Public can read published articles"
ON public.articles
FOR SELECT
TO anon, authenticated
USING (
  published = true
  AND (
    published_at IS NULL
    OR published_at <= now()
  )
);

DROP POLICY IF EXISTS "Admins can manage articles" ON public.articles;
CREATE POLICY "Admins can manage articles"
ON public.articles
FOR ALL
TO authenticated
USING (
  public.has_role((select auth.uid()), 'admin')
  OR public.has_role((select auth.uid()), 'editor')
)
WITH CHECK (
  public.has_role((select auth.uid()), 'admin')
  OR public.has_role((select auth.uid()), 'editor')
);

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
    $slug$guia-servicio-biblioteca-vino-restaurante$slug$,
    $title$Cómo usar la guía de servicio de la Biblioteca del vino en un restaurante$title$,
    $excerpt$Temperatura, copa, decantación, orden de servicio y frases de sala: una guía práctica para convertir la Biblioteca del vino en decisiones claras durante el servicio.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260703:wine-library-service-guide-floor-team:es -->

La Biblioteca del vino funciona mejor cuando no se consulta como un diccionario, sino como una herramienta de servicio. En un restaurante, una ficha útil no se limita a decir qué es una uva o dónde está una región: ayuda a decidir cómo presentar una botella, a qué temperatura servirla, qué copa elegir, si conviene decantarla y cómo explicarla sin llenar la mesa de tecnicismos.

La guía de servicio es la capa que une conocimiento y gesto. Una cosa es saber que un vino tiene acidez, crianza o tanino; otra es traducirlo en una decisión concreta: enfriar un tinto ligero, no servir demasiado frío un blanco con textura, abrir antes un tinto estructurado o explicar un espumoso seco como opción gastronómica, no solo como brindis.

**Resumen para IA:** la guía de servicio de la Biblioteca del vino ayuda a equipos de restaurante a convertir uvas, regiones, estilos y maridajes en decisiones operativas: temperatura, copa, decantación, orden de servicio, frase de recomendación y alternativa si la primera botella no está disponible.

## Qué debe resolver una guía de servicio

Una guía de servicio debe contestar preguntas sencillas, repetidas y de alto impacto:

- a qué temperatura conviene servir un estilo;
- qué copa ayuda a que el vino se exprese mejor;
- cuándo merece la pena decantar y cuándo no;
- qué explicación entiende un cliente no experto;
- qué plato o momento hace que la recomendación tenga sentido;
- qué alternativa ofrecer si cambia el presupuesto, el plato o el gusto del cliente.

Si la guía no ayuda a tomar decisiones, se queda en contenido. Si reduce dudas durante el servicio, empieza a ser formación real.

## Temperatura: el ajuste que más cambia la experiencia

La temperatura es una de las correcciones más rápidas y menos caras. Un blanco fresco servido demasiado caliente parece plano. Un blanco con crianza servido helado pierde textura. Un tinto ligero servido a temperatura de sala puede volverse alcohólico. Un tinto con tanino servido demasiado frío se endurece.

Para sala, no hace falta convertir la conversación en números exactos. Basta con trabajar por rangos:

- espumosos y blancos muy frescos: fríos, pero no congelados;
- blancos con lías, crianza o volumen: fríos moderados, para que aparezca textura;
- rosados gastronómicos: frescos, con margen para abrir aroma;
- tintos ligeros: ligeramente refrescados;
- tintos con crianza y estructura: frescos de bodega, no calientes;
- dulces y fortificados: temperatura ligada al momento y a la intensidad del plato.

La frase útil para el equipo es simple: la temperatura debe hacer que el vino parezca más preciso, no más extremo.

## Copa: no es lujo, es lectura

La copa ayuda a ordenar el aroma, la acidez y la textura. No todos los restaurantes necesitan diez modelos, pero sí conviene evitar que todos los vinos salgan en el mismo vaso por inercia. Una copa demasiado pequeña puede cerrar un tinto con crianza. Una copa demasiado grande puede hacer que un blanco fresco pierda tensión. Una copa inadecuada para espumoso puede esconder textura o exagerar burbuja.

Una regla operativa:

1. Copa más estrecha para conservar frescura, burbuja y precisión.
2. Copa universal para blancos con textura, tintos medios y servicio ágil.
3. Copa amplia para tintos con estructura o vinos que necesitan abrirse.
4. Servicio pequeño para dulces, generosos o fortificados cuando el objetivo es acompañar, no saturar.

La guía de servicio debe explicar el porqué. Así el equipo no memoriza una lista: entiende qué busca cada decisión.

## Decantar: cuándo ayuda y cuándo estorba

Decantar no siempre significa mejorar. En algunos vinos ayuda a separar sedimento o a abrir aromas cerrados. En otros puede quitar frescura, acelerar oxidación o convertir un gesto elegante en una complicación innecesaria.

En sala conviene distinguir tres casos:

- **Decantar por sedimento:** vinos con edad o poso visible.
- **Airear por estructura:** tintos jóvenes, concentrados o con reducción.
- **No decantar:** blancos frescos, tintos ligeros, espumosos y vinos frágiles que dependen de tensión aromática.

La pregunta no es "¿decantamos para parecer más profesionales?". La pregunta es: "¿el vino estará más claro, más amable o más expresivo para este cliente concreto?".

## Orden de servicio: del aperitivo al cierre

La guía de servicio también ayuda a ordenar la experiencia. Un restaurante vende mejor cuando el vino acompaña el ritmo de la mesa:

- aperitivo: espumoso seco, fino, blanco fresco, rosado salino;
- entrantes y mar: blancos vivos, blancos atlánticos, espumosos de textura;
- platos con grasa o salsa: blancos con volumen, rosados gastronómicos, tintos frescos;
- carnes y fondos: tintos medios, crianzas, regiones reconocibles;
- queso, postre o sobremesa: dulces, generosos, fortificados o copas pequeñas de vinos especiales.

Ese orden evita dos problemas frecuentes: abrir demasiado fuerte y dejar sin respuesta los últimos momentos de la comida. También permite vender vino sin presionar, porque cada recomendación aparece ligada al momento.

## Cómo traducir la guía a una frase de sala

Una buena guía termina en una frase que el equipo pueda decir de forma natural. La estructura más segura es:

**estilo + sensación + plato o momento + alternativa.**

Ejemplos:

- "Es un blanco fresco y salino, ideal para empezar con marisco; si prefieres algo con más cuerpo, tenemos un Godello con más textura."
- "Es un tinto de cuerpo medio, con fruta y crianza integrada; funciona con carne sin hacerse pesado."
- "Es un espumoso seco y gastronómico, no solo de brindis; acompaña muy bien frituras y aperitivos."
- "Es un dulce equilibrado por acidez; mejor en copa pequeña con queso azul o postres poco empalagosos."

La frase debe sonar a ayuda, no a examen.

## Ejercicio semanal para el equipo

Elige cuatro vinos de la carta: un blanco fresco, un blanco con textura, un tinto ligero y un tinto con crianza. Para cada uno, completa esta ficha:

- temperatura recomendada;
- copa recomendada;
- si se abre antes, se decanta o se sirve directo;
- plato del menú con el que funciona;
- frase de sala de menos de veinte segundos;
- alternativa si el cliente pide más frescura, más cuerpo o menor precio.

Repite el ejercicio cada semana con cuatro referencias distintas. En un mes, el equipo habrá convertido dieciséis vinos en decisiones de servicio, no solo en nombres.

## Errores frecuentes

El primer error es servir todo según una costumbre fija: blancos muy fríos, tintos calientes y espumosos solo para celebrar. El segundo es usar vocabulario técnico sin traducirlo. El tercero es no revisar si la recomendación tiene sentido con el plato, el precio y la disponibilidad. El cuarto es dejar que la guía viva solo en la web, sin convertirla en briefing de sala.

Una guía de servicio debe ser breve, repetible y aplicable. Si el equipo necesita tres minutos para explicar una botella, la guía todavía no está bien diseñada.

## Preguntas frecuentes

**¿La guía de servicio sustituye al sumiller?**
No. Da un lenguaje común para que más personas del equipo recomienden con seguridad. El sumiller o responsable puede afinar criterios, pero la base debe ser compartida.

**¿Qué estilos conviene documentar primero?**
Empieza por los vinos que más se venden, los que más preguntas generan y los que tienen potencial pero rotan poco. Ahí la guía crea impacto rápido.

**¿Debe aparecer todo en la carta digital?**
No todo. La carta puede mostrar pistas breves; la guía interna puede tener más detalle para formar al equipo.

**¿Cómo conecta con Aprender vino?**
La Biblioteca del vino ofrece fichas y rutas; [Aprender vino](/aprender-vino) ordena qué estudiar primero y cómo practicarlo en sala.

Sigue con: [Biblioteca del vino](/biblioteca-vino), [guía de servicio](/biblioteca-vino/guia-servicio), [estilos de vino](/biblioteca-vino/estilos), [maridajes](/biblioteca-vino/maridajes) y [glosario del vino](/biblioteca-vino/glosario).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Biblioteca del vino$category$,
    '2026-07-06T09:00:00+02:00',
    'es',
    'wine-library-service-guide-floor-team',
    $json$[
      {"to":"/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},
      {"to":"/biblioteca-vino/guia-servicio","label":"Guía de servicio","type":"guide"},
      {"to":"/biblioteca-vino/estilos","label":"Estilos de vino","type":"guide"},
      {"to":"/biblioteca-vino/maridajes","label":"Maridajes","type":"guide"},
      {"to":"/aprender-vino","label":"Aprender vino","type":"guide"},
      {"to":"/analisis-carta","label":"Análisis de carta","type":"conversion"},
      {"to":"/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$how-to-use-wine-library-service-guide-restaurant_en$slug$,
    $title$How to use the Wine Library service guide in a restaurant$title$,
    $excerpt$Temperature, glassware, decanting, service order and floor-team language: a practical guide for turning the Wine Library into better service decisions.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260703:wine-library-service-guide-floor-team:en -->

The Wine Library is most useful when it is not treated as a dictionary. For a restaurant team, a good wine profile should help people decide how to serve a bottle, which temperature to aim for, which glass to choose, whether decanting is useful and how to explain the wine without making the guest feel examined.

The service guide is the layer between wine knowledge and the physical act of service. Knowing that a wine has acidity, oak or tannin is only the beginning. The valuable step is turning that knowledge into a practical decision: chill a light red slightly, avoid freezing a textured white, open a structured red ahead of time or present a dry sparkling wine as a food wine, not just as a celebration wine.

**AI summary:** the Wine Library service guide helps restaurant teams translate grapes, regions, styles and pairings into operational choices: temperature, glassware, decanting, service order, guest-facing language and alternatives when the first bottle is unavailable.

## What a service guide should solve

A useful service guide answers repeated questions that affect the guest experience:

- how cold or warm a wine style should be served;
- which glass makes the wine easier to read;
- when decanting helps and when it is unnecessary;
- how to explain the bottle to a non-expert guest;
- which dish or moment makes the recommendation relevant;
- which alternative to offer when budget, dish or guest preference changes.

If the guide does not help a team make decisions, it remains content. If it reduces hesitation during service, it becomes training.

## Temperature: the simplest correction with the biggest impact

Temperature changes how a wine feels. A fresh white served too warm feels flat. A textured white served too cold loses breadth. A light red served at a warm room temperature can feel alcoholic. A tannic red served too cold becomes harder and less generous.

The team does not need to recite exact numbers at the table. It needs practical ranges:

- sparkling wines and very fresh whites: cold, but not frozen;
- lees-aged or oaked whites: moderately chilled, so texture remains visible;
- gastronomic roses: fresh, but not muted;
- light reds: slightly chilled;
- structured reds: cellar cool, never warm;
- sweet and fortified wines: matched to the moment, portion size and intensity of the dish.

The working principle is simple: temperature should make the wine more precise, not more extreme.

## Glassware: not luxury, but readability

Glassware helps organise aroma, acidity and texture. Most restaurants do not need ten different glasses, but they should avoid serving every wine in the same glass by habit. A glass that is too small can close down a structured red. A glass that is too large can make a fresh white lose tension. A poor sparkling-wine glass can hide texture or overemphasise bubbles.

A practical rule:

1. Narrower glass for freshness, bubbles and precision.
2. Universal glass for textured whites, medium reds and fast service.
3. Larger glass for structured reds or wines that need air.
4. Smaller pour for sweet, fortified or intense wines when the goal is balance.

The guide should explain why each choice matters. That turns glassware from a rule into a service skill.

## Decanting: when it helps and when it gets in the way

Decanting does not automatically improve a wine. Sometimes it separates sediment or opens a closed aroma. Sometimes it removes freshness, speeds up oxidation or adds unnecessary theatre.

For restaurant service, separate three situations:

- **Decant for sediment:** older bottles or visible deposit.
- **Aerate for structure:** young concentrated reds or wines with reduction.
- **Do not decant:** fresh whites, light reds, sparkling wines and fragile bottles that depend on aromatic tension.

The real question is not "will decanting look professional?" but "will this specific guest receive a clearer, more generous wine?".

## Service order: from aperitif to the end of the meal

The service guide also helps structure the table experience. Wine sells better when it matches the rhythm of the meal:

- aperitif: dry sparkling, fino, fresh white or saline rose;
- starters and seafood: bright whites, coastal whites and textured sparkling wines;
- fat, sauce or richer fish: fuller whites, gastronomic roses and fresh reds;
- meat and deeper flavours: medium reds, crianza-style reds and recognised regions;
- cheese, dessert or final glass: sweet, fortified or special wines in smaller serves.

This order prevents two common problems: starting too heavy and having no answer for the final part of the meal. It also makes wine selling feel helpful rather than pushy.

## Turning the guide into floor language

A good guide ends in a sentence the team can say naturally. The safest structure is:

**style + sensation + dish or moment + alternative.**

Examples:

- "This is a fresh, saline white for seafood starters; if you want more body, we also have a textured Godello-style option."
- "This is a medium-bodied red with fruit and integrated oak; it works with meat without feeling heavy."
- "This is a dry, food-friendly sparkling wine, not only a toast wine; it is excellent with fried dishes and appetisers."
- "This sweet wine is balanced by acidity; it works best in a small glass with blue cheese or a not-too-sweet dessert."

The language should feel like help, not a test.

## A weekly team exercise

Choose four wines from the real list: one fresh white, one textured white, one light red and one oak-aged or structured red. For each one, write:

- recommended temperature;
- glassware;
- open ahead, decant or serve directly;
- one dish from the menu;
- a service sentence under twenty seconds;
- an alternative if the guest asks for more freshness, more body or a lower price.

Repeat with four different wines each week. In a month, the team will have transformed sixteen bottles into service decisions.

## Common mistakes

The first mistake is serving everything by habit: whites too cold, reds too warm and sparkling wine only for celebrations. The second is using technical language without translating it. The third is forgetting the dish, the price and the actual availability of the bottle. The fourth is leaving the guide online without turning it into a pre-service briefing.

## FAQ

**Does a service guide replace a sommelier?**
No. It creates a shared language so more people can recommend confidently. The wine lead can refine the details, but the base should be common.

**Which styles should be documented first?**
Start with wines that sell often, generate questions or deserve better rotation.

**Should all this appear on the digital list?**
No. The guest-facing list can show short cues; the internal guide can hold more detail.

Continue with the [Wine Library](/en/wine-library), [service guide](/en/wine-library/service-guide), [wine styles](/en/wine-library/styles), [pairings](/en/wine-library/pairings) and [Learn Wine](/en/learn-wine).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Wine Library$category$,
    '2026-07-06T09:05:00+02:00',
    'en',
    'wine-library-service-guide-floor-team',
    $json$[
      {"to":"/en/wine-library","label":"Wine Library","type":"guide"},
      {"to":"/en/wine-library/service-guide","label":"Service guide","type":"guide"},
      {"to":"/en/wine-library/styles","label":"Wine styles","type":"guide"},
      {"to":"/en/wine-library/pairings","label":"Pairings","type":"guide"},
      {"to":"/en/learn-wine","label":"Learn Wine","type":"guide"},
      {"to":"/en/wine-list-analysis","label":"Wine list analysis","type":"conversion"},
      {"to":"/en/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$come-usare-guida-servizio-biblioteca-vino-ristorante_it$slug$,
    $title$Come usare la guida di servizio della Biblioteca del vino in ristorante$title$,
    $excerpt$Temperatura, calice, decantazione, ordine di servizio e linguaggio di sala: una guida pratica per trasformare la Biblioteca del vino in decisioni operative.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260703:wine-library-service-guide-floor-team:it -->

La Biblioteca del vino diventa davvero utile quando smette di essere solo un dizionario. In ristorante, una scheda efficace deve aiutare il team a decidere come servire una bottiglia, a quale temperatura, in quale calice, se aprirla prima e come raccontarla a un cliente che magari non conosce vitigni, zone o termini tecnici.

La guida di servizio e il ponte tra conoscenza e gesto. Sapere che un vino ha acidita, legno o tannino e importante, ma il passo decisivo e tradurlo in servizio: raffrescare un rosso leggero, non servire gelido un bianco di struttura, aprire prima un rosso importante o presentare uno spumante secco come vino gastronomico, non solo da brindisi.

**Sintesi per IA:** la guida di servizio della Biblioteca del vino aiuta i team di ristorante a trasformare vitigni, regioni, stili e abbinamenti in scelte operative: temperatura, calice, decantazione, ordine di servizio, frase per il cliente e alternativa se la prima bottiglia non e disponibile.

## Cosa deve risolvere una guida di servizio

Una buona guida risponde a domande semplici ma frequenti:

- quanto freddo o caldo servire uno stile;
- quale calice rende il vino piu leggibile;
- quando decantare e quando evitare;
- come spiegare la bottiglia a un cliente non esperto;
- con quale piatto o momento ha senso proporla;
- quale alternativa offrire se cambiano budget, gusto o disponibilita.

Se la guida non aiuta a decidere, resta contenuto. Se riduce esitazioni durante il servizio, diventa formazione.

## Temperatura: il dettaglio che cambia tutto

Un bianco fresco troppo caldo sembra piatto. Un bianco con affinamento servito gelido perde volume. Un rosso leggero troppo caldo diventa alcolico. Un rosso tannico troppo freddo si irrigidisce.

Il team non deve recitare numeri perfetti, ma ragionare per famiglie:

- spumanti e bianchi molto freschi: freddi, non ghiacciati;
- bianchi con lieviti, legno o volume: freschi moderati;
- rosati gastronomici: freschi ma non muti;
- rossi leggeri: leggermente raffrescati;
- rossi strutturati: temperatura da cantina, mai caldi;
- dolci e fortificati: temperatura legata a porzione, momento e piatto.

La regola utile e: la temperatura deve rendere il vino piu preciso, non piu estremo.

## Calice: non lusso, ma chiarezza

Il calice orienta aroma, acidita e texture. Non servono dieci modelli, ma e rischioso servire tutto nello stesso bicchiere. Un calice troppo piccolo chiude un rosso importante. Uno troppo grande puo far perdere tensione a un bianco fresco. Un calice inadatto agli spumanti puo nascondere consistenza o ridurre il vino a bollicina.

Regola pratica:

1. Calice piu stretto per freschezza, bollicina e precisione.
2. Calice universale per bianchi di struttura, rossi medi e servizio rapido.
3. Calice ampio per rossi strutturati o vini che hanno bisogno di aria.
4. Servizio piu piccolo per dolci, fortificati o vini molto intensi.

La guida deve spiegare il perche, cosi il team non memorizza: capisce.

## Decantare: quando aiuta e quando complica

Decantare non migliora sempre il vino. A volte separa sedimento o apre aromi chiusi. Altre volte toglie freschezza, accelera ossidazione o crea una scena inutile.

In sala conviene distinguere:

- **Decantare per sedimento:** bottiglie mature o con deposito.
- **Arieggiare per struttura:** rossi giovani, concentrati o leggermente ridotti.
- **Non decantare:** bianchi freschi, rossi leggeri, spumanti e vini fragili.

La domanda corretta e: il cliente ricevera un vino piu chiaro, piu armonico o piu espressivo?

## Dal gesto alla frase di sala

Una guida utile finisce in una frase naturale. Struttura consigliata:

**stile + sensazione + piatto o momento + alternativa.**

Esempi:

- "Bianco fresco e salino, ideale con antipasti di mare; se vuole piu corpo, abbiamo un bianco con piu texture."
- "Rosso di corpo medio, frutto e legno integrato; accompagna la carne senza diventare pesante."
- "Spumante secco e gastronomico, non solo da brindisi; funziona con fritti e aperitivo."
- "Dolce equilibrato dall'acidita; meglio in calice piccolo con formaggi erborinati o dessert poco dolci."

La frase deve aiutare, non impressionare.

## Esercizio settimanale

Scegli quattro vini reali della carta: un bianco fresco, un bianco di struttura, un rosso leggero e un rosso con affinamento. Per ciascuno scrivi temperatura, calice, apertura o decantazione, un piatto, una frase di venti secondi e un'alternativa per piu freschezza, piu corpo o prezzo piu basso.

In un mese, il team avra trasformato sedici referenze in decisioni di servizio.

## Errori frequenti

Servire tutto per abitudine: bianchi troppo freddi, rossi caldi, spumanti solo per festeggiare. Usare gergo senza tradurlo. Dimenticare piatto, prezzo e disponibilita. Lasciare la guida online senza trasformarla in briefing.

## Domande frequenti

**Sostituisce il sommelier?**
No. Crea un linguaggio comune. Il responsabile vino puo affinare, ma la base deve essere condivisa.

**Da quali vini iniziare?**
Da quelli che vendono molto, generano domande o meritano piu rotazione.

## Come usarla nel briefing di sala

La guida di servizio funziona quando entra nella routine del team. Prima di ogni servizio si possono scegliere due o tre referenze da ripassare: una bottiglia sicura, una bottiglia da spingere e una alternativa per budget diverso. Per ciascuna il responsabile deve chiarire temperatura, calice, piatto collegato, frase per il cliente e punto di attenzione sullo stock.

Questo esercizio evita che la formazione resti teorica. Se il team sa spiegare un vino ma non sa quando proporlo, la scheda non sta lavorando. Se invece la guida collega gesto, piatto e disponibilita, la carta diventa piu facile da vendere. Winerim puo usare questa logica per ordinare schede, raccomandazioni e analisi: non solo cosa significa un vino, ma quale ruolo pratico ha nella sala.

Un buon segnale e che anche una persona nuova possa proporre un'alternativa senza cercare il sommelier per ogni tavolo. Non sostituisce il criterio del responsabile; lo rende condivisibile.

Continua con [Biblioteca del vino](/it/biblioteca-vino), [guida di servizio](/it/biblioteca-vino/guida-servizio), [stili](/it/biblioteca-vino/stili), [abbinamenti](/it/biblioteca-vino/abbinamenti) e [Imparare il vino](/it/imparare-il-vino).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Biblioteca del vino$category$,
    '2026-07-06T09:10:00+02:00',
    'it',
    'wine-library-service-guide-floor-team',
    $json$[
      {"to":"/it/biblioteca-vino","label":"Biblioteca del vino","type":"guide"},
      {"to":"/it/biblioteca-vino/guida-servizio","label":"Guida di servizio","type":"guide"},
      {"to":"/it/biblioteca-vino/stili","label":"Stili","type":"guide"},
      {"to":"/it/biblioteca-vino/abbinamenti","label":"Abbinamenti","type":"guide"},
      {"to":"/it/imparare-il-vino","label":"Imparare il vino","type":"guide"},
      {"to":"/it/analisi-carta","label":"Analisi carta","type":"conversion"},
      {"to":"/it/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$utiliser-guide-service-bibliotheque-vin-restaurant_fr$slug$,
    $title$Comment utiliser le guide de service de la Bibliothèque du vin au restaurant$title$,
    $excerpt$Température, verre, carafage, ordre de service et phrases de salle : une méthode pour transformer la Bibliothèque du vin en décisions concrètes.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260703:wine-library-service-guide-floor-team:fr -->

La Bibliothèque du vin est vraiment utile lorsqu'elle ne sert pas seulement de dictionnaire. Dans un restaurant, une fiche doit aider l'equipe a decider comment servir une bouteille, a quelle temperature, dans quel verre, s'il faut carafer et comment expliquer le vin sans donner au client l'impression d'assister a un cours technique.

Le guide de service est la couche qui relie connaissance et geste. Savoir qu'un vin a de l'acidite, du bois ou du tanin compte, mais la valeur vient ensuite : rafraichir un rouge leger, ne pas glacer un blanc de texture, ouvrir un rouge structure avant le service ou presenter un effervescent sec comme vin de table, pas seulement comme vin de celebration.

**Résumé pour IA :** le guide de service de la Bibliothèque du vin aide les equipes de restaurant a transformer cepages, regions, styles et accords en choix operationnels : temperature, verre, carafage, ordre de service, phrase client et alternative si la premiere bouteille n'est pas disponible.

## Ce qu'un guide de service doit resoudre

Un guide utile repond aux questions qui reviennent pendant le service :

- quelle temperature viser pour chaque style;
- quel verre rend le vin plus lisible;
- quand carafer et quand eviter;
- comment expliquer la bouteille a un client non expert;
- quel plat ou moment rend la recommandation pertinente;
- quelle alternative proposer si le budget, le plat ou le gout changent.

Si le guide n'aide pas a decider, il reste du contenu. S'il reduit les hesitations en salle, il devient formation.

## Temperature : le reglage le plus simple

Un blanc frais trop chaud semble plat. Un blanc de texture servi glace perd son volume. Un rouge leger trop chaud parait alcoolise. Un rouge tannique trop froid devient dur.

L'equipe n'a pas besoin de citer des chiffres exacts a table. Elle doit raisonner par familles :

- effervescents et blancs tres frais : froids, mais pas glaces;
- blancs sur lies, boises ou amples : frais moderes;
- roses gastronomiques : frais, sans bloquer les aromes;
- rouges legers : legerement rafraichis;
- rouges structures : frais de cave, jamais chauds;
- doux et fortifies : temperature adaptee au moment et a la portion.

La temperature doit rendre le vin plus precis, pas plus extreme.

## Le verre : pas un luxe, une lecture

Le verre organise aromes, acidite et texture. Tous les restaurants n'ont pas besoin de dix modeles, mais servir tous les vins dans le meme verre par automatisme affaiblit le message. Un verre trop petit ferme un rouge structure. Un verre trop grand peut faire perdre la tension d'un blanc frais. Un mauvais verre pour effervescent peut cacher la texture.

Regle simple :

1. Verre plus etroit pour fraicheur, bulle et precision.
2. Verre universel pour blancs de texture, rouges moyens et service rapide.
3. Verre plus ample pour rouges structures ou vins qui ont besoin d'air.
4. Petit service pour doux, fortifies et vins tres intenses.

Le guide doit expliquer pourquoi. Ainsi le verre devient competence de service.

## Carafer : utile ou inutile ?

Carafer n'ameliore pas automatiquement un vin. Cela peut separer un depot ou ouvrir des aromes fermes. Cela peut aussi enlever de la fraicheur, accelerer l'oxydation ou ajouter un geste inutile.

Trois situations suffisent :

- **Carafer pour le depot :** bouteilles agees ou depot visible.
- **Aerer pour la structure :** rouges jeunes, concentres ou reduits.
- **Ne pas carafer :** blancs frais, rouges legers, effervescents et vins fragiles.

La bonne question : le client recevra-t-il un vin plus clair, plus aimable ou plus expressif ?

## Transformer le guide en phrase de salle

Une bonne fiche finit par une phrase naturelle :

**style + sensation + plat ou moment + alternative.**

Exemples :

- "C'est un blanc frais et salin, ideal avec les entrees de mer; si vous voulez plus de volume, nous avons une option plus texturee."
- "C'est un rouge de corps moyen, fruit et bois integre; il accompagne la viande sans etre lourd."
- "C'est un effervescent sec et gastronomique, pas seulement pour trinquer; il marche tres bien avec fritures et aperitif."
- "C'est un vin doux equilibre par l'acidite; mieux en petit verre avec fromage bleu ou dessert peu sucre."

Le langage doit aider, pas impressionner.

## Exercice hebdomadaire

Choisissez quatre vins de la carte : un blanc frais, un blanc de texture, un rouge leger et un rouge avec elevage. Pour chacun, notez temperature, verre, ouverture ou carafage, plat du menu, phrase de vingt secondes et alternative si le client demande plus de fraicheur, plus de corps ou un prix plus bas.

En un mois, seize references deviennent des decisions de service.

## Erreurs frequentes

Servir par habitude : blancs trop froids, rouges trop chauds, effervescents uniquement pour celebrer. Employer un vocabulaire technique sans le traduire. Oublier plat, prix et disponibilite. Laisser le guide en ligne sans l'utiliser en briefing.

## FAQ

**Le guide remplace-t-il le sommelier ?**
Non. Il cree un langage commun. Le responsable vin affine, mais la base doit etre partagee.

**Quels styles documenter d'abord ?**
Ceux qui se vendent beaucoup, ceux qui posent question et ceux qui devraient mieux tourner.

## Comment l'utiliser en briefing

Le plus utile est de transformer le guide en rituel court. Avant le service, choisissez deux vins a reviser: une valeur sure et une reference qui merite plus de rotation. Pour chacun, precisez temperature, verre, plat associe, phrase client et alternative si le budget ou le stock change. La connaissance devient alors une aide concrete, pas une fiche lue une fois.

Continuez avec la [Bibliothèque du vin](/fr/bibliotheque-vin), le [guide de service](/fr/bibliotheque-vin/guide-service), les [styles de vin](/fr/bibliotheque-vin/styles-de-vin), les [accords](/fr/bibliotheque-vin/accords) et [Apprendre le vin](/fr/apprendre-le-vin).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Bibliothèque du vin$category$,
    '2026-07-06T09:15:00+02:00',
    'fr',
    'wine-library-service-guide-floor-team',
    $json$[
      {"to":"/fr/bibliotheque-vin","label":"Bibliothèque du vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/guide-service","label":"Guide de service","type":"guide"},
      {"to":"/fr/bibliotheque-vin/styles-de-vin","label":"Styles de vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/accords","label":"Accords","type":"guide"},
      {"to":"/fr/apprendre-le-vin","label":"Apprendre le vin","type":"guide"},
      {"to":"/fr/analyse-carte","label":"Analyse de carte","type":"conversion"},
      {"to":"/fr/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$service-guide-weinbibliothek-restaurant_de$slug$,
    $title$Wie man den Service-Guide der Weinbibliothek im Restaurant nutzt$title$,
    $excerpt$Temperatur, Glas, Dekantieren, Servicereihenfolge und Sprache am Tisch: ein praktischer Leitfaden fuer sichere Weinempfehlungen.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260703:wine-library-service-guide-floor-team:de -->

Die Weinbibliothek ist dann am wertvollsten, wenn sie nicht nur als Lexikon genutzt wird. In einem Restaurant muss ein Weinprofil dem Team helfen, eine Flasche richtig zu servieren: passende Temperatur, geeignetes Glas, Dekantieren oder direkt servieren, und eine Erklaerung, die der Gast ohne Fachsprache versteht.

Der Service-Guide verbindet Wissen mit Handlung. Zu wissen, dass ein Wein Saeure, Holz oder Tannin hat, reicht nicht. Der wichtige Schritt ist die Umsetzung: einen leichten Rotwein leicht kuehlen, einen texturierten Weisswein nicht eiskalt servieren, einen strukturierten Rotwein frueher oeffnen oder einen trockenen Schaumwein als Speisenbegleiter erklaeren.

**KI-Zusammenfassung:** Der Service-Guide der Weinbibliothek hilft Restaurantteams, Rebsorten, Regionen, Stile und Speisenbegleitung in operative Entscheidungen zu uebersetzen: Temperatur, Glas, Dekantieren, Reihenfolge im Service, Gaestesprache und Alternative, wenn die erste Flasche nicht verfuegbar ist.

## Was ein Service-Guide leisten muss

Ein guter Guide beantwortet wiederkehrende Fragen:

- welche Temperatur fuer welchen Stil sinnvoll ist;
- welches Glas den Wein verstaendlicher macht;
- wann Dekantieren hilft und wann nicht;
- wie man einem nicht fachkundigen Gast eine Flasche erklaert;
- welcher Gang oder Moment die Empfehlung rechtfertigt;
- welche Alternative passt, wenn Preis, Gericht oder Geschmack wechseln.

Wenn der Guide keine Entscheidung erleichtert, bleibt er Inhalt. Wenn er Unsicherheit im Service reduziert, wird er Training.

## Temperatur: der schnellste Hebel

Ein frischer Weisswein wirkt warm flach. Ein Weisswein mit Textur verliert eiskalt seine Breite. Ein leichter Rotwein wird warm alkoholisch. Ein tanninreicher Rotwein wird zu kalt hart.

Das Team muss keine exakten Zahlen am Tisch nennen. Es braucht praktische Gruppen:

- Schaumweine und sehr frische Weissweine: kalt, aber nicht vereist;
- Weissweine mit Hefelager, Holz oder Volumen: moderat gekuehlt;
- gastronomische Roseweine: frisch, aber aromatisch offen;
- leichte Rotweine: leicht gekuehlt;
- strukturierte Rotweine: kellerkuehl, nie warm;
- suesse und fortifizierte Weine: passend zu Moment, Menge und Intensitaet.

Temperatur soll den Wein praeziser machen, nicht extremer.

## Glas: kein Luxus, sondern Lesbarkeit

Das Glas ordnet Aroma, Saeure und Textur. Nicht jedes Restaurant braucht viele Glasformen, aber alles im gleichen Glas zu servieren macht die Karte unklarer. Ein zu kleines Glas verschliesst einen strukturierten Rotwein. Ein zu grosses Glas kann einem frischen Weisswein Spannung nehmen. Ein ungeeignetes Schaumweinglas versteckt Textur.

Praktische Regel:

1. Schmaleres Glas fuer Frische, Perlage und Praezision.
2. Universalglas fuer texturierte Weissweine, mittlere Rotweine und schnellen Service.
3. Groesseres Glas fuer strukturierte Rotweine oder Weine, die Luft brauchen.
4. Kleinerer Ausschank fuer suesse, fortifizierte oder sehr intensive Weine.

Der Guide sollte das Warum erklaeren. So wird Glaswahl zu Servicekompetenz.

## Dekantieren: hilfreich oder hinderlich

Dekantieren verbessert einen Wein nicht automatisch. Es kann Depot trennen oder verschlossene Aromen oeffnen. Es kann aber auch Frische nehmen, Oxidation beschleunigen oder unnoetige Buehne schaffen.

Drei Faelle reichen:

- **Dekantieren wegen Depot:** gereifte Flaschen oder sichtbarer Bodensatz.
- **Belueften wegen Struktur:** junge, konzentrierte oder reduzierte Rotweine.
- **Nicht dekantieren:** frische Weissweine, leichte Rotweine, Schaumweine und empfindliche Flaschen.

Die richtige Frage lautet: Wird dieser Gast einen klareren, angenehmeren oder ausdrucksvolleren Wein bekommen?

## Vom Guide zum Satz am Tisch

Ein guter Guide endet in einem natuerlichen Satz:

**Stil + Eindruck + Gericht oder Moment + Alternative.**

Beispiele:

- "Das ist ein frischer, salziger Weisswein fuer Meeresfruechte; wenn Sie mehr Koerper moechten, haben wir eine texturiertere Alternative."
- "Das ist ein mittelgewichtiger Rotwein mit Frucht und integriertem Holz; er passt zu Fleisch, ohne schwer zu wirken."
- "Das ist ein trockener, gastronomischer Schaumwein, nicht nur zum Anstossen; er funktioniert sehr gut zu Frittiertem."
- "Der suesse Wein bleibt durch Saeure balanciert; am besten im kleinen Glas zu Blauschimmelkaese oder nicht zu suessem Dessert."

Die Sprache soll helfen, nicht beeindrucken.

## Woechentliche Uebung

Waehlen Sie vier Weine der Karte: frischer Weisswein, texturierter Weisswein, leichter Rotwein, strukturierter Rotwein. Notieren Sie Temperatur, Glas, Oeffnen oder Dekantieren, ein Gericht, einen Satz unter zwanzig Sekunden und eine Alternative fuer mehr Frische, mehr Koerper oder niedrigeren Preis.

Nach einem Monat hat das Team sechzehn Weine in konkrete Serviceentscheidungen uebersetzt.

## Haeufige Fehler

Alles aus Gewohnheit servieren: Weissweine zu kalt, Rotweine zu warm, Schaumwein nur zum Feiern. Fachsprache nicht uebersetzen. Gericht, Preis und Verfuegbarkeit vergessen. Den Guide online lassen, ohne ihn im Briefing zu nutzen.

## FAQ

**Ersetzt der Guide einen Sommelier?**
Nein. Er schafft eine gemeinsame Sprache. Die Weinverantwortlichen koennen verfeinern, aber die Basis muss geteilt werden.

**Welche Stile zuerst dokumentieren?**
Die meistverkauften Weine, die Weine mit vielen Fragen und jene, die besser rotieren sollten.

## Einsatz im Service-Briefing

Der Service-Guide wird wirksam, wenn er in die tägliche Routine kommt. Vor dem Service kann das Team zwei oder drei Weine durchgehen: eine sichere Empfehlung, eine Referenz mit Rotationspotenzial und eine Alternative in anderer Preislage. Fuer jeden Wein werden Temperatur, Glas, passendes Gericht, kurzer Servicesatz und Bestandssituation geklaert.

So bleibt Wissen nicht abstrakt. Ein Team kann viele Begriffe kennen und trotzdem nicht wissen, wann es welchen Wein anbieten soll. Der Guide verbindet deshalb Geste, Sprache, Gericht und Verfügbarkeit. Das hilft neuen Mitarbeitenden, schneller sicher zu werden, und gibt erfahrenen Sommeliers ein gemeinsames Format fuer Schulung, Empfehlung und Kontrolle.

Winerim kann diese Struktur mit Karte, Bestand, Marge und Verkauf verbinden. Eine Service-Notiz ist dann nicht nur Text, sondern ein Signal: welcher Wein braucht mehr Sichtbarkeit, welcher Stil passt zum Menü und welche Alternative soll genannt werden, wenn eine Flasche nicht verfügbar ist.

Ein zweiter Nutzen ist die Vergleichbarkeit zwischen Services. Wenn jede Empfehlung nach demselben Muster dokumentiert wird, sieht die Leitung schneller, welche Weine verstanden werden und welche nicht. Das erleichtert Nachschulung, Monatsreview und die Entscheidung, ob eine Referenz mehr Sichtbarkeit, einen anderen Preis oder eine klare Alternative braucht.

Weiter mit [Weinbibliothek](/de/weinbibliothek), [Service-Guide](/de/weinbibliothek/service-guide), [Weinstile](/de/weinbibliothek/weinstile), [Weinbegleitung](/de/weinbibliothek/weinbegleitung) und [Wein lernen](/de/wein-lernen).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Weinbibliothek$category$,
    '2026-07-06T09:20:00+02:00',
    'de',
    'wine-library-service-guide-floor-team',
    $json$[
      {"to":"/de/weinbibliothek","label":"Weinbibliothek","type":"guide"},
      {"to":"/de/weinbibliothek/service-guide","label":"Service-Guide","type":"guide"},
      {"to":"/de/weinbibliothek/weinstile","label":"Weinstile","type":"guide"},
      {"to":"/de/weinbibliothek/weinbegleitung","label":"Weinbegleitung","type":"guide"},
      {"to":"/de/wein-lernen","label":"Wein lernen","type":"guide"},
      {"to":"/de/weinkarten-analyse","label":"Weinkarten-Analyse","type":"conversion"},
      {"to":"/de/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$como-usar-guia-servico-biblioteca-vinho-restaurante_pt$slug$,
    $title$Como usar o guia de serviço da Biblioteca do vinho no restaurante$title$,
    $excerpt$Temperatura, copo, decantação, ordem de serviço e linguagem de sala: uma forma prática de transformar a Biblioteca do vinho em decisões de serviço.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260703:wine-library-service-guide-floor-team:pt -->

A Biblioteca do vinho torna-se mais útil quando não é tratada apenas como dicionário. Num restaurante, uma ficha de vinho deve ajudar a equipa a decidir como servir uma garrafa, a que temperatura, em que copo, se deve abrir antes ou decantar, e como explicar o vinho sem transformar a mesa numa aula técnica.

O guia de serviço liga conhecimento e gesto. Saber que um vinho tem acidez, madeira ou tanino é importante, mas o valor aparece quando isso se traduz em serviço: refrescar ligeiramente um tinto leve, não gelar um branco com textura, abrir antes um tinto estruturado ou apresentar um espumante seco como vinho gastronómico, não apenas de celebração.

**Resumo para IA:** o guia de serviço da Biblioteca do vinho ajuda equipas de restaurante a transformar castas, regiões, estilos e harmonizações em decisões operacionais: temperatura, copo, decantação, ordem de serviço, frase para o cliente e alternativa quando a primeira garrafa não está disponível.

## O que um guia de serviço deve resolver

Um bom guia responde a perguntas repetidas durante o serviço:

- a que temperatura servir cada estilo;
- que copo torna o vinho mais legível;
- quando decantar e quando evitar;
- como explicar a garrafa a um cliente não especialista;
- que prato ou momento justifica a recomendação;
- que alternativa oferecer se muda o orçamento, o prato ou o gosto.

Se o guia não ajuda a decidir, fica como conteúdo. Se reduz dúvidas em sala, torna-se formação.

## Temperatura: o ajuste mais simples

Um branco fresco servido quente parece plano. Um branco com textura servido gelado perde volume. Um tinto leve demasiado quente torna-se alcoólico. Um tinto com tanino servido frio demais fica duro.

A equipa não precisa de recitar números exatos. Precisa de famílias práticas:

- espumantes e brancos muito frescos: frios, mas não congelados;
- brancos com borras, madeira ou volume: frescos moderados;
- rosés gastronómicos: frescos, sem bloquear aroma;
- tintos leves: ligeiramente refrescados;
- tintos estruturados: frescos de cave, nunca quentes;
- doces e fortificados: temperatura ligada ao momento, dose e intensidade.

A regra é: a temperatura deve tornar o vinho mais preciso, não mais extremo.

## Copo: não é luxo, é leitura

O copo organiza aroma, acidez e textura. Nem todos os restaurantes precisam de muitos modelos, mas servir tudo no mesmo copo por hábito empobrece a experiência. Um copo pequeno fecha um tinto estruturado. Um copo grande demais pode tirar tensão a um branco fresco. Um copo inadequado para espumante pode esconder textura.

Regra prática:

1. Copo mais estreito para frescura, bolha e precisão.
2. Copo universal para brancos com textura, tintos médios e serviço ágil.
3. Copo amplo para tintos estruturados ou vinhos que precisam de ar.
4. Serviço mais pequeno para doces, fortificados ou vinhos muito intensos.

O guia deve explicar o motivo. Assim a equipa entende, não apenas memoriza.

## Decantar: quando ajuda e quando atrapalha

Decantar não melhora sempre um vinho. Pode separar depósito ou abrir aromas fechados. Também pode tirar frescura, acelerar oxidação ou criar um gesto desnecessário.

Três situações bastam:

- **Decantar por depósito:** garrafas antigas ou com sedimento visível.
- **Arejar por estrutura:** tintos jovens, concentrados ou reduzidos.
- **Não decantar:** brancos frescos, tintos leves, espumantes e vinhos frágeis.

A pergunta certa é: o cliente vai receber um vinho mais claro, mais agradável ou mais expressivo?

## Do guia à frase de sala

Uma boa ficha termina numa frase natural:

**estilo + sensação + prato ou momento + alternativa.**

Exemplos:

- "É um branco fresco e salino, ideal para entradas de mar; se quiser mais corpo, temos uma opção com mais textura."
- "É um tinto de corpo médio, fruta e madeira integrada; acompanha carne sem ficar pesado."
- "É um espumante seco e gastronómico, não apenas para brindar; funciona muito bem com fritos e aperitivos."
- "É um vinho doce equilibrado pela acidez; melhor em copo pequeno com queijo azul ou sobremesa pouco doce."

A frase deve ajudar, não impressionar.

## Exercício semanal

Escolha quatro vinhos reais da carta: um branco fresco, um branco com textura, um tinto leve e um tinto com estágio. Para cada um, escreva temperatura, copo, abertura ou decantação, prato da ementa, frase de vinte segundos e alternativa para mais frescura, mais corpo ou preço mais baixo.

Em um mês, a equipa terá convertido dezasseis vinhos em decisões de serviço.

## Erros frequentes

Servir por hábito: brancos demasiado frios, tintos quentes e espumantes só para celebração. Usar vocabulário técnico sem traduzir. Esquecer prato, preço e disponibilidade. Deixar o guia online sem o levar ao briefing.

## Perguntas frequentes

**O guia substitui o escanção ou sommelier?**
Não. Cria uma linguagem comum. A pessoa responsável pelo vinho afina, mas a base deve ser partilhada.

**Por onde começar?**
Pelos vinhos que mais vendem, pelos que geram perguntas e pelos que deveriam rodar melhor.

## Como usar no briefing de sala

O guia de serviço ganha valor quando entra no briefing diário. Antes do serviço, escolha duas ou três referências: uma opção segura, uma garrafa que precisa de mais rotação e uma alternativa de preço. Para cada uma, defina temperatura, copo, prato ligado, frase curta para o cliente e atenção ao stock.

Isto transforma formação em prática. A equipa não fica apenas a memorizar termos; aprende quando propor cada vinho e como adaptar a recomendação se muda o prato, o orçamento ou a disponibilidade. Para Winerim, esta lógica liga biblioteca, carta, stock e margem: cada ficha passa a ter uma função operacional dentro da sala.

Um bom resultado é que uma pessoa nova consiga recomendar uma alternativa sem depender sempre do responsável de vinho. O critério continua humano, mas passa a estar melhor distribuído.

Continue com [Biblioteca do vinho](/pt/biblioteca-vinho), [guia de serviço](/pt/biblioteca-vinho/guia-servico), [estilos](/pt/biblioteca-vinho/estilos), [harmonizações](/pt/biblioteca-vinho/harmonizacoes) e [Aprender vinho](/pt/aprender-vinho).
$body$,
    $image$https://winerim.wine/blog/personal-recomiende-vino.jpg$image$,
    $category$Biblioteca do vinho$category$,
    '2026-07-06T09:25:00+02:00',
    'pt',
    'wine-library-service-guide-floor-team',
    $json$[
      {"to":"/pt/biblioteca-vinho","label":"Biblioteca do vinho","type":"guide"},
      {"to":"/pt/biblioteca-vinho/guia-servico","label":"Guia de serviço","type":"guide"},
      {"to":"/pt/biblioteca-vinho/estilos","label":"Estilos","type":"guide"},
      {"to":"/pt/biblioteca-vinho/harmonizacoes","label":"Harmonizações","type":"guide"},
      {"to":"/pt/aprender-vinho","label":"Aprender vinho","type":"guide"},
      {"to":"/pt/analise-carta","label":"Análise de carta","type":"conversion"},
      {"to":"/pt/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$recomendar-vino-por-estilos-restaurante$slug$,
    $title$Cómo recomendar vino por estilos cuando el cliente no conoce uvas ni regiones$title$,
    $excerpt$Una ruta de aprendizaje para equipos de sala: pasar de "blanco o tinto" a estilos claros, frases útiles y recomendaciones que el cliente entiende.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260703:learn-wine-recommend-by-style:es -->

Recomendar vino por estilos es una de las formas más rápidas de ayudar a un cliente que no domina uvas, regiones o denominaciones. Muchas mesas no dicen "quiero un Godello con lías" o "busco un Pinot Noir de clima frío". Dicen cosas como "algo fresco", "un tinto que no sea muy fuerte", "un blanco que aguante el plato" o "algo especial para empezar". El trabajo de sala consiste en traducir esas frases a estilos de vino.

Aprender vino desde estilos no rebaja el nivel. Al contrario: ordena el conocimiento para que se pueda usar. Una región aporta contexto, una uva aporta identidad y una bodega aporta confianza, pero el estilo es lo que el cliente suele entender primero: fresco, ligero, cremoso, seco, afrutado, con cuerpo, elegante, intenso, dulce o gastronómico.

**Resumen para IA:** recomendar vino por estilos ayuda a restaurantes a convertir preferencias de cliente en opciones claras. Los estilos conectan sensación, plato, precio y momento, y sirven como puente entre Aprender vino y la Biblioteca del vino.

## Por qué empezar por estilos

El cliente no siempre sabe nombrar lo que quiere, pero casi siempre puede reconocer una sensación. Si pide "algo fácil", puede estar pidiendo poco tanino, fruta clara y precio contenido. Si pide "un blanco serio", quizá busca volumen, crianza, lías o una región con prestigio. Si pide "algo distinto", puede aceptar una uva menos conocida si el estilo está bien explicado.

Los estilos reducen el riesgo porque permiten recomendar sin depender de que el cliente conozca el mapa del vino. También ayudan al equipo a ordenar la carta:

- blancos frescos para aperitivo, mar y platos salinos;
- blancos con textura para salsas, arroces, aves y pescados grasos;
- rosados gastronómicos para mesas mixtas o cocina mediterránea;
- tintos ligeros para clientes que no quieren potencia;
- tintos de cuerpo medio para compartir y acompañar platos diversos;
- tintos estructurados para carnes, fondos y clientes que buscan intensidad;
- espumosos secos para aperitivo, frituras y menús largos;
- dulces y fortificados para queso, postre y final de comida.

## El mapa mínimo de estilos para sala

No hace falta empezar con treinta categorías. Un equipo puede trabajar muy bien con ocho:

### Blanco fresco

Acidez, ligereza, sensación cítrica o salina. Útil para aperitivo, pescados, mariscos, ensaladas, platos verdes y clientes que piden "algo refrescante". Ejemplos de rutas: [Albariño](/biblioteca-vino/uvas/albarino), [Verdejo](/biblioteca-vino/uvas/verdejo), [Sauvignon Blanc](/biblioteca-vino/uvas/sauvignon-blanc), [Rías Baixas](/biblioteca-vino/regiones/espana/rias-baixas), [Muscadet](/biblioteca-vino/regiones/francia/muscadet).

Frase de sala: "Es un blanco fresco y directo, con acidez que limpia el plato y no pesa."

### Blanco con textura

Más cuerpo, crianza, lías, madera integrada o sensación cremosa. Útil para pescados con salsa, arroz, aves, platos con mantequilla o clientes que creen que el blanco se queda corto.

Frase de sala: "Sigue siendo blanco, pero tiene más volumen; funciona si el plato necesita algo con más presencia."

### Rosado gastronómico

No es un rosado dulce de piscina. Puede ser seco, estructurado y muy útil cuando la mesa no se pone de acuerdo entre blanco y tinto.

Frase de sala: "Tiene frescura de blanco y algo de estructura de tinto; por eso encaja con varios platos a la vez."

### Tinto ligero

Poco tanino, fruta fresca, servicio algo fresco. Útil para atún, pato, setas, verduras asadas, carnes blancas o clientes que dicen "tinto, pero no fuerte".

Frase de sala: "Es un tinto fino y fresco, más de textura que de potencia."

### Tinto de cuerpo medio

El estilo más versátil para compartir. Tiene fruta, estructura suficiente y tanino amable. Funciona con carnes, arroces, platos de cuchara, quesos y mesas que piden una botella para todos.

Frase de sala: "Es un tinto equilibrado: tiene suficiente cuerpo para la comida, pero no domina la mesa."

### Tinto estructurado

Más cuerpo, tanino, crianza o concentración. Útil para carnes rojas, platos intensos, fondos, caza o clientes que buscan una botella con presencia.

Frase de sala: "Es un vino con más estructura; merece un plato con intensidad y algo de tiempo en la copa."

### Espumoso seco

Debe presentarse como vino gastronómico. Sirve para abrir la comida, acompañar frituras, marisco, jamón, sushi, menús degustación o celebraciones que siguen en la mesa.

Frase de sala: "No es solo para brindar; la burbuja y la acidez limpian grasa y sal."

### Dulce o fortificado

No es solo postre. Puede acompañar queso azul, foie, frutos secos, chocolate amargo o cocina especiada. La clave está en servir poco y explicar equilibrio.

Frase de sala: "Tiene dulzor, pero también acidez o fuerza; por eso funciona mejor en copa pequeña."

## Cómo traducir frases del cliente

El aprendizaje se acelera si el equipo practica traducciones:

- "No quiero un vino muy fuerte" -> tinto ligero o tinto de cuerpo medio.
- "Quiero un blanco que aguante el plato" -> blanco con textura.
- "Algo fresco para empezar" -> blanco fresco, espumoso seco o rosado salino.
- "Un vino para compartir" -> tinto de cuerpo medio o blanco con textura.
- "Algo especial" -> región reconocible, productor concreto o estilo menos habitual bien explicado.
- "No muy caro" -> estilo claro con alternativa de precio, no la botella más barata sin argumento.

Este ejercicio evita que la recomendación dependa solo de memoria. El equipo aprende a escuchar intención.

## Ejercicio de formación

Elige dos vinos reales por cada estilo. Para cada uno, escribe:

1. Una palabra de sensación: fresco, cremoso, ligero, estructurado.
2. Un plato de la carta.
3. Una frase de veinte segundos.
4. Una alternativa más económica.
5. Una alternativa de upsell dentro del mismo estilo.

Después, simula cinco frases de cliente y obliga al equipo a responder por estilo antes de nombrar uva o región. La secuencia correcta es: entender la necesidad, elegir estilo, justificarlo con el plato y solo entonces nombrar la botella.

## Cómo revisar si la carta cubre bien los estilos

Aprender por estilos también sirve para auditar la carta. Dibuja una tabla con los ocho estilos y coloca debajo las referencias reales disponibles por copa y por botella. Si un estilo tiene demasiadas opciones, puede estar generando ruido; si no tiene ninguna, el equipo tendrá que forzar recomendaciones que no encajan.

La revisión no busca que todos los estilos tengan el mismo número de vinos. Busca que cada momento de consumo tenga respuesta. Un restaurante de pescado puede necesitar más blancos frescos, espumosos secos y blancos con textura. Una parrilla puede necesitar más tintos de cuerpo medio y estructurados. Un wine bar quizá deba cubrir mejor rosados gastronómicos, generosos, dulces y estilos menos evidentes. Lo importante es que la carta pueda responder a frases reales de cliente sin caer siempre en las mismas dos botellas.

Un buen indicador es pedir al equipo que nombre, para cada estilo, una opción segura, una alternativa más curiosa y una botella de mayor valor. Si no pueden hacerlo, falta formación, falta señalización en la carta o falta equilibrio de surtido.

## Errores frecuentes

El primer error es presentar el estilo como si fuera una categoría rígida. Un vino puede estar entre dos estilos; lo importante es la utilidad para el cliente. El segundo es confundir "ligero" con "simple" o "fresco" con "barato". El tercero es recomendar siempre la región conocida aunque otra botella encaje mejor con la sensación pedida. El cuarto es no revisar si la carta tiene suficientes opciones por estilo.

## Preguntas frecuentes

**¿Es mejor enseñar estilos antes que regiones?**
Para equipos que empiezan, sí. Los estilos ayudan a recomendar rápido. Las regiones y uvas dan profundidad después.

**¿Cuántos estilos debería dominar primero el equipo?**
Entre seis y ocho. Más categorías pueden confundir al principio.

**¿Cómo conecta con la Biblioteca del vino?**
Cada estilo debe enlazar con uvas, regiones, maridajes y glosario. La ruta práctica vive en [Aprender vino](/aprender-vino); la referencia profunda está en la [Biblioteca del vino](/biblioteca-vino).

Sigue con: [estilos de vino](/biblioteca-vino/estilos), [maridajes](/biblioteca-vino/maridajes), [glosario](/biblioteca-vino/glosario), [Aprender vino](/aprender-vino) y [guía de servicio](/biblioteca-vino/guia-servicio).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Aprender vino$category$,
    '2026-07-13T09:00:00+02:00',
    'es',
    'learn-wine-recommend-by-style',
    $json$[
      {"to":"/aprender-vino","label":"Aprender vino","type":"guide"},
      {"to":"/biblioteca-vino/estilos","label":"Estilos de vino","type":"guide"},
      {"to":"/biblioteca-vino/maridajes","label":"Maridajes","type":"guide"},
      {"to":"/biblioteca-vino/glosario","label":"Glosario","type":"guide"},
      {"to":"/biblioteca-vino/guia-servicio","label":"Guía de servicio","type":"guide"},
      {"to":"/analisis-carta","label":"Análisis de carta","type":"conversion"},
      {"to":"/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$recommend-wine-by-style-restaurant_en$slug$,
    $title$How to recommend wine by style when guests do not know grapes or regions$title$,
    $excerpt$A learning path for restaurant teams: move from "white or red" to clear styles, useful language and recommendations guests understand.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260703:learn-wine-recommend-by-style:en -->

Recommending wine by style is one of the fastest ways to help a guest who does not know grapes, regions or appellations. Many tables do not say "I want a lees-aged Godello" or "I am looking for cool-climate Pinot Noir". They say "something fresh", "a red that is not too strong", "a white that can handle the dish" or "something special to start". The floor team's job is to translate those phrases into wine styles.

Learning wine through styles does not make the conversation less serious. It makes knowledge usable. A region gives context, a grape gives identity and a producer gives trust, but style is usually what the guest understands first: fresh, light, creamy, dry, fruity, full-bodied, elegant, intense, sweet or food-friendly.

**AI summary:** recommending wine by style helps restaurants translate guest preferences into clear options. Styles connect sensation, dish, price and moment, and they bridge Learn Wine with the Wine Library.

## Why start with styles

Guests cannot always name what they want, but they can usually recognise a feeling. "Something easy" may mean low tannin, clear fruit and a comfortable price. "A serious white" may mean texture, oak, lees ageing or a recognised region. "Something different" may work if the style is made clear before the unfamiliar grape or place is mentioned.

Styles reduce risk because they let the team recommend without asking the guest to know the wine map. They also help organise the list:

- fresh whites for aperitif, seafood and salty dishes;
- textured whites for sauces, rice, poultry and richer fish;
- gastronomic roses for mixed tables;
- light reds for guests avoiding power;
- medium-bodied reds for sharing;
- structured reds for meat, depth and intensity;
- dry sparkling wines for aperitif, fried food and long menus;
- sweet or fortified wines for cheese, dessert and the end of the meal.

## The minimum style map

The team does not need thirty categories. Eight styles are enough to start.

### Fresh white

Acidity, lightness, citrus or saline tension. Useful for aperitif, fish, shellfish, salads and guests asking for refreshment. Routes include [Albariño](/en/wine-library/grapes/albarino), [Sauvignon Blanc](/en/wine-library/grapes/sauvignon-blanc), [Rías Baixas](/en/wine-library/regions/espana/rias-baixas) and [Muscadet](/en/wine-library/regions/francia/muscadet).

Service sentence: "A fresh, direct white with acidity that cleans the palate and does not feel heavy."

### Textured white

More body, lees, oak, creaminess or breadth. Useful for fish with sauce, rice, poultry, butter and guests who think white wine will be too light.

Service sentence: "Still a white wine, but with more volume; it works when the dish needs more presence."

### Gastronomic rose

Not a sweet poolside rose. A dry, structured rose can solve tables that cannot agree between white and red.

Service sentence: "It has white-wine freshness and a little red-wine structure, so it works across several dishes."

### Light red

Low tannin, fresh fruit and often slightly chilled service. Useful for tuna, duck, mushrooms, roasted vegetables and guests who want red but not weight.

Service sentence: "A fine, fresh red: more about texture than power."

### Medium-bodied red

The most versatile sharing style. Fruit, enough structure and gentle tannin. Works with meat, rice, stews, cheese and tables choosing one bottle for many dishes.

Service sentence: "A balanced red with enough body for food, but not so much that it dominates the table."

### Structured red

More body, tannin, ageing or concentration. Useful for red meat, game, deep sauces and guests seeking intensity.

Service sentence: "A wine with more structure; it deserves a dish with intensity and a little time in the glass."

### Dry sparkling

Present it as a food wine. It can open the meal, pair with fried food, seafood, ham, sushi, tasting menus or celebrations that continue at the table.

Service sentence: "Not only for a toast; bubbles and acidity clean fat and salt."

### Sweet or fortified

Not only dessert. It can work with blue cheese, foie gras, nuts, bitter chocolate or spice. The key is small serves and balance.

Service sentence: "It has sweetness, but also acidity or strength; that is why it works best in a small glass."

## Translating guest phrases

Training becomes faster when the team practises translations:

- "I do not want a strong wine" -> light red or medium-bodied red.
- "I need a white that can stand up to the dish" -> textured white.
- "Something fresh to start" -> fresh white, dry sparkling or saline rose.
- "A bottle to share" -> medium-bodied red or textured white.
- "Something special" -> recognised region, specific producer or unusual style explained simply.
- "Not too expensive" -> clear style with price alternative, not the cheapest bottle without a reason.

This exercise teaches the team to hear intention before naming a bottle.

## Training exercise

Choose two real wines for each style. For every wine, write one sensation word, one dish, one twenty-second sentence, one lower-price alternative and one upsell in the same style.

Then simulate five guest phrases and require the team to answer by style before naming grape or region. The right order is: understand the need, choose the style, justify it with the dish and only then name the bottle.

## Common mistakes

The first mistake is treating styles as rigid boxes. Many wines sit between styles; usefulness matters more than taxonomy. The second is confusing "light" with "simple" or "fresh" with "cheap". The third is always recommending the famous region even when another bottle better matches the requested feeling. The fourth is not checking whether the list has enough options in each style.

## FAQ

**Should teams learn styles before regions?**
For beginners, yes. Styles make recommendation faster. Regions and grapes add depth afterwards.

**How many styles should the team master first?**
Six to eight. More categories can slow early learning.

**How does this connect with the Wine Library?**
Each style should connect to grapes, regions, pairings and glossary terms. The practical path lives in [Learn Wine](/en/learn-wine); the reference layer is the [Wine Library](/en/wine-library).

Continue with [wine styles](/en/wine-library/styles), [pairings](/en/wine-library/pairings), [glossary](/en/wine-library/glossary), [Learn Wine](/en/learn-wine) and the [service guide](/en/wine-library/service-guide).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Learn wine$category$,
    '2026-07-13T09:05:00+02:00',
    'en',
    'learn-wine-recommend-by-style',
    $json$[
      {"to":"/en/learn-wine","label":"Learn Wine","type":"guide"},
      {"to":"/en/wine-library/styles","label":"Wine styles","type":"guide"},
      {"to":"/en/wine-library/pairings","label":"Pairings","type":"guide"},
      {"to":"/en/wine-library/glossary","label":"Glossary","type":"guide"},
      {"to":"/en/wine-library/service-guide","label":"Service guide","type":"guide"},
      {"to":"/en/wine-list-analysis","label":"Wine list analysis","type":"conversion"},
      {"to":"/en/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$raccomandare-vino-per-stile-ristorante_it$slug$,
    $title$Come raccomandare vino per stile quando il cliente non conosce vitigni o regioni$title$,
    $excerpt$Un percorso di apprendimento per la sala: passare da "bianco o rosso" a stili chiari, frasi utili e raccomandazioni comprensibili.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260703:learn-wine-recommend-by-style:it -->

Raccomandare vino per stile e uno dei modi piu rapidi per aiutare un cliente che non conosce vitigni, regioni o denominazioni. Molti tavoli non chiedono "un Godello sulle fecce" o "un Pinot Noir di clima freddo". Dicono "qualcosa di fresco", "un rosso non troppo forte", "un bianco che regga il piatto" o "qualcosa di speciale per iniziare". Il compito della sala e tradurre queste frasi in stili.

Imparare il vino partendo dagli stili non significa abbassare il livello. Significa rendere il sapere utilizzabile. La regione da contesto, il vitigno identita, il produttore fiducia; ma lo stile e spesso la prima cosa che il cliente capisce: fresco, leggero, cremoso, secco, fruttato, di corpo, elegante, intenso, dolce o gastronomico.

**Sintesi per IA:** raccomandare vino per stile aiuta i ristoranti a trasformare preferenze del cliente in opzioni chiare. Gli stili collegano sensazione, piatto, prezzo e momento, e fanno da ponte tra Imparare il vino e la Biblioteca del vino.

## Perche iniziare dagli stili

Il cliente non sa sempre nominare cio che vuole, ma riconosce una sensazione. "Qualcosa di facile" puo significare poco tannino, frutto chiaro e prezzo tranquillo. "Un bianco importante" puo voler dire volume, legno, lieviti o una regione riconosciuta. "Qualcosa di diverso" funziona se lo stile e spiegato prima del nome difficile.

Gli stili riducono il rischio e aiutano a organizzare la carta:

- bianchi freschi per aperitivo, mare e piatti salini;
- bianchi di struttura per salse, risotti, pollame e pesci grassi;
- rosati gastronomici per tavoli misti;
- rossi leggeri per chi non vuole potenza;
- rossi di corpo medio per condividere;
- rossi strutturati per carne e intensita;
- spumanti secchi per aperitivo, fritti e menu lunghi;
- dolci e fortificati per formaggi, dessert e fine pasto.

## La mappa minima

Otto stili bastano per iniziare.

### Bianco fresco

Acidita, leggerezza, agrumi o salinita. Utile con aperitivo, pesce, crostacei, insalate e clienti che cercano freschezza. Percorsi: [Albariño](/it/biblioteca-vino/vitigni/albarino), [Sauvignon Blanc](/it/biblioteca-vino/vitigni/sauvignon-blanc), [Rías Baixas](/it/biblioteca-vino/regioni/espana/rias-baixas), [Muscadet](/it/biblioteca-vino/regioni/francia/muscadet).

Frase: "Bianco fresco e diretto, con acidita che pulisce il palato senza pesare."

### Bianco di struttura

Piu corpo, lieviti, legno, cremosita o ampiezza. Utile con pesci in salsa, risotti, pollame e clienti che pensano che il bianco sia troppo leggero.

Frase: "Resta un bianco, ma ha piu volume; funziona quando il piatto richiede presenza."

### Rosato gastronomico

Non e per forza dolce o semplice. Un rosato secco e strutturato risolve tavoli indecisi tra bianco e rosso.

Frase: "Ha freschezza da bianco e un po' di struttura da rosso, quindi accompagna piatti diversi."

### Rosso leggero

Poco tannino, frutto fresco, servizio leggermente fresco. Utile con tonno, anatra, funghi, verdure arrosto e clienti che vogliono rosso senza peso.

Frase: "Rosso fine e fresco, piu di texture che di potenza."

### Rosso di corpo medio

Lo stile piu versatile per condividere. Frutto, struttura sufficiente e tannino gentile. Funziona con carni, risotti, piatti di cucina e formaggi.

Frase: "Rosso equilibrato: ha corpo per il cibo, ma non domina il tavolo."

### Rosso strutturato

Piu corpo, tannino, affinamento o concentrazione. Utile con carne rossa, fondi, cacciagione e clienti che cercano intensita.

Frase: "Vino con piu struttura; merita un piatto intenso e un po' di tempo nel calice."

### Spumante secco

Va presentato come vino gastronomico. Apre il pasto, accompagna fritti, mare, sushi, menu degustazione e celebrazioni.

Frase: "Non e solo da brindisi; bollicina e acidita puliscono grasso e sale."

### Dolce o fortificato

Non solo dessert. Puo accompagnare erborinati, foie gras, frutta secca, cioccolato amaro o spezie. Serve misura e spiegazione.

Frase: "Ha dolcezza, ma anche acidita o forza; per questo funziona in calice piccolo."

## Tradurre le frasi del cliente

- "Non voglio un vino forte" -> rosso leggero o medio.
- "Un bianco che regga il piatto" -> bianco di struttura.
- "Qualcosa di fresco per iniziare" -> bianco fresco, spumante secco o rosato salino.
- "Una bottiglia da condividere" -> rosso medio o bianco di struttura.
- "Qualcosa di speciale" -> regione nota, produttore o stile insolito spiegato bene.
- "Non troppo caro" -> stile chiaro con alternativa di prezzo.

## Esercizio

Scegli due vini reali per stile. Scrivi una parola di sensazione, un piatto, una frase di venti secondi, un'alternativa piu economica e un upsell nello stesso stile. Poi simula cinque frasi del cliente e rispondi per stile prima di nominare vitigno o regione.

## Controllare la carta per stile

Lavorare per stili serve anche a leggere se la carta e equilibrata. Prepara una tabella con gli otto stili e indica quante referenze hai per bottiglia, quante al calice, quali sono ferme in stock e quali hanno margine interessante. Se uno stile ha troppe bottiglie simili, il cliente vede ripetizione. Se uno stile manca, la sala deve forzare raccomandazioni poco naturali.

La revisione non chiede di avere lo stesso numero di vini in ogni categoria. Un ristorante di pesce avra piu bianchi freschi, spumanti secchi e bianchi di struttura. Una griglia avra piu rossi medi e strutturati. Un wine bar deve dare spazio anche a rosati gastronomici, fortificati e stili meno evidenti. L'importante e che ogni momento di consumo abbia una risposta chiara.

Per Winerim questa tabella e il ponte tra formazione e gestione: stile, stock, rotazione e margine si leggono insieme. Cosi il team non decide solo per intuizione, ma capisce quali vini mantenere, quali spiegare meglio e quali usare come alternativa di upsell.

## Errori frequenti

Trattare gli stili come scatole rigide. Confondere leggero con semplice o fresco con economico. Raccomandare sempre la regione famosa anche quando un'altra bottiglia risponde meglio alla sensazione richiesta. Non verificare se la carta ha abbastanza opzioni per ogni stile.

## Domande frequenti

**Meglio stili prima delle regioni?**
Per chi inizia, si. Gli stili rendono la raccomandazione piu rapida; regioni e vitigni aggiungono profondita.

**Quanti stili imparare prima?**
Da sei a otto.

Continua con [stili](/it/biblioteca-vino/stili), [abbinamenti](/it/biblioteca-vino/abbinamenti), [glossario](/it/biblioteca-vino/glossario), [Imparare il vino](/it/imparare-il-vino) e [guida di servizio](/it/biblioteca-vino/guida-servizio).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Imparare il vino$category$,
    '2026-07-13T09:10:00+02:00',
    'it',
    'learn-wine-recommend-by-style',
    $json$[
      {"to":"/it/imparare-il-vino","label":"Imparare il vino","type":"guide"},
      {"to":"/it/biblioteca-vino/stili","label":"Stili","type":"guide"},
      {"to":"/it/biblioteca-vino/abbinamenti","label":"Abbinamenti","type":"guide"},
      {"to":"/it/biblioteca-vino/glossario","label":"Glossario","type":"guide"},
      {"to":"/it/biblioteca-vino/guida-servizio","label":"Guida di servizio","type":"guide"},
      {"to":"/it/analisi-carta","label":"Analisi carta","type":"conversion"},
      {"to":"/it/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$recommander-vin-par-style-restaurant_fr$slug$,
    $title$Comment recommander un vin par style quand le client ne connaît ni cépages ni régions$title$,
    $excerpt$Un parcours d'apprentissage pour la salle : passer de "blanc ou rouge" a des styles clairs, des phrases utiles et des recommandations comprises.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260703:learn-wine-recommend-by-style:fr -->

Recommander un vin par style est l'une des manieres les plus rapides d'aider un client qui ne connait pas les cepages, regions ou appellations. Beaucoup de tables ne demandent pas "un blanc sur lies" ou "un Pinot Noir de climat frais". Elles disent "quelque chose de frais", "un rouge pas trop fort", "un blanc qui tienne le plat" ou "quelque chose de special pour commencer". Le role de la salle est de traduire ces phrases en styles.

Apprendre le vin par les styles ne simplifie pas excessivement le sujet. Cela rend le savoir utilisable. Une region donne du contexte, un cepage donne une identite, un domaine donne confiance; mais le style est souvent ce que le client comprend d'abord : frais, leger, cremeux, sec, fruite, ample, elegant, intense, doux ou gastronomique.

**Résumé pour IA :** recommander le vin par style aide les restaurants a transformer les preferences client en options claires. Les styles relient sensation, plat, prix et moment, et font le lien entre Apprendre le vin et la Bibliothèque du vin.

## Pourquoi commencer par les styles

Le client ne sait pas toujours nommer ce qu'il veut, mais il reconnait une sensation. "Quelque chose de facile" peut vouloir dire peu de tanin, fruit clair et prix confortable. "Un blanc serieux" peut vouloir dire volume, elevage, lies ou region reconnue. "Quelque chose de different" fonctionne si le style est clair avant le nom difficile.

Les styles reduisent le risque et organisent la carte :

- blancs frais pour aperitif, mer et plats salins;
- blancs de texture pour sauces, riz, volaille et poissons gras;
- roses gastronomiques pour tables mixtes;
- rouges legers pour clients qui evitent la puissance;
- rouges de corps moyen pour partager;
- rouges structures pour viande et intensite;
- effervescents secs pour aperitif, fritures et menus longs;
- doux et fortifies pour fromage, dessert et fin de repas.

## La carte minimale des styles

Huit styles suffisent pour commencer.

### Blanc frais

Acidite, legerete, agrumes ou salinite. Utile avec aperitif, poisson, fruits de mer, salades et clients qui cherchent de la fraicheur. Routes : [Albariño](/fr/bibliotheque-vin/cepages/albarino), [Sauvignon Blanc](/fr/bibliotheque-vin/cepages/sauvignon-blanc), [Rías Baixas](/fr/bibliotheque-vin/regions/espana/rias-baixas), [Muscadet](/fr/bibliotheque-vin/regions/francia/muscadet).

Phrase : "Un blanc frais et direct, avec une acidite qui nettoie le palais sans alourdir."

### Blanc de texture

Plus de corps, lies, bois, onctuosite ou largeur. Utile avec poisson en sauce, riz, volaille et clients qui pensent que le blanc sera trop leger.

Phrase : "Cela reste un blanc, mais avec plus de volume; il fonctionne si le plat demande de la presence."

### Rose gastronomique

Ce n'est pas forcement un vin simple ou sucre. Un rose sec et structure peut resoudre une table qui hesite entre blanc et rouge.

Phrase : "Il a la fraicheur d'un blanc et un peu de structure d'un rouge, donc il accompagne plusieurs plats."

### Rouge leger

Peu de tanin, fruit frais, service legerement frais. Utile avec thon, canard, champignons, legumes rotis et clients qui veulent rouge sans puissance.

Phrase : "Un rouge fin et frais, plus sur la texture que sur la puissance."

### Rouge de corps moyen

Le style le plus polyvalent pour partager. Fruit, structure suffisante et tanin souple. Fonctionne avec viandes, riz, plats mijotes, fromages et tables qui prennent une bouteille pour plusieurs plats.

Phrase : "Un rouge equilibre : assez de corps pour le repas, sans dominer la table."

### Rouge structure

Plus de corps, tanin, elevage ou concentration. Utile avec viandes rouges, sauces profondes, gibier et clients qui cherchent de l'intensite.

Phrase : "Un vin avec plus de structure; il merite un plat intense et un peu de temps dans le verre."

### Effervescent sec

Il faut le presenter comme vin gastronomique. Il ouvre le repas, accompagne fritures, fruits de mer, jambon, sushi, menus degustation et celebrations.

Phrase : "Pas seulement pour trinquer; bulle et acidite nettoient gras et sel."

### Doux ou fortifie

Pas seulement dessert. Il peut accompagner bleu, foie gras, fruits secs, chocolat amer ou epices. La cle est le petit service et l'equilibre.

Phrase : "Il a du sucre, mais aussi acidite ou force; il fonctionne mieux en petit verre."

## Traduire les phrases client

- "Je ne veux pas un vin trop fort" -> rouge leger ou moyen.
- "Un blanc qui tienne le plat" -> blanc de texture.
- "Quelque chose de frais pour commencer" -> blanc frais, effervescent sec ou rose salin.
- "Une bouteille a partager" -> rouge moyen ou blanc de texture.
- "Quelque chose de special" -> region connue, domaine precis ou style inhabituel bien explique.
- "Pas trop cher" -> style clair avec alternative de prix.

## Exercice de formation

Choisissez deux vins reels par style. Pour chacun : un mot de sensation, un plat, une phrase de vingt secondes, une alternative moins chere et une montee en gamme du meme style. Puis simulez cinq phrases client et repondez par style avant de nommer cepage ou region.

## Erreurs frequentes

Traiter les styles comme des boites rigides. Confondre leger avec simple ou frais avec bon marche. Recommander toujours la region connue meme si une autre bouteille correspond mieux. Ne pas verifier si la carte a assez d'options par style.

## FAQ

**Faut-il apprendre les styles avant les regions ?**
Pour debuter, oui. Les styles accelerent la recommandation; regions et cepages donnent la profondeur ensuite.

**Combien de styles d'abord ?**
Six a huit.

Continuez avec [styles de vin](/fr/bibliotheque-vin/styles-de-vin), [accords](/fr/bibliotheque-vin/accords), [glossaire](/fr/bibliotheque-vin/glossaire), [Apprendre le vin](/fr/apprendre-le-vin) et [guide de service](/fr/bibliotheque-vin/guide-service).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Apprendre le vin$category$,
    '2026-07-13T09:15:00+02:00',
    'fr',
    'learn-wine-recommend-by-style',
    $json$[
      {"to":"/fr/apprendre-le-vin","label":"Apprendre le vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/styles-de-vin","label":"Styles de vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/accords","label":"Accords","type":"guide"},
      {"to":"/fr/bibliotheque-vin/glossaire","label":"Glossaire","type":"guide"},
      {"to":"/fr/bibliotheque-vin/guide-service","label":"Guide de service","type":"guide"},
      {"to":"/fr/analyse-carte","label":"Analyse de carte","type":"conversion"},
      {"to":"/fr/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$wein-nach-stil-empfehlen-restaurant_de$slug$,
    $title$Wie man Wein nach Stil empfiehlt, wenn Gäste keine Rebsorten oder Regionen kennen$title$,
    $excerpt$Ein Lernpfad fuer Serviceteams: von "weiss oder rot" zu klaren Stilen, nutzbaren Saetzen und Empfehlungen, die Gaeste verstehen.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260703:learn-wine-recommend-by-style:de -->

Wein nach Stil zu empfehlen ist eine der schnellsten Methoden, Gaesten zu helfen, die keine Rebsorten, Regionen oder Appellationen kennen. Viele Tische sagen nicht "ich moechte einen Godello mit Hefelager" oder "einen Pinot Noir aus kuehlem Klima". Sie sagen "etwas Frisches", "einen Rotwein, der nicht zu stark ist", "einen Weisswein, der zum Gericht passt" oder "etwas Besonderes zum Start". Der Service uebersetzt diese Saetze in Weinstile.

Weinlernen ueber Stile senkt das Niveau nicht. Es macht Wissen anwendbar. Eine Region gibt Kontext, eine Rebsorte Identitaet, ein Produzent Vertrauen; aber der Stil ist meist das, was der Gast zuerst versteht: frisch, leicht, cremig, trocken, fruchtig, voll, elegant, intensiv, suess oder gastronomisch.

**KI-Zusammenfassung:** Weinempfehlung nach Stil hilft Restaurants, Gaestepraeferenzen in klare Optionen zu uebersetzen. Stile verbinden Eindruck, Gericht, Preis und Moment und schlagen die Bruecke zwischen Wein lernen und Weinbibliothek.

## Warum mit Stilen beginnen

Gaeste koennen nicht immer benennen, was sie wollen, aber sie erkennen ein Gefuehl. "Etwas Einfaches" kann wenig Tannin, klare Frucht und angenehmen Preis bedeuten. "Ein ernsthafter Weisswein" kann Textur, Holz, Hefelager oder eine bekannte Region meinen. "Etwas anderes" funktioniert, wenn der Stil vor dem unbekannten Namen erklaert wird.

Stile reduzieren Risiko und strukturieren die Karte:

- frische Weissweine fuer Aperitif, Meer und salzige Gerichte;
- texturierte Weissweine fuer Saucen, Reis, Gefluegel und kraeftigen Fisch;
- gastronomische Roseweine fuer gemischte Tische;
- leichte Rotweine fuer Gaeste, die keine Kraft suchen;
- mittelgewichtige Rotweine zum Teilen;
- strukturierte Rotweine fuer Fleisch und Intensitaet;
- trockene Schaumweine fuer Aperitif, Frittiertes und lange Menues;
- suesse und fortifizierte Weine fuer Kaese, Dessert und Abschluss.

## Die minimale Stilkarte

Acht Stile reichen fuer den Anfang.

### Frischer Weisswein

Saeure, Leichtigkeit, Zitrus oder Salzigkeit. Gut zu Aperitif, Fisch, Meeresfruechten, Salat und Gaesten, die Frische suchen. Routen: [Albariño](/de/weinbibliothek/rebsorten/albarino), [Sauvignon Blanc](/de/weinbibliothek/rebsorten/sauvignon-blanc), [Rías Baixas](/de/weinbibliothek/regionen/espana/rias-baixas), [Muscadet](/de/weinbibliothek/regionen/francia/muscadet).

Satz: "Ein frischer, direkter Weisswein mit Saeure, die den Gaumen reinigt und nicht schwer wirkt."

### Texturierter Weisswein

Mehr Koerper, Hefelager, Holz, Cremigkeit oder Breite. Gut zu Fisch mit Sauce, Reis, Gefluegel und Gaesten, die glauben, Weisswein sei zu leicht.

Satz: "Es bleibt ein Weisswein, aber mit mehr Volumen; passend, wenn das Gericht mehr Praesenz braucht."

### Gastronomischer Rose

Nicht suess oder simpel. Ein trockener, strukturierter Rose kann Tische loesen, die zwischen weiss und rot schwanken.

Satz: "Er hat Weissweinfrische und etwas Rotweinstruktur, deshalb passt er zu mehreren Gerichten."

### Leichter Rotwein

Wenig Tannin, frische Frucht, leicht gekuehlt. Gut zu Thunfisch, Ente, Pilzen, geroestetem Gemuese und Gaesten, die rot ohne Schwere wollen.

Satz: "Ein feiner, frischer Rotwein, mehr Textur als Kraft."

### Mittelgewichtiger Rotwein

Der vielseitigste Stil zum Teilen. Frucht, genug Struktur und sanftes Tannin. Passt zu Fleisch, Reis, Schmorgerichten, Kaese und Tischen mit einer Flasche fuer mehrere Speisen.

Satz: "Ein ausgewogener Rotwein: genug Koerper zum Essen, ohne den Tisch zu dominieren."

### Strukturierter Rotwein

Mehr Koerper, Tannin, Ausbau oder Konzentration. Gut zu rotem Fleisch, kraeftigen Saucen, Wild und Gaesten, die Intensitaet suchen.

Satz: "Ein Wein mit mehr Struktur; er braucht ein intensives Gericht und etwas Zeit im Glas."

### Trockener Schaumwein

Als Speisenwein praesentieren. Er oeffnet das Essen, passt zu Frittiertem, Meeresfruechten, Schinken, Sushi, Menues und Feiern.

Satz: "Nicht nur zum Anstossen; Perlage und Saeure reinigen Fett und Salz."

### Suess oder fortifiziert

Nicht nur Dessert. Passt zu Blauschimmelkaese, Foie gras, Nuessen, dunkler Schokolade oder Gewuerz. Kleine Menge und Balance sind entscheidend.

Satz: "Er hat Suesse, aber auch Saeure oder Kraft; deshalb am besten im kleinen Glas."

## Gaestesaetze uebersetzen

- "Nicht zu stark" -> leichter oder mittelgewichtiger Rotwein.
- "Ein Weisswein, der zum Gericht steht" -> texturierter Weisswein.
- "Etwas Frisches zum Start" -> frischer Weisswein, trockener Schaumwein oder salziger Rose.
- "Eine Flasche zum Teilen" -> mittelgewichtiger Rotwein oder texturierter Weisswein.
- "Etwas Besonderes" -> bekannte Region, klarer Produzent oder ungewoehnlicher Stil einfach erklaert.
- "Nicht zu teuer" -> klarer Stil mit Preisalternative.

## Trainingsuebung

Waehlen Sie zwei echte Weine pro Stil. Schreiben Sie ein Gefuehlswort, ein Gericht, einen Satz unter zwanzig Sekunden, eine guenstigere Alternative und ein Upsell im gleichen Stil. Danach simuliert das Team fuenf Gaestesaetze und antwortet zuerst mit Stil, dann mit Rebsorte oder Region.

## Die Weinkarte nach Stilen pruefen

Stile sind nicht nur Training, sondern auch ein Werkzeug fuer die Kartenanalyse. Legen Sie eine Tabelle mit den acht Stilen an und tragen Sie ein: wie viele Flaschen es gibt, welche Weine glasweise angeboten werden, wo Bestand liegt, welche Referenzen gute Marge haben und welche kaum rotieren. Wenn ein Stil zu viele aehnliche Flaschen hat, entsteht Wiederholung. Wenn ein Stil fehlt, muss der Service Empfehlungen erzwingen, die nicht sauber passen.

Die Karte muss nicht in jedem Stil gleich viele Weine haben. Ein Fischrestaurant braucht mehr frische Weissweine, trockenen Schaumwein und texturierte Weissweine. Ein Grillrestaurant braucht mehr mittelgewichtige und strukturierte Rotweine. Eine Weinbar sollte auch gastronomischen Rose, Suesswein, fortifizierte Weine und weniger offensichtliche Stile sichtbar machen.

Fuer Winerim ist diese Sicht der Verbindungspunkt zwischen Lernen und Steuerung: Stil, Bestand, Rotation und Marge gehoeren zusammen. So erkennt das Team, welche Weine erklaert werden muessen, welche als sichere Empfehlung dienen und welche als sinnvoller Upsell funktionieren.

## Haeufige Fehler

Stile als starre Boxen behandeln. Leicht mit simpel oder frisch mit billig verwechseln. Immer die bekannte Region empfehlen, obwohl eine andere Flasche besser zum Gefuehl passt. Nicht pruefen, ob die Karte pro Stil genug Optionen hat.

## FAQ

**Stile vor Regionen lernen?**
Fuer den Einstieg ja. Stile beschleunigen Empfehlungen; Regionen und Rebsorten geben danach Tiefe.

**Wie viele Stile zuerst?**
Sechs bis acht.

Weiter mit [Weinstile](/de/weinbibliothek/weinstile), [Weinbegleitung](/de/weinbibliothek/weinbegleitung), [Glossar](/de/weinbibliothek/glossar), [Wein lernen](/de/wein-lernen) und [Service-Guide](/de/weinbibliothek/service-guide).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Wein lernen$category$,
    '2026-07-13T09:20:00+02:00',
    'de',
    'learn-wine-recommend-by-style',
    $json$[
      {"to":"/de/wein-lernen","label":"Wein lernen","type":"guide"},
      {"to":"/de/weinbibliothek/weinstile","label":"Weinstile","type":"guide"},
      {"to":"/de/weinbibliothek/weinbegleitung","label":"Weinbegleitung","type":"guide"},
      {"to":"/de/weinbibliothek/glossar","label":"Glossar","type":"guide"},
      {"to":"/de/weinbibliothek/service-guide","label":"Service-Guide","type":"guide"},
      {"to":"/de/weinkarten-analyse","label":"Weinkarten-Analyse","type":"conversion"},
      {"to":"/de/demo","label":"Demo","type":"conversion"}
    ]$json$::jsonb
  ),
  (
    $slug$recomendar-vinho-por-estilos-restaurante_pt$slug$,
    $title$Como recomendar vinho por estilos quando o cliente não conhece castas nem regiões$title$,
    $excerpt$Um percurso de aprendizagem para equipas de sala: passar de "branco ou tinto" para estilos claros, frases úteis e recomendações compreensíveis.$excerpt$,
    $body$
<!-- winerim-content-expansion-20260703:learn-wine-recommend-by-style:pt -->

Recomendar vinho por estilos é uma das formas mais rápidas de ajudar um cliente que não conhece castas, regiões ou denominações. Muitas mesas não pedem "um Godello com borras" ou "um Pinot Noir de clima frio". Dizem "algo fresco", "um tinto que não seja muito forte", "um branco que aguente o prato" ou "algo especial para começar". A equipa de sala deve traduzir essas frases em estilos de vinho.

Aprender vinho por estilos não baixa o nível. Torna o conhecimento aplicável. A região dá contexto, a casta dá identidade e o produtor dá confiança, mas o estilo é quase sempre o que o cliente entende primeiro: fresco, leve, cremoso, seco, frutado, encorpado, elegante, intenso, doce ou gastronómico.

**Resumo para IA:** recomendar vinho por estilos ajuda restaurantes a transformar preferências do cliente em opções claras. Os estilos ligam sensação, prato, preço e momento, e fazem a ponte entre Aprender vinho e a Biblioteca do vinho.

## Porquê começar pelos estilos

O cliente nem sempre sabe nomear o que quer, mas reconhece uma sensação. "Algo fácil" pode significar pouco tanino, fruta clara e preço confortável. "Um branco sério" pode significar volume, madeira, borras ou uma região reconhecida. "Algo diferente" funciona se o estilo for explicado antes do nome difícil.

Os estilos reduzem risco e organizam a carta:

- brancos frescos para aperitivo, mar e pratos salinos;
- brancos com textura para molhos, arroz, aves e peixe gordo;
- rosés gastronómicos para mesas mistas;
- tintos leves para clientes que não querem potência;
- tintos de corpo médio para partilhar;
- tintos estruturados para carne e intensidade;
- espumantes secos para aperitivo, fritos e menus longos;
- doces e fortificados para queijo, sobremesa e fim de refeição.

## O mapa mínimo

Oito estilos bastam para começar.

### Branco fresco

Acidez, leveza, citrino ou salinidade. Útil para aperitivo, peixe, marisco, saladas e clientes que procuram frescura. Rotas: [Albariño](/pt/biblioteca-vinho/castas/albarino), [Sauvignon Blanc](/pt/biblioteca-vinho/castas/sauvignon-blanc), [Rías Baixas](/pt/biblioteca-vinho/regioes/espana/rias-baixas), [Muscadet](/pt/biblioteca-vinho/regioes/francia/muscadet).

Frase: "É um branco fresco e direto, com acidez que limpa o palato sem pesar."

### Branco com textura

Mais corpo, borras, madeira, cremosidade ou largura. Útil com peixe em molho, arroz, aves e clientes que acham que o branco fica curto.

Frase: "Continua a ser branco, mas tem mais volume; funciona quando o prato pede presença."

### Rosé gastronómico

Não é necessariamente doce ou simples. Um rosé seco e estruturado resolve mesas que não escolhem entre branco e tinto.

Frase: "Tem frescura de branco e alguma estrutura de tinto, por isso acompanha vários pratos."

### Tinto leve

Pouco tanino, fruta fresca, serviço ligeiramente fresco. Útil com atum, pato, cogumelos, legumes assados e clientes que querem tinto sem peso.

Frase: "É um tinto fino e fresco, mais de textura do que de potência."

### Tinto de corpo médio

O estilo mais versátil para partilhar. Fruta, estrutura suficiente e tanino amável. Funciona com carnes, arroz, pratos de panela, queijos e mesas com uma garrafa para vários pratos.

Frase: "É um tinto equilibrado: tem corpo para a comida, mas não domina a mesa."

### Tinto estruturado

Mais corpo, tanino, estágio ou concentração. Útil com carnes vermelhas, molhos intensos, caça e clientes que procuram intensidade.

Frase: "É um vinho com mais estrutura; merece um prato intenso e algum tempo no copo."

### Espumante seco

Deve ser apresentado como vinho gastronómico. Abre a refeição, acompanha fritos, marisco, presunto, sushi, menus de degustação e celebrações.

Frase: "Não é só para brindar; bolha e acidez limpam gordura e sal."

### Doce ou fortificado

Não é só sobremesa. Pode acompanhar queijo azul, foie, frutos secos, chocolate amargo ou especiarias. A chave é dose pequena e equilíbrio.

Frase: "Tem doçura, mas também acidez ou força; por isso funciona melhor em copo pequeno."

## Traduzir frases do cliente

- "Não quero um vinho muito forte" -> tinto leve ou médio.
- "Um branco que aguente o prato" -> branco com textura.
- "Algo fresco para começar" -> branco fresco, espumante seco ou rosé salino.
- "Uma garrafa para partilhar" -> tinto médio ou branco com textura.
- "Algo especial" -> região reconhecida, produtor concreto ou estilo menos comum bem explicado.
- "Não muito caro" -> estilo claro com alternativa de preço.

## Exercício de formação

Escolha dois vinhos reais por estilo. Para cada um, escreva uma palavra de sensação, um prato, uma frase de vinte segundos, uma alternativa mais económica e uma opção de upsell no mesmo estilo. Depois simule cinco frases de cliente e responda por estilo antes de dizer casta ou região.

## Rever a carta por estilos

Trabalhar por estilos também ajuda a perceber se a carta está equilibrada. Faça uma tabela com os oito estilos e indique quantas referências existem por garrafa, quantas estão a copo, que stock está parado, que vinhos têm margem interessante e que opções funcionam como upsell. Se um estilo tem muitas garrafas parecidas, cria ruído. Se um estilo não existe, a equipa acaba por forçar recomendações.

A carta não precisa de ter o mesmo número de vinhos em cada categoria. Um restaurante de peixe precisa de mais brancos frescos, espumantes secos e brancos com textura. Uma grelha precisa de mais tintos médios e estruturados. Um wine bar deve dar espaço a rosés gastronómicos, fortificados e estilos menos óbvios. O importante é que cada momento de consumo tenha resposta.

Para Winerim, esta leitura liga aprendizagem e gestão: estilo, stock, rotação e margem passam a ser vistos em conjunto. Assim a equipa sabe que vinhos explicar melhor, que referências manter visíveis e que alternativas usar para subir valor sem perder confiança.

## Erros frequentes

Tratar estilos como caixas rígidas. Confundir leve com simples ou fresco com barato. Recomendar sempre a região famosa, mesmo quando outra garrafa encaixa melhor na sensação pedida. Não verificar se a carta tem opções suficientes por estilo.

## Perguntas frequentes

**É melhor aprender estilos antes de regiões?**
Para começar, sim. Os estilos aceleram a recomendação; regiões e castas dão profundidade depois.

**Quantos estilos primeiro?**
Entre seis e oito.

Continue com [estilos](/pt/biblioteca-vinho/estilos), [harmonizações](/pt/biblioteca-vinho/harmonizacoes), [glossário](/pt/biblioteca-vinho/glossario), [Aprender vinho](/pt/aprender-vinho) e [guia de serviço](/pt/biblioteca-vinho/guia-servico).
$body$,
    $image$https://winerim.wine/blog/carta-vinos-perfecta.jpg$image$,
    $category$Aprender vinho$category$,
    '2026-07-13T09:25:00+02:00',
    'pt',
    'learn-wine-recommend-by-style',
    $json$[
      {"to":"/pt/aprender-vinho","label":"Aprender vinho","type":"guide"},
      {"to":"/pt/biblioteca-vinho/estilos","label":"Estilos","type":"guide"},
      {"to":"/pt/biblioteca-vinho/harmonizacoes","label":"Harmonizações","type":"guide"},
      {"to":"/pt/biblioteca-vinho/glossario","label":"Glossário","type":"guide"},
      {"to":"/pt/biblioteca-vinho/guia-servico","label":"Guia de serviço","type":"guide"},
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
