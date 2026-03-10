
-- Reorder restaurants: Spain first, then Mexico, Italy, USA, then rest
-- Use a CTE to compute new order based on country priority and current name

WITH ranked AS (
  SELECT id,
    CASE
      WHEN category LIKE 'Spain%' THEN 1
      WHEN category = 'Mexico' THEN 2
      WHEN category = 'Italia' THEN 3
      WHEN category = 'USA' THEN 4
      ELSE 5
    END AS country_priority,
    category,
    name,
    ROW_NUMBER() OVER (
      ORDER BY
        CASE
          WHEN category LIKE 'Spain%' THEN 1
          WHEN category = 'Mexico' THEN 2
          WHEN category = 'Italia' THEN 3
          WHEN category = 'USA' THEN 4
          ELSE 5
        END,
        category,
        name
    ) - 1 AS new_order
  FROM restaurants
  WHERE visible = true
)
UPDATE restaurants
SET display_order = ranked.new_order
FROM ranked
WHERE restaurants.id = ranked.id;
