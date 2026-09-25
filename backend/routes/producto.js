const express = require("express");
const router = express.Router();

const productoController = require("../controllers/productoController");
const validarSchema = require("../middleware/validarSchema");
const { crearProductoSchema } = require("../schemas/productoSchema");

// Rutas Públicas
router.get("/", productoController.obtenerProductos);
router.get("/:id", productoController.obtenerProductoPorId);

// Rutas Privadas
router.post(
  "/nuevo",
  validarSchema(crearProductoSchema),
  productoController.crearProducto,
);

router.put(
  "/actualizar/:id",
  validarSchema(crearProductoSchema),
  productoController.actualizarProducto,
);

router.patch("/actualizar/:id/estado", productoController.cambiarEstadoProducto);

module.exports = router;
