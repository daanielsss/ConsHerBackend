// routes/projectRoutes.ts (o como se llame tu archivo)

import { Router } from "express";
import {
  crearProyecto,
  obtenerProyectos,
  obtenerProyectoPorId,
  agregarGasto,
  agregarNomina,
  agregarMaterial,
  // ✅ Importa los nuevos controladores
  actualizarEstadoProyecto,
  borrarGasto,
  borrarNomina,
  borrarMaterial,
} from "../controllers/projectController";

const router = Router();

// --- Rutas existentes ---
router.post("/", crearProyecto);
router.get("/", obtenerProyectos);
router.get("/:id", obtenerProyectoPorId);

// Rutas para AGREGAR sub-documentos
router.post("/:id/gastos", agregarGasto);
router.post("/:id/nomina", agregarNomina);
router.post("/:id/materiales", agregarMaterial);

// --- ✅ Nuevas rutas AÑADIDAS ---

// Ruta para ACTUALIZAR el proyecto (cambiar estado)
router.patch("/:id", actualizarEstadoProyecto);

// Rutas para BORRAR sub-documentos
router.delete("/:id/gastos/:gastoId", borrarGasto);
router.delete("/:id/nomina/:nominaId", borrarNomina);
router.delete("/:id/materiales/:materialId", borrarMaterial);

export default router;
