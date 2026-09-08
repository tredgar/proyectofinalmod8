import { useState, useEffect } from "react";
import ProductCard from "../../components/client/ProductCard";

function CatalogPage() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  return (
    <div>
      <h2>Catálogo de Productos</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {productos.map((prod) => (
          <ProductCard key={prod.id} producto={prod} />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;
