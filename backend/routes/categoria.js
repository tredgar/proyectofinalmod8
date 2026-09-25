const express = require("express");
const router = express.Router();

const categoriaController = require("../controllers/categoriaController");
const validarSchema = require("../middleware/validarSchema");
/*const {
  autenticarToken,
  restringirA,
} = require("../middlewares/authMiddleware");*/
const { categoriaSchema } = require("../schemas/categoriaSchema");

// 🟢 Rutas Públicas (Cualquiera puede consultar las categorías)
router.get("/", categoriaController.obtenerCategorias);
//router.get("/:id", categoriaController.obtenerCategoriaPorId);

// 🔴 Rutas Privadas (Requieren JWT válido) autenticarToken, restringirA("admin", "seller"),
router.post(
  "/nuevo",
 
  validarSchema(categoriaSchema),
  categoriaController.crearCategoria,
);

router.put(
  "/actualizar/:id",
  
 
  validarSchema(categoriaSchema),
  categoriaController.actualizarCategoria,
);

router.patch(
  "/:id/estado",
    validarSchema(categoriaSchema),
  categoriaController.cambiarEstadoCategoria,
);

module.exports = router;
