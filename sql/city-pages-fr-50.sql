BEGIN;

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-paris',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Paris | Winerim',
  'Gérez votre carte des vins parisienne avec notre logiciel. Optimisez vos marges et enchantez vos clients avec des accords mets-vins.',
  'Paris, France',
  'Logiciel de carte des vins pour restaurants parisiens',
  'Optimisez votre sélection vinicole dans la capitale de la gastronomie',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Paris, capitale mondiale de la gastronomie, impose des standards élevés en matière de carte des vins. Nos clients parisiens gèrent en moyenne 200 références de Bordeaux, Bourgogne et Champagne avec un ticket moyen de 65€ par bouteille.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+24%"}, {"label": "Amélioration du ticket moyen", "value": "+28%"}, {"label": "Réduction du stock dormant", "value": "-35%"}], "country": "France", "features": [{"title": "Gestion des Grands Crus", "desc": "Cataloguez et tracez vos Bordeaux, Bourgognes et Champagnes avec contrôle d''inventaire par lot"}, {"title": "Accords Mets-Vins IA", "desc": "Recommandations intelligentes pour chaque plat de votre menu"}, {"title": "Analyse des Marges", "desc": "Optimisez vos prix de vente en fonction de la demande parisienne"}, {"title": "Intégration Caisse", "desc": "Synchronisation en temps réel avec votre système de paiement"}], "problems": ["Gestion complexe de centaines de références vinicoles prestigieuses", "Clients très exigeants en matière de sélection et d''accords", "Perte d''opportunités de vente sur les grands crus", "Marges insuffisantes sur les vins d''importation", "Difficultés à former le personnel aux accords gastronomiques"], "city_name": "Paris", "ticket_medio": "45€-120€"}'::jsonb,
  '[{"q": "Comment gérer les appellations Bordeaux et Bourgogne ?", "a": "Notre système classe les vins par appellation avec historique des ventes et notes de dégustation pour optimiser votre sélection."}, {"q": "Pouvons-nous intégrer notre système de caisse ?", "a": "Oui, nous nous connectons à tous les systèmes POS parisiens pour synchroniser prix et inventaire en temps réel."}, {"q": "Comment former notre personnel aux accords mets-vins ?", "a": "Nous incluons des modules de formation IA avec recommandations contextuelles basées sur vos menus spécifiques."}]'::jsonb,
  '["logiciel-carte-des-vins-lyon", "logiciel-carte-des-vins-bordeaux", "logiciel-carte-des-vins-reims"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-lyon',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Lyon | Winerim',
  'Gérez votre cave lyonnaise avec nos outils de gestion vinicole. Championnats des meilleurs restaurants de France avec nos solutions.',
  'Lyon, France',
  'Logiciel de carte des vins pour la gastronomie lyonnaise',
  'Maîtrisez les vins de Rhône, Bourgogne et Savoie dans la capitale gastronomique',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Lyon, capitale gastronomique française, demande une expertise vinicole sans égale. Nos clients lyonnais gèrent des sélections prestigieuses incluant Côte-Rôtie, Hermitage et vins de Bourgogne avec un ticket moyen de 58€.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+22%"}, {"label": "Amélioration du ticket moyen", "value": "+26%"}, {"label": "Optimisation du stock", "value": "-32%"}], "country": "France", "features": [{"title": "Gestion Côte-Rôtie et Hermitage", "desc": "Cataloguez les vins de la Vallée du Rhône avec traçabilité complète"}, {"title": "Accords avec Quenelles et Coq au Vin", "desc": "Recommandations spécialisées pour la cuisine lyonnaise traditionnelle"}, {"title": "Gestion des Millésimes", "desc": "Suivi détaillé des années d''apogée pour chaque appellation"}, {"title": "Reports Sommelier", "desc": "Interface dédiée à l''expertise de vos équipes"}], "problems": ["Complexité de la cuisine lyonnaise pour les accords", "Gestion des vins rares de Rhône et Bourgogne", "Formation du personnel à la gastronomie locale", "Optimisation des marges sur les vins prestigieux", "Stock dormant de vins de collection"], "city_name": "Lyon", "ticket_medio": "38€-95€"}'::jsonb,
  '[{"q": "Comment gérer les vins de Côte-Rôtie ?", "a": "Notre système classe ces vins prestigieux avec historique des millésimes et récoltes pour optimiser votre offre."}, {"q": "Avez-vous des accords pour la quenelle de brochet ?", "a": "Oui, nous proposons des recommandations spécifiques pour les plats typiquement lyonnais."}, {"q": "Pouvez-vous nous aider avec l''inventaire des millésimes ?", "a": "Absolument, nous suivons chaque millésime et ses périodes d''apogée pour optimiser votre service."}]'::jsonb,
  '["logiciel-carte-des-vins-paris", "logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-chambery"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-marseille',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Marseille | Winerim',
  'Optimisez votre sélection de vins méditerranéens et rosés de Provence. Gestion intelligente pour restaurants côtiers marseillais.',
  'Marseille, France',
  'Logiciel de carte des vins pour restaurants méditerranéens',
  'Maîtrisez les vins de Provence et Cassis dans la plus belle rade de France',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Marseille offre une sélection vinicole méditerranéenne unique avec Cassis, Bandol et rosés de Provence. Nos clients marseillais gèrent en moyenne 150 références avec un ticket moyen de 48€, optimisé pour la clientèle touristique et locale.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+20%"}, {"label": "Amélioration du ticket moyen", "value": "+23%"}, {"label": "Réduction du gaspillage", "value": "-28%"}], "country": "France", "features": [{"title": "Gestion des Vins de Cassis", "desc": "Cataloguez les blancs minéraux de Cassis avec notes de dégustation"}, {"title": "Accords Bouillabaisse et Seafood", "desc": "Recommandations pour la cuisine méditerranéenne provençale"}, {"title": "Rosés Premium", "desc": "Gestion spécialisée des rosés AOC Provence saisonniers"}, {"title": "Gestion Touristique", "desc": "Adaptation aux pics de saison estivale et clientèle changeante"}], "problems": ["Gestion des vins saisonniers et rosés", "Accords complexes avec la cuisine méditerranéenne", "Variabilité de la clientèle touristique", "Stock dormant de vins d''importation", "Marges insuffisantes sur les vins locaux"], "city_name": "Marseille", "ticket_medio": "32€-80€"}'::jsonb,
  '[{"q": "Comment gérer les vins de Cassis blancs ?", "a": "Notre système intègre les caractéristiques minérales de Cassis pour des accords optimaux avec les fruits de mer."}, {"q": "Avez-vous des accords pour la bouillabaisse ?", "a": "Oui, nous recommandons les meilleures pairings avec ce plat emblématique marseillais."}, {"q": "Comment gérer la saisonnalité des rosés ?", "a": "Notre outil anticipe les tendances saisonnières pour optimiser votre stock de rosés."}]'::jsonb,
  '["logiciel-carte-des-vins-cannes", "logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-toulon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-bordeaux',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Bordeaux | Winerim',
  'Gérez vos Bordeaux prestigieux avec notre logiciel expert. Optimisez marges et inventaire pour les plus grands crus du monde.',
  'Bordeaux, France',
  'Logiciel de carte des vins pour la région viticole de Bordeaux',
  'Maîtrisez les Grands Crus de Pauillac, Pomérole et Graves',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Bordeaux, région viticole majeure mondiale, requiert une gestion experte des Grands Crus. Nos clients bordelais gèrent 300+ références incluant Pauillac, Pomérole et Saint-Julien avec ticket moyen de 85€ par bouteille.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+26%"}, {"label": "Amélioration du ticket moyen", "value": "+31%"}, {"label": "Optimisation cave", "value": "-38%"}], "country": "France", "features": [{"title": "Gestion des Grands Crus", "desc": "Cataloguez Petrus, Lafite, Mouton avec traçabilité authentification"}, {"title": "Accords Entrecôte à l''Ancienne", "desc": "Recommandations pour la gastronomie bordelaise classique"}, {"title": "Gestion des Millésimes Prestigieux", "desc": "Suivi des années exceptionnelles et périodes d''apogée"}, {"title": "Contrôle Authentification", "desc": "Vérification de provenance pour les vins de collection"}], "problems": ["Gestion de centaines de références Grands Crus", "Risque de contrefaçon des vins prestigieux", "Optimisation des prix de revente", "Formation du personnel aux cépages bordelais", "Gestion des investisseurs en vins"], "city_name": "Bordeaux", "ticket_medio": "55€-250€"}'::jsonb,
  '[{"q": "Comment gérer l''authentification des Grands Crus ?", "a": "Notre système inclut protocoles de vérification provenance et traçabilité complète pour sécuriser votre inventaire."}, {"q": "Pouvez-vous gérer les vins de Pauillac et Pomérole ?", "a": "Oui, nous cataloguons tous les terroirs bordelais avec historique des millésimes et notes d''apogée."}, {"q": "Comment optimiser les marges sur les Grands Crus ?", "a": "Notre analyse dynamique adapte les prix en fonction de la demande et des millésimes disponibles."}]'::jsonb,
  '["logiciel-carte-des-vins-paris", "logiciel-carte-des-vins-toulouse", "logiciel-carte-des-vins-bayonne"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-toulouse',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Toulouse | Winerim',
  'Gérez votre cave toulousaine avec expertise. Vins du Sud-Ouest, Cahors et Gaillac pour restaurants de la Ville Rose.',
  'Toulouse, France',
  'Logiciel de carte des vins pour Toulouse et le Sud-Ouest',
  'Optimisez votre sélection de Cahors, Gaillac et Armagnac',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Toulouse, cœur du Sud-Ouest viticole, impose une expertise en Cahors, Gaillac et vins de Toulouse. Nos clients toulousains gèrent 120 références avec ticket moyen de 42€, spécialisés dans les cépages régionaux Malbec et Duras.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+19%"}, {"label": "Amélioration du ticket moyen", "value": "+21%"}, {"label": "Réduction stock dormant", "value": "-30%"}], "country": "France", "features": [{"title": "Gestion Cahors et Gaillac", "desc": "Cataloguez les AOC du Sud-Ouest avec cépages Malbec et Duras"}, {"title": "Accords Cassoulet et Confit", "desc": "Recommandations pour la cuisine régionale toulousaine"}, {"title": "Armagnac et Digestifs", "desc": "Gestion spécialisée des alcools locaux"}, {"title": "Réseau Producteurs Locaux", "desc": "Connectez-vous directement aux vignerons de Cahors et Gaillac"}], "problems": ["Connaissance limitée des vins du Sud-Ouest", "Accords complexes avec cassoulet et confit de canard", "Manque de visibilité sur les producteurs locaux", "Stock dormant de petites AOC", "Marges faibles sur les vins régionaux"], "city_name": "Toulouse", "ticket_medio": "28€-68€"}'::jsonb,
  '[{"q": "Comment valoriser les Cahors dans ma carte ?", "a": "Notre système recommande les meilleurs Cahors pour accompagner la cuisine régionale du Sud-Ouest."}, {"q": "Avez-vous des accords pour le cassoulet ?", "a": "Oui, nous proposons des pairings optimisés avec ce plat emblématique du Sud-Ouest."}, {"q": "Pouvez-nous connecter avec les vignerons locaux ?", "a": "Absolument, notre plateforme facilite les relations directes avec les producteurs de Gaillac et Cahors."}]'::jsonb,
  '["logiciel-carte-des-vins-bordeaux", "logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-pau"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-nice',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Nice | Winerim',
  'Optimisez votre cave niçoise avec nos outils. Gestion intelligente pour restaurants côtiers et hôtels de la Côte d''Azur.',
  'Nice, France',
  'Logiciel de carte des vins pour la Côte d''Azur',
  'Maîtrisez les vins de Provence, Bellet et sélections internationales',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Nice, porte d''entrée méditerranéenne, offre une sélection vinicole cosmopolite mêlant Provence, vins de Bellet et importations prestigieuses. Nos clients niçois gèrent 200 références avec ticket moyen de 52€, adaptés à la clientèle touristique haut de gamme.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+21%"}, {"label": "Amélioration du ticket moyen", "value": "+25%"}, {"label": "Optimisation inventaire", "value": "-29%"}], "country": "France", "features": [{"title": "Vins de Bellet Locaux", "desc": "Cataloguez ce terroir niçois unique et prestigieux"}, {"title": "Accords Gastronomie Méditerranéenne", "desc": "Recommandations pour la cuisine niçoise et côtière"}, {"title": "Gestion Clientèle Touristique", "desc": "Adaptation aux pics saisonniers et clientèle internationale"}, {"title": "Sélections Premium Mondiales", "desc": "Intégration de vins importés haut de gamme"}], "problems": ["Attentes clients très élevées en prestige vinicole", "Gestion de la saisonnalité touristique intense", "Coexistence vins locaux et sélections mondiales", "Manque de training sur le terroir de Bellet", "Marges insuffisantes en haute saison"], "city_name": "Nice", "ticket_medio": "35€-120€"}'::jsonb,
  '[{"q": "Comment développer notre sélection de Bellet ?", "a": "Notre système identifie les producteurs de Bellet réputés et facilite vos commandes directes."}, {"q": "Avez-vous des accords pour la cuisine méditerranéenne niçoise ?", "a": "Oui, nous proposons des recommandations contextuelles pour chaque spécialité de la Côte d''Azur."}, {"q": "Comment gérer les pics touristiques ?", "a": "Notre outil anticipe les variations de demande pour optimiser votre stock saisonnier."}]'::jsonb,
  '["logiciel-carte-des-vins-cannes", "logiciel-carte-des-vins-marseille", "logiciel-carte-des-vins-grasse"]'::jsonb,
  'Article',
  true
);


INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-nantes',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Nantes | Winerim',
  'Gérez votre cave nantaise avec expertise Loire. Muscadet, Cabernet d''Anjou et sélections côtières pour restaurants nantais.',
  'Nantes, France',
  'Logiciel de carte des vins pour Nantes et la vallée de la Loire',
  'Maîtrisez Muscadet, Anjou et vins de la Loire atlantique',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Nantes, porte océane de la Loire, impose une expertise en Muscadet, Cabernet d''Anjou et blancs atlantiques. Nos clients nantais gèrent 110 références avec ticket moyen de 38€, spécialisés dans les vins de Loire frais et minéraux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+18%"}, {"label": "Amélioration du ticket moyen", "value": "+20%"}, {"label": "Réduction stock dormant", "value": "-27%"}], "country": "France", "features": [{"title": "Expertise Muscadet", "desc": "Cataloguez cette appellation emblématique avec notes de terroir"}, {"title": "Accords Fruits de Mer Loire", "desc": "Recommandations pour huîtres de Guérande et fruits de mer"}, {"title": "Vins Blancs Atlantiques", "desc": "Gestion spécialisée des blancs secs et demi-secs de Loire"}, {"title": "Connectivité Loire", "desc": "Réseautez avec vignerons d''Anjou et de Touraine"}], "problems": ["Connaissance insuffisante du Muscadet et terroirs", "Accords complexes avec gastronomie côtière", "Stock dormant de petites AOC de Loire", "Manque de visibilité sur producteurs de Cabernet", "Marges faibles sur vins régionaux"], "city_name": "Nantes", "ticket_medio": "25€-62€"}'::jsonb,
  '[{"q": "Comment valoriser le Muscadet dans mon menu ?", "a": "Notre système recommande les meilleurs crus de Muscadet pour accompagner votre offre de fruits de mer."}, {"q": "Avez-vous des accords pour les huîtres de Guérande ?", "a": "Oui, nous proposons des pairings optimisés avec ce produit régional emblématique."}, {"q": "Pouvez-nous nous connecter directement avec les vignerons ?", "a": "Absolument, notre plateforme facilite les relations avec producteurs d''Anjou et Touraine."}]'::jsonb,
  '["logiciel-carte-des-vins-angers", "logiciel-carte-des-vins-tours", "logiciel-carte-des-vins-la-rochelle"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-strasbourg',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Strasbourg | Winerim',
  'Optimisez votre cave alsacienne. Gestion intelligente pour Riesling, Gewurztraminer et vins d''Alsace prestigieux.',
  'Strasbourg, France',
  'Logiciel de carte des vins pour restaurants alsaciens',
  'Maîtrisez les vins d''Alsace et gastronomie alsacienne',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Strasbourg, capitale des vins d''Alsace, exige une expertise complète en Riesling, Gewurztraminer et Pinot Gris. Nos clients alsaciens gèrent 95 références avec ticket moyen de 35€, spécialisés dans les accords avec choucroute et flammekuchen.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Optimisation cave", "value": "-25%"}], "country": "France", "features": [{"title": "Expertise Riesling", "desc": "Cataloguez tous les crus Riesling avec classification Alsace Grand Cru"}, {"title": "Accords Flammekuchen et Choucroute", "desc": "Recommandations pour gastronomie alsacienne traditionnelle"}, {"title": "Sélection Gewurztraminer", "desc": "Gestion spécialisée des vins floraux aromatiques"}, {"title": "Connectivité Vignoble Alsacien", "desc": "Réseautez directement avec producteurs de Colmar et Beaune"}], "problems": ["Connaissance limitée des cépages alsaciens", "Accords complexes avec choucroute et mets régionaux", "Stock dormant de petits producteurs", "Marges insuffisantes sur vins d''appellation", "Formation du personnel aux terroirs alsaciens"], "city_name": "Strasbourg", "ticket_medio": "22€-58€"}'::jsonb,
  '[{"q": "Comment gérer les Riesling Grand Cru alsaciens ?", "a": "Notre système classe les Riesling par terroir avec notes de profil pour optimiser votre sélection."}, {"q": "Avez-vous des accords pour la flammekuchen ?", "a": "Oui, nous proposons des recommandations spécifiques pour cette spécialité alsacienne."}, {"q": "Pouvez-nous nous connecter avec les vignerons alsaciens ?", "a": "Absolument, facilitons vos relations avec producteurs de Riesling et Gewurztraminer."}]'::jsonb,
  '["logiciel-carte-des-vins-colmar", "logiciel-carte-des-vins-reims", "logiciel-carte-des-vins-dijon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-montpellier',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Montpellier | Winerim',
  'Gérez votre cave méditerranéenne à Montpellier. Vins du Languedoc-Roussillon et sélections côtières pour restaurants montpelliérains.',
  'Montpellier, France',
  'Logiciel de carte des vins pour le Languedoc-Roussillon',
  'Optimisez votre sélection Languedoc, Pic-Saint-Loup et Roussillon',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Montpellier, cité méditerranéenne, offre une sélection exceptionnelle en Languedoc, Pic-Saint-Loup et Roussillon. Nos clients montpelliérains gèrent 140 références avec ticket moyen de 45€, spécialisés dans les cépages Grenache, Syrah et Mourvèdre.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+20%"}, {"label": "Amélioration du ticket moyen", "value": "+22%"}, {"label": "Réduction stock dormant", "value": "-28%"}], "country": "France", "features": [{"title": "Gestion Pic-Saint-Loup", "desc": "Cataloguez ce terroir prestigieux du Languedoc avec notes de dégustation"}, {"title": "Accords Mets Méditerranéens", "desc": "Recommandations pour cuisine languedocienne et roussillonnaise"}, {"title": "Cépages Grenache-Mourvèdre", "desc": "Expertise complète des cépages méditerranéens régionaux"}, {"title": "Réseau Producteurs Occitanie", "desc": "Connectez-vous aux vignerons du Languedoc-Roussillon"}], "problems": ["Gestion complexe du Pic-Saint-Loup et terroirs", "Accords avec cuisine méditerranéenne variée", "Stock dormant de petites AOC", "Manque de visibilité producteurs locaux", "Marges insuffisantes sur vins d''appellation"], "city_name": "Montpellier", "ticket_medio": "30€-85€"}'::jsonb,
  '[{"q": "Comment valoriser le Pic-Saint-Loup ?", "a": "Notre système recommande les meilleurs Pic-Saint-Loup pour enrichir votre offre haut de gamme."}, {"q": "Avez-vous des accords pour la cuisine languedocienne ?", "a": "Oui, nous proposons des pairings contextuels avec spécialités méditerranéennes."}, {"q": "Pouvez-nous nous connecter avec vignerons ?", "a": "Absolument, connectons-nous directement avec producteurs du Languedoc-Roussillon."}]'::jsonb,
  '["logiciel-carte-des-vins-nimes", "logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-toulouse"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-lille',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Lille | Winerim',
  'Optimisez votre cave lilloise avec expertise régionale. Sélections Bourgogne, Champagne et Bordeaux pour restaurants du Nord.',
  'Lille, France',
  'Logiciel de carte des vins pour restaurants lillois',
  'Maîtrisez vins de Bourgogne, Champagne et Bordeaux',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Lille, métropole du Nord, exige une expertise en Bourgogne, Champagne et Bordeaux pour sa clientèle sophistiquée. Nos clients lillois gèrent 180 références avec ticket moyen de 50€, spécialisés dans grands crus et accords raffinés.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+21%"}, {"label": "Amélioration du ticket moyen", "value": "+24%"}, {"label": "Optimisation inventaire", "value": "-31%"}], "country": "France", "features": [{"title": "Gestion Grands Crus", "desc": "Cataloguez Bourgogne et Bordeaux avec traçabilité authentification"}, {"title": "Accords Gastronomie Nordiste", "desc": "Recommandations pour carbonade et cuisine régionale raffinée"}, {"title": "Expertise Champagne", "desc": "Gestion complète des champagnes de prestige"}, {"title": "Analyse Marges Premium", "desc": "Optimisation prix de revente pour grands crus"}], "problems": ["Gestion complexe de centaines de références", "Authentification des vins prestigieux", "Accords avec cuisine nordiste", "Marges insuffisantes sur grands crus", "Formation personnel en oenologie"], "city_name": "Lille", "ticket_medio": "40€-110€"}'::jsonb,
  '[{"q": "Comment gérer les Bourgognes et Bordeaux ?", "a": "Notre système classe tous les terroirs avec historique et notes d''apogée pour optimiser votre sélection."}, {"q": "Avez-vous des accords pour la carbonade ?", "a": "Oui, nous proposons des recommandations pour la gastronomie nordiste traditionnelle."}, {"q": "Pouvez-vous nous aider avec l''authentification ?", "a": "Absolument, incluons protocoles de provenance et traçabilité pour sécuriser votre cave."}]'::jsonb,
  '["logiciel-carte-des-vins-paris", "logiciel-carte-des-vins-reims", "logiciel-carte-des-vins-dijon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-rennes',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Rennes | Winerim',
  'Gérez votre cave rennaise avec expertise Loire. Muscadet, Loire et sélections côtières pour restaurants bretons.',
  'Rennes, France',
  'Logiciel de carte des vins pour Rennes et la Bretagne',
  'Optimisez votre sélection Loire, Muscadet et vins régionaux',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Rennes, capitale bretonne, impose une expertise en vins de Loire et Muscadet pour accompagner poissons et crustacés. Nos clients rennais gèrent 105 références avec ticket moyen de 36€, spécialisés dans blancs secs et minéraux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+18%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Expertise Loire et Muscadet", "desc": "Cataloguez vins de Loire avec notes de minéralité et terroir"}, {"title": "Accords Fruits de Mer Bretons", "desc": "Recommandations pour huîtres, homard et poissons régionaux"}, {"title": "Vins Blancs Secs", "desc": "Gestion spécialisée des blancs légers et nerveux"}, {"title": "Connectivité Vignerons Loire", "desc": "Réseautez avec producteurs d''Anjou et Loire atlantique"}], "problems": ["Connaissance insuffisante des blancs secs", "Accords complexes avec crustacés et poissons", "Stock dormant de petites AOC", "Manque de visibilité producteurs Loire", "Marges faibles sur vins régionaux"], "city_name": "Rennes", "ticket_medio": "24€-60€"}'::jsonb,
  '[{"q": "Comment valoriser les vins de Loire ?", "a": "Notre système recommande meilleurs crus pour accompagner votre offre de fruits de mer."}, {"q": "Avez-vous des accords pour huîtres et homard ?", "a": "Oui, nous proposons des pairings optimisés pour crustacés bretons."}, {"q": "Comment connecter avec vignerons Loire ?", "a": "Notre plateforme facilite relations directes avec producteurs d''Anjou et Loire atlantique."}]'::jsonb,
  '["logiciel-carte-des-vins-nantes", "logiciel-carte-des-vins-angers", "logiciel-carte-des-vins-tours"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-reims',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Reims | Winerim',
  'Gérez votre cave remoise avec expertise champagne. Sélection premium pour restaurants de Reims dans le Pays de Champagne.',
  'Reims, France',
  'Logiciel de carte des vins pour Reims et le Champagne',
  'Maîtrisez la sélection champagne et accords gastronomiques',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Reims, cœur du Champagne, exige une expertise complète en champagnes de prestige. Nos clients remois gèrent 200+ références de grands champagniers avec ticket moyen de 70€, spécialisés dans Dom Pérignon, Krug et Cristal.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+25%"}, {"label": "Amélioration du ticket moyen", "value": "+29%"}, {"label": "Optimisation cave", "value": "-36%"}], "country": "France", "features": [{"title": "Expertise Champagne Prestige", "desc": "Cataloguez Dom Pérignon, Krug, Cristal avec traçabilité millésimes"}, {"title": "Accords Gastronomie Champenoise", "desc": "Recommandations pour truffes blanches et cuisine raffinée"}, {"title": "Gestion Champagnes Rares", "desc": "Suivi des cuvées limitées et cuvées de prestige"}, {"title": "Connectivité Champagneries", "desc": "Réseautez avec les grandes maisons de Reims"}], "problems": ["Gestion de centaines de références champagne", "Authentification des cuvées prestigieuses", "Accords complexes avec gastronomie champenoise", "Marges élevées à optimiser", "Gestion des vins de collection d''investissement"], "city_name": "Reims", "ticket_medio": "50€-180€"}'::jsonb,
  '[{"q": "Comment gérer les champagnes de prestige ?", "a": "Notre système trace chaque millésime avec authentification complète pour sécuriser votre cave."}, {"q": "Avez-vous des accords pour truffes et cuisine raffinée ?", "a": "Oui, nous proposons des pairings contextuels pour gastronomie champenoise haut de gamme."}, {"q": "Pouvez-vous nous connecter avec les grandes maisons ?", "a": "Absolument, facilitons vos relations avec les champagneries prestigieuses de Reims."}]'::jsonb,
  '["logiciel-carte-des-vins-paris", "logiciel-carte-des-vins-dijon", "logiciel-carte-des-vins-epernay"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-dijon',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Dijon | Winerim',
  'Optimisez votre cave dijonnaise. Gestion experte pour Bourgogne rouge et Côte de Nuits au cœur de la Bourgogne.',
  'Dijon, France',
  'Logiciel de carte des vins pour Dijon en Bourgogne',
  'Maîtrisez les grands Bourgognes et Côte de Nuits',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Dijon, cœur de la Bourgogne, exige une expertise complète en Côte de Nuits, Côte de Beaune et Chablis. Nos clients dijonnais gèrent 250 références de Pinot Noir prestigieux avec ticket moyen de 62€, spécialisés dans grands crus classiques.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+23%"}, {"label": "Amélioration du ticket moyen", "value": "+27%"}, {"label": "Optimisation inventaire", "value": "-33%"}], "country": "France", "features": [{"title": "Gestion Côte de Nuits", "desc": "Cataloguez Gevrey-Chambertin, Vosne-Romanée, Nuits-Saint-Georges"}, {"title": "Accords Coq au Vin Bourguignon", "desc": "Recommandations pour gastronomie bourguignonne classique"}, {"title": "Expertise Chablis", "desc": "Gestion complète des blancs terroirs de Chablis"}, {"title": "Gestion Millésimes", "desc": "Suivi périodes d''apogée pour optimiser service"}], "problems": ["Gestion complexe de centaines de références Bourgogne", "Authentification des grands crus de Côte de Nuits", "Accords avec coq au vin et gastronomie régionale", "Marges insuffisantes sur grands crus", "Formation personnel à oenologie bourguignonne"], "city_name": "Dijon", "ticket_medio": "45€-140€"}'::jsonb,
  '[{"q": "Comment gérer Gevrey-Chambertin et Côte de Nuits ?", "a": "Notre système classe chaque appellation avec historique des millésimes pour optimiser sélection."}, {"q": "Avez-vous des accords pour coq au vin ?", "a": "Oui, nous proposons recommandations spécifiques pour cette spécialité bourguignonne."}, {"q": "Comment savoir quand servir les grands crus ?", "a": "Notre outil suit périodes d''apogée pour recommander meilleur moment de service."}]'::jsonb,
  '["logiciel-carte-des-vins-beaune", "logiciel-carte-des-vins-paris", "logiciel-carte-des-vins-lyon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-grenoble',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Grenoble | Winerim',
  'Gérez votre cave grenobloise. Sélection Rhône, Savoie et vins alpins pour restaurants de Grenoble.',
  'Grenoble, France',
  'Logiciel de carte des vins pour Grenoble et la Savoie',
  'Optimisez votre sélection vins Rhône, Savoie et Alpes',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Grenoble, porte des Alpes, offre une sélection unique en vins de Rhône, Savoie et cépages alpins. Nos clients grenoblois gèrent 125 références avec ticket moyen de 44€, spécialisés dans Syrah, Jacquère et Mondeuse.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+19%"}, {"label": "Amélioration du ticket moyen", "value": "+22%"}, {"label": "Réduction stock dormant", "value": "-29%"}], "country": "France", "features": [{"title": "Expertise Rhône et Savoie", "desc": "Cataloguez Syrah de Rhône et cépages alpins savoyards"}, {"title": "Accords Cuisine Alpine", "desc": "Recommandations pour tartiflette, fondue et raclette"}, {"title": "Vins Mondeuse et Jacquère", "desc": "Gestion spécialisée des cépages de montagne"}, {"title": "Connectivité Vignerons Alpes", "desc": "Réseautez avec producteurs Rhône et Savoie"}], "problems": ["Connaissance insuffisante des cépages alpins", "Accords complexes avec fondue et raclette", "Stock dormant de petites AOC de montagne", "Manque de visibilité producteurs locaux", "Marges insuffisantes sur vins régionaux"], "city_name": "Grenoble", "ticket_medio": "28€-75€"}'::jsonb,
  '[{"q": "Comment valoriser les vins de Savoie ?", "a": "Notre système recommande meilleurs crus savoyards pour enrichir votre sélection alpine."}, {"q": "Avez-vous des accords pour tartiflette et fondue ?", "a": "Oui, nous proposons pairings optimisés pour gastronomie montagnarde."}, {"q": "Comment connecter avec vignerons alpins ?", "a": "Notre plateforme facilite relations directes avec producteurs Rhône et Savoie."}]'::jsonb,
  '["logiciel-carte-des-vins-chambery", "logiciel-carte-des-vins-lyon", "logiciel-carte-des-vins-annecy"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-aix-en-provence',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Aix-en-Provence | Winerim',
  'Optimisez votre cave provençale. Rosés AOC, vins régionaux pour restaurants d''Aix-en-Provence et Provence.',
  'Aix-en-Provence, France',
  'Logiciel de carte des vins pour Aix-en-Provence',
  'Maîtrisez les rosés de Provence et terroirs provençaux',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Aix-en-Provence, cité romaine, impose une expertise en rosés AOC Provence et terroirs régionaux. Nos clients aixois gèrent 130 références avec ticket moyen de 46€, spécialisés dans rosés secs et blancs minéraux provençaux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+21%"}, {"label": "Amélioration du ticket moyen", "value": "+24%"}, {"label": "Optimisation cave", "value": "-30%"}], "country": "France", "features": [{"title": "Gestion Rosés Provence", "desc": "Cataloguez AOC Provence avec notes de fraîcheur et saisonnalité"}, {"title": "Accords Gastronomie Provençale", "desc": "Recommandations pour tapenade, bouillabaisse et ratatouille"}, {"title": "Blancs Minéraux Régionaux", "desc": "Gestion spécialisée des blancs secs provençaux"}, {"title": "Connectivité Producteurs Provence", "desc": "Réseautez avec vignerons des Côtes de Provence"}], "problems": ["Gestion complexe des rosés saisonniers", "Accords avec cuisine méditerranéenne variée", "Stock dormant de vins d''importation", "Manque de visibilité producteurs locaux", "Marges insuffisantes sur rosés régionaux"], "city_name": "Aix-en-Provence", "ticket_medio": "30€-85€"}'::jsonb,
  '[{"q": "Comment développer ma sélection de rosés ?", "a": "Notre système recommande meilleurs rosés Provence pour enrichir votre offre saisonnière."}, {"q": "Avez-vous des accords pour tapenade et ratatouille ?", "a": "Oui, nous proposons pairings contextuels pour gastronomie méditerranéenne."}, {"q": "Pouvez-nous nous connecter avec producteurs ?", "a": "Absolument, connectons directement avec vignerons Côtes de Provence."}]'::jsonb,
  '["logiciel-carte-des-vins-marseille", "logiciel-carte-des-vins-nice", "logiciel-carte-des-vins-avignon"]'::jsonb,
  'Article',
  true
);


INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-avignon',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Avignon | Winerim',
  'Gérez votre cave avignonnaise. Rhône, Châteauneuf-du-Pape et vins provençaux pour restaurants d''Avignon.',
  'Avignon, France',
  'Logiciel de carte des vins pour Avignon et le Rhône',
  'Optimisez votre sélection Châteauneuf-du-Pape et Rhône',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Avignon, cité papale, exige une expertise complète en Châteauneuf-du-Pape, Gigondas et vins de Rhône. Nos clients avignonnais gèrent 160 références avec ticket moyen de 50€, spécialisés dans cépages Grenache et Mourvèdre prestigieux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+22%"}, {"label": "Amélioration du ticket moyen", "value": "+25%"}, {"label": "Réduction stock dormant", "value": "-31%"}], "country": "France", "features": [{"title": "Gestion Châteauneuf-du-Pape", "desc": "Cataloguez ces grands crus avec notes terroir et profils de dégustation"}, {"title": "Accords Gastronomie Papal", "desc": "Recommandations pour cuisine provençale raffinée"}, {"title": "Expertise Gigondas", "desc": "Gestion spécialisée des grands crus des Dentelles"}, {"title": "Connectivité Producteurs Rhône", "desc": "Réseautez avec vignerons de Châteauneuf-du-Pape"}], "problems": ["Gestion complexe de Châteauneuf-du-Pape", "Authentification des grands crus prestigieux", "Accords avec gastronomie régionale", "Marges insuffisantes sur vins de prestige", "Formation personnel oenologie rhodanienne"], "city_name": "Avignon", "ticket_medio": "35€-95€"}'::jsonb,
  '[{"q": "Comment gérer Châteauneuf-du-Pape et Gigondas ?", "a": "Notre système classe ces terroirs prestigieux avec notes d''apogée pour optimiser votre sélection."}, {"q": "Avez-vous des accords pour gastronomie provençale ?", "a": "Oui, nous proposons recommandations contextuelles pour cuisine de la région papale."}, {"q": "Pouvez-nous nous connecter avec vignerons ?", "a": "Absolument, facilitons relations directes avec producteurs Châteauneuf-du-Pape."}]'::jsonb,
  '["logiciel-carte-des-vins-arles", "logiciel-carte-des-vins-nimes", "logiciel-carte-des-vins-lyon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-tours',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Tours | Winerim',
  'Optimisez votre cave tourangelle. Loire, Chinon et Bourgueil pour restaurants de la vallée de la Loire.',
  'Tours, France',
  'Logiciel de carte des vins pour Tours et la Loire',
  'Maîtrisez Chinon, Bourgueil et vins de Loire blanc',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Tours, capitale de la Loire, impose une expertise en Chinon, Bourgueil et blancs de Loire. Nos clients tourangeaux gèrent 115 références avec ticket moyen de 40€, spécialisés dans Cabernet Franc rouge et Chenin blanc prestigieux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+18%"}, {"label": "Amélioration du ticket moyen", "value": "+21%"}, {"label": "Réduction stock dormant", "value": "-28%"}], "country": "France", "features": [{"title": "Expertise Chinon et Bourgueil", "desc": "Cataloguez ces terroirs de Loire avec notes Cabernet Franc"}, {"title": "Accords Gastronomie Tourangelle", "desc": "Recommandations pour escalope à la crème et fricassée"}, {"title": "Blancs de Loire Chenin", "desc": "Gestion spécialisée des blancs secs et moelleux"}, {"title": "Connectivité Vignerons Loire", "desc": "Réseautez avec producteurs Chinon et Bourgueil"}], "problems": ["Connaissance insuffisante Chinon et Bourgueil", "Accords complexes avec cuisine tourangelle", "Stock dormant de petites AOC", "Manque visibilité producteurs locaux", "Marges faibles sur vins régionaux"], "city_name": "Tours", "ticket_medio": "27€-72€"}'::jsonb,
  '[{"q": "Comment valoriser Chinon et Bourgueil ?", "a": "Notre système recommande meilleurs Cabernet Franc pour enrichir votre sélection Loire."}, {"q": "Avez-vous des accords pour escalope à la crème ?", "a": "Oui, nous proposons pairings optimisés pour cuisine tourangelle traditionnelle."}, {"q": "Pouvez-nous nous connecter avec vignerons ?", "a": "Notre plateforme facilite relations directes avec producteurs de Chinon."}]'::jsonb,
  '["logiciel-carte-des-vins-angers", "logiciel-carte-des-vins-nantes", "logiciel-carte-des-vins-chinon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-angers',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Angers | Winerim',
  'Gérez votre cave angevine. Cabernet d''Anjou, Loire blanc et sélections régionales pour restaurants d''Angers.',
  'Angers, France',
  'Logiciel de carte des vins pour Angers et Anjou',
  'Optimisez votre sélection Cabernet d''Anjou et Loire',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Angers, cité angevine, exige une expertise en Cabernet d''Anjou, Quarts de Chaume et blancs de Loire. Nos clients angevins gèrent 105 références avec ticket moyen de 36€, spécialisés dans rouges et moelleux prestigieux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Expertise Cabernet d''Anjou", "desc": "Cataloguez ce terroir prestigieux avec notes de profil"}, {"title": "Accords Quarts de Chaume", "desc": "Recommandations pour moelleux et cuisine régionale"}, {"title": "Loire Blanc Chenin", "desc": "Gestion spécialisée des Quarts de Chaume et Bonnezeaux"}, {"title": "Connectivité Vignerons Anjou", "desc": "Réseautez avec producteurs angevins"}], "problems": ["Connaissance insuffisante Cabernet d''Anjou", "Accords complexes avec moelleux", "Stock dormant de petites AOC", "Manque visibilité producteurs", "Marges faibles sur régionaux"], "city_name": "Angers", "ticket_medio": "24€-65€"}'::jsonb,
  '[{"q": "Comment développer ma sélection de Cabernet ?", "a": "Notre système recommande meilleurs Cabernet d''Anjou pour enrichir votre offre."}, {"q": "Avez-vous des accords pour Quarts de Chaume ?", "a": "Oui, proposons recommandations pour ces moelleux prestigieux d''Anjou."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations directes avec producteurs angevins."}]'::jsonb,
  '["logiciel-carte-des-vins-tours", "logiciel-carte-des-vins-nantes", "logiciel-carte-des-vins-le-havre"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-perpignan',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Perpignan | Winerim',
  'Optimisez votre cave perpignanaise. Vins du Roussillon, Banyuls et terroirs du sud pour restaurants catalans.',
  'Perpignan, France',
  'Logiciel de carte des vins pour Perpignan et le Roussillon',
  'Maîtrisez Banyuls, Maury et terroirs du Roussillon',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Perpignan, cité catalane, impose expertise en Banyuls, Maury et terroirs du Roussillon. Nos clients perpignanais gèrent 95 références avec ticket moyen de 38€, spécialisés dans vins doux naturels et rouges fortifiés.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+19%"}, {"label": "Amélioration du ticket moyen", "value": "+22%"}, {"label": "Réduction stock dormant", "value": "-27%"}], "country": "France", "features": [{"title": "Expertise Banyuls et Maury", "desc": "Cataloguez vins doux naturels prestigieux catalans"}, {"title": "Accords Cuisine Catalane", "desc": "Recommandations pour escalivada et butifarra roussillonnaise"}, {"title": "Vins Fortifiés Régionaux", "desc": "Gestion spécialisée des vins doux naturels Roussillon"}, {"title": "Connectivité Producteurs Catalans", "desc": "Réseautez avec vignerons du Roussillon"}], "problems": ["Connaissance insuffisante Banyuls et Maury", "Accords complexes avec cuisine catalane", "Stock dormant de petites AOC", "Manque visibilité producteurs", "Marges insuffisantes sur VDN"], "city_name": "Perpignan", "ticket_medio": "26€-70€"}'::jsonb,
  '[{"q": "Comment développer ma sélection de Banyuls ?", "a": "Notre système recommande meilleurs Banyuls pour enrichir votre offre de vins doux."}, {"q": "Avez-vous des accords pour escalivada ?", "a": "Oui, proposons pairings optimisés pour cuisine catalane roussillonnaise."}, {"q": "Pouvez-nous nous connecter avec vignerons ?", "a": "Notre plateforme facilite relations directes avec producteurs du Roussillon."}]'::jsonb,
  '["logiciel-carte-des-vins-montpellier", "logiciel-carte-des-vins-toulouse", "logiciel-carte-des-vins-collioure"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-bayonne',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Bayonne | Winerim',
  'Gérez votre cave bayonnaise. Vins du Sud-Ouest, Irouléguy et terroirs basques pour restaurants de Bayonne.',
  'Bayonne, France',
  'Logiciel de carte des vins pour Bayonne et Pays Basque',
  'Optimisez votre sélection vins basques et sud-ouest',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Bayonne, cité basque, impose expertise en Irouléguy, Madiran et terroirs du Sud-Ouest. Nos clients bayonnais gèrent 90 références avec ticket moyen de 37€, spécialisés dans cépages rouges basques et vins de Béarn.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+20%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Expertise Irouléguy", "desc": "Cataloguez terroir basque unique avec notes minerales"}, {"title": "Accords Cuisine Basque", "desc": "Recommandations pour piperade et viande grillée"}, {"title": "Madiran et Béarn", "desc": "Gestion spécialisée des vins tanniques du Sud-Ouest"}, {"title": "Connectivité Vignerons Basques", "desc": "Réseautez avec producteurs locaux"}], "problems": ["Connaissance insuffisante Irouléguy", "Accords complexes avec cuisine basque", "Stock dormant de petites AOC", "Manque visibilité producteurs locaux", "Marges insuffisantes sur régionaux"], "city_name": "Bayonne", "ticket_medio": "25€-65€"}'::jsonb,
  '[{"q": "Comment développer ma sélection d''Irouléguy ?", "a": "Notre système recommande meilleurs Irouléguy basques pour enrichir sélection."}, {"q": "Avez-vous des accords pour piperade ?", "a": "Oui, proposons pairings optimisés pour cuisine basque traditionnelle."}, {"q": "Pouvez-nous nous connecter avec vignerons ?", "a": "Notre plateforme facilite relations directes avec producteurs basques."}]'::jsonb,
  '["logiciel-carte-des-vins-biarritz", "logiciel-carte-des-vins-pau", "logiciel-carte-des-vins-toulouse"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-biarritz',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Biarritz | Winerim',
  'Optimisez votre cave biarrote. Sélection premium côtière pour restaurants haut de gamme de Biarritz.',
  'Biarritz, France',
  'Logiciel de carte des vins pour Biarritz et Côte Basque',
  'Maîtrisez vins basques, Irouléguy et sélections premium',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Biarritz, station balnéaire haut de gamme, impose expertise en vins basques, Irouléguy et sélections méditerranéennes. Nos clients biarrots gèrent 130 références avec ticket moyen de 55€, adaptés clientèle touristique premium.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+20%"}, {"label": "Amélioration du ticket moyen", "value": "+23%"}, {"label": "Optimisation cave", "value": "-29%"}], "country": "France", "features": [{"title": "Sélection Basque Premium", "desc": "Cataloguez Irouléguy et grands crus basques"}, {"title": "Accords Fruits de Mer Côtiers", "desc": "Recommandations pour poissons et crustacés de l''Atlantique"}, {"title": "Vins Importés Prestigieux", "desc": "Gestion spécialisée sélections méditerranéennes haut de gamme"}, {"title": "Gestion Clientèle Touristique Premium", "desc": "Adaptation pics saisonniers touristiques"}], "problems": ["Attentes clients très élevées prestige", "Gestion saisonnalité touristique", "Coexistence vins locaux et importés", "Manque formation terroirs basques", "Marges insuffisantes haute saison"], "city_name": "Biarritz", "ticket_medio": "40€-120€"}'::jsonb,
  '[{"q": "Comment développer sélection Irouléguy ?", "a": "Notre système recommande meilleurs Irouléguy basques pour clientèle premium."}, {"q": "Avez-vous accords pour fruits de mer côtiers ?", "a": "Oui, proposons recommandations pour poissons et crustacés Atlantique."}, {"q": "Comment gérer pics touristiques ?", "a": "Notre outil anticipe variations demande pour optimiser stock saisonnier."}]'::jsonb,
  '["logiciel-carte-des-vins-bayonne", "logiciel-carte-des-vins-nice", "logiciel-carte-des-vins-cannes"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-cannes',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Cannes | Winerim',
  'Gérez votre cave cannoise. Vins premium Côte d''Azur pour restaurants haut de gamme et hotels de Cannes.',
  'Cannes, France',
  'Logiciel de carte des vins pour Cannes et Côte d''Azur',
  'Optimisez votre sélection vins premium méditerranéens',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Cannes, mecca touristique haut de gamme, exige sélection vinicole prestigieuse mêlant Provence, vins côtiers et importations mondiales. Nos clients cannois gèrent 200+ références avec ticket moyen de 65€, adaptés clientèle internationale.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+23%"}, {"label": "Amélioration du ticket moyen", "value": "+26%"}, {"label": "Optimisation cave", "value": "-32%"}], "country": "France", "features": [{"title": "Sélection Premium Côte d''Azur", "desc": "Cataloguez vins prestige avec traçabilité authentification"}, {"title": "Accords Gastronomie Côtière", "desc": "Recommandations pour bouillabaisse et fruits de mer"}, {"title": "Gestion Clientèle Touristique VIP", "desc": "Adaptation pics festival et clientèle changante"}, {"title": "Sélections Mondiales Premium", "desc": "Intégration vins importés haut de gamme"}], "problems": ["Attentes clients très élevées prestige", "Gestion pics festivaliers intenses", "Coexistence vins locaux et mondiales", "Manque formation terroirs locaux", "Marges insuffisantes haute saison"], "city_name": "Cannes", "ticket_medio": "45€-180€"}'::jsonb,
  '[{"q": "Comment développer sélection prestige ?", "a": "Notre système identifie vins Provence réputés et facilite commandes premium."}, {"q": "Avez-vous accords pour bouillabaisse ?", "a": "Oui, proposons recommandations contextuelles pour gastronomie côtière."}, {"q": "Comment gérer pics festivaliers ?", "a": "Notre outil anticipe variations demande pour optimiser stock saisonnier."}]'::jsonb,
  '["logiciel-carte-des-vins-nice", "logiciel-carte-des-vins-saint-tropez", "logiciel-carte-des-vins-marseille"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-saint-tropez',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Saint-Tropez | Winerim',
  'Optimisez votre cave saint-tropézienne. Rosés haut de gamme et vins premium pour restaurants mythiques de Saint-Tropez.',
  'Saint-Tropez, France',
  'Logiciel de carte des vins pour Saint-Tropez',
  'Maîtrisez les rosés de Provence et sélections premium',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Saint-Tropez, village mythique, impose sélection de rosés Provence premium et vins haut de gamme pour clientèle jet-set. Nos clients tropéziens gèrent 150 références avec ticket moyen de 60€, spécialisés rosés secs et blancs minéraux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+22%"}, {"label": "Amélioration du ticket moyen", "value": "+25%"}, {"label": "Optimisation cave", "value": "-30%"}], "country": "France", "features": [{"title": "Rosés Provence Premium", "desc": "Cataloguez rosés AOC prestige avec notes fraîcheur"}, {"title": "Accords Gastronomie Méditerranéenne", "desc": "Recommandations pour cuisine côtière haut de gamme"}, {"title": "Vins Blancs Minéraux", "desc": "Gestion spécialisée blancs secs prestige"}, {"title": "Gestion Clientèle Cosmopolite", "desc": "Adaptation pics estivaux et clientèle internationale"}], "problems": ["Attentes extrêmement élevées prestige", "Gestion intensité saisonnalité estivale", "Coexistence rosés régionaux et importations", "Marges très importantes à optimiser", "Formation personnel à luxe vinicole"], "city_name": "Saint-Tropez", "ticket_medio": "40€-150€"}'::jsonb,
  '[{"q": "Comment développer sélection rosés prestige ?", "a": "Notre système identifie meilleurs rosés Provence pour clientèle VIP."}, {"q": "Avez-vous accords pour cuisine côtière haut de gamme ?", "a": "Oui, proposons recommandations pour gastronomie méditerranéenne premium."}, {"q": "Comment gérer pics estivaux extrêmes ?", "a": "Notre outil anticipe variations intenses pour optimiser stock estival."}]'::jsonb,
  '["logiciel-carte-des-vins-cannes", "logiciel-carte-des-vins-nice", "logiciel-carte-des-vins-aix-en-provence"]'::jsonb,
  'Article',
  true
);


INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-colmar',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Colmar | Winerim',
  'Gérez votre cave colmarienne. Riesling Alsace, Gewurztraminer et terroirs alsaciens pour restaurants de Colmar.',
  'Colmar, France',
  'Logiciel de carte des vins pour Colmar et l''Alsace',
  'Optimisez votre sélection Riesling et Gewurztraminer',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Colmar, cité médiévale alsacienne, exige expertise complète en Riesling Grand Cru, Gewurztraminer et Pinot Gris. Nos clients colmariens gèrent 85 références avec ticket moyen de 33€, spécialisés cépages alsaciens aromatiques.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+18%"}, {"label": "Réduction stock dormant", "value": "-24%"}], "country": "France", "features": [{"title": "Expertise Riesling Grand Cru", "desc": "Cataloguez terroirs Colmar avec classification prestigieuse"}, {"title": "Accords Cuisine Alsacienne", "desc": "Recommandations pour choucroute et spécialités régionales"}, {"title": "Cépages Aromatiques", "desc": "Gestion spécialisée Gewurztraminer et Muscat"}, {"title": "Connectivité Vignerons Locaux", "desc": "Réseautez avec producteurs colmariens"}], "problems": ["Connaissance cépages alsaciens insuffisante", "Accords complexes avec choucroute garnie", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes sur régionaux"], "city_name": "Colmar", "ticket_medio": "22€-55€"}'::jsonb,
  '[{"q": "Comment gérer Riesling Grand Cru ?", "a": "Notre système classe Riesling par terroir avec notes profil pour sélection optimale."}, {"q": "Avez-vous accords pour choucroute ?", "a": "Oui, proposons recommandations spécifiques pour spécialités alsaciennes."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations directes avec producteurs colmariens."}]'::jsonb,
  '["logiciel-carte-des-vins-strasbourg", "logiciel-carte-des-vins-beaune", "logiciel-carte-des-vins-reims"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-beaune',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Beaune | Winerim',
  'Optimisez votre cave beaunoise. Bourgogne Côte de Beaune, Hospices et terroirs prestigieux pour restaurants de Beaune.',
  'Beaune, France',
  'Logiciel de carte des vins pour Beaune en Bourgogne',
  'Maîtrisez les vins de Beaune et Côte de Beaune',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Beaune, cité des Hospices, exige expertise complète en Bourgogne rouge, Côte de Beaune et blancs de Meursault. Nos clients beaunoises gèrent 200 références avec ticket moyen de 58€, spécialisés Pinot Noir de prestige.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+21%"}, {"label": "Amélioration du ticket moyen", "value": "+24%"}, {"label": "Optimisation cave", "value": "-30%"}], "country": "France", "features": [{"title": "Expertise Côte de Beaune", "desc": "Cataloguez Pommard, Volnay, Corton avec notes terroir"}, {"title": "Accords Cuisine Bourguignonne", "desc": "Recommandations pour boeuf bourguignon et poularde"}, {"title": "Blancs Meursault", "desc": "Gestion spécialisée des blancs chardonnay prestigieux"}, {"title": "Hospices et Ventes Annuelles", "desc": "Suivi lots Hospices et millésimes d''investissement"}], "problems": ["Gestion centaines références Bourgogne", "Authentification grands crus Côte Beaune", "Accords avec cuisine bourguignonne", "Marges insuffisantes grands crus", "Formation personnel oenologie bourguignonne"], "city_name": "Beaune", "ticket_medio": "42€-130€"}'::jsonb,
  '[{"q": "Comment gérer Pommard et Volnay ?", "a": "Notre système classe chaque appellation avec historique millésimes pour sélection optimale."}, {"q": "Avez-vous accords pour boeuf bourguignon ?", "a": "Oui, proposons recommandations spécifiques pour spécialités bourguignonnes."}, {"q": "Comment suivre ventes Hospices ?", "a": "Notre outil intègre calendrier Hospices pour anticiper millésimes importants."}]'::jsonb,
  '["logiciel-carte-des-vins-dijon", "logiciel-carte-des-vins-paris", "logiciel-carte-des-vins-chablis"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-carcassonne',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Carcassonne | Winerim',
  'Gérez votre cave carcassonnaise. Languedoc, Corbières et terroirs occitans pour restaurants de Carcassonne.',
  'Carcassonne, France',
  'Logiciel de carte des vins pour Carcassonne',
  'Optimisez votre sélection Corbières et Languedoc',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Carcassonne, forteresse occitane, impose expertise en Corbières, Minervois et terroirs Languedoc du sud. Nos clients carcassonnais gèrent 110 références avec ticket moyen de 40€, spécialisés cépages méridionaux Grenache.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+18%"}, {"label": "Amélioration du ticket moyen", "value": "+21%"}, {"label": "Réduction stock dormant", "value": "-27%"}], "country": "France", "features": [{"title": "Expertise Corbières", "desc": "Cataloguez terroirs montagneux Corbières avec notes"}, {"title": "Accords Cassoulet Languedoc", "desc": "Recommandations pour cuisine occitane traditionnelle"}, {"title": "Minervois et Grenache", "desc": "Gestion spécialisée cépages méridionaux robustes"}, {"title": "Connectivité Producteurs", "desc": "Réseautez avec vignerons Corbières locaux"}], "problems": ["Connaissance insuffisante Corbières", "Accords complexes avec cassoulet", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges faibles sur régionaux"], "city_name": "Carcassonne", "ticket_medio": "28€-75€"}'::jsonb,
  '[{"q": "Comment développer sélection Corbières ?", "a": "Notre système recommande meilleurs Corbières pour enrichir offre."}, {"q": "Avez-vous accords pour cassoulet ?", "a": "Oui, proposons pairings optimisés pour spécialité occitane."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations directes producteurs Corbières."}]'::jsonb,
  '["logiciel-carte-des-vins-montpellier", "logiciel-carte-des-vins-toulouse", "logiciel-carte-des-vins-nimes"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-metz',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Metz | Winerim',
  'Optimisez votre cave messine. Sélection Alsace, Lorraine et vins de l''Est pour restaurants de Metz.',
  'Metz, France',
  'Logiciel de carte des vins pour Metz et Lorraine',
  'Maîtrisez vins Alsace, Lorraine et terroirs de l''Est',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Metz, cité lorraine, impose expertise en vins Alsace, Moselle et Lorraine. Nos clients messins gèrent 95 références avec ticket moyen de 34€, spécialisés vins secs alsaciens et Riesling élégants.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Expertise Riesling Alsace", "desc": "Cataloguez vins secs alsaciens avec notes minéralité"}, {"title": "Accords Quiche Lorraine", "desc": "Recommandations pour gastronomie lorraine traditionnelle"}, {"title": "Vins Lorraine", "desc": "Gestion spécialisée terroirs lorrains régionaux"}, {"title": "Connectivité Vignerons Est", "desc": "Réseautez avec producteurs Alsace et Lorraine"}], "problems": ["Connaissance insuffisante Riesling", "Accords complexes gastronomie lorraine", "Stock dormant petites AOC", "Manque visibilité producteurs locaux", "Marges insuffisantes régionaux"], "city_name": "Metz", "ticket_medio": "23€-60€"}'::jsonb,
  '[{"q": "Comment développer sélection Riesling ?", "a": "Notre système recommande meilleurs Riesling alsaciens secs."}, {"q": "Avez-vous accords pour quiche lorraine ?", "a": "Oui, proposons recommandations pour gastronomie lorraine."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Alsace."}]'::jsonb,
  '["logiciel-carte-des-vins-nancy", "logiciel-carte-des-vins-strasbourg", "logiciel-carte-des-vins-reims"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-nancy',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Nancy | Winerim',
  'Gérez votre cave nancéienne. Vins Alsace, Lorraine et sélections régionales pour restaurants de Nancy.',
  'Nancy, France',
  'Logiciel de carte des vins pour Nancy',
  'Optimisez votre sélection vins Alsace et Lorraine',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Nancy, cité stanislas, impose expertise en vins Alsace, Moselle et Lorraine. Nos clients nancéiens gèrent 90 références avec ticket moyen de 33€, spécialisés blancs secs alsaciens élégants.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+15%"}, {"label": "Amélioration du ticket moyen", "value": "+18%"}, {"label": "Réduction stock dormant", "value": "-24%"}], "country": "France", "features": [{"title": "Expertise Alsace Blanc", "desc": "Cataloguez Riesling et Gewurztraminer avec notes profil"}, {"title": "Accords Gastronomie Lorraine", "desc": "Recommandations pour potée lorraine et spécialités régionales"}, {"title": "Vins Moselle Région", "desc": "Gestion spécialisée terroirs lorrains uniques"}, {"title": "Connectivité Vignerons", "desc": "Réseautez avec producteurs région Est"}], "problems": ["Connaissance insuffisante cépages alsaciens", "Accords complexes gastronomie régionale", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges faibles régionaux"], "city_name": "Nancy", "ticket_medio": "22€-58€"}'::jsonb,
  '[{"q": "Comment valoriser blancs alsaciens ?", "a": "Notre système recommande meilleurs blancs pour enrichir sélection."}, {"q": "Avez-vous accords pour potée lorraine ?", "a": "Oui, proposons recommandations pour gastronomie lorraine."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Est."}]'::jsonb,
  '["logiciel-carte-des-vins-metz", "logiciel-carte-des-vins-strasbourg", "logiciel-carte-des-vins-reims"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-rouen',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Rouen | Winerim',
  'Optimisez votre cave rouennaise. Loire, Normandie et vins côtiers pour restaurants de Rouen et Normandie.',
  'Rouen, France',
  'Logiciel de carte des vins pour Rouen et Normandie',
  'Maîtrisez vins Loire, Normandie et sélections côtières',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Rouen, cité normande, impose expertise en vins Loire, Cidre Normandie et sélections côtières. Nos clients rouennais gèrent 105 références avec ticket moyen de 37€, spécialisés blancs secs Loire et cidres régionaux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+20%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Expertise Loire Blanc", "desc": "Cataloguez vins secs Loire minéraux avec notes"}, {"title": "Accords Cuisine Normande", "a": "Recommandations pour fruits de mer et gastronomie régionale"}, {"title": "Cidre et Pommeau Normandie", "desc": "Gestion spécialisée cidres et alcools normands"}, {"title": "Connectivité Vignerons Loire", "desc": "Réseautez avec producteurs Loire atlantique"}], "problems": ["Connaissance insuffisante vins Loire", "Accords complexes avec fruits de mer", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges faibles régionaux"], "city_name": "Rouen", "ticket_medio": "25€-65€"}'::jsonb,
  '[{"q": "Comment valoriser blancs Loire ?", "a": "Notre système recommande meilleurs blancs secs Loire."}, {"q": "Avez-vous accords pour fruits de mer ?", "a": "Oui, proposons pairings optimisés pour crustacés."}, {"q": "Comment gérer cidres normands ?", "a": "Notre plateforme intègre cidres et pommeau régionaux."}]'::jsonb,
  '["logiciel-carte-des-vins-caen", "logiciel-carte-des-vins-tours", "logiciel-carte-des-vins-le-havre"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-caen',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Caen | Winerim',
  'Gérez votre cave caennaise. Loire, vins normands et sélections côtières pour restaurants de Caen.',
  'Caen, France',
  'Logiciel de carte des vins pour Caen et Normandie',
  'Optimisez votre sélection Loire et vins normands',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Caen, capitale normande, impose expertise en vins Loire, cidres Normandie et vins côtiers. Nos clients caennais gèrent 95 références avec ticket moyen de 35€, spécialisés blancs secs et cidres régionaux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Expertise Loire", "desc": "Cataloguez blancs secs Loire avec notes minéralité"}, {"title": "Accords Calvados et Gastronomie", "desc": "Recommandations pour cuisine normande traditionnelle"}, {"title": "Cidres et Poirés Normands", "desc": "Gestion spécialisée boissons fermentées régionales"}, {"title": "Connectivité Producteurs Loire", "desc": "Réseautez avec vignerons Loire atlantique"}], "problems": ["Connaissance insuffisante Loire", "Accords complexes gastronomie normande", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Caen", "ticket_medio": "24€-62€"}'::jsonb,
  '[{"q": "Comment valoriser blancs Loire ?", "a": "Notre système recommande meilleurs blancs secs Loire caennais."}, {"q": "Avez-vous accords pour calvados ?", "a": "Oui, proposons recommandations pour gastronomie normande."}, {"q": "Comment intégrer cidres ?", "a": "Notre plateforme gère cidres et pommeau normands."}]'::jsonb,
  '["logiciel-carte-des-vins-rouen", "logiciel-carte-des-vins-le-havre", "logiciel-carte-des-vins-tours"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-le-havre',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Le Havre | Winerim',
  'Optimisez votre cave havraise. Loire, Normandie et sélections côtières pour restaurants havrais.',
  'Le Havre, France',
  'Logiciel de carte des vins pour Le Havre',
  'Maîtrisez vins Loire et fruits de mer normands',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Le Havre, port normand, impose expertise en vins Loire, cidres Normandie pour accompagner huîtres et poissons. Nos clients havrais gèrent 90 références avec ticket moyen de 34€, spécialisés blancs secs minéraux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+15%"}, {"label": "Amélioration du ticket moyen", "value": "+18%"}, {"label": "Réduction stock dormant", "value": "-24%"}], "country": "France", "features": [{"title": "Loire Blanc Expertise", "desc": "Cataloguez blancs secs Loire avec notes profil"}, {"title": "Accords Huîtres et Fruits Mer", "desc": "Recommandations pour fruits de mer côtiers"}, {"title": "Cidres Normandie", "desc": "Gestion spécialisée cidres et pommeau régionaux"}, {"title": "Connectivité Producteurs Loire", "desc": "Réseautez avec vignerons Loire atlantique"}], "problems": ["Connaissance insuffisante vins Loire", "Accords complexes fruits de mer", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges faibles régionaux"], "city_name": "Le Havre", "ticket_medio": "23€-60€"}'::jsonb,
  '[{"q": "Comment valoriser blancs Loire ?", "a": "Notre système recommande meilleurs blancs secs minéraux."}, {"q": "Avez-vous accords pour huîtres ?", "a": "Oui, proposons pairings optimisés pour huîtres normanddes."}, {"q": "Comment gérer cidres ?", "a": "Notre plateforme intègre cidres et pommeau normands."}]'::jsonb,
  '["logiciel-carte-des-vins-rouen", "logiciel-carte-des-vins-caen", "logiciel-carte-des-vins-la-rochelle"]'::jsonb,
  'Article',
  true
);


INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-poitiers',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Poitiers | Winerim',
  'Gérez votre cave poitevine. Loire, Haut-Poitou et vins régionaux pour restaurants de Poitiers.',
  'Poitiers, France',
  'Logiciel de carte des vins pour Poitiers',
  'Optimisez votre sélection Loire et Haut-Poitou',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Poitiers, cité médiévale, impose expertise en vins Loire, Haut-Poitou et blancs régionaux. Nos clients poitevins gèrent 85 références avec ticket moyen de 32€, spécialisés blancs secs légers régionaux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+15%"}, {"label": "Amélioration du ticket moyen", "value": "+17%"}, {"label": "Réduction stock dormant", "value": "-23%"}], "country": "France", "features": [{"title": "Loire Blanc Haut-Poitou", "desc": "Cataloguez blancs secs légers régionaux"}, {"title": "Accords Cuisine Poitevine", "desc": "Recommandations pour gastronomie régionale"}, {"title": "Vins Régionaux Légers", "desc": "Gestion spécialisée blancs secs Haut-Poitou"}, {"title": "Connectivité Producteurs Loire", "desc": "Réseautez avec vignerons Loire"}], "problems": ["Connaissance insuffisante Loire", "Accords complexes gastronomie régionale", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Poitiers", "ticket_medio": "22€-55€"}'::jsonb,
  '[{"q": "Comment valoriser blancs Loire ?", "a": "Notre système recommande meilleurs blancs secs Haut-Poitou."}, {"q": "Avez-vous accords pour cuisine poitevine ?", "a": "Oui, proposons recommandations pour gastronomie régionale."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Loire."}]'::jsonb,
  '["logiciel-carte-des-vins-tours", "logiciel-carte-des-vins-angers", "logiciel-carte-des-vins-limoges"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-limoges',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Limoges | Winerim',
  'Optimisez votre cave limousine. Bordeaux, Bergerac et vins du Limousin pour restaurants de Limoges.',
  'Limoges, France',
  'Logiciel de carte des vins pour Limoges et Limousin',
  'Maîtrisez Bordeaux, Bergerac et terroirs régionaux',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Limoges, cité porcelainière, impose expertise en Bordeaux, Bergerac et vins Limousin. Nos clients limousins gèrent 100 références avec ticket moyen de 38€, spécialisés rouges élégants et Merlot régionaux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Bordeaux et Bergerac", "desc": "Cataloguez Merlot et terroirs avec notes profil"}, {"title": "Accords Gastronomie Limousine", "desc": "Recommandations pour clafoutis et cuisine régionale"}, {"title": "Vins Limousin Régionaux", "desc": "Gestion spécialisée rouges légers régionaux"}, {"title": "Connectivité Producteurs", "desc": "Réseautez avec vignerons Bergerac"}], "problems": ["Connaissance insuffisante Bordeaux", "Accords complexes gastronomie régionale", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Limoges", "ticket_medio": "26€-70€"}'::jsonb,
  '[{"q": "Comment valoriser Bordeaux et Bergerac ?", "a": "Notre système recommande meilleurs crus Bordeaux pour enrichir."}, {"q": "Avez-vous accords pour clafoutis ?", "a": "Oui, proposons recommandations pour gastronomie limousine."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Bergerac."}]'::jsonb,
  '["logiciel-carte-des-vins-toulouse", "logiciel-carte-des-vins-poitiers", "logiciel-carte-des-vins-bordeaux"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-clermont-ferrand',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Clermont-Ferrand | Winerim',
  'Gérez votre cave clermontoise. Côtes d''Auvergne, Loire et vins régionaux pour restaurants d''Auvergne.',
  'Clermont-Ferrand, France',
  'Logiciel de carte des vins pour Clermont-Ferrand',
  'Optimisez votre sélection Côtes Auvergne et Loire',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Clermont-Ferrand, capitale auvergnate, impose expertise en Côtes d''Auvergne, Loire et vins régionaux. Nos clients clermontois gèrent 80 références avec ticket moyen de 31€, spécialisés rouges légers et Pinot Noir.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+14%"}, {"label": "Amélioration du ticket moyen", "value": "+16%"}, {"label": "Réduction stock dormant", "value": "-22%"}], "country": "France", "features": [{"title": "Côtes d''Auvergne", "desc": "Cataloguez terroirs auvergnats avec notes profil"}, {"title": "Accords Gastronomie Auvergnate", "desc": "Recommandations pour aligot et truffade"}, {"title": "Vins Légers Régionaux", "desc": "Gestion spécialisée rouges légers Auvergne"}, {"title": "Connectivité Producteurs Auvergne", "desc": "Réseautez avec vignerons locaux"}], "problems": ["Connaissance insuffisante Côtes Auvergne", "Accords complexes gastronomie régionale", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Clermont-Ferrand", "ticket_medio": "21€-52€"}'::jsonb,
  '[{"q": "Comment valoriser Côtes Auvergne ?", "a": "Notre système recommande meilleurs crus locaux pour enrichir."}, {"q": "Avez-vous accords pour aligot ?", "a": "Oui, proposons recommandations pour gastronomie auvergnate."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs locaux."}]'::jsonb,
  '["logiciel-carte-des-vins-lyon", "logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-chambery"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-saint-etienne',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Saint-Étienne | Winerim',
  'Optimisez votre cave stéphanoise. Loire, Côtes Rhône et vins régionaux pour restaurants de Saint-Étienne.',
  'Saint-Étienne, France',
  'Logiciel de carte des vins pour Saint-Étienne',
  'Maîtrisez Loire, Rhône et terroirs régionaux',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Saint-Étienne, cité stéphanoise, impose expertise en vins Loire, Côtes Rhône et terroirs régionaux. Nos clients stéphanois gèrent 85 références avec ticket moyen de 33€, spécialisés blancs secs et rouges légers.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+15%"}, {"label": "Amélioration du ticket moyen", "value": "+18%"}, {"label": "Réduction stock dormant", "value": "-24%"}], "country": "France", "features": [{"title": "Loire et Rhône", "desc": "Cataloguez vins régionaux avec notes profil"}, {"title": "Accords Gastronomie Stéphanoise", "desc": "Recommandations pour cuisine régionale"}, {"title": "Vins Légers Régionaux", "desc": "Gestion spécialisée blancs et rouges légers"}, {"title": "Connectivité Producteurs", "desc": "Réseautez avec vignerons Loire-Rhône"}], "problems": ["Connaissance insuffisante Loire-Rhône", "Accords complexes gastronomie", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Saint-Étienne", "ticket_medio": "23€-62€"}'::jsonb,
  '[{"q": "Comment valoriser Loire et Rhône ?", "a": "Notre système recommande meilleurs crus régionaux."}, {"q": "Avez-vous accords pour cuisine stéphanoise ?", "a": "Oui, proposons recommandations pour gastronomie régionale."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Loire-Rhône."}]'::jsonb,
  '["logiciel-carte-des-vins-lyon", "logiciel-carte-des-vins-grenoble", "logiciel-carte-des-vins-chambery"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-annecy',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Annecy | Winerim',
  'Gérez votre cave annecienne. Savoie, Rhône et vins alpins pour restaurants d''Annecy et Haute-Savoie.',
  'Annecy, France',
  'Logiciel de carte des vins pour Annecy et Savoie',
  'Optimisez votre sélection Savoie et vins alpins',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Annecy, cité savoyarde, impose expertise en vins Savoie, Mondeuse et cépages alpins. Nos clients anneciens gèrent 95 références avec ticket moyen de 36€, spécialisés Jacquère et vins de montagne.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Expertise Savoie", "desc": "Cataloguez cépages alpins avec notes montagne"}, {"title": "Accords Fondue et Raclette", "desc": "Recommandations pour gastronomie savoyarde"}, {"title": "Jacquère et Mondeuse", "desc": "Gestion spécialisée blancs et rouges savoyards"}, {"title": "Connectivité Vignerons Savoie", "desc": "Réseautez avec producteurs alpins"}], "problems": ["Connaissance insuffisante cépages alpins", "Accords complexes fondue et raclette", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Annecy", "ticket_medio": "25€-68€"}'::jsonb,
  '[{"q": "Comment valoriser Savoie ?", "a": "Notre système recommande meilleurs crus savoyards alpins."}, {"q": "Avez-vous accords pour fondue et raclette ?", "a": "Oui, proposons pairings optimisés gastronomie savoyarde."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs alpins."}]'::jsonb,
  '["logiciel-carte-des-vins-chambery", "logiciel-carte-des-vins-grenoble", "logiciel-carte-des-vins-lyon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-chambery',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Chambéry | Winerim',
  'Optimisez votre cave chambérienne. Savoie, Rhône et vins alpins pour restaurants de Chambéry.',
  'Chambéry, France',
  'Logiciel de carte des vins pour Chambéry',
  'Maîtrisez Savoie, Rhône et terroirs montagnards',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Chambéry, capitale savoyarde, impose expertise en vins Savoie, Rhône et cépages alpins. Nos clients chambériens gèrent 100 références avec ticket moyen de 38€, spécialisés Jacquère, Mondeuse et vins montagnards.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+20%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Savoie Expertise Complète", "desc": "Cataloguez cépages alpins avec notes terroir"}, {"title": "Accords Gastronomie Alpine", "desc": "Recommandations pour raclette et fondue savoyarde"}, {"title": "Vins Montagnards Régionaux", "desc": "Gestion spécialisée blancs et rouges alpins"}, {"title": "Connectivité Producteurs Savoie", "desc": "Réseautez avec vignerons montagnards"}], "problems": ["Connaissance insuffisante cépages alpins", "Accords complexes gastronomie savoyarde", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Chambéry", "ticket_medio": "27€-75€"}'::jsonb,
  '[{"q": "Comment valoriser Savoie complètement ?", "a": "Notre système recommande meilleurs crus savoyards alpins."}, {"q": "Avez-vous accords pour raclette savoyarde ?", "a": "Oui, proposons pairings optimisés gastronomie alpine."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs savoyards."}]'::jsonb,
  '["logiciel-carte-des-vins-annecy", "logiciel-carte-des-vins-grenoble", "logiciel-carte-des-vins-lyon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-ajaccio',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Ajaccio | Winerim',
  'Gérez votre cave ajaccienne. Vins corses, Patrimonio et Sciaccarello pour restaurants d''Ajaccio.',
  'Ajaccio, France',
  'Logiciel de carte des vins pour Ajaccio et Corse',
  'Optimisez votre sélection vins corses Patrimonio',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Ajaccio, capitale corse, impose expertise en vins Patrimonio, Sciaccarello et terroirs corses unique. Nos clients ajacciens gèrent 75 références avec ticket moyen de 39€, spécialisés rouges corses puissants et Niellucciu.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+18%"}, {"label": "Amélioration du ticket moyen", "value": "+21%"}, {"label": "Réduction stock dormant", "value": "-27%"}], "country": "France", "features": [{"title": "Patrimonio et Vins Corses", "desc": "Cataloguez terroirs corses uniques avec notes"}, {"title": "Accords Gastronomie Corse", "desc": "Recommandations pour charcuterie et cuisine régionale"}, {"title": "Sciaccarello et Niellucciu", "desc": "Gestion spécialisée cépages corses prestigieux"}, {"title": "Connectivité Producteurs Corse", "desc": "Réseautez avec vignerons corses locaux"}], "problems": ["Connaissance insuffisante terroirs corses", "Accords complexes gastronomie corse", "Stock dormant de petites AOC", "Manque visibilité producteurs", "Marges insuffisantes sur régionaux"], "city_name": "Ajaccio", "ticket_medio": "28€-80€"}'::jsonb,
  '[{"q": "Comment valoriser vins corses ?", "a": "Notre système recommande meilleurs crus Patrimonio corses."}, {"q": "Avez-vous accords pour charcuterie corse ?", "a": "Oui, proposons pairings optimisés gastronomie corse."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs corses."}]'::jsonb,
  '["logiciel-carte-des-vins-bastia", "logiciel-carte-des-vins-nice", "logiciel-carte-des-vins-marseille"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-bastia',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Bastia | Winerim',
  'Optimisez votre cave bastiaise. Vins corses Patrimonio et terroirs pour restaurants de Bastia.',
  'Bastia, France',
  'Logiciel de carte des vins pour Bastia et Haute-Corse',
  'Maîtrisez terroirs corses Patrimonio et régionaux',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Bastia, port corse, impose expertise en Patrimonio, Sciaccarello et terroirs corses uniques. Nos clients bastiaises gèrent 70 références avec ticket moyen de 37€, spécialisés rouges corses corsés et cépages méditerranéens.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+20%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Patrimonio Expertise", "desc": "Cataloguez Patrimonio avec notes minéralité"}, {"title": "Accords Charcuterie Corse", "desc": "Recommandations pour spécialités régionales"}, {"title": "Sciaccarello Corsé", "desc": "Gestion spécialisée rouges corsés puissants"}, {"title": "Connectivité Vignerons Corse", "desc": "Réseautez avec producteurs locaux corses"}], "problems": ["Connaissance insuffisante terroirs corses", "Accords complexes gastronomie régionale", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Bastia", "ticket_medio": "26€-75€"}'::jsonb,
  '[{"q": "Comment valoriser Patrimonio ?", "a": "Notre système recommande meilleurs crus Patrimonio corses."}, {"q": "Avez-vous accords pour charcuterie corse ?", "a": "Oui, proposons pairings optimisés pour spécialités corses."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs corses."}]'::jsonb,
  '["logiciel-carte-des-vins-ajaccio", "logiciel-carte-des-vins-nice", "logiciel-carte-des-vins-marseille"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-la-rochelle',
  'city',
  'fr',
  'Logiciel de Carte des Vins à La Rochelle | Winerim',
  'Gérez votre cave rochelaise. Loire, vins côtiers et fruits de mer pour restaurants de La Rochelle.',
  'La Rochelle, France',
  'Logiciel de carte des vins pour La Rochelle',
  'Optimisez votre sélection Loire et vins côtiers',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "La Rochelle, port atlantique, impose expertise en vins Loire, Muscadet et sélections côtières pour huîtres. Nos clients rochelais gèrent 90 références avec ticket moyen de 35€, spécialisés blancs secs minéraux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Loire et Muscadet", "desc": "Cataloguez blancs secs Loire atlantiques"}, {"title": "Accords Huîtres et Fruits Mer", "desc": "Recommandations pour huîtres de Marennes"}, {"title": "Vins Côtiers Légers", "desc": "Gestion spécialisée blancs secs minéraux"}, {"title": "Connectivité Producteurs Loire", "desc": "Réseautez avec vignerons Loire atlantique"}], "problems": ["Connaissance insuffisante Loire", "Accords complexes fruits de mer", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "La Rochelle", "ticket_medio": "24€-62€"}'::jsonb,
  '[{"q": "Comment valoriser Loire blanc ?", "a": "Notre système recommande meilleurs blancs secs Loire."}, {"q": "Avez-vous accords pour huîtres Marennes ?", "a": "Oui, proposons pairings optimisés pour huîtres."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Loire."}]'::jsonb,
  '["logiciel-carte-des-vins-nantes", "logiciel-carte-des-vins-rennes", "logiciel-carte-des-vins-tours"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-brest',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Brest | Winerim',
  'Optimisez votre cave brestoise. Loire, cidre Bretagne et fruits de mer pour restaurants de Brest.',
  'Brest, France',
  'Logiciel de carte des vins pour Brest et Bretagne',
  'Maîtrisez Loire blanc et cidre breton',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Brest, port breton, impose expertise en vins Loire, cidre Bretagne et sélections côtières pour fruits de mer. Nos clients brestois gèrent 85 références avec ticket moyen de 34€, spécialisés blancs secs et cidres régionaux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+15%"}, {"label": "Amélioration du ticket moyen", "value": "+18%"}, {"label": "Réduction stock dormant", "value": "-24%"}], "country": "France", "features": [{"title": "Loire Blanc Expertise", "desc": "Cataloguez vins secs Loire minéraux"}, {"title": "Accords Fruits Mer Bretons", "desc": "Recommandations pour homard et poissons"}, {"title": "Cidre Pommeau Bretagne", "desc": "Gestion spécialisée cidres et poirés bretons"}, {"title": "Connectivité Producteurs Loire", "desc": "Réseautez avec vignerons Loire atlantique"}], "problems": ["Connaissance insuffisante Loire", "Accords complexes fruits de mer", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Brest", "ticket_medio": "23€-60€"}'::jsonb,
  '[{"q": "Comment valoriser blancs Loire ?", "a": "Notre système recommande meilleurs blancs secs minéraux."}, {"q": "Avez-vous accords pour homard ?", "a": "Oui, proposons pairings optimisés fruits de mer bretons."}, {"q": "Comment intégrer cidres bretons ?", "a": "Notre plateforme gère cidres et pommeau bretons."}]'::jsonb,
  '["logiciel-carte-des-vins-rennes", "logiciel-carte-des-vins-la-rochelle", "logiciel-carte-des-vins-rouen"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-pau',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Pau | Winerim',
  'Gérez votre cave paloise. Madiran, Jurançon et vins du Béarn pour restaurants de Pau.',
  'Pau, France',
  'Logiciel de carte des vins pour Pau et Béarn',
  'Optimisez votre sélection Madiran et Jurançon',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Pau, capitale béarnaise, impose expertise en Madiran, Jurançon et terroirs Béarn. Nos clients palois gèrent 85 références avec ticket moyen de 36€, spécialisés rouges tanniques Madiran et blancs doux Jurançon.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Madiran Expertise", "desc": "Cataloguez rouges tanniques Béarn"}, {"title": "Accords Garbure et Viande", "desc": "Recommandations pour cuisine béarnaise"}, {"title": "Jurançon Doux", "desc": "Gestion spécialisée blancs doux Jurançon"}, {"title": "Connectivité Vignerons Béarn", "desc": "Réseautez avec producteurs béarnais"}], "problems": ["Connaissance insuffisante Madiran-Jurançon", "Accords complexes gastronomie béarnaise", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Pau", "ticket_medio": "25€-70€"}'::jsonb,
  '[{"q": "Comment valoriser Madiran et Jurançon ?", "a": "Notre système recommande meilleurs crus béarnais."}, {"q": "Avez-vous accords pour garbure ?", "a": "Oui, proposons recommandations pour gastronomie béarnaise."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs béarnais."}]'::jsonb,
  '["logiciel-carte-des-vins-bayonne", "logiciel-carte-des-vins-toulouse", "logiciel-carte-des-vins-bordeaux"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-nimes',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Nîmes | Winerim',
  'Optimisez votre cave nîmoise. Costières Nîmes, Rhône et vins méditerranéens pour restaurants de Nîmes.',
  'Nîmes, France',
  'Logiciel de carte des vins pour Nîmes',
  'Maîtrisez Costières Nîmes et vins Rhône',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Nîmes, cité romaine, impose expertise en Costières de Nîmes, Rhône et vins méditerranéens. Nos clients nîmois gèrent 110 références avec ticket moyen de 41€, spécialisés vins Costières prestige et cépages méridionaux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+18%"}, {"label": "Amélioration du ticket moyen", "value": "+21%"}, {"label": "Réduction stock dormant", "value": "-27%"}], "country": "France", "features": [{"title": "Costières Expertise", "desc": "Cataloguez terroir Costières Nîmes prestige"}, {"title": "Accords Gastronomie Nîmoise", "desc": "Recommandations pour cuisine méditerranéenne"}, {"title": "Vins Rhône Côtiers", "desc": "Gestion spécialisée vins méditerranéens"}, {"title": "Connectivité Producteurs", "desc": "Réseautez avec vignerons Costières"}], "problems": ["Connaissance insuffisante Costières Nîmes", "Accords complexes gastronomie méditerranéenne", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Nîmes", "ticket_medio": "30€-80€"}'::jsonb,
  '[{"q": "Comment valoriser Costières Nîmes ?", "a": "Notre système recommande meilleurs crus Costières prestige."}, {"q": "Avez-vous accords pour gastronomie nîmoise ?", "a": "Oui, proposons pairings optimisés méditerranéens."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Costières."}]'::jsonb,
  '["logiciel-carte-des-vins-arles", "logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-montpellier"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-arles',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Arles | Winerim',
  'Gérez votre cave arlésienne. Rhône, Provence et terroirs méditerranéens pour restaurants d''Arles.',
  'Arles, France',
  'Logiciel de carte des vins pour Arles',
  'Optimisez votre sélection Rhône et Provence',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Arles, cité provençale, impose expertise en vins Rhône, Provence et terroirs méditerranéens. Nos clients arlésiens gèrent 105 références avec ticket moyen de 40€, spécialisés rouges Grenache et rosés Provence.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+20%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Rhône Provence", "desc": "Cataloguez terroirs méditerranéens avec notes"}, {"title": "Accords Gastronomie Provençale", "desc": "Recommandations pour ratatouille et bouillabaisse"}, {"title": "Grenache Rosés Prestige", "desc": "Gestion spécialisée rouges grenache prestige"}, {"title": "Connectivité Producteurs Provence", "desc": "Réseautez avec vignerons provençaux"}], "problems": ["Connaissance insuffisante terroirs provençaux", "Accords complexes gastronomie régionale", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Arles", "ticket_medio": "28€-75€"}'::jsonb,
  '[{"q": "Comment valoriser terroirs provençaux ?", "a": "Notre système recommande meilleurs crus Rhône-Provence."}, {"q": "Avez-vous accords pour bouillabaisse ?", "a": "Oui, proposons pairings optimisés gastronomie provençale."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs provençaux."}]'::jsonb,
  '["logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-nimes", "logiciel-carte-des-vins-marseille"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-auxerre',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Auxerre | Winerim',
  'Optimisez votre cave auxerroise. Chablis, Bourgogne et terroirs bourguignons pour restaurants d''Auxerre.',
  'Auxerre, France',
  'Logiciel de carte des vins pour Auxerre',
  'Maîtrisez Chablis et terroirs bourguignons',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Auxerre, cité bourguignonne, impose expertise en Chablis, Bourgogne et terroirs blancs. Nos clients auxerrois gèrent 95 références avec ticket moyen de 37€, spécialisés Chablis Grand Cru et blancs prestige.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Chablis Grand Cru", "desc": "Cataloguez Chablis avec notes minéralité"}, {"title": "Accords Gastronomie Bourguignonne", "desc": "Recommandations pour cuisine régionale"}, {"title": "Blancs Bourgogne Prestige", "desc": "Gestion spécialisée Chardonnay bourguignons"}, {"title": "Connectivité Vignerons Chablis", "desc": "Réseautez avec producteurs Chablis"}], "problems": ["Connaissance insuffisante Chablis Grand Cru", "Accords complexes gastronomie bourguignonne", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Auxerre", "ticket_medio": "26€-72€"}'::jsonb,
  '[{"q": "Comment valoriser Chablis Grand Cru ?", "a": "Notre système recommande meilleurs Chablis prestige."}, {"q": "Avez-vous accords pour cuisine bourguignonne ?", "a": "Oui, proposons recommandations pour gastronomie régionale."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Chablis."}]'::jsonb,
  '["logiciel-carte-des-vins-dijon", "logiciel-carte-des-vins-beaune", "logiciel-carte-des-vins-paris"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-epernay',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Épernay | Winerim',
  'Gérez votre cave épernaysienne. Champagne prestige et cuvées de prestige pour restaurants d''Épernay.',
  'Épernay, France',
  'Logiciel de carte des vins pour Épernay',
  'Optimisez votre sélection champagne de prestige',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Épernay, cité champagne, impose expertise complète en champagne prestige, cuvées de prestige et vins rares. Nos clients épernaysiens gèrent 180+ références avec ticket moyen de 68€, spécialisés Dom Pérignon, Veuve Clicquot et grands crus.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+24%"}, {"label": "Amélioration du ticket moyen", "value": "+28%"}, {"label": "Optimisation cave", "value": "-34%"}], "country": "France", "features": [{"title": "Champagne Prestige Expertise", "desc": "Cataloguez Dom Pérignon, Veuve Clicquot avec traçabilité"}, {"title": "Accords Gastronomie Champenoise", "desc": "Recommandations pour cuisine de prestige"}, {"title": "Cuvées de Prestige Rares", "desc": "Gestion spécialisée champagnes d''investissement"}, {"title": "Connectivité Maisons Champagne", "desc": "Réseautez avec grandes champagneries Épernay"}], "problems": ["Gestion centaines références champagne", "Authentification cuvées prestigieuses", "Accords avec gastronomie raffinée", "Marges très élevées à optimiser", "Formation personnel à luxe vinicole"], "city_name": "Épernay", "ticket_medio": "48€-200€"}'::jsonb,
  '[{"q": "Comment gérer Dom Pérignon et cuvées prestige ?", "a": "Notre système trace chaque cuvée rare avec authentification."}, {"q": "Avez-vous accords pour cuisine champenoise ?", "a": "Oui, proposons pairings pour gastronomie de prestige."}, {"q": "Comment connecter avec maisons champagne ?", "a": "Notre plateforme facilite relations grandes champagneries."}]'::jsonb,
  '["logiciel-carte-des-vins-reims", "logiciel-carte-des-vins-paris", "logiciel-carte-des-vins-lille"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-sancerre',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Sancerre | Winerim',
  'Optimisez votre cave sancerroise. Sancerre blanc, Loire et terroirs pour restaurants de Sancerre.',
  'Sancerre, France',
  'Logiciel de carte des vins pour Sancerre et Loire',
  'Maîtrisez Sancerre blanc et terroirs Loire',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Sancerre, terroir prestigieux, impose expertise complète en Sancerre blanc, Pouilly-Fumé et terroirs Loire. Nos clients sancerrois gèrent 80 références avec ticket moyen de 42€, spécialisés Sancerre blanc minéral de prestige.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+18%"}, {"label": "Amélioration du ticket moyen", "value": "+21%"}, {"label": "Réduction stock dormant", "value": "-27%"}], "country": "France", "features": [{"title": "Sancerre Blanc Prestige", "desc": "Cataloguez Sancerre blanc minéral prestige"}, {"title": "Accords Gastronomie Loire", "desc": "Recommandations pour cuisine loirienne raffinée"}, {"title": "Pouilly-Fumé Loire", "desc": "Gestion spécialisée blancs prestige Loire"}, {"title": "Connectivité Producteurs Sancerre", "desc": "Réseautez avec vignerons sancerrois"}], "problems": ["Connaissance insuffisante terroirs Sancerre", "Accords complexes gastronomie loirienne", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Sancerre", "ticket_medio": "30€-85€"}'::jsonb,
  '[{"q": "Comment valoriser Sancerre blanc prestige ?", "a": "Notre système recommande meilleurs Sancerre minéraux."}, {"q": "Avez-vous accords pour cuisine loirienne ?", "a": "Oui, proposons pairings pour gastronomie loirienne."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs sancerrois."}]'::jsonb,
  '["logiciel-carte-des-vins-tours", "logiciel-carte-des-vins-angers", "logiciel-carte-des-vins-chablis"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-chablis',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Chablis | Winerim',
  'Gérez votre cave chablis ienne. Chablis blanc prestige et terroirs pour restaurants de Chablis.',
  'Chablis, France',
  'Logiciel de carte des vins pour Chablis',
  'Optimisez votre sélection Chablis prestige',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Chablis, terroir blanc prestigieux, impose expertise complète en Chablis Grand Cru, Premier Cru et terroirs minéraux. Nos clients chabliennes gèrent 75 références avec ticket moyen de 45€, spécialisés Chablis minéral de prestige.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+20%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Chablis Grand Cru Prestige", "desc": "Cataloguez Chablis Grand Cru minéral prestige"}, {"title": "Accords Fruits Mer Loire", "desc": "Recommandations pour fruits de mer loiriens"}, {"title": "Premier Cru Chablis", "desc": "Gestion spécialisée Chablis Premier Cru"}, {"title": "Connectivité Producteurs Chablis", "desc": "Réseautez avec producteurs chablis locaux"}], "problems": ["Connaissance insuffisante Chablis Grand Cru", "Accords complexes gastronomie régionale", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Chablis", "ticket_medio": "32€-90€"}'::jsonb,
  '[{"q": "Comment valoriser Chablis Grand Cru ?", "a": "Notre système recommande meilleurs Chablis minéraux prestige."}, {"q": "Avez-vous accords pour fruits de mer ?", "a": "Oui, proposons pairings optimisés pour crustacés."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs chablis."}]'::jsonb,
  '["logiciel-carte-des-vins-auxerre", "logiciel-carte-des-vins-dijon", "logiciel-carte-des-vins-beaune"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-chateauneuf-du-pape',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Châteauneuf-du-Pape | Winerim',
  'Optimisez votre cave châteauneuvoise. Châteauneuf-du-Pape prestige et terroirs Rhône.',
  'Châteauneuf-du-Pape, France',
  'Logiciel de carte des vins pour Châteauneuf-du-Pape',
  'Maîtrisez Châteauneuf prestige et grands crus',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Châteauneuf-du-Pape, terroir papal prestigieux, impose expertise en Châteauneuf-du-Pape Grand Cru et vins de légende. Nos clients châteauneuvois gèrent 120 références avec ticket moyen de 55€, spécialisés Grenache Mourvèdre prestige.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+20%"}, {"label": "Amélioration du ticket moyen", "value": "+23%"}, {"label": "Réduction stock dormant", "value": "-29%"}], "country": "France", "features": [{"title": "Châteauneuf Grand Cru Prestige", "desc": "Cataloguez grands crus papal avec traçabilité"}, {"title": "Accords Gastronomie Provençale", "desc": "Recommandations pour gastronomie raffinée papale"}, {"title": "Grenache Mourvèdre Prestige", "desc": "Gestion spécialisée cépages grands crus"}, {"title": "Connectivité Producteurs Papaux", "desc": "Réseautez avec vignerons châteauneuvois"}], "problems": ["Gestion centaines références prestige", "Authentification grands crus papal", "Accords gastronomie raffinée", "Marges très élevées optimiser", "Formation personnel oenologie papale"], "city_name": "Châteauneuf-du-Pape", "ticket_medio": "38€-120€"}'::jsonb,
  '[{"q": "Comment gérer Châteauneuf grands crus ?", "a": "Notre système classe grands crus papal avec notes apogée."}, {"q": "Avez-vous accords pour gastronomie papale ?", "a": "Oui, proposons pairings pour cuisine raffinée provençale."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs papaux."}]'::jsonb,
  '["logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-arles", "logiciel-carte-des-vins-nimes"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-chinon',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Chinon | Winerim',
  'Gérez votre cave chinonaise. Chinon rouge prestige et vins Loire pour restaurants de Chinon.',
  'Chinon, France',
  'Logiciel de carte des vins pour Chinon et Loire',
  'Optimisez votre sélection Chinon prestige',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Chinon, terroir rouge prestigieux, impose expertise en Chinon prestige, Cabernet Franc et terroirs de Loire. Nos clients chinonais gèrent 75 références avec ticket moyen de 40€, spécialisés Chinon rouge prestige de terroir.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Chinon Rouge Prestige", "desc": "Cataloguez Chinon rouge terroir prestige"}, {"title": "Accords Gastronomie Loire", "desc": "Recommandations pour cuisine loirienne raffinée"}, {"title": "Cabernet Franc Prestige", "desc": "Gestion spécialisée Cabernet Franc terroirés"}, {"title": "Connectivité Producteurs Chinon", "desc": "Réseautez avec vignerons chinonais"}], "problems": ["Connaissance insuffisante Chinon prestige", "Accords complexes gastronomie loirienne", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Chinon", "ticket_medio": "28€-78€"}'::jsonb,
  '[{"q": "Comment valoriser Chinon prestige ?", "a": "Notre système recommande meilleurs Chinon rouges terroir."}, {"q": "Avez-vous accords pour cuisine loirienne ?", "a": "Oui, proposons pairings pour gastronomie loirienne."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs chinonais."}]'::jsonb,
  '["logiciel-carte-des-vins-tours", "logiciel-carte-des-vins-angers", "logiciel-carte-des-vins-sancerre"]'::jsonb,
  'Article',
  true
);

COMMIT;
