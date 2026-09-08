function ProductCard({ producto }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0" }}>{producto.nombre}</h3>
      <p style={{ margin: "5px 0", color: "#666" }}>
        <strong>Categoría:</strong> {producto.categoria}
      </p>
      <p
        style={{
          fontSize: "1.2em",
          color: "#2b8a3e",
          fontWeight: "bold",
          margin: "10px 0",
        }}
      >
        ${producto.precio?.toLocaleString()} MXN
      </p>
      <button
        style={{
          padding: "8px 12px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          width: "100%",
        }}
      >
        🛒 Agregar al Carrito
      </button>
    </div>
  );
}

export default ProductCard;
