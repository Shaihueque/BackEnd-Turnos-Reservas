
import * as repository from "../repositories/services.repository.js"

export async function getServices(filters = {}) {
    const {category, available, page = 1, limit = 10, sortBy, order = "asc"} = filters;

    const currentPage = Math.max(1, Number(page) || 1);
    const pageSize = Math.max(1, Number(limit) || 10);

    const queryFilters = {
        category,
        available
    };

    const [services, total] = await Promise.all([
        repository.getAllServices({
            ...queryFilters,
            page: currentPage,
            limit: pageSize,
            sortBy,
            order
        }),
        repository.countServices(queryFilters)
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
        services,
        pagination: {
            total,
            page: currentPage,
            limit: pageSize,
            totalPages,
            hasPrevPage: currentPage > 1,
            hasNextPage: currentPage < totalPages
        }
    };
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