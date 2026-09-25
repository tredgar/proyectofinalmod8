const Categoria = require("../models/Categoria");

/**
 * @desc    Crear una nueva categoría
 * @route   POST /api/categorias
 * @access  Privado (Admin/Empleado)
 */
exports.crearCategoria = async (req, res) => {
  try {
    // Desestructuración Explícita
    const { nombre, descripcion, camposPersonalizados, estado } = req.body;

    const nuevaCategoria = new Categoria({
      nombre,
      descripcion,
      camposPersonalizados,
      estado,
    });

    await nuevaCategoria.save();

    return res.status(201).json({
      exito: true,
      mensaje: "Categoría creada exitosamente",
      categoria: nuevaCategoria,
    });
  } catch (error) {
    // Capturar error de nombre duplicado en MongoDB (código 11000)
    if (error.code === 11000) {
      return res.status(400).json({
        exito: false,
        mensaje: "Ya existe una categoría con ese nombre",
      });
    }

    return res.status(500).json({
      exito: false,
      mensaje: "Error al crear la categoría",
      error: error.message,
    });
  }
};

/**
 * @desc    Obtener todas las categorías activas (o todas si es admin)
 * @route   GET /api/categorias
 * @access  Público
 */
exports.obtenerCategorias = async (req, res) => {
  try {
    const { todash = false } = req.query;

    // Si no solicita todas, filtramos solo las que tienen estado: true
    const filtro = todash === "true" ? {} : { estado: true };

    const categorias = await Categoria.find(filtro).sort({ nombre: 1 });

    return res.status(200).json({
      exito: true,
      total: categorias.length,
      categorias,
    });
  } catch (error) {
    return res.status(500).json({
      exito: false,
      mensaje: "Error al obtener las categorías",
      error: error.message,
    });
  }
};

/**
 * @desc    Obtener una categoría por su ID
 * @route   GET /api/categorias/:id
 * @access  Público
 */
exports.obtenerCategoriaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findById(id);

    if (!categoria) {
      return res.status(404).json({
        exito: false,
        mensaje: "Categoría no encontrada",
      });
    }

    return res.status(200).json({
      exito: true,
      categoria,
    });
  } catch (error) {
    return res.status(500).json({
      exito: false,
      mensaje: "Error al obtener la categoría",
      error: error.message,
    });
  }
};

/**
 * @desc    Actualizar una categoría existente
 * @route   PUT /api/categorias/:id
 * @access  Privado (Admin/Empleado)
 */
exports.actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    //  Desestructuración Explícita
    const { nombre, descripcion, camposPersonalizados, estado } = req.body;

    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      id,
      {
        nombre,
        descripcion,
        camposPersonalizados,
        estado,
      },
      { new: true, runValidators: true },
    );

    if (!categoriaActualizada) {
      return res.status(404).json({
        exito: false,
        mensaje: "Categoría no encontrada",
      });
    }

    return res.status(200).json({
      exito: true,
      mensaje: "Categoría actualizada correctamente",
      categoria: categoriaActualizada,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        exito: false,
        mensaje: "Ya existe otra categoría con ese nombre",
      });
    }

    return res.status(500).json({
      exito: false,
      mensaje: "Error al actualizar la categoría",
      error: error.message,
    });
  }
};

/**
 * @desc    Cambiar estado de una categoría (Soft Delete / Desactivar)
 * @route   PATCH /api/categorias/:id/estado
 * @access  Privado (Admin)
 */
exports.cambiarEstadoCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const categoria = await Categoria.findByIdAndUpdate(
      id,
      { estado },
      { new: true },
    );

    if (!categoria) {
      return res.status(404).json({
        exito: false,
        mensaje: "Categoría no encontrada",
      });
    }

    return res.status(200).json({
      exito: true,
      mensaje: `Categoría ${categoria.estado ? "activada" : "desactivada"} correctamente`,
      categoria,
    });
  } catch (error) {
    return res.status(500).json({
      exito: false,
      mensaje: "Error al cambiar el estado de la categoría",
      error: error.message,
    });
  }
};
