import {getServices, getServiceById} from "../services/services.service.js"
import {getBookings, getBookingById} from "../services/bookings.service.js"

export async function controllerGetServicesView(req, res) {
    try {

        const services = await getServices()

        res.render("services", {
            title: "Servicios",
            services
        })

    } catch (error) {

        console.error(error)

        res.status(500).send("No se pudieron cargar los servicios")

    }
}

export async function controllerGetAvailabilityView(req, res) {
    try {

        const bookings = await getBookings()

        res.render("availability", {
            title: "Disponibilidad",
            bookings
        })

    } catch (error) {

        console.error(error)

        res.status(500).send("No se pudieron cargar las reservas")

    }
}

export async function controllerGetAvailabilityByIdView(req, res) {
    try {

        const { bid } = req.params

        const booking = await getBookingById(bid)

        if (!booking) {
            return res.status(404).send("Reserva no encontrada")
        }

        res.render("availability", {
            title: "Reserva",
            bookings: [booking]
        })

    } catch (error) {
        console.error(error)

        res.status(500).send("No se pudo cargar la reserva")
    }
}

export async function controllerGetServiceByIdView(req, res) {
    try {

        const { sid } = req.params

        const service = await getServiceById(sid)

        if (!service) {
            return res.status(404).send("Servicio no encontrado")
        }

        res.render("services", {
            title: "Servicio",
            services: [service]
        })

    } catch (error) {
        console.error(error)

        res.status(500).send("No se pudo cargar el servicio")
    }
}