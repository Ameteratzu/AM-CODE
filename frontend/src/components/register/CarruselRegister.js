import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carrusel = ({ items }) => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="flex-[2] bg-gradient-to-b flex justify-center items-center from-[#E3E0E4] to-[#560B9D] relative overflow-hidden">
      <div className="w-[450px] h-[500px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-b from-[#92508C]/40 to-[#92508C] gap-4 rounded-3xl flex flex-col justify-center items-center p-4"
          >
            <h4 className="font-extrabold text-[20px] text-white text-center">
              {items[index].title}
            </h4>
            <p className="font-semibold text-[15px] text-white text-center">
              {items[index].description}
            </p>
            <img
              src={items[index].image}
              alt={items[index].title}
              className="rounded-xl object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full hover:bg-white/40 transition"
      >
        ⬅
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full hover:bg-white/40 transition"
      >
        ➡
      </button>
    </div>
  );
};

export default Carrusel;
