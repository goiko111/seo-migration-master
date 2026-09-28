import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const MIGRATION_DIR = path.join(ROOT, "supabase", "migrations");
const CONTENT_MIGRATIONS = [
  "20260713123000_add_blog_wine_list_margin_leaks_restaurant.sql",
  "20260713124000_add_learn_wine_service_temperature_restaurant.sql",
  "20260713125000_add_wine_library_pairing_matrix_texture_acidity_fat.sql",
  "20260713131823_add_learn_wine_guest_questions_service_scripts.sql",
  "20260713131825_add_wine_library_list_architecture_style_country_price.sql",
  "20260713152451_add_blog_slow_stock_rotation_restaurant.sql",
];
const SUPPORT_MIGRATIONS = [
  "20260713112000_fix_learn_wine_localized_pairing_links.sql",
  "20260713130000_fix_de_pt_global_related_links.sql",
  "20260811153500_sanitize_article_internal_markers.sql",
];
const ALL_MIGRATIONS = [...SUPPORT_MIGRATIONS, ...CONTENT_MIGRATIONS]
  .sort((left, right) => left.localeCompare(right));
const LANGUAGES = ["de", "en", "es", "fr", "it", "pt"];
const args = process.argv.slice(2);
const localOnly = args.includes("--local-only");
const snapshotFlagIndex = args.indexOf("--snapshot-file");
const snapshotFile = snapshotFlagIndex >= 0 ? args[snapshotFlagIndex + 1] : null;

if (snapshotFlagIndex >= 0 && (!snapshotFile || snapshotFile.startsWith("--"))) {
  throw new Error("--snapshot-file requires a destination path.");
}
if (localOnly && snapshotFile) {
  throw new Error("--snapshot-file requires an authorized remote audit, not --local-only.");
}

const readEnvFile = () => {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return {};

  return Object.fromEntries(fs.readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const separator = line.indexOf("=");
      const key = line.slice(0, separator).trim();
      const rawValue = line.slice(separator + 1).trim();
      const value = rawValue.replace(/^(['"])(.*)\1$/, "$2");
      return [key, value];
    }));
};

const fileEnv = readEnvFile();
const supabaseUrl = process.env.VITE_SUPABASE_URL || fileEnv.VITE_SUPABASE_URL;
const publishableKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY
  || fileEnv.VITE_SUPABASE_PUBLISHABLE_KEY;
const projectRef = process.env.VITE_SUPABASE_PROJECT_ID
  || fileEnv.VITE_SUPABASE_PROJECT_ID
  || supabaseUrl?.match(/^https:\/\/([^.]+)\.supabase\.co/)?.[1];

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const duplicateValues = (values) => [...new Set(values.filter((value, index) => (
  values.indexOf(value) !== index
)))].sort();

const migrationDetails = ALL_MIGRATIONS.map((filename) => {
  const sql = fs.readFileSync(path.join(MIGRATION_DIR, filename), "utf8");
  const slugMatches = [...sql.matchAll(/\$slug\$([^$]+)\$slug\$/g)];
  const entries = slugMatches.map((match, index) => {
    const end = slugMatches[index + 1]?.index ?? sql.length;
    const rowSql = sql.slice(match.index, end);
    const marker = rowSql.match(/winerim-content-expansion-[^:\s]+:([^:\n]+):(es|en|it|fr|de|pt)\s*-->/);
    const rowMetadata = rowSql.match(
      /'(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2}))'\s*,\s*'(es|en|it|fr|de|pt)'\s*,\s*'([^']+)'\s*,\s*\$json\$/,
    );
    const publishedAt = rowSql.match(/'(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2}))'/)?.[1] || null;
    const title = rowSql.match(/\$title\$([\s\S]*?)\$title\$/)?.[1].trim() || null;
    const body = rowSql.match(/\$body\$([\s\S]*?)\$body\$/)?.[1].trim() || null;
    return {
      slug: match[1],
      articleGroup: marker?.[1] || rowMetadata?.[3] || null,
      lang: marker?.[2] || rowMetadata?.[2] || null,
      publishedAt: publishedAt || rowMetadata?.[1] || null,
      titleHash: title ? sha256(title) : null,
      bodyHash: body ? sha256(body.replace(/\s+/g, " ")) : null,
    };
  });
  return {
    filename,
    version: filename.slice(0, 14),
    kind: CONTENT_MIGRATIONS.includes(filename) ? "content" : "support",
    checksum: sha256(sql),
    sql,
    entries,
    slugs: entries.map((entry) => entry.slug),
  };
});

