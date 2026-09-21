/*
    rutas de usuario /Auth
    host + /api/auth 
 */
const {Router}= require("express");
const router = Router();

const {crearUsuario, loginUsuario, revalidarToken}=require("../controllers/auth");

router.post("/register", crearUsuario);
router.post("/login", loginUsuario);
router.get("/renew", revalidarToken);

module.exports = router;
