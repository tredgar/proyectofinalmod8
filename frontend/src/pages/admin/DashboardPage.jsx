import { useState, useEffect } from "react";
import AdminForm from "../../components/admin/AdminForm";
import ProductTable from "../../components/admin/ProductTable";

function DashboardPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarProductos = () => {
    setCargando(true);
    fetch("http://localhost:4000/api/v1/productos")
      .then((res) => res.json())
      .then((data) => {
        // 🛡️ Extracción segura respetando la respuesta { exito: true, productos: [...] }
        if (data.exito && Array.isArray(data.productos)) {
          setProductos(data.productos);
        } else if (Array.isArray(data)) {
          setProductos(data);
        } else {
          setProductos([]);
        }
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setProductos([]);
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Función para remover localmente un producto eliminado (Soporta id y _id)
  const handleProductDeleted = (idEliminado) => {
    setProductos((prevProductos) =>
      prevProductos.filter(
        (prod) => prod.id !== idEliminado && prod._id !== idEliminado,
      ),
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Panel de Administración</h2>

      {/* Formulario para agregar productos */}
      <AdminForm onProductCreated={cargarProductos} />

      {/* Tabla de productos registrados */}
      {cargando ? (
        <p style={{ marginTop: "20px" }}>Cargando lista de productos...</p>
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
