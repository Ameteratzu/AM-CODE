import LanguageSelector from "../components/LanguajeSelector"

const Navbar = () => {
  return(
    <nav className="text-white shadow-md">
      <div className="mx-auto px-4 py-3 flex justify-around items-center">
        {/* Logo */}
        <img src="/iconAMcode.png" alt="LogoAmCode"
        className="w-[139px] h-[34px]" 
        />

        {/* Links */}
        <ul className="flex gap-9">
          <li>
            <a href="#home" className="text-white font-semibold w-[40px] h-[19px]">Inicio</a>
          </li>
          <li>
            <a href="#services" className="text-white font-semibold w-[40px] h-[19px]">Sobre Nosotros</a>
          </li>
          <li>
            <a href="#about" className="text-white font-semibold w-[40px] h-[19px]">Nuestros Proyectos</a>
          </li>
          <li>
            <a href="#contact" className="text-white font-semibold w-[40px] h-[19px]">Políticas y privacidad</a>
          </li>
        </ul>

        {/*REGISTRARSE*/}
        <button className="text-white font-bold text-xs bg-[#9241E0] w-[209px] h-[52px] rounded-lg">Registrate Ahora</button>

        {/*CAMBIO DE IDIOMA*/}
        <LanguageSelector />
      </div>
    </nav>
  )   

};

export default Navbar;
