import { useState, useEffect } from "react";
import AdminForm from "../../components/admin/AdminForm";
import ProductTable from "../../components/admin/ProductTable";

function DashboardPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarProductos = () => {
    fetch("http://localhost:4000/api/productos")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Función para remover localmente un producto eliminado de la lista
  const handleProductDeleted = (id) => {
    setProductos(productos.filter((prod) => prod.id !== id));
  };

  return (
    <div>
      <h2>⚙️ Panel de Administración</h2>

      {/* Formulario para agregar productos */}
      <AdminForm onProductCreated={cargarProductos} />

      {/* Tabla de productos registrados */}
      {cargando ? (
        <p>Cargando lista de productos...</p>
      ) : (
        <ProductTable
          productos={productos}
          onDeleteProduct={handleProductDeleted}
        />
      )}
    </div>
  );
}

export default DashboardPage;
