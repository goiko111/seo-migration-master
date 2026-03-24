import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";

interface InstaPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type: string;
  thumbnail_url?: string;
}

const InstagramFeed = () => {
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
        const res = await fetch(
          `https://${projectId}.supabase.co/functions/v1/instagram-feed`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPosts(data.posts ?? []);
      } catch (err) {
        console.error("Instagram feed error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <div className="flex items-center gap-2 mb-6">
            <Instagram size={18} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              @wine_rim
            </span>
          </div>
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="shrink-0 w-[180px] h-[180px] rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <div className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <a
            href="https://www.instagram.com/wine_rim/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
          >
            <Instagram size={18} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors">
              @wine_rim
            </span>
          </a>
          <div className="flex gap-1">
            <button
              onClick={() => scroll("left")}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-[180px] h-[180px] rounded-lg overflow-hidden relative group snap-start"
            >
              <img
                src={post.media_type === "VIDEO" ? post.thumbnail_url ?? post.media_url : post.media_url}
                alt={post.caption?.slice(0, 80) || "Winerim Instagram"}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <Instagram
                  size={24}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramFeed;
