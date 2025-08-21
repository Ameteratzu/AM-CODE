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
        className="relative min-w-[1920px] min-h-[950px] bg-cover bg-center"
        style={{ backgroundImage: "url('/fondo.png')" }}
      >
        <Navbar />
        <Hero />
      </main>
      <Partners className="w-[1920px] h-[437px] bg-[#291140]" />
      <Presentation className="w-[1920px] h-[450px] bg-[#5D449B]" />
      <Footer className="w-[1920px] h-[280px] bg-black" />
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
