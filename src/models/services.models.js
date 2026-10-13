import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema({

  name: { type: String, required: true },
  description: { type: String},
  duration: {
    type: Number,
    required: true,
    min: [1, "La duración debe ser mayor que cero"]
},
price: {
    type: Number,
    required: true,
    min: [0, "El precio no puede ser negativo"]
},
  category: { type: String, required: true },
  available: { type: Boolean, default: true }
})

export default mongoose.model("Service", serviceSchema)