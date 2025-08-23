import LanguageSelector from "../components/LanguajeSelector"

const Navbar = () => {
  return(
    <nav className="text-white shadow-md">
      <div className="mx-auto w-full px-4 py-3 flex justify-around items-center">
        {/* Logo */}
        <img src="/iconAMcode.png" alt="LogoAmCode"
        className="w-[139px] h-[34px]" 
        />

        {/* Links */}
        <ul className="flex gap-9">
          <li>
            <a href="#home" className="text-white hover:text-[#BD52FF] font-semibold w-[40px] h-[19px]">Inicio</a>
          </li>
          <li>
            <a href="#services" className="text-white hover:text-[#BD52FF] font-semibold w-[40px] h-[19px]">Sobre Nosotros</a>
          </li>
          <li>
            <a href="#about" className="text-white  hover:text-[#BD52FF] font-semibold w-[40px] h-[19px]">Nuestros Proyectos</a>
          </li>
          <li>
            <a href="#contact" className="text-white hover:text-[#BD52FF] font-semibold w-[40px] h-[19px]">Políticas y privacidad</a>
          </li>
        </ul>

        {/*REGISTRARSE*/}
        <button className="text-white font-bold text-xs bg-[#9241E0] hover:bg-gradient-to-l 
          from-[#E0962F] 
          to-[#
          9747FF
          100
          ] w-[209px] h-[52px] rounded-xl">Registrate Ahora</button>

        {/*CAMBIO DE IDIOMA*/}
        <LanguageSelector />
      </div>
    </nav>
  )   

};

export default Navbar;
