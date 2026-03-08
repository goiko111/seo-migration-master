import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

const variants: Variants = {
  hidden: (dir: string) => ({
    opacity: 0,
    ...directionMap[dir as keyof typeof directionMap],
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const ScrollReveal = ({ children, className, delay = 0, direction = "up" }: ScrollRevealProps) => (
  <motion.div
    custom={direction}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={variants}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default ScrollReveal;
