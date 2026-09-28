-- Correct legacy DE/PT pairing links in already-published article bodies and related links.
-- Scope: global safety pass over public.articles, not limited to Learn Wine.

UPDATE public.articles
SET
  body = replace(
    replace(
      replace(
        replace(COALESCE(body, ''),
          '](/de/wine-pairing-generator)', '](/de/weinbegleitung-generator)'),
        '](/de/pairing-generator)', '](/de/weinbegleitung-generator)'),
      '](/de/generator-speisenbegleitung)', '](/de/weinbegleitung-generator)'),
    '](/wine-pairing-generator)', '](/de/weinbegleitung-generator)'),
  related_links = replace(
    replace(
      replace(
        replace(
          replace(COALESCE(related_links, '[]'::jsonb)::text,
            '"/de/wine-pairing-generator"', '"/de/weinbegleitung-generator"'),
          '"/de/pairing-generator"', '"/de/weinbegleitung-generator"'),
        '"/de/generator-speisenbegleitung"', '"/de/weinbegleitung-generator"'),
      '"/wine-pairing-generator"', '"/de/weinbegleitung-generator"'),
    '"Pairing Generator"', '"Weinbegleitung-Generator"')::jsonb
WHERE lang = 'de'
  AND (
    COALESCE(body, '') ~ '(/de/(wine-pairing-generator|pairing-generator|generator-speisenbegleitung)|/wine-pairing-generator)'
    OR COALESCE(related_links, '[]'::jsonb)::text ~ '(/de/(wine-pairing-generator|pairing-generator|generator-speisenbegleitung)|/wine-pairing-generator|Pairing Generator)'
  );

UPDATE public.articles
SET
  body = replace(
    replace(
      replace(
        replace(COALESCE(body, ''),
          '](/pt/wine-pairing-generator)', '](/pt/gerador-harmonizacoes-ia)'),
        '](/pt/gerador-harmonizacoes-vinho)', '](/pt/gerador-harmonizacoes-ia)'),
      '](/pt/gerador-harmonizacoes)', '](/pt/gerador-harmonizacoes-ia)'),
    '](/wine-pairing-generator)', '](/pt/gerador-harmonizacoes-ia)'),
  related_links = replace(
    replace(
      replace(
        replace(COALESCE(related_links, '[]'::jsonb)::text,
          '"/pt/wine-pairing-generator"', '"/pt/gerador-harmonizacoes-ia"'),
        '"/pt/gerador-harmonizacoes-vinho"', '"/pt/gerador-harmonizacoes-ia"'),
      '"/pt/gerador-harmonizacoes"', '"/pt/gerador-harmonizacoes-ia"'),
    '"/wine-pairing-generator"', '"/pt/gerador-harmonizacoes-ia"')::jsonb
WHERE lang = 'pt'
  AND (
    COALESCE(body, '') ~ '(/pt/(wine-pairing-generator|gerador-harmonizacoes-vinho|gerador-harmonizacoes)|/wine-pairing-generator)'
    OR COALESCE(related_links, '[]'::jsonb)::text ~ '(/pt/(wine-pairing-generator|gerador-harmonizacoes-vinho|gerador-harmonizacoes)|/wine-pairing-generator)'
  );
