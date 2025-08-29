import Partners from "../components/Partners";
import ReusableCard  from "../components/ProyectosCard";
const Portafolio = () => {
  const cardsData = [
    {
      id: 1,
      imageSrc: "/logosPortafolio/imporiselP.png",
      logoSrc: "/logosPortafolio/logoimportiselP.png",
      title: "Proyecto Importisel",
      description: "Desarrollamos una plataforma web orientada a la gestión y venta de repuestos, con un sistema de control de acceso basado en roles.",
    },
    {
      id: 2,
      imageSrc: "/logosPortafolio/fondo_ejercito.png",
      logoSrc: "/logosPortafolio/logo_ejercito.png",
      title: "Proyecto Ejercito",
      description: "Desarrollamos una plataforma web para el Ejército del Perú que permite gestionar a sus participantes, asignarles rangos, generar y emitir carnets.",
    },
    {
      id: 3,
      imageSrc: "/logosPortafolio/fondo_tcn.png",
      logoSrc: "/logosPortafolio/logo_tcn.png",
      title: "Proyecto Tcn",
      description: "Desarrollamos una app web móvil para la gestión de ventas de máquinas expendedoras, con control de roles, reportes en tiempo real y herramientas de monitoreo y administración operativa.",
    },
    {
      id: 4,
      imageSrc: "/logosPortafolio/fondo_apyce.png",
      logoSrc: "/logosPortafolio/logo_apyce.png",
      title: "Proyecto Apyce",
      description: "Desarrollamos una plataforma web enfocada en la venta y distribución de libros digitales y físicos.",
    },
        {
      id: 5,
      imageSrc: "/logosPortafolio/fondo_market.png",
      logoSrc: "/logosPortafolio/logo_market.png",
      title: "Proyecto Market",
      description: "Desarrollamos una tienda en línea especializada en joyería, con catálogo dinámico, integración de pasarela de pagos, gestión de inventario.",
    },
    {
      id: 7,
      imageSrc: "/logosPortafolio/fondo_kamasa.png",
      logoSrc: "/logosPortafolio/logo_kamasa.png",
      title: "Proyecto Kamasa",
      description: "Desarrollamos una pagina web en seguridad industrial, ofreciendo un catálogo de equipos de protección personal, como cascos, guantes y ropa especializada.",
    },
    {
      id:8,
      imageSrc: "/logosPortafolio/fondo_salud.png",
      logoSrc: "/logosPortafolio/logo_salud.png",
      title: "Proyecto Importisel",
      description: "Plataforma web para la gestión de voluntariado en el área de salud, diseñada para centralizar y optimizar procesos como el registro de personal, unidades operativas y seguimiento de emergencias.",
    }
  ];
  return (
    <>
      <section className="w-full h-[340px]">
        <img src="/Frame 37.png" />
      </section>
      <Partners className="w-full h-[437px] bg-[#2e1942]" />
      <section className="w-full h-[1489px] bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-8 bg-gray-50">
          {cardsData.map((card) => (
            <ReusableCard
              key={card.id}
              imageSrc={card.imageSrc}
              logoSrc={card.logoSrc}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Portafolio;
