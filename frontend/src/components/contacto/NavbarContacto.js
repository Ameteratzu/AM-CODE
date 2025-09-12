import LanguageSelector from "../LanguajeSelector";

const NavbarContacto = ({ className = "" }) => {
  return (
    <nav className={`text-white shadow-md ${className}`}>
      <div className="mx-auto w-full px-4 py-3 flex justify-center items-center">
        <div className="flex justify-between w-full mx-10">
          {/* Logo */}
          <div className="flex-1 flex justify-start items-center">
            <img
              src="/iconAMcode.png"
              alt="LogoAmCode"
              className="h-[34px]" // para mantener tamaño si quieres
            />
          </div>
          <div className="flex">
            {/* Links */}
            <ul className="flex gap-9">
              <li>
                <a
                  href="#servicios"
                  className="text-white font-inter font-semibold text-[12px]"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="#nosotros"
                  className="text-white font-inter font-semibold text-[12px]"
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-white font-inter font-semibold text-[12px]"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarContacto;
