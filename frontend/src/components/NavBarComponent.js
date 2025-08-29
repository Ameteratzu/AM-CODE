import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"
const NavbarBg = ({ bg_color = "", bg_img = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambiar cada 2 segundos si hay más de una imagen
  useEffect(() => {
    if (bg_img.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bg_img.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [bg_img]);

  const backgroundStyle =
    bg_img.length > 0
      ? { backgroundImage: `url(${bg_img[currentIndex]})` }
      : { backgroundColor: bg_color || "transparent" };

  return (
    <main
      className="relative w-full min-h-[950px] bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={backgroundStyle}
    >
    <Navbar />
      {/* 
        <Navbar />
        <Hero /> 
      */}
    </main>
  );
};

export default NavbarBg;
