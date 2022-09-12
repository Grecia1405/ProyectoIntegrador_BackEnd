import { Router } from "express";
import { check } from "express-validator";
import { obtenerUsuarios } from "../controllers/usuario.js";

import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get('/', validarJWT, obtenerUsuarios)

export default router;