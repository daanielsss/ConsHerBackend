// authController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "2h",
  });

  res.json({ token });
};
