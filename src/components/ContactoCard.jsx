export default function ContactoCard({
  id,
  nombre,
  telefono,
  correo,
  etiqueta,
  onDelete,
}) {
  return (
    <article className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div className="flex items-start gap-4">

          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
            {nombre.charAt(0).toUpperCase()}
          </div>

          <div>

            <h3 className="text-xl font-bold text-slate-800">
              {nombre}
            </h3>

            <div className="mt-3 space-y-2">

              <p className="text-slate-600 flex items-center gap-2">
                <span>📞</span>
                <span>{telefono}</span>
              </p>

              {correo && (
                <p className="text-slate-600 flex items-center gap-2">
                  <span>✉️</span>
                  <span>{correo}</span>
                </p>
              )}

            </div>

            {etiqueta && (
              <span className="inline-block mt-4 bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-1 rounded-full">
                {etiqueta}
              </span>
            )}

          </div>

        </div>

        <button
          type="button"
          onClick={() => onDelete(id)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          Eliminar
        </button>

      </div>

    </article>
  );
}