import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";

// Importamos las routes

// Solo importamos las rutas necesarias
import houseRoutes from "./routes/houseRoutes";

mongoose.connect(process.env.DB_CONNECTION_STRING as string).then(() => {
  console.log("Base de datos conectada");
});

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api", authRoutes);

// Ruta de prueba
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "¡servidor OK!" });
});

// Ruta principal
app.use("/api/houses", houseRoutes);

app.use("/api/proyectos", projectRoutes);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("App corriendo en el puerto:" + port);
});
