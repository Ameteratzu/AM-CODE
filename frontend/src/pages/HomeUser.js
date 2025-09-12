import NavbarRegister from "../components/NavbarRegister";
import { ArrowRight } from "lucide-react";
const HomeUser = () => {
  return (
    <>
      <NavbarRegister step={2} />
      <section className=" w-full flex h-[550px] justify-center items-center">
        <div className="flex-col w-[1000px] flex justify-center items-center gap-4 p-2">
          <div className="flex justify-center items-center">
            <img src="/logosRegister/logoInicio.png" className="cover" />
          </div>
          <div className="flex flex-col justify-center items-center w-[900px] ">
            <h1 className="font-bold font-inter text-[38px] text-black]">
              ¡Bienvenido a la próxima etapa de tus proyectos!
            </h1>
            <p className="font-medium font-inter text-center text-[15px] text-black">
              Tus datos se han registrado con éxito. Desde ahora, estás un paso
              más cerca de conectar con el talento digital que transformará tus
              ideas en realidad. Mantente atento a tu bandeja de entrada para
              nuestras próximas actualizaciones.
            </p>
          </div>
          <div className="w-full justify-center flex  items-center">
            {/* Botón */}
            <button
              type="submit"
              className="mt-4 w-[300px] flex items-center justify-center gap-2 rounded-3xl px-6 py-3 text-white font-medium bg-gradient-to-r from-[#B80AB5] to-[#E18708] "
            >
              Volver al Inicio <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeUser;
