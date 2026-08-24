export default function FormularioContacto({
  form,
  onChange,
  onSubmit,
  totalContactos,
  enviando,
  errores = {},
}) {
  // Devuelve las clases del input, cambiando el borde a rojo si el campo tiene error
  function claseInput(campo) {
    const base =
      "w-full rounded-xl border bg-slate-50 px-4 py-3 outline-none transition focus:ring-2";

    if (errores[campo]) {
      return `${base} border-red-400 focus:border-red-500 focus:ring-red-200`;
    }

    return `${base} border-slate-300 focus:border-indigo-500 focus:ring-indigo-200`;
  }

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
        noValidate
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
            aria-invalid={Boolean(errores.nombre)}
            className={claseInput("nombre")}
          />

          {errores.nombre && (
            <p className="mt-1.5 text-sm text-red-600">
              {errores.nombre}
            </p>
          )}

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
            aria-invalid={Boolean(errores.telefono)}
            className={claseInput("telefono")}
          />

          {errores.telefono && (
            <p className="mt-1.5 text-sm text-red-600">
              {errores.telefono}
            </p>
          )}

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
            aria-invalid={Boolean(errores.correo)}
            className={claseInput("correo")}
          />

          {errores.correo && (
            <p className="mt-1.5 text-sm text-red-600">
              {errores.correo}
            </p>
          )}

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
            aria-invalid={Boolean(errores.etiqueta)}
            className={claseInput("etiqueta")}
          />

          {errores.etiqueta && (
            <p className="mt-1.5 text-sm text-red-600">
              {errores.etiqueta}
            </p>
          )}

        </div>

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-xl bg-indigo-600 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-indigo-700 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {enviando ? "Guardando..." : "Agregar contacto"}
        </button>

      </form>

    </section>
  );
}