const contentDetails = migrationDetails.filter((migration) => migration.kind === "content");
const supportDetails = migrationDetails.filter((migration) => migration.kind === "support");
const expectedEntries = contentDetails.flatMap((migration) => migration.entries);
const expectedSlugs = expectedEntries.map((entry) => entry.slug);
const expectedGroups = [...new Set(expectedEntries.map((entry) => entry.articleGroup).filter(Boolean))];
const duplicateLocalSlugs = duplicateValues(expectedSlugs);
const duplicateLocalGroupLanguages = duplicateValues(expectedEntries.map((entry) => (
  `${entry.articleGroup || "missing"}:${entry.lang || "missing"}`
)));
const duplicateLocalTitles = duplicateValues(expectedEntries.map((entry) => entry.titleHash).filter(Boolean));
const duplicateLocalBodies = duplicateValues(expectedEntries.map((entry) => entry.bodyHash).filter(Boolean));
const duplicateMigrationVersions = duplicateValues(migrationDetails.map((migration) => migration.version));
const malformedContentMigrations = contentDetails.flatMap((migration) => {
  const languages = [...new Set(migration.entries.map((entry) => entry.lang).filter(Boolean))].sort();
  const groups = [...new Set(migration.entries.map((entry) => entry.articleGroup).filter(Boolean))];
  const failures = [];
  if (migration.entries.length !== 6) failures.push(`expected 6 rows, found ${migration.entries.length}`);
  if (languages.join(",") !== LANGUAGES.join(",")) failures.push(`languages are ${languages.join(",") || "missing"}`);
  if (groups.length !== 1) failures.push(`expected one article group, found ${groups.length}`);
  if (migration.entries.some((entry) => !entry.publishedAt)) failures.push("missing published_at marker");
  if (!/ON CONFLICT\s*\(slug\)\s*DO UPDATE/i.test(migration.sql)) failures.push("missing slug upsert");
  return failures.map((reason) => ({ filename: migration.filename, reason }));
});
const malformedSupportMigrations = supportDetails
  .filter((migration) => !/^\s*(?:--[^\n]*\n|ALTER TABLE[^;]+;\s*)*UPDATE\s/ims.test(migration.sql)
    || /\b(?:INSERT|DELETE|TRUNCATE)\b/i.test(migration.sql))
  .map((migration) => migration.filename);
const articleSchema = fs.readFileSync(path.join(
  MIGRATION_DIR,
  "20260219042647_7ceae342-ed6d-41c0-b1e3-357262cbe6b6.sql",
), "utf8");
const uniqueSlugConstraint = /slug\s+TEXT\s+UNIQUE\s+NOT NULL/i.test(articleSchema);
const localErrors = [];
if (expectedEntries.length !== 36) localErrors.push(`expected 36 article rows, found ${expectedEntries.length}`);
if (duplicateLocalSlugs.length) localErrors.push("duplicate slugs exist across content migrations");
if (duplicateLocalGroupLanguages.length) localErrors.push("duplicate article_group + language pairs exist");
if (duplicateLocalTitles.length) localErrors.push("duplicate titles exist across content migrations");
if (duplicateLocalBodies.length) localErrors.push("duplicate article bodies exist across content migrations");
if (duplicateMigrationVersions.length) localErrors.push("duplicate migration versions exist");
if (malformedContentMigrations.length) localErrors.push("one or more content migrations are malformed");
if (malformedSupportMigrations.length) localErrors.push("support migrations contain non-update writes");
if (!uniqueSlugConstraint) localErrors.push("articles.slug unique constraint was not found");

