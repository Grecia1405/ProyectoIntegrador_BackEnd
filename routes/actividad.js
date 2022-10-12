import { Router } from "express";
import { crearActividad, crearActividades, editarActividad, eliminarActividad, obtenerActividades } from "../controllers/actividad.js";

const router = Router();

router.get('/', obtenerActividades);
router.post('/crear', crearActividad);
router.post('/crearbyexcel', crearActividades);
router.put('/editar/:id', editarActividad);
router.delete('/eliminar/:id', eliminarActividad);

export default router;