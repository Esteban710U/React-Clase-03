// Componente de formulario para crear un contacto.
export default function FormularioContacto({ form, onChange, onSubmit, totalContactos }) {
  return (
    <section className="form-panel">
      <h2>Nuevo contacto</h2>
      <p>Total de contactos: {totalContactos}</p>
      <form onSubmit={onSubmit} className="form-contacto">
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={onChange}
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={onChange}
        />
        <input
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={onChange}
        />
        <input
          name="etiqueta"
          placeholder="Etiqueta (opcional)"
          value={form.etiqueta}
          onChange={onChange}
        />
        <button type="submit">Agregar contacto</button>
      </form>
    </section>
  );
}
