import CarruselPortafolio from "./CarruselPortafolio";

const SectionProyects = () => {
  const proyectsArray = [
    "/imagesProyectos/ChatGPT Image 12 ago 2025, 02_20_38 p.m.-Photoroom 3.png",
    "/imagesProyectos/ChatGPT Image 12 ago 2025, 02_20_38 p.m.-Photoroom 3.png",
    "/imagesProyectos/ChatGPT Image 12 ago 2025, 02_20_38 p.m.-Photoroom 3.png",
    "/imagesProyectos/ChatGPT Image 12 ago 2025, 02_20_38 p.m.-Photoroom 3.png",
  ];
  return (
    <section
      className={` bg-[#1E0437] w-full h-[400px] flex justify-center items-center flex-col gap-5`}
    >
        <div className="w-full flex justify-center items-center">
            <h2 className="text-white font-semibold font-inter text-[25px]">Desarrollamos proyectos de software y aplicaciones exitosas</h2>
        </div>
      {/*CARRUSEL*/}
      <CarruselPortafolio images={proyectsArray}/>
    </section>
  );
};

export default SectionProyects;
