import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroAbout from "../components/HeroAbout";
import Nosotros from "../components/Nosotros";
import ServiciosAbout from "../components/ServiciosAbout";

const About = () => {
  const images = ["/about1.png", "/about2.png"]; // 👈 aquí tus imágenes

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // cambia cada 2 segundos

    return () => clearInterval(interval); // limpiar intervalo al desmontar
  }, [images.length]);

  return (
    <>
      <main
        className="relative w-full min-h-[950px] bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <Navbar />
        <HeroAbout />
      </main>
      <Nosotros />
      <ServiciosAbout />
    </>
  );
};

export default About;
