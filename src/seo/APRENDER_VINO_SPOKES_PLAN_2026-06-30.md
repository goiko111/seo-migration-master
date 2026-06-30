# Aprender vino: first spoke batch

Date: 2026-06-30

## Facts

- `Aprender vino` is live as a separate hub from `Biblioteca del vino`.
- Canonical hub routes:
  - ES `/aprender-vino`
  - EN `/en/learn-wine`
  - IT `/it/imparare-il-vino`
  - FR `/fr/apprendre-le-vin`
  - DE `/de/wein-lernen`
  - PT `/pt/aprender-vinho`
- Blog article routes should remain localized:
  - ES `/article/{slug}`
  - EN `/en/article/{slug}`
  - IT `/it/article/{slug}`
  - FR `/fr/article/{slug}`
  - DE `/de/article/{slug}`
  - PT `/pt/article/{slug}`
- This cluster must not be treated as more entities inside `Biblioteca del vino`.

## Decisions

- The first batch should be practical, evergreen and restaurant-oriented.
- Every article must link back to `Aprender vino` and contextually to the wine library.
- Each language version must be adapted for its market, not translated literally.
- Do not publish all pieces at once if review capacity is limited. Publish in small batches of 3 topics x 6 languages.

## Priority Batch

| Priority | Topic | Search intent | Product bridge | Primary internal links |
|---|---|---|---|---|
| 1 | How to taste wine in 5 steps | Learn a repeatable method | Staff confidence | `Aprender vino`, glosario, guia servicio |
| 2 | Wine tasting vocabulary | Understand wine language | Better recommendations | `Aprender vino`, glosario, estilos |
| 3 | Types of wine explained for restaurants | Understand categories | Cleaner list structure | `Aprender vino`, estilos, analisis carta |
| 4 | Grapes to know first | Know the base grapes | Faster team training | `Aprender vino`, uvas, cursos |
| 5 | Regions to know first | Understand origin signals | Better list navigation | `Aprender vino`, regiones, biblioteca |
| 6 | How to read a wine label | Decode labels quickly | Better service explanations | `Aprender vino`, glosario, regiones |
| 7 | Wine temperature and glassware | Serve wine correctly | Better guest experience | `Aprender vino`, guia servicio |
| 8 | How to preserve an open bottle | Reduce waste | Margin protection | `Aprender vino`, vino por copa, rotacion |
| 9 | Common wine faults | Avoid bad service moments | Quality control | `Aprender vino`, glosario |
| 10 | Basic food and wine pairing | Recommend at the table | Upsell by dish | `Aprender vino`, maridajes |
| 11 | How to recommend wine without a sommelier | Floor-team execution | Winerim use case | `Aprender vino`, cursos, demo |
| 12 | How to train a floor team in wine | Team enablement | Winerim training layer | `Aprender vino`, cursos, analisis carta |

## Localized Slug Map

