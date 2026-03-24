const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get("INSTAGRAM_ACCESS_TOKEN");
    if (!token) {
      console.error("INSTAGRAM_ACCESS_TOKEN not configured");
      return new Response(
        JSON.stringify({ posts: [], error: "Instagram not configured" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const fields = "id,media_url,permalink,caption,media_type,thumbnail_url";
    const limit = 12;
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${token}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      console.error("Instagram API error:", data);
      return new Response(
        JSON.stringify({ posts: [], error: data.error?.message || "API error" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ posts: data.data || [] }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  } catch (error) {
    console.error("Instagram feed error:", error);
    return new Response(
      JSON.stringify({ posts: [], error: "Internal error" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
