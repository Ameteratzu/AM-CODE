import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const IconosRotativos = ({ iconos, intervalo = 3000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % iconos.length);
    }, intervalo);
    return () => clearInterval(timer);
  }, [iconos.length, intervalo]);

  return (
    <div className="relative max-w-[811px] max-h-[700px]">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={iconos[index]}
          alt={`icono-${index}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -15, 0], // sube y baja
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            duration: 5, // velocidad del ciclo
            repeat: Infinity, // se repite infinito
            ease: "easeInOut", // movimiento suave
          }}
        />
      </AnimatePresence>
    </div>
  );
};

export default IconosRotativos;
