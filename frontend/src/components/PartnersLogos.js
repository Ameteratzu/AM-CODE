import React from "react";

const PartnersLogos = ({ logos = [] }) => {
  return (
    <div className="w-full h-[200px] overflow-hidden relative mx-auto bg-transparent">
      <div className="flex animate-scroll whitespace-nowrap">
        {logos.concat(logos).map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center flex-shrink-0 w-[340px] h-[200px] border-r border-l border-white border-opacity-20 p-10"
          >
            <img
              src={logo}
              alt={`logo-${index}`}
              className=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersLogos;
