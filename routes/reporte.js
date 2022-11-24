import { Router } from "express";
import { downloadPDF, fetchPDF } from "../controllers/reporte.js";

const router = Router();

router.post('/create-pdf', downloadPDF);
router.get('/fetch-pdf', fetchPDF);
/* router.get('/', validarJWT, obtenerUsuarios);
router.post('/registro', validarJWT, registrarUsuario); */

export default router;