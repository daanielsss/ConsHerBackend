// models/projectModel.ts
import mongoose from "mongoose";

const GastoSchema = new mongoose.Schema({
  descripcion: String,
  monto: Number,
  fecha: Date,
});

const NominaSchema = new mongoose.Schema({
  semana: String,
  trabajador: String,
  sueldo: Number,
  pago: Number,
  observaciones: String,
});

const MaterialSchema = new mongoose.Schema({
  material: String,
  cantidad: Number,
  precio: Number,
  unidad: String,
  detalles: String, // opcional
});

const ProjectSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    direccion: String,
    fechaInicio: Date,
    estado: {
      type: String,
      enum: ["En proceso", "Finalizado"],
      default: "En proceso",
    },
    presupuestoEstimado: Number,
    gananciaEstimada: Number,

    gastos: [GastoSchema],
    nomina: [NominaSchema],
    materiales: [MaterialSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
