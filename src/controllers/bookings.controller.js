import {getBookings, getBookingById, addBooking,addServiceToBooking, updateBooking, deleteBooking} from "../managers/BookingManager.js"

import { getServiceById } from "../managers/ServiceManager.js"

export async function controllerGetAllBookings(req, res) {

    try {
        
        const bookings = await getBookings()

        res.status(200).json({ status: "success", data: bookings })
        
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
    
}

export async function controllerGetBookingById(req, res) {
    try {
        const { bid } = req.params
        const booking = await getBookingById(bid)

        if (!booking) {
            return res.status(404).json({ status: "error", message: "Booking not found" })
        }

        res.status(200).json({ status: "success", data: booking })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
}

export async function controllerCreateAddBooking(req, res) {
    try {
        const newBooking = await addBooking(req.body)
        res.status(201).json({ status: "success", data: newBooking })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
}

export async function controllerAddServiceToBooking(req, res) {
    try {

        const { bid, sid } = req.params

        // Verificamos que exista la reserva
        const booking = await getBookingById(bid)

        if (!booking) {
            return res.status(404).json({
                status: "error",
                message: "Booking not found"
            })
        }

        // Verificamos que exista el servicio
        const service = await getServiceById(sid)

        if (!service) {
            return res.status(404).json({
                status: "error",
                message: "Service not found"
            })
        }

        // Agregamos el servicio a la reserva
        const updatedBooking = await addServiceToBooking(bid, sid)

        res.status(200).json({
            status: "success",
            data: updatedBooking
        })

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

export async function controllerUpdateBooking(req, res) {
    try {
        const { bid } = req.params
        const updatedBooking = await updateBooking(bid, req.body)

        if (!updatedBooking) {
            return res.status(404).json({ status: "error", message: "Booking not found" })
        }

        res.status(200).json({ status: "success", data: updatedBooking })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
}

export async function controllerDeleteBooking(req, res) {
    try {
        const { bid } = req.params
        const deleted = await deleteBooking(bid)

        if (!deleted) {
            return res.status(404).json({ status: "error", message: "Booking not found" })
        }

        res.status(200).json({ status: "success", message: "Booking deleted successfully" })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
}