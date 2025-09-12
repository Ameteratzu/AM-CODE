import { motion } from "framer-motion";
import AnimatedDiv from "../components/AnimatedDiv";
const ProyectRecicler = ({proyect}) => {

    const {
    id,
    logo,
    desc1,
    imagen1,
    desc2,
    funciones, // Array
    desc3,
    tecnologias, // Array (separado por coma o ya en array)
    imagen2,
    desc4,
    tecnologias2, // Array
  } = proyect;

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="w-[1400px] h-full flex flex-col mt-6 gap-5 justify-center items-center">
        {/* Columna de contenido */}
        <section className="min-h-[500px] flex justify-center items-center gap-10">
          <AnimatedDiv direction="left" duration={1}>
            <div className="w-[516px]">
              <div className="flex flex-col gap-2">
                {/* Titulo */}
                <div className="flex gap-3">
                  <img src={logo} alt="logo-proyecto" />
                  <button className="bg-gradient-to-r text-[18px] from-[#B80AB5] to-[#D19700] bg-clip-text text-transparent font-bold">
                    Nuestro proyecto
                  </button>
                </div>

                {/* Imagen principal */}
                <div className="flex justify-start w-full">
                  <img
                    src={imagen1}
                    alt="imagen_proyecto"
                    className="rounded-lg"
                  />
                </div>

                {/* Descripción inicial */}
                <div>
                  <p className="font-inter text-[15px] font-medium">{desc1}</p>
                </div>

                {/* Segunda descripción */}
                <div>
                  <h1 className="font-bold font-inter text-[25px]">
                    ¿Qué hicimos?
                  </h1>
                  <p className="font-inter text-[15px] font-medium">{desc2}</p>
                </div>

                {/* Lista de funciones */}
                <div>
                  <p className="font-inter text-[15px] font-medium">
                    Funciones clave:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    {funciones?.map((f, index) => (
                      <li
                        key={index}
                        className="font-inter text-[15px] font-medium"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedDiv>

          {/* Columna de imagen */}
          <AnimatedDiv direction="right" duration={1}>
            <div className="w-[516px] flex justify-center items-center">
              <img
                src={imagen2}
                alt="imagen-proyecto-secundaria"
                className="object-cover rounded-lg"
              />
            </div>
          </AnimatedDiv>
        </section>

        {/* SECCION RECICLABLE */}
        <section className="min-h-[120px] w-full flex justify-center items-center bg-gradient-to-l from-[#2D224B] via-[#000000] to-[#2D224C]">
          <h3 className="bg-gradient-to-r font-bold font-inter text-[22px] bg-clip-text from-[#B80AB5] to-[#E18708] text-transparent">
            Técnicas aplicadas para la creación del proyecto
          </h3>
        </section>

        {/* Experiencia de usuario */}
        <section className="min-h-[500px] flex justify-center items-center gap-10">
          <AnimatedDiv direction="left" duration={1}>
            <div className="w-[516px] h-[380px]">
              <div className="flex flex-col">
                <h2 className="font-bold font-inter text-[45px] leading-none m-0">
                  EXPERIENCIA DE
                </h2>
                <h2 className="font-bold font-inter text-[45px] ">
                  USUARIO (UX/UI DESIGN)
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-inter text-[15px] font-medium">{desc3}</p>
                <div>
                  <h5 className="font-inter text-[15px] font-bold">
                    Tecnologías:
                  </h5>
                  <p>{tecnologias?.join(", ")}</p>
                </div>

                <div className="flex w-[200px]">
                  <button
                    className="rounded-3xl p-3 w-full text-white font-bold text-[15px] 
                    bg-gradient-to-l from-[#B80AB5] to-[#E18708]"
                  >
                    Ver Figma
                  </button>
                </div>
              </div>
            </div>
          </AnimatedDiv>

          {/* Imagen UX */}
          <AnimatedDiv direction="right" duration={2}>
            <div className="w-[516px] h-[380px] flex">
              <img
                src="/proyectos/desarrollo-de-sitios-web 1.png"
                alt="imagen-ux"
                className="rounded-3xl object-cover"
              />
            </div>
          </AnimatedDiv>
        </section>

        {/* Desarrollo Web */}
        <section className="min-h-[500px] flex justify-center items-center gap-10">
          <AnimatedDiv direction="left" duration={2}>
            <div className="w-[516px] h-[380px] flex">
              <img
                src="/proyectos/experiencia-en-programacion.png"
                alt="imagen-desarrollo"
                className="rounded-3xl object-cover"
              />
            </div>
          </AnimatedDiv>

          <AnimatedDiv direction="right" duration={1}>
            <div className="w-[516px] h-[380px] flex flex-col justify-between">
              <div className="flex justify-end items-start">
                <h2 className="font-bold font-inter text-[45px]">
                  DESARROLLO WEB
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                <p className="font-inter text-[15px] font-medium text-right">
                  {desc4}
                </p>
                <div>
                  <h5 className="font-inter text-[15px] font-bold text-right">
                    Tecnologías:
                  </h5>
                  <p className="font-inter text-[15px] font-medium text-right">
                    {tecnologias2?.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedDiv>
        </section>
      </div>
    </section>
  );
};

export default ProyectRecicler;

