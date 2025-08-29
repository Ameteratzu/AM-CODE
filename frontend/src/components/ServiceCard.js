// ✅ Componente reutilizable
const ServiceCard = ({ icon, title = [], items = [] }) => {
  return (
    <div className="group flex bg-[#5D449B] hover:bg-gradient-to-br from-[#B80AB5] via-[#911F8F] to-[#5D449B] p-5 m-2 rounded-xl flex-col gap-4">
      {/* Header con ícono + título */}
      <div className="flex gap-2">
        <div>
          <img src={icon} alt="icono servicio" />
        </div>
        <div className="flex flex-col">
          {title.map((line, index) => (
            <p
              key={index}
              className="font-montserrat text-white font-bold text-[15px]"
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Lista de ítems */}
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            {/* Icono normal y blanco */}
            <img
              src="/logoServicios/check.png"
              alt="check"
              className="block group-hover:hidden"
            />
            <img
              src="/logoServicios/checkbox-outline.png"
              alt="check white"
              className="hidden group-hover:block"
            />
            <p className="font-montserrat text-white font-semibold text-[12px]">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCard;
