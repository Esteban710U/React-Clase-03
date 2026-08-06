function Saludo({ nombre, curso }) {
  return (
    <div className="saludo">
      <h2>Hola {nombre}</h2>
      <h2>
        Bienvenido al curso de <span>{curso}</span>
      </h2>
    </div>
  );
}

export default Saludo;
