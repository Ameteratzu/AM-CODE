import CardPoliticas from "../components/CardPoliticas";
import HeroRecicler from "../components/HeroRecicler";
import { useRef } from "react";
const Politicas = () => {
  const politicas = [
    {
      id: 1,
      title: "Información que recopilamos",
      description:
        "En el marco de la prestación de nuestros servicios de consultoría, desarrollo de sistemas y creación de páginas web, recopilamos una variedad de datos personales y técnicos con el fin de garantizar una atención eficiente, personalizada y segura. Estos datos pueden incluir: datos de identificación personal (nombre, apellidos, DNI, pasaporte u otro válido), datos de contacto (correo electrónico, teléfono, dirección física), información relacionada con proyectos (requisitos, documentación, archivos y preferencias tecnológicas), datos técnicos y de navegación (IP, navegador, dispositivo, proveedor de internet, fecha y hora de acceso, páginas visitadas, patrones de interacción), datos para facturación y transacciones (RUC/DNI, razón social, dirección fiscal, comprobantes de pago). Los pagos en línea se procesan únicamente mediante pasarelas seguras y certificadas; no almacenamos datos sensibles de tarjetas. También recopilamos historial de comunicaciones (correos, mensajes y registros de soporte técnico).",
      shortDescription:
        "Recopilamos datos personales, técnicos y de proyectos para brindar un servicio seguro y personalizado. Incluye identificación, contacto, facturación y comunicaciones.",
    },
    {
      id: 2,
      title: "Uso de la información",
      description:
        "La información recopilada es utilizada con fines legítimos y específicos, entre ellos: responder a consultas, elaborar propuestas personalizadas, gestionar contratos, desarrollar y mantener proyectos, brindar soporte técnico, realizar análisis internos, cumplir con obligaciones legales y prevenir actividades fraudulentas o accesos no autorizados. Con tu consentimiento expreso, también podremos enviarte comunicaciones comerciales, boletines, promociones e invitaciones a eventos. Podrás darte de baja en cualquier momento mediante los mecanismos habilitados.",
      shortDescription:
        "Usamos tu información para gestionar proyectos, contratos, soporte, seguridad y, con tu permiso, enviar comunicaciones comerciales.",
    },
    {
      id: 3,
      title: "Protección de datos",
      description:
        "En AmCode implementamos medidas técnicas, organizativas y administrativas para proteger tu información personal. Entre ellas: cifrado (HTTPS/TLS), contraseñas robustas, autenticación en dos pasos, copias de seguridad, planes de recuperación y monitoreo de accesos. Aunque ningún sistema es 100% infalible, en caso de incidentes notificaremos a autoridades y usuarios afectados, según lo exige la ley.",
      shortDescription:
        "Aplicamos medidas como cifrado, autenticación, copias de seguridad y monitoreo para proteger tu información.",
    },
    {
      id: 4,
      title: "Compartir información con terceros",
      description:
        "No comercializamos, alquilamos ni vendemos tu información personal. Podremos compartirla únicamente en estos casos: con proveedores externos (hosting, análisis de datos, mensajería, pasarelas de pago) bajo contratos de confidencialidad; por obligaciones legales o mandatos judiciales; en operaciones corporativas (fusiones, adquisiciones, reestructuraciones) garantizando siempre la protección de tus datos. En caso de transferencias internacionales, aseguramos que el receptor cumpla con niveles de protección equivalentes o superiores a la normativa vigente (incluido el RGPD).",
      shortDescription:
        "No vendemos tus datos; solo los compartimos con proveedores, autoridades o en operaciones corporativas, bajo protección legal.",
    },
    {
      id: 5,
      title: "Cookies y tecnologías similares",
      description:
        "Nuestro sitio web utiliza cookies y tecnologías similares para mejorar la experiencia de usuario, optimizar el rendimiento y recopilar datos estadísticos. Incluyen: cookies técnicas (necesarias), de preferencias (idioma, configuraciones), analíticas (uso del sitio) y publicitarias (anuncios relevantes con tu consentimiento). Puedes configurar tu navegador para rechazarlas o eliminarlas, aunque algunas funciones podrían verse limitadas.",
      shortDescription:
        "Usamos cookies técnicas, de preferencias, analíticas y publicitarias para mejorar tu experiencia.",
    },
    {
      id: 6,
      title: "Derechos del usuario",
      description:
        "Como titular de tus datos personales, tienes derecho a acceder, rectificar, actualizar o suprimirlos; oponerte a su tratamiento; limitar su uso o solicitar su portabilidad. También puedes retirar tu consentimiento en cualquier momento sin afectar la legalidad previa del tratamiento. Para ejercer tus derechos, envíanos una solicitud escrita a [correo de contacto] indicando tu nombre completo, DNI y requerimiento. Responderemos en los plazos establecidos por la Ley N.º 29733. Si no obtienes respuesta satisfactoria, puedes acudir a la Autoridad Nacional de Protección de Datos Personales.",
      shortDescription:
        "Puedes acceder, modificar o eliminar tus datos, oponerte a su uso y retirar tu consentimiento en cualquier momento.",
    },
    {
      id: 7,
      title: "Cambios en la política",
      description:
        "Nos reservamos el derecho de modificar esta Política de Privacidad para adaptarla a cambios legales, regulatorios, tecnológicos o de servicios. Publicaremos las actualizaciones en esta página con su fecha de modificación. El uso continuado de nuestros servicios tras los cambios implica tu aceptación de los mismos.",
      shortDescription:
        "Podemos actualizar esta política y publicaremos los cambios en esta página.",
    },
  ];

  // 🔹 refs dinámicos (uno por cada política)
  const refs = useRef(politicas.map(() => null));

  const handleScroll = (index) => {
    refs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <HeroRecicler
        title={"Politicas y Privacidad"}
        subtitle={
          "Tu privacidad, nuestra prioridad. Protegemos y usamos tu información con total transparencia y seguridad."
        }
      />
      <nav className="w-full h-[90px] bg-[#DABEF4]">
        <div className="w-full h-full flex justify-around items-center">
          {/* Links */}
          <ul className="flex gap-9">
            {politicas.map((p, index) => (
              <li
                key={p.id}
                className="rounded-2xl bg-[#BD52FF]/50 p-2 flex justify-center items-center cursor-pointer"
                onClick={() => handleScroll(index)}
              >
                <span className="text-black font-semibold text-[12px]">
                  {p.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <section className="flex justify-center items-center p-4">
        <div className="flex w-[1000px] h-ful bg-white flex-col justify-center gap-4">
          <div className="flex justify-start">
            <p className="font-inter text-[15px] text-black font-normal">
              En AmCode, valoramos y respetamos tu privacidad. Esta Política de
              Privacidad establece los términos y condiciones bajo los cuales
              recopilamos, utilizamos, almacenamos, protegemos y, en su caso,
              compartimos la información personal de nuestros clientes,
              visitantes y usuarios (“el Usuario”) en el marco de la Ley N.º
              29733 – Ley de Protección de Datos Personales de Perú y su
              reglamento, así como cualquier normativa internacional aplicable,
              como el Reglamento General de Protección de Datos (RGPD) de la
              Unión Europea, cuando corresponda. Al acceder, registrarte o
              utilizar nuestros servicios, aceptas expresamente las prácticas
              descritas en este documento.
            </p>
          </div>
          {politicas.map((p,index) => (
            <div
              key={p.id}
              ref={(el) => (refs.current[index] = el)}
              className="mb-6"
            >
              <CardPoliticas
                id={p.id}
                title={p.title}
                description={p.description}
                shortDescription={p.shortDescription}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Politicas;
