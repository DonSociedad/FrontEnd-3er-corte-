import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ModalButtonProps } from "@/interfaces/buttonInterfaces/modalButtonPropsInterface";

export default function EmerPageButton({
  buttonLabel,
  buttonStyle = "bg-blue-500 text-white px-4 py-2 rounded-lg",
  children,
  icon,
}: ModalButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Botón que abre el modal */}
      <button onClick={() => setOpen(true)} className={buttonStyle}>
        {buttonLabel}
        {icon}
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Contenedor del contenido */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full relative 
                          max-h-[80vh] overflow-y-auto" 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón de cerrar */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              {/* Aquí se renderiza lo que pasemos como prop */}
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}