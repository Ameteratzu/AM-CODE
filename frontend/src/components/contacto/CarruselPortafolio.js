const CarruselPortafolio = ({ images = [] }) => {
  return (
    <div className="h-[200px] rounded-2xl w-[1000px] bg-[#8A38F5]/20 overflow-hidden relative mx-auto ">
      <div className="flex animate-scroll whitespace-nowrap">
        {images.concat(images).map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center flex-shrink-0 w-[340px] h-[200px] p-10"
          >
            <img src={logo} alt={`logo-${index}`} className="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarruselPortafolio;
