import express from "express"

import { controllerGetAllBookings, controllerGetBookingById, controllerCreateAddBooking,controllerAddServiceToBooking, controllerUpdateBooking, controllerDeleteBooking} from "../controllers/bookings.controller.js"

import { validateBody, validateParams } from "../middlewares/validateBody.middleware.js";
import { createBookingSchema, updateBookingSchema, bookingIdParamsSchema, addServiceToBookingParamsSchema } from "../validations/bookings.validation.js";


const router = express.Router()

//Obtener Bookings
router.get("/", controllerGetAllBookings)

//Obtener BookingById
router.get("/:bid", validateParams(bookingIdParamsSchema), controllerGetBookingById)

//createBooking
router.post("/", validateBody(createBookingSchema), controllerCreateAddBooking)

// Agregar un servicio a una reserva
router.post("/:bid/services/:sid", validateParams(addServiceToBookingParamsSchema), controllerAddServiceToBooking)

//actualziar booking
router.put("/:bid", validateParams(bookingIdParamsSchema), validateBody(updateBookingSchema), controllerUpdateBooking)

//delete booking
router.delete("/:bid", validateParams(bookingIdParamsSchema), controllerDeleteBooking)

export default router