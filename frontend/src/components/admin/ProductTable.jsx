function ProductTable({ productos, onDeleteProduct }) {
  const handleDelete = async (id, nombre) => {
    // Confirmación rápida antes de borrar
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar "${nombre}"?`,
    );

    if (confirmar) {
      try {
        const respuesta = await fetch(
          `http://localhost:4000/api/productos/${id}`,
          {
            method: "DELETE",
          },
        );

        if (respuesta.ok) {
          // Notificar al padre (DashboardPage) para refrescar la lista
          onDeleteProduct(id);
        } else {
          alert("Error al intentar eliminar el producto.");
        }
      } catch (error) {
        console.error("Error al conectar con el backend:", error);
        alert("No se pudo conectar con el servidor.");
      }
    }
  };

  if (!productos || productos.length === 0) {
    return (
      <p style={{ marginTop: "20px", color: "#666" }}>
        No hay productos registrados en el catálogo.
      </p>
    );
  }

  return (
    <div style={{ overflowX: "auto", marginTop: "20px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#f8f9fa",
              borderBottom: "2px solid #dee2e6",
              textAlign: "left",
            }}
          >
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px" }}>Nombre</th>
            <th style={{ padding: "12px" }}>Precio</th>
            <th style={{ padding: "12px" }}>Categoría</th>
            <th style={{ padding: "12px", textAlign: "center" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id} style={{ borderBottom: "1px solid #e9ecef" }}>
              <td style={{ padding: "12px", fontWeight: "bold" }}>
                #{prod.id}
              </td>
              <td style={{ padding: "12px" }}>{prod.nombre}</td>
              <td
                style={{
                  padding: "12px",
                  color: "#2b8a3e",
                  fontWeight: "bold",
                }}
              >
                ${prod.precio?.toLocaleString()} MXN
              </td>
              <td style={{ padding: "12px" }}>
                <span
                  style={{
                    backgroundColor: "#e7f5ff",
                    color: "#1971c2",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "0.85em",
                  }}
                >
                  {prod.categoria}
                </span>
              </td>
              <td style={{ padding: "12px", textAlign: "center" }}>
                <button
                  onClick={() => handleDelete(prod.id, prod.nombre)}
                  style={{
                    backgroundColor: "#fa5252",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.9em",
                  }}
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
