import { Router } from "express";
import { actualizarPassword, actualizarUsuario, eliminarUsuario, obtenerUsuario, obtenerUsuarios, registrarUsuario, resetpassword, restaurarUsuario } from "../controllers/usuario.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get('/:id', obtenerUsuario);
router.get('/', validarJWT, obtenerUsuarios);
router.post('/registro', registrarUsuario);
router.put('/editar/:id', validarJWT, actualizarUsuario);
router.put('/eliminar/:id', validarJWT, eliminarUsuario);
router.put('/restaurar/:id', validarJWT, restaurarUsuario);

router.put('/passwordact/:id', validarJWT, actualizarPassword);

router.post('/resetpassword', resetpassword);

export default router;