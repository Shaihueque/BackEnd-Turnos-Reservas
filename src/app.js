import express from 'express';
import servicesRouter from "./routes/services.router.js"

export const app = express();

app.use(express.json());

// Endpoint de inicio.
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API de servicios"
  })
})

//Rutas de servicios
app.use("/api/services", servicesRouter)

export default app