const readLedger = () => {
  if (localOnly) {
    return { status: "skipped", reason: "Local-only audit requested.", remoteVersions: [] };
  }
  const linkedRefPath = path.join(ROOT, "supabase", ".temp", "project-ref");
  if (!fs.existsSync(linkedRefPath)) {
    return {
      status: "unavailable",
      reason: "Supabase CLI is not linked in this worktree.",
      remoteVersions: [],
    };
  }

  const linkedRef = fs.readFileSync(linkedRefPath, "utf8").trim();
  if (projectRef && linkedRef !== projectRef) {
    return {
      status: "unavailable",
      reason: `Supabase CLI is linked to ${linkedRef}, not ${projectRef}.`,
      remoteVersions: [],
    };
  }

  try {
    const output = execFileSync("supabase", ["migration", "list", "--linked"], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    const remoteVersions = [...output.matchAll(/^\s*\d{14}\s*\|\s*(\d{14})/gm)]
      .map((match) => match[1]);
    return { status: "available", remoteVersions: [...new Set(remoteVersions)] };
  } catch (error) {
    const message = error?.stderr?.toString().trim().split("\n").at(-1)
      || "Supabase CLI could not read the linked migration ledger.";
    return { status: "unavailable", reason: message, remoteVersions: [] };
  }
};

const parseCliRows = (output) => {
  const parsed = JSON.parse(output);
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed?.rows)) return parsed.rows;
  if (Array.isArray(parsed?.result)) {
    if (parsed.result.every((item) => Array.isArray(item?.rows))) {
      return parsed.result.flatMap((item) => item.rows);
    }
    return parsed.result;
  }
  if (Array.isArray(parsed?.data)) return parsed.data;
  throw new Error("Supabase db query returned an unsupported JSON shape.");
};

const linkedRowsQuery = () => {
  const quotedSlugs = expectedSlugs.map((slug) => `'${slug.replaceAll("'", "''")}'`).join(",");
  const quotedGroups = expectedGroups.map((group) => `'${group.replaceAll("'", "''")}'`).join(",");
  return `SELECT * FROM public.articles WHERE slug IN (${quotedSlugs}) OR article_group IN (${quotedGroups}) ORDER BY article_group, lang, slug;`;
};

