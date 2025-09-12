import { X } from "lucide-react";

const NavbarRegister = ({ step, totalSteps = 2 }) => {
  return (
    <nav className="text-black shadow-md bg-gradient-to-r from-[#E3E0E4] to-[#A8ABAF]/50 w-full flex p-4 relative">
      <div className="mx-auto w-[1300px] flex justify-between items-center relative">
        {/* Logo */}
        <img
          src="/logosRegister/logoAmCodeBlack.png"
          alt="LogoAmCode"
          className="w-[168px] h-[37px]"
        />

        {/* Indicador de pasos (centrado absoluto) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => {
            const stepNumber = i + 1;
            const isCompletedOrActive = stepNumber <= step; // activo o completado

            return (
              <div key={i} className="flex items-center">
                {/* Círculo */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold 
                  ${
                    isCompletedOrActive
                      ? "bg-[#1E0437] text-white" // activo o completado
                      : "bg-[#A8ABAF] text-white" // pendiente
                  }`}
                >
                  {stepNumber}
                </div>

                {/* Raya, excepto en el último círculo */}
                {i < totalSteps - 1 && (
                  <div
                    className={`w-36 h-[3px] mx-4 
                    ${step > stepNumber ? "bg-[#1E0437]" : "bg-[#A8ABAF]"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Botón cerrar */}
        <button className="p-2 rounded-full hover:bg-white/10 transition">
          <X size={22} />
        </button>
      </div>
    </nav>
  );
};

export default NavbarRegister;
