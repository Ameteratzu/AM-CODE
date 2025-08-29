import { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";

const ServiciosAbout = () => {
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBg(true);
    }, 3000); // ⏳ 2 segundos
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: "/logoServicios/Development.png",
      title: ["Data y", "Desarrollo"],
      items: [
        "Desarrollo de código a medida",
        "Integración con APIs",
        "Automatización de procesos",
        "Desarrollo de aplicaciones web y móviles",
        "Integración de APIs y microservicios",
        "Implementación de ERPs y CRMs",
      ],
    },
    {
      icon: "/logoServicios/Merged.png",
      title: ["Automatización y Eficiencia"],
      items: [
        "Automatización de procesos y tareas repetitivas",
        "Integración de herramientas y plataformas",
        "Cloud Services & herramientas de automatización",
        "Flujos de trabajo inteligentes",
        "Reducción de tiempos operativos",
      ],
    },
    {
      icon: "/logoServicios/Security.png",
      title: ["Seguridad y Auditoría"],
      items: [
        "Auditorías técnicas y de sistemas",
        "Evaluación de rendimiento y seguridad",
        "Implementación de prácticas de ciberseguridad",
        "Pruebas de vulnerabilidad y penetración",
        "Diagnósticos de infraestructura digital",
        "Monitoreo y gestión de riesgos",
      ],
    },
    {
      icon: "/logoServicios/figma.png",
      title: ["Diseño y Experiencia de Usuario"],
      items: [
        "Diseño de interfaces intuitivas",
        "Usabilidad y accesibilidad",
        "Branding y coherencia visual",
        "Experiencia de usuario (UX Research)",
        "Prototipado y pruebas con usuarios",
        "Diseño responsivo y adaptable",
      ],
    },
  ];

  return (
    <section className="w-full min-h-[500px] relative overflow-hidden bg-white">
      {/* 🔹 Fondo de imagen (independiente del contenido) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000`}
        style={{
          backgroundImage: showBg ? "url('/fondo_abouts.png')" : "none",
          backgroundSize: "105% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: showBg ? 1 : 0,
        }}
      ></div>

      {/* 🔹 Contenido SIEMPRE visible */}
      <div className="relative z-10">
        <div className="min-w-[500px] min-h-[180px] flex flex-col justify-center items-center gap-2">
          <h3 className="bg-gradient-to-r font-extrabold font-montserrat text-3xl bg-clip-text from-[#B80AB5] to-[#E18708] text-transparent">
            Nuestros servicios especializados{" "}
          </h3>
          <h2 className="text-black font-semibold font-montserrat text-[15px]">
            Cada proyecto es único, por eso nuestras soluciones también lo son.
          </h2>
        </div>

        {/* Servicios */}
        <div className="grid grid-cols-4 w-full h-[280px] gap-2">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              items={service.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiciosAbout;
