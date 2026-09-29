import * as dao from "../dao/bookings.dao.js"

export async function getAllBookings() {
  return dao.getBookings()
}

export async function getById(id) {
  return dao.getBookingById(id)
}

export async function create(data) {
  return dao.addBooking(data)
}

export async function createServiceToBooking(bookingId, serviceId) {
  return dao.addServiceToBooking(bookingId, serviceId)
}

export async function update(id, data) {
  return dao.updateBooking(id, data)
}

export async function remove(id) {
  return dao.deleteBooking(id)
}