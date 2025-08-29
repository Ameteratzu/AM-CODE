import { motion } from "framer-motion";

const Nosotros = () => {
  return (
    <section
      className="
        w-full min-h-[500px]
        bg-gradient-to-r
        from-[#26103B] via-[#000000] to-[#26103B]
        box-content
      "
    >
      <div className="flex justify-center gap-8 p-12">
        {/* Imagen con animación */}
        <motion.img
          src="/fondo_nosotros.png"
          alt="fondo_nosotros"
          className="max-w-[600px]"
          initial={{ opacity: 0.2, scale: 0.8 }} // más pequeña y oculta
          whileInView={{ opacity: 1, scale: 1 }} // tamaño normal y visible
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        {/* Texto con animación */}
        <motion.div
          className="flex flex-col gap-1 max-h-[700px] justify-center items-start"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-start w-full">
            <h4 className="font-inter font-bold text-white text-[20px]">
              SOBRE NOSOTROS
            </h4>
          </div>

          <p className="font-inter font-medium text-[15px] text-white">
            En AM CODE, transformamos ideas en soluciones digitales que impulsan
            tu negocio hacia el futuro.
          </p>

          <p className="font-inter font-medium text-[15px] text-white mt-4">
            Nos especializamos en consultoría tecnológica y en el desarrollo de
            páginas web, software y herramientas digitales personalizadas,
            diseñadas para optimizar procesos, fortalecer tu presencia en línea
            y ofrecer experiencias que fidelizan a tus clientes.
          </p>

          <p className="font-inter font-medium text-[15px] text-white mt-4">
            Nuestra esencia combina innovación, creatividad, calidad y
            exclusividad para garantizar que cada proyecto no solo cumpla, sino
            que supere las expectativas. Creemos en la confianza como base de
            toda relación, y por eso trabajamos de la mano contigo, entendiendo
            tu visión y convirtiéndola en resultados medibles y duraderos.
          </p>

          <p className="font-inter font-medium text-[15px] text-white mt-4">
            Con nosotros, la tecnología deja de ser un reto y se convierte en tu
            mayor ventaja competitiva.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Nosotros;
