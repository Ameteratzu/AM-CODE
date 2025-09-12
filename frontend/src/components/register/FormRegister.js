import { ArrowRight } from "lucide-react";

export default function Formulario() {
  return (
    <div className="w-full flex justify-center items-center py-10">
      <div className="bg-white shadow-md rounded-2xl p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-6">DATOS PERSONALES</h2>

        <form className="flex flex-col gap-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ingrese su primer nombre"
              className="w-full bg-[#DCDCDC]/30 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Apellido <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ingrese su apellido paterno y materno"
              className="w-full bg-[#DCDCDC]/30 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Correo */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Ingrese aquí su correo electrónico"
              className="w-full bg-[#DCDCDC]/30 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Celular */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Celular <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="Ingrese su teléfono"
              className="w-full bg-[#DCDCDC]/30 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* País */}
          <div>
            <label className="block text-sm font-medium mb-1">
              País de residencia <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="País"
              className="w-full border bg-[#DCDCDC]/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="mt-4 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-white font-medium bg-gradient-to-r from-[#B80AB5] to-[#E18708] "
          >
            Continuar <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
