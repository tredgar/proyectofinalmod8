import { useState, useEffect } from "react";

function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // URL del backend en Express
  const API_URL = "http://localhost:4000/api/productos";

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
          throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        setProductos(datos);
      } catch (err) {
        console.error("Error al conectar con la API:", err); //revisar
        setError("No se pudieron cargar los productos del servidor.");
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []); // Array vacío para que solo se ejecute una vez al cargar la página

  if (cargando) return <p style={{ padding: "20px" }}>Cargando catálogo...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🛒 Catálogo de Productos</h1>

      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "15px",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          }}
        >
          {productos.map((producto) => (
            <div
              key={producto.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{producto.nombre}</h3>
              <p>
                <strong>Categoría:</strong> {producto.categoria}
              </p>
              <p style={{ fontSize: "1.2em", color: "#2b8a3e" }}>
                ${producto.precio.toLocaleString()} MXN
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
