import { Router } from "express";
import { check } from "express-validator";
import { actualizarUsuario, eliminarUsuario, obtenerUsuario, obtenerUsuarios, registrarUsuario, restaurarUsuario } from "../controllers/usuario.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get('/:id', validarJWT, obtenerUsuario);
router.get('/', validarJWT, obtenerUsuarios);
router.post(
    '/registro',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser más de 6 caracteres').isLength({ min: 6 }),
        validarCampos
        /* validarJWT */
    ],
    registrarUsuario,
)
router.put('/editar/:id', validarJWT, actualizarUsuario);
router.put('/eliminar/:id', validarJWT, eliminarUsuario);
router.put('/restaurar/:id', validarJWT, restaurarUsuario);
/* router.get('/', validarJWT, obtenerUsuarios); */

export default router;