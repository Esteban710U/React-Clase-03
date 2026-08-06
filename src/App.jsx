import { useEffect, useState } from "react";
import ContactoCard from "./components/ContactoCard.jsx";
import FormularioContacto from "./components/FormularioContacto";
import Saludo from "./components/Saludo";

const contactosIniciales = [
  {
    id: 1,
    nombre: "Esteban",
    telefono: "311 323 5370",
    correo: "esteban@sena.edu.co",
    etiqueta: "Aprendiz",
  },
];

export default function App() {
  const [contactos, setContactos] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("contactos") || "null") ||
      contactosIniciales
    );
  });

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    etiqueta: "",
  });

  const [buscar, setBuscar] = useState("");

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  function guardarContacto(nuevo) {
    setContactos([...contactos, { id: Date.now(), ...nuevo }]);
  }

  function borrarContacto(id) {
    setContactos(contactos.filter((c) => c.id !== id));
  }

  function cambiarTexto(evento) {
    const { name, value } = evento.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function enviarFormulario(evento) {
    evento.preventDefault();

    guardarContacto(form);

    setForm({
      nombre: "",
      correo: "",
      telefono: "",
      etiqueta: "",
    });
  }

  const contactosFiltrados = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <Saludo
          nombre="Esteban Guapacha"
          curso="React"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

          <div className="lg:col-span-1">

            <FormularioContacto
              form={form}
              onChange={cambiarTexto}
              onSubmit={enviarFormulario}
              totalContactos={contactos.length}
            />

          </div>

          <div className="lg:col-span-2">

            <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>

                  <h2 className="text-3xl font-bold text-slate-800">
                    Contactos
                  </h2>

                  <p className="text-slate-500 mt-1">
                    Administra tus contactos de forma rápida.
                  </p>

                </div>

                <input
                  type="text"
                  placeholder="Buscar contacto..."
                  value={buscar}
                  onChange={(e) => setBuscar(e.target.value)}
                  className="w-full md:w-80 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                />

              </div>

              <div className="space-y-5">

                {contactosFiltrados.length === 0 ? (

                  <div className="text-center py-16">

                    <p className="text-slate-500 text-lg">
                      No se encontraron contactos.
                    </p>

                  </div>

                ) : (

                  contactosFiltrados.map((c) => (

                    <ContactoCard
                      key={c.id}
                      id={c.id}
                      nombre={c.nombre}
                      telefono={c.telefono}
                      correo={c.correo}
                      etiqueta={c.etiqueta}
                      onDelete={borrarContacto}
                    />

                  ))

                )}

              </div>

            </section>

          </div>

        </div>

      </div>

    </main>
  );
}