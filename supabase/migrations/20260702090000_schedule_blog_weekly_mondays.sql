-- Keep blog publication cadence editorially weekly while preserving localized versions.
-- A topic can publish in every supported language on the same Monday; future-dated
-- articles become public automatically when their published_at date arrives.

DROP POLICY IF EXISTS "Public can read published articles" ON public.articles;

CREATE POLICY "Public can read published articles"
  ON public.articles FOR SELECT
  USING (
    published = true
    AND (published_at IS NULL OR published_at <= now())
  );

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
    ('learn-wine-regions-to-start', '2026-06-29T09:00:00+02:00'::timestamptz)
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
  AND language_offsets.lang = article.lang
  AND article.published = true;
