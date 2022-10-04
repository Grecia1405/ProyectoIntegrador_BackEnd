import { Router } from "express";
import { check } from "express-validator";
import { actualizarFeriado, eliminarFeriado, obtenerFeriado, obtenerFeriados, registrarFeriado } from "../controllers/feriado.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get('/:id', obtenerFeriado);
//router.get('/', validarJWT, obtenerFeriados);
router.get('/', obtenerFeriados);
router.post('/registro', registrarFeriado)
router.put('/editar/:id', validarJWT, actualizarFeriado);
router.delete('/eliminar/:id', validarJWT, eliminarFeriado);
/* router.get('/', validarJWT, obtenerUsuarios); */

export default router;