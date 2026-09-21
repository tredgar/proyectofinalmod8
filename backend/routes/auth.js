/*
    rutas de usuario /Auth
    host + /api/auth 
 */
const {Router}= require("express");
const router = Router();
const {crearUsuario,loginUsuario,revalidarToken} = require("../controllers/auth");
const validarSchema = require("../middleware/validarSchema");
const {registroUsuarioPublicoSchema} = require("../schemas/usuarioSchema");
const {validarJWT}= require("../middleware/validar-jwt");


router.post("/register", validarSchema(registroUsuarioPublicoSchema), crearUsuario);
router.post("/login", loginUsuario);
router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
