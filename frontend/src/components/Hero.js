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
            <strong className="text-[#E18708] font-medium" > funcionales. </strong>
          </h3>
        </div>
      </div>
      {/*REGISTRARSE*/}
      <button className="text-white font-bold text-xs bg-[#9241E0] w-[209px] h-[52px] rounded-lg">
        Registrate Ahora
      </button>
    </div>
  );
};

export default Hero;
