import mongoose from "mongoose";

const houseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["disponible", "vendida", "preventa"],
      default: "disponible",
    },
    images: [String],
    bedrooms: Number,
    bathrooms: Number,
    area: Number, // Área construida en m²
    landSize: Number, // Tamaño del terreno en m²
    constructionSize: Number, // Metros cuadrados de construcción
  },
  { timestamps: true }
);

const House = mongoose.model("House", houseSchema);
export default House;
