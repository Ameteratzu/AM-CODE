import CarruselDinamico from "./SectionDinamic";

const ContactDinamic = () => {
  const secciones = [
    {
      fondo: "/logosContacto/desarrolladores.png",
      info: "Entregas Rapidas",
      icono: "/iconos/security.png",
      imagenFlotante: "/flotantes/Frame 285.png",
      titulo: "Del conociento a la realidad en tiempo real",
      resaltado: "para tu negocio",
      iconos: ["/iconos/Frame 285.png"],
      descripcion:
        "Tu software funcionando en como tiempo, con un proceso ágil que asegura calidad y cumplimiento en cada etapa.",
    },
    {
      fondo: "/logosContacto/empresario.png",
      info: "Apps Multiplataforma",
      icono: "/iconos/security.png",
      imagenFlotante: "/flotantes/firewall.png",
      titulo: "Tu idea, en todos los dispositivos",
      resaltado: "para tu negocio",
      iconos: ["/iconos/multiplataforma.png"],
      descripcion:
        "Desarrollamos aplicaciones que funcionan en web, Android y iOS, optimizadas para brindar la mejor experiencia a tus usuarios donde estén.",
    },
    {
      fondo: "/logosContacto/ciberseguridad.png",
      info: "Seguridad",
      icono: "/iconos/security.png",
      imagenFlotante: "/flotantes/firewall.png",
      titulo: "Confianza blindada para tu negocio",
      resaltado: "para tu negocio",
      iconos: ["/iconos/seguridad.png"],
      descripcion:
        "Protegemos tu proyecto con protocolos avanzados de ciberseguridad, manteniendo la integridad y confidencialidad de tus datos.",
    },
    {
      fondo: "/logosContacto/profesional.png",
      info: "Soporte",
      icono: "/iconos/security.png",
      imagenFlotante: "/flotantes/firewall.png",
      titulo: "Confianza blindada para tu negocio",
      resaltado: "para tu negocio",
      iconos: ["/iconos/soporte.png"],
      descripcion:
        "Protegemos tu proyecto con protocolos avanzados de ciberseguridad, manteniendo la integridad y confidencialidad de tus datos.",
    },
  ];

  return <CarruselDinamico secciones={secciones} />;
};

export default ContactDinamic;
