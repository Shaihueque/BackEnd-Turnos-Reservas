import express from "express"

import { controllerGetAllBookings, controllerGetBookingById, controllerCreateAddBooking,controllerAddServiceToBooking, controllerUpdateBooking, controllerDeleteBooking} from "../controllers/bookings.controller.js"


const router = express.Router()

//Obtener Bookings
router.get("/", controllerGetAllBookings)

//Obtener BookingById
router.get("/:bid", controllerGetBookingById)

//createBooking
router.post("/", controllerCreateAddBooking)

// Agregar un servicio a una reserva
router.post("/:bid/services/:sid", controllerAddServiceToBooking)

//actualziar booking
router.put("/:bid", controllerUpdateBooking)

//delete booking
router.delete("/:bid", controllerDeleteBooking)

export default router