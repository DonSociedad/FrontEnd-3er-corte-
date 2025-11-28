"use client";

import { CardProps } from "@/interfaces/interaction/cardProps";

import { motion } from "framer-motion";

export default function CardComponent({
  title,
  description,
  children,
  onClick,
}: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white shadow-md hover:shadow-xl transition p-6 rounded-2xl border border-pink-200 hover:border-pink-400"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold text-black mb-2">
        {title}
      </h2>
      {description && (
        <p className="text-black mb-4">{description}</p>
      )}
      {children}
    </motion.div>
  );
}
