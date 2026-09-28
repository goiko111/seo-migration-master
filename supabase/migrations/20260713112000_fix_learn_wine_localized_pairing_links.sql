-- Fix localized pairing-generator and DE wine-style links in already published learn-wine articles.
-- The original migration may already be applied, so this corrective migration is
-- idempotent and updates the persisted rows directly.

UPDATE public.articles
SET
  body = replace(replace(COALESCE(body, ''), '](/wine-pairing-generator)', '](/de/weinbegleitung-generator)'), '/de/weinbibliothek/stile', '/de/weinbibliothek/weinstile'),
  related_links = $json$[
    {"to":"/de/wein-lernen","label":"Wein lernen","type":"guide"},
    {"to":"/de/weinbibliothek/weinbegleitung","label":"Pairings","type":"guide"},
    {"to":"/de/weinbibliothek/weinstile","label":"Weinstile","type":"guide"},
    {"to":"/de/weinbegleitung-generator","label":"Pairing-Generator","type":"tool"},
    {"to":"/de/demo","label":"Demo","type":"solution"}
  ]$json$::jsonb,
  updated_at = now()
WHERE slug = 'grundlagen-weinbegleitung-restaurants_de';

UPDATE public.articles
SET
  body = replace(COALESCE(body, ''), '](/wine-pairing-generator)', '](/pt/gerador-harmonizacoes-ia)'),
  related_links = $json$[
    {"to":"/pt/aprender-vinho","label":"Aprender vinho","type":"guide"},
    {"to":"/pt/biblioteca-vinho/harmonizacoes","label":"Harmonizações","type":"guide"},
    {"to":"/pt/biblioteca-vinho/estilos","label":"Estilos de vinho","type":"guide"},
    {"to":"/pt/gerador-harmonizacoes-ia","label":"Gerador de harmonizações","type":"tool"},
    {"to":"/pt/demo","label":"Pedir demo","type":"solution"}
  ]$json$::jsonb,
  updated_at = now()
WHERE slug = 'harmonizacoes-basicas-para-restaurantes_pt';

UPDATE public.articles
SET
  body = CASE lang
    WHEN 'en' THEN replace(COALESCE(body, ''), '](/wine-pairing-generator)', '](/en/wine-pairing-generator)')
    WHEN 'it' THEN replace(COALESCE(body, ''), '](/wine-pairing-generator)', '](/it/generatore-abbinamenti-ia)')
    WHEN 'fr' THEN replace(COALESCE(body, ''), '](/wine-pairing-generator)', '](/fr/generateur-accords-ia)')
    WHEN 'de' THEN replace(replace(COALESCE(body, ''), '](/wine-pairing-generator)', '](/de/weinbegleitung-generator)'), '/de/weinbibliothek/stile', '/de/weinbibliothek/weinstile')
    WHEN 'pt' THEN replace(COALESCE(body, ''), '](/wine-pairing-generator)', '](/pt/gerador-harmonizacoes-ia)')
    ELSE body
  END,
  related_links = CASE lang
    WHEN 'en' THEN replace(COALESCE(related_links, '[]'::jsonb)::text, '"/wine-pairing-generator"', '"/en/wine-pairing-generator"')::jsonb
    WHEN 'it' THEN replace(COALESCE(related_links, '[]'::jsonb)::text, '"/wine-pairing-generator"', '"/it/generatore-abbinamenti-ia"')::jsonb
    WHEN 'fr' THEN replace(COALESCE(related_links, '[]'::jsonb)::text, '"/wine-pairing-generator"', '"/fr/generateur-accords-ia"')::jsonb
    WHEN 'de' THEN replace(
      replace(COALESCE(related_links, '[]'::jsonb)::text, '"/wine-pairing-generator"', '"/de/weinbegleitung-generator"'),
      '"/de/weinbibliothek/stile"',
      '"/de/weinbibliothek/weinstile"'
    )::jsonb
    WHEN 'pt' THEN replace(COALESCE(related_links, '[]'::jsonb)::text, '"/wine-pairing-generator"', '"/pt/gerador-harmonizacoes-ia"')::jsonb
    ELSE related_links
  END,
  updated_at = now()
WHERE lang IN ('en', 'it', 'fr', 'de', 'pt')
  AND (
    COALESCE(body, '') LIKE '%/wine-pairing-generator%'
    OR COALESCE(body, '') LIKE '%/de/weinbibliothek/stile%'
    OR COALESCE(related_links, '[]'::jsonb)::text LIKE '%/wine-pairing-generator%'
    OR COALESCE(related_links, '[]'::jsonb)::text LIKE '%/de/weinbibliothek/stile%'
  );
