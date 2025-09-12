import AnimatedDiv from "../AnimatedDiv";

const SectionAsesoria = () => {
  return (
    <section className="w-full flex flex-col h-[450px] justify-center items-center">
      <div className="flex">
        <h4 className="font-inter font-bold text-[40px] text-black">
          ¿Te ha pasado alguna de estas situaciones?
        </h4>
      </div>

      <div className="flex justify-center items-center gap-4">
        <AnimatedDiv direction="left" duration={1}>
          <div className="flex h-[220px] w-[500px]">
            <ul className="flex flex-col justify-between h-full">
              <li>
                ❌ Has solicitado cotizaciones y no te han dado una propuesta
                clara.
              </li>
              <li>
                ❌ Te ofrecen soluciones genéricas cuando necesitas algo
                especializado.
              </li>
              <li>
                ❌ Has tenido malas experiencias con proveedores anteriores.
              </li>
              <li>
                ❌ Quieres lanzar tu aplicación móvil y no sabes cómo empezar.
              </li>
              <li>
                ❌ No encuentras una empresa confiable que te acompañe en el
                proceso.
              </li>
            </ul>
          </div>
        </AnimatedDiv>

        <AnimatedDiv direction="right" duration={2}>
          <div className="flex">
            <img src="/logosRegister/image 73.png" className="w-[400px] " />
          </div>
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default SectionAsesoria;
