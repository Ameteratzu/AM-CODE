const SectionContactanos = () => {
  return (
    <section className="w-full flex flex-col bg-[#1E0437] h-[450px] justify-center items-center">
      {/* Título */}
      <div className="flex mb-6">
        <h4 className="font-inter font-bold text-[28px] text-white text-center">
          Nuestro proceso en 3 pasos simples:
        </h4>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-3 w-[1000px] gap-6 h-[300px] items-stretch">
        {/* Tarjeta 1 */}
        <div className="flex flex-col justify-start items-center bg-[#5D449B] rounded-xl p-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <img
              src="/logosContacto/chatbox-outline.png"
              className="w-16 h-16 object-contain rounded-full p-2 bg-white/10"
            />
            <span className="text-white font-bold font-montserrat text-[25px]">
              1
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="text-white font-montserrat font-bold text-[22px] mb-1">
              Completa el formulario
            </h4>
            <span className="text-white font-montserrat font-medium text-[16px]">
              Déjanos tus datos para que podamos analizar tu caso.
            </span>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="flex flex-col justify-start items-center bg-[#5D449B] rounded-xl p-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <img
              src="/logosContacto/people-outline.png"
              className="w-16 h-16 object-contain rounded-full p-2 bg-white/10"
            />
            <span className="text-white font-bold font-montserrat text-[25px]">
              2
            </span>
          </div>
          <div>
            <h4 className="text-white font-montserrat font-bold text-[22px] mb-1">
              Te contactamos
            </h4>
            <span className="text-white font-montserrat font-medium text-[16px]">
              Uno de nuestros especialistas se pondrá en contacto contigo para
              darte una propuesta adaptada a tus necesidades.
            </span>
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="flex flex-col justify-start items-center bg-[#5D449B] rounded-xl p-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <img
              src="/logosContacto/time-outline.png"
              className="w-16 h-16 object-contain rounded-full p-2 bg-white/10"
            />
            <span className="text-white font-bold font-montserrat text-[25px]">
              3
            </span>
          </div>
          <div>
            <h4 className="text-white font-montserrat font-bold text-[22px] mb-1">
              Iniciamos tu proyecto
            </h4>
            <span className="text-white font-montserrat font-medium text-[16px]">
              Arrancamos con una inversión baja, lo que te da seguridad y
              confianza en cada etapa del desarrollo.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionContactanos;
