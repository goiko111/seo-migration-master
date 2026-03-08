import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

const WhatsAppButton = () => {
  const { get } = usePageContent("contacto");
  const number = get("contact", "whatsapp_number", "34623165179");
  const message = encodeURIComponent("Hola, me gustaría obtener más información sobre Winerim.");

  return (
    <motion.a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </motion.a>
  );
};

export default WhatsAppButton;
