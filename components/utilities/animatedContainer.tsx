"use client";

import { AnimatedContainerProps } from "@/interfaces/shopPet/animatedContainerProps";
import { motion } from "framer-motion";

export default function AnimatedContainer({
  children,
  delay = 0,
  y = 20,
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
