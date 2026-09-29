import * as dao from "../dao/services.dao.js"

export async function getAllServices() {
  return dao.getServices()
}

export async function getById(id) {
  return dao.getServiceById(id)
}

export async function create(data) {
  return dao.addService(data)
}

export async function update(id, data) {
  return dao.updateService(id, data)
}

export async function remove(id) {
  return dao.deleteService(id)
}