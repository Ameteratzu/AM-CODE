
const HeroAbout = () => {
  return (
    <div className="absolute top-[360px] min-h-[500px] ml-14 min-w-[720px] max-w-[700px] flex flex-col gap-9 text-white">
      <div className="flex flex-col">
        <h2 className="text-[56px] font-bold leading-tight font-montserrat">
          Construimos soluciones, creamos futuro
        </h2>
        <div className="min-w-[200px] max-w-[400px]">
          <h3 className="text-xl font-light font-montserrat">
            Hacemos que la tecnología trabaje a tu favor, impulsando tu negocio hacia adelante.
          </h3>
        </div>
      </div>
      {/*REGISTRARSE*/}
      <button
        className="text-white font-bold text-xs bg-[#9241E0] hover:bg-gradient-to-l 
          from-[#E0962F] 
          to-[#
          9747FF
          100
          ] w-[209px] h-[52px] rounded-xl"
      >
        Solicitar Información
      </button>
    </div>
  );
};

export default HeroAbout;
