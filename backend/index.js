const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Carga variables de entorno desde el archivo .env
const { dbConnection } = require("./database/config");

const app = express();
const PORT = process.env.PORT || 4000;
const versionApi = process.env.VERSION_API || "v1";

//Base de datos
//dbConnection(); // Conexión a la base de datos MongoDB

app.use(cors()); // Permite peticiones desde el frontend (React)
// Middlewares
app.use(express.json()); // Permite que Express entienda datos en formato JSON

app.use(express.static("public")); // Sirve archivos estáticos desde la carpeta "public"

// Datos de prueba (Simulación de base de datos)
const productos = [
  { id: 1, nombre: "Laptop Gamer", precio: 15000, categoria: "Tecnología" },
  { id: 2, nombre: "Audífonos Bluetooth", precio: 1200, categoria: "Audio" },
  { id: 3, nombre: "Teclado Mecánico", precio: 850, categoria: "Accesorios" },
  { id: 4, nombre: "Monitor 4K", precio: 7000, categoria: "Tecnología" },
  { id: 5, nombre: "Mouse Inalámbrico", precio: 500, categoria: "Accesorios" },
  { id: 6, nombre: "Smartphone", precio: 8000, categoria: "Tecnología" },
  {
    id: 7,
    nombre: "Cargador de Batería",
    precio: 150,
    categoria: "Accesorios",
  },
  {
    id: 8,
    nombre: "Camara Fotográfica",
    precio: 2000,
    categoria: "Tecnología",
  },
  { id: 9, nombre: "Altavoz Portátil", precio: 600, categoria: "Audio" },
  { id: 10, nombre: "Tablet", precio: 3000, categoria: "Tecnología" },
  {
    id: 11,
    nombre: "Impresora Multifuncional",
    precio: 1200,
    categoria: "Accesorios",
  },
  {
    id: 12,
    nombre: "Monitor de 24 pulgadas",
    precio: 1500,
    categoria: "Tecnología",
  },
];

app.use(`/api/${versionApi}/auth`, require("./routes/auth"));
app.use(`/api/${versionApi}/productos`, require("./routes/producto"));
app.use(`/api/${versionApi}/categorias`, require("./routes/categoria"));

// Rutas (Endpoints)

// 2. Ruta para obtener la lista de productos
/*app.get(`/api/${versionApi}/productos`, (request, response) => {
  response.json(productos);
});

// GET /api/productos/2
app.get(`/api/${versionApi}/productos/:id`, (request, response) => {
  const { id } = request.params; // Captura el ":id" de la URL

  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    return response.status(404).json({ mensaje: "Producto no encontrado" });
  }

  response.json(producto);
});

// POST /api/productos - crear un producto nuevo (body)
app.post(`/api/${versionApi}/productos`, (request, response) => {
  const { nombre, precio, categoria } = request.body; // Captura el JSON enviado desde React

  if (!nombre || !precio) {
    return response
      .status(400)
      .json({ mensaje: "Nombre y precio son obligatorios" });
  }

  const nuevoProducto = {
    id: productos.length + 1,
    nombre,
    precio: Number(precio),
    categoria: categoria || "General",
  };

  productos.push(nuevoProducto);
  response
    .status(201)
    .json({ mensaje: "Producto creado exitosamente", producto: nuevoProducto });
});

// DELETE /api/productos/:id - Eliminar un producto
app.delete(`/api/${versionApi}/productos/:id`, (request, response) => {
  const { id } = request.params;
  const index = productos.findIndex((p) => p.id === parseInt(id));

  if (index === -1) {
    return response.status(404).json({ mensaje: "Producto no encontrado" });
  }

  // Eliminar elemento del arreglo
  productos.splice(index, 1);
  response.json({ mensaje: "Producto eliminado exitosamente" });
});

*/
const inciarServer = async () => {
  // Conectar a la base de datos primero
  await dbConnection();

  // Escuchar peticiones solo si la base de datos conectó correctamente
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
};

inciarServer();