const readRemoteRows = async (ledger) => {
  if (localOnly) {
    return { status: "skipped", reason: "Local-only audit requested.", source: null, rows: [] };
  }

  if (ledger.status === "available") {
    try {
      const output = execFileSync("supabase", [
        "db", "query", "--linked", "--output", "json", linkedRowsQuery(),
      ], {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
      return { status: "available", source: "linked-database", rows: parseCliRows(output) };
    } catch (error) {
      const message = error?.stderr?.toString().trim().split("\n").at(-1)
        || error?.message
        || "Supabase CLI could not read article rows from the linked database.";
      return { status: "unavailable", reason: message, source: "linked-database", rows: [] };
    }
  }

  if (!supabaseUrl || !publishableKey) {
    return {
      status: "unavailable",
      reason: "VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY is unavailable.",
      source: "public-rest",
      rows: [],
    };
  }

  const rowsBySlug = new Map();
  const readBy = async (column, values) => {
    if (!values.length) return;
    const endpoint = new URL("/rest/v1/articles", supabaseUrl);
    endpoint.searchParams.set("select", "*");
    endpoint.searchParams.set(column, `in.(${values.join(",")})`);
    const response = await fetch(endpoint, {
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${publishableKey}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Articles REST read failed with HTTP ${response.status}.`);
    }
    for (const row of await response.json()) rowsBySlug.set(row.slug, row);
  };

  try {
    for (let index = 0; index < expectedSlugs.length; index += 20) {
      await readBy("slug", expectedSlugs.slice(index, index + 20));
    }
    await readBy("article_group", expectedGroups);
  } catch (error) {
    return {
      status: "unavailable",
      reason: error.message,
      source: "public-rest",
      rows: [],
    };
  }
  return { status: "available", source: "public-rest", rows: [...rowsBySlug.values()] };
};

const ledger = readLedger();
const remoteRows = await readRemoteRows(ledger);
const foundSlugs = new Set(remoteRows.rows.map((row) => row.slug));
const remoteVersionSet = new Set(ledger.remoteVersions);
const expectedSlugSet = new Set(expectedSlugs);
const expectedGroupSet = new Set(expectedGroups);
const expectedBySlug = new Map(expectedEntries.map((entry) => [entry.slug, entry]));
const duplicateRemoteSlugs = duplicateValues(remoteRows.rows.map((row) => row.slug));
const duplicateRemoteGroupLanguages = duplicateValues(remoteRows.rows
  .filter((row) => expectedGroupSet.has(row.article_group))
  .map((row) => `${row.article_group}:${row.lang}`));
const unexpectedRowsInExpectedGroups = remoteRows.rows
  .filter((row) => expectedGroupSet.has(row.article_group) && !expectedSlugSet.has(row.slug))
  .map((row) => ({ slug: row.slug, lang: row.lang, articleGroup: row.article_group }));
const metadataMismatches = remoteRows.rows.flatMap((row) => {
  const expected = expectedBySlug.get(row.slug);
  if (!expected) return [];
  const mismatches = [];
  if (row.lang !== expected.lang) mismatches.push(`lang ${row.lang} != ${expected.lang}`);
  if (row.article_group !== expected.articleGroup) {
    mismatches.push(`article_group ${row.article_group} != ${expected.articleGroup}`);
  }
  if (expected.publishedAt && row.published_at
    && new Date(row.published_at).getTime() !== new Date(expected.publishedAt).getTime()) {
    mismatches.push(`published_at ${row.published_at} != ${expected.publishedAt}`);
  }
  return mismatches.length ? [{ slug: row.slug, mismatches }] : [];
});
const remoteContentHashes = remoteRows.rows
  .filter((row) => expectedGroupSet.has(row.article_group) && typeof row.body === "string" && row.body.trim())
  .map((row) => ({ slug: row.slug, hash: sha256(row.body.trim().replace(/\s+/g, " ")) }));
const duplicateRemoteBodyHashes = duplicateValues(remoteContentHashes.map((entry) => entry.hash));
const duplicateRemoteBodies = duplicateRemoteBodyHashes.map((hash) => ({
  hash,
  slugs: remoteContentHashes.filter((entry) => entry.hash === hash).map((entry) => entry.slug).sort(),
}));

const migrations = migrationDetails.map((migration) => {
  const presentSlugs = migration.slugs.filter((slug) => foundSlugs.has(slug));
  const rowState = migration.kind === "support"
    ? "not-applicable"
    : presentSlugs.length === 0
      ? "absent"
      : presentSlugs.length === migration.slugs.length
        ? "complete"
        : "partial";
  const ledgerState = ledger.status === "available"
    ? remoteVersionSet.has(migration.version) ? "applied" : "missing"
    : "unknown";
  const provisionalAction = rowState === "complete"
    ? "likely-skip-after-ledger-confirmation"
    : rowState === "absent"
      ? "likely-apply-after-ledger-confirmation"
      : rowState === "partial"
        ? "manual-investigation"
        : "ledger-only-decision";

  let action = "block-until-ledger-is-readable";
  if (ledgerState === "applied" && (rowState === "complete" || rowState === "not-applicable")) {
    action = "skip";
  } else if (ledgerState === "missing" && (rowState === "absent" || rowState === "not-applicable")) {
    action = "apply-in-order";
  } else if (ledgerState === "missing" && rowState === "complete") {
    action = "repair-ledger-or-review-before-apply";
  } else if (rowState === "partial" || (ledgerState === "applied" && rowState === "absent")) {
    action = "manual-investigation";
  }

  return {
    filename: migration.filename,
    version: migration.version,
    kind: migration.kind,
    ledgerState,
    rowState,
    expectedRows: migration.slugs.length,
    presentRows: presentSlugs.length,
    missingSlugs: migration.slugs.filter((slug) => !foundSlugs.has(slug)),
    provisionalAction,
    action,
  };
});

const blockingActions = new Set([
  "block-until-ledger-is-readable",
  "repair-ledger-or-review-before-apply",
  "manual-investigation",
]);
const remoteIntegrityBlocked = duplicateRemoteSlugs.length > 0
  || duplicateRemoteGroupLanguages.length > 0
  || unexpectedRowsInExpectedGroups.length > 0
  || metadataMismatches.length > 0
  || duplicateRemoteBodies.length > 0;
const blocked = localErrors.length > 0
  || (!localOnly && ledger.status !== "available")
  || (!localOnly && remoteRows.status !== "available")
  || (!localOnly && remoteIntegrityBlocked)
  || (!localOnly && migrations.some((migration) => blockingActions.has(migration.action)));

let snapshot = { status: "not-requested", path: null };
if (snapshotFile) {
  if (remoteRows.status !== "available" || remoteRows.source !== "linked-database") {
    snapshot = {
      status: "unavailable",
      path: path.resolve(ROOT, snapshotFile),
      reason: "A complete snapshot requires an authorized linked-database read.",
    };
  } else if (!blocked) {
    const destination = path.resolve(ROOT, snapshotFile);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, `${JSON.stringify({
      generatedAt: new Date().toISOString(),
      projectRef: projectRef || null,
      source: remoteRows.source,
      expectedSlugs,
      absentSlugs: expectedSlugs.filter((slug) => !foundSlugs.has(slug)),
      rows: remoteRows.rows,
    }, null, 2)}\n`, { mode: 0o600 });
    snapshot = { status: "written", path: destination, rows: remoteRows.rows.length };
  } else {
    snapshot = {
      status: "blocked",
      path: path.resolve(ROOT, snapshotFile),
      reason: "The snapshot was not written because the preflight is blocked.",
    };
  }
}

const releaseGate = localOnly
  ? localErrors.length ? "blocked" : "local-ready"
  : blocked || snapshot.status === "unavailable" || snapshot.status === "blocked"
    ? "blocked"
    : snapshot.status === "written"
      ? "ready"
      : "preflight-ready";

const report = {
  generatedAt: new Date().toISOString(),
  projectRef: projectRef || null,
  mode: "read-only",
  localPackage: {
    status: localErrors.length ? "invalid" : "valid",
    expectedRows: 36,
    foundRows: expectedEntries.length,
    expectedLanguages: LANGUAGES,
    expectedGroups,
    duplicateSlugs: duplicateLocalSlugs,
    duplicateGroupLanguages: duplicateLocalGroupLanguages,
    duplicateTitleHashes: duplicateLocalTitles,
    duplicateBodyHashes: duplicateLocalBodies,
    duplicateMigrationVersions,
    malformedContentMigrations,
    malformedSupportMigrations,
    uniqueSlugConstraint,
    errors: localErrors,
    migrations: migrationDetails.map(({ filename, version, kind, checksum }) => ({
      filename, version, kind, checksum,
    })),
  },
  ledger,
  articleRows: {
    status: remoteRows.status,
    reason: remoteRows.reason,
    source: remoteRows.source,
    expected: expectedSlugs.length,
    found: expectedSlugs.filter((slug) => foundSlugs.has(slug)).length,
    returned: remoteRows.rows.length,
    duplicateSlugs: duplicateRemoteSlugs,
    duplicateGroupLanguages: duplicateRemoteGroupLanguages,
    duplicateBodies: duplicateRemoteBodies,
    unexpectedRowsInExpectedGroups,
    metadataMismatches,
  },
  migrations,
  snapshot,
  releaseGate,
  instruction: releaseGate === "blocked"
    ? "Do not apply migrations. Restore authorized linked-project access and resolve every blocking action first."
    : releaseGate === "local-ready"
      ? "Local package is internally consistent. Run the authorized remote audit before any write."
      : releaseGate === "preflight-ready"
        ? "Rerun with --snapshot-file. Do not write until the report says ready and db push --dry-run exactly matches apply-in-order."
        : "Snapshot captured. Apply only if db push --dry-run exactly matches apply-in-order and explicit release authorization exists.",
};

console.log(JSON.stringify(report, null, 2));
if (releaseGate === "blocked") process.exitCode = localErrors.length ? 1 : 2;
