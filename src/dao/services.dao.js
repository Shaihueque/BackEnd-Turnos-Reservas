import Service from "../models/services.models.js"

// Obtiene servicios con filtros, paginación y ordenamiento
export async function getServices(filters = {}) {
    const {category, available, page = 1, limit = 10, sortBy, order = "asc"} = filters;

    const query = {};

    if (category) {
        query.category = category;
    }

    if (available !== undefined) {
        query.available = available === true || available === "true";
    }

    const allowedSortFields = [
        "name",
        "duration",
        "price",
        "category",
        "available"
    ];

    const sortOptions = {};

    if (allowedSortFields.includes(sortBy)) {
        sortOptions[sortBy] = order === "desc" ? -1 : 1;
    }

    const skip = (page - 1) * limit;

    let servicesQuery = Service.find(query);

    if (Object.keys(sortOptions).length > 0) {
        servicesQuery = servicesQuery.sort(sortOptions);
    }

    return await servicesQuery
        .skip(skip)
        .limit(limit)
        .lean();
}

// Cuenta los servicios que coinciden con los filtros
export async function countServices(filters = {}) {
    const { category, available } = filters;

    const query = {};

    if (category) {
        query.category = category;
    }

    if (available !== undefined) {
        query.available = available === true || available === "true";
    }

    return await Service.countDocuments(query);
}

// GET: obtiene un servicio por ID
export async function getServiceById(id) {
    return await Service.findById(id).lean()
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
            returnDocument: "after",
            runValidators: true
        }
    )
}

// DELETE: elimina un servicio
export async function deleteService(id) {
    const deletedService = await Service.findByIdAndDelete(id)

    return deletedService !== null
}