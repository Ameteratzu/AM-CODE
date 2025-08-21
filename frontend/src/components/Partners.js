import PartnersLogos from "./PartnersLogos";

const Partners = ({ className = "" }) => {
  const logosArray = [
    "/logosPartners/apyce.png",
    "/logosPartners/bitcrux.png",
    "/logosPartners/imporisel.png",
    "/logosPartners/kamasa.png",
    "/logosPartners/tcn.png"
  ];

  return (
    <section
      className={` ${className} flex justify-center items-center flex-col gap-10`}
    >
      {/* tu contenido aquí */}
      <div className="min-w-[500px] min-h-[70px] flex flex-col justify-center items-center gap-2">
        <h3 className="bg-gradient-to-r font-bold text-3xl bg-clip-text from-pink-700 to-yellow-400 text-transparent">
          Empresas que eligen nuestra plataforma{" "}
        </h3>
        <h2 className="text-white font-bold ">
          Únete a las empresas que contratan nuestros servicios
        </h2>
      </div>

      {/*CARRUSEL*/}
      <PartnersLogos logos={logosArray} />
    </section>
  );
};

export default Partners;
