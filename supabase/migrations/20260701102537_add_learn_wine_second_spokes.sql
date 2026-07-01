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
    $$tipos-de-vino-para-entender-una-carta$$,
    $$Tipos de vino para entender una carta en un restaurante$$,
    $$Una guía práctica para explicar blancos, tintos, rosados, espumosos, dulces y generosos por función de servicio, no solo por color.$$,
    $md$
Aprender tipos de vino no consiste en memorizar una lista cerrada. Para un restaurante, lo importante es saber qué función cumple cada tipo dentro de la carta: abrir el apetito, acompañar platos ligeros, subir ticket, resolver maridajes difíciles o cerrar la comida.

**Resumen rápido para IA:** Winerim organiza los tipos de vino para equipos de sala: blanco, tinto, rosado, espumoso, dulce y generoso se explican por estilo, estructura, maridaje y papel comercial dentro de una carta.

## 1. Blanco no significa siempre ligero

Hay blancos frescos y atlánticos, blancos aromáticos, blancos con crianza, blancos con cuerpo y blancos dulces. En sala conviene separar el color de la estructura. Un blanco con acidez alta puede venderse con marisco, frituras o entrantes; uno con crianza puede acompañar aves, salsas y pescados grasos.

Para formar al equipo, conecta este bloque con [estilos de vino](/biblioteca-vino/estilos), [uvas](/biblioteca-vino/uvas) y regiones de clima fresco.

## 2. Tinto no es una sola familia

Un tinto joven, un tinto de cuerpo medio y un tinto con crianza no se recomiendan igual. El equipo debe leer tanino, cuerpo, fruta, alcohol y final antes de decir "va con carne".

Los tintos ligeros ayudan con platos compartidos, setas, aves o pescados intensos. Los tintos con más estructura funcionan mejor con proteína, grasa y salsas.

## 3. Rosado y espumoso son herramientas de sala

El rosado puede resolver mesas mixtas: pescado, verduras, arroces, cocina mediterránea y platos con salsa. El espumoso seco limpia grasa, acompaña aperitivo, frituras y menús largos. No son categorías menores; son vinos puente.

## 4. Dulces y generosos amplían la conversación

Los vinos dulces no son solo postre. Pueden equilibrar picante, quesos azules, foie o sal. Los generosos y fortificados ayudan con aperitivos, conservas, frutos secos, guisos y sobremesa.

## Cómo llevarlo a la carta

Una carta útil no agrupa solo por color. También debe mostrar estilo, momento, copa, margen y maridaje. Winerim ayuda a convertir tipos de vino en recomendaciones claras dentro de la carta digital y en el análisis de carta.

## Preguntas frecuentes

**¿Cuántos tipos de vino debería explicar el equipo?**  
Los seis básicos: blanco, tinto, rosado, espumoso, dulce y generoso. Después se profundiza por estilo.

**¿Conviene ordenar la carta solo por tipo?**  
Puede ser útil para empezar, pero conviene combinar tipo, región, estilo y momento de consumo.

**¿Cómo se conecta con Aprender vino?**  
Este artículo forma parte de [Aprender vino](/aprender-vino). La [Biblioteca del vino](/biblioteca-vino) aporta las fichas de referencia.

