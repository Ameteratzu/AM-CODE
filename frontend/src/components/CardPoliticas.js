import { useState } from "react";

const CardPoliticas = ({ id, description, shortDescription, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-white flex-col rounded-2xl p-4 cursor-pointer shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[30px] flex items-center justify-center text-white font-bold rounded-full bg-gradient-to-l from-[#300F52] to-[#000000]">
          {id}
        </div>
        <div className="font-semibold text-black font-segoe">{title}</div>
      </div>

      {/* Contenido */}
      <div className="mt-2 text-sm text-black font-segoe transition-all duration-500 ease-in-out">
        {open ? description : shortDescription}
      </div>

      <div className="flex justify-end">
        <button
          className="bg-[#9241E0] w-[120px] text-white p-2 rounded-lg font-bold font-inter text-[12px]"
          onClick={() => setOpen(!open)}
        >
          {open ? "Leer menos" : "Leer mas"}
        </button>
      </div>
    </div>
  );
};

export default CardPoliticas;
