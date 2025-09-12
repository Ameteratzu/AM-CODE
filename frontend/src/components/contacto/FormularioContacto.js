
const FormularioAsesoria = () => {
  return (  
    <section className="flex w-full h-[500px] bg-[#1E0437] justify-center items-center">
      <form class="bg-[#372747] flex flex-col gap-2 p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto text-white">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              for="nombre"
              class="flex items-center text-sm font-semibold text-gray-300 mb-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
              Nombre Completo
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Tu nombre"
              class="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label
              for="email"
              class="flex items-center text-sm font-semibold text-gray-300 mb-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Correo Electronico
            </label>
            <input
              type="email"
              id="email"
              placeholder="tu@gmail.com"
              class="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label
              for="telefono"
              class="flex items-center text-sm font-semibold text-gray-300 mb-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.08 11.08 0 007.224 7.224l.774-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              placeholder="+51"
              class="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label
              for="empresa"
              class="flex items-center text-sm font-semibold text-gray-300 mb-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l.293.293A1 1 0 009 15.414V14a1 1 0 011-1h2a1 1 0 011 1v1.414l.293-.293A1 1 0 0015 15.414V17a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Empresa
            </label>
            <input
              type="text"
              id="empresa"
              placeholder="Tu empresa"
              class="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div class="mt-6">
          <label
            for="proyecto"
            class="block text-sm font-semibold text-gray-300 mb-1"
          >
            Cuéntanos sobre tu proyecto
          </label>
          <textarea
            id="proyecto"
            rows="4"
            placeholder="Escribe tu idea..."
            class="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>

        <div class="flex w-full justify-center items-center ">
          <button
            type="submit"
            className="w-1/2 py-3 font-inter text-[12px] rounded-3xl font-bold text-white bg-gradient-to-r from-[#B80AB5] to-[#E18708]"
          >
            Enviar Consulta
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormularioAsesoria;
