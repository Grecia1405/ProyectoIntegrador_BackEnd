import { Router } from "express";
import { crearHorarioAsistencia, obtenerHorarioAsistencia, obtenerHorarioAsistenciaByDate, obtenerHorarioAsistenciaById } from "../controllers/horarioAsistencia.js";

const router = Router();

router.get('/', obtenerHorarioAsistencia);
router.post('/', obtenerHorarioAsistenciaByDate);
router.get('/:id', obtenerHorarioAsistenciaById);
router.post('/crear', crearHorarioAsistencia);

export default router;