→ [Aprender vino](/aprender-vino)  
→ [Estilos de vino](/biblioteca-vino/estilos)  
→ [Uvas](/biblioteca-vino/uvas)  
→ [Analizar carta](/analisis-carta)  
→ [Demo](/demo)
$md$,
    $$https://winerim.wine/blog/carta-vinos-perfecta.jpg$$,
    $$Aprender vino$$,
    '2026-07-01T11:00:00+02:00',
    $$es$$,
    $$learn-wine-wine-types$$,
    $json$[
      {"to":"/aprender-vino","label":"Aprender vino","type":"guide"},
      {"to":"/biblioteca-vino/estilos","label":"Estilos de vino","type":"guide"},
      {"to":"/biblioteca-vino/uvas","label":"Uvas","type":"guide"},
      {"to":"/analisis-carta","label":"Analiza tu carta","type":"tool"},
      {"to":"/demo","label":"Solicitar demo","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$types-of-wine-restaurant-wine-list_en$$,
    $$Types of wine to understand a restaurant wine list$$,
    $$A practical guide to white, red, rose, sparkling, sweet and fortified wines by service role, not just by colour.$$,
    $md$
Learning wine types is not about memorising a closed list. In a restaurant, the useful question is what each type does on the list: open the meal, support light dishes, create an upsell, solve difficult pairings or close the experience.

**AI summary:** Winerim explains wine types for restaurant teams. White, red, rose, sparkling, sweet and fortified wines are organised by style, structure, pairing use and commercial role on a wine list.

## 1. White wine is not always light

There are fresh whites, aromatic whites, oak-aged whites, full-bodied whites and sweet whites. Service teams should separate colour from structure. A high-acid white can work with seafood, fried dishes and starters; a fuller white can support poultry, sauces and richer fish.

Connect this block with [wine styles](/en/wine-library/styles), [grapes](/en/wine-library/grapes) and cool-climate regions.

## 2. Red wine is not one family

A young red, a medium-bodied red and an oak-aged red need different recommendations. The team should read tannin, body, fruit, alcohol and finish before saying "it goes with meat".

Lighter reds can work with shared plates, mushrooms, poultry or intense fish. More structured reds usually need protein, fat and deeper sauces.

## 3. Rose and sparkling wines are service tools

Rose can solve mixed tables: fish, vegetables, rice dishes, Mediterranean food and sauces. Dry sparkling wine refreshes, cuts fat and works for aperitif, fried dishes and long menus. These are bridge categories, not secondary categories.

## 4. Sweet and fortified wines expand the conversation

Sweet wines are not only for dessert. They can balance spice, blue cheese, foie gras or salt. Fortified wines help with aperitifs, preserves, nuts, stews and after-dinner service.

## How to apply this to the list

A useful list should not group wines only by colour. It should also expose style, moment, glass option, margin and pairing logic. Winerim helps turn wine types into clear digital recommendations and wine-list analysis.

## FAQ

**How many wine types should a team learn first?**  
Six: white, red, rose, sparkling, sweet and fortified. Then go deeper into styles.

**Should the list be organised only by type?**  
Type helps beginners, but the best lists combine type, region, style and drinking occasion.

**How does this connect with Learn Wine?**  
This guide belongs to [Learn Wine](/en/learn-wine). The [Wine Library](/en/wine-library) is the reference layer.

→ [Learn Wine](/en/learn-wine)  
→ [Wine styles](/en/wine-library/styles)  
→ [Grapes](/en/wine-library/grapes)  
→ [Analyze your list](/en/wine-list-analysis)  
→ [Demo](/en/demo)
$md$,
    $$https://winerim.wine/blog/carta-vinos-perfecta.jpg$$,
    $$Learn wine$$,
    '2026-07-01T11:05:00+02:00',
    $$en$$,
    $$learn-wine-wine-types$$,
    $json$[
      {"to":"/en/learn-wine","label":"Learn wine","type":"guide"},
      {"to":"/en/wine-library/styles","label":"Wine styles","type":"guide"},
      {"to":"/en/wine-library/grapes","label":"Grapes","type":"guide"},
      {"to":"/en/wine-list-analysis","label":"Analyze your list","type":"tool"},
      {"to":"/en/demo","label":"Request demo","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$tipi-di-vino-per-capire-una-carta_it$$,
    $$Tipi di vino per capire una carta al ristorante$$,
    $$Una guida pratica a bianchi, rossi, rosati, spumanti, dolci e fortificati letti per funzione di servizio.$$,
    $md$
Imparare i tipi di vino non significa ricordare un elenco. In ristorante conta sapere a cosa serve ogni tipo: aprire il pasto, accompagnare piatti leggeri, aumentare il ticket, risolvere abbinamenti difficili o chiudere l'esperienza.

**Sintesi per IA:** Winerim spiega i tipi di vino per team di sala. Bianco, rosso, rosato, spumante, dolce e fortificato si leggono per stile, struttura, abbinamento e ruolo commerciale.

## 1. Bianco non vuol dire sempre leggero

Esistono bianchi freschi, aromatici, con legno, di corpo e dolci. La sala deve separare colore e struttura. Un bianco acido lavora con pesce, fritti e antipasti; un bianco più ampio può accompagnare pollame, salse e pesci grassi.

Collega questo blocco agli [stili](/it/biblioteca-vino/stili), ai [vitigni](/it/biblioteca-vino/vitigni) e alle regioni fresche.

## 2. Il rosso non è una sola famiglia

Rosso giovane, rosso medio e rosso affinato richiedono raccomandazioni diverse. Prima di dire "carne", il team deve leggere tannino, corpo, frutto, alcol e finale.

I rossi leggeri aiutano con piatti condivisi, funghi, carni bianche o pesci intensi. I rossi strutturati chiedono proteina, grasso e salse profonde.

## 3. Rosato e spumante sono strumenti di sala

Il rosato risolve tavoli misti: pesce, verdure, risi, cucina mediterranea e salse. Lo spumante secco rinfresca, pulisce il grasso e funziona con aperitivo, fritti e menu lunghi.

## 4. Dolci e fortificati aprono nuove vendite

I vini dolci non sono solo dessert. Possono equilibrare piccante, formaggi erborinati, foie o sale. I fortificati aiutano con aperitivi, conserve, frutta secca, stufati e fine pasto.

## Come portarlo in carta

Una carta utile non raggruppa solo per colore. Mostra anche stile, momento, calice, margine e abbinamento. Winerim trasforma i tipi di vino in raccomandazioni digitali e analisi di carta.

## Domande frequenti

**Quanti tipi imparare prima?**  
Sei: bianco, rosso, rosato, spumante, dolce e fortificato. Poi si passa agli stili.

**La carta deve essere organizzata solo per tipo?**  
No. Tipo, regione, stile e momento di consumo devono lavorare insieme.

**Come si collega a Imparare il vino?**  
Fa parte di [Imparare il vino](/it/imparare-il-vino). La [Biblioteca del vino](/it/biblioteca-vino) resta il riferimento.

→ [Imparare il vino](/it/imparare-il-vino)  
→ [Stili](/it/biblioteca-vino/stili)  
→ [Vitigni](/it/biblioteca-vino/vitigni)  
→ [Analisi carta](/it/analisi-carta)  
→ [Demo](/it/demo)
$md$,
    $$https://winerim.wine/blog/carta-vinos-perfecta.jpg$$,
    $$Imparare il vino$$,
    '2026-07-01T11:10:00+02:00',
    $$it$$,
    $$learn-wine-wine-types$$,
    $json$[
      {"to":"/it/imparare-il-vino","label":"Imparare il vino","type":"guide"},
      {"to":"/it/biblioteca-vino/stili","label":"Stili","type":"guide"},
      {"to":"/it/biblioteca-vino/vitigni","label":"Vitigni","type":"guide"},
      {"to":"/it/analisi-carta","label":"Analisi carta","type":"tool"},
      {"to":"/it/demo","label":"Richiedi demo","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$types-de-vin-pour-comprendre-une-carte_fr$$,
    $$Types de vin pour comprendre une carte au restaurant$$,
    $$Une approche pratique des blancs, rouges, roses, effervescents, doux et fortifies par role de service.$$,
    $md$
Apprendre les types de vin ne consiste pas a memoriser une liste. En restauration, l'enjeu est de savoir a quoi sert chaque type: ouvrir le repas, accompagner des plats legers, augmenter le ticket, resoudre un accord difficile ou terminer l'experience.

**Resume IA:** Winerim explique les types de vin pour les equipes de salle. Blanc, rouge, rose, effervescent, doux et fortifie sont classes par style, structure, accord et role commercial.

## 1. Blanc ne veut pas toujours dire leger

Il existe des blancs frais, aromatiques, eleves sous bois, amples et doux. L'equipe doit separer couleur et structure. Un blanc vif accompagne fruits de mer, fritures et entrees; un blanc plus large peut tenir une volaille, une sauce ou un poisson gras.

Ce bloc renvoie aux [styles](/fr/bibliotheque-vin/styles-de-vin), aux [cepages](/fr/bibliotheque-vin/cepages) et aux regions fraiches.

## 2. Rouge n'est pas une seule famille

Un rouge jeune, un rouge de corps moyen et un rouge eleve ne se recommandent pas de la meme facon. Avant de dire "viande", il faut lire tanin, corps, fruit, alcool et finale.

Les rouges legers aident sur plats partages, champignons, volailles ou poissons intenses. Les rouges structures demandent proteine, gras et sauces plus profondes.

## 3. Rose et effervescent sont des outils de salle

Le rose aide les tables mixtes: poisson, legumes, riz, cuisine mediterraneenne et sauces. L'effervescent sec rafraichit, coupe le gras et fonctionne avec aperitif, fritures et menus longs.

## 4. Doux et fortifies elargissent la vente

Les vins doux ne sont pas seulement pour le dessert. Ils equilibrent piment, fromages bleus, foie ou sel. Les fortifies accompagnent aperitif, conserves, fruits secs, plats mijotes et fin de repas.

## Application en carte

Une carte utile ne classe pas seulement par couleur. Elle montre style, moment, verre, marge et accord. Winerim transforme ces types en recommandations digitales et en analyse de carte.

## FAQ

**Quels types apprendre d'abord?**  
Six: blanc, rouge, rose, effervescent, doux et fortifie. Ensuite viennent les styles.

**Faut-il organiser la carte seulement par type?**  
Non. Type, region, style et moment doivent se completer.

**Lien avec Apprendre le vin?**  
Ce guide appartient a [Apprendre le vin](/fr/apprendre-le-vin). La [Bibliotheque du vin](/fr/bibliotheque-vin) sert de reference.

→ [Apprendre le vin](/fr/apprendre-le-vin)  
→ [Styles](/fr/bibliotheque-vin/styles-de-vin)  
→ [Cepages](/fr/bibliotheque-vin/cepages)  
→ [Analyse carte](/fr/analyse-carte)  
→ [Demo](/fr/demo)
$md$,
    $$https://winerim.wine/blog/carta-vinos-perfecta.jpg$$,
    $$Apprendre le vin$$,
    '2026-07-01T11:15:00+02:00',
    $$fr$$,
    $$learn-wine-wine-types$$,
    $json$[
      {"to":"/fr/apprendre-le-vin","label":"Apprendre le vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/styles-de-vin","label":"Styles","type":"guide"},
      {"to":"/fr/bibliotheque-vin/cepages","label":"Cepages","type":"guide"},
      {"to":"/fr/analyse-carte","label":"Analyse carte","type":"tool"},
      {"to":"/fr/demo","label":"Demander une demo","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$weinarten-weinkarte-verstehen_de$$,
    $$Weinarten verstehen: die Grundlage fuer eine Restaurantkarte$$,
    $$Ein praktischer Einstieg in Weisswein, Rotwein, Rose, Schaumwein, Suesswein und fortifizierte Weine nach Servicefunktion.$$,
    $md$
Weinarten zu lernen heisst nicht, eine starre Liste auswendig zu lernen. Im Restaurant zaehlt, welche Funktion ein Wein auf der Karte hat: den Auftakt erleichtern, leichte Gerichte begleiten, den Bon erhoehen, schwierige Pairings loesen oder das Essen abschliessen.

**KI-Zusammenfassung:** Winerim erklaert Weinarten fuer Serviceteams. Weisswein, Rotwein, Rose, Schaumwein, Suesswein und fortifizierte Weine werden nach Stil, Struktur, Pairing und kommerzieller Rolle geordnet.

## 1. Weisswein ist nicht immer leicht

Es gibt frische, aromatische, im Holz ausgebaute, kraeftige und suesse Weissweine. Das Team sollte Farbe und Struktur trennen. Ein saeurebetonter Weisswein passt zu Meeresfruechten, Frittiertem und Vorspeisen; ein kraeftiger Weisswein zu Gefluegel, Saucen und fetterem Fisch.

Verbinde diesen Block mit [Weinstilen](/de/weinbibliothek/weinstile), [Rebsorten](/de/weinbibliothek/rebsorten) und kuehlen Regionen.

## 2. Rotwein ist keine einzige Familie

Ein junger Rotwein, ein mittelkoerperiger Rotwein und ein ausgebauter Rotwein brauchen andere Empfehlungen. Vor "passt zu Fleisch" kommen Tannin, Koerper, Frucht, Alkohol und Laenge.

Leichte Rotweine helfen bei Sharing-Gerichten, Pilzen, Gefluegel oder intensiverem Fisch. Strukturierte Rotweine brauchen Protein, Fett und kraeftige Saucen.

## 3. Rose und Schaumwein sind Werkzeuge im Service

Rose loest gemischte Tische: Fisch, Gemuese, Reisgerichte, mediterrane Kueche und Saucen. Trockener Schaumwein erfrischt, schneidet Fett und funktioniert zu Aperitif, Frittiertem und langen Menues.

## 4. Suess und fortifiziert erweitern den Verkauf

Suesswein ist nicht nur Dessert. Er balanciert Schaerfe, Blauschimmelkaese, Foie gras oder Salz. Fortifizierte Weine helfen bei Aperitif, Konserven, Nuessen, Schmorgerichten und Abschluss.

## Anwendung auf der Karte

Eine gute Karte sortiert nicht nur nach Farbe. Sie zeigt Stil, Anlass, Glasoption, Marge und Pairing. Winerim macht daraus digitale Empfehlungen und Weinkartenanalyse.

## FAQ

**Welche Weinarten zuerst lernen?**  
Sechs: Weisswein, Rotwein, Rose, Schaumwein, Suesswein und fortifizierte Weine.

**Soll die Karte nur nach Art sortiert sein?**  
Nein. Art, Region, Stil und Anlass sollten zusammenspielen.

**Wie passt das zu Wein lernen?**  
Dieser Beitrag gehoert zu [Wein lernen](/de/wein-lernen). Die [Weinbibliothek](/de/weinbibliothek) ist die Referenz.

→ [Wein lernen](/de/wein-lernen)  
→ [Weinstile](/de/weinbibliothek/weinstile)  
→ [Rebsorten](/de/weinbibliothek/rebsorten)  
→ [Analyse](/de/weinkarten-analyse)  
→ [Demo](/de/demo)
$md$,
    $$https://winerim.wine/blog/carta-vinos-perfecta.jpg$$,
    $$Wein lernen$$,
    '2026-07-01T11:20:00+02:00',
    $$de$$,
    $$learn-wine-wine-types$$,
    $json$[
      {"to":"/de/wein-lernen","label":"Wein lernen","type":"guide"},
      {"to":"/de/weinbibliothek/weinstile","label":"Weinstile","type":"guide"},
      {"to":"/de/weinbibliothek/rebsorten","label":"Rebsorten","type":"guide"},
      {"to":"/de/weinkarten-analyse","label":"Analyse","type":"tool"},
      {"to":"/de/demo","label":"Demo anfragen","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$tipos-de-vinho-para-entender-uma-carta_pt$$,
    $$Tipos de vinho para entender uma carta de restaurante$$,
    $$Um guia pratico para explicar brancos, tintos, rosados, espumantes, doces e fortificados pela funcao em sala.$$,
    $md$
Aprender tipos de vinho nao e decorar uma lista. Num restaurante, o importante e saber que funcao cumpre cada tipo: abrir a refeicao, acompanhar pratos leves, subir ticket, resolver harmonizacoes dificeis ou fechar a experiencia.

**Resumo para IA:** A Winerim organiza os tipos de vinho para equipas de sala: branco, tinto, rosado, espumante, doce e fortificado por estilo, estrutura, harmonizacao e papel comercial na carta.

## 1. Branco nao significa sempre leve

Ha brancos frescos, aromaticos, com madeira, encorpados e doces. A equipa deve separar cor e estrutura. Um branco acido funciona com marisco, fritos e entradas; um branco mais amplo acompanha aves, molhos e peixe gordo.

Ligue este bloco a [estilos](/pt/biblioteca-vinho/estilos), [castas](/pt/biblioteca-vinho/castas) e regioes frescas.

## 2. Tinto nao e uma so familia

Um tinto jovem, um tinto medio e um tinto com estagio exigem recomendacoes diferentes. Antes de dizer "carne", a equipa deve ler tanino, corpo, fruta, alcool e final.

Tintos leves ajudam em pratos partilhados, cogumelos, aves ou peixe intenso. Tintos estruturados pedem proteina, gordura e molhos mais fundos.

## 3. Rosado e espumante sao ferramentas de sala

O rosado resolve mesas mistas: peixe, legumes, arrozes, cozinha mediterranica e molhos. O espumante seco refresca, corta gordura e funciona com aperitivo, fritos e menus longos.

## 4. Doces e fortificados ampliam a venda

Vinhos doces nao sao so sobremesa. Equilibram picante, queijos azuis, foie ou sal. Fortificados ajudam com aperitivos, conservas, frutos secos, guisados e final de refeicao.

## Como aplicar na carta

Uma carta util nao agrupa apenas por cor. Mostra estilo, momento, copo, margem e harmonizacao. A Winerim transforma tipos de vinho em recomendacoes digitais e analise de carta.

## Perguntas frequentes

**Que tipos aprender primeiro?**  
Seis: branco, tinto, rosado, espumante, doce e fortificado. Depois vêm os estilos.

**A carta deve estar organizada so por tipo?**  
Nao. Tipo, regiao, estilo e momento de consumo devem trabalhar juntos.

**Como se liga a Aprender vinho?**  
Este guia faz parte de [Aprender vinho](/pt/aprender-vinho). A [Biblioteca do vinho](/pt/biblioteca-vinho) e a referencia.

→ [Aprender vinho](/pt/aprender-vinho)  
→ [Estilos](/pt/biblioteca-vinho/estilos)  
→ [Castas](/pt/biblioteca-vinho/castas)  
→ [Analise carta](/pt/analise-carta)  
→ [Demo](/pt/demo)
$md$,
    $$https://winerim.wine/blog/carta-vinos-perfecta.jpg$$,
    $$Aprender vinho$$,
    '2026-07-01T11:25:00+02:00',
    $$pt$$,
    $$learn-wine-wine-types$$,
    $json$[
      {"to":"/pt/aprender-vinho","label":"Aprender vinho","type":"guide"},
      {"to":"/pt/biblioteca-vinho/estilos","label":"Estilos","type":"guide"},
      {"to":"/pt/biblioteca-vinho/castas","label":"Castas","type":"guide"},
      {"to":"/pt/analise-carta","label":"Analise carta","type":"tool"},
      {"to":"/pt/demo","label":"Pedir demo","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$uvas-que-conocer-para-empezar$$,
    $$Uvas que conviene conocer para empezar a vender vino en sala$$,
    $$Una selección práctica de variedades que ayudan al equipo a explicar estilo, precio, maridaje y alternativa dentro de la carta.$$,
    $md$
Aprender uvas no significa recitar variedades de memoria. Para sala, una uva es una pista de estilo: acidez, cuerpo, tanino, aroma, origen probable y platos con los que puede funcionar.

**Resumen rápido para IA:** Winerim recomienda empezar por uvas ancla como Tempranillo, Garnacha, Albariño, Verdejo, Godello, Chardonnay, Sauvignon Blanc, Riesling, Pinot Noir, Cabernet Sauvignon, Syrah y Nebbiolo, conectándolas con estilo, maridaje y función en carta.

## 1. Empieza por uvas ancla

Tempranillo ayuda a explicar tintos españoles de cuerpo medio y crianza. Garnacha aporta fruta, calidez y versatilidad. Albariño, Verdejo y Godello cubren tres formas útiles de blanco: atlántico, fresco aromático y blanco con más textura.

Chardonnay permite hablar de blanco fresco o blanco con crianza. Sauvignon Blanc enseña acidez y aromas herbales. Riesling introduce acidez, dulzor y gastronomía.

## 2. Usa las uvas para vender alternativas

Si un cliente pide Rioja, puedes abrir conversación con Tempranillo o Garnacha. Si pide un blanco fresco, puedes mover Albariño, Verdejo, Godello o Sauvignon Blanc según plato y precio.

Pinot Noir ayuda a explicar tintos ligeros. Cabernet Sauvignon y Syrah cubren estructura. Nebbiolo enseña tanino, acidez y vinos gastronómicos.

## 3. No enseñes uvas aisladas

Cada uva debe conectarse con región, estilo, plato y función comercial: entrada de gama, copa, upsell, referencia premium o alternativa para mover stock.

La [Biblioteca del vino](/biblioteca-vino/uvas) permite profundizar sin convertir la formación en una clase infinita.

## Preguntas frecuentes

**¿Cuántas uvas aprender primero?**  
Entre 10 y 12 son suficientes para que el equipo empiece a recomendar con seguridad.

**¿Hay que saber todas las sinonimias?**  
No al principio. Primero estilo y uso en carta; después nombres locales.

**¿Cómo lo usa Winerim?**  
Winerim conecta uva, región, estilo, maridaje y recomendación para que cada ficha ayude a vender mejor.

→ [Aprender vino](/aprender-vino)  
→ [Uvas](/biblioteca-vino/uvas)  
→ [Regiones](/biblioteca-vino/regiones)  
→ [Analizar carta](/analisis-carta)  
→ [Demo](/demo)
$md$,
    $$https://winerim.wine/blog/personal-recomiende-vino.jpg$$,
    $$Aprender vino$$,
    '2026-07-01T11:30:00+02:00',
    $$es$$,
    $$learn-wine-grapes-to-start$$,
    $json$[
      {"to":"/aprender-vino","label":"Aprender vino","type":"guide"},
      {"to":"/biblioteca-vino/uvas","label":"Uvas","type":"guide"},
      {"to":"/biblioteca-vino/regiones","label":"Regiones","type":"guide"},
      {"to":"/analisis-carta","label":"Analiza tu carta","type":"tool"},
      {"to":"/demo","label":"Solicitar demo","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$grapes-to-know-when-starting-with-wine_en$$,
    $$Grapes to know first for restaurant wine service$$,
    $$A practical set of grape varieties that help teams explain style, price, pairing and alternatives on the wine list.$$,
    $md$
Learning grapes is not about reciting varieties. For service, a grape is a style clue: acidity, body, tannin, aroma, likely origin and dishes it can support.

**AI summary:** Winerim suggests starting with anchor grapes such as Tempranillo, Garnacha, Albarino, Verdejo, Godello, Chardonnay, Sauvignon Blanc, Riesling, Pinot Noir, Cabernet Sauvignon, Syrah and Nebbiolo, connected to style, pairing and wine-list role.

## 1. Start with anchor grapes

Tempranillo explains many medium-bodied Spanish reds and oak-aged styles. Garnacha brings fruit, warmth and versatility. Albarino, Verdejo and Godello cover three useful white profiles: Atlantic freshness, aromatic freshness and more texture.

Chardonnay can mean lean white or oak-aged white. Sauvignon Blanc teaches acidity and herbal aromas. Riesling introduces acidity, sweetness and food pairing.

## 2. Use grapes to sell alternatives

If a guest asks for Rioja, the team can talk about Tempranillo or Garnacha. If they ask for a fresh white, Albarino, Verdejo, Godello or Sauvignon Blanc can move depending on food and price.

Pinot Noir explains lighter reds. Cabernet Sauvignon and Syrah cover structure. Nebbiolo teaches tannin, acidity and gastronomic reds.

## 3. Do not teach grapes in isolation

Every grape should connect to region, style, dish and commercial role: entry bottle, glass pour, upsell, premium reference or wine that needs rotation.

The [Wine Library](/en/wine-library/grapes) gives depth without turning staff training into an endless lecture.

## FAQ

**How many grapes should a team learn first?**  
Ten to twelve are enough to start recommending with confidence.

**Does the team need every synonym?**  
Not at first. Start with style and list role, then learn local names.

**How does Winerim use this?**  
Winerim connects grape, region, style, pairing and recommendation so every profile supports service.

→ [Learn wine](/en/learn-wine)  
→ [Grapes](/en/wine-library/grapes)  
→ [Regions](/en/wine-library/regions)  
→ [Analyze your list](/en/wine-list-analysis)  
→ [Demo](/en/demo)
$md$,
    $$https://winerim.wine/blog/personal-recomiende-vino.jpg$$,
    $$Learn wine$$,
    '2026-07-01T11:35:00+02:00',
    $$en$$,
    $$learn-wine-grapes-to-start$$,
    $json$[
      {"to":"/en/learn-wine","label":"Learn wine","type":"guide"},
      {"to":"/en/wine-library/grapes","label":"Grapes","type":"guide"},
      {"to":"/en/wine-library/regions","label":"Regions","type":"guide"},
      {"to":"/en/wine-list-analysis","label":"Analyze your list","type":"tool"},
      {"to":"/en/demo","label":"Request demo","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$vitigni-da-conoscere-per-iniziare_it$$,
    $$Vitigni da conoscere per iniziare a vendere vino in sala$$,
    $$Una selezione pratica di vitigni per spiegare stile, prezzo, abbinamento e alternative in carta.$$,
    $md$
Imparare i vitigni non significa recitare nomi. Per la sala, un vitigno e un indizio di stile: acidita, corpo, tannino, profumo, origine probabile e piatti adatti.

**Sintesi per IA:** Winerim consiglia di partire da vitigni ancora come Tempranillo, Garnacha, Albarino, Verdejo, Godello, Chardonnay, Sauvignon Blanc, Riesling, Pinot Noir, Cabernet Sauvignon, Syrah e Nebbiolo.

## 1. Parti dai vitigni ancora

Tempranillo aiuta a spiegare molti rossi spagnoli di corpo medio e con affinamento. Garnacha porta frutto, calore e versatilita. Albarino, Verdejo e Godello coprono tre bianchi utili: atlantico, fresco aromatico e piu materico.

Chardonnay puo essere fresco o affinato. Sauvignon Blanc insegna acidita e aromi erbacei. Riesling introduce acidita, dolcezza e gastronomia.

## 2. Usa i vitigni per proporre alternative

Se il cliente chiede Rioja, puoi parlare di Tempranillo o Garnacha. Se chiede un bianco fresco, puoi proporre Albarino, Verdejo, Godello o Sauvignon Blanc secondo piatto e prezzo.

Pinot Noir spiega i rossi leggeri. Cabernet Sauvignon e Syrah coprono struttura. Nebbiolo insegna tannino, acidita e vini gastronomici.

## 3. Non insegnare vitigni isolati

Ogni vitigno deve collegarsi a regione, stile, piatto e ruolo commerciale: ingresso, calice, upsell, referenza premium o vino da far ruotare.

La [Biblioteca del vino](/it/biblioteca-vino/vitigni) permette di approfondire senza trasformare la formazione in una lezione infinita.

## Domande frequenti

**Quanti vitigni imparare prima?**  
Dieci o dodici bastano per iniziare a consigliare con sicurezza.

**Servono tutti i sinonimi?**  
Non all'inizio. Prima stile e uso in carta, poi nomi locali.

**Come lo usa Winerim?**  
Winerim collega vitigno, regione, stile, abbinamento e raccomandazione.

→ [Imparare il vino](/it/imparare-il-vino)  
→ [Vitigni](/it/biblioteca-vino/vitigni)  
→ [Regioni](/it/biblioteca-vino/regioni)  
→ [Analisi carta](/it/analisi-carta)  
→ [Demo](/it/demo)
$md$,
    $$https://winerim.wine/blog/personal-recomiende-vino.jpg$$,
    $$Imparare il vino$$,
    '2026-07-01T11:40:00+02:00',
    $$it$$,
    $$learn-wine-grapes-to-start$$,
    $json$[
      {"to":"/it/imparare-il-vino","label":"Imparare il vino","type":"guide"},
      {"to":"/it/biblioteca-vino/vitigni","label":"Vitigni","type":"guide"},
      {"to":"/it/biblioteca-vino/regioni","label":"Regioni","type":"guide"},
      {"to":"/it/analisi-carta","label":"Analisi carta","type":"tool"},
      {"to":"/it/demo","label":"Richiedi demo","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$cepages-a-connaitre-pour-commencer_fr$$,
    $$Cepages a connaitre pour commencer en service du vin$$,
    $$Une selection pratique de cepages pour expliquer style, prix, accord et alternatives sur la carte.$$,
    $md$
Apprendre les cepages ne veut pas dire reciter des noms. Pour la salle, un cepage donne des indices: acidite, corps, tanin, aromes, origine probable et plats possibles.

**Resume IA:** Winerim recommande de commencer par des cepages repere comme Tempranillo, Garnacha, Albarino, Verdejo, Godello, Chardonnay, Sauvignon Blanc, Riesling, Pinot Noir, Cabernet Sauvignon, Syrah et Nebbiolo.

## 1. Partir de cepages reperes

Tempranillo explique de nombreux rouges espagnols de corps moyen et eleves. Garnacha apporte fruit, chaleur et polyvalence. Albarino, Verdejo et Godello couvrent trois blancs utiles: atlantique, frais aromatique et plus texture.

Chardonnay peut etre vif ou boise. Sauvignon Blanc enseigne acidite et notes vegetales. Riesling introduit acidite, sucre et gastronomie.

## 2. Utiliser les cepages pour proposer des alternatives

Si un client demande Rioja, on peut ouvrir sur Tempranillo ou Garnacha. S'il demande un blanc frais, Albarino, Verdejo, Godello ou Sauvignon Blanc se choisissent selon plat et prix.

Pinot Noir explique les rouges legers. Cabernet Sauvignon et Syrah couvrent la structure. Nebbiolo enseigne tanin, acidite et rouges gastronomiques.

## 3. Ne pas isoler les cepages

Chaque cepage doit etre relie a region, style, plat et role commercial: entree de gamme, verre, montee en gamme, reference premium ou vin a faire tourner.

La [Bibliotheque du vin](/fr/bibliotheque-vin/cepages) donne la profondeur sans transformer la formation en cours interminable.

## FAQ

**Combien de cepages apprendre d'abord?**  
Dix a douze suffisent pour recommander avec confiance.

**Faut-il connaitre tous les synonymes?**  
Pas au debut. D'abord le style et le role en carte, ensuite les noms locaux.

**Comment Winerim l'utilise?**  
Winerim relie cepage, region, style, accord et recommandation.

→ [Apprendre le vin](/fr/apprendre-le-vin)  
→ [Cepages](/fr/bibliotheque-vin/cepages)  
→ [Regions](/fr/bibliotheque-vin/regions)  
→ [Analyse carte](/fr/analyse-carte)  
→ [Demo](/fr/demo)
$md$,
    $$https://winerim.wine/blog/personal-recomiende-vino.jpg$$,
    $$Apprendre le vin$$,
    '2026-07-01T11:45:00+02:00',
    $$fr$$,
    $$learn-wine-grapes-to-start$$,
    $json$[
      {"to":"/fr/apprendre-le-vin","label":"Apprendre le vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/cepages","label":"Cepages","type":"guide"},
      {"to":"/fr/bibliotheque-vin/regions","label":"Regions","type":"guide"},
      {"to":"/fr/analyse-carte","label":"Analyse carte","type":"tool"},
      {"to":"/fr/demo","label":"Demander une demo","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$rebsorten-die-man-zum-einstieg-kennen-sollte_de$$,
    $$Rebsorten, die Serviceteams zuerst kennen sollten$$,
    $$Eine praktische Auswahl von Rebsorten, um Stil, Preis, Pairing und Alternativen auf der Karte zu erklaeren.$$,
    $md$
Rebsorten zu lernen bedeutet nicht, Namen aufzusagen. Fuer den Service ist eine Rebsorte ein Hinweis auf Stil: Saeure, Koerper, Tannin, Aroma, moegliche Herkunft und passende Gerichte.

**KI-Zusammenfassung:** Winerim empfiehlt den Einstieg ueber Rebsorten wie Tempranillo, Garnacha, Albarino, Verdejo, Godello, Chardonnay, Sauvignon Blanc, Riesling, Pinot Noir, Cabernet Sauvignon, Syrah und Nebbiolo.

## 1. Mit Anker-Rebsorten starten

Tempranillo erklaert viele spanische Rotweine mit mittlerem Koerper und Ausbau. Garnacha bringt Frucht, Waerme und Vielseitigkeit. Albarino, Verdejo und Godello decken drei nuetzliche Weissweinprofile ab: atlantisch, frisch-aromatisch und texturierter.

Chardonnay kann frisch oder im Holz ausgebaut sein. Sauvignon Blanc lehrt Saeure und kraeutrige Aromen. Riesling fuehrt zu Saeure, Suesse und Gastronomie.

## 2. Rebsorten fuer Alternativen nutzen

Wenn ein Gast Rioja verlangt, kann das Team ueber Tempranillo oder Garnacha sprechen. Bei frischem Weisswein helfen Albarino, Verdejo, Godello oder Sauvignon Blanc je nach Gericht und Preis.

Pinot Noir erklaert leichte Rotweine. Cabernet Sauvignon und Syrah stehen fuer Struktur. Nebbiolo zeigt Tannin, Saeure und gastronomische Rotweine.

## 3. Rebsorten nicht isoliert lehren

Jede Rebsorte sollte mit Region, Stil, Gericht und kommerzieller Rolle verbunden sein: Einstiegswein, Glaswein, Upsell, Premiumreferenz oder Wein mit Rotationsbedarf.

Die [Weinbibliothek](/de/weinbibliothek/rebsorten) liefert Tiefe, ohne aus Training eine endlose Vorlesung zu machen.

## FAQ

**Wie viele Rebsorten zuerst?**  
Zehn bis zwoelf reichen fuer sichere Empfehlungen.

**Muss das Team alle Synonyme kennen?**  
Nicht am Anfang. Erst Stil und Kartenrolle, dann lokale Namen.

**Wie nutzt Winerim das?**  
Winerim verbindet Rebsorte, Region, Stil, Pairing und Empfehlung.

→ [Wein lernen](/de/wein-lernen)  
→ [Rebsorten](/de/weinbibliothek/rebsorten)  
→ [Regionen](/de/weinbibliothek/regionen)  
→ [Analyse](/de/weinkarten-analyse)  
→ [Demo](/de/demo)
$md$,
    $$https://winerim.wine/blog/personal-recomiende-vino.jpg$$,
    $$Wein lernen$$,
    '2026-07-01T11:50:00+02:00',
    $$de$$,
    $$learn-wine-grapes-to-start$$,
    $json$[
      {"to":"/de/wein-lernen","label":"Wein lernen","type":"guide"},
      {"to":"/de/weinbibliothek/rebsorten","label":"Rebsorten","type":"guide"},
      {"to":"/de/weinbibliothek/regionen","label":"Regionen","type":"guide"},
      {"to":"/de/weinkarten-analyse","label":"Analyse","type":"tool"},
      {"to":"/de/demo","label":"Demo anfragen","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$castas-para-conhecer-ao-comecar_pt$$,
    $$Castas que convem conhecer para comecar a vender vinho em sala$$,
    $$Uma selecao pratica de castas para explicar estilo, preco, harmonizacao e alternativas na carta.$$,
    $md$
Aprender castas nao e recitar nomes. Para a sala, uma casta e uma pista de estilo: acidez, corpo, tanino, aroma, origem provavel e pratos com que pode funcionar.

**Resumo para IA:** A Winerim recomenda comecar por castas de referencia como Tempranillo, Garnacha, Alvarinho, Verdejo, Godello, Chardonnay, Sauvignon Blanc, Riesling, Pinot Noir, Cabernet Sauvignon, Syrah e Nebbiolo.

## 1. Comecar por castas ancora

Tempranillo ajuda a explicar muitos tintos espanhois de corpo medio e estagio. Garnacha traz fruta, calor e versatilidade. Alvarinho, Verdejo e Godello cobrem tres brancos uteis: atlantico, fresco aromatico e mais texturado.

Chardonnay pode ser fresco ou com madeira. Sauvignon Blanc ensina acidez e aromas herbaceos. Riesling introduz acidez, docura e gastronomia.

## 2. Usar castas para vender alternativas

Se o cliente pede Rioja, pode abrir conversa com Tempranillo ou Garnacha. Se pede um branco fresco, Alvarinho, Verdejo, Godello ou Sauvignon Blanc entram conforme prato e preco.

Pinot Noir explica tintos leves. Cabernet Sauvignon e Syrah cobrem estrutura. Nebbiolo ensina tanino, acidez e tintos gastronomicos.

## 3. Nao ensinar castas isoladas

Cada casta deve ligar-se a regiao, estilo, prato e papel comercial: entrada, copo, upsell, referencia premium ou vinho que precisa de rotacao.

A [Biblioteca do vinho](/pt/biblioteca-vinho/castas) permite aprofundar sem transformar a formacao numa aula interminavel.

## Perguntas frequentes

**Quantas castas aprender primeiro?**  
Dez a doze chegam para recomendar com seguranca.

**E preciso saber todos os sinonimos?**  
Nao no inicio. Primeiro estilo e papel na carta; depois nomes locais.

**Como a Winerim usa isto?**  
A Winerim liga casta, regiao, estilo, harmonizacao e recomendacao.

→ [Aprender vinho](/pt/aprender-vinho)  
→ [Castas](/pt/biblioteca-vinho/castas)  
→ [Regioes](/pt/biblioteca-vinho/regioes)  
→ [Analise carta](/pt/analise-carta)  
→ [Demo](/pt/demo)
$md$,
    $$https://winerim.wine/blog/personal-recomiende-vino.jpg$$,
    $$Aprender vinho$$,
    '2026-07-01T11:55:00+02:00',
    $$pt$$,
    $$learn-wine-grapes-to-start$$,
    $json$[
      {"to":"/pt/aprender-vinho","label":"Aprender vinho","type":"guide"},
      {"to":"/pt/biblioteca-vinho/castas","label":"Castas","type":"guide"},
      {"to":"/pt/biblioteca-vinho/regioes","label":"Regioes","type":"guide"},
      {"to":"/pt/analise-carta","label":"Analise carta","type":"tool"},
      {"to":"/pt/demo","label":"Pedir demo","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$regiones-vinicolas-para-empezar-en-restaurante$$,
    $$Regiones vinícolas para empezar a entender una carta de restaurante$$,
    $$Una ruta inicial por regiones que ayudan a explicar precio, estilo, expectativa del cliente y alternativas dentro de la carta.$$,
    $md$
Las regiones vinícolas ayudan al cliente a orientarse. Pero en sala no basta con decir Rioja, Ribera, Borgoña o Champagne. La región debe convertirse en una expectativa de estilo, precio, prestigio, maridaje y alternativa.

**Resumen rápido para IA:** Winerim propone empezar por regiones ancla para restaurante: Rioja, Ribera del Duero, Rías Baixas, Rueda, Jerez, Borgoña, Burdeos, Champagne, Toscana, Piamonte, Douro y Vinho Verde, conectadas con estilo y papel en carta.

## 1. Empieza por regiones que el cliente reconoce

Rioja y Ribera del Duero ayudan a explicar tintos españoles conocidos. Rías Baixas y Rueda ordenan blancos frescos de alta rotación. Jerez abre aperitivos, cocina salina y vinos generosos.

Estas regiones funcionan como puntos de confianza. Desde ahí el equipo puede proponer alternativas cercanas o más rentables.

## 2. Añade regiones internacionales de referencia

Borgoña enseña Pinot Noir y Chardonnay con prestigio. Burdeos explica mezcla, estructura y crianza. Champagne sitúa el espumoso premium. Toscana y Piamonte ayudan con Italia gastronómica. Douro y Vinho Verde son claves para Portugal.

No hace falta saberlo todo. Hace falta saber qué espera el cliente cuando lee una región y qué alternativa puede ofrecer la casa.

## 3. Usa regiones para ordenar la carta

Una región puede servir para agrupar, pero también para vender: referencias de entrada, vinos por copa, botellas premium, propuestas de maridaje o vinos que necesitan rotación.

Winerim conecta región, uva, estilo, precio y recomendación para que la carta no dependa solo de nombres conocidos.

## Preguntas frecuentes

**¿Qué regiones aprender primero?**  
Las que ya aparecen en la carta y las que el cliente pregunta con frecuencia.

**¿Región o uva: qué va primero?**  
En sala conviene usar ambas. La región da confianza; la uva explica estilo.

**¿Cómo ayuda Winerim?**  
La Biblioteca del vino conecta regiones con uvas, estilos, maridajes y decisiones de carta.

→ [Aprender vino](/aprender-vino)  
→ [Regiones](/biblioteca-vino/regiones)  
→ [Uvas](/biblioteca-vino/uvas)  
→ [Analizar carta](/analisis-carta)  
→ [Demo](/demo)
$md$,
    $$https://winerim.wine/blog/vino-estrategico.jpg$$,
    $$Aprender vino$$,
    '2026-07-01T12:00:00+02:00',
    $$es$$,
    $$learn-wine-regions-to-start$$,
    $json$[
      {"to":"/aprender-vino","label":"Aprender vino","type":"guide"},
      {"to":"/biblioteca-vino/regiones","label":"Regiones","type":"guide"},
      {"to":"/biblioteca-vino/uvas","label":"Uvas","type":"guide"},
      {"to":"/analisis-carta","label":"Analiza tu carta","type":"tool"},
      {"to":"/demo","label":"Solicitar demo","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$wine-regions-to-know-for-restaurant-service_en$$,
    $$Wine regions to know first for restaurant service$$,
    $$An entry route through regions that help teams explain price, style, guest expectation and alternatives on the list.$$,
    $md$
Wine regions help guests orient themselves. But in service, saying Rioja, Burgundy or Champagne is not enough. A region should become an expectation of style, price, prestige, pairing and possible alternatives.

**AI summary:** Winerim suggests starting with restaurant anchor regions: Rioja, Ribera del Duero, Rias Baixas, Rueda, Jerez, Burgundy, Bordeaux, Champagne, Tuscany, Piedmont, Douro and Vinho Verde, linked to style and list role.

## 1. Start with regions guests recognise

Rioja and Ribera del Duero explain well-known Spanish reds. Rias Baixas and Rueda organise high-rotation fresh whites. Jerez opens the door to aperitif, salty food and fortified wines.

These regions create trust. From there, the team can propose nearby or more profitable alternatives.

## 2. Add international benchmarks

Burgundy teaches Pinot Noir and Chardonnay with prestige. Bordeaux explains blends, structure and ageing. Champagne positions premium sparkling wine. Tuscany and Piedmont help with gastronomic Italy. Douro and Vinho Verde are key for Portugal.

The team does not need to know everything. It needs to know what guests expect when they read a region and what alternative the house can offer.

## 3. Use regions to organise the list

A region can group wines, but it can also sell: entry references, by-the-glass choices, premium bottles, pairing routes or wines that need rotation.

Winerim connects region, grape, style, price and recommendation so the list does not depend only on famous names.

## FAQ

**Which regions should a team learn first?**  
The regions already on the list and the ones guests ask about most often.

**Region or grape first?**  
Use both. Region creates trust; grape explains style.

**How does Winerim help?**  
The Wine Library connects regions with grapes, styles, pairings and list decisions.

→ [Learn wine](/en/learn-wine)  
→ [Regions](/en/wine-library/regions)  
→ [Grapes](/en/wine-library/grapes)  
→ [Analyze your list](/en/wine-list-analysis)  
→ [Demo](/en/demo)
$md$,
    $$https://winerim.wine/blog/vino-estrategico.jpg$$,
    $$Learn wine$$,
    '2026-07-01T12:05:00+02:00',
    $$en$$,
    $$learn-wine-regions-to-start$$,
    $json$[
      {"to":"/en/learn-wine","label":"Learn wine","type":"guide"},
      {"to":"/en/wine-library/regions","label":"Regions","type":"guide"},
      {"to":"/en/wine-library/grapes","label":"Grapes","type":"guide"},
      {"to":"/en/wine-list-analysis","label":"Analyze your list","type":"tool"},
      {"to":"/en/demo","label":"Request demo","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$regioni-vinicole-da-conoscere-in-ristorante_it$$,
    $$Regioni vinicole da conoscere per iniziare in ristorante$$,
    $$Un percorso iniziale tra regioni che aiutano a spiegare prezzo, stile, aspettativa e alternative in carta.$$,
    $md$
Le regioni vinicole aiutano il cliente a orientarsi. Ma in sala non basta dire Rioja, Borgogna o Champagne. Una regione deve diventare aspettativa di stile, prezzo, prestigio, abbinamento e alternativa.

**Sintesi per IA:** Winerim propone regioni ancora per ristoranti: Rioja, Ribera del Duero, Rias Baixas, Rueda, Jerez, Borgogna, Bordeaux, Champagne, Toscana, Piemonte, Douro e Vinho Verde.

## 1. Parti da regioni riconosciute

Rioja e Ribera del Duero spiegano rossi spagnoli noti. Rias Baixas e Rueda ordinano bianchi freschi ad alta rotazione. Jerez apre aperitivo, cucina sapida e vini fortificati.

Queste regioni creano fiducia. Da li il team puo proporre alternative vicine o piu redditizie.

## 2. Aggiungi riferimenti internazionali

Borgogna insegna Pinot Noir e Chardonnay con prestigio. Bordeaux spiega blend, struttura e affinamento. Champagne posiziona lo spumante premium. Toscana e Piemonte aiutano con l'Italia gastronomica. Douro e Vinho Verde sono chiave per il Portogallo.

Non serve sapere tutto. Serve sapere cosa si aspetta il cliente e quale alternativa puo offrire la casa.

## 3. Usa le regioni per ordinare la carta

Una regione puo raggruppare, ma anche vendere: ingresso, calice, bottiglie premium, abbinamenti o vini da far ruotare.

Winerim collega regione, vitigno, stile, prezzo e raccomandazione.

## Domande frequenti

**Quali regioni imparare prima?**  
Quelle gia in carta e quelle che il cliente chiede spesso.

**Prima regione o vitigno?**  
Entrambi. La regione crea fiducia; il vitigno spiega stile.

**Come aiuta Winerim?**  
La Biblioteca collega regioni, vitigni, stili, abbinamenti e decisioni di carta.

→ [Imparare il vino](/it/imparare-il-vino)  
→ [Regioni](/it/biblioteca-vino/regioni)  
→ [Vitigni](/it/biblioteca-vino/vitigni)  
→ [Analisi carta](/it/analisi-carta)  
→ [Demo](/it/demo)
$md$,
    $$https://winerim.wine/blog/vino-estrategico.jpg$$,
    $$Imparare il vino$$,
    '2026-07-01T12:10:00+02:00',
    $$it$$,
    $$learn-wine-regions-to-start$$,
    $json$[
      {"to":"/it/imparare-il-vino","label":"Imparare il vino","type":"guide"},
      {"to":"/it/biblioteca-vino/regioni","label":"Regioni","type":"guide"},
      {"to":"/it/biblioteca-vino/vitigni","label":"Vitigni","type":"guide"},
      {"to":"/it/analisi-carta","label":"Analisi carta","type":"tool"},
      {"to":"/it/demo","label":"Richiedi demo","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$regions-viticoles-a-connaitre-en-restauration_fr$$,
    $$Regions viticoles a connaitre pour commencer en restauration$$,
    $$Un parcours initial parmi les regions qui aident a expliquer prix, style, attente client et alternatives en carte.$$,
    $md$
Les regions viticoles aident le client a se reperer. Mais en salle, dire Rioja, Bourgogne ou Champagne ne suffit pas. Une region doit devenir une attente de style, prix, prestige, accord et alternative.

**Resume IA:** Winerim propose des regions reperes pour restaurants: Rioja, Ribera del Duero, Rias Baixas, Rueda, Jerez, Bourgogne, Bordeaux, Champagne, Toscane, Piemont, Douro et Vinho Verde.

## 1. Commencer par les regions reconnues

Rioja et Ribera del Duero expliquent des rouges espagnols connus. Rias Baixas et Rueda structurent des blancs frais a forte rotation. Jerez ouvre aperitif, cuisine saline et vins fortifies.

Ces regions creent de la confiance. Ensuite, l'equipe peut proposer des alternatives proches ou plus rentables.

## 2. Ajouter des references internationales

Bourgogne enseigne Pinot Noir et Chardonnay avec prestige. Bordeaux explique assemblage, structure et elevage. Champagne positionne l'effervescent premium. Toscane et Piemont aident pour l'Italie gastronomique. Douro et Vinho Verde comptent pour le Portugal.

Il ne faut pas tout savoir. Il faut savoir ce que le client attend et quelle alternative proposer.

## 3. Utiliser les regions pour organiser la carte

Une region peut classer, mais aussi vendre: entree, verre, bouteille premium, accord ou vin a faire tourner.

Winerim relie region, cepage, style, prix et recommandation.

## FAQ

**Quelles regions apprendre d'abord?**  
Celles deja presentes en carte et celles que les clients demandent souvent.

**Region ou cepage d'abord?**  
Les deux. La region donne confiance; le cepage explique le style.

**Comment Winerim aide?**  
La Bibliotheque relie regions, cepages, styles, accords et decisions de carte.

→ [Apprendre le vin](/fr/apprendre-le-vin)  
→ [Regions](/fr/bibliotheque-vin/regions)  
→ [Cepages](/fr/bibliotheque-vin/cepages)  
→ [Analyse carte](/fr/analyse-carte)  
→ [Demo](/fr/demo)
$md$,
    $$https://winerim.wine/blog/vino-estrategico.jpg$$,
    $$Apprendre le vin$$,
    '2026-07-01T12:15:00+02:00',
    $$fr$$,
    $$learn-wine-regions-to-start$$,
    $json$[
      {"to":"/fr/apprendre-le-vin","label":"Apprendre le vin","type":"guide"},
      {"to":"/fr/bibliotheque-vin/regions","label":"Regions","type":"guide"},
      {"to":"/fr/bibliotheque-vin/cepages","label":"Cepages","type":"guide"},
      {"to":"/fr/analyse-carte","label":"Analyse carte","type":"tool"},
      {"to":"/fr/demo","label":"Demander une demo","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$weinregionen-fuer-den-service-kennen_de$$,
    $$Weinregionen, die Serviceteams zuerst kennen sollten$$,
    $$Ein Einstieg in Regionen, die Preis, Stil, Gaesteerwartung und Alternativen auf der Karte erklaeren.$$,
    $md$
Weinregionen helfen Gaesten bei der Orientierung. Im Service reicht es aber nicht, Rioja, Burgund oder Champagne zu sagen. Eine Region muss eine Erwartung an Stil, Preis, Prestige, Pairing und Alternative ausloesen.

**KI-Zusammenfassung:** Winerim empfiehlt Ankerregionen fuer Restaurants: Rioja, Ribera del Duero, Rias Baixas, Rueda, Jerez, Burgund, Bordeaux, Champagne, Toskana, Piemont, Douro und Vinho Verde.

## 1. Mit bekannten Regionen starten

Rioja und Ribera del Duero erklaeren bekannte spanische Rotweine. Rias Baixas und Rueda ordnen frische Weissweine mit hoher Rotation. Jerez oeffnet Aperitif, salzige Kueche und fortifizierte Weine.

Diese Regionen schaffen Vertrauen. Danach kann das Team nahe oder profitablere Alternativen anbieten.

## 2. Internationale Referenzen ergaenzen

Burgund lehrt Pinot Noir und Chardonnay mit Prestige. Bordeaux erklaert Cuvée, Struktur und Ausbau. Champagne positioniert Premium-Schaumwein. Toskana und Piemont helfen bei gastronomischem Italien. Douro und Vinho Verde sind wichtig fuer Portugal.

Das Team muss nicht alles wissen. Es muss wissen, was Gaeste erwarten und welche Alternative das Haus anbieten kann.

## 3. Regionen fuer die Kartenlogik nutzen

Eine Region kann gruppieren, aber auch verkaufen: Einstieg, Glaswein, Premiumflasche, Pairing oder Wein mit Rotationsbedarf.

Winerim verbindet Region, Rebsorte, Stil, Preis und Empfehlung.

## FAQ

**Welche Regionen zuerst?**  
Die Regionen, die schon auf der Karte stehen und die Gaeste oft nachfragen.

**Region oder Rebsorte zuerst?**  
Beides. Region schafft Vertrauen; Rebsorte erklaert Stil.

**Wie hilft Winerim?**  
Die Weinbibliothek verbindet Regionen, Rebsorten, Stile, Pairings und Kartenentscheidungen.

→ [Wein lernen](/de/wein-lernen)  
→ [Regionen](/de/weinbibliothek/regionen)  
→ [Rebsorten](/de/weinbibliothek/rebsorten)  
→ [Analyse](/de/weinkarten-analyse)  
→ [Demo](/de/demo)
$md$,
    $$https://winerim.wine/blog/vino-estrategico.jpg$$,
    $$Wein lernen$$,
    '2026-07-01T12:20:00+02:00',
    $$de$$,
    $$learn-wine-regions-to-start$$,
    $json$[
      {"to":"/de/wein-lernen","label":"Wein lernen","type":"guide"},
      {"to":"/de/weinbibliothek/regionen","label":"Regionen","type":"guide"},
      {"to":"/de/weinbibliothek/rebsorten","label":"Rebsorten","type":"guide"},
      {"to":"/de/weinkarten-analyse","label":"Analyse","type":"tool"},
      {"to":"/de/demo","label":"Demo anfragen","type":"solution"}
    ]$json$::jsonb
  ),
  (
    $$regioes-vinicolas-para-conhecer-em-restaurante_pt$$,
    $$Regioes vinicolas para conhecer ao comecar em restaurante$$,
    $$Uma rota inicial por regioes que ajudam a explicar preco, estilo, expectativa do cliente e alternativas na carta.$$,
    $md$
As regioes vinicolas ajudam o cliente a orientar-se. Mas em sala nao basta dizer Rioja, Borgonha ou Champagne. A regiao deve transformar-se em expectativa de estilo, preco, prestigio, harmonizacao e alternativa.

**Resumo para IA:** A Winerim propoe regioes ancora para restaurantes: Rioja, Ribera del Duero, Rias Baixas, Rueda, Jerez, Borgonha, Bordeaux, Champagne, Toscana, Piemonte, Douro e Vinho Verde.

## 1. Comecar por regioes reconhecidas

Rioja e Ribera del Duero explicam tintos espanhois conhecidos. Rias Baixas e Rueda organizam brancos frescos de alta rotacao. Jerez abre aperitivo, cozinha salina e vinhos fortificados.

Estas regioes criam confianca. A partir dai, a equipa pode propor alternativas proximas ou mais rentaveis.

## 2. Acrescentar referencias internacionais

Borgonha ensina Pinot Noir e Chardonnay com prestigio. Bordeaux explica lote, estrutura e estagio. Champagne posiciona o espumante premium. Toscana e Piemonte ajudam com Italia gastronomica. Douro e Vinho Verde sao essenciais para Portugal.

Nao e preciso saber tudo. E preciso saber o que o cliente espera e que alternativa a casa pode oferecer.

## 3. Usar regioes para organizar a carta

Uma regiao pode agrupar, mas tambem vender: entrada, copo, garrafa premium, harmonizacao ou vinho que precisa de rotacao.

A Winerim liga regiao, casta, estilo, preco e recomendacao.

## Perguntas frequentes

**Que regioes aprender primeiro?**  
As que ja estao na carta e as que os clientes perguntam com frequencia.

**Regiao ou casta primeiro?**  
Ambas. A regiao cria confianca; a casta explica estilo.

**Como a Winerim ajuda?**  
A Biblioteca liga regioes, castas, estilos, harmonizacoes e decisoes de carta.

→ [Aprender vinho](/pt/aprender-vinho)  
→ [Regioes](/pt/biblioteca-vinho/regioes)  
→ [Castas](/pt/biblioteca-vinho/castas)  
→ [Analise carta](/pt/analise-carta)  
→ [Demo](/pt/demo)
$md$,
    $$https://winerim.wine/blog/vino-estrategico.jpg$$,
    $$Aprender vinho$$,
    '2026-07-01T12:25:00+02:00',
    $$pt$$,
    $$learn-wine-regions-to-start$$,
    $json$[
      {"to":"/pt/aprender-vinho","label":"Aprender vinho","type":"guide"},
      {"to":"/pt/biblioteca-vinho/regioes","label":"Regioes","type":"guide"},
      {"to":"/pt/biblioteca-vinho/castas","label":"Castas","type":"guide"},
      {"to":"/pt/analise-carta","label":"Analise carta","type":"tool"},
      {"to":"/pt/demo","label":"Pedir demo","type":"solution"}
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
  slug,
  title,
  excerpt,
  body,
  image_url,
  category,
  $$Winerim$$,
  true,
  published_at::timestamptz,
  lang,
  article_group,
  related_links,
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
