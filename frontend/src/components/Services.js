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
      <div className="h-[450px] w-[1060px] grid grid-cols-3 gap-2">
        {/* 1 */}
        <div className="h-[220px] flex justify-center flex-col items-center rounded-xl bg-gradient-to-tl from-[#5B005D] via-[#46004E] to-[#1F0139] group relative overflow-hidden">
          <div className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
            <img src="/Vector.png" className="w-[120px]" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex justify-center gap-4">
              <div>
                <img src="/Vector.png" className="w-[40px] mb-3" />
              </div>
              <h5 className="font-semibold text-white text-[20px]">
                Automatización
              </h5>
            </div>
            <p className="text-white text-sm px-4 font-montserrat">
              En nuestro equipo desarrollamos soluciones de automatización que
              optimizan procesos, reducen tareas repetitivas y mejoran la
              eficiencia operativa. Integramos herramientas, plataformas y
              sistemas para que nuestros clientes puedan enfocarse en lo que
              realmente importa.
            </p>
          </div>
        </div>

        {/* 2 */}
        <div className="h-[220px] flex justify-center flex-col items-center rounded-xl bg-gradient-to-tl from-[#5B005D] via-[#46004E] to-[#1F0139] group relative overflow-hidden">
          <div className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
            <img src="/Vector (1).png" className="w-[120px]" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex justify-center gap-4">
              <div>
                <img src="/Vector (1).png" className="w-[40px] mb-3" />
              </div>
              <h5 className="font-semibold text-white text-[20px]">Código</h5>
            </div>
            <p className="text-white text-sm px-4 font-montserrat">
              Creamos soluciones a medida a través del desarrollo de código,
              adaptándonos a las necesidades específicas de cada proyecto. Desde
              scripts automatizados hasta aplicaciones completas, trabajamos con
              tecnologías modernas para construir herramientas eficientes,
              escalables y funcionales.{" "}
            </p>
          </div>
        </div>

        {/* 3 */}
        <div className="h-[220px] flex justify-center flex-col items-center rounded-xl bg-gradient-to-tl from-[#5B005D] via-[#46004E] to-[#1F0139] group relative overflow-hidden">
          <div className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
            <img src="/Vector (2).png" className="w-[120px]" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex justify-center gap-4">
              <div>
                <img src="/Vector (2).png" className="w-[40px] mb-3" />
              </div>
              <h5 className="font-semibold text-white text-[20px]">
                Auditorías
              </h5>
            </div>
            <p className="text-white  text-sm px-4 font-montserrat">
              Realizamos auditorías técnicas para identificar oportunidades de
              mejora en sistemas, procesos y código. Evaluamos el rendimiento,
              la seguridad y la eficiencia de las soluciones existentes,
              entregando diagnósticos claros y recomendaciones concretas para
              optimizar recursos y minimizar riesgos.
            </p>
          </div>
        </div>

        {/* 4 */}
        <div className="h-[220px] flex justify-center flex-col items-center rounded-xl bg-gradient-to-tl from-[#5B005D] via-[#46004E] to-[#1F0139] group relative overflow-hidden">
          <div className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
            <img src="/Vector (3).png" className="w-[120px]" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex justify-center gap-4">
              <div>
                <img src="/Vector (3).png" className="w-[40px] mb-3" />
              </div>
              <h5 className="font-semibold text-white text-[20px]">
                Seguridad
              </h5>
            </div>
            <p className="text-white  text-sm px-4 font-montserrat">
              Implementamos prácticas y soluciones orientadas a proteger
              sistemas, datos y procesos. Nos enfocamos en prevenir
              vulnerabilidades, asegurar el manejo de la información y
              fortalecer la infraestructura digital de nuestros clientes,
              garantizando entornos más confiables y resilientes.
            </p>
          </div>
        </div>

        {/* 5 */}
        <div className="h-[220px] flex justify-center flex-col items-center rounded-xl bg-gradient-to-tl from-[#5B005D] via-[#46004E] to-[#1F0139] group relative overflow-hidden">
          <div className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
            <img src="/Vector (4).png" className="w-[120px]" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex justify-center gap-4">
              <div>
                <img src="/Vector (4).png" className="w-[40px] mb-3" />
              </div>
              <h5 className="font-semibold text-white text-[20px]">
                Restructuración
              </h5>
            </div>
            <p className="text-white  text-sm px-4 font-montserrat">
              Analizamos y rediseñamos sistemas, procesos y estructuras
              digitales para mejorar su rendimiento, escalabilidad y eficiencia.
              Ya sea optimizando código, reorganizando flujos de trabajo o
              modernizando plataformas, ayudamos a nuestros clientes a adaptarse
              a nuevas demandas y crecer de forma sostenible.
            </p>
          </div>
        </div>

        {/* 6 */}
        <div className="h-[220px] flex justify-center flex-col items-center rounded-xl bg-gradient-to-tl from-[#5B005D] via-[#46004E] to-[#1F0139] group relative overflow-hidden">
          <div className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
            <img src="/Vector (5).png" className="w-[120px]" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex justify-center gap-4">
              <div>
                <img src="/Vector (5).png" className="w-[40px] mb-3" />
              </div>
              <h5 className="font-semibold text-white text-[20px]">
                Diseño de usuario
              </h5>
            </div>
            <p className="text-white  text-sm px-4 font-montserrat">
              Diseñamos experiencias digitales centradas en el usuario,
              combinando funcionalidad y estética para lograr interfaces
              intuitivas y atractivas. Nuestro enfoque se basa en la usabilidad,
              la accesibilidad y la coherencia visual, garantizando productos
              eficientes y fáciles de usar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
