import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import IconosRotativos from "./IconosRotations";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CarruselDinamico = ({ secciones }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full h-[450px] flex">
      {/* Lista de indicadores */}
      <ul className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-16 z-20">
        {secciones.map((s, i) => (
          <li
            key={i}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveIndex(i)}
          >
            <span
              className={`w-2 h-5  transition-colors ${
                activeIndex === i ? "bg-orange-500" : "bg-white/30"
              }`}
            />
            <span
              className={`w-2 h-5  transition-colors whitespace-nowrap ${
                activeIndex === i
                  ? "text-white font-bold font-inter text-[12px]"
                  : "text-gray-500 font-bold font-inter text-[12px]"
              }`}
            >
              {s.info}
            </span>
          </li>
        ))}
      </ul>

      {/* Carrusel */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        direction="vertical"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        slidesPerView={1}
        className="w-full h-[450px]"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // 👈 capturamos el índice real
      >
        {secciones.map((data, index) => (
          <SwiperSlide key={index}>
            <section
              className="relative w-full h-[450px] flex items-start py-16 justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${data.fondo})` }}
            >
              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between w-[1050px] px-6 gap-10">
                {/* Texto */}
                <div className="flex items-center gap-1 max-w-[800px]">
                  <div className="flex">
                    <img
                      src={`${data.icono}`}
                      className="max-w-24 max-h-40"
                      alt="gift-img"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-3 items-start">
                    <h2 className="w-full font-inter font-bold text-[28px] bg-gradient-to-l text-transparent bg-clip-text from-[#B80AB5] to-[#E18708] whitespace-nowrap overflow-hidden text-ellipsis">
                      {data.titulo}
                    </h2>
                    <p className="font-inter font-bold text-[14px] text-white">
                      {data.descripcion}
                    </p>
                  </div>
                </div>

                {/* Íconos rotativos */}
                <div className="flex items-start">
                  <IconosRotativos iconos={data.iconos} />
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarruselDinamico;
