-- Remove internal migration markers accidentally stored in public article bodies.
-- This is data hygiene only: it does not change article slugs, dates, language, metadata or publication state.

UPDATE public.articles
SET body = regexp_replace(
  regexp_replace(
    body,
    E'[ \\t]*(<!--|&lt;!--)[ \\t]*winerim-content-expansion-[^\\n\\r]*(-->|--&gt;)[ \\t]*(\\r?\\n)?',
    '',
    'g'
  ),
  E'^([ \\t]|\\r|\\n)+',
  '',
  ''
)
WHERE body LIKE '%winerim-content-expansion%'
   OR body LIKE '%TELEGRAM_BOT_TOKEN%';
