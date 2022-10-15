import { Router } from "express";
import { crearActividad, crearActividades, editarActividad, eliminarActividad, obtenerActividad, obtenerActividades } from "../controllers/actividad.js";

const router = Router();

router.get('/', obtenerActividades);
router.get('/:id', obtenerActividad);
router.post('/crear', crearActividad);
router.post('/crearbyexcel', crearActividades);
router.put('/editar/:id', editarActividad);
router.delete('/eliminar/:id', eliminarActividad);

export default router;