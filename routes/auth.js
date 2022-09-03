/* 

**********RUTAS de USUARIOS***********
        host + /api/auth

*/

import { Router } from "express";
import { check } from "express-validator";

import { registrarUsuario, loginUsuario, revalidarToken } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    '/registro',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser más de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    registrarUsuario
)

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser más de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
)

router.get('/renovar', validarJWT, revalidarToken)

export default router;