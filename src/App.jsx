import { useEffect, useState } from "react";
import ContactoCard from "./components/ContactoCard.jsx";
import FormularioContacto from "./components/FormularioContacto";
import Saludo from "./components/Saludo";

// URL del "servidor" de json-server (levantado con: npm run server)
const API_URL = "http://localhost:3001/contactos";

// Formato de correo básico: algo@algo.algo (sin espacios)
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Teléfono: solo dígitos, espacios, guiones, paréntesis y +, con al menos 7 dígitos
const REGEX_TELEFONO = /^[\d\s()+-]+$/;

// Revisa cada campo del formulario y devuelve un objeto con los mensajes de error
function validarFormulario(datos) {
  const errores = {};

  const nombre = datos.nombre.trim();
  const telefono = datos.telefono.trim();
  const correo = datos.correo.trim();

  if (!nombre) {
    errores.nombre = "El nombre es obligatorio.";
  } else if (nombre.length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  }

  if (!telefono) {
    errores.telefono = "El teléfono es obligatorio.";
  } else if (!REGEX_TELEFONO.test(telefono)) {
    errores.telefono = "El teléfono solo puede contener números, espacios, +, - y ().";
  } else if (telefono.replace(/\D/g, "").length < 7) {
    errores.telefono = "El teléfono debe tener al menos 7 dígitos.";
  }

  if (!correo) {
    errores.correo = "El correo es obligatorio.";
  } else if (!correo.includes("@")) {
    errores.correo = "El correo debe contener un @.";
  } else if (!REGEX_CORREO.test(correo)) {
    errores.correo = "El correo no tiene un formato válido (ej: nombre@dominio.com).";
  }

  if (!datos.etiqueta.trim()) {
    errores.etiqueta = "La etiqueta es obligatoria.";
  }

  return errores;
}

export default function App() {
  const [contactos, setContactos] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    etiqueta: "",
  });

  const [buscar, setBuscar] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState({});

  // Trae los contactos desde json-server al montar el componente
  useEffect(() => {
    async function cargarContactos() {
      try {
        setCargando(true);
        setError(null);

        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los contactos.");
        }

        const datos = await respuesta.json();
        setContactos(datos);
      } catch (err) {
        setError(
          "No se pudo conectar con el servidor. Verifica que json-server esté corriendo (npm run server)."
        );
      } finally {
        setCargando(false);
      }
    }

    cargarContactos();
  }, []);

  // Crea un contacto nuevo en json-server (POST) y lo agrega al estado
  async function guardarContacto(nuevo) {
    try {
      setEnviando(true);
      setError(null);

      const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo),
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo guardar el contacto.");
      }

      const contactoCreado = await respuesta.json();
      setContactos((prev) => [...prev, contactoCreado]);
    } catch (err) {
      setError("No se pudo guardar el contacto. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  // Elimina un contacto en json-server (DELETE) y lo quita del estado
  async function borrarContacto(id) {
    const contactosPrevios = contactos;

    // Actualización optimista: lo quitamos de inmediato de la UI
    setContactos((prev) => prev.filter((c) => c.id !== id));

    try {
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo eliminar el contacto.");
      }
    } catch (err) {
      // Si falla, restauramos el contacto en la UI
      setContactos(contactosPrevios);
      setError("No se pudo eliminar el contacto. Intenta de nuevo.");
    }
  }

  function cambiarTexto(evento) {
    const { name, value } = evento.target;

    setForm({
      ...form,
      [name]: value,
    });

    // Si el campo tenía un error mostrado, lo quitamos al empezar a corregirlo
    if (errores[name]) {
      setErrores((prev) => {
        const copia = { ...prev };
        delete copia[name];
        return copia;
      });
    }
  }

  async function enviarFormulario(evento) {
    evento.preventDefault();

    const erroresEncontrados = validarFormulario(form);

    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados);
      return;
    }

    setErrores({});

    // Enviamos los datos ya "limpios" (sin espacios sobrantes)
    await guardarContacto({
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim(),
      correo: form.correo.trim(),
      etiqueta: form.etiqueta.trim(),
    });

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
              enviando={enviando}
              errores={errores}
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

              {error && (
                <div className="mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3">
                  {error}
                </div>
              )}

              <div className="space-y-5">

                {cargando ? (

                  <div className="text-center py-16">

                    <p className="text-slate-500 text-lg">
                      Cargando contactos...
                    </p>

                  </div>

                ) : contactosFiltrados.length === 0 ? (

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