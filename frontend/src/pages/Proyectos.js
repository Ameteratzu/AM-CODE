import { motion } from "framer-motion";
import AnimatedDiv from "../components/AnimatedDiv";
import ProyectRecicler from "../components/CardProyectRecicler";
const Proyectos = ({ proyecto }) => {
  const proyectoData = {
    id: 1,
    logo: "/logosPoliticas/chevron-back-sharp.png",
    desc1:
      "AM CODE ha desarrollado una plataforma web para el Ejército del Perú, diseñada para optimizar la gestión de participantes y agilizar procesos administrativos internos. La solución permite registrar y administrar el personal, asignar rangos de forma dinámica, y generar y emitir carnés de identificación listos para impresión",
    imagen1: "/proyectos/cardCasoIMP.png",
    desc2: "Diseñamos y desarrollamos la plataforma con React para el frontend y Node.js para el backend, garantizando rapidez, seguridad y escalabilidad. La base de datos se gestionó con MongoDB, administrada mediante Workbench para un control eficiente de la información. Panel de administración: Permite a los operadores registrar nuevos participantes, asignar o modificar rangos y generar carnés con diseño personalizado. Además, cuenta con funciones de búsqueda y filtrado para localizar rápidamente registros específicos.",
    funciones: [
      "Registro y actualización de participantes",
      "Asignación de rangos jerárquicos",
      "Generación de carnés",
      "Gestión centralizada de datos en MongoDB",
    ],
    desc3:
      "La interfaz fue desarrollada en React, priorizando la facilidad de uso y la rapidez en la navegación. Los formularios y paneles fueron diseñados para que el personal administrativo pueda operar de manera eficiente incluso en entornos de alta demanda.",
    tecnologias: ["React", "Node.js", "Workbench", "MongoDB"],
    imagen2: "/proyectos/ChatGPT Image 14 ago 2025, 09_47_10 a.m.-Photoroom 3.png",
    desc4:
      "El backend, implementado en Node.js, se conecta con una base de datos MongoDB optimizada para un acceso rápido y seguro. El uso de Workbench permite una gestión avanzada y visual de la información. La arquitectura modular asegura que la plataforma pueda adaptarse y crecer con las necesidades del Ejército.",
    tecnologias2: ["React", "Node.js", "MongoDB", "Workbench"],
  };

  return (
    <ProyectRecicler proyect={proyectoData}>
    </ProyectRecicler>
  );
};

export default Proyectos;
