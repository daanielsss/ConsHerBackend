import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";
import houseRoutes from "./routes/houseRoutes"; // Import de casas

// Conexión a MongoDB
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

// 👉 Ruta raíz para evitar error 502 en Render
app.get("/", (_req: Request, res: Response) => {
  res.send("🚀 ConsHer Backend API funcionando correctamente.");
});

// Ruta de prueba de salud
app.get("/health", (_req: Request, res: Response) => {
  res.send({ message: "¡servidor OK!" });
});

// Rutas principales
app.use("/api", authRoutes);
app.use("/api/houses", houseRoutes);
app.use("/api/proyectos", projectRoutes);

// Corre el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App corriendo en el puerto:" + port);
});
