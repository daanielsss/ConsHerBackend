// controllers/projectController.ts

import { Request, Response } from "express";
import Project from "../models/projectModel";

// --- FUNCIONES EXISTENTES (SIN CAMBIOS) ---

// Crear un nuevo proyecto
export const crearProyecto = async (req: Request, res: Response) => {
  try {
    const nuevo = new Project(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err: any) {
    res
      .status(400)
      .json({ error: "Error al crear proyecto", details: err.message });
  }
};

// Obtener todos los proyectos
export const obtenerProyectos = async (_req: Request, res: Response) => {
  try {
    const proyectos = await Project.find();
    res.json(proyectos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener proyectos" });
  }
};

// Obtener un proyecto por ID
export const obtenerProyectoPorId = async (req: Request, res: Response) => {
  try {
    const proyecto = await Project.findById(req.params.id);
    if (!proyecto)
      return res.status(404).json({ error: "Proyecto no encontrado" });
    res.json(proyecto);
  } catch (err) {
    res.status(500).json({ error: "Error al buscar el proyecto" });
  }
};

// Agregar un gasto al proyecto
export const agregarGasto = async (req: Request, res: Response) => {
  try {
    const proyecto = await Project.findById(req.params.id);
    if (!proyecto)
      return res.status(404).json({ error: "Proyecto no encontrado" });

    proyecto.gastos.push(req.body);
    await proyecto.save();
    res.json(proyecto);
  } catch (err) {
    res.status(500).json({ error: "Error al agregar gasto" });
  }
};

// Agregar un registro de nómina
export const agregarNomina = async (req: Request, res: Response) => {
  try {
    const proyecto = await Project.findById(req.params.id);
    if (!proyecto)
      return res.status(404).json({ error: "Proyecto no encontrado" });

    proyecto.nomina.push(req.body);
    await proyecto.save();
    res.json(proyecto);
  } catch (err) {
    res.status(500).json({ error: "Error al agregar nómina" });
  }
};

// Agregar un material al historial
export const agregarMaterial = async (req: Request, res: Response) => {
  try {
    const proyecto = await Project.findById(req.params.id);
    if (!proyecto)
      return res.status(404).json({ error: "Proyecto no encontrado" });

    proyecto.materiales.push(req.body);
    await proyecto.save();
    res.json(proyecto);
  } catch (err) {
    res.status(500).json({ error: "Error al agregar material" });
  }
};

// --- ✅ NUEVAS FUNCIONES AÑADIDAS ---

// Actualizar el estado de un proyecto
export const actualizarEstadoProyecto = async (req: Request, res: Response) => {
  try {
    const { estado } = req.body;
    const proyectoActualizado = await Project.findByIdAndUpdate(
      req.params.id,
      { estado }, // Actualiza solo el campo 'estado'
      { new: true } // Devuelve el documento modificado
    );

    if (!proyectoActualizado) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    res.json(proyectoActualizado);
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Error al actualizar el proyecto", details: err.message });
  }
};

// Borrar un gasto de un proyecto
export const borrarGasto = async (req: Request, res: Response) => {
  try {
    const proyecto = await Project.findById(req.params.id);
    if (!proyecto)
      return res.status(404).json({ error: "Proyecto no encontrado" });

    // Saca el gasto del array usando el operador $pull de Mongoose
    proyecto.gastos.pull({ _id: req.params.gastoId });
    await proyecto.save();
    res.json({ message: "Gasto eliminado" });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Error al borrar gasto", details: err.message });
  }
};

// Borrar un registro de nómina de un proyecto
export const borrarNomina = async (req: Request, res: Response) => {
  try {
    const proyecto = await Project.findById(req.params.id);
    if (!proyecto)
      return res.status(404).json({ error: "Proyecto no encontrado" });

    proyecto.nomina.pull({ _id: req.params.nominaId });
    await proyecto.save();
    res.json({ message: "Nómina eliminada" });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Error al borrar nómina", details: err.message });
  }
};

// Borrar un material de un proyecto
export const borrarMaterial = async (req: Request, res: Response) => {
  try {
    const proyecto = await Project.findById(req.params.id);
    if (!proyecto)
      return res.status(404).json({ error: "Proyecto no encontrado" });

    proyecto.materiales.pull({ _id: req.params.materialId });
    await proyecto.save();
    res.json({ message: "Material eliminado" });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Error al borrar material", details: err.message });
  }
};
