const Presentation = ({ className = "" }) => {
  return (
    <section className={`${className} flex justify-center`}>
      <div className="flex justify-center w-[1200px] h-auto">
        <div className="flex flex-col items-center max-w-[759px] justify-center gap-2">
          <h3 className="font-bold text-[38px] text-white font-montserrat">
            Diseñamos la tecnología que tu negocio necesita para crecer
          </h3>
          <p className="font-medium text-[18px] text-white font-montserrat">
            Desarrollamos soluciones tecnológicas a medida, optimizados para que
            tus procesos sean más rápidos, tu presencia digital más sólida y tus
            clientes más satisfechos. Combinamos creatividad y precisión técnica
            para ofrecer soluciones que generan resultados reales.
          </p>
          {/*PORTAFOLIO*/}
          <div className="flex justify-start w-full">
            <button className="text-white font-bold text-xs bg-[#9241E0] w-[209px] h-[52px] rounded-lg">
              Ver portafolio →
            </button>
          </div>
        </div>
        <div className="flex justify-center flex-col">
          <div className="">
            <img
              src="/desarrollo-aplicacion-movil-web-administrativa 1.png"
              alt="imagen-desarrollo-movil"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Presentation;
