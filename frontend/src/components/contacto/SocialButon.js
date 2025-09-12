// Componente de cada botón
const SocialButton = ({ icon, label, color, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 px-4 py-3 rounded-full text-white font-bold font-inter text-[16px] ${color}`}
    >
      {/* Icono */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full animate-bounce">
        <img src={icon} alt={label}  />
      </div>

      {/* Texto */}
      <span className="animate-pulse">{label}</span>
    </a>
  );
};

export default SocialButton;