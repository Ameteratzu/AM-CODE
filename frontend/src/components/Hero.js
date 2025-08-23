import RotatingWords from "./RotatingWords";
const Hero = () => {
  return (
    <div className="absolute top-[360px] min-h-[500px] ml-14 min-w-[720px] max-w-[700px] flex flex-col gap-9 text-white">
      <div className="flex flex-col">
        <h2 className="text-[56px] font-bold leading-tight font-montserrat">
          Transforma tu negocio con tecnología
        </h2>
        <div className="min-w-[200px] max-w-[400px]">
          <h3 className="text-xl font-light font-montserrat">
            Creamos experiencias digitales que convierten ideas en proyectos
            <RotatingWords />
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
        Registrate Ahora
      </button>
    </div>
  );
};

export default Hero;