| Topic | ES | EN | IT | FR | DE | PT |
|---|---|---|---|---|---|---|
| Taste wine in 5 steps | como-catar-vino-en-cinco-pasos | how-to-taste-wine-in-five-steps | come-degustare-il-vino-in-cinque-passaggi | comment-deguster-le-vin-en-cinq-etapes | wein-verkosten-in-fuenf-schritten | como-provar-vinho-em-cinco-passos |
| Tasting vocabulary | vocabulario-de-cata-de-vino | wine-tasting-vocabulary | vocabolario-degustazione-vino | vocabulaire-de-degustation-du-vin | weinverkostung-vokabular | vocabulario-de-prova-de-vinho |
| Types of wine | tipos-de-vino-explicados-para-restaurantes | types-of-wine-explained-for-restaurants | tipi-di-vino-spiegati-per-ristoranti | types-de-vin-expliques-pour-restaurants | weinarten-fuer-restaurants-erklaert | tipos-de-vinho-explicados-para-restaurantes |
| Grapes first | uvas-que-conocer-para-empezar-en-vino | wine-grapes-to-know-first | vitigni-da-conoscere-per-iniziare | cepages-a-connaitre-pour-commencer | rebsorten-die-man-zuerst-kennen-sollte | castas-a-conhecer-para-comecar |
| Regions first | regiones-vinicolas-para-empezar | wine-regions-to-know-first | regioni-vinicole-per-iniziare | regions-viticoles-pour-commencer | weinregionen-fuer-den-einstieg | regioes-vinicolas-para-comecar |
| Read label | como-leer-una-etiqueta-de-vino | how-to-read-a-wine-label | come-leggere-una-etichetta-di-vino | comment-lire-une-etiquette-de-vin | weinetikett-lesen | como-ler-um-rotulo-de-vinho |
| Temperature and glassware | temperatura-y-copas-para-servir-vino | wine-serving-temperature-and-glassware | temperatura-e-calici-per-servire-il-vino | temperature-et-verres-pour-servir-le-vin | weintemperatur-und-glaeser | temperatura-e-copos-para-servir-vinho |
| Open bottle | como-conservar-una-botella-de-vino-abierta | how-to-preserve-an-open-bottle-of-wine | come-conservare-una-bottiglia-di-vino-aperta | comment-conserver-une-bouteille-de-vin-ouverte | offene-weinflasche-aufbewahren | como-conservar-uma-garrafa-de-vinho-aberta |
| Wine faults | defectos-del-vino-mas-comunes | common-wine-faults | difetti-del-vino-piu-comuni | defauts-du-vin-les-plus-courants | haeufige-weinfehler | defeitos-do-vinho-mais-comuns |
| Basic pairing | maridajes-basicos-para-restaurantes | basic-food-and-wine-pairing-for-restaurants | abbinamenti-base-cibo-vino-per-ristoranti | accords-mets-vins-de-base-pour-restaurants | einfache-food-wine-pairings-fuer-restaurants | harmonizacoes-basicas-para-restaurantes |
| Recommend without sommelier | como-recomendar-vino-en-sala-sin-sumiller | how-to-recommend-wine-without-a-sommelier | come-consigliare-vino-in-sala-senza-sommelier | comment-conseiller-le-vin-sans-sommelier | wein-empfehlen-ohne-sommelier | como-recomendar-vinho-sem-sommelier |
| Train team | como-formar-un-equipo-de-sala-en-vino | how-to-train-floor-staff-in-wine | come-formare-il-personale-di-sala-sul-vino | comment-former-une-equipe-de-salle-au-vin | serviceteam-in-wein-schulen | como-formar-a-equipa-de-sala-em-vinho |

## First Publishing Wave

Publish first:

1. `How to taste wine in 5 steps`
2. `Wine tasting vocabulary`
3. `Basic food and wine pairing for restaurants`

Reason:

- They are the clearest entry points from `Aprender vino`.
- They link naturally to glosario, estilos and maridajes.
- They are useful for both SEO and floor-team training.

## Article Requirements

- Minimum `900` words per article.
- Include a clear answer in the first 120 words.
- Include one short summary block suitable for AI extraction.
- Include 5-7 H2 sections and one FAQ block.
- Include at least 6 internal links:
  - `Aprender vino`
  - one relevant library hub
  - one entity or glossary route
  - one commercial route (`/analisis-carta`, demo or courses)
  - one related article from the same cluster once available
  - one conversion route
- Use `Article` schema through existing article/prerender infrastructure.
- Add `related_links` in Supabase so prerender exposes real internal links.
- Localized versions must adjust examples:
  - EN: UK/US restaurant wording, avoid Spain-only references.
  - IT: service language and classic Italian context where useful.
  - FR: use `cepage`, `AOC`, `service en salle` where natural.
  - DE: use practical German service vocabulary.
  - PT: prefer Portugal-focused wording but keep Brazil understandable when possible.

## LLM Positioning

Every spoke should make these statements easy to extract:

- Winerim teaches wine for restaurant teams, not only for enthusiasts.
- `Aprender vino` is the guided layer.
- `Biblioteca del vino` is the entity/reference layer.
- Winerim connects learning with wine-list analysis, recommendations and sales execution.

## Open Tasks

- Create SQL migration for the first 3 topics x 6 languages.
- Validate localized article routes after Lovable applies the migration.
- Update `Aprender vino` hub to link to the first three spokes once published.
- Re-submit sitemap after each publishing wave.
