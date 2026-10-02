
import * as repository from "../repositories/services.repository.js"

export async function getServices(filters = {}) {

  const services = await repository.getAllServices()

  const { category, available } = filters

  let filteredServices = services

  // Filtrar por categoría
  if (category) {
    filteredServices = filteredServices.filter(
      service => service.category === category
    )
  }
// Filtrar por disponibilidad
  if (available !== undefined) {
    filteredServices = filteredServices.filter(
      service => service.available === (available === "true")
    )
  }

  return filteredServices
}

export async function getServiceById(id) {
  return repository.getById(id)
}

export async function addService(data) {
  return repository.create(data)
}

export async function updateService(id, changes) {
  // El ID identifica al recurso y no se puede cambiar.
  const { id: ignoredId, ...allowedChanges } = changes
  return repository.update(id, allowedChanges)
}

export async function deleteService(id) {
  return repository.remove(id)
}