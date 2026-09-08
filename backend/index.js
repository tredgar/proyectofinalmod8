const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend (React)
app.use(express.json()); // Permite que Express entienda datos en formato JSON

// Datos de prueba (Simulación de base de datos)
const productos = [
  { id: 1, nombre: 'Laptop Gamer', precio: 15000, categoria: 'Tecnología' },
  { id: 2, nombre: 'Audífonos Bluetooth', precio: 1200, categoria: 'Audio' },
  { id: 3, nombre: 'Teclado Mecánico', precio: 850, categoria: 'Accesorios' },
  { id: 4, nombre: 'Monitor 4K', precio: 7000, categoria: 'Tecnología' },
  { id: 5, nombre: 'Mouse Inalámbrico', precio: 500, categoria: 'Accesorios' },
  { id: 6, nombre: 'Smartphone', precio: 8000, categoria: 'Tecnología' },
  { id: 7, nombre: 'Cargador de Batería', precio: 150, categoria: 'Accesorios' },
  { id: 8, nombre: 'Camara Fotográfica', precio: 2000, categoria: 'Tecnología' },
  { id: 9, nombre: 'Altavoz Portátil', precio: 600, categoria: 'Audio' },
  { id: 10, nombre: 'Tablet', precio: 3000, categoria: 'Tecnología' },
  { id: 11, nombre: 'Impresora Multifuncional', precio: 1200, categoria: 'Accesorios' },
  { id: 12, nombre: 'Monitor de 24 pulgadas', precio: 1500, categoria: 'Tecnología' },
];  

// Rutas (Endpoints)
// 1. Ruta de prueba de estado
app.get('/', (req, res) => {
  res.send('API del Catálogo de Productos funcionando correctamente 🚀');
});

// 2. Ruta para obtener la lista de productos
app.get('/api/productos', (req, res) => {
  res.json(productos);
});
// GET /api/productos/2
app.get('/api/productos/:id', (req, res) => {
  const { id } = req.params; // Captura el ":id" de la URL
  
  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  res.json(producto);
});

// POST /api/productos - crear un producto nuevo (body)
app.post('/api/productos', (req, res) => {
  const { nombre, precio, categoria } = req.body; // Captura el JSON enviado desde React

  if (!nombre || !precio) {
    return res.status(400).json({ mensaje: 'Nombre y precio son obligatorios' });
  }

  const nuevoProducto = {
    id: productos.length + 1,
    nombre,
    precio: Number(precio),
    categoria: categoria || 'General'
  };

  productos.push(nuevoProducto);
  res.status(201).json({ mensaje: 'Producto creado exitosamente', producto: nuevoProducto });
});


// DELETE /api/productos/:id - Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const index = productos.findIndex((p) => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  // Eliminar elemento del arreglo
  productos.splice(index, 1);
  res.json({ mensaje: 'Producto eliminado exitosamente' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});