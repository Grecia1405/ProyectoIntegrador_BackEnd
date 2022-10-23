import { Router } from "express";
import { crearHorarioAsistencia, marcarAutoSalidaAsistencia, marcarFaltaAsistencia, marcarHorarioAsistencia, obtenerHorarioAsistencia, obtenerHorarioAsistenciaByDate, obtenerHorarioAsistenciaById } from "../controllers/horarioAsistencia.js";

const router = Router();

router.get('/', obtenerHorarioAsistencia);
router.post('/', obtenerHorarioAsistenciaByDate);
router.get('/:id', obtenerHorarioAsistenciaById);
router.post('/crear', crearHorarioAsistencia);
router.post('/marcar/:id', marcarHorarioAsistencia);
router.post('/marcarAutoSalida/:id', marcarAutoSalidaAsistencia);
router.put('/marcarFalta/:id', marcarFaltaAsistencia);

export default router;