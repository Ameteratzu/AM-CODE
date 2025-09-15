import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Services from "../components/Services";
import Presentation from "../components/Presentation";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

const Home = () => {
  // 👇 arreglo de fondos
  const fondos = ["/fondo.png","/Property 1=Variant2.png"];

  // 👇 índice del fondo activo
  const [activeIndex, setActiveIndex] = useState(0);

  // 👇 opcional: rotar automáticamente cada 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % fondos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [fondos.length]);

  return (
    <>
      <main
        className="relative w-full min-h-[950px] bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url('${fondos[activeIndex]}')` }}
      >
        <Navbar />
        <Hero />
      </main>
      <Partners className="w-full h-[437px] bg-[#2e1942]" />
      <Services className="w-full h-[700px] bg-[#291140]" />
      <Presentation className="w-full h-[450px] bg-[#5D449B]" />
      <Footer className="w-full h-[280px] bg-black" />
      {/*
      <Partners />
      <Services />
      <Presentation />
      <Footer />
      */}
    </>
  );
};

export default Home;
