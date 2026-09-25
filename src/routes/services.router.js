import express from "express"

import {controllerGetAllServices, controllerGetServiceById, controllerCreateAddService, controllerUpdateService, controllerDeleteService} from "../controllers/services.controller.js"

const router = express.Router()

// READ: obtiene todos los servicios.
router.get("/", controllerGetAllServices)

// READ: obtiene un servicio por ID.
router.get("/:sid", controllerGetServiceById)

// CREATE: agrega un servicio.
router.post("/", controllerCreateAddService)

// UPDATE: modifica un servicio.
router.put("/:sid", controllerUpdateService)

// DELETE: elimina un servicio.
router.delete("/:sid", controllerDeleteService)

export default router