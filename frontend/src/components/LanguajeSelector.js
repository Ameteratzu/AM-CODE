import { useState } from "react";
import ReactCountryFlag from "react-country-flag";

const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("es"); // idioma por defecto

  const languages = [
    { code: "es", name: "ES", countryCode: "PE" },
    { code: "en", name: "EU", countryCode: "US" },
  ];

  const currentLang = languages.find((lang) => lang.code === selected);

  return (
    <div className="relative inline-block text-left">
      {/* Botón principal */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-2xl text-sm font-semibold"
      >
        <ReactCountryFlag
          countryCode={currentLang.countryCode}
          svg
          style={{
            width: "1.5em",
            height: "1.5em",
            borderRadius: "4px",
          }}
        />
        {currentLang.name}{"▾"}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelected(lang.code);
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-left text-sm hover:bg-gray-100 text-gray-800"
            >
              <ReactCountryFlag
                countryCode={lang.countryCode}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  borderRadius: "4px",
                }}
              />
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
