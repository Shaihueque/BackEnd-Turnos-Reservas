import {getBookings, getBookingById, addBooking,addServiceToBooking, updateBooking, deleteBooking} from "../services/bookings.service.js"

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
            return res.status(404).json({
                status: "error",
                message: "Booking not found"
            })
        }

        res.status(200).json({
            status: "success",
            data: booking
        })

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

export async function controllerCreateAddBooking(req, res) {
    try {

        const {clientName, clientEmail, date, time, status} = req.body

        if (
            !clientName || !clientEmail || !date || !time || !status) {
            return res.status(400).json({
                status: "error",
                message: "Todos los campos son obligatorios"
            })
        }

        const newBooking = await addBooking(req.body)

        const io = req.app.get("io")

        if (io) {
            io.emit("bookingCreated", newBooking)
        }

        res.status(201).json({
            status: "success",
            data: newBooking
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

export async function controllerAddServiceToBooking(req, res) {
    try {

        const { bid, sid } = req.params

        const result = await addServiceToBooking(bid, sid)

        if (result?.error === "BOOKING_NOT_FOUND") {
            return res.status(404).json({
                status: "error",
                message: "Booking not found"
            })
        }

        if (result?.error === "SERVICE_NOT_FOUND") {
            return res.status(404).json({
                status: "error",
                message: "Service not found"
            })
        }

        const io = req.app.get("io")

        if (io) {
            io.emit("bookingServiceAdded", result)
        }

        res.status(200).json({
            status: "success",
            data: result
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

        const io = req.app.get("io")

        if (io) {
            io.emit("bookingUpdated", updatedBooking)
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
            return res.status(404).json({
                status: "error",
                message: "Booking not found"
            })
        }

        const io = req.app.get("io")

        if (io) {
            io.emit("bookingDeleted", bid)
        }

        res.status(204).send()

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}