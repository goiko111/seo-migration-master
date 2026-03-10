import { useSharedPageContent } from "@/contexts/PageContentContext";
import ScrollReveal from "./ScrollReveal";
import YouTubeFacade from "./YouTubeFacade";

const VideoSection = () => {
  const { get } = useSharedPageContent();
  const youtubeUrl = get("video", "youtube_url", "https://www.youtube.com/embed/-PleM286zeY");
  // Extract video ID from various YouTube URL formats
  const videoId = youtubeUrl.match(/(?:embed\/|v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1] || "-PleM286zeY";

  return (
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">
            {get("video", "label", "Únete a la #WorldWineRevolution")}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            {get("video", "title", "Mira lo que Winerim puede hacer por tu bodega")}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="relative rounded-2xl overflow-hidden border border-border glow-wine">
            <YouTubeFacade
              videoId={videoId}
              title="Winerim, la revolución de la carta de vinos"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default VideoSection;
