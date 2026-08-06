function Saludo({ nombre, curso }) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl shadow-2xl p-10 text-white">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>

          <p className="uppercase tracking-[4px] text-indigo-100 text-sm font-semibold">
            Agenda de Contactos
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
            Hola, {nombre} 👋
          </h1>

          <p className="mt-4 text-lg text-indigo-100">
            Bienvenido al curso de{" "}
            <span className="font-bold text-white">
              {curso}
            </span>
          </p>

        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/30">

          <p className="text-indigo-100 text-sm">
            Proyecto
          </p>

          <h2 className="text-3xl font-bold mt-1">
            Agenda ADSO
          </h2>

        </div>

      </div>

    </header>
  );
}

export default Saludo;