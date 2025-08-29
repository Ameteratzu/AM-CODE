import HeroRecicler from "../components/HeroRecicler";
import PricingCard from "../components/PiceCard";

const Prices = () => {
  const plans = [
    {
      title: "Esencial",
      description: "Todo lo que necesitas para iniciar tu presencia digital",
      price: "S/.649.00 PEN",
      features: [
        "20 Páginas Internas",
        "Dominio Gratis (.com)",
        "Certificado de Seguridad SSL",
        "50 Correos Corporativos",
        "Pagos Online - Offline",
        "Posicionamiento SEO",
        "Adaptable a Dispositivos",
        "Chat Online",
        "Whatsapp Business",
        "Formulario de Contacto",
        "Retoque Fotográfico",
        "Acceso Cpanel",
        "Soporte 24/7/365",
      ],
      icon:"/logoServicios/solar_rocket-bold.png",
      descriptionReverse:"Ideal para quienes están dando sus primeros pasos en el mundo digital"
    },
    {
      title: "Profesional",
      description: "Potencia tu negocio con herramientas avanzadas",
      price: "S/.949.00 PEN",
      features: [
        "50 Páginas Internas",
        "Dominio Gratis (.com)",
        "Certificado de Seguridad SSL",
        "100 Correos Corporativos",
        "Pagos Online - Offline",
        "Posicionamiento SEO",
        "Adaptable a Dispositivos",
        "Chat Online",
        "Whatsapp Business",
        "Formulario de Contacto",
        "Retoque Fotográfico",
        "Acceso Cpanel",
        "Soporte 24/7/365",
      ],
      icon:"/logoServicios/mingcute_cube-fill.png",
      descriptionReverse:"Pensado para empresas que buscan posicionarse y destacar"
    },
    {
      title: "Ejecutivo",
      description: "Máximo rendimiento y soporte sin límites",
      price: "S/.1449.00 PEN",
      features: [
        "70 Páginas Internas",
        "Dominio Gratis (.com)",
        "Certificado de Seguridad SSL",
        "200 Correos Corporativos",
        "Pagos Online - Offline",
        "Posicionamiento SEO",
        "Adaptable a Dispositivos",
        "Chat Online",
        "Whatsapp Business",
        "Formulario de Contacto",
        "Retoque Fotográfico",
        "Acceso Cpanel",
        "Soporte 24/7/365",
      ],
      icon:"/logoServicios/fluent_premium-20-regular.png",
      descriptionReverse:"Para empresas que buscan llevar su presencia digital al siguiente nivel"
    },
  ];

  return (
    <>
      <HeroRecicler title={"Potencia tu proyecto con el plan ideal "}
      subtitle={"Soluciones adaptadas para emprendedores, empresas y proyectos de alto nivel."}
      /> 

      <section className="w-full flex items-center justify-center h-[700px] bg-gradient-to-b from-[#FFFFFF] via-[#F1ECF2] to-[#4E0057]">
        <div className="flex flex-wrap justify-center gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              features={plan.features}
              icon={plan.icon}
              descriptionReverse={plan.descriptionReverse}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Prices;
