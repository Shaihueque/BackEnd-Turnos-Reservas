import {getServices, getServiceById, addService, updateService, deleteService} from "../services/services.service.js"

export async function controllerGetAllServices(req, res) {
    try {
        const {category, available, page, limit, sortBy, order} = req.query;

        const result = await getServices({category, available, page, limit, sortBy, order});

        res.status(200).json({
            status: "success",
            message: "Servicios obtenidos correctamente",
            data: result.services,
            pagination: result.pagination
        });

    } catch (error) {
        console.error("Error al obtener los servicios:", error)

        res.status(500).json({
            status: "error",
            message: "No se pudieron obtener los servicios"
        });
    }
}

export async function controllerGetServiceById(req, res) {
    try {
    const service = await getServiceById(req.params.sid)

    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado"
      })
    }

    res.status(200).json({
      status: "success",
      message: "Servicio obtenido correctamente",
      data: service
    })
  } catch (error) {
    console.error("Error al obtener el servicio:", error)

    res.status(500).json({
      status: "error",
      message: "No se pudo obtener el servicio"
    })
  }
}

export async function controllerCreateAddService(req, res) {
   try {
    const newService = await addService(req.body)

    const io = req.app.get("io")

    if (io) {
        io.emit("serviceCreated", newService)
    }

    res.status(201).json({
      status: "success",
      message: "Servicio creado correctamente",
      data: newService
    })
  } catch (error) {
    console.error("Error al crear el servicio:", error)

    res.status(500).json({
      status: "error",
      message: "No se pudo crear el servicio"
    })
  }
}

export async function controllerUpdateService(req, res) {
    try {
        const updatedService = await updateService(req.params.sid, req.body)
    
        if (!updatedService) {
          return res.status(404).json({
            status: "error",
            message: "Servicio no encontrado"
          })
        }

        const io = req.app.get("io")

        if (io) {
            io.emit("serviceUpdated", updatedService)
        }
    
        res.status(200).json({
          status: "success",
          message: "Servicio actualizado correctamente",
          data: updatedService
        })
      } catch (error) {
        console.error("Error al actualizar el servicio:", error)
    
        res.status(500).json({
          status: "error",
          message: "No se pudo actualizar el servicio"
        })
      }
}

export async function controllerDeleteService(req, res) {
    try {
        const serviceId = req.params.sid

        const deleted = await deleteService(serviceId)
    
        if (!deleted) {
            return res.status(404).json({
                status: "error",
                message: "Servicio no encontrado"
            })
        }

        const io = req.app.get("io")

        if (io) {
            io.emit("serviceDeleted", serviceId)
        }
    
        res.status(204).send()

    } catch (error) {
        console.error("Error al eliminar el servicio:", error)
    
        res.status(500).json({
            status: "error",
            message: "No se pudo eliminar el servicio"
        })
    }
}