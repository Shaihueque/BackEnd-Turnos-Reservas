import Booking from "../models/bookings.models.js"

// GET: obtiene todas las reservas
export async function getBookings() {
    return await Booking.find()
}

// GET: obtiene una reserva por ID
export async function getBookingById(id) {
    return await Booking.findById(id)
}

// CREATE: crea una nueva reserva
export async function addBooking(bookingData) {
    return await Booking.create(bookingData)
}

// Agrega un servicio a una reserva
export async function addServiceToBooking(bookingId, serviceId) {

    const booking = await Booking.findById(bookingId)

    if (!booking) {
        return null
    }

    const existingService = booking.services.find(
        item => item.service.toString() === serviceId.toString()
    )

    if (existingService) {
        existingService.quantity++
    } else {
        booking.services.push({
            service: serviceId,
            quantity: 1
        })
    }

    await booking.save()

    return booking
}

// UPDATE: actualiza una reserva
export async function updateBooking(id, changes) {

    const { id: ignoredId, ...allowedChanges } = changes

    return await Booking.findByIdAndUpdate(
        id,
        allowedChanges,
        {
            new: true,
            runValidators: true
        }
    )
}

// DELETE: elimina una reserva
export async function deleteBooking(id) {

    const deletedBooking = await Booking.findByIdAndDelete(id)

    return deletedBooking !== null
}