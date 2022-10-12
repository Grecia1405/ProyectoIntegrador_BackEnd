import { Router } from "express";
import { crearHorarioAsistencia, obtenerHorarioAsistencia, obtenerHorarioAsistenciaById } from "../controllers/horarioAsistencia.js";

const router = Router();

router.get('/', obtenerHorarioAsistencia);
router.get('/:id', obtenerHorarioAsistenciaById);
router.post('/crear', crearHorarioAsistencia);

export default router;