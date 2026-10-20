import {getBookings, getBookingById, addBooking,addServiceToBooking, updateBooking, deleteBooking} from "../services/bookings.service.js"

export async function controllerGetAllBookings(req, res) {

    try {
        
        const bookings = await getBookings()

        res.status(200).json({ status: "success", message: "Reservas obtenidas correctamente", data: bookings })
        
    } catch (error) {
         console.error("Error al obtener las reservas:", error)
        res.status(500).json({ status: "error", message: "No se pudieron obtener las reservas" })
    }
    
}

export async function controllerGetBookingById(req, res) {
    try {

        const { bid } = req.params

        const booking = await getBookingById(bid)

        if (!booking) {
            return res.status(404).json({
                status: "error",
                message: "Reserva no encontrada"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Reserva obtenida correctamente",
            data: booking
        })

    } catch (error) {
         console.error("Error al obtener la reserva:", error)

        res.status(500).json({
            status: "error",
            message: "No se pudo obtener la reserva"
        })
    }
}

export async function controllerCreateAddBooking(req, res) {
    try {
        const newBooking = await addBooking(req.body)

        const io = req.app.get("io")

        if (io) {
            io.emit("bookingCreated", newBooking)
        }

        res.status(201).json({
            status: "success",
            message: "Reserva creada correctamente",
            data: newBooking
        })

    } catch (error) {
        console.error("Error al crear la reserva:", error)
        res.status(500).json({
            status: "error",
            message: "No se pudo crear la reserva"
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
                message: "Reserva no encontrada"
            })
        }

        if (result?.error === "SERVICE_NOT_FOUND") {
            return res.status(404).json({
                status: "error",
                message: "Servicio no encontrado"
            })
        }

        const io = req.app.get("io")

        if (io) {
            io.emit("bookingServiceAdded", result)
        }

        res.status(200).json({
            status: "success",
            message: "Servicio agregado a la reserva correctamente",
            data: result
        })

    } catch (error) {
        console.error("Error al agregar el servicio a la reserva:", error)

        res.status(500).json({
            status: "error",
            message: "No se pudo agregar el servicio a la reserva"
        })
    }
}

export async function controllerUpdateBooking(req, res) {
    try {
        const { bid } = req.params
        const updatedBooking = await updateBooking(bid, req.body)

        if (!updatedBooking) {
            return res.status(404).json({ status: "error", message: "Reserva no encontrada" })
        }

        const io = req.app.get("io")

        if (io) {
            io.emit("bookingUpdated", updatedBooking)
        }

        res.status(200).json({ status: "success", message: "Reserva actualizada correctamente", data: updatedBooking })
    } catch (error) {
        console.error("Error al actualizar la reserva:", error)
        res.status(500).json({ status: "error", message: "No se pudo actualizar la reserva" })
    }
}

export async function controllerDeleteBooking(req, res) {
    try {
        const { bid } = req.params
        const deleted = await deleteBooking(bid)

        if (!deleted) {
            return res.status(404).json({
                status: "error",
                message: "Reserva no encontrada"
            })
        }

        const io = req.app.get("io")

        if (io) {
            io.emit("bookingDeleted", bid)
        }

        res.status(204).send()

    } catch (error) {
        console.error("Error al eliminar la reserva:", error)
        res.status(500).json({
            status: "error",
            message: "No se pudo eliminar la reserva"
        })
    }
}