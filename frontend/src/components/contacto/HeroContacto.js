import { ArrowRight } from "lucide-react";
const HeroContacto = ({ title = "", subtitle = "" }) => {
  return (
    <section
      className="w-full h-[500px] object-cover"
      style={{ backgroundImage: "url('/logosContacto/imageContacto.png')" }}
    >
      <div className="flex justify-center items-center w-full h-full  rounded-bl-[40px] rounded-br-[40px]">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col">
            <h3 className="bg-gradient-to-r font-bold font-inter text-[38px] bg-clip-text from-[#B80AB5] to-[#E18708] text-transparent">
              {title}
            </h3>
            <div className="flex flex-col text-center">
              <h2 className="text-white font-bold font-inter text-[22px]">
                Haz despegar tu proyecto tecnológico rápido, seguro y con la
                menor
              </h2>
              <h2 className="text-white font-bold font-inter text-[22px]">
                inversión inicial posible.
              </h2>
            </div>
          </div>

          <div className="flex">
            {/* Botón */}
            <button
              type="submit"
              className="mt-4 w-full flex items-center text-[12px] justify-center gap-2 rounded-3xl px-6 py-3 text-white font-medium bg-gradient-to-r from-[#B80AB5] to-[#E18708] "
            >
              Agenda una consulta GRATIS <ArrowRight size={18} />
            </button>
          </div>

          <div className="flex justify-between items-center w-1/2 text-white font-bold text-[12px]">
            <div className="flex flex-col justify-center items-center gap-2">
              <img src="/logosContacto/90.png" />
              <span>Días para entrega</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <img src="/logosContacto/5.png" />
              <span>Inversión Inicial</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <img src="/logosContacto/7.png" />
              <span>Soporte técnico</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroContacto;
