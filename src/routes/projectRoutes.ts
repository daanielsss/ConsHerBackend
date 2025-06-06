import { Router } from "express";
import {
  crearProyecto,
  obtenerProyectos,
  obtenerProyectoPorId,
  agregarGasto,
  agregarNomina,
  agregarMaterial,
} from "../controllers/projectController";

const router = Router();

router.post("/", crearProyecto);
router.get("/", obtenerProyectos);
router.get("/:id", obtenerProyectoPorId);
router.post("/:id/gastos", agregarGasto);
router.post("/:id/nomina", agregarNomina);
router.post("/:id/materiales", agregarMaterial);

export default router;
