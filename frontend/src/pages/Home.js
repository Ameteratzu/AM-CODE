import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Services from "../components/Services";
import Presentation from "../components/Presentation";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <main
        className="relative w-full min-h-[950px] bg-cover bg-center"
        style={{ backgroundImage: "url('/fondo.png')" }}
      >
        <Navbar />
        <Hero />
      </main>
      <Partners className="w-full h-[437px] bg-[#2e1942]" />
      <Services className="w-full h-[700px] bg-[#291140]"  />
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
