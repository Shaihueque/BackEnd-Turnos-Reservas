import { randomUUID } from "crypto"
import * as repository from "../repositories/bookings.repository.js"

export async function getBookings() {
  return repository.getAllBookings()
}

export async function getBookingById(id) {
  return repository.getById(id)
}

export async function addBooking(data) {
  // El cliente no elige el ID: lo genera el servidor.
  const newData = { ...data, id: randomUUID() }
  return repository.create(newData)
}

export async function addServiceToBooking(bookingId, serviceId) {
  return repository.createServiceToBooking(bookingId, serviceId)
}

export async function updateBooking(id, changes) {
  // El ID identifica al recurso y no se puede cambiar.
  const { id: ignoredId, ...allowedChanges } = changes
  return repository.update(id, allowedChanges)
}

export async function deleteBooking(id) {
  return repository.remove(id)
}