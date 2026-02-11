import { motion } from "framer-motion";

const Quote = () => {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-wine to-transparent mx-auto mb-10" />
          <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl italic text-foreground/90 leading-relaxed mb-8">
            "Quien sabe degustar, no bebe jamás el vino, sino que degusta sus
            secretos"
          </blockquote>
          <div className="w-12 h-px bg-gold mx-auto mb-4" />
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground">
            Salvador Dalí
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Quote;
