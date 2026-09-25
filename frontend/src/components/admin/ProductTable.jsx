// src/components/admin/ProductTable.jsx

function ProductTable({ productos, onDeleteProduct }) {
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      fetch(`http://localhost:4000/api/v1/productos/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error al eliminar");
          return res.json();
        })
        .then(() => {
          onDeleteProduct(id);
        })
        .catch((err) => console.error("Error al borrar:", err));
    }
  };

  if (!productos || productos.length === 0) {
    return <p style={{ marginTop: "20px" }}>No hay productos registrados.</p>;
  }

  return (
    <div style={{ overflowX: "auto", marginTop: "20px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#f8f9fa",
              borderBottom: "2px solid #dee2e6",
            }}
          >
            <th style={{ padding: "12px" }}>Nombre</th>
            <th style={{ padding: "12px" }}>Categoría</th>
            <th style={{ padding: "12px" }}>Precio</th>
            <th style={{ padding: "12px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => {
            const idProducto = prod.id || prod._id;

            // 🛡️ Extraer de forma segura el texto de la categoría
            const categoriaNombre =
              typeof prod.categoria === "object" && prod.categoria !== null
                ? prod.categoria.nombre || prod.categoria.id
                : prod.categoria;

            return (
              <tr
                key={idProducto}
                style={{ borderBottom: "1px solid #dee2e6" }}
              >
                <td style={{ padding: "12px" }}>{prod.nombre}</td>

                {/* ⚠️ LÍNEA 82: Aquí se usa 'categoriaNombre' en lugar de 'prod.categoria' directo */}
                <td style={{ padding: "12px" }}>
                  <span>{categoriaNombre || "Sin categoría"}</span>
                </td>

                <td style={{ padding: "12px" }}>
                  $
                  {Number(prod.precio || 0).toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                  })}
                </td>

                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => handleDelete(idProducto)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
