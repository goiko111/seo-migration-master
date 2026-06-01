ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS article_group TEXT;

INSERT INTO public.articles (
  slug, title, excerpt, body, image_url, category, author, published, published_at, lang, article_group, related_links, updated_at
) VALUES
(
  'biblioteca-vino-restaurante-vender-mas_en',
  $title$How restaurants can use a wine library to sell more wine$title$,
  $excerpt$A wine library should not be a passive glossary. For restaurants, hotels and groups, it works when it helps the team explain wines faster, connect them to dishes and move guests toward better decisions.$excerpt$,
  $body$
A wine library becomes useful when it reflects the way guests actually choose wine. In the UK and international hotel markets, many guests do not ask for a grape lecture. They ask for a red that feels safe, a white that works with seafood, or a sparkling wine that makes dinner feel special.

## From information to service

The practical route is simple: connect grape, region, style and pairing. A page about [Tempranillo](/en/wine-library/grapes/tempranillo) matters more when it also points to [Rioja](/en/wine-library/regions/espana/rioja), oak-aged reds, red meat and alternatives for guests who want something fresher.

That is what turns a [wine library](/en/wine-library) into a sales tool. The floor team can move from the guest question to a confident recommendation without improvising every time.

## What to localise for English-speaking guests

For English-speaking markets, clarity usually beats technical depth. Use plain labels: light-bodied red, mineral white, classic sparkling, by-the-glass option, premium upgrade. Then add one sentence the team can use at the table.

Start with the wines that appear most often on the list. Map five core grapes, five recognised regions, five service styles and ten food pairings. Link each one to a dish, a price band and a commercial role.

## How to measure it

The library is working if more guests accept recommendations, if the team uses more of the list, and if articles send traffic to [wine list analysis](/en/wine-list-analysis) or a [demo](/en/demo). Content is only strategic when it changes a service decision.

## FAQ

**Should a wine library replace staff training?**
No. It should make training easier and keep the same criteria available during service.

**Should it be connected to the digital wine list?**
Yes. The library explains, while the wine list converts that explanation into a bottle, glass or pairing.
$body$,
  'https://winerim.wine/blog/vino-estrategico.jpg', 'Wine library', 'Winerim', true, '2026-06-01T09:40:00+02:00', 'en',
  'biblioteca-vino-restaurante-vender-mas',
  '[{"label":"Wine library","to":"/en/wine-library","type":"resource"},{"label":"Wine list analysis","to":"/en/wine-list-analysis","type":"tool"},{"label":"Demo","to":"/en/demo","type":"solution"}]'::jsonb,
  NOW()
),
(
  'uvas-regiones-equipo-sala-vender-vino_en',
  $title$The grapes and regions your floor team should know to sell wine better$title$,
  $excerpt$Your team does not need to memorise every appellation. It needs a practical map of grapes, regions and service cues that match the way guests choose wine.$excerpt$,
  $body$
In English-speaking restaurants, good wine service often starts with translation. The guest says dry white, smooth red or something local. The team has to convert that into a useful route through the list.

## The minimum map

Start with the grapes that create the most conversations: [Chardonnay](/en/wine-library/grapes/chardonnay), Sauvignon Blanc, Riesling, Pinot Noir, Tempranillo and Cabernet Sauvignon. Then connect each grape to a region and a style.

For example, Chardonnay can mean a crisp by-the-glass white, a richer food wine or a premium Burgundy-style recommendation. Pinot Noir can lead to lighter reds, fine dining pairings and guests who want elegance instead of power.

## Regions that reduce friction

The team should know why a guest recognises [Rioja](/en/wine-library/regions/espana/rioja), Champagne, Burgundy, Bordeaux, Douro or Rías Baixas. Recognition creates trust. The recommendation improves when the team can add one useful detail: body, acidity, oak, freshness or food match.

Use the [grape hub](/en/wine-library/grapes) and [region hub](/en/wine-library/regions) as training shortcuts, not encyclopaedias. Each page should answer: when do I recommend this, to whom and with what dish?

## What to train every week

Choose three bottles from the actual list. Ask the team to write one service sentence, one food pairing and one upgrade alternative. Repeat this every week and the library becomes part of the sales rhythm.

## FAQ

**How many grapes should the team master first?**
Ten is enough to change service quality if they are linked to real bottles on the list.

**Should regions be taught before grapes?**
Teach both together. Guests ask in both languages: grape names and place names.
$body$,
  'https://winerim.wine/blog/personal-recomiende-vino.jpg', 'Floor training', 'Winerim', true, '2026-06-01T09:41:00+02:00', 'en',
  'uvas-regiones-equipo-sala-vender-vino',
  '[{"label":"Grapes","to":"/en/wine-library/grapes","type":"resource"},{"label":"Regions","to":"/en/wine-library/regions","type":"resource"},{"label":"Guides","to":"/en/guides","type":"guide"}]'::jsonb,
  NOW()
),
(
  'maridajes-carta-vinos-rentable_en',
  $title$How to build wine pairings that make a restaurant wine list more profitable$title$,
  $excerpt$Pairings are not decoration. Used well, they reduce decision friction, increase confidence and help the team sell wines beyond the obvious choices.$excerpt$,
  $body$
Wine pairings work commercially when they are operational. A guest does not need a poetic explanation; they need to know why a glass or bottle fits the food in front of them.

## Build pairings from your menu

Start with the dishes that drive margin or volume. In a hotel or restaurant group, this could be steak, seafood, tasting menus, vegetarian dishes and by-the-glass starters. Link each dish to one safe option, one premium option and one discovery option.

The [pairing hub](/en/wine-library/pairings) should connect these decisions to grapes, regions and styles. Oysters can lead to sparkling wine or mineral whites. Red meat can lead to structured reds. Cheese can open routes to fortified, sweet or mature wines.

## Keep the team language simple

Use service sentences: "This works because the acidity refreshes the dish", "This red has enough structure for the sauce", or "This sparkling wine keeps the pairing light". These sentences are easier to use than technical tasting notes.

## Connect pairing to analysis

If a pairing does not sell, check whether the bottle is visible, priced correctly and easy to explain. The next step is not more content; it is data. Use [wine list analysis](/en/wine-list-analysis) to see which wines are underused and where pairings can move demand.

## FAQ

**Should every dish have a pairing?**
No. Prioritise profitable dishes and dishes where guests often ask for help.

**Can pairings increase average ticket?**
Yes, especially when they give the team a natural upgrade path from safe to premium.
$body$,
  'https://winerim.wine/blog/experiencia-cliente-restaurante.jpg', 'Pairing', 'Winerim', true, '2026-06-01T09:42:00+02:00', 'en',
  'maridajes-carta-vinos-rentable',
  '[{"label":"Pairings","to":"/en/wine-library/pairings","type":"resource"},{"label":"Pairing generator","to":"/en/wine-pairing-generator","type":"tool"},{"label":"Demo","to":"/en/demo","type":"solution"}]'::jsonb,
  NOW()
),
(
  'biblioteca-vino-restaurante-vender-mas_it',
  $title$Come usare una biblioteca del vino per vendere di più in sala$title$,
  $excerpt$Una biblioteca del vino funziona quando aiuta la sala a spiegare meglio la carta, collegare vitigni e territori ai piatti e proporre alternative con sicurezza.$excerpt$,
  $body$
In Italia la carta dei vini vive spesso tra territorio, produttori e cucina. Una [biblioteca del vino](/it/biblioteca-vino) diventa utile quando non resta teoria, ma aiuta la sala a trasformare una domanda del cliente in una proposta chiara.

## Dal territorio alla decisione

Un cliente puo chiedere un rosso elegante, un bianco per crudo di mare o una bottiglia importante per una cena. La risposta migliora se il team collega [vitigni](/it/biblioteca-vino/vitigni), [regioni](/it/biblioteca-vino/regioni), stili e abbinamenti.

Esempio: Nebbiolo puo aprire la porta a Piemonte e Langhe; Sangiovese a Toscana e carni; Verdicchio o Vermentino a pesce e cucina mediterranea. La biblioteca deve rendere questi passaggi immediati.

## Adattarla al mercato italiano

La profondita tecnica conta, ma in sala serve sintesi. Per ogni vino, scrivi ruolo in carta, frase di servizio, piatto consigliato e alternativa premium. Cosi la biblioteca diventa formazione continua, non un archivio.

## Misurare il risultato

Se funziona, la sala vende piu referenze, il cliente capisce meglio la proposta e aumentano i passaggi verso [analisi carta](/it/analisi-carta) o [demo](/it/demo). La conoscenza diventa valore solo quando cambia la scelta al tavolo.

## FAQ

**Serve anche ai ristoranti senza sommelier?**
Si. Aiuta a creare un criterio condiviso tra titolare, responsabile e camerieri.

**Meglio partire dai vitigni o dai piatti?**
Parti dai piatti piu venduti e collega ogni piatto a vitigno, regione e stile.
$body$,
  'https://winerim.wine/blog/vino-estrategico.jpg', 'Biblioteca del vino', 'Winerim', true, '2026-06-01T09:43:00+02:00', 'it',
  'biblioteca-vino-restaurante-vender-mas',
  '[{"label":"Biblioteca del vino","to":"/it/biblioteca-vino","type":"resource"},{"label":"Analisi carta","to":"/it/analisi-carta","type":"tool"},{"label":"Demo","to":"/it/demo","type":"solution"}]'::jsonb,
  NOW()
),
(
  'uvas-regiones-equipo-sala-vender-vino_it',
  $title$Vitigni e regioni che la sala deve conoscere per vendere meglio il vino$title$,
  $excerpt$Il team non deve memorizzare tutto. Deve conoscere i vitigni e i territori che aiutano davvero a consigliare la bottiglia giusta.$excerpt$,
  $body$
In una sala italiana, il cliente sceglie spesso tra vitigno, territorio e fiducia nel produttore. Per questo il training deve partire da una mappa pratica, non da un manuale infinito.

## La mappa minima

Comincia dai vitigni che compaiono davvero in carta: [Chardonnay](/it/biblioteca-vino/vitigni/chardonnay), Sangiovese, Nebbiolo, Pinot Nero, Vermentino, Verdicchio, Barbera, Glera, Riesling e Syrah.

Poi collega ogni vitigno a una regione e a un uso di sala. Sangiovese parla di Toscana e carni. Nebbiolo di Piemonte e piatti strutturati. Vermentino di mare, freschezza e aperitivo gastronomico.

## Territori che aiutano a vendere

Le [regioni](/it/biblioteca-vino/regioni) riducono l'incertezza. Piemonte, Toscana, Veneto, Sicilia, Alto Adige e Franciacorta sono scorciatoie di fiducia se la sala sa spiegare cosa aspettarsi nel bicchiere.

## Allenamento settimanale

Ogni settimana scegli tre vini della carta. Per ciascuno prepara una frase di servizio, un piatto e una alternativa di prezzo. Dopo poche settimane, il team usera piu referenze e non sempre le stesse.

## FAQ

**Quanti vitigni insegnare per primi?**
Dieci bastano se sono collegati alla carta reale.

**Le regioni straniere servono?**
Si, ma dopo aver consolidato i territori che i clienti chiedono piu spesso.
$body$,
  'https://winerim.wine/blog/personal-recomiende-vino.jpg', 'Formazione sala', 'Winerim', true, '2026-06-01T09:44:00+02:00', 'it',
  'uvas-regiones-equipo-sala-vender-vino',
  '[{"label":"Vitigni","to":"/it/biblioteca-vino/vitigni","type":"resource"},{"label":"Regioni","to":"/it/biblioteca-vino/regioni","type":"resource"},{"label":"Guide","to":"/it/guide","type":"guide"}]'::jsonb,
  NOW()
),
(
  'maridajes-carta-vinos-rentable_it',
  $title$Come creare abbinamenti che rendono più redditizia la carta dei vini$title$,
  $excerpt$Gli abbinamenti non sono solo esperienza. Se sono operativi, aiutano la sala a vendere meglio e a far ruotare più referenze.$excerpt$,
  $body$
Un abbinamento funziona quando il cliente lo capisce subito. In Italia la cucina cambia molto da regione a regione, quindi la regola non puo essere generica: deve partire dal menu reale.

## Parti dai piatti chiave

Scegli piatti ad alto margine o alta rotazione: crudi di mare, pasta ripiena, carne alla brace, formaggi, menu degustazione. Per ciascuno prepara un'opzione sicura, una premium e una di scoperta.

La sezione [abbinamenti](/it/biblioteca-vino/abbinamenti) deve collegare piatto, vitigno, regione e stile. Cosi un piatto di mare puo portare a Vermentino, Metodo Classico o bianchi minerali; una carne puo aprire la strada a Sangiovese o Nebbiolo.

## Frasi di sala

Evita descrizioni lunghe. Usa frasi brevi: "la freschezza pulisce il palato", "il tannino regge la salsa", "la bollicina alleggerisce il piatto". Sono frasi vendibili.

## FAQ

**Serve un abbinamento per ogni piatto?**
No. Meglio pochi abbinamenti ben scelti sui piatti che muovono margine e ticket medio.

**Come capire se funziona?**
Guarda rotazione, margine e uso delle referenze prima invisibili.
$body$,
  'https://winerim.wine/blog/experiencia-cliente-restaurante.jpg', 'Abbinamenti', 'Winerim', true, '2026-06-01T09:45:00+02:00', 'it',
  'maridajes-carta-vinos-rentable',
  '[{"label":"Abbinamenti","to":"/it/biblioteca-vino/abbinamenti","type":"resource"},{"label":"Generatore abbinamenti","to":"/it/generatore-abbinamenti-ia","type":"tool"},{"label":"Demo","to":"/it/demo","type":"solution"}]'::jsonb,
  NOW()
),
(
  'biblioteca-vino-restaurante-vender-mas_fr',
  $title$Comment utiliser une bibliothèque du vin pour vendre plus en salle$title$,
  $excerpt$Une bibliothèque du vin est utile lorsqu'elle aide l'équipe à expliquer la carte, relier les vins aux plats et proposer une recommandation claire au bon moment.$excerpt$,
  $body$
En France, le vin est souvent lié à l'appellation, au domaine et à la cuisine. Une [bibliothèque du vin](/fr/bibliotheque-vin) doit donc aider la salle à transformer cette richesse en décision simple pour le client.

## De l'information à la recommandation

Une fiche sur le [Chenin Blanc](/fr/bibliotheque-vin/cepages/chenin-blanc) devient commerciale lorsqu'elle mène vers la Loire, les blancs tendus, les poissons, les fromages et une alternative plus premium.

La salle n'a pas besoin de tout raconter. Elle doit savoir quoi recommander, pourquoi ce vin fonctionne avec le plat et quelle option proposer si le client veut monter en gamme.

## Adapter la bibliothèque au marché français

Les clients reconnaissent Bourgogne, Bordeaux, Champagne, Loire, Rhône ou Alsace. Utilise ces repères pour structurer les [régions](/fr/bibliotheque-vin/regions), puis relie-les aux cépages, styles et accords.

Chaque page doit répondre à trois questions: quand le proposer, avec quel plat, et quelle alternative donner si le client hésite.

## Mesurer l'effet

La bibliothèque réussit si elle envoie plus de clients vers [l'analyse de carte](/fr/analyse-carte), si l'équipe vend plus de références et si les vins oubliés trouvent enfin une occasion de sortie.

## FAQ

**Est-ce seulement du contenu SEO ?**
Non. C'est un outil de service si la salle l'utilise pendant la recommandation.

**Faut-il tout écrire très technique ?**
Non. La technique doit servir une phrase claire au client.
$body$,
  'https://winerim.wine/blog/vino-estrategico.jpg', 'Bibliothèque du vin', 'Winerim', true, '2026-06-01T09:46:00+02:00', 'fr',
  'biblioteca-vino-restaurante-vender-mas',
  '[{"label":"Bibliothèque du vin","to":"/fr/bibliotheque-vin","type":"resource"},{"label":"Analyse carte","to":"/fr/analyse-carte","type":"tool"},{"label":"Demo","to":"/fr/demo","type":"solution"}]'::jsonb,
  NOW()
),
(
  'uvas-regiones-equipo-sala-vender-vino_fr',
  $title$Les cépages et régions que l'équipe doit connaître pour mieux vendre le vin$title$,
  $excerpt$La salle n'a pas besoin de réciter toutes les appellations. Elle doit connaître les repères qui aident vraiment le client à choisir.$excerpt$,
  $body$
La vente de vin en France dépend beaucoup des repères. Le client peut parler cépage, appellation, style ou plat. La salle doit passer d'un langage à l'autre sans perdre le fil.

## Les cépages utiles en priorité

Commence par les [cépages](/fr/bibliotheque-vin/cepages) que la carte utilise vraiment: Chardonnay, Sauvignon Blanc, Chenin Blanc, Riesling, Pinot Noir, Syrah, Grenache, Cabernet Franc et Merlot.

Chaque cépage doit être relié à une région et à une phrase de service. Chardonnay peut parler Bourgogne ou vin plus ample. Chenin Blanc peut parler Loire, tension, gastronomie et fromages.

## Les régions qui donnent confiance

Les [régions](/fr/bibliotheque-vin/regions) créent de la confiance: Bourgogne, Bordeaux, Champagne, Loire, Rhône, Alsace, Languedoc. L'objectif n'est pas de tout dire, mais d'aider le client à comprendre le style attendu.

## Routine de formation

Chaque semaine, choisis trois vins réels de la carte. Pour chacun, écris une phrase client, un accord et une alternative. La bibliothèque devient alors une base de formation vivante.

## FAQ

**Combien de régions faut-il maîtriser au départ ?**
Six à dix suffisent si elles couvrent la majorité de la carte.

**Faut-il inclure les vins étrangers ?**
Oui, mais seulement s'ils sont présents en carte et utiles dans les recommandations.
$body$,
  'https://winerim.wine/blog/personal-recomiende-vino.jpg', 'Formation salle', 'Winerim', true, '2026-06-01T09:47:00+02:00', 'fr',
  'uvas-regiones-equipo-sala-vender-vino',
  '[{"label":"Cépages","to":"/fr/bibliotheque-vin/cepages","type":"resource"},{"label":"Régions","to":"/fr/bibliotheque-vin/regions","type":"resource"},{"label":"Guides","to":"/fr/guides","type":"guide"}]'::jsonb,
  NOW()
),
(
  'maridajes-carta-vinos-rentable_fr',
  $title$Comment créer des accords mets-vins qui rendent la carte plus rentable$title$,
  $excerpt$Les accords ne doivent pas seulement embellir l'expérience. Ils doivent aider la salle à vendre mieux, plus vite et avec plus de cohérence.$excerpt$,
  $body$
Un bon accord mets-vins réduit l'hésitation. Le client comprend pourquoi ce vin accompagne ce plat et la salle peut proposer une option sans paraître forcer la vente.

## Partir des plats rentables

Choisis les plats qui comptent: fruits de mer, viandes, fromages, menu dégustation, plats végétariens. Pour chacun, définis une option sûre, une option premium et une option découverte.

La page [accords](/fr/bibliotheque-vin/accords) doit relier ces plats aux cépages, régions et styles. Les huîtres peuvent mener aux blancs tendus ou aux bulles. La viande peut mener aux rouges structurés. Le fromage ouvre des routes plus variées.

## Langage de salle

Utilise des phrases courtes: "l'acidité équilibre le plat", "le tanin tient la sauce", "la bulle allège la texture". Ce langage aide plus qu'une longue note de dégustation.

## FAQ

**Tous les plats doivent-ils avoir un accord ?**
Non. Priorise les plats rentables et ceux où les clients demandent souvent conseil.

**Un accord peut-il augmenter le ticket moyen ?**
Oui, surtout quand il propose une montée en gamme naturelle.
$body$,
  'https://winerim.wine/blog/experiencia-cliente-restaurante.jpg', 'Accords mets-vins', 'Winerim', true, '2026-06-01T09:48:00+02:00', 'fr',
  'maridajes-carta-vinos-rentable',
  '[{"label":"Accords","to":"/fr/bibliotheque-vin/accords","type":"resource"},{"label":"Générateur accords","to":"/fr/generateur-accords-ia","type":"tool"},{"label":"Demo","to":"/fr/demo","type":"solution"}]'::jsonb,
  NOW()
),
(
  'biblioteca-vino-restaurante-vender-mas_de',
  $title$Wie Restaurants eine Weinbibliothek nutzen, um mehr Wein zu verkaufen$title$,
  $excerpt$Eine Weinbibliothek verkauft nicht allein durch Wissen. Sie hilft, wenn das Serviceteam Rebsorten, Regionen, Speisen und Alternativen schnell verbinden kann.$excerpt$,
  $body$
Im DACH-Markt erwarten Gäste oft klare Orientierung: trocken, frisch, leicht, kräftig, regional oder passend zum Menü. Eine [Weinbibliothek](/de/weinbibliothek) muss diese Fragen in einfache Empfehlungen übersetzen.

## Vom Wissen zur Empfehlung

Eine Seite über [Riesling](/de/weinbibliothek/rebsorten/riesling) ist wertvoll, wenn sie auch zu Regionen, Stil, Speisen und einer Alternative im höheren Preisbereich führt. So wird Wissen im Service nutzbar.

Das Team braucht keine langen Vorträge. Es braucht eine sichere Antwort auf: Wann empfehle ich diesen Wein, zu welchem Gericht und welche Alternative passt, wenn der Gast etwas anderes sucht?

## Anpassung an Deutschland, Österreich und Schweiz

Für DACH sind Begriffe wie Riesling, Spätburgunder, Grüner Veltliner, Mosel, Rheingau, Wachau oder Südtirol starke Anker. Verbinde sie mit [Rebsorten](/de/weinbibliothek/rebsorten), [Regionen](/de/weinbibliothek/regionen), Weinstilen und Speisen.

## Messung

Die Bibliothek funktioniert, wenn mehr Weine aktiv empfohlen werden und wenn der Weg zur [Weinkarten-Analyse](/de/weinkarten-analyse) oder [Demo](/de/demo) klar wird. Sichtbarkeit allein reicht nicht; sie muss Serviceentscheidungen verbessern.

## FAQ

**Hilft das auch ohne Sommelier?**
Ja. Es schafft ein gemeinsames Empfehlungssystem für das ganze Team.

**Wie tief muss der Inhalt sein?**
Tief genug für Vertrauen, aber kurz genug für den Einsatz im Service.
$body$,
  'https://winerim.wine/blog/vino-estrategico.jpg', 'Weinbibliothek', 'Winerim', true, '2026-06-01T09:49:00+02:00', 'de',
  'biblioteca-vino-restaurante-vender-mas',
  '[{"label":"Weinbibliothek","to":"/de/weinbibliothek","type":"resource"},{"label":"Weinkarten-Analyse","to":"/de/weinkarten-analyse","type":"tool"},{"label":"Demo","to":"/de/demo","type":"solution"}]'::jsonb,
  NOW()
),
(
  'uvas-regiones-equipo-sala-vender-vino_de',
  $title$Welche Rebsorten und Regionen das Serviceteam kennen sollte$title$,
  $excerpt$Das Team muss nicht jede Herkunft auswendig kennen. Es braucht die Rebsorten und Regionen, die Gästen bei der Entscheidung wirklich helfen.$excerpt$,
  $body$
Gäste fragen selten nach vollständiger Weintheorie. Sie fragen nach einem frischen Weißwein, einem eleganten Rotwein oder einer sicheren Empfehlung zum Essen. Dafür braucht das Team eine praktische Karte.

## Die wichtigsten Rebsorten

Starte mit [Rebsorten](/de/weinbibliothek/rebsorten), die in der Karte wirklich vorkommen: Riesling, Chardonnay, Sauvignon Blanc, Spätburgunder, Cabernet Sauvignon, Merlot, Grüner Veltliner, Syrah, Tempranillo und Pinot Noir.

Jede Rebsorte braucht eine Servicerolle: leicht und frisch, mineralisch, cremig, elegant, kräftig oder premium. Daraus entsteht eine Empfehlung, die Gäste verstehen.

## Regionen als Vertrauen

[Regionen](/de/weinbibliothek/regionen) wie Mosel, Rheingau, Pfalz, Baden, Wachau, Südtirol, Rioja oder Champagne geben Orientierung. Wichtig ist nicht die komplette Geschichte, sondern der erwartbare Stil im Glas.

## Training im Alltag

Nimm jede Woche drei echte Weine aus der Karte. Schreibe eine Empfehlung, ein Gericht und eine Alternative. Nach einigen Wochen empfiehlt das Team breiter und sicherer.

## FAQ

**Wie viele Rebsorten sind am Anfang genug?**
Zehn sind ausreichend, wenn sie mit echten Flaschen und Gerichten verbunden sind.

**Sollte man lokale Regionen priorisieren?**
Ja, wenn sie für Gäste und Karte relevant sind.
$body$,
  'https://winerim.wine/blog/personal-recomiende-vino.jpg', 'Servicetraining', 'Winerim', true, '2026-06-01T09:50:00+02:00', 'de',
  'uvas-regiones-equipo-sala-vender-vino',
  '[{"label":"Rebsorten","to":"/de/weinbibliothek/rebsorten","type":"resource"},{"label":"Regionen","to":"/de/weinbibliothek/regionen","type":"resource"},{"label":"Ratgeber","to":"/de/ratgeber","type":"guide"}]'::jsonb,
  NOW()
),
(
  'maridajes-carta-vinos-rentable_de',
  $title$Wie Speisen- und Weinempfehlungen die Weinkarte rentabler machen$title$,
  $excerpt$Pairings sind dann wirtschaftlich sinnvoll, wenn sie dem Service helfen, schneller und sicherer zu empfehlen und ungenutzte Weine sichtbar zu machen.$excerpt$,
  $body$
Eine gute Speisen- und Weinempfehlung reduziert Unsicherheit. Der Gast versteht, warum dieser Wein zum Gericht passt, und das Team kann eine bessere Option anbieten.

## Vom Menü ausgehen

Wähle zuerst die Gerichte mit hoher Marge oder hoher Nachfrage: Fisch, Fleisch, vegetarische Gerichte, Käse, Menüs und Glaswein-Einstiege. Für jedes Gericht braucht es eine sichere Option, eine Premium-Option und eine Entdeckungsoption.

Die Seite [Weinbegleitung](/de/weinbibliothek/weinbegleitung) sollte diese Gerichte mit Rebsorten, Regionen und Stilen verbinden. So wird aus einem Gericht ein klarer Weg durch die Karte.

## Sprache im Service

Kurze Sätze helfen: "Die Säure macht das Gericht frischer", "die Struktur passt zur Sauce", "die Perlage hält die Kombination leicht". Das ist verständlicher als lange Verkostungsnotizen.

## FAQ

**Braucht jedes Gericht eine Empfehlung?**
Nein. Priorisiere Gerichte, bei denen Gäste Hilfe brauchen oder die Marge wichtig ist.

**Steigern Pairings den Durchschnittsbon?**
Ja, wenn sie eine natürliche Premium-Alternative anbieten.
$body$,
  'https://winerim.wine/blog/experiencia-cliente-restaurante.jpg', 'Weinbegleitung', 'Winerim', true, '2026-06-01T09:51:00+02:00', 'de',
  'maridajes-carta-vinos-rentable',
  '[{"label":"Weinbegleitung","to":"/de/weinbibliothek/weinbegleitung","type":"resource"},{"label":"Pairing Generator","to":"/de/wine-pairing-generator","type":"tool"},{"label":"Demo","to":"/de/demo","type":"solution"}]'::jsonb,
  NOW()
),
(
  'biblioteca-vino-restaurante-vender-mas_pt',
  $title$Como usar uma biblioteca do vinho para vender mais em sala$title$,
  $excerpt$Uma biblioteca do vinho só cria valor quando ajuda a equipa a recomendar melhor, ligar vinhos aos pratos e transformar conhecimento em decisão.$excerpt$,
  $body$
Em Portugal, a carta de vinhos mistura regiões fortes, castas próprias e muita ligação à cozinha. Uma [biblioteca do vinho](/pt/biblioteca-vinho) deve ajudar a equipa a passar dessa riqueza para uma recomendação simples.

## Da casta à decisão

Uma ficha de [Alvarinho](/pt/biblioteca-vinho/castas/albarino) ganha valor quando aponta para Vinho Verde, marisco, brancos frescos e alternativas mais gastronómicas. O mesmo acontece com Touriga Nacional, Baga, Encruzado ou Arinto.

O objetivo é ligar [castas](/pt/biblioteca-vinho/castas), [regiões](/pt/biblioteca-vinho/regioes), estilos e harmonizações para que a equipa não dependa sempre dos mesmos vinhos.

## Adaptar ao mercado português

Douro, Dão, Alentejo, Bairrada, Vinho Verde e Lisboa são referências úteis para orientar o cliente. Para cada uma, define papel na carta, frase de sala, prato recomendado e alternativa premium.

## Medir o impacto

A biblioteca funciona se aumenta a rotação de referências menos visíveis e leva mais utilizadores para [análise de carta](/pt/analise-carta) ou [demo](/pt/demo). Conteúdo bom é aquele que melhora uma decisão de serviço.

## FAQ

**Serve para restaurantes sem escanção?**
Sim. Ajuda a equipa a usar critérios comuns.

**Devo começar por castas portuguesas?**
Sim, se forem relevantes na carta e na procura dos clientes.
$body$,
  'https://winerim.wine/blog/vino-estrategico.jpg', 'Biblioteca do vinho', 'Winerim', true, '2026-06-01T09:52:00+02:00', 'pt',
  'biblioteca-vino-restaurante-vender-mas',
  '[{"label":"Biblioteca do vinho","to":"/pt/biblioteca-vinho","type":"resource"},{"label":"Análise de carta","to":"/pt/analise-carta","type":"tool"},{"label":"Demo","to":"/pt/demo","type":"solution"}]'::jsonb,
  NOW()
),
(
  'uvas-regiones-equipo-sala-vender-vino_pt',
  $title$Castas e regiões que a equipa deve conhecer para vender melhor o vinho$title$,
  $excerpt$A equipa não precisa de saber tudo. Precisa de dominar as castas e regiões que aparecem na carta e ajudam o cliente a escolher.$excerpt$,
  $body$
A venda de vinho em Portugal depende muito de nomes de região e de castas locais. Quando o cliente pede algo fresco, encorpado, seguro ou diferente, a equipa precisa de uma rota clara.

## Castas prioritárias

Começa pelas [castas](/pt/biblioteca-vinho/castas) que estão realmente na carta: Alvarinho, Arinto, Encruzado, Fernão Pires, Touriga Nacional, Tinta Roriz, Baga, Syrah, Chardonnay e Pinot Noir.

Para cada casta, escreve uma frase de sala, um prato e uma alternativa. Alvarinho pode ligar-se a marisco e frescura. Touriga Nacional a estrutura. Baga a acidez, gastronomia e carnes.

## Regiões que dão confiança

As [regiões](/pt/biblioteca-vinho/regioes) mais úteis para começar são Douro, Dão, Alentejo, Bairrada, Vinho Verde, Lisboa e Tejo. O cliente reconhece algumas; outras precisam de uma explicação simples.

## Rotina de formação

Escolhe três vinhos por semana. A equipa deve saber dizer quando recomendar, com que prato e que alternativa sugerir se o cliente quiser subir de preço.

## FAQ

**Quantas castas ensinar primeiro?**
Dez chegam, desde que estejam ligadas à carta real.

**E os vinhos estrangeiros?**
Inclui-os quando forem importantes para a carta ou para o perfil dos clientes.
$body$,
  'https://winerim.wine/blog/personal-recomiende-vino.jpg', 'Formação de sala', 'Winerim', true, '2026-06-01T09:53:00+02:00', 'pt',
  'uvas-regiones-equipo-sala-vender-vino',
  '[{"label":"Castas","to":"/pt/biblioteca-vinho/castas","type":"resource"},{"label":"Regiões","to":"/pt/biblioteca-vinho/regioes","type":"resource"},{"label":"Guias","to":"/pt/guias","type":"guide"}]'::jsonb,
  NOW()
),
(
  'maridajes-carta-vinos-rentable_pt',
  $title$Como criar harmonizações que tornam a carta de vinhos mais rentável$title$,
  $excerpt$As harmonizações são úteis quando ajudam o cliente a decidir e a equipa a vender vinhos que estavam pouco visíveis na carta.$excerpt$,
  $body$
Uma harmonização boa é aquela que a equipa consegue explicar em dez segundos. O cliente percebe a ligação ao prato e aceita melhor a recomendação.

## Começar pelos pratos certos

Escolhe pratos com margem, procura ou dificuldade de escolha: marisco, peixe grelhado, carnes, queijos, menus de degustação e entradas. Para cada prato, prepara uma opção segura, uma premium e uma de descoberta.

A área de [harmonizações](/pt/biblioteca-vinho/harmonizacoes) deve ligar prato, casta, região e estilo. Marisco pode levar a Alvarinho, Arinto ou espumantes. Carnes podem abrir Douro, Dão ou tintos com estrutura.

## Linguagem de sala

Frases simples vendem melhor: "a acidez refresca o prato", "a estrutura acompanha o molho", "a bolha torna a combinação mais leve". São frases que qualquer pessoa da equipa consegue usar.

## FAQ

**Todos os pratos precisam de harmonização?**
Não. Prioriza os pratos estratégicos e aqueles onde o cliente mais pede ajuda.

**Isto aumenta o ticket médio?**
Sim, quando cria uma passagem natural para opções de maior valor.
$body$,
  'https://winerim.wine/blog/experiencia-cliente-restaurante.jpg', 'Harmonizações', 'Winerim', true, '2026-06-01T09:54:00+02:00', 'pt',
  'maridajes-carta-vinos-rentable',
  '[{"label":"Harmonizações","to":"/pt/biblioteca-vinho/harmonizacoes","type":"resource"},{"label":"Gerador de harmonizações","to":"/pt/wine-pairing-generator","type":"tool"},{"label":"Demo","to":"/pt/demo","type":"solution"}]'::jsonb,
  NOW()
)
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
  updated_at = NOW();