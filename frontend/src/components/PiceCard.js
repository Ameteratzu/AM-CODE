const PricingCard = ({
  descriptionReverse,
  icon,
  title,
  price,
  description,
  features = [],
  image,
}) => {
  return (
    <div className="group relative w-[300px] h-[600px] [perspective:1000px]">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Frente */}
        <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-[#5624A7] via-[#780F8C] to-[#D000AF] rounded-xl shadow-lg p-6 [backface-visibility:hidden]">
          {/* Título */}
          <div className="bg-[#1E0437] font-inter text-white font-bold text-center py-2 rounded-md mb-4">
            {title}
          </div>

          {/* Descripción */}
          <p className="text-white font-inter text-center text-sm mb-4">
            {description}
          </p>

          {/* Precio */}
          <p className="text-white font-semibold font-inter text-[25px] text-center mb-2">
            {price}
          </p>

          <hr className="border-white my-4 border-1" />

          {/* Lista de características */}
          <ul className="text-[#F3F3F3] font-inter font-extralight text-sm flex flex-col gap-2 ml-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reverso */}
        <div className="absolute inset-0 rounded-xl shadow-lg bg-gradient-to-b from-[#5624A7] via-[#780F8C] to-[#D000AF] [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center">
          <div className="flex justify-center flex-col items-center gap-2">
            <h3 className="font-inter text-[35px] text-white font-bold">
              {title}
            </h3>
            <img src={icon} alt="Card Back" />
            <div className="flex flex-col justify-center items-center p-4">
              <p className="font-medium text-center text-white font-inter text-[13px]">
                {descriptionReverse}
              </p>
            </div>
            <button className="w-[250px]  rounded-2xl p-2 text-[18px] text-white font-normal font-inter bg-gradient-to-r from-[#B80AB5] to-[#E18708]">
              Contactar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
