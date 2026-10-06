import express from 'express';
import { engine } from 'express-handlebars';
import path from "node:path";
import { fileURLToPath } from 'node:url';

import servicesRouter from "./routes/services.router.js"
import bookingsRouter from "./routes/bookings.router.js"
import viewsRouter from "./routes/views.router.js"

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Handlebars
app.engine("handlebars", engine({
    defaultLayout: "main"
}))

app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "../public")))

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
app.use("/api/bookings", bookingsRouter)

//Rutas de vistas
app.use("/views", viewsRouter)

export default app