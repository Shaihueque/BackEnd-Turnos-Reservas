import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FILE_PATH = path.join(__dirname, "../data/services.json")

// Función interna o exportada para leer el archivo
export async function getServices() {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe (error ENOENT), devuelve un array vacío para no romper la app
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

// Busca un servicio por ID.
export async function getServiceById(id) {
  const services = await getServices()

  return services.find(service => service.id === id) ?? null
}

// CREATE: agrega un nuevo servicio

export async function addService(serviceData) {
  const services = await getServices()

  const newService = {
    id: serviceData.id,
    name: serviceData.name,
    description: serviceData.description,
    duration: serviceData.duration,
    price: serviceData.price,
    category: serviceData.category,
    available: serviceData.available
  }

  services.push(newService)

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(services, null, 2)
  )

  return newService
}

// UPDATE: actualiza un servicio existente

export async function updateService(id, changes) {
  const services = await getServices()

  const serviceIndex = services.findIndex(
    service => service.id === id
  )

  if (serviceIndex === -1) {
    return null
  }

  // Si el cliente manda un id, lo descartamos

  const { id: ignoredId, ...allowedChanges } = changes

  services[serviceIndex] = {
    ...services[serviceIndex],
    ...allowedChanges
  }

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(services, null, 2)
  )

  return services[serviceIndex]
}

// DELETE: elimina un servicio

export async function deleteService(id) {
  const services = await getServices()

  const filteredServices = services.filter(
    service => service.id !== id
  )

  if (filteredServices.length === services.length) {
    return false
  }

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(filteredServices, null, 2)
  )

  return true
}