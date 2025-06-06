import { Request, Response } from "express";
import Project from "../models/projectModel";

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
