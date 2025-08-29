const ReusableCard = ({
  imageSrc,
  logoSrc,
  title,
  description,
}) => {
  return (
    <div
      className="relative max-w-[410px] max-h-[450px] w-[410px] h-[450px] bg-white rounded-lg shadow-md 
                 transition-all duration-300 ease-in-out 
                 hover:shadow-[0_4px_12px_rgba(128,128,128,0.3)] 
                 hover:rounded-2xl group overflow-visible"
    >
      {/* Imagen superior */}
      <div className="relative h-[150px] flex w-full justify-center items-center overflow-visible">
        <img
          src={imageSrc}
          alt="Imagen principal"
          className="relative z-10 transition-transform duration-300 ease-in-out group-hover:scale-125"
        />
      </div>

      {/* Sección inferior */}
      <div className="flex gap-4 p-4 flex-col relative z-20 bg-white">
        {/* Logo */}
        <div className="flex-shrink-0 h-[60px] w-[150px]">
          <img src={logoSrc} alt="Logo" />
        </div>

        {/* Contenido */}
        <div className="flex flex-col justify-center">
          <p className="font-inter text-[18px] text-black">{description}</p>
        </div>

        {/* Botón */}
        <div className="flex justify-center items-center">
          <button
            className="text-white font-inter font-bold text-[16px] 
                       bg-[#9241E0] hover:bg-gradient-to-l from-[#E0962F] to-[#9747FF]
                       w-[209px] h-[52px] rounded-xl transition-all duration-300"
          >
            Ver Proyecto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReusableCard;
