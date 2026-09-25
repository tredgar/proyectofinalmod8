// src/components/admin/AdminForm.jsx
import { useState, useEffect } from "react";

function AdminForm({ onProductCreated }) {
  // Estado alineado con el modelo Mongoose
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    descripcionCorta: "",
    descripcion: "",
    stock: 0,
    imagenUrl: "",
    categoria: "",
    activo: true,
  });

  // Estado para especificaciones dinámicas Map { "Talla": "M", "Color": "Negro" }
  const [especificaciones, setEspecificaciones] = useState([
    { clave: "", valor: "" },
  ]);

  const [categorias, setCategorias] = useState([]);
  const [cargandoCategorias, setCargandoCategorias] = useState(true);
  const [enviando, setEnviando] = useState(false);

  // Cargar lista de categorías para el selector de ObjectId
  useEffect(() => {
    fetch("http://localhost:4000/api/v1/categorias")
      .then((res) => res.json())
      .then((data) => {
        const lista = Array.isArray(data)
          ? data
          : data.categorias || data.data || [];
        setCategorias(lista);
        setCargandoCategorias(false);
      })
      .catch((err) => {
        console.error("Error al obtener categorías:", err);
        setCargandoCategorias(false);
      });
  }, []);

  // Manejo de pares clave-valor para especificaciones
  const handleSpecChange = (index, field, value) => {
    const nuevasSpecs = [...especificaciones];
    nuevasSpecs[index][field] = value;
    setEspecificaciones(nuevasSpecs);
  };

  const addSpecRow = () => {
    setEspecificaciones([...especificaciones, { clave: "", valor: "" }]);
  };

  const removeSpecRow = (index) => {
    setEspecificaciones(especificaciones.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.categoria) {
      alert("Por favor selecciona una categoría.");
      return;
    }

    setEnviando(true);

    // Convertir el array de especificaciones a un Objeto JS para el Map de Mongoose
    const especificacionesObj = {};
    especificaciones.forEach((spec) => {
      if (spec.clave.trim() !== "") {
        especificacionesObj[spec.clave.trim()] = spec.valor.trim();
      }
    });

    // Payload idéntico al esquema de Mongoose
    const payload = {
      nombre: form.nombre,
      precio: Number(form.precio),
      descripcionCorta: form.descripcionCorta,
      descripcion: form.descripcion,
      stock: Number(form.stock),
      imagenUrl: form.imagenUrl,
      categoria: form.categoria, // ObjectId de Mongoose
      especificaciones: especificacionesObj,
      activo: form.activo,
    };

    try {
      const res = await fetch("http://localhost:4000/api/v1/productos/nuevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.mensaje || "Error al guardar el producto");
      }

      // Resetear formulario
      setForm({
        nombre: "",
        precio: "",
        descripcionCorta: "",
        descripcion: "",
        stock: 0,
        imagenUrl: "",
        categoria: "",
        activo: true,
      });
      setEspecificaciones([{ clave: "", valor: "" }]);

      if (onProductCreated) onProductCreated();
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        marginBottom: "25px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0" }}>Agregar Nuevo Producto</h3>

      {/* Nombre y Precio */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          placeholder="Nombre del producto *"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
          style={{
            flex: "2",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <input
          placeholder="Precio MXN *"
          type="number"
          step="0.01"
          min="0"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
          required
          style={{
            flex: "1",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <input
          placeholder="Stock *"
          type="number"
          min="0"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
          style={{
            flex: "1",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Categoría e Imagen URL */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <select
          value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          required
          disabled={cargandoCategorias}
          style={{
            flex: "1",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">
            {cargandoCategorias
              ? "Cargando categorías..."
              : "-- Seleccionar Categoría * --"}
          </option>
          {categorias.map((cat) => {
            const catId = cat.id || cat._id;
            return (
              <option key={catId} value={catId}>
                {cat.nombre}
              </option>
            );
          })}
        </select>

        <input
          placeholder="URL de la imagen (opcional)"
          value={form.imagenUrl}
          onChange={(e) => setForm({ ...form, imagenUrl: e.target.value })}
          style={{
            flex: "2",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Descripciones */}
      <input
        placeholder="Descripción corta (máx 200 caracteres) *"
        maxLength={200}
        value={form.descripcionCorta}
        onChange={(e) => setForm({ ...form, descripcionCorta: e.target.value })}
        required
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      <textarea
        placeholder="Descripción detallada *"
        rows={3}
        value={form.descripcion}
        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        required
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          resize: "vertical",
        }}
      />

      {/* Sección Dinámica: Especificaciones (Map of String) */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "12px",
          borderRadius: "6px",
        }}
      >
        <label
          style={{
            fontWeight: "bold",
            fontSize: "0.9em",
            display: "block",
            marginBottom: "8px",
          }}
        >
          Especificaciones personalizadas (opcional):
        </label>
        {especificaciones.map((spec, index) => (
          <div
            key={index}
            style={{ display: "flex", gap: "10px", marginBottom: "8px" }}
          >
            <input
              placeholder="Clave (ej. Color, Talla)"
              value={spec.clave}
              onChange={(e) => handleSpecChange(index, "clave", e.target.value)}
              style={{
                flex: "1",
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <input
              placeholder="Valor (ej. Negro, XL)"
              value={spec.valor}
              onChange={(e) => handleSpecChange(index, "valor", e.target.value)}
              style={{
                flex: "1",
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            {especificaciones.length > 1 && (
              <button
                type="button"
                onClick={() => removeSpecRow(index)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0 10px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addSpecRow}
          style={{
            backgroundColor: "#6c757d",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.85em",
          }}
        >
          + Agregar especificación
        </button>
      </div>

      {/* Checkbox Activo y Botón de Enviar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={form.activo}
            onChange={(e) => setForm({ ...form, activo: e.target.checked })}
          />
          <span>Producto activo para la venta</span>
        </label>

        <button
          type="submit"
          disabled={enviando}
          style={{
            padding: "10px 20px",
            backgroundColor: enviando ? "#6c757d" : "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: enviando ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {enviando ? "Guardando..." : "➕ Guardar Producto"}
        </button>
      </div>
    </form>
  );
}

export default AdminForm;
