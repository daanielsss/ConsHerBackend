import { Request, Response } from "express";
import House from "../models/houseModels";

// Obtener todas las casas
export const getHouses = async (req: Request, res: Response) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener casas." });
  }
};

// Obtener una casa por ID
export const getHouseById = async (req: Request, res: Response) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) return res.status(404).json({ error: "Casa no encontrada." });
    res.json(house);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la casa." });
  }
};

// Crear una nueva casa (versión mejorada para depuración)
export const createHouse = async (req: Request, res: Response) => {
  try {
    const newHouse = new House(req.body);
    const saved = await newHouse.save();
    res.status(201).json(saved);
  } catch (err: any) {
    console.error("Error al crear la casa:  ", err);
    res
      .status(400)
      .json({ error: "Error al crear la casa.", details: err.message });
  }
};

// Actualizar casa
export const updateHouse = async (req: Request, res: Response) => {
  try {
    const updated = await House.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Casa no encontrada." });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Error al actualizar la casa." });
  }
};

// Eliminar casa
export const deleteHouse = async (req: Request, res: Response) => {
  try {
    const deleted = await House.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Casa no encontrada." });
    res.json({ message: "Casa eliminada." });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la casa." });
  }
};
