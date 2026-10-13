import express from "express"

import {controllerGetAllServices, controllerGetServiceById, controllerCreateAddService, controllerUpdateService, controllerDeleteService} from "../controllers/services.controller.js"

import { validateBody, validateParams } from "../middlewares/validateBody.middleware.js";
import { createServiceSchema, updateServiceSchema, serviceIdParamsSchema } from "../validations/service.validation.js";

const router = express.Router()

// READ: obtiene todos los servicios.
router.get("/", controllerGetAllServices)

// READ: obtiene un servicio por ID.
router.get("/:sid", validateParams(serviceIdParamsSchema), controllerGetServiceById)

// CREATE: agrega un servicio.
router.post("/", validateBody(createServiceSchema), controllerCreateAddService)

// UPDATE: modifica un servicio.
router.put("/:sid", validateParams(serviceIdParamsSchema), validateBody(updateServiceSchema), controllerUpdateService)

// DELETE: elimina un servicio.
router.delete("/:sid", validateParams(serviceIdParamsSchema), controllerDeleteService)

export default router