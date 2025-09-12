import SocialButton from "./SocialButon";

const RedesContact = () => {
  const redes = [
    {
      icon: "/iconos/ic_baseline-facebook.png",
      label: "Am Code - Desarrollos Digitales",
      color: "bg-[#372747]",
      url: "https://facebook.com",
    },
    {
      icon: "/iconos/ic_baseline-facebook.png",
      label: "Am Code - Desarrollos Digitales",
      color: "bg-[#B80AB5]",
      url: "https://facebook.com",
    },
    {
      icon: "/iconos/ic_baseline-facebook.png",
      label: "Am Code - Desarrollos Digitales",
      color: "bg-[#372747]",
      url: "https://facebook.com",
    },
    {
      icon: "/iconos/ic_baseline-facebook.png",
      label: "Am Code - Desarrollos Digitales",
      color: "bg-[#B80AB5]",
      url: "https://facebook.com",
    },
  ];

  return (
    <section className="w-full h-[500px] bg-[#1E0437] flex justify-center items-center">
      <div className="w-[800px] flex flex-col justify-center items-center">
        <div className="flex flex-col justify-start w-full">
          <h3 className="bg-clip-text text-transparent font-bold text-[35px] font-inter bg-gradient-to-l from-[#D000AF] to-[#E0830E]">
            ¿Listo para impulsar tu empresa?
          </h3>
          <h5 className="font-inter text-white font-bold text-[25px]">
            Contactanos
          </h5>
        </div>

        {/* Contenido */}
        <div className="flex w-full gap-8 items-stretch">
          {/* Imagen izquierda */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src="/logosContacto/imageRedes.png"
              className="w-full h-full object-contain animate-pulse"
            />
          </div>

          {/* Redes derecha */}
          <div className="flex flex-col flex-1 gap-4 justify-center">
            {redes.map((red, index) => (
              <SocialButton key={index} {...red} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedesContact;
