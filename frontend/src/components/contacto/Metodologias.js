import CheckIcon from "../Check";

const Metodologias = () => {
  return (
    <section className="w-full flex flex-col h-[350px] bg-[#1E0437] justify-center items-center">
      <div className="flex w-[1200px] h-[250px]">
        {/* Imagen */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src="/logosContacto/image 75.png"
            className="rounded-xl object-cover h-full w-full max-w-[500px]"
          />
        </div>

        {/* Texto */}
        <div className="flex flex-1 flex-col gap-3 text-white justify-center px-6">
          <h4 className="text-[28px] font-inter font-bold ">
            Expertos en desarrollo de software personalizado
          </h4>
          <p className="text-[15px] font-inter font-medium ">
            Nuestro equipo de desarrolladores senior transforma tus ideas en
            soluciones tecnológicas robustas y escalables.
          </p>
          <div className="flex justify-start w-full space-x-9">
            <div className="flex gap-1">
              <CheckIcon type={1} />
              <span>Metodologías ágiles</span>
            </div>
            <div className="flex gap-1">
              <CheckIcon type={2} />
              <span>Tecnologías modernas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Metodologias;
