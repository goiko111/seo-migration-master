import { execFileSync } from "node:child_process";
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

const migrationDetails = ALL_MIGRATIONS.map((filename) => {
  const sql = fs.readFileSync(path.join(MIGRATION_DIR, filename), "utf8");
  const slugs = [...sql.matchAll(/\$slug\$([^$]+)\$slug\$/g)]
    .map((match) => match[1]);
  return {
    filename,
    version: filename.slice(0, 14),
    kind: CONTENT_MIGRATIONS.includes(filename) ? "content" : "support",
    slugs: [...new Set(slugs)],
  };
});

const readLedger = () => {
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

const readRemoteRows = async () => {
  if (!supabaseUrl || !publishableKey) {
    return {
      status: "unavailable",
      reason: "VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY is unavailable.",
      rows: [],
    };
  }

  const expectedSlugs = migrationDetails.flatMap((migration) => migration.slugs);
  const rows = [];
  for (let index = 0; index < expectedSlugs.length; index += 20) {
    const chunk = expectedSlugs.slice(index, index + 20);
    const endpoint = new URL("/rest/v1/articles", supabaseUrl);
    endpoint.searchParams.set("select", "slug,lang,article_group,published_at");
    endpoint.searchParams.set("slug", `in.(${chunk.join(",")})`);
    const response = await fetch(endpoint, {
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${publishableKey}`,
      },
    });
    if (!response.ok) {
      return {
        status: "unavailable",
        reason: `Articles REST read failed with HTTP ${response.status}.`,
        rows: [],
      };
    }
    rows.push(...await response.json());
  }
  return { status: "available", rows };
};

const ledger = readLedger();
const remoteRows = await readRemoteRows();
const foundSlugs = new Set(remoteRows.rows.map((row) => row.slug));
const remoteVersionSet = new Set(ledger.remoteVersions);

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
const blocked = ledger.status !== "available"
  || remoteRows.status !== "available"
  || migrations.some((migration) => blockingActions.has(migration.action));

const report = {
  generatedAt: new Date().toISOString(),
  projectRef: projectRef || null,
  mode: "read-only",
  ledger,
  articleRows: {
    status: remoteRows.status,
    reason: remoteRows.reason,
    expected: migrationDetails.flatMap((migration) => migration.slugs).length,
    found: remoteRows.rows.length,
  },
  migrations,
  releaseGate: blocked ? "blocked" : "ready",
  instruction: blocked
    ? "Do not apply migrations. Restore read-only ledger access and resolve every blocking action first."
    : "Apply only migrations marked apply-in-order, then rerun this audit before deployment.",
};

console.log(JSON.stringify(report, null, 2));
if (blocked) process.exitCode = 2;
