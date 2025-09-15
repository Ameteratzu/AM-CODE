import { Link } from "react-router-dom";

export const Enlaces = ({ enlaces }) => {
  // catálogo de enlaces disponibles
  const allLinks = {
    inicio: { to: "/", label: "Inicio" },
    about: { to: "/about", label: "Sobre Nosotros" },
    portfolio: { to: "/portfolio", label: "Nuestros Proyectos" },
    politicas: { to: "/politicas", label: "Políticas y Privacidad" },
    asistencia: { to: "/asistencia", label: "Asistencia" },
  };

  return (
    <ul className="flex gap-9">
      {enlaces.map((key) => {
        const link = allLinks[key];
        return (
          link && (
            <li key={key}>
              <Link
                to={link.to}
                className="text-white hover:text-[#BD52FF] font-semibold"
              >
                {link.label}
              </Link>
            </li>
          )
        );
      })}
    </ul>
  );
};
