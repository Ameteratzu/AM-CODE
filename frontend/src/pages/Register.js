import NavbarRegister from "../components/NavbarRegister";
import Carrusel from "../components/register/CarruselRegister";
import Formulario from "../components/register/FormRegister";

const Register = () => {
  const data = [
    {
      title: "Tu próximo proyecto comienza aquí",
      description:
        "No importa el tamaño de tu idea, podemos desarrollarla y llevarla al siguiente nivel con soluciones digitales hechas a medida",
      image: "/logosRegister/persona1.png",
    },
    {
      title: "De la idea a la realidad, juntos",
      description:
        "Transformamos tus conceptos en productos funcionales, con un equipo que te acompaña en cada paso del camino.",
      image: "/logosRegister/persona2.png",
    },
    {
      title: "Hablemos de cómo hacer crecer tu negocio",
      description:
        "Escuchamos tus necesidades, analizamos tu mercado y creamos la estrategia tecnológica que necesitas para destacar.",
      image: "/logosRegister/persona3.png",
    },
  ];

  return (
    <>
      <NavbarRegister step={1} />
      <section className=" w-full flex h-[700px]">
        <Carrusel items={data} />
        <div className="flex-[3] bg-[#F6F6F5] flex justify-center items-center">
          <Formulario />
        </div>
      </section>
    </>
  );
};

export default Register;
