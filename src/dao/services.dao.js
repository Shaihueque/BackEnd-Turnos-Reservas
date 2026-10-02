import Service from "../models/services.models.js"

// GET: obtiene todos los servicios
export async function getServices() {
    return await Service.find()
}

// GET: obtiene un servicio por ID
export async function getServiceById(id) {
    return await Service.findById(id)
}

// CREATE: crea un nuevo servicio
export async function addService(serviceData) {
    return await Service.create(serviceData)
}

// UPDATE: actualiza un servicio existente
export async function updateService(id, changes) {
    return await Service.findByIdAndUpdate(
        id,
        changes,
        {
            new: true,
            runValidators: true
        }
    )
}

// DELETE: elimina un servicio
export async function deleteService(id) {
    const deletedService = await Service.findByIdAndDelete(id)

    return deletedService !== null
}