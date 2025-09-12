import FormularioAsesoria from "../components/contacto/FormularioContacto";
import HeroContacto from "../components/contacto/HeroContacto";
import Metodologias from "../components/contacto/Metodologias";
import NavbarContacto from "../components/contacto/NavbarContacto";
import SectionAsesoria from "../components/contacto/SectionAsesoria";
import SectionContactanos from "../components/contacto/SectionContactanos";
import RedesContact from "../components/contacto/Redes";
import SectionProyects from "../components/contacto/SectionProyectos";
import ContactDinamic from "../components/contacto/ContactDinamic";
const Contactanos = () => {
  return (
    <>
      <NavbarContacto className="bg-[#1E0437]" />
      <HeroContacto title="¿Necesitas un software o una aplicación personalizada?"  subtitle="Haz despegar tu proyecto tecnológico rápido, seguro y con la menor inversión inicial posible."  />
      <Metodologias />
      <FormularioAsesoria />
      <SectionContactanos />
      <RedesContact />
      <SectionProyects />
      <ContactDinamic />
    </>
  );
};

export default Contactanos;
