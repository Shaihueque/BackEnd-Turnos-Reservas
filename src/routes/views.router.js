import express from "express"

import { controllerGetServicesView, controllerGetAvailabilityView, controllerGetAvailabilityByIdView, controllerGetServiceByIdView } from "../controllers/views.controller.js" 

const router = express.Router()

router.get("/services", controllerGetServicesView)

router.get("/availability", controllerGetAvailabilityView)

router.get("/availability/:bid", controllerGetAvailabilityByIdView)

router.get("/services/:sid", controllerGetServiceByIdView)

export default router