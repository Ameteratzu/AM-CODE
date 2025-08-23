const Services = ({ className = "" }) => {
  return (
    <section
      className={`${className} flex flex-col justify-center items-center gap-11`}
    >
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-white font-bold text-[30px]">
          Todo lo que tu proyecto necesita, en un solo lugar
        </h3>
        <h4 className="text-white font-semibold text-[15px]">
          Una plataforma, múltiples soluciones: desarrollo, diseño, marketing,
          innovación y más.
        </h4>
      </div>

      <div className="h-[450px] w-[1060px] flex flex-col gap-2">
        {/* Fila 1 */}
        <div className="flex gap-2 h-[220px]">
          {/* Card 1 */}
          <div className="flex-1 hover:flex-[1.5] transition-all duration-300 flex justify-center flex-col items-center rounded-xl bg-gradient-to-tl from-[#5B005D] via-[#46004E] to-[#1F0139] group relative overflow-hidden">
            {/* Imagen grande */}
            <div className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
              <img src="/Vector.png" className="w-[120px]" />
            </div>
            {/* Contenido hover */}
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex justify-center gap-4">
                <img src="/Vector.png" className="w-[40px] mb-3" />
                <h5 className="font-semibold text-white text-[20px]">
                  Automatización
                </h5>
              </div>
              <p className="text-white text-sm px-4 font-montserrat">
                En nuestro equipo desarrollamos soluciones de automatización que
                optimizan procesos, reducen tareas repetitivas y mejoran la
                eficiencia operativa.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-1 hover:flex-[1.5] transition-all duration-300 flex justify-center flex-col items-center rounded-xl bg-gradient-to-tl from-[#5B005D] via-[#46004E] to-[#1F0139] group relative overflow-hidden">
            <div className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
              <img src="/Vector (1).png" className="w-[120px]" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex justify-center gap-4">
                <img src="/Vector (1).png" className="w-[40px] mb-3" />
                <h5 className="font-semibold text-white text-[20px]">Código</h5>
              </div>
              <p className="text-white text-sm px-4 font-montserrat">
                Creamos soluciones a medida a través del desarrollo de código,
                adaptándonos a las necesidades específicas de cada proyecto.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex-1 hover:flex-[1.5] transition-all duration-300 flex justify-center flex-col items-center rounded-xl bg-gradient-to-tl from-[#5B005D] via-[#46004E] to-[#1F0139] group relative overflow-hidden">
            <div className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
              <img src="/Vector (2).png" className="w-[120px]" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex justify-center gap-4">
                <img src="/Vector (2).png" className="w-[40px] mb-3" />
                <h5 className="font-semibold text-white text-[20px]">
                  Auditorías
                </h5>
              </div>
              <p className="text-white text-sm px-4 font-montserrat">
                Realizamos auditorías técnicas para identificar oportunidades de
                mejora en sistemas, procesos y código.
              </p>
            </div>
          </div>
        </div>

        {/* Fila 2 */}
        <div className="flex gap-2 h-[220px]">
          {/* Card 4 */}
          <div className="flex-1 hover:flex-[1.5] transition-all duration-300 flex justify-center flex-col items-center rounded-xl bg-gradient-to-tl from-[#5B005D] via-[#46004E] to-[#1F0139] group relative overflow-hidden">
            <div className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
              <img src="/Vector (3).png" className="w-[120px]" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex justify-center gap-4">
                <img src="/Vector (3).png" className="w-[40px] mb-3" />
                <h5 className="font-semibold text-white text-[20px]">
                  Seguridad
                </h5>
              </div>
              <p className="text-white text-sm px-4 font-montserrat">
                Implementamos prácticas y soluciones orientadas a proteger
                sistemas, datos y procesos.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="flex-1 hover:flex-[1.5] transition-all duration-300 flex justify-center flex-col items-center rounded-xl bg-gradient-to-tl from-[#5B005D] via-[#46004E] to-[#1F0139] group relative overflow-hidden">
            <div className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
              <img src="/Vector (4).png" className="w-[120px]" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex justify-center gap-4">
                <img src="/Vector (4).png" className="w-[40px] mb-3" />
                <h5 className="font-semibold text-white text-[20px]">
                  Restructuración
                </h5>
              </div>
              <p className="text-white text-sm px-4 font-montserrat">
                Analizamos y rediseñamos sistemas, procesos y estructuras
                digitales para mejorar su rendimiento.
              </p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="flex-1 hover:flex-[1.5] transition-all duration-300 flex justify-center flex-col items-center rounded-xl bg-gradient-to-tl from-[#5B005D] via-[#46004E] to-[#1F0139] group relative overflow-hidden">
            <div className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
              <img src="/Vector (5).png" className="w-[120px]" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex justify-center gap-4">
                <img src="/Vector (5).png" className="w-[40px] mb-3" />
                <h5 className="font-semibold text-white text-[20px]">
                  Diseño de usuario
                </h5>
              </div>
              <p className="text-white text-sm px-4 font-montserrat">
                Diseñamos experiencias digitales centradas en el usuario,
                combinando funcionalidad y estética.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
