export default function FormularioContacto({
  form,
  onChange,
  onSubmit,
  totalContactos,
}) {
  return (
    <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sticky top-8">

      <h2 className="text-3xl font-bold text-slate-800">
        Nuevo contacto
      </h2>

      <p className="text-slate-500 mt-2">
        Completa la información para registrar un contacto.
      </p>

      <div className="mt-6 mb-8 rounded-2xl bg-indigo-50 border border-indigo-100 p-5">

        <p className="text-sm text-slate-500">
          Total de contactos
        </p>

        <h3 className="text-4xl font-bold text-indigo-600 mt-1">
          {totalContactos}
        </h3>

      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nombre
          </label>

          <input
            type="text"
            name="nombre"
            placeholder="Ingrese el nombre"
            value={form.nombre}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

        </div>

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Teléfono
          </label>

          <input
            type="text"
            name="telefono"
            placeholder="Ingrese el teléfono"
            value={form.telefono}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

        </div>

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Correo electrónico
          </label>

          <input
            type="email"
            name="correo"
            placeholder="correo@ejemplo.com"
            value={form.correo}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

        </div>

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Etiqueta
          </label>

          <input
            type="text"
            name="etiqueta"
            placeholder="Trabajo, Familia, Amigos..."
            value={form.etiqueta}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-indigo-700 hover:shadow-lg"
        >
          Agregar contacto
        </button>

      </form>

    </section>
  );
}