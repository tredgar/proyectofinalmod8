import { useState } from "react";


function AdminForm({ onProductCreated }) {
  const [form, setForm] = useState({ nombre: "", precio: "", categoria: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/api/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ nombre: "", precio: "", categoria: "" });
    onProductCreated(); // Llama a la función para refrescar la lista
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "20px",
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <input
        placeholder="Nombre del producto"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        required
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <input
        placeholder="Precio"
        type="number"
        value={form.precio}
        onChange={(e) => setForm({ ...form, precio: e.target.value })}
        required
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <input
        placeholder="Categoría"
        value={form.categoria}
        onChange={(e) => setForm({ ...form, categoria: e.target.value })}
        required
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ➕ Guardar Producto
      </button>
    </form>
  );
}

export default AdminForm;
