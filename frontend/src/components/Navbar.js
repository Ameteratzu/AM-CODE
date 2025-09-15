import LanguageSelector from "../components/LanguajeSelector";
import { Link } from "react-router-dom";
import { Enlaces } from "./enlaces";

const Navbar = () => {
  return (
    <nav className="text-white shadow-md">
      <div className="mx-auto w-full px-4 py-3 flex justify-around items-center">
        {/* Logo */}
        <img
          src="/iconAMcode.png"
          alt="LogoAmCode"
          className="w-[139px] h-[34px]"
        />

        <Enlaces enlaces={["inicio", "about", "portfolio", "politicas", "asistencia"]} />

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

        {/*CAMBIO DE IDIOMA*/}
        <LanguageSelector />
      </div>
    </nav>
  );
};

export default Navbar;
