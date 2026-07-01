import postgres from "https://deno.land/x/postgresjs@v3.4.4/mod.js";
import sql from "./migration.ts";

Deno.serve(async (_req) => {
  try {
    const dbUrl = Deno.env.get("SUPABASE_DB_URL");
    if (!dbUrl) return new Response(JSON.stringify({ error: "SUPABASE_DB_URL missing" }), { status: 500 });
    const client = postgres(dbUrl, { ssl: "require", max: 1, prepare: false });
    await client.unsafe(sql);
    await client.end();
    return new Response(JSON.stringify({ ok: true, bytes: sql.length }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});