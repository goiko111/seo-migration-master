import { motion } from "framer-motion";

const VideoSection = () => {
  return (
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">
            Únete a la #WorldWineRevolution
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            Mira lo que Winerim puede hacer por tu bodega
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-border glow-wine aspect-video"
        >
          <iframe
            src="https://www.youtube.com/embed/-PleM286zeY"
            title="Winerim, la revolución de la carta de vinos"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
