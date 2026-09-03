-- Winerim blog editorial guardrails
-- Fecha: 2026-07-11
-- Objetivo: auditar lotes completos por article_group, profundidad editorial,
-- published_at en lunes y offsets ES/EN/IT/FR/DE/PT.
--
-- Este archivo es un borrador operativo para Lovable/Supabase SQL Editor.
-- No inserta articulos nuevos. La seccion de normalizacion esta envuelta en
-- BEGIN/ROLLBACK para previsualizar; cambiar ROLLBACK por COMMIT solo tras revisar.

-- 1) Lotes incompletos o sin published_at.
WITH supported_langs(lang) AS (
  VALUES ('es'), ('en'), ('it'), ('fr'), ('de'), ('pt')
),
article_groups AS (
  SELECT
    article_group,
    count(*) FILTER (WHERE published = true) AS published_rows,
    count(DISTINCT lang) FILTER (WHERE published = true) AS published_langs,
    array_agg(lang ORDER BY lang) FILTER (WHERE published = true) AS langs_present,
    array_agg(slug ORDER BY lang) FILTER (WHERE published = true) AS slugs_present,
    min(published_at) FILTER (WHERE published = true) AS first_release,
    max(published_at) FILTER (WHERE published = true) AS last_release,
    bool_or(published_at IS NULL) FILTER (WHERE published = true) AS has_null_published_at
  FROM public.articles
  WHERE article_group IS NOT NULL
  GROUP BY article_group
)
SELECT
  article_group,
  published_rows,
  published_langs,
  langs_present,
  slugs_present,
  first_release,
  last_release,
  has_null_published_at,
  ARRAY(
    SELECT lang
    FROM supported_langs
    WHERE lang NOT IN (
      SELECT unnest(COALESCE(langs_present, ARRAY[]::text[]))
    )
    ORDER BY lang
  ) AS missing_langs
FROM article_groups
WHERE published_langs <> 6
   OR COALESCE(has_null_published_at, false)
ORDER BY first_release NULLS LAST, article_group;

-- 2) Articulos por debajo del umbral editorial recomendado.
-- El umbral vigente del proyecto es minimo 900 palabras; recomendacion nueva: 1200-1600.
WITH article_word_counts AS (
  SELECT
    article_group,
    lang,
    slug,
    title,
    published_at,
    CASE
      WHEN trim(COALESCE(body, '')) = '' THEN 0
      ELSE cardinality(regexp_split_to_array(trim(regexp_replace(COALESCE(body, ''), '\s+', ' ', 'g')), '\s+'))
    END AS approx_words
  FROM public.articles
  WHERE published = true
    AND article_group IS NOT NULL
)
SELECT *
FROM article_word_counts
WHERE approx_words < 900
ORDER BY published_at NULLS LAST, article_group, lang;

-- 3) Auditoria de lunes y offsets por idioma en hora Europe/Madrid.
WITH language_offsets(lang, expected_time) AS (
  VALUES
    ('es', time '09:00'),
    ('en', time '09:05'),
    ('it', time '09:10'),
    ('fr', time '09:15'),
    ('de', time '09:20'),
    ('pt', time '09:25')
)
SELECT
  a.article_group,
  a.lang,
  a.slug,
  a.published_at,
  (a.published_at AT TIME ZONE 'Europe/Madrid')::date AS madrid_date,
  to_char(a.published_at AT TIME ZONE 'Europe/Madrid', 'HH24:MI') AS madrid_time,
  EXTRACT(ISODOW FROM a.published_at AT TIME ZONE 'Europe/Madrid') AS madrid_isodow,
  lo.expected_time,
  CASE
    WHEN EXTRACT(ISODOW FROM a.published_at AT TIME ZONE 'Europe/Madrid') = 1
     AND (a.published_at AT TIME ZONE 'Europe/Madrid')::time = lo.expected_time
    THEN 'ok'
    ELSE 'check'
  END AS schedule_status
FROM public.articles a
JOIN language_offsets lo ON lo.lang = a.lang
WHERE a.published = true
  AND a.article_group IS NOT NULL
ORDER BY a.published_at NULLS LAST, a.article_group, a.lang;

-- 4) Filas futuras que deben estar sincronizadas tambien en release gates
-- de supabase/functions/sitemap/index.ts, supabase/functions/prerender/index.ts
-- y cloudflare-worker-v3-hybrid.js.
SELECT
  article_group,
  lang,
  slug,
  published_at
FROM public.articles
WHERE published = true
  AND article_group IS NOT NULL
  AND published_at > now()
ORDER BY published_at, article_group, lang;

-- 5) Normalizador seguro del calendario conocido hasta 2026-07-27.
-- Ejecutar primero tal cual: devuelve filas pero hace ROLLBACK.
-- Si el resultado es correcto, cambiar ROLLBACK por COMMIT.
BEGIN;

WITH weekly_schedule(article_group, monday_at) AS (
  VALUES
    ('biblioteca-vino-restaurante-vender-mas', '2026-05-04T09:00:00+02:00'::timestamptz),
    ('uvas-regiones-equipo-sala-vender-vino', '2026-05-11T09:00:00+02:00'::timestamptz),
    ('maridajes-carta-vinos-rentable', '2026-05-18T09:00:00+02:00'::timestamptz),
    ('learn-wine-tasting-five-steps', '2026-05-25T09:00:00+02:00'::timestamptz),
    ('learn-wine-tasting-vocabulary', '2026-06-01T09:00:00+02:00'::timestamptz),
    ('learn-wine-basic-pairing-restaurants', '2026-06-08T09:00:00+02:00'::timestamptz),
    ('learn-wine-wine-types', '2026-06-15T09:00:00+02:00'::timestamptz),
    ('learn-wine-grapes-to-start', '2026-06-22T09:00:00+02:00'::timestamptz),
    ('learn-wine-regions-to-start', '2026-06-29T09:00:00+02:00'::timestamptz),
    ('wine-library-service-guide-floor-team', '2026-07-06T09:00:00+02:00'::timestamptz),
    ('learn-wine-recommend-by-style', '2026-07-13T09:00:00+02:00'::timestamptz),
    ('wine-library-by-the-glass-stock-rotation', '2026-07-20T09:00:00+02:00'::timestamptz),
    ('learn-wine-read-label-restaurant', '2026-07-27T09:00:00+02:00'::timestamptz)
),
language_offsets(lang, offset_interval) AS (
  VALUES
    ('es', interval '0 minutes'),
    ('en', interval '5 minutes'),
    ('it', interval '10 minutes'),
    ('fr', interval '15 minutes'),
    ('de', interval '20 minutes'),
    ('pt', interval '25 minutes')
)
UPDATE public.articles AS article
SET
  published_at = weekly_schedule.monday_at + language_offsets.offset_interval,
  updated_at = now()
FROM weekly_schedule, language_offsets
WHERE article.article_group = weekly_schedule.article_group
  AND article.lang = language_offsets.lang
  AND article.published = true
RETURNING
  article.article_group,
  article.lang,
  article.slug,
  article.published_at;

ROLLBACK;
