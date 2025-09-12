import { motion } from "framer-motion";

const AnimatedDiv = ({ children, direction = "left", duration = 1, delay = 0 }) => {
  // Configuramos valores iniciales según la dirección
  const directions = {
    left: { x: -150, y: 0 },
    right: { x: 150, y: 0 },
    up: { x: 0, y: -150 },
    down: { x: 0, y: 150 },
  };

  return (
    <motion.div
      initial={{ ...directions[direction], opacity: 0 }}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedDiv;
