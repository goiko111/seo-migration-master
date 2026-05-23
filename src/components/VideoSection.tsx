import { useSharedPageContent } from "@/contexts/PageContentContext";
import ScrollReveal from "./ScrollReveal";
import YouTubeFacade from "./YouTubeFacade";
import { useLanguage } from "@/i18n/LanguageContext";

const labels: Record<string, { label: string; title: string }> = {
  es: {
    label: "Únete a la #WorldWineRevolution",
    title: "Mira lo que Winerim puede hacer por tu bodega",
  },
  en: {
    label: "Join the #WorldWineRevolution",
    title: "See what Winerim can do for your cellar",
  },
  it: {
    label: "Unisciti alla #WorldWineRevolution",
    title: "Scopri cosa può fare Winerim per la tua cantina",
  },
  fr: {
    label: "Rejoignez la #WorldWineRevolution",
    title: "Découvrez ce que Winerim peut faire pour votre cave",
  },
  de: {
    label: "Werden Sie Teil der #WorldWineRevolution",
    title: "Sehen Sie, was Winerim für Ihren Weinkeller tun kann",
  },
  pt: {
    label: "Junte-se à #WorldWineRevolution",
    title: "Veja o que o Winerim pode fazer pela sua garrafeira",
  },
};

const VideoSection = () => {
  const { get } = useSharedPageContent();
  const { lang } = useLanguage();
  const l = labels[lang] || labels.es;
  const youtubeUrl = get("video", "youtube_url", "https://www.youtube.com/embed/-PleM286zeY");
  const videoId = youtubeUrl.match(/(?:embed\/|v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1] || "-PleM286zeY";

  return (
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">
            {get("video", "label", l.label)}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            {get("video", "title", l.title)}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="relative rounded-2xl overflow-hidden border border-border glow-wine">
            <YouTubeFacade
              videoId={videoId}
              title="Winerim — wine list management software"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default VideoSection;
