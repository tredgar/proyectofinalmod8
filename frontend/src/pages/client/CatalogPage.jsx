import { useState, useEffect } from "react";
import ProductCard from "../../components/client/ProductCard";

function CatalogPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/productos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return res.json();
      })
      .then((data) => {
        // 🛡️ Tu API devuelve { exito: true, productos: [...] }
        if (data.exito && Array.isArray(data.productos)) {
          setProductos(data.productos);
        } else if (Array.isArray(data)) {
          // Fallback por si la API devolviera un array directo
          setProductos(data);
        } else {
          setProductos([]);
        }
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al obtener productos:", err);
        setError("No se pudieron cargar los productos. Intenta más tarde.");
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <p>Cargando catálogo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "red" }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Catálogo de Productos</h2>

      {productos.length === 0 ? (
        <p style={{ marginTop: "20px" }}>
          No hay productos disponibles por el momento.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {productos.map((prod) => (
            /* Se asegura de usar prod.id o prod._id según el objeto */
            <ProductCard key={prod.id || prod._id} producto={prod} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CatalogPage;
