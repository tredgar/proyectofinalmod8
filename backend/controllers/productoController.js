const Producto = require("../models/Producto");
const Categoria = require("../models/Categoria");

/**
 * @desc    Crear un nuevo producto
 * @route   POST /api/productos
 * @access  Privado (Admin/Empleado)
 */
exports.crearProducto = async (req, res) => {
  try {
    // 🛡️ DTO / Desestructuración Explícita: Previene Mass Assignment
    const {
      nombre,
      precio,
      descripcionCorta,
      descripcion,
      stock,
      imagenUrl,
      categoria,
      especificaciones,
      activo,
    } = req.body;

    // 1. Verificar si la categoría existe en la BD
    const categoriaExiste = await Categoria.findById(categoria);
    if (!categoriaExiste) {
      return res.status(404).json({
        exito: false,
        mensaje: "La categoría especificada no existe",
      });
    }

    // 2. Instanciar y guardar producto
    const nuevoProducto = new Producto({
      nombre,
      precio,
      descripcionCorta,
      descripcion,
      stock,
      imagenUrl,
      categoria,
      especificaciones,
      activo,
    });

    await nuevoProducto.save();

    // 3. Poblar la categoría para devolver la respuesta con los datos de la categoría
    await nuevoProducto.populate("categoria", "nombre descripcion");

    return res.status(201).json({
      exito: true,
      mensaje: "Producto creado exitosamente",
      producto: nuevoProducto,
    });
  } catch (error) {
    return res.status(500).json({
      exito: false,
      mensaje: "Error al crear el producto",
      error: error.message,
    });
  }
};

/**
 * @desc    Obtener catálogo de productos con filtros (categoría, búsqueda y paginación)
 * @route   GET /api/productos
 * @access  Público
 */
exports.obtenerProductos = async (req, res) => {
  try {
    const { categoria, busqueda, limite = 10, pagina = 1 } = req.query;

    // Construir filtro dinámico
    const filtro = { activo: true };

    if (categoria) {
      filtro.categoria = categoria;
    }

    if (busqueda) {
      filtro.nombre = { $regex: busqueda, $options: "i" }; // Búsqueda insensible a mayúsculas
    }

    const limitNum = parseInt(limite, 10);
    const skipNum = (parseInt(pagina, 10) - 1) * limitNum;

    // Consultar con populate directo a Categoria
    const [productos, total] = await Promise.all([
      Producto.find(filtro)
        .populate("categoria", "nombre")
        .sort({ createdAt: -1 })
        .skip(skipNum)
        .limit(limitNum),
      Producto.countDocuments(filtro),
    ]);

    return res.status(200).json({
      exito: true,
      total,
      pagina: parseInt(pagina, 10),
      totalPaginas: Math.ceil(total / limitNum),
      productos,
    });
  } catch (error) {
    return res.status(500).json({
      exito: false,
      mensaje: "Error al obtener los productos",
      error: error.message,
    });
  }
};

/**
 * @desc    Obtener un producto por su ID
 * @route   GET /api/productos/:id
 * @access  Público
 */
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findById(id).populate(
      "categoria",
      "nombre descripcion",
    );

    if (!producto) {
      return res.status(404).json({
        exito: false,
        mensaje: "Producto no encontrado",
      });
    }

    return res.status(200).json({
      exito: true,
      producto,
    });
  } catch (error) {
    return res.status(500).json({
      exito: false,
      mensaje: "Error al obtener el producto",
      error: error.message,
    });
  }
};

/**
 * @desc    Actualizar un producto existente
 * @route   PUT /api/productos/:id
 * @access  Privado (Admin/Empleado)
 */
exports.actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // 🛡️ DTO / Desestructuración Explícita
    const {
      nombre,
      precio,
      descripcionCorta,
      descripcion,
      stock,
      imagenUrl,
      categoria,
      especificaciones,
      activo,
    } = req.body;

    // Si se proporciona categoría, verificar que exista
    if (categoria) {
      const categoriaExiste = await Categoria.findById(categoria);
      if (!categoriaExiste) {
        return res.status(404).json({
          exito: false,
          mensaje: "La categoría especificada no existe",
        });
      }
    }

    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      {
        nombre,
        precio,
        descripcionCorta,
        descripcion,
        stock,
        imagenUrl,
        categoria,
        especificaciones,
        activo,
      },
      { new: true, runValidators: true },
    ).populate("categoria", "nombre descripcion");

    if (!productoActualizado) {
      return res.status(404).json({
        exito: false,
        mensaje: "Producto no encontrado",
      });
    }

    return res.status(200).json({
      exito: true,
      mensaje: "Producto actualizado correctamente",
      producto: productoActualizado,
    });
  } catch (error) {
    return res.status(500).json({
      exito: false,
      mensaje: "Error al actualizar el producto",
      error: error.message,
    });
  }
};

/**
 * @desc    Desactivar o activar producto (Soft Delete)
 * @route   PATCH /api/productos/:id/estado
 * @access  Privado (Admin)
 */
exports.cambiarEstadoProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    const producto = await Producto.findByIdAndUpdate(
      id,
      { activo },
      { new: true },
    );

    if (!producto) {
      return res.status(404).json({
        exito: false,
        mensaje: "Producto no encontrado",
      });
    }

    return res.status(200).json({
      exito: true,
      mensaje: `Producto ${producto.activo ? "activado" : "desactivado"} correctamente`,
      producto,
    });
  } catch (error) {
    return res.status(500).json({
      exito: false,
      mensaje: "Error al cambiar el estado del producto",
      error: error.message,
    });
  }
};
