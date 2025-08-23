const Footer = ({ className = "" }) => {
  return (
    <section className={`${className} flex justify-center items-center`}>
      <div className="w-[1700px] h-[220px] flex justify-around items-start ">
        <div className="flex flex-col gap-2">
          <div>
            <img src="/logoFooter.png" alt="logo-amcode" className="" />
          </div>
          <p className="text-white font-normal">
            2025 AM Code. Todos los derechos reservados.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-white">Contáctanos:</p>
          <div className="flex gap-4 flex-col justify-between">
            <img
              src="/logoInstagram.png"
              alt="instagraAmCode"
              className="w-[45px] h-[45px]"
            />
            <img
              src="/logoLinkedin.png"
              alt="linkedinAmCode"
              className="w-[45px] h-[45px]"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6">
          <p className="text-white">Más información:</p>
          <p className="text-white">
            Av. Arnaldo Márquez 1053, Jesús María 15072
          </p>
          <p className="text-white">Políticas de privacidad